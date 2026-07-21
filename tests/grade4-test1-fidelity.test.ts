import { describe, expect, it } from "vitest";

import { getQuestions, type Question } from "@/lib/questions";
import { scoreResponse } from "@/lib/scoring";
import { evaluateGrade4Test1 } from "@/lib/validation/grade4-test1";

const clone = <T,>(value: T): T => structuredClone(value);
const mathCat = () => getQuestions(4, "math", "cat", 1);
const mathPt = () => getQuestions(4, "math", "pt", 1);
const elaCat = () => getQuestions(4, "ela", "cat", 1);
const elaPt = () => getQuestions(4, "ela", "pt", 1);

describe("Grade 4 Test 1 official fidelity gate", () => {
  it("passes the locked 69-item golden fixture", () => {
    const result = evaluateGrade4Test1();
    expect(result.errors).toEqual([]);
    expect(result.reviewedItems).toBe(69);
    expect(result.passed).toBe(true);
  });

  it.each([
    ["prompt", (question: Question) => { question.questionText += " changed"; }],
    ["option order", (question: Question) => { question.options?.reverse(); }],
    ["key", (question: Question) => { question.correctAnswer = "WRONG"; }],
    ["rubric", (question: Question) => { question.rubric += " changed"; }],
    ["asset hash", (question: Question) => { if (question.stimulusImages?.[0]) question.stimulusImages[0].sha256 = "0".repeat(64); }],
    ["scoring rule", (question: Question) => { question.scoringRule = { kind: "manual-rubric" }; }],
  ])("rejects a %s mutation", (_name, mutate) => {
    const changed = clone(mathCat());
    const target = _name === "asset hash"
      ? changed.find((question) => question.stimulusImages?.length)!
      : _name === "option order"
        ? changed.find((question) => question.options?.length)!
        : changed[0];
    mutate(target);
    const result = evaluateGrade4Test1({ "math-cat": changed });
    expect(result.passed).toBe(false);
    expect(result.errors.some((error) => error.field === "canonicalSha256")).toBe(true);
  });

  it("pins official item order and provenance in every section", () => {
    for (const questions of [mathCat(), mathPt(), elaCat(), elaPt()]) {
      questions.forEach((question, index) => {
        expect(question.official?.itemNumber).toBe(index + 1);
        expect(question.official?.sourcePage).toBeGreaterThan(0);
        expect(question.official?.bankVersion).toBe("2026-07-20.1");
      });
    }
  });

  it("keeps complete listening transcripts with every linked item", () => {
    const listening = elaCat().filter((question) => question.claim === 3);
    expect(listening).toHaveLength(6);
    listening.forEach((question) => {
      expect(question.passage?.length).toBeGreaterThan(900);
      expect(question.audio?.transcript).toBe(question.passage);
      expect(question.audio?.src).toMatch(/^\/audio\/presentations\/grade-4\//);
    });
  });

  it("keeps all three PT sources and answerable source images visible", () => {
    elaPt().forEach((question) => {
      expect(question.passage).toContain("It's a Cold (Hot, Dry, Dark) Cruel World!");
      expect(question.passage).toContain("Animal Architects");
      expect(question.passage).toContain("Don't Step in that Ecosystem!");
      expect(question.passage).toContain("source-1-owl-cactus.png");
      expect(question.passage).toContain("source-2-termite-mound.png");
      expect(question.passage).toContain("source-2-wombat.png");
    });
  });
});

describe("Grade 4 independent scoring cases", () => {
  it("does not accept swapped two-part answers", () => {
    const question = elaCat().find((entry) => entry.id === 41025)!;
    expect(scoreResponse(question, ["B", "D"]).status).toBe("correct");
    expect(scoreResponse(question, ["D", "B"]).status).toBe("incorrect");
    expect(scoreResponse(question, ["B", ""]).status).toBe("incorrect");
  });

  it("accepts official numeric equivalence families", () => {
    const snackMix = mathCat().find((entry) => entry.id === 40017)!;
    for (const answer of ["3.75", "3 3/4", "15/4", "3¾"]) {
      expect(scoreResponse(snackMix, answer).status).toBe("correct");
    }
    expect(scoreResponse(snackMix, "3.5").status).toBe("incorrect");
  });

  it("scores item 19 full and partial-credit paths independently", () => {
    const question = mathCat().find((entry) => entry.id === 40019)!;
    expect(scoreResponse(question, ["4", "712"])).toMatchObject({ earnedPoints: 2, maxPoints: 2, status: "correct" });
    expect(scoreResponse(question, ["9", "1602"]).earnedPoints).toBe(2);
    expect(scoreResponse(question, ["3", "222"]).earnedPoints).toBe(1);
    expect(scoreResponse(question, ["0", "111"]).earnedPoints).toBe(0);
  });

  it("scores factor, comparison, and fruit response families", () => {
    const questions = mathCat();
    const factor = questions.find((entry) => entry.id === 40020)!;
    expect(scoreResponse(factor, ["4", "3", "4 1 2"]).status).toBe("correct");
    expect(scoreResponse(factor, ["9", "3", "1, 3, 9"]).status).toBe("correct");
    expect(scoreResponse(factor, ["8", "4", "1 2 4 8"]).status).toBe("incorrect");

    const comparison = questions.find((entry) => entry.id === 40029)!;
    expect(scoreResponse(comparison, ["0", "2"]).status).toBe("correct");
    expect(scoreResponse(comparison, ["1", "9"]).status).toBe("correct");
    expect(scoreResponse(comparison, ["2", "1"]).status).toBe("incorrect");

    const fruit = questions.find((entry) => entry.id === 40030)!;
    expect(scoreResponse(fruit, ["2", "4"]).status).toBe("correct");
    expect(scoreResponse(fruit, ["3", "4"]).status).toBe("incorrect");
  });

  it("validates Art Day schedule boundaries and continuity", () => {
    const schedule = mathPt().find((entry) => entry.id === 40104)!;
    expect(scoreResponse(schedule, ["9:00", "10:30", "10:30", "10:45", "10:45", "12:15", "12:15", "1:00", "1:00", "2:00"]).status).toBe("correct");
    expect(scoreResponse(schedule, ["9:00", "10:30", "10:30", "10:35", "10:35", "12:15", "12:15", "1:00", "1:00", "2:00"]).status).toBe("incorrect");
    expect(scoreResponse(schedule, ["9:00", "10:30", "10:35", "10:50", "10:50", "12:15", "12:15", "1:00", "1:00", "2:00"]).status).toBe("incorrect");
  });

  it("marks every constructed-response rubric for manual scoring", () => {
    for (const question of [...mathPt(), ...elaPt()].filter((entry) => ["short-answer", "extended-writing"].includes(entry.type))) {
      expect(scoreResponse(question, "student response").status).toBe("manual");
      expect(question.rubric.length).toBeGreaterThan(100);
    }
  });
});
