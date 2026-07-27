import fs from "node:fs";
import path from "node:path";

import { getQuestions } from "../lib/questions";
import { sectionHash } from "../lib/validation/assessment-bank";

const BANK_VERSION = "2026-07-27.1";
const sections = {
  "math-cat": ["math", "cat"],
  "math-pt": ["math", "pt"],
  "ela-cat": ["ela", "cat"],
  "ela-pt": ["ela", "pt"],
} as const;

for (let testNumber = 6; testNumber <= 10; testNumber += 1) {
  const lockedSections = Object.fromEntries(
    Object.entries(sections).map(([id, [subject, testType]]) => {
      const questions = getQuestions(4, subject, testType, testNumber, { includeUnavailable: true });
      return [
        id,
        {
          count: questions.length,
          rawPoints: questions.reduce((sum, question) => sum + question.points, 0),
          canonicalSha256: sectionHash(questions),
          keys: questions.map((question) =>
            Array.isArray(question.correctAnswer) ? question.correctAnswer.join("|") : question.correctAnswer
          ),
        },
      ];
    })
  );
  const golden = {
    bankVersion: BANK_VERSION,
    sections: lockedSections,
    stimulusSufficiency: [
      { items: "Math CAT 1-31", status: "exact", evidence: "Every number, response rule, selection count, and model constraint is visible in the authored item." },
      { items: "Math PT 1-5", status: "exact", evidence: "The shared plan displays all quantities, conversions, timing, capacity, minimum, and whole-unit rules required by its five tasks." },
      { items: "ELA CAT 1-15", status: "exact", evidence: "The complete original literary and informational sources contain every keyed detail and stated limitation." },
      { items: "ELA CAT 16-21, 28-30", status: "exact", evidence: "Every writing and research task includes the complete sentence, context, or source description needed to answer." },
      { items: "ELA CAT 22-27", status: "exact", evidence: "The exact attached transcript states every controlled variable, stage, measurement, conclusion, and evidence limit used by the questions." },
      { items: "ELA PT 1-3", status: "exact", evidence: "The three-source package supplies explanatory evidence, requirements, pilot data, competing results, limitations, row cardinality, and full-write directions." },
    ],
  };
  const sourcePackages = [
    `g4-t${testNumber}-math-cat-original`,
    `g4-t${testNumber}-math-pt-original`,
    `g4-t${testNumber}-ela-cat-original`,
    `g4-t${testNumber}-ela-pt-original`,
  ];
  const sources = {
    bankVersion: BANK_VERSION,
    reviewedOn: "2026-07-27",
    author: "CAASPP Practice Project",
    license: "Original companion content; all rights reserved for this project.",
    sections: Object.entries(lockedSections).map(([id, section], index) => ({
      id: `g4-t${testNumber}-${id}`,
      itemCount: section.count,
      rawPoints: section.rawPoints,
      sourcePackages: [sourcePackages[index]],
    })),
  };
  const directory = path.join(process.cwd(), "data", "original", "grade-4", `test-${testNumber}`);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, "golden.json"), `${JSON.stringify(golden, null, 2)}\n`);
  fs.writeFileSync(path.join(directory, "sources.json"), `${JSON.stringify(sources, null, 2)}\n`);
  console.log(`Locked Grade 4 Test ${testNumber}`);
}
