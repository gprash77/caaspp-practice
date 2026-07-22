export type ScorerRole = "parent" | "teacher" | "other";

export interface PointRubricDefinition {
  kind: "points";
  rubricVersion: string;
  maxPoints: number;
}

export interface TraitRubricDefinition {
  kind: "traits";
  rubricVersion: string;
  maxPoints: number;
  traits: Array<{ id: string; label: string; min: number; max: number }>;
}

export type ManualRubricDefinition = PointRubricDefinition | TraitRubricDefinition;

export interface ManualScoreRecord {
  status: "scored";
  rubricVersion: string;
  awardedPoints: number;
  traits?: Record<string, number>;
  noScore?: boolean;
  scorerName: string;
  scorerRole: ScorerRole;
  scoredAt: string;
  comments?: string;
}

export interface ManualScoreInput {
  awardedPoints?: number;
  traits?: Record<string, number>;
  noScore?: boolean;
  scorerName: string;
  scorerRole: ScorerRole;
  scoredAt: string;
  comments?: string;
}

const RUBRICS = new Map<string, ManualRubricDefinition>([
  ["4:1:41101", { kind: "points", rubricVersion: "g4-ela-pt-short-response-v1", maxPoints: 2 }],
  [
    "4:1:41103",
    {
      kind: "traits",
      rubricVersion: "g4-ela-pt-full-write-v1",
      maxPoints: 10,
      traits: [
        { id: "organizationPurpose", label: "Organization/Purpose", min: 0, max: 4 },
        { id: "evidenceElaboration", label: "Evidence/Elaboration", min: 0, max: 4 },
        { id: "conventions", label: "Conventions", min: 0, max: 2 },
      ],
    },
  ],
  ["4:2:42104", { kind: "points", rubricVersion: "g4-t2-walk-route-2pt-v1", maxPoints: 2 }],
  ["4:2:43101", { kind: "points", rubricVersion: "g4-t2-outdoor-evidence-2pt-v1", maxPoints: 2 }],
  [
    "4:2:43103",
    {
      kind: "traits",
      rubricVersion: "g4-t2-opinion-4-4-2-v1",
      maxPoints: 10,
      traits: [
        { id: "organizationPurpose", label: "Organization/Purpose", min: 0, max: 4 },
        { id: "evidenceElaboration", label: "Evidence/Elaboration", min: 0, max: 4 },
        { id: "conventions", label: "Conventions", min: 0, max: 2 },
      ],
    },
  ],
  ["4:3:44104", { kind: "points", rubricVersion: "g4-t3-theater-seating-2pt-v1", maxPoints: 2 }],
  ["4:3:45101", { kind: "points", rubricVersion: "g4-t3-student-news-evidence-2pt-v1", maxPoints: 2 }],
  [
    "4:3:45103",
    {
      kind: "traits",
      rubricVersion: "g4-t3-opinion-4-4-2-v1",
      maxPoints: 10,
      traits: [
        { id: "organizationPurpose", label: "Organization/Purpose", min: 0, max: 4 },
        { id: "evidenceElaboration", label: "Evidence/Elaboration", min: 0, max: 4 },
        { id: "conventions", label: "Conventions", min: 0, max: 2 },
      ],
    },
  ],
  ["4:4:46104", { kind: "points", rubricVersion: "g4-t4-food-pantry-2pt-v1", maxPoints: 2 }],
  ["4:4:47101", { kind: "points", rubricVersion: "g4-t4-lunch-line-evidence-2pt-v1", maxPoints: 2 }],
  [
    "4:4:47103",
    {
      kind: "traits",
      rubricVersion: "g4-t4-opinion-4-4-2-v1",
      maxPoints: 10,
      traits: [
        { id: "organizationPurpose", label: "Organization/Purpose", min: 0, max: 4 },
        { id: "evidenceElaboration", label: "Evidence/Elaboration", min: 0, max: 4 },
        { id: "conventions", label: "Conventions", min: 0, max: 2 },
      ],
    },
  ],
]);

export function getManualRubric(
  grade: number,
  testNumber: number,
  questionId: number
): ManualRubricDefinition | undefined {
  return RUBRICS.get(`${grade}:${testNumber}:${questionId}`);
}

export function createManualScore(
  rubric: ManualRubricDefinition,
  input: ManualScoreInput
): { record?: ManualScoreRecord; errors: string[] } {
  const errors: string[] = [];
  const scorerName = input.scorerName.trim();
  if (!scorerName) errors.push("Scorer name is required.");
  if (!input.scoredAt || Number.isNaN(Date.parse(input.scoredAt))) {
    errors.push("A valid scoring date is required.");
  }

  let awardedPoints = 0;
  let traits: Record<string, number> | undefined;
  if (input.noScore) {
    awardedPoints = 0;
  } else if (rubric.kind === "points") {
    if (!Number.isInteger(input.awardedPoints) || input.awardedPoints! < 0 || input.awardedPoints! > rubric.maxPoints) {
      errors.push(`Awarded points must be a whole number from 0 to ${rubric.maxPoints}.`);
    } else {
      awardedPoints = input.awardedPoints!;
    }
  } else {
    traits = {};
    for (const trait of rubric.traits) {
      const score = input.traits?.[trait.id];
      if (!Number.isInteger(score) || score! < trait.min || score! > trait.max) {
        errors.push(`${trait.label} must be a whole number from ${trait.min} to ${trait.max}.`);
      } else {
        traits[trait.id] = score!;
      }
    }
    awardedPoints = Object.values(traits).reduce((sum, score) => sum + score, 0);
  }

  if (errors.length > 0) return { errors };
  return {
    errors,
    record: {
      status: "scored",
      rubricVersion: rubric.rubricVersion,
      awardedPoints,
      ...(traits ? { traits } : {}),
      ...(input.noScore ? { noScore: true } : {}),
      scorerName,
      scorerRole: input.scorerRole,
      scoredAt: new Date(input.scoredAt).toISOString(),
      ...(input.comments?.trim() ? { comments: input.comments.trim() } : {}),
    },
  };
}
