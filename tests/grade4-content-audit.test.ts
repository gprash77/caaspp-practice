import { describe, expect, it } from 'vitest';
import { getQuestions } from '../lib/questions';
import { parseNumericExpression, scoreResponse } from '../lib/scoring';

describe('Independent grade 4 content regressions', () => {
  it('offers exactly one equivalent sum in Test 4 item 12', () => {
    const question = getQuestions(4, 'math', 'cat', 4)[11];
    const correctOptions = question.partAOptions!.filter(option => parseNumericExpression(option.text) === 6.5);
    expect(correctOptions.map(option => option.label)).toEqual(['B']);
  });

  it('keeps fractional shares of discrete objects whole across Tests 6–10', () => {
    for (const form of [6, 7, 8, 9, 10]) {
      const question = getQuestions(4, 'math', 'cat', form)[12];
      const total = Number(question.questionText.match(/contains (\d+)/)![1]);
      expect(total % 8).toBe(0);
      const key = question.correctAnswer as string[];
      const keyedValue = Number(question.partAOptions!.find(option => option.label === key[0])!.text);
      expect(keyedValue).toBe(total * 3 / 8);
      expect(Number.isInteger(keyedValue)).toBe(true);
    }
  });

  it('has one correct remainder interpretation, including exact division', () => {
    for (let form = 6; form <= 18; form++) {
      const question = getQuestions(4, 'math', 'cat', form)[5];
      const [, amount, divisor] = question.questionText.match(/^(\d+).*groups of (\d+)/)!;
      const remainder = Number(amount) % Number(divisor);
      const trueChoices = question.partBOptions!.filter(option => {
        const count = option.text.match(/^(\d+) remain/);
        return count ? Number(count[1]) === remainder : option.text === 'There is no remainder.' ? remainder === 0 : option.text.startsWith('One item remains') && remainder === 1;
      });
      expect(trueChoices.map(option => option.label)).toEqual([(question.correctAnswer as string[])[1]]);
    }
  });

  it('scores garden loads against independently totaled shared-table minimums', () => {
    const question = getQuestions(4, 'math', 'pt', 6)[4];
    const rows = question.dataTable!.rows;
    const morningMinimum = rows.reduce((sum, row) => sum + parseInt(String(row.values[1])), 0);
    const afternoonMinimum = rows.reduce((sum, row) => sum + parseInt(String(row.values[2])), 0);
    expect([morningMinimum, afternoonMinimum]).toEqual([34, 26]);
    // Exhaustively compare the scoring rule with the visible physical requirements.
    for (let a = 0; a <= 7; a++) for (let b = 0; b <= 10; b++)
      for (let c = 0; c <= 6; c++) for (let d = 0; d <= 9; d++) {
        const am = 6 * a + 4 * b, pm = 6 * c + 4 * d;
        const valid = am >= morningMinimum && am <= 36 && pm >= afternoonMinimum && pm <= 32 && a + c >= 4 && b + d >= 5;
        expect(scoreResponse(question, [a, b, c, d].map(String)).status === 'correct', `${a},${b},${c},${d}`).toBe(valid);
      }
    expect(scoreResponse(question, ['2', '3', '2', '2']).status).toBe('incorrect');
  });

  it('accepts all plans allowed by visible CAT rules, including counts above ten', () => {
    for (const form of [6, 7, 8, 9, 10]) {
      const question = getQuestions(4, 'math', 'cat', form)[29];
      const [low, high] = question.questionText.match(/from (\d+) through (\d+)/)!.slice(1).map(Number);
      for (let a = 0; a <= 16; a++) for (let b = 0; b <= 16; b++) {
        const valid = a >= 2 && b >= 2 && 3 * a + 2 * b >= low && 3 * a + 2 * b <= high;
        expect(scoreResponse(question, [String(a), String(b)]).status === 'correct', `Test ${form}: ${a},${b}`).toBe(valid);
      }
    }
  });
});
