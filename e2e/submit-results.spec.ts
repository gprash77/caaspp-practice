import { test, expect, type Page } from "@playwright/test";

async function submitAttempt(
  page: Page,
  options: {
    grade?: number;
    subject?: "math" | "ela";
    type?: "cat" | "pt";
    test?: number;
    answers?: Record<number, string | string[]>;
  } = {}
) {
  const grade = options.grade ?? 3;
  const subject = options.subject ?? "math";
  const type = options.type ?? "cat";
  const practiceTest = options.test ?? 1;
  const attemptId = `e2e-${crypto.randomUUID()}`;
  const attemptKey = `caaspp-attempt:${attemptId}`;
  await page.goto(`/test?grade=${grade}&subject=${subject}&type=${type}&test=${practiceTest}&attempt=${attemptId}`);
  await expect(page.locator(".tds-progress-dots .tds-dot").first()).toBeVisible();
  await page.waitForFunction((key) => Boolean(localStorage.getItem(key)), attemptKey);
  await page.evaluate(({ key, answers }) => {
    const record = JSON.parse(localStorage.getItem(key)!);
    record.answers = answers;
    record.updatedAt = new Date().toISOString();
    localStorage.setItem(key, JSON.stringify(record));
  }, { key: attemptKey, answers: options.answers ?? {} });
  await page.reload();
  const dots = page.locator(".tds-progress-dots .tds-dot");
  await expect(dots.first()).toBeVisible();
  await dots.last().click({ force: true });
  page.on("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "SUBMIT TEST" }).click();
  await expect(page).toHaveURL(new RegExp(`/results\\?attempt=${attemptId}`));
}

test.describe("Submit test and view version-safe results", () => {
  test("submits an attempt and opens its isolated result", async ({ page }) => {
    await submitAttempt(page, { answers: { 1: "52", 2: "809", 3: "15" } });
    await expect(page.locator("h1")).toHaveText("Practice Test Results");
    await expect(page.getByText("Grade 3 Mathematics")).toBeVisible();
    await expect(page.getByText("Practice Test 1")).toBeVisible();
  });

  test("results page shows score summary", async ({ page }) => {
    await submitAttempt(page, { answers: { 1: "52", 2: "809", 3: "15" } });
    await expect(page.locator(".score-card").first()).toBeVisible();
    await expect(page.getByText("Total Points")).toBeVisible();
  });

  test("results page shows point-based claim breakdown", async ({ page }) => {
    await submitAttempt(page, { answers: { 1: "52", 2: "809", 3: "15" } });
    await expect(page.getByText("Score by Category (Claims)")).toBeVisible();
    await expect(page.locator(".claim-section").first()).toBeVisible();
  });

  test("results page shows question review with expand/collapse", async ({ page }) => {
    await submitAttempt(page, { answers: { 1: "52", 2: "999" } });
    await expect(page.getByText("Question Review")).toBeVisible();
    const reviews = page.locator(".question-review");
    await expect(reviews).toHaveCount(31);
    await expect(page.locator(".correct-badge").first()).toBeVisible();
    await expect(page.locator(".incorrect-badge").first()).toBeVisible();
    const q2Body = reviews.nth(1).locator(".question-review-body");
    await expect(q2Body.getByText("Correct answer:")).toBeVisible();
    await expect(q2Body.getByText("Explanation:")).toBeVisible();
  });

  test("results page shows correct answer in green for wrong answers", async ({ page }) => {
    await submitAttempt(page, { answers: { 1: "999" } });
    const firstReview = page.locator(".question-review").first();
    await expect(firstReview.getByText("Correct answer:")).toBeVisible();
    await expect(firstReview.getByText("52", { exact: true })).toBeVisible();
  });

  test("Take Another Test button goes back to homepage", async ({ page }) => {
    await submitAttempt(page, { answers: { 1: "52" } });
    await page.getByRole("button", { name: "Take Another Test" }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("results page shows correct practice test number", async ({ page }) => {
    await submitAttempt(page, { test: 2, answers: { 1001: "52" } });
    await expect(page.getByText("Practice Test 2")).toBeVisible();
  });

  test("ELA PT results distinguish unscored manual responses", async ({ page }) => {
    await submitAttempt(page, {
      subject: "ela",
      type: "pt",
      answers: { 150: ["0:0"], 151: "Student short response", 152: "Student essay" },
    });
    await expect(page.getByText(/still require manual scoring/)).toBeVisible();
    await expect(page.getByText(/unscored response is distinct/)).toBeVisible();
  });

  test("a result cannot be opened without its attempt ID", async ({ page }) => {
    await page.goto("/results");
    await expect(page.getByRole("heading", { name: "Results unavailable" })).toBeVisible();
    await expect(page.getByText(/missing its attempt ID/)).toBeVisible();
  });

  test("a stale bank hash is blocked instead of rescored", async ({ page }) => {
    await submitAttempt(page, { answers: { 1: "52" } });
    const attemptId = new URL(page.url()).searchParams.get("attempt")!;
    await page.evaluate((key) => {
      const record = JSON.parse(localStorage.getItem(key)!);
      record.attempt.bankHash = "stale-bank-hash";
      localStorage.setItem(key, JSON.stringify(record));
    }, `caaspp-results:${attemptId}`);
    await page.reload();
    await expect(page.getByRole("heading", { name: "Results unavailable" })).toBeVisible();
    await expect(page.getByText(/were not rescored/)).toBeVisible();
  });
});
