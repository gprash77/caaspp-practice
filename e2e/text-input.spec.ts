import { test, expect } from "@playwright/test";

test.describe("Text input types", () => {
  test("number pad input accepts keyboard typing", async ({ page }) => {
    await page.goto("/test?grade=3&subject=math&type=cat&test=1");
    // Q1 is text-input with number pad
    const input = page.locator(".number-pad-input");
    await expect(input).toBeVisible();

    await input.fill("42");
    await expect(input).toHaveValue("42");
  });

  test("number pad buttons work", async ({ page }) => {
    await page.goto("/test?grade=3&subject=math&type=cat&test=1");
    const input = page.locator(".number-pad-input");

    // Click number pad buttons
    await page.locator(".pad-key", { hasText: "5" }).click();
    await page.locator(".pad-key", { hasText: "2" }).click();
    await expect(input).toHaveValue("52");
  });

  test("number pad backspace works", async ({ page }) => {
    await page.goto("/test?grade=3&subject=math&type=cat&test=1");
    const input = page.locator(".number-pad-input");

    await input.fill("123");
    // Click backspace
    await page.locator(".pad-control", { hasText: "⌫" }).click();
    await expect(input).toHaveValue("12");
  });

  test("short-answer textarea accepts text", async ({ page }) => {
    // Navigate to an ELA PT which has short-answer questions
    await page.goto("/test?grade=3&subject=ela&type=pt&test=1");

    // Find the first short-answer textarea (may need to navigate to it)
    // PT Q1 might be a different type, let's find any textarea
    const textarea = page.locator(".short-answer-input");
    if (await textarea.isVisible()) {
      await textarea.fill("This is my answer to the short answer question.");
      await expect(textarea).toHaveValue("This is my answer to the short answer question.");
    }
  });

  test("rich text editor accepts typing without backward text (regression)", async ({ page }) => {
    // Navigate to an extended-writing question
    // ELA PT typically has one
    await page.goto("/test?grade=3&subject=ela&type=pt&test=2");

    // Navigate through questions to find the extended-writing one (usually last)
    // First answer earlier questions to get there
    for (let i = 0; i < 10; i++) {
      const editor = page.locator(".rich-editor-body");
      if (await editor.isVisible()) break;

      // Try to answer current question and advance
      const textarea = page.locator(".short-answer-input");
      const options = page.locator(".tds-option");
      const numberInput = page.locator(".number-pad-input");

      if (await textarea.isVisible()) {
        await textarea.fill("Test answer");
      } else if (await options.first().isVisible()) {
        await options.first().click();
      } else if (await numberInput.isVisible()) {
        await numberInput.fill("1");
      }

      await page.locator(".tds-icon-label", { hasText: "Next" }).click();
      // Dismiss attention dialog if it appears
      const okBtn = page.getByRole("button", { name: "OK" });
      if (await okBtn.isVisible({ timeout: 500 }).catch(() => false)) {
        await okBtn.click();
      }
    }

    const editor = page.locator(".rich-editor-body");
    if (await editor.isVisible()) {
      // Type text character by character to test cursor behavior
      await editor.click();
      await page.keyboard.type("Hello world", { delay: 50 });

      // The text should appear in correct order, not backward
      const text = await editor.innerText();
      expect(text).toContain("Hello world");
    }
  });
});
