import { supabase } from "./supabase";

export interface Question {
  id: number;
  subject: "math" | "ela";
  grade: number;
  claim: number;
  domain?: string;
  target: string;
  dok: number;
  standard: string;
  type: "multiple-choice" | "multi-select" | "text-input" | "two-part" | "short-answer" | "extended-writing" | "grid-match";
  testType: "cat" | "pt";
  passage?: string;
  passageTitle?: string;
  passageAuthor?: string;
  studentDirections?: string;
  questionText: string;
  options?: { label: string; text: string }[];
  gridRows?: string[];
  gridColumns?: string[];
  correctAnswer: string | string[];
  rubric: string;
  points: number;
  evidenceStatement?: string;
}

// ──────────────────────────────────────────
// GRADE 3 MATH QUESTIONS
// ──────────────────────────────────────────
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
    type: "text-input",
    questionText: "What is 5 × 8?",
    correctAnswer: "40",
    rubric: "The student enters the correct product.",
    points: 1,
  },
  // ── Additional Math CAT questions ──
  {
    id: 21,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "G",
    target: "K",
    dok: 1,
    standard: "3.G.A.1",
    type: "multiple-choice",
    questionText:
      "Which shape has exactly 4 sides that are all the same length and 4 right angles?",
    options: [
      { label: "A", text: "Rectangle" },
      { label: "B", text: "Rhombus" },
      { label: "C", text: "Square" },
      { label: "D", text: "Trapezoid" },
    ],
    correctAnswer: "C",
    rubric: "The student selects the correct shape.",
    points: 1,
  },
  {
    id: 22,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "G",
    target: "K",
    dok: 2,
    standard: "3.G.A.2",
    type: "multiple-choice",
    questionText:
      "A square is divided into 4 equal parts. What fraction of the square does each part represent?",
    options: [
      { label: "A", text: "1/2" },
      { label: "B", text: "1/3" },
      { label: "C", text: "1/4" },
      { label: "D", text: "1/8" },
    ],
    correctAnswer: "C",
    rubric: "The student selects the correct fraction.",
    points: 1,
  },
  {
    id: 23,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "MD",
    target: "H",
    dok: 2,
    standard: "3.MD.B.3",
    type: "multiple-choice",
    questionText:
      "A bar graph shows the favorite fruits of students in a class: Apples = 8, Bananas = 5, Grapes = 3, Oranges = 6. How many more students chose apples than grapes?",
    options: [
      { label: "A", text: "3" },
      { label: "B", text: "5" },
      { label: "C", text: "11" },
      { label: "D", text: "2" },
    ],
    correctAnswer: "B",
    rubric: "The student selects the correct difference.",
    points: 1,
  },
  {
    id: 24,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "MD",
    target: "G",
    dok: 2,
    standard: "3.MD.A.2",
    type: "multiple-choice",
    questionText:
      "A water bottle holds 500 milliliters. Emma drinks 175 milliliters. How much water is left in the bottle?",
    options: [
      { label: "A", text: "225 milliliters" },
      { label: "B", text: "325 milliliters" },
      { label: "C", text: "375 milliliters" },
      { label: "D", text: "675 milliliters" },
    ],
    correctAnswer: "B",
    rubric: "The student selects the correct amount.",
    points: 1,
  },
  {
    id: 25,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "NF",
    target: "F",
    dok: 2,
    standard: "3.NF.A.3",
    type: "multiple-choice",
    questionText:
      "Which two fractions are equal?",
    options: [
      { label: "A", text: "1/2 and 2/4" },
      { label: "B", text: "1/3 and 1/4" },
      { label: "C", text: "2/6 and 2/8" },
      { label: "D", text: "3/4 and 3/8" },
    ],
    correctAnswer: "A",
    rubric: "The student selects the correct equivalent fractions.",
    points: 1,
  },
  {
    id: 26,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "NF",
    target: "F",
    dok: 1,
    standard: "3.NF.A.1",
    type: "multiple-choice",
    questionText:
      "A pizza is cut into 8 equal slices. Mia eats 3 slices. What fraction of the pizza did Mia eat?",
    options: [
      { label: "A", text: "3/5" },
      { label: "B", text: "3/8" },
      { label: "C", text: "5/8" },
      { label: "D", text: "8/3" },
    ],
    correctAnswer: "B",
    rubric: "The student selects the correct fraction.",
    points: 1,
  },
  {
    id: 27,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "A",
    dok: 2,
    standard: "3.OA.A.3",
    type: "text-input",
    questionText:
      "There are 4 shelves in a bookcase. Each shelf holds 7 books. How many books can the bookcase hold in all?",
    correctAnswer: "28",
    rubric: "The student enters the correct number of books.",
    points: 1,
  },
  {
    id: 28,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "B",
    dok: 2,
    standard: "3.OA.A.4",
    type: "text-input",
    questionText:
      "There are 36 students in the gym. The teacher puts them into equal groups of 9. How many groups are there?",
    correctAnswer: "4",
    rubric: "The student enters the correct number of groups.",
    points: 1,
  },
  {
    id: 29,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "NBT",
    target: "E",
    dok: 1,
    standard: "3.NBT.A.1",
    type: "multiple-choice",
    questionText:
      "What is 482 rounded to the nearest ten?",
    options: [
      { label: "A", text: "480" },
      { label: "B", text: "490" },
      { label: "C", text: "500" },
      { label: "D", text: "400" },
    ],
    correctAnswer: "A",
    rubric: "The student selects the correct rounded number.",
    points: 1,
  },
  {
    id: 30,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "NBT",
    target: "E",
    dok: 1,
    standard: "3.NBT.A.2",
    type: "text-input",
    questionText:
      "What is 700 − 258?",
    correctAnswer: "442",
    rubric: "The student enters the correct difference.",
    points: 1,
  },
  {
    id: 31,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "NBT",
    target: "E",
    dok: 1,
    standard: "3.NBT.A.3",
    type: "text-input",
    questionText:
      "What is 6 × 70?",
    correctAnswer: "420",
    rubric: "The student enters the correct product.",
    points: 1,
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
  {
    id: 37,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "MD",
    target: "H",
    dok: 2,
    standard: "3.MD.B.4",
    type: "multiple-choice",
    questionText:
      "Four students measured their pencils. The lengths were: 5 inches, 6 inches, 6 inches, and 7 inches. What is the most common pencil length?",
    options: [
      { label: "A", text: "5 inches" },
      { label: "B", text: "6 inches" },
      { label: "C", text: "7 inches" },
      { label: "D", text: "8 inches" },
    ],
    correctAnswer: "B",
    rubric: "The student selects the correct mode.",
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
    target: "A",
    dok: 2,
    standard: "3.OA.A.1",
    type: "multiple-choice",
    questionText:
      "A farmer plants 6 rows of tomato plants. Each row has 7 plants. Which expression shows how to find the total number of tomato plants?",
    options: [
      { label: "A", text: "6 + 7" },
      { label: "B", text: "6 × 7" },
      { label: "C", text: "7 − 6" },
      { label: "D", text: "7 ÷ 6" },
    ],
    correctAnswer: "B",
    rubric: "The student selects the multiplication expression.",
    points: 1,
  },
  {
    id: 16,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "NF",
    target: "F",
    dok: 2,
    standard: "3.NF.A.2",
    type: "multiple-choice",
    questionText:
      "Which point on the number line represents the fraction 3/4?",
    options: [
      { label: "A", text: "Point A, which is at 1/4" },
      { label: "B", text: "Point B, which is at 2/4" },
      { label: "C", text: "Point C, which is at 3/4" },
      { label: "D", text: "Point D, which is at 4/4" },
    ],
    correctAnswer: "C",
    rubric: "The student identifies the correct position of 3/4 on a number line.",
    points: 1,
  },
  {
    id: 17,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "MD",
    target: "G",
    dok: 1,
    standard: "3.MD.C.5",
    type: "text-input",
    questionText:
      "A rectangle is divided into square units. It has 4 rows and 6 columns of unit squares. What is the area of the rectangle in square units?",
    correctAnswer: "24",
    rubric: "The student calculates the area by multiplying rows by columns.",
    points: 1,
  },
  {
    id: 18,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "B",
    dok: 2,
    standard: "3.OA.B.5",
    type: "multiple-choice",
    questionText:
      "Which equation shows the distributive property applied to 4 × 7?",
    options: [
      { label: "A", text: "(4 × 5) + (4 × 2) = 28" },
      { label: "B", text: "(4 + 5) × (4 + 2) = 54" },
      { label: "C", text: "4 × 7 = 7 × 4" },
      { label: "D", text: "4 × (7 + 0) = 28" },
    ],
    correctAnswer: "A",
    rubric: "The student identifies the distributive property decomposition.",
    points: 1,
  },
  {
    id: 19,
    testType: "cat",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "MD",
    target: "I",
    dok: 2,
    standard: "3.MD.A.2",
    type: "multiple-choice",
    questionText:
      "Sarah has a water bottle that holds 1 liter. She drinks 400 milliliters at lunch. How many milliliters of water are left in the bottle?",
    options: [
      { label: "A", text: "400 milliliters" },
      { label: "B", text: "500 milliliters" },
      { label: "C", text: "600 milliliters" },
      { label: "D", text: "1,400 milliliters" },
    ],
    correctAnswer: "C",
    rubric: "The student converts 1 liter to 1000 mL and subtracts correctly.",
    points: 1,
  },
  // ── Math PT: School Fun Fair (themed scenario) ──
  {
    id: 40,
    testType: "pt",
    subject: "math",
    grade: 3,
    claim: 2,
    domain: "OA",
    target: "A",
    dok: 2,
    standard: "3.OA.D.8",
    type: "multiple-choice",
    questionText:
      "The third-grade class is planning a School Fun Fair. They need to set up game booths and buy supplies.\n\nThere are 72 students in the third grade. The teachers want to divide them into equal teams of 8 for the relay race. How many teams will there be?",
    options: [
      { label: "A", text: "7 teams" },
      { label: "B", text: "8 teams" },
      { label: "C", text: "9 teams" },
      { label: "D", text: "10 teams" },
    ],
    correctAnswer: "C",
    rubric: "The student selects the correct number of teams.",
    points: 1,
  },
  {
    id: 41,
    testType: "pt",
    subject: "math",
    grade: 3,
    claim: 2,
    domain: "MD",
    target: "I",
    dok: 2,
    standard: "3.MD.C.7",
    type: "text-input",
    questionText:
      "Each game booth at the Fun Fair needs a rectangular space that is 6 feet long and 4 feet wide. What is the area of the space needed for one booth, in square feet?",
    correctAnswer: "24",
    rubric: "The student enters the correct area.",
    points: 1,
  },
  {
    id: 42,
    testType: "pt",
    subject: "math",
    grade: 3,
    claim: 4,
    domain: "OA",
    target: "C",
    dok: 2,
    standard: "3.OA.D.8",
    type: "text-input",
    questionText:
      "The class raised $156 from ticket sales and $98 from bake sale donations. They need to spend $75 on supplies. How much money will the class have left after buying supplies?",
    correctAnswer: "179",
    rubric: "The student enters the correct amount.",
    points: 1,
  },
  {
    id: 43,
    testType: "pt",
    subject: "math",
    grade: 3,
    claim: 3,
    domain: "OA",
    target: "E",
    dok: 2,
    standard: "3.OA.A.3",
    type: "multiple-choice",
    questionText:
      "The class wants to give out 5 prize bags at each of the 6 game booths. Each prize bag costs $3. Which expression shows the total cost of all the prize bags?",
    options: [
      { label: "A", text: "5 + 6 + 3" },
      { label: "B", text: "(5 × 6) × 3" },
      { label: "C", text: "5 × 6 + 3" },
      { label: "D", text: "(5 + 6) × 3" },
    ],
    correctAnswer: "B",
    rubric: "The student selects the correct expression.",
    points: 1,
  },
  {
    id: 44,
    testType: "pt",
    subject: "math",
    grade: 3,
    claim: 2,
    domain: "MD",
    target: "J",
    dok: 2,
    standard: "3.MD.D.8",
    type: "text-input",
    questionText:
      "The class wants to put a border of ribbon around a rectangular bulletin board that is 5 feet long and 3 feet wide. How many feet of ribbon do they need?",
    correctAnswer: "16",
    rubric: "The student enters the correct perimeter.",
    points: 1,
  },
  {
    id: 45,
    testType: "pt",
    subject: "math",
    grade: 3,
    claim: 4,
    domain: "OA",
    target: "A",
    dok: 3,
    standard: "3.OA.D.8",
    type: "short-answer",
    questionText:
      "The School Fun Fair committee has $150 to spend on prizes. They want to buy stuffed animals that cost $6 each and bouncy balls that cost $2 each. They want to buy 15 stuffed animals. How many bouncy balls can they buy with the money left over? Show your work and explain your answer.",
    correctAnswer: "They spend 15 × $6 = $90 on stuffed animals. $150 − $90 = $60 left. $60 ÷ $2 = 30 bouncy balls.",
    rubric: "Full credit (2 points): Correct answer of 30 bouncy balls with clear work shown. 1 point: Correct strategy but computational error, or correct answer without explanation.",
    points: 2,
  },
  {
    id: 46,
    testType: "pt",
    subject: "math",
    grade: 3,
    claim: 2,
    domain: "MD",
    target: "J",
    dok: 3,
    standard: "3.MD.C.7",
    type: "multiple-choice",
    questionText:
      "The Fun Fair needs a rectangular area for the relay race. The area must be exactly 48 square meters. Which of the following could be the length and width of the relay race area?",
    options: [
      { label: "A", text: "5 meters by 9 meters" },
      { label: "B", text: "6 meters by 8 meters" },
      { label: "C", text: "7 meters by 7 meters" },
      { label: "D", text: "4 meters by 10 meters" },
    ],
    correctAnswer: "B",
    rubric: "The student identifies the correct factor pair of 48.",
    points: 1,
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
    options: [
      { label: "A", text: "Part A: That treasure is always buried underground" },
      { label: "B", text: "Part A: That brothers should always share equally" },
      { label: "C", text: "Part A: That neighbors are important to have" },
      { label: "D", text: "Part A: That hard work is its own reward" },
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
    type: "multiple-choice",
    passage: sapPassage,
    passageTitle: "Sap's Running",
    questionText:
      "Based on the passage, which conclusion is best supported?",
    options: [
      { label: "A", text: "Making maple syrup is a quick and easy process." },
      {
        label: "B",
        text: "The sap in sugar maple trees begins flowing in early spring.",
      },
      { label: "C", text: "All trees produce sap that can be made into syrup." },
      { label: "D", text: "The Coleman brothers discovered how to make maple syrup." },
    ],
    correctAnswer: "B",
    rubric: "The student selects the correct option.",
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
  // ── Additional ELA CAT questions: Treasure in the Field ──
  {
    id: 121,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "2",
    dok: 2,
    standard: "RL.2",
    type: "multiple-choice",
    passage: treasurePassage,
    passageTitle: "Treasure in the Field",
    questionText:
      "What is the central message of the story?",
    options: [
      { label: "A", text: "Always listen to your neighbors." },
      { label: "B", text: "Hard work brings its own rewards." },
      { label: "C", text: "Treasure is always buried underground." },
      { label: "D", text: "Farming is the best job to have." },
    ],
    correctAnswer: "B",
    rubric: "The student selects the correct central message.",
    points: 1,
    evidenceStatement: "The student will determine the central message or moral of a text.",
  },
  {
    id: 122,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "5",
    dok: 2,
    standard: "RL.3",
    type: "multiple-choice",
    passage: treasurePassage,
    passageTitle: "Treasure in the Field",
    questionText:
      "At the beginning of the story, which word best describes Ta and Hai?",
    options: [
      { label: "A", text: "Helpful" },
      { label: "B", text: "Lazy" },
      { label: "C", text: "Angry" },
      { label: "D", text: "Curious" },
    ],
    correctAnswer: "B",
    rubric: "The student selects the correct character trait.",
    points: 1,
    evidenceStatement: "The student will describe characters in a story.",
  },
  {
    id: 123,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "4",
    dok: 3,
    standard: "RL.3",
    type: "multiple-choice",
    passage: treasurePassage,
    passageTitle: "Treasure in the Field",
    questionText:
      'Why did the father tell his sons there was "treasure buried in the field" instead of simply telling them to work?',
    options: [
      { label: "A", text: "He forgot where he buried the treasure." },
      { label: "B", text: "He wanted them to discover the value of hard work on their own." },
      { label: "C", text: "He was trying to trick them into leaving the farm." },
      { label: "D", text: "The neighbor told him to say it." },
    ],
    correctAnswer: "B",
    rubric: "The student selects the correct motivation.",
    points: 1,
    evidenceStatement: "The student will analyze character motivations.",
  },
  {
    id: 124,
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
      'Read this sentence: "The sons\' eyes widened." What does this detail show about the sons?',
    options: [
      { label: "A", text: "They were sleepy." },
      { label: "B", text: "They were scared of their father." },
      { label: "C", text: "They were surprised and excited." },
      { label: "D", text: "They were confused." },
    ],
    correctAnswer: "C",
    rubric: "The student selects the correct inference.",
    points: 1,
    evidenceStatement: "The student will interpret language used in context.",
  },
  // ── Additional ELA CAT questions: Sap's Running ──
  {
    id: 125,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "9",
    dok: 2,
    standard: "RI.2",
    type: "multiple-choice",
    passage: sapPassage,
    passageTitle: "Sap's Running",
    questionText:
      "What is the main idea of the passage?",
    options: [
      { label: "A", text: "The Iroquois were the first people to make maple syrup." },
      { label: "B", text: "Maple syrup is made from sap that flows from sugar-maple trees in spring." },
      { label: "C", text: "Scientists at the University of Vermont study many things." },
      { label: "D", text: "The Coleman brothers live on a farm in Vermont." },
    ],
    correctAnswer: "B",
    rubric: "The student selects the correct main idea.",
    points: 1,
    evidenceStatement: "The student will determine the main idea of an informational text.",
  },
  {
    id: 126,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "10",
    dok: 2,
    standard: "RI.4",
    type: "multiple-choice",
    passage: sapPassage,
    passageTitle: "Sap's Running",
    questionText:
      'What does the word "tap" mean in the sentence "the Colemans tap holes into sugar-maple trees"?',
    options: [
      { label: "A", text: "To touch lightly" },
      { label: "B", text: "To drill into" },
      { label: "C", text: "A type of dance" },
      { label: "D", text: "A water faucet" },
    ],
    correctAnswer: "B",
    rubric: "The student selects the correct meaning.",
    points: 1,
    evidenceStatement: "The student will determine the meaning of a domain-specific word in context.",
  },
  {
    id: 127,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "8",
    dok: 2,
    standard: "RI.1",
    type: "text-input",
    passage: sapPassage,
    passageTitle: "Sap's Running",
    questionText:
      "According to the passage, how many gallons of sap does it take to make one gallon of maple syrup? Enter just the number.",
    correctAnswer: "35",
    rubric: "The student enters the correct number.",
    points: 1,
    evidenceStatement: "The student will cite textual evidence to support a conclusion.",
  },
  {
    id: 128,
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
      "Part A: According to the section \"What Makes Sap Run?\", what causes sap to flow down a maple tree?\n\nPart B: Which detail from the passage best supports your answer to Part A?",
    options: [
      { label: "A", text: "Part A: Sap rises up from the roots when the ground thaws." },
      { label: "B", text: "Part A: Frost that formed inside the tree overnight melts in the morning." },
      { label: "C", text: "Part A: Rain water soaks into the bark of the tree." },
      { label: "D", text: "Part A: Wind pushes the sap downward through the branches." },
    ],
    correctAnswer: ["B", "C"],
    rubric: "The student selects the correct answer for both parts.",
    points: 1,
    evidenceStatement: "The student will identify cause-and-effect relationships in informational text.",
  },
  {
    id: 129,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "13",
    dok: 2,
    standard: "RI.8",
    type: "multiple-choice",
    passage: sapPassage,
    passageTitle: "Sap's Running",
    questionText:
      "Which detail from the passage is a FACT rather than an opinion?",
    options: [
      { label: "A", text: "They're just glad it is." },
      { label: "B", text: "It takes about thirty-five gallons of sap to make one gallon of maple syrup." },
      { label: "C", text: "Today will be a good day for sugaring." },
      { label: "D", text: "When Woksis tasted the sweetened meat, he loved it." },
    ],
    correctAnswer: "B",
    rubric: "The student selects the correct fact.",
    points: 1,
    evidenceStatement: "The student will distinguish facts from opinions in an informational text.",
  },
  {
    id: 130,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 3,
    target: "4",
    dok: 2,
    standard: "SL.3",
    type: "multiple-choice",
    questionText:
      "A student gives a presentation about recycling. She says: \"We should recycle because it helps the Earth. Recycling one aluminum can saves enough energy to run a TV for 3 hours.\"\n\nWhat makes her argument convincing?",
    options: [
      { label: "A", text: "She talks about TV." },
      { label: "B", text: "She uses a specific fact to support her opinion." },
      { label: "C", text: "She talks about the Earth." },
      { label: "D", text: "She uses big words." },
    ],
    correctAnswer: "B",
    rubric: "The student selects the correct option.",
    points: 1,
    evidenceStatement: "The student will evaluate a speaker's reasons and evidence.",
  },
  {
    id: 131,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 3,
    target: "4",
    dok: 2,
    standard: "SL.2",
    type: "multiple-choice",
    questionText:
      "Listen to this short announcement:\n\n\"Attention students! The book fair starts on Monday and runs through Friday. All books are between $3 and $10. Students who buy two or more books will receive a free bookmark.\"\n\nWhat do students get for buying two or more books?",
    options: [
      { label: "A", text: "A free book" },
      { label: "B", text: "A free bookmark" },
      { label: "C", text: "A $3 discount" },
      { label: "D", text: "An extra day at the book fair" },
    ],
    correctAnswer: "B",
    rubric: "The student selects the correct option.",
    points: 1,
    evidenceStatement: "The student will determine the main ideas and supporting details of information presented orally.",
  },
  // ── Additional ELA CAT questions to reach 30 ──
  {
    id: 132,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "10",
    dok: 2,
    standard: "RI.4",
    type: "multiple-choice",
    passage: sapPassage,
    passageTitle: "Sap's Running",
    questionText:
      'What does the word "tradition" mean in the sentence "It is a family tradition"?',
    options: [
      { label: "A", text: "A new invention" },
      { label: "B", text: "Something passed down through a family over many years" },
      { label: "C", text: "A type of recipe" },
      { label: "D", text: "A holiday celebration" },
    ],
    correctAnswer: "B",
    rubric: "The student selects the correct meaning.",
    points: 1,
    evidenceStatement: "The student will determine the meaning of a word in context.",
  },
  {
    id: 133,
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
      "According to the legend of Woksis, how was maple syrup first discovered?",
    options: [
      { label: "A", text: "A scientist at the University of Vermont found it." },
      { label: "B", text: "The Coleman brothers invented a new process." },
      { label: "C", text: "Sap dripped from a gash in a maple tree into a bowl and was boiled by accident." },
      { label: "D", text: "Rain mixed with tree sap and created syrup." },
    ],
    correctAnswer: "C",
    rubric: "The student selects the correct detail from the legend.",
    points: 1,
    evidenceStatement: "The student will cite textual evidence to support a conclusion.",
  },
  {
    id: 134,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "2",
    dok: 2,
    standard: "RL.2",
    type: "multiple-choice",
    passage: treasurePassage,
    passageTitle: "Treasure in the Field",
    questionText:
      "Which sentence best summarizes the ending of the story?",
    options: [
      { label: "A", text: "The sons dug up the entire field but never found any treasure." },
      { label: "B", text: "The sons planted and sold rice, realizing that hard work was the real treasure." },
      { label: "C", text: "The father told his sons where to dig for gold coins." },
      { label: "D", text: "The neighbor helped the sons find the treasure." },
    ],
    correctAnswer: "B",
    rubric: "The student selects the best summary.",
    points: 1,
    evidenceStatement: "The student will summarize key events in a literary text.",
  },
  {
    id: 135,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "11",
    dok: 3,
    standard: "RI.9",
    type: "multi-select",
    passage: sapPassage,
    passageTitle: "Sap's Running",
    questionText:
      'The passage says that people used to think sap rises up from the roots, but Dr. Tim Perkins says it actually flows downward. Select TWO details that support Dr. Perkins\' explanation.',
    options: [
      { label: "A", text: "The Coleman brothers have made maple syrup all their lives." },
      { label: "B", text: "During cold nights, water rises into the trunk and branches." },
      { label: "C", text: "Sap will flow from the cut end of a trunk, not from the stump." },
      { label: "D", text: "Charles Darwin studied sap flow long ago." },
      { label: "E", text: "A 50-foot-high sugar maple has nearly two hundred thousand leaves." },
    ],
    correctAnswer: ["B", "C"],
    rubric: "The student selects the two correct supporting details.",
    points: 1,
    evidenceStatement: "The student will compare and evaluate evidence within an informational text.",
  },
  {
    id: 136,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 3,
    target: "4",
    dok: 2,
    standard: "SL.3",
    type: "multiple-choice",
    questionText:
      "A student says: \"I think dogs are better pets than cats because dogs can learn tricks, they protect your home, and they love to play outside with you.\"\n\nHow does the student support her opinion?",
    options: [
      { label: "A", text: "By telling a story about her dog" },
      { label: "B", text: "By giving three reasons why dogs are better" },
      { label: "C", text: "By explaining what cats do wrong" },
      { label: "D", text: "By asking the audience a question" },
    ],
    correctAnswer: "B",
    rubric: "The student selects the correct option.",
    points: 1,
    evidenceStatement: "The student will identify how a speaker supports a point with reasons.",
  },
  // ── Additional ELA CAT questions to match real CAASPP count ──
  {
    id: 137,
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
      "Why did the father tell his sons there was treasure buried in the field?",
    options: [
      { label: "A", text: "He wanted them to find the gold coins he had hidden." },
      { label: "B", text: "He wanted to trick them into digging so the field would be ready for planting." },
      { label: "C", text: "He had forgotten where he buried the treasure." },
      { label: "D", text: "He wanted them to sell the field to a neighbor." },
    ],
    correctAnswer: "B",
    rubric: "The student infers the father's motivation.",
    points: 1,
    evidenceStatement: "The student will make inferences about character motivation.",
  },
  {
    id: 138,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "6",
    dok: 2,
    standard: "RL.6",
    type: "multiple-choice",
    passage: treasurePassage,
    passageTitle: "Treasure in the Field",
    questionText:
      "From whose point of view is the story mostly told?",
    options: [
      { label: "A", text: "The father, because it tells what he is thinking" },
      { label: "B", text: "Ta, because he is the main character" },
      { label: "C", text: "A narrator who is outside the story" },
      { label: "D", text: "The neighbor, because he watches the family" },
    ],
    correctAnswer: "C",
    rubric: "The student identifies the third-person narrator.",
    points: 1,
    evidenceStatement: "The student will distinguish their own point of view from that of the narrator.",
  },
  {
    id: 139,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "7",
    dok: 2,
    standard: "RI.7",
    type: "multiple-choice",
    passage: sapPassage,
    passageTitle: "Sap's Running",
    questionText:
      "How does the section \"What Makes Sap Run?\" add to the reader's understanding of maple syrup production?",
    options: [
      { label: "A", text: "It explains the legend of how maple syrup was discovered." },
      { label: "B", text: "It describes how the Coleman brothers collect sap." },
      { label: "C", text: "It gives a scientific explanation of how sap moves inside the tree." },
      { label: "D", text: "It tells how much sap is needed to make one gallon of syrup." },
    ],
    correctAnswer: "C",
    rubric: "The student identifies how the section contributes to the text.",
    points: 1,
    evidenceStatement: "The student will use text features to locate and understand information.",
  },
  {
    id: 140,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 2,
    target: "1",
    dok: 2,
    standard: "W.8",
    type: "multi-select",
    passage: sapPassage,
    passageTitle: "Sap's Running",
    questionText:
      "A student is writing a report about how maple syrup is made. Select TWO facts from the passage that would be most important to include in the report.",
    options: [
      { label: "A", text: "Charles Darwin wrote that sap flow was a mysterious subject." },
      { label: "B", text: "It takes about thirty-five gallons of sap to make one gallon of maple syrup." },
      { label: "C", text: "The Coleman brothers step out their front door in Vermont." },
      { label: "D", text: "Sap from sugar maples looks like water but tastes sweet because it has sugar in it." },
      { label: "E", text: "Nelson Coleman and his brothers don't worry about why the sap is running." },
    ],
    correctAnswer: ["B", "D"],
    rubric: "The student selects the two most relevant facts for a report.",
    points: 1,
    evidenceStatement: "The student will gather relevant information from a source.",
  },
  {
    id: 141,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "4",
    dok: 2,
    standard: "RI.4",
    type: "multiple-choice",
    passage: sapPassage,
    passageTitle: "Sap's Running",
    questionText:
      "Read this sentence from the passage: \"As they pass 75-year-old sugar-maple trees, sap drips from holes in the trees into metal buckets.\" What does the word \"drips\" tell the reader about how the sap moves?",
    options: [
      { label: "A", text: "The sap pours out very quickly." },
      { label: "B", text: "The sap flows in a slow, steady stream." },
      { label: "C", text: "The sap falls in small drops, one at a time." },
      { label: "D", text: "The sap sprays out in all directions." },
    ],
    correctAnswer: "C",
    rubric: "The student uses context to determine the meaning of drips.",
    points: 1,
    evidenceStatement: "The student will determine the meaning of words and phrases in context.",
  },
  {
    id: 142,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 1,
    target: "2",
    dok: 2,
    standard: "RI.2",
    type: "multiple-choice",
    passage: sapPassage,
    passageTitle: "Sap's Running",
    questionText:
      "What is the main idea of the passage \"Sap's Running\"?",
    options: [
      { label: "A", text: "Scientists at the University of Vermont study trees." },
      { label: "B", text: "Maple syrup production is a tradition that involves collecting and heating tree sap." },
      { label: "C", text: "The Coleman brothers live in Vermont." },
      { label: "D", text: "An Iroquois chief named Woksis discovered maple syrup." },
    ],
    correctAnswer: "B",
    rubric: "The student identifies the main idea of the informational text.",
    points: 1,
    evidenceStatement: "The student will determine the main idea of a text.",
  },
  {
    id: 143,
    testType: "cat",
    subject: "ela",
    grade: 3,
    claim: 2,
    target: "6",
    dok: 3,
    standard: "L.1",
    type: "multiple-choice",
    questionText:
      "A student is writing a report and writes this sentence:\n\n\"The trees in the forest is very tall and the birds singed beautiful songs.\"\n\nWhich revision corrects the errors in this sentence?",
    options: [
      { label: "A", text: "The trees in the forest is very tall and the birds sang beautiful songs." },
      { label: "B", text: "The trees in the forest are very tall and the birds singed beautiful songs." },
      { label: "C", text: "The trees in the forest are very tall and the birds sang beautiful songs." },
      { label: "D", text: "The tree in the forest is very tall and the birds singed beautiful songs." },
    ],
    correctAnswer: "C",
    rubric: "The student corrects both the subject-verb agreement and irregular verb errors.",
    points: 1,
    evidenceStatement: "The student will demonstrate command of grammar and usage conventions.",
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
    passage: treasurePassage + "\n\n---\n\n" + sapPassage,
    passageTitle: "Student Directions",
    studentDirections: `**Informational Performance Task**

**Task:**
Your class has been learning about how people get rewards from nature. Your teacher has asked each student to learn about a different topic. You decide to learn about how people work with nature to get food and other rewards. You have found two sources about this topic.

After you have reviewed these sources, you will answer some questions about them. Briefly scan the sources and the questions that follow. Then, go back and read the sources carefully so you will have the information you need to answer the questions and complete your research.`,
    questionText:
      "Click on the boxes to match each source with the idea or ideas that it supports. Some ideas may have more than one source selected.",
    gridRows: [
      "Hard work can lead to unexpected rewards.",
      "Nature provides resources that people can use.",
      "A family tradition is passed down through generations.",
      "People must be patient to get results from their work.",
    ],
    gridColumns: [
      "Source #1: Treasure in the Field",
      "Source #2: Sap's Running",
    ],
    correctAnswer: ["0:0", "0:1", "1:0", "1:1", "2:1", "3:0", "3:1"],
    rubric: "The student correctly matches ideas to the appropriate sources.",
    points: 2,
    evidenceStatement: "The student will locate information from multiple sources to support a central idea.",
  },
  {
    id: 151,
    testType: "pt",
    subject: "ela",
    grade: 3,
    claim: 4,
    target: "3",
    dok: 3,
    standard: "W.8, RI.1",
    type: "short-answer",
    passage: treasurePassage + "\n\n---\n\n" + sapPassage,
    passageTitle: "Student Directions",
    studentDirections: `**Informational Performance Task**

**Task:**
Your class has been learning about how people get rewards from nature. Your teacher has asked each student to learn about a different topic. You decide to learn about how people work with nature to get food and other rewards. You have found two sources about this topic.

After you have reviewed these sources, you will answer some questions about them. Briefly scan the sources and the questions that follow. Then, go back and read the sources carefully so you will have the information you need to answer the questions and complete your research.`,
    questionText:
      'Explain how both sources show that people must work hard to get rewards from nature. Give one example from Source #1 and one example from Source #2. For each example, include the source title or number.',
    correctAnswer: "Source 1: The sons had to dig the field and plant rice to earn money. Source 2: The Colemans collect sap and boil it for hours to make maple syrup.",
    rubric: "Full credit: The student provides one relevant example from each source that shows hard work leading to rewards from nature, and identifies which source each example comes from. Partial credit: The student provides examples but only from one source, or does not clearly identify the sources.",
    points: 2,
    evidenceStatement: "The student will cite evidence from multiple sources to support analysis.",
  },
  {
    id: 153,
    testType: "pt",
    subject: "ela",
    grade: 3,
    claim: 4,
    target: "2",
    dok: 2,
    standard: "RI.1, RI.9",
    type: "multiple-choice",
    passage: treasurePassage + "\n\n---\n\n" + sapPassage,
    passageTitle: "Student Directions",
    studentDirections: `**Informational Performance Task**

**Task:**
Your class has been learning about how people get rewards from nature. Your teacher has asked each student to learn about a different topic. You decide to learn about how people work with nature to get food and other rewards. You have found two sources about this topic.

After you have reviewed these sources, you will answer some questions about them. Briefly scan the sources and the questions that follow. Then, go back and read the sources carefully so you will have the information you need to answer the questions and complete your research.`,
    questionText:
      "What do the characters in Source #1 and the Coleman brothers in Source #2 have in common?",
    options: [
      { label: "A", text: "They both discover treasure buried underground." },
      { label: "B", text: "They both work with the land to produce something valuable." },
      { label: "C", text: "They both learn about nature from scientists." },
      { label: "D", text: "They both live on farms in Vietnam." },
    ],
    correctAnswer: "B",
    rubric: "The student identifies the common theme across both sources.",
    points: 1,
    evidenceStatement: "The student will compare information across two texts.",
  },
  {
    id: 152,
    testType: "pt",
    subject: "ela",
    grade: 3,
    claim: 2,
    target: "1aI",
    dok: 4,
    standard: "W.2, W.4, W.5",
    type: "extended-writing",
    passage: treasurePassage + "\n\n---\n\n" + sapPassage,
    passageTitle: "Student Directions",
    studentDirections: `**Informational Performance Task**

**Part 2**

You will review your notes and sources, and plan, draft, revise, and edit your writing. You may use your notes and go back to the sources. Now read your assignment and the information about how your writing will be scored, then begin your work.

**Your Assignment:**
Your teacher is creating a bulletin board display in the school library to show what your class has learned about how people get rewards from nature. You decide to write an informational article about this topic. Your article will be read by other students, teachers, and parents.

Using more than one source, develop a main idea about how people work hard to get rewards from nature. Choose the most important information from the sources to support your main idea. Then, write an informational article that is several paragraphs long. Clearly organize your article and support your main idea with details from the sources. Be sure to use your own words except when quoting directly from the sources. Be sure to give the source title or number when using details from the sources.

**REMEMBER: You must**
1. plan your informational article.
2. write your informational article.
3. revise and edit the final draft of your article.

Word-processing tools and spell check are available to you.

For Part 2, you are being asked to write an informational article that is several paragraphs long. Type your response in the box below. The box will get bigger as you type.

Remember to check your notes and your prewriting/planning as you write, and then revise and edit your informational article.`,
    questionText: "",
    correctAnswer: "extended-writing-rubric",
    rubric: "Full credit (4 points): The article has a clear main idea about rewards from nature, uses details from both sources, is well organized with multiple paragraphs, uses the student's own words, and has few errors in grammar/spelling. 3 points: Adequate main idea, uses details from at least one source, mostly organized. 2 points: Partial main idea, limited evidence, some organization. 1 point: Minimal response with little evidence or organization.",
    points: 4,
    evidenceStatement: "The student will write a full informational article using evidence from multiple sources.",
  },
];

export function getQuestions(
  grade: number,
  subject: "math" | "ela",
  testType: "cat" | "pt" = "cat"
): Question[] {
  let questions: Question[] = [];
  if (grade === 3 && subject === "math") questions = grade3Math;
  if (grade === 3 && subject === "ela") questions = grade3ELA;
  return questions.filter((q) => q.testType === testType);
}

// Fetch questions from Supabase
export async function fetchQuestions(
  grade: number,
  subject: "math" | "ela",
  testType: "cat" | "pt" = "cat"
): Promise<Question[]> {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("grade", grade)
    .eq("subject", subject)
    .eq("test_type", testType)
    .order("id");

  if (error) {
    console.error("Supabase fetch error:", error.message);
    // Fall back to local questions
    return getQuestions(grade, subject, testType);
  }

  // Fall back to local questions if Supabase returned fewer results
  const localQuestions = getQuestions(grade, subject, testType);
  if (!data || data.length === 0 || data.length < localQuestions.length) {
    return localQuestions;
  }

  // Map snake_case DB columns to camelCase Question interface
  return data.map((row) => ({
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
  }));
}

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
