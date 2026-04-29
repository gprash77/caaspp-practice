import { explanations } from "./explanations";
import { practiceTestQuestions } from "./practice-tests-extra";
import { easyPracticeTestQuestions } from "./practice-tests-easy";
import { mediumPracticeTestQuestions } from "./practice-tests-medium";
import { challengePracticeTestQuestions } from "./practice-tests-challenge";
import { parallelPracticeTestQuestions } from "./practice-tests-parallel";
import { practiceTest2Questions } from "./practice-test-2";
import { practiceTest3Questions } from "./practice-test-3";
import { practiceTest4Questions } from "./practice-test-4";
import { practiceTest5Questions } from "./practice-test-5";
import { practiceTest6Questions } from "./practice-test-6";
import { practiceTest7Questions } from "./practice-test-7";
import { practiceTest8Questions } from "./practice-test-8";
import { practiceTest9Questions } from "./practice-test-9";
import { practiceTest10Questions } from "./practice-test-10";
import { practiceTest11Questions } from "./practice-test-11";
import { practiceTest12Questions } from "./practice-test-12";
import { practiceTest13Questions } from "./practice-test-13";
import { practiceTest14Questions } from "./practice-test-14";
import { practiceTest15Questions } from "./practice-test-15";
import { practiceTest16Questions } from "./practice-test-16";
import { practiceTest17Questions } from "./practice-test-17";
import { practiceTest18Questions } from "./practice-test-18";

export interface Question {
  id: number;
  subject: "math" | "ela";
  grade: number;
  claim: number;
  domain?: string;
  target: string;
  dok: number;
  standard: string;
  type:
    | "multiple-choice"
    | "multi-select"
    | "text-input"
    | "table-input"
    | "two-part"
    | "short-answer"
    | "extended-writing"
    | "grid-match"
    | "line-plot"
    | "fraction-model"
    | "shade-grid";
  testType: "cat" | "pt";
  passage?: string;
  passageTitle?: string;
  passageAuthor?: string;
  studentDirections?: string;
  dataTable?: {
    columns: string[];
    rows: { label: string; values: (string | number)[] }[];
  };
  questionText: string;
  options?: { label: string; text: string }[];
  partAPrompt?: string;
  partAOptions?: { label: string; text: string }[];
  partBPrompt?: string;
  partBOptions?: { label: string; text: string }[];
  tableColumns?: string[];
  tableRowLabel?: string;
  tableMinSumExclusive?: number;
  gridRows?: string[];
  gridColumns?: string[];
  correctAnswer: string | string[];
  acceptedAnswers?: string[];
  fractionRange?: {
    greaterThan: string;
    lessThan: string;
  };
  linePlotLabels?: string[];
  linePlotMaxDots?: number;
  shadeGrid?: {
    rows: number;
    cols: number;
    requiredCount: number;
  };
  fractionModel?: {
    thirdsMax: number;
    fourthsMax: number;
  };
  rubric: string;
  points: number;
  evidenceStatement?: string;
  explanation?: string;
  practiceTest?: number;
  audio?: {
    src: string;
    title: string;
    transcript?: string;
  };
}

const presentationAudioRollout: Record<number, Record<string, Question["audio"]>> = {
  2: {
    "Soaring on the Wings of the Wind": {
      src: "/audio/presentations/grade-3/test-2-soaring-on-the-wings-of-the-wind.m4a",
      title: "Soaring on the Wings of the Wind narration",
    },
    "All About Pizza": {
      src: "/audio/presentations/grade-3/test-2-all-about-pizza.m4a",
      title: "All About Pizza narration",
    },
  },
  3: {
    "Soaring on the Wings of the Wind": {
      src: "/audio/presentations/grade-3/test-3-soaring-on-the-wings-of-the-wind.m4a",
      title: "Soaring on the Wings of the Wind narration",
    },
    "All About Pizza": {
      src: "/audio/presentations/grade-3/test-3-all-about-pizza.m4a",
      title: "All About Pizza narration",
    },
  },
  4: {
    "Soaring on the Wings of the Wind": {
      src: "/audio/presentations/grade-3/test-4-soaring-on-the-wings-of-the-wind.m4a",
      title: "Soaring on the Wings of the Wind narration",
    },
    "All About Pizza": {
      src: "/audio/presentations/grade-3/test-4-all-about-pizza.m4a",
      title: "All About Pizza narration",
    },
  },
  5: {
    "Soaring on the Wings of the Wind": {
      src: "/audio/presentations/grade-3/test-5-soaring-on-the-wings-of-the-wind.m4a",
      title: "Soaring on the Wings of the Wind narration",
    },
    "All About Pizza": {
      src: "/audio/presentations/grade-3/test-5-all-about-pizza.m4a",
      title: "All About Pizza narration",
    },
  },
  6: {
    "Soaring on the Wings of the Wind": {
      src: "/audio/presentations/grade-3/test-6-soaring-on-the-wings-of-the-wind.m4a",
      title: "Soaring on the Wings of the Wind narration",
    },
    "All About Pizza": {
      src: "/audio/presentations/grade-3/test-6-all-about-pizza.m4a",
      title: "All About Pizza narration",
    },
  },
  7: {
    "Soaring on the Wings of the Wind": {
      src: "/audio/presentations/grade-3/test-7-soaring-on-the-wings-of-the-wind.m4a",
      title: "Soaring on the Wings of the Wind narration",
    },
    "All About Pizza": {
      src: "/audio/presentations/grade-3/test-7-all-about-pizza.m4a",
      title: "All About Pizza narration",
    },
  },
  8: {
    "Soaring on the Wings of the Wind": {
      src: "/audio/presentations/grade-3/test-8-soaring-on-the-wings-of-the-wind.m4a",
      title: "Soaring on the Wings of the Wind narration",
    },
    "All About Pizza": {
      src: "/audio/presentations/grade-3/test-8-all-about-pizza.m4a",
      title: "All About Pizza narration",
    },
  },
  9: {
    "Soaring on the Wings of the Wind": {
      src: "/audio/presentations/grade-3/test-9-soaring-on-the-wings-of-the-wind.m4a",
      title: "Soaring on the Wings of the Wind narration",
    },
    "All About Pizza": {
      src: "/audio/presentations/grade-3/test-9-all-about-pizza.m4a",
      title: "All About Pizza narration",
    },
  },
  10: {
    "Soaring on the Wings of the Wind": {
      src: "/audio/presentations/grade-3/test-10-soaring-on-the-wings-of-the-wind.m4a",
      title: "Soaring on the Wings of the Wind narration",
    },
    "All About Pizza": {
      src: "/audio/presentations/grade-3/test-10-all-about-pizza.m4a",
      title: "All About Pizza narration",
    },
  },
  11: {
    "A Chalk Picture for the Whole Block": {
      src: "/audio/presentations/grade-3/test-11-a-chalk-picture-for-the-whole-block.m4a",
      title: "A Chalk Picture for the Whole Block narration",
    },
    "Colors on a City Wall": {
      src: "/audio/presentations/grade-3/test-11-colors-on-a-city-wall.m4a",
      title: "Colors on a City Wall narration",
    },
    "A Chalk Picture for the Whole Block / Colors on a City Wall": {
      src: "/audio/presentations/grade-3/test-11-a-chalk-picture-for-the-whole-block-and-colors-on-a-city-wall.m4a",
      title: "Combined mural presentations narration",
    },
  },
  12: {
    "Soaring on the Wings of the Wind": {
      src: "/audio/presentations/grade-3/test-12-soaring-on-the-wings-of-the-wind.m4a",
      title: "Soaring on the Wings of the Wind narration",
    },
    "Pizza Around the World": {
      src: "/audio/presentations/grade-3/test-12-pizza-around-the-world.m4a",
      title: "Pizza Around the World narration",
    },
  },
  13: {
    "A Day at Ridge Museum": {
      src: "/audio/presentations/grade-3/test-13-a-day-at-ridge-museum.m4a",
      title: "A Day at Ridge Museum narration",
    },
    "Clues in Stone": {
      src: "/audio/presentations/grade-3/test-13-clues-in-stone.m4a",
      title: "Clues in Stone narration",
    },
  },
  15: {
    "Seeing the Sky From Above": {
      src: "/audio/presentations/grade-3/test-15-seeing-the-sky-from-above.m4a",
      title: "Seeing the Sky From Above narration",
    },
    "Pizza Travels the World": {
      src: "/audio/presentations/grade-3/test-15-pizza-travels-the-world.m4a",
      title: "Pizza Travels the World narration",
    },
  },
  16: {
    "Planning a School Garden": {
      src: "/audio/presentations/grade-3/test-16-planning-a-school-garden.m4a",
      title: "Planning a School Garden narration",
    },
    "Caring for Young Plants": {
      src: "/audio/presentations/grade-3/test-16-caring-for-young-plants.m4a",
      title: "Caring for Young Plants narration",
    },
  },
  17: {
    "Reading Museum Clues": {
      src: "/audio/presentations/grade-3/test-17-reading-museum-clues.m4a",
      title: "Reading Museum Clues narration",
    },
    "Protecting Old Photographs": {
      src: "/audio/presentations/grade-3/test-17-protecting-old-photographs.m4a",
      title: "Protecting Old Photographs narration",
    },
  },
  18: {
    "Taking Notes at the Shore": {
      src: "/audio/presentations/grade-3/test-18-taking-notes-at-the-shore.m4a",
      title: "Taking Notes at the Shore narration",
    },
    "Protecting Tide Pools": {
      src: "/audio/presentations/grade-3/test-18-protecting-tide-pools.m4a",
      title: "Protecting Tide Pools narration",
    },
  },
};

// ──────────────────────────────────────────
// GRADE 3 MATH QUESTIONS
// ──────────────────────────────────────────
const goGreenStimulusTable = {
  columns: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  rows: [
    { label: "3rd grade", values: [50, 60, 90, 120, 90] },
    { label: "4th grade", values: [70, 90, 100, 50, 80] },
    { label: "5th grade", values: [80, 80, 80, 80, 80] },
  ],
};

export const grade3Math: Question[] = [
  {
    id: 1,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "D",
    dok: 2,
    standard: "3.OA.D.8",
    type: "text-input",
    questionText:
      "Maria baked 76 cookies. She gave 24 cookies to her friends. How many cookies does Maria have now?",
    correctAnswer: "52",
    rubric: "The student enters the correct number of cookies.",
    points: 1,
  },
  {
    id: 2,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "NBT",
    target: "E",
    dok: 1,
    standard: "3.NBT.A.2",
    type: "text-input",
    questionText: "What is 356 + 453?",
    correctAnswer: "809",
    rubric: "The student enters the correct number.",
    points: 1,
  },
  {
    id: 3,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "A",
    dok: 1,
    standard: "3.OA.A.3",
    type: "text-input",
    questionText:
      "Jake has 3 packs of trading cards. Each pack has 5 cards. How many trading cards does Jake have in all?",
    correctAnswer: "15",
    rubric: "The student enters the correct number of trading cards.",
    points: 1,
  },
  {
    id: 4,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 3,
    domain: "OA",
    target: "F",
    dok: 2,
    standard: "3.OA.B",
    type: "multiple-choice",
    questionText:
      'A store has 24 apples arranged equally in 4 rows. Which expression can be used to find the number of apples in each row, and why?',
    options: [
      { label: "A", text: "4 × 24, because you multiply the number of rows by the total" },
      { label: "B", text: "24 + 4, because you add the total to the number of rows" },
      { label: "C", text: "24 − 4, because you subtract the number of rows from the total" },
      { label: "D", text: "24 ÷ 4, because you divide the total equally among the rows" },
    ],
    correctAnswer: "D",
    rubric: "The student identifies the correct expression and reason.",
    points: 1,
  },
  {
    id: 5,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "A",
    dok: 1,
    standard: "3.OA.A.3",
    type: "text-input",
    questionText:
      "A fish tank has 2 rows of fish. Each row has 3 fish. How many fish are in the tank?",
    correctAnswer: "6",
    rubric: "The student enters the correct number of fish.",
    points: 1,
  },
  {
    id: 6,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "MD",
    target: "G",
    dok: 1,
    standard: "3.MD.A.1",
    type: "multiple-choice",
    questionText:
      "The clock shows that school starts at 8:15 a.m. Lunch is 3 hours and 45 minutes later. What time is lunch?",
    options: [
      { label: "A", text: "11:00 a.m." },
      { label: "B", text: "11:45 a.m." },
      { label: "C", text: "12:15 p.m." },
      { label: "D", text: "12:00 p.m." },
    ],
    correctAnswer: "D",
    rubric: "The student selects the correct time.",
    points: 1,
  },
  {
    id: 7,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 2,
    domain: "NBT",
    target: "C",
    dok: 2,
    standard: "3.NBT.A.2",
    type: "multiple-choice",
    questionText:
      "Ms. Adams collected 347 cans. Mr. Baker collected 289 cans. Ms. Clark collected 312 cans. Which teacher collected the most cans?",
    options: [
      { label: "A", text: "Ms. Adams" },
      { label: "B", text: "Mr. Baker" },
      { label: "C", text: "Ms. Clark" },
      { label: "D", text: "Ms. Adams and Ms. Clark collected the same amount" },
    ],
    correctAnswer: "A",
    rubric: "The student selects the correct teacher.",
    points: 1,
  },
  {
    id: 8,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "MD",
    target: "J",
    dok: 1,
    standard: "3.MD.D.8",
    type: "text-input",
    questionText:
      "A rectangle has a length of 20 inches and a width of 10 inches. What is the perimeter of the rectangle in inches?",
    correctAnswer: "60",
    rubric: "The student enters the correct perimeter of the shape.",
    points: 1,
  },
  {
    id: 9,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "NF",
    target: "F",
    dok: 1,
    standard: "3.NF.A.3",
    type: "text-input",
    questionText:
      "Look at the number line below. It is divided into 8 equal parts from 0 to 1. Point A is at the 5th mark. What number does Point A represent? Write your answer as a whole number if the fraction equals a whole number, or as a fraction.",
    correctAnswer: "5",
    rubric: "The student enters a correct number.",
    points: 1,
  },
  {
    id: 10,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 3,
    domain: "NF",
    target: "D",
    dok: 2,
    standard: "3.NF.A.1",
    type: "multiple-choice",
    questionText:
      "Which statement about fractions is true?",
    options: [
      { label: "A", text: "1/2 is always greater than 1/3" },
      { label: "B", text: "2/4 is greater than 3/4" },
      { label: "C", text: "3/8 is less than 6/8" },
      { label: "D", text: "1/4 is equal to 1/8" },
    ],
    correctAnswer: "C",
    rubric: "The student selects the correct statement.",
    points: 1,
  },
  {
    id: 11,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "A",
    dok: 1,
    standard: "3.OA.A.4",
    type: "text-input",
    questionText: "What number makes this equation true?\n\n6 × ? = 48",
    correctAnswer: "8",
    rubric: "The student enters the correct number.",
    points: 1,
  },
  {
    id: 12,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "B",
    dok: 1,
    standard: "3.OA.B.6",
    type: "multiple-choice",
    questionText: "Which equation is related to 7 × 8 = 56?",
    options: [
      { label: "A", text: "56 + 8 = 64" },
      { label: "B", text: "56 − 7 = 49" },
      { label: "C", text: "56 ÷ 8 = 7" },
      { label: "D", text: "7 + 8 = 15" },
    ],
    correctAnswer: "C",
    rubric: "The student selects the correct equation.",
    points: 1,
  },
  {
    id: 13,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "D",
    dok: 2,
    standard: "3.OA.D.9",
    type: "text-input",
    questionText:
      "Look at the pattern: 5, 10, 15, ?, ?\n\nWhat are the next two numbers in the pattern? Enter them separated by a comma.",
    correctAnswer: "20, 25",
    rubric: "The student enters the correct numbers.",
    points: 1,
  },
  {
    id: 14,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "C",
    dok: 1,
    standard: "3.OA.C.7",
    type: "multi-select",
    questionText:
      "Decide whether each equation is true or false.\n\nSelect all of the equations that are true.",
    options: [
      { label: "A", text: "8 × 2 = 4 × 6" },
      { label: "B", text: "7 × 3 = 3 × 7" },
      { label: "C", text: "5 × 6 = 3 × 10" },
    ],
    correctAnswer: ["B", "C"],
    rubric: "The student correctly identifies the true equations.",
    points: 1,
    explanation: "8 × 2 = 16 and 4 × 6 = 24, so A is false. 7 × 3 and 3 × 7 are both 21, so B is true. 5 × 6 and 3 × 10 are both 30, so C is true.",
  },
  // ── Additional Math CAT questions ──
  {
    id: 21,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 3,
    domain: "NF",
    target: "D",
    dok: 2,
    standard: "3.NF.A.3",
    type: "multiple-choice",
    questionText:
      "Which set of fractions correctly completes these comparisons?\n\n- equal to 1\n- less than 1\n- greater than 1",
    options: [
      { label: "A", text: "2/2, 3/4, 3/2" },
      { label: "B", text: "2/3, 3/3, 2/4" },
      { label: "C", text: "4/3, 2/2, 4/4" },
      { label: "D", text: "3/4, 3/2, 2/2" },
    ],
    correctAnswer: "A",
    rubric: "The student identifies one valid set of fractions.",
    points: 1,
    explanation: "2/2 equals 1, 3/4 is less than 1, and 3/2 is greater than 1, so choice A is correct.",
  },
  {
    id: 22,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 2,
    domain: "OA",
    target: "C",
    dok: 2,
    standard: "3.OA.A.3",
    type: "multi-select",
    questionText:
      "A teacher has 12 pens. Select all of the groups that can be formed using all 12 pens with no pens left over.",
    options: [
      { label: "A", text: "2 groups of 6" },
      { label: "B", text: "3 groups of 4" },
      { label: "C", text: "5 groups of 2" },
      { label: "D", text: "4 groups of 3" },
    ],
    correctAnswer: ["A", "B", "D"],
    rubric: "The student identifies all groups that can be formed using all the pens.",
    points: 1,
    explanation: "2 × 6 = 12, 3 × 4 = 12, and 4 × 3 = 12, so those work. But 5 × 2 = 10, so choice C does not use all 12 pens.",
  },
  {
    id: 23,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 4,
    domain: "MD",
    target: "D",
    dok: 3,
    standard: "3.MD.B.3",
    type: "text-input",
    questionText:
      "Jenna made a picture graph in which each star represents some number of students. She forgot to complete the key.\n\nFavorite Color\nRed: **\nBlue: ****\nYellow: ****\nGreen: ****\n\nThe difference between the number of students who voted for blue and the number of students who voted for red is greater than 5 but less than 9.\n\nEnter a possible number of students that each star could represent.",
    correctAnswer: "3",
    acceptedAnswers: ["3", "4"],
    rubric: "The student enters a possible number of students each star could represent.",
    points: 1,
    explanation: "Blue has 4 stars and red has 2 stars, so the difference is 2 stars. If each star represents 3 students, the difference is 6. If each star represents 4 students, the difference is 8. Both are greater than 5 but less than 9.",
  },
  {
    id: 24,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "MD",
    target: "H",
    dok: 2,
    standard: "3.MD.B.4",
    type: "line-plot",
    questionText:
      "Complete the line plot by placing X marks above the values.\n\nData to plot: 1/4, 1/4, 2/4, 3/4",
    linePlotLabels: ["1/4", "2/4", "3/4", "4/4"],
    linePlotMaxDots: 4,
    correctAnswer: ["0:2", "0:1", "1:1", "2:1"],
    rubric: "The student correctly completes the line plot.",
    points: 1,
    explanation: "The line plot should show two X marks above 1/4, one X above 2/4, one X above 3/4, and none above 4/4.",
  },
  {
    id: 25,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 4,
    domain: "OA",
    target: "E",
    dok: 2,
    standard: "3.OA.D.8",
    type: "multi-select",
    questionText:
      "Kaden has 7 bags of animal toys. Each bag has these animal toys in it.\n\n- 1 whale toy\n- 5 dolphin toys\n- 2 turtle toys\n\nHow many animal toys does Kaden have altogether?\n\nSelect all of the equations that show how to find the total number, t, of animal toys.",
    options: [
      { label: "A", text: "7 × 8 = t" },
      { label: "B", text: "7 + 1 + 5 + 2 = t" },
      { label: "C", text: "7 × (1 + 5 + 2) = t" },
      { label: "D", text: "7 + (1 × 5 × 2) = t" },
    ],
    correctAnswer: ["A", "C"],
    rubric: "The student identifies the correct equations.",
    points: 1,
    explanation: "Each bag has 1 + 5 + 2 = 8 toys, so 7 × 8 = t works. The equivalent grouped expression is 7 × (1 + 5 + 2) = t.",
  },
  {
    id: 26,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 3,
    domain: "NF",
    target: "B",
    dok: 3,
    standard: "3.NF.A.3",
    type: "text-input",
    questionText:
      "Two comparisons are shown.\n\n□/□ < 2/3\n□/□ > 2/6\n\nEnter one fraction that makes both comparisons true.",
    correctAnswer: "2/4",
    fractionRange: {
      greaterThan: "2/6",
      lessThan: "2/3",
    },
    rubric: "The student enters an acceptable fraction or decimal.",
    points: 1,
    explanation: "Any value strictly between 2/6 and 2/3 is correct. For example, 2/4 equals 1/2, and 1/2 is greater than 2/6 but less than 2/3.",
  },
  {
    id: 27,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "D",
    dok: 2,
    standard: "3.OA.D.8",
    type: "text-input",
    questionText:
      "Jana has 107 wooden beads and 68 glass beads. How many more wooden beads than glass beads does Jana have?\n\nEnter your answer in the response box.",
    correctAnswer: "39",
    rubric: "The student enters the correct number of beads.",
    points: 1,
    explanation: "Subtract the number of glass beads from the number of wooden beads: 107 − 68 = 39.",
  },
  {
    id: 28,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "NF",
    target: "F",
    dok: 2,
    standard: "3.NF.A.2",
    type: "text-input",
    questionText:
      "A number line from 0 to 1 is divided into 8 equal parts. Point A is at the seventh mark after 0.\n\nEnter the fraction represented by Point A.",
    correctAnswer: "7/8",
    rubric: "The student enters a correct fraction represented by Point A.",
    points: 1,
    explanation: "If the number line is divided into 8 equal parts, each mark is one eighth. The seventh mark after 0 is 7/8.",
  },
  {
    id: 29,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 3,
    domain: "NF",
    target: "A",
    dok: 2,
    standard: "3.NF.A.3",
    type: "fraction-model",
    questionText:
      "Part A: Click the correct number of 1/3 pieces and 1/4 pieces to model equal amounts.\n\nPart B: Decide whether the number of 1/3 pieces is greater than the number of 1/4 pieces, and choose the correct comparison symbol.",
    fractionModel: {
      thirdsMax: 4,
      fourthsMax: 4,
    },
    correctAnswer: ["3", "4", "yes", ">"],
    rubric: "The student correctly models the equal amounts and identifies the correct comparison.",
    points: 2,
    explanation: "Three pieces of 1/3 and four pieces of 1/4 both make 1 whole. Since 3 is less than 4, the fractions represented are equal in size, but the number of 1/3 pieces compared to 1/4 pieces in this model is 3 versus 4. This adapted item uses the equal-whole model from the official interaction.",
  },
  {
    id: 30,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "G",
    target: "K",
    dok: 2,
    standard: "3.G.A.2",
    type: "shade-grid",
    questionText:
      "Shade 1/4 of the rectangle.",
    shadeGrid: {
      rows: 1,
      cols: 4,
      requiredCount: 1,
    },
    correctAnswer: ["0:0"],
    rubric: "The student correctly shades 1/4 of the rectangle.",
    points: 1,
    explanation: "The rectangle is divided into 4 equal parts, so shading any 1 of the 4 parts shows 1/4.",
  },
  {
    id: 31,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "B",
    dok: 1,
    standard: "3.OA.B.5",
    type: "multi-select",
    questionText:
      "Select all of the expressions that are equal to 4 × 12.",
    options: [
      { label: "A", text: "4 × (10 + 2)" },
      { label: "B", text: "(4 × 10) + 2" },
      { label: "C", text: "4 + (10 × 2)" },
    ],
    correctAnswer: ["A"],
    rubric: "The student identifies the equal expressions.",
    points: 1,
    explanation: "4 × (10 + 2) equals 4 × 12, so A is correct. (4 × 10) + 2 = 42 and 4 + (10 × 2) = 24, so B and C are not equal to 48.",
  },
  {
    id: 32,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "MD",
    target: "I",
    dok: 2,
    standard: "3.MD.C.7",
    type: "text-input",
    questionText:
      "A garden is 9 feet long and 4 feet wide. What is the area of the garden in square feet?",
    correctAnswer: "36",
    rubric: "The student enters the correct area.",
    points: 1,
  },
  {
    id: 33,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 2,
    domain: "MD",
    target: "J",
    dok: 2,
    standard: "3.MD.D.8",
    type: "text-input",
    questionText:
      "A square has sides that are each 8 inches long. What is the perimeter of the square in inches?",
    correctAnswer: "32",
    rubric: "The student enters the correct perimeter.",
    points: 1,
  },
  {
    id: 34,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 3,
    domain: "OA",
    target: "F",
    dok: 2,
    standard: "3.OA.B.5",
    type: "multiple-choice",
    questionText:
      "Which property of multiplication does this equation show?\n\n3 × (2 + 4) = (3 × 2) + (3 × 4)",
    options: [
      { label: "A", text: "Commutative property" },
      { label: "B", text: "Associative property" },
      { label: "C", text: "Distributive property" },
      { label: "D", text: "Identity property" },
    ],
    correctAnswer: "C",
    rubric: "The student selects the correct property.",
    points: 1,
  },
  {
    id: 35,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "C",
    dok: 1,
    standard: "3.OA.C.7",
    type: "text-input",
    questionText: "What is 72 ÷ 9?",
    correctAnswer: "8",
    rubric: "The student enters the correct quotient.",
    points: 1,
  },
  {
    id: 36,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "MD",
    target: "G",
    dok: 2,
    standard: "3.MD.A.1",
    type: "multiple-choice",
    questionText:
      "A movie starts at 7:15 p.m. and ends at 9:00 p.m. How long is the movie?",
    options: [
      { label: "A", text: "1 hour 15 minutes" },
      { label: "B", text: "1 hour 30 minutes" },
      { label: "C", text: "1 hour 45 minutes" },
      { label: "D", text: "2 hours 15 minutes" },
    ],
    correctAnswer: "C",
    rubric: "The student selects the correct elapsed time.",
    points: 1,
  },
  // ── Additional Math CAT questions to match real CAASPP count ──
  {
    id: 15,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "C",
    dok: 1,
    standard: "3.OA.C.7",
    type: "text-input",
    questionText:
      "Enter the unknown numbers that make each equation true.\n\nEnter the first unknown number in the first box.\nEnter the second unknown number in the second box.\n\n5 × 8 = □\n\n8 × 7 = □",
    correctAnswer: "40,56",
    rubric: "The student enters the correct products.",
    points: 1,
    explanation: "5 × 8 = 40 and 8 × 7 = 56, so the two answers are 40 and 56 in that order.",
  },
  {
    id: 16,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 3,
    domain: "MD",
    target: "F",
    dok: 2,
    standard: "3.MD.A.1",
    type: "multiple-choice",
    questionText:
      "Four number lines are described below. Each one starts at 0 minutes.\n\nWhich number line places point P at 45 minutes?",
    options: [
      { label: "A", text: "The line is marked every 20 minutes, and P is at the third mark after 0." },
      { label: "B", text: "The line is marked every 15 minutes, and P is at the third mark after 0." },
      { label: "C", text: "The line is marked every 10 minutes, and P is at the fourth mark after 0." },
      { label: "D", text: "The line is marked every 30 minutes, and P is halfway between 0 and 60." },
    ],
    correctAnswer: "B",
    rubric: "The student identifies the correct number line.",
    points: 1,
    explanation: "If the marks are every 15 minutes, the first three marks after 0 are 15, 30, and 45, so choice B is correct.",
  },
  {
    id: 17,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "MD",
    target: "I",
    dok: 2,
    standard: "3.MD.C.7",
    type: "multiple-choice",
    questionText:
      "A rectangular room is covered with 4 rows of 5 square-foot tiles. Which number shows the area of the room in square feet?",
    options: [
      { label: "A", text: "20" },
      { label: "B", text: "9" },
      { label: "C", text: "18" },
      { label: "D", text: "25" },
    ],
    correctAnswer: "A",
    rubric: "The student selects the correct number of square feet.",
    points: 1,
    explanation: "Area is found by multiplying rows by columns: 4 × 5 = 20 square feet.",
  },
  {
    id: 18,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 2,
    domain: "OA",
    target: "A",
    dok: 2,
    standard: "3.OA.D.8",
    type: "text-input",
    questionText:
      "There are 9 cherry trees.\n\n• Kim picks 8 cherries from each tree.\n• Kim eats 14 of the cherries she picked.\n\nEnter the number of cherries Kim has left.",
    correctAnswer: "58",
    rubric: "The student enters the correct number of cherries.",
    points: 1,
    explanation: "Kim picks 9 × 8 = 72 cherries and then eats 14. That leaves 72 − 14 = 58 cherries.",
  },
  {
    id: 19,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 3,
    domain: "OA",
    target: "E",
    dok: 2,
    standard: "3.OA.B.5",
    type: "multiple-choice",
    questionText:
      "Libby said the answer to the problem 5 × 2 × 3 is 25. Her work is shown.\n\n• Step 1: 5 × 2 = 10\n• Step 2: 5 × 3 = 15\n• Step 3: 10 + 15 = 25\n\nWhich is true?",
    options: [
      { label: "A", text: "Libby's answer is correct because 10 + 15 = 25." },
      { label: "B", text: "Libby's answer is correct because 2 + 3 = 5 and 5 × 5 = 25." },
      { label: "C", text: "Libby's answer is not correct because she multiplied 5 × 3 and 5 × 2." },
      { label: "D", text: "Libby's answer is not correct because she should have multiplied 10 × 15." },
    ],
    correctAnswer: "C",
    rubric: "The student identifies the correct statement.",
    points: 1,
    explanation: "Libby treated 5 × 2 × 3 like 5 × 2 plus 5 × 3, which is not the right way to solve the expression. That makes choice C correct.",
  },
  {
    id: 20,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 4,
    domain: "OA",
    target: "C",
    dok: 2,
    standard: "3.OA.D.8",
    type: "text-input",
    questionText:
      "Jamal's mother plans a trip for the baseball team.\n\n• There are 14 players on the team.\n• There are 5 parents going on the trip.\n• The players and parents will all travel together in cars.\n• Each car can hold a total of 5 people.\n• There must be at least 1 parent in each car.\n\nWhat is the fewest number of cars they will need?",
    correctAnswer: "4",
    rubric: "The student enters the fewest number of cars needed.",
    points: 1,
    explanation: "There are 14 + 5 = 19 people total. Four cars can hold 20 people, and with 5 parents available it is possible to put at least 1 parent in each car.",
  },
  // ── Math PT: Going Green (official public Grade 3 PT baseline) ──
  {
    id: 40,
    testType: "pt",
    subject: "math",
    grade: 3,
    claim: 2,
    domain: "NBT",
    target: "D",
    dok: 1,
    standard: "1.NBT.B.3",
    type: "multi-select",
    studentDirections: `**Mathematics Performance Task**

The “Go Green” company held a week-long recycling contest at your school. The grade that collects the most bottles and cans wins the contest.

Your task is to determine which grade won the “Go Green” contest.

The items that can be recycled are:

- Plastic bottles
- Aluminum cans
- Glass bottles

Students from the 3rd grade, 4th grade, and 5th grade classes collected bottles and cans and brought them to school.

Table 1 shows how many bottles and cans each grade collected on each day of the week.`,
    dataTable: goGreenStimulusTable,
    questionText:
      "Use Table 1 to help you answer this question.\n\nOn which days did the 3rd grade class collect more cans and bottles than the other two grades? Select all that apply.",
    options: [
      { label: "A", text: "Monday" },
      { label: "B", text: "Tuesday" },
      { label: "C", text: "Wednesday" },
      { label: "D", text: "Thursday" },
      { label: "E", text: "Friday" },
    ],
    correctAnswer: ["D", "E"],
    rubric: "The student selects both Thursday and Friday.",
    points: 1,
  },
  {
    id: 41,
    testType: "pt",
    subject: "math",
    grade: 3,
    claim: 2,
    domain: "NBT",
    target: "D",
    dok: 1,
    standard: "1.NBT.B.3",
    type: "text-input",
    studentDirections: `**Mathematics Performance Task**

The “Go Green” company held a week-long recycling contest at your school. The grade that collects the most bottles and cans wins the contest.

Your task is to determine which grade won the “Go Green” contest.`,
    dataTable: goGreenStimulusTable,
    questionText:
      "Use Table 1 to help you answer this question.\n\nOn Tuesday, how many more bottles and cans did the 4th grade class collect than the 3rd grade class?",
    correctAnswer: "30",
    rubric: "The student enters 30.",
    points: 1,
  },
  {
    id: 42,
    testType: "pt",
    subject: "math",
    grade: 3,
    claim: 3,
    domain: "NBT",
    target: "F",
    dok: 3,
    standard: "2.NBT.B",
    type: "short-answer",
    studentDirections: `**Mathematics Performance Task**

The “Go Green” company held a week-long recycling contest at your school. The grade that collects the most bottles and cans wins the contest.

Your task is to determine which grade won the “Go Green” contest.`,
    dataTable: goGreenStimulusTable,
    questionText:
      "You are the contest judge. You need to figure out who won the contest.\n\nDid 3rd grade, 4th grade, or 5th grade win the “Go Green” contest?\n\nUse words and numbers to clearly explain:\n• which grade won the contest, and\n• how you know they collected the most cans and bottles.",
    correctAnswer:
      "3rd grade won because they collected the most bottles and cans for the week. Their total was 50 + 60 + 90 + 120 + 90 = 410, which is more than 4th grade's 390 and 5th grade's 400.",
    rubric:
      "2 points: The student develops an approach to determine the winner and gives a justification. 1 point: The student correctly states that 3rd grade won but gives incomplete reasoning. 0 points: All other responses.",
    points: 2,
  },
  {
    id: 43,
    testType: "pt",
    subject: "math",
    grade: 3,
    claim: 4,
    domain: "OA",
    target: "A",
    dok: 3,
    standard: "2.OA.A.1",
    type: "table-input",
    studentDirections: `**Mathematics Performance Task**

The “Go Green” company held a week-long recycling contest at your school. The grade that collects the most bottles and cans wins the contest.

Your task is to determine which grade won the “Go Green” contest.`,
    dataTable: goGreenStimulusTable,
    questionText:
      "The 2nd grade class got excited about the “Go Green” contest and wanted to join in. They started collecting bottles and cans on Wednesday, even though they missed the first two days.\n\nComplete the table to show a way for the 2nd grade class to still win the contest.",
    tableColumns: ["Wednesday", "Thursday", "Friday"],
    tableRowLabel: "2nd Grade",
    tableMinSumExclusive: 410,
    correctAnswer: ["150", "150", "150"],
    rubric:
      "1 point: The student enters any numbers for Wednesday, Thursday, and Friday that add up to more than 410. 0 points: All other responses.",
    points: 1,
  },
  {
    id: 44,
    testType: "pt",
    subject: "math",
    grade: 3,
    claim: 3,
    domain: "OA",
    target: "A",
    dok: 3,
    standard: "2.OA.A",
    type: "short-answer",
    studentDirections: `**Mathematics Performance Task**

The “Go Green” company held a week-long recycling contest at your school. The grade that collects the most bottles and cans wins the contest.

Your task is to determine which grade won the “Go Green” contest.`,
    dataTable: goGreenStimulusTable,
    questionText:
      "Use your answers from questions 3 and 4 to explain how the 2nd grade class could have won the “Go Green” contest.",
    correctAnswer:
      "The 2nd grade class could have won by collecting more than 410 bottles and cans total on Wednesday, Thursday, and Friday. That is more than the 3rd grade total, so the 2nd grade class would win.",
    rubric:
      "2 points: The student uses the numbers from Questions 3 and 4 and explains that the 2nd grade total is more than the winning total. 1 point: The student gives part of the idea without clearly connecting the totals. 0 points: All other responses.",
    points: 2,
  },
];

// ──────────────────────────────────────────
// GRADE 3 ELA QUESTIONS
// ──────────────────────────────────────────

const treasurePassage = `Read the passage and answer the questions.

**Treasure in the Field**
*by Marilyn Bolchunos*

Once there was a man who lived with his two young sons on a farm in Vietnam. Since the man had to tend the field, the boys took care of the house. That is, they were supposed to take care of the house. Often the father returned home to find that nothing had been done—he even had to cook dinner.

"What have you been doing all day, Ta?" he would ask his older son.
"Studying, Father, and thinking," Ta would reply.
"And what have you been doing, Hai, my young son?" the father would ask.
"Watching the house for you," Hai would answer.

A neighbor asked the old man, "Are your sons helping you?"
"Oh, they would," the father answered, "but they are young."

Some years later, the neighbor asked, "Aren't your sons helping you in the field?"
"Oh, they would," the father replied again, "but they are still young. I will let them enjoy life now. They will help me later on."

As the years went by, it became clear even to their father that the boys were lazy. Though they sometimes tended the field with him, they always made excuses to go home early.

Finally the father grew too old to work, and he took to his bed. The sons were sad, for they not only depended on their father, but they also loved him.

One day the old man called Ta and Hai to his side and said weakly, "I have a secret to tell you, my sons. Bend close."
Hai and Ta leaned over to hear the secret.
"A while ago," the old man said, "we learned that there is treasure buried in the field. It's still there, but you must dig for it."

The sons' eyes widened.
"Treasure in the field?" Ta said. "Where?" asked Hai.
"Dig for it, and you will find it," said their father. "But promise me that you will share it equally."

The sons promised and hurried out to begin. Day after day they dug. Their neighbor was astonished to see how long and hard the young men worked. As for Ta and Hai, they felt stronger and better than ever before.

At last, the entire field had been dug, but no treasure had been found. The brothers moped around with their heads down.

Finally an idea came to Ta. "The land is ready for planting," he said to his brother. "And our rice is almost gone. You take one half of the field, and I'll take the other. We'll tend it just as Father did."

The days passed and the seedlings grew. In due time, the field gave an abundant harvest. There was rice to eat and rice to sell.

When the sons took the rice to the marketplace, it brought a good price.
Excited, Ta and Hai ran back to the house and approached their father's bedside. They dropped coins into the old man's hands.
"Look, Father," said Hai. "We have sold rice and brought you gold!"
"Yes," said Ta. "Just as you said, the treasure was in the field."

The old man smiled. They had learned his secret.`;

const sapPassage = `Read the passage and answer the questions.

**Sap's Running**
*by Stephen R. Swinburne*

The Coleman brothers—Nelson, Ralph, and Harold—step out their front door in Vermont. They feel the wind. They feel the sun on their faces.
"Sap could be running this morning," says Nelson.

As they pass 75-year-old sugar-maple trees, sap drips from holes in the trees into metal buckets. They know for sure that today will be a good day for sugaring.

Sap from sugar maples looks like water, but tastes sweet. That's because it has sugar in it. It also contains minerals from the soil. A 50-foot-high sugar maple has nearly two hundred thousand leaves. All these leaves drink in summer sunshine and make sugar. During winter, sugar is stored in the tree. Running sap in the spring contains the sugar that was made in the tree the summer before.

Every spring, the Colemans tap holes into sugar-maple trees, then hang a bucket under each hole to catch the sap. To make syrup, the sap is heated in big open pans so that most of the water will boil away. The Colemans say it takes about thirty-five gallons of sap to make one gallon of maple syrup.

More than a hundred years ago, scientist Charles Darwin wrote that sap flow was a "most mysterious subject." Since then, many people have studied how sap flows. Much of the research has been done at the University of Vermont, where sap is still being studied.

Nelson Coleman and his brothers have made maple syrup all their lives. It is a family tradition. They don't worry too much about why the sap is running in their trees this morning. They're just glad it is.

**The Iroquois Legend of Woksis and Maple Syrup**

According to legend, an Iroquois chief named Woksis yanked his tomahawk out of a maple tree one spring day. A bowl sat by the trunk of that tree. As the day warmed, sap dripped from the gash into the bowl. When Woksis's wife saw the sap in the bowl, she thought it was water. She used it to cook their meal. The sap boiled away, leaving maple syrup. When Woksis tasted the sweetened meat, he loved it. So, boiling sap to make maple syrup began.

**What Makes Sap Run?**

For years, people have thought that sap rises up from the roots of the sugar-maple tree. It doesn't. "During the time when sap flows from tap holes, the bulk flow of sap is downward," says Dr. Tim Perkins. He is a scientist at the University of Vermont.

How does sap flow? During cold nights, maple trees freeze solid. That's when water rises into the trunk and branches. The water forms frost inside tiny hollow spaces within the tree. In the morning, this frost melts and becomes sap, which flows down the tree.

Scientists say that anyone who cuts down a sugar-maple tree in freezing weather can see this is true. When the weather warms up, sap will flow from the cut end of the trunk—not from the stump.`;

const soaringPresentationSummary = `Presentation transcript-style version:

Today I am going to tell you about an event from long ago that became an important part of American history. It is called "Soaring on the Wings of the Wind," and it is about Peter Carnes and a young boy named Edward Warren Jr.

Peter Carnes wanted to show people in Baltimore that a balloon could rise into the air. During one demonstration, hot smoky air from a fire swelled the balloon and sent it up. The crowd watched closely. They yelled and clapped as Carnes sent the balloon up time and again, because many people had never seen anything like it before.

Later, Carnes developed another way to lift the balloon. He used a stove to make the balloon rise. He was the first American to develop a method to lift a balloon using hot air, and people remembered his work because it helped show that balloon flight was possible.

One part of the event was not planned. Edward Warren Jr. ended up riding in the balloon. Because of that unexpected ride, he became the first American to go up in a balloon and see those views from above.

This event mattered because it helped Americans see a new invention in action and showed that balloon flight could really happen.`;

const pizzaPresentationSummary = `Presentation transcript-style version:

Today I am giving a presentation called "All About Pizza." Many people think of pizza in only one or two ways, but pizza can be very different depending on where you are. If we look at pizza in different places, we can see that almost anything can go on a pizza.

In the United States, one of the best-known toppings is pepperoni. Many people are used to seeing pepperoni pizza, so that is a familiar example.

In other places, pizza can look very different. In India, some pizzas are topped with ginger. In Japan, some pizzas are topped with eel. These examples show that people in different countries enjoy different flavors and choose toppings that match foods they already like.

When we compare these pizzas, we can see that there is not just one correct kind of pizza. Pizza can be made in many ways, and unusual toppings can still belong on a pizza.

So the next time you think about pizza, remember that it may be better to look at it in a new way.`;

const astronautPtDirectionsPart1 = `**Student Directions**

**Astronauts Informational Performance Task**

**Task:**
Your class has been learning about different types of jobs to prepare for your school's job week. Your teacher has asked each person to learn about a different job. You think being an astronaut must be an interesting job so you decide to learn about what it is like to be an astronaut. You have found two sources about being an astronaut.

After you have looked at these sources, you will answer some questions about them. Briefly scan the sources and the three questions that follow. Then, go back and read the sources carefully so you will have the information you will need to answer the questions and complete your research. You may click on the Global Notes button to take notes on the information you find in the sources as you read. You may also use scratch paper to take notes.

In Part 2, you will write an informational article using information you have read.

**Directions for Beginning:**
You will now look at two sources. You can look at either of the sources as often as you like.

**Research Questions:**
After looking at the sources, use the rest of the time in Part 1 to answer three questions about them. Your answers to these questions will be scored. Also, your answers will help you think about the information you have read and looked at, which should help you write your informational article.

You may click on the Global Notes button or refer back to your scratch paper to look at your notes when you think it would be helpful. Answer the questions in the spaces below the items.

Both the Global Notes on the computer and your written notes on scratch paper will be available to you in Part 1 and Part 2 of the performance task.`;

const astronautPtDirectionsPart2 = `**Student Directions**

**Astronauts Informational Performance Task**

**Part 2**
You will review your notes and sources, and plan, draft, revise, and edit your writing. You may use your notes and go back to the sources. Now read your assignment and the information about how your writing will be scored, then begin your work.

**Your Assignment:**
Your teacher is creating a bulletin board display in the school library to show what your class has learned about different types of jobs. You decide to write an informational article on astronauts. Your article will be read by other students, teachers, and parents.

Using more than one source, develop a main idea about being an astronaut. Choose the most important information from the sources to support your main idea. Then, write an informational article that is several paragraphs long. Clearly organize your article and support your main idea with details from the sources. Use your own words except when quoting directly from the sources. Be sure to give the source title or number when using details from the sources.

**REMEMBER: A well-written informational article**
- has a clear main idea.
- is well-organized and stays on the topic.
- has an introduction and conclusion.
- uses transitions.
- uses details from the sources to support your main idea.
- puts the information from the sources in your own words, except when using direct quotations from the sources.
- gives the title or number of the source for the details or facts you included.
- develops ideas clearly.
- uses clear language.
- follows rules of writing (spelling, punctuation, and grammar).

Now begin work on your informational article. Manage your time carefully so that you can
1. plan your informational article.
2. write your informational article.
3. revise and edit the final draft of your article.

Word-processing tools and spell check are available to you.

For Part 2, you are being asked to write an informational article that is several paragraphs long. Type your response in the box below. The box will get bigger as you type.

Remember to check your notes and your prewriting/planning as you write, and then revise and edit your informational article.`;

const astronautSource1 = `**Source #1**
You have found a source describing the type of training that astronauts receive in order to do their job.

**What is an Astronaut?**
*by Talia Yee*

Have you ever thought about what it is like in space? Astronauts are people who go out into space. Being an astronaut is an exciting job. Astronauts who see Earth from space say that it is round, like a ball. While in space, astronauts can look down and see clouds, land, and water. Some can even see the moon up close. Astronauts get the chance to see more stars than you or I have ever seen.

Being an astronaut may be exciting, but it is not an easy job. A person who wants to be an astronaut has to study for years. There are many things an astronaut must learn to do before going into space for the first time.

*A weightless astronaut in space*

Astronauts train for hundreds of hours. During their training, they learn about space. This type of training might include studying the stars and Earth. It is important that astronauts study space so that they understand what they will work with while in space. The astronauts also learn medical skills like basic first aid during their training. This training allows them to treat simple medical problems so that they can keep each other healthy and safe in space.

In their training, astronauts also learn what life is like on the International Space Station (ISS). The ISS is a large spacecraft that orbits the earth. The ISS is a place where astronauts do science experiments while in space. Astronauts also learn to eat, exercise, and do experiments while floating in the air. They also practice riding in special vehicles that are just for space. These vehicles bring supplies like food and fuel to the ISS. The vehicles are about the size of a pick-up truck with 12 wheels. Astronauts even take classes in scuba diving.[1] When they're walking underwater in their scuba suits, astronauts feel the same as they would feel walking in space. Lastly, astronauts must also learn how to work together as a team. This is important because as many as eight astronauts may be in one spacecraft. These astronauts have to learn how to live and work together in a space.

Each astronaut has a special job to do as part of the team. Some astronauts learn how to put things together so they become good at fixing things. This is important because if something on a space ship breaks, the astronauts must be able to fix it themselves. Some astronauts are pilots who know how to fly airplanes. These astronauts have to study how to fly and steer a spaceship. They train for many hours to learn how to turn it, how to make it go faster and slower, and how to guide it through space. Some astronauts are leaders and are in charge of all of the people on the ship. They make sure that everybody is doing the right job. Other astronauts learn mostly about science. Their job is to learn how living things change when they are in space.

Although each astronaut has a special job on the team, each of them has to learn how to work where there is no gravity. When they are in a spaceship that is moving around Earth, they can feel as though they do not weigh anything. They are able to float. Many astronauts say that it is fun to float around the inside of a spaceship. Objects in the spaceship can also float, so astronauts can lift and move heavy things easily.

Feeling weightless is fun, but being in space is work for astronauts. Astronauts must be healthy and eat right. They have to exercise and be in good shape. Astronauts have many adventures, but they work hard, too.

[1] scuba diving: swimming under water with a special suit, air tank, and fins`;

const astronautSource2 = `**Source #2**
This article describes what happens to astronauts' bodies when they go into space.

**Life in Space**
*by Aaron Higgins*

Many people say they want to be an astronaut, but do they know what it's really like? When astronauts are in space, they feel weightless. They can float. This sounds like fun, but it is not that simple. The human body is used to being on Earth, but some people stay out in space for months. A lot of strange things happen to the body when it floats for that long.

Astronauts sometimes feel sick in space. It takes a few days for them to get used to feeling weightless and being able to float.

Being in space also changes how blood flows in the body. In space, more blood flows to the astronauts' heads so their faces get puffy and their necks get bigger. At the same time, less blood flows to their legs, making them skinny. They call this condition "bird legs."

The heart is a muscle that pumps blood around the body. The heart does not have to work as hard to pump blood in space. A muscle that does not work hard gets weaker and smaller. Astronauts' other muscles and their bones can also get weaker. This is because they do not have to work as hard to move the astronaut's body.

To help keep their muscles strong, astronauts have to do exercises when they are in space. They use big rubber bands attached to the walls of the space ship and hook them over their shoulders. Then they bend their knees and press against the rubber bands to make their legs stronger.

Even with regular exercise in space, astronauts come back feeling weak. It takes time for them to get back their Earth legs and learn how to live with gravity again.`;

const astronautPtPassages = astronautSource1 + "\n\n---\n\n" + astronautSource2;

export const grade3ELA: Question[] = [
  {
    id: 101,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "1",
    dok: 2,
    standard: "RL.1",
    type: "multiple-choice",
    passage: treasurePassage,
    passageTitle: "Treasure in the Field",
    questionText:
      "Which detail from the story best supports the idea that the father was patient with his sons?",
    options: [
      { label: "A", text: "The father had to tend the field by himself." },
      { label: "B", text: "The sons promised to share the treasure equally." },
      { label: "C", text: "The neighbor asked if the sons were helping." },
      {
        label: "D",
        text: '"Oh, they would," the father answered, "but they are young."',
      },
    ],
    correctAnswer: "D",
    rubric: "The student selects the correct option.",
    points: 1,
    evidenceStatement:
      "The student will identify textual evidence to support a given inference based on the text.",
  },
  {
    id: 102,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "3",
    dok: 2,
    standard: "RL.4",
    type: "multiple-choice",
    passage: treasurePassage,
    passageTitle: "Treasure in the Field",
    questionText:
      'What does the word "tended" mean as used in the passage?',
    options: [
      { label: "A", text: "Sold" },
      { label: "B", text: "Planted" },
      { label: "C", text: "Watched over" },
      { label: "D", text: "Took care of" },
    ],
    correctAnswer: "D",
    rubric: "The student selects the correct option.",
    points: 1,
    evidenceStatement:
      "The student will determine the meaning of a word or phrase based on its context.",
  },
  {
    id: 103,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "4",
    dok: 3,
    standard: "RL.3",
    type: "two-part",
    passage: treasurePassage,
    passageTitle: "Treasure in the Field",
    questionText:
      "Part A: What is the main lesson the father wanted his sons to learn?\n\nPart B: Which detail from the story best supports your answer to Part A?",
    partAPrompt: "What is the main lesson the father wanted his sons to learn?",
    partAOptions: [
      { label: "A", text: "That treasure is always buried underground" },
      { label: "B", text: "That brothers should always share equally" },
      { label: "C", text: "That neighbors are important to have" },
      { label: "D", text: "That hard work is its own reward" },
    ],
    partBPrompt: "Which detail from the story best supports your answer to Part A?",
    partBOptions: [
      { label: "A", text: "The neighbor asked if the sons were helping." },
      { label: "B", text: "The sons planted rice, tended the field, and earned money from the harvest." },
      { label: "C", text: "The father said the boys were still young." },
      { label: "D", text: "The sons promised to share the treasure equally." },
    ],
    correctAnswer: ["D", "B"],
    rubric:
      "The student selects the correct option for Part A and the correct option in Part B.",
    points: 1,
    evidenceStatement:
      "The student will form a conclusion about a literary text and identify details within the text that support that conclusion.",
  },
  {
    id: 104,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "1",
    dok: 1,
    standard: "RL.1",
    type: "multiple-choice",
    passage: treasurePassage,
    passageTitle: "Treasure in the Field",
    questionText:
      'What did the father mean when he told his sons there was "treasure buried in the field"?',
    options: [
      { label: "A", text: "There were gold coins buried under the soil." },
      { label: "B", text: "The field had valuable minerals in the ground." },
      {
        label: "C",
        text: "The reward of hard work would come from farming the field.",
      },
      { label: "D", text: "A neighbor had hidden something in the field." },
    ],
    correctAnswer: "C",
    rubric: "The student selects the correct option.",
    points: 1,
    evidenceStatement:
      "The student will identify textual evidence to support a given inference or conclusion based on the text.",
  },
  {
    id: 105,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "6",
    dok: 3,
    standard: "RL.5",
    type: "multi-select",
    passage: treasurePassage,
    passageTitle: "Treasure in the Field",
    questionText:
      "Select TWO details that show how the sons changed during the story.",
    options: [
      {
        label: "A",
        text: "They dug the entire field looking for treasure.",
      },
      { label: "B", text: "They asked their father for the secret." },
      { label: "C", text: "They made excuses to go home early." },
      { label: "D", text: "They talked to the neighbor about farming." },
      {
        label: "E",
        text: 'They tended the field "just as Father did."',
      },
    ],
    correctAnswer: ["A", "E"],
    rubric: "The student selects the two correct options.",
    points: 1,
    evidenceStatement:
      "The student will analyze or interpret why the author structured elements within the text in a certain manner and the impact of that structure on meaning.",
  },
  {
    id: 106,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "5",
    dok: 3,
    standard: "RL.3",
    type: "multiple-choice",
    passage: treasurePassage,
    passageTitle: "Treasure in the Field",
    questionText:
      "How did the father's trick affect the sons?",
    options: [
      { label: "A", text: "It made them angry at their father." },
      { label: "B", text: "It made them want to find real treasure." },
      {
        label: "C",
        text: "It taught them the value of hard work through their own experience.",
      },
      { label: "D", text: "It made them leave the farm." },
    ],
    correctAnswer: "C",
    rubric: "The student selects the correct option.",
    points: 1,
    evidenceStatement:
      "The student will analyze the relationship among character actions/interactions within one text.",
  },
  {
    id: 107,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "6",
    dok: 2,
    standard: "RL.5",
    type: "multiple-choice",
    passage: treasurePassage,
    passageTitle: "Treasure in the Field",
    questionText:
      "Why did the author include the neighbor character in the story?",
    options: [
      { label: "A", text: "To show that the neighbor wanted to help farm the field" },
      { label: "B", text: "To show that the father was a bad parent" },
      {
        label: "C",
        text: "To show how much time passed and that others noticed the sons were not helping",
      },
      { label: "D", text: "To explain how farming works in Vietnam" },
    ],
    correctAnswer: "C",
    rubric: "The student selects the correct option.",
    points: 1,
    evidenceStatement:
      "The student will analyze or interpret why the author structured elements within the text.",
  },
  {
    id: 108,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "7",
    dok: 2,
    standard: "RL.4",
    type: "multiple-choice",
    passage: treasurePassage,
    passageTitle: "Treasure in the Field",
    questionText:
      'Read this sentence from the story: "The brothers moped around with their heads down." What does the word "moped" tell the reader about the brothers?',
    options: [
      { label: "A", text: "They were excited about planting." },
      { label: "B", text: "They were sad and disappointed." },
      { label: "C", text: "They were tired from digging." },
      { label: "D", text: "They were angry at each other." },
    ],
    correctAnswer: "B",
    rubric: "The student selects the correct option.",
    points: 1,
    evidenceStatement:
      "The student will interpret the meaning of figurative words and phrases used in context.",
  },
  // Passage 2: Sap's Running (Informational)
  {
    id: 109,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "8",
    dok: 2,
    standard: "RI.1",
    type: "multiple-choice",
    passage: sapPassage,
    passageTitle: "Sap's Running",
    questionText:
      "According to the passage, why do the Coleman brothers collect sap in the spring?",
    options: [
      { label: "A", text: "Because the trees only grow in spring" },
      { label: "B", text: "Because they need water for their farm" },
      {
        label: "C",
        text: "Because sap flows in the spring when frost melts inside the trees",
      },
      { label: "D", text: "Because the University of Vermont told them to" },
    ],
    correctAnswer: "C",
    rubric: "The student selects the correct option.",
    points: 1,
    evidenceStatement:
      "The student will identify textual evidence to support a given inference or conclusion based on the text.",
  },
  {
    id: 110,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "11",
    dok: 3,
    standard: "RI.3",
    type: "two-part",
    passage: sapPassage,
    passageTitle: "Sap's Running",
    questionText:
      "This question has two parts. First, answer Part A. Then, answer Part B.",
    partAPrompt: "Click on the sentence that gives the best conclusion about sugar-maple trees.",
    partAOptions: [
      { label: "A", text: "Sugar maple trees grow best in cold weather." },
      { label: "B", text: "Most sugar maple trees are about 50 feet tall." },
      { label: "C", text: "The sap in sugar maple trees begins flowing in early spring." },
      { label: "D", text: "Vermont has the best weather for growing sugar maple trees." },
    ],
    partBPrompt: "Click on the sentence from the passage that best supports your answer in Part A. Choose one answer.",
    partBOptions: [
      { label: "A", text: "A 50-foot-high sugar maple has nearly two hundred thousand leaves." },
      { label: "B", text: "The Coleman brothers—Nelson, Ralph, and Harold—step out their front door in Vermont." },
      { label: "C", text: "Scientists say that anyone who cuts down a sugar-maple tree in freezing weather can see this is true." },
      { label: "D", text: "Every spring, the Colemans tap holes into the sugar-maple trees, then hang a bucket under each hole to catch the sap." },
    ],
    correctAnswer: ["C", "D"],
    rubric: "The student selects the correct option in Part A and the correct option in Part B.",
    points: 1,
    evidenceStatement:
      "The student will form a conclusion about an informational text and identify details that support it.",
  },
  {
    id: 111,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "12",
    dok: 3,
    standard: "RI.1",
    type: "multiple-choice",
    passage: sapPassage,
    passageTitle: "Sap's Running",
    questionText:
      "What is the author's main purpose for writing this passage?",
    options: [
      { label: "A", text: "To persuade readers to buy maple syrup" },
      { label: "B", text: "To tell an entertaining story about trees" },
      {
        label: "C",
        text: "To inform readers about how maple syrup is made and how sap flows",
      },
      { label: "D", text: "To compare different types of trees" },
    ],
    correctAnswer: "C",
    rubric: "The student selects the correct option.",
    points: 1,
    evidenceStatement: "The student will distinguish the author's point of view within a text.",
  },
  {
    id: 112,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "12",
    dok: 3,
    standard: "RI.1",
    type: "multiple-choice",
    passage: sapPassage,
    passageTitle: "Sap's Running",
    questionText:
      "Why did the author include the legend of Woksis in the passage?",
    options: [
      { label: "A", text: "To prove that maple syrup is healthy" },
      { label: "B", text: "To compare modern and ancient methods of making syrup" },
      {
        label: "C",
        text: "To show that people have been making maple syrup for a very long time",
      },
      { label: "D", text: "To explain why the Iroquois planted maple trees" },
    ],
    correctAnswer: "C",
    rubric: "The student selects the correct option.",
    points: 1,
    evidenceStatement:
      "The student will analyze the interaction between elements of a text within a text.",
  },
  {
    id: 113,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "13",
    dok: 2,
    standard: "RI.5",
    type: "multi-select",
    passage: sapPassage,
    passageTitle: "Sap's Running",
    questionText:
      'Select TWO reasons the author organized the passage with the section "What Makes Sap Run?"',
    options: [
      { label: "A", text: "To tell a funny story about trees" },
      { label: "B", text: "To make the passage more entertaining" },
      {
        label: "C",
        text: "To explain the science behind how sap flows",
      },
      {
        label: "D",
        text: "To answer a question readers might have after reading about the Colemans",
      },
      { label: "E", text: "To compare maple trees to other types of trees" },
    ],
    correctAnswer: ["C", "D"],
    rubric: "The student selects the correct two options.",
    points: 1,
    evidenceStatement:
      "The student will analyze why the author structured elements within the texts in a certain manner.",
  },
  {
    id: 114,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "14",
    dok: 2,
    standard: "L.5a",
    type: "multiple-choice",
    passage: sapPassage,
    passageTitle: "Sap's Running",
    questionText:
      'Read this sentence: "sap flow was a \'most mysterious subject.\'" What does the word "mysterious" mean?',
    options: [
      { label: "A", text: "Easy to understand" },
      { label: "B", text: "Very interesting" },
      { label: "C", text: "Not well known" },
      { label: "D", text: "Hard to explain or understand" },
    ],
    correctAnswer: "D",
    rubric: "The student selects the correct option.",
    points: 1,
    evidenceStatement:
      "The student will determine the meaning of a word or phrase based on its context in an informational text.",
  },
  // ── Official ELA CAT continuation: items 15-21 ──
  {
    id: 115,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "14",
    dok: 2,
    standard: "L.5a",
    type: "multiple-choice",
    passage: sapPassage,
    passageTitle: "Sap's Running",
    questionText:
      "Read the sentence from the passage.\n\nAll these leaves drink in summer sunshine and make sugar.\n\nWhich statement best describes what this sentence means?",
    options: [
      { label: "A", text: "Leaves grow larger in the summer." },
      { label: "B", text: "Leaves use sunlight to make sugar." },
      { label: "C", text: "Summer is the best time to collect sugar." },
      { label: "D", text: "Trees with many leaves make more sugar." },
    ],
    correctAnswer: "B",
    rubric: "The student selects the correct option.",
    points: 1,
    evidenceStatement:
      "The student will interpret the meaning of figurative words and phrases used in context and analyze its use in the text.",
  },
  {
    id: 116,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 2,
    target: "1bE",
    dok: 2,
    standard: "W.3b, W.5",
    type: "multi-select",
    questionText:
      "Ellen is writing a story for her class about a day at the beach. She wants to revise her story to use more descriptive words. Read the draft and complete the task that follows.\n\nIt was Ellen's last day of summer vacation. She raced into the garage and announced, \"Dad, we have to go to the beach today! It's our last chance this summer to go swimming and build sandcastles together!\"\n\nDad smiled happily and, together, Ellen and Dad drove 45 minutes to the beach. Once there, they set up their chairs near the water. Dad read and Ellen played.\n\nEllen worked for about an hour on her sandcastle. Then, she noticed that her dad had spent that entire time just reading a book. She felt annoyed. She looked at him.\n\nDad grinned and set his book aside. Together, the two raced into the warm, bubbly waves. They laughed with excitement.\n\nSelect two of the choices that have the best descriptive sentences to replace \"Dad read and Ellen played\" and \"She looked at him.\"",
    options: [
      { label: "A", text: "Dad enjoyed relaxing with his new book while Ellen built a sandcastle. / She gave him a look that said, \"I want you to spend time with me.\"" },
      { label: "B", text: "Dad helped Ellen build a sandcastle. / She gave him a look that said, \"I'm glad you like your book.\"" },
      { label: "C", text: "Dad read a book to Ellen and then they swam. / She looked at the pictures in the book." },
      { label: "D", text: "Dad read for a while and then built a sandcastle. / She looked at the warm, bubbly waves." },
      { label: "E", text: "Dad had a wonderful time reading while Ellen worked on her giant sandcastle. / She gave him a look that said, \"It's time to have some fun, now!\"" },
      { label: "F", text: "Dad decided that he did not like his book. / She gave him a look that said, \"You are the best dad.\"" },
    ],
    correctAnswer: ["A", "E"],
    rubric: "The student selects the correct two options.",
    points: 1,
    evidenceStatement:
      "The student will revise narrative text by identifying descriptive details that convey events or experiences.",
  },
  {
    id: 117,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 2,
    target: "3bE",
    dok: 2,
    standard: "W.2b, W.5",
    type: "multi-select",
    questionText:
      "A student is writing a report for social studies class about the state of Alaska. The student wants to revise the draft to make sure it has enough details. Read this portion of the report and complete the task that follows.\n\nAlaska is a very big state. It is bigger than Texas, California, and Montana put together! Even though it is a big state, only about 730,000 people live there. Alaska has 39 mountain ranges and two rain forests. A lot of different animals live in Alaska. In Barrow, the town located farthest north in the state, the sun doesn't set between May 10 and August 2, but between November 18 and January 23, the sun doesn't rise. Alaska is a very interesting and unusual place.\n\nMy notes on Alaska:\n• Black bears, brown bears, moose, musk ox, and whales are just a few animals that call Alaska home.\n• The capital of Alaska is Juneau.\n• There are 70,000 sea otters living in the waters of Alaska.\n• Alaska did not become a state until 1959.\n• The mountains in Alaska have the coldest temperatures in the United States.\n• Alaska is only 55 miles away from Russia.\n\nChoose the two sentences from the student's notes that add more facts to the underlined sentence.",
    options: [
      { label: "A", text: "The capital of Alaska is Juneau." },
      { label: "B", text: "Alaska did not become a state until 1959." },
      { label: "C", text: "Alaska is only 55 miles away from Russia." },
      { label: "D", text: "There are 70,000 sea otters living in the waters of Alaska." },
      { label: "E", text: "The mountains in Alaska have the coldest temperatures in the United States." },
      { label: "F", text: "Black bears, brown bears, moose, musk ox, and whales are just a few animals that call Alaska home." },
    ],
    correctAnswer: ["D", "F"],
    rubric: "The student selects the correct two options.",
    points: 1,
    evidenceStatement:
      "The student will revise informational or explanatory text by identifying the best use of elaboration techniques such as supporting details.",
  },
  {
    id: 118,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 2,
    target: "6b",
    dok: 2,
    standard: "W.1d",
    type: "multiple-choice",
    questionText:
      "A student is writing an opinion article for her teacher about her favorite field trip. The student wants to revise the draft so that it has a logical conclusion. Read the draft of the opinion article and complete the task that follows.\n\nMy favorite third-grade field trip is the trip to the zoo. There are many reasons that the zoo is the best field trip. First, when we go to the zoo, we get to ride on big buses that have televisions and bathrooms. As you can see, the best third-grade trip by far is the zoo field trip. Second, we get to eat lunch at a really great rest area with picnic tables. Also, we get to spend the whole day walking around looking at interesting animals.\n\nClick on the sentence in the draft that is in the wrong place.",
    options: [
      { label: "A", text: "My favorite third-grade field trip is the trip to the zoo." },
      { label: "B", text: "There are many reasons that the zoo is the best field trip." },
      { label: "C", text: "First, when we go to the zoo, we get to ride on big buses that have televisions and bathrooms." },
      { label: "D", text: "As you can see, the best third-grade trip by far is the zoo field trip." },
      { label: "E", text: "Second, we get to eat lunch at a really great rest area with picnic tables." },
      { label: "F", text: "Also, we get to spend the whole day walking around looking at interesting animals." },
    ],
    correctAnswer: "D",
    rubric: "The student selects the correct option.",
    points: 1,
    evidenceStatement:
      "The student will revise opinion text by identifying improved organizational elements such as organizing.",
  },
  {
    id: 119,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 2,
    target: "8",
    dok: 2,
    standard: "L.3a",
    type: "multi-select",
    questionText:
      "A student is writing an opinion paper for her teacher about dogs. Read this paragraph from the paper and the directions that follow.\n\nDogs are described as “people's best friend” because they make people happy. The fur on a dog can be long or short, or curly or straight, but most of the time it is soft. When people pet dogs, it makes them feel happy. There are community groups that bring dogs to nursing homes for the patients. Being able to play with the dogs makes the patients feel good. This is one reason why I think dogs are wonderful animals.\n\nSelect the best two words from the choices to replace the underlined words in the paragraph.",
    options: [
      { label: "A", text: "beautiful" },
      { label: "B", text: "fierce" },
      { label: "C", text: "healthier" },
      { label: "D", text: "lucky" },
      { label: "E", text: "polite" },
      { label: "F", text: "relaxed" },
    ],
    correctAnswer: ["C", "F"],
    rubric: "The student selects the correct two options.",
    points: 1,
    evidenceStatement:
      "The student will choose the correct words or phrases for audience or purpose.",
  },
  {
    id: 120,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 2,
    target: "9",
    dok: 1,
    standard: "L.2c",
    type: "multi-select",
    questionText:
      "Click on two sentences that have mistakes in punctuation.\n\nTim and I sat in the front row at the circus, and the clowns tumbled and danced in front of us. They pretended to throw water on us, but their buckets just had shiny bits of paper. Then, one clown really did spray water on me from a flower on his jacket.",
    options: [
      { label: "A", text: "“Oh, he got me! I said to Tim.”" },
      { label: "B", text: "“Yes” he laughed “he tricked you twice!”" },
      { label: "C", text: "After that, the elephants came out. The elephants did tricks like stand on their front legs." },
      { label: "D", text: "“How can those huge animals do that?” I asked Tim." },
      { label: "E", text: "“I don't know, but it's amazing,” Tim answered." },
    ],
    correctAnswer: ["A", "B"],
    rubric: "The student selects the correct two options.",
    points: 1,
    evidenceStatement:
      "The student will apply or edit the use of commas and quotation marks in dialogue.",
  },
  {
    id: 121,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 2,
    target: "9",
    dok: 1,
    standard: "L.1e",
    type: "multi-select",
    questionText:
      "Click on the sentences that use the incorrect verb tenses.",
    options: [
      { label: "A", text: "Standing on the stage, I could feel my heart beating in my chest." },
      { label: "B", text: "I sings my song on the stage with my friends." },
      { label: "C", text: "The audience clapped loudly." },
      { label: "D", text: "I take a bow and walked off the stage with a smile on my face." },
    ],
    correctAnswer: ["B", "D"],
    rubric: "The student selects the correct two options.",
    points: 1,
    evidenceStatement:
      "The student will apply or edit the use of simple verb tenses in a text.",
  },
  {
    id: 122,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 3,
    target: "4",
    dok: 3,
    standard: "SL.2",
    type: "two-part",
    passage: soaringPresentationSummary,
    passageTitle: "Soaring on the Wings of the Wind",
    passageAuthor: "Lois Miner Huey",
    studentDirections:
      'Listen to the presentation. Then answer the questions.\n\n"Soaring on the Wings of the Wind" by Lois Miner Huey.',
    questionText:
      "This question has two parts. First, answer Part A. Then, answer Part B.",
    partAPrompt: "What is the most likely reason the author made the presentation?",
    partAOptions: [
      { label: "A", text: "to explain how a hot air balloon works" },
      { label: "B", text: "to show the advantages of being small" },
      { label: "C", text: "to tell how Americans feel about new experiences" },
      { label: "D", text: "to describe an important event in American history" },
    ],
    partBPrompt: "Which sentence from the presentation best supports your answer in part A?",
    partBOptions: [
      { label: "A", text: '"Smoky hot air swelled the balloon and sent it up."' },
      { label: "B", text: '"He was the first American to develop a method to lift a balloon using hot air."' },
      { label: "C", text: '"The crowd yelled and clapped as Carnes sent the balloon up, time and again."' },
      { label: "D", text: '"He was the first American to see such views."' },
    ],
    correctAnswer: ["D", "B"],
    rubric: "The student selects the correct option in Part A and the correct option in Part B.",
    points: 1,
    evidenceStatement:
      "The student will determine a speaker's purpose and identify details that support it.",
  },
  {
    id: 123,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 3,
    target: "4",
    dok: 2,
    standard: "SL.2",
    type: "multiple-choice",
    passage: soaringPresentationSummary,
    passageTitle: "Soaring on the Wings of the Wind",
    passageAuthor: "Lois Miner Huey",
    studentDirections:
      'Listen to the presentation. Then answer the questions.\n\n"Soaring on the Wings of the Wind" by Lois Miner Huey.',
    questionText:
      "Which question can a listener answer after hearing the presentation?",
    options: [
      { label: "A", text: "In what year did the balloon ride take place?" },
      { label: "B", text: "What happened during the first hot air balloon ride?" },
      { label: "C", text: "How did Edward feel after he took his ride in the balloon?" },
      { label: "D", text: "How did Edward become the first American to ride in a balloon?" },
    ],
    correctAnswer: "D",
    rubric: "The student selects the correct option.",
    points: 1,
    evidenceStatement:
      "The student will identify information that can be determined from an oral presentation.",
  },
  {
    id: 124,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 3,
    target: "4",
    dok: 2,
    standard: "SL.2",
    type: "grid-match",
    passage: soaringPresentationSummary,
    passageTitle: "Soaring on the Wings of the Wind",
    passageAuthor: "Lois Miner Huey",
    studentDirections:
      'Listen to the presentation. Then answer the questions.\n\n"Soaring on the Wings of the Wind" by Lois Miner Huey.',
    questionText:
      "Complete the chart to show which events were planned.\n\nClick in the boxes next to the events that match if they were planned or unplanned.",
    gridRows: [
      "Edward Warren Jr. rode in a balloon.",
      "The balloon filled with smoke from a fire.",
      "A crowd in Baltimore saw how a balloon could fly.",
      "Peter Carnes used a stove to make the balloon rise.",
    ],
    gridColumns: ["Planned", "Unplanned"],
    correctAnswer: ["0:1", "1:0", "2:0", "3:0"],
    rubric: "The student correctly identifies which events were planned and which were unplanned.",
    points: 1,
    evidenceStatement:
      "The student will distinguish among ideas and events presented orally.",
  },
  {
    id: 125,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 3,
    target: "4",
    dok: 2,
    standard: "SL.2",
    type: "multiple-choice",
    passage: pizzaPresentationSummary,
    passageTitle: "All About Pizza",
    passageAuthor: "Marcia Amidon Lusted",
    studentDirections:
      'Listen to the presentation. Then answer the questions.\n\n"All About Pizza" by Marcia Amidon Lusted.',
    questionText:
      "Which conclusion is supported by the presentation?",
    options: [
      { label: "A", text: "Americans eat pizza every day." },
      { label: "B", text: "Pizza is usually eaten at lunchtime." },
      { label: "C", text: "Almost anything can go on a pizza." },
      { label: "D", text: "Lobster pizza is most popular in Maine." },
    ],
    correctAnswer: "C",
    rubric: "The student selects the correct option.",
    points: 1,
    evidenceStatement:
      "The student will determine a supported conclusion from an oral presentation.",
  },
  {
    id: 126,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 3,
    target: "4",
    dok: 2,
    standard: "SL.2",
    type: "grid-match",
    passage: pizzaPresentationSummary,
    passageTitle: "All About Pizza",
    passageAuthor: "Marcia Amidon Lusted",
    studentDirections:
      'Listen to the presentation. Then answer the questions.\n\n"All About Pizza" by Marcia Amidon Lusted.',
    questionText:
      "Complete the chart to show which countries are known for which pizza toppings.\n\nClick in the boxes next to the countries that match the toppings.",
    gridRows: ["United States", "India", "Japan"],
    gridColumns: ["eel", "pepperoni", "ginger"],
    correctAnswer: ["2:0", "0:1", "1:2"],
    rubric: "The student correctly matches each topping to the country from the presentation.",
    points: 1,
    evidenceStatement:
      "The student will organize information presented orally into a chart.",
  },
  {
    id: 127,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 3,
    target: "4",
    dok: 2,
    standard: "SL.3",
    type: "multiple-choice",
    passage: pizzaPresentationSummary,
    passageTitle: "All About Pizza",
    passageAuthor: "Marcia Amidon Lusted",
    studentDirections:
      'Listen to the presentation. Then answer the questions.\n\n"All About Pizza" by Marcia Amidon Lusted.',
    questionText:
      "What is the most likely reason the author made the presentation?",
    options: [
      { label: "A", text: "to suggest another way of looking at pizza" },
      { label: "B", text: "to change what people think is good pizza" },
      { label: "C", text: "to show why pepperoni pizza is the best kind" },
      { label: "D", text: "to explain why pizza is different in other places" },
    ],
    correctAnswer: "A",
    rubric: "The student selects the correct option.",
    points: 1,
    evidenceStatement:
      "The student will determine a speaker's likely purpose for a presentation.",
  },
  {
    id: 128,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 2,
    target: "1",
    dok: 2,
    standard: "W.8",
    type: "multi-select",
    questionText:
      "A student is writing a research report about the human eye. Read the sentences from her report and the directions that follow.\n\nOur eyes are wonderful body parts. They help us see the beauty of the world. In the center of the eye is a black spot. Have you ever wondered why that spot gets bigger and smaller?\n\nChoose two of the sources that would most likely give the student more information about the ideas she has written.",
    options: [
      { label: "A", text: "www.eye.color.com, a website that tells about the colors of people's eyes" },
      { label: "B", text: "www.eyequestion.com, a website that explains the job of each part of the eye" },
      { label: "C", text: "Eyes and How They Work, a book that tells about the way that the eye parts work" },
      { label: "D", text: "www.eye.food.com, a website that tells what we should eat to help our eyes stay healthy" },
      { label: "E", text: "My Job as an Eye Doctor, a book that tells about being a doctor who takes care of people's eyes" },
      { label: "F", text: "You Can Find It, a children's magazine that has many puzzles and games where you look for the hidden things" },
    ],
    correctAnswer: ["B", "C"],
    rubric: "The student selects the two sources that best support the student's research focus.",
    points: 1,
    evidenceStatement:
      "The student will evaluate sources for relevance to a research topic.",
  },
  {
    id: 129,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "8",
    dok: 2,
    standard: "W.8",
    type: "multiple-choice",
    questionText:
      "A student is writing a report about red foxes. She is looking for information about the body of the red fox. Which sentence has information that the student can use?",
    options: [
      { label: "A", text: "There are over twenty different kinds of foxes." },
      { label: "B", text: "Red foxes can live in hot deserts and snowy forests." },
      { label: "C", text: "The red fox wraps its fluffy tail around itself like a blanket." },
      { label: "D", text: "Red foxes are often clever characters in children's stories." },
    ],
    correctAnswer: "C",
    rubric: "The student selects the sentence that gives the relevant body detail.",
    points: 1,
    evidenceStatement:
      "The student will identify relevant source information for research.",
  },
  {
    id: 130,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 2,
    target: "1",
    dok: 2,
    standard: "W.8",
    type: "multiple-choice",
    questionText:
      "A student is writing a research report about different kinds of fruit. He wrote an opinion in the report. Read the sentences from the student's report and the directions that follow.\n\nMany Kinds of Fruit\n\nA fruit is the part of the plant that has the plant's seeds. There are many kinds of fruits. Some that are popular with kids are apples, bananas, grapes, oranges, and strawberries. Sometimes it is confusing to tell if a food is a fruit.\n\nThe student found another source about different kinds of fruit. Which sentence best supports the student's opinion?",
    options: [
      { label: "A", text: "For example, it is hard to tell what some foods are when they are cut up in pieces." },
      { label: "B", text: "For example, a tomato is not sweet, but it is a fruit because it has the seeds." },
      { label: "C", text: "For example, some kids don't like some of the fruits on that list." },
      { label: "D", text: "For example, fruits can be many different shapes and colors." },
    ],
    correctAnswer: "B",
    rubric: "The student selects the sentence that best supports the opinion in the report.",
    points: 1,
    evidenceStatement:
      "The student will identify evidence that supports an opinion in a research report.",
  },
  // ── ELA PT: Performance Task matching real CAASPP format ──
  // Student Directions + sources + grid matching + short answer + full essay
  {
    id: 150,
    testType: "pt",
    subject: "ela",
    grade: 3,
    claim: 4,
    target: "2",
    dok: 2,
    standard: "W.8, RI.1",
    type: "grid-match",
    passage: astronautPtPassages,
    passageTitle: "Student Directions",
    studentDirections: astronautPtDirectionsPart1,
    questionText:
      "Click on the boxes to match each source with the idea or ideas that it supports. Some ideas may have more than one source selected.",
    gridRows: [
      "Astronauts feel weak when they come back from space.",
      "Since objects are also able to float in space, astronauts can easily lift things in space that are heavy on Earth.",
      "Astronauts have a special view of Earth from space.",
    ],
    gridColumns: [
      "Source #1: What is an Astronaut?",
      "Source #2: Life in Space",
    ],
    correctAnswer: ["0:1", "1:0", "2:0"],
    rubric: "The student correctly matches ideas to the appropriate sources.",
    points: 1,
    evidenceStatement: "The student will select evidence to support opinions based on evidence collected.",
  },
  {
    id: 151,
    testType: "pt",
    subject: "ela",
    grade: 3,
    claim: 4,
    target: "3",
    dok: 3,
    standard: "W.1b",
    type: "short-answer",
    passage: astronautPtPassages,
    passageTitle: "Student Directions",
    studentDirections: astronautPtDirectionsPart1,
    questionText:
      "Explain why it is hard to be an astronaut. Give two reasons, one from Source #1 and one from Source #2. For each reason, include the source title or number.",
    correctAnswer:
      "It is hard to be an astronaut because living in space is difficult on an astronaut's body. Source #1 says that astronauts must be healthy and eat right and have to exercise to do their job. Source #2 says that being in space changes how blood flows in the body and can make astronauts weak, so they must exercise to keep their bodies strong.",
    rubric: "2 points: Response gives two evidence-based reasons, one from each source, and explains how each supports the claim while citing the sources. 1 point: Response gives partial evidence or limited explanation, or uses only one source well. 0 points: Incorrect, irrelevant, insufficient, or blank response.",
    points: 2,
    evidenceStatement: "The student will select evidence to support opinions based on evidence collected.",
  },
  {
    id: 152,
    testType: "pt",
    subject: "ela",
    grade: 3,
    claim: 2,
    target: "1aI",
    dok: 4,
    standard: "W.2b",
    type: "extended-writing",
    passage: astronautPtPassages,
    passageTitle: "Student Directions",
    studentDirections: astronautPtDirectionsPart2,
    questionText: "",
    correctAnswer: "extended-writing-rubric",
    rubric: "4 points: Clear, focused informational article about being an astronaut with strong organization, source-based details, attribution, and effective language. 3 points: Adequate informational article with mostly clear organization and relevant evidence. 2 points: Uneven organization or limited source use and development. 1 point: Minimal or unclear response with little evidence. Conventions are judged holistically.",
    points: 4,
    evidenceStatement: "The student will write a full informational article using evidence from multiple sources.",
  },
];

function mergeExplanations(questions: Question[]): Question[] {
  return questions.map((q) => ({
    ...q,
    explanation: q.explanation || explanations[q.id] || "See the rubric for scoring guidance.",
    audio:
      q.audio ||
      (q.practiceTest && q.passageTitle
        ? presentationAudioRollout[q.practiceTest]?.[q.passageTitle]
        : undefined),
  }));
}

export function getQuestions(
  grade: number,
  subject: "math" | "ela",
  testType: "cat" | "pt" = "cat",
  practiceTest: number = 1
): Question[] {
  if (practiceTest > 1) {
    const dedicatedPracticeTests: Record<number, Question[]> = {
      2: practiceTest2Questions,
      3: practiceTest3Questions,
      4: practiceTest4Questions,
      5: practiceTest5Questions,
      6: practiceTest6Questions,
      7: practiceTest7Questions,
      8: practiceTest8Questions,
      9: practiceTest9Questions,
      10: practiceTest10Questions,
      11: practiceTest11Questions,
      12: practiceTest12Questions,
      13: practiceTest13Questions,
      14: practiceTest14Questions,
      15: practiceTest15Questions,
      16: practiceTest16Questions,
      17: practiceTest17Questions,
      18: practiceTest18Questions,
    };

    const dedicatedQuestions = dedicatedPracticeTests[practiceTest];
    if (dedicatedQuestions) {
      return mergeExplanations(
        dedicatedQuestions
          .filter(
            (q) =>
              q.grade === grade &&
              q.subject === subject &&
              q.testType === testType &&
              q.practiceTest === practiceTest
          )
          .sort((a, b) => a.id - b.id)
      );
    }

    const extra = [
      ...practiceTestQuestions,
      ...easyPracticeTestQuestions,
      ...mediumPracticeTestQuestions,
      ...challengePracticeTestQuestions,
      ...parallelPracticeTestQuestions,
    ].filter(
      (q) =>
        q.grade === grade &&
        q.subject === subject &&
        q.testType === testType &&
        q.practiceTest === practiceTest
    );
    return mergeExplanations(extra.sort((a, b) => a.id - b.id));
  }
  let questions: Question[] = [];
  if (grade === 3 && subject === "math") questions = grade3Math;
  if (grade === 3 && subject === "ela") questions = grade3ELA;
  return mergeExplanations(
    questions.filter((q) => q.testType === testType).sort((a, b) => a.id - b.id)
  );
}

// Fetch questions from Supabase
export async function fetchQuestions(
  grade: number,
  subject: "math" | "ela",
  testType: "cat" | "pt" = "cat",
  practiceTest: number = 1
): Promise<Question[]> {
  // Local question banks are the source of truth while Test 1 baseline work is in progress.
  const localQuestions = getQuestions(grade, subject, testType, practiceTest);
  if (localQuestions.length > 0) {
    return localQuestions;
  }

  const { supabase } = await import("./supabase");
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("grade", grade)
    .eq("subject", subject)
    .eq("test_type", testType)
    .order("id");

  if (error) {
    console.error("Supabase fetch error:", error.message);
    return localQuestions;
  }

  if (!data || data.length === 0 || data.length < localQuestions.length) {
    return localQuestions;
  }

  // Map snake_case DB columns to camelCase Question interface
  return mergeExplanations(data.map((row) => ({
    id: row.id,
    subject: row.subject,
    grade: row.grade,
    claim: row.claim,
    domain: row.domain || undefined,
    target: row.target,
    dok: row.dok,
    standard: row.standard,
    type: row.type,
    testType: row.test_type,
    passage: row.passage || undefined,
    passageTitle: row.passage_title || undefined,
    passageAuthor: row.passage_author || undefined,
    studentDirections: row.student_directions || undefined,
    questionText: row.question_text,
    options: row.options || undefined,
    gridRows: row.grid_rows || undefined,
    gridColumns: row.grid_columns || undefined,
    correctAnswer: row.correct_answer,
    rubric: row.rubric,
    points: row.points,
    evidenceStatement: row.evidence_statement || undefined,
    practiceTest: row.practice_test || undefined,
    audio: row.audio_src
      ? {
          src: row.audio_src,
          title: row.audio_title || row.passage_title || "Presentation audio",
          transcript: row.audio_transcript || row.passage || undefined,
        }
      : undefined,
  })));
}

// Total number of available practice tests
export const TOTAL_PRACTICE_TESTS = 18;

// Claim descriptions for reporting
export const mathClaims: Record<number, string> = {
  1: "Concepts & Procedures",
  2: "Problem Solving",
  3: "Communicating Reasoning",
  4: "Modeling & Data Analysis",
};

export const elaClaims: Record<number, string> = {
  1: "Reading",
  2: "Writing",
  3: "Listening",
  4: "Research/Inquiry",
};

export const mathDomains: Record<string, string> = {
  OA: "Operations & Algebraic Thinking",
  NBT: "Number & Operations in Base Ten",
  NF: "Number & Operations—Fractions",
  MD: "Measurement & Data",
  G: "Geometry",
};
