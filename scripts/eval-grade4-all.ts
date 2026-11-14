import { readFileSync } from 'node:fs';
import { getAssessmentManifest, listAvailableAssessments } from '../lib/assessment-manifest';
import { getQuestions } from '../lib/questions';
import { getManualRubric } from '../lib/manual-rubrics';
import { scoreResponse } from '../lib/scoring';
import { evaluateAssessmentBank, type GoldenBankFixture, type SourceFixture } from '../lib/validation/assessment-bank';
import { evaluateGrade4Test1 } from '../lib/validation/grade4-test1';
const baseline = getAssessmentManifest(4, 1)!;
const requested = Number(process.argv[2]);
let failed = false, reviewed = 0;
for (const manifest of listAvailableAssessments(4).filter(form => !requested || form.testNumber === 1 || form.testNumber === requested)) {
  const directory = `data/original/grade-4/test-${manifest.testNumber}`;
  const result = manifest.testNumber === 1 ? evaluateGrade4Test1() : evaluateAssessmentBank({
    manifest,
    golden: JSON.parse(readFileSync(`${directory}/golden.json`, 'utf8')) as GoldenBankFixture,
    sources: JSON.parse(readFileSync(`${directory}/sources.json`, 'utf8')) as SourceFixture,
    bankResolver: getQuestions,
    requireOriginalProvenance: true,
  });
  for (const subject of ['math', 'ela'] as const) for (const type of ['cat', 'pt'] as const) {
    const key = `${subject}-${type}` as const, expected = baseline.sections[key];
    if (manifest.sections[key].itemCount !== expected.itemCount || manifest.sections[key].rawPoints !== expected.rawPoints) result.errors.push({ section: key, field: 'baselineBlueprint', message: 'Section counts or points differ from corrected Test 1.' });
    for (const question of getQuestions(4, subject, type, manifest.testNumber)) {
      if (question.scoringRule?.kind === 'manual-rubric') {
        if (!getManualRubric(4, manifest.testNumber, question.id)) result.errors.push({ section: key, itemId: question.id, field: 'rubric', message: 'Manual scoring rubric is not registered.' });
      } else if (scoreResponse(question, question.correctAnswer).status !== 'correct') result.errors.push({ section: key, itemId: question.id, field: 'scoring', message: 'Authored answer does not receive full credit.' });
      if (question.passage?.includes('[[DATA_TABLE]]') && !question.dataTable) result.errors.push({ section: key, itemId: question.id, field: 'stimulus', message: 'A referenced table is missing.' });
      if (question.audio && !question.audio.transcript && !question.passage) result.errors.push({ section: key, itemId: question.id, field: 'stimulus', message: 'Presentation transcript missing.' });
    }
  }
  result.passed = result.errors.length === 0;
  reviewed += result.reviewedItems;
  failed ||= !result.passed;
  console.log(`Grade 4 Test ${manifest.testNumber}: ${result.passed ? 'PASS' : 'FAIL'} · ${result.reviewedItems} items · ${manifest.difficulty}`);
  for (const issue of result.errors) console.error(JSON.stringify(issue));
  for (const issue of result.warnings) console.warn(`WARNING ${issue.field}: ${issue.message}`);
}
console.log(`${reviewed} runtime items reviewed against locked content, corrected Test 1 blueprint, and scoring registrations.`);
if (failed) process.exitCode = 1;
