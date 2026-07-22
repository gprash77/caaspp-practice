import { describe, expect, it } from "vitest";

import { attemptMatchesBank, type AttemptRecord } from "../lib/attempt-records";
import { computeQuestionBankHash } from "../lib/bank-identity";
import { createManualScore, getManualRubric } from "../lib/manual-rubrics";
import { getQuestions } from "../lib/questions";
import type { Question } from "../lib/questions";
import { scoreResponse } from "../lib/scoring";
import {
  canAddGridSelection,
  canAddMultiSelection,
  selectionIsComplete,
  updateLinePlotStack,
} from "../lib/response-validation";

describe("Phase 2 architecture contracts", () => {
  it("hashes every enumerable bank field deterministically", async () => {
    const questions = getQuestions(4, "math", "cat", 1);
    const first = await computeQuestionBankHash(questions);
    const second = await computeQuestionBankHash(structuredClone(questions));
    expect(first).toBe(second);
    const changed = structuredClone(questions);
    changed[16].acceptedAnswers = ["WRONG"];
    expect(await computeQuestionBankHash(changed)).not.toBe(first);
  });

  it("requires bank hash and response schema to resume an attempt", () => {
    const expected = {
      grade: 4,
      subject: "ela" as const,
      testType: "pt" as const,
      practiceTest: 1,
      bankVersion: "2026-07-20.1",
      bankHash: "abc",
      responseSchemaVersion: "1",
    };
    const attempt = { ...expected } as Partial<AttemptRecord>;
    expect(attemptMatchesBank(attempt, expected)).toBe(true);
    expect(attemptMatchesBank({ ...attempt, bankHash: "old" }, expected)).toBe(false);
    expect(attemptMatchesBank({ ...attempt, responseSchemaVersion: "old" }, expected)).toBe(false);
  });

  it("keeps an awarded zero distinct from an unscored manual response", () => {
    const rubric = getManualRubric(4, 1, 41101)!;
    const outcome = createManualScore(rubric, {
      awardedPoints: 0,
      scorerName: "Parent",
      scorerRole: "parent",
      scoredAt: "2026-07-21",
    });
    expect(outcome.errors).toEqual([]);
    expect(outcome.record).toMatchObject({ status: "scored", awardedPoints: 0 });
  });

  it("validates and totals the 4/4/2 essay traits", () => {
    const rubric = getManualRubric(4, 1, 41103)!;
    const valid = createManualScore(rubric, {
      traits: { organizationPurpose: 4, evidenceElaboration: 3, conventions: 2 },
      scorerName: "Teacher",
      scorerRole: "teacher",
      scoredAt: "2026-07-21",
      comments: "Reviewed with the official rubric.",
    });
    expect(valid.errors).toEqual([]);
    expect(valid.record?.awardedPoints).toBe(9);
    expect(valid.record?.rubricVersion).toBe("g4-ela-pt-full-write-v1");

    const invalid = createManualScore(rubric, {
      traits: { organizationPurpose: 5, evidenceElaboration: 0, conventions: 0 },
      scorerName: "Teacher",
      scorerRole: "teacher",
      scoredAt: "2026-07-21",
    });
    expect(invalid.record).toBeUndefined();
    expect(invalid.errors[0]).toContain("Organization/Purpose");
  });

  it("scores declarative schedules without Art Day names or boundary times", () => {
    const question: Question = {
      id: 1,
      grade: 4,
      subject: "math",
      testType: "pt",
      claim: 4,
      target: "A",
      dok: 3,
      standard: "4.MD.A.2",
      type: "schedule-table",
      questionText: "Build a schedule.",
      correctAnswer: [],
      rubric: "One point for a valid schedule.",
      points: 1,
      scoringRule: { kind: "schedule" },
      schedule: {
        start: "8:00 a.m.",
        end: "12:00 p.m.",
        activities: ["Workshop", "Rest", "Reading", "Meal", "Closing"],
        minimumActivityMinutes: 30,
        minimumBreakMinutes: 10,
        breakAndLunchMinutes: 60,
        breakActivity: "Rest",
        lunchActivity: "Meal",
      },
    };
    expect(scoreResponse(question, ["8:00", "9:00", "9:00", "9:15", "9:15", "10:30", "10:30", "11:15", "11:15", "12:00"]).status).toBe("correct");
  });

  it("enforces authored multi-select and grid-selection contracts", () => {
    expect(canAddMultiSelection(["A"], { min: 2, max: 2 })).toBe(true);
    expect(canAddMultiSelection(["A", "B"], { min: 2, max: 2 })).toBe(false);

    const multiSelect = {
      ...getQuestions(4, "ela", "cat", 1).find((question) => question.type === "multi-select")!,
      selection: { min: 2, max: 2 },
    };
    expect(selectionIsComplete(multiSelect, ["A"])).toBe(false);
    expect(selectionIsComplete(multiSelect, ["A", "B"])).toBe(true);
    expect(selectionIsComplete(multiSelect, ["A", "not-an-option"])).toBe(false);

    const gridSelection = { perRowMin: 1, perRowMax: 1, totalMin: 2, totalMax: 2 };
    expect(canAddGridSelection(["0:0"], 0, gridSelection)).toBe(false);
    expect(canAddGridSelection(["0:0"], 1, gridSelection)).toBe(true);
    const grid = {
      ...getQuestions(4, "ela", "pt", 1).find((question) => question.type === "grid-match")!,
      gridRows: ["First", "Second"],
      gridSelection,
    };
    expect(selectionIsComplete(grid, ["0:0", "1:1"])).toBe(true);
    expect(selectionIsComplete(grid, ["0:0", "0:1"])).toBe(false);
    expect(selectionIsComplete(grid, ["0:0", "9:9"])).toBe(false);
  });

  it("scores numeric equivalence and reusable cross-field comparisons", () => {
    const base = getQuestions(4, "math", "cat", 1)[0];
    const equivalent: Question = {
      ...base,
      type: "text-input",
      correctAnswer: "3.75",
      scoringRule: { kind: "numeric-equivalent", acceptedValues: [3.75] },
    };
    for (const answer of ["3.75", "3 3/4", "15/4", "3¾"]) {
      expect(scoreResponse(equivalent, answer).status).toBe("correct");
    }
    expect(scoreResponse(equivalent, "3.5").status).toBe("incorrect");

    const budget: Question = {
      ...base,
      type: "multi-input",
      correctAnswer: [],
      responseFields: [{ label: "Boxes" }, { label: "Packs" }],
      scoringRule: {
        kind: "constraints",
        constraint: {
          kind: "all",
          constraints: [
            { kind: "field-number", index: 0, min: 0, integer: true },
            { kind: "field-number", index: 1, min: 0, integer: true },
            {
              kind: "linear-comparison",
              terms: [{ index: 0, coefficient: 6 }, { index: 1, coefficient: 4 }],
              operator: "<=",
              value: 20,
            },
          ],
        },
      },
    };
    expect(scoreResponse(budget, ["2", "2"]).status).toBe("correct");
    expect(scoreResponse(budget, ["3", "1"]).status).toBe("incorrect");
  });

  it("stores line-plot marks as bottom-up stacks without vertical gaps", () => {
    expect(updateLinePlotStack([], 1, 3)).toEqual(["1:1", "1:2", "1:3"]);
    expect(updateLinePlotStack(["0:1", "1:1", "1:2", "1:3"], 1, 3)).toEqual([
      "0:1",
      "1:1",
      "1:2",
    ]);
    expect(updateLinePlotStack(["0:1", "1:1"], 1, 4)).toEqual([
      "0:1",
      "1:1",
      "1:2",
      "1:3",
      "1:4",
    ]);
  });
});
