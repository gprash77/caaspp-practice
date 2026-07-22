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
  if (rowCount >= selection.perRowMax) return false;
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
    const withinRows = rowCounts.every(
      (count) => count >= question.gridSelection!.perRowMin && count <= question.gridSelection!.perRowMax
    );
    const aboveTotalMin = question.gridSelection.totalMin === undefined || answer.length >= question.gridSelection.totalMin;
    const belowTotalMax = question.gridSelection.totalMax === undefined || answer.length <= question.gridSelection.totalMax;
    return withinRows && aboveTotalMin && belowTotalMax;
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
