"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./minemath.module.css";

type Resource = "wood" | "stone" | "iron" | "diamond";
type Tool = "hands" | "wood_pickaxe" | "stone_pickaxe" | "iron_pickaxe";
type Operation = "+" | "-" | "x" | "/";

type Challenge = {
  a: number;
  b: number;
  op: Operation;
  answer: number;
  choices: number[];
};

const stages: Array<{
  name: string;
  resource: Resource;
  target: number;
  minTool: Tool;
  hint: string;
}> = [
  { name: "Forest Edge", resource: "wood", target: 4, minTool: "hands", hint: "Gather wood for your first pickaxe." },
  { name: "Stone Steps", resource: "stone", target: 5, minTool: "wood_pickaxe", hint: "Stone unlocks sturdier tools." },
  { name: "Iron Vein", resource: "iron", target: 5, minTool: "stone_pickaxe", hint: "Iron makes diamond mining possible." },
  { name: "Diamond Chamber", resource: "diamond", target: 3, minTool: "iron_pickaxe", hint: "One clean run to the treasure." },
];

const toolRank: Record<Tool, number> = {
  hands: 0,
  wood_pickaxe: 1,
  stone_pickaxe: 2,
  iron_pickaxe: 3,
};

const toolLabel: Record<Tool, string> = {
  hands: "Hands",
  wood_pickaxe: "Wood Pickaxe",
  stone_pickaxe: "Stone Pickaxe",
  iron_pickaxe: "Iron Pickaxe",
};

const resourceLabel: Record<Resource, string> = {
  wood: "Wood",
  stone: "Stone",
  iron: "Iron",
  diamond: "Diamond",
};

const recipes: Array<{ tool: Tool; label: string; cost: Partial<Record<Resource, number>> }> = [
  { tool: "wood_pickaxe", label: "Wood Pickaxe", cost: { wood: 3 } },
  { tool: "stone_pickaxe", label: "Stone Pickaxe", cost: { wood: 1, stone: 4 } },
  { tool: "iron_pickaxe", label: "Iron Pickaxe", cost: { wood: 1, stone: 2, iron: 4 } },
];

const resourceOrder: Resource[] = ["wood", "stone", "iron", "diamond"];

function seededRandom(seed: number) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

function makeChoices(answer: number, seed: number) {
  const offsets = [-8, -5, -3, -2, 2, 3, 5, 8, 10];
  const choices = new Set<number>([answer]);

  for (let i = 0; choices.size < 4; i += 1) {
    const offset = offsets[(seed + i * 3) % offsets.length];
    const candidate = Math.max(0, answer + offset + (i % 2 === 0 ? 0 : seed % 3));
    if (candidate !== answer) {
      choices.add(candidate);
    }
  }

  return Array.from(choices).sort((left, right) => seededRandom(left + seed) - seededRandom(right + seed));
}

function makeChallenge(level: number, streak: number, difficulty: number): Challenge {
  const seed = level * 37 + streak * 13 + difficulty * 17;
  const opIndex = (seed + difficulty) % Math.min(4, difficulty + 2);
  const op = ["+", "-", "x", "/"][opIndex] as Operation;
  const max = 8 + difficulty * 4 + Math.floor(level / 2);
  let a = 2 + (seed % max);
  let b = 2 + ((seed * 5) % Math.max(5, max - 2));
  let answer = a + b;

  if (op === "-") {
    if (b > a) [a, b] = [b, a];
    answer = a - b;
  }

  if (op === "x") {
    a = 2 + (seed % (4 + difficulty));
    b = 2 + ((seed * 7) % (4 + difficulty));
    answer = a * b;
  }

  if (op === "/") {
    b = 2 + (seed % (3 + difficulty));
    answer = 2 + ((seed * 3) % (5 + difficulty));
    a = answer * b;
  }

  return { a, b, op, answer, choices: makeChoices(answer, seed) };
}

function canAfford(resources: Record<Resource, number>, cost: Partial<Record<Resource, number>>) {
  return Object.entries(cost).every(([resource, amount]) => resources[resource as Resource] >= (amount ?? 0));
}

export default function Minemath() {
  const [stageIndex, setStageIndex] = useState(0);
  const [resources, setResources] = useState<Record<Resource, number>>({ wood: 0, stone: 0, iron: 0, diamond: 0 });
  const [tool, setTool] = useState<Tool>("hands");
  const [hearts, setHearts] = useState(3);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [difficulty, setDifficulty] = useState(1);
  const [message, setMessage] = useState("Solve to mine your first block.");
  const [complete, setComplete] = useState(false);

  const stage = stages[stageIndex];
  const challenge = useMemo(() => makeChallenge(level, streak, difficulty), [difficulty, level, streak]);
  const progress = Math.min(100, Math.round((resources[stage.resource] / stage.target) * 100));
  const requiredToolReady = toolRank[tool] >= toolRank[stage.minTool];

  const craft = (nextTool: Tool) => {
    const recipe = recipes.find((item) => item.tool === nextTool);
    if (!recipe || !canAfford(resources, recipe.cost)) return;

    setResources((current) => {
      const updated = { ...current };
      for (const [resource, amount] of Object.entries(recipe.cost)) {
        updated[resource as Resource] -= amount ?? 0;
      }
      return updated;
    });
    setTool(nextTool);
    setMessage(`${recipe.label} crafted. The next layer is ready.`);
  };

  const reset = () => {
    setStageIndex(0);
    setResources({ wood: 0, stone: 0, iron: 0, diamond: 0 });
    setTool("hands");
    setHearts(3);
    setStreak(0);
    setLevel(1);
    setMessage("Solve to mine your first block.");
    setComplete(false);
  };

  const answer = (choice: number) => {
    if (complete) return;

    if (!requiredToolReady) {
      setMessage(`Craft a ${toolLabel[stage.minTool]} before mining ${resourceLabel[stage.resource].toLowerCase()}.`);
      return;
    }

    if (choice !== challenge.answer) {
      const nextHearts = hearts - 1;
      setHearts(nextHearts);
      setStreak(0);
      setLevel((current) => current + 1);
      setMessage(nextHearts > 0 ? "Missed swing. Try the next problem." : "Cave run reset. Keep your tools and try again.");
      if (nextHearts <= 0) {
        setHearts(3);
        setStageIndex(0);
      }
      return;
    }

    const bonus = streak >= 2 ? 2 : 1;
    const minedResource = stage.resource;
    const nextResources = { ...resources, [minedResource]: resources[minedResource] + bonus };
    const stageComplete = nextResources[minedResource] >= stage.target;
    setResources(nextResources);
    setStreak((current) => current + 1);
    setLevel((current) => current + 1);

    if (stageComplete && stageIndex === stages.length - 1) {
      setComplete(true);
      setMessage("Diamond chamber cleared. Minemath complete.");
      return;
    }

    if (stageComplete) {
      setStageIndex((current) => current + 1);
      setMessage(`${resourceLabel[minedResource]} secured. Move deeper and craft what you need.`);
      return;
    }

    setMessage(bonus > 1 ? `Correct. Combo bonus mined ${bonus} blocks.` : "Correct. One block mined.");
  };

  return (
    <main className={styles.shell}>
      <section className={styles.header}>
        <Link className={styles.backLink} href="/" aria-label="Back to CAASPP practice">
          Back
        </Link>
        <div>
          <p className={styles.kicker}>Block-by-block arithmetic</p>
          <h1>Minemath</h1>
        </div>
        <button className={styles.resetButton} type="button" onClick={reset}>
          Reset Run
        </button>
      </section>

      <section className={styles.game}>
        <div className={styles.worldPanel} aria-label="Mine view">
          <div className={styles.sky}>
            <div className={styles.sun} />
            <div className={styles.cloudOne} />
            <div className={styles.cloudTwo} />
          </div>
          <div className={styles.ground}>
            {stages.map((item, index) => (
              <div
                className={`${styles.blockRow} ${styles[item.resource]} ${index === stageIndex ? styles.activeLayer : ""}`}
                key={item.name}
              >
                <span>{item.name}</span>
                <strong>{resourceLabel[item.resource]}</strong>
              </div>
            ))}
          </div>
          <div className={styles.miner} aria-hidden="true">
            <div className={styles.minerHead} />
            <div className={styles.minerBody} />
            <div className={styles.pickaxe} />
          </div>
        </div>

        <div className={styles.playPanel}>
          <div className={styles.statusBar}>
            <span>Stage {stageIndex + 1}/4</span>
            <span>Tool: {toolLabel[tool]}</span>
            <span>Hearts: {"#".repeat(hearts)}</span>
          </div>

          <div className={styles.difficulty} aria-label="Difficulty">
            {[1, 2, 3].map((value) => (
              <button
                className={difficulty === value ? styles.selectedDifficulty : ""}
                key={value}
                type="button"
                onClick={() => {
                  setDifficulty(value);
                  setMessage(`Difficulty ${value} selected. Next block is ready.`);
                  setLevel((current) => current + 1);
                }}
              >
                Level {value}
              </button>
            ))}
          </div>

          <div className={styles.stageCard}>
            <div>
              <p className={styles.kicker}>{stage.hint}</p>
              <h2>{stage.name}</h2>
            </div>
            <div className={styles.progressTrack} aria-label={`${resourceLabel[stage.resource]} progress`}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
            <p>
              Mine {stage.target} {resourceLabel[stage.resource].toLowerCase()} blocks.
            </p>
          </div>

          <div className={styles.challengeCard}>
            <p className={styles.message}>{message}</p>
            <div className={styles.problem} aria-label="Current math problem">
              {challenge.a} {challenge.op} {challenge.b} = ?
            </div>
            <div className={styles.choices}>
              {challenge.choices.map((choice) => (
                <button key={choice} type="button" onClick={() => answer(choice)}>
                  {choice}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.lowerGrid}>
            <div className={styles.inventory}>
              <h2>Inventory</h2>
              {resourceOrder.map((resource) => (
                <div key={resource} className={styles.inventoryRow}>
                  <span className={`${styles.resourceChip} ${styles[resource]}`} />
                  <span>{resourceLabel[resource]}</span>
                  <strong>{resources[resource]}</strong>
                </div>
              ))}
            </div>

            <div className={styles.crafting}>
              <h2>Crafting</h2>
              {recipes.map((recipe) => {
                const owned = toolRank[tool] >= toolRank[recipe.tool];
                return (
                  <button
                    key={recipe.tool}
                    type="button"
                    disabled={owned || !canAfford(resources, recipe.cost)}
                    onClick={() => craft(recipe.tool)}
                  >
                    <span>{recipe.label}</span>
                    <small>
                      {Object.entries(recipe.cost)
                        .map(([resource, amount]) => `${amount} ${resourceLabel[resource as Resource]}`)
                        .join(" + ")}
                    </small>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
