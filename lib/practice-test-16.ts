import type { Question } from "./questions";

const TEST = 16;

function q(id: number, data: Omit<Question, "id" | "grade" | "practiceTest">): Question {
  return { id, grade: 3, practiceTest: TEST, ...data };
}

const classGardenStory = `Read the passage and answer the questions.

**The Class Garden Map**
*by Rina Cole*

Nora's class was planting a small garden behind the library. Everyone had a job. Ben carried seed packets, Lily filled watering cans, and Nora drew a map of the garden beds.

"Put the carrots by the fence," Ben said. "They will be easy to find."

Lily pointed to a sunny corner. "The tomatoes need more light. They should go there."

Nora looked at her paper. If she placed the carrots by the fence, the bean poles would block the path. If she placed the tomatoes in the sunny corner, the watering cans would be far away.

"Let's walk through the garden first," Nora said.

The class followed the path. They noticed where the sun stayed longest. They also saw that the hose reached only halfway across the garden.

Nora changed her map. She put tomatoes near the sunny corner but close enough for the hose. She moved the carrots beside the shorter lettuce plants. Then she left a wide path down the middle.

On planting day, the map helped everyone work quickly. No one stepped on the tiny rows. The hose reached the plants, and the class had room to carry tools.

At the end of the day, Ben smiled. "Your map fixed problems before they happened."

Nora looked at the neat garden beds. "The garden helped make the map," she said.`;

const seedArticle = `Read the passage and answer the questions.

**How Seeds Become Plants**

Most plants begin as seeds. A seed may look dry and quiet, but inside it is a tiny plant and stored food. When a seed gets water, warmth, and air, it can begin to grow.

First, the seed coat softens. A small root pushes down into the soil. The root takes in water and helps hold the plant in place. Next, a shoot grows upward. The shoot becomes a stem and leaves.

Leaves are important because they help the plant make food from sunlight. As the plant grows, it may need more space. Gardeners often place seeds in rows so roots and leaves do not crowd one another.

Plants also need care. Too little water can make a plant wilt. Too much water can keep roots from getting air. Weeds can take space and water away from young plants.

Watching seeds grow takes patience. A gardener may not see a big change every day, but roots and leaves are doing important work.`;

const presentationOne = `Listen to or read the presentation. Then answer the questions.

**Planning a School Garden**

Speaker 1: Today we are sharing how a third-grade class planned a garden.

Speaker 2: The students did not plant right away. First, they looked at the space and noticed where the sun was brightest.

Speaker 1: They also checked how far the hose could reach. That helped them choose where to place thirsty plants.

Speaker 2: The class made a simple map with wide paths, short plants in front, and tall plants near the back.

Speaker 1: Their plan helped everyone work safely and kept the rows from being stepped on.`;

const presentationTwo = `Listen to or read the presentation. Then answer the questions.

**Caring for Young Plants**

Speaker 1: Young plants need steady care after seeds sprout.

Speaker 2: Water is important, but roots also need air. That is why soil should be damp, not muddy.

Speaker 1: Gardeners pull weeds because weeds use water and space that garden plants need.

Speaker 2: They also watch the leaves. Healthy leaves help plants make food from sunlight.

Speaker 1: Small daily jobs can help a garden grow strong.`;

const sourceSet = `Read the sources and answer the questions that follow.

**Source 1: A Better Garden Plan**

Room 3 wanted to plant herbs, flowers, and vegetables. At first, the students placed the tall bean poles in the middle of the garden. Then they noticed the poles would shade the lettuce. The class moved the poles to the back edge and left a clear path for watering. Their new plan helped each plant get what it needed.

---

**Source 2: Why Garden Plans Matter**

A garden plan is a drawing that shows where plants will grow. A good plan can show sunny places, paths, water sources, and plant heights. Planning before planting can prevent crowding. It can also make garden work easier because tools and water can reach the plants.`;

const plantTable = {
  columns: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  rows: [
    { label: "Seeds planted", values: [12, 14, 10, 16, 8] },
    { label: "Plants watered", values: [18, 20, 22, 24, 26] },
    { label: "Weeds pulled", values: [5, 7, 6, 8, 9] },
  ],
};

const mathCatItems = [
  ["text-input", "A class plants 3 rows of 4 bean seeds. How many seeds do they plant?", "12", "3 x 4 = 12.", "OA", "3.OA.A.1"],
  ["multiple-choice", "Which expression shows 5 groups of 2?", "A", "5 groups of 2 is 5 x 2.", "OA", "3.OA.A.1", ["5 x 2", "5 + 5", "2 - 5", "5 x 5"]],
  ["text-input", "There are 18 seed packets shared equally by 3 teams. How many packets does each team get?", "6", "18 divided by 3 = 6.", "OA", "3.OA.A.2"],
  ["text-input", "What number makes this equation true? 4 x ? = 20", "5", "4 x 5 = 20.", "OA", "3.OA.A.4"],
  ["multiple-choice", "Which fact is related to 6 x 3 = 18?", "B", "18 divided by 3 equals 6.", "OA", "3.OA.B.6", ["18 + 3 = 21", "18 / 3 = 6", "18 - 6 = 12", "6 + 3 = 9"]],
  ["text-input", "Find the sum: 245 + 132", "377", "245 + 132 = 377.", "NBT", "3.NBT.A.2"],
  ["text-input", "Find the difference: 486 - 214", "272", "486 - 214 = 272.", "NBT", "3.NBT.A.2"],
  ["multiple-choice", "Which number rounds to 500 to the nearest hundred?", "C", "548 rounds to 500.", "NBT", "3.NBT.A.1", ["449", "451", "548", "551"]],
  ["text-input", "A watering job starts at 9:10 a.m. and lasts 20 minutes. What time does it end? Write like 9:30.", "9:30", "Twenty minutes after 9:10 is 9:30.", "MD", "3.MD.A.1"],
  ["multiple-choice", "Which fraction names one out of four equal parts?", "A", "One out of four equal parts is 1/4.", "NF", "3.NF.A.1", ["1/4", "4/1", "3/4", "1/3"]],
  ["multiple-choice", "Which fraction is equal to 1/2?", "B", "2/4 is equal to 1/2.", "NF", "3.NF.A.3", ["1/4", "2/4", "3/4", "4/4"]],
  ["text-input", "A rectangle garden bed is 6 feet long and 3 feet wide. What is its area?", "18", "6 x 3 = 18.", "MD", "3.MD.C.7"],
  ["text-input", "A square sign has sides of 4 inches. What is its perimeter?", "16", "4 + 4 + 4 + 4 = 16.", "MD", "3.MD.D.8"],
  ["multiple-choice", "Which shape must have 4 sides?", "D", "A quadrilateral has 4 sides.", "G", "3.G.A.1", ["triangle", "pentagon", "hexagon", "quadrilateral"]],
  ["multi-select", "Select all equations that are true.", ["A", "C"], "2 x 6 = 12 and 4 x 3 = 12 are true.", "OA", "3.OA.C.7", ["2 x 6 = 12", "5 x 4 = 21", "4 x 3 = 12", "9 / 3 = 2"]],
  ["text-input", "What are the next two numbers? 6, 12, 18, __, __. Use a comma.", "24, 30", "The pattern adds 6 each time.", "OA", "3.OA.D.9"],
  ["multiple-choice", "A box has 4 bags with 6 seeds in each bag. Which equation finds the total?", "C", "4 bags of 6 is 4 x 6.", "OA", "3.OA.A.3", ["4 + 6", "6 - 4", "4 x 6", "6 / 4"]],
  ["text-input", "What is 7 x 5?", "35", "7 x 5 = 35.", "OA", "3.OA.C.7"],
  ["text-input", "What is 32 / 4?", "8", "32 divided by 4 = 8.", "OA", "3.OA.C.7"],
  ["multiple-choice", "Which comparison is true?", "A", "3/6 is equal to 1/2.", "NF", "3.NF.A.3", ["3/6 = 1/2", "1/4 > 3/4", "2/8 = 2/4", "1/3 < 1/6"]],
  ["text-input", "A class collects 128 leaves in the morning and 141 in the afternoon. How many leaves do they collect?", "269", "128 + 141 = 269.", "NBT", "3.NBT.A.2"],
  ["multiple-choice", "A line plot shows 2 marks above Monday and 3 above Tuesday. How many marks are shown?", "B", "2 + 3 = 5.", "MD", "3.MD.B.4", ["4", "5", "6", "7"]],
  ["text-input", "A garden path is 9 feet long and 2 feet wide. What is its area?", "18", "9 x 2 = 18.", "MD", "3.MD.C.7"],
  ["multiple-choice", "Which object is most likely measured in liters?", "D", "A watering can holds liquid, measured in liters.", "MD", "3.MD.A.2", ["pencil length", "paper width", "book weight", "water in a can"]],
  ["text-input", "What number makes this true? ? + 275 = 500", "225", "500 - 275 = 225.", "NBT", "3.NBT.A.2"],
  ["multiple-choice", "Which is another way to show 3 x 4?", "A", "4 + 4 + 4 equals 3 groups of 4.", "OA", "3.OA.A.1", ["4 + 4 + 4", "3 + 4", "3 + 3 + 3 + 3 + 3", "12 + 4"]],
  ["text-input", "There are 30 flowers in 5 equal rows. How many flowers are in each row?", "6", "30 divided by 5 = 6.", "OA", "3.OA.A.2"],
  ["multiple-choice", "Which number is the greatest?", "C", "642 is greater than the other choices.", "NBT", "3.NBT.A.2", ["426", "624", "642", "462"]],
  ["text-input", "A movie about gardens starts at 2:00 and ends at 2:45. How many minutes long is it?", "45", "From 2:00 to 2:45 is 45 minutes.", "MD", "3.MD.A.1"],
  ["multiple-choice", "Which fraction is larger?", "B", "3/4 is larger than 1/4.", "NF", "3.NF.A.3", ["1/4", "3/4", "1/3", "1/6"]],
  ["text-input", "A rectangle has sides 8, 8, 3, and 3. What is its perimeter?", "22", "8 + 8 + 3 + 3 = 22.", "MD", "3.MD.D.8"],
  ["multiple-choice", "Which shape can be split into 3 equal parts called thirds?", "A", "Any whole divided into 3 equal parts has thirds.", "G", "3.G.A.2", ["a whole with 3 equal parts", "a whole with 2 equal parts", "a whole with 4 unequal parts", "a whole with 5 parts"]],
  ["text-input", "What is 9 x 3?", "27", "9 x 3 = 27.", "OA", "3.OA.C.7"],
  ["multiple-choice", "Which equation is true?", "D", "8 x 4 = 32.", "OA", "3.OA.C.7", ["6 x 5 = 31", "7 x 2 = 16", "9 x 2 = 20", "8 x 4 = 32"]],
  ["text-input", "A class has 19 shovels and buys 23 more. How many shovels do they have?", "42", "19 + 23 = 42.", "NBT", "3.NBT.A.2"],
  ["multiple-choice", "Which table row from the garden table has the largest Friday number?", "B", "Plants watered has 26 on Friday, the largest Friday value.", "MD", "3.MD.B.3", ["Seeds planted", "Plants watered", "Weeds pulled", "All are equal"]],
] as const;

const mathCat: Question[] = mathCatItems.map((item, index) => {
  const [type, questionText, correctAnswer, explanation, domain, standard, optionTexts] = item;
  const options = optionTexts?.map((text, i) => ({ label: String.fromCharCode(65 + i), text }));
  return q(16001 + index, {
    testType: "cat",
    subject: "math",
    claim: index % 9 === 0 ? 4 : index % 5 === 0 ? 3 : index % 4 === 0 ? 2 : 1,
    domain,
    target: "A",
    dok: index % 7 === 0 ? 2 : 1,
    standard,
    type,
    dataTable: index === 35 ? plantTable : undefined,
    questionText,
    options,
    correctAnswer,
    rubric: "The student answers the grade-level mathematics question correctly.",
    points: 1,
    explanation,
  } as Omit<Question, "id" | "grade" | "practiceTest">);
});

const mathPt: Question[] = [
  q(16050, { testType: "pt", subject: "math", claim: 4, domain: "MD", target: "H", dok: 2, standard: "3.MD.B.3", type: "multiple-choice", dataTable: plantTable, studentDirections: "Use the garden table to answer the questions.", questionText: "How many seeds were planted on Monday and Tuesday in all?", options: [{ label: "A", text: "20" }, { label: "B", text: "24" }, { label: "C", text: "26" }, { label: "D", text: "30" }], correctAnswer: "C", rubric: "The student adds two values from the table.", points: 1, explanation: "12 + 14 = 26." }),
  q(16051, { testType: "pt", subject: "math", claim: 4, domain: "MD", target: "H", dok: 2, standard: "3.MD.B.3", type: "text-input", dataTable: plantTable, studentDirections: "Use the garden table to answer the questions.", questionText: "How many more plants were watered on Friday than on Monday?", correctAnswer: "8", rubric: "The student subtracts two table values.", points: 1, explanation: "26 - 18 = 8." }),
  q(16052, { testType: "pt", subject: "math", claim: 2, domain: "OA", target: "D", dok: 2, standard: "3.OA.D.8", type: "multiple-choice", dataTable: plantTable, studentDirections: "Use the garden table to answer the questions.", questionText: "The class packs 4 trays with 6 seedlings each. Then 5 seedlings are given away. How many seedlings are left?", options: [{ label: "A", text: "19" }, { label: "B", text: "20" }, { label: "C", text: "24" }, { label: "D", text: "29" }], correctAnswer: "A", rubric: "The student solves a two-step problem.", points: 1, explanation: "4 x 6 = 24, and 24 - 5 = 19." }),
  q(16053, { testType: "pt", subject: "math", claim: 1, domain: "MD", target: "I", dok: 2, standard: "3.MD.C.7", type: "text-input", dataTable: plantTable, studentDirections: "Use the garden table to answer the questions.", questionText: "A garden bed is 5 feet long and 4 feet wide. What is its area?", correctAnswer: "20", rubric: "The student finds area.", points: 1, explanation: "5 x 4 = 20 square feet." }),
  q(16054, { testType: "pt", subject: "math", claim: 3, domain: "OA", target: "F", dok: 2, standard: "3.OA.B.5", type: "multi-select", dataTable: plantTable, studentDirections: "Use the garden table to answer the questions.", questionText: "Which two equations can help find 3 x 8?", options: [{ label: "A", text: "8 + 8 + 8 = 24" }, { label: "B", text: "(3 x 4) + (3 x 4) = 24" }, { label: "C", text: "8 - 3 = 5" }, { label: "D", text: "3 + 8 = 11" }], correctAnswer: ["A", "B"], rubric: "The student identifies valid multiplication representations.", points: 1, explanation: "Both repeated addition and breaking 8 into 4 + 4 can show 3 x 8 = 24." }),
];

const elaCat: Question[] = [
  q(16101, { testType: "cat", subject: "ela", claim: 1, target: "1", dok: 2, standard: "RL.3.1", type: "multiple-choice", passage: classGardenStory, passageTitle: "The Class Garden Map", questionText: "Why does Nora walk through the garden before finishing her map?", options: [{ label: "A", text: "She wants to find her lost pencil." }, { label: "B", text: "She needs to notice the real space before planning." }, { label: "C", text: "She does not want to plant seeds." }, { label: "D", text: "She wants Ben to draw the map." }], correctAnswer: "B", rubric: "The student identifies a character's reason for an action.", points: 1, explanation: "Nora walks through the garden to check the sun, hose, and path before planning." }),
  q(16102, { testType: "cat", subject: "ela", claim: 1, target: "2", dok: 2, standard: "RL.3.2", type: "multiple-choice", passage: classGardenStory, passageTitle: "The Class Garden Map", questionText: "What is a theme of the story?", options: [{ label: "A", text: "Good plans can come from careful noticing." }, { label: "B", text: "Seeds should never be planted near fences." }, { label: "C", text: "Drawing is more important than teamwork." }, { label: "D", text: "Gardens grow best without maps." }], correctAnswer: "A", rubric: "The student identifies a theme.", points: 1, explanation: "Nora's careful noticing helps the class make a better plan." }),
  q(16103, { testType: "cat", subject: "ela", claim: 1, target: "3", dok: 2, standard: "RL.3.3", type: "multiple-choice", passage: classGardenStory, passageTitle: "The Class Garden Map", questionText: "How does Nora change from the beginning to the end?", options: [{ label: "A", text: "She stops caring about the garden." }, { label: "B", text: "She learns to use what the garden shows her." }, { label: "C", text: "She decides not to draw maps anymore." }, { label: "D", text: "She asks Lily to do every job." }], correctAnswer: "B", rubric: "The student describes character development.", points: 1, explanation: "Nora changes her map after observing the garden." }),
  q(16104, { testType: "cat", subject: "ela", claim: 1, target: "4", dok: 2, standard: "RL.3.4", type: "two-part", passage: classGardenStory, passageTitle: "The Class Garden Map", questionText: "Answer both parts of the question.", partAPrompt: "Part A: What does the word 'neat' mean in the story?", partAOptions: [{ label: "A", text: "orderly" }, { label: "B", text: "funny" }, { label: "C", text: "muddy" }, { label: "D", text: "hidden" }], partBPrompt: "Part B: Which detail best supports the answer?", partBOptions: [{ label: "A", text: "No one stepped on the tiny rows." }, { label: "B", text: "Ben carried seed packets." }, { label: "C", text: "The class followed the path." }, { label: "D", text: "Nora looked at her paper." }], correctAnswer: ["A", "A"], rubric: "The student determines word meaning and supporting evidence.", points: 1, explanation: "The rows are neat because they are orderly and protected." }),
  q(16105, { testType: "cat", subject: "ela", claim: 1, target: "5", dok: 2, standard: "RL.3.5", type: "multiple-choice", passage: classGardenStory, passageTitle: "The Class Garden Map", questionText: "Which event happens first?", options: [{ label: "A", text: "The class plants the garden." }, { label: "B", text: "Nora changes her map." }, { label: "C", text: "Ben suggests putting carrots by the fence." }, { label: "D", text: "Ben says the map fixed problems." }], correctAnswer: "C", rubric: "The student identifies sequence.", points: 1, explanation: "Ben's suggestion happens before Nora walks through the garden and changes the map." }),
  q(16106, { testType: "cat", subject: "ela", claim: 1, target: "6", dok: 2, standard: "RL.3.6", type: "multi-select", passage: classGardenStory, passageTitle: "The Class Garden Map", questionText: "Which two details show that Nora thinks carefully?", options: [{ label: "A", text: "She notices the hose reaches only halfway." }, { label: "B", text: "She leaves a wide path down the middle." }, { label: "C", text: "She forgets the seed packets." }, { label: "D", text: "She steps on the tiny rows." }], correctAnswer: ["A", "B"], rubric: "The student chooses evidence about a character.", points: 1, explanation: "Both details show Nora thinking about how the garden will work." }),
  q(16107, { testType: "cat", subject: "ela", claim: 1, target: "7", dok: 2, standard: "RI.3.1", type: "multiple-choice", passage: seedArticle, passageTitle: "How Seeds Become Plants", questionText: "What does a seed need to begin growing?", options: [{ label: "A", text: "water, warmth, and air" }, { label: "B", text: "paint, paper, and glue" }, { label: "C", text: "rocks, shade, and snow" }, { label: "D", text: "music, string, and wheels" }], correctAnswer: "A", rubric: "The student recalls a detail.", points: 1, explanation: "The article states that seeds need water, warmth, and air." }),
  q(16108, { testType: "cat", subject: "ela", claim: 1, target: "8", dok: 2, standard: "RI.3.2", type: "multiple-choice", passage: seedArticle, passageTitle: "How Seeds Become Plants", questionText: "What is the main idea of the article?", options: [{ label: "A", text: "Seeds grow into plants when they get what they need." }, { label: "B", text: "All gardens are too crowded." }, { label: "C", text: "Leaves are not useful to plants." }, { label: "D", text: "Gardeners should never water plants." }], correctAnswer: "A", rubric: "The student identifies main idea.", points: 1, explanation: "The article explains what seeds and young plants need to grow." }),
  q(16109, { testType: "cat", subject: "ela", claim: 1, target: "9", dok: 2, standard: "RI.3.3", type: "multiple-choice", passage: seedArticle, passageTitle: "How Seeds Become Plants", questionText: "What happens after the root pushes down?", options: [{ label: "A", text: "A shoot grows upward." }, { label: "B", text: "The plant becomes a rock." }, { label: "C", text: "The leaves disappear." }, { label: "D", text: "The seed coat becomes a flower." }], correctAnswer: "A", rubric: "The student identifies sequence.", points: 1, explanation: "The article says a shoot grows upward after the root." }),
  q(16110, { testType: "cat", subject: "ela", claim: 1, target: "10", dok: 2, standard: "RI.3.4", type: "multiple-choice", passage: seedArticle, passageTitle: "How Seeds Become Plants", questionText: "What does 'wilt' most nearly mean?", options: [{ label: "A", text: "droop" }, { label: "B", text: "laugh" }, { label: "C", text: "shine" }, { label: "D", text: "count" }], correctAnswer: "A", rubric: "The student uses context clues.", points: 1, explanation: "Too little water can make a plant droop or wilt." }),
  q(16111, { testType: "cat", subject: "ela", claim: 1, target: "11", dok: 2, standard: "RI.3.5", type: "multi-select", passage: seedArticle, passageTitle: "How Seeds Become Plants", questionText: "Which two headings would fit sections of the article?", options: [{ label: "A", text: "How Roots and Shoots Grow" }, { label: "B", text: "Why Plants Need Care" }, { label: "C", text: "How to Build a Robot" }, { label: "D", text: "The History of Balloons" }], correctAnswer: ["A", "B"], rubric: "The student identifies fitting headings.", points: 1, explanation: "The article discusses plant growth and plant care." }),
  q(16112, { testType: "cat", subject: "ela", claim: 1, target: "12", dok: 2, standard: "RI.3.6", type: "multiple-choice", passage: seedArticle, passageTitle: "How Seeds Become Plants", questionText: "Why did the author most likely write the article?", options: [{ label: "A", text: "to explain how seeds grow" }, { label: "B", text: "to tell a funny story" }, { label: "C", text: "to sell seed packets" }, { label: "D", text: "to describe a parade" }], correctAnswer: "A", rubric: "The student identifies author's purpose.", points: 1, explanation: "The article informs readers about seeds and plants." }),
  q(16113, { testType: "cat", subject: "ela", claim: 2, target: "13", dok: 2, standard: "L.3.1", type: "multiple-choice", questionText: "Which sentence is written correctly?", options: [{ label: "A", text: "The seeds grows quickly." }, { label: "B", text: "The seeds grow quickly." }, { label: "C", text: "The seeds growing quickly." }, { label: "D", text: "The seeds has grow quickly." }], correctAnswer: "B", rubric: "The student identifies subject-verb agreement.", points: 1, explanation: "The plural subject seeds uses grow." }),
  q(16114, { testType: "cat", subject: "ela", claim: 2, target: "14", dok: 2, standard: "L.3.2", type: "multiple-choice", questionText: "Which sentence uses commas correctly?", options: [{ label: "A", text: "We planted beans, carrots, and lettuce." }, { label: "B", text: "We planted beans carrots, and lettuce." }, { label: "C", text: "We planted, beans, carrots and lettuce." }, { label: "D", text: "We, planted beans carrots and lettuce." }], correctAnswer: "A", rubric: "The student identifies correct comma use.", points: 1, explanation: "Items in a series are separated with commas." }),
  q(16115, { testType: "cat", subject: "ela", claim: 2, target: "15", dok: 2, standard: "L.3.4", type: "multiple-choice", passage: classGardenStory, passageTitle: "The Class Garden Map", questionText: "What does the suffix -ful mean in helpful?", options: [{ label: "A", text: "full of" }, { label: "B", text: "without" }, { label: "C", text: "before" }, { label: "D", text: "again" }], correctAnswer: "A", rubric: "The student uses word parts.", points: 1, explanation: "Helpful means full of help." }),
  q(16116, { testType: "cat", subject: "ela", claim: 2, target: "16", dok: 2, standard: "L.3.5", type: "multi-select", questionText: "Which two words are synonyms for small?", options: [{ label: "A", text: "tiny" }, { label: "B", text: "little" }, { label: "C", text: "huge" }, { label: "D", text: "wide" }], correctAnswer: ["A", "B"], rubric: "The student identifies synonyms.", points: 1, explanation: "Tiny and little both mean small." }),
  q(16117, { testType: "cat", subject: "ela", claim: 2, target: "17", dok: 2, standard: "L.3.6", type: "multiple-choice", questionText: "Which word best completes the sentence? The gardener was ___ because the plants were healthy.", options: [{ label: "A", text: "pleased" }, { label: "B", text: "square" }, { label: "C", text: "empty" }, { label: "D", text: "silent" }], correctAnswer: "A", rubric: "The student chooses a precise word.", points: 1, explanation: "Pleased means happy or satisfied." }),
  q(16118, { testType: "cat", subject: "ela", claim: 3, target: "18", dok: 2, standard: "SL.3.2", type: "multiple-choice", passage: presentationOne, passageTitle: "Planning a School Garden", questionText: "What did the students check before making their garden map?", options: [{ label: "A", text: "where the sun was brightest" }, { label: "B", text: "how many books were in the library" }, { label: "C", text: "which bus came first" }, { label: "D", text: "how to paint a wall" }], correctAnswer: "A", rubric: "The student recalls presentation information.", points: 1, explanation: "The presentation says students noticed where the sun was brightest." }),
  q(16119, { testType: "cat", subject: "ela", claim: 3, target: "19", dok: 2, standard: "SL.3.2", type: "two-part", passage: presentationOne, passageTitle: "Planning a School Garden", questionText: "Answer both parts of the question.", partAPrompt: "Part A: What is the main idea of the presentation?", partAOptions: [{ label: "A", text: "Planning helps a garden work well." }, { label: "B", text: "Students should not use maps." }, { label: "C", text: "All plants need shade." }, { label: "D", text: "Libraries should close gardens." }], partBPrompt: "Part B: Which detail best supports the answer?", partBOptions: [{ label: "A", text: "The plan had wide paths and helped everyone work safely." }, { label: "B", text: "The speakers say hello." }, { label: "C", text: "The class had a third grade." }, { label: "D", text: "The plants had names." }], correctAnswer: ["A", "A"], rubric: "The student identifies main idea and evidence.", points: 1, explanation: "The map made the garden safer and easier to use." }),
  q(16120, { testType: "cat", subject: "ela", claim: 3, target: "20", dok: 2, standard: "W.3.8", type: "multi-select", questionText: "Which two sources would help a student write about caring for seedlings?", options: [{ label: "A", text: "A book about watering young plants" }, { label: "B", text: "A chart showing how much sun seedlings need" }, { label: "C", text: "A story about a lost kite" }, { label: "D", text: "A menu from a pizza shop" }], correctAnswer: ["A", "B"], rubric: "The student selects relevant sources.", points: 1, explanation: "Both selected sources give information about seedlings." }),
  q(16121, { testType: "cat", subject: "ela", claim: 3, target: "19", dok: 2, standard: "SL.3.2", type: "grid-match", passage: presentationTwo, passageTitle: "Caring for Young Plants", questionText: "Match each garden job to the reason it helps.", gridRows: ["Pull weeds", "Keep soil damp, not muddy", "Watch leaves"], gridColumns: ["protects water and space", "lets roots get air", "shows plant health"], correctAnswer: ["0:0", "1:1", "2:2"], rubric: "The student matches details from the presentation.", points: 1, explanation: "Each job is matched with the reason given by the speakers." }),
  q(16122, { testType: "cat", subject: "ela", claim: 3, target: "18", dok: 2, standard: "SL.3.2", type: "multiple-choice", passage: presentationTwo, passageTitle: "Caring for Young Plants", questionText: "According to the presentation, why do gardeners pull weeds?", options: [{ label: "A", text: "Weeds use water and space." }, { label: "B", text: "Weeds help roots get more air." }, { label: "C", text: "Weeds turn into hoses." }, { label: "D", text: "Weeds make leaves disappear." }], correctAnswer: "A", rubric: "The student recalls a presentation detail.", points: 1, explanation: "The presentation says weeds use water and space plants need." }),
  q(16123, { testType: "cat", subject: "ela", claim: 1, target: "7", dok: 2, standard: "RI.3.1", type: "multiple-choice", passage: sourceSet, passageTitle: "Garden Planning Sources", questionText: "According to Source 2, what can a garden plan show?", options: [{ label: "A", text: "sunny places and paths" }, { label: "B", text: "the names of every insect" }, { label: "C", text: "a recipe for soup" }, { label: "D", text: "a story about winter" }], correctAnswer: "A", rubric: "The student finds a detail in a source.", points: 1, explanation: "Source 2 says a plan can show sunny places, paths, water sources, and plant heights." }),
  q(16124, { testType: "cat", subject: "ela", claim: 1, target: "9", dok: 2, standard: "RI.3.9", type: "grid-match", passage: sourceSet, passageTitle: "Garden Planning Sources", questionText: "Match each detail to the source where it appears.", gridRows: ["Bean poles were moved to the back edge.", "A plan can prevent crowding.", "The lettuce might be shaded."], gridColumns: ["Source 1", "Source 2"], correctAnswer: ["0:0", "1:1", "2:0"], rubric: "The student matches source details.", points: 1, explanation: "Source 1 describes the class plan. Source 2 explains why plans matter." }),
  q(16125, { testType: "cat", subject: "ela", claim: 2, target: "13", dok: 2, standard: "L.3.1", type: "multiple-choice", questionText: "Which sentence has the correct past-tense verb?", options: [{ label: "A", text: "Nora drawed a map." }, { label: "B", text: "Nora drew a map." }, { label: "C", text: "Nora drawing a map." }, { label: "D", text: "Nora draw a map yesterday." }], correctAnswer: "B", rubric: "The student identifies irregular past tense.", points: 1, explanation: "The past tense of draw is drew." }),
  q(16126, { testType: "cat", subject: "ela", claim: 2, target: "14", dok: 2, standard: "L.3.2", type: "multiple-choice", questionText: "Which title is capitalized correctly?", options: [{ label: "A", text: "how seeds become plants" }, { label: "B", text: "How Seeds Become Plants" }, { label: "C", text: "How seeds become plants" }, { label: "D", text: "how Seeds Become plants" }], correctAnswer: "B", rubric: "The student identifies title capitalization.", points: 1, explanation: "Important words in a title begin with capital letters." }),
  q(16127, { testType: "cat", subject: "ela", claim: 2, target: "15", dok: 2, standard: "L.3.4", type: "multiple-choice", questionText: "What does the prefix re- mean in redraw?", options: [{ label: "A", text: "again" }, { label: "B", text: "not" }, { label: "C", text: "before" }, { label: "D", text: "full of" }], correctAnswer: "A", rubric: "The student uses a prefix.", points: 1, explanation: "To redraw is to draw again." }),
  q(16128, { testType: "cat", subject: "ela", claim: 2, target: "16", dok: 2, standard: "L.3.5", type: "multiple-choice", questionText: "Which word is an antonym for bright?", options: [{ label: "A", text: "dark" }, { label: "B", text: "sunny" }, { label: "C", text: "shiny" }, { label: "D", text: "light" }], correctAnswer: "A", rubric: "The student identifies an antonym.", points: 1, explanation: "Dark is the opposite of bright." }),
  q(16129, { testType: "cat", subject: "ela", claim: 3, target: "20", dok: 2, standard: "W.3.8", type: "multiple-choice", questionText: "A student wants to know when to water tomatoes. Which source would be best?", options: [{ label: "A", text: "A gardening guide for tomato plants" }, { label: "B", text: "A poem about clouds" }, { label: "C", text: "A map of bus stops" }, { label: "D", text: "A story about a dog" }], correctAnswer: "A", rubric: "The student chooses a relevant source.", points: 1, explanation: "A gardening guide for tomatoes is the most relevant source." }),
  q(16130, { testType: "cat", subject: "ela", claim: 3, target: "19", dok: 2, standard: "SL.3.2", type: "multi-select", passage: presentationTwo, passageTitle: "Caring for Young Plants", questionText: "Which two details from the presentation explain how plants get what they need?", options: [{ label: "A", text: "Roots need air." }, { label: "B", text: "Healthy leaves help plants make food." }, { label: "C", text: "Speakers use microphones." }, { label: "D", text: "Gardens are always indoors." }], correctAnswer: ["A", "B"], rubric: "The student chooses supporting details.", points: 1, explanation: "Both details explain plant needs." }),
];

const elaPt: Question[] = [
  q(16150, { testType: "pt", subject: "ela", claim: 4, target: "31", dok: 3, standard: "RI.3.9", type: "grid-match", passage: sourceSet, passageTitle: "A Better Garden Plan / Why Garden Plans Matter", studentDirections: "Read the sources. Then answer the questions that follow.", questionText: "Match each detail to the source where it belongs best.", gridRows: ["The students moved bean poles.", "A plan can show water sources.", "The lettuce needed more light.", "Planning can prevent crowding."], gridColumns: ["Source 1", "Source 2"], correctAnswer: ["0:0", "1:1", "2:0", "3:1"], rubric: "The student matches details to the correct source.", points: 2, explanation: "Source 1 tells what Room 3 did. Source 2 explains garden plans in general." }),
  q(16151, { testType: "pt", subject: "ela", claim: 4, target: "32", dok: 3, standard: "W.3.8", type: "short-answer", passage: sourceSet, passageTitle: "A Better Garden Plan / Why Garden Plans Matter", studentDirections: "Read the sources. Then answer the questions that follow.", questionText: "Explain why planning before planting can help a garden. Use details from both sources.", correctAnswer: "Planning helps because students can place plants where they get sun, water, and space. Source 1 shows students moving bean poles so lettuce is not shaded, and Source 2 says plans can prevent crowding and show water sources.", rubric: "2 points: explains with details from both sources; 1 point: partial explanation or one source.", points: 2, explanation: "A strong answer uses Source 1's example and Source 2's explanation of planning benefits." }),
  q(16152, { testType: "pt", subject: "ela", claim: 2, target: "33", dok: 4, standard: "W.3.2", type: "extended-writing", passage: sourceSet, passageTitle: "A Better Garden Plan / Why Garden Plans Matter", studentDirections: "Read the sources. Then write an informational response.", questionText: "Write an informational response explaining how a garden plan can help students grow plants successfully. Use information from both sources.", correctAnswer: "Student responses will vary. A strong response explains that garden plans help students choose places with enough sun, water, space, and clear paths, using details from both sources.", rubric: "4 points: clear main idea, details from both sources, organization, and conventions; 3 points: mostly complete; 2 points: limited; 1 point: minimal.", points: 4, explanation: "A strong response explains that planning helps plants get what they need and helps students work safely." }),
];

export const practiceTest16Questions: Question[] = [
  ...mathCat,
  ...mathPt,
  ...elaCat,
  ...elaPt,
];
