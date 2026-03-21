import type { Question } from "./questions";

export function normalizeAnswer(a: string): string {
  return a.trim().toLowerCase().replace(/\s+/g, " ");
}

export function isManuallyScored(question: Question): boolean {
  return question.type === "short-answer" || question.type === "extended-writing";
}

export function checkAnswer(question: Question, userAnswer: string | string[]): boolean {
  // Manually scored questions can't be auto-graded
  if (isManuallyScored(question)) return false;

  const correct = question.correctAnswer;

  if (Array.isArray(correct)) {
    if (!Array.isArray(userAnswer)) return false;
    const sortedCorrect = [...correct].sort();
    const sortedUser = [...userAnswer].sort();
    return (
      sortedCorrect.length === sortedUser.length &&
      sortedCorrect.every((c, i) => normalizeAnswer(c) === normalizeAnswer(sortedUser[i]))
    );
  }

  if (typeof userAnswer === "string") {
    // For text-input, handle comma-separated answers
    if (correct.includes(",")) {
      const correctParts = correct.split(",").map((s) => normalizeAnswer(s));
      const userParts = userAnswer.split(",").map((s) => normalizeAnswer(s));
      return (
        correctParts.length === userParts.length &&
        correctParts.every((c, i) => c === userParts[i])
      );
    }
    return normalizeAnswer(userAnswer) === normalizeAnswer(correct);
  }

  return false;
}
