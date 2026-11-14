import { describe, expect, it } from 'vitest';
import { studySources, studyUnits } from '../lib/school-studies';

describe('School Studies content integrity', () => {
  it('keeps the requested sequence and distinguishes a home review from official chapters', () => {
    expect(studyUnits.filter(unit => unit.subject === 'science').map(unit => unit.id)).toEqual(['matter', 'sky', 'earth', 'ecosystems']);
    const matter = studyUnits[0];
    expect(matter.lessons).toHaveLength(4);
    expect(matter.note).toContain('3 chapters');
    expect(matter.lessons[3].title).toContain('Home review');
    for (const unit of studyUnits.filter(unit => ['earth', 'ecosystems'].includes(unit.id))) {
      expect(unit.status).toBe('Preview');
      expect(unit.note).toMatch(/unconfirmed|do not yet confirm/);
    }
  });

  it('provides unique stable response keys, source references, and answerable questions', () => {
    const ids = studyUnits.flatMap(unit => unit.lessons.map(lesson => lesson.id));
    expect(new Set(ids).size).toBe(ids.length);
    for (const unit of studyUnits) {
      expect(unit.sources.length).toBeGreaterThan(0);
      for (const source of unit.sources) expect(studySources[source]?.url).toMatch(/^https:\/\//);
      for (const lesson of unit.lessons) {
        expect(lesson.read.length).toBeGreaterThanOrEqual(2);
        expect(lesson.activity.length).toBeGreaterThan(50);
        expect(lesson.coach.length).toBeGreaterThan(40);
        expect(lesson.questions).toHaveLength(3);
        for (const question of lesson.questions) {
          expect(question.answer.trim()).not.toBe('');
          if (question.choices) {
            expect(Number.isInteger(question.correct)).toBe(true);
            expect(question.correct).toBeGreaterThanOrEqual(0);
            expect(question.correct).toBeLessThan(question.choices.length);
            expect(new Set(question.choices).size).toBe(question.choices.length);
          }
        }
      }
    }
  });
});
