import { expect, test } from '@playwright/test';
import { createStarSession, starForms, starSessionItems } from '../lib/star-practice';

test('STAR starts from home, saves an unsubmitted choice, pauses, and resumes', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'STAR Reading & Math →' }).click();
  await expect(page.getByRole('heading', { name: 'Choose your test' })).toBeVisible();
  await page.getByLabel('Practice test', { exact: true }).selectOption('reading-1');
  await page.getByRole('button', { name: 'Start 34-question test →' }).click();
  await page.getByRole('radio').nth(2).check();
  await page.getByRole('button', { name: 'Pause · save & exit' }).click();
  await page.reload();
  await page.getByLabel('Practice test', { exact: true }).selectOption('reading-1');
  await page.getByRole('button', { name: 'Resume · 0/34 answered' }).click();
  await expect(page.getByRole('radio').nth(2)).toBeChecked();
  await page.getByRole('button', { name: 'Next →', exact: true }).click();
  await expect(page.getByText('Question 2 of 34', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Pause · save & exit' }).click();
  await page.getByRole('button', { name: 'STAR Math practice' }).click();
  await expect(page.getByRole('button', { name: 'Start 34-question test →' })).toBeVisible();
  const keys = await page.evaluate(() => Object.keys(localStorage));
  expect(keys.filter(key => key.startsWith('caaspp-attempt:'))).toEqual([]);
});

for (const form of starForms) test(`completes and reviews all 34 items in ${form.id} ${form.difficulty}`, async ({ page }) => {
  await page.goto('/star');
  if (form.subject === 'math') await page.getByRole('button', { name: 'STAR Math practice' }).click();
  await page.getByLabel('Practice test', { exact: true }).selectOption(form.id);
  await page.getByRole('button', { name: 'Start 34-question test →' }).click();
  for (const [index, question] of form.items.entries()) {
    await expect(page.getByRole('heading', { name: question.prompt, exact: true })).toBeVisible();
    if (question.passage) await expect(page.getByRole('article', { name: 'Reading passage' })).toContainText(question.title!);
    await page.getByRole('radio').nth(question.answer).check();
    if (form.id === 'reading-1' && index === 10) await page.screenshot({ path: '/tmp/star-reading-desktop.png', fullPage: true });
    await page.getByRole('button', { name: index === 33 ? 'Finish test & view results' : 'Next →', exact: true }).click();
  }
  await expect(page.getByRole('heading', { name: 'Your practice results' })).toBeVisible();
  await expect(page.getByText('34 / 34 correct')).toBeVisible();
  await page.getByRole('button', { name: 'Expand all explanations' }).click();
  await expect(page.getByText(form.items[33].explanation, { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Choose another test' }).click();
  await page.reload();
  if (form.subject === 'math') await page.getByRole('button', { name: 'STAR Math practice' }).click();
  await page.getByLabel('Practice test', { exact: true }).selectOption(form.id);
  await page.getByRole('button', { name: 'View saved results' }).click();
  await expect(page.getByText('34 / 34 correct')).toBeVisible();
});

test('feedback mode teaches and mobile layout fits the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/star');
  await page.getByRole('checkbox', { name: 'Show feedback after each answer in a new attempt' }).check();
  await page.screenshot({ path: '/tmp/star-mobile.png', fullPage: true });
  await page.getByRole('button', { name: 'Start 34-question test →' }).click();
  await page.getByRole('radio').nth(0).check();
  await page.getByRole('button', { name: 'Next →', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Let’s review.');
  await page.getByRole('button', { name: 'Next question →' }).click();
  await expect(page.getByText('Question 2 of 34', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});


for (const subject of ['reading', 'math']) test(`adaptive ${subject} route preserves questions, scores and answer state`, async ({ page }) => {
  await page.goto('/star');
  if (subject === 'math') await page.getByRole('button', { name: 'STAR Math practice' }).click();
  await page.getByRole('button', { name: 'Start 34-question test →' }).click();
  const session = createStarSession(`${subject}-adaptive`, 'check');
  for (let i = 0; i < 34; i++) {
    const item = starSessionItems(session)[i];
    await expect(page.getByRole('heading', { name: item.prompt, exact: true })).toBeVisible();
    if (item.table) await expect(page.getByRole('table')).toContainText(item.table.rows[0][0]);
    if (item.diagram) await expect(page.getByRole('img', { name: /Rectangle, length/ })).toBeVisible();
    await page.getByRole('radio').nth(item.answer).check();
    if (i === 2) {
      await page.getByRole('button', { name: 'Pause · save & exit' }).click();
      await page.reload();
      if (subject === 'math') await page.getByRole('button', { name: 'STAR Math practice' }).click();
      await page.getByRole('button', { name: 'Resume · 2/34 answered' }).click();
      await expect(page.getByRole('radio').nth(item.answer)).toBeChecked();
    }
    await page.getByRole('button', { name: i === 33 ? 'Finish test & view results' : 'Next →', exact: true }).click();
    session.answers.push(item.answer);
  }
  await expect(page.getByText('34 / 34 correct')).toBeVisible();
  await expect(page.getByText('Levels attempted:', { exact: false })).toContainText('medium: 1/1 · hard: 33/33');
  await page.getByRole('button', { name: 'Expand all explanations' }).click();
  await expect(page.getByText(starSessionItems(session)[0].explanation, { exact: true })).toBeVisible();
});

test('practice timer expires, preserves a selected answer, pauses and resumes', async ({ page }) => {
  await page.clock.install();
  await page.goto('/star');
  await page.getByLabel('Practice pacing for a new attempt').selectOption('120');
  await page.getByRole('button', { name: 'Start 34-question test →' }).click();
  await expect(page.getByRole('timer')).toContainText('2:00');
  const first = starSessionItems(createStarSession('reading-adaptive', 'check'))[0];
  await page.getByRole('radio').nth(first.answer).check();
  await page.clock.fastForward('01:50');
  await expect(page.getByRole('timer')).toContainText('0:10');
  await page.getByRole('button', { name: 'Pause · save & exit' }).click();
  await page.clock.fastForward('10:00');
  await page.getByRole('button', { name: 'Resume · 0/34 answered' }).click();
  await expect(page.getByRole('timer')).toContainText('0:10');
  await page.clock.fastForward('00:11');
  await expect(page.getByText('Question 2 of 34', { exact: true })).toBeVisible();
  await page.clock.fastForward('02:01');
  await expect(page.getByText('Question 3 of 34', { exact: true })).toBeVisible();
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('star-practice:grade4:v2')!)['reading-adaptive']);
  expect(saved.answers).toEqual([first.answer, -1]);
  expect(saved.timedOut).toEqual([0, 1]);
});

test('last timed question completes and old records cannot be graded against revised content', async ({ page }) => {
  const session = createStarSession('math-2', 'check', 120);
  const form = starForms.find(form => form.id === 'math-2')!;
  session.answers = form.items.slice(0, 33).map(item => item.answer);
  session.deadline = Date.now() - 1000;
  const legacy = { 'math-2': { formId: 'math-2', mode: 'check', answers: [0], draft: null } };
  await page.addInitScript(({ session, legacy }) => {
    localStorage.setItem('star-practice:grade4:v1', JSON.stringify(legacy));
    localStorage.setItem('star-practice:grade4:v2', JSON.stringify({
      'math-2': session,
      'reading-1': { ...session, formId: 'reading-1', answers: [99] }
    }));
  }, { session, legacy });
  await page.goto('/star');
  await page.getByLabel('Practice test', { exact: true }).selectOption('reading-1');
  await expect(page.getByRole('button', { name: 'Start 34-question test →' })).toBeVisible();
  await page.getByRole('button', { name: 'STAR Math practice' }).click();
  await page.getByLabel('Practice test', { exact: true }).selectOption('math-2');
  await page.getByRole('button', { name: 'Resume · 33/34 answered' }).click();
  await expect(page.getByRole('heading', { name: 'Your practice results' })).toBeVisible();
  await expect(page.getByText('33 / 34 correct')).toBeVisible();
  await page.getByRole('button', { name: 'Expand all explanations' }).click();
  await expect(page.getByText('Your answer: Not answered', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('star-practice:grade4:v1')!))).toEqual(legacy);
});

test('mobile math diagram and table include the complete stimulus without overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const form = starForms.find(form => form.id === 'math-2')!;
  const session = createStarSession('math-2', 'check');
  session.answers = form.items.slice(0, 20).map(item => item.answer);
  await page.addInitScript(session => localStorage.setItem('star-practice:grade4:v2', JSON.stringify({ 'math-2': session })), session);
  await page.goto('/star');
  await page.getByRole('button', { name: 'STAR Math practice' }).click();
  await page.getByLabel('Practice test', { exact: true }).selectOption('math-2');
  await page.getByRole('button', { name: 'Resume · 20/34 answered' }).click();
  await expect(page.getByRole('img', { name: /Rectangle, length 18 cm, width 7 cm/ })).toBeVisible();
  await page.screenshot({ path: '/tmp/star-mobile-diagram.png', fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  for (let i = 20; i < 29; i++) {
    await page.getByRole('radio').nth(form.items[i].answer).check();
    await page.getByRole('button', { name: 'Next →', exact: true }).click();
  }
  await expect(page.getByRole('table')).toContainText('Seedlings planted');
  await expect(page.getByRole('table')).toContainText('27');
  await page.screenshot({ path: '/tmp/star-mobile-table.png', fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});
