export type StarSubject = 'reading' | 'math';
export type StarDifficulty = 'easy' | 'medium' | 'hard';
export type StarItem = {
  id: string; skill: string; domain: string; prompt: string; passage?: string; title?: string;
  options: string[]; answer: number; explanation: string; tip: string;
  difficulty: StarDifficulty; alignment: string;
  table?: { headers: string[]; rows: string[][] };
  diagram?: { kind: 'rectangle'; length: number; width: number; unit: string };
};
export type StarForm = { id: string; subject: StarSubject; title: string; difficulty: StarDifficulty; items: StarItem[] };
export const starDifficulties = ['easy', 'medium', 'hard'] as const;
export function rotateStarItem(item: StarItem, offset: number): StarItem {
  const shift = offset % 4;
  return { ...item, options: [...item.options.slice(shift), ...item.options.slice(0, shift)], answer: (item.answer - shift + 4) % 4 };
}
