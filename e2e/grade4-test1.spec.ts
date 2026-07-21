import { expect, test, type Page } from "@playwright/test";

async function startGrade4(page: Page, label: string) {
  await page.goto("/");
  await page.locator("#grade").selectOption("4");
  await expect(page.locator("#grade")).toHaveValue("4");
  await expect(page.locator("#practiceTest option")).toHaveCount(1);
  await page.getByRole("button").filter({ hasText: label }).click();
  await expect(page).toHaveURL(/grade=4/);
  await expect(page).toHaveURL(/test=1/);
  await expect(page).toHaveURL(/attempt=/);
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

test.describe("Grade 4 Test 1 official baseline", () => {
  test("Grade 4 exposes only Test 1", async ({ page }) => {
    await page.goto("/");
    await page.locator("#grade").selectOption("4");
    await expect(page.locator("#practiceTest option")).toHaveCount(1);
    await expect(page.locator("#practiceTest")).toHaveValue("1");
  });

  test("renders and navigates all 31 Math CAT items", async ({ page }) => {
    await startGrade4(page, "Mathematics — Computer Adaptive Test");
    await reviewEveryRenderedItem(page, 31);
  });

  test("renders and navigates all 5 Math PT items", async ({ page }) => {
    await startGrade4(page, "Mathematics — Performance Task");
    await reviewEveryRenderedItem(page, 5);
    await page.locator(".tds-progress-dots .tds-dot").nth(3).click({ force: true });
    await expect(page.locator(".schedule-table tbody tr")).toHaveCount(5);
    await expect(page.locator(".schedule-table tbody tr th")).toHaveText(["Painting", "Break", "Pottery", "Lunch", "Chalk Art"]);
  });

  test("renders and navigates all 30 ELA CAT items with exact listening transcripts", async ({ page }) => {
    await startGrade4(page, "ELA — Computer Adaptive Test");
    await reviewEveryRenderedItem(page, 30);
    await page.locator(".tds-progress-dots .tds-dot").nth(21).click({ force: true });
    await expect(page.getByRole("heading", { name: "The Telephone Is Born" })).toBeVisible();
    await expect(page.locator(".tds-passage-body")).toContainText("After years of research, the telephone was finally born.");
    await expect(page.locator("audio source")).toHaveAttribute("src", /grade-4\/test-1-the-telephone-is-born\.m4a/);
    await page.locator(".tds-progress-dots .tds-dot").nth(24).click({ force: true });
    await expect(page.locator(".tds-passage-body")).toContainText("Each balloon needs between fifty and seventy wranglers.");
  });

  test("renders all 3 ELA PT items with the complete source set and source images", async ({ page }) => {
    await startGrade4(page, "ELA — Performance Task Segment");
    await reviewEveryRenderedItem(page, 3);
    const passage = page.locator(".tds-passage-body");
    await expect(passage).toContainText("It's a Cold (Hot, Dry, Dark) Cruel World!");
    await expect(passage).toContainText("Animal Architects");
    await expect(passage).toContainText("Don't Step in that Ecosystem!");
    await expect(passage.locator("img")).toHaveCount(3);
  });

  test("supports every new Math interaction family", async ({ page }) => {
    await startGrade4(page, "Mathematics — Computer Adaptive Test");
    const dots = page.locator(".tds-progress-dots .tds-dot");

    await dots.nth(5).click({ force: true });
    await page.locator(".grid-match-checkbox").nth(1).check();
    await expect(page.locator(".grid-match-checkbox").nth(1)).toBeChecked();

    await dots.nth(9).click({ force: true });
    await expect(page.locator(".multi-input-field")).toHaveCount(5);
    await page.locator(".multi-input-field input").nth(0).fill("300");

    await dots.nth(17).click({ force: true });
    await page.locator(".symmetry-canvas").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Vertical line" }).click();
    await expect(page.getByRole("button", { name: "Vertical line" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".symmetry-canvas path")).toHaveCount(2);

    await dots.nth(25).click({ force: true });
    await page.locator(".shade-grid-cell").nth(0).click();
    await expect(page.locator(".shade-grid-cell").nth(0)).toHaveClass(/filled/);

    await dots.nth(29).click({ force: true });
    await expect(page.getByText("You do not need to drag the fruit.")).toBeVisible();
    await expect(page.locator(".multi-input-field input")).toHaveCount(2);
  });

  test("persists answers, flags, and current item across reload", async ({ page }) => {
    await startGrade4(page, "Mathematics — Computer Adaptive Test");
    await page.locator(".number-pad-input").fill("423");
    await page.getByTitle("Flag for Review").click();
    await page.reload();
    await expect(page.locator(".number-pad-input")).toHaveValue("423");
    await expect(page.getByTitle("Flag for Review")).toHaveClass(/active-flag/);
  });

  test("keeps parallel attempts isolated by attempt ID", async ({ browser }) => {
    const context = await browser.newContext();
    const first = await context.newPage();
    const second = await context.newPage();
    await startGrade4(first, "Mathematics — Computer Adaptive Test");
    await startGrade4(second, "Mathematics — Computer Adaptive Test");
    expect(new URL(first.url()).searchParams.get("attempt")).not.toBe(new URL(second.url()).searchParams.get("attempt"));
    await first.locator(".number-pad-input").fill("423");
    await second.reload();
    await expect(second.locator(".number-pad-input")).toHaveValue("");
    await context.close();
  });

  test("results reports official partial credit", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      sessionStorage.setItem("testResults", JSON.stringify({
        grade: 4,
        subject: "math",
        testType: "cat",
        practiceTest: 1,
        attemptId: "partial-credit-check",
        answers: { 40019: ["3", "222"] },
        questionIds: [40019],
      }));
    });
    await page.goto("/results");
    await expect(page.getByText("Partial Credit (1/2)")).toBeVisible();
  });
});
