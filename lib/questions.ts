export interface Question {
  id: number;
  subject: "math" | "ela";
  grade: number;
  claim: number;
  domain?: string;
  target: string;
  dok: number;
  standard: string;
  type: "multiple-choice" | "multi-select" | "text-input" | "two-part";
  testType: "cat" | "pt";
  passage?: string;
  passageTitle?: string;
  passageAuthor?: string;
  questionText: string;
  options?: { label: string; text: string }[];
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
  {
    id: 15,
    testType: "pt",
    subject: "math",
    grade: 3,
    claim: 3,
    domain: "MD",
    target: "F",
    dok: 2,
    standard: "3.MD.A.1",
    type: "multiple-choice",
    questionText:
      "Sam started reading at 2:30 p.m. and finished at 3:15 p.m. Which number line correctly shows the elapsed time?",
    options: [
      { label: "A", text: "A number line showing 30 minutes" },
      { label: "B", text: "A number line showing 45 minutes" },
      { label: "C", text: "A number line showing 1 hour" },
      { label: "D", text: "A number line showing 1 hour 15 minutes" },
    ],
    correctAnswer: "B",
    rubric: "The student identifies the correct number line.",
    points: 1,
  },
  {
    id: 16,
    testType: "pt",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "MD",
    target: "I",
    dok: 2,
    standard: "3.MD.C",
    type: "multiple-choice",
    questionText:
      "A classroom floor is covered with square tiles. The floor is 6 tiles long and 5 tiles wide. Each tile is 1 square foot. What is the area of the classroom floor in square feet?",
    options: [
      { label: "A", text: "30 square feet" },
      { label: "B", text: "22 square feet" },
      { label: "C", text: "11 square feet" },
      { label: "D", text: "35 square feet" },
    ],
    correctAnswer: "A",
    rubric: "The student selects the correct number of square feet.",
    points: 1,
  },
  {
    id: 17,
    testType: "pt",
    subject: "math",
    grade: 3,
    claim: 2,
    domain: "OA",
    target: "A",
    dok: 2,
    standard: "3.OA.D.8",
    type: "text-input",
    questionText:
      "A farmer picked 32 cherries in the morning and 26 cherries in the afternoon. How many cherries did the farmer pick in all?",
    correctAnswer: "58",
    rubric: "The student enters the correct number of cherries.",
    points: 1,
  },
  {
    id: 18,
    testType: "pt",
    subject: "math",
    grade: 3,
    claim: 3,
    domain: "OA",
    target: "E",
    dok: 2,
    standard: "3.OA.B.5",
    type: "multiple-choice",
    questionText:
      'Which statement correctly explains why 4 × 5 = 5 × 4?',
    options: [
      { label: "A", text: "Because both products equal 9" },
      { label: "B", text: "Because multiplication always gives the same answer as addition" },
      {
        label: "C",
        text: "Because changing the order of the numbers being multiplied does not change the product",
      },
      { label: "D", text: "Because 4 and 5 are both less than 10" },
    ],
    correctAnswer: "C",
    rubric: "The student identifies the correct statement.",
    points: 1,
  },
  {
    id: 19,
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
      "There are 15 students going on a field trip. Each car can hold 4 students. What is the fewest number of cars needed for all the students?",
    correctAnswer: "4",
    rubric: "The student enters the fewest number of cars needed.",
    points: 1,
  },
  {
    id: 20,
    testType: "pt",
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "D",
    dok: 2,
    standard: "3.OA.D.8",
    type: "text-input",
    questionText:
      "Lisa has 52 beads. She uses 13 beads to make a bracelet. How many beads does Lisa have left?",
    correctAnswer: "39",
    rubric: "The student enters the correct number of beads.",
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
  {
    id: 115,
    testType: "pt",
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
      'Read this sentence: "In due time, the field gave an abundant harvest." What does "abundant" most likely mean?',
    options: [
      { label: "A", text: "Small" },
      { label: "B", text: "More than enough; plentiful" },
      { label: "C", text: "Late" },
      { label: "D", text: "Expected" },
    ],
    correctAnswer: "B",
    rubric: "The student selects the correct option.",
    points: 1,
    evidenceStatement:
      "The student will interpret the meaning of figurative words and phrases used in context.",
  },
  // Writing / Language items
  {
    id: 116,
    testType: "pt",
    subject: "ela",
    grade: 3,
    claim: 2,
    target: "1bE",
    dok: 2,
    standard: "W.3b, W.5",
    type: "multi-select",
    questionText:
      'Read the paragraph a student wrote:\n\n"Last summer, I went to the beach. I saw some birds. The water was there. I had a sandwich."\n\nSelect TWO sentences that could replace the underlined sentences to add more descriptive details.',
    options: [
      {
        label: "A",
        text: "I watched seagulls swoop down and catch fish in the sparkling waves.",
      },
      { label: "B", text: "There were things at the beach." },
      { label: "C", text: "It was a day." },
      { label: "D", text: "Some animals were flying." },
      {
        label: "E",
        text: "The cool blue water stretched out as far as I could see.",
      },
    ],
    correctAnswer: ["A", "E"],
    rubric: "The student selects the correct two options.",
    points: 1,
    evidenceStatement:
      "The student will revise narrative text by identifying descriptive details.",
  },
  {
    id: 117,
    testType: "pt",
    subject: "ela",
    grade: 3,
    claim: 2,
    target: "9",
    dok: 1,
    standard: "L.1e",
    type: "multi-select",
    questionText:
      'Read the paragraph. Select TWO sentences that have a mistake with verb tense.\n\n"Yesterday, I walk to school with my friend. We talked about our favorite books. Then I sings a song in music class. After school, we played on the swings."',
    options: [
      { label: "A", text: '"Yesterday, I walk to school with my friend."' },
      { label: "B", text: '"We talked about our favorite books."' },
      { label: "C", text: '"Then I sings a song in music class."' },
      { label: "D", text: '"After school, we played on the swings."' },
    ],
    correctAnswer: ["A", "C"],
    rubric: "The student selects the correct two options.",
    points: 1,
    evidenceStatement:
      "The student will apply or edit the use of simple verb tenses in a text.",
  },
  {
    id: 118,
    testType: "pt",
    subject: "ela",
    grade: 3,
    claim: 2,
    target: "9",
    dok: 1,
    standard: "L.2c",
    type: "multi-select",
    questionText:
      'Read the sentences. Select TWO sentences that use commas and quotation marks correctly.\n\n1. "Let\'s go to the park" said Emma.\n2. "Oh, he got me!" I said to Tim.\n3. Mom said "it is time for dinner."\n4. "Yes," he laughed, "he tricked you twice!"',
    options: [
      { label: "A", text: 'Sentence 1: "Let\'s go to the park" said Emma.' },
      { label: "B", text: 'Sentence 2: "Oh, he got me!" I said to Tim.' },
      { label: "C", text: 'Sentence 3: Mom said "it is time for dinner."' },
      {
        label: "D",
        text: 'Sentence 4: "Yes," he laughed, "he tricked you twice!"',
      },
    ],
    correctAnswer: ["B", "D"],
    rubric: "The student selects the correct two options.",
    points: 1,
    evidenceStatement:
      "The student will apply or edit the use of commas and quotation marks in dialogue.",
  },
  {
    id: 119,
    testType: "pt",
    subject: "ela",
    grade: 3,
    claim: 4,
    target: "2",
    dok: 2,
    standard: "W.8",
    type: "multiple-choice",
    questionText:
      'A student is writing a report about dolphins. Which source would be MOST useful for finding facts about dolphins?',
    options: [
      { label: "A", text: "A story about a boy who imagines he is a dolphin" },
      { label: "B", text: "A poem about ocean animals" },
      {
        label: "C",
        text: "An encyclopedia article about dolphins and their habitat",
      },
      { label: "D", text: "A drawing of a dolphin" },
    ],
    correctAnswer: "C",
    rubric: "The student selects the correct option.",
    points: 1,
    evidenceStatement:
      "The student will locate information from a text to support a central idea or key detail related to research.",
  },
  {
    id: 120,
    testType: "pt",
    subject: "ela",
    grade: 3,
    claim: 4,
    target: "4",
    dok: 2,
    standard: "W.8",
    type: "multiple-choice",
    questionText:
      'A student wrote this opinion: "Recess is the most important part of the school day." Which piece of evidence best supports this opinion?',
    options: [
      { label: "A", text: "Recess is usually 20 minutes long." },
      {
        label: "B",
        text: "Studies show that physical activity helps students focus and learn better in class.",
      },
      { label: "C", text: "Some schools have recess before lunch." },
      { label: "D", text: "Students play different games at recess." },
    ],
    correctAnswer: "B",
    rubric: "The student will select evidence to support opinions or ideas.",
    points: 1,
    evidenceStatement:
      "The student will select evidence to support opinions based on evidence collected.",
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
