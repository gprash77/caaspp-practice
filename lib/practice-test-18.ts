import type { Question } from "./questions";

const TEST = 18;

function q(id: number, data: Omit<Question, "id" | "grade" | "practiceTest">): Question {
  return { id, grade: 3, practiceTest: TEST, ...data };
}

const tidePoolStory = `Read the passage and answer the questions.

**The Tide Pool Notebook**
*by Mara Lin*

Sofia carried a blue notebook to the beach. Her class was visiting the tide pools, and each group had to record what it saw.

"I found a tiny crab!" Malik called.

Sofia hurried over, but the crab slipped under a rock. "I missed it," she said.

"Write down the rock shape," said their teacher, Ms. Ortiz. "Scientists record clues, not only answers."

Sofia drew the flat rock and wrote, small crab hiding below. Then she noticed a purple sea star, a shell with stripes, and a snail moving slowly through wet sand.

When a wave washed over the pool, everyone stepped back. Some students groaned because their view changed. Sofia looked again. The water had moved loose sand away from the rock. The crab peeked out.

"There it is!" Malik whispered.

Sofia added one more note: crab comes out after wave. At school, her group used the notebook to make a poster. They did not remember every detail from the beach, but the notes helped them tell a clear story about the tide pool.`;

const oceanArticle = `Read the passage and answer the questions.

**Life in a Tide Pool**

A tide pool is a small pool of ocean water left behind when the tide moves out. Tide pools may look quiet, but many living things can be found there.

Sea stars, crabs, snails, small fish, and seaweed can live in tide pools. These animals and plants must handle changes. Sometimes waves cover the pool with fresh ocean water. Later, the sun may warm the shallow water.

Many tide-pool animals have ways to stay safe. A crab may hide under a rock. A snail may close its shell. Seaweed bends with moving water instead of breaking.

Visitors can enjoy tide pools by looking carefully and stepping gently. Touching animals or moving rocks can harm the small home they need.`;

const presentationOne = `Listen to or read the presentation. Then answer the questions.

**Taking Notes at the Shore**

Speaker 1: Our class learned that a good science notebook does not need perfect drawings.

Speaker 2: It needs careful notes about what you see, where you see it, and when it happens.

Speaker 1: At the shore, waves can change a tide pool quickly.

Speaker 2: That is why scientists write details before they forget them.

Speaker 1: Notes help turn a short observation into useful information.`;

const presentationTwo = `Listen to or read the presentation. Then answer the questions.

**Protecting Tide Pools**

Speaker 1: Tide pools are small habitats, so visitors need to be gentle.

Speaker 2: Walk on bare rock when you can, and do not pull animals from their homes.

Speaker 1: If you lift a rock, put it back the same way.

Speaker 2: The best way to explore is to look closely, take notes, and leave the pool as you found it.`;

const sourceSet = `Read the sources and answer the questions that follow.

**Source 1: A Shoreline Cleanup**

Third graders from Bayview School helped clean a beach path near the tide pools. Before they began, Ranger Ellis gave each team gloves, a small bucket, and a picture card showing what could be picked up. The card showed bottle caps, snack wrappers, bits of string, and broken plastic pieces.

"Trash does not belong here," Ranger Ellis said. "But shells, rocks, seaweed, and animals are part of the tide-pool home. Leave those where they are."

Sofia's team walked slowly along the path. They found three bottle caps near a bench and several wrappers caught in dry grass. Malik noticed a string tangled around a piece of driftwood. He asked if driftwood should be moved. Ranger Ellis explained that the string should be removed, but the wood could stay because small animals might use it for shelter.

At the tide pools, students looked closely without reaching into the water. They saw snails on rocks and tiny crabs hiding in cracks. The class wrote notes about what they saw, then carried the trash buckets back to the visitor station.

After the cleanup, the path looked safer and neater. The students had helped by removing harmful items while leaving the natural parts of the habitat in place.

---

**Source 2: Why Clean Shores Matter**

Trash near the ocean can wash into tide pools and harm animals. A tide pool is a small habitat, which means even small changes can matter. String can tangle animal legs. Snack wrappers can cover plants or block small spaces where animals hide. Small plastic pieces can be mistaken for food.

Clean shores help tide-pool animals stay safer. People can help by carrying out trash, staying on paths when possible, and leaving natural objects where they belong. Rocks may protect tiny animals from sun and waves. Seaweed may provide food or shelter. Shells can become homes for small creatures.

Visitors sometimes think they are helping when they move rocks or carry shells away. However, natural objects are part of the habitat. The best rule is simple: remove trash, but leave nature. When many visitors follow that rule, tide pools have a better chance to stay healthy for the plants and animals that live there.`;

const shoreTable = {
  columns: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  rows: [
    { label: "Shells counted", values: [15, 18, 20, 17, 22] },
    { label: "Crabs spotted", values: [4, 6, 5, 7, 8] },
    { label: "Wrappers picked up", values: [9, 7, 6, 5, 4] },
  ],
};

const mathRows: Array<[
  Question["type"],
  string,
  string | string[],
  string,
  string,
  string,
  string[]?
]> = [
  ["text-input", "A group sees 2 pools with 5 snails in each pool. How many snails do they see?", "10", "2 x 5 = 10.", "OA", "3.OA.A.1"],
  ["multiple-choice", "Which expression shows 4 groups of 4 shells?", "A", "4 groups of 4 is 4 x 4.", "OA", "3.OA.A.1", ["4 x 4", "4 + 5", "4 - 4", "4 x 2"]],
  ["text-input", "There are 21 shells shared equally by 3 students. How many shells does each student count?", "7", "21 divided by 3 = 7.", "OA", "3.OA.A.2"],
  ["text-input", "What number makes this equation true? 6 x ? = 30", "5", "6 x 5 = 30.", "OA", "3.OA.A.4"],
  ["multiple-choice", "Which fact is related to 4 x 8 = 32?", "D", "32 / 8 = 4.", "OA", "3.OA.B.6", ["32 + 8 = 40", "8 - 4 = 4", "4 + 8 = 12", "32 / 8 = 4"]],
  ["text-input", "Find the sum: 154 + 213", "367", "154 + 213 = 367.", "NBT", "3.NBT.A.2"],
  ["text-input", "Find the difference: 538 - 126", "412", "538 - 126 = 412.", "NBT", "3.NBT.A.2"],
  ["multiple-choice", "Which number rounds to 300 to the nearest hundred?", "B", "349 rounds to 300.", "NBT", "3.NBT.A.1", ["249", "349", "350", "451"]],
  ["text-input", "A beach walk starts at 8:20 and lasts 30 minutes. What time does it end? Write like 8:50.", "8:50", "Thirty minutes after 8:20 is 8:50.", "MD", "3.MD.A.1"],
  ["multiple-choice", "Which fraction names 3 of 4 equal parts?", "C", "Three out of four equal parts is 3/4.", "NF", "3.NF.A.1", ["1/4", "2/4", "3/4", "4/3"]],
  ["multiple-choice", "Which fraction is equal to 2/4?", "A", "1/2 equals 2/4.", "NF", "3.NF.A.3", ["1/2", "1/3", "3/4", "4/4"]],
  ["text-input", "A beach towel is 6 feet long and 2 feet wide. What is its area?", "12", "6 x 2 = 12.", "MD", "3.MD.C.7"],
  ["text-input", "A square sign has sides of 5 inches. What is its perimeter?", "20", "5 + 5 + 5 + 5 = 20.", "MD", "3.MD.D.8"],
  ["multiple-choice", "Which shape has 3 sides?", "A", "A triangle has 3 sides.", "G", "3.G.A.1", ["triangle", "rectangle", "pentagon", "hexagon"]],
  ["multi-select", "Select all equations that are true.", ["A", "D"], "3 x 7 = 21 and 24 / 6 = 4 are true.", "OA", "3.OA.C.7", ["3 x 7 = 21", "5 x 5 = 20", "18 / 3 = 5", "24 / 6 = 4"]],
  ["text-input", "What are the next two numbers? 4, 8, 12, __, __. Use a comma.", "16, 20", "The pattern adds 4.", "OA", "3.OA.D.9"],
  ["multiple-choice", "Three students each collect 9 data cards. How many cards are collected?", "C", "3 x 9 = 27.", "OA", "3.OA.A.3", ["12", "18", "27", "36"]],
  ["text-input", "What is 8 x 5?", "40", "8 x 5 = 40.", "OA", "3.OA.C.7"],
  ["text-input", "What is 45 / 5?", "9", "45 divided by 5 = 9.", "OA", "3.OA.C.7"],
  ["multiple-choice", "Which comparison is true?", "B", "2/3 is greater than 1/3.", "NF", "3.NF.A.3", ["1/4 > 3/4", "2/3 > 1/3", "1/6 = 1/3", "2/8 > 3/8"]],
  ["text-input", "A class counts 119 shells before lunch and 130 after lunch. How many shells is that?", "249", "119 + 130 = 249.", "NBT", "3.NBT.A.2"],
  ["multiple-choice", "A chart shows 5 sea stars and 6 crabs. How many animals total?", "D", "5 + 6 = 11.", "MD", "3.MD.B.3", ["9", "10", "12", "11"]],
  ["text-input", "A sand rectangle is 7 feet by 3 feet. What is its area?", "21", "7 x 3 = 21.", "MD", "3.MD.C.7"],
  ["multiple-choice", "Which object is most likely measured in milliliters?", "C", "A small cup of water is measured in milliliters.", "MD", "3.MD.A.2", ["a path length", "a rock mass", "water in a cup", "a walk time"]],
  ["text-input", "What number makes this true? ? + 185 = 400", "215", "400 - 185 = 215.", "NBT", "3.NBT.A.2"],
  ["multiple-choice", "Which is another way to show 5 x 6?", "A", "6 + 6 + 6 + 6 + 6 is 5 groups of 6.", "OA", "3.OA.A.1", ["6 + 6 + 6 + 6 + 6", "5 + 6", "5 + 5 + 5", "30 + 6"]],
  ["text-input", "There are 28 cards in 4 equal piles. How many cards are in each pile?", "7", "28 divided by 4 = 7.", "OA", "3.OA.A.2"],
  ["multiple-choice", "Which number is greatest?", "D", "583 is greatest.", "NBT", "3.NBT.A.2", ["358", "538", "385", "583"]],
  ["text-input", "A video lasts from 3:10 to 3:35. How many minutes is it?", "25", "From 3:10 to 3:35 is 25 minutes.", "MD", "3.MD.A.1"],
  ["multiple-choice", "Which fraction is larger?", "B", "5/6 is larger than 1/6.", "NF", "3.NF.A.3", ["1/6", "5/6", "1/4", "1/3"]],
  ["text-input", "A rectangle has sides 9, 9, 4, and 4. What is its perimeter?", "26", "9 + 9 + 4 + 4 = 26.", "MD", "3.MD.D.8"],
  ["multiple-choice", "A whole is split into 8 equal parts. 3 parts are shaded. What fraction is shaded?", "C", "3 of 8 equal parts are shaded.", "G", "3.G.A.2", ["1/8", "5/8", "3/8", "8/3"]],
  ["text-input", "What is 6 x 6?", "36", "6 x 6 = 36.", "OA", "3.OA.C.7"],
  ["multiple-choice", "Which equation is true?", "A", "7 x 4 = 28.", "OA", "3.OA.C.7", ["7 x 4 = 28", "9 x 3 = 28", "40 / 5 = 7", "6 x 8 = 46"]],
  ["text-input", "A cleanup bag has 37 wrappers. Another has 28. How many wrappers are there?", "65", "37 + 28 = 65.", "NBT", "3.NBT.A.2"],
  ["multiple-choice", "Which row has the smallest Friday value in the shore table?", "C", "Wrappers picked up has 4 on Friday.", "MD", "3.MD.B.3", ["Shells counted", "Crabs spotted", "Wrappers picked up", "All are equal"]],
];

const mathCatBase: Question[] = mathRows.map((item, index) => {
  const [type, questionText, correctAnswer, explanation, domain, standard, optionTexts] = item;
  return q(18001 + index, {
    testType: "cat",
    subject: "math",
    claim: index % 9 === 0 ? 4 : index % 5 === 0 ? 3 : index % 4 === 0 ? 2 : 1,
    domain,
    target: "A",
    dok: index % 7 === 0 ? 2 : 1,
    standard,
    type,
    dataTable: index === 35 ? shoreTable : undefined,
    questionText,
    options: optionTexts?.map((text, i) => ({ label: String.fromCharCode(65 + i), text })),
    correctAnswer,
    rubric: "The student answers the grade-level mathematics question correctly.",
    points: 1,
    explanation,
  });
});

const mathCatOverrides: Record<number, Question> = {
  1: q(18002, { testType: "cat", subject: "math", claim: 2, domain: "OA", target: "A", dok: 2, standard: "3.OA.A.1", type: "grid-match", questionText: "Match each tide-pool group to the expression that shows the total.", gridRows: ["4 groups of 4 shells", "3 groups of 5 snails", "2 groups of 8 rocks"], gridColumns: ["2 x 8", "4 x 4", "3 x 5"], correctAnswer: ["0:1", "1:2", "2:0"], rubric: "The student matches equal groups to expressions.", points: 1, explanation: "Each expression shows the number of groups and the number in each group." }),
  4: q(18005, { testType: "cat", subject: "math", claim: 3, domain: "OA", target: "F", dok: 2, standard: "3.OA.B.5", type: "multiple-choice", questionText: "Sofia says 5 x 6 can be found by 5 x 3 plus 5 x 3. Why is she correct?", options: [{ label: "A", text: "Because 6 can be split into 3 and 3" }, { label: "B", text: "Because 5 + 6 equals 5 x 6" }, { label: "C", text: "Because 3 is greater than 6" }, { label: "D", text: "Because every multiplication problem has the answer 30" }], correctAnswer: "A", rubric: "The student explains a multiplication strategy.", points: 1, explanation: "Splitting 6 into 3 + 3 makes two smaller products." }),
  9: q(18010, { testType: "cat", subject: "math", claim: 1, domain: "NF", target: "F", dok: 2, standard: "3.NF.A.2", type: "text-input", questionText: "A number line from 0 to 1 is divided into 8 equal parts. Enter a fraction greater than 1/8 and less than 4/8.", correctAnswer: "2/8", fractionRange: { greaterThan: "1/8", lessThan: "4/8" }, rubric: "The student enters a fraction in the given range.", points: 1, explanation: "Fractions such as 2/8 or 3/8 are between 1/8 and 4/8." }),
  11: q(18012, { testType: "cat", subject: "math", claim: 4, domain: "MD", target: "I", dok: 2, standard: "3.MD.C.7", type: "grid-match", questionText: "Match each beach mat to its area.", gridRows: ["6 feet by 2 feet", "7 feet by 3 feet", "5 feet by 5 feet"], gridColumns: ["12 square feet", "21 square feet", "25 square feet"], correctAnswer: ["0:0", "1:1", "2:2"], rubric: "The student matches dimensions to areas.", points: 1, explanation: "Multiply length by width for each mat." }),
  14: q(18015, { testType: "cat", subject: "math", claim: 4, domain: "MD", target: "H", dok: 2, standard: "3.MD.B.4", type: "line-plot", questionText: "A group measured shells in inches: 1, 1, 2, 2, 2, 3, and 4. Make a line plot for the data.", linePlotLabels: ["1", "2", "3", "4"], linePlotMaxDots: 3, correctAnswer: ["0:2", "1:3", "2:1", "3:1"], rubric: "The student creates a line plot.", points: 1, explanation: "There are two 1s, three 2s, one 3, and one 4." }),
  17: q(18018, { testType: "cat", subject: "math", claim: 2, domain: "OA", target: "D", dok: 2, standard: "3.OA.D.8", type: "multiple-choice", questionText: "A cleanup team fills 3 bags with 9 wrappers in each bag. Then they find 6 more wrappers. Which expression shows the total wrappers?", options: [{ label: "A", text: "3 + 9 + 6" }, { label: "B", text: "3 x 9 + 6" }, { label: "C", text: "3 x 6 + 9" }, { label: "D", text: "9 - 3 + 6" }], correctAnswer: "B", rubric: "The student selects an expression for a two-step situation.", points: 1, explanation: "There are 3 groups of 9, then 6 more." }),
  21: q(18022, { testType: "cat", subject: "math", claim: 4, domain: "MD", target: "H", dok: 2, standard: "3.MD.B.3", type: "grid-match", dataTable: shoreTable, questionText: "Use the shore table. Match each question to its answer.", gridRows: ["Shells counted Friday", "Crabs spotted Tuesday", "Wrappers picked up Thursday"], gridColumns: ["5", "6", "22"], correctAnswer: ["0:2", "1:1", "2:0"], rubric: "The student reads values from a table.", points: 1, explanation: "The table shows 22 shells Friday, 6 crabs Tuesday, and 5 wrappers Thursday." }),
  24: q(18025, { testType: "cat", subject: "math", claim: 2, domain: "NBT", target: "E", dok: 2, standard: "3.NBT.A.2", type: "multiple-choice", questionText: "A student solves 400 - 185 and says the answer is 315. Which check shows the answer is not correct?", options: [{ label: "A", text: "315 + 185 = 500" }, { label: "B", text: "215 + 185 = 400" }, { label: "C", text: "400 - 200 = 200" }, { label: "D", text: "185 + 400 = 585" }], correctAnswer: "A", rubric: "The student uses inverse operations to identify an error.", points: 1, explanation: "If 315 were correct, 315 + 185 would equal 400, but it equals 500." }),
  26: q(18027, { testType: "cat", subject: "math", claim: 4, domain: "G", target: "K", dok: 2, standard: "3.G.A.2", type: "shade-grid", questionText: "Shade 3 of the 6 equal boxes to show one-half of a tide-pool chart.", shadeGrid: { rows: 2, cols: 3, requiredCount: 3 }, correctAnswer: ["0:0", "0:1", "0:2"], rubric: "The student shades exactly half of the boxes.", points: 1, explanation: "Three of 6 equal parts is one-half." }),
  28: q(18029, { testType: "cat", subject: "math", claim: 1, domain: "MD", target: "G", dok: 2, standard: "3.MD.A.1", type: "multiple-choice", questionText: "The beach walk starts at 8:20 and ends at 8:50. Which number line jumps show the elapsed time?", options: [{ label: "A", text: "+10, +10, +10" }, { label: "B", text: "+20, +20" }, { label: "C", text: "+50" }, { label: "D", text: "+8, +20" }], correctAnswer: "A", rubric: "The student identifies an elapsed-time strategy.", points: 1, explanation: "Three jumps of 10 minutes make 30 minutes." }),
  31: q(18032, { testType: "cat", subject: "math", claim: 3, domain: "G", target: "K", dok: 2, standard: "3.G.A.1", type: "multi-select", questionText: "Select two statements that are true.", options: [{ label: "A", text: "A triangle has 3 sides." }, { label: "B", text: "A rectangle has 5 sides." }, { label: "C", text: "A square is a quadrilateral." }, { label: "D", text: "A hexagon has 4 sides." }], correctAnswer: ["A", "C"], rubric: "The student identifies true geometry statements.", points: 1, explanation: "A triangle has 3 sides, and a square is a four-sided quadrilateral." }),
};

mathCatOverrides[7] = q(18008, { testType: "cat", subject: "math", claim: 3, domain: "NBT", target: "E", dok: 2, standard: "3.NBT.A.1", type: "multiple-choice", questionText: "A student rounds 349 to 400. Which explanation is best?", options: [{ label: "A", text: "Incorrect, because 349 has 4 tens and rounds to 300" }, { label: "B", text: "Correct, because 349 is closer to 400 than 300" }, { label: "C", text: "Correct, because every number above 300 rounds to 400" }, { label: "D", text: "Incorrect, because 349 rounds to 200" }], correctAnswer: "A", rubric: "The student evaluates rounding reasoning.", points: 1, explanation: "To the nearest hundred, 349 rounds to 300 because the tens digit is 4." });

const mathCat: Question[] = mathCatBase.map((question, index) => mathCatOverrides[index] ?? question);

const mathPt: Question[] = [
  q(18050, { testType: "pt", subject: "math", claim: 4, domain: "MD", target: "H", dok: 2, standard: "3.MD.B.3", type: "multiple-choice", dataTable: shoreTable, studentDirections: "The class is studying a tide-pool cleanup. Use the table to answer questions about shells, crabs, and wrappers.", questionText: "The class compares the first two days of shell counts. How many shells were counted on Monday and Tuesday in all?", options: [{ label: "A", text: "30" }, { label: "B", text: "33" }, { label: "C", text: "35" }, { label: "D", text: "38" }], correctAnswer: "B", rubric: "The student adds two table values.", points: 1, explanation: "15 + 18 = 33." }),
  q(18051, { testType: "pt", subject: "math", claim: 4, domain: "MD", target: "H", dok: 2, standard: "3.MD.B.3", type: "text-input", dataTable: shoreTable, studentDirections: "The class is studying a tide-pool cleanup. Use the table to answer questions about shells, crabs, and wrappers.", questionText: "The class spotted more crabs on Friday than Monday. How many more crabs were spotted on Friday?", correctAnswer: "4", rubric: "The student subtracts table values.", points: 1, explanation: "8 - 4 = 4." }),
  q(18052, { testType: "pt", subject: "math", claim: 2, domain: "OA", target: "D", dok: 2, standard: "3.OA.D.8", type: "multiple-choice", dataTable: shoreTable, studentDirections: "The class is studying a tide-pool cleanup. Use the table to answer questions about shells, crabs, and wrappers.", questionText: "A team fills 5 bags with 6 bottle caps each. Then 8 caps are recycled. How many caps are left to sort?", options: [{ label: "A", text: "20" }, { label: "B", text: "22" }, { label: "C", text: "30" }, { label: "D", text: "38" }], correctAnswer: "B", rubric: "The student solves a two-step problem.", points: 1, explanation: "5 x 6 = 30, and 30 - 8 = 22." }),
  q(18053, { testType: "pt", subject: "math", claim: 1, domain: "MD", target: "I", dok: 2, standard: "3.MD.C.7", type: "grid-match", dataTable: shoreTable, studentDirections: "The class is studying a tide-pool cleanup. Use the table to answer questions about shells, crabs, and wrappers.", questionText: "Match each cleanup mat to its area.", gridRows: ["Sorting mat: 8 feet by 3 feet", "Shell chart: 5 feet by 4 feet", "Path sign: 6 feet by 2 feet"], gridColumns: ["12 square feet", "20 square feet", "24 square feet"], correctAnswer: ["0:2", "1:1", "2:0"], rubric: "The student matches each rectangle to its area.", points: 1, explanation: "8 x 3 = 24, 5 x 4 = 20, and 6 x 2 = 12." }),
  q(18054, { testType: "pt", subject: "math", claim: 4, domain: "MD", target: "H", dok: 2, standard: "3.MD.B.3", type: "grid-match", dataTable: shoreTable, studentDirections: "The class is studying a tide-pool cleanup. Use the table to answer questions about shells, crabs, and wrappers.", questionText: "Match each shore-table question to its answer.", gridRows: ["Shells counted on Wednesday minus Monday", "Total crabs spotted Thursday and Friday", "Wrappers picked up Monday through Wednesday"], gridColumns: ["5", "15", "22"], correctAnswer: ["0:0", "1:1", "2:2"], rubric: "The student combines and compares table values.", points: 1, explanation: "20 - 15 = 5, 7 + 8 = 15, and 9 + 7 + 6 = 22." }),
];

const elaBase: Array<[Question["type"], string, string | string[], string, string[]?]> = [
  ["multiple-choice", "Why does Sofia write about the rock shape?", "B", "The rock is a clue about where the crab hid.", ["She wants to draw every rock.", "It helps record where the crab was hiding.", "She wants to take the rock home.", "It tells the time of day."]],
  ["multiple-choice", "What is a theme of the story?", "A", "Sofia learns that careful notes help people remember and explain observations.", ["Careful notes help people learn.", "Waves should always be avoided.", "Crabs cannot hide.", "Posters do not need details."]],
  ["multiple-choice", "How does Sofia change in the story?", "C", "At first she thinks she missed the crab, but later she records clues and learns from them.", ["She stops liking science.", "She refuses to write.", "She learns to record clues.", "She leaves the beach early."]],
  ["two-part", "Answer both parts of the question.", ["A", "B"], "The phrase means the notes helped explain what happened.", undefined],
  ["multiple-choice", "Which event happens after the wave washes over the pool?", "D", "After the wave, the crab peeks out.", ["Sofia gets her notebook.", "The class arrives.", "Ms. Ortiz gives advice.", "The crab peeks out."]],
  ["multi-select", "Which two details show Sofia is observing carefully?", ["A", "C"], "She draws the rock and records when the crab appears.", ["She draws the flat rock.", "She closes her notebook.", "She writes that the crab comes out after a wave.", "She moves the animals."]],
  ["multiple-choice", "What is a tide pool?", "A", "The article defines a tide pool as ocean water left when the tide moves out.", ["a small pool of ocean water left by the tide", "a deep lake in the mountains", "a river with no animals", "a glass bowl in a classroom"]],
  ["multiple-choice", "What is the main idea of the article?", "B", "The article explains tide-pool life and how visitors should be careful.", ["Tide pools are empty.", "Tide pools are homes for living things.", "All animals live in shells.", "The ocean has no waves."]],
  ["multiple-choice", "Why might a crab hide under a rock?", "C", "The article says hiding under a rock can help a crab stay safe.", ["to dry out", "to find a notebook", "to stay safe", "to become seaweed"]],
  ["multiple-choice", "What does habitat mean in the article?", "A", "A habitat is a home or place where living things live.", ["home", "game", "tool", "sound"]],
  ["multi-select", "Which two headings would fit the article?", ["A", "B"], "The article discusses tide-pool animals and safe visiting.", ["Animals in Tide Pools", "How Visitors Can Help", "Building a Train", "Cooking Lunch"]],
  ["multiple-choice", "Why did the author write the article?", "A", "The article informs readers about tide pools.", ["to inform readers about tide pools", "to tell a mystery story", "to sell shells", "to compare buses"]],
  ["multiple-choice", "Which sentence is written correctly?", "B", "The plural subject animals uses live.", ["The animals lives in pools.", "The animals live in pools.", "The animals living in pools.", "The animals was in pools."]],
  ["multiple-choice", "Which sentence uses commas correctly?", "A", "The items in the series are separated with commas.", ["We saw crabs, snails, and shells.", "We saw crabs snails, and shells.", "We saw, crabs, snails and shells.", "We, saw crabs snails and shells."]],
  ["multiple-choice", "What does the suffix -er mean in teacher?", "C", "A teacher is a person who teaches.", ["again", "without", "a person who", "before"]],
  ["multi-select", "Which two words are synonyms for gentle?", ["A", "D"], "Careful and soft can both describe gentle actions.", ["careful", "rough", "loud", "soft"]],
  ["multiple-choice", "Which word best completes the sentence? The class made an ___ poster.", "A", "Informative means giving information.", ["informative", "empty", "silent", "crooked"]],
  ["multiple-choice", "According to the presentation, what should science notes include?", "B", "The presentation says notes should tell what, where, and when.", ["only perfect drawings", "what, where, and when details", "only guesses", "nothing about waves"]],
  ["two-part", "Answer both parts of the question.", ["A", "A"], "The presentation says careful notes turn observations into useful information.", undefined],
  ["multi-select", "Which two sources would help a report about tide pools?", ["A", "B"], "A field guide and scientist interview are relevant.", ["A field guide to tide-pool animals", "An interview with a marine scientist", "A cookbook", "A basketball schedule"]],
  ["grid-match", "Match each action to the reason it helps.", ["0:0", "1:1", "2:2"], "Each action protects the tide-pool habitat.", undefined],
  ["multiple-choice", "Why should visitors put lifted rocks back the same way?", "A", "The presentation says rocks can be part of animals' homes.", ["to protect small homes", "to make waves bigger", "to hide notebooks", "to count faster"]],
  ["multiple-choice", "According to Source 1, what did students remove?", "C", "They removed trash items such as bottle caps and wrappers.", ["shells and seaweed", "rocks and animals", "bottle caps and wrappers", "sea stars and crabs"]],
  ["grid-match", "Match each detail to the source where it appears.", ["0:0", "1:1", "2:1"], "Source 1 tells what students did. Source 2 explains why clean shores matter.", undefined],
  ["multiple-choice", "Which sentence has the correct past-tense verb?", "B", "The past tense of write is wrote.", ["Sofia writed notes.", "Sofia wrote notes.", "Sofia writing notes.", "Sofia writes yesterday."]],
  ["multiple-choice", "Which title is capitalized correctly?", "D", "Important words in a title begin with capital letters.", ["life in a Tide Pool", "Life in a tide pool", "life in a tide pool", "Life in a Tide Pool"]],
  ["multiple-choice", "What does the prefix un- mean in unsafe?", "A", "Unsafe means not safe.", ["not", "again", "before", "full of"]],
  ["multiple-choice", "Which word is an antonym for shallow?", "B", "Deep is the opposite of shallow.", ["small", "deep", "wet", "quiet"]],
  ["multiple-choice", "Which source would best help a student learn how tides change?", "A", "A science article about tides is most relevant.", ["A science article about ocean tides", "A story about a picnic", "A map of highways", "A recipe for soup"]],
  ["multi-select", "Which two details from the presentation explain gentle tide-pool visiting?", ["A", "C"], "Both are gentle visiting actions.", ["Walk on bare rock when you can.", "Take animals home.", "Leave the pool as you found it.", "Pull seaweed from rocks."]],
];

const elaCat: Question[] = elaBase.map((item, index) => {
  const [type, questionText, correctAnswer, explanation, optionTexts] = item;
  const isProtectingTidePoolsPresentation = index >= 20 && index < 22 || index === 29;
  const passage = index < 6 ? tidePoolStory : index < 12 ? oceanArticle : index < 18 ? undefined : index < 20 ? presentationOne : isProtectingTidePoolsPresentation ? presentationTwo : sourceSet;
  const passageTitle = index < 6 ? "The Tide Pool Notebook" : index < 12 ? "Life in a Tide Pool" : index < 18 ? undefined : index < 20 ? "Taking Notes at the Shore" : isProtectingTidePoolsPresentation ? "Protecting Tide Pools" : "A Shoreline Cleanup / Why Clean Shores Matter";
  const base = q(18101 + index, {
    testType: "cat",
    subject: "ela",
    claim: index < 12 || index >= 22 && index < 24 ? 1 : index < 18 || index >= 24 && index < 28 ? 2 : 3,
    target: String(index + 1),
    dok: index % 5 === 0 ? 3 : 2,
    standard: index < 6 ? "RL.3.1" : index < 12 || index >= 22 && index < 24 ? "RI.3.1" : index < 18 || index >= 24 && index < 28 ? "L.3.1" : "SL.3.2",
    type,
    passage,
    passageTitle,
    questionText,
    options: optionTexts?.map((text, i) => ({ label: String.fromCharCode(65 + i), text })),
    correctAnswer,
    rubric: "The student answers the grade-level ELA question correctly.",
    points: 1,
    explanation,
  });

  if (type === "two-part") {
    return { ...base, partAPrompt: "Part A: What is the best answer?", partAOptions: [{ label: "A", text: "Careful notes help explain observations." }, { label: "B", text: "Notes should be thrown away." }, { label: "C", text: "Waves never change pools." }, { label: "D", text: "Animals should be moved." }], partBPrompt: "Part B: Which detail best supports the answer?", partBOptions: [{ label: "A", text: "Notes help turn observations into useful information." }, { label: "B", text: "The beach has sand." }, { label: "C", text: "Some notebooks are blue." }, { label: "D", text: "The class rides a bus." }] };
  }
  if (type === "grid-match") {
    return { ...base, gridRows: index === 20 ? ["Walk gently", "Leave animals in place", "Take notes"] : ["Students picked up wrappers.", "Trash can harm animals.", "Plastic can be mistaken for food."], gridColumns: index === 20 ? ["protects habitats", "keeps homes safe", "records information"] : ["Source 1", "Source 2"], correctAnswer };
  }
  return base;
});

const elaPt: Question[] = [
  q(18150, { testType: "pt", subject: "ela", claim: 4, target: "31", dok: 3, standard: "RI.3.9", type: "grid-match", passage: sourceSet, passageTitle: "A Shoreline Cleanup / Why Clean Shores Matter", studentDirections: "Read the sources. Then answer the questions that follow.", questionText: "Match each detail to the source where it belongs best.", gridRows: ["Students picked up bottle caps.", "String can tangle animal legs.", "Natural objects were left in place.", "Visitors can carry out trash."], gridColumns: ["Source 1", "Source 2"], correctAnswer: ["0:0", "1:1", "2:0", "3:1"], rubric: "The student matches details to the correct source.", points: 2, explanation: "Source 1 describes the cleanup. Source 2 explains why clean shores matter." }),
  q(18151, { testType: "pt", subject: "ela", claim: 4, target: "32", dok: 3, standard: "W.3.8", type: "short-answer", passage: sourceSet, passageTitle: "A Shoreline Cleanup / Why Clean Shores Matter", studentDirections: "Read the sources. Then answer the questions that follow.", questionText: "Explain why students should remove trash but leave natural objects in place. Use details from both sources.", correctAnswer: "Students should remove trash because it can harm animals, but leave shells, rocks, seaweed, and animals because those are natural parts of the habitat. Source 1 shows students doing this, and Source 2 explains how trash can hurt tide-pool animals.", rubric: "2 points: explains with details from both sources; 1 point: partial explanation or one source.", points: 2, explanation: "A strong answer explains the difference between harmful trash and natural habitat parts." }),
  q(18152, { testType: "pt", subject: "ela", claim: 2, target: "33", dok: 4, standard: "W.3.2", type: "extended-writing", passage: sourceSet, passageTitle: "A Shoreline Cleanup / Why Clean Shores Matter", studentDirections: "Read the sources. Then write an informational response.", questionText: "Write an informational response explaining how visitors can help protect tide pools. Use information from both sources.", correctAnswer: "Student responses will vary. A strong response explains that visitors can pick up trash, carry out wrappers and string, avoid moving natural objects, and leave animals and rocks where they belong.", rubric: "4 points: clear main idea, details from both sources, organization, and conventions; 3 points: mostly complete; 2 points: limited; 1 point: minimal.", points: 4, explanation: "A strong response uses both sources to explain helpful visitor actions." }),
];

export const practiceTest18Questions: Question[] = [
  ...mathCat,
  ...mathPt,
  ...elaCat,
  ...elaPt,
];
