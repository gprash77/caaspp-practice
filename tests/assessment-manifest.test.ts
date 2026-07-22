import { describe, expect, it } from "vitest";

import {
  getAssessmentManifest,
  listAvailableAssessments,
  sectionId,
  validateAssessmentManifest,
  type AssessmentManifest,
} from "../lib/assessment-manifest";
import { getQuestions } from "../lib/questions";

describe("assessment manifest", () => {
  it("lists all completed Grade 4 forms", () => {
    expect(listAvailableAssessments(3).map((manifest) => manifest.testNumber)).toEqual(
      Array.from({ length: 18 }, (_, index) => index + 1)
    );
    expect(listAvailableAssessments(4).map((manifest) => manifest.testNumber)).toEqual([1, 2, 3, 4, 5]);
    expect(getAssessmentManifest(4, 2)?.difficulty).toBe("easy");
    expect(getAssessmentManifest(4, 3)?.difficulty).toBe("easy");
    expect(getAssessmentManifest(4, 3, { includeUnavailable: true })?.difficulty).toBe("easy");
    expect(getAssessmentManifest(4, 4)?.difficulty).toBe("medium");
    expect(getAssessmentManifest(4, 5)?.difficulty).toBe("hard");
    expect(getAssessmentManifest(4, 4, { includeUnavailable: true })?.difficulty).toBe("medium");
    expect(getAssessmentManifest(4, 5, { includeUnavailable: true })?.difficulty).toBe("hard");
  });

  it("records the complete Grade 4 Test 1 structure", () => {
    const manifest = getAssessmentManifest(4, 1);
    expect(manifest).toBeDefined();
    expect(manifest?.bankVersion).toBe("2026-07-20.1");
    expect(manifest?.origin).toBe("official-public-practice");
    expect(
      Object.values(manifest!.sections).reduce((sum, section) => sum + section.itemCount, 0)
    ).toBe(69);
    expect(
      Object.values(manifest!.sections).reduce((sum, section) => sum + section.rawPoints, 0)
    ).toBe(81);
  });

  it("matches every available manifest section to its runtime bank", () => {
    for (const manifest of [
      ...listAvailableAssessments(3),
      ...listAvailableAssessments(4),
    ]) {
      for (const subject of ["math", "ela"] as const) {
        for (const testType of ["cat", "pt"] as const) {
          const questions = getQuestions(manifest.grade, subject, testType, manifest.testNumber);
          const expected = manifest.sections[sectionId(subject, testType)];
          expect(questions, `${manifest.title} ${subject}-${testType}`).toHaveLength(
            expected.itemCount
          );
          expect(questions.reduce((sum, question) => sum + question.points, 0)).toBe(
            expected.rawPoints
          );
        }
      }
    }
  });

  it("keeps the same test number isolated by grade", () => {
    expect(getQuestions(3, "math", "cat", 1)[0]?.grade).toBe(3);
    expect(getQuestions(4, "math", "cat", 1)[0]?.grade).toBe(4);
    expect(getQuestions(4, "math", "cat", 2)).toHaveLength(31);
    expect(getQuestions(4, "ela", "pt", 3)).toHaveLength(3);
  });

  it("rejects an exposed manifest with incomplete section metadata", () => {
    const valid = getAssessmentManifest(4, 1)!;
    const invalid = {
      ...valid,
      title: "",
      sections: {
        ...valid.sections,
        "math-cat": { itemCount: 0, rawPoints: 0 },
      },
    } as AssessmentManifest;

    expect(validateAssessmentManifest(valid)).toEqual([]);
    expect(validateAssessmentManifest(invalid).map((issue) => issue.field)).toEqual([
      "title",
      "sections.math-cat.itemCount",
      "sections.math-cat.rawPoints",
    ]);
  });
});
