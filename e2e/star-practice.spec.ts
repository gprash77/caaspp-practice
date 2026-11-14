import { expect, test } from '@playwright/test';
import { starForms } from '../lib/star-practice';

test('STAR starts from home, saves an unsubmitted choice, pauses, and resumes', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'STAR Reading & Math →' }).click();
  await expect(page.getByRole('heading', { name: 'Choose your test' })).toBeVisible();
  await page.getByRole('button', { name: 'Start 34-question test →' }).click();
  await page.getByRole('radio').nth(2).check();
  await page.getByRole('button', { name: 'Pause · save & exit' }).click();
  await page.reload();
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
