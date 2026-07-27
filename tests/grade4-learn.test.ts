import { describe, expect, it } from "vitest";

import { grade4Lessons } from "@/lib/grade4-learn";

describe("Grade 4 Learn MVP", () => {
  it("contains four Math and four ELA lessons", () => {
    expect(grade4Lessons.filter((lesson) => lesson.subject === "math")).toHaveLength(4);
    expect(grade4Lessons.filter((lesson) => lesson.subject === "ela")).toHaveLength(4);
  });

  it("visibly maps every lesson to Grade 4 standards and two original practice items", () => {
    for (const lesson of grade4Lessons) {
      expect(lesson.standards.length).toBeGreaterThan(0);
      expect(lesson.standards.every((standard) => /(^4\.|\.4\.)/.test(standard))).toBe(true);
      expect(lesson.practice).toHaveLength(2);
      expect(new Set(lesson.practice.map((question) => question.prompt)).size).toBe(2);
      for (const question of lesson.practice) {
        expect(question.options.length).toBeGreaterThanOrEqual(4);
        expect(question.correctIndex).toBeGreaterThanOrEqual(0);
        expect(question.correctIndex).toBeLessThan(question.options.length);
        expect(question.explanation.trim()).not.toBe("");
      }
    }
  });

  it("keeps Learn content distinct from released assessment prompts", async () => {
    const { getQuestions } = await import("@/lib/questions");
    const releasedPrompts = new Set<string>();
    for (let testNumber = 1; testNumber <= 10; testNumber += 1) {
      for (const subject of ["math", "ela"] as const) {
        for (const testType of ["cat", "pt"] as const) {
          for (const question of getQuestions(4, subject, testType, testNumber)) {
            releasedPrompts.add(question.questionText);
          }
        }
      }
    }
    for (const lesson of grade4Lessons) {
      for (const question of lesson.practice) {
        expect(releasedPrompts.has(question.prompt)).toBe(false);
      }
    }
  });
});
