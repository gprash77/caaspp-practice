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

  test("Learn provides separate standards-tagged Math and ELA preparation", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Grade 4 Learn/ }).click();
    await expect(page).toHaveURL(/\/learn$/);
    await expect(page.getByRole("note")).toContainText("Preparation only");
    await expect(page.getByRole("navigation", { name: "Grade 4 lessons" }).getByRole("button"))
      .toHaveCount(8);
    await expect(page.getByTestId("learn-lesson")).toContainText("4.NBT.A.1");
    await expect(page.getByRole("status")).toHaveCount(0);
    await page.getByTestId("learn-lesson").getByRole("button").first().click();
    await expect(page.getByRole("status")).toBeVisible();

    await page.getByRole("button", { name: "Main Idea and Summary" }).click();
    await expect(page.getByTestId("learn-lesson")).toContainText("RI.4.2");
    await expect(page.getByTestId("learn-lesson")).toContainText("Worked example");
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
    await expect(page.getByTestId("learn-lesson")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth))
      .toBeLessThanOrEqual(1);

    await openSection(page, 10, "math", "pt", "phase4-test10-mobile");
    await expect(page.locator(".stimulus-table-table")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth))
      .toBeLessThanOrEqual(1);
  });
});
