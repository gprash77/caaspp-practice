import { expect, test } from '@playwright/test';
import { studyUnits } from '../lib/school-studies';

test('home entry, explanations, saved notebook, navigation, and review marks', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /School Studies/ }).click();
  await expect(page.getByRole('heading', { name: 'Chapter 1 · Separating mixtures' })).toBeVisible();
  await page.screenshot({ path: '/tmp/school-studies-desktop.png', fullPage: true });
  await page.getByRole('button', { name: 'Separate the groups' }).click();
  await expect(page.getByRole('img', { name: /Separated groups/ })).toBeVisible();
  await page.getByRole('button', { name: 'Practice & answers (3)' }).click();
  await page.getByRole('radio', { name: 'The water made new colors.' }).check();
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.getByText('Revisit your idea.')).toBeVisible();
  await page.getByRole('radio', { name: 'The ink contained at least two dyes.' }).check();
  await expect(page.getByText('Revisit your idea.')).not.toBeVisible();
  await page.getByRole('button', { name: 'Check my answer' }).click();
  await expect(page.getByText('Correct — explain why.')).toBeVisible();
  await page.getByRole('textbox', { name: 'Your answer to question 2' }).fill('The yellow dye traveled 3 cm farther.');
  await page.getByRole('button', { name: 'Show model answer & compare' }).first().click();
  await expect(page.getByRole('status').filter({ hasText: /The dyes interacted differently/ })).toBeVisible();
  await page.getByRole('button', { name: 'Mark section reviewed' }).click();
  await page.getByRole('button', { name: 'Next section →' }).click();
  await expect(page.getByRole('heading', { name: 'Chapter 2 · Dissolving and sediment' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Chapter 2 · Dissolving and sediment' })).toBeVisible();
  await page.getByRole('button', { name: /Separating mixtures/ }).click();
  await page.getByRole('button', { name: 'Practice & answers (3)' }).click();
  await expect(page.getByRole('textbox', { name: 'Your answer to question 2' })).toHaveValue('The yellow dye traveled 3 cm farther.');
  await expect(page.getByRole('radio', { name: 'The ink contained at least two dyes.' })).toBeChecked();
  await expect(page.getByRole('button', { name: '✓ Reviewed · undo' })).toBeVisible();
  await page.getByRole('button', { name: '✓ Reviewed · undo' }).click();
  await expect(page.getByRole('button', { name: 'Mark section reviewed' })).toBeVisible();
  await page.getByRole('button', { name: /Inquiry 2 · Up next/ }).click();
  await expect(page.getByRole('heading', { name: '1 · Spanish missions and Native perspectives' })).toBeVisible();
});

test('all shelf sections open and mobile has no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/studies');
  for (const name of [/Unit 1 · Review/, /Unit 3 · Preview/, /Unit 4 · Preview/, /Inquiry 1 · Review/]) {
    await page.getByRole('button', { name }).click();
    await expect(page.getByRole('navigation', { name: 'Lesson sections' })).toBeVisible();
  }
  await page.screenshot({ path: '/tmp/school-studies-mobile.png', fullPage: true });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('button', { name: /Unit 2 · Start here/ }).click();
  await page.getByRole('button', { name: /Home review and design challenge/ }).click();
  await expect(page.getByRole('heading', { name: /Section 4 · Home review/ })).toBeVisible();
});

test('malformed saved progress is safely recovered', async ({ page }) => {
  await page.goto('/studies');
  await page.evaluate(() => localStorage.setItem('school-studies:v1', JSON.stringify({ lesson: 'gone', responses: { bad: 3 }, completed: [null, 2, 'gone'] })));
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Chapter 1 · Separating mixtures' })).toBeVisible();
  await expect(page.getByText('0 of 21 sections marked reviewed')).toBeVisible();
});

 test('every lesson opens with practice and printable model answers', async ({ page }) => {
  await page.goto('/studies');
  for (const unit of studyUnits) {
    await page.getByRole('button', { name: new RegExp(unit.label + ' · ' + unit.status.replace('&', '\\&')) }).click();
    for (const lesson of unit.lessons) {
      await page.getByRole('navigation', { name: 'Lesson sections' }).getByRole('button', { name: new RegExp(lesson.title.split(' · ')[1]) }).click();
      await expect(page.getByRole('heading', { name: lesson.title, exact: true })).toBeVisible();
      await page.getByRole('button', { name: 'Practice & answers (3)' }).click();
      await expect(page.getByRole('textbox')).toHaveCount(2);
      await expect(page.getByRole('radio')).toHaveCount(3);
    }
  }
  await page.emulateMedia({ media: 'print' });
  await expect(page.getByText('Model answer:').first()).toBeVisible();
});
