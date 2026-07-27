import type { Question, ResponseConstraint } from "./questions";

const BANK_VERSION = "2026-07-27.1";
const LETTERS = "ABCDEFGH";

type Difficulty = "easy" | "medium" | "hard";
type MathItem = Omit<Question, "id" | "grade" | "subject" | "practiceTest" | "provenance" | "claim" | "dok"> & {
  dok?: number;
};

interface Phase4PtConfig {
  sourceId: string;
  title: string;
  directions: string;
  table: NonNullable<Question["dataTable"]>;
  q1: { prompt: string; answer: string; explanation: string };
  q2: { prompt: string; labels: string[]; answers: string[]; explanation: string };
  q3: { prompt: string; labels: string[]; answers: string[]; explanation: string };
  q4: { prompt: string; exemplar: string };
  q5: {
    prompt: string;
    labels: string[];
    sample: string[];
    alternate: string[];
    constraint: ResponseConstraint;
    explanation: string;
  };
}

interface Phase4MathConfig {
  testNumber: 6 | 7 | 8 | 9 | 10;
  difficulty: Difficulty;
  baseId: number;
  setting: string;
  objects: [string, string, string, string];
  seed: number;
  pt: Phase4PtConfig;
}

function optionList(values: string[]): { label: string; text: string }[] {
  return values.map((text, index) => ({ label: LETTERS[index], text }));
}

function relabel(label: string, shift: number, length: number): string {
  const original = LETTERS.indexOf(label);
  if (original < 0) return label;
  return LETTERS[(original - shift + length) % length];
}

function rotateOptions(question: Question): Question {
  const rotate = (values: { label: string; text: string }[], shift: number) => {
    const amount = shift % values.length;
    return [...values.slice(amount), ...values.slice(0, amount)].map((value, index) => ({
      ...value,
      label: LETTERS[index],
    }));
  };
  const shift = question.id % 4;
  const copy = { ...question };
  if (copy.options?.length) {
    const length = copy.options.length;
    copy.options = rotate(copy.options, shift);
    if (typeof copy.correctAnswer === "string") {
      copy.correctAnswer = relabel(copy.correctAnswer, shift, length);
    } else if (copy.type === "multi-select") {
      copy.correctAnswer = copy.correctAnswer.map((label) => relabel(label, shift, length)).sort();
      if (copy.scoringRule?.kind === "unordered-set") {
        copy.scoringRule = {
          kind: "unordered-set",
          acceptedAnswers: copy.scoringRule.acceptedAnswers.map((label) => relabel(label, shift, length)).sort(),
        };
      }
    }
  }
  if (copy.partAOptions?.length && Array.isArray(copy.correctAnswer)) {
    const length = copy.partAOptions.length;
    copy.partAOptions = rotate(copy.partAOptions, shift);
    copy.correctAnswer = [relabel(copy.correctAnswer[0], shift, length), copy.correctAnswer[1]];
  }
  if (copy.partBOptions?.length && Array.isArray(copy.correctAnswer)) {
    const partBShift = (shift + 1) % copy.partBOptions.length;
    const length = copy.partBOptions.length;
    copy.partBOptions = rotate(copy.partBOptions, partBShift);
    copy.correctAnswer = [copy.correctAnswer[0], relabel(copy.correctAnswer[1], partBShift, length)];
  }
  return copy;
}

function balanceSingleAnswerPositions(questions: Question[]): Question[] {
  let cursor = 0;
  const rotateTo = (
    values: { label: string; text: string }[],
    answer: string,
    target: string
  ): { values: { label: string; text: string }[]; answer: string } => {
    const length = values.length;
    const shift = (LETTERS.indexOf(answer) - LETTERS.indexOf(target) + length) % length;
    const rotated = [...values.slice(shift), ...values.slice(0, shift)].map((value, index) => ({
      ...value,
      label: LETTERS[index],
    }));
    return { values: rotated, answer: relabel(answer, shift, length) };
  };
  return questions.map((question) => {
    const copy = { ...question };
    if (copy.options?.length && typeof copy.correctAnswer === "string") {
      const moved = rotateTo(copy.options, copy.correctAnswer, LETTERS[cursor++ % 4]);
      copy.options = moved.values;
      copy.correctAnswer = moved.answer;
    }
    if (copy.partAOptions?.length && Array.isArray(copy.correctAnswer)) {
      const moved = rotateTo(copy.partAOptions, copy.correctAnswer[0], LETTERS[cursor++ % 4]);
      copy.partAOptions = moved.values;
      copy.correctAnswer = [moved.answer, copy.correctAnswer[1]];
    }
    if (copy.partBOptions?.length && Array.isArray(copy.correctAnswer)) {
      const moved = rotateTo(copy.partBOptions, copy.correctAnswer[1], LETTERS[cursor++ % 4]);
      copy.partBOptions = moved.values;
      copy.correctAnswer = [copy.correctAnswer[0], moved.answer];
    }
    return copy;
  });
}

function provenance(testNumber: number, sourceId: string): NonNullable<Question["provenance"]> {
  return {
    sourceId,
    origin: "original",
    author: "CAASPP Practice Project",
    license: "Original companion content; all rights reserved for this project.",
    reviewedAt: "2026-07-27",
  };
}

function buildMath(config: Phase4MathConfig): { cat: Question[]; pt: Question[] } {
  const { testNumber, difficulty, baseId, setting, objects, seed } = config;
  const dok = difficulty === "easy"
    ? [1,1,1,2,2,2,1,2,2,1,2,2,2,1,2,1,1,2,2,3,3,3,2,2,3,3,2,3,3,3,4]
    : difficulty === "medium"
      ? [2,2,2,2,2,3,2,2,3,2,3,2,3,2,3,2,2,3,3,3,3,3,3,2,3,3,2,3,3,4,4]
      : [2,2,2,2,3,3,2,2,3,2,3,2,3,2,3,2,2,3,3,3,3,3,3,2,3,3,2,3,3,4,4];
  const claims = [...Array(17).fill(1), ...Array(3).fill(2), ...Array(8).fill(3), ...Array(3).fill(4)];
  const make = (index: number, value: MathItem): Question => rotateOptions({
    ...value,
    id: baseId + index,
    grade: 4,
    subject: "math",
    practiceTest: testNumber,
    claim: claims[index - 1],
    dok: dok[index - 1],
    provenance: provenance(testNumber, `g4-t${testNumber}-math-cat-${baseId + index}`),
  });

  const roundedNumber = 243_650 + seed * 11_100;
  const nearestThousand = Math.round(roundedNumber / 1_000) * 1_000;
  const nearestTenThousand = Math.round(roundedNumber / 10_000) * 10_000;
  const addendStart = 215_430 + seed * 12_345;
  const addendTarget = 700_000 + seed * 10_000;
  const missingAddend = addendTarget - addendStart;
  const factorA = 24 + seed * 3;
  const factorB = 16 + seed * 2;
  const product = factorA * factorB;
  const dividend = 215 + seed * 17;
  const divisor = 8 + seed;
  const quotient = Math.floor(dividend / divisor);
  const remainder = dividend % divisor;
  const partialA = (30 + seed * 2) * 20;
  const partialB = (30 + seed * 2) * (4 + seed);
  const partialTotal = partialA + partialB;
  const exactProduct = (28 + seed) * (14 + seed);

  const cat: Question[] = [
    make(1, { testType: "cat", domain: "NBT", target: "D", standard: "4.NBT.A.3", type: "two-part", questionText: `A ${setting} record shows ${roundedNumber.toLocaleString()} ${objects[0]}. Round the value to two different places.`, partAPrompt: "Part A: Which pair gives the nearest thousand and nearest ten thousand, in that order?", partAOptions: optionList([`${nearestThousand.toLocaleString()} and ${nearestTenThousand.toLocaleString()}`, `${nearestTenThousand.toLocaleString()} and ${nearestThousand.toLocaleString()}`, `${(nearestThousand - 1_000).toLocaleString()} and ${nearestTenThousand.toLocaleString()}`, `${nearestThousand.toLocaleString()} and ${(nearestTenThousand + 10_000).toLocaleString()}`]), partBPrompt: "Part B: Which statement describes the rounding decision?", partBOptions: optionList(["Use the hundreds digit for thousands and the thousands digit for ten thousands.", "Use the ones digit for both places.", "Always increase both target digits.", "Remove every digit left of the target place."]), correctAnswer: ["A", "A"], rubric: "1 point: Both parts are correct.", points: 1, explanation: `${roundedNumber.toLocaleString()} rounds to ${nearestThousand.toLocaleString()} and ${nearestTenThousand.toLocaleString()}.` }),
    make(2, { testType: "cat", domain: "NBT", target: "D", standard: "4.NBT.A.2", type: "multiple-choice", questionText: `The ${setting} inventory number has 6 in the hundred-thousands place, ${seed} in the thousands place, and 4 in the ones place. Which number matches?`, options: optionList([`60${seed},004`, `6${seed}0,004`, `60${seed},040`, `${seed}60,004`]), correctAnswer: "A", rubric: "1 point: Select the matching place-value number.", points: 1, explanation: `60${seed},004 places each named digit correctly.` }),
    make(3, { testType: "cat", domain: "NBT", target: "D", standard: "4.NBT.A.1", type: "multi-select", selection: { min: 2, max: 2 }, questionText: `Select the two true place-value statements in the ${setting} data.`, options: optionList(["A digit in the ten-thousands place is ten times its value in the thousands place.", "A digit in the hundreds place is one hundred times its value in the tens place.", "A digit in the thousands place is ten times its value in the hundreds place.", "Moving a digit one place right makes its value ten times greater."]), correctAnswer: ["A", "C"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["A", "C"] }, rubric: "1 point: Select A and C only.", points: 1, explanation: "Moving one place left multiplies a digit's value by ten." }),
    make(4, { testType: "cat", domain: "NBT", target: "E", standard: "4.NBT.B.4", type: "multi-input", responseFields: [{ label: "Missing addend" }, { label: "Check by subtraction" }], questionText: `The ${setting} total satisfies ${addendStart.toLocaleString()} + □ = ${addendTarget.toLocaleString()}. Enter the missing addend twice: once as the addend and once as the subtraction check.`, correctAnswer: [String(missingAddend), String(missingAddend)], scoringRule: { kind: "ordered-fields" }, rubric: "1 point: Both fields equal the missing addend.", points: 1, explanation: `${addendTarget.toLocaleString()} − ${addendStart.toLocaleString()} = ${missingAddend.toLocaleString()}.` }),
    make(5, { testType: "cat", domain: "NBT", target: "E", standard: "4.NBT.B.5", type: "multi-input", responseFields: [{ label: `${factorA} × ${factorB - seed}` }, { label: "Complete product" }], questionText: `A ${setting} team arranges ${factorA} groups of ${factorB} ${objects[1]}. Enter the first partial product ${factorA} × ${factorB - seed}, then the complete product.`, correctAnswer: [String(factorA * (factorB - seed)), String(product)], scoringRule: { kind: "ordered-fields" }, rubric: "1 point: Both products are correct.", points: 1, explanation: `${factorA} × ${factorB} = ${product}.` }),
    make(6, { testType: "cat", domain: "NBT", target: "E", standard: "4.NBT.B.6", type: "two-part", questionText: `${dividend} ${objects[2]} are packed equally into groups of ${divisor}.`, partAPrompt: "Part A: How many complete groups can be made?", partAOptions: optionList([String(quotient), String(quotient + 1), String(remainder), String(divisor)]), partBPrompt: "Part B: What happens to the remaining amount?", partBOptions: optionList([`${remainder} remain after the complete groups.`, "There is no remainder.", `${divisor} remain.`, "The remainder creates another complete group."]), correctAnswer: ["A", "A"], rubric: "1 point: Both quotient and remainder interpretation are correct.", points: 1, explanation: `${dividend} ÷ ${divisor} = ${quotient} remainder ${remainder}.` }),
    make(7, { testType: "cat", domain: "OA", target: "A", standard: "4.OA.A.3", type: "multiple-choice", questionText: `At the ${setting}, ${12 + seed} trays each hold ${6 + seed} ${objects[0]}. Staff set aside ${8 + seed}. Which expression gives the number still available?`, options: optionList([`(${12 + seed} × ${6 + seed}) − ${8 + seed}`, `${12 + seed} × (${6 + seed} − ${8 + seed})`, `${12 + seed} + ${6 + seed} + ${8 + seed}`, `(${12 + seed} + ${6 + seed}) × ${8 + seed}`]), correctAnswer: "A", rubric: "1 point: Select the multiply-then-subtract expression.", points: 1, explanation: "Find the tray total, then subtract the set-aside amount." }),
    make(8, { testType: "cat", domain: "OA", target: "B", standard: "4.OA.B.4", type: "grid-match", questionText: `Classify each ${setting} count. Select every true description in its row.`, gridRows: ["29", "36", "41"], gridColumns: ["Prime", "Composite", "Multiple of 6"], gridSelection: { perRowMin: 1, perRowMax: 2, rowSelections: [{ min: 1, max: 1 }, { min: 2, max: 2 }, { min: 1, max: 1 }], totalMin: 4, totalMax: 4 }, correctAnswer: ["0:0", "1:1", "1:2", "2:0"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["0:0", "1:1", "1:2", "2:0"] }, rubric: "1 point: All four classifications.", points: 1, explanation: "29 and 41 are prime; 36 is composite and divisible by 6." }),
    make(9, { testType: "cat", domain: "OA", target: "C", standard: "4.OA.C.5", type: "two-part", questionText: `A ${setting} pattern begins ${seed + 2}, ${seed + 7}, ${seed + 12}, ${seed + 17}.`, partAPrompt: "Part A: Which rule generates the pattern?", partAOptions: optionList(["Add 5.", "Multiply by 5.", "Add the term number.", "Subtract 5."]), partBPrompt: "Part B: What is the sixth term?", partBOptions: optionList([String(seed + 27), String(seed + 22), String((seed + 2) * 6), String(seed + 32)]), correctAnswer: ["A", "A"], rubric: "1 point: Both rule and sixth term.", points: 1, explanation: "Adding 5 repeatedly gives the sixth term." }),
    make(10, { testType: "cat", domain: "OA", target: "A", standard: "4.OA.A.1", type: "multiple-choice", questionText: `One ${setting} shelf holds ${4 + seed} ${objects[3]}. Another holds ${3 + seed} times as many. Which equation finds the second amount?`, options: optionList([`${4 + seed} × ${3 + seed} = □`, `${4 + seed} + ${3 + seed} = □`, `${4 + seed} − ${3 + seed} = □`, `${4 + seed} ÷ ${3 + seed} = □`]), correctAnswer: "A", rubric: "1 point: Select the multiplicative comparison.", points: 1, explanation: "Times as many indicates multiplication." }),
    make(11, { testType: "cat", domain: "NF", target: "F", standard: "4.NF.A.2", type: "multi-select", selection: { min: 2, max: 2 }, questionText: `Two ${setting} teams compare 5/6 and 7/9. Select the two valid comparison methods.`, options: optionList(["Use denominator 18: 15/18 is greater than 14/18.", "Compare cross-products: 5 × 9 is greater than 7 × 6.", "The fraction with denominator 9 is always greater.", "Subtract both denominators from 10."]), correctAnswer: ["A", "B"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["A", "B"] }, rubric: "1 point: Select both valid methods.", points: 1, explanation: "Common denominators and cross-products both show 5/6 > 7/9." }),
    make(12, { testType: "cat", domain: "NF", target: "G", standard: "4.NF.B.3", type: "text-input", questionText: `A ${setting} strip is 3 1/4 units long. A piece 1 3/4 units is used. How much remains? Enter a fraction or mixed number.`, correctAnswer: "1 1/2", acceptedAnswers: ["1 1/2", "3/2", "1.5"], scoringRule: { kind: "numeric-equivalent", acceptedValues: [1.5] }, rubric: "1 point: Any value equivalent to 1 1/2.", points: 1, explanation: "3 1/4 − 1 3/4 = 1 1/2." }),
    make(13, { testType: "cat", domain: "NF", target: "H", standard: "4.NF.B.4", type: "two-part", questionText: `A ${setting} collection contains ${24 + seed * 4} ${objects[0]}. Three eighths are marked for review.`, partAPrompt: "Part A: How many are marked?", partAOptions: optionList([String(((24 + seed * 4) / 8) * 3), String((24 + seed * 4) / 8), String((24 + seed * 4) * 3), String(24 + seed * 4 - 3)]), partBPrompt: "Part B: Which expression matches the reasoning?", partBOptions: optionList([`(${24 + seed * 4} ÷ 8) × 3`, `${24 + seed * 4} ÷ 3`, `${24 + seed * 4} + 8 + 3`, `(${24 + seed * 4} − 8) × 3`]), correctAnswer: ["A", "A"], rubric: "1 point: Both amount and expression.", points: 1, explanation: "Find one eighth, then multiply by 3." }),
    make(14, { testType: "cat", domain: "NF", target: "I", standard: "4.NF.C.6", type: "grid-match", questionText: `Match each ${setting} value to an equivalent decimal or fraction.`, gridRows: ["3/10", "47/100", "8/10"], gridColumns: ["0.30", "0.47", "0.80"], gridSelection: { perRowMin: 1, perRowMax: 1, totalMin: 3, totalMax: 3 }, correctAnswer: ["0:0", "1:1", "2:2"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["0:0", "1:1", "2:2"] }, rubric: "1 point: All three matches.", points: 1, explanation: "Tenths and hundredths translate directly to decimal place values." }),
    make(15, { testType: "cat", domain: "NF", target: "I", standard: "4.NF.C.7", type: "two-part", questionText: `A ${setting} report compares 0.6 and 0.57.`, partAPrompt: "Part A: Which comparison is true?", partAOptions: optionList(["0.6 > 0.57", "0.6 < 0.57", "0.6 = 0.57", "The values cannot be compared."]), partBPrompt: "Part B: Which explanation is valid?", partBOptions: optionList(["Write 0.6 as 0.60; 60 hundredths is greater than 57 hundredths.", "A longer decimal is always greater.", "Six is less than fifty-seven.", "Trailing zeros change a decimal's value."]), correctAnswer: ["A", "A"], rubric: "1 point: Both comparison and reasoning.", points: 1, explanation: "0.60 is greater than 0.57." }),
    make(16, { testType: "cat", domain: "MD", target: "J", standard: "4.MD.A.1", type: "multi-input", responseFields: [{ label: "Feet" }, { label: "Inches" }], questionText: `A ${setting} cord is ${3 + seed} yards long. Enter its length in feet and inches.`, correctAnswer: [String((3 + seed) * 3), String((3 + seed) * 36)], scoringRule: { kind: "ordered-fields" }, rubric: "1 point: Both conversions.", points: 1, explanation: "Each yard is 3 feet or 36 inches." }),
    make(17, { testType: "cat", domain: "G", target: "K", standard: "4.G.A.2", type: "grid-match", questionText: `Classify the shapes used in a ${setting} diagram. Select every true category.`, gridRows: ["A square", "A rectangle that is not a square", "A rhombus with no right angles"], gridColumns: ["Quadrilateral", "Rectangle", "Rhombus"], gridSelection: { perRowMin: 1, perRowMax: 3, rowSelections: [{ min: 3, max: 3 }, { min: 2, max: 2 }, { min: 2, max: 2 }], totalMin: 7, totalMax: 7 }, correctAnswer: ["0:0", "0:1", "0:2", "1:0", "1:1", "2:0", "2:2"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["0:0", "0:1", "0:2", "1:0", "1:1", "2:0", "2:2"] }, rubric: "1 point: All seven classifications.", points: 1, explanation: "Categories can overlap; a square is both a rectangle and rhombus." }),
    make(18, { testType: "cat", domain: "MD", target: "L", standard: "4.MD.A.2", type: "multi-input", responseFields: [{ label: "Minutes before break" }, { label: "Minutes after break" }], questionText: `A ${setting} activity lasts 95 minutes with a 15-minute break. The work time is split equally before and after the break. Enter each work interval.`, correctAnswer: ["40", "40"], scoringRule: { kind: "ordered-fields" }, rubric: "1 point: Enter 40 and 40.", points: 1, explanation: "95 − 15 = 80 work minutes; 80 ÷ 2 = 40." }),
    make(19, { testType: "cat", domain: "NF", target: "M", standard: "4.NF.B.3", type: "multi-input", responseFields: [{ label: "Complete portions" }, { label: "Fraction remaining" }], questionText: `A ${setting} supply is 3 1/2 units. Each portion uses 3/4 unit. Enter the number of complete portions and the amount remaining.`, correctAnswer: ["4", "1/2"], acceptedAnswers: ["4", "0.5"], scoringRule: { kind: "ordered-fields" }, rubric: "1 point: Four portions and 1/2 unit remain.", points: 1, explanation: "Four portions use 3 units, leaving 1/2 unit." }),
    make(20, { testType: "cat", domain: "NBT", target: "E", standard: "4.NBT.B.5", type: "multi-input", responseFields: [{ label: "First partial product" }, { label: "Complete product" }], questionText: `A ${setting} calculation multiplies ${30 + seed * 2} by ${24 + seed}. Correct the two recorded values by entering the product with 20 and then the complete product.`, correctAnswer: [String(partialA), String(partialTotal)], scoringRule: { kind: "partial-credit", tiers: [{ points: 2, constraint: { kind: "all", constraints: [{ kind: "field-equals", index: 0, value: String(partialA) }, { kind: "field-equals", index: 1, value: String(partialTotal) }] } }, { points: 1, constraint: { kind: "any", constraints: [{ kind: "field-equals", index: 0, value: String(partialA) }, { kind: "field-equals", index: 1, value: String(partialTotal) }] } }] }, rubric: "2 points: Both corrections. 1 point: One correction. 0 points: Neither.", points: 2, explanation: `The partial product is ${partialA}; the complete product is ${partialTotal}.` }),
    make(21, { testType: "cat", domain: "OA", target: "A", standard: "4.OA.A.3", type: "two-part", questionText: `A ${setting} volunteer estimates ${28 + seed} × ${14 + seed} as 30 × ${15 + seed}.`, partAPrompt: "Part A: Is the estimate greater than or less than the exact product?", partAOptions: optionList(["Greater than", "Less than", "Exactly equal", "Impossible to determine"]), partBPrompt: "Part B: Which evidence supports the answer?", partBOptions: optionList([`The estimate is ${30 * (15 + seed)}, while the exact product is ${exactProduct}.`, "Both factors were rounded down.", "The exact factors were added.", "An estimate never has a direction."]), correctAnswer: [30 * (15 + seed) > exactProduct ? "A" : "B", "A"], rubric: "1 point: Both judgment and evidence.", points: 1, explanation: `Compare ${30 * (15 + seed)} with ${exactProduct}.` }),
    make(22, { testType: "cat", domain: "NF", target: "F", standard: "4.NF.A.1", type: "multi-select", selection: { min: 2, max: 2 }, questionText: `Select the two complete arguments a ${setting} team could use to prove 6/8 = 3/4.`, options: optionList(["Divide numerator and denominator of 6/8 by 2.", "Multiply numerator and denominator of 3/4 by 2.", "Subtract 2 from both parts of 6/8.", "The denominators are both even, so the fractions must be equal."]), correctAnswer: ["A", "B"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["A", "B"] }, rubric: "1 point: Select both valid arguments.", points: 1, explanation: "Scaling both numerator and denominator preserves a fraction's value." }),
    make(23, { testType: "cat", domain: "MD", target: "N", standard: "4.MD.A.3", type: "two-part", questionText: `Two rectangular ${setting} mats each have perimeter 28 units. One is 4 by 10; the other is 6 by 8.`, partAPrompt: "Part A: Which mat has greater area?", partAOptions: optionList(["The 6-by-8 mat", "The 4-by-10 mat", "Their areas are equal", "Perimeter does not allow area calculation"]), partBPrompt: "Part B: Why can equal perimeters have different areas?", partBOptions: optionList(["The side lengths can be distributed differently.", "All rectangles with equal perimeter are congruent.", "Area is found by adding four sides.", "Only squares have area."]), correctAnswer: ["A", "A"], rubric: "1 point: Both area comparison and reasoning.", points: 1, explanation: "The areas are 48 and 40 square units." }),
    make(24, { testType: "cat", domain: "G", target: "K", standard: "4.G.A.2", type: "grid-match", questionText: `A ${setting} designer records incomplete shape clues. Match each clue to every category that must be true.`, gridRows: ["Four equal sides and four right angles", "Exactly one pair of parallel sides", "Four right angles"], gridColumns: ["Square", "Rectangle", "Trapezoid"], gridSelection: { perRowMin: 1, perRowMax: 2, rowSelections: [{ min: 2, max: 2 }, { min: 1, max: 1 }, { min: 1, max: 1 }], totalMin: 4, totalMax: 4 }, correctAnswer: ["0:0", "0:1", "1:2", "2:1"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["0:0", "0:1", "1:2", "2:1"] }, rubric: "1 point: All four matches.", points: 1, explanation: "A square is a rectangle; exactly one parallel pair identifies a trapezoid; four right angles identify a rectangle." }),
    make(25, { testType: "cat", domain: "G", target: "O", standard: "4.G.A.3", type: "symmetry-line", symmetry: { shapePath: "M 15 15 H 85 V 85 H 15 Z", shapeAlt: `A square emblem from the ${setting}`, choices: [{ id: "vertical", label: "Vertical line", path: "M 50 10 V 90" }, { id: "horizontal", label: "Horizontal line", path: "M 10 50 H 90" }, { id: "diagonal-a", label: "Diagonal from upper left", path: "M 10 10 L 90 90" }, { id: "diagonal-b", label: "Diagonal from upper right", path: "M 90 10 L 10 90" }, { id: "none", label: "None" }], minSelections: 4, maxSelections: 4, noneChoiceId: "none" }, questionText: `Select every line of symmetry for the square ${setting} emblem.`, correctAnswer: ["vertical", "horizontal", "diagonal-a", "diagonal-b"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["vertical", "horizontal", "diagonal-a", "diagonal-b"] }, rubric: "1 point: Select all four symmetry lines.", points: 1, explanation: "A square has vertical, horizontal, and two diagonal lines of symmetry." }),
    make(26, { testType: "cat", domain: "MD", target: "P", standard: "4.MD.C.7", type: "multi-input", responseFields: [{ label: "Smaller angle" }, { label: "Larger angle" }], questionText: `Two adjacent ${setting} angles form a straight angle. The larger angle is ${20 + seed * 2}° greater than the smaller. Enter both measures.`, correctAnswer: [String((180 - (20 + seed * 2)) / 2), String((180 + (20 + seed * 2)) / 2)], scoringRule: { kind: "ordered-fields" }, rubric: "1 point: Both angle measures.", points: 1, explanation: "The angles sum to 180° and differ by the stated amount." }),
    make(27, { testType: "cat", domain: "NBT", target: "E", standard: "4.NBT.B.6", type: "multiple-choice", questionText: `Which estimate best checks a ${setting} calculation of ${420 + seed * 24} ÷ ${7 + seed}?`, options: optionList([`${(420 + seed * 24) / (7 + seed)}`, "About 6", "About 600", "About 4,000"]), correctAnswer: "A", rubric: "1 point: Select the reasonable quotient estimate.", points: 1, explanation: "Compatible numbers give a quotient near the first option." }),
    make(28, { testType: "cat", domain: "MD", target: "Q", standard: "4.MD.B.4", type: "multi-select", selection: { min: 2, max: 2 }, questionText: `A ${setting} line plot has values 1/4, 1/2, 1/2, 3/4, 3/4, and 1. Select the two true conclusions.`, options: optionList(["The two 1/2 values total 1.", "The two 3/4 values total 1 1/2.", "The greatest value is 3/4.", "There are five measurements."]), correctAnswer: ["A", "B"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["A", "B"] }, rubric: "1 point: Select A and B.", points: 1, explanation: "Add repeated fractional values and count all six measurements." }),
    make(29, { testType: "cat", domain: "MD", target: "Q", standard: "4.MD.B.4", type: "line-plot", linePlotLabels: ["0", "1/4", "1/2", "3/4", "1"], linePlotMaxDots: 4, questionText: `Plot the ${setting} measurements: 1/4, 1/4, 1/2, 3/4, 3/4, 3/4, and 1.`, correctAnswer: ["1/4", "1/4", "1/2", "3/4", "3/4", "3/4", "1"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["1/4", "1/4", "1/2", "3/4", "3/4", "3/4", "1"] }, rubric: "1 point: Plot all seven measurements.", points: 1, explanation: "Stack one mark for each occurrence at its value." }),
    make(30, { testType: "cat", domain: "OA", target: "A", standard: "4.OA.A.3", type: "multi-input", responseFields: [{ label: `Number of ${objects[0]}` }, { label: `Number of ${objects[1]}` }], questionText: `Create a whole-number ${setting} plan. Use 3-point ${objects[0]} and 2-point ${objects[1]}. The total must be from ${17 + seed} through ${23 + seed}, with at least 2 of each type.`, correctAnswer: ["3", String(Math.floor((seed - 1) / 2) + 5)], scoringRule: { kind: "constraints", constraint: { kind: "all", constraints: [{ kind: "field-number", index: 0, min: 2, max: 10, integer: true }, { kind: "field-number", index: 1, min: 2, max: 10, integer: true }, { kind: "linear-comparison", terms: [{ index: 0, coefficient: 3 }, { index: 1, coefficient: 2 }], operator: ">=", value: 17 + seed }, { kind: "linear-comparison", terms: [{ index: 0, coefficient: 3 }, { index: 1, coefficient: 2 }], operator: "<=", value: 23 + seed }] } }, rubric: "1 point: Any whole-number plan satisfying every visible condition.", points: 1, explanation: "Multiply each count by its point value and check the range and minimums." }),
    make(31, { testType: "cat", domain: "NF/MD", target: "R", standard: "4.NF.B.3/4.MD.A.2", type: "multi-input", responseFields: [{ label: "First subtotal" }, { label: "Second subtotal" }, { label: "Combined amount" }], questionText: `For a ${setting} model, ${3 + seed} pieces each measure 1/4 unit and 2 pieces each measure 3/8 unit. Enter the first subtotal, second subtotal, and combined amount.`, correctAnswer: [`${3 + seed}/4`, "3/4", `${3 + seed + 3}/4`], acceptedAnswers: [String((3 + seed) / 4), "0.75", String((6 + seed) / 4)], scoringRule: { kind: "ordered-fields" }, rubric: "1 point: All three equivalent measurements.", points: 1, explanation: `The subtotals are ${(3 + seed)}/4 and 3/4, for ${(6 + seed)}/4 total.` }),
  ];

  const ptBase = baseId + 100;
  const ptMake = (index: number, value: MathItem): Question => ({
    ...value,
    id: ptBase + index,
    grade: 4,
    subject: "math",
    practiceTest: testNumber,
    claim: index <= 3 ? 2 : index === 4 ? 3 : 4,
    dok: value.dok ?? 2,
    provenance: provenance(testNumber, config.pt.sourceId),
  });
  const shared = { studentDirections: config.pt.directions, dataTable: config.pt.table };
  const pt: Question[] = [
    ptMake(1, { ...shared, testType: "pt", target: "PT1", standard: "4.NBT.B.5", dok: 2, type: "text-input", questionText: config.pt.q1.prompt, correctAnswer: config.pt.q1.answer, scoringRule: { kind: "numeric-equivalent", acceptedValues: [Number(config.pt.q1.answer)] }, rubric: "1 point: Enter the correct total.", points: 1, explanation: config.pt.q1.explanation }),
    ptMake(2, { ...shared, testType: "pt", target: "PT2", standard: "4.MD.A.1/2", dok: difficulty === "easy" ? 2 : 3, type: "multi-input", responseFields: config.pt.q2.labels.map((label) => ({ label })), questionText: config.pt.q2.prompt, correctAnswer: config.pt.q2.answers, scoringRule: { kind: "ordered-fields" }, rubric: "1 point: All fields are correct.", points: 1, explanation: config.pt.q2.explanation }),
    ptMake(3, { ...shared, testType: "pt", target: "PT3", standard: "4.OA.A.3", dok: 3, type: "multi-input", responseFields: config.pt.q3.labels.map((label) => ({ label })), questionText: config.pt.q3.prompt, correctAnswer: config.pt.q3.answers, scoringRule: { kind: "ordered-fields" }, rubric: "1 point: All fields are correct.", points: 1, explanation: config.pt.q3.explanation }),
    ptMake(4, { ...shared, testType: "pt", target: "PT4", standard: "4.OA.A.3", dok: 3, type: "short-answer", questionText: config.pt.q4.prompt, correctAnswer: config.pt.q4.exemplar, scoringRule: { kind: "manual-rubric" }, rubric: "2 points: Correct conclusion, accurate calculations, and evidence from the shared plan. 1 point: Partly correct reasoning or incomplete evidence. 0 points: Incorrect, irrelevant, insufficient, or blank.", points: 2, explanation: "Responses are evaluated for conclusion, calculation, and evidence." }),
    ptMake(5, { ...shared, testType: "pt", target: "PT5", standard: "4.OA.A.3/4.MD.A.2", dok: 4, type: "multi-input", responseFields: config.pt.q5.labels.map((label) => ({ label })), questionText: config.pt.q5.prompt, correctAnswer: config.pt.q5.sample, acceptedAnswers: config.pt.q5.alternate, scoringRule: { kind: "constraints", constraint: config.pt.q5.constraint }, rubric: "1 point: Any whole-number model satisfying every stated condition.", points: 1, explanation: config.pt.q5.explanation }),
  ];
  return { cat: balanceSingleAnswerPositions(cat), pt };
}

const configs: Phase4MathConfig[] = [
  {
    testNumber: 6, difficulty: "easy", baseId: 50000, setting: "school garden", objects: ["seed packets", "watering tags", "plant labels", "tool trays"], seed: 1,
    pt: {
      sourceId: "g4-t6-math-pt-garden-watering", title: "School Garden Watering Plan",
      directions: "Use the School Garden Watering Plan for all five tasks. Water is measured in whole liters. The morning cart can carry at most 36 liters, and the afternoon cart can carry at most 32 liters. Six-liter cans and four-liter cans must stay full during transport.",
      table: { rowHeader: "Bed", columns: ["Starting water", "Morning minimum", "Afternoon minimum"], rows: [{ label: "Herbs", values: ["2 × 6 L and 1 × 4 L", "12 L", "8 L"] }, { label: "Vegetables", values: ["1 × 6 L and 3 × 4 L", "14 L", "10 L"] }, { label: "Flowers", values: ["3 × 4 L", "8 L", "8 L"] }] },
      q1: { prompt: "How many liters of water are initially listed for the Herbs bed?", answer: "16", explanation: "2 × 6 + 1 × 4 = 16 liters." },
      q2: { prompt: "The Vegetables bed uses 9 liters before noon. Enter its starting liters and the liters remaining.", labels: ["Starting liters", "Liters remaining"], answers: ["18", "9"], explanation: "6 + 12 = 18; 18 − 9 = 9." },
      q3: { prompt: "A morning route begins at 8:20 a.m. Loading takes 10 minutes and watering takes 35 minutes. Enter the start and finish times for watering.", labels: ["Watering starts", "Watering ends"], answers: ["8:30 a.m.", "9:05 a.m."], explanation: "Loading ends at 8:30, and 35 minutes later is 9:05." },
      q4: { prompt: "A student says one morning cart carrying 3 six-liter cans and 4 four-liter cans can meet all three morning minimums. Is the claim correct? Explain with totals and the cart limit.", exemplar: "The cart carries 34 liters, which is within 36 liters, but the three minimums total 34 liters, so the claim is correct if the water is divided as listed." },
      q5: { prompt: "Plan two trips. Enter morning 6-L cans, morning 4-L cans, afternoon 6-L cans, and afternoon 4-L cans. Each trip must carry 24–36 liters in the morning or 20–32 liters in the afternoon. Across both trips use at least 4 six-liter cans and at least 5 four-liter cans.", labels: ["Morning 6-L", "Morning 4-L", "Afternoon 6-L", "Afternoon 4-L"], sample: ["2", "3", "2", "2"], alternate: ["3", "2", "1", "4"], constraint: { kind: "all", constraints: [{ kind: "field-number", index: 0, min: 0, integer: true }, { kind: "field-number", index: 1, min: 0, integer: true }, { kind: "field-number", index: 2, min: 0, integer: true }, { kind: "field-number", index: 3, min: 0, integer: true }, { kind: "linear-comparison", terms: [{ index: 0, coefficient: 6 }, { index: 1, coefficient: 4 }], operator: ">=", value: 24 }, { kind: "linear-comparison", terms: [{ index: 0, coefficient: 6 }, { index: 1, coefficient: 4 }], operator: "<=", value: 36 }, { kind: "linear-comparison", terms: [{ index: 2, coefficient: 6 }, { index: 3, coefficient: 4 }], operator: ">=", value: 20 }, { kind: "linear-comparison", terms: [{ index: 2, coefficient: 6 }, { index: 3, coefficient: 4 }], operator: "<=", value: 32 }, { kind: "linear-comparison", terms: [{ index: 0, coefficient: 1 }, { index: 2, coefficient: 1 }], operator: ">=", value: 4 }, { kind: "linear-comparison", terms: [{ index: 1, coefficient: 1 }, { index: 3, coefficient: 1 }], operator: ">=", value: 5 }] }, explanation: "Check each trip's liters and then combine the can counts." },
    },
  },
  {
    testNumber: 7, difficulty: "easy", baseId: 52000, setting: "library workroom", objects: ["book labels", "return slips", "shelf cards", "sorting bins"], seed: 2,
    pt: {
      sourceId: "g4-t7-math-pt-book-cart", title: "Library Book Cart Plan",
      directions: "Use the Library Book Cart Plan for all five tasks. Large boxes hold 12 books and small boxes hold 8 books. Boxes stay closed during a trip. Trip A can carry at most 72 books; Trip B can carry at most 64 books.",
      table: { rowHeader: "Area", columns: ["Books waiting", "Trip priority", "Minimum delivered"], rows: [{ label: "Fiction", values: [44, "A", 24] }, { label: "Information", values: [36, "A or B", 20] }, { label: "Picture books", values: [28, "B", 16] }] },
      q1: { prompt: "How many books fit in 3 large boxes?", answer: "36", explanation: "3 × 12 = 36 books." },
      q2: { prompt: "Enter the total books waiting in Fiction and Information, then the difference between those areas.", labels: ["Combined books", "Difference"], answers: ["80", "8"], explanation: "44 + 36 = 80 and 44 − 36 = 8." },
      q3: { prompt: "Trip A leaves at 10:15 a.m., takes 18 minutes to reach the shelves, and 22 minutes to unload. Enter the arrival and unloading-finish times.", labels: ["Arrival", "Finish"], answers: ["10:33 a.m.", "10:55 a.m."], explanation: "Add 18 minutes, then 22 minutes." },
      q4: { prompt: "A librarian proposes 4 large boxes and 3 small boxes for Trip A. Does the plan stay within capacity and deliver at least 60 books? Explain.", exemplar: "The plan carries 72 books, so it reaches at least 60 and exactly meets the 72-book capacity." },
      q5: { prompt: "Enter Trip A large boxes, Trip A small boxes, Trip B large boxes, and Trip B small boxes. Trip A must carry 56–72 books; Trip B must carry 48–64. Across both trips use at least 5 large boxes and at least 6 small boxes.", labels: ["A large", "A small", "B large", "B small"], sample: ["3", "3", "2", "3"], alternate: ["4", "1", "1", "5"], constraint: { kind: "all", constraints: [{ kind: "field-number", index: 0, min: 0, integer: true }, { kind: "field-number", index: 1, min: 0, integer: true }, { kind: "field-number", index: 2, min: 0, integer: true }, { kind: "field-number", index: 3, min: 0, integer: true }, { kind: "linear-comparison", terms: [{ index: 0, coefficient: 12 }, { index: 1, coefficient: 8 }], operator: ">=", value: 56 }, { kind: "linear-comparison", terms: [{ index: 0, coefficient: 12 }, { index: 1, coefficient: 8 }], operator: "<=", value: 72 }, { kind: "linear-comparison", terms: [{ index: 2, coefficient: 12 }, { index: 3, coefficient: 8 }], operator: ">=", value: 48 }, { kind: "linear-comparison", terms: [{ index: 2, coefficient: 12 }, { index: 3, coefficient: 8 }], operator: "<=", value: 64 }, { kind: "linear-comparison", terms: [{ index: 0, coefficient: 1 }, { index: 2, coefficient: 1 }], operator: ">=", value: 5 }, { kind: "linear-comparison", terms: [{ index: 1, coefficient: 1 }, { index: 3, coefficient: 1 }], operator: ">=", value: 6 }] }, explanation: "Use 12 books per large box and 8 per small box, then check both totals and combined counts." },
    },
  },
  {
    testNumber: 8, difficulty: "medium", baseId: 54000, setting: "wildlife camera station", objects: ["memory cards", "battery packs", "camera tags", "mounting kits"], seed: 3,
    pt: {
      sourceId: "g4-t8-math-pt-camera-batteries", title: "Wildlife Camera Battery Plan",
      directions: "Use the Wildlife Camera Battery Plan for all five tasks. Long packs supply 8 battery-hours and compact packs supply 4 battery-hours. Packs cannot be split. The Ridge route can carry at most 52 battery-hours; the Creek route can carry at most 44.",
      table: { rowHeader: "Camera zone", columns: ["Hours remaining", "Hours needed before pickup", "Route"], rows: [{ label: "Ridge", values: [12, 38, "Ridge"] }, { label: "Creek", values: [8, 31, "Creek"] }, { label: "Meadow", values: [16, 28, "Either"] }] },
      q1: { prompt: "How many battery-hours are supplied by 5 long packs?", answer: "40", explanation: "5 × 8 = 40 battery-hours." },
      q2: { prompt: "Enter Ridge's additional hours needed and the least number of long packs that can supply at least that many hours.", labels: ["Additional hours", "Long packs"], answers: ["26", "4"], explanation: "38 − 12 = 26; three packs give 24, so four are needed." },
      q3: { prompt: "The Ridge crew begins at 7:40 a.m. Setup lasts 16 minutes, inspection lasts 27 minutes, and notes take 9 minutes. Enter inspection start and route finish.", labels: ["Inspection starts", "Route finishes"], answers: ["7:56 a.m.", "8:32 a.m."], explanation: "Setup ends at 7:56; 27 + 9 more minutes reaches 8:32." },
      q4: { prompt: "A crew says 4 long packs and 4 compact packs can travel on the Ridge route and cover 48 needed battery-hours. Evaluate both parts of the claim.", exemplar: "The packs supply 48 battery-hours, but they total 48 and stay within the 52-hour carrying limit, so both parts are correct." },
      q5: { prompt: "Enter Ridge long packs, Ridge compact packs, Creek long packs, and Creek compact packs. Ridge must carry 40–52 battery-hours; Creek 32–44. Across both routes use at least 7 long packs and at least 5 compact packs.", labels: ["Ridge long", "Ridge compact", "Creek long", "Creek compact"], sample: ["4", "3", "3", "2"], alternate: ["5", "1", "2", "4"], constraint: { kind: "all", constraints: [{ kind: "field-number", index: 0, min: 0, integer: true }, { kind: "field-number", index: 1, min: 0, integer: true }, { kind: "field-number", index: 2, min: 0, integer: true }, { kind: "field-number", index: 3, min: 0, integer: true }, { kind: "linear-comparison", terms: [{ index: 0, coefficient: 8 }, { index: 1, coefficient: 4 }], operator: ">=", value: 40 }, { kind: "linear-comparison", terms: [{ index: 0, coefficient: 8 }, { index: 1, coefficient: 4 }], operator: "<=", value: 52 }, { kind: "linear-comparison", terms: [{ index: 2, coefficient: 8 }, { index: 3, coefficient: 4 }], operator: ">=", value: 32 }, { kind: "linear-comparison", terms: [{ index: 2, coefficient: 8 }, { index: 3, coefficient: 4 }], operator: "<=", value: 44 }, { kind: "linear-comparison", terms: [{ index: 0, coefficient: 1 }, { index: 2, coefficient: 1 }], operator: ">=", value: 7 }, { kind: "linear-comparison", terms: [{ index: 1, coefficient: 1 }, { index: 3, coefficient: 1 }], operator: ">=", value: 5 }] }, explanation: "Convert every pack count to battery-hours and verify route and combined requirements." },
    },
  },
  {
    testNumber: 9, difficulty: "hard", baseId: 56000, setting: "museum exhibit workshop", objects: ["catalog cards", "artifact trays", "foam blocks", "display frames"], seed: 4,
    pt: {
      sourceId: "g4-t9-math-pt-exhibit-transport", title: "Museum Exhibit Transport Plan",
      directions: "Use the Museum Exhibit Transport Plan for all five tasks. Reinforced crates have mass 18 kg and padded crates 12 kg. Crates stay sealed. The morning lift accepts 72–102 kg; the afternoon lift accepts 66–96 kg. At least one reinforced crate must travel on each lift.",
      table: { rowHeader: "Gallery", columns: ["Prepared mass", "Minimum delivered", "Deadline"], rows: [{ label: "History", values: ["2 × 18 kg + 1 × 12 kg", "42 kg", "10:00 a.m."] }, { label: "Design", values: ["1 × 18 kg + 3 × 12 kg", "48 kg", "1:30 p.m."] }, { label: "Science", values: ["4 × 12 kg", "36 kg", "3:00 p.m."] }] },
      q1: { prompt: "What is the prepared mass listed for the History gallery?", answer: "48", explanation: "2 × 18 + 12 = 48 kg." },
      q2: { prompt: "Convert the Design prepared mass to grams, then enter how many kilograms exceed its minimum.", labels: ["Grams", "Kilograms above minimum"], answers: ["54000", "6"], explanation: "18 + 36 = 54 kg = 54,000 g; 54 − 48 = 6." },
      q3: { prompt: "The morning lift window begins at 8:55 a.m. Inspection takes 14 minutes, movement 23 minutes, and unloading 18 minutes. Enter movement start and unloading finish.", labels: ["Movement starts", "Unloading finishes"], answers: ["9:09 a.m.", "9:50 a.m."], explanation: "Inspection ends at 9:09; 23 + 18 more minutes reaches 9:50." },
      q4: { prompt: "A planner assigns 3 reinforced crates and 4 padded crates to the morning lift, claiming the load is legal and leaves at least 12 kg of room below the maximum. Evaluate the claim.", exemplar: "The load is 102 kg, which is legal but exactly at the maximum, so it leaves 0 kg of room. The second part of the claim is false." },
      q5: { prompt: "Enter morning reinforced, morning padded, afternoon reinforced, and afternoon padded crates. Morning mass must be 72–102 kg; afternoon 66–96 kg. Use at least 5 reinforced and at least 7 padded crates total, with a reinforced crate on each lift.", labels: ["Morning reinforced", "Morning padded", "Afternoon reinforced", "Afternoon padded"], sample: ["3", "3", "2", "4"], alternate: ["2", "5", "3", "2"], constraint: { kind: "all", constraints: [{ kind: "field-number", index: 0, min: 1, integer: true }, { kind: "field-number", index: 1, min: 0, integer: true }, { kind: "field-number", index: 2, min: 1, integer: true }, { kind: "field-number", index: 3, min: 0, integer: true }, { kind: "linear-comparison", terms: [{ index: 0, coefficient: 18 }, { index: 1, coefficient: 12 }], operator: ">=", value: 72 }, { kind: "linear-comparison", terms: [{ index: 0, coefficient: 18 }, { index: 1, coefficient: 12 }], operator: "<=", value: 102 }, { kind: "linear-comparison", terms: [{ index: 2, coefficient: 18 }, { index: 3, coefficient: 12 }], operator: ">=", value: 66 }, { kind: "linear-comparison", terms: [{ index: 2, coefficient: 18 }, { index: 3, coefficient: 12 }], operator: "<=", value: 96 }, { kind: "linear-comparison", terms: [{ index: 0, coefficient: 1 }, { index: 2, coefficient: 1 }], operator: ">=", value: 5 }, { kind: "linear-comparison", terms: [{ index: 1, coefficient: 1 }, { index: 3, coefficient: 1 }], operator: ">=", value: 7 }] }, explanation: "Check whole crates, both lift ranges, each reinforced minimum, and combined crate counts." },
    },
  },
  {
    testNumber: 10, difficulty: "hard", baseId: 58000, setting: "community event power station", objects: ["cable tags", "power modules", "safety cards", "charging cases"], seed: 5,
    pt: {
      sourceId: "g4-t10-math-pt-event-power", title: "Community Event Power Plan",
      directions: "Use the Community Event Power Plan for all five tasks. Large modules supply 9 power-units and small modules supply 6. Modules cannot be split. Session 1 must receive 45–63 units; Session 2 must receive 42–60. Each session needs at least two large modules.",
      table: { rowHeader: "Station", columns: ["Stored units", "Expected use", "Reserve required"], rows: [{ label: "Welcome", values: [27, 18, 6] }, { label: "Workshop", values: [36, 31, 9] }, { label: "Stage", values: [45, 38, 12] }] },
      q1: { prompt: "How many power-units are stored at the Workshop station?", answer: "36", explanation: "The table lists 36 stored units." },
      q2: { prompt: "Enter the Stage units left after expected use, then the additional units needed to restore its 12-unit reserve.", labels: ["Units left", "Units needed"], answers: ["7", "5"], explanation: "45 − 38 = 7; 12 − 7 = 5." },
      q3: { prompt: "Session 1 setup begins at 11:48 a.m. Cable checks take 17 minutes, module delivery 26 minutes, and final testing 14 minutes. Enter delivery start and testing finish.", labels: ["Delivery starts", "Testing finishes"], answers: ["12:05 p.m.", "12:45 p.m."], explanation: "After 17 minutes it is 12:05; 26 + 14 more minutes reaches 12:45." },
      q4: { prompt: "A coordinator assigns 5 large and 3 small modules to Session 1 and says the plan is legal with exactly 3 spare units below the maximum. Evaluate the statement.", exemplar: "The plan supplies 63 units, which is legal but equals the maximum, so it leaves 0 spare units. The spare-unit statement is false." },
      q5: { prompt: "Enter Session 1 large, Session 1 small, Session 2 large, and Session 2 small modules. Meet both session ranges, use at least 7 large and at least 6 small modules total, and place at least two large modules in each session.", labels: ["S1 large", "S1 small", "S2 large", "S2 small"], sample: ["4", "3", "3", "3"], alternate: ["3", "5", "4", "1"], constraint: { kind: "all", constraints: [{ kind: "field-number", index: 0, min: 2, integer: true }, { kind: "field-number", index: 1, min: 0, integer: true }, { kind: "field-number", index: 2, min: 2, integer: true }, { kind: "field-number", index: 3, min: 0, integer: true }, { kind: "linear-comparison", terms: [{ index: 0, coefficient: 9 }, { index: 1, coefficient: 6 }], operator: ">=", value: 45 }, { kind: "linear-comparison", terms: [{ index: 0, coefficient: 9 }, { index: 1, coefficient: 6 }], operator: "<=", value: 63 }, { kind: "linear-comparison", terms: [{ index: 2, coefficient: 9 }, { index: 3, coefficient: 6 }], operator: ">=", value: 42 }, { kind: "linear-comparison", terms: [{ index: 2, coefficient: 9 }, { index: 3, coefficient: 6 }], operator: "<=", value: 60 }, { kind: "linear-comparison", terms: [{ index: 0, coefficient: 1 }, { index: 2, coefficient: 1 }], operator: ">=", value: 7 }, { kind: "linear-comparison", terms: [{ index: 1, coefficient: 1 }, { index: 3, coefficient: 1 }], operator: ">=", value: 6 }] }, explanation: "Convert modules to units, then verify both ranges and cross-session counts." },
    },
  },
];

export const grade4Phase4MathBanks = new Map(configs.map((config) => [config.testNumber, buildMath(config)]));
export const grade4Phase4BankVersion = BANK_VERSION;
