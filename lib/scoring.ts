import type { Question } from "./questions";

export function normalizeAnswer(a: string): string {
  return a.trim().toLowerCase().replace(/\s+/g, " ");
}

function parseNumericExpression(input: string): number | null {
  const normalized = normalizeAnswer(input);

  if (/^\d+(\.\d+)?$/.test(normalized)) {
    return Number(normalized);
  }

  if (/^\d+\s*\/\s*\d+$/.test(normalized)) {
    const [numerator, denominator] = normalized.split("/").map((part) => Number(part.trim()));
    if (denominator === 0) return null;
    return numerator / denominator;
  }

  return null;
}

export function isManuallyScored(question: Question): boolean {
  return question.type === "short-answer" || question.type === "extended-writing";
}

export function checkAnswer(question: Question, userAnswer: string | string[]): boolean {
  // Manually scored questions can't be auto-graded
  if (isManuallyScored(question)) return false;

  const correct = question.correctAnswer;

  if (question.type === "table-input") {
    if (
      !Array.isArray(userAnswer) ||
      !question.tableColumns?.length ||
      question.tableMinSumExclusive === undefined
    ) {
      return false;
    }

    if (userAnswer.length !== question.tableColumns.length) return false;

    const parsedValues = userAnswer.map((entry) => parseNumericExpression(entry));
    if (parsedValues.some((value) => value === null || value < 0)) {
      return false;
    }

    const values = parsedValues as number[];
    const total = values.reduce((sum, value) => sum + value, 0);
    return total > question.tableMinSumExclusive;
  }

  if (question.type === "shade-grid") {
    if (!Array.isArray(userAnswer) || !question.shadeGrid) return false;
    const unique = new Set(userAnswer);
    return (
      unique.size === question.shadeGrid.requiredCount &&
      userAnswer.length === question.shadeGrid.requiredCount
    );
  }

  if (Array.isArray(correct)) {
    if (question.type === "text-input" && typeof userAnswer === "string") {
      return correct.some((candidate) => normalizeAnswer(candidate) === normalizeAnswer(userAnswer));
    }

    if (!Array.isArray(userAnswer)) return false;
    const sortedCorrect = [...correct].sort();
    const sortedUser = [...userAnswer].sort();
    return (
      sortedCorrect.length === sortedUser.length &&
      sortedCorrect.every((c, i) => normalizeAnswer(c) === normalizeAnswer(sortedUser[i]))
    );
  }

  if (typeof userAnswer === "string") {
    if (question.acceptedAnswers?.length) {
      return question.acceptedAnswers.some(
        (candidate) => normalizeAnswer(candidate) === normalizeAnswer(userAnswer)
      );
    }

    if (question.fractionRange) {
      const userValue = parseNumericExpression(userAnswer);
      const lowerBound = parseNumericExpression(question.fractionRange.greaterThan);
      const upperBound = parseNumericExpression(question.fractionRange.lessThan);

      if (userValue === null || lowerBound === null || upperBound === null) {
        return false;
      }

      return userValue > lowerBound && userValue < upperBound;
    }

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
