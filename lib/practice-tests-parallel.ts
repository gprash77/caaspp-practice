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
  ["The Lost Kite", "The Missing Sketchbook"],
  ["Amy Chen", "Lena Ortiz"],
  ["Ben", "Sofia"],
  ["Mia", "Jordan"],
  ["Biscuit", "Pepper"],
  ["Mom", "Aunt May"],
  ["park", "street fair"],
  ["red kite", "blue sketchbook"],
  ["kite", "sketchbook"],
  ["yellow tail", "silver elastic band"],
  ["string", "strap"],
  ["a big gust of wind", "a sudden bump from a scooter"],
  ["wind took it", "it slipped away in the crowd"],
  ["flew away over the tall oak trees", "slid behind the food booths"],
  ["past the playground and through the picnic area", "past the ticket table and around the fountain"],
  ["caught in a bush, just on the other side of the fence", "tucked under a bench beside the fountain"],
  ["birthday gift from his grandma", "special gift from her uncle"],
  ["wrapped the string around his wrist", "clipped the strap across her shoulder"],
  ["The Lost Kite / All About Butterflies", "The Missing Sketchbook / All About Luna Moths"],
  ["All About Butterflies", "All About Luna Moths"],
  ["Butterflies", "Luna Moths"],
  ["butterflies", "luna moths"],
  ["A butterfly", "A luna moth"],
  ["a butterfly", "a luna moth"],
  ["20,000", "160,000"],
  ["orange, blue, yellow, and white", "pale green, cream, brown, and gold"],
  ["Antarctica", "the coldest polar islands"],
  ["sunflowers", "moonflowers"],
  ["marigolds", "evening primrose"],
  ["proboscis", "coiled proboscis"],
  ["gardens", "night gardens"],
  ["pollination", "pollination at dusk"],
]);

const test12Profile = makeCommonProfile("Harbor", [
  ["The Lemonade Stand", "The Smoothie Booth"],
  ["Rosa Martinez", "Mina Patel"],
  ["Lily", "Tessa"],
  ["Jake", "Marco"],
  ["Mom", "Dad"],
  ["lemonade stand", "smoothie booth"],
  ["lemonade", "smoothies"],
  ["lemons", "berries"],
  ["sugar", "yogurt"],
  ["pitcher", "blender jar"],
  ["Lemonade — 50 cents", "Smoothies — 75 cents"],
  ["Mr\\. Wilson", "Coach Rivera"],
  ["Mrs\\. Park", "Ms. Green"],
  ["mail carrier", "bike messenger"],
  ["cookies", "muffins"],
  ["The Lemonade Stand / Amazing Animal Homes", "The Smoothie Booth / Amazing Desert Animal Homes"],
  ["Amazing Animal Homes", "Amazing Desert Animal Homes"],
  ["Bird Nests", "Burrows and Shelters"],
  ["Beaver Lodges", "Fox Dens"],
  ["Underground Burrows", "Underground Tunnels"],
  ["Beehives", "Cliffside Hives"],
  ["robins", "cactus wrens"],
  ["Eagles", "Golden eagles"],
  ["hummingbirds", "elf owls"],
  ["beavers", "desert foxes"],
  ["ponds and streams", "dry washes and rocky flats"],
  ["rabbits", "kangaroo rats"],
  ["prairie dogs", "meerkat-like ground squirrels"],
  ["groundhogs", "burrowing owls"],
  ["Honeybees", "Desert bees"],
]);

const test13Profile = makeCommonProfile("Canyon", [
  ["The Lantern Bridge", "The Festival Trail"],
  ["Maya", "Leila"],
  ["Eli", "Samir"],
  ["Grandma", "Abuela"],
  ["Mr\\. Vega", "Ms. Chen"],
  ["Pine Creek", "Juniper Glen"],
  ["bridge", "trail"],
  ["Lantern Bridge", "Festival Trail"],
  ["Maple Park", "Canyon Park"],
  ["big oak tree", "stone arch"],
  ["warm rolls", "corn cakes"],
  ["The Lantern Bridge / How Rivers Shape the Land", "The Festival Trail / How Canyons Shape the Land"],
  ["How Rivers Shape the Land", "How Canyons Shape the Land"],
  ["Rivers", "Canyons"],
  ["rivers", "canyons"],
  ["river", "canyon stream"],
  ["streams", "seasonal streams"],
  ["meanders", "bends and turns"],
  ["source", "highland source"],
  ["sediment", "sand and stone"],
  ["Colorado River", "the Arroyo River"],
  ["riverbanks", "canyon walls"],
  ["river's mouth", "base of a canyon"],
]);

const test14Profile = makeCommonProfile("Summit", [
  ["The Moonlight Garden", "The Rooftop Mural"],
  ["Elena Brooks", "Carmen Hale"],
  ["Mrs\\. Alvarez", "Mr. Brooks"],
  ["Noah", "Rory"],
  ["Talia", "June"],
  ["library", "community center"],
  ["courtyard", "rooftop"],
  ["moonlight garden", "rooftop mural"],
  ["flowers", "panels"],
  ["silver leaves", "silver paint"],
  ["lamb's ear", "paint trays"],
  ["white petunias", "chalk outlines"],
  ["evening primrose", "color blocks"],
  ["bells", "wind chimes"],
  ["pear tart", "peach hand pies"],
  ["The Moonlight Garden / Why Wetlands Matter", "The Rooftop Mural / Why Tide Pools Matter"],
  ["Why Wetlands Matter", "Why Tide Pools Matter"],
  ["Wetlands", "Tide Pools"],
  ["wetlands", "tide pools"],
  ["marshes", "rock pools"],
  ["swamps", "shore pools"],
  ["frogs", "sea stars"],
  ["ducks and herons", "shorebirds and crabs"],
  ["flooding", "coastal erosion"],
  ["natural filters", "small ocean nurseries"],
  ["boardwalks", "viewing decks"],
]);

const test15Profile = makeCommonProfile("Aurora", [
  ["The River Race", "The Hill Climb"],
  ["Nadia", "Maren"],
  ["river", "trail"],
  ["current", "slope"],
  ["water", "gravel"],
  ["swimmer", "runner"],
  ["swim", "run"],
  ["swam", "ran"],
  ["The River Race / The Long Journey of the Monarch Butterfly", "The Hill Climb / The Long Journey of the Arctic Tern"],
  ["The Long Journey of the Monarch Butterfly", "The Long Journey of the Arctic Tern"],
  ["monarch", "arctic tern"],
  ["Monarch", "Arctic Tern"],
  ["butterflies", "terns"],
  ["Butterflies", "Terns"],
  ["Mexico", "Antarctica"],
  ["oyamel", "coastal"],
  ["forest", "shoreline"],
  ["milkweed", "small fish"],
  ["wings", "wings and tail"],
  ["The sun and Earth's magnetic field", "the sun, stars, and shorelines"],
]);

const parallelBlueprints: ParallelBlueprint[] = [
  {
    newTest: 11,
    difficulty: "easy",
    profile: test11Profile,
    mathCat: { sourceTest: 4, step: 5, offset: 2 },
    mathPT: { sourceTest: 4, step: 3, offset: 1 },
    elaCat: { sourceTest: 4, step: 8, offset: 3 },
    elaPT: { sourceTest: 4, step: 3, offset: 1 },
  },
  {
    newTest: 12,
    difficulty: "easy",
    profile: test12Profile,
    mathCat: { sourceTest: 5, step: 5, offset: 4 },
    mathPT: { sourceTest: 5, step: 3, offset: 2 },
    elaCat: { sourceTest: 5, step: 8, offset: 5 },
    elaPT: { sourceTest: 5, step: 3, offset: 2 },
  },
  {
    newTest: 13,
    difficulty: "medium",
    profile: test13Profile,
    mathCat: { sourceTest: 6, step: 5, offset: 1 },
    mathPT: { sourceTest: 6, step: 3, offset: 2 },
    elaCat: { sourceTest: 6, step: 8, offset: 4 },
    elaPT: { sourceTest: 6, step: 3, offset: 1 },
  },
  {
    newTest: 14,
    difficulty: "hard",
    profile: test14Profile,
    mathCat: { sourceTest: 7, step: 5, offset: 3 },
    mathPT: { sourceTest: 7, step: 3, offset: 1 },
    elaCat: { sourceTest: 7, step: 8, offset: 2 },
    elaPT: { sourceTest: 7, step: 3, offset: 2 },
  },
  {
    newTest: 15,
    difficulty: "hard",
    profile: test15Profile,
    mathCat: { sourceTest: 10, step: 5, offset: 2 },
    mathPT: { sourceTest: 10, step: 3, offset: 1 },
    elaCat: { sourceTest: 10, step: 8, offset: 6 },
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
