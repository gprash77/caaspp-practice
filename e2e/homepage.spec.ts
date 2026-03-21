import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads with correct title and heading", async ({ page }) => {
    await expect(page.locator("h1")).toHaveText("CAASPP Practice Test");
  });

  test("has grade selector defaulting to Grade 3", async ({ page }) => {
    const gradeSelect = page.locator("#grade");
    await expect(gradeSelect).toHaveValue("3");
  });

  test("has practice test selector with at least 3 options", async ({ page }) => {
    const testSelect = page.locator("#practiceTest");
    await expect(testSelect).toHaveValue("1");
    const options = testSelect.locator("option");
    await expect(options).toHaveCount(3);
  });

  test("practice test dropdown shows correct labels", async ({ page }) => {
    const options = page.locator("#practiceTest option");
    await expect(options.nth(0)).toHaveText("Test 1 (Original)");
    await expect(options.nth(1)).toHaveText("Test 2");
    await expect(options.nth(2)).toHaveText("Test 3");
  });

  test("shows all 4 test buttons", async ({ page }) => {
    await expect(page.getByText("Mathematics — Computer Adaptive Test")).toBeVisible();
    await expect(page.getByText("Mathematics — Performance Task")).toBeVisible();
    await expect(page.getByText("ELA — Computer Adaptive Test")).toBeVisible();
    await expect(page.getByText("ELA — Performance Task Segment")).toBeVisible();
  });

  test("clicking Math CAT navigates to test page with correct params", async ({ page }) => {
    await page.getByText("Mathematics — Computer Adaptive Test").click();
    await expect(page).toHaveURL(/\/test\?grade=3&subject=math&type=cat&test=1/);
  });

  test("selecting Test 2 then clicking navigates with test=2", async ({ page }) => {
    await page.locator("#practiceTest").selectOption("2");
    await page.getByText("Mathematics — Computer Adaptive Test").click();
    await expect(page).toHaveURL(/\/test\?grade=3&subject=math&type=cat&test=2/);
  });

  test("selecting Test 3 and ELA PT navigates correctly", async ({ page }) => {
    await page.locator("#practiceTest").selectOption("3");
    await page.getByText("ELA — Performance Task Segment").click();
    await expect(page).toHaveURL(/\/test\?grade=3&subject=ela&type=pt&test=3/);
  });
});
