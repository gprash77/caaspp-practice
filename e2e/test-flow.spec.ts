import { test, expect } from "@playwright/test";

test.describe("Math CAT test flow", () => {
  test("loads questions and shows question 1", async ({ page }) => {
    await page.goto("/test?grade=3&subject=math&type=cat&test=1");
    // Wait for questions to load
    await expect(page.locator(".tds-q-badge")).toHaveText("1");
    await expect(page.locator(".tds-question-text")).toBeVisible();
  });

  test("can answer a multiple-choice question and advance", async ({ page }) => {
    await page.goto("/test?grade=3&subject=math&type=cat&test=1");
    await expect(page.locator(".tds-q-badge")).toHaveText("1");

    // Q1 is text-input, type in the number pad input
    const numberInput = page.locator(".number-pad-input");
    await numberInput.fill("52");

    // Click Next
    await page.locator(".tds-icon-label", { hasText: "Next" }).click();

    // Should advance to question 2
    await expect(page.locator(".tds-q-badge")).toHaveText("2");
  });

  test("shows attention dialog when trying to advance without answering", async ({ page }) => {
    await page.goto("/test?grade=3&subject=math&type=cat&test=1");
    await expect(page.locator(".tds-q-badge")).toHaveText("1");

    // Try to advance without answering
    await page.locator(".tds-icon-label", { hasText: "Next" }).click();

    // Attention dialog should appear
    await expect(page.getByText("Attention")).toBeVisible();
    await expect(page.getByText("Please answer question 1")).toBeVisible();

    // Dismiss it
    await page.getByRole("button", { name: "OK" }).click();
    await expect(page.getByText("Attention")).not.toBeVisible();
  });

  test("can click option for multiple-choice question", async ({ page }) => {
    await page.goto("/test?grade=3&subject=math&type=cat&test=1");

    // Answer Q1-Q3 (text-input) to reach Q4 (multiple-choice)
    await page.locator(".number-pad-input").fill("52");
    await page.locator(".tds-icon-label", { hasText: "Next" }).click();

    await page.locator(".number-pad-input").fill("809");
    await page.locator(".tds-icon-label", { hasText: "Next" }).click();

    await page.locator(".number-pad-input").fill("15");
    await page.locator(".tds-icon-label", { hasText: "Next" }).click();

    // Q4 is multiple-choice - click an option
    const options = page.locator(".tds-option");
    await expect(options.first()).toBeVisible();
    await options.first().click();

    // It should be selected
    await expect(options.first()).toHaveClass(/selected/);
  });

  test("progress bar updates as questions are answered", async ({ page }) => {
    await page.goto("/test?grade=3&subject=math&type=cat&test=1");

    // Initially 0%
    const progressText = page.locator(".tds-progress-text");
    await expect(progressText).toContainText("0%");

    // Answer Q1 and advance
    await page.locator(".number-pad-input").fill("52");
    await page.locator(".tds-icon-label", { hasText: "Next" }).click();

    // Should show some progress now
    await expect(progressText).not.toContainText("0%");
  });

  test("Back button works", async ({ page }) => {
    await page.goto("/test?grade=3&subject=math&type=cat&test=1");

    // Answer Q1 and go to Q2
    await page.locator(".number-pad-input").fill("52");
    await page.locator(".tds-icon-label", { hasText: "Next" }).click();
    await expect(page.locator(".tds-q-badge")).toHaveText("2");

    // Go back
    await page.locator(".tds-icon-label", { hasText: "Back" }).click();
    await expect(page.locator(".tds-q-badge")).toHaveText("1");
  });
});

test.describe("Practice test 2 loads correctly", () => {
  test("loads test 2 math CAT questions", async ({ page }) => {
    await page.goto("/test?grade=3&subject=math&type=cat&test=2");
    await expect(page.locator(".tds-q-badge")).toHaveText("1");
    await expect(page.locator(".tds-question-text")).toBeVisible();
    // Progress should show "Grade 3 MATH"
    await expect(page.locator(".tds-progress-text")).toContainText("Grade 3 MATH");
  });

  test("loads test 3 math CAT questions", async ({ page }) => {
    await page.goto("/test?grade=3&subject=math&type=cat&test=3");
    await expect(page.locator(".tds-q-badge")).toHaveText("1");
    await expect(page.locator(".tds-question-text")).toBeVisible();
  });
});

test.describe("ELA test with passages", () => {
  test("shows passage panel for ELA CAT", async ({ page }) => {
    await page.goto("/test?grade=3&subject=ela&type=cat&test=1");
    // ELA should show split view with passage
    await expect(page.locator(".tds-passage-panel")).toBeVisible();
    await expect(page.locator(".tds-question-panel")).toBeVisible();
  });

  test("passage toggle works", async ({ page }) => {
    await page.goto("/test?grade=3&subject=ela&type=cat&test=1");
    const passageBody = page.locator(".tds-passage-body");
    await expect(passageBody).toBeVisible();

    // Click toggle
    await page.locator(".tds-passage-toggle").click();
    await expect(passageBody).not.toBeVisible();

    // Click again to show
    await page.locator(".tds-passage-toggle").click();
    await expect(passageBody).toBeVisible();
  });
});
