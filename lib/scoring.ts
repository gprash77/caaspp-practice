import type { Question, ResponseConstraint } from "./questions";

export function normalizeAnswer(a: string): string {
  return a.trim().toLowerCase().replace(/\s+/g, " ");
}

export function parseNumericExpression(input: string): number | null {
  const vulgarFractions: Record<string, number> = {
    "¼": 1 / 4,
    "½": 1 / 2,
    "¾": 3 / 4,
    "⅓": 1 / 3,
    "⅔": 2 / 3,
    "⅕": 1 / 5,
    "⅖": 2 / 5,
    "⅗": 3 / 5,
    "⅘": 4 / 5,
    "⅙": 1 / 6,
    "⅚": 5 / 6,
    "⅛": 1 / 8,
    "⅜": 3 / 8,
    "⅝": 5 / 8,
    "⅞": 7 / 8,
  };
  const normalized = normalizeAnswer(input).replace(/,/g, "");

  if (/^\d+(\.\d+)?$/.test(normalized)) {
    return Number(normalized);
  }

  if (/^\d+\s*\/\s*\d+$/.test(normalized)) {
    const [numerator, denominator] = normalized.split("/").map((part) => Number(part.trim()));
    if (denominator === 0) return null;
    return numerator / denominator;
  }

  const mixed = normalized.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixed) {
    const denominator = Number(mixed[3]);
    if (denominator === 0) return null;
    return Number(mixed[1]) + Number(mixed[2]) / denominator;
  }

  const vulgar = normalized.match(/^(\d+)?\s*([¼½¾⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])$/);
  if (vulgar) return Number(vulgar[1] ?? 0) + vulgarFractions[vulgar[2]];

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

function validSchedule(question: Question, userAnswer: string | string[]): boolean {
  if (!Array.isArray(userAnswer) || !question.schedule) return false;
  if (userAnswer.length !== question.schedule.activities.length * 2) return false;
  const completeAnswer = [...userAnswer];
  completeAnswer[0] = question.schedule.start;
  completeAnswer[completeAnswer.length - 1] = question.schedule.end;
  const times = completeAnswer.map(parseClockTime);
  if (times.some((time) => time === null)) return false;
  const values = times as number[];
  const expectedStart = parseClockTime(question.schedule.start);
  const expectedEnd = parseClockTime(question.schedule.end);
  if (expectedStart === null || expectedEnd === null) return false;
  if (values[0] !== expectedStart || values.at(-1) !== expectedEnd) return false;
  for (let row = 0; row < question.schedule.activities.length; row += 1) {
    if (values[row * 2 + 1] <= values[row * 2]) return false;
    if (row > 0 && values[row * 2] !== values[row * 2 - 1]) return false;
  }
  const durations = question.schedule.activities.map((_, row) => values[row * 2 + 1] - values[row * 2]);
  const breakIndex = question.schedule.breakActivity
    ? question.schedule.activities.indexOf(question.schedule.breakActivity)
    : -1;
  const lunchIndex = question.schedule.lunchActivity
    ? question.schedule.activities.indexOf(question.schedule.lunchActivity)
    : -1;
  if (breakIndex < 0 || lunchIndex < 0) return false;
  if (durations[breakIndex] < question.schedule.minimumBreakMinutes) return false;
  if (durations[breakIndex] + durations[lunchIndex] !== question.schedule.breakAndLunchMinutes) return false;
  return durations.every((duration, index) =>
    index === breakIndex || index === lunchIndex
      ? true
      : duration >= question.schedule!.minimumActivityMinutes
  );
}

function responseFields(userAnswer: string | string[]): string[] | null {
  return Array.isArray(userAnswer) ? userAnswer : null;
}

function constraintMatches(constraint: ResponseConstraint, userAnswer: string | string[]): boolean {
  const fields = responseFields(userAnswer);
  if (constraint.kind === "all") {
    return constraint.constraints.every((entry) => constraintMatches(entry, userAnswer));
  }
  if (constraint.kind === "any") {
    return constraint.constraints.some((entry) => constraintMatches(entry, userAnswer));
  }
  if (!fields) return false;

  if (constraint.kind === "field-equals") {
    return normalizeAnswer(fields[constraint.index] ?? "") === normalizeAnswer(constraint.value);
  }
  if (constraint.kind === "field-one-of") {
    return constraint.values.some(
      (value) => normalizeAnswer(value) === normalizeAnswer(fields[constraint.index] ?? "")
    );
  }
  if (constraint.kind === "field-number") {
    const value = Number(fields[constraint.index]);
    if (!Number.isFinite(value)) return false;
    if (constraint.integer && !Number.isInteger(value)) return false;
    if (constraint.min !== undefined && value < constraint.min) return false;
    if (constraint.max !== undefined && value > constraint.max) return false;
    if (constraint.endsWith !== undefined && Math.abs(value) % 10 !== constraint.endsWith) return false;
    return true;
  }
  if (constraint.kind === "field-product") {
    const multiplier = Number(fields[constraint.multiplierIndex]);
    const product = Number(fields[constraint.productIndex]);
    return Number.isFinite(multiplier) && Number.isFinite(product) && constraint.factor * multiplier === product;
  }
  if (constraint.kind === "linear-comparison") {
    const values = constraint.terms.map(({ index, coefficient }) => {
      const value = parseNumericExpression(fields[index] ?? "");
      return value === null ? null : coefficient * value;
    });
    if (values.some((value) => value === null)) return false;
    const total = (values as number[]).reduce((sum, value) => sum + value, 0);
    if (constraint.operator === "<=") return total <= constraint.value;
    if (constraint.operator === ">=") return total >= constraint.value;
    if (constraint.operator === "==") return total === constraint.value;
    if (constraint.operator === "<") return total < constraint.value;
    return total > constraint.value;
  }
  if (constraint.kind === "field-unordered-set") {
    const actual = constraint.indexes.map((index) => normalizeAnswer(fields[index] ?? "")).sort();
    const expected = constraint.values.map(normalizeAnswer).sort();
    return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
  }
  if (constraint.kind === "field-factor-list") {
    const number = Number(fields[constraint.numberIndex]);
    const count = Number(fields[constraint.countIndex]);
    if (!Number.isInteger(number) || number < 1 || number > 10 || !Number.isInteger(count)) return false;
    const factors = fields[constraint.factorsIndex]
      ?.split(/[ ,]+/)
      .filter(Boolean)
      .map(Number)
      .sort((a, b) => a - b);
    const expected = Array.from({ length: number }, (_, index) => index + 1).filter((value) => number % value === 0);
    return count === expected.length && factors?.join(",") === expected.join(",") && expected.length % 2 === 1 && number !== 1;
  }
  return false;
}

export function scoreResponse(question: Question, userAnswer: string | string[]): ScoreResult {
  if (isManuallyScored(question)) return result(0, question.points, true);

  if (question.scoringRule?.kind === "schedule" || question.type === "schedule-table") {
    return result(validSchedule(question, userAnswer) ? question.points : 0, question.points);
  }

  if (question.scoringRule?.kind === "constraints") {
    return result(
      constraintMatches(question.scoringRule.constraint, userAnswer) ? question.points : 0,
      question.points
    );
  }

  if (question.scoringRule?.kind === "partial-credit") {
    const awarded = [...question.scoringRule.tiers]
      .sort((left, right) => right.points - left.points)
      .find((tier) => constraintMatches(tier.constraint, userAnswer))?.points ?? 0;
    return result(Math.min(awarded, question.points), question.points);
  }

  if (question.scoringRule?.kind === "unordered-set") {
    if (!Array.isArray(userAnswer)) return result(0, question.points);
    const actual = userAnswer.map(normalizeAnswer).sort();
    const expected = question.scoringRule.acceptedAnswers.map(normalizeAnswer).sort();
    return result(
      actual.length === expected.length && actual.every((value, index) => value === expected[index])
        ? question.points
        : 0,
      question.points
    );
  }

  if (question.scoringRule?.kind === "numeric-equivalent") {
    if (typeof userAnswer !== "string") return result(0, question.points);
    const value = parseNumericExpression(userAnswer);
    const tolerance = question.scoringRule.tolerance ?? 1e-9;
    const valid = value !== null && question.scoringRule.acceptedValues.some(
      (expected) => Math.abs(value - expected) <= tolerance
    );
    return result(valid ? question.points : 0, question.points);
  }

  if (question.scoringRule?.kind === "numeric-range") {
    if (typeof userAnswer !== "string") return result(0, question.points);
    const value = parseNumericExpression(userAnswer);
    if (value === null) return result(0, question.points);
    const rule = question.scoringRule;
    const valid =
      (!rule.integer || Number.isInteger(value)) &&
      (rule.greaterThan === undefined || value > rule.greaterThan) &&
      (rule.lessThan === undefined || value < rule.lessThan) &&
      (rule.min === undefined || value >= rule.min) &&
      (rule.max === undefined || value <= rule.max);
    return result(valid ? question.points : 0, question.points);
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
