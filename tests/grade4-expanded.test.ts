import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getAssessmentManifest, listAvailableAssessments } from '../lib/assessment-manifest';
import { getQuestions } from '../lib/questions';
import { getManualRubric } from '../lib/manual-rubrics';
import { getElaPtFlow } from '../lib/assessment-flow';
import { scoreResponse } from '../lib/scoring';
import { evaluateAssessmentBank, type GoldenBankFixture } from '../lib/validation/assessment-bank';

describe('Grade 4 complete 18-form release', () => {
  it('matches corrected Test 1 counts and points across all 1,242 items', () => {
    const ids = new Set<number>(), baseline = getAssessmentManifest(4, 1)!;
    expect(listAvailableAssessments(4)).toHaveLength(18);
    for (const manifest of listAvailableAssessments(4)) for (const subject of ['math', 'ela'] as const) for (const type of ['cat', 'pt'] as const) {
      const questions = getQuestions(4, subject, type, manifest.testNumber), expected = baseline.sections[`${subject}-${type}`];
      expect(questions).toHaveLength(expected.itemCount);
      expect(questions.reduce((sum, question) => sum + question.points, 0)).toBe(expected.rawPoints);
      for (const question of questions) {
        expect(ids.has(question.id)).toBe(false); ids.add(question.id);
        if (question.scoringRule?.kind === 'manual-rubric') expect(getManualRubric(4, manifest.testNumber, question.id)?.maxPoints).toBe(question.points);
        else expect(scoreResponse(question, question.correctAnswer).status, String(question.id)).toBe('correct');
      }
    }
    expect(ids.size).toBe(1242);
  });
  for (let test = 11; test <= 18; test++) {
    it(`passes locked-content, media, and two-part writing checks for Test ${test}`, () => {
      const manifest = getAssessmentManifest(4, test)!;
      expect(manifest.difficulty).toBe(test <= 12 ? 'easy' : test <= 15 ? 'medium' : 'hard');
      const golden = JSON.parse(readFileSync(`data/original/grade-4/test-${test}/golden.json`, 'utf8')) as GoldenBankFixture;
      expect(evaluateAssessmentBank({ manifest, golden, bankResolver: getQuestions, requireOriginalProvenance: true })).toMatchObject({ passed: true, errors: [], reviewedItems: 69 });
      const cat = getQuestions(4, 'ela', 'cat', test), pt = getQuestions(4, 'ela', 'pt', test);
      expect(getElaPtFlow(4, test)).toMatchObject({ part1ItemIds: pt.slice(0, 2).map(q => q.id), part2ItemIds: [pt[2].id] });
      expect(new Set(cat.filter(q => q.audio).map(q => q.audio!.src)).size).toBe(2);
      for (const question of cat.filter(q => q.audio)) {
        expect(question.audio!.transcript).toBe(question.passage);
        expect(existsSync(`public${question.audio!.src}`)).toBe(true);
        expect(readFileSync(`public${question.audio!.src}`).length).toBeGreaterThan(10000);
      }
      const math = getQuestions(4, 'math', 'cat', test);
      const total = Number(math[12].questionText.match(/contains (\d+)/)![1]);
      expect(total % 8).toBe(0);
      const divisor = Number(math[5].questionText.match(/groups of (\d+)/)![1]);
      expect(divisor).toBeLessThanOrEqual(9);
      expect(new Set(math[0].partAOptions!.map(option => option.text)).size).toBe(4);
      const model = getQuestions(4, 'math', 'pt', test)[4];
      const [a, b, c, d] = (model.correctAnswer as string[]).map(Number);
      const setup = model.studentDirections!;
      const weights = [...setup.matchAll(/mass (\d+) kg|package (\d+) kg/g)].map(match => Number(match[1] ?? match[2]));
      const rows = model.dataTable!.rows;
      const am = rows.reduce((sum, row) => sum + parseInt(String(row.values[1])), 0);
      const pm = rows.reduce((sum, row) => sum + parseInt(String(row.values[2])), 0);
      expect(a * weights[0] + b * weights[1]).toBeGreaterThanOrEqual(am);
      expect(c * weights[0] + d * weights[1]).toBeGreaterThanOrEqual(pm);
    });
  }
});
