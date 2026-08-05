import { describe, expect, it } from "vitest";

import {
  californiaElaTargets,
  californiaMathTargets,
  grade4AlignedLessons,
  learnCoverage,
  sfusdPriorityLabels,
} from "@/lib/grade4-learn-aligned";
import { grade4GuidedUnits } from "@/lib/grade4-guided-units";

const normalizedPrompt = (value: string) =>
  value.toLowerCase().replace(/\d+/g, "#").replace(/[^a-z#?+\-×÷<>=/ ]/g, "").replace(/\s+/g, " ").trim();

describe("Grade 4 Learn California and SFUSD alignment", () => {
  it("provides sequenced guided Math and ELA pilots with valid teaching checks", () => {
    expect(grade4GuidedUnits.map((unit) => unit.subject)).toEqual(["math", "ela"]);
    const stepIds = new Set<string>();
    const questionIds = new Set<string>();
    for (const unit of grade4GuidedUnits) {
      expect(unit.steps).toHaveLength(6);
      expect(unit.steps[0].phase).toBe("Learn");
      expect(unit.steps.at(-1)?.phase).toBe("Mastery check");
      expect(unit.standards.length).toBeGreaterThan(0);
      for (const step of unit.steps) {
        expect(stepIds.has(step.id), step.id).toBe(false);
        stepIds.add(step.id);
        expect(step.teaching.length).toBeGreaterThan(0);
        if (!step.question) continue;
        expect(questionIds.has(step.question.id), step.question.id).toBe(false);
        questionIds.add(step.question.id);
        expect(step.question.options).toHaveLength(4);
        expect(step.question.correctIndex).toBeGreaterThanOrEqual(0);
        expect(step.question.correctIndex).toBeLessThan(4);
        expect(step.question.hint.trim()).not.toBe("");
        expect(step.question.retry.trim()).not.toBe("");
        expect(step.question.explanation.trim()).not.toBe("");
      }
    }
    expect(stepIds.size).toBe(12);
    expect(questionIds.size).toBe(10);
  });

  it("delivers the documented lesson and practice floor", () => {
    expect(learnCoverage("math")).toEqual({
      lessons: 15,
      practiceTasks: 60,
      standards: californiaMathTargets.length,
      writtenTasks: 15,
    });
    expect(learnCoverage("ela")).toEqual({
      lessons: 16,
      practiceTasks: 64,
      standards: californiaElaTargets.length,
      writtenTasks: 16,
    });
  });

  it("covers every targeted California Grade 4 standard", () => {
    const mathStandards = new Set(
      grade4AlignedLessons.filter((lesson) => lesson.subject === "math").flatMap((lesson) => lesson.standards)
    );
    const elaStandards = new Set(
      grade4AlignedLessons.filter((lesson) => lesson.subject === "ela").flatMap((lesson) => lesson.standards)
    );
    expect(californiaMathTargets.filter((standard) => !mathStandards.has(standard))).toEqual([]);
    expect(californiaElaTargets.filter((standard) => !elaStandards.has(standard))).toEqual([]);
  });

  it("covers every published SFUSD priority in the crosswalk", () => {
    const mapped = new Set(grade4AlignedLessons.flatMap((lesson) => lesson.sfusdPriorities));
    expect(Object.keys(sfusdPriorityLabels).filter((priority) => !mapped.has(priority))).toEqual([]);
    for (const lesson of grade4AlignedLessons) {
      expect(lesson.sfusdPriorities.length).toBeGreaterThan(0);
    }
  });

  it("contains four valid original tasks per lesson with all difficulty bands", () => {
    const ids = new Set<string>();
    const prompts = new Set<string>();
    const normalized = new Set<string>();
    const difficulties = new Set<string>();
    for (const lesson of grade4AlignedLessons) {
      expect(lesson.practice).toHaveLength(4);
      for (const question of lesson.practice) {
        expect(ids.has(question.id), question.id).toBe(false);
        expect(prompts.has(question.prompt), question.prompt).toBe(false);
        expect(normalized.has(normalizedPrompt(question.prompt)), question.prompt).toBe(false);
        ids.add(question.id);
        prompts.add(question.prompt);
        normalized.add(normalizedPrompt(question.prompt));
        difficulties.add(question.difficulty);
        expect(lesson.standards).toContain(question.standard);
        if (question.type === "choice") {
          expect(question.options).toHaveLength(4);
          expect(question.correctIndex).toBeGreaterThanOrEqual(0);
          expect(question.correctIndex).toBeLessThan(question.options.length);
          expect(question.explanation.trim()).not.toBe("");
        } else {
          expect(question.reviewCriteria.length).toBeGreaterThanOrEqual(2);
          expect(question.modelResponse.trim().length).toBeGreaterThan(20);
        }
      }
    }
    expect(difficulties).toEqual(new Set(["foundation", "core", "challenge"]));
    expect(ids.size).toBe(124);
  });

  it("balances choice-answer positions within each subject", () => {
    for (const subject of ["math", "ela"] as const) {
      const counts = [0, 0, 0, 0];
      for (const question of grade4AlignedLessons
        .filter((lesson) => lesson.subject === subject)
        .flatMap((lesson) => lesson.practice)) {
        if (question.type === "choice") counts[question.correctIndex] += 1;
      }
      expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
    }
  });

  it("keeps Learn prompts distinct from every released Grade 4 assessment", async () => {
    const { getQuestions } = await import("@/lib/questions");
    const released = new Set<string>();
    const normalizedReleased = new Set<string>();
    for (let testNumber = 1; testNumber <= 10; testNumber += 1) {
      for (const subject of ["math", "ela"] as const) {
        for (const testType of ["cat", "pt"] as const) {
          for (const question of getQuestions(4, subject, testType, testNumber)) {
            released.add(question.questionText);
            normalizedReleased.add(normalizedPrompt(question.questionText));
          }
        }
      }
    }
    for (const lesson of grade4AlignedLessons) {
      for (const question of lesson.practice) {
        expect(released.has(question.prompt), question.prompt).toBe(false);
        expect(normalizedReleased.has(normalizedPrompt(question.prompt)), question.prompt).toBe(false);
      }
    }
    for (const unit of grade4GuidedUnits) {
      for (const question of unit.steps.flatMap((step) => step.question ? [step.question] : [])) {
        expect(released.has(question.prompt), question.prompt).toBe(false);
        expect(normalizedReleased.has(normalizedPrompt(question.prompt)), question.prompt).toBe(false);
      }
    }
  });
});
