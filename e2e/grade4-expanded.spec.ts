import { expect, test } from '@playwright/test';

test('grade 4 exposes eighteen forms and all three companion levels', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Select Grade').selectOption('4');
  await expect(page.locator('#practiceTest option')).toHaveCount(18);
  for (const [number, difficulty] of [[11, 'Easy'], [13, 'Medium'], [18, 'Hard']] as const) await expect(page.locator('#practiceTest option').filter({ hasText: `Test ${number} (Original · ${difficulty})` })).toHaveCount(1);
});
for (let form = 11; form <= 18; form++) {
  test(`all visible question scaffolds and listening media load in Grade 4 Test ${form}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const [subject, type, count] of [['math', 'cat', 31], ['math', 'pt', 5], ['ela', 'cat', 30], ['ela', 'pt', 2]] as const) {
      await page.goto(`/test?grade=4&subject=${subject}&type=${type}&test=${form}&attempt=expanded-${form}-${subject}-${type}`);
      const dots = page.locator('.tds-progress-dots .tds-dot');
      await expect(dots).toHaveCount(count);
      // Inspect every visible item, including all custom response types.
      for (let index = 0; index < count; index++) {
        await dots.nth(index).click({ force: true });
        await expect(page.locator('.tds-question-text')).not.toBeEmpty();
        if (subject === 'ela' && type === 'cat' && [21, 24].includes(index)) {
          await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.load());
          await expect.poll(() => page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.readyState)).toBeGreaterThanOrEqual(1);
          await expect(page.locator('.tds-passage-body')).not.toBeEmpty();
        }
      }
    }
    expect(errors).toEqual([]);
  });
}
