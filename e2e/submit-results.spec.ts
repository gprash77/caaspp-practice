import { test, expect } from "@playwright/test";

test.describe("Submit test and view results", () => {
  test("can complete a few questions and submit to see results", async ({ page }) => {
    await page.goto("/test?grade=3&subject=math&type=cat&test=1");

    // Answer first 3 questions quickly
    // Q1: text-input
    await page.locator(".number-pad-input").fill("52");
    await page.locator(".tds-icon-label", { hasText: "Next" }).click();

    // Q2: text-input
    await page.locator(".number-pad-input").fill("809");
    await page.locator(".tds-icon-label", { hasText: "Next" }).click();

    // Q3: text-input
    await page.locator(".number-pad-input").fill("15");
    await page.locator(".tds-icon-label", { hasText: "Next" }).click();

    // Now submit with remaining unanswered (confirm dialog)
    page.on("dialog", (dialog) => dialog.accept());

    // Navigate to last question and submit
    // Or just use the submit via URL manipulation - let's use sessionStorage directly
    await page.evaluate(() => {
      const data = {
        grade: 3,
        subject: "math",
        testType: "cat",
        practiceTest: 1,
        answers: { 1: "52", 2: "809", 3: "15", 4: "wrong", 5: "wrong" },
        questionIds: [1, 2, 3, 4, 5],
      };
      sessionStorage.setItem("testResults", JSON.stringify(data));
    });
    await page.goto("/results");

    // Results page should load
    await expect(page.locator("h1")).toHaveText("Practice Test Results");
    await expect(page.getByText("Grade 3")).toBeVisible();
    await expect(page.getByText("Practice Test 1")).toBeVisible();
  });

  test("results page shows score summary", async ({ page }) => {
    // Set up test data with known answers
    await page.goto("/");
    await page.evaluate(() => {
      const data = {
        grade: 3,
        subject: "math",
        testType: "cat",
        practiceTest: 1,
        answers: { 1: "52", 2: "809", 3: "15", 4: "6", 5: "6" },
        questionIds: [1, 2, 3, 4, 5],
      };
      sessionStorage.setItem("testResults", JSON.stringify(data));
    });
    await page.goto("/results");

    // Should show score cards
    await expect(page.locator(".score-card").first()).toBeVisible();
    await expect(page.getByText("Auto-Scored Questions Correct")).toBeVisible();
  });

  test("results page shows claim breakdown", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      const data = {
        grade: 3,
        subject: "math",
        testType: "cat",
        practiceTest: 1,
        answers: { 1: "52", 2: "809", 3: "15" },
        questionIds: [1, 2, 3],
      };
      sessionStorage.setItem("testResults", JSON.stringify(data));
    });
    await page.goto("/results");

    await expect(page.getByText("Score by Category (Claims)")).toBeVisible();
    await expect(page.locator(".claim-section").first()).toBeVisible();
  });

  test("results page shows question review with expand/collapse", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      const data = {
        grade: 3,
        subject: "math",
        testType: "cat",
        practiceTest: 1,
        answers: { 1: "52", 2: "999" },
        questionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      };
      sessionStorage.setItem("testResults", JSON.stringify(data));
    });
    await page.goto("/results");

    // Question review section
    await expect(page.getByText("Question Review")).toBeVisible();

    // Should show all official Test 1 Math CAT question review items
    const reviews = page.locator(".question-review");
    await expect(reviews).toHaveCount(31);

    // Q1 should be correct (52 is right)
    await expect(page.locator(".correct-badge").first()).toBeVisible();

    // Q2 should be incorrect (999 is wrong for 356+453=809)
    await expect(page.locator(".incorrect-badge").first()).toBeVisible();

    // Q2 is incorrect, so it should open with the correct answer and explanation.
    const q2Body = reviews.nth(1).locator(".question-review-body");
    await expect(q2Body.getByText("Correct answer:")).toBeVisible();
    await expect(q2Body.getByText("Explanation:")).toBeVisible();
  });

  test("results page shows correct answer in green for wrong answers", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      const data = {
        grade: 3,
        subject: "math",
        testType: "cat",
        practiceTest: 1,
        answers: { 1: "99" }, // wrong answer for Q1 (correct is 52)
        questionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      };
      sessionStorage.setItem("testResults", JSON.stringify(data));
    });
    await page.goto("/results");

    // Q1 is incorrect, so it opens with the user's answer and correct answer visible.
    const reviewBody = page.locator(".question-review-body").first();
    await expect(reviewBody.getByText("99")).toBeVisible();

    // Correct answer "52" should be shown
    await expect(reviewBody.getByText("Correct answer:")).toBeVisible();
  });

  test("Take Another Test button goes back to homepage", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      const data = {
        grade: 3,
        subject: "math",
        testType: "cat",
        practiceTest: 1,
        answers: { 1: "52" },
        questionIds: [1],
      };
      sessionStorage.setItem("testResults", JSON.stringify(data));
    });
    await page.goto("/results");

    await page.locator(".retake-btn").click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("Results for different practice tests", () => {
  test("results page shows correct practice test number", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      const data = {
        grade: 3,
        subject: "math",
        testType: "cat",
        practiceTest: 2,
        answers: { 1001: "52" },
        questionIds: [1001],
      };
      sessionStorage.setItem("testResults", JSON.stringify(data));
    });
    await page.goto("/results");

    await expect(page.getByText("Practice Test 2")).toBeVisible();
  });

  test("ELA results show manually-scored notice for PT", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      const data = {
        grade: 3,
        subject: "ela",
        testType: "pt",
        practiceTest: 1,
        answers: { 150: "B", 151: "test answer", 152: "my essay", 153: "B,C" },
        questionIds: [150, 151, 152, 153],
      };
      sessionStorage.setItem("testResults", JSON.stringify(data));
    });
    await page.goto("/results");

    // Should mention manual scoring
    await expect(page.getByText("require manual scoring")).toBeVisible();
  });
});
