import type { Question } from "./questions";
import { practiceTestQuestions } from "./practice-tests-extra";
import { easyPracticeTestQuestions } from "./practice-tests-easy";
import { mediumPracticeTestQuestions } from "./practice-tests-medium";
import { challengePracticeTestQuestions } from "./practice-tests-challenge";

const legacySourcePools: Question[] = [
  ...practiceTestQuestions,
  ...easyPracticeTestQuestions,
  ...mediumPracticeTestQuestions,
  ...challengePracticeTestQuestions,
];

function targetCount(subject: "math" | "ela", testType: "cat" | "pt"): number {
  if (subject === "math" && testType === "pt") return 5;
  if (subject === "ela" && testType === "cat") return 30;
  if (subject === "ela" && testType === "pt") return 3;
  return 36;
}

export function buildDedicatedPracticeTestQuestions(practiceTest: number): Question[] {
  const sections: Array<{ subject: "math" | "ela"; testType: "cat" | "pt" }> = [
    { subject: "math", testType: "cat" },
    { subject: "math", testType: "pt" },
    { subject: "ela", testType: "cat" },
    { subject: "ela", testType: "pt" },
  ];

  return sections.flatMap(({ subject, testType }) =>
    {
      const sourceQuestions = legacySourcePools
      .filter(
        (question) =>
          question.practiceTest === practiceTest &&
          question.grade === 3 &&
          question.subject === subject &&
          question.testType === testType
      )
      .sort((a, b) => a.id - b.id);

      const sharedStudentDirections =
        subject === "ela" && testType === "pt"
          ? sourceQuestions.find((question) => question.studentDirections)?.studentDirections
          : undefined;

      return sourceQuestions
        .slice(0, targetCount(subject, testType))
        .map((question) =>
          sharedStudentDirections && !question.studentDirections
            ? {
                ...question,
                studentDirections: sharedStudentDirections,
              }
            : question
        );
    }
  );
}
