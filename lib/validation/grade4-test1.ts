import golden from "../../data/official/grade-4/test-1/golden.json";
import sources from "../../data/official/grade-4/test-1/sources.json";
import { getAssessmentManifest } from "../assessment-manifest";
import { getQuestions, type Question } from "../questions";
import {
  evaluateAssessmentBank,
  sectionHash,
  type EvalIssue,
  type EvalResult,
} from "./assessment-bank";

export type SectionId = "math-cat" | "math-pt" | "ela-cat" | "ela-pt";
export type { EvalIssue, EvalResult };
export { sectionHash };

export function evaluateGrade4Test1(
  overrides: Partial<Record<SectionId, Question[]>> = {}
): EvalResult {
  const manifest = getAssessmentManifest(4, 1);
  if (!manifest) {
    return {
      passed: false,
      errors: [{ field: "manifest", message: "Grade 4 Test 1 manifest is unavailable." }],
      warnings: [],
      reviewedItems: 0,
    };
  }
  return evaluateAssessmentBank({
    manifest,
    golden,
    sources,
    bankResolver: getQuestions,
    overrides,
    requireOfficialProvenance: true,
  });
}
