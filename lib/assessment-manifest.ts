export type AssessmentSectionId = "math-cat" | "math-pt" | "ela-cat" | "ela-pt";

export interface AssessmentSectionManifest {
  itemCount: number;
  rawPoints: number;
}

export interface AssessmentManifest {
  grade: number;
  testNumber: number;
  title: string;
  origin: "official-public-practice" | "original-companion" | "legacy-practice";
  bankVersion: string;
  responseSchemaVersion: string;
  difficulty: "easy" | "medium" | "hard" | "baseline" | "legacy";
  available: boolean;
  sections: Record<AssessmentSectionId, AssessmentSectionManifest>;
}

export interface ManifestValidationIssue {
  field: string;
  message: string;
}

const GRADE_3_SECTION_TOTALS: Array<
  [mathCatPoints: number, mathPtPoints: number, elaCatPoints: number, elaPtPoints: number]
> = [
  [33, 7, 30, 7],
  [36, 5, 30, 6],
  [36, 5, 30, 6],
  [37, 7, 30, 7],
  [37, 7, 30, 7],
  [37, 7, 30, 7],
  [37, 7, 30, 7],
  [37, 7, 30, 7],
  [37, 7, 30, 7],
  [37, 7, 30, 7],
  [36, 7, 30, 7],
  [36, 7, 30, 7],
  [37, 7, 30, 7],
  [37, 6, 30, 7],
  [40, 8, 43, 8],
  [36, 5, 30, 8],
  [36, 5, 30, 8],
  [36, 5, 30, 8],
];

function grade3Manifest(testNumber: number): AssessmentManifest {
  const [mathCatPoints, mathPtPoints, elaCatPoints, elaPtPoints] =
    GRADE_3_SECTION_TOTALS[testNumber - 1];
  return {
    grade: 3,
    testNumber,
    title: `Grade 3 Practice Test ${testNumber}`,
    origin: "legacy-practice",
    bankVersion: `legacy-grade3-${testNumber}`,
    responseSchemaVersion: "1",
    difficulty: "legacy",
    available: true,
    sections: {
      "math-cat": { itemCount: testNumber === 1 ? 31 : 36, rawPoints: mathCatPoints },
      "math-pt": { itemCount: 5, rawPoints: mathPtPoints },
      "ela-cat": { itemCount: 30, rawPoints: elaCatPoints },
      "ela-pt": { itemCount: 3, rawPoints: elaPtPoints },
    },
  };
}

const grade4Test1: AssessmentManifest = {
  grade: 4,
  testNumber: 1,
  title: "Grade 4 Public Practice Test 1",
  origin: "official-public-practice",
  bankVersion: "2026-07-20.1",
  responseSchemaVersion: "1",
  difficulty: "baseline",
  available: true,
  sections: {
    "math-cat": { itemCount: 31, rawPoints: 32 },
    "math-pt": { itemCount: 5, rawPoints: 6 },
    "ela-cat": { itemCount: 30, rawPoints: 30 },
    "ela-pt": { itemCount: 3, rawPoints: 13 },
  },
};

function plannedGrade4EasyForm(testNumber: 2 | 3): AssessmentManifest {
  return {
    grade: 4,
    testNumber,
    title: `Grade 4 Original Practice Test ${testNumber}`,
    origin: "original-companion",
    bankVersion: "2026-07-22.1",
    responseSchemaVersion: "1",
    difficulty: "easy",
    available: true,
    sections: {
      "math-cat": { itemCount: 31, rawPoints: 32 },
      "math-pt": { itemCount: 5, rawPoints: 6 },
      "ela-cat": { itemCount: 30, rawPoints: 30 },
      "ela-pt": { itemCount: 3, rawPoints: 13 },
    },
  };
}

export const assessmentManifests: readonly AssessmentManifest[] = [
  ...GRADE_3_SECTION_TOTALS.map((_, index) => grade3Manifest(index + 1)),
  grade4Test1,
  plannedGrade4EasyForm(2),
  plannedGrade4EasyForm(3),
];

export function assessmentKey(grade: number, testNumber: number): string {
  return `${grade}:${testNumber}`;
}

const manifestByKey = new Map(
  assessmentManifests.map((manifest) => [assessmentKey(manifest.grade, manifest.testNumber), manifest])
);

export function getAssessmentManifest(
  grade: number,
  testNumber: number,
  options: { includeUnavailable?: boolean } = {}
): AssessmentManifest | undefined {
  const manifest = manifestByKey.get(assessmentKey(grade, testNumber));
  if (!manifest || (!manifest.available && !options.includeUnavailable)) return undefined;
  return manifest;
}

export function listAvailableAssessments(grade: number): AssessmentManifest[] {
  return assessmentManifests
    .filter((manifest) => manifest.grade === grade && manifest.available)
    .sort((a, b) => a.testNumber - b.testNumber);
}

export function sectionId(subject: "math" | "ela", testType: "cat" | "pt"): AssessmentSectionId {
  return `${subject}-${testType}`;
}

export function validateAssessmentManifest(manifest: AssessmentManifest): ManifestValidationIssue[] {
  const issues: ManifestValidationIssue[] = [];
  const requiredSections: AssessmentSectionId[] = ["math-cat", "math-pt", "ela-cat", "ela-pt"];

  if (!manifest.title.trim()) issues.push({ field: "title", message: "Title is required." });
  if (!manifest.bankVersion.trim()) issues.push({ field: "bankVersion", message: "Bank version is required." });
  if (!manifest.responseSchemaVersion.trim()) {
    issues.push({ field: "responseSchemaVersion", message: "Response schema version is required." });
  }

  if (manifest.available) {
    for (const id of requiredSections) {
      const section = manifest.sections[id];
      if (!section) {
        issues.push({ field: `sections.${id}`, message: "Available assessments require every section." });
        continue;
      }
      if (!Number.isInteger(section.itemCount) || section.itemCount <= 0) {
        issues.push({ field: `sections.${id}.itemCount`, message: "Available sections must contain items." });
      }
      if (!Number.isInteger(section.rawPoints) || section.rawPoints <= 0) {
        issues.push({ field: `sections.${id}.rawPoints`, message: "Available sections must award points." });
      }
    }
  }

  return issues;
}
