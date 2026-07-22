import { expect, test, type Page } from "@playwright/test";

async function startTest2(page: Page, label: string) {
  await page.goto("/");
  await page.locator("#grade").selectOption("4");
  await expect(page.locator("#practiceTest option")).toHaveText([
    "Test 1 (Official Baseline)",
    "Test 2 (Original · Easy)",
    "Test 3 (Original · Easy)",
    "Test 4 (Original · Medium)",
    "Test 5 (Original · Hard)",
  ]);
  await page.locator("#practiceTest").selectOption("2");
  await page.getByRole("button").filter({ hasText: label }).click();
  await expect(page).toHaveURL(/grade=4/);
  await expect(page).toHaveURL(/test=2/);
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

test.describe("Grade 4 Test 2 original easy form", () => {
  test("renders all Math CAT items and high-risk interactions", async ({ page }) => {
    await startTest2(page, "Mathematics — Computer Adaptive Test");
    await reviewEveryRenderedItem(page, 31);
    const dots = page.locator(".tds-progress-dots .tds-dot");

    await dots.nth(6).click({ force: true });
    await page.locator(".tds-option").nth(0).click();
    await page.locator(".tds-option").nth(1).click();
    await page.locator(".tds-option").nth(3).click();
    await expect(page.locator(".tds-option.selected")).toHaveCount(3);

    await dots.nth(23).click({ force: true });
    await expect(page.locator(".grid-match-checkbox")).toHaveCount(12);
    await page.locator(".grid-match-checkbox").nth(0).check();
    await page.locator(".grid-match-checkbox").nth(1).check();
    await expect(page.locator(".grid-match-checkbox").nth(0)).toBeChecked();

    await dots.nth(24).click({ force: true });
    await page.getByRole("button", { name: "Vertical line" }).click();
    await page.getByRole("button", { name: "Horizontal line" }).click();
    await expect(page.getByRole("button", { name: "Vertical line" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("button", { name: "Horizontal line" })).toHaveAttribute("aria-pressed", "true");

    await dots.nth(28).click({ force: true });
    await expect(page.locator(".line-plot-cell")).toHaveCount(12);
    await page.locator(".line-plot-cell").nth(0).click();
    await expect(page.locator(".line-plot-cell.filled")).toHaveCount(3);

    await dots.nth(30).click({ force: true });
    await expect(page.locator(".multi-input-field input")).toHaveCount(3);
  });

  test("renders the complete walking-routes Math PT and constraint response", async ({ page }) => {
    await startTest2(page, "Mathematics — Performance Task");
    await reviewEveryRenderedItem(page, 5);
    await expect(page.locator('figure img[src*="walking-routes.svg"]')).toBeVisible();
    await expect(page.locator(".tds-passage-body")).toContainText("Segment B");
    await page.locator(".tds-progress-dots .tds-dot").nth(4).click({ force: true });
    const fields = page.locator(".multi-input-field input");
    await expect(fields).toHaveCount(3);
    await fields.nth(0).fill("1");
    await fields.nth(1).fill("2");
    await fields.nth(2).fill("1");
  });

  test("renders all ELA CAT items and provides playable transcript-linked audio", async ({ page }) => {
    const failedAssets: string[] = [];
    page.on("response", (response) => {
      if (response.status() >= 400 && /grade-4\/test-2/.test(response.url())) failedAssets.push(response.url());
    });
    await startTest2(page, "ELA — Computer Adaptive Test");
    await reviewEveryRenderedItem(page, 30);
    const dots = page.locator(".tds-progress-dots .tds-dot");

    await dots.nth(21).click({ force: true });
    await expect(page.getByRole("heading", { name: "From Paper Bin to New Paper" })).toBeVisible();
    await expect(page.locator(".tds-passage-body")).toContainText("collect, sort, pulp, clean, form, press, dry, and cut");
    const paperAudio = page.locator("audio");
    await expect(paperAudio.locator("source")).toHaveAttribute("src", /test-2-from-paper-bin-to-new-paper\.m4a/);
    await paperAudio.evaluate((audio: HTMLAudioElement) => audio.load());
    await expect.poll(() => paperAudio.evaluate((audio: HTMLAudioElement) => audio.readyState)).toBeGreaterThan(0);
    await paperAudio.evaluate(async (audio: HTMLAudioElement) => {
      audio.muted = true;
      await audio.play();
      audio.pause();
      audio.currentTime = 0;
    });

    await dots.nth(24).click({ force: true });
    await expect(page.getByRole("heading", { name: "Watching the Moon's Appearance" })).toBeVisible();
    await expect(page.locator(".tds-passage-body")).toContainText("thin bright curve on the right, waxing crescent");
    await expect(page.locator("audio source")).toHaveAttribute("src", /test-2-watching-the-moons-appearance\.m4a/);
    expect(failedAssets).toEqual([]);
  });

  test("uses the Test 2 ELA PT review, forward-only transition, notes, and manual rubric", async ({ page }) => {
    await startTest2(page, "ELA — Performance Task Segment");
    await expect(page.locator(".tds-progress-dots .tds-dot")).toHaveCount(2);
    await expect(page.locator(".tds-passage-body")).toContainText("Learning Beyond Four Walls");
    await expect(page.locator(".tds-passage-body")).toContainText("Harbor View Planning Notes");
    await expect(page.locator(".tds-passage-body")).toContainText("One Year at Maple Point");

    await page.getByTitle("Global Notes").click();
    await page.getByRole("textbox", { name: "Global Notes" }).fill("Compare benefits with access, weather, budget, and upkeep.");
    await page.getByRole("button", { name: "SAVE AND CLOSE" }).click();
    await page.locator(".short-answer-input").fill("Source 1 gives a learning benefit; Source 2 gives an access requirement.");
    await page.locator(".tds-progress-dots .tds-dot").nth(1).click({ force: true });
    for (const index of [0, 4, 5, 8]) await page.locator(".grid-match-checkbox").nth(index).check();
    await page.getByTitle("Review Part 1").click();
    await expect(page.getByTestId("ela-pt-part1-review")).toBeVisible();
    await page.getByRole("button", { name: "CONTINUE TO PART 2" }).click();
    await expect(page.getByTestId("ela-pt-part2-transition")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Global Notes" })).toHaveValue(
      "Compare benefits with access, weather, budget, and upkeep."
    );
    await page.getByRole("button", { name: "BEGIN PART 2" }).click();
    await expect(page.getByTitle("Back")).toBeDisabled();
    await expect(page.locator(".tds-question-text")).toContainText("Harbor View Community Planning Committee");
    await page.locator(".rich-editor-body").fill("Harbor View should add the space only if it funds access, shade, and upkeep. Evidence from Sources 1 and 2 supports these conditions.");
    await page.getByRole("button", { name: "SUBMIT TEST" }).click();
    await expect(page).toHaveURL(/\/results\?attempt=/);
    const firstTask = page.locator(".question-review").first();
    await firstTask.getByLabel("Scorer name").fill("Parent Reviewer");
    await firstTask.getByLabel("Awarded points").fill("2");
    await firstTask.getByRole("button", { name: "SAVE MANUAL SCORE" }).click();
    await expect(firstTask.getByText("Manually Scored (2/2)")).toBeVisible();
  });

  test("keeps the Test 2 PT usable at a narrow viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await startTest2(page, "Mathematics — Performance Task");
    await expect(page.locator(".tds-question-text")).toBeVisible();
    await expect(page.locator('figure img[src*="walking-routes.svg"]')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
