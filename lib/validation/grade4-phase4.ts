import test6Golden from "../../data/original/grade-4/test-6/golden.json";
import test6Sources from "../../data/original/grade-4/test-6/sources.json";
import test7Golden from "../../data/original/grade-4/test-7/golden.json";
import test7Sources from "../../data/original/grade-4/test-7/sources.json";
import test8Golden from "../../data/original/grade-4/test-8/golden.json";
import test8Sources from "../../data/original/grade-4/test-8/sources.json";
import test9Golden from "../../data/original/grade-4/test-9/golden.json";
import test9Sources from "../../data/original/grade-4/test-9/sources.json";
import test10Golden from "../../data/original/grade-4/test-10/golden.json";
import test10Sources from "../../data/original/grade-4/test-10/sources.json";
import { getAssessmentManifest } from "../assessment-manifest";
import { getQuestions, type Question } from "../questions";
import {
  evaluateAssessmentBank,
  sectionHash,
  type EvalIssue,
  type EvalResult,
  type GoldenBankFixture,
  type SourceFixture,
} from "./assessment-bank";

export type Phase4TestNumber = 6 | 7 | 8 | 9 | 10;
export type SectionId = "math-cat" | "math-pt" | "ela-cat" | "ela-pt";
export type { EvalIssue, EvalResult };
export { sectionHash };

const fixtures = new Map<Phase4TestNumber, { golden: GoldenBankFixture; sources: SourceFixture }>([
  [6, { golden: test6Golden as GoldenBankFixture, sources: test6Sources as SourceFixture }],
  [7, { golden: test7Golden as GoldenBankFixture, sources: test7Sources as SourceFixture }],
  [8, { golden: test8Golden as GoldenBankFixture, sources: test8Sources as SourceFixture }],
  [9, { golden: test9Golden as GoldenBankFixture, sources: test9Sources as SourceFixture }],
  [10, { golden: test10Golden as GoldenBankFixture, sources: test10Sources as SourceFixture }],
]);

export function evaluateGrade4Phase4Test(
  testNumber: Phase4TestNumber,
  overrides: Partial<Record<SectionId, Question[]>> = {}
): EvalResult {
  const manifest = getAssessmentManifest(4, testNumber, { includeUnavailable: true });
  const fixture = fixtures.get(testNumber);
  if (!manifest || !fixture) {
    return {
      passed: false,
      errors: [{ field: "manifest", message: `Grade 4 Test ${testNumber} is unavailable.` }],
      warnings: [],
      reviewedItems: 0,
    };
  }
  return evaluateAssessmentBank({
    manifest,
    golden: fixture.golden,
    sources: fixture.sources,
    bankResolver: (grade, subject, testType, form) =>
      getQuestions(grade, subject, testType, form, { includeUnavailable: true }),
    overrides,
    requireOriginalProvenance: true,
  });
}
