import { readingBank } from './star-reading-bank';
import { mathBank } from './star-math-bank';
import { starDifficulties, type StarForm, type StarSubject } from './star-types';
export type { StarForm, StarItem, StarSubject } from './star-types';
export const STAR_EDITION = '2026-11-alignment-2';
export const starForms: StarForm[] = (['reading', 'math'] as const).flatMap(subject => starDifficulties.map((difficulty, level) => ({
  id: `${subject}-${level + 1}`, subject, title: `Test ${level + 1}`, difficulty,
  items: subject === 'reading' ? readingBank(level) : mathBank(level)
})));
export const starChoices = [...starForms, ...(['reading', 'math'] as const).map(subject => ({
  id: `${subject}-adaptive`, subject, title: 'Adaptive practice', difficulty: 'adaptive' as const
}))];
export type StarSession = {
  formId: string; mode: 'learn' | 'check'; answers: number[]; draft: number | null;
  secondsPerItem: 0 | 120 | 180 | 240; remainingSeconds: number; deadline: number | null;
  timedOut: number[];
};
export function createStarSession(formId: string, mode: StarSession['mode'], secondsPerItem: StarSession['secondsPerItem'] = 0, now = Date.now()): StarSession {
  return { formId, mode, answers: [], draft: null, secondsPerItem, remainingSeconds: secondsPerItem,
    deadline: secondsPerItem ? now + secondsPerItem * 1000 : null, timedOut: [] };
}
// A transparent practice staircase, NOT Renaissance's calibrated item-selection model.
// Each slot keeps its skill area; only its level changes. No stimulus repeats within a route.
export function starSessionItems(session: Pick<StarSession, 'formId' | 'answers'>) {
  const fixed = starForms.find(form => form.id === session.formId);
  if (fixed) return fixed.items;
  const subject = session.formId.split('-')[0] as StarSubject;
  const forms = starForms.filter(form => form.subject === subject);
  if (forms.length !== 3) throw new Error('Unknown STAR practice subject');
  let level = 1;
  return Array.from({ length: 34 }, (_, index) => {
    const item = forms[level].items[index];
    if (index < session.answers.length) level = Math.max(0, Math.min(2, level + (session.answers[index] === item.answer ? 1 : -1)));
    return item;
  });
}
export function remainingStarSeconds(session: StarSession, now = Date.now()) {
  return session.deadline === null ? session.remainingSeconds : Math.min(session.secondsPerItem, Math.max(0, Math.ceil((session.deadline - now) / 1000)));
}
export function pauseStarSession(session: StarSession, now = Date.now()): StarSession {
  return { ...session, remainingSeconds: remainingStarSeconds(session, now), deadline: null };
}
export function resumeStarSession(session: StarSession, now = Date.now()): StarSession {
  return session.secondsPerItem && session.deadline === null && session.answers.length < 34
    ? { ...session, deadline: now + session.remainingSeconds * 1000 } : session;
}
export function answerStarSession(session: StarSession, expired = false, now = Date.now()): StarSession {
  if (session.answers.length >= 34 || (!expired && session.draft === null)) return session;
  const answers = [...session.answers, session.draft ?? -1];
  return { ...session, answers, draft: null, remainingSeconds: session.secondsPerItem,
    deadline: session.secondsPerItem && answers.length < 34 && session.mode === 'check' ? now + session.secondsPerItem * 1000 : null,
    timedOut: expired ? [...session.timedOut, answers.length - 1] : session.timedOut };
}
export function isStarSession(value: unknown): value is StarSession {
  if (!value || typeof value !== 'object') return false;
  const c = value as StarSession;
  if (!starChoices.some(form => form.id === c.formId) || !['learn', 'check'].includes(c.mode) || !Array.isArray(c.answers) || c.answers.length > 34) return false;
  return c.answers.every(answer => Number.isInteger(answer) && answer >= -1 && answer < 4)
    && (c.draft === null || Number.isInteger(c.draft) && c.draft >= 0 && c.draft < 4)
    && [0, 120, 180, 240].includes(c.secondsPerItem)
    && Number.isFinite(c.remainingSeconds) && c.remainingSeconds >= 0 && c.remainingSeconds <= c.secondsPerItem
    && (c.deadline === null || Number.isFinite(c.deadline) && c.deadline > 0)
    && Array.isArray(c.timedOut) && new Set(c.timedOut).size === c.timedOut.length
    && c.timedOut.every(i => Number.isInteger(i) && i >= 0 && i < c.answers.length)
    && c.answers.every((answer, i) => answer !== -1 || c.timedOut.includes(i));
}
export function summarizeStar(session: StarSession) {
  const items = starSessionItems(session);
  const domains: Record<string, { correct: number; answered: number; total: number }> = {};
  const levels: Record<string, { correct: number; total: number }> = {};
  let correct = 0;
  items.forEach((question, index) => {
    const domain = domains[question.domain] ??= { correct: 0, answered: 0, total: 0 };
    domain.total++;
    if (index < session.answers.length) {
      domain.answered++;
      const level = levels[question.difficulty] ??= { correct: 0, total: 0 }; level.total++;
      if (session.answers[index] === question.answer) { correct++; domain.correct++; level.correct++; }
    }
  });
  return { correct, answered: session.answers.length, total: items.length, domains, levels };
}
