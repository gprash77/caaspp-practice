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

function buildCombinedElaPtStimulus(sourceQuestions: Question[]): Partial<Question> | undefined {
  const uniqueSourceQuestions = sourceQuestions.filter(
    (question, index, questions) =>
      Boolean(question.passage) &&
      questions.findIndex(
        (candidate) =>
          candidate.passageTitle === question.passageTitle &&
          candidate.passage === question.passage
      ) === index
  );

  if (uniqueSourceQuestions.length < 2) {
    return undefined;
  }

  const combinedPassage = uniqueSourceQuestions
    .map((question) => question.passage)
    .filter(Boolean)
    .join("\n\n---\n\n");

  const combinedTitle = uniqueSourceQuestions
    .map((question) => question.passageTitle)
    .filter(Boolean)
    .join(" / ");

  const combinedAuthor = uniqueSourceQuestions
    .map((question) => question.passageAuthor)
    .filter(
      (author, index, authors): author is string =>
        Boolean(author) && authors.indexOf(author) === index
    )
    .join(" / ");

  return {
    passage: combinedPassage,
    passageTitle: combinedTitle || undefined,
    passageAuthor: combinedAuthor || undefined,
  };
}

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

      const sharedElaPtStimulus =
        subject === "ela" && testType === "pt" && [2, 3].includes(practiceTest)
          ? buildCombinedElaPtStimulus(sourceQuestions)
          : undefined;

      return sourceQuestions
        .slice(0, targetCount(subject, testType))
        .map((question) =>
          ({
            ...question,
            ...(sharedStudentDirections && !question.studentDirections
              ? { studentDirections: sharedStudentDirections }
              : {}),
            ...(sharedElaPtStimulus ?? {}),
          })
        );
    }
  );
}
