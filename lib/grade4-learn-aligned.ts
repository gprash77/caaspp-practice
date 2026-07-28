import {
  grade4Lessons as previewLessons,
  type Grade4Lesson,
  type LearnPracticeQuestion,
  type LearnSubject,
} from "./grade4-learn";

export type LearnDifficulty = "foundation" | "core" | "challenge";

export type AlignedLearnPracticeQuestion =
  | (LearnPracticeQuestion & {
      type: "choice";
      difficulty: LearnDifficulty;
      standard: string;
    })
  | {
      id: string;
      type: "written";
      prompt: string;
      difficulty: LearnDifficulty;
      standard: string;
      reviewCriteria: string[];
      modelResponse: string;
    };

export interface AlignedGrade4Lesson extends Omit<Grade4Lesson, "practice"> {
  domain: string;
  sfusdPriorities: string[];
  practice: AlignedLearnPracticeQuestion[];
}

export const californiaMathTargets = [
  "4.OA.A.1", "4.OA.A.2", "4.OA.A.3", "4.OA.B.4", "4.OA.C.5",
  "4.NBT.A.1", "4.NBT.A.2", "4.NBT.A.3", "4.NBT.B.4", "4.NBT.B.5", "4.NBT.B.6",
  "4.NF.A.1", "4.NF.A.2", "4.NF.B.3", "4.NF.B.4", "4.NF.C.5", "4.NF.C.6", "4.NF.C.7",
  "4.MD.A.1", "4.MD.A.2", "4.MD.A.3", "4.MD.B.4", "4.MD.C.5", "4.MD.C.6", "4.MD.C.7",
  "4.G.A.1", "4.G.A.2", "4.G.A.3",
] as const;

export const californiaElaTargets = [
  "RL.4.1", "RL.4.2", "RL.4.3", "RL.4.4", "RL.4.5", "RL.4.6", "RL.4.7", "RL.4.9", "RL.4.10",
  "RI.4.1", "RI.4.2", "RI.4.3", "RI.4.4", "RI.4.5", "RI.4.6", "RI.4.7", "RI.4.8", "RI.4.9", "RI.4.10",
  "RF.4.3", "RF.4.4",
  "W.4.1", "W.4.2", "W.4.3", "W.4.4", "W.4.5", "W.4.6", "W.4.7", "W.4.8", "W.4.9", "W.4.10",
  "SL.4.1", "SL.4.2", "SL.4.3", "SL.4.4", "SL.4.5", "SL.4.6",
  "L.4.1", "L.4.2", "L.4.3", "L.4.4", "L.4.5", "L.4.6",
] as const;

export const sfusdPriorityLabels = {
  "math-fluency": "SFUSD · Multi-digit fluency",
  "math-fractions": "SFUSD · Fraction understanding",
  "math-geometry": "SFUSD · Geometry and angles",
  "math-problem-solving": "SFUSD · Problem-based learning",
  "math-discourse": "SFUSD · Explain and compare reasoning",
  "math-reflection": "SFUSD · Mathematical reflection",
  "ela-complex-text": "SFUSD · Complex-text comprehension",
  "ela-vocabulary": "SFUSD · Vocabulary and word learning",
  "ela-critical-thinking": "SFUSD · Evidence and critical thinking",
  "ela-narrative": "SFUSD · Narrative writing",
  "ela-informative": "SFUSD · Informative writing",
  "ela-opinion": "SFUSD · Opinion writing",
  "ela-research": "SFUSD · Research and paraphrasing",
  "ela-speaking-listening": "SFUSD · Speaking and listening",
  "ela-conventions": "SFUSD · Language conventions",
} as const;

export type SfusdPriority = keyof typeof sfusdPriorityLabels;

const choice = (
  id: string,
  standard: string,
  difficulty: LearnDifficulty,
  prompt: string,
  options: string[],
  correctIndex: number,
  explanation: string
): AlignedLearnPracticeQuestion => ({
  id, type: "choice", standard, difficulty, prompt, options, correctIndex, explanation,
});

const written = (
  id: string,
  standard: string,
  difficulty: LearnDifficulty,
  prompt: string,
  reviewCriteria: string[],
  modelResponse: string
): AlignedLearnPracticeQuestion => ({
  id, type: "written", standard, difficulty, prompt, reviewCriteria, modelResponse,
});

const previewMetadata: Record<
  string,
  { domain: string; standards?: string[]; sfusdPriorities: SfusdPriority[] }
> = {
  "place-value-rounding": {
    domain: "Base Ten",
    standards: ["4.NBT.A.1", "4.NBT.A.2", "4.NBT.A.3"],
    sfusdPriorities: ["math-fluency", "math-reflection"],
  },
  "multiplicative-comparison": {
    domain: "Operations",
    sfusdPriorities: ["math-fluency", "math-problem-solving"],
  },
  "fraction-equivalence": {
    domain: "Fractions",
    sfusdPriorities: ["math-fractions", "math-discourse"],
  },
  "measurement-problems": {
    domain: "Measurement",
    sfusdPriorities: ["math-problem-solving", "math-reflection"],
  },
  "text-evidence": {
    domain: "Reading Literature & Information",
    sfusdPriorities: ["ela-complex-text", "ela-critical-thinking"],
  },
  "main-idea-summary": {
    domain: "Reading Information",
    sfusdPriorities: ["ela-complex-text", "ela-critical-thinking"],
  },
  "text-structure": {
    domain: "Reading Information",
    sfusdPriorities: ["ela-complex-text", "ela-critical-thinking"],
  },
  "opinion-evidence": {
    domain: "Writing",
    standards: ["W.4.1", "W.4.4", "W.4.5", "W.4.9"],
    sfusdPriorities: ["ela-opinion", "ela-critical-thinking"],
  },
};

const previewExtras: Record<string, AlignedLearnPracticeQuestion[]> = {
  "place-value-rounding": [
    choice("pvr-3", "4.NBT.A.2", "core", "Which comparison is true?", ["406,219 > 460,129", "572,804 < 572,480", "318,650 > 318,605", "709,030 = 709,300"], 2, "Compare from the greatest place; 318,650 has 6 tens while 318,605 has 0 tens."),
    written("pvr-4", "4.NBT.A.3", "challenge", "A city report rounds 348,650 to 349,000. Explain why that rounding is reasonable and name the target place.", ["Names the nearest-thousand place.", "Uses the hundreds digit 6.", "Explains that 6 causes the thousands digit to increase."], "The report rounds to the nearest thousand. The hundreds digit is 6, so the 8 in the thousands place increases to 9, giving 349,000."),
  ],
  "multiplicative-comparison": [
    choice("mc-3", "4.OA.A.2", "core", "Nora packed 48 tiles, which is 6 times Leo's amount. Which equation finds Leo's amount?", ["48 + 6 = □", "48 ÷ 6 = □", "48 × 6 = □", "48 − 6 = □"], 1, "When the larger amount and multiplier are known, divide to find the smaller amount."),
    written("mc-4", "4.OA.A.1", "challenge", "Explain the difference between “8 more than 5” and “8 times as many as 5.”", ["Uses addition for “more than.”", "Uses multiplication for “times as many.”", "Gives both values."], "Eight more than 5 is 5 + 8 = 13. Eight times as many as 5 is 8 × 5 = 40."),
  ],
  "fraction-equivalence": [
    choice("fe-3", "4.NF.A.2", "core", "Which fraction is greater than 1/2 but less than 3/4?", ["3/8", "5/8", "7/8", "2/8"], 1, "Five eighths is greater than 4/8 and less than 6/8."),
    written("fe-4", "4.NF.A.1", "challenge", "Show why 6/8 and 3/4 name the same value.", ["Uses a valid scale factor or visual partition.", "Changes numerator and denominator together.", "States the equivalence."], "Divide both 6 and 8 by 2. The result is 3/4, so 6/8 = 3/4."),
  ],
  "measurement-problems": [
    choice("mp-3", "4.MD.A.2", "core", "A rehearsal begins at 9:48 a.m. and ends at 10:26 a.m. How long is it?", ["22 minutes", "38 minutes", "42 minutes", "78 minutes"], 1, "Twelve minutes reach 10:00 and 26 more reach 10:26, for 38 minutes."),
    written("mp-4", "4.MD.A.1", "challenge", "A board is 7 feet long. Explain how to find its length in inches.", ["States 1 foot = 12 inches.", "Uses multiplication.", "Gives 84 inches with a unit."], "Because each foot is 12 inches, multiply 7 × 12. The board is 84 inches long."),
  ],
  "text-evidence": [
    choice("te-3", "RL.4.1", "core", "A narrator says, “I folded the route twice and checked the north arrow again.” Which inference is best supported?", ["The narrator is careless.", "The narrator wants confidence in the route.", "The route is certainly wrong.", "The narrator drew the map."], 1, "Repeated checking supports careful concern about following the route."),
    written("te-4", "RI.4.1", "challenge", "A report says a filter removed 18 grams of sediment in Trial 1 and 17 grams in Trial 2. Write one supported inference.", ["Uses both measurements.", "Makes a limited inference.", "Avoids claiming the filter always works identically."], "The filter removed a similar amount of sediment in both recorded trials, although more trials would be needed for a broader conclusion."),
  ],
  "main-idea-summary": [
    choice("mi-3", "RI.4.2", "core", "An article explains that street trees cool sidewalks, slow rainwater, and need regular care. Which summary is strongest?", ["Trees are green.", "Street trees provide several benefits but require maintenance.", "Rain is always harmful.", "Every street needs the same tree."], 1, "The sentence includes the main benefits and the important limitation."),
    written("mi-4", "RI.4.2", "challenge", "Summarize a paragraph that explains how volunteers label, photograph, and safely store donated tools.", ["Includes the overall process.", "Names important steps.", "Leaves out opinion and minor detail."], "Volunteers document donated tools with labels and photographs before placing them in safe storage."),
  ],
  "text-structure": [
    choice("ts-3", "RI.4.5", "core", "A section describes two bridge designs and explains how their supports differ. What structure is central?", ["Chronology", "Compare and contrast", "Problem and solution", "Cause and effect"], 1, "The section organizes information around similarities and differences."),
    written("ts-4", "RI.4.5", "challenge", "Explain how a problem-and-solution structure helps a reader understand a plan for reducing cafeteria waste.", ["Names the waste problem.", "Names the proposed response.", "Explains how the structure connects them."], "The structure first establishes the excess-waste problem and then shows how sorting stations and reusable trays are intended to address it."),
  ],
  "opinion-evidence": [
    choice("oe-3", "W.4.1", "core", "Which transition best introduces another supporting reason?", ["In addition,", "Long ago,", "Suddenly,", "Once upon a time,"], 0, "“In addition” links a second supporting reason to the opinion."),
    written("oe-4", "W.4.1", "challenge", "Write a two-sentence recommendation about adding a school garden using one benefit and one condition.", ["States a clear position.", "Includes relevant evidence or benefit.", "Includes a practical condition or limitation."], "The school should begin a small garden because it can support science observation. The plan should proceed only if accessible paths and a summer watering schedule are funded."),
  ],
};

function upgradePreviewLesson(lesson: Grade4Lesson): AlignedGrade4Lesson {
  const metadata = previewMetadata[lesson.id];
  return {
    ...lesson,
    domain: metadata.domain,
    standards: metadata.standards ?? lesson.standards,
    sfusdPriorities: metadata.sfusdPriorities,
    practice: [
      ...lesson.practice.map((question, index) => ({
        ...question,
        type: "choice" as const,
        difficulty: index === 0 ? "foundation" as const : "core" as const,
        standard: (metadata.standards ?? lesson.standards)[index % (metadata.standards ?? lesson.standards).length],
      })),
      ...previewExtras[lesson.id],
    ],
  };
}

const additionalMathLessons: AlignedGrade4Lesson[] = [
  {
    id: "multi-step-operations", subject: "math", domain: "Operations", title: "Multi-Step Problems and Remainders",
    summary: "Represent real situations with all four operations and interpret remainders in context.",
    standards: ["4.OA.A.3"], sfusdPriorities: ["math-problem-solving", "math-discourse"],
    learn: ["Choose operations from the relationships, not from one keyword.", "A remainder may be left over, rounded up, or reported as a fraction depending on the question."],
    workedExample: { prompt: "Five vans hold 8 students each. Three more students need seats.", steps: ["Find 5 × 8 = 40 seats.", "Add 3 to get 43 students.", "If each new van holds 8, one more van is needed."], conclusion: "The situation has 43 students and needs 6 vans." },
    practice: [
      choice("mso-1", "4.OA.A.3", "foundation", "Four boxes hold 24 notebooks each. Nine notebooks are used. How many remain?", ["87", "96", "105", "15"], 0, "4 × 24 = 96 and 96 − 9 = 87."),
      choice("mso-2", "4.OA.A.3", "core", "Seventy-three students form teams of 6. How many complete teams and how many students remain?", ["11 teams, 7 remain", "12 teams, 1 remains", "13 teams, 5 remain", "10 teams, 13 remain"], 1, "73 ÷ 6 = 12 remainder 1."),
      choice("mso-3", "4.OA.A.3", "core", "A museum has $500. It buys 7 cases at $58 each. How much remains?", ["$94", "$152", "$406", "$442"], 0, "Seven cases cost $406, leaving $94."),
      written("mso-4", "4.OA.A.3", "challenge", "A bus holds 36 riders. Explain how many buses are needed for 145 riders.", ["Divides 145 by 36.", "Interprets the remainder.", "States that 5 buses are needed."], "Four buses hold 144 riders, leaving one rider without a seat, so a fifth bus is required."),
    ],
  },
  {
    id: "factors-multiples", subject: "math", domain: "Operations", title: "Factors, Multiples, Prime, and Composite",
    summary: "Use factor pairs and multiples to describe whole numbers through 100.",
    standards: ["4.OA.B.4"], sfusdPriorities: ["math-fluency", "math-discourse"],
    learn: ["Factor pairs multiply to the number.", "A prime number has exactly two factors; a composite number has more than two."],
    workedExample: { prompt: "Find factor pairs for 24.", steps: ["Test divisors in order.", "Record 1×24, 2×12, 3×8, and 4×6."], conclusion: "Because 24 has more than two factors, it is composite." },
    practice: [
      choice("fm-1", "4.OA.B.4", "foundation", "Which is a factor of 42?", ["5", "6", "8", "9"], 1, "6 × 7 = 42."),
      choice("fm-2", "4.OA.B.4", "core", "Which number is prime?", ["39", "41", "51", "57"], 1, "41 has only factors 1 and 41."),
      choice("fm-3", "4.OA.B.4", "core", "Which list contains only multiples of 8?", ["8, 16, 24", "8, 14, 22", "16, 20, 28", "24, 30, 40"], 0, "Each value in the first list is 8 times a whole number."),
      written("fm-4", "4.OA.B.4", "challenge", "Use factor pairs to prove that 36 is composite.", ["Lists at least two factor pairs beyond 1×36.", "Explains that more than two factors means composite."], "The pairs 2×18, 3×12, 4×9, and 6×6 all make 36. Since 36 has more than two factors, it is composite."),
    ],
  },
  {
    id: "number-patterns", subject: "math", domain: "Operations", title: "Generate and Analyze Patterns",
    summary: "Follow a rule and explain features that are not stated directly in the rule.",
    standards: ["4.OA.C.5"], sfusdPriorities: ["math-problem-solving", "math-reflection"],
    learn: ["Apply the rule consistently to generate terms.", "Compare terms to notice parity, place-value, or alternating features."],
    workedExample: { prompt: "Start at 3 and add 6 repeatedly.", steps: ["Generate 3, 9, 15, 21.", "Notice every term is odd even though the rule only says add 6."], conclusion: "Adding an even number preserves odd parity." },
    practice: [
      choice("np-1", "4.OA.C.5", "foundation", "Start at 5 and add 4. What is the fifth term?", ["17", "21", "25", "9"], 1, "The terms are 5, 9, 13, 17, 21."),
      choice("np-2", "4.OA.C.5", "core", "A pattern starts 2, 6, 18, 54. What rule fits?", ["Add 4", "Multiply by 3", "Add consecutive even numbers", "Multiply by 2"], 1, "Each term is three times the previous term."),
      choice("np-3", "4.OA.C.5", "core", "Start with 10 and subtract 3. Which feature is true?", ["Every term is even.", "The ones digits repeat after ten steps.", "Every term is positive.", "Every term is a multiple of 3."], 1, "Subtracting 3 cycles the ones digits through a repeating pattern."),
      written("np-4", "4.OA.C.5", "challenge", "Start at 4 and add 5. Describe one feature of the first six terms that the rule does not state.", ["Lists or correctly uses the terms.", "Identifies a valid feature.", "Connects the feature to the pattern."], "The terms are 4, 9, 14, 19, 24, and 29. They alternate even and odd because adding an odd number changes parity each time."),
    ],
  },
  {
    id: "add-subtract-whole-numbers", subject: "math", domain: "Base Ten", title: "Add and Subtract Multi-Digit Numbers",
    summary: "Use place value and the standard algorithm accurately and check the result.",
    standards: ["4.NBT.B.4"], sfusdPriorities: ["math-fluency", "math-reflection"],
    learn: ["Align equal place values before computing.", "Use estimation or the inverse operation to check reasonableness."],
    workedExample: { prompt: "Find 503,208 − 187,946.", steps: ["Align the numbers by place.", "Regroup across the zero places.", "Check the difference by addition."], conclusion: "The difference is 315,262." },
    practice: [
      choice("asw-1", "4.NBT.B.4", "foundation", "What is 278,415 + 36,908?", ["305,313", "315,323", "314,323", "315,313"], 1, "Adding by place gives 315,323."),
      choice("asw-2", "4.NBT.B.4", "core", "What is 600,000 − 248,735?", ["351,265", "352,375", "358,265", "451,265"], 0, "The difference is 351,265."),
      choice("asw-3", "4.NBT.B.4", "core", "Which estimate best checks 491,802 + 207,119?", ["About 70,000", "About 300,000", "About 700,000", "About 7,000,000"], 2, "492 thousand plus 207 thousand is about 699 thousand."),
      written("asw-4", "4.NBT.B.4", "challenge", "Explain how addition can check 421,006 − 189,754 = 231,252.", ["Adds the difference and subtrahend.", "Shows or states the correct total.", "Connects the inverse operations."], "Add 231,252 + 189,754. The sum is 421,006, so the subtraction is confirmed."),
    ],
  },
  {
    id: "multiply-divide-whole-numbers", subject: "math", domain: "Base Ten", title: "Multi-Digit Multiplication and Division",
    summary: "Multiply up to four digits by one digit or two digits by two digits and divide multi-digit dividends.",
    standards: ["4.NBT.B.5", "4.NBT.B.6"], sfusdPriorities: ["math-fluency", "math-problem-solving", "math-discourse"],
    learn: ["Partial products make place value visible in multiplication.", "Use multiplication to check a quotient and remainder."],
    workedExample: { prompt: "Find 36 × 24.", steps: ["Compute 36 × 20 = 720.", "Compute 36 × 4 = 144.", "Add the partial products."], conclusion: "36 × 24 = 864." },
    practice: [
      choice("mdw-1", "4.NBT.B.5", "foundation", "What is 2,306 × 4?", ["8,124", "9,224", "9,204", "8,204"], 1, "Four groups of 2,306 total 9,224."),
      choice("mdw-2", "4.NBT.B.5", "core", "What is 47 × 32?", ["1,404", "1,504", "1,604", "1,254"], 1, "47×30 = 1,410 and 47×2 = 94; total 1,504."),
      choice("mdw-3", "4.NBT.B.6", "core", "What is 938 ÷ 7?", ["124", "132 remainder 4", "134", "141 remainder 1"], 2, "7 × 134 = 938."),
      written("mdw-4", "4.NBT.B.6", "challenge", "Explain how to check 1,275 ÷ 8 = 159 remainder 3.", ["Multiplies 159 × 8.", "Adds the remainder.", "Reaches 1,275."], "Multiply 159 × 8 to get 1,272, then add the remainder 3. The result is 1,275."),
    ],
  },
  {
    id: "fraction-add-subtract", subject: "math", domain: "Fractions", title: "Add, Subtract, and Decompose Fractions",
    summary: "Compose, decompose, add, and subtract fractions and mixed numbers with like denominators.",
    standards: ["4.NF.B.3"], sfusdPriorities: ["math-fractions", "math-discourse"],
    learn: ["With like denominators, operate on the numerators while keeping the unit fraction.", "Mixed numbers can be decomposed or renamed to make subtraction possible."],
    workedExample: { prompt: "Find 3 1/4 − 1 3/4.", steps: ["Rename 3 1/4 as 2 5/4.", "Subtract 1 3/4."], conclusion: "The difference is 1 1/2." },
    practice: [
      choice("fas-1", "4.NF.B.3", "foundation", "What is 3/8 + 4/8?", ["7/16", "7/8", "1/8", "12/8"], 1, "The eighth-size units stay the same; add 3 + 4."),
      choice("fas-2", "4.NF.B.3", "core", "What is 2 5/6 − 1 2/6?", ["1 3/6", "1 7/6", "3 3/6", "1 3/12"], 0, "Subtract whole numbers and sixths to get 1 3/6."),
      choice("fas-3", "4.NF.B.3", "core", "Which decomposition equals 11/5?", ["5/5 + 5/5 + 1/5", "5/10 + 5/10 + 1/10", "2/5 + 9", "1 + 1/5"], 0, "The numerators 5 + 5 + 1 total 11 fifths."),
      written("fas-4", "4.NF.B.3", "challenge", "Explain two ways to represent 2 3/4 as a sum of fractions.", ["Gives two correct decompositions.", "Keeps equivalent total value.", "Uses fraction units accurately."], "One way is 1 + 1 + 3/4. Another is 4/4 + 4/4 + 3/4."),
    ],
  },
  {
    id: "fraction-multiplication", subject: "math", domain: "Fractions", title: "Multiply a Fraction by a Whole Number",
    summary: "Treat multiplication as repeated addition of a unit fraction.",
    standards: ["4.NF.B.4"], sfusdPriorities: ["math-fractions", "math-problem-solving"],
    learn: ["n × a/b means n groups of a/b.", "A visual model, repeated addition, and multiplication equation should agree."],
    workedExample: { prompt: "Find 5 × 3/8.", steps: ["Write five groups of 3/8.", "Multiply 5 × 3 in the numerator."], conclusion: "5 × 3/8 = 15/8 = 1 7/8." },
    practice: [
      choice("fmul-1", "4.NF.B.4", "foundation", "What is 4 × 2/7?", ["6/7", "8/7", "8/28", "2/28"], 1, "Four groups of 2/7 total 8/7."),
      choice("fmul-2", "4.NF.B.4", "core", "A ribbon piece is 3/5 meter. What is the length of 6 pieces?", ["9/5 m", "18/5 m", "18/30 m", "6/5 m"], 1, "6 × 3/5 = 18/5 meters."),
      choice("fmul-3", "4.NF.B.4", "core", "Which expression equals 3/4 + 3/4 + 3/4 + 3/4 + 3/4?", ["3 × 5/4", "5 × 3/4", "5 + 3/4", "3/4 × 3/4"], 1, "There are five equal groups of 3/4."),
      written("fmul-4", "4.NF.B.4", "challenge", "Explain why 7 × 2/3 is greater than 4.", ["Computes or bounds 14/3.", "Compares with 12/3.", "States the conclusion."], "Seven groups of 2/3 equal 14/3. Since 4 equals 12/3, 14/3 is greater than 4."),
    ],
  },
  {
    id: "decimal-fractions", subject: "math", domain: "Fractions", title: "Tenths, Hundredths, and Decimals",
    summary: "Connect fractions with denominators 10 and 100 to decimals and compare them.",
    standards: ["4.NF.C.5", "4.NF.C.6", "4.NF.C.7"], sfusdPriorities: ["math-fractions", "math-reflection"],
    learn: ["Tenths can be renamed as hundredths by multiplying numerator and denominator by 10.", "Compare decimals at the same place value and use trailing zeros when helpful."],
    workedExample: { prompt: "Compare 0.7 and 0.68.", steps: ["Rename 0.7 as 0.70.", "Compare 70 hundredths with 68 hundredths."], conclusion: "0.7 > 0.68." },
    practice: [
      choice("df-1", "4.NF.C.6", "foundation", "Which decimal equals 43/100?", ["0.043", "0.43", "4.3", "43.0"], 1, "Forty-three hundredths is 0.43."),
      choice("df-2", "4.NF.C.5", "core", "Which fraction is equivalent to 6/10?", ["6/100", "60/100", "16/100", "600/10"], 1, "Multiply numerator and denominator by 10."),
      choice("df-3", "4.NF.C.7", "core", "Which comparison is true?", ["0.39 > 0.4", "0.62 < 0.6", "0.8 = 0.80", "0.17 > 0.71"], 2, "A trailing zero does not change the value."),
      written("df-4", "4.NF.C.7", "challenge", "Explain why 0.56 is greater than 0.5.", ["Renames 0.5 as 0.50.", "Compares hundredths.", "States 56 hundredths > 50 hundredths."], "Write 0.5 as 0.50. Then compare 56 hundredths with 50 hundredths, so 0.56 is greater."),
    ],
  },
  {
    id: "area-perimeter-data", subject: "math", domain: "Measurement", title: "Area, Perimeter, and Fraction Data",
    summary: "Use formulas for rectangles and solve problems from line-plot measurements.",
    standards: ["4.MD.A.3", "4.MD.B.4"], sfusdPriorities: ["math-problem-solving", "math-discourse"],
    learn: ["Area measures square units inside a rectangle; perimeter measures distance around it.", "Line plots show frequency, and repeated fractional measurements can be combined."],
    workedExample: { prompt: "A rectangle is 9 by 4 units.", steps: ["Area: 9 × 4 = 36.", "Perimeter: 2×9 + 2×4 = 26."], conclusion: "The area is 36 square units and perimeter is 26 units." },
    practice: [
      choice("apd-1", "4.MD.A.3", "foundation", "What is the area of a 12-by-5 rectangle?", ["17 square units", "34 square units", "60 square units", "120 square units"], 2, "Area is length × width: 12 × 5 = 60."),
      choice("apd-2", "4.MD.A.3", "core", "A rectangle has perimeter 30 units and length 9 units. What is its width?", ["6 units", "12 units", "21 units", "3 units"], 0, "Two lengths use 18 units, leaving 12 for two widths, so each width is 6."),
      choice("apd-3", "4.MD.B.4", "core", "A line plot shows 1/4, 1/2, 1/2, and 3/4 meter. What is the total?", ["1 1/4 m", "1 1/2 m", "2 m", "2 1/4 m"], 2, "The measurements total 1/4 + 2/4 + 2/4 + 3/4 = 8/4 = 2."),
      written("apd-4", "4.MD.A.3", "challenge", "Two rectangles both have perimeter 24. One is 5 by 7. Give another rectangle with a different area.", ["Side lengths produce perimeter 24.", "Area differs from 35.", "Shows both calculations."], "A 4-by-8 rectangle also has perimeter 2(4+8)=24, but its area is 32 instead of 35."),
    ],
  },
  {
    id: "angle-measurement", subject: "math", domain: "Geometry & Measurement", title: "Measure and Combine Angles",
    summary: "Understand angle measure, use a protractor, and solve additive angle problems.",
    standards: ["4.MD.C.5", "4.MD.C.6", "4.MD.C.7"], sfusdPriorities: ["math-geometry", "math-problem-solving"],
    learn: ["An angle measures a turn in degrees, not the length of its rays.", "Adjacent angle measures add to the measure of the whole angle."],
    workedExample: { prompt: "A right angle is split into 34° and an unknown angle.", steps: ["A right angle measures 90°.", "Subtract 90 − 34."], conclusion: "The unknown angle is 56°." },
    practice: [
      choice("am-1", "4.MD.C.5", "foundation", "Which angle is acute?", ["38°", "90°", "124°", "180°"], 0, "An acute angle measures less than 90°."),
      choice("am-2", "4.MD.C.6", "core", "A protractor ray crosses the 67° mark from the correct zero. What is the angle measure?", ["23°", "67°", "113°", "167°"], 1, "Read the scale that begins at the aligned zero."),
      choice("am-3", "4.MD.C.7", "core", "Two adjacent angles measure 48° and 77°. What is the whole angle?", ["29°", "115°", "125°", "135°"], 2, "48 + 77 = 125 degrees."),
      written("am-4", "4.MD.C.7", "challenge", "A straight angle is split into one angle of 112° and another angle. Explain how to find the missing measure.", ["Uses 180° for a straight angle.", "Subtracts 112°.", "Gives 68°."], "A straight angle measures 180°, so subtract 112° from 180°. The missing angle is 68°."),
    ],
  },
  {
    id: "geometry-lines-shapes", subject: "math", domain: "Geometry & Measurement", title: "Lines, Shape Classification, and Symmetry",
    summary: "Identify geometric relationships and classify shapes using properties.",
    standards: ["4.G.A.1", "4.G.A.2", "4.G.A.3"], sfusdPriorities: ["math-geometry", "math-discourse"],
    learn: ["Shapes may belong to more than one category.", "Classify with required properties such as parallel lines, perpendicular lines, angle types, and symmetry."],
    workedExample: { prompt: "Classify a square.", steps: ["It has four sides and four right angles, so it is a rectangle.", "It has four equal sides, so it is also a rhombus."], conclusion: "A square belongs to both categories." },
    practice: [
      choice("gls-1", "4.G.A.1", "foundation", "Which describes perpendicular lines?", ["They never meet.", "They meet at a right angle.", "They are the same segment.", "They form only acute angles."], 1, "Perpendicular lines intersect to form 90° angles."),
      choice("gls-2", "4.G.A.2", "core", "Which statement is always true?", ["Every rhombus is a square.", "Every square is a rectangle.", "Every trapezoid is a triangle.", "Every rectangle has four equal sides."], 1, "A square has all properties required of a rectangle."),
      choice("gls-3", "4.G.A.3", "core", "How many lines of symmetry does a nonsquare rectangle have?", ["0", "1", "2", "4"], 2, "It has one vertical and one horizontal line of symmetry."),
      written("gls-4", "4.G.A.2", "challenge", "Explain why a shape with exactly one pair of parallel sides cannot be a parallelogram.", ["Uses the definition of parallelogram.", "Contrasts one pair with two pairs.", "States the classification conclusion."], "A parallelogram must have two pairs of parallel sides. A shape with exactly one pair does not meet that requirement."),
    ],
  },
];

const additionalElaLessons: AlignedGrade4Lesson[] = [
  {
    id: "theme-character-summary", subject: "ela", domain: "Reading Literature", title: "Theme, Character, and Literary Summary",
    summary: "Use a character's actions and changes to determine theme and summarize a story.",
    standards: ["RL.4.2", "RL.4.3"], sfusdPriorities: ["ela-complex-text", "ela-critical-thinking"],
    learn: ["Theme is a message developed through events and character responses.", "A literary summary includes the central conflict, important actions, and resolution."],
    workedExample: { prompt: "A student hides a failed model, then shares it so the team can improve.", steps: ["Track the change from hiding to sharing.", "Connect the change to the team's improvement."], conclusion: "A supported theme is that honest evidence helps a group learn." },
    practice: [
      choice("tcs-1", "RL.4.3", "foundation", "Which detail best reveals a character is persistent?", ["She chooses a red folder.", "He repeats the test after two failed trials.", "The room has three windows.", "They arrive on Tuesday."], 1, "Repeating the work after setbacks demonstrates persistence."),
      choice("tcs-2", "RL.4.2", "core", "A character learns to ask neighbors before changing a shared space. Which theme fits?", ["Planning is stronger when affected people are heard.", "Every plan should remain unchanged.", "Neighbors always agree.", "Shared spaces need no rules."], 0, "The lesson develops through listening before deciding."),
      choice("tcs-3", "RL.4.2", "core", "Which belongs in a story summary?", ["Every line of dialogue", "The main problem and how it is resolved", "The reader's favorite sentence", "A list of every object"], 1, "A summary focuses on the essential conflict and resolution."),
      written("tcs-4", "RL.4.3", "challenge", "A character notices that her shortcut excluded one teammate and redesigns the route. Describe how she changes.", ["Describes the initial choice.", "Uses the exclusion as evidence.", "Explains the revised, more inclusive choice."], "At first she values speed over access. After seeing that the shortcut excludes a teammate, she becomes more thoughtful and redesigns the route so the group can travel together."),
    ],
  },
  {
    id: "literary-craft-point-view", subject: "ela", domain: "Reading Literature", title: "Literary Language, Forms, and Point of View",
    summary: "Interpret words in context and compare poetry, drama, prose, and narrator perspectives.",
    standards: ["RL.4.4", "RL.4.5", "RL.4.6"], sfusdPriorities: ["ela-complex-text", "ela-vocabulary"],
    learn: ["Poems use verse and rhythm; drama uses dialogue and stage directions; prose uses sentences and paragraphs.", "First-person narrators participate in events; third-person narrators describe characters as he, she, or they."],
    workedExample: { prompt: "“I held the lantern higher,” Mara explained.", steps: ["The pronoun I signals first person.", "The narrator is part of the event."], conclusion: "The scene is narrated from Mara's first-person point of view." },
    practice: [
      choice("lcp-1", "RL.4.6", "foundation", "Which sentence uses third-person narration?", ["I opened the gate.", "We measured the path.", "She marked the final corner.", "My map was folded."], 2, "The pronoun she identifies third-person narration."),
      choice("lcp-2", "RL.4.5", "core", "Which feature most strongly signals a drama?", ["Chapter headings", "Stage directions beside dialogue", "A table of measurements", "Rhyming couplets only"], 1, "Stage directions and character dialogue are structural elements of drama."),
      choice("lcp-3", "RL.4.4", "core", "In “The rumor spread like ripples across a pond,” what does the simile suggest?", ["The rumor became wet.", "The rumor moved outward from person to person.", "The pond was crowded.", "Nobody heard the rumor."], 1, "The comparison emphasizes spreading outward."),
      written("lcp-4", "RL.4.6", "challenge", "Explain one difference between telling a rescue scene in first person and third person.", ["Names both viewpoints.", "Explains a difference in available perspective.", "Uses the rescue scene context."], "First person gives the rescuer's direct thoughts using I, while third person can describe the rescuer from outside and may also show what other characters do."),
    ],
  },
  {
    id: "literature-media-comparison", subject: "ela", domain: "Reading Literature", title: "Compare Literature, Themes, and Media",
    summary: "Connect a text to a visual or oral version and compare related themes across works.",
    standards: ["RL.4.7", "RL.4.9", "RL.4.10"], sfusdPriorities: ["ela-complex-text", "ela-critical-thinking"],
    learn: ["A performance may emphasize details through sound, pacing, expression, or images.", "When comparing themes, use evidence from both works and note meaningful differences."],
    workedExample: { prompt: "A poem and a folktale both show travelers helping strangers.", steps: ["Identify the shared idea of generosity.", "Compare how each traveler responds and what follows."], conclusion: "Both develop generosity, but through different forms and consequences." },
    practice: [
      choice("lmc-1", "RL.4.7", "foundation", "An audio performance pauses before a character opens a letter. What may the pause add?", ["The letter's exact weight", "Suspense before the decision", "A new paragraph", "The author's address"], 1, "Pacing can emphasize suspense already suggested by the scene."),
      choice("lmc-2", "RL.4.9", "core", "Which comparison uses evidence from both stories?", ["Both are good.", "Story A rewards honesty; Story B shows dishonesty causing mistrust.", "I like Story B.", "Both have pages."], 1, "It states a related theme and explains how each story treats it."),
      choice("lmc-3", "RL.4.7", "core", "A drawing shows a narrow, shadowed tunnel described in a story. How does it contribute?", ["It proves the tunnel is real.", "It helps a reader visualize the cramped setting.", "It changes the narrator.", "It removes the conflict."], 1, "The visual reflects specific setting details from the text."),
      written("lmc-4", "RL.4.9", "challenge", "Compare how two stories could develop the theme that careful listening prevents mistakes.", ["States the shared theme.", "Gives a distinct event from each imagined story.", "Explains a meaningful similarity or difference."], "In one story, a builder avoids a measurement error by listening to a partner. In the other, a guide prevents the group from taking an unsafe trail by hearing a local warning. Both reward listening, but one focuses on accuracy and the other on safety."),
    ],
  },
  {
    id: "informational-events-vocabulary", subject: "ela", domain: "Reading Information", title: "Explain Ideas, Processes, and Vocabulary",
    summary: "Explain what happened and why while determining academic and domain-specific meanings.",
    standards: ["RI.4.3", "RI.4.4"], sfusdPriorities: ["ela-complex-text", "ela-vocabulary"],
    learn: ["Connect causes, steps, and results using specific text information.", "Use definitions, examples, restatements, roots, and context to determine meaning."],
    workedExample: { prompt: "A text says sediment settles before clearer water moves onward.", steps: ["Identify settling as the earlier event.", "Connect it to clearer water as the result."], conclusion: "Settling removes suspended material before the water continues." },
    practice: [
      choice("iev-1", "RI.4.3", "foundation", "A procedure says to mark the starting height before adding water. Why?", ["To create a comparison point", "To change the container", "To warm the water", "To erase later results"], 0, "A starting mark provides evidence for measuring change."),
      choice("iev-2", "RI.4.4", "core", "In a text, permeable pavement lets water pass through small spaces. What does permeable mean?", ["Able to let liquid pass through", "Brightly colored", "Completely solid", "Recently built"], 0, "The explanation in the sentence defines the term."),
      choice("iev-3", "RI.4.3", "core", "Why might a canal gate close before water enters a chamber?", ["To enclose the water so its level can change", "To make the boat heavier", "To stop all future travel", "To measure air temperature"], 0, "The closed gate creates the controlled chamber needed for changing water level."),
      written("iev-4", "RI.4.3", "challenge", "Explain a three-step process in which rain enters a garden bed, slows in soil, and reaches plant roots.", ["Uses all three stages.", "Connects them in order.", "Explains what happens, not just lists nouns."], "Rain first enters the garden bed. The soil slows and holds some water, allowing it to move gradually toward the plant roots."),
    ],
  },
  {
    id: "accounts-visual-information", subject: "ela", domain: "Reading Information", title: "Accounts, Charts, and Visual Information",
    summary: "Compare firsthand and secondhand accounts and interpret quantitative or visual information.",
    standards: ["RI.4.6", "RI.4.7"], sfusdPriorities: ["ela-complex-text", "ela-critical-thinking"],
    learn: ["A firsthand account comes from someone who experienced the event.", "Charts, diagrams, timelines, and maps add information that must be connected to the prose."],
    workedExample: { prompt: "A volunteer's diary and a later encyclopedia describe the same cleanup.", steps: ["The diary gives personal observations.", "The encyclopedia combines broader researched facts."], conclusion: "Their focus and available information differ." },
    practice: [
      choice("avi-1", "RI.4.6", "foundation", "Which is most likely a firsthand account?", ["A participant's dated journal", "A textbook written decades later", "An encyclopedia entry", "A summary made from three reports"], 0, "The participant directly experienced and recorded the event."),
      choice("avi-2", "RI.4.7", "core", "A chart shows runoff falling from 18 liters to 11 liters after a change. What does it add?", ["A measured comparison", "The author's childhood memory", "A definition of rain", "Proof for every storm"], 0, "The chart supplies quantitative evidence for the tested conditions."),
      choice("avi-3", "RI.4.6", "core", "Why might a secondhand account include more dates than a firsthand memory?", ["It can combine records from several sources.", "It was automatically present.", "It must be fictional.", "It cannot describe events."], 0, "A later researcher may consult multiple dated records."),
      written("avi-4", "RI.4.7", "challenge", "A diagram labels water entering, filtering through gravel, and leaving a model. Explain how it supports a process paragraph.", ["Mentions the labeled stages.", "Connects the diagram to the written sequence.", "Explains the added visual relationship."], "The diagram locates each stage described in the paragraph and shows the direction water moves from the inlet through gravel to the outlet."),
    ],
  },
  {
    id: "arguments-multiple-sources", subject: "ela", domain: "Reading Information", title: "Reasons, Evidence, and Multiple Sources",
    summary: "Evaluate how points are supported and integrate information from more than one source.",
    standards: ["RI.4.8", "RI.4.9", "RI.4.10"], sfusdPriorities: ["ela-critical-thinking", "ela-research"],
    learn: ["A reason tells why a point may be valid; evidence supplies facts, examples, or measurements.", "Integration combines compatible information while preserving differences and limitations."],
    workedExample: { prompt: "One source reports lower noise; another reports a blocked route.", steps: ["Keep both outcomes accurate.", "Explain that the plan helped one goal but needs an access revision."], conclusion: "A conditional conclusion represents both sources." },
    practice: [
      choice("ams-1", "RI.4.8", "foundation", "Which sentence is evidence rather than a reason?", ["Shade is important because heat can be unsafe.", "The shaded surface measured 8°C cooler at noon.", "The plan should include shade.", "Comfort matters."], 1, "The measurement is observable evidence."),
      choice("ams-2", "RI.4.9", "core", "Source A says visits increased; Source B says maintenance cost rose. Which synthesis is accurate?", ["The plan had only benefits.", "The plan increased visits but also raised maintenance cost.", "The sources disagree about visits.", "Cost never matters."], 1, "The sentence preserves distinct evidence from both sources."),
      choice("ams-3", "RI.4.8", "core", "An author claims a route is safer and cites fewer near-misses during a four-week pilot. What limitation matters?", ["The pilot covered only four weeks.", "The route has a name.", "Four is an even number.", "Safety cannot be measured."], 0, "A short pilot may not represent longer or seasonal conditions."),
      written("ams-4", "RI.4.9", "challenge", "Combine this evidence: one source reports faster service; another reports that two users could not reach the new station.", ["Uses both sources.", "Distinguishes efficiency from access.", "Makes a qualified conclusion."], "The station improved service speed, but it should not expand until its access problem is corrected because two users could not reach it."),
    ],
  },
  {
    id: "word-reading-fluency", subject: "ela", domain: "Foundational Reading", title: "Word Analysis and Fluent Reading",
    summary: "Use roots and affixes to decode words and read grade-level text accurately and meaningfully.",
    standards: ["RF.4.3", "RF.4.4"], sfusdPriorities: ["ela-vocabulary", "ela-complex-text"],
    learn: ["Greek and Latin roots and affixes can reveal a word's pronunciation and meaning.", "Fluent reading balances accuracy, appropriate rate, phrasing, and attention to meaning."],
    workedExample: { prompt: "Use the root photo, meaning light, in photograph.", steps: ["Identify photo as the root.", "Connect graph to recording or writing."], conclusion: "A photograph is an image recorded using light." },
    practice: [
      choice("wrf-1", "RF.4.3", "foundation", "What does the prefix re- suggest in rebuild?", ["Before", "Again", "Without", "Small"], 1, "Rebuild means to build again."),
      choice("wrf-2", "RF.4.3", "core", "The root port means carry. Which word most directly uses that meaning?", ["portable", "portion", "portrait", "portal"], 0, "Something portable can be carried."),
      choice("wrf-3", "RF.4.4", "core", "Which reading choice best supports comprehension?", ["Ignore punctuation and race.", "Pause at phrases and adjust rate for difficult ideas.", "Pronounce only familiar words.", "Use the same expression for every sentence."], 1, "Meaningful phrasing and flexible rate support understanding."),
      written("wrf-4", "RF.4.4", "challenge", "Explain how punctuation should affect reading this line: “Wait—did the signal change?”", ["Notes the pause at the dash.", "Uses questioning intonation.", "Connects expression to uncertainty."], "Pause after “Wait” at the dash, then raise or shape the voice as a genuine question to show the speaker's uncertainty."),
    ],
  },
  {
    id: "informative-writing", subject: "ela", domain: "Writing", title: "Informative Writing and Revision",
    summary: "Develop a clear multi-paragraph explanation with facts, precise language, and useful organization.",
    standards: ["W.4.2", "W.4.4", "W.4.5", "W.4.6"], sfusdPriorities: ["ela-informative", "ela-conventions"],
    learn: ["Group related information and use headings or media only when they improve understanding.", "Revision strengthens ideas and organization; editing corrects language and conventions."],
    workedExample: { prompt: "Explain how a rain garden works.", steps: ["Introduce the purpose.", "Group information about collection, soil, and plants.", "Use precise terms and conclude."], conclusion: "The structure follows the process while explaining each part's role." },
    practice: [
      choice("iw-1", "W.4.2", "foundation", "Which opening best introduces an explanation of composting?", ["Composting turns selected food scraps and yard material into a soil-like amendment.", "Compost is cool!", "Once upon a time,", "Everybody already knows compost."], 0, "It clearly introduces the topic with precise information."),
      choice("iw-2", "W.4.2", "core", "Which detail belongs in a paragraph about how a solar oven traps heat?", ["Dark surfaces absorb energy inside the covered box.", "My favorite lunch is soup.", "The school mascot is a hawk.", "Friday comes after Thursday."], 0, "The detail directly develops the process."),
      choice("iw-3", "W.4.5", "core", "Which revision improves organization?", ["Group material facts separately from test results.", "Remove every transition.", "Add unrelated jokes.", "Repeat the introduction after each sentence."], 0, "Grouping related information helps readers follow the explanation."),
      written("iw-4", "W.4.2", "challenge", "Write a three-sentence explanation of how a labeled collection bin improves sorting.", ["Introduces the process.", "Uses at least one concrete detail.", "Provides a concluding result."], "A labeled bin shows users where each material belongs. Pictures and words help people sort even when packages look similar. Clear labels can reduce items placed in the wrong container."),
    ],
  },
  {
    id: "narrative-writing", subject: "ela", domain: "Writing", title: "Narrative Writing",
    summary: "Develop an event sequence with characters, setting, dialogue, sensory details, and reflection.",
    standards: ["W.4.3", "W.4.4", "W.4.5", "W.4.6"], sfusdPriorities: ["ela-narrative", "ela-conventions"],
    learn: ["Orient the reader, sequence events naturally, and use dialogue or description to reveal responses.", "A conclusion should follow from the experience rather than appear unrelated."],
    workedExample: { prompt: "Write about discovering that two maps disagree.", steps: ["Establish the setting and goal.", "Use dialogue as the characters compare evidence.", "End with what they learned."], conclusion: "The conflict and resolution reveal a change in understanding." },
    practice: [
      choice("nw-1", "W.4.3", "foundation", "Which sentence best establishes a narrative setting?", ["At sunrise, the empty ferry dock echoed under a gray sky.", "Ferries are transportation.", "I will explain three reasons.", "The data table has rows."], 0, "It establishes time, place, and atmosphere."),
      choice("nw-2", "W.4.3", "core", "Which dialogue punctuation is correct?", ["“The marker moved,” Ana said.", "“The marker moved”, Ana said.", "The marker “moved,” Ana said.", "“The marker moved, Ana said.”"], 0, "The comma and quotation marks correctly separate speech from the tag."),
      choice("nw-3", "W.4.3", "core", "Which transition best signals simultaneous action?", ["Meanwhile,", "In conclusion,", "For example,", "As a result of the evidence,"], 0, "Meanwhile signals events occurring at the same time."),
      written("nw-4", "W.4.3", "challenge", "Write a brief ending in which a character reflects on correcting a measurement mistake.", ["Resolves the immediate event.", "Includes a reflection or lesson.", "Connects to the measurement mistake."], "After replacing the marker, Lian recorded the correct height. She realized that admitting the mistake had not slowed the team—it had made their conclusion trustworthy."),
    ],
  },
  {
    id: "research-note-taking", subject: "ela", domain: "Writing", title: "Research, Note-Taking, and Source Use",
    summary: "Investigate a focused question, assess relevant information, take notes, paraphrase, and cite sources.",
    standards: ["W.4.7", "W.4.8", "W.4.9", "W.4.10"], sfusdPriorities: ["ela-research", "ela-critical-thinking"],
    learn: ["A focused research question guides which evidence is relevant.", "Paraphrasing restates meaning in new words without changing the source's claim."],
    workedExample: { prompt: "Research which surface keeps a model cooler.", steps: ["Ask a focused comparison question.", "Record source title, conditions, and measurements.", "Paraphrase the result and retain its limit."], conclusion: "Traceable notes support accurate source-based writing." },
    practice: [
      choice("rnt-1", "W.4.7", "foundation", "Which research question is most focused?", ["What is everything about water?", "How do two local surfaces affect rainwater runoff?", "Why are things interesting?", "What happened in history?"], 1, "It names a specific comparison and topic."),
      choice("rnt-2", "W.4.8", "core", "Which note is most useful?", ["Cool fact!", "Source B, p. 4: shaded pavement averaged 6°C cooler at noon during the five test days.", "I like shade.", "Temperatures exist."], 1, "It records source, location, measurement, and conditions."),
      choice("rnt-3", "W.4.8", "core", "Source: “The pilot collected 82% of containers.” Which is an accurate paraphrase?", ["The short trial recovered about four out of five containers.", "Every container was returned forever.", "Containers are always inexpensive.", "The pilot failed completely."], 0, "It restates the percentage accurately without overstating it."),
      written("rnt-4", "W.4.9", "challenge", "Use these notes in one sentence: Source A—less litter; Source B—washing used more hot water than planned.", ["Attributes or distinguishes both sources.", "Preserves both findings.", "Avoids an unlimited claim."], "The sources show that the reusable system reduced litter but used more hot water than planners expected."),
    ],
  },
  {
    id: "speaking-listening", subject: "ela", domain: "Speaking & Listening", title: "Discussion, Listening, and Presentation",
    summary: "Prepare for discussion, paraphrase information, evaluate a speaker's evidence, and present clearly.",
    standards: ["SL.4.1", "SL.4.2", "SL.4.3", "SL.4.4", "SL.4.5", "SL.4.6"], sfusdPriorities: ["ela-speaking-listening", "ela-critical-thinking"],
    learn: ["Build on another speaker's idea with relevant evidence and ask questions that clarify.", "Choose formal or informal language, pacing, audio, and visuals to fit the audience and purpose."],
    workedExample: { prompt: "A speaker recommends a pilot and cites one measurement.", steps: ["Paraphrase the recommendation.", "Identify the cited evidence.", "Ask about duration and other locations."], conclusion: "Careful listening supports a relevant follow-up question." },
    practice: [
      choice("sl-1", "SL.4.1", "foundation", "Which response builds on a classmate's idea?", ["I agree because the second chart also shows lower use.", "You're wrong.", "I was not listening.", "Let's discuss something else."], 0, "It connects agreement to additional relevant evidence."),
      choice("sl-2", "SL.4.2", "core", "Which is the best paraphrase of “The barrier leaked less, but the test lasted only two minutes”?", ["The short test found lower leakage.", "The barrier never leaks.", "Two barriers were removed.", "The test proved all conditions."], 0, "It retains both the result and the brief duration."),
      choice("sl-3", "SL.4.5", "core", "Which visual best supports a presentation comparing monthly water use?", ["A labeled bar graph", "An unrelated photograph", "A decorative border", "A blank slide"], 0, "A labeled graph makes the quantitative comparison visible."),
      written("sl-4", "SL.4.4", "challenge", "Draft a two-sentence formal opening for a presentation recommending a limited pilot.", ["Introduces the topic clearly.", "States the recommendation.", "Uses formal language and a relevant reason."], "Today I recommend a six-week pilot of the new collection system. A limited trial will let the school measure return rates and access before deciding whether to expand."),
    ],
  },
  {
    id: "grammar-conventions-vocabulary", subject: "ela", domain: "Language", title: "Grammar, Conventions, and Precise Vocabulary",
    summary: "Use standard English grammar and punctuation while selecting words appropriate to context.",
    standards: ["L.4.1", "L.4.2", "L.4.3", "L.4.4", "L.4.5", "L.4.6"], sfusdPriorities: ["ela-conventions", "ela-vocabulary"],
    learn: ["Edit for complete sentences, agreement, verb tense, capitalization, commas, quotation marks, and spelling.", "Use context, roots, reference tools, figurative language, and word relationships to choose precise vocabulary."],
    workedExample: { prompt: "Revise: The teams map are clearer than ours.", steps: ["The plural subject teams needs the plural possessive teams'.", "The singular object map needs is."], conclusion: "The teams' map is clearer than ours." },
    practice: [
      choice("gcv-1", "L.4.1", "foundation", "Which sentence has correct subject-verb agreement?", ["The collection of maps are ready.", "The collection of maps is ready.", "The maps collection were ready.", "The collection be ready."], 1, "The singular subject collection takes is."),
      choice("gcv-2", "L.4.2", "core", "Which sentence uses quotation punctuation correctly?", ["Maya asked, “Did the reading change?”", "Maya asked “Did the reading change”?", "Maya asked, Did the reading change?", "“Maya asked”, did the reading change?"], 0, "The spoken question and question mark belong inside quotation marks."),
      choice("gcv-3", "L.4.5", "core", "What does “the room was a beehive of activity” mean?", ["Bees entered the room.", "The room was busy and energetic.", "The room was silent.", "The room was outdoors."], 1, "The metaphor compares the busy room to an active hive."),
      written("gcv-4", "L.4.3", "challenge", "Revise this for a formal report: “The new setup was kinda awesome and stuff moved way faster.”", ["Uses formal language.", "Replaces vague words.", "Preserves the claim without exaggeration."], "The revised setup improved the measured movement time during the trial."),
    ],
  },
];

const alignedLessonBank: AlignedGrade4Lesson[] = [
  ...previewLessons.map(upgradePreviewLesson),
  ...additionalMathLessons,
  ...additionalElaLessons,
];

const sortedLessonBank = alignedLessonBank.sort((a, b) => {
  if (a.subject !== b.subject) return a.subject === "math" ? -1 : 1;
  return a.domain.localeCompare(b.domain) || a.title.localeCompare(b.title);
});

const choiceCursor: Record<LearnSubject, number> = { math: 0, ela: 0 };

export const grade4AlignedLessons: AlignedGrade4Lesson[] = sortedLessonBank.map((lesson) => ({
  ...lesson,
  practice: lesson.practice.map((question) => {
    const prompt = `${lesson.title} — ${question.prompt}`;
    if (question.type === "written") return { ...question, prompt };
    const targetIndex = choiceCursor[lesson.subject]++ % question.options.length;
    const shift = (question.correctIndex - targetIndex + question.options.length) % question.options.length;
    return {
      ...question,
      prompt,
      options: [...question.options.slice(shift), ...question.options.slice(0, shift)],
      correctIndex: targetIndex,
    };
  }),
}));

export function lessonsForSubject(subject: LearnSubject): AlignedGrade4Lesson[] {
  return grade4AlignedLessons.filter((lesson) => lesson.subject === subject);
}

export function learnCoverage(subject: LearnSubject) {
  const lessons = lessonsForSubject(subject);
  return {
    lessons: lessons.length,
    practiceTasks: lessons.reduce((sum, lesson) => sum + lesson.practice.length, 0),
    standards: new Set(lessons.flatMap((lesson) => lesson.standards)).size,
    writtenTasks: lessons.flatMap((lesson) => lesson.practice).filter((question) => question.type === "written").length,
  };
}
