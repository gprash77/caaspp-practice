import type { Question } from "./questions";

type HardTestConfig = {
  test: 8 | 9 | 10;
  base: number;
  mathDirections: string;
  mathTable: NonNullable<Question["dataTable"]>;
  math: {
    statements: { label: string; text: string }[];
    statementAnswer: string[];
    totalQuestion: string;
    totalAnswer: string;
    totalExplanation: string;
    compareQuestion: string;
    compareAnswer: string;
    compareRubric: string;
    compareExplanation: string;
    tableQuestion: string;
    tableColumns: string[];
    tableRowLabel: string;
    tableMinSumExclusive: number;
    tableSampleAnswer: string[];
    tableExplanationQuestion: string;
    tableExplanationAnswer: string;
    tableExplanationRubric: string;
    tableExplanation: string;
  };
  storyTitle: string;
  storyPassage: string;
  articleTitle: string;
  articlePassage: string;
  presentationOneTitle: string;
  presentationOne: string;
  presentationTwoTitle: string;
  presentationTwo: string;
  elaCat: Record<number, Partial<Question>>;
  presentationCat: Record<number, Partial<Question>>;
};

const museumPassage =
  "Read the passage and answer the questions.\n\n**The Case of the Missing Fossil**\n*by Nora Fields*\n\nAmara's class visited the town museum on the same morning workers were setting up a new fossil display. The glass case in the center of the room was open, and labels lay in neat piles on a cart.\n\n\"Please stay behind the blue rope,\" said Ms. Patel, the museum guide. \"The fossils are delicate.\"\n\nAmara noticed a small empty stand near the front of the case. Its label read, \"Fern fossil, found near Willow Creek.\" The stand was the only one without a fossil.\n\nMr. Chen, the curator, frowned at his clipboard. \"That fossil was here when I unlocked the room.\"\n\nSome students whispered that the fossil had been stolen. Amara was not sure. She looked around the room carefully. A fan hummed near the wall. A stack of posters leaned beside the case. On the floor, just under the cart, Amara saw a thin gray shape.\n\n\"Could that be it?\" she asked.\n\nMr. Chen knelt and slid the shape out with both hands. It was the fern fossil, still wrapped in tissue paper.\n\nMs. Patel smiled. \"It must have slipped from the cart when we moved the labels.\"\n\nAmara felt proud, but she also felt relieved. No one had taken the fossil. A careful look had solved the mystery before it became a bigger problem.";

const desertPassage =
  "Read the passage and answer the questions.\n\n**Life in the Desert**\n\nA desert is a place that receives very little rain. Some deserts are hot during the day and cold at night. Even with little water, many plants and animals survive there because they have special adaptations.\n\n**Desert Plants**\n\nCactus plants can store water inside thick stems. Many have waxy skin that helps keep water from drying out. Sharp spines protect the plant and also make small shadows on its surface.\n\n**Desert Animals**\n\nSome desert animals rest during the hottest part of the day. Kangaroo rats get much of the water they need from seeds. Lizards may hide under rocks or in burrows when the ground becomes too hot.\n\n**Why Adaptations Matter**\n\nAdaptations help living things meet their needs in difficult places. A plant that stores water can survive long dry times. An animal that avoids heat can save energy and stay safer.";

const weatherPassage =
  "Read the passage and answer the questions.\n\n**The Weather Station Problem**\n*by Lena Ortiz*\n\nMateo's class kept a weather station outside the school library. Each morning, one student checked the rain gauge, thermometer, and wind sock.\n\nOn Monday, Mateo wrote that the class had collected two inches of rain. On Tuesday, he noticed something strange. The rain gauge was almost full, but the ground around it was dry.\n\n\"Maybe it rained only over the gauge,\" joked his friend Talia.\n\nMateo did not laugh. He looked up and saw a sprinkler slowly turning near the garden bed. Every few seconds, water sprayed across the top of the rain gauge.\n\n\"Our data is wrong,\" Mateo said.\n\nThe class moved the gauge to an open spot away from sprinklers and trees. For the rest of the week, they checked it at the same time each morning. On Friday, their chart finally made sense.\n\nMateo learned that collecting data was not just writing down numbers. First, you had to make sure the numbers were fair.";

const erosionPassage =
  "Read the passage and answer the questions.\n\n**How Water Changes Land**\n\nWater can change the shape of land over time. This process is called erosion. Erosion happens when moving water carries away soil, sand, or small pieces of rock.\n\n**Rain and Runoff**\n\nWhen rain falls on a hill, some water soaks into the ground. The rest flows downhill as runoff. Fast runoff can carry soil with it, especially where there are few plants holding the soil in place.\n\n**Rivers and Streams**\n\nRivers and streams also cause erosion. Moving water can cut channels through land. Over many years, a river can make a valley deeper or wider.\n\n**Slowing Erosion**\n\nPlants help slow erosion because their roots hold soil. People can also build paths for water to follow safely. These steps do not stop water from moving, but they can reduce damage.";

const trailPassage =
  "Read the passage and answer the questions.\n\n**The Trail Crew**\n*by Maya Brooks*\n\nThe hiking trail behind Oak School had become muddy and hard to follow. After a week of rain, water ran down the path and made deep grooves in the dirt.\n\nJalen's class volunteered to help the park ranger repair it. First, they studied a map of the hill. The ranger explained that water always tried to move downhill by the easiest path.\n\n\"If we ignore the water,\" she said, \"the trail will wash out again.\"\n\nThe students carried small stones, packed soil, and placed logs along the sides of the trail. Jalen wanted to work quickly, but he noticed the ranger checking the slope again and again.\n\n\"Why do we keep measuring?\" he asked.\n\n\"Because a trail is a plan for both people and water,\" the ranger said.\n\nBy afternoon, the path curved gently instead of running straight down the hill. The next rain would have a safer route to follow. Jalen looked back at the trail and understood why careful planning mattered.";

const monarchPassage =
  "Read the passage and answer the questions.\n\n**The Long Journey of the Monarch Butterfly**\n\nEvery fall, monarch butterflies begin a long migration. Many travel from the northern United States or Canada to forests in central Mexico. The trip can be thousands of miles.\n\n**Finding the Way**\n\nScientists think monarchs use the sun, an internal clock, and sometimes Earth's magnetic field to travel in the right direction. The butterflies that fly south have never made the trip before, but they still reach the same winter forests their ancestors used.\n\n**Needing Milkweed**\n\nMonarch caterpillars eat only milkweed leaves. If milkweed disappears, young monarchs cannot survive. People can help by planting milkweed and protecting places where butterflies rest and feed.\n\n**A Difficult Trip**\n\nWeather, habitat loss, and long distances make migration difficult. Still, monarchs complete the journey generation after generation. Their migration shows how living things can depend on both instinct and the places they travel through.";

const configs: Record<8 | 9 | 10, HardTestConfig> = {
  8: {
    test: 8,
    base: 8000,
    mathDirections:
      "**Mathematics Performance Task**\n\nA science club is packing field notebooks, pencils, and water bottles for a museum field study.\n\nUse the field-study table to answer the questions.",
    mathTable: {
      columns: ["Amount"],
      rows: [
        { label: "Student groups", values: [6] },
        { label: "Students in each group", values: [4] },
        { label: "Notebooks in each pack", values: [5] },
        { label: "Packs of notebooks", values: [5] },
        { label: "Boxes of pencils", values: [3] },
        { label: "Pencils in each box", values: [12] },
        { label: "Water bottles packed", values: [28] },
        { label: "Extra notebooks needed", values: [6] },
      ],
    },
    math: {
      statements: [
        { label: "A", text: "There are 24 students going on the field study." },
        { label: "B", text: "The club has 25 notebooks before adding extras." },
        { label: "C", text: "The club has 30 pencils in all." },
        { label: "D", text: "There are enough water bottles for every student." },
        { label: "E", text: "The club will have 31 notebooks after adding the extra notebooks." },
      ],
      statementAnswer: ["A", "B", "D", "E"],
      totalQuestion: "How many pencils are in the 3 boxes?",
      totalAnswer: "36",
      totalExplanation: "There are 3 boxes with 12 pencils in each box, so 3 x 12 = 36 pencils.",
      compareQuestion:
        "After adding the extra notebooks, will the club have enough notebooks for all students? Use words and numbers to explain.",
      compareAnswer:
        "Yes. There are 6 x 4 = 24 students. The club has 5 x 5 = 25 notebooks, and 25 + 6 = 31 notebooks after adding extras. Since 31 is greater than 24, there are enough notebooks.",
      compareRubric:
        "2 points: The response finds the number of students, finds the total notebooks after extras, and compares the totals. 1 point: The response gives a correct yes/no answer with incomplete work. 0 points: All other responses.",
      compareExplanation:
        "The club needs 24 notebooks and will have 31, so the club has enough notebooks.",
      tableQuestion:
        "Another club wants to pack more than 36 pencils. Complete the table to show a possible number of pencils packed in the morning, midday, and afternoon.",
      tableColumns: ["Morning", "Midday", "Afternoon"],
      tableRowLabel: "Pencils Packed",
      tableMinSumExclusive: 36,
      tableSampleAnswer: ["13", "12", "12"],
      tableExplanationQuestion:
        "Use your answer from the table to explain how the other club could pack more pencils.",
      tableExplanationAnswer:
        "The science club packed 36 pencils. If the morning, midday, and afternoon numbers add to more than 36, then the other club packed more pencils.",
      tableExplanationRubric:
        "2 points: The response uses the table total and explains that it is greater than 36. 1 point: The response gives a partial comparison. 0 points: All other responses.",
      tableExplanation:
        "A complete explanation compares the other club's total with 36 pencils.",
    },
    storyTitle: "The Case of the Missing Fossil",
    storyPassage: museumPassage,
    articleTitle: "Life in the Desert",
    articlePassage: desertPassage,
    presentationOneTitle: "Solving a Museum Mystery",
    presentationOne:
      "Read the presentation transcript.\n\nToday I am explaining how careful observations helped solve the missing fossil problem.\n\nFirst, Amara noticed that one stand in the display case was empty. She did not guess right away. She looked for evidence.\n\nNext, she saw a gray shape under the cart. That detail mattered because workers had been moving labels near the display.\n\nFinally, the curator found the fossil wrapped in tissue paper. The fossil had slipped from the cart, so no one had stolen it.\n\nThe story shows that careful evidence can change what people think happened.",
    presentationTwoTitle: "Desert Survival Strategies",
    presentationTwo:
      "Read the presentation transcript.\n\nToday I am giving a presentation about how living things survive in deserts.\n\nDeserts receive very little rain, so plants and animals need special adaptations.\n\nCactus plants store water inside thick stems. Their waxy skin helps keep water from drying out.\n\nSome animals avoid the hottest part of the day. Kangaroo rats get water from seeds, and lizards may hide under rocks or in burrows.\n\nThese adaptations help living things meet their needs in a dry place.",
    elaCat: {},
    presentationCat: {},
  },
  9: {
    test: 9,
    base: 9000,
    mathDirections:
      "**Mathematics Performance Task**\n\nA class is recording weather data for a school garden. Students count sunny hours, rainy hours, and seed packets used.\n\nUse the garden-weather table to answer the questions.",
    mathTable: {
      columns: ["Amount"],
      rows: [
        { label: "Days observed", values: [5] },
        { label: "Sunny hours each day", values: [6] },
        { label: "Rainy hours on Monday", values: [2] },
        { label: "Rainy hours on Tuesday", values: [4] },
        { label: "Rainy hours on Wednesday", values: [3] },
        { label: "Seed trays", values: [7] },
        { label: "Seeds in each tray", values: [8] },
        { label: "Seed packets used", values: [9] },
      ],
    },
    math: {
      statements: [
        { label: "A", text: "The class observed 30 sunny hours in 5 days." },
        { label: "B", text: "The three listed rainy days had 9 rainy hours in all." },
        { label: "C", text: "The trays held 54 seeds in all." },
        { label: "D", text: "There were more seeds than sunny hours." },
        { label: "E", text: "The class used 9 seed packets." },
      ],
      statementAnswer: ["A", "B", "D", "E"],
      totalQuestion: "How many seeds are in the 7 trays?",
      totalAnswer: "56",
      totalExplanation: "There are 7 trays with 8 seeds in each tray, so 7 x 8 = 56 seeds.",
      compareQuestion:
        "Were there more seeds in the trays or more sunny hours during the 5 days? Use words and numbers to explain.",
      compareAnswer:
        "There were more seeds. The class observed 5 x 6 = 30 sunny hours. The trays had 7 x 8 = 56 seeds. Since 56 is greater than 30, there were more seeds.",
      compareRubric:
        "2 points: The response finds both totals and compares them correctly. 1 point: The response gives a correct comparison with incomplete work. 0 points: All other responses.",
      compareExplanation:
        "The class had 56 seeds and 30 sunny hours, so the seed total is greater.",
      tableQuestion:
        "Another class wants to record more than 30 sunny hours. Complete the table to show possible sunny hours for Monday, Tuesday, Wednesday, Thursday, and Friday.",
      tableColumns: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      tableRowLabel: "Sunny Hours",
      tableMinSumExclusive: 30,
      tableSampleAnswer: ["7", "6", "6", "6", "6"],
      tableExplanationQuestion:
        "Use your answer from the table to explain how the other class recorded more sunny hours.",
      tableExplanationAnswer:
        "The first class recorded 30 sunny hours. If the five daily numbers add to more than 30, then the other class recorded more sunny hours.",
      tableExplanationRubric:
        "2 points: The response uses the five-day total and explains that it is greater than 30. 1 point: The response gives a partial comparison. 0 points: All other responses.",
      tableExplanation:
        "A complete explanation compares the other class's five-day total with 30 sunny hours.",
    },
    storyTitle: "The Weather Station Problem",
    storyPassage: weatherPassage,
    articleTitle: "How Water Changes Land",
    articlePassage: erosionPassage,
    presentationOneTitle: "Collecting Fair Weather Data",
    presentationOne:
      "Read the presentation transcript.\n\nToday I am explaining why Mateo's class moved the rain gauge.\n\nAt first, the class thought the gauge showed heavy rain. But Mateo noticed that the ground was dry.\n\nThen he saw a sprinkler spraying water into the gauge. That meant the data was not fair.\n\nThe class moved the gauge to an open spot and checked it at the same time each day.\n\nGood data depends on careful placement and repeated checks.",
    presentationTwoTitle: "Water and Erosion",
    presentationTwo:
      "Read the presentation transcript.\n\nToday I am giving a presentation about how water changes land.\n\nRainwater that flows downhill is called runoff. Fast runoff can carry soil away.\n\nRivers and streams can also change land by cutting channels over many years.\n\nPlants help slow erosion because roots hold soil in place.\n\nWater keeps moving, but people can plan ways to reduce damage.",
    elaCat: {},
    presentationCat: {},
  },
  10: {
    test: 10,
    base: 10000,
    mathDirections:
      "**Mathematics Performance Task**\n\nStudents are planning trail markers for a nature walk. They count signs, arrows, and maps for different trail sections.\n\nUse the nature-walk table to answer the questions.",
    mathTable: {
      columns: ["Amount"],
      rows: [
        { label: "Trail sections", values: [8] },
        { label: "Markers in each section", values: [6] },
        { label: "Map boxes", values: [4] },
        { label: "Maps in each box", values: [15] },
        { label: "Arrow signs packed", values: [52] },
        { label: "Signs already placed", values: [19] },
        { label: "New signs placed", values: [27] },
        { label: "Extra signs needed", values: [9] },
      ],
    },
    math: {
      statements: [
        { label: "A", text: "The 8 trail sections need 48 markers in all." },
        { label: "B", text: "The 4 boxes hold 60 maps in all." },
        { label: "C", text: "The students placed 56 signs in all." },
        { label: "D", text: "There are enough arrow signs for the 48 trail markers." },
        { label: "E", text: "The students placed 46 signs in all." },
      ],
      statementAnswer: ["A", "B", "D", "E"],
      totalQuestion: "How many maps are in the 4 boxes?",
      totalAnswer: "60",
      totalExplanation: "There are 4 boxes with 15 maps in each box, so 4 x 15 = 60 maps.",
      compareQuestion:
        "After placing the signs, how many more signs are needed to have 55 signs placed? Use words and numbers to explain.",
      compareAnswer:
        "The students placed 19 + 27 = 46 signs. They need 55 signs, so 55 - 46 = 9 more signs are needed.",
      compareRubric:
        "2 points: The response finds the signs placed and subtracts from 55. 1 point: The response gives the correct number with incomplete work. 0 points: All other responses.",
      compareExplanation:
        "The students have placed 46 signs, and 9 more signs make 55.",
      tableQuestion:
        "Another trail group wants to place more than 55 signs. Complete the table to show possible signs placed in the north, south, east, and west sections.",
      tableColumns: ["North", "South", "East", "West"],
      tableRowLabel: "Signs Placed",
      tableMinSumExclusive: 55,
      tableSampleAnswer: ["14", "14", "14", "14"],
      tableExplanationQuestion:
        "Use your answer from the table to explain how the other group placed more than 55 signs.",
      tableExplanationAnswer:
        "If the north, south, east, and west numbers add to more than 55, then the other group placed more than 55 signs.",
      tableExplanationRubric:
        "2 points: The response uses the four-section total and explains that it is greater than 55. 1 point: The response gives a partial comparison. 0 points: All other responses.",
      tableExplanation:
        "A complete explanation compares the four-section total with 55 signs.",
    },
    storyTitle: "The Trail Crew",
    storyPassage: trailPassage,
    articleTitle: "The Long Journey of the Monarch Butterfly",
    articlePassage: monarchPassage,
    presentationOneTitle: "Planning a Better Trail",
    presentationOne:
      "Read the presentation transcript.\n\nToday I am explaining why the trail crew had to plan carefully.\n\nThe trail was muddy because rainwater ran straight down the hill.\n\nThe ranger taught the students that water follows the easiest downhill path.\n\nThe students used stones, soil, and logs to guide the trail and the water.\n\nA good trail plan helps people walk safely and helps water move with less damage.",
    presentationTwoTitle: "Protecting Monarch Migration",
    presentationTwo:
      "Read the presentation transcript.\n\nToday I am giving a presentation about monarch butterfly migration.\n\nMonarchs travel very long distances to winter forests in Mexico. They use clues such as the sun and an internal clock.\n\nThe journey is difficult because monarchs need places to rest and feed.\n\nPeople can help by planting milkweed and protecting habitats along the migration path.\n\nProtecting monarchs means protecting both the insects and the places they need.",
    elaCat: {},
    presentationCat: {},
  },
};

for (const config of Object.values(configs)) {
  config.elaCat = buildElaCat(config);
  config.presentationCat = buildPresentationCat(config);
}

function buildElaCat(config: HardTestConfig): Record<number, Partial<Question>> {
  const base = config.base;
  return {
    [base + 101]: {
      passage: config.storyPassage,
      passageTitle: config.storyTitle,
      questionText: `Which detail best shows that the main character in "${config.storyTitle}" studies the problem carefully?`,
      options: [
        { label: "A", text: "The character notices a clue before deciding what happened." },
        { label: "B", text: "The character leaves before the problem is solved." },
        { label: "C", text: "The character ignores what other people say." },
        { label: "D", text: "The character guesses without looking for evidence." },
      ],
      correctAnswer: "A",
      explanation: "The story problem is solved because the main character notices evidence and thinks carefully.",
    },
    [base + 102]: {
      passage: config.storyPassage,
      passageTitle: config.storyTitle,
      questionText: "What is the best summary of the story?",
      options: [
        { label: "A", text: "A character notices a problem, studies clues, and learns why careful planning or observation matters." },
        { label: "B", text: "A character refuses to help and waits for someone else to solve everything." },
        { label: "C", text: "A character wins a contest without practicing or learning anything." },
        { label: "D", text: "A character visits a place but does not notice anything important." },
      ],
      correctAnswer: "A",
      explanation: "The story follows a character who responds thoughtfully to a problem.",
    },
    [base + 103]: {
      type: "two-part",
      passage: config.storyPassage,
      passageTitle: config.storyTitle,
      questionText: "Answer both parts of the question.",
      partAPrompt: "Part A: What theme is developed in the story?",
      partAOptions: [
        { label: "A", text: "Careful thinking can help solve a problem." },
        { label: "B", text: "It is better to avoid difficult questions." },
        { label: "C", text: "Only adults can notice useful details." },
        { label: "D", text: "Plans are never worth changing." },
      ],
      partBPrompt: "Part B: Which detail best supports the answer to Part A?",
      partBOptions: [
        { label: "A", text: "The character studies clues before reaching a conclusion." },
        { label: "B", text: "The character forgets why the problem matters." },
        { label: "C", text: "The setting changes from morning to afternoon." },
        { label: "D", text: "Another character asks a question." },
      ],
      correctAnswer: ["A", "A"],
      explanation: "The theme is supported by the character's use of clues and careful thinking.",
    },
    [base + 104]: {
      passage: config.storyPassage,
      passageTitle: config.storyTitle,
      questionText: "How does the setting affect the events in the story?",
      options: [
        { label: "A", text: "The setting creates the problem that the character must understand." },
        { label: "B", text: "The setting has no connection to the character's actions." },
        { label: "C", text: "The setting makes every character leave immediately." },
        { label: "D", text: "The setting prevents anyone from learning new information." },
      ],
      correctAnswer: "A",
      explanation: "The place and conditions in the story help create the central problem.",
    },
    [base + 105]: {
      type: "multi-select",
      passage: config.storyPassage,
      passageTitle: config.storyTitle,
      questionText: "Select TWO details that show the character uses evidence.",
      options: [
        { label: "A", text: "The character notices something that does not fit." },
        { label: "B", text: "The character checks the situation before deciding." },
        { label: "C", text: "The character refuses to look closely." },
        { label: "D", text: "The character says the first idea must be correct." },
        { label: "E", text: "The character forgets the problem." },
      ],
      correctAnswer: ["A", "B"],
      explanation: "Noticing a clue and checking the situation are both evidence-based actions.",
    },
    [base + 106]: {
      passage: config.storyPassage,
      passageTitle: config.storyTitle,
      questionText: "What can the reader infer about the main character?",
      options: [
        { label: "A", text: "The character is observant and willing to revise ideas." },
        { label: "B", text: "The character dislikes solving problems." },
        { label: "C", text: "The character only cares about finishing quickly." },
        { label: "D", text: "The character already knows every answer." },
      ],
      correctAnswer: "A",
      explanation: "The character notices details and uses them to understand the problem.",
    },
    [base + 107]: {
      passage: config.storyPassage,
      passageTitle: config.storyTitle,
      questionText: "Why does the author include a moment when the first idea about the problem may be wrong?",
      options: [
        { label: "A", text: "To show that evidence can change what people think." },
        { label: "B", text: "To show that evidence is never useful." },
        { label: "C", text: "To make the setting unimportant." },
        { label: "D", text: "To prove the character should stop asking questions." },
      ],
      correctAnswer: "A",
      explanation: "The story shows that careful evidence can correct an early idea.",
    },
    [base + 108]: {
      passage: config.storyPassage,
      passageTitle: config.storyTitle,
      questionText: "Which sentence best states a lesson from the story?",
      options: [
        { label: "A", text: "Look carefully before deciding what happened." },
        { label: "B", text: "The fastest answer is always right." },
        { label: "C", text: "Problems become easier when people ignore details." },
        { label: "D", text: "Questions should be avoided." },
      ],
      correctAnswer: "A",
      explanation: "The story rewards careful observation and thoughtful conclusions.",
    },
    [base + 109]: {
      passage: config.articlePassage,
      passageTitle: config.articleTitle,
      questionText: `What is the main idea of "${config.articleTitle}"?`,
      options: [
        { label: "A", text: "Natural conditions can be difficult, but living things or landforms have features and processes that help them change or survive." },
        { label: "B", text: "Natural places never change." },
        { label: "C", text: "People can understand nature without looking closely." },
        { label: "D", text: "Only one living thing can survive outdoors." },
      ],
      correctAnswer: "A",
      explanation: "The article explains how natural features, processes, or adaptations matter.",
    },
    [base + 110]: {
      type: "two-part",
      passage: config.articlePassage,
      passageTitle: config.articleTitle,
      questionText: "This question has two parts. First, answer Part A. Then, answer Part B.",
      partAPrompt: "Part A: Why does the author use headings in the article?",
      partAOptions: [
        { label: "A", text: "To organize information into related topics." },
        { label: "B", text: "To show that the article is a poem." },
        { label: "C", text: "To hide important facts from readers." },
        { label: "D", text: "To tell events in a made-up story." },
      ],
      partBPrompt: "Part B: Which detail best supports your answer?",
      partBOptions: [
        { label: "A", text: "Each heading introduces a different part of the explanation." },
        { label: "B", text: "The article has only one sentence." },
        { label: "C", text: "The author gives no facts." },
        { label: "D", text: "The article is mainly dialogue." },
      ],
      correctAnswer: ["A", "A"],
      explanation: "The headings divide the article into useful information sections.",
    },
    [base + 111]: {
      passage: config.articlePassage,
      passageTitle: config.articleTitle,
      questionText: "Which detail from the article best supports its main idea?",
      options: [
        { label: "A", text: "The article gives an example of a feature or process that helps in a difficult condition." },
        { label: "B", text: "The article says the topic is not important." },
        { label: "C", text: "The article says nothing changes over time." },
        { label: "D", text: "The article explains only what one person thinks." },
      ],
      correctAnswer: "A",
      explanation: "The article supports its main idea with factual examples.",
    },
    [base + 112]: {
      passage: config.articlePassage,
      passageTitle: config.articleTitle,
      questionText: "What does the word process most nearly mean in an informational article?",
      options: [
        { label: "A", text: "a series of steps or changes" },
        { label: "B", text: "a funny conversation" },
        { label: "C", text: "a place with no details" },
        { label: "D", text: "a guess without evidence" },
      ],
      correctAnswer: "A",
      explanation: "A process is a series of steps or changes.",
    },
    [base + 113]: {
      type: "multi-select",
      passage: config.articlePassage,
      passageTitle: config.articleTitle,
      questionText: "Select TWO reasons the article is useful for research.",
      options: [
        { label: "A", text: "It gives facts about the topic." },
        { label: "B", text: "It explains why details matter." },
        { label: "C", text: "It is only a list of jokes." },
        { label: "D", text: "It avoids explaining causes or effects." },
        { label: "E", text: "It tells readers not to ask questions." },
      ],
      correctAnswer: ["A", "B"],
      explanation: "A useful research source gives facts and explains important details.",
    },
    [base + 114]: {
      passage: config.articlePassage,
      passageTitle: config.articleTitle,
      questionText: "What can readers conclude from the article?",
      options: [
        { label: "A", text: "Careful observation helps people understand how natural systems work." },
        { label: "B", text: "Natural systems are too simple to study." },
        { label: "C", text: "Facts are less useful than guesses." },
        { label: "D", text: "Living things and land never respond to conditions." },
      ],
      correctAnswer: "A",
      explanation: "The article uses details that readers can observe and explain.",
    },
    [base + 115]: {
      passage: config.articlePassage,
      passageTitle: config.articleTitle,
      questionText: `Which idea is supported by both "${config.storyTitle}" and "${config.articleTitle}"?`,
      options: [
        { label: "A", text: "Looking closely at evidence can help people understand a problem or place." },
        { label: "B", text: "All problems are solved the same way." },
        { label: "C", text: "Outdoor places never change." },
        { label: "D", text: "Stories and articles cannot share ideas." },
      ],
      correctAnswer: "A",
      explanation: "Both sources show the value of close observation and evidence.",
    },
  };
}

function buildPresentationCat(config: HardTestConfig): Record<number, Partial<Question>> {
  const base = config.base;
  return {
    [base + 122]: {
      type: "multiple-choice",
      passage: config.presentationOne,
      passageTitle: config.presentationOneTitle,
      studentDirections: "Read the presentation transcript. Then answer the questions.",
      audio: undefined,
      questionText: "What is the main idea of the presentation?",
      options: [
        { label: "A", text: "Careful evidence or planning helps people understand and solve the problem." },
        { label: "B", text: "The problem cannot be understood by looking closely." },
        { label: "C", text: "The speaker wants listeners to ignore details." },
        { label: "D", text: "Only the title matters in a presentation." },
      ],
      correctAnswer: "A",
      explanation: "The presentation explains how evidence or planning helps solve the problem.",
    },
    [base + 123]: {
      passage: config.presentationOne,
      passageTitle: config.presentationOneTitle,
      studentDirections: "Read the presentation transcript. Then answer the questions.",
      audio: undefined,
      questionText: "Which question can a listener answer after reading the presentation?",
      options: [
        { label: "A", text: "What detail helped people understand the problem?" },
        { label: "B", text: "What is the speaker's home address?" },
        { label: "C", text: "How many pages are in the speaker's notebook?" },
        { label: "D", text: "What will happen ten years later?" },
      ],
      correctAnswer: "A",
      explanation: "The presentation gives a key detail that explains the problem.",
    },
    [base + 124]: {
      passage: config.presentationOne,
      passageTitle: config.presentationOneTitle,
      studentDirections: "Read the presentation transcript. Then answer the questions.",
      audio: undefined,
      questionText: "Complete the chart to show what happened first and what happened later.",
      gridRows: ["A problem was noticed", "A clue or cause was found", "A conclusion was explained"],
      gridColumns: ["Earlier", "Later"],
      correctAnswer: ["0:0", "1:1", "2:1"],
      explanation: "The problem is noticed first; finding evidence and explaining the conclusion happen later.",
    },
    [base + 125]: {
      passage: config.presentationTwo,
      passageTitle: config.presentationTwoTitle,
      studentDirections: "Read the presentation transcript. Then answer the questions.",
      audio: undefined,
      questionText: "Which idea is explained in the presentation?",
      options: [
        { label: "A", text: "Natural conditions affect how living things or land systems survive, move, or change." },
        { label: "B", text: "Natural conditions never affect living things." },
        { label: "C", text: "People should ignore changes in nature." },
        { label: "D", text: "The speaker gives no facts about nature." },
      ],
      correctAnswer: "A",
      explanation: "The presentation explains a natural process, adaptation, or challenge.",
    },
    [base + 126]: {
      passage: config.presentationTwo,
      passageTitle: config.presentationTwoTitle,
      studentDirections: "Read the presentation transcript. Then answer the questions.",
      audio: undefined,
      questionText: "Complete the chart to match each idea with its role in the presentation.",
      gridRows: ["A challenge in nature", "A helpful feature or action", "A result"],
      gridColumns: ["Problem", "Support", "Effect"],
      correctAnswer: ["0:0", "1:1", "2:2"],
      explanation: "The presentation connects a natural challenge, a helpful feature or action, and a result.",
    },
    [base + 127]: {
      passage: config.presentationTwo,
      passageTitle: config.presentationTwoTitle,
      studentDirections: "Read the presentation transcript. Then answer the questions.",
      audio: undefined,
      questionText: "What is the most likely reason the speaker made this presentation?",
      options: [
        { label: "A", text: "to explain how evidence helps people understand a natural topic" },
        { label: "B", text: "to tell listeners that facts are not useful" },
        { label: "C", text: "to describe only one made-up event" },
        { label: "D", text: "to list questions without answering them" },
      ],
      correctAnswer: "A",
      explanation: "The speaker presents factual information so listeners can understand the topic.",
    },
  };
}

function rebaselineMathPt(question: Question, config: HardTestConfig): Question | undefined {
  const id = question.id - config.base;
  const shared = {
    ...question,
    studentDirections: config.mathDirections,
    dataTable: config.mathTable,
  };

  if (id === 40) {
    return {
      ...shared,
      questionText: "Use the table to decide which statements are true. Select all that apply.",
      options: config.math.statements,
      correctAnswer: config.math.statementAnswer,
      rubric: "The student selects all true statements based on the table.",
      explanation: "Each true statement can be checked by using the numbers in the table.",
    };
  }

  if (id === 41) {
    return {
      ...shared,
      questionText: config.math.totalQuestion,
      correctAnswer: config.math.totalAnswer,
      acceptedAnswers: [config.math.totalAnswer],
      rubric: "The student enters the correct total from the table.",
      explanation: config.math.totalExplanation,
    };
  }

  if (id === 42) {
    return {
      ...shared,
      questionText: config.math.compareQuestion,
      correctAnswer: config.math.compareAnswer,
      rubric: config.math.compareRubric,
      explanation: config.math.compareExplanation,
    };
  }

  if (id === 43) {
    return {
      ...shared,
      questionText: config.math.tableQuestion,
      tableColumns: config.math.tableColumns,
      tableRowLabel: config.math.tableRowLabel,
      tableMinSumExclusive: config.math.tableMinSumExclusive,
      correctAnswer: config.math.tableSampleAnswer,
      rubric: `1 point: The student enters ${config.math.tableColumns.length} nonnegative numbers with a total greater than ${config.math.tableMinSumExclusive}. 0 points: All other responses.`,
      explanation: config.math.tableExplanation,
    };
  }

  if (id === 44) {
    return {
      ...shared,
      questionText: config.math.tableExplanationQuestion,
      correctAnswer: config.math.tableExplanationAnswer,
      rubric: config.math.tableExplanationRubric,
      explanation: config.math.tableExplanation,
    };
  }

  return undefined;
}

function textAnswer(question: Question, questionText: string, correctAnswer: string, explanation: string): Question {
  return {
    ...question,
    questionText,
    correctAnswer,
    acceptedAnswers: [correctAnswer],
    explanation,
  };
}

function formatClockTime(totalMinutes: number): string {
  const minutesInDay = ((totalMinutes % 1440) + 1440) % 1440;
  const hour24 = Math.floor(minutesInDay / 60);
  const minute = minutesInDay % 60;
  const period = hour24 < 12 ? "a.m." : "p.m.";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
}

function rebaselineMathCat(question: Question, config: HardTestConfig): Question | undefined {
  const item = question.id - config.base;
  const v = config.test - 7;

  if (item === 1) {
    const total = 118 + v * 9;
    const used = 37 + v * 6;
    const answer = String(total - used);
    return textAnswer(
      question,
      `A robotics club has ${total} small parts. Students use ${used} parts to build practice models. How many small parts are left?`,
      answer,
      `${total} - ${used} = ${answer}.`
    );
  }

  if (item === 2) {
    const a = 428 + v * 37;
    const b = 276 + v * 28;
    const answer = String(a + b);
    return textAnswer(question, `What is ${a} + ${b}?`, answer, `${a} + ${b} = ${answer}.`);
  }

  if (item === 3) {
    const groups = 5 + v;
    const each = 6 + v;
    const answer = String(groups * each);
    return textAnswer(
      question,
      `A library puts new books on ${groups} shelves. Each shelf has ${each} books. How many new books are on the shelves in all?`,
      answer,
      `${groups} x ${each} = ${answer}.`
    );
  }

  if (item === 4) {
    const rows = 4 + v;
    const each = 7 + v;
    const total = rows * each;
    return {
      ...question,
      questionText: `A gardener plants ${total} seedlings equally in ${rows} rows. Which expression can be used to find the number of seedlings in each row, and why?`,
      options: [
        { label: "A", text: `${rows} x ${total}, because the number of rows is multiplied by the total` },
        { label: "B", text: `${total} + ${rows}, because the total and rows are added` },
        { label: "C", text: `${total} - ${rows}, because the rows are subtracted from the total` },
        { label: "D", text: `${total} ÷ ${rows}, because the total is divided equally among the rows` },
      ],
      correctAnswer: "D",
      explanation: `${total} ÷ ${rows} = ${each}, so division finds the number in each equal row.`,
    };
  }

  if (item === 5) {
    const rows = 4 + v;
    const each = 3 + v;
    return textAnswer(
      question,
      `A display has ${rows} rows of photo cards. Each row has ${each} cards. How many photo cards are in the display?`,
      String(rows * each),
      `${rows} x ${each} = ${rows * each}.`
    );
  }

  if (item === 6) {
    const startHour = 8 + v;
    const addHours = 2 + v;
    const startMinutes = startHour * 60 + 20;
    const endMinutes = startMinutes + addHours * 60 + 40;
    return {
      ...question,
      questionText: `A workshop starts at ${formatClockTime(startMinutes)} It ends ${addHours} hours and 40 minutes later. What time does the workshop end?`,
      options: [
        { label: "A", text: formatClockTime(endMinutes - 20) },
        { label: "B", text: formatClockTime(endMinutes) },
        { label: "C", text: formatClockTime(endMinutes + 20) },
        { label: "D", text: formatClockTime(endMinutes + 40) },
      ],
      correctAnswer: "B",
      explanation: `${addHours} hours after ${formatClockTime(startMinutes)} is ${formatClockTime(startMinutes + addHours * 60)}; 40 more minutes makes ${formatClockTime(endMinutes)}.`,
    };
  }

  if (item === 7) {
    const a = 486 + v * 31;
    const b = 329 + v * 27;
    const c = 407 + v * 22;
    return {
      ...question,
      questionText: `Three classes collected trail maps. Class A collected ${a}, Class B collected ${b}, and Class C collected ${c}. Which statement is true?`,
      options: [
        { label: "A", text: `Class A collected ${a - b} more maps than Class B.` },
        { label: "B", text: `Class B collected more maps than Class C.` },
        { label: "C", text: `Class C collected ${c - b + 10} more maps than Class B.` },
        { label: "D", text: `Class A collected fewer maps than Class C.` },
      ],
      correctAnswer: "A",
      explanation: `${a} - ${b} = ${a - b}, so Class A collected ${a - b} more than Class B.`,
    };
  }

  if (item === 8) {
    const length = 18 + v * 4;
    const width = 7 + v * 3;
    const perimeter = 2 * (length + width);
    return textAnswer(
      question,
      `A rectangular garden bed is ${length} feet long and ${width} feet wide. What is the perimeter of the garden bed in feet?`,
      String(perimeter),
      `The perimeter is ${length} + ${width} + ${length} + ${width} = ${perimeter} feet.`
    );
  }

  if (item === 9) {
    return {
      ...question,
      questionText:
        "A number line from 0 to 1 is divided into 8 equal parts. Point A is at the fifth mark after 0. What number does Point A represent?",
      correctAnswer: "5/8",
      acceptedAnswers: ["5/8"],
      rubric: "The student enters the fraction represented by the fifth mark.",
      explanation:
        "The number line goes from 0 to 1 with 8 equal parts. The fifth mark after 0 represents 5/8.",
    };
  }

  if (item === 10) {
    return {
      ...question,
      questionText: "A student is comparing fractions. Which statement is true?",
      options: [
        { label: "A", text: "1/6 is greater than 1/3 because 6 is greater than 3." },
        { label: "B", text: "3/4 is less than 2/4 because 3 is greater than 2." },
        { label: "C", text: "4/6 is equivalent to 2/3 because both fractions name the same amount." },
        { label: "D", text: "1/2 is less than 1/4 because 2 is less than 4." },
      ],
      correctAnswer: "C",
      explanation: "Multiplying 2/3 by 2/2 gives 4/6, so 4/6 and 2/3 are equivalent.",
    };
  }

  if (item === 11) {
    const factor = 7 + v;
    const missing = 6 + v;
    return textAnswer(
      question,
      `What number makes this equation true?\n\n${factor} x ? = ${factor * missing}`,
      String(missing),
      `${factor} x ${missing} = ${factor * missing}.`
    );
  }

  if (item === 12) {
    const a = 6 + v;
    const b = 7 + v;
    return {
      ...question,
      questionText: `Which equation is related to ${a} x ${b} = ${a * b}?`,
      options: [
        { label: "A", text: `${a * b} + ${a} = ${b}` },
        { label: "B", text: `${a * b} - ${b} = ${a}` },
        { label: "C", text: `${a * b} ÷ ${a} = ${b}` },
        { label: "D", text: `${a} ÷ ${b} = ${a * b}` },
      ],
      correctAnswer: "C",
      explanation: `Division can undo multiplication: ${a * b} ÷ ${a} = ${b}.`,
    };
  }

  if (item === 13) {
    const start = 4 + v;
    const step = 6 + v;
    const first = start + step * 3;
    const second = start + step * 4;
    return textAnswer(
      question,
      `Look at the pattern: ${start}, ${start + step}, ${start + step * 2}, ?, ?\n\nWhat are the next two numbers in the pattern? Enter both numbers separated by a comma.`,
      `${first}, ${second}`,
      `The pattern adds ${step} each time, so the next two numbers are ${first} and ${second}.`
    );
  }

  if (item === 14) {
    const a = 6 + v;
    const b = 4 + v;
    return {
      ...question,
      questionText: "Select all of the equations that are true.",
      options: [
        { label: "A", text: `${a} x ${b} = ${a + b}` },
        { label: "B", text: `${a} x ${b} = ${b} x ${a}` },
        { label: "C", text: `${a * b} ÷ ${a} = ${b}` },
        { label: "D", text: `${a * b} + ${a} = ${b}` },
      ],
      correctAnswer: ["B", "C"],
      explanation: "The commutative property makes B true, and multiplication/division facts make C true.",
    };
  }

  if (item === 15) {
    const first = (5 + v) * (6 + v);
    const second = (7 + v) * (5 + v);
    return textAnswer(
      question,
      `Enter the unknown numbers that make each equation true.\n\n${5 + v} x ${6 + v} = ?\n${7 + v} x ${5 + v} = ?\n\nEnter the first unknown number and the second unknown number separated by a comma.`,
      `${first},${second}`,
      `The products are ${first} and ${second}.`
    );
  }

  if (item === 16) {
    const minutes = 25 + v * 10;
    return {
      ...question,
      questionText: `Four number lines start at 0 minutes. Which number line places a point at ${minutes} minutes?`,
      options: [
        { label: "A", text: `A point halfway between ${minutes - 10} and ${minutes}` },
        { label: "B", text: `A point at ${minutes}` },
        { label: "C", text: `A point ${10} minutes after ${minutes}` },
        { label: "D", text: `A point at ${minutes - 15}` },
      ],
      correctAnswer: "B",
      explanation: `The correct number line marks the exact value ${minutes}.`,
    };
  }

  if (item === 17) {
    const rows = 5 + v;
    const cols = 6 + v;
    return {
      ...question,
      questionText: `A rectangular mural is covered with ${rows} rows of ${cols} square tiles. Which expression shows the area in square tiles?`,
      options: [
        { label: "A", text: `${rows} x ${cols}` },
        { label: "B", text: `${rows} + ${cols}` },
        { label: "C", text: `${rows} + ${rows} + ${cols}` },
        { label: "D", text: `${cols} - ${rows}` },
      ],
      correctAnswer: "A",
      explanation: `Area can be found by multiplying rows by columns: ${rows} x ${cols}.`,
    };
  }

  if (item === 18) {
    const groups = 8 + v;
    const each = 7 + v;
    const removed = 15 + v * 4;
    return textAnswer(
      question,
      `A teacher has ${groups} boxes of markers. Each box has ${each} markers. She gives away ${removed} markers. How many markers are left?`,
      String(groups * each - removed),
      `${groups} x ${each} = ${groups * each}, and ${groups * each} - ${removed} = ${groups * each - removed}.`
    );
  }

  if (item === 19) {
    const a = 4 + v;
    const b = 3 + v;
    const c = 2 + v;
    return {
      ...question,
      questionText: `A student says ${a} x ${b} x ${c} = ${a * b + c}. What mistake did the student make?`,
      options: [
        { label: "A", text: "The student added the last number instead of multiplying by it." },
        { label: "B", text: "The student subtracted all three numbers." },
        { label: "C", text: "The student divided by the first number." },
        { label: "D", text: "The student rounded every factor." },
      ],
      correctAnswer: "A",
      explanation: `The correct product is ${a} x ${b} x ${c} = ${a * b * c}; the student found ${a * b} + ${c}.`,
    };
  }

  if (item === 20) {
    const students = 34 + v * 5;
    const seats = 5 + v;
    const full = Math.floor(students / seats);
    const rem = students % seats;
    return textAnswer(
      question,
      `${students} students ride vans to a park. Each van holds ${seats} students. After filling as many vans as possible, how many students are in the last partly filled van?`,
      String(rem),
      `${students} ÷ ${seats} = ${full} remainder ${rem}, so ${rem} students are in the last partly filled van.`
    );
  }

  if (item === 21) {
    return {
      ...question,
      questionText: "Which set of fractions correctly completes these comparisons?\n\n- equal to 1\n- less than 1/2\n- greater than 1/2",
      options: [
        { label: "A", text: "4/4, 1/4, 3/4" },
        { label: "B", text: "3/4, 4/4, 1/4" },
        { label: "C", text: "1/4, 3/4, 4/4" },
        { label: "D", text: "2/4, 4/4, 1/4" },
      ],
      correctAnswer: "A",
      explanation: "4/4 equals 1, 1/4 is less than 1/2, and 3/4 is greater than 1/2.",
    };
  }

  if (item === 22) {
    const total = 24 + v * 12;
    return {
      ...question,
      questionText: `A teacher has ${total} counters. Select all of the equal groups that can be formed using all ${total} counters.`,
      options: [
        { label: "A", text: `${total / 2} groups of 2` },
        { label: "B", text: `${total / 3} groups of 3` },
        { label: "C", text: `${total - 1} groups of 1` },
        { label: "D", text: `${total / 6} groups of 6` },
        { label: "E", text: `${total / 4 + 1} groups of 4` },
      ],
      correctAnswer: ["A", "B", "D"],
      explanation: `The choices A, B, and D each multiply to ${total}.`,
    };
  }

  if (item === 23) {
    const each = 4 + v;
    const total = each * 6;
    return textAnswer(
      question,
      `A picture graph uses one star to show ${each} students. The graph has 6 stars. How many students are shown?`,
      String(total),
      `6 stars with ${each} students each show ${total} students.`
    );
  }

  if (item === 24) {
    return {
      ...question,
      questionText: "Complete the line plot by placing X marks above the values.\n\nData to plot: 1/4, 2/4, 2/4, 4/4",
      linePlotLabels: ["1/4", "2/4", "3/4", "4/4"],
      linePlotMaxDots: 4,
      correctAnswer: ["0:1", "1:2", "1:1", "3:1"],
      explanation: "The data show one X above 1/4, two X marks above 2/4, none above 3/4, and one X above 4/4.",
    };
  }

  if (item === 25) {
    const bags = 6 + v;
    const each = 5 + v;
    const extra = 9 + v;
    const total = bags * each + extra;
    return {
      ...question,
      questionText: `A class packs ${bags} bags with ${each} shells in each bag and has ${extra} shells left over. Select TWO equations that can be used to find the total number of shells.`,
      options: [
        { label: "A", text: `${bags} x ${each} + ${extra} = ${total}` },
        { label: "B", text: `${bags} + ${each} + ${extra} = ${bags + each + extra}` },
        { label: "C", text: `${each} x ${bags} + ${extra} = ${total}` },
        { label: "D", text: `${bags} x ${extra} + ${each} = ${bags * extra + each}` },
      ],
      correctAnswer: ["A", "C"],
      explanation: `Both multiplication expressions find ${bags * each} shells in bags, then add ${extra}.`,
    };
  }

  if (item === 26) {
    return textAnswer(
      question,
      "Enter one fraction that is greater than 2/6 and less than 5/6.",
      "3/6",
      "3/6 is greater than 2/6 and less than 5/6."
    );
  }

  if (item === 27) {
    const wood = 146 + v * 18;
    const glass = 79 + v * 13;
    return textAnswer(
      question,
      `Jana has ${wood} wooden beads and ${glass} glass beads. How many more wooden beads than glass beads does Jana have?`,
      String(wood - glass),
      `${wood} - ${glass} = ${wood - glass}.`
    );
  }

  if (item === 28) {
    return textAnswer(
      question,
      "A number line from 0 to 1 is divided into 8 equal parts. Point B is at the third mark after 0. What fraction does Point B represent?",
      "3/8",
      "The third mark after 0 on a number line divided into eighths is 3/8."
    );
  }

  if (item === 29) {
    return {
      ...question,
      questionText:
        "Part A: Click the correct number of 1/3 pieces and 1/4 pieces to model one whole.\n\nPart B: Compare the number of pieces used in the two models.",
      fractionModel: { thirdsMax: 4, fourthsMax: 4 },
      correctAnswer: ["3", "4", "yes", ">"],
      explanation: "Three 1/3 pieces make one whole, and four 1/4 pieces make one whole. The whole amounts are equal, but the model uses more fourth-size pieces than third-size pieces.",
    };
  }

  if (item === 30) {
    return {
      ...question,
      questionText: "Shade 2/6 of the rectangle.",
      shadeGrid: { rows: 2, cols: 3, requiredCount: 2 },
      correctAnswer: ["0:0", "0:1"],
      explanation: "The rectangle has 6 equal parts. Shading any 2 parts shows 2/6.",
    };
  }

  if (item === 31) {
    return {
      ...question,
      questionText: `Select all of the expressions that are equal to ${5 + v} x 12.`,
      options: [
        { label: "A", text: `12 x ${5 + v}` },
        { label: "B", text: `${5 + v} x (10 + 2)` },
        { label: "C", text: `${5 + v} + 12` },
        { label: "D", text: `(${5 + v} x 10) + (${5 + v} x 2)` },
      ],
      correctAnswer: ["A", "B", "D"],
      explanation: "The commutative and distributive properties show that A, B, and D are equivalent.",
    };
  }

  if (item === 32) {
    const length = 7 + v;
    const width = 5 + v;
    return textAnswer(
      question,
      `A rectangular garden is ${length} feet long and ${width} feet wide. What is the area of the garden in square feet?`,
      String(length * width),
      `${length} x ${width} = ${length * width} square feet.`
    );
  }

  if (item === 33) {
    const side = 9 + v;
    return textAnswer(
      question,
      `A square sign has sides that are each ${side} inches long. What is the perimeter of the sign in inches?`,
      String(side * 4),
      `${side} + ${side} + ${side} + ${side} = ${side * 4}.`
    );
  }

  if (item === 34) {
    const a = 4 + v;
    const b = 3 + v;
    const c = 5 + v;
    return {
      ...question,
      questionText: `Which property of multiplication does this equation show?\n\n${a} x (${b} + ${c}) = (${a} x ${b}) + (${a} x ${c})`,
      options: [
        { label: "A", text: "Commutative property" },
        { label: "B", text: "Associative property" },
        { label: "C", text: "Distributive property" },
        { label: "D", text: "Identity property" },
      ],
      correctAnswer: "C",
      explanation: "The factor is distributed to both addends inside the parentheses.",
    };
  }

  if (item === 35) {
    const divisor = 8 + v;
    const quotient = 6 + v;
    return textAnswer(
      question,
      `What is ${divisor * quotient} ÷ ${divisor}?`,
      String(quotient),
      `${divisor * quotient} ÷ ${divisor} = ${quotient}.`
    );
  }

  if (item === 36) {
    return {
      ...question,
      questionText: "A movie starts at 6:35 p.m. and ends at 8:10 p.m. How long is the movie?",
      options: [
        { label: "A", text: "1 hour 15 minutes" },
        { label: "B", text: "1 hour 25 minutes" },
        { label: "C", text: "1 hour 35 minutes" },
        { label: "D", text: "2 hours 35 minutes" },
      ],
      correctAnswer: "C",
      explanation: "From 6:35 to 7:35 is 1 hour, and from 7:35 to 8:10 is 35 minutes.",
    };
  }

  return undefined;
}

export function rebaselineHardPracticeQuestion(question: Question): Question {
  const config = configs[question.practiceTest as 8 | 9 | 10];
  if (!config) return question;

  if (question.subject === "math" && question.testType === "cat") {
    const mathCat = rebaselineMathCat(question, config);
    if (mathCat) return mathCat;
  }

  if (question.subject === "math" && question.testType === "pt") {
    const mathPt = rebaselineMathPt(question, config);
    if (mathPt) return mathPt;
  }

  if (question.subject === "ela" && question.testType === "cat") {
    const replacement = config.elaCat[question.id] ?? config.presentationCat[question.id];
    if (replacement) {
      return {
        ...question,
        audio: undefined,
        type: replacement.options && !replacement.type ? "multiple-choice" : question.type,
        ...replacement,
      };
    }
  }

  return question;
}
