import { describe, expect, it } from 'vitest';
import { officialAuditSections, grade4AuditForms, starAlignmentCategories } from '../lib/assessment-audit';
import { starForms } from '../lib/star-practice';
import { getQuestions } from '../lib/questions';
import { scoreResponse } from '../lib/scoring';

describe('Parent-facing source evidence', () => {
  it('provides valid page references for every released Test 1 question', () => {
    expect(officialAuditSections).toHaveLength(4);
    expect(officialAuditSections.reduce((sum, source) => sum + source.items.length, 0)).toBe(69);
    expect(officialAuditSections.reduce((sum, source) => sum + source.points, 0)).toBe(81);
    expect(officialAuditSections.map(source => source.pageCount)).toEqual([34, 19, 39, 22]);
    for (const source of officialAuditSections) {
      expect(source.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(source.url).toMatch(/^https:\/\/portal\.smarterbalanced\.org\//);
      source.items.forEach((item, index) => {
        expect(item.number).toBe(index + 1);
        expect(item.page).toBeGreaterThan(0);
        expect(item.page).toBeLessThanOrEqual(source.pageCount);
      });
    }
    expect(grade4AuditForms.filter(form => form.origin === 'official-public-practice')).toHaveLength(1);
    expect(grade4AuditForms.filter(form => form.origin === 'original-companion')).toHaveLength(17);
  });
  it('matches each STAR form to the actual published category labels in the source review', () => {
    for (const form of starForms) {
      expect([...new Set(form.items.map(item => item.domain))].sort()).toEqual([...starAlignmentCategories[form.subject]].sort());
    }
  });
  it('keeps the edited target words and sentence visible in ELA 19–21', () => {
    const questions = getQuestions(4, 'ela', 'cat', 1);
    expect(questions[16].questionText).toContain('hatching itself. [blank], raising frogs');
    expect(questions[16].questionText).not.toContain('Later on, raising frogs');
    for (const i of [18, 19, 20]) {
      expect(questions[i].questionText).toContain('bold');
      expect(questions[i].questionText).toContain('**');
      expect(questions[i].official?.fidelity).toBe('equivalent-approved');
    }
  });
  it('checks the official Math 19 partial-credit rule independently for all one-digit factors', () => {
    const question = getQuestions(4, 'math', 'cat', 1)[18];
    for (let factor = 1; factor <= 9; factor++) for (let product = 102; product <= 9992; product += 10) {
      const validFactor = factor === 4 || factor === 9;
      const expected = validFactor ? product === factor * 178 ? 2 : 1 : 0;
      expect(scoreResponse(question, [String(factor), String(product)]).earnedPoints, `${factor},${product}`).toBe(expected);
    }
  });
});
