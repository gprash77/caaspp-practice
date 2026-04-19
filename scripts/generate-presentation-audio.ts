import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

import { getQuestions } from "../lib/questions";

type AudioTarget = {
  testNum: number;
  title: string;
  output: string;
};

const audioTargets: AudioTarget[] = [
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

function findTranscript(testNum: number, title: string): string {
  const questions = getQuestions(3, "ela", "cat", testNum);
  const question = questions.find((item) => item.passageTitle === title && item.passage);

  if (!question?.passage) {
    throw new Error(`No passage found for Test ${testNum}: ${title}`);
  }

  return cleanTranscript(question.passage);
}

function generateAudioFile(transcript: string, outputPath: string) {
  const absoluteOutput = path.resolve(outputPath);
  fs.mkdirSync(path.dirname(absoluteOutput), { recursive: true });

  const tempAiff = path.join(os.tmpdir(), `${path.basename(outputPath, ".m4a")}.aiff`);

  execFileSync("say", ["-v", "Samantha", "-r", "170", "-o", tempAiff, transcript], {
    stdio: "inherit",
  });

  execFileSync("afconvert", ["-f", "m4af", "-d", "aac", tempAiff, absoluteOutput], {
    stdio: "inherit",
  });

  fs.rmSync(tempAiff, { force: true });
}

for (const target of audioTargets) {
  const transcript = findTranscript(target.testNum, target.title);
  generateAudioFile(transcript, target.output);
  console.log(`Generated ${target.output}`);
}
