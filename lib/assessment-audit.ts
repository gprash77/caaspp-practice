import sources from '../data/official/grade-4/test-1/sources.json';
import { listAvailableAssessments } from './assessment-manifest';
import { getQuestions } from './questions';
export const auditDate = 'November 14, 2026';
export const officialResourceIndex = sources.resourceIndex;
export const officialAuditSections = sources.sections.map(source => {
  const [, subject, type] = source.id.split('-');
  const questions = getQuestions(4, subject as 'math' | 'ela', type as 'cat' | 'pt', 1);
  return { ...source, points: questions.reduce((sum, item) => sum + item.points, 0), items: questions.map(item => ({
    number: item.official!.itemNumber, page: item.official!.sourcePage,
    adapted: item.official!.fidelity === 'equivalent-approved'
  })) };
});
export const grade4AuditForms = listAvailableAssessments(4);
export const starAlignmentCategories = {
  reading: ['Word knowledge and skills', 'Comprehension strategies and constructing meaning', 'Analyzing literary text', 'Understanding author’s craft', 'Analyzing argument and evaluating text'],
  math: ['Numbers and operations', 'Algebra', 'Geometry and measurement', 'Data analysis, statistics, and probability']
};
