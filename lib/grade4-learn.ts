export type LearnSubject = "math" | "ela";

export interface LearnPracticeQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Grade4Lesson {
  id: string;
  subject: LearnSubject;
  title: string;
  summary: string;
  standards: string[];
  learn: string[];
  workedExample: {
    prompt: string;
    steps: string[];
    conclusion: string;
  };
  practice: LearnPracticeQuestion[];
}

export const grade4Lessons: Grade4Lesson[] = [
  {
    id: "place-value-rounding",
    subject: "math",
    title: "Place Value and Rounding",
    summary: "Use the value of each digit to compare and round multi-digit numbers.",
    standards: ["4.NBT.A.1", "4.NBT.A.3"],
    learn: [
      "A digit is worth ten times as much when it moves one place to the left.",
      "To round, find the target place and use the digit immediately to its right.",
    ],
    workedExample: {
      prompt: "Round 286,749 to the nearest thousand.",
      steps: ["The thousands digit is 6.", "The hundreds digit is 7, so round the thousands digit up."],
      conclusion: "286,749 rounds to 287,000.",
    },
    practice: [
      {
        id: "pvr-1",
        prompt: "What is the value of the 5 in 352,418?",
        options: ["5,000", "50,000", "500,000", "500"],
        correctIndex: 1,
        explanation: "The 5 is in the ten-thousands place, so its value is 50,000.",
      },
      {
        id: "pvr-2",
        prompt: "Round 641,280 to the nearest ten thousand.",
        options: ["640,000", "641,000", "650,000", "600,000"],
        correctIndex: 0,
        explanation: "The thousands digit is 1, so the ten-thousands digit stays 4.",
      },
    ],
  },
  {
    id: "multiplicative-comparison",
    subject: "math",
    title: "Multiplicative Comparison",
    summary: "Distinguish “times as many” comparisons from addition comparisons.",
    standards: ["4.OA.A.1", "4.OA.A.2"],
    learn: [
      "“Three times as many” means multiply by 3.",
      "A comparison equation can show the unknown larger amount or the unknown multiplier.",
    ],
    workedExample: {
      prompt: "Mina has 6 markers. Jon has 4 times as many. How many markers does Jon have?",
      steps: ["Write 4 × 6.", "Multiply: 4 × 6 = 24."],
      conclusion: "Jon has 24 markers.",
    },
    practice: [
      {
        id: "mc-1",
        prompt: "A shelf holds 7 blue bins and 5 times as many green bins. How many green bins are there?",
        options: ["12", "30", "35", "42"],
        correctIndex: 2,
        explanation: "Five times 7 is 35.",
      },
      {
        id: "mc-2",
        prompt: "Kai has 36 cards, which is 4 times as many as Lila. How many cards does Lila have?",
        options: ["9", "32", "40", "144"],
        correctIndex: 0,
        explanation: "36 ÷ 4 = 9, so Lila has 9 cards.",
      },
    ],
  },
  {
    id: "fraction-equivalence",
    subject: "math",
    title: "Equivalent and Compared Fractions",
    summary: "Build equivalent fractions and compare fractions using common reasoning.",
    standards: ["4.NF.A.1", "4.NF.A.2"],
    learn: [
      "Multiply the numerator and denominator by the same nonzero whole number to make an equivalent fraction.",
      "Compare fractions using a common denominator, a benchmark, or cross-products.",
    ],
    workedExample: {
      prompt: "Compare 3/4 and 5/8.",
      steps: ["Rewrite 3/4 as 6/8.", "Compare 6/8 with 5/8."],
      conclusion: "3/4 is greater than 5/8.",
    },
    practice: [
      {
        id: "fe-1",
        prompt: "Which fraction is equivalent to 2/3?",
        options: ["3/4", "4/6", "5/6", "6/8"],
        correctIndex: 1,
        explanation: "Multiplying both parts of 2/3 by 2 gives 4/6.",
      },
      {
        id: "fe-2",
        prompt: "Which comparison is true?",
        options: ["5/6 < 3/4", "2/5 > 1/2", "7/8 > 5/6", "3/10 > 2/3"],
        correctIndex: 2,
        explanation: "7 × 6 = 42 and 5 × 8 = 40, so 7/8 is greater.",
      },
    ],
  },
  {
    id: "measurement-problems",
    subject: "math",
    title: "Measurement Word Problems",
    summary: "Convert within one measurement system and use the result in a problem.",
    standards: ["4.MD.A.1", "4.MD.A.2"],
    learn: [
      "Write the conversion relationship before calculating.",
      "Check whether the question asks for a total, difference, elapsed time, or converted amount.",
    ],
    workedExample: {
      prompt: "A ribbon is 3 yards long. How many feet long is it?",
      steps: ["Use 1 yard = 3 feet.", "Multiply 3 yards × 3 feet per yard."],
      conclusion: "The ribbon is 9 feet long.",
    },
    practice: [
      {
        id: "mp-1",
        prompt: "A jug contains 5 quarts. How many cups is that? Use 1 quart = 4 cups.",
        options: ["9", "15", "20", "25"],
        correctIndex: 2,
        explanation: "5 × 4 = 20 cups.",
      },
      {
        id: "mp-2",
        prompt: "A walk starts at 2:35 p.m. and lasts 45 minutes. When does it end?",
        options: ["2:80 p.m.", "3:10 p.m.", "3:20 p.m.", "3:30 p.m."],
        correctIndex: 2,
        explanation: "Twenty-five minutes reach 3:00, and 20 more minutes reach 3:20.",
      },
    ],
  },
  {
    id: "text-evidence",
    subject: "ela",
    title: "Details and Inference",
    summary: "Use exact details to explain what a text states and what it suggests.",
    standards: ["RL.4.1", "RI.4.1"],
    learn: [
      "A text detail is information the author states directly.",
      "An inference combines a text detail with careful reasoning; it is not a guess without evidence.",
    ],
    workedExample: {
      prompt: "A character checks the same knot twice before the boat leaves. What can a reader infer?",
      steps: ["Notice the repeated checking.", "Connect the action to the character's concern about the knot."],
      conclusion: "The character wants to be certain the boat is safely secured.",
    },
    practice: [
      {
        id: "te-1",
        prompt: "A student places a note beside a wilted plant and measures the soil each morning. What is best supported?",
        options: ["The student dislikes plants.", "The student is collecting evidence about the plant's condition.", "The plant grew ten centimeters.", "The student forgot where the plant is."],
        correctIndex: 1,
        explanation: "The note and repeated measurements show evidence collection.",
      },
      {
        id: "te-2",
        prompt: "Which detail best supports the claim that a trail is difficult to follow?",
        options: ["The trail begins near a red bench.", "Several signs are faded, and two path markers are hidden by leaves.", "A bird calls from a tree.", "The map is printed on white paper."],
        correctIndex: 1,
        explanation: "Faded and hidden markers directly explain why the route is difficult to follow.",
      },
    ],
  },
  {
    id: "main-idea-summary",
    subject: "ela",
    title: "Main Idea and Summary",
    summary: "Identify the central idea and select details that develop it.",
    standards: ["RI.4.2"],
    learn: [
      "The main idea is the most important point developed across a section or whole text.",
      "A summary includes key supporting ideas without minor examples or personal opinions.",
    ],
    workedExample: {
      prompt: "An article explains how roof gardens hold rainwater, cool buildings, and require careful maintenance.",
      steps: ["Group the benefits together.", "Include the maintenance limitation because it shapes the full explanation."],
      conclusion: "Roof gardens can help buildings manage heat and water, but they need planned care.",
    },
    practice: [
      {
        id: "mi-1",
        prompt: "A paragraph explains that bats eat insects, spread seeds, and pollinate plants. What is its main idea?",
        options: ["All bats live in caves.", "Bats support ecosystems in several ways.", "Seeds are larger than insects.", "Plants only bloom at night."],
        correctIndex: 1,
        explanation: "The three details are different ways bats support an ecosystem.",
      },
      {
        id: "mi-2",
        prompt: "Which sentence belongs in an objective summary of a text about repairing old bicycles?",
        options: ["Repairing bicycles is the most exciting hobby.", "The volunteers inspect brakes and tires before returning each bicycle.", "I would paint every bicycle blue.", "The workshop has a funny name."],
        correctIndex: 1,
        explanation: "The inspection process is a key factual detail without an opinion.",
      },
    ],
  },
  {
    id: "text-structure",
    subject: "ela",
    title: "Informational Text Structure",
    summary: "Recognize how an author organizes ideas and why that structure helps.",
    standards: ["RI.4.5"],
    learn: [
      "Common structures include sequence, cause and effect, compare and contrast, and problem and solution.",
      "Signal words help, but the relationship among ideas is stronger evidence than one word.",
    ],
    workedExample: {
      prompt: "A section describes a flooded path, then explains how a raised walkway solved the problem.",
      steps: ["Identify the difficulty: the path floods.", "Identify the response: build a raised walkway."],
      conclusion: "The section uses a problem-and-solution structure.",
    },
    practice: [
      {
        id: "ts-1",
        prompt: "A text lists the stages from caterpillar to butterfly in time order. Which structure does it use?",
        options: ["Sequence", "Compare and contrast", "Problem and solution", "Description of one place"],
        correctIndex: 0,
        explanation: "Stages arranged in time order use sequence.",
      },
      {
        id: "ts-2",
        prompt: "A section explains that heavy rain loosened soil, which caused a slope to slide. Which structure is central?",
        options: ["Sequence only", "Cause and effect", "Compare and contrast", "Question and answer"],
        correctIndex: 1,
        explanation: "The rain and loosened soil are causes; the slide is the effect.",
      },
    ],
  },
  {
    id: "opinion-evidence",
    subject: "ela",
    title: "Opinion Writing with Evidence",
    summary: "State a clear position, organize reasons, and connect source evidence.",
    standards: ["W.4.1", "W.4.9"],
    learn: [
      "A strong opinion names the decision and gives reasons that match the position.",
      "Evidence should be accurate, introduced clearly, and followed by an explanation of how it supports the reason.",
    ],
    workedExample: {
      prompt: "Write a claim about whether a class should keep a weekly repair station for shared supplies.",
      steps: ["Choose a position.", "Use evidence about waste and repair time.", "Acknowledge that the station needs a schedule."],
      conclusion: "The class should keep the station because repairs reduce waste, provided teams follow a short rotating schedule.",
    },
    practice: [
      {
        id: "oe-1",
        prompt: "Which claim is most useful for an evidence-based opinion?",
        options: ["Parks are nice.", "The town should add shade near the playground because summer surface temperatures exceed the safety target.", "Everyone agrees with me.", "Shade is a word with five letters."],
        correctIndex: 1,
        explanation: "The claim states a decision and connects it to relevant evidence.",
      },
      {
        id: "oe-2",
        prompt: "Which sentence best explains evidence that a new checkout system reduced missing books from 24 to 7?",
        options: ["The numbers show the system was linked to fewer missing books during the comparison period.", "Books have pages.", "Seven is an odd number.", "The system must work perfectly forever."],
        correctIndex: 0,
        explanation: "The sentence accurately interprets the evidence without making an unlimited claim.",
      },
    ],
  },
];
