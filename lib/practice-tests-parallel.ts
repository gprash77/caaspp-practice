import type { Question } from "./questions";
import { practiceTestQuestions } from "./practice-tests-extra";
import { easyPracticeTestQuestions } from "./practice-tests-easy";
import { mediumPracticeTestQuestions } from "./practice-tests-medium";
import { challengePracticeTestQuestions } from "./practice-tests-challenge";

type Subject = "math" | "ela";
type TestType = "cat" | "pt";

type ParallelSource = {
  sourceTest: number;
  step: number;
  offset: number;
};

type ParallelBlueprint = {
  newTest: number;
  difficulty: "easy" | "medium" | "hard";
  mathCat: ParallelSource;
  mathPT: ParallelSource;
  elaCat: ParallelSource;
  elaPT: ParallelSource;
};

const sourcePools: Question[] = [
  ...practiceTestQuestions,
  ...easyPracticeTestQuestions,
  ...mediumPracticeTestQuestions,
  ...challengePracticeTestQuestions,
];

function getSourceQuestions(
  sourceTest: number,
  subject: Subject,
  testType: TestType
): Question[] {
  return sourcePools.filter(
    (q) =>
      q.practiceTest === sourceTest &&
      q.subject === subject &&
      q.testType === testType &&
      q.grade === 3
  );
}

function permuteQuestions<T>(
  items: T[],
  step: number,
  offset: number
): T[] {
  const count = items.length;
  return Array.from({ length: count }, (_, index) => {
    const sourceIndex = (offset + index * step) % count;
    return items[sourceIndex];
  });
}

function makeId(
  practiceTest: number,
  subject: Subject,
  testType: TestType,
  index: number
): number {
  const prefix = practiceTest * 1000;

  if (subject === "math" && testType === "cat") return prefix + index + 1;
  if (subject === "math" && testType === "pt") return prefix + 40 + index;
  if (subject === "ela" && testType === "cat") return prefix + 101 + index;
  return prefix + 150 + index;
}

function cloneSet(
  newTest: number,
  subject: Subject,
  testType: TestType,
  source: ParallelSource
): Question[] {
  const sourceQuestions = getSourceQuestions(source.sourceTest, subject, testType);
  const orderedQuestions = permuteQuestions(
    sourceQuestions,
    source.step,
    source.offset
  );

  return orderedQuestions.map((question, index) => ({
    ...question,
    id: makeId(newTest, subject, testType, index),
    practiceTest: newTest,
  }));
}

const parallelBlueprints: ParallelBlueprint[] = [
  {
    newTest: 11,
    difficulty: "easy",
    mathCat: { sourceTest: 4, step: 5, offset: 2 },
    mathPT: { sourceTest: 5, step: 3, offset: 1 },
    elaCat: { sourceTest: 9, step: 8, offset: 3 },
    elaPT: { sourceTest: 4, step: 3, offset: 1 },
  },
  {
    newTest: 12,
    difficulty: "easy",
    mathCat: { sourceTest: 9, step: 5, offset: 4 },
    mathPT: { sourceTest: 4, step: 3, offset: 2 },
    elaCat: { sourceTest: 5, step: 8, offset: 5 },
    elaPT: { sourceTest: 9, step: 3, offset: 2 },
  },
  {
    newTest: 13,
    difficulty: "medium",
    mathCat: { sourceTest: 6, step: 5, offset: 1 },
    mathPT: { sourceTest: 6, step: 3, offset: 2 },
    elaCat: { sourceTest: 3, step: 8, offset: 4 },
    elaPT: { sourceTest: 6, step: 3, offset: 1 },
  },
  {
    newTest: 14,
    difficulty: "hard",
    mathCat: { sourceTest: 7, step: 5, offset: 3 },
    mathPT: { sourceTest: 8, step: 3, offset: 1 },
    elaCat: { sourceTest: 10, step: 8, offset: 2 },
    elaPT: { sourceTest: 7, step: 3, offset: 2 },
  },
  {
    newTest: 15,
    difficulty: "hard",
    mathCat: { sourceTest: 10, step: 5, offset: 2 },
    mathPT: { sourceTest: 7, step: 3, offset: 1 },
    elaCat: { sourceTest: 8, step: 8, offset: 6 },
    elaPT: { sourceTest: 10, step: 3, offset: 1 },
  },
];

export const parallelPracticeTestQuestions: Question[] = parallelBlueprints.flatMap(
  ({ newTest, mathCat, mathPT, elaCat, elaPT }) => [
    ...cloneSet(newTest, "math", "cat", mathCat),
    ...cloneSet(newTest, "math", "pt", mathPT),
    ...cloneSet(newTest, "ela", "cat", elaCat),
    ...cloneSet(newTest, "ela", "pt", elaPT),
  ]
);
