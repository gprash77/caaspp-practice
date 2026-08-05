import { expect, test, type Page } from "@playwright/test";

const grade4Labels = [
  "Test 1 (Official Baseline)",
  "Test 2 (Original · Easy)",
  "Test 3 (Original · Easy)",
  "Test 4 (Original · Medium)",
  "Test 5 (Original · Hard)",
  "Test 6 (Original · Easy)",
  "Test 7 (Original · Easy)",
  "Test 8 (Original · Medium)",
  "Test 9 (Original · Hard)",
  "Test 10 (Original · Hard)",
];

async function openSection(
  page: Page,
  testNumber: number,
  subject: "math" | "ela",
  type: "cat" | "pt",
  attempt: string
) {
  await page.goto(
    `/test?grade=4&subject=${subject}&type=${type}&test=${testNumber}&attempt=${attempt}`
  );
  await expect(page.locator(".tds-q-badge")).toHaveText("1");
}

test.describe("Grade 4 Phase 4 release", () => {
  test("exposes all five new forms with the approved difficulty labels", async ({ page }) => {
    await page.goto("/");
    await page.locator("#grade").selectOption("4");
    await expect(page.locator("#practiceTest option")).toHaveText(grade4Labels);
  });

  test("Learn exposes the complete California and SFUSD-aligned Math and ELA program", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Grade 4 Learn/ }).click();
    await expect(page).toHaveURL(/\/learn$/);
    await expect(page.getByRole("note")).toContainText("not endorsed by or affiliated with SFUSD");
    await expect(page.getByTestId("guided-tutorial")).toContainText("Start with equal parts");
    await page.getByRole("button", { name: "Practice library" }).click();
    await expect(page.getByRole("region", { name: "Learn path and progress" }))
      .toContainText("60practice tasks");
    const lessonNav = page.getByRole("navigation", { name: "Grade 4 lessons" });
    await expect(lessonNav.getByRole("button")).toHaveCount(15);
    await lessonNav.getByRole("button", { name: /Place Value and Rounding/ }).click();
    await expect(page.getByTestId("learn-lesson")).toContainText("4.NBT.A.1");
    await expect(page.getByTestId("learn-lesson")).toContainText("SFUSD · Multi-digit fluency");
    await expect(page.getByRole("status")).toHaveCount(0);
    await page.getByTestId("learn-lesson").locator("button").first().click();
    await expect(page.getByRole("status")).toBeVisible();

    await page.getByRole("button", { name: "English Language Arts" }).click();
    await expect(lessonNav.getByRole("button")).toHaveCount(16);
    await lessonNav.getByRole("button", { name: /Main Idea and Summary/ }).click();
    await expect(page.getByTestId("learn-lesson")).toContainText("RI.4.2");
    await expect(page.getByTestId("learn-lesson")).toContainText("SFUSD · Complex-text comprehension");
    await expect(page.getByTestId("learn-lesson")).toContainText("Worked example");
  });

  test("Learn persists prep-only choice and written-response progress", async ({ page }) => {
    await page.goto("/learn");
    await page.getByRole("button", { name: "Practice library" }).click();
    const lessonNav = page.getByRole("navigation", { name: "Grade 4 lessons" });
    await lessonNav.getByRole("button", { name: /Multi-Step Problems and Remainders/ }).click();
    await page.getByTestId("learn-lesson").getByRole("button").first().click();
    const response = page.getByLabel("Response to practice task 4");
    await response.fill("Four buses hold 144 riders, so the remaining rider requires a fifth bus.");
    await page.getByRole("button", { name: "Review my response" }).click();
    await expect(page.getByText("One strong model:")).toBeVisible();
    await page.reload();
    await page.getByRole("button", { name: "Practice library" }).click();
    await lessonNav.getByRole("button", { name: /Multi-Step Problems and Remainders/ }).click();
    await expect(page.getByLabel("Response to practice task 4")).toHaveValue(
      "Four buses hold 144 riders, so the remaining rider requires a fifth bus."
    );
    const keys = await page.evaluate(() => Object.keys(localStorage));
    expect(keys).toContain("caaspp-learn:grade4:v2");
    expect(keys.filter((key) => key.startsWith("caaspp-attempt:"))).toEqual([]);
  });

  test("guided Learn teaches in sequence, gives hints, and persists mastery progress", async ({ page }) => {
    await page.goto("/learn");
    const tutorial = page.getByTestId("guided-tutorial");
    const stepNav = page.getByRole("navigation", { name: "Fractions That Make Sense steps" });
    await expect(stepNav.getByRole("button", { name: /Compare with common parts/ })).toBeDisabled();
    await page.getByRole("button", { name: "I understand the parts" }).click();
    await expect(tutorial).toContainText("Make an equivalent fraction");
    await tutorial.getByRole("button", { name: /A\. 4\/5/ }).click();
    await expect(tutorial.getByRole("status")).toContainText("Good try");
    await page.getByRole("button", { name: "I need a hint" }).click();
    await expect(tutorial.getByRole("note")).toContainText("multiplies 4");
    await tutorial.getByRole("button", { name: /C\. 6\/8/ }).click();
    await expect(tutorial.getByRole("status")).toContainText("You got it");
    await expect(stepNav.getByRole("button", { name: /Compare with common parts/ })).toBeEnabled();
    await page.reload();
    await expect(page.getByTestId("guided-tutorial")).toContainText("Compare with common parts");
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("caaspp-learn:grade4:v2") ?? "{}"));
    expect(stored.guidedCompletedSteps).toEqual(expect.arrayContaining(["fraction-parts", "fraction-equivalent"]));
    expect(Object.keys(localStorage).filter((key) => key.startsWith("caaspp-attempt:"))).toEqual([]);

    await page.getByRole("button", { name: "English Language Arts" }).click();
    await expect(page.getByRole("region", { name: "Evidence Detective guided unit" })).toBeVisible();
    await expect(page.getByTestId("guided-tutorial")).toContainText("Separate evidence from inference");
  });

  for (const [testNumber, difficulty] of [
    [6, "Easy"],
    [8, "Medium"],
    [10, "Hard"],
  ] as const) {
    test(`renders the representative ${difficulty} form's complete section scaffold`, async ({ page }) => {
      for (const [subject, type, count] of [
        ["math", "cat", 31],
        ["math", "pt", 5],
        ["ela", "cat", 30],
        ["ela", "pt", 2],
      ] as const) {
        await openSection(
          page,
          testNumber,
          subject,
          type,
          `phase4-${testNumber}-${subject}-${type}`
        );
        await expect(page.locator(".tds-progress-dots .tds-dot")).toHaveCount(count);
        await expect(page.locator(".tds-question-text")).not.toBeEmpty();
        if (type === "pt") await expect(page.locator(".tds-passage-body")).not.toBeEmpty();
      }
    });
  }

  test("persists a Test 6 constrained response and isolates it from Test 7", async ({ page }) => {
    await openSection(page, 6, "math", "pt", "phase4-persist-test6");
    await page.locator(".tds-progress-dots .tds-dot").nth(4).click({ force: true });
    const test6Fields = page.locator(".multi-input-field input");
    for (const [index, value] of ["2", "3", "2", "2"].entries()) {
      await test6Fields.nth(index).fill(value);
    }
    await page.reload();
    for (const [index, value] of ["2", "3", "2", "2"].entries()) {
      await expect(page.locator(".multi-input-field input").nth(index)).toHaveValue(value);
    }

    await openSection(page, 7, "math", "pt", "phase4-isolated-test7");
    await page.locator(".tds-progress-dots .tds-dot").nth(4).click({ force: true });
    for (let index = 0; index < 4; index += 1) {
      await expect(page.locator(".multi-input-field input").nth(index)).toHaveValue("");
    }
  });

  test("renders both Test 10 narrations from their exact local audio", async ({ page }) => {
    const failedAudio: string[] = [];
    page.on("response", (response) => {
      if (response.status() >= 400 && /grade-4\/test-10/.test(response.url())) {
        failedAudio.push(response.url());
      }
    });
    await openSection(page, 10, "ela", "cat", "phase4-test10-audio");
    const dots = page.locator(".tds-progress-dots .tds-dot");
    await dots.nth(21).click({ force: true });
    await expect(page.getByRole("heading", { name: "Measuring a Melting-Ice Model" })).toBeVisible();
    await expect(page.locator("audio source")).toHaveAttribute(
      "src",
      /test-10-measuring-a-melting-ice-model\.m4a/
    );
    await dots.nth(24).click({ force: true });
    await expect(page.getByRole("heading", { name: "How Sound Changes in a Room" })).toBeVisible();
    await expect(page.locator("audio source")).toHaveAttribute(
      "src",
      /test-10-how-sound-changes-in-a-room\.m4a/
    );
    expect(failedAudio).toEqual([]);
  });

  test("moves the Test 8 ELA PT through its explicit Part 1 review", async ({ page }) => {
    await openSection(page, 8, "ela", "pt", "phase4-test8-ela-pt");
    await page.locator(".short-answer-input").fill(
      "Source 1 explains tradeoffs, while Source 3 reports the limited pilot."
    );
    await page.locator(".tds-progress-dots .tds-dot").nth(1).click({ force: true });
    for (const index of [0, 3, 4, 8]) {
      await page.locator(".grid-match-checkbox").nth(index).check();
    }
    await page.getByTitle("Review Part 1").click();
    await expect(page.getByTestId("ela-pt-part1-review")).toBeVisible();
    await page.getByRole("button", { name: "CONTINUE TO PART 2" }).click();
    await expect(page.getByTestId("ela-pt-part2-transition")).toBeVisible();
  });

  test("keeps Learn and the Hard Math PT usable on a narrow screen", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/learn");
    await expect(page.getByTestId("guided-tutorial")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth))
      .toBeLessThanOrEqual(1);

    await openSection(page, 10, "math", "pt", "phase4-test10-mobile");
    await expect(page.locator(".stimulus-table-table")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth))
      .toBeLessThanOrEqual(1);
  });
});
