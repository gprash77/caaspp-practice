import { existsSync, statSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { getElaPtFlow } from "@/lib/assessment-flow";
import { getAssessmentManifest, listAvailableAssessments } from "@/lib/assessment-manifest";
import { getManualRubric } from "@/lib/manual-rubrics";
import { getQuestions, type Question } from "@/lib/questions";
import { scoreResponse } from "@/lib/scoring";
import { grade4Phase4Sources } from "@/lib/grade4-phase4-sources";
import { evaluateGrade4Phase4Test, type Phase4TestNumber } from "@/lib/validation/grade4-phase4";

const tests: Phase4TestNumber[] = [6, 7, 8, 9, 10];
const section = (testNumber: number, subject: "math" | "ela", testType: "cat" | "pt") =>
  getQuestions(4, subject, testType, testNumber, { includeUnavailable: true });
const all = (testNumber: number) => [
  ...section(testNumber, "math", "cat"),
  ...section(testNumber, "math", "pt"),
  ...section(testNumber, "ela", "cat"),
  ...section(testNumber, "ela", "pt"),
];
const wordCount = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;
const normalizedPrompt = (value: string) =>
  value.toLowerCase().replace(/\d+/g, "#").replace(/[^a-z#? ]/g, "").replace(/\s+/g, " ").trim();

describe("Grade 4 Phase 4 release gate", () => {
  it("exposes Tests 6–10 with their approved labels after validation", () => {
    expect(listAvailableAssessments(4).map((manifest) => manifest.testNumber)).toEqual(
      Array.from({ length: 10 }, (_, index) => index + 1)
    );
    expect(tests.map((testNumber) => getAssessmentManifest(4, testNumber, { includeUnavailable: true })?.difficulty))
      .toEqual(["easy", "easy", "medium", "hard", "hard"]);
    for (const testNumber of tests) {
      expect(getAssessmentManifest(4, testNumber)).toBeDefined();
      expect(getAssessmentManifest(4, testNumber, { includeUnavailable: true })?.bankVersion).toBe("2026-07-27.1");
    }
  });

  it("passes five independent locked-fixture evaluations", () => {
    for (const testNumber of tests) {
      expect(evaluateGrade4Phase4Test(testNumber), `Test ${testNumber}`).toMatchObject({
        passed: true,
        errors: [],
        warnings: [],
        reviewedItems: 69,
      });
    }
  });

  it("matches the full 69-item, 81-point contract and blueprint claims", () => {
    const allIds = new Set<number>();
    for (const testNumber of tests) {
      const mc = section(testNumber, "math", "cat");
      const mp = section(testNumber, "math", "pt");
      const ec = section(testNumber, "ela", "cat");
      const ep = section(testNumber, "ela", "pt");
      expect([mc.length, mp.length, ec.length, ep.length]).toEqual([31, 5, 30, 3]);
      expect([mc, mp, ec, ep].map((questions) => questions.reduce((sum, question) => sum + question.points, 0)))
        .toEqual([32, 6, 30, 13]);
      expect(mc.reduce((counts, question) => (counts[question.claim - 1] += 1, counts), [0, 0, 0, 0]))
        .toEqual([17, 3, 8, 3]);
      expect(ec.reduce((counts, question) => (counts[question.claim - 1] += 1, counts), [0, 0, 0, 0]))
        .toEqual([15, 6, 6, 3]);
      for (const question of all(testNumber)) {
        expect(allIds.has(question.id), `duplicate item ${question.id}`).toBe(false);
        allIds.add(question.id);
      }
    }
    expect(allIds.size).toBe(345);
  });

  it("keeps Easy scaffolding and removes DOK 1 from Hard Math CAT", () => {
    for (const testNumber of [6, 7] as const) {
      expect(section(testNumber, "math", "cat").some((question) => question.dok === 1)).toBe(true);
      expect(section(testNumber, "ela", "cat").some((question) => question.dok === 1)).toBe(true);
    }
    for (const testNumber of [9, 10] as const) {
      expect(section(testNumber, "math", "cat").some((question) => question.dok === 1)).toBe(false);
      expect(section(testNumber, "math", "cat").filter((question) => question.dok >= 3).length).toBeGreaterThanOrEqual(17);
      expect(section(testNumber, "ela", "cat").filter((question) => question.dok === 3).length).toBeGreaterThanOrEqual(11);
    }
  });
});

describe("Grade 4 Phase 4 scoring and flow contracts", () => {
  it("scores every authored key and marks only registered rubric tasks manual", () => {
    for (const testNumber of tests) {
      for (const question of all(testNumber)) {
        const expected = question.scoringRule?.kind === "manual-rubric" ? "manual" : "correct";
        expect(scoreResponse(question, question.correctAnswer).status, `Test ${testNumber} item ${question.id}`)
          .toBe(expected);
      }
    }
  });

  it("covers partial-credit and alternate-valid constraint responses", () => {
    for (const testNumber of tests) {
      const partial = section(testNumber, "math", "cat").find((question) => question.points === 2)!;
      const key = partial.correctAnswer as string[];
      expect(scoreResponse(partial, key)).toMatchObject({ status: "correct", earnedPoints: 2 });
      expect(scoreResponse(partial, [key[0], "not-the-second-value"])).toMatchObject({ status: "partial", earnedPoints: 1 });
      expect(scoreResponse(partial, ["wrong", "wrong"]).status).toBe("incorrect");

      const catModel = section(testNumber, "math", "cat").find((question) => question.id % 100 === 30)!;
      expect(scoreResponse(catModel, catModel.correctAnswer).status).toBe("correct");
      expect(scoreResponse(catModel, ["1", "1"]).status).toBe("incorrect");
      expect(scoreResponse(catModel, ["2.5", "4"]).status).toBe("incorrect");

      const ptModel = section(testNumber, "math", "pt").find((question) => question.id % 100 === 5)!;
      expect(scoreResponse(ptModel, ptModel.correctAnswer).status).toBe("correct");
      expect(scoreResponse(ptModel, ptModel.acceptedAnswers!).status).toBe("correct");
      expect(scoreResponse(ptModel, ["0", "0", "0", "0"]).status).toBe("incorrect");
      expect(scoreResponse(ptModel, ["2.5", "3", "2", "3"]).status).toBe("incorrect");
    }
  });

  it("registers every ELA PT flow and all three manual rubrics per form", () => {
    for (const testNumber of tests) {
      const mathPtManual = 50104 + (testNumber - 6) * 2000;
      const elaPtBase = 51100 + (testNumber - 6) * 2000;
      expect(getElaPtFlow(4, testNumber)).toMatchObject({
        part1ItemIds: [elaPtBase + 1, elaPtBase + 2],
        part2ItemIds: [elaPtBase + 3],
      });
      for (const itemId of [mathPtManual, elaPtBase + 1, elaPtBase + 3]) {
        const question = all(testNumber).find((candidate) => candidate.id === itemId)!;
        expect(getManualRubric(4, testNumber, itemId)?.maxPoints).toBe(question.points);
      }
    }
  });

  it("enforces 1/2/1 source selection in every ELA PT", () => {
    for (const testNumber of tests) {
      const question = section(testNumber, "ela", "pt")[1];
      expect(question.gridSelection?.rowSelections).toEqual([{ min: 1, max: 1 }, { min: 2, max: 2 }, { min: 1, max: 1 }]);
      expect(scoreResponse(question, ["0:0", "1:1", "1:2", "2:2"]).status).toBe("correct");
      expect(scoreResponse(question, ["0:0", "1:1", "2:2"]).status).toBe("incorrect");
    }
  });
});

describe("Grade 4 Phase 4 content, media, and originality", () => {
  it("keeps complete source packages within reviewed minimum bands", () => {
    for (const source of grade4Phase4Sources) {
      expect(wordCount(source.literaryText), `Test ${source.testNumber} literary`).toBeGreaterThanOrEqual(650);
      expect(wordCount(source.informationText), `Test ${source.testNumber} information`).toBeGreaterThanOrEqual(630);
      expect(wordCount(source.listeningTexts[0]), `Test ${source.testNumber} listening A`).toBeGreaterThanOrEqual(280);
      expect(wordCount(source.listeningTexts[1]), `Test ${source.testNumber} listening B`).toBeGreaterThanOrEqual(300);
      expect(wordCount(source.ptText), `Test ${source.testNumber} ELA PT`).toBeGreaterThanOrEqual(800);
    }
  });

  it("pins every listening cluster to a nonempty exact-transcript audio asset", () => {
    for (const testNumber of tests) {
      const listeningQuestions = section(testNumber, "ela", "cat").filter((question) => question.claim === 3);
      expect(listeningQuestions).toHaveLength(6);
      for (const question of listeningQuestions) {
        expect(question.audio?.transcript).toBe(question.passage);
        const filePath = path.join(process.cwd(), "public", question.audio!.src.replace(/^\//, ""));
        expect(existsSync(filePath), question.audio!.src).toBe(true);
        expect(statSync(filePath).size).toBeGreaterThan(100_000);
      }
    }
  });

  it("has no exact or normalized-number prompt reuse and no passage reuse", () => {
    const prior: Question[] = [];
    for (let testNumber = 1; testNumber <= 18; testNumber += 1) {
      for (const subject of ["math", "ela"] as const) {
        for (const testType of ["cat", "pt"] as const) {
          prior.push(...getQuestions(3, subject, testType, testNumber));
        }
      }
    }
    for (let testNumber = 1; testNumber <= 5; testNumber += 1) {
      for (const subject of ["math", "ela"] as const) {
        for (const testType of ["cat", "pt"] as const) {
          prior.push(...getQuestions(4, subject, testType, testNumber));
        }
      }
    }
    const newQuestions = tests.flatMap((testNumber) => all(testNumber));
    const prompts = new Set(prior.map((question) => question.questionText));
    const normalized = new Set(prior.map((question) => normalizedPrompt(question.questionText)));
    const passages = new Set(prior.map((question) => question.passage).filter(Boolean));
    const seenPrompts = new Set<string>();
    const seenNormalized = new Set<string>();
    const seenPassages = new Set<string>();
    for (const question of newQuestions) {
      expect(prompts.has(question.questionText), `prior exact item ${question.id}`).toBe(false);
      expect(normalized.has(normalizedPrompt(question.questionText)), `prior template item ${question.id}`).toBe(false);
      expect(seenPrompts.has(question.questionText), `Phase 4 exact item ${question.id}`).toBe(false);
      expect(seenNormalized.has(normalizedPrompt(question.questionText)), `Phase 4 template item ${question.id}`).toBe(false);
      seenPrompts.add(question.questionText);
      seenNormalized.add(normalizedPrompt(question.questionText));
      if (question.passage) {
        expect(passages.has(question.passage), `prior passage item ${question.id}`).toBe(false);
        if (!seenPassages.has(question.passage)) seenPassages.add(question.passage);
      }
    }
    expect(seenPassages.size).toBe(25);
  });

  it("balances single-answer positions within one response per form", () => {
    for (const testNumber of tests) {
      for (const subject of ["math", "ela"] as const) {
        const counts = { A: 0, B: 0, C: 0, D: 0 };
        for (const question of section(testNumber, subject, "cat")) {
          if (typeof question.correctAnswer === "string" && question.correctAnswer in counts) {
            counts[question.correctAnswer as keyof typeof counts] += 1;
          } else if (Array.isArray(question.correctAnswer) && question.type === "two-part") {
            for (const answer of question.correctAnswer) {
              if (answer in counts) counts[answer as keyof typeof counts] += 1;
            }
          }
        }
        const values = Object.values(counts);
        expect(Math.max(...values) - Math.min(...values), `Test ${testNumber} ${subject}`).toBeLessThanOrEqual(1);
      }
    }
  });

  it("detects locked content and provenance mutations", () => {
    const changed = structuredClone(section(10, "ela", "cat"));
    changed[0].questionText += " changed";
    changed[1].provenance!.sourceId = "";
    const result = evaluateGrade4Phase4Test(10, { "ela-cat": changed });
    expect(result.passed).toBe(false);
    expect(result.errors.some((error) => error.field === "canonicalSha256")).toBe(true);
    expect(result.errors.some((error) => error.field === "provenance.sourceId")).toBe(true);
  });
});
