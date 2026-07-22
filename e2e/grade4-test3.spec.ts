import { expect, test, type Page } from "@playwright/test";

async function startTest3(page: Page, label: string) {
  await page.goto("/");
  await page.locator("#grade").selectOption("4");
  await expect(page.locator("#practiceTest option")).toHaveText([
    "Test 1 (Official Baseline)",
    "Test 2 (Original · Easy)",
    "Test 3 (Original · Easy)",
    "Test 4 (Original · Medium)",
  ]);
  await page.locator("#practiceTest").selectOption("3");
  await page.getByRole("button").filter({ hasText: label }).click();
  await expect(page).toHaveURL(/grade=4/);
  await expect(page).toHaveURL(/test=3/);
  await expect(page.locator(".tds-q-badge")).toHaveText("1");
}

async function reviewEveryRenderedItem(page: Page, expectedCount: number) {
  const dots = page.locator(".tds-progress-dots .tds-dot");
  await expect(dots).toHaveCount(expectedCount);
  for (let index = 0; index < expectedCount; index += 1) {
    await dots.nth(index).click({ force: true });
    await expect(page.locator(".tds-q-badge")).toHaveText(String(index + 1));
    await expect(page.locator(".tds-question-text")).not.toBeEmpty();
  }
}

test.describe("Grade 4 Test 3 original easy form", () => {
  test("uses a clear Exit Test action to return to test selection without submitting", async ({ page }) => {
    await startTest3(page, "Mathematics — Computer Adaptive Test");
    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Your progress is saved automatically");
      await dialog.accept();
    });
    await page.getByTitle("Exit Test").click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { name: "CAASPP Practice Test" })).toBeVisible();
  });

  test("renders all Math CAT items and high-risk interactions", async ({ page }) => {
    await startTest3(page, "Mathematics — Computer Adaptive Test");
    await reviewEveryRenderedItem(page, 31);
    const dots = page.locator(".tds-progress-dots .tds-dot");

    await dots.nth(6).click({ force: true });
    for (const index of [0, 1, 2, 3, 5]) await page.locator(".tds-option").nth(index).click();
    await expect(page.locator(".tds-option.selected")).toHaveCount(5);

    await dots.nth(23).click({ force: true });
    await expect(page.locator(".grid-match-checkbox")).toHaveCount(12);
    await page.locator(".grid-match-checkbox").nth(0).check();
    await page.locator(".grid-match-checkbox").nth(1).check();
    await expect(page.locator(".grid-match-checkbox").nth(0)).toBeChecked();

    await dots.nth(24).click({ force: true });
    await page.getByRole("button", { name: "Vertical line" }).click();
    await expect(page.getByRole("button", { name: "Vertical line" })).toHaveAttribute("aria-pressed", "true");

    await dots.nth(28).click({ force: true });
    await expect(page.locator(".line-plot-cell")).toHaveCount(12);
    await page.locator(".line-plot-cell").nth(0).click();
    await expect(page.locator(".line-plot-cell.filled")).toHaveCount(3);

    await dots.nth(30).click({ force: true });
    await expect(page.locator(".multi-input-field input")).toHaveCount(3);
  });

  test("renders the complete theater Math PT and constraint response", async ({ page }) => {
    await startTest3(page, "Mathematics — Performance Task");
    await reviewEveryRenderedItem(page, 5);
    await expect(page.locator('figure img[src*="theater-seating.svg"]')).toBeVisible();
    await expect(page.locator(".tds-passage-body")).toContainText("Balcony");
    await page.locator(".tds-progress-dots .tds-dot").nth(4).click({ force: true });
    const fields = page.locator(".multi-input-field input");
    await expect(fields).toHaveCount(3);
    await fields.nth(0).fill("4");
    await fields.nth(1).fill("6");
    await fields.nth(2).fill("4");
  });

  test("renders all ELA CAT items and provides playable transcript-linked audio", async ({ page }) => {
    const failedAssets: string[] = [];
    page.on("response", (response) => {
      if (response.status() >= 400 && /grade-4\/test-3/.test(response.url())) failedAssets.push(response.url());
    });
    await startTest3(page, "ELA — Computer Adaptive Test");
    await reviewEveryRenderedItem(page, 30);
    const dots = page.locator(".tds-progress-dots .tds-dot");

    await dots.nth(21).click({ force: true });
    await expect(page.getByRole("heading", { name: "From Cotton Fiber to Cloth" })).toBeVisible();
    await expect(page.locator(".tds-passage-body")).toContainText("carding combs and lines up loose fibers");
    const cottonAudio = page.locator("audio");
    await expect(cottonAudio.locator("source")).toHaveAttribute("src", /test-3-from-cotton-fiber-to-cloth\.m4a/);
    await cottonAudio.evaluate((audio: HTMLAudioElement) => audio.load());
    await expect.poll(() => cottonAudio.evaluate((audio: HTMLAudioElement) => audio.readyState)).toBeGreaterThan(0);
    await cottonAudio.evaluate(async (audio: HTMLAudioElement) => {
      audio.muted = true;
      await audio.play();
      audio.pause();
      audio.currentTime = 0;
    });

    await dots.nth(24).click({ force: true });
    await expect(page.getByRole("heading", { name: "Mapping a Neighborhood with Symbols" })).toBeVisible();
    await expect(page.locator(".tds-passage-body")).toContainText("A green tree means park");
    await expect(page.locator("audio source")).toHaveAttribute("src", /test-3-mapping-a-neighborhood-with-symbols\.m4a/);
    expect(failedAssets).toEqual([]);
  });

  test("uses the Test 3 ELA PT review, forward-only transition, notes, and manual rubric", async ({ page }) => {
    await startTest3(page, "ELA — Performance Task Segment");
    await expect(page.locator(".tds-progress-dots .tds-dot")).toHaveCount(2);
    await expect(page.locator(".tds-passage-body")).toContainText("News Made by Students");
    await expect(page.locator(".tds-passage-body")).toContainText("Planning Requirements");
    await expect(page.locator(".tds-passage-body")).toContainText("One Year of Riverbend Student News");
    await expect(page.locator(".stimulus-table-table")).toBeVisible();

    await page.getByTitle("Global Notes").click();
    await page.getByRole("textbox", { name: "Global Notes" }).fill("Compare benefits with privacy, access, time, and accuracy requirements.");
    await page.getByRole("button", { name: "SAVE AND CLOSE" }).click();
    await page.locator(".short-answer-input").fill("Source 1 explains communication practice; Source 2 requires privacy review.");
    await page.locator(".tds-progress-dots .tds-dot").nth(1).click({ force: true });
    await expect(page.getByRole("note")).toContainText(
      "row 1: exactly 1 (selected 0); row 2: exactly 2 (selected 0); row 3: exactly 1 (selected 0)"
    );
    for (const index of [0, 4, 8]) await page.locator(".grid-match-checkbox").nth(index).check();
    await expect(page.getByTitle("Review Part 1")).toBeVisible();
    await page.getByTitle("Review Part 1").click();
    await expect(page.getByText("Missing selections: row 2 needs 1 more selection.")).toBeVisible();
    await page.getByRole("button", { name: "OK" }).click();
    await page.locator(".grid-match-checkbox").nth(5).check();
    await expect(page.getByRole("note")).toContainText(
      "row 1: exactly 1 (selected 1); row 2: exactly 2 (selected 2); row 3: exactly 1 (selected 1)"
    );
    await page.getByTitle("Review Part 1").click();
    await expect(page.getByTestId("ela-pt-part1-review")).toBeVisible();
    await page.getByRole("button", { name: "CONTINUE TO PART 2" }).click();
    await expect(page.getByTestId("ela-pt-part2-transition")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Global Notes" })).toHaveValue(
      "Compare benefits with privacy, access, time, and accuracy requirements."
    );
    await page.getByRole("button", { name: "BEGIN PART 2" }).click();
    await expect(page.getByTitle("Back")).toBeDisabled();
    await expect(page.getByTitle("Submit")).toBeVisible();
    await expect(page.locator(".tds-question-text")).toContainText("school planning team");
    await page.locator(".rich-editor-body").fill("The school should run a small trial with privacy review and shared access. Sources 1 and 2 explain the benefits and required safeguards.");
    await page.getByRole("button", { name: "SUBMIT TEST" }).click();
    await expect(page).toHaveURL(/\/results\?attempt=/);
    const firstTask = page.locator(".question-review").first();
    await firstTask.getByLabel("Scorer name").fill("Parent Reviewer");
    await firstTask.getByLabel("Awarded points").fill("2");
    await firstTask.getByRole("button", { name: "SAVE MANUAL SCORE" }).click();
    await expect(firstTask.getByText("Manually Scored (2/2)")).toBeVisible();
  });

  test("keeps the Test 3 PT usable at a narrow viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await startTest3(page, "Mathematics — Performance Task");
    await expect(page.locator(".tds-question-text")).toBeVisible();
    await expect(page.locator('figure img[src*="theater-seating.svg"]')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
