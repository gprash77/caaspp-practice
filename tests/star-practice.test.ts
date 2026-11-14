import { describe, expect, it } from 'vitest';
import { answerStarSession, createStarSession, isStarSession, pauseStarSession, remainingStarSeconds, resumeStarSession, starForms, starSessionItems, summarizeStar } from '../lib/star-practice';
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
        expect(item.alignment).toBeTruthy();
        if (item.passage) expect(item.passage.split(/\s+/).length).toBeGreaterThan(35);
      }
    }
    expect(ids.size).toBe(204);
  });

  it('computes raw and skill-group results without score inflation from missing answers', () => {
    for (const form of starForms) {
      const answers = form.items.map(item => item.answer);
      const perfect = summarizeStar({ ...createStarSession(form.id, 'check'), answers });
      expect(perfect).toMatchObject({ correct: 34, answered: 34, total: 34 });
      expect(Object.values(perfect.domains).reduce((sum, domain) => sum + domain.total, 0)).toBe(34);
      expect(summarizeStar({ ...createStarSession(form.id, 'check'), answers: [(answers[0] + 1) % 4] })).toMatchObject({ correct: 0, answered: 1, total: 34 });
    }
  });

  it('rejects malformed saved sessions and accepts every full form', () => {
    expect(isStarSession({ formId: 'missing', mode: 'check', answers: [], draft: null })).toBe(false);
    expect(isStarSession({ ...createStarSession('math-1', 'check'), answers: [-1] })).toBe(false);
    expect(isStarSession({ ...createStarSession('math-1', 'check'), answers: Array(35).fill(0) })).toBe(false);
    expect(isStarSession({ ...createStarSession('math-1', 'check'), draft: 4 })).toBe(false);
    for (const form of starForms) expect(isStarSession({ ...createStarSession(form.id, 'check'), answers: form.items.map(item => item.answer) })).toBe(true);
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


describe('STAR source alignment and adaptive routes', () => {
  it('covers each published category and keeps one standalone stimulus per slot', () => {
    for (const form of starForms) {
      const domains = new Set(form.items.map(item => item.domain));
      expect(domains.size).toBe(form.subject === 'reading' ? 5 : 4);
      if (form.subject === 'reading') {
        const passages = form.items.flatMap(item => item.passage ? [item.passage] : []);
        expect(passages).toHaveLength(24);
        expect(new Set(passages).size).toBe(24);
        expect(form.items.slice(0, 10).every(item => item.prompt.includes('___'))).toBe(true);
      } else {
        expect(form.items.filter(item => item.table)).toHaveLength(2);
        expect(form.items.filter(item => item.diagram)).toHaveLength(1);
      }
    }
  });

  it('starts at Medium, moves up after correct and down after wrong, and retains past items', () => {
    for (const subject of ['reading', 'math']) {
      let session = createStarSession(`${subject}-adaptive`, 'check');
      const first = starSessionItems(session)[0];
      expect(first.difficulty).toBe('medium');
      session = answerStarSession({ ...session, draft: first.answer });
      expect(starSessionItems(session)[0].id).toBe(first.id);
      expect(starSessionItems(session)[1].difficulty).toBe('hard');
      const second = starSessionItems(session)[1];
      session = answerStarSession({ ...session, draft: (second.answer + 1) % 4 });
      expect(starSessionItems(session)[2].difficulty).toBe('medium');
      session = answerStarSession({ ...session, draft: (starSessionItems(session)[2].answer + 1) % 4 });
      expect(starSessionItems(session)[3].difficulty).toBe('easy');
      for (let i = 3; i < 34; i++) session = answerStarSession({ ...session, draft: (starSessionItems(session)[i].answer + 1) % 4 });
      expect(starSessionItems(session).at(-1)!.difficulty).toBe('easy');
      expect(new Set(starSessionItems(session).map(item => item.id)).size).toBe(34);
      expect(summarizeStar(session)).toMatchObject({ total: 34, correct: 1, answered: 34 });
      expect(isStarSession(session)).toBe(true);
    }
  });

  it('completes a perfect adaptive route without repeating a passage or losing the ceiling', () => {
    for (const subject of ['reading', 'math']) {
      let session = createStarSession(`${subject}-adaptive`, 'check');
      for (let i = 0; i < 34; i++) session = answerStarSession({ ...session, draft: starSessionItems(session)[i].answer });
      expect(summarizeStar(session)).toMatchObject({ correct: 34, answered: 34 });
      expect(starSessionItems(session).at(-1)!.difficulty).toBe('hard');
      const passages = starSessionItems(session).flatMap(item => item.passage ? [item.passage] : []);
      expect(new Set(passages).size).toBe(passages.length);
      expect(answerStarSession({ ...session, draft: 0 })).toMatchObject({ answers: session.answers });
    }
  });

  it('preserves a timer across pause and reload, submits selected answers on expiry and records blanks', () => {
    const timed = createStarSession('math-adaptive', 'check', 120, 1000);
    const paused = pauseStarSession(timed, 31000);
    expect(remainingStarSeconds(paused, 999000)).toBe(90);
    const resumed = resumeStarSession(paused, 500000);
    expect(remainingStarSeconds(resumed, 510000)).toBe(80);
    expect(remainingStarSeconds(JSON.parse(JSON.stringify(resumed)), 600000)).toBe(0);
    const firstAnswer = starSessionItems(timed)[0].answer;
    const selected = answerStarSession({ ...timed, draft: firstAnswer }, true, 121000);
    expect(selected.answers).toEqual([firstAnswer]);
    expect(selected.timedOut).toEqual([0]);
    expect(summarizeStar(selected).correct).toBe(1);
    const blank = answerStarSession(selected, true, 241000);
    expect(blank.answers).toEqual([firstAnswer, -1]);
    expect(blank.timedOut).toEqual([0, 1]);
    expect(isStarSession(blank)).toBe(true);
    expect(isStarSession({ ...blank, timedOut: [] })).toBe(false);
    expect(isStarSession({ ...timed, remainingSeconds: 121 })).toBe(false);
    expect(isStarSession({ ...timed, secondsPerItem: -1 })).toBe(false);
    expect(isStarSession({ ...timed, deadline: Infinity })).toBe(false);
    expect(answerStarSession(timed)).toEqual(timed);
  });

  it('keeps feedback time separate from the next question timer', () => {
    const session = answerStarSession({ ...createStarSession('reading-1', 'learn', 120, 1000), draft: 0 }, false, 2000);
    expect(session.deadline).toBeNull();
    expect(remainingStarSeconds(session, 900000)).toBe(120);
    expect(remainingStarSeconds(resumeStarSession(session, 900000), 901000)).toBe(119);
  });

  it('checks representative mathematical answers against independent worked values', () => {
    const keys: Record<string, string> = {
      'math-1-5': '56', 'math-2-5': '864', 'math-3-5': '8928',
      'math-3-6': '63', 'math-3-8': '17/12', 'math-2-9': '2 1/2', 'math-3-9': '1 5/6',
      'math-3-10': '3.845', 'math-3-11': '1/2', 'math-2-16': '54',
      'math-3-21': '50', 'math-3-22': '33', 'math-2-24': '265',
      'math-3-25': '94', 'math-3-26': '65°', 'math-3-29': '160',
      'math-2-30': '60', 'math-3-30': '30', 'math-3-31': '12', 'math-3-33': '52', 'math-3-34': '9'
    };
    for (const [id, expected] of Object.entries(keys)) {
      const item = starForms.flatMap(form => form.items).find(item => item.id === id)!;
      expect(item.options[item.answer], id).toBe(expected);
    }
  });
});
