import { describe, it, expect } from "vitest";
import { getQuestions, TOTAL_PRACTICE_TESTS } from "@/lib/questions";

const TESTS = Array.from({ length: TOTAL_PRACTICE_TESTS }, (_, i) => i + 1);
const SUBJECTS = ["math", "ela"] as const;
const TEST_TYPES = ["cat", "pt"] as const;

// Expected question counts per test type
const EXPECTED_COUNTS: Record<string, Record<string, number>> = {
  math: { cat: 36, pt: 7 },
  ela: { cat: 37, pt: 4 },
};

function expectedCount(testNum: number, subject: "math" | "ela", testType: "cat" | "pt"): number {
  if (testNum === 1 && subject === "math" && testType === "pt") {
    return 5;
  }

  if (testNum === 1 && subject === "ela" && testType === "cat") {
    return 30;
  }

  if (testNum === 1 && subject === "ela" && testType === "pt") {
    return 3;
  }

  if (testNum >= 2 && testNum <= 15 && subject === "math" && testType === "pt") {
    return 5;
  }

  if (testNum >= 2 && testNum <= 15 && subject === "ela" && testType === "cat") {
    return 30;
  }

  if (testNum >= 2 && testNum <= 15 && subject === "ela" && testType === "pt") {
    return 3;
  }

  return EXPECTED_COUNTS[subject][testType];
}


describe("Question data integrity", () => {
  for (const testNum of TESTS) {
    for (const subject of SUBJECTS) {
      for (const testType of TEST_TYPES) {
        const label = `Test ${testNum} ${subject} ${testType}`;

        describe(label, () => {
          const questions = getQuestions(3, subject, testType, testNum);

          it("has the expected number of questions", () => {
            expect(questions.length).toBe(expectedCount(testNum, subject, testType));
          });

          it("has no duplicate IDs", () => {
            const ids = questions.map((q) => q.id);
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(ids.length);
          });

          it("all questions have correct subject", () => {
            questions.forEach((q) => {
              expect(q.subject).toBe(subject);
            });
          });

          it("all questions have correct grade", () => {
            questions.forEach((q) => {
              expect(q.grade).toBe(3);
            });
          });

          it("all questions have correct testType", () => {
            questions.forEach((q) => {
              expect(q.testType).toBe(testType);
            });
          });

          it("all questions have a valid type", () => {
            const validTypes = [
              "multiple-choice",
              "multi-select",
              "text-input",
              "table-input",
              "two-part",
              "short-answer",
              "extended-writing",
              "grid-match",
              "line-plot",
              "fraction-model",
              "shade-grid",
            ];
            questions.forEach((q) => {
              expect(validTypes).toContain(q.type);
            });
          });

          it("all questions have questionText or are extended-writing", () => {
            questions.forEach((q) => {
              if (q.type !== "extended-writing") {
                expect(q.questionText).toBeTruthy();
              }
            });
          });

          it("all questions have a correctAnswer", () => {
            questions.forEach((q) => {
              expect(q.correctAnswer).toBeDefined();
              if (Array.isArray(q.correctAnswer)) {
                expect(q.correctAnswer.length).toBeGreaterThan(0);
              } else {
                expect(q.correctAnswer).not.toBe("");
              }
            });
          });

          it("all questions have a valid claim (1-4)", () => {
            questions.forEach((q) => {
              expect(q.claim).toBeGreaterThanOrEqual(1);
              expect(q.claim).toBeLessThanOrEqual(4);
            });
          });

          it("all questions have a standard", () => {
            questions.forEach((q) => {
              expect(q.standard).toBeTruthy();
            });
          });

          it("all questions have points > 0", () => {
            questions.forEach((q) => {
              expect(q.points).toBeGreaterThan(0);
            });
          });

          it("all questions have a DOK level (1-4)", () => {
            questions.forEach((q) => {
              expect(q.dok).toBeGreaterThanOrEqual(1);
              expect(q.dok).toBeLessThanOrEqual(4);
            });
          });

          it("multiple-choice/multi-select questions have options", () => {
            questions
              .filter((q) =>
                ["multiple-choice", "multi-select"].includes(q.type)
              )
              .forEach((q) => {
                expect(q.options).toBeDefined();
                expect(q.options!.length).toBeGreaterThanOrEqual(2);
              });
          });

          it("two-part questions have prompts and options for both parts", () => {
            questions
              .filter((q) => q.type === "two-part")
              .forEach((q) => {
                expect(q.partAPrompt).toBeTruthy();
                expect(q.partAOptions).toBeDefined();
                expect(q.partAOptions!.length).toBeGreaterThanOrEqual(2);
                expect(q.partBPrompt).toBeTruthy();
                expect(q.partBOptions).toBeDefined();
                expect(q.partBOptions!.length).toBeGreaterThanOrEqual(2);
              });
          });

          it("option labels are unique within each question", () => {
            questions
              .filter((q) => q.options)
              .forEach((q) => {
                const labels = q.options!.map((o) => o.label);
                expect(new Set(labels).size).toBe(labels.length);
              });
          });

          it("correctAnswer references valid option labels for choice questions", () => {
            questions
              .filter((q) =>
                ["multiple-choice", "multi-select"].includes(q.type)
              )
              .forEach((q) => {
                const labels = q.options!.map((o) => o.label);
                if (Array.isArray(q.correctAnswer)) {
                  q.correctAnswer.forEach((ans) => {
                    expect(labels).toContain(ans);
                  });
                } else {
                  expect(labels).toContain(q.correctAnswer);
                }
              });
          });

          it("two-part answers reference valid labels for both parts", () => {
            questions
              .filter((q) => q.type === "two-part")
              .forEach((q) => {
                expect(Array.isArray(q.correctAnswer)).toBe(true);
                const [partA, partB] = q.correctAnswer as string[];
                const labelsA = q.partAOptions!.map((o) => o.label);
                const labelsB = q.partBOptions!.map((o) => o.label);
                expect(labelsA).toContain(partA);
                expect(labelsB).toContain(partB);
              });
          });

          it("grid-match questions have gridRows and gridColumns", () => {
            questions
              .filter((q) => q.type === "grid-match")
              .forEach((q) => {
                expect(q.gridRows).toBeDefined();
                expect(q.gridRows!.length).toBeGreaterThan(0);
                expect(q.gridColumns).toBeDefined();
                expect(q.gridColumns!.length).toBeGreaterThan(0);
              });
          });

          it("custom interaction questions include their required metadata", () => {
            questions
              .filter((q) => q.type === "table-input")
              .forEach((q) => {
                expect(q.dataTable).toBeDefined();
                expect(q.dataTable!.columns.length).toBeGreaterThan(0);
                expect(q.dataTable!.rows.length).toBeGreaterThan(0);
              });

            questions
              .filter((q) => q.type === "line-plot")
              .forEach((q) => {
                expect(q.linePlotLabels).toBeDefined();
                expect(q.linePlotLabels!.length).toBeGreaterThan(0);
                expect(q.linePlotMaxDots).toBeGreaterThan(0);
              });

            questions
              .filter((q) => q.type === "fraction-model")
              .forEach((q) => {
                expect(q.fractionModel).toBeDefined();
                expect(
                  q.fractionModel!.thirdsMax > 0 || q.fractionModel!.fourthsMax > 0
                ).toBe(true);
              });

            questions
              .filter((q) => q.type === "shade-grid")
              .forEach((q) => {
                expect(q.shadeGrid).toBeDefined();
                expect(q.shadeGrid!.rows).toBeGreaterThan(0);
                expect(q.shadeGrid!.cols).toBeGreaterThan(0);
                expect(q.shadeGrid!.requiredCount).toBeGreaterThan(0);
              });
          });

          it("all questions have an explanation", () => {
            questions.forEach((q) => {
              expect(q.explanation).toBeTruthy();
            });
          });

          it("ELA PT questions keep the full source set visible", () => {
            if (!(subject === "ela" && testType === "pt")) {
              return;
            }

            questions.forEach((q) => {
              expect(
                (q.passage?.includes("\n\n---\n\n") ?? false) ||
                  ((q.passage?.includes("Source 1") ?? false) &&
                    (q.passage?.includes("Source 2") ?? false))
              ).toBe(true);
            });
          });
        });
      }
    }
  }

  it("adds audio metadata to the rollout presentation clusters across the full presentation bank", () => {
    const rolloutChecks = [
      { testNum: 2, ids: [1122, 1123, 1124, 1125, 1126, 1127] },
      { testNum: 3, ids: [2122, 2123, 2124, 2125, 2126, 2127] },
      { testNum: 4, ids: [3122, 3123, 3124, 3125, 3126, 3127] },
      { testNum: 5, ids: [4122, 4123, 4124, 4125, 4126, 4127] },
      { testNum: 6, ids: [5122, 5123, 5124, 5125, 5126, 5127] },
      { testNum: 7, ids: [7122, 7123, 7124, 7125, 7126, 7127] },
      { testNum: 8, ids: [8122, 8123, 8124, 8125, 8126, 8127] },
      { testNum: 9, ids: [9122, 9123, 9124, 9125, 9126, 9127] },
      { testNum: 10, ids: [10122, 10123, 10124, 10125, 10126, 10127] },
      { testNum: 11, ids: [11125, 11126, 11127, 11129, 11130] },
      { testNum: 12, ids: [12126, 12127, 12128, 12129] },
      { testNum: 13, ids: [13122, 13123, 13124, 13125, 13126, 13127, 13128, 13129, 13130] },
      { testNum: 15, ids: [15066, 15067, 15068, 15069, 15070, 15071] },
    ];

    rolloutChecks.forEach(({ testNum, ids }) => {
      const questions = getQuestions(3, "ela", "cat", testNum);

      ids.forEach((id) => {
        const question = questions.find((q) => q.id === id);
        expect(question).toBeDefined();
        expect(question?.audio?.src).toBeTruthy();
        expect(question?.audio?.title).toBeTruthy();
      });
    });
  });
});

describe("Cross-test ID uniqueness", () => {
  it("no ID collisions across all practice tests", () => {
    const allIds: number[] = [];
    for (const testNum of TESTS) {
      for (const subject of SUBJECTS) {
        for (const testType of TEST_TYPES) {
          const questions = getQuestions(3, subject, testType, testNum);
          allIds.push(...questions.map((q) => q.id));
        }
      }
    }
    const uniqueIds = new Set(allIds);
    expect(uniqueIds.size).toBe(allIds.length);
  });
});

describe("Practice test loading", () => {
  it("TOTAL_PRACTICE_TESTS is at least 3", () => {
    expect(TOTAL_PRACTICE_TESTS).toBeGreaterThanOrEqual(3);
  });

  it("invalid practice test number returns empty array", () => {
    const questions = getQuestions(3, "math", "cat", 999);
    expect(questions.length).toBe(0);
  });

  it("test 1 returns original questions (not from extra file)", () => {
    const questions = getQuestions(3, "math", "cat", 1);
    // Test 1 IDs should be < 1000
    questions.forEach((q) => {
      expect(q.id).toBeLessThan(1000);
    });
  });

  it("test 2 returns extra questions with IDs >= 1000", () => {
    const questions = getQuestions(3, "math", "cat", 2);
    questions.forEach((q) => {
      expect(q.id).toBeGreaterThanOrEqual(1000);
    });
  });

  it("test 3 returns extra questions with IDs >= 2000", () => {
    const questions = getQuestions(3, "math", "cat", 3);
    questions.forEach((q) => {
      expect(q.id).toBeGreaterThanOrEqual(2000);
    });
  });
});

describe("Auto-scoring produces correct results for every question", () => {
  // Import checkAnswer to verify every question's correctAnswer actually scores as correct
  for (const testNum of TESTS) {
    for (const subject of SUBJECTS) {
      for (const testType of TEST_TYPES) {
        const label = `Test ${testNum} ${subject} ${testType}`;

        it(`${label}: all auto-scored questions score correctly with their own correctAnswer`, async () => {
          const { checkAnswer } = await import("@/lib/scoring");
          const questions = getQuestions(3, subject, testType, testNum);
          const autoScored = questions.filter(
            (q) => q.type !== "short-answer" && q.type !== "extended-writing"
          );

          autoScored.forEach((q) => {
            const result = checkAnswer(q, q.correctAnswer);
            expect(result, `Q${q.id} (${q.type}) should score correct with answer ${JSON.stringify(q.correctAnswer)}`).toBe(true);
          });
        });
      }
    }
  }
});

describe("ELA passage questions", () => {
  for (const testNum of TESTS) {
    it(`Test ${testNum} ELA CAT has passage-based questions with passages`, () => {
      const questions = getQuestions(3, "ela", "cat", testNum);
      const withPassage = questions.filter((q) => q.passage);
      // ELA CAT should have some passage-based questions
      expect(withPassage.length).toBeGreaterThan(0);
    });

    it(`Test ${testNum} ELA PT has student directions`, () => {
      const questions = getQuestions(3, "ela", "pt", testNum);
      const withDirections = questions.filter((q) => q.studentDirections);
      expect(withDirections.length).toBeGreaterThan(0);
    });
  }

  it("passage questions share passages within groups", () => {
    // Questions with the same passageTitle should have the same passage text
    for (const testNum of TESTS) {
      const questions = getQuestions(3, "ela", "cat", testNum);
      const passageGroups: Record<string, string[]> = {};
      questions.forEach((q) => {
        if (q.passageTitle && q.passage) {
          if (!passageGroups[q.passageTitle]) passageGroups[q.passageTitle] = [];
          passageGroups[q.passageTitle].push(q.passage);
        }
      });
      Object.entries(passageGroups).forEach(([title, passages]) => {
        const unique = new Set(passages);
        expect(unique.size, `Test ${testNum}: passages for "${title}" should be identical`).toBe(1);
      });
    }
  });
});

describe("Math domain coverage", () => {
  for (const testNum of TESTS) {
    it(`Test ${testNum} Math CAT covers multiple domains`, () => {
      const questions = getQuestions(3, "math", "cat", testNum);
      const domains = new Set(questions.map((q) => q.domain).filter(Boolean));
      // Grade 3 math should cover at least 3 domains (OA, NBT, NF, MD, G)
      expect(domains.size).toBeGreaterThanOrEqual(3);
    });
  }
});
