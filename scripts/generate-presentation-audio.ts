import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

import { getQuestions } from "../lib/questions";

type AudioTarget = {
  grade?: number;
  testNum: number;
  title: string;
  output: string;
  rate?: number;
};

const audioTargets: AudioTarget[] = [
  {
    grade: 4,
    testNum: 1,
    title: "The Telephone Is Born",
    output: "public/audio/presentations/grade-4/test-1-the-telephone-is-born.m4a",
  },
  {
    grade: 4,
    testNum: 1,
    title: "Balloon Wranglers",
    output: "public/audio/presentations/grade-4/test-1-balloon-wranglers.m4a",
  },
  {
    grade: 4,
    testNum: 2,
    title: "From Paper Bin to New Paper",
    output: "public/audio/presentations/grade-4/test-2-from-paper-bin-to-new-paper.m4a",
    rate: 30,
  },
  {
    grade: 4,
    testNum: 3,
    title: "From Cotton Fiber to Cloth",
    output: "public/audio/presentations/grade-4/test-3-from-cotton-fiber-to-cloth.m4a",
    rate: 60,
  },
  {
    grade: 4,
    testNum: 3,
    title: "Mapping a Neighborhood with Symbols",
    output: "public/audio/presentations/grade-4/test-3-mapping-a-neighborhood-with-symbols.m4a",
    rate: 30,
  },
  {
    grade: 4,
    testNum: 4,
    title: "From Clay to a Fired Bowl",
    output: "public/audio/presentations/grade-4/test-4-from-clay-to-a-fired-bowl.m4a",
    rate: 30,
  },
  {
    grade: 4,
    testNum: 4,
    title: "Reading a Weather Map",
    output: "public/audio/presentations/grade-4/test-4-reading-a-weather-map.m4a",
    rate: 80,
  },
  {
    grade: 4,
    testNum: 5,
    title: "Testing a Model Building Against Shaking",
    output: "public/audio/presentations/grade-4/test-5-testing-a-model-building-against-shaking.m4a",
    rate: 75,
  },
  {
    grade: 4,
    testNum: 5,
    title: "How Sand Dunes Move",
    output: "public/audio/presentations/grade-4/test-5-how-sand-dunes-move.m4a",
    rate: 75,
  },
  {
    grade: 4,
    testNum: 2,
    title: "Watching the Moon's Appearance",
    output: "public/audio/presentations/grade-4/test-2-watching-the-moons-appearance.m4a",
    rate: 30,
  },
  {
    testNum: 1,
    title: "Soaring on the Wings of the Wind",
    output: "public/audio/presentations/grade-3/test-1-soaring-on-the-wings-of-the-wind.m4a",
  },
  {
    testNum: 1,
    title: "All About Pizza",
    output: "public/audio/presentations/grade-3/test-1-all-about-pizza.m4a",
  },
  {
    testNum: 2,
    title: "Soaring on the Wings of the Wind",
    output: "public/audio/presentations/grade-3/test-2-soaring-on-the-wings-of-the-wind.m4a",
  },
  {
    testNum: 2,
    title: "All About Pizza",
    output: "public/audio/presentations/grade-3/test-2-all-about-pizza.m4a",
  },
  {
    testNum: 3,
    title: "Soaring on the Wings of the Wind",
    output: "public/audio/presentations/grade-3/test-3-soaring-on-the-wings-of-the-wind.m4a",
  },
  {
    testNum: 3,
    title: "All About Pizza",
    output: "public/audio/presentations/grade-3/test-3-all-about-pizza.m4a",
  },
  {
    testNum: 4,
    title: "Soaring on the Wings of the Wind",
    output: "public/audio/presentations/grade-3/test-4-soaring-on-the-wings-of-the-wind.m4a",
  },
  {
    testNum: 4,
    title: "All About Pizza",
    output: "public/audio/presentations/grade-3/test-4-all-about-pizza.m4a",
  },
  {
    testNum: 5,
    title: "Soaring on the Wings of the Wind",
    output: "public/audio/presentations/grade-3/test-5-soaring-on-the-wings-of-the-wind.m4a",
  },
  {
    testNum: 5,
    title: "All About Pizza",
    output: "public/audio/presentations/grade-3/test-5-all-about-pizza.m4a",
  },
  {
    testNum: 6,
    title: "Soaring on the Wings of the Wind",
    output: "public/audio/presentations/grade-3/test-6-soaring-on-the-wings-of-the-wind.m4a",
  },
  {
    testNum: 6,
    title: "All About Pizza",
    output: "public/audio/presentations/grade-3/test-6-all-about-pizza.m4a",
  },
  {
    testNum: 7,
    title: "Soaring on the Wings of the Wind",
    output: "public/audio/presentations/grade-3/test-7-soaring-on-the-wings-of-the-wind.m4a",
  },
  {
    testNum: 7,
    title: "All About Pizza",
    output: "public/audio/presentations/grade-3/test-7-all-about-pizza.m4a",
  },
  {
    testNum: 8,
    title: "Soaring on the Wings of the Wind",
    output: "public/audio/presentations/grade-3/test-8-soaring-on-the-wings-of-the-wind.m4a",
  },
  {
    testNum: 8,
    title: "All About Pizza",
    output: "public/audio/presentations/grade-3/test-8-all-about-pizza.m4a",
  },
  {
    testNum: 9,
    title: "Soaring on the Wings of the Wind",
    output: "public/audio/presentations/grade-3/test-9-soaring-on-the-wings-of-the-wind.m4a",
  },
  {
    testNum: 9,
    title: "All About Pizza",
    output: "public/audio/presentations/grade-3/test-9-all-about-pizza.m4a",
  },
  {
    testNum: 10,
    title: "Soaring on the Wings of the Wind",
    output: "public/audio/presentations/grade-3/test-10-soaring-on-the-wings-of-the-wind.m4a",
  },
  {
    testNum: 10,
    title: "All About Pizza",
    output: "public/audio/presentations/grade-3/test-10-all-about-pizza.m4a",
  },
  {
    testNum: 11,
    title: "A Chalk Picture for the Whole Block",
    output: "public/audio/presentations/grade-3/test-11-a-chalk-picture-for-the-whole-block.m4a",
  },
  {
    testNum: 11,
    title: "Colors on a City Wall",
    output: "public/audio/presentations/grade-3/test-11-colors-on-a-city-wall.m4a",
  },
  {
    testNum: 11,
    title: "A Chalk Picture for the Whole Block / Colors on a City Wall",
    output:
      "public/audio/presentations/grade-3/test-11-a-chalk-picture-for-the-whole-block-and-colors-on-a-city-wall.m4a",
  },
  {
    testNum: 12,
    title: "Soaring on the Wings of the Wind",
    output: "public/audio/presentations/grade-3/test-12-soaring-on-the-wings-of-the-wind.m4a",
  },
  {
    testNum: 12,
    title: "Pizza Around the World",
    output: "public/audio/presentations/grade-3/test-12-pizza-around-the-world.m4a",
  },
  {
    testNum: 13,
    title: "A Day at Ridge Museum",
    output: "public/audio/presentations/grade-3/test-13-a-day-at-ridge-museum.m4a",
  },
  {
    testNum: 13,
    title: "Clues in Stone",
    output: "public/audio/presentations/grade-3/test-13-clues-in-stone.m4a",
  },
  {
    testNum: 15,
    title: "Seeing the Sky From Above",
    output: "public/audio/presentations/grade-3/test-15-seeing-the-sky-from-above.m4a",
  },
  {
    testNum: 15,
    title: "Pizza Travels the World",
    output: "public/audio/presentations/grade-3/test-15-pizza-travels-the-world.m4a",
  },
  {
    testNum: 16,
    title: "Planning a School Garden",
    output: "public/audio/presentations/grade-3/test-16-planning-a-school-garden.m4a",
  },
  {
    testNum: 16,
    title: "Caring for Young Plants",
    output: "public/audio/presentations/grade-3/test-16-caring-for-young-plants.m4a",
  },
  {
    testNum: 17,
    title: "Reading Museum Clues",
    output: "public/audio/presentations/grade-3/test-17-reading-museum-clues.m4a",
  },
  {
    testNum: 17,
    title: "Protecting Old Photographs",
    output: "public/audio/presentations/grade-3/test-17-protecting-old-photographs.m4a",
  },
  {
    testNum: 18,
    title: "Taking Notes at the Shore",
    output: "public/audio/presentations/grade-3/test-18-taking-notes-at-the-shore.m4a",
  },
  {
    testNum: 18,
    title: "Protecting Tide Pools",
    output: "public/audio/presentations/grade-3/test-18-protecting-tide-pools.m4a",
  },
];

function cleanTranscript(source: string): string {
  return source
    .replace(/^Listen to the presentation\.\s*Then answer the questions\.\s*/m, "")
    .replace(/^Listen to or read the presentation\.\s*Then answer the questions\.\s*/m, "")
    .replace(/^Read the transcript of the presentation\.\s*Then answer the questions\.\s*/m, "")
    .replace(/\*\*(.*?)\*\*/g, "$1.")
    .replace(/\n---\n/g, "\n\nNext presentation.\n\n")
    .replace(/\s+/g, " ")
    .trim();
}

function findTranscript(grade: number, testNum: number, title: string): string {
  const questions = getQuestions(grade, "ela", "cat", testNum, { includeUnavailable: true });
  const question = questions.find((item) => item.passageTitle === title && item.passage);

  if (!question?.passage) {
    throw new Error(`No passage found for Test ${testNum}: ${title}`);
  }

  return cleanTranscript(question.passage);
}

function generateAudioFile(transcript: string, outputPath: string, rate = 170) {
  const absoluteOutput = path.resolve(outputPath);
  fs.mkdirSync(path.dirname(absoluteOutput), { recursive: true });

  const tempAiff = path.join(os.tmpdir(), `${path.basename(outputPath, ".m4a")}.aiff`);

  execFileSync("say", ["-v", "Samantha", "-r", String(rate), "-o", tempAiff, transcript], {
    stdio: "inherit",
  });

  execFileSync("afconvert", ["-f", "m4af", "-d", "aac", tempAiff, absoluteOutput], {
    stdio: "inherit",
  });

  fs.rmSync(tempAiff, { force: true });
}

const requestedTests = new Set(process.argv.slice(2));

for (const target of audioTargets) {
  const grade = target.grade ?? 3;
  if (
    requestedTests.size > 0 &&
    !requestedTests.has(String(target.testNum)) &&
    !requestedTests.has(`${grade}:${target.testNum}`)
  ) {
    continue;
  }

  const transcript = findTranscript(grade, target.testNum, target.title);
  generateAudioFile(transcript, target.output, target.rate);
  console.log(`Generated ${target.output}`);
}
