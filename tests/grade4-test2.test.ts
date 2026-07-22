import { existsSync, statSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { getManualRubric } from "@/lib/manual-rubrics";
import { getQuestions, type Question } from "@/lib/questions";
import { scoreResponse } from "@/lib/scoring";
import { evaluateGrade4Test2 } from "@/lib/validation/grade4-test2";

const section = (subject: "math" | "ela", testType: "cat" | "pt") =>
  getQuestions(4, subject, testType, 2, { includeUnavailable: true });
const mathCat = () => section("math", "cat");
const mathPt = () => section("math", "pt");
const elaCat = () => section("ela", "cat");
const elaPt = () => section("ela", "pt");
const all = () => [...mathCat(), ...mathPt(), ...elaCat(), ...elaPt()];
const wordCount = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;

describe("Grade 4 Test 2 locked original-bank gate", () => {
  it("passes the 69-item fixture", () => {
    const result = evaluateGrade4Test2();
    expect(result).toMatchObject({ passed: true, errors: [], warnings: [], reviewedItems: 69 });
  });

  it.each([
    ["prompt", (question: Question) => { question.questionText += " changed"; }],
    ["key", (question: Question) => { question.correctAnswer = "WRONG"; }],
    ["rubric", (question: Question) => { question.rubric += " changed"; }],
    ["provenance", (question: Question) => { question.provenance!.sourceId = ""; }],
  ])("rejects a %s mutation", (_name, mutate) => {
    const changed = structuredClone(mathCat());
    mutate(changed[0]);
    const result = evaluateGrade4Test2({ "math-cat": changed });
    expect(result.passed).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("matches the approved section and point blueprint", () => {
    expect([mathCat().length, mathPt().length, elaCat().length, elaPt().length]).toEqual([31, 5, 30, 3]);
    expect([mathCat(), mathPt(), elaCat(), elaPt()].map((questions) =>
      questions.reduce((sum, question) => sum + question.points, 0)
    )).toEqual([32, 6, 30, 13]);
    expect(new Set(all().map((question) => question.id)).size).toBe(69);
  });

  it("records complete original provenance on every item", () => {
    for (const question of all()) {
      expect(question.provenance).toMatchObject({
        origin: "original",
        author: "CAASPP Practice Project",
        reviewedAt: "2026-07-22",
      });
      expect(question.provenance?.sourceId).not.toBe("");
      expect(question.provenance?.license).toContain("Original companion content");
    }
  });
});

describe("Grade 4 Test 2 scoring contracts", () => {
  it("scores every locked objective key and marks only rubric items manual", () => {
    for (const question of all()) {
      const scored = scoreResponse(question, question.correctAnswer);
      expect(scored.status, `item ${question.id}`).toBe(
        question.scoringRule?.kind === "manual-rubric" ? "manual" : "correct"
      );
    }
  });

  it("enforces exact selection cardinality and ordered two-part responses", () => {
    const factors = mathCat().find((question) => question.id === 42007)!;
    expect(scoreResponse(factors, ["A", "B", "D"]).status).toBe("correct");
    expect(scoreResponse(factors, ["A", "B"]).status).toBe("incorrect");
    expect(scoreResponse(factors, ["A", "B", "D", "E"]).status).toBe("incorrect");

    const evidence = elaCat().find((question) => question.id === 43004)!;
    expect(scoreResponse(evidence, ["B", "C"]).status).toBe("correct");
    expect(scoreResponse(evidence, ["C", "B"]).status).toBe("incorrect");
  });

  it("awards the intended partial-credit paths for multiplication correction", () => {
    const question = mathCat().find((entry) => entry.id === 42020)!;
    expect(scoreResponse(question, ["18", "1058"])).toMatchObject({ earnedPoints: 2, status: "correct" });
    expect(scoreResponse(question, ["18", "1000"])).toMatchObject({ earnedPoints: 1, status: "partial" });
    expect(scoreResponse(question, ["12", "1058"])).toMatchObject({ earnedPoints: 0, status: "incorrect" });
  });

  it("accepts valid walking-route models and rejects boundary or type violations", () => {
    const question = mathPt().find((entry) => entry.id === 42105)!;
    expect(scoreResponse(question, ["1", "2", "1"]).status).toBe("correct");
    expect(scoreResponse(question, ["0", "4", "0"]).status).toBe("incorrect");
    expect(scoreResponse(question, ["1", "1", "1"]).status).toBe("incorrect");
    expect(scoreResponse(question, ["1.5", "1", "2"]).status).toBe("incorrect");
    expect(scoreResponse(question, ["-1", "3", "2"]).status).toBe("incorrect");
  });

  it("registers every manual rubric at the bank's point value", () => {
    for (const id of [42104, 43101, 43103]) {
      const question = all().find((entry) => entry.id === id)!;
      expect(getManualRubric(4, 2, id)?.maxPoints).toBe(question.points);
      expect(scoreResponse(question, "student response").status).toBe("manual");
    }
    expect(getManualRubric(4, 2, 43103)).toMatchObject({ kind: "traits", maxPoints: 10 });
  });
});

describe("Grade 4 Test 2 stimulus and originality review", () => {
  it("keeps reading, listening, and PT sources inside approved length bands", () => {
    const byTitle = new Map<string, string>();
    for (const question of elaCat()) {
      if (question.passageTitle && question.passage) byTitle.set(question.passageTitle, question.passage);
    }
    expect(wordCount(byTitle.get("The Last Practice Lap")!)).toBeGreaterThanOrEqual(850);
    expect(wordCount(byTitle.get("The Last Practice Lap")!)).toBeLessThanOrEqual(1000);
    expect(wordCount(byTitle.get("How a Letter Finds Its Way")!)).toBeGreaterThanOrEqual(900);
    expect(wordCount(byTitle.get("How a Letter Finds Its Way")!)).toBeLessThanOrEqual(1050);
    for (const title of ["From Paper Bin to New Paper", "Watching the Moon's Appearance"]) {
      expect(wordCount(byTitle.get(title)!)).toBeGreaterThanOrEqual(430);
      expect(wordCount(byTitle.get(title)!)).toBeLessThanOrEqual(520);
    }
    expect(wordCount(elaPt()[0].passage!)).toBeGreaterThanOrEqual(1100);
    expect(wordCount(elaPt()[0].passage!)).toBeLessThanOrEqual(1350);
  });

  it("keeps listening keys answerable from audio alone and audio files nonempty", () => {
    const listening = elaCat().filter((question) => question.claim === 3);
    expect(listening).toHaveLength(6);
    for (const question of listening) {
      expect(question.audio?.transcript).toBe(question.passage);
      expect(question.audio?.transcript).toContain(question.passageTitle!);
      const filePath = path.join(process.cwd(), "public", question.audio!.src.replace(/^\//, ""));
      expect(existsSync(filePath)).toBe(true);
      expect(statSync(filePath).size).toBeGreaterThan(100_000);
    }
  });

  it("has no exact prompt or passage reuse within Test 2 or against prior forms", () => {
    const current = all();
    const prior: Question[] = [];
    for (let testNumber = 1; testNumber <= 18; testNumber += 1) {
      for (const subject of ["math", "ela"] as const) {
        for (const testType of ["cat", "pt"] as const) {
          prior.push(...getQuestions(3, subject, testType, testNumber));
        }
      }
    }
    for (const subject of ["math", "ela"] as const) {
      for (const testType of ["cat", "pt"] as const) {
        prior.push(...getQuestions(4, subject, testType, 1));
      }
    }

    expect(new Set(current.map((question) => question.questionText)).size).toBe(current.length);
    const priorPrompts = new Set(prior.map((question) => question.questionText));
    current.forEach((question) => expect(priorPrompts.has(question.questionText), `item ${question.id}`).toBe(false));

    const priorPassages = new Set(prior.map((question) => question.passage).filter(Boolean));
    for (const passage of new Set(current.map((question) => question.passage).filter(Boolean))) {
      expect(priorPassages.has(passage)).toBe(false);
    }
  });
});
