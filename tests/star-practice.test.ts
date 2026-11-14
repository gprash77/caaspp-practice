import { describe, expect, it } from 'vitest';
import { isStarSession, starForms, summarizeStar } from '../lib/star-practice';
import { parseNumericExpression } from '../lib/scoring';

describe('Full-length STAR companion practice', () => {
  it('provides six complete forms with unique items and valid answer keys', () => {
    expect(starForms).toHaveLength(6);
    const ids = new Set<string>();
    for (const subject of ['math', 'reading']) {
      expect(starForms.filter(form => form.subject === subject).map(form => form.difficulty)).toEqual(['easy', 'medium', 'hard']);
    }
    for (const form of starForms) {
      expect(form.items).toHaveLength(34);
      for (const item of form.items) {
        expect(ids.has(item.id)).toBe(false); ids.add(item.id);
        expect(item.options).toHaveLength(4);
        expect(new Set(item.options).size).toBe(4);
        expect(item.options[item.answer]).toBeTruthy();
        expect(item.explanation.trim()).not.toBe('');
        if (['Literary reading', 'Informational reading'].includes(item.domain)) expect(item.passage!.split(' ').length).toBeGreaterThan(60);
      }
    }
    expect(ids.size).toBe(204);
  });

  it('computes raw and skill-group results without score inflation from missing answers', () => {
    for (const form of starForms) {
      const answers = form.items.map(item => item.answer);
      const perfect = summarizeStar({ formId: form.id, mode: 'check', answers, draft: null });
      expect(perfect).toMatchObject({ correct: 34, answered: 34, total: 34 });
      expect(Object.values(perfect.domains).reduce((sum, domain) => sum + domain.total, 0)).toBe(34);
      expect(summarizeStar({ formId: form.id, mode: 'check', answers: [(answers[0] + 1) % 4], draft: null })).toMatchObject({ correct: 0, answered: 1, total: 34 });
    }
  });

  it('rejects malformed saved sessions and accepts every full form', () => {
    expect(isStarSession({ formId: 'missing', mode: 'check', answers: [], draft: null })).toBe(false);
    expect(isStarSession({ formId: 'math-1', mode: 'check', answers: [-1], draft: null })).toBe(false);
    expect(isStarSession({ formId: 'math-1', mode: 'check', answers: Array(35).fill(0), draft: null })).toBe(false);
    expect(isStarSession({ formId: 'math-1', mode: 'check', answers: [], draft: 4 })).toBe(false);
    for (const form of starForms) expect(isStarSession({ formId: form.id, mode: 'check', answers: form.items.map(item => item.answer), draft: null })).toBe(true);
  });

  it('has exactly one numerically equivalent answer when the keyed answer is numeric', () => {
    for (const form of starForms.filter(form => form.subject === 'math')) for (const item of form.items) {
      const correct = parseNumericExpression(item.options[item.answer]);
      if (correct === null) continue;
      const equalChoices = item.options.filter(option => { const value = parseNumericExpression(option); return value !== null && Math.abs(value - correct) < 1e-9; });
      expect(equalChoices, item.id).toHaveLength(1);
    }
  });
});
