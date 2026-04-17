import type { Question } from "./questions";
import { practiceTestQuestions } from "./practice-tests-extra";
import { easyPracticeTestQuestions } from "./practice-tests-easy";
import { mediumPracticeTestQuestions } from "./practice-tests-medium";
import { challengePracticeTestQuestions } from "./practice-tests-challenge";

type Subject = "math" | "ela";
type TestType = "cat" | "pt";

type ParallelSource = {
  sourceTest: number;
  step: number;
  offset: number;
};

type RewriteRule = [RegExp, string];

type RewriteProfile = {
  common: RewriteRule[];
  math: RewriteRule[];
  ela: RewriteRule[];
};

type ParallelBlueprint = {
  newTest: number;
  difficulty: "easy" | "medium" | "hard";
  profile: RewriteProfile;
  mathCat: ParallelSource;
  mathPT: ParallelSource;
  elaCat: ParallelSource;
  elaPT: ParallelSource;
};

const sourcePools: Question[] = [
  ...practiceTestQuestions,
  ...easyPracticeTestQuestions,
  ...mediumPracticeTestQuestions,
  ...challengePracticeTestQuestions,
];

function getSourceQuestions(
  sourceTest: number,
  subject: Subject,
  testType: TestType
): Question[] {
  return sourcePools.filter(
    (q) =>
      q.practiceTest === sourceTest &&
      q.subject === subject &&
      q.testType === testType &&
      q.grade === 3
  );
}

function permuteQuestions<T>(
  items: T[],
  step: number,
  offset: number
): T[] {
  const count = items.length;
  return Array.from({ length: count }, (_, index) => {
    const sourceIndex = (offset + index * step) % count;
    return items[sourceIndex];
  });
}

function makeId(
  practiceTest: number,
  subject: Subject,
  testType: TestType,
  index: number
): number {
  const prefix = practiceTest * 1000;

  if (subject === "math" && testType === "cat") return prefix + index + 1;
  if (subject === "math" && testType === "pt") return prefix + 40 + index;
  if (subject === "ela" && testType === "cat") return prefix + 101 + index;
  return prefix + 150 + index;
}

function applyRules(text: string, rules: RewriteRule[]): string {
  return rules.reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    text
  );
}

function rewriteProfileForQuestion(
  question: Question,
  profile: RewriteProfile
): RewriteRule[] {
  return [...profile.common, ...(question.subject === "math" ? profile.math : profile.ela)];
}

function rewriteString(value: string | undefined, rules: RewriteRule[]): string | undefined {
  return value ? applyRules(value, rules) : value;
}

function rewriteCorrectAnswer(
  question: Question,
  rules: RewriteRule[]
): Question["correctAnswer"] {
  if (Array.isArray(question.correctAnswer)) {
    return question.correctAnswer.map((answer) => applyRules(answer, rules));
  }

  if (
    question.subject === "ela" &&
    (question.type === "short-answer" ||
      question.type === "extended-writing" ||
      /[A-Za-z]{4,}/.test(question.correctAnswer))
  ) {
    return applyRules(question.correctAnswer, rules);
  }

  return question.correctAnswer;
}

function rewriteQuestion(
  question: Question,
  newTest: number,
  index: number,
  profile: RewriteProfile
): Question {
  const rules = rewriteProfileForQuestion(question, profile);

  return {
    ...question,
    id: makeId(newTest, question.subject, question.testType, index),
    practiceTest: newTest,
    passage: rewriteString(question.passage, rules),
    passageTitle: rewriteString(question.passageTitle, rules),
    passageAuthor: rewriteString(question.passageAuthor, rules),
    studentDirections: rewriteString(question.studentDirections, rules),
    questionText: applyRules(question.questionText, rules),
    options: question.options?.map((option) => ({
      ...option,
      text: applyRules(option.text, rules),
    })),
    gridRows: question.gridRows?.map((row) => applyRules(row, rules)),
    gridColumns: question.gridColumns?.map((column) => applyRules(column, rules)),
    correctAnswer: rewriteCorrectAnswer(question, rules),
    rubric: applyRules(question.rubric, rules),
    evidenceStatement: rewriteString(question.evidenceStatement, rules),
    explanation: rewriteString(question.explanation, rules),
  };
}

function cloneSet(
  newTest: number,
  subject: Subject,
  testType: TestType,
  source: ParallelSource,
  profile: RewriteProfile
): Question[] {
  const sourceQuestions = getSourceQuestions(source.sourceTest, subject, testType);
  const orderedQuestions = permuteQuestions(sourceQuestions, source.step, source.offset);

  return orderedQuestions.map((question, index) =>
    rewriteQuestion(question, newTest, index, profile)
  );
}

function makeCommonProfile(label: string, replacements: Array<[string, string]>): RewriteProfile {
  const commonRules: RewriteRule[] = [
    [/Practice Test/gi, `${label} Practice Test`],
    [/Select TWO/gi, "Choose two"],
    [/Which sentence is written correctly\?/gi, "Which sentence uses correct punctuation and capitalization?"],
    [/Which detail/gi, "What detail"],
    [/best supports/gi, "most strongly supports"],
    [/best describes/gi, "most clearly describes"],
    [/What is the main idea/gi, "Which statement tells the main idea"],
    [/According to the passage/gi, "Based on the passage"],
    [/According to the article/gi, "Based on the article"],
    [/What is a theme/gi, "Which idea is a theme"],
    [/What is the central message/gi, "Which sentence states the central message"],
    [/What lesson/gi, "Which lesson"],
    [/student/gi, "learner"],
    [/students/gi, "learners"],
    [/teacher/gi, "class leader"],
    [/teachers/gi, "class leaders"],
  ];

  const replacementRules = replacements.map(
    ([pattern, replacement]) => [new RegExp(pattern, "g"), replacement] as RewriteRule
  );

  return {
    common: [...commonRules, ...replacementRules],
    math: [
      [/What number makes this equation true\?/gi, "Find the missing number that makes this equation true."],
      [/Which equation is related to/gi, "Which equation belongs to the same fact family as"],
      [/Which equation is in the same fact family as/gi, "Choose the equation from the same fact family as"],
      [/Complete the pattern:/gi, "Write the next part of the pattern:"],
      [/What is ([0-9][^?]*)\?/gi, "Solve: $1."],
      [/How many ([^?]*) are there in all\?/gi, "How many $1 are there altogether?"],
      [/How many ([^?]*) did ([^?]*)\?/gi, "How many $1 did $2 altogether?"],
      [/Which statement is true\?/gi, "Choose the true statement."],
      [/How long is it\?/gi, "How much time passes?"],
      [/What is its area\?/gi, "Find the area."],
      [/What is the perimeter\?/gi, "Find the perimeter."],
    ],
    ela: [
      [/Read the passage and answer the questions\./gi, "Read the text and answer the questions."],
      [/Read the passage and answer questions ([0-9]+)–([0-9]+)\./gi, "Read the text and answer questions $1-$2."],
      [/Read this sentence:/gi, "Look at this sentence:"],
      [/What does the word/gi, "What does the word or phrase"],
      [/Why did the author include/gi, "Why does the author include"],
      [/What is the author's main purpose/gi, "What is the author's purpose"],
      [/What do the characters/gi, "What do the people or characters"],
      [/Use details from BOTH passages/gi, "Use details from BOTH texts"],
      [/Use details from BOTH sources/gi, "Use details from BOTH texts"],
      [/source/gi, "text"],
      [/sources/gi, "texts"],
    ],
  };
}

const test11Profile = makeCommonProfile("Meadow", [
  ["Ben", "Owen"],
  ["Mia", "Nora"],
  ["Biscuit", "Sunny"],
  ["Lily", "Emma"],
  ["Jake", "Theo"],
  ["Maya", "Ava"],
  ["Grandpa", "Abuelo"],
  ["Mom", "Aunt May"],
  ["park", "meadow"],
  ["garden", "plot"],
  ["kite", "glider"],
  ["lemonade stand", "fruit stand"],
  ["lemonade", "berry drink"],
  ["butterflies", "moths"],
  ["Butterflies", "Moths"],
  ["sunflowers", "zinnias"],
  ["marigolds", "asters"],
  ["The Lost Kite", "The Missing Glider"],
  ["The Lemonade Stand", "The Fruit Stand"],
  ["All About Butterflies", "All About Moths"],
]);

const test12Profile = makeCommonProfile("Harbor", [
  ["Ben", "Leo"],
  ["Mia", "June"],
  ["Biscuit", "Pebble"],
  ["Lily", "Clara"],
  ["Jake", "Miles"],
  ["Maya", "Rina"],
  ["Grandpa", "Granddad"],
  ["Mom", "Uncle Jay"],
  ["park", "harbor green"],
  ["garden", "planter bed"],
  ["kite", "wind sail"],
  ["ocean", "coast"],
  ["Ocean", "Coast"],
  ["butterflies", "dragonflies"],
  ["Butterflies", "Dragonflies"],
  ["The Amazing Ocean", "The Living Coast"],
  ["The Lost Kite", "The Wind Sail"],
  ["The Lemonade Stand", "The Porch Drink Stand"],
]);

const test13Profile = makeCommonProfile("Canyon", [
  ["Maya", "Tess"],
  ["Mama", "Dad"],
  ["Ava", "Keira"],
  ["Grandpa", "Grandmother"],
  ["Lily", "Naomi"],
  ["Jake", "Eli"],
  ["Storm", "Scout"],
  ["dog", "puppy"],
  ["garden", "terrace"],
  ["river", "canyon stream"],
  ["Rivers", "Canyon Streams"],
  ["bees", "orchard bees"],
  ["Bees", "Orchard Bees"],
  ["The Storm Dog", "The Rainy-Day Puppy"],
  ["The Surprise Garden", "The Hillside Garden"],
  ["How Rivers Shape the Land", "How Canyon Streams Shape the Land"],
  ["The Busy World of Honeybees", "The Busy World of Orchard Bees"],
]);

const test14Profile = makeCommonProfile("Summit", [
  ["Maya", "Sela"],
  ["Eli", "Jonah"],
  ["Grandma", "Nan"],
  ["Mr\\. Vega", "Ms. Hart"],
  ["Mrs\\. Alvarez", "Mr. Dalton"],
  ["Talia", "Ivy"],
  ["Noah", "Micah"],
  ["wetlands", "alpine meadows"],
  ["Wetlands", "Alpine Meadows"],
  ["harbor", "summit lake"],
  ["Harbor", "Summit Lake"],
  ["volcano", "mountain ridge"],
  ["Volcano", "Mountain Ridge"],
  ["The Lantern Bridge", "The Lantern Path"],
  ["The Moonlight Garden", "The Starlight Courtyard"],
  ["Why Wetlands Matter", "Why Alpine Meadows Matter"],
  ["The Map in the Bell Tower", "The Note in the Watchtower"],
  ["How Volcanoes Build New Land", "How Mountain Ridges Build New Land"],
]);

const test15Profile = makeCommonProfile("Aurora", [
  ["Maya", "Lina"],
  ["Eli", "Rafi"],
  ["Grandma", "Gran"],
  ["Mrs\\. Alvarez", "Ms. Quinn"],
  ["Talia", "Marin"],
  ["Noah", "Parker"],
  ["Nadia", "Elise"],
  ["monarch", "swiftwing"],
  ["Monarch", "Swiftwing"],
  ["butterfly", "glider butterfly"],
  ["Butterfly", "Glider Butterfly"],
  ["river race", "bay race"],
  ["River Race", "Bay Race"],
  ["moonlight", "aurora"],
  ["Moonlight", "Aurora"],
  ["The Moonlight Garden", "The Aurora Garden"],
  ["The River Race", "The Bay Race"],
  ["The Long Journey of the Monarch Butterfly", "The Long Journey of the Swiftwing Butterfly"],
]);

const parallelBlueprints: ParallelBlueprint[] = [
  {
    newTest: 11,
    difficulty: "easy",
    profile: test11Profile,
    mathCat: { sourceTest: 4, step: 5, offset: 2 },
    mathPT: { sourceTest: 5, step: 3, offset: 1 },
    elaCat: { sourceTest: 9, step: 8, offset: 3 },
    elaPT: { sourceTest: 4, step: 3, offset: 1 },
  },
  {
    newTest: 12,
    difficulty: "easy",
    profile: test12Profile,
    mathCat: { sourceTest: 9, step: 5, offset: 4 },
    mathPT: { sourceTest: 4, step: 3, offset: 2 },
    elaCat: { sourceTest: 5, step: 8, offset: 5 },
    elaPT: { sourceTest: 9, step: 3, offset: 2 },
  },
  {
    newTest: 13,
    difficulty: "medium",
    profile: test13Profile,
    mathCat: { sourceTest: 6, step: 5, offset: 1 },
    mathPT: { sourceTest: 6, step: 3, offset: 2 },
    elaCat: { sourceTest: 3, step: 8, offset: 4 },
    elaPT: { sourceTest: 6, step: 3, offset: 1 },
  },
  {
    newTest: 14,
    difficulty: "hard",
    profile: test14Profile,
    mathCat: { sourceTest: 7, step: 5, offset: 3 },
    mathPT: { sourceTest: 8, step: 3, offset: 1 },
    elaCat: { sourceTest: 10, step: 8, offset: 2 },
    elaPT: { sourceTest: 7, step: 3, offset: 2 },
  },
  {
    newTest: 15,
    difficulty: "hard",
    profile: test15Profile,
    mathCat: { sourceTest: 10, step: 5, offset: 2 },
    mathPT: { sourceTest: 7, step: 3, offset: 1 },
    elaCat: { sourceTest: 8, step: 8, offset: 6 },
    elaPT: { sourceTest: 10, step: 3, offset: 1 },
  },
];

export const parallelPracticeTestQuestions: Question[] = parallelBlueprints.flatMap(
  ({ newTest, profile, mathCat, mathPT, elaCat, elaPT }) => [
    ...cloneSet(newTest, "math", "cat", mathCat, profile),
    ...cloneSet(newTest, "math", "pt", mathPT, profile),
    ...cloneSet(newTest, "ela", "cat", elaCat, profile),
    ...cloneSet(newTest, "ela", "pt", elaPT, profile),
  ]
);
