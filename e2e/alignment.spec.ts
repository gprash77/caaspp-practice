import { expect, test } from '@playwright/test';

test('parent source review is reachable and exposes all 69 official item links', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Sources & accuracy checks →' }).click();
  await expect(page.getByRole('heading', { name: 'See what the tests are based on.' })).toBeVisible();
  await page.getByText('Compare any of the 69 questions with its source page', { exact: true }).click();
  await expect(page.locator('a[href*="#page="]')).toHaveCount(69);
  await expect(page.getByRole('heading', { name: 'How can you check STAR alignment?' })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await page.screenshot({ path: '/tmp/caaspp-alignment-mobile.png', fullPage: true });
});

test('ELA editing targets are visible before answering', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Select Grade').selectOption('4');
  await page.getByRole('button', { name: /ELA — Computer Adaptive Test/ }).click();
  const dots = page.locator('.tds-progress-dots .tds-dot');
  await dots.nth(16).click({ force: true });
  await expect(page.locator('.tds-question-text')).toContainText('hatching itself. [blank], raising frogs');
  await dots.nth(18).click({ force: true });
  await expect(page.locator('.tds-question-text strong')).toHaveText(['there', 'peaks', 'thing', 'crashed']);
  await dots.nth(19).click({ force: true });
  await expect(page.locator('.tds-question-text strong')).toContainText('The girl, working in the store');
  await page.screenshot({ path: '/tmp/caaspp-ela-editing-target.png', fullPage: true });
  await dots.nth(20).click({ force: true });
  await expect(page.locator('.tds-question-text strong')).toHaveText(['uncle', 'City', 'Revolution', 'park']);
  await page.reload();
  await expect(page.locator('.tds-question-text strong')).toHaveText(['uncle', 'City', 'Revolution', 'park']);
});

test('grade selection waits for the page controls to be ready', async ({ page }) => {
  let releaseScripts!: () => void;
  const scriptsReady = new Promise<void>(resolve => { releaseScripts = resolve; });
  await page.route('**/_next/static/**', async route => {
    if (route.request().resourceType() === 'script') await scriptsReady;
    await route.continue();
  });
  try {
    await page.goto('/', { waitUntil: 'commit' });
    await expect(page.getByLabel('Select Grade')).toBeDisabled();
    await expect(page.getByRole('button', { name: /Mathematics — Computer Adaptive Test/ })).toBeDisabled();
  } finally { releaseScripts(); }
  await expect(page.getByLabel('Select Grade')).toBeEnabled();
  await page.getByLabel('Select Grade').selectOption('4');
  await expect(page.locator('#practiceTest option').first()).toHaveText('Test 1 (Official Baseline)');
});
