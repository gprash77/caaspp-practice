import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import type { AssessmentManifest, AssessmentSectionId } from "../assessment-manifest";
import { sectionId, validateAssessmentManifest } from "../assessment-manifest";
import { serializeQuestionBank } from "../bank-identity";
import type { Question } from "../questions";

export type EvalIssue = {
  section?: AssessmentSectionId;
  itemId?: number;
  field: string;
  message: string;
};
export type EvalResult = {
  passed: boolean;
  errors: EvalIssue[];
  warnings: EvalIssue[];
  reviewedItems: number;
};

export interface GoldenBankFixture {
  bankVersion: string;
  sections: Record<AssessmentSectionId, {
    count: number;
    rawPoints: number;
    canonicalSha256: string;
    keys: string[];
  }>;
  stimulusSufficiency?: Array<{ items: string; status: string; evidence: string }>;
}

export interface SourceFixture {
  sections: Array<{ itemCount: number }>;
}

export interface AssessmentEvaluationInput {
  manifest: AssessmentManifest;
  golden: GoldenBankFixture;
  sources?: SourceFixture;
  bankResolver: (
    grade: number,
    subject: "math" | "ela",
    testType: "cat" | "pt",
    testNumber: number
  ) => Question[];
  overrides?: Partial<Record<AssessmentSectionId, Question[]>>;
  requireOfficialProvenance?: boolean;
  requireOriginalProvenance?: boolean;
}

const sectionParams: Record<AssessmentSectionId, ["math" | "ela", "cat" | "pt"]> = {
  "math-cat": ["math", "cat"],
  "math-pt": ["math", "pt"],
  "ela-cat": ["ela", "cat"],
  "ela-pt": ["ela", "pt"],
};

export function sectionHash(questions: Question[]): string {
  return createHash("sha256").update(serializeQuestionBank(questions)).digest("hex");
}

function serializedKey(question: Question): string {
  return Array.isArray(question.correctAnswer) ? question.correctAnswer.join("|") : question.correctAnswer;
}

function hashFile(filePath: string): string {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

export function evaluateAssessmentBank(input: AssessmentEvaluationInput): EvalResult {
  const errors: EvalIssue[] = validateAssessmentManifest(input.manifest).map((issue) => ({
    field: `manifest.${issue.field}`,
    message: issue.message,
  }));
  const warnings: EvalIssue[] = [];
  let reviewedItems = 0;

  if (input.manifest.bankVersion !== input.golden.bankVersion) {
    errors.push({ field: "bankVersion", message: "Manifest and golden fixture bank versions differ." });
  }

  for (const section of Object.keys(sectionParams) as AssessmentSectionId[]) {
    const [subject, testType] = sectionParams[section];
    const questions = input.overrides?.[section] ?? input.bankResolver(
      input.manifest.grade,
      subject,
      testType,
      input.manifest.testNumber
    );
    const expected = input.golden.sections[section];
    const manifestSection = input.manifest.sections[sectionId(subject, testType)];
    reviewedItems += questions.length;

    if (questions.length !== expected.count || questions.length !== manifestSection.itemCount) {
      errors.push({ section, field: "count", message: `Expected ${expected.count}; received ${questions.length}.` });
    }
    const points = questions.reduce((sum, question) => sum + question.points, 0);
    if (points !== expected.rawPoints || points !== manifestSection.rawPoints) {
      errors.push({ section, field: "rawPoints", message: `Expected ${expected.rawPoints}; received ${points}.` });
    }
    const hash = sectionHash(questions);
    if (hash !== expected.canonicalSha256) {
      errors.push({ section, field: "canonicalSha256", message: `Locked content hash mismatch: ${hash}.` });
    }

    questions.forEach((question, index) => {
      const expectedKey = expected.keys[index];
      if (serializedKey(question) !== expectedKey) {
        errors.push({ section, itemId: question.id, field: "correctAnswer", message: `Expected ${expectedKey}; received ${serializedKey(question)}.` });
      }
      if (input.requireOfficialProvenance) {
        if (question.official?.itemNumber !== index + 1) {
          errors.push({ section, itemId: question.id, field: "official.itemNumber", message: `Expected official item ${index + 1}.` });
        }
        if (question.official?.bankVersion !== input.golden.bankVersion) {
          errors.push({ section, itemId: question.id, field: "official.bankVersion", message: "Bank version is missing or stale." });
        }
      }
      if (input.requireOriginalProvenance) {
        const provenance = question.provenance;
        if (!provenance || provenance.origin !== "original") {
          errors.push({ section, itemId: question.id, field: "provenance", message: "Original provenance is missing." });
        } else {
          if (!provenance.sourceId.trim()) errors.push({ section, itemId: question.id, field: "provenance.sourceId", message: "Source ID is required." });
          if (!provenance.author.trim()) errors.push({ section, itemId: question.id, field: "provenance.author", message: "Author is required." });
          if (!provenance.license.trim()) errors.push({ section, itemId: question.id, field: "provenance.license", message: "License is required." });
          if (Number.isNaN(Date.parse(provenance.reviewedAt))) errors.push({ section, itemId: question.id, field: "provenance.reviewedAt", message: "Review date is invalid." });
        }
      }
      if (!question.rubric.trim()) {
        errors.push({ section, itemId: question.id, field: "rubric", message: "Rubric is empty." });
      }
      for (const asset of question.stimulusImages ?? []) {
        const absolutePath = path.join(process.cwd(), "public", asset.src.replace(/^\//, ""));
        if (!existsSync(absolutePath)) {
          errors.push({ section, itemId: question.id, field: "stimulusImages", message: `Missing ${asset.src}.` });
        } else if (hashFile(absolutePath) !== asset.sha256) {
          errors.push({ section, itemId: question.id, field: "stimulusImages.sha256", message: `Asset hash changed for ${asset.src}.` });
        }
      }
      if (question.audio) {
        const absolutePath = path.join(process.cwd(), "public", question.audio.src.replace(/^\//, ""));
        if (!existsSync(absolutePath) || readFileSync(absolutePath).length === 0) {
          errors.push({ section, itemId: question.id, field: "audio", message: `Missing or empty ${question.audio.src}.` });
        }
      }
    });
  }

  for (const review of input.golden.stimulusSufficiency ?? []) {
    if (review.status !== "exact") {
      warnings.push({ field: `stimulusSufficiency:${review.items}`, message: `${review.status}: ${review.evidence}` });
    }
  }

  if (input.sources) {
    const sourceCount = input.sources.sections.reduce((sum, source) => sum + source.itemCount, 0);
    const manifestCount = Object.values(input.manifest.sections).reduce((sum, section) => sum + section.itemCount, 0);
    if (sourceCount !== manifestCount) {
      errors.push({ field: "sources.itemCount", message: `Pinned source manifest must total ${manifestCount} items.` });
    }
  }

  return { passed: errors.length === 0, errors, warnings, reviewedItems };
}
