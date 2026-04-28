import type { Question } from "./questions";

const TEST = 17;

function q(id: number, data: Omit<Question, "id" | "grade" | "practiceTest">): Question {
  return { id, grade: 3, practiceTest: TEST, ...data };
}

const museumStory = `Read the passage and answer the questions.

**The Missing Museum Label**
*by Jonah Reed*

Amir's class visited a small history museum. His group stopped at a glass case with an old lunch pail, a train ticket, and a black-and-white photograph. The label beside the case had fallen to the floor.

"Now we do not know what these things are about," said Grace.

Amir looked closely at the photograph. It showed workers standing beside a train station. One worker held a lunch pail like the one in the case.

"Maybe the objects belong together," Amir said.

The museum guide smiled. "Historians use clues. What else do you notice?"

Grace read the date on the ticket. "It says 1932."

Amir noticed tiny letters stamped on the lunch pail: East Mill Line. The train ticket had the same words.

The group wrote a new temporary label. It explained that mill workers rode the train to work and carried meals in metal pails. When the guide found the original label, the students compared it with their writing. They had not found every detail, but their main idea was right.

Amir felt proud. The case had seemed quiet at first. Then the clues began to speak.`;

const museumArticle = `Read the passage and answer the questions.

**How Museums Protect the Past**

Museums collect objects, photographs, letters, tools, and artwork. These items help people learn about earlier times. A single object can tell part of a larger story.

Museum workers care for objects in careful ways. They keep some items behind glass so visitors can see them without touching them. They use labels to explain where an object came from, when it was used, and why it matters.

Photographs and documents are often stored away from bright light because light can fade them. Old cloth and paper may need clean hands, special boxes, and steady temperatures.

Museums also ask questions. Who used this object? What problem did it help solve? What does it show about daily life? By asking questions, museum workers help visitors connect small details to bigger ideas.`;

const presentationOne = `Listen to or read the presentation. Then answer the questions.

**Reading Museum Clues**

Speaker 1: When you visit a museum, do not rush past the cases.

Speaker 2: Look for clues such as dates, names, materials, and places.

Speaker 1: A train ticket might show where a person traveled. A tool might show what kind of work someone did.

Speaker 2: Labels can help, but careful looking is important too.

Speaker 1: Museum objects become more interesting when we ask what they can teach us.`;

const presentationTwo = `Listen to or read the presentation. Then answer the questions.

**Protecting Old Photographs**

Speaker 1: Old photographs can be damaged by bright light, water, and rough handling.

Speaker 2: Museums often keep photographs in special folders or behind glass.

Speaker 1: Workers may wear clean gloves so oil from their hands does not touch the paper.

Speaker 2: These steps help photographs last longer so more people can learn from them.`;

const sourceSet = `Read the sources and answer the questions that follow.

**Source 1: The School Time Capsule**

Students opened a time capsule from 1985. Inside were a cafeteria menu, a class photo, a pencil, and a letter from students. The letter described favorite games and school events. The class photo helped today's students see clothing and hairstyles from that year.

---

**Source 2: Why Time Capsules Teach**

A time capsule is a container filled with objects from one time period. People seal it and open it years later. The objects inside can show what people ate, wore, studied, and enjoyed. Time capsules teach best when the objects include notes or labels that explain why each item was chosen.`;

const museumTable = {
  columns: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  rows: [
    { label: "Student visitors", values: [24, 28, 32, 30, 36] },
    { label: "Adult visitors", values: [12, 14, 16, 18, 20] },
    { label: "Maps handed out", values: [18, 20, 24, 24, 30] },
  ],
};

const mathData = [
  ["text-input", "A museum case has 4 shelves with 6 shells on each shelf. How many shells are displayed?", "24", "4 x 6 = 24.", "OA", "3.OA.A.1"],
  ["multiple-choice", "Which expression shows 7 groups of 3?", "B", "7 groups of 3 is 7 x 3.", "OA", "3.OA.A.1", ["7 + 3", "7 x 3", "3 - 7", "7 x 7"]],
  ["text-input", "There are 36 postcards in 6 equal packs. How many postcards are in each pack?", "6", "36 divided by 6 = 6.", "OA", "3.OA.A.2"],
  ["text-input", "What number makes this true? 8 x ? = 56", "7", "8 x 7 = 56.", "OA", "3.OA.A.4"],
  ["multiple-choice", "Which equation belongs to the same fact family as 5 x 9 = 45?", "C", "45 / 9 = 5 is related.", "OA", "3.OA.B.6", ["45 + 9 = 54", "45 - 5 = 40", "45 / 9 = 5", "5 + 9 = 14"]],
  ["text-input", "Find the sum: 368 + 247", "615", "368 + 247 = 615.", "NBT", "3.NBT.A.2"],
  ["text-input", "Find the difference: 702 - 458", "244", "702 - 458 = 244.", "NBT", "3.NBT.A.2"],
  ["multiple-choice", "Which number rounds to 700 to the nearest hundred?", "A", "651 rounds to 700.", "NBT", "3.NBT.A.1", ["651", "749", "750", "849"]],
  ["text-input", "A tour starts at 10:25 and lasts 35 minutes. What time does it end? Write like 11:00.", "11:00", "35 minutes after 10:25 is 11:00.", "MD", "3.MD.A.1"],
  ["multiple-choice", "Which fraction is greater than 1/2?", "D", "3/4 is greater than 1/2.", "NF", "3.NF.A.3", ["1/4", "2/6", "2/4", "3/4"]],
  ["multiple-choice", "Which fraction is equal to 3/6?", "B", "1/2 is equal to 3/6.", "NF", "3.NF.A.3", ["1/3", "1/2", "2/3", "3/3"]],
  ["text-input", "A poster is 8 inches long and 5 inches wide. What is its area?", "40", "8 x 5 = 40.", "MD", "3.MD.C.7"],
  ["text-input", "A square tile has sides of 7 inches. What is its perimeter?", "28", "7 + 7 + 7 + 7 = 28.", "MD", "3.MD.D.8"],
  ["multiple-choice", "Which shape has exactly 5 sides?", "C", "A pentagon has 5 sides.", "G", "3.G.A.1", ["triangle", "quadrilateral", "pentagon", "hexagon"]],
  ["multi-select", "Select all equations that are true.", ["B", "D"], "6 x 4 = 24 and 32 / 4 = 8 are true.", "OA", "3.OA.C.7", ["9 x 3 = 28", "6 x 4 = 24", "25 / 5 = 6", "32 / 4 = 8"]],
  ["text-input", "What are the next two numbers? 9, 18, 27, __, __. Use a comma.", "36, 45", "The pattern adds 9.", "OA", "3.OA.D.9"],
  ["multiple-choice", "A guide gives 3 stickers to each of 12 students. How many stickers are given?", "C", "3 x 12 = 36.", "OA", "3.OA.A.3", ["15", "30", "36", "42"]],
  ["text-input", "What is 11 x 4?", "44", "11 x 4 = 44.", "OA", "3.OA.C.7"],
  ["text-input", "What is 63 / 7?", "9", "63 divided by 7 = 9.", "OA", "3.OA.C.7"],
  ["multiple-choice", "Which statement is true?", "A", "4/8 is equal to 1/2.", "NF", "3.NF.A.3", ["4/8 = 1/2", "1/5 > 4/5", "2/3 < 1/3", "3/4 = 1/4"]],
  ["text-input", "A museum sells 286 tickets in the morning and 195 in the afternoon. How many tickets is that?", "481", "286 + 195 = 481.", "NBT", "3.NBT.A.2"],
  ["multiple-choice", "A chart shows 4 visits in May and 7 in June. How many visits total?", "D", "4 + 7 = 11.", "MD", "3.MD.B.3", ["3", "7", "10", "11"]],
  ["text-input", "A display mat is 9 feet by 6 feet. What is its area?", "54", "9 x 6 = 54.", "MD", "3.MD.C.7"],
  ["multiple-choice", "Which object is most likely measured in grams?", "A", "A small fossil's mass may be measured in grams.", "MD", "3.MD.A.2", ["small fossil", "hallway length", "water in a tank", "tour time"]],
  ["text-input", "What number makes this true? ? - 325 = 178", "503", "178 + 325 = 503.", "NBT", "3.NBT.A.2"],
  ["multiple-choice", "Which expression is equal to 9 x 6?", "B", "(9 x 3) + (9 x 3) = 54.", "OA", "3.OA.B.5", ["9 + 6", "(9 x 3) + (9 x 3)", "9 x 5", "54 + 9"]],
  ["text-input", "48 buttons are placed equally in 8 boxes. How many buttons are in each box?", "6", "48 divided by 8 = 6.", "OA", "3.OA.A.2"],
  ["multiple-choice", "Which number is least?", "A", "487 is the least.", "NBT", "3.NBT.A.2", ["487", "748", "784", "874"]],
  ["text-input", "A workshop lasts from 1:15 to 2:05. How many minutes is it?", "50", "From 1:15 to 2:05 is 50 minutes.", "MD", "3.MD.A.1"],
  ["multiple-choice", "Which fraction is smallest?", "A", "1/8 is smaller than the others.", "NF", "3.NF.A.3", ["1/8", "1/4", "1/2", "3/4"]],
  ["text-input", "A frame has sides 10, 10, 4, and 4. What is its perimeter?", "28", "10 + 10 + 4 + 4 = 28.", "MD", "3.MD.D.8"],
  ["multiple-choice", "A rectangle is split into 6 equal parts. 2 parts are shaded. What fraction is shaded?", "B", "2 out of 6 parts are shaded.", "G", "3.G.A.2", ["1/6", "2/6", "4/6", "6/2"]],
  ["text-input", "What is 12 x 3?", "36", "12 x 3 = 36.", "OA", "3.OA.C.7"],
  ["multiple-choice", "Which equation is true?", "C", "72 / 8 = 9.", "OA", "3.OA.C.7", ["7 x 8 = 54", "6 x 9 = 56", "72 / 8 = 9", "81 / 9 = 8"]],
  ["text-input", "A class has 146 museum maps and prints 275 more. How many maps are there?", "421", "146 + 275 = 421.", "NBT", "3.NBT.A.2"],
  ["multiple-choice", "Which row has the greatest Friday value in the museum table?", "A", "Student visitors has 36 on Friday.", "MD", "3.MD.B.3", ["Student visitors", "Adult visitors", "Maps handed out", "All are equal"]],
] as const;

const mathCatBase: Question[] = mathData.map((item, index) => {
  const [type, questionText, correctAnswer, explanation, domain, standard, optionTexts] = item;
  return q(17001 + index, {
    testType: "cat",
    subject: "math",
    claim: index % 8 === 0 ? 4 : index % 5 === 0 ? 3 : index % 3 === 0 ? 2 : 1,
    domain,
    target: "A",
    dok: index % 4 === 0 ? 3 : 2,
    standard,
    type,
    dataTable: index === 35 ? museumTable : undefined,
    questionText,
    options: optionTexts?.map((text, i) => ({ label: String.fromCharCode(65 + i), text })),
    correctAnswer,
    rubric: "The student answers the grade-level mathematics question correctly.",
    points: 1,
    explanation,
  } as Omit<Question, "id" | "grade" | "practiceTest">);
});

const mathCatOverrides: Record<number, Question> = {
  1: q(17002, { testType: "cat", subject: "math", claim: 3, domain: "OA", target: "F", dok: 3, standard: "3.OA.B.5", type: "multiple-choice", questionText: "A museum guide says 7 x 12 can be found by (7 x 10) + (7 x 2). Which statement explains why?", options: [{ label: "A", text: "12 can be split into 10 and 2" }, { label: "B", text: "7 can be split into 10 and 2" }, { label: "C", text: "The answer must be less than 70" }, { label: "D", text: "Addition and multiplication always give the same answer" }], correctAnswer: "A", rubric: "The student explains a distributive strategy.", points: 1, explanation: "Breaking 12 into 10 + 2 gives 7 x 12 = 7 x 10 + 7 x 2." }),
  3: q(17004, { testType: "cat", subject: "math", claim: 2, domain: "OA", target: "D", dok: 3, standard: "3.OA.D.8", type: "multiple-choice", questionText: "A display has 6 cases with 8 fossils in each case. A worker moves 13 fossils to a new room. How many fossils are still in the cases?", options: [{ label: "A", text: "35" }, { label: "B", text: "40" }, { label: "C", text: "48" }, { label: "D", text: "61" }], correctAnswer: "A", rubric: "The student solves a two-step multiplication and subtraction problem.", points: 1, explanation: "6 x 8 = 48, and 48 - 13 = 35." }),
  5: q(17006, { testType: "cat", subject: "math", claim: 3, domain: "NBT", target: "E", dok: 3, standard: "3.NBT.A.2", type: "multiple-choice", questionText: "A student solves 702 - 458 by subtracting 400, then 50, then 8. Which expression matches that strategy?", options: [{ label: "A", text: "702 - 400 - 50 - 8" }, { label: "B", text: "702 - 400 + 50 + 8" }, { label: "C", text: "702 + 400 - 50 - 8" }, { label: "D", text: "702 - 458 + 8" }], correctAnswer: "A", rubric: "The student identifies a valid subtraction decomposition.", points: 1, explanation: "458 can be decomposed into 400 + 50 + 8." }),
  8: q(17009, { testType: "cat", subject: "math", claim: 2, domain: "MD", target: "G", dok: 3, standard: "3.MD.A.1", type: "multiple-choice", questionText: "A museum tour begins at 10:25 a.m. and ends at 11:10 a.m. How long is the tour?", options: [{ label: "A", text: "35 minutes" }, { label: "B", text: "45 minutes" }, { label: "C", text: "55 minutes" }, { label: "D", text: "1 hour 15 minutes" }], correctAnswer: "B", rubric: "The student finds elapsed time across an hour.", points: 1, explanation: "10:25 to 11:00 is 35 minutes, plus 10 more is 45 minutes." }),
  9: q(17010, { testType: "cat", subject: "math", claim: 1, domain: "NF", target: "F", dok: 3, standard: "3.NF.A.2", type: "text-input", questionText: "A number line from 0 to 1 is divided into 8 equal parts. Enter a fraction greater than 3/8 and less than 7/8.", correctAnswer: "4/8", fractionRange: { greaterThan: "3/8", lessThan: "7/8" }, rubric: "The student enters a fraction in the given interval.", points: 1, explanation: "Fractions such as 4/8, 5/8, or 6/8 are in the range." }),
  11: q(17012, { testType: "cat", subject: "math", claim: 4, domain: "MD", target: "I", dok: 3, standard: "3.MD.C.7", type: "grid-match", questionText: "Match each display mat to its area.", gridRows: ["8 feet by 5 feet", "9 feet by 6 feet", "7 feet by 7 feet"], gridColumns: ["40 square feet", "49 square feet", "54 square feet"], correctAnswer: ["0:0", "1:2", "2:1"], rubric: "The student matches dimensions to area.", points: 1, explanation: "8 x 5 = 40, 9 x 6 = 54, and 7 x 7 = 49." }),
  14: q(17015, { testType: "cat", subject: "math", claim: 4, domain: "MD", target: "H", dok: 3, standard: "3.MD.B.4", type: "line-plot", questionText: "Museum visitors measured pencil lengths in inches: 4, 5, 5, 6, 6, 6, 7, and 7. Make a line plot for the data.", linePlotLabels: ["4", "5", "6", "7"], linePlotMaxDots: 3, correctAnswer: ["0:1", "1:2", "2:3", "3:2"], rubric: "The student creates a line plot from measurement data.", points: 1, explanation: "The data include one 4, two 5s, three 6s, and two 7s." }),
  18: q(17019, { testType: "cat", subject: "math", claim: 3, domain: "NF", target: "F", dok: 3, standard: "3.NF.A.3", type: "multiple-choice", questionText: "Which explanation proves that 3/6 is equal to 1/2?", options: [{ label: "A", text: "Both fractions can name 3 parts." }, { label: "B", text: "A whole split into 6 parts has smaller pieces, and 3 of them covers half the whole." }, { label: "C", text: "Sixths are always greater than halves." }, { label: "D", text: "The denominators are different, so they cannot be equal." }], correctAnswer: "B", rubric: "The student identifies a fraction equivalence explanation.", points: 1, explanation: "Three of six equal parts covers the same amount as one of two equal parts." }),
  21: q(17022, { testType: "cat", subject: "math", claim: 4, domain: "MD", target: "H", dok: 3, standard: "3.MD.B.3", type: "grid-match", dataTable: museumTable, questionText: "Use the museum table. Match each comparison to the correct value.", gridRows: ["Friday student visitors minus Monday student visitors", "Thursday adult visitors minus Tuesday adult visitors", "Friday maps minus Wednesday maps"], gridColumns: ["4", "6", "12"], correctAnswer: ["0:2", "1:0", "2:1"], rubric: "The student compares data values in a table.", points: 1, explanation: "36 - 24 = 12, 18 - 14 = 4, and 30 - 24 = 6." }),
  24: q(17025, { testType: "cat", subject: "math", claim: 2, domain: "NBT", target: "E", dok: 3, standard: "3.NBT.A.2", type: "multiple-choice", questionText: "A museum had 503 tickets. It used 178 tickets. Which equation can check the number of tickets left?", options: [{ label: "A", text: "325 + 178 = 503" }, { label: "B", text: "503 + 178 = 681" }, { label: "C", text: "503 - 325 = 503" }, { label: "D", text: "178 - 325 = 503" }], correctAnswer: "A", rubric: "The student uses addition to check subtraction.", points: 1, explanation: "If 503 - 178 = 325, then 325 + 178 = 503." }),
  26: q(17027, { testType: "cat", subject: "math", claim: 4, domain: "G", target: "K", dok: 3, standard: "3.G.A.2", type: "shade-grid", questionText: "Shade 6 of the 12 equal boxes to show one-half of a display board.", shadeGrid: { rows: 3, cols: 4, requiredCount: 6 }, correctAnswer: ["0:0", "0:1", "0:2", "1:0", "1:1", "1:2"], rubric: "The student shades exactly one-half of the grid.", points: 1, explanation: "Six of 12 equal parts is one-half." }),
  30: q(17031, { testType: "cat", subject: "math", claim: 2, domain: "MD", target: "J", dok: 3, standard: "3.MD.D.8", type: "multiple-choice", questionText: "Two frames both have perimeter 28 inches. Which pair of side lengths could describe the two frames?", options: [{ label: "A", text: "10 by 4 and 8 by 6" }, { label: "B", text: "10 by 4 and 9 by 6" }, { label: "C", text: "7 by 7 and 8 by 8" }, { label: "D", text: "12 by 2 and 5 by 5" }], correctAnswer: "A", rubric: "The student compares perimeters of rectangles.", points: 1, explanation: "A 10 by 4 rectangle and an 8 by 6 rectangle both have perimeter 28." }),
  31: q(17032, { testType: "cat", subject: "math", claim: 3, domain: "G", target: "K", dok: 3, standard: "3.G.A.1", type: "multi-select", questionText: "Select two statements that must be true.", options: [{ label: "A", text: "Every square is a rectangle." }, { label: "B", text: "Every rectangle is a square." }, { label: "C", text: "Every pentagon has 5 sides." }, { label: "D", text: "Every triangle has 4 sides." }], correctAnswer: ["A", "C"], rubric: "The student reasons about shape categories.", points: 1, explanation: "Squares are rectangles with equal sides, and pentagons have 5 sides." }),
};

const mathCat: Question[] = mathCatBase.map((question, index) => mathCatOverrides[index] ?? question);

const mathPt: Question[] = [
  q(17050, { testType: "pt", subject: "math", claim: 4, domain: "MD", target: "H", dok: 3, standard: "3.MD.B.3", type: "multiple-choice", dataTable: museumTable, studentDirections: "Use the museum table to answer the questions.", questionText: "How many student visitors came on Tuesday and Wednesday in all?", options: [{ label: "A", text: "50" }, { label: "B", text: "56" }, { label: "C", text: "60" }, { label: "D", text: "64" }], correctAnswer: "C", rubric: "The student adds two table values.", points: 1, explanation: "28 + 32 = 60." }),
  q(17051, { testType: "pt", subject: "math", claim: 4, domain: "MD", target: "H", dok: 3, standard: "3.MD.B.3", type: "text-input", dataTable: museumTable, studentDirections: "Use the museum table to answer the questions.", questionText: "How many more maps were handed out on Friday than Monday?", correctAnswer: "12", rubric: "The student subtracts table values.", points: 1, explanation: "30 - 18 = 12." }),
  q(17052, { testType: "pt", subject: "math", claim: 2, domain: "OA", target: "D", dok: 3, standard: "3.OA.D.8", type: "multiple-choice", dataTable: museumTable, studentDirections: "Use the museum table to answer the questions.", questionText: "A guide arranges 6 rows of 7 chairs and removes 5 broken chairs. How many chairs are ready?", options: [{ label: "A", text: "37" }, { label: "B", text: "40" }, { label: "C", text: "42" }, { label: "D", text: "47" }], correctAnswer: "A", rubric: "The student solves a two-step problem.", points: 1, explanation: "6 x 7 = 42, and 42 - 5 = 37." }),
  q(17053, { testType: "pt", subject: "math", claim: 1, domain: "MD", target: "I", dok: 2, standard: "3.MD.C.7", type: "text-input", dataTable: museumTable, studentDirections: "Use the museum table to answer the questions.", questionText: "A display board is 7 feet long and 6 feet wide. What is its area?", correctAnswer: "42", rubric: "The student finds area.", points: 1, explanation: "7 x 6 = 42." }),
  q(17054, { testType: "pt", subject: "math", claim: 4, domain: "MD", target: "H", dok: 3, standard: "3.MD.B.3", type: "grid-match", dataTable: museumTable, studentDirections: "Use the museum table to answer the questions.", questionText: "Match each museum-table question to its answer.", gridRows: ["Total adult visitors on Thursday and Friday", "Student visitors on Friday minus adult visitors on Friday", "Maps handed out Monday through Wednesday"], gridColumns: ["16", "38", "62"], correctAnswer: ["0:1", "1:0", "2:2"], rubric: "The student combines and compares values from the table.", points: 1, explanation: "18 + 20 = 38, 36 - 20 = 16, and 18 + 20 + 24 = 62." }),
];

const elaCat: Question[] = [
  q(17101, { testType: "cat", subject: "ela", claim: 1, target: "1", dok: 2, standard: "RL.3.1", type: "multiple-choice", passage: museumStory, passageTitle: "The Missing Museum Label", questionText: "What problem does Amir's group have?", options: [{ label: "A", text: "The museum is closed." }, { label: "B", text: "The label for the case has fallen." }, { label: "C", text: "The train ticket is missing." }, { label: "D", text: "The guide will not answer questions." }], correctAnswer: "B", rubric: "The student identifies the story problem.", points: 1, explanation: "The label beside the case has fallen to the floor." }),
  q(17102, { testType: "cat", subject: "ela", claim: 1, target: "2", dok: 3, standard: "RL.3.2", type: "multiple-choice", passage: museumStory, passageTitle: "The Missing Museum Label", questionText: "What is a theme of the story?", options: [{ label: "A", text: "Careful clues can help people learn." }, { label: "B", text: "Museums should not have photographs." }, { label: "C", text: "Train tickets are always new." }, { label: "D", text: "Labels are never useful." }], correctAnswer: "A", rubric: "The student identifies a theme.", points: 1, explanation: "The students use clues to understand the display." }),
  q(17103, { testType: "cat", subject: "ela", claim: 1, target: "3", dok: 2, standard: "RL.3.3", type: "multiple-choice", passage: museumStory, passageTitle: "The Missing Museum Label", questionText: "How does Amir help the group?", options: [{ label: "A", text: "He notices connections among the objects." }, { label: "B", text: "He hides the lunch pail." }, { label: "C", text: "He asks to leave the museum." }, { label: "D", text: "He changes the date on the ticket." }], correctAnswer: "A", rubric: "The student describes a character's action.", points: 1, explanation: "Amir connects the lunch pail, photo, and train ticket." }),
  q(17104, { testType: "cat", subject: "ela", claim: 1, target: "4", dok: 3, standard: "RL.3.4", type: "two-part", passage: museumStory, passageTitle: "The Missing Museum Label", questionText: "Answer both parts of the question.", partAPrompt: "Part A: What does 'clues began to speak' mean?", partAOptions: [{ label: "A", text: "The objects helped explain the past." }, { label: "B", text: "The case made a loud sound." }, { label: "C", text: "The guide sang a song." }, { label: "D", text: "The ticket became new." }], partBPrompt: "Part B: Which detail supports the answer?", partBOptions: [{ label: "A", text: "The same words appeared on the lunch pail and train ticket." }, { label: "B", text: "The students walked into the museum." }, { label: "C", text: "The floor was quiet." }, { label: "D", text: "Grace stood by the case." }], correctAnswer: ["A", "A"], rubric: "The student interprets figurative language and evidence.", points: 1, explanation: "The objects did not really speak; their details helped explain their story." }),
  q(17105, { testType: "cat", subject: "ela", claim: 1, target: "5", dok: 2, standard: "RL.3.5", type: "multiple-choice", passage: museumStory, passageTitle: "The Missing Museum Label", questionText: "Which event happens last?", options: [{ label: "A", text: "The label falls to the floor." }, { label: "B", text: "Grace reads the date." }, { label: "C", text: "The students compare their label with the original." }, { label: "D", text: "Amir looks at the photograph." }], correctAnswer: "C", rubric: "The student identifies sequence.", points: 1, explanation: "The guide finds the original label near the end." }),
  q(17106, { testType: "cat", subject: "ela", claim: 1, target: "6", dok: 3, standard: "RL.3.6", type: "multi-select", passage: museumStory, passageTitle: "The Missing Museum Label", questionText: "Which two details show the students are acting like historians?", options: [{ label: "A", text: "They read dates and words on objects." }, { label: "B", text: "They compare their label with the original." }, { label: "C", text: "They run through the hallway." }, { label: "D", text: "They ignore the guide." }], correctAnswer: ["A", "B"], rubric: "The student selects evidence.", points: 1, explanation: "Historians use clues and compare evidence." }),
  q(17107, { testType: "cat", subject: "ela", claim: 1, target: "7", dok: 2, standard: "RI.3.1", type: "multiple-choice", passage: museumArticle, passageTitle: "How Museums Protect the Past", questionText: "Why do museums keep some items behind glass?", options: [{ label: "A", text: "so visitors can see them without touching them" }, { label: "B", text: "so the items can get wet" }, { label: "C", text: "so labels can fall down" }, { label: "D", text: "so no one can learn from them" }], correctAnswer: "A", rubric: "The student recalls an article detail.", points: 1, explanation: "Glass lets visitors see objects without touching them." }),
  q(17108, { testType: "cat", subject: "ela", claim: 1, target: "8", dok: 3, standard: "RI.3.2", type: "multiple-choice", passage: museumArticle, passageTitle: "How Museums Protect the Past", questionText: "What is the main idea of the article?", options: [{ label: "A", text: "Museums protect objects and help people learn from them." }, { label: "B", text: "Museums only collect new toys." }, { label: "C", text: "Photographs should be kept in bright sunlight." }, { label: "D", text: "Labels make objects less useful." }], correctAnswer: "A", rubric: "The student identifies main idea.", points: 1, explanation: "The article explains how museums care for items and teach visitors." }),
  q(17109, { testType: "cat", subject: "ela", claim: 1, target: "9", dok: 2, standard: "RI.3.3", type: "multiple-choice", passage: museumArticle, passageTitle: "How Museums Protect the Past", questionText: "Why are old photographs stored away from bright light?", options: [{ label: "A", text: "Bright light can fade them." }, { label: "B", text: "Light makes them heavier." }, { label: "C", text: "Light changes them into tools." }, { label: "D", text: "Visitors cannot read in light." }], correctAnswer: "A", rubric: "The student explains cause and effect.", points: 1, explanation: "The article says light can fade photos and documents." }),
  q(17110, { testType: "cat", subject: "ela", claim: 1, target: "10", dok: 2, standard: "RI.3.4", type: "multiple-choice", passage: museumArticle, passageTitle: "How Museums Protect the Past", questionText: "What does 'connect' most nearly mean in the article?", options: [{ label: "A", text: "link together" }, { label: "B", text: "paint over" }, { label: "C", text: "drop quickly" }, { label: "D", text: "count backward" }], correctAnswer: "A", rubric: "The student uses context clues.", points: 1, explanation: "Museum questions link small details to bigger ideas." }),
  q(17111, { testType: "cat", subject: "ela", claim: 1, target: "11", dok: 2, standard: "RI.3.5", type: "multi-select", passage: museumArticle, passageTitle: "How Museums Protect the Past", questionText: "Which two text features would help a reader find information in this article?", options: [{ label: "A", text: "a heading about caring for photographs" }, { label: "B", text: "a diagram of a museum display case" }, { label: "C", text: "a recipe for lunch" }, { label: "D", text: "a song with rhymes" }], correctAnswer: ["A", "B"], rubric: "The student identifies useful text features.", points: 1, explanation: "A heading and diagram would help readers understand museum care." }),
  q(17112, { testType: "cat", subject: "ela", claim: 1, target: "12", dok: 2, standard: "RI.3.6", type: "multiple-choice", passage: museumArticle, passageTitle: "How Museums Protect the Past", questionText: "What is the author's purpose?", options: [{ label: "A", text: "to inform readers about museums" }, { label: "B", text: "to tell a made-up adventure" }, { label: "C", text: "to persuade readers to stop taking photos" }, { label: "D", text: "to compare lunch foods" }], correctAnswer: "A", rubric: "The student identifies author's purpose.", points: 1, explanation: "The article gives information about museum work." }),
  q(17113, { testType: "cat", subject: "ela", claim: 2, target: "13", dok: 2, standard: "L.3.1", type: "multiple-choice", questionText: "Which sentence is written correctly?", options: [{ label: "A", text: "The objects was old." }, { label: "B", text: "The objects were old." }, { label: "C", text: "The objects is old." }, { label: "D", text: "The objects be old." }], correctAnswer: "B", rubric: "The student identifies subject-verb agreement.", points: 1, explanation: "The plural subject objects uses were." }),
  q(17114, { testType: "cat", subject: "ela", claim: 2, target: "14", dok: 2, standard: "L.3.2", type: "multiple-choice", questionText: "Which sentence uses quotation marks correctly?", options: [{ label: "A", text: "\"Look at this clue,\" Amir said." }, { label: "B", text: "Look at this clue, \"Amir said.\"" }, { label: "C", text: "\"Look at this clue, Amir said." }, { label: "D", text: "Look at this clue,\" Amir said." }], correctAnswer: "A", rubric: "The student identifies correct quotation punctuation.", points: 1, explanation: "The spoken words are inside quotation marks." }),
  q(17115, { testType: "cat", subject: "ela", claim: 2, target: "15", dok: 2, standard: "L.3.4", type: "multiple-choice", questionText: "What does the prefix pre- mean in preview?", options: [{ label: "A", text: "before" }, { label: "B", text: "after" }, { label: "C", text: "not" }, { label: "D", text: "many" }], correctAnswer: "A", rubric: "The student uses word parts.", points: 1, explanation: "Preview means to view before." }),
  q(17116, { testType: "cat", subject: "ela", claim: 2, target: "16", dok: 2, standard: "L.3.5", type: "multi-select", questionText: "Which two words are antonyms for ancient?", options: [{ label: "A", text: "new" }, { label: "B", text: "modern" }, { label: "C", text: "old" }, { label: "D", text: "historic" }], correctAnswer: ["A", "B"], rubric: "The student identifies antonyms.", points: 1, explanation: "New and modern are opposites of ancient." }),
  q(17117, { testType: "cat", subject: "ela", claim: 2, target: "17", dok: 2, standard: "L.3.6", type: "multiple-choice", questionText: "Which word best completes the sentence? The label gave a clear ___ of the object.", options: [{ label: "A", text: "description" }, { label: "B", text: "thunder" }, { label: "C", text: "blanket" }, { label: "D", text: "whisper" }], correctAnswer: "A", rubric: "The student chooses an academic word.", points: 1, explanation: "A description explains what something is." }),
  q(17118, { testType: "cat", subject: "ela", claim: 3, target: "18", dok: 2, standard: "SL.3.2", type: "multiple-choice", passage: presentationOne, passageTitle: "Reading Museum Clues", questionText: "What should visitors look for in museum cases?", options: [{ label: "A", text: "dates, names, materials, and places" }, { label: "B", text: "only bright colors" }, { label: "C", text: "snack prices" }, { label: "D", text: "sports scores" }], correctAnswer: "A", rubric: "The student recalls presentation details.", points: 1, explanation: "The speakers name dates, names, materials, and places as clues." }),
  q(17119, { testType: "cat", subject: "ela", claim: 3, target: "19", dok: 3, standard: "SL.3.2", type: "two-part", passage: presentationOne, passageTitle: "Reading Museum Clues", questionText: "Answer both parts of the question.", partAPrompt: "Part A: What is the main idea of the presentation?", partAOptions: [{ label: "A", text: "Museum objects can teach us when we look for clues." }, { label: "B", text: "Museum cases should be empty." }, { label: "C", text: "All tickets are from trains." }, { label: "D", text: "Visitors should hurry." }], partBPrompt: "Part B: Which detail supports the answer?", partBOptions: [{ label: "A", text: "A tool might show what kind of work someone did." }, { label: "B", text: "The speakers say good morning." }, { label: "C", text: "Museums have floors." }, { label: "D", text: "Some people ride buses." }], correctAnswer: ["A", "A"], rubric: "The student identifies main idea and support.", points: 1, explanation: "The presentation explains how object clues teach visitors." }),
  q(17120, { testType: "cat", subject: "ela", claim: 3, target: "20", dok: 2, standard: "W.3.8", type: "multi-select", questionText: "Which two sources would help a report about protecting old photos?", options: [{ label: "A", text: "A museum guide about storing photographs" }, { label: "B", text: "An interview with a photo conservator" }, { label: "C", text: "A weather report" }, { label: "D", text: "A joke book" }], correctAnswer: ["A", "B"], rubric: "The student selects relevant sources.", points: 1, explanation: "Both selected sources would explain photograph care." }),
  q(17121, { testType: "cat", subject: "ela", claim: 3, target: "19", dok: 2, standard: "SL.3.2", type: "grid-match", passage: presentationTwo, passageTitle: "Protecting Old Photographs", questionText: "Match each danger or action to its effect.", gridRows: ["Bright light", "Clean gloves", "Special folders"], gridColumns: ["can fade photos", "keep hand oils away", "help protect paper"], correctAnswer: ["0:0", "1:1", "2:2"], rubric: "The student matches presentation details.", points: 1, explanation: "Each match comes directly from the presentation." }),
  q(17122, { testType: "cat", subject: "ela", claim: 3, target: "18", dok: 2, standard: "SL.3.2", type: "multiple-choice", passage: presentationTwo, passageTitle: "Protecting Old Photographs", questionText: "Why might workers wear gloves?", options: [{ label: "A", text: "to keep oil from hands off the paper" }, { label: "B", text: "to make photos brighter" }, { label: "C", text: "to erase old dates" }, { label: "D", text: "to fold every picture" }], correctAnswer: "A", rubric: "The student recalls presentation information.", points: 1, explanation: "The presentation says gloves keep hand oil away." }),
  q(17123, { testType: "cat", subject: "ela", claim: 1, target: "7", dok: 2, standard: "RI.3.1", type: "multiple-choice", passage: sourceSet, passageTitle: "Time Capsule Sources", questionText: "What was inside the time capsule from 1985?", options: [{ label: "A", text: "a cafeteria menu and a class photo" }, { label: "B", text: "a garden hose and seeds" }, { label: "C", text: "a robot and wheels" }, { label: "D", text: "a telescope and map" }], correctAnswer: "A", rubric: "The student finds source information.", points: 1, explanation: "Source 1 names a cafeteria menu and class photo." }),
  q(17124, { testType: "cat", subject: "ela", claim: 1, target: "9", dok: 3, standard: "RI.3.9", type: "grid-match", passage: sourceSet, passageTitle: "Time Capsule Sources", questionText: "Match each detail to the source where it appears.", gridRows: ["A letter described favorite games.", "Objects can show what people ate.", "Labels explain why items were chosen."], gridColumns: ["Source 1", "Source 2"], correctAnswer: ["0:0", "1:1", "2:1"], rubric: "The student matches details to sources.", points: 1, explanation: "Source 1 describes the capsule contents. Source 2 explains time capsules generally." }),
  q(17125, { testType: "cat", subject: "ela", claim: 2, target: "13", dok: 2, standard: "L.3.1", type: "multiple-choice", questionText: "Which sentence has the correct plural noun?", options: [{ label: "A", text: "The class saw many photographes." }, { label: "B", text: "The class saw many photographs." }, { label: "C", text: "The class saw many photograph." }, { label: "D", text: "The class saw many photographies." }], correctAnswer: "B", rubric: "The student identifies a correct plural.", points: 1, explanation: "The plural of photograph is photographs." }),
  q(17126, { testType: "cat", subject: "ela", claim: 2, target: "14", dok: 2, standard: "L.3.2", type: "multiple-choice", questionText: "Which sentence uses an apostrophe correctly?", options: [{ label: "A", text: "The museums label was clear." }, { label: "B", text: "The museum's label was clear." }, { label: "C", text: "The museum label's was clear." }, { label: "D", text: "The museum label was clear's." }], correctAnswer: "B", rubric: "The student identifies possessive apostrophe use.", points: 1, explanation: "Museum's shows the label belongs to the museum." }),
  q(17127, { testType: "cat", subject: "ela", claim: 2, target: "15", dok: 2, standard: "L.3.4", type: "multiple-choice", questionText: "What does the suffix -less mean in careless?", options: [{ label: "A", text: "without" }, { label: "B", text: "again" }, { label: "C", text: "before" }, { label: "D", text: "full of" }], correctAnswer: "A", rubric: "The student uses word parts.", points: 1, explanation: "Careless means without care." }),
  q(17128, { testType: "cat", subject: "ela", claim: 2, target: "16", dok: 2, standard: "L.3.5", type: "multiple-choice", questionText: "Which word is a synonym for protect?", options: [{ label: "A", text: "guard" }, { label: "B", text: "damage" }, { label: "C", text: "forget" }, { label: "D", text: "drop" }], correctAnswer: "A", rubric: "The student identifies a synonym.", points: 1, explanation: "Guard means protect." }),
  q(17129, { testType: "cat", subject: "ela", claim: 3, target: "20", dok: 2, standard: "W.3.8", type: "multiple-choice", questionText: "A student wants to learn why labels are used in museums. Which source would be best?", options: [{ label: "A", text: "An article by a museum curator about exhibit labels" }, { label: "B", text: "A recipe for soup" }, { label: "C", text: "A map of hiking trails" }, { label: "D", text: "A story about a soccer game" }], correctAnswer: "A", rubric: "The student selects a relevant source.", points: 1, explanation: "A curator's article about labels is directly relevant." }),
  q(17130, { testType: "cat", subject: "ela", claim: 3, target: "19", dok: 3, standard: "SL.3.2", type: "multi-select", passage: presentationTwo, passageTitle: "Protecting Old Photographs", questionText: "Which two details explain how museums protect photographs?", options: [{ label: "A", text: "They keep photographs behind glass." }, { label: "B", text: "They use special folders." }, { label: "C", text: "They place photos in water." }, { label: "D", text: "They tear old paper." }], correctAnswer: ["A", "B"], rubric: "The student selects supporting details.", points: 1, explanation: "Behind glass and special folders both help protect photographs." }),
];

const elaPt: Question[] = [
  q(17150, { testType: "pt", subject: "ela", claim: 4, target: "31", dok: 3, standard: "RI.3.9", type: "grid-match", passage: sourceSet, passageTitle: "The School Time Capsule / Why Time Capsules Teach", studentDirections: "Read the sources. Then answer the questions that follow.", questionText: "Match each detail to the source where it belongs best.", gridRows: ["The capsule held a cafeteria menu.", "A time capsule is opened years later.", "A class photo showed hairstyles.", "Labels explain why items were chosen."], gridColumns: ["Source 1", "Source 2"], correctAnswer: ["0:0", "1:1", "2:0", "3:1"], rubric: "The student matches details to the correct source.", points: 2, explanation: "Source 1 describes one capsule. Source 2 explains time capsules generally." }),
  q(17151, { testType: "pt", subject: "ela", claim: 4, target: "32", dok: 3, standard: "W.3.8", type: "short-answer", passage: sourceSet, passageTitle: "The School Time Capsule / Why Time Capsules Teach", studentDirections: "Read the sources. Then answer the questions that follow.", questionText: "Explain how objects in a time capsule can teach people about the past. Use details from both sources.", correctAnswer: "Objects can show what people ate, wore, studied, and enjoyed. Source 1 shows a menu, class photo, pencil, and letter from 1985, while Source 2 explains that these objects show daily life from a time period.", rubric: "2 points: explains with details from both sources; 1 point: partial explanation or one source.", points: 2, explanation: "A strong answer connects the specific 1985 objects to the general explanation of time capsules." }),
  q(17152, { testType: "pt", subject: "ela", claim: 2, target: "33", dok: 4, standard: "W.3.2", type: "extended-writing", passage: sourceSet, passageTitle: "The School Time Capsule / Why Time Capsules Teach", studentDirections: "Read the sources. Then write an informational response.", questionText: "Write an informational response explaining why a class should include notes or labels in a time capsule. Use information from both sources.", correctAnswer: "Student responses will vary. A strong response explains that notes and labels help future readers understand what objects meant, using the 1985 letter and Source 2's explanation that labels tell why items were chosen.", rubric: "4 points: clear main idea, details from both sources, organization, and conventions; 3 points: mostly complete; 2 points: limited; 1 point: minimal.", points: 4, explanation: "A strong response explains that labels and notes make objects easier to understand years later." }),
];

export const practiceTest17Questions: Question[] = [
  ...mathCat,
  ...mathPt,
  ...elaCat,
  ...elaPt,
];
