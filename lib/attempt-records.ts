import type { ElaPtSegmentId } from "./assessment-flow";
import type { ManualScoreRecord } from "./manual-rubrics";
import type { ScoreResult } from "./scoring";

export type StoredAnswer = string | string[];

export interface AttemptRecord {
  attemptId: string;
  grade: number;
  subject: "math" | "ela";
  testType: "cat" | "pt";
  practiceTest: number;
  bankVersion: string;
  bankHash: string;
  responseSchemaVersion: string;
  answers: Record<number, StoredAnswer>;
  flagged: number[];
  currentIndex: number;
  notes?: string;
  segment?: ElaPtSegmentId;
  transitionAccepted?: boolean;
  sourcePackageId?: string;
  sourcePackageVersion?: string;
  startedAt: string;
  updatedAt: string;
}

export interface SubmittedResultRecord {
  attempt: AttemptRecord;
  questionIds: number[];
  objectiveScores: Record<number, ScoreResult>;
  manualScores: Record<number, ManualScoreRecord>;
  submittedAt: string;
}

export function attemptStorageKey(attemptId: string): string {
  return `caaspp-attempt:${attemptId}`;
}

export function resultStorageKey(attemptId: string): string {
  return `caaspp-results:${attemptId}`;
}

export function attemptMatchesBank(
  attempt: Partial<AttemptRecord>,
  expected: Pick<
    AttemptRecord,
    | "grade"
    | "subject"
    | "testType"
    | "practiceTest"
    | "bankVersion"
    | "bankHash"
    | "responseSchemaVersion"
  >
): boolean {
  return (
    attempt.grade === expected.grade &&
    attempt.subject === expected.subject &&
    attempt.testType === expected.testType &&
    attempt.practiceTest === expected.practiceTest &&
    attempt.bankVersion === expected.bankVersion &&
    attempt.bankHash === expected.bankHash &&
    attempt.responseSchemaVersion === expected.responseSchemaVersion
  );
}
