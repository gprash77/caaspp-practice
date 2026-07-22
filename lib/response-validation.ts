import type { Question } from "./questions";

export function canAddMultiSelection(
  currentSelections: string[],
  selection?: Question["selection"]
): boolean {
  return !selection || currentSelections.length < selection.max;
}

export function canAddGridSelection(
  currentSelections: string[],
  rowIndex: number,
  selection?: Question["gridSelection"]
): boolean {
  if (!selection) return true;
  const rowPrefix = `${rowIndex}:`;
  const rowCount = currentSelections.filter((entry) => entry.startsWith(rowPrefix)).length;
  const rowMaximum = selection.rowSelections?.[rowIndex]?.max ?? selection.perRowMax;
  if (rowCount >= rowMaximum) return false;
  return selection.totalMax === undefined || currentSelections.length < selection.totalMax;
}

export function selectionIsComplete(question: Question, answer: string[]): boolean {
  if (question.type === "multi-select" && question.selection) {
    const validLabels = new Set((question.options ?? []).map((option) => option.label));
    const unique = new Set(answer);
    return (
      unique.size === answer.length &&
      answer.every((entry) => validLabels.has(entry)) &&
      answer.length >= question.selection.min &&
      answer.length <= question.selection.max
    );
  }
  if (question.type === "grid-match" && question.gridSelection) {
    const validKeys = new Set(
      (question.gridRows ?? []).flatMap((_, rowIndex) =>
        (question.gridColumns ?? []).map((__, columnIndex) => `${rowIndex}:${columnIndex}`)
      )
    );
    if (new Set(answer).size !== answer.length || answer.some((entry) => !validKeys.has(entry))) {
      return false;
    }
    const rowCounts = (question.gridRows ?? []).map((_, rowIndex) =>
      answer.filter((entry) => entry.startsWith(`${rowIndex}:`)).length
    );
    const withinRows = rowCounts.every((count, rowIndex) => {
      const rowContract = question.gridSelection!.rowSelections?.[rowIndex];
      const minimum = rowContract?.min ?? question.gridSelection!.perRowMin;
      const maximum = rowContract?.max ?? question.gridSelection!.perRowMax;
      return count >= minimum && count <= maximum;
    });
    const aboveTotalMin = question.gridSelection.totalMin === undefined || answer.length >= question.gridSelection.totalMin;
    const belowTotalMax = question.gridSelection.totalMax === undefined || answer.length <= question.gridSelection.totalMax;
    return withinRows && aboveTotalMin && belowTotalMax;
  }
  if (question.type === "symmetry-line" && question.symmetry) {
    const selections = Array.isArray(answer) ? answer : [answer];
    const unique = new Set(selections);
    const validIds = new Set(question.symmetry.choices.map((choice) => choice.id));
    if (unique.size !== selections.length || selections.some((entry) => !validIds.has(entry))) {
      return false;
    }
    if (selections.includes(question.symmetry.noneChoiceId)) {
      return selections.length === 1;
    }
    const minimum = question.symmetry.minSelections ?? 1;
    const maximum = question.symmetry.maxSelections ?? 1;
    return selections.length >= minimum && selections.length <= maximum;
  }
  return answer.length > 0;
}

export function updateLinePlotStack(
  currentMarks: string[],
  labelIndex: number,
  selectedHeight: number
): string[] {
  const prefix = `${labelIndex}:`;
  const otherColumns = currentMarks.filter((item) => !item.startsWith(prefix));
  const currentCount = currentMarks.filter((item) => item.startsWith(prefix)).length;
  const nextCount = currentCount === selectedHeight ? selectedHeight - 1 : selectedHeight;
  const stackedColumn = Array.from(
    { length: nextCount },
    (_, index) => `${labelIndex}:${index + 1}`
  );
  return [...otherColumns, ...stackedColumn];
}
