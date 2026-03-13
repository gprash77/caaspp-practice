import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://dvekfhihyzowaitmznio.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_KEY) {
  console.error("Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required.");
  console.error("Run: SUPABASE_SERVICE_ROLE_KEY=your_key npx tsx supabase/seed.ts");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const SOURCE = "Smarter Balanced Practice Test Scoring Guide, Grade 3";

// ─── Passages ───────────────────────────────────────────────────────────────

const PASSAGE_TREASURE = `Once there was a man who lived with his two young sons on a farm in Vietnam. Since the man had to tend the field, the boys took care of the house. That is, they were supposed to take care of the house.

Often the father returned home to find that nothing had been done—he even had to cook dinner.

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

const PASSAGE_SAP = `The Coleman brothers—Nelson, Ralph, and Harold—step out their front door in Vermont. They feel the wind. They feel the sun on their faces. "Sap could be running this morning," says Nelson.

As they pass 75-year-old sugar-maple trees, sap drips from holes in the trees into metal buckets. They know for sure that today will be a good day for sugaring.

Sap from sugar maples looks like water, but tastes sweet. That's because it has sugar in it. It also contains minerals from the soil. A 50-foot-high sugar maple has nearly two hundred thousand leaves. All these leaves drink in summer sunshine and make sugar. During winter, sugar is stored in the tree. Running sap in the spring contains the sugar that was made in the tree the summer before.

Every spring, the Colemans tap holes into sugar-maple trees, then hang a bucket under each hole to catch the sap. To make syrup, the sap is heated in big open pans so that most of the water will boil away. The Colemans say it takes about thirty-five gallons of sap to make one gallon of maple syrup.

More than a hundred years ago, scientist Charles Darwin wrote that sap flow was a "most mysterious subject." Since then, many people have studied how sap flows. Much of the research has been done at the University of Vermont, where sap is still being studied.

Nelson Coleman and his brothers have made maple syrup all their lives. It is a family tradition. They don't worry too much about why the sap is running in their trees this morning. They're just glad it is.

The Iroquois Legend of Woksis and Maple Syrup

According to legend, an Iroquois chief named Woksis yanked his tomahawk out of a maple tree one spring day. A bowl sat by the trunk of that tree. As the day warmed, sap dripped from the gash into the bowl. When Woksis's wife saw the sap in the bowl, she thought it was water. She used it to cook their meal. The sap boiled away, leaving maple syrup. When Woksis tasted the sweetened meat, he loved it. So, boiling sap to make maple syrup began.

What Makes Sap Run?

For years, people have thought that sap rises up from the roots of the sugar-maple tree. It doesn't. "During the time when sap flows from tap holes, the bulk flow of sap is downward," says Dr. Tim Perkins. He is a scientist at the University of Vermont.

How does sap flow? During cold nights, maple trees freeze solid. That's when water rises into the trunk and branches. The water forms frost inside tiny hollow spaces within the tree. In the morning, this frost melts and becomes sap, which flows down the tree.

Scientists say that anyone who cuts down a sugar-maple tree in freezing weather can see this is true. When the weather warms up, sap will flow from the cut end of the trunk—not from the stump.`;

// ─── Question definitions ───────────────────────────────────────────────────

interface Question {
  subject: string;
  grade: number;
  claim: number;
  domain: string | null;
  target: string;
  dok: number;
  standard: string;
  type: string;
  test_type: string;
  passage: string | null;
  passage_title: string | null;
  passage_author: string | null;
  student_directions: string | null;
  question_text: string;
  options: object | null;
  grid_rows: string[] | null;
  grid_columns: string[] | null;
  correct_answer: unknown;
  rubric: string;
  points: number;
  evidence_statement: string | null;
  source: string;
}

const questions: Question[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // MATH QUESTIONS (31 items → 25 representable)
  // ═══════════════════════════════════════════════════════════════════════════

  // Math #1
  {
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "D",
    dok: 2,
    standard: "3.OA.D.8",
    type: "text-input",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "Megan baked 28 sugar cookies and 24 chocolate chip cookies. Enter the total number of cookies Megan baked in all.",
    options: null,
    grid_rows: null,
    grid_columns: null,
    correct_answer: "52",
    rubric:
      "(1 point) The student enters the correct number of cookies.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #2
  {
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "NBT",
    target: "E",
    dok: 1,
    standard: "3.NBT.A.2",
    type: "text-input",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "What unknown number makes this equation true? \u25a1 = 881 \u2212 72",
    options: null,
    grid_rows: null,
    grid_columns: null,
    correct_answer: "809",
    rubric: "(1 point) The student enters the correct number.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #3
  {
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "A",
    dok: 1,
    standard: "3.OA.A.3",
    type: "text-input",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "There are 5 rows of trading cards with 3 trading cards in each row. How many trading cards are there?",
    options: null,
    grid_rows: null,
    grid_columns: null,
    correct_answer: "15",
    rubric:
      "(1 point) The student enters the correct number of trading cards.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #4
  {
    subject: "math",
    grade: 3,
    claim: 3,
    domain: "OA",
    target: "F",
    dok: 2,
    standard: "3.OA.B",
    type: "multiple-choice",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "Which expression is equal to 6 \u00d7 3, and why?",
    options: [
      {
        label: "A",
        text: "6 + 3, because the numbers are in the same order",
      },
      {
        label: "B",
        text: "6 \u00f7 3, because division and multiplication are inverse operations",
      },
      {
        label: "C",
        text: "3 + 6, because the order of the numbers does not matter in addition",
      },
      {
        label: "D",
        text: "3 \u00d7 6, because the order of the numbers does not matter in multiplication",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "D",
    rubric:
      "(1 point) The student identifies the correct expression and reason.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #5
  {
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "A",
    dok: 1,
    standard: "3.OA.A.3",
    type: "text-input",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "Jack has 24 fish. He puts them into 4 bowls. Each bowl has an equal number of fish. How many fish are in each bowl?",
    options: null,
    grid_rows: null,
    grid_columns: null,
    correct_answer: "6",
    rubric:
      "(1 point) The student enters the correct number of fish.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #6
  {
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "MD",
    target: "G",
    dok: 1,
    standard: "3.MD.A.1",
    type: "multiple-choice",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "Look at the time on this clock. [Clock showing 6:42] Select the time, to the nearest minute, shown on the clock.",
    options: [
      { label: "A", text: "7:42" },
      { label: "B", text: "8:33" },
      { label: "C", text: "9:33" },
      { label: "D", text: "6:42" },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "D",
    rubric: "(1 point) The student selects the correct time.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #7
  {
    subject: "math",
    grade: 3,
    claim: 2,
    domain: "NBT",
    target: "C",
    dok: 2,
    standard: "3.NBT.A.2",
    type: "multiple-choice",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "The table shows the number of books in four third-grade classrooms. One of the teachers is Tim's teacher, and one of the teachers is Sue's teacher.\n\n| Teacher | Number of Books |\n|---------|----------------|\n| Mr. Smith | 136 |\n| Ms. Rose | 148 |\n| Mr. Brown | 172 |\n| Mrs. Lee | 122 |\n\nTim's teacher has 26 more books than Sue's teacher. Who is Tim's teacher?",
    options: [
      { label: "A", text: "Mr. Smith" },
      { label: "B", text: "Ms. Rose" },
      { label: "C", text: "Mr. Brown" },
      { label: "D", text: "Mrs. Lee" },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "B",
    rubric: "(1 point) The student selects the correct teacher.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #8
  {
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "MD",
    target: "J",
    dok: 1,
    standard: "3.MD.D.8",
    type: "text-input",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "The side lengths of a shape are shown: 2 ft, 12 ft, 8 ft, 20 ft, 8 ft, 10 ft. (An L-shaped figure.) Enter the perimeter, in feet, of the shape.",
    options: null,
    grid_rows: null,
    grid_columns: null,
    correct_answer: "60",
    rubric:
      "(1 point) The student enters the correct perimeter of the shape.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #9
  {
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "NF",
    target: "F",
    dok: 1,
    standard: "3.NF.A.3",
    type: "text-input",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "What number goes in the box to make the equation true? \u25a1/1 = 5",
    options: null,
    grid_rows: null,
    grid_columns: null,
    correct_answer: "5",
    rubric: "(1 point) The student enters a correct number.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #10
  {
    subject: "math",
    grade: 3,
    claim: 3,
    domain: "NF",
    target: "D",
    dok: 2,
    standard: "3.NF.A.1",
    type: "multiple-choice",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "Jamie drew this shape. [Rectangle divided into unequal parts with one part shaded] She says, 'I divided the shape into 8 parts. I shaded 1 part. So 1/8 of the shape is shaded.' Is Jamie correct? Select the statement that explains why.",
    options: [
      {
        label: "A",
        text: "Yes, because there is 1 large piece shaded.",
      },
      {
        label: "B",
        text: "Yes, because the shape is divided into 8 parts.",
      },
      {
        label: "C",
        text: "No, because the 8 parts should be the same size.",
      },
      {
        label: "D",
        text: "No, because there should be 1 medium piece shaded.",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "C",
    rubric: "(1 point) The student selects the correct statement.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #11
  {
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "A",
    dok: 1,
    standard: "3.OA.A.4",
    type: "text-input",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "What unknown number makes this equation true? 6 \u00d7 8 = \u25a1",
    options: null,
    grid_rows: null,
    grid_columns: null,
    correct_answer: "48",
    rubric: "(1 point) The student enters the correct number.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #12
  {
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "B",
    dok: 1,
    standard: "3.OA.B.6",
    type: "multiple-choice",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "Which equation has the same unknown value as 30 \u00f7 \u25a1 = 6?",
    options: [
      { label: "A", text: "6 \u00d7 30 = \u25a1" },
      { label: "B", text: "6 \u00f7 30 = \u25a1" },
      { label: "C", text: "6 \u00d7 \u25a1 = 30" },
      { label: "D", text: "6 \u00f7 \u25a1 = 30" },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "C",
    rubric: "(1 point) The student selects the correct equation.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #13
  {
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "D",
    dok: 2,
    standard: "3.OA.D.9",
    type: "text-input",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "Part of a multiplication table is shown.\n\n| 12 | 15 | 18 | 21 |\n| 16 | [?] | 24 | 28 |\n| 20 | [?] | 30 | 35 |\n| 24 | 30 | 36 | 42 |\n\nWhat two numbers correctly complete the pattern in the table? Enter your answers in the table.",
    options: null,
    grid_rows: null,
    grid_columns: null,
    correct_answer: "20, 25",
    rubric: "(1 point) The student enters the correct numbers.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #14
  {
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "C",
    dok: 1,
    standard: "3.OA.C.7",
    type: "grid-match",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "Decide whether each equation is true or false. Click True or False for each equation.",
    options: null,
    grid_rows: [
      "8 \u00d7 2 = 4 \u00d7 6",
      "7 \u00d7 3 = 3 \u00d7 7",
      "5 \u00d7 6 = 3 \u00d7 10",
    ],
    grid_columns: ["True", "False"],
    correct_answer: ["0:1", "1:0", "2:0"],
    rubric:
      "(1 point) The student correctly identifies the true equations.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #15
  {
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "C",
    dok: 1,
    standard: "3.OA.C.7",
    type: "text-input",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "Enter the unknown numbers that make each equation true. Enter the first unknown number in the first box. Enter the second unknown number in the second box.\n5 \u00d7 8 = \u25a1\n8 \u00d7 7 = \u25a1",
    options: null,
    grid_rows: null,
    grid_columns: null,
    correct_answer: "40, 56",
    rubric: "(1 point) The student enters the correct products.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #16
  {
    subject: "math",
    grade: 3,
    claim: 3,
    domain: "MD",
    target: "F",
    dok: 2,
    standard: "3.MD.A.1",
    type: "multiple-choice",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "Paul made a number line to show the times he started reading and finished reading. [Number line from 3:30 p.m. to Finish with 6 equal intervals] Paul read for 45 minutes. Which number line shows 4:00 p.m. in the correct place on Paul's number line?",
    options: [
      {
        label: "A",
        text: "3:30 p.m. and 4:00 p.m. are 1 interval apart",
      },
      {
        label: "B",
        text: "3:30 p.m. and 4:00 p.m. are 2 intervals apart",
      },
      {
        label: "C",
        text: "3:30 p.m. and 4:00 p.m. are 3 intervals apart",
      },
      {
        label: "D",
        text: "3:30 p.m. and 4:00 p.m. are 5 intervals apart",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "B",
    rubric:
      "(1 point) The student identifies the correct number line.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #17
  {
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "MD",
    target: "I",
    dok: 2,
    standard: "3.MD.C",
    type: "multiple-choice",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "City planners want to build a garden by the city library. There are 2 possible spaces for the garden. The planners draw models of the spaces on a grid. Each unit length on a model equals a length of 1 foot. [Grid showing Space A and Space B] How much more area does space A have than space B?",
    options: [
      { label: "A", text: "5 square feet" },
      { label: "B", text: "25 square feet" },
      { label: "C", text: "30 square feet" },
      { label: "D", text: "60 square feet" },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "A",
    rubric:
      "(1 point) The student selects the correct number of square feet.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #18
  {
    subject: "math",
    grade: 3,
    claim: 2,
    domain: "OA",
    target: "A",
    dok: 2,
    standard: "3.OA.D.8",
    type: "text-input",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "There are 9 cherry trees.\n\u2022 Kim picks 8 cherries from each tree.\n\u2022 Kim eats 14 of the cherries she picked.\nEnter the number of cherries Kim has left.",
    options: null,
    grid_rows: null,
    grid_columns: null,
    correct_answer: "58",
    rubric:
      "(1 point) The student enters the correct number of cherries.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #19
  {
    subject: "math",
    grade: 3,
    claim: 3,
    domain: "OA",
    target: "E",
    dok: 2,
    standard: "3.OA.B.5",
    type: "multiple-choice",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "Libby said the answer to the problem 5 \u00d7 2 \u00d7 3 is 25. Her work is shown.\n\u2022 Step 1: 5 \u00d7 2 = 10\n\u2022 Step 2: 5 \u00d7 3 = 15\n\u2022 Step 3: 10 + 15 = 25\nWhich is true?",
    options: [
      {
        label: "A",
        text: "Libby's answer is correct because 10 + 15 = 25.",
      },
      {
        label: "B",
        text: "Libby's answer is correct because 2 + 3 = 5 and 5 \u00d7 5 = 25.",
      },
      {
        label: "C",
        text: "Libby's answer is not correct because she multiplied 5 \u00d7 3 and 5 \u00d7 2.",
      },
      {
        label: "D",
        text: "Libby's answer is not correct because she should have multiplied 10 \u00d7 15.",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "C",
    rubric:
      "(1 point) The student identifies the correct statement.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #20
  {
    subject: "math",
    grade: 3,
    claim: 4,
    domain: "OA",
    target: "C",
    dok: 2,
    standard: "3.OA.D.8",
    type: "text-input",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "Jamal's mother plans a trip for the baseball team.\n\u2022 There are 14 players on the team.\n\u2022 There are 5 parents going on the trip.\n\u2022 The players and parents will all travel together in cars.\n\u2022 Each car can hold a total of 5 people.\n\u2022 There must be at least 1 parent in each car.\nWhat is the fewest number of cars they will need?",
    options: null,
    grid_rows: null,
    grid_columns: null,
    correct_answer: "4",
    rubric:
      "(1 point) The student enters the fewest number of cars needed.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #22
  {
    subject: "math",
    grade: 3,
    claim: 2,
    domain: "OA",
    target: "C",
    dok: 2,
    standard: "3.OA.A, 2.OA.C",
    type: "grid-match",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "Jan divides 36 pens into groups.\n\u2022 Each group has the same number of pens.\n\u2022 Jan uses all of the pens.\nFor each number of pens in a group, click Yes or No to show if Jan can create groups that each have that number of pens.",
    options: null,
    grid_rows: [
      "2 pens in each group",
      "3 pens in each group",
      "5 pens in each group",
      "6 pens in each group",
      "10 pens in each group",
    ],
    grid_columns: ["Yes", "No"],
    correct_answer: ["0:0", "1:0", "2:1", "3:0", "4:1"],
    rubric:
      "(1 point) The student correctly identifies which groups can be formed using all the pens.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #23
  {
    subject: "math",
    grade: 3,
    claim: 4,
    domain: "MD",
    target: "D",
    dok: 3,
    standard: "3.MD.B.3",
    type: "text-input",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "Jenna made a picture graph in which each star represents some number of students. She forgot to complete the key.\n\nFavorite Color:\nRed: \u2605\u2605\nBlue: \u2605\u2605\u2605\u2605\nYellow: \u2605\u2605\u2605\u2605\nGreen: \u2605\u2605\u2605\u2605\n\nThe difference between the number of students who voted for blue and the number of students who voted for red is greater than 5 but less than 9. Enter a possible number of students that each star could represent.",
    options: null,
    grid_rows: null,
    grid_columns: null,
    correct_answer: "3 or 4",
    rubric:
      "(1 point) The student enters a possible number of students each star could represent.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #25
  {
    subject: "math",
    grade: 3,
    claim: 4,
    domain: "OA",
    target: "E",
    dok: 2,
    standard: "3.OA.D.8",
    type: "multi-select",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "Kaden has 7 bags of animal toys. Each bag has these animal toys in it.\n\u2022 1 whale toy\n\u2022 5 dolphin toys\n\u2022 2 turtle toys\nHow many animal toys does Kaden have altogether? Select all of the equations that show how to find the total number, t, of animal toys.",
    options: [
      { label: "A", text: "7 \u00d7 8 = t" },
      { label: "B", text: "7 + 1 + 5 + 2 = t" },
      { label: "C", text: "7 \u00d7 (1 + 5 + 2) = t" },
      { label: "D", text: "7 + (1 \u00d7 5 \u00d7 2) = t" },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: ["A", "C"],
    rubric:
      "(1 point) The student identifies the correct equations.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #27
  {
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "D",
    dok: 2,
    standard: "3.OA.D.8",
    type: "text-input",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "Jana has 107 wooden beads and 68 glass beads. How many more wooden beads than glass beads does Jana have? Enter your answer in the response box.",
    options: null,
    grid_rows: null,
    grid_columns: null,
    correct_answer: "39",
    rubric:
      "(1 point) The student enters the correct number of beads.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // Math #31
  {
    subject: "math",
    grade: 3,
    claim: 1,
    domain: "OA",
    target: "B",
    dok: 1,
    standard: "3.OA.B.5",
    type: "grid-match",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "Decide whether each expression is equal to 4 \u00d7 12. Select Yes or No for each expression.",
    options: null,
    grid_rows: [
      "4 \u00d7 (10 + 2)",
      "(4 \u00d7 10) + 2",
      "4 + (10 \u00d7 2)",
    ],
    grid_columns: ["Yes", "No"],
    correct_answer: ["0:0", "1:1", "2:1"],
    rubric:
      "(1 point) The student correctly identifies the equal expressions.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ELA QUESTIONS
  // ═══════════════════════════════════════════════════════════════════════════

  // ELA #1
  {
    subject: "ela",
    grade: 3,
    claim: 1,
    domain: null,
    target: "1",
    dok: 2,
    standard: "RL.1",
    type: "multiple-choice",
    test_type: "cat",
    passage: PASSAGE_TREASURE,
    passage_title: "Treasure in the Field",
    passage_author: "Marilyn Bolchunos",
    student_directions: null,
    question_text:
      "Which detail from the passage best explains why the father must stop working in the field?",
    options: [
      {
        label: "A",
        text: "The father needs to return home to cook the dinner.",
      },
      {
        label: "B",
        text: "The father asks the neighbor to do the work in the fields for him.",
      },
      {
        label: "C",
        text: "The father's sons depend on him to stay home and care for them.",
      },
      {
        label: "D",
        text: "The father's age makes it too difficult to do farm work any longer.",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "D",
    rubric: "(1 point) The student selects the correct option.",
    points: 1,
    evidence_statement:
      "The student will identify textual evidence to support a given inference based on the text.",
    source: SOURCE,
  },

  // ELA #2
  {
    subject: "ela",
    grade: 3,
    claim: 1,
    domain: null,
    target: "3",
    dok: 2,
    standard: "RL.4",
    type: "multiple-choice",
    test_type: "cat",
    passage: PASSAGE_TREASURE,
    passage_title: "Treasure in the Field",
    passage_author: "Marilyn Bolchunos",
    student_directions: null,
    question_text:
      "Read the sentences from the passage.\nDay after day they dug. Their neighbor was astonished to see how long and hard the young men worked.\nWhat does the word astonished most likely mean?",
    options: [
      { label: "A", text: "disappointed" },
      { label: "B", text: "discovered" },
      { label: "C", text: "satisfied" },
      { label: "D", text: "surprised" },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "D",
    rubric: "(1 point) The student selects the correct option.",
    points: 1,
    evidence_statement:
      "The student will determine the meaning of a word or phrase based on its context.",
    source: SOURCE,
  },

  // ELA #3
  {
    subject: "ela",
    grade: 3,
    claim: 1,
    domain: null,
    target: "4",
    dok: 3,
    standard: "RL.3",
    type: "two-part",
    test_type: "cat",
    passage: PASSAGE_TREASURE,
    passage_title: "Treasure in the Field",
    passage_author: "Marilyn Bolchunos",
    student_directions: null,
    question_text:
      "Part A: Which statement about the boys is supported by the passage?\nPart B: Which sentence from the passage best supports your answer in part A.",
    options: {
      partA: [
        {
          label: "A",
          text: "The boys did not share the work equally.",
        },
        {
          label: "B",
          text: "The boys did not know how to plant a field of rice.",
        },
        {
          label: "C",
          text: "The young boys wished to surprise their father with a special dinner.",
        },
        {
          label: "D",
          text: "The young boys preferred to sit in the house instead of working outside.",
        },
      ],
      partB: [
        {
          label: "A",
          text: "The sons promised and hurried out to begin.",
        },
        {
          label: "B",
          text: "As the years went by, it became clear even to their father that the boys were lazy.",
        },
        {
          label: "C",
          text: "At last, the entire field had been dug, but no treasure had been found.",
        },
        {
          label: "D",
          text: "The brothers moped around with their heads down.",
        },
      ],
    },
    grid_rows: null,
    grid_columns: null,
    correct_answer: "D, B",
    rubric:
      "(1 point) The student selects the correct option for part A and the correct option in part B.",
    points: 1,
    evidence_statement:
      "The student will form a conclusion about a literary text and identify details within the text that support that conclusion.",
    source: SOURCE,
  },

  // ELA #4
  {
    subject: "ela",
    grade: 3,
    claim: 1,
    domain: null,
    target: "1",
    dok: 1,
    standard: "RL.1",
    type: "multiple-choice",
    test_type: "cat",
    passage: PASSAGE_TREASURE,
    passage_title: "Treasure in the Field",
    passage_author: "Marilyn Bolchunos",
    student_directions: null,
    question_text:
      "Which detail from the passage best shows that the old man's sons are lazy?",
    options: [
      {
        label: "A",
        text: "Since the man had to tend the field, the boys took care of the house.",
      },
      {
        label: "B",
        text: '"Oh, they would," the father replied again, "but they are still young."',
      },
      {
        label: "C",
        text: "Though they sometimes tended the field with him, they always made excuses to go home early.",
      },
      {
        label: "D",
        text: "The sons were sad, for they not only depended on their father, but they also loved him.",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "C",
    rubric: "(1 point) The student selects the correct option.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // ELA #5
  {
    subject: "ela",
    grade: 3,
    claim: 1,
    domain: null,
    target: "6",
    dok: 3,
    standard: "RL.5",
    type: "multi-select",
    test_type: "cat",
    passage: PASSAGE_TREASURE,
    passage_title: "Treasure in the Field",
    passage_author: "Marilyn Bolchunos",
    student_directions: null,
    question_text:
      "What is the most likely reason the author included the final sentence in the passage? Pick two choices.",
    options: [
      {
        label: "A",
        text: "to show that the old man's plan had worked",
      },
      {
        label: "B",
        text: "to show that the boys are mad about being tricked",
      },
      {
        label: "C",
        text: "to show that the boys are happy about earning money",
      },
      {
        label: "D",
        text: "to show that the old man does not want the boys to know the secret",
      },
      {
        label: "E",
        text: "to show that the old man wants his sons to look at something in a new way",
      },
      {
        label: "F",
        text: "to show that the old man is mad at his boys for not helping him for years",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: ["A", "E"],
    rubric:
      "(1 point) The student selects the two correct options.",
    points: 1,
    evidence_statement:
      "The student will analyze or interpret why the author structured elements within the text in a certain manner and the impact of that structure on meaning.",
    source: SOURCE,
  },

  // ELA #6
  {
    subject: "ela",
    grade: 3,
    claim: 1,
    domain: null,
    target: "5",
    dok: 3,
    standard: "RL.3",
    type: "multiple-choice",
    test_type: "cat",
    passage: PASSAGE_TREASURE,
    passage_title: "Treasure in the Field",
    passage_author: "Marilyn Bolchunos",
    student_directions: null,
    question_text:
      "Which sentence is most likely true about both sons in the passage?",
    options: [
      {
        label: "A",
        text: "Both wish that they will always live on the farm.",
      },
      {
        label: "B",
        text: "Both wish to have more treasure than anyone else.",
      },
      {
        label: "C",
        text: "Both learn that treasure can have more than one meaning.",
      },
      {
        label: "D",
        text: "Both want to teach their father how to grow rice in the field.",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "C",
    rubric: "(1 point) The student selects the correct option.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // ELA #7
  {
    subject: "ela",
    grade: 3,
    claim: 1,
    domain: null,
    target: "6",
    dok: 2,
    standard: "RL.5",
    type: "multiple-choice",
    test_type: "cat",
    passage: PASSAGE_TREASURE,
    passage_title: "Treasure in the Field",
    passage_author: "Marilyn Bolchunos",
    student_directions: null,
    question_text:
      "Which of these best describes why the author used dialogue in the passage?",
    options: [
      {
        label: "A",
        text: "to describe how the sons and the old man work together",
      },
      {
        label: "B",
        text: "to describe how the old man shares his secret with his sons",
      },
      {
        label: "C",
        text: "to explain why the characters behave the way they do",
      },
      {
        label: "D",
        text: "to explain why the neighbor was interested in the father's fields",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "C",
    rubric: "(1 point) The student selects the correct option.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // ELA #8
  {
    subject: "ela",
    grade: 3,
    claim: 1,
    domain: null,
    target: "7",
    dok: 2,
    standard: "RL.4",
    type: "multiple-choice",
    test_type: "cat",
    passage: PASSAGE_TREASURE,
    passage_title: "Treasure in the Field",
    passage_author: "Marilyn Bolchunos",
    student_directions: null,
    question_text:
      "Read the sentence from the passage.\nIt became clear, even to their father, that the boys were lazy.\nWhat does the phrase even to their father tell the reader about the story?",
    options: [
      {
        label: "A",
        text: "It took the father a long time to teach the boys a new kind of work.",
      },
      {
        label: "B",
        text: "It took the father longer than others to understand his sons were lazy.",
      },
      {
        label: "C",
        text: "The father knew all along that his boys did not like to work on the family farm.",
      },
      {
        label: "D",
        text: "The father knew many other people who could be trained to help him on the farm.",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "B",
    rubric: "(1 point) The student selects the correct option.",
    points: 1,
    evidence_statement:
      "The student will interpret the meaning of figurative words and phrases used in context and analyze its use in the text.",
    source: SOURCE,
  },

  // ELA #9
  {
    subject: "ela",
    grade: 3,
    claim: 1,
    domain: null,
    target: "8",
    dok: 2,
    standard: "RI.1",
    type: "multiple-choice",
    test_type: "cat",
    passage: PASSAGE_SAP,
    passage_title: "Sap's Running",
    passage_author: "Stephen R. Swinburne",
    student_directions: null,
    question_text:
      "Which sentence from the passage supports the idea that the Coleman brothers have experience with making maple syrup?",
    options: [
      {
        label: "A",
        text: '"The Coleman brothers\u2014Nelson, Ralph, and Harold\u2014step out their front door in Vermont."',
      },
      {
        label: "B",
        text: '"As they pass 75-year-old sugar-maple trees, sap drips from holes in the trees into metal buckets."',
      },
      {
        label: "C",
        text: '"Every spring, the Colemans tap holes into sugar-maple trees, then hang a bucket under each hole to catch the sap."',
      },
      {
        label: "D",
        text: '"They don\'t worry too much about why the sap is running in their trees this morning."',
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "C",
    rubric: "(1 point) The student selects the correct option.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // ELA #10
  {
    subject: "ela",
    grade: 3,
    claim: 1,
    domain: null,
    target: "11",
    dok: 3,
    standard: "RI.3",
    type: "two-part",
    test_type: "cat",
    passage: PASSAGE_SAP,
    passage_title: "Sap's Running",
    passage_author: "Stephen R. Swinburne",
    student_directions: null,
    question_text:
      "Part A: Click on the sentence that gives the best conclusion about sugar-maple trees.\nPart B: Click on the sentence from the passage that best supports your answer in part A.",
    options: {
      partA: [
        {
          label: "A",
          text: "Sugar maple trees grow best in cold weather.",
        },
        {
          label: "B",
          text: "Most sugar maple trees are about 50 feet tall.",
        },
        {
          label: "C",
          text: "The sap in sugar maple trees begins flowing in early spring.",
        },
        {
          label: "D",
          text: "Vermont has the best weather for growing sugar maple trees.",
        },
      ],
      partB: [
        {
          label: "A",
          text: "A 50-foot-high sugar maple has nearly two hundred thousand leaves.",
        },
        {
          label: "B",
          text: "The Coleman brothers\u2014Nelson, Ralph, and Harold\u2014step out their front door in Vermont.",
        },
        {
          label: "C",
          text: "Scientists say that anyone who cuts down a sugar-maple tree in freezing weather can see this is true.",
        },
        {
          label: "D",
          text: "Every spring, the Colemans tap holes into the sugar-maple trees, then hang a bucket under each hole to catch the sap.",
        },
      ],
    },
    grid_rows: null,
    grid_columns: null,
    correct_answer: "C, D",
    rubric:
      "(1 point) The student selects the correct option in Part A and the correct option in Part B.",
    points: 1,
    evidence_statement:
      "The student will form a conclusion about an informational text and identify details within the text that support that conclusion.",
    source: SOURCE,
  },

  // ELA #11
  {
    subject: "ela",
    grade: 3,
    claim: 1,
    domain: null,
    target: "12",
    dok: 3,
    standard: "RI.1",
    type: "multiple-choice",
    test_type: "cat",
    passage: PASSAGE_SAP,
    passage_title: "Sap's Running",
    passage_author: "Stephen R. Swinburne",
    student_directions: null,
    question_text:
      'The author states that many years ago, sap flow was a "most mysterious subject." How does the author explain that this is no longer true?',
    options: [
      {
        label: "A",
        text: "by describing syrup-making as a family tradition",
      },
      {
        label: "B",
        text: "by providing details about how sap becomes syrup",
      },
      {
        label: "C",
        text: "by stating that sap has been studied for many years",
      },
      {
        label: "D",
        text: "by mentioning that sap contains sugar and other minerals",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "C",
    rubric: "(1 point) The student selects the correct option.",
    points: 1,
    evidence_statement:
      "The student will distinguish the author's point of view within a text.",
    source: SOURCE,
  },

  // ELA #12
  {
    subject: "ela",
    grade: 3,
    claim: 1,
    domain: null,
    target: "12",
    dok: 3,
    standard: "RI.1",
    type: "multiple-choice",
    test_type: "cat",
    passage: PASSAGE_SAP,
    passage_title: "Sap's Running",
    passage_author: "Stephen R. Swinburne",
    student_directions: null,
    question_text:
      'Read the sentences from the passage.\nMore than a hundred years ago, scientist Charles Darwin wrote that sap flow was a "most mysterious subject." Since then, many people have studied how sap flows. Much of the research has been done at the University of Vermont, where sap is still being studied.\nWhat does this paragraph show about the author\'s point of view?',
    options: [
      {
        label: "A",
        text: "He believes that no one will ever be able to solve the mystery of how sap flows.",
      },
      {
        label: "B",
        text: "He believes the way sap is turned into syrup is difficult to understand and the University helps.",
      },
      {
        label: "C",
        text: "He believes the way sap is formed and how it runs is still being studied at the University of Vermont.",
      },
      {
        label: "D",
        text: "He believes that Charles Darwin would have been able to help the University in figuring out how sap runs.",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "C",
    rubric: "(1 point) The student selects the correct option.",
    points: 1,
    evidence_statement:
      "The student will analyze the interaction between elements of a text within a text.",
    source: SOURCE,
  },

  // ELA #13
  {
    subject: "ela",
    grade: 3,
    claim: 1,
    domain: null,
    target: "13",
    dok: 2,
    standard: "RI.5",
    type: "multi-select",
    test_type: "cat",
    passage: PASSAGE_SAP,
    passage_title: "Sap's Running",
    passage_author: "Stephen R. Swinburne",
    student_directions: null,
    question_text:
      "What is the most likely reason the author included the legend in the passage? Pick two choices.",
    options: [
      {
        label: "A",
        text: "to make the idea of tasting sap seem fun",
      },
      {
        label: "B",
        text: "to provide details about the Iroquois way of life",
      },
      {
        label: "C",
        text: "to explain how people discovered how to make syrup",
      },
      {
        label: "D",
        text: "to show sap has been used to make syrup for many years",
      },
      {
        label: "E",
        text: "to provide information that shows that sap is a good sweetener for food",
      },
      {
        label: "F",
        text: "to show how the Iroquois used to make syrup and how syrup is made today",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: ["C", "D"],
    rubric:
      "(1 point) The student selects the correct two options.",
    points: 1,
    evidence_statement:
      "The student will analyze or interpret why the author structured elements within the texts in a certain manner and the impact of that structure on meaning.",
    source: SOURCE,
  },

  // ELA #14
  {
    subject: "ela",
    grade: 3,
    claim: 1,
    domain: null,
    target: "14",
    dok: 2,
    standard: "L.5a",
    type: "multiple-choice",
    test_type: "cat",
    passage: PASSAGE_SAP,
    passage_title: "Sap's Running",
    passage_author: "Stephen R. Swinburne",
    student_directions: null,
    question_text:
      "Read the sentences from the passage.\nNelson Coleman and his brothers have made maple syrup all their lives. It is a family tradition.\nWhat is a family tradition?",
    options: [
      { label: "A", text: "the way that some families act" },
      { label: "B", text: "a breakfast food that a family eats" },
      {
        label: "C",
        text: "a place where a family likes to go together",
      },
      {
        label: "D",
        text: "something that a family does year after year",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "D",
    rubric: "(1 point) The student selects the correct option.",
    points: 1,
    evidence_statement:
      "The student will determine the meaning of a word or phrase based on its context in an informational text.",
    source: SOURCE,
  },

  // ELA #15
  {
    subject: "ela",
    grade: 3,
    claim: 1,
    domain: null,
    target: "14",
    dok: 2,
    standard: "L.5a",
    type: "multiple-choice",
    test_type: "cat",
    passage: PASSAGE_SAP,
    passage_title: "Sap's Running",
    passage_author: "Stephen R. Swinburne",
    student_directions: null,
    question_text:
      "Read the sentence from the passage.\nAll these leaves drink in summer sunshine and make sugar.\nWhich statement best describes what this sentence means?",
    options: [
      { label: "A", text: "Leaves grow larger in the summer." },
      { label: "B", text: "Leaves use sunlight to make sugar." },
      {
        label: "C",
        text: "Summer is the best time to collect sugar.",
      },
      {
        label: "D",
        text: "Trees with many leaves make more sugar.",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "B",
    rubric: "(1 point) The student selects the correct option.",
    points: 1,
    evidence_statement:
      "The student will interpret the meaning of figurative words and phrases used in context and analyze its use in the text.",
    source: SOURCE,
  },

  // ELA #16
  {
    subject: "ela",
    grade: 3,
    claim: 2,
    domain: null,
    target: "1bE",
    dok: 2,
    standard: "W.3b, W.5",
    type: "multi-select",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "Ellen is writing a story for her class about a day at the beach. She wants to revise her story to use more descriptive words. Read the draft and complete the task that follows.\n\n[Story about Ellen and Dad at beach]\n\nSelect two of the choices that have the best descriptive sentences to replace 'Dad read and Ellen played' and 'She looked at him'.",
    options: [
      {
        label: "A",
        text: 'Dad enjoyed relaxing with his new book while Ellen built a sandcastle. / She gave him a look that said, "I want you to spend time with me."',
      },
      {
        label: "B",
        text: 'Dad helped Ellen build a sandcastle. / She gave him a look that said, "I\'m glad you like your book."',
      },
      {
        label: "C",
        text: "Dad read a book to Ellen and then they swam. / She looked at the pictures in the book.",
      },
      {
        label: "D",
        text: "Dad read for a while and then built a sandcastle. / She looked at the warm, bubbly waves.",
      },
      {
        label: "E",
        text: 'Dad had a wonderful time reading while Ellen worked on her giant sandcastle. / She gave him a look that said, "It\'s time to have some fun, now!"',
      },
      {
        label: "F",
        text: 'Dad decided that he did not like his book. / She gave him a look that said, "You are the best dad."',
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: ["A", "E"],
    rubric:
      "(1 point) The student selects the correct two options.",
    points: 1,
    evidence_statement:
      "The student will revise narrative text by identifying descriptive details that convey events/experiences.",
    source: SOURCE,
  },

  // ELA #17
  {
    subject: "ela",
    grade: 3,
    claim: 2,
    domain: null,
    target: "3bE",
    dok: 2,
    standard: "W.2b, W.5",
    type: "multi-select",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "A student is writing a report for social studies class about the state of Alaska. The student wants to revise the draft to make sure it has enough details. Read this portion of the report and complete the task that follows.\n\n[Report about Alaska with underlined sentence: 'A lot of different animals live in Alaska.']\n\nMy notes on Alaska:\n\u2022 Black bears, brown bears, moose, musk ox, and whales are just a few animals that call Alaska home.\n\u2022 The capital of Alaska is Juneau.\n\u2022 There are 70,000 sea otters living in the waters of Alaska.\n\u2022 Alaska did not become a state until 1959.\n\u2022 The mountains in Alaska have the coldest temperatures in the United States.\n\u2022 Alaska is only 55 miles away from Russia.\n\nChoose the two sentences from the student's notes that add more facts to the information given in the underlined sentence.",
    options: [
      { label: "A", text: "The capital of Alaska is Juneau." },
      {
        label: "B",
        text: "Alaska did not become a state until 1959.",
      },
      {
        label: "C",
        text: "Alaska is only 55 miles away from Russia.",
      },
      {
        label: "D",
        text: "There are 70,000 sea otters living in the waters of Alaska.",
      },
      {
        label: "E",
        text: "The mountains in Alaska have the coldest temperatures in the United States.",
      },
      {
        label: "F",
        text: "Black bears, brown bears, moose, musk ox, and whales are just a few animals that call Alaska home.",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: ["D", "F"],
    rubric:
      "(1 point) The student selects the correct two options.",
    points: 1,
    evidence_statement:
      "The student will revise complex informational/explanatory text by identifying best use of elaboration techniques such as developing the topic with supporting details.",
    source: SOURCE,
  },

  // ELA #18
  {
    subject: "ela",
    grade: 3,
    claim: 2,
    domain: null,
    target: "6b",
    dok: 2,
    standard: "W.1d",
    type: "multiple-choice",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "A student is writing an opinion article for her teacher about her favorite field trip. The student wants to revise the draft so that it has a logical conclusion. Read the draft of the opinion article and complete the task that follows.\n\n[Opinion article about zoo field trip with sentence 'As you can see, the best third-grade trip by far is the zoo field trip.' in the wrong place]\n\nClick on the sentence in the draft that is in the wrong place.",
    options: [
      {
        label: "A",
        text: "My favorite third-grade field trip is the trip to the zoo.",
      },
      {
        label: "B",
        text: "There are many reasons that the zoo is the best field trip.",
      },
      {
        label: "C",
        text: "First, when we go to the zoo, we get to ride on big buses that have televisions and bathrooms.",
      },
      {
        label: "D",
        text: "As you can see, the best third-grade trip by far is the zoo field trip.",
      },
      {
        label: "E",
        text: "Second, we get to eat lunch at a really great rest area with picnic tables.",
      },
      {
        label: "F",
        text: "Also, we get to spend the whole day walking around looking at interesting animals.",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "D",
    rubric: "(1 point) The student selects the correct option.",
    points: 1,
    evidence_statement:
      "The student will revise opinion text by identifying improved organizational elements such as organizing.",
    source: SOURCE,
  },

  // ELA #19
  {
    subject: "ela",
    grade: 3,
    claim: 2,
    domain: null,
    target: "8",
    dok: 2,
    standard: "L.3a",
    type: "multi-select",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "A student is writing an opinion paper for her teacher about dogs. Read this paragraph from the paper and the directions that follow.\n\n[Paragraph about dogs with underlined words 'happy' and 'good']\n\nSelect the best two words from the choices to replace the underlined words in the paragraph.",
    options: [
      { label: "A", text: "beautiful" },
      { label: "B", text: "fierce" },
      { label: "C", text: "healthier" },
      { label: "D", text: "lucky" },
      { label: "E", text: "polite" },
      { label: "F", text: "relaxed" },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: ["C", "F"],
    rubric:
      "(1 point) The student selects the correct two options.",
    points: 1,
    evidence_statement:
      "The student will choose the correct words or phrases for audience or purpose.",
    source: SOURCE,
  },

  // ELA #22
  {
    subject: "ela",
    grade: 3,
    claim: 3,
    domain: null,
    target: "4",
    dok: 3,
    standard: "SL.2",
    type: "two-part",
    test_type: "cat",
    passage: null,
    passage_title: "Soaring on the Wings of the Wind",
    passage_author: "Lois Miner Huey",
    student_directions:
      "Listen to the presentation. Then answer the questions.",
    question_text:
      "Part A: What is the most likely reason the author made the presentation?\nPart B: Which sentence from the presentation best supports your answer in part A?",
    options: {
      partA: [
        {
          label: "A",
          text: "to explain how a hot air balloon works",
        },
        {
          label: "B",
          text: "to show the advantages of being small",
        },
        {
          label: "C",
          text: "to tell how Americans feel about new experiences",
        },
        {
          label: "D",
          text: "to describe an important event in American history",
        },
      ],
      partB: [
        {
          label: "A",
          text: '"Smoky hot air swelled the balloon and sent it up."',
        },
        {
          label: "B",
          text: '"He was the first American to develop a method to lift a balloon using hot air."',
        },
        {
          label: "C",
          text: '"The crowd yelled and clapped as Carnes sent the balloon up, time and again."',
        },
        {
          label: "D",
          text: '"He was the first American to see such views."',
        },
      ],
    },
    grid_rows: null,
    grid_columns: null,
    correct_answer: "D, B",
    rubric:
      "(1 point) The student selects the correct option in Part A and the correct option in Part B.",
    points: 1,
    evidence_statement:
      "The student will identify or interpret the purpose, central idea, or key points of a presentation; the student will identify the use of supporting evidence in a presentation.",
    source: SOURCE,
  },

  // ELA #23
  {
    subject: "ela",
    grade: 3,
    claim: 3,
    domain: null,
    target: "4",
    dok: 1,
    standard: "SL.2",
    type: "multiple-choice",
    test_type: "cat",
    passage: null,
    passage_title: "Soaring on the Wings of the Wind",
    passage_author: "Lois Miner Huey",
    student_directions: null,
    question_text:
      "Which question can a listener answer after hearing the presentation?",
    options: [
      {
        label: "A",
        text: "In what year did the balloon ride take place?",
      },
      {
        label: "B",
        text: "What happened during the first hot air balloon ride?",
      },
      {
        label: "C",
        text: "How did Edward feel after he took his ride in the balloon?",
      },
      {
        label: "D",
        text: "How did Edward become the first American to ride in a balloon?",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "D",
    rubric: "(1 point) The student selects the correct option.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // ELA #24
  {
    subject: "ela",
    grade: 3,
    claim: 3,
    domain: null,
    target: "4",
    dok: 1,
    standard: "SL.2",
    type: "grid-match",
    test_type: "cat",
    passage: null,
    passage_title: "Soaring on the Wings of the Wind",
    passage_author: "Lois Miner Huey",
    student_directions: null,
    question_text:
      "Complete the chart to show which events were planned. Click in the boxes next to the events that match if they were planned or unplanned.",
    options: null,
    grid_rows: [
      "Edward Warren Jr. rode in a balloon.",
      "The balloon filled with smoke from a fire.",
      "A crowd in Baltimore saw how a balloon could fly.",
      "Peter Carnes used a stove to make the balloon rise.",
    ],
    grid_columns: ["Planned", "Unplanned"],
    correct_answer: ["0:1", "1:0", "2:0", "3:0"],
    rubric:
      "(1 point) The student selects the correct four options.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // ELA #25
  {
    subject: "ela",
    grade: 3,
    claim: 3,
    domain: null,
    target: "4",
    dok: 3,
    standard: "SL.2",
    type: "multiple-choice",
    test_type: "cat",
    passage: null,
    passage_title: "All About Pizza",
    passage_author: "Marcia Amidon Lusted",
    student_directions: null,
    question_text:
      "Which conclusion is supported by the presentation?",
    options: [
      { label: "A", text: "Americans eat pizza every day." },
      {
        label: "B",
        text: "Pizza is usually eaten at lunchtime.",
      },
      {
        label: "C",
        text: "Almost anything can go on a pizza.",
      },
      {
        label: "D",
        text: "Lobster pizza is most popular in Maine.",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "C",
    rubric: "(1 point) The student selects the correct option.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // ELA #26
  {
    subject: "ela",
    grade: 3,
    claim: 3,
    domain: null,
    target: "4",
    dok: 1,
    standard: "SL.2",
    type: "grid-match",
    test_type: "cat",
    passage: null,
    passage_title: "All About Pizza",
    passage_author: "Marcia Amidon Lusted",
    student_directions: null,
    question_text:
      "Complete the chart to show which countries are known for which pizza toppings. Click in the boxes next to the countries that match the toppings.",
    options: null,
    grid_rows: ["United States", "India", "Japan"],
    grid_columns: ["eel", "pepperoni", "ginger"],
    correct_answer: ["0:1", "1:2", "2:0"],
    rubric:
      "(1 point) The student selects the correct three options.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // ELA #27
  {
    subject: "ela",
    grade: 3,
    claim: 3,
    domain: null,
    target: "4",
    dok: 2,
    standard: "SL.2",
    type: "multiple-choice",
    test_type: "cat",
    passage: null,
    passage_title: "All About Pizza",
    passage_author: "Marcia Amidon Lusted",
    student_directions: null,
    question_text:
      "What is the most likely reason the author made the presentation?",
    options: [
      {
        label: "A",
        text: "to suggest another way of looking at pizza",
      },
      {
        label: "B",
        text: "to change what people think is good pizza",
      },
      {
        label: "C",
        text: "to show why pepperoni pizza is the best kind",
      },
      {
        label: "D",
        text: "to explain why pizza is different in other places",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "A",
    rubric: "(1 point) The student selects the correct option.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // ELA #28
  {
    subject: "ela",
    grade: 3,
    claim: 4,
    domain: null,
    target: "3",
    dok: 2,
    standard: "W.8",
    type: "multi-select",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "A student is writing a research report about the human eye. Read the sentences from her report and the directions that follow.\n\nOur eyes are wonderful body parts. They help us see the beauty of the world. In the center of the eye is a black spot. Have you ever wondered why that spot gets bigger and smaller?\n\nChoose two of the sources that would most likely give the student more information about the ideas she has written.",
    options: [
      {
        label: "A",
        text: "www.eye.color.com, a website that tells about the colors of people's eyes",
      },
      {
        label: "B",
        text: "www.eyequestion.com, a website that explains the job of each part of the eye",
      },
      {
        label: "C",
        text: "Eyes and How They Work, a book that tells about the way that the eye parts work",
      },
      {
        label: "D",
        text: "www.eye.food.com, a website that tells what we should eat to help our eyes stay healthy",
      },
      {
        label: "E",
        text: "My Job as an Eye Doctor, a book that tells about being a doctor who takes care of people's eyes",
      },
      {
        label: "F",
        text: "You Can Find It, a children's magazine that has many puzzles and games where you look for the hidden things",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: ["B", "C"],
    rubric:
      "(1 point) The student selects the correct two options.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // ELA #29
  {
    subject: "ela",
    grade: 3,
    claim: 4,
    domain: null,
    target: "2",
    dok: 2,
    standard: "W.8",
    type: "multiple-choice",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "A student is writing a report about red foxes. She is looking for information about the body of the red fox. Which sentence has information that the student can use?",
    options: [
      {
        label: "A",
        text: "There are over twenty different kinds of foxes.",
      },
      {
        label: "B",
        text: "Red foxes can live in hot deserts and snowy forests.",
      },
      {
        label: "C",
        text: "The red fox wraps its fluffy tail around itself like a blanket.",
      },
      {
        label: "D",
        text: "Red foxes are often clever characters in children's stories.",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "C",
    rubric: "(1 point) The student selects the correct option.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },

  // ELA #30
  {
    subject: "ela",
    grade: 3,
    claim: 4,
    domain: null,
    target: "4",
    dok: 2,
    standard: "W.8",
    type: "multiple-choice",
    test_type: "cat",
    passage: null,
    passage_title: null,
    passage_author: null,
    student_directions: null,
    question_text:
      "A student is writing a research report about different kinds of fruit. He wrote an opinion in the report. Read the sentences from the student's report and the directions that follow.\n\nMany Kinds of Fruit\nA fruit is the part of the plant that has the plant's seeds. There are many kinds of fruits. Some that are popular with kids are apples, bananas, grapes, oranges, and strawberries. Sometimes it is confusing to tell if a food is a fruit.\n\nThe student found another source about different kinds of fruit. Which sentence best supports the student's opinion?",
    options: [
      {
        label: "A",
        text: "For example, it is hard to tell what some foods are when they are cut up in pieces.",
      },
      {
        label: "B",
        text: "For example, a tomato is not sweet, but it is a fruit because it has the seeds.",
      },
      {
        label: "C",
        text: "For example, some kids don't like some of the fruits on that list.",
      },
      {
        label: "D",
        text: "For example, fruits can be many different shapes and colors.",
      },
    ],
    grid_rows: null,
    grid_columns: null,
    correct_answer: "B",
    rubric:
      "(1 point) The student will select evidence to support opinions or ideas.",
    points: 1,
    evidence_statement: null,
    source: SOURCE,
  },
];

// ─── Main seed function ─────────────────────────────────────────────────────

async function seed() {
  console.log(`Seeding ${questions.length} questions into Supabase...`);

  // Insert in batches of 10 to avoid payload limits
  const BATCH_SIZE = 10;
  let inserted = 0;

  for (let i = 0; i < questions.length; i += BATCH_SIZE) {
    const batch = questions.slice(i, i + BATCH_SIZE);
    const { data, error } = await supabase
      .from("questions")
      .insert(batch)
      .select("id");

    if (error) {
      console.error(
        `Error inserting batch starting at index ${i}:`,
        error.message
      );
      console.error("Details:", JSON.stringify(error, null, 2));
      process.exit(1);
    }

    inserted += data?.length ?? 0;
    console.log(
      `  Inserted batch ${Math.floor(i / BATCH_SIZE) + 1} (${data?.length} rows)`
    );
  }

  console.log(`\nDone! Inserted ${inserted} questions total.`);
}

seed().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
