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
  return (
    question.type === "short-answer" ||
    question.type === "extended-writing" ||
    question.scoringRule?.kind === "manual-rubric"
  );
}

export interface ScoreResult {
  earnedPoints: number;
  maxPoints: number;
  status: "correct" | "partial" | "incorrect" | "manual";
}

function result(earnedPoints: number, maxPoints: number, manual = false): ScoreResult {
  if (manual) return { earnedPoints: 0, maxPoints, status: "manual" };
  return {
    earnedPoints,
    maxPoints,
    status: earnedPoints === maxPoints ? "correct" : earnedPoints > 0 ? "partial" : "incorrect",
  };
}

function orderedFieldsMatch(question: Question, userAnswer: string | string[]): boolean {
  if (!Array.isArray(userAnswer) || !question.responseFields) return false;
  if (userAnswer.length !== question.responseFields.length) return false;
  return question.responseFields.every((field, index) => {
    const accepted = field.acceptedAnswers ?? [];
    return accepted.some((answer) => normalizeAnswer(answer) === normalizeAnswer(userAnswer[index] ?? ""));
  });
}

function parseClockTime(value: string): number | null {
  const match = normalizeAnswer(value).match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm|a\.m\.|p\.m\.)?$/);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = Number(match[2] ?? "0");
  if (hour > 12 || minute > 59) return null;
  const period = match[3]?.replaceAll(".", "");
  if (period === "pm" && hour < 12) hour += 12;
  if (period === "am" && hour === 12) hour = 0;
  if (!period && hour < 8) hour += 12;
  return hour * 60 + minute;
}

function validArtDaySchedule(question: Question, userAnswer: string | string[]): boolean {
  if (!Array.isArray(userAnswer) || !question.schedule) return false;
  if (userAnswer.length !== question.schedule.activities.length * 2) return false;
  const times = userAnswer.map(parseClockTime);
  if (times.some((time) => time === null)) return false;
  const values = times as number[];
  if (values[0] !== 9 * 60 || values.at(-1) !== 14 * 60) return false;
  for (let row = 0; row < question.schedule.activities.length; row += 1) {
    if (values[row * 2 + 1] <= values[row * 2]) return false;
    if (row > 0 && values[row * 2] !== values[row * 2 - 1]) return false;
  }
  const durations = question.schedule.activities.map((_, row) => values[row * 2 + 1] - values[row * 2]);
  const breakIndex = question.schedule.activities.indexOf("Break");
  const lunchIndex = question.schedule.activities.indexOf("Lunch");
  if (breakIndex < 0 || lunchIndex < 0) return false;
  if (durations[breakIndex] < question.schedule.minimumBreakMinutes) return false;
  if (durations[breakIndex] + durations[lunchIndex] !== question.schedule.breakAndLunchMinutes) return false;
  return durations.every((duration, index) =>
    index === breakIndex || index === lunchIndex
      ? true
      : duration >= question.schedule!.minimumActivityMinutes
  );
}

export function scoreResponse(question: Question, userAnswer: string | string[]): ScoreResult {
  if (isManuallyScored(question)) return result(0, question.points, true);

  if (question.type === "schedule-table") {
    return result(validArtDaySchedule(question, userAnswer) ? question.points : 0, question.points);
  }

  if (question.scoringRule?.kind === "grade4-math-item-10") {
    if (!Array.isArray(userAnswer) || userAnswer.length !== 5) return result(0, question.points);
    const addends = userAnswer.slice(0, 4).map(normalizeAnswer).sort();
    const valid = JSON.stringify(addends) === JSON.stringify(["210", "300", "63", "90"].sort()) && normalizeAnswer(userAnswer[4]) === "663";
    return result(valid ? question.points : 0, question.points);
  }

  if (question.scoringRule?.kind === "grade4-math-item-19") {
    if (!Array.isArray(userAnswer) || userAnswer.length !== 2) return result(0, question.points);
    const multiplier = Number(userAnswer[0]);
    const product = Number(userAnswer[1]);
    if ([4, 9].includes(multiplier) && product === 178 * multiplier) return result(2, question.points);
    const productEndsInTwo = Number.isInteger(product) && product >= 100 && product <= 9999 && product % 10 === 2;
    const multiplierValid = Number.isInteger(multiplier) && multiplier > 0 && multiplier < 10;
    return result(productEndsInTwo && multiplierValid ? 1 : 0, question.points);
  }

  if (question.scoringRule?.kind === "grade4-math-item-20") {
    if (!Array.isArray(userAnswer) || userAnswer.length !== 3) return result(0, question.points);
    const normalizedFactors = userAnswer[2].split(/[ ,]+/).filter(Boolean).map(Number).sort((a, b) => a - b);
    const validFour = userAnswer[0] === "4" && userAnswer[1] === "3" && normalizedFactors.join(",") === "1,2,4";
    const validNine = userAnswer[0] === "9" && userAnswer[1] === "3" && normalizedFactors.join(",") === "1,3,9";
    return result(validFour || validNine ? question.points : 0, question.points);
  }

  if (question.scoringRule?.kind === "grade4-math-item-29") {
    if (!Array.isArray(userAnswer) || userAnswer.length !== 2) return result(0, question.points);
    const partA = Number(userAnswer[0]);
    const partB = Number(userAnswer[1]);
    return result(([0, 1].includes(partA) && partB >= 2 && partB <= 9) ? question.points : 0, question.points);
  }

  if (question.scoringRule?.kind === "grade4-math-item-30") {
    if (!Array.isArray(userAnswer) || userAnswer.length !== 2) return result(0, question.points);
    return result(Number(userAnswer[0]) === 2 && Number(userAnswer[1]) === 4 ? question.points : 0, question.points);
  }

  if (question.type === "multi-input" && question.scoringRule?.kind === "ordered-fields") {
    return result(orderedFieldsMatch(question, userAnswer) ? question.points : 0, question.points);
  }

  return result(checkAnswerLegacy(question, userAnswer) ? question.points : 0, question.points);
}

function checkAnswerLegacy(question: Question, userAnswer: string | string[]): boolean {
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
    const preserveOrder = question.type === "two-part";
    const sortedCorrect = preserveOrder ? [...correct] : [...correct].sort();
    const sortedUser = preserveOrder ? [...userAnswer] : [...userAnswer].sort();
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

export function checkAnswer(question: Question, userAnswer: string | string[]): boolean {
  const score = scoreResponse(question, userAnswer);
  return score.status === "correct";
}
