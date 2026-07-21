import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import golden from "../../data/official/grade-4/test-1/golden.json";
import sources from "../../data/official/grade-4/test-1/sources.json";
import { getQuestions, type Question } from "../questions";

export type SectionId = "math-cat" | "math-pt" | "ela-cat" | "ela-pt";
export type EvalIssue = { section?: SectionId; itemId?: number; field: string; message: string };
export type EvalResult = { passed: boolean; errors: EvalIssue[]; warnings: EvalIssue[]; reviewedItems: number };

const sectionParams: Record<SectionId, ["math" | "ela", "cat" | "pt"]> = {
  "math-cat": ["math", "cat"],
  "math-pt": ["math", "pt"],
  "ela-cat": ["ela", "cat"],
  "ela-pt": ["ela", "pt"],
};

function canonicalQuestion(q: Question) {
  return {
    id: q.id,
    questionText: q.questionText,
    options: q.options,
    partAPrompt: q.partAPrompt,
    partAOptions: q.partAOptions,
    partBPrompt: q.partBPrompt,
    partBOptions: q.partBOptions,
    passage: q.passage,
    passageTitle: q.passageTitle,
    passageAuthor: q.passageAuthor,
    studentDirections: q.studentDirections,
    dataTable: q.dataTable,
    gridRows: q.gridRows,
    gridColumns: q.gridColumns,
    correctAnswer: q.correctAnswer,
    rubric: q.rubric,
    points: q.points,
    claim: q.claim,
    domain: q.domain,
    target: q.target,
    dok: q.dok,
    standard: q.standard,
    type: q.type,
    official: q.official,
    stimulusImages: q.stimulusImages,
    responseFields: q.responseFields,
    schedule: q.schedule,
    scoringRule: q.scoringRule,
    audio: q.audio,
  };
}

export function sectionHash(questions: Question[]): string {
  return createHash("sha256").update(JSON.stringify(questions.map(canonicalQuestion))).digest("hex");
}

function serializedKey(question: Question): string {
  return Array.isArray(question.correctAnswer) ? question.correctAnswer.join("|") : question.correctAnswer;
}

function hashFile(filePath: string): string {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

export function evaluateGrade4Test1(overrides: Partial<Record<SectionId, Question[]>> = {}): EvalResult {
  const errors: EvalIssue[] = [];
  const warnings: EvalIssue[] = [];
  let reviewedItems = 0;

  for (const section of Object.keys(sectionParams) as SectionId[]) {
    const [subject, testType] = sectionParams[section];
    const questions = overrides[section] ?? getQuestions(4, subject, testType, 1);
    const expected = golden.sections[section];
    reviewedItems += questions.length;

    if (questions.length !== expected.count) {
      errors.push({ section, field: "count", message: `Expected ${expected.count}; received ${questions.length}.` });
    }
    const points = questions.reduce((sum, question) => sum + question.points, 0);
    if (points !== expected.rawPoints) {
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
      if (question.official?.itemNumber !== index + 1) {
        errors.push({ section, itemId: question.id, field: "official.itemNumber", message: `Expected official item ${index + 1}.` });
      }
      if (question.official?.bankVersion !== golden.bankVersion) {
        errors.push({ section, itemId: question.id, field: "official.bankVersion", message: "Bank version is missing or stale." });
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

  for (const review of golden.stimulusSufficiency) {
    if (review.status !== "exact") {
      warnings.push({ field: `stimulusSufficiency:${review.items}`, message: `${review.status}: ${review.evidence}` });
    }
  }

  if (sources.sections.reduce((sum, source) => sum + source.itemCount, 0) !== 69) {
    errors.push({ field: "sources.itemCount", message: "Pinned source manifest must total 69 items." });
  }

  return { passed: errors.length === 0, errors, warnings, reviewedItems };
}
