import { describe, it, expect } from "vitest";
import { checkAnswer, isManuallyScored, normalizeAnswer } from "@/lib/scoring";
import type { Question } from "@/lib/questions";

// Helper to create a minimal question for testing
function makeQuestion(overrides: Partial<Question>): Question {
  return {
    id: 1,
    subject: "math",
    grade: 3,
    claim: 1,
    target: "A",
    dok: 1,
    standard: "3.OA.A.1",
    type: "multiple-choice",
    testType: "cat",
    questionText: "Test question",
    correctAnswer: "A",
    rubric: "",
    points: 1,
    ...overrides,
  };
}

describe("normalizeAnswer", () => {
  it("trims whitespace", () => {
    expect(normalizeAnswer("  hello  ")).toBe("hello");
  });

  it("lowercases", () => {
    expect(normalizeAnswer("HELLO")).toBe("hello");
  });

  it("collapses multiple spaces", () => {
    expect(normalizeAnswer("hello   world")).toBe("hello world");
  });

  it("handles empty string", () => {
    expect(normalizeAnswer("")).toBe("");
  });
});

describe("isManuallyScored", () => {
  it("returns true for short-answer", () => {
    expect(isManuallyScored(makeQuestion({ type: "short-answer" }))).toBe(true);
  });

  it("returns true for extended-writing", () => {
    expect(isManuallyScored(makeQuestion({ type: "extended-writing" }))).toBe(true);
  });

  it("returns false for multiple-choice", () => {
    expect(isManuallyScored(makeQuestion({ type: "multiple-choice" }))).toBe(false);
  });

  it("returns false for multi-select", () => {
    expect(isManuallyScored(makeQuestion({ type: "multi-select" }))).toBe(false);
  });

  it("returns false for text-input", () => {
    expect(isManuallyScored(makeQuestion({ type: "text-input" }))).toBe(false);
  });

  it("returns false for two-part", () => {
    expect(isManuallyScored(makeQuestion({ type: "two-part" }))).toBe(false);
  });

  it("returns false for grid-match", () => {
    expect(isManuallyScored(makeQuestion({ type: "grid-match" }))).toBe(false);
  });
});

describe("checkAnswer", () => {
  describe("multiple-choice (single string answer)", () => {
    const q = makeQuestion({ type: "multiple-choice", correctAnswer: "B" });

    it("correct answer", () => {
      expect(checkAnswer(q, "B")).toBe(true);
    });

    it("wrong answer", () => {
      expect(checkAnswer(q, "A")).toBe(false);
    });

    it("case insensitive", () => {
      expect(checkAnswer(q, "b")).toBe(true);
    });

    it("trims whitespace", () => {
      expect(checkAnswer(q, " B ")).toBe(true);
    });

    it("empty string is wrong", () => {
      expect(checkAnswer(q, "")).toBe(false);
    });
  });

  describe("text-input (numeric answer)", () => {
    const q = makeQuestion({ type: "text-input", correctAnswer: "52" });

    it("correct number", () => {
      expect(checkAnswer(q, "52")).toBe(true);
    });

    it("wrong number", () => {
      expect(checkAnswer(q, "53")).toBe(false);
    });

    it("with whitespace", () => {
      expect(checkAnswer(q, " 52 ")).toBe(true);
    });
  });

  describe("text-input (comma-separated answer)", () => {
    const q = makeQuestion({ type: "text-input", correctAnswer: "3,5" });

    it("correct comma-separated", () => {
      expect(checkAnswer(q, "3,5")).toBe(true);
    });

    it("with spaces around commas", () => {
      expect(checkAnswer(q, "3, 5")).toBe(true);
    });

    it("wrong values", () => {
      expect(checkAnswer(q, "3,6")).toBe(false);
    });

    it("wrong number of parts", () => {
      expect(checkAnswer(q, "3")).toBe(false);
    });
  });

  describe("multi-select (array answer)", () => {
    const q = makeQuestion({
      type: "multi-select",
      correctAnswer: ["B", "C"],
    });

    it("correct selections in same order", () => {
      expect(checkAnswer(q, ["B", "C"])).toBe(true);
    });

    it("correct selections in different order", () => {
      expect(checkAnswer(q, ["C", "B"])).toBe(true);
    });

    it("missing one selection", () => {
      expect(checkAnswer(q, ["B"])).toBe(false);
    });

    it("extra selection", () => {
      expect(checkAnswer(q, ["A", "B", "C"])).toBe(false);
    });

    it("completely wrong", () => {
      expect(checkAnswer(q, ["A", "D"])).toBe(false);
    });

    it("empty array", () => {
      expect(checkAnswer(q, [])).toBe(false);
    });

    it("string instead of array is wrong", () => {
      expect(checkAnswer(q, "B")).toBe(false);
    });
  });

  describe("two-part (array answer)", () => {
    const q = makeQuestion({
      type: "two-part",
      correctAnswer: ["B", "C"],
    });

    it("correct selections", () => {
      expect(checkAnswer(q, ["B", "C"])).toBe(true);
    });

    it("order independent", () => {
      expect(checkAnswer(q, ["C", "B"])).toBe(true);
    });

    it("wrong answer", () => {
      expect(checkAnswer(q, ["A", "C"])).toBe(false);
    });
  });

  describe("manually scored questions", () => {
    it("short-answer always returns false", () => {
      const q = makeQuestion({
        type: "short-answer",
        correctAnswer: "anything",
      });
      expect(checkAnswer(q, "anything")).toBe(false);
    });

    it("extended-writing always returns false", () => {
      const q = makeQuestion({
        type: "extended-writing",
        correctAnswer: "anything",
      });
      expect(checkAnswer(q, "anything")).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("array answer with string user input returns false", () => {
      const q = makeQuestion({ correctAnswer: ["A", "B"] });
      expect(checkAnswer(q, "A")).toBe(false);
    });

    it("string answer with array user input returns false", () => {
      const q = makeQuestion({ correctAnswer: "A" });
      expect(checkAnswer(q, ["A"])).toBe(false);
    });
  });
});
