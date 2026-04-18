import { writeFileSync } from "node:fs";
import { type Question } from "../lib/questions";
import { buildDedicatedPracticeTestQuestions } from "../lib/practice-test-adapter";

type TailConfig = {
  test: number;
  presentationOneTitle: string;
  presentationOneTranscript: string;
  presentationTwoTitle: string;
  presentationTwoTranscript: string;
  researchTopic: string;
  pairTitle: string;
  question25: Omit<Question, "id" | "grade" | "practiceTest" | "subject" | "testType">;
  question26: Omit<Question, "id" | "grade" | "practiceTest" | "subject" | "testType">;
  question27: Omit<Question, "id" | "grade" | "practiceTest" | "subject" | "testType">;
  question28: Omit<Question, "id" | "grade" | "practiceTest" | "subject" | "testType">;
  question29: Omit<Question, "id" | "grade" | "practiceTest" | "subject" | "testType">;
  question30: Omit<Question, "id" | "grade" | "practiceTest" | "subject" | "testType">;
};

function makeTailQuestion(
  test: number,
  id: number,
  data: Omit<Question, "id" | "grade" | "practiceTest" | "subject" | "testType">
): Question {
  return {
    id,
    grade: 3,
    practiceTest: test,
    subject: "ela",
    testType: "cat",
    ...data,
  };
}

const configs: TailConfig[] = [
  {
    test: 2,
    presentationOneTitle: "Caring for Storm After the Rain",
    presentationOneTranscript: `Listen to the presentation. Then answer the questions.

**Caring for Storm After the Rain**
*presentation transcript for classroom use*

Speaker 1: Our class is sharing a report about how Maya helped a lost dog during a storm.

Speaker 2: Maya first noticed the dog shivering beside the road. She did not walk away. Instead, she told her mother what she saw.

Speaker 1: Maya and her mother brought a towel, guided the dog into their car, and took it home so it could get warm and dry.

Speaker 2: After that, Maya helped by giving the dog water and staying calm while her mother made phone calls to find out whether the dog belonged to someone nearby.

Speaker 1: The report teaches that helping an animal can begin with one small choice. A person must notice the problem, act carefully, and keep trying until the animal is safe.`,
    presentationTwoTitle: "Keeping Ocean Animals Safe",
    presentationTwoTranscript: `Listen to the presentation. Then answer the questions.

**Keeping Ocean Animals Safe**
*presentation transcript for classroom use*

Speaker 1: This presentation explains two ways people help ocean animals.

Speaker 2: First, many volunteers collect plastic and trash from beaches before that trash can wash into the ocean.

Speaker 1: Second, inventors have created machines that gather floating plastic from ocean water. These tools help remove dangerous trash that animals might mistake for food.

Speaker 2: Scientists and community groups also teach people to use less plastic. When people throw away less trash, fewer harmful materials reach the ocean in the first place.

Speaker 1: The main message is simple: people can protect ocean animals by cleaning up pollution and by preventing new pollution from spreading.`,
    researchTopic: "helping animals",
    pairTitle: "The Storm Dog / The Amazing Ocean",
    question25: {
      claim: 3, target: "18", dok: 2, standard: "SL.3.2", type: "multiple-choice",
      passage: "",
      passageTitle: "Caring for Storm After the Rain",
      questionText: "What is the main idea of the presentation?",
      options: [
        { label: "A", text: "Storms always scare animals away from towns" },
        { label: "B", text: "People can help a lost animal by noticing the problem and acting carefully" },
        { label: "C", text: "Dogs like riding in cars during storms" },
        { label: "D", text: "Maya wanted to keep every dog she found" },
      ],
      correctAnswer: "B",
      rubric: "The student identifies the main idea of the presentation.",
      points: 1,
      explanation: "The speakers explain that Maya noticed the dog, acted carefully, and kept helping until it was safe.",
    },
    question26: {
      claim: 3, target: "18", dok: 3, standard: "SL.3.2", type: "two-part",
      passage: "",
      passageTitle: "Caring for Storm After the Rain",
      questionText: "Answer both parts of the question.",
      partAPrompt: "Part A: Why did the speakers include details about the towel, water, and phone calls?",
      partAOptions: [
        { label: "A", text: "to show the order of steps people took to help the dog" },
        { label: "B", text: "to prove storms are worse than snow" },
        { label: "C", text: "to compare dogs with ocean animals" },
        { label: "D", text: "to explain why Maya missed school" },
      ],
      partBPrompt: "Part B: Which detail best supports your answer?",
      partBOptions: [
        { label: "A", text: "Maya first noticed the dog shivering beside the road." },
        { label: "B", text: "Maya helped by giving the dog water and staying calm while her mother made phone calls." },
        { label: "C", text: "A person must keep trying until the animal is safe." },
        { label: "D", text: "Our class is sharing a report." },
      ],
      correctAnswer: ["A", "B"],
      rubric: "The student identifies the purpose of the details and the best supporting evidence.",
      points: 1,
      explanation: "The listed details show the careful steps Maya and her mother used to help the dog.",
    },
    question27: {
      claim: 3, target: "19", dok: 3, standard: "SL.3.2", type: "grid-match",
      passage: "",
      passageTitle: "Caring for Storm After the Rain",
      questionText: "Complete the chart to show what happened before or after Storm was safe inside the car.",
      gridRows: [
        "Maya noticed the dog shivering.",
        "Maya and her mother brought a towel.",
        "The dog received water at home.",
        "Phone calls were made to find the owner.",
      ],
      gridColumns: ["Before Storm was safe in the car", "After Storm was safe in the car"],
      correctAnswer: ["0:0", "1:0", "2:1", "3:1"],
      rubric: "The student correctly sorts events from the presentation.",
      points: 1,
      explanation: "Maya noticing the dog and bringing the towel happened first; the water and phone calls happened afterward.",
    },
    question28: {
      claim: 3, target: "19", dok: 2, standard: "SL.3.2", type: "multiple-choice",
      passage: "",
      passageTitle: "Keeping Ocean Animals Safe",
      questionText: "Which idea is explained in the presentation?",
      options: [
        { label: "A", text: "Ocean animals can solve pollution problems without people" },
        { label: "B", text: "People can protect ocean animals by removing trash and using less plastic" },
        { label: "C", text: "Only scientists should visit beaches" },
        { label: "D", text: "Beach cleanups do not change anything" },
      ],
      correctAnswer: "B",
      rubric: "The student identifies a key idea from the presentation.",
      points: 1,
      explanation: "The speakers describe cleanup work, plastic-collecting machines, and using less plastic to help animals.",
    },
    question29: {
      claim: 4, target: "20", dok: 3, standard: "W.3.8", type: "multi-select",
      questionText: "A student is researching ways people help animals. Which two sources would give the most useful information?",
      options: [
        { label: "A", text: "A fact article about how beach cleanups protect sea life" },
        { label: "B", text: "A comic strip about a talking goldfish" },
        { label: "C", text: "An interview with a veterinarian about rescuing lost pets" },
        { label: "D", text: "A menu from a seafood restaurant" },
        { label: "E", text: "A poster showing favorite dog names" },
      ],
      correctAnswer: ["A", "C"],
      rubric: "The student selects the two best research sources.",
      points: 1,
      explanation: "The beach-cleanup article and veterinarian interview both give factual information about helping animals.",
    },
    question30: {
      claim: 4, target: "21", dok: 3, standard: "RI.3.9", type: "multiple-choice",
      passage: "",
      passageTitle: "The Storm Dog / The Amazing Ocean",
      questionText: "Which idea is supported by both texts?",
      options: [
        { label: "A", text: "People can make a difference when they notice a problem and take action" },
        { label: "B", text: "All animals should live with humans" },
        { label: "C", text: "Storms are the main cause of ocean pollution" },
        { label: "D", text: "Helping animals is always easy" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies a shared idea across the two texts.",
      points: 1,
      explanation: "Maya helps a lost dog directly, and people help ocean animals by cleaning pollution and changing habits.",
    },
  },
  {
    test: 3,
    presentationOneTitle: "Growing a School Garden Together",
    presentationOneTranscript: `Listen to the presentation. Then answer the questions.

**Growing a School Garden Together**
*presentation transcript for classroom use*

Speaker 1: Our report is about how a class started a school garden and kept it growing.

Speaker 2: Students did not finish the garden in one afternoon. They prepared the soil, planted seeds, watered the beds, and checked the plants every day.

Speaker 1: When weeds appeared, the class pulled them out. When the weather turned hot, the students watered early so the plants would not dry out.

Speaker 2: The class learned that a healthy garden needs steady care. Small jobs repeated over time can lead to a strong harvest.`,
    presentationTwoTitle: "Why Bees Matter in a Garden",
    presentationTwoTranscript: `Listen to the presentation. Then answer the questions.

**Why Bees Matter in a Garden**
*presentation transcript for classroom use*

Speaker 1: Bees help gardens in an important way.

Speaker 2: As bees visit flowers, pollen sticks to their bodies. When they move to other flowers, they carry that pollen with them.

Speaker 1: This movement helps many plants grow fruits, vegetables, and seeds. Without pollination, a garden may produce less food.

Speaker 2: People can help bees by planting flowers, avoiding harmful chemicals, and protecting places where bees can find food.`,
    researchTopic: "gardens and bees",
    pairTitle: "The Surprise Garden / The Busy World of Honeybees",
    question25: {
      claim: 3, target: "18", dok: 2, standard: "SL.3.2", type: "multiple-choice",
      passage: "",
      passageTitle: "Growing a School Garden Together",
      questionText: "What is the main idea of the presentation?",
      options: [
        { label: "A", text: "A garden grows best when people care for it regularly" },
        { label: "B", text: "Weeds are the most interesting part of gardening" },
        { label: "C", text: "Students should only garden in winter" },
        { label: "D", text: "A harvest happens after one day of work" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies the main idea of the presentation.",
      points: 1,
      explanation: "The speakers explain that repeated care like watering and weeding helps a garden grow well.",
    },
    question26: {
      claim: 3, target: "18", dok: 3, standard: "SL.3.2", type: "two-part",
      passage: "",
      passageTitle: "Growing a School Garden Together",
      questionText: "Answer both parts of the question.",
      partAPrompt: "Part A: Why do the speakers describe watering early and pulling weeds?",
      partAOptions: [
        { label: "A", text: "to show that gardening needs many small jobs done over time" },
        { label: "B", text: "to prove that weeds are stronger than vegetables" },
        { label: "C", text: "to compare gardens with oceans" },
        { label: "D", text: "to explain how to buy seeds at a store" },
      ],
      partBPrompt: "Part B: Which detail best supports your answer?",
      partBOptions: [
        { label: "A", text: "Students prepared the soil, planted seeds, watered the beds, and checked the plants every day." },
        { label: "B", text: "Our report is about how a class started a school garden." },
        { label: "C", text: "A healthy garden needs steady care." },
        { label: "D", text: "The students watered early." },
      ],
      correctAnswer: ["A", "A"],
      rubric: "The student identifies the purpose of the details and the best support.",
      points: 1,
      explanation: "The list of repeated gardening jobs best supports the idea that steady care matters.",
    },
    question27: {
      claim: 3, target: "19", dok: 3, standard: "SL.3.2", type: "grid-match",
      passage: "",
      passageTitle: "Growing a School Garden Together",
      questionText: "Complete the chart to show which jobs happened during setup and which jobs happened during ongoing care.",
      gridRows: [
        "Preparing the soil",
        "Planting seeds",
        "Checking the plants every day",
        "Pulling weeds",
      ],
      gridColumns: ["Garden setup", "Ongoing care"],
      correctAnswer: ["0:0", "1:0", "2:1", "3:1"],
      rubric: "The student sorts gardening jobs correctly.",
      points: 1,
      explanation: "Preparing and planting happen at the start; checking plants and pulling weeds continue over time.",
    },
    question28: {
      claim: 3, target: "19", dok: 2, standard: "SL.3.2", type: "multiple-choice",
      passage: "",
      passageTitle: "Why Bees Matter in a Garden",
      questionText: "Which idea is explained in the presentation?",
      options: [
        { label: "A", text: "Bees only help flowers that are blue" },
        { label: "B", text: "Bees help gardens by carrying pollen from flower to flower" },
        { label: "C", text: "Plants can grow fruits without pollination" },
        { label: "D", text: "People should never plant flowers" },
      ],
      correctAnswer: "B",
      rubric: "The student identifies a key idea from the presentation.",
      points: 1,
      explanation: "The speakers explain pollination and how bees help plants produce food and seeds.",
    },
    question29: {
      claim: 4, target: "20", dok: 3, standard: "W.3.8", type: "multi-select",
      questionText: "A student is researching gardens and bees. Which two sources would be most useful?",
      options: [
        { label: "A", text: "A guide about planting flowers that attract pollinators" },
        { label: "B", text: "A funny story about a bee wearing shoes" },
        { label: "C", text: "An article explaining how pollination helps food grow" },
        { label: "D", text: "A map of famous amusement parks" },
        { label: "E", text: "A song list called Garden Beats" },
      ],
      correctAnswer: ["A", "C"],
      rubric: "The student selects the two strongest research sources.",
      points: 1,
      explanation: "The planting guide and pollination article both offer useful facts about gardens and bees.",
    },
    question30: {
      claim: 4, target: "21", dok: 3, standard: "RI.3.9", type: "multiple-choice",
      passage: "",
      passageTitle: "The Surprise Garden / The Busy World of Honeybees",
      questionText: "Which idea is supported by both texts?",
      options: [
        { label: "A", text: "Healthy gardens depend on care and helpful natural processes" },
        { label: "B", text: "Bees should only live inside gardens" },
        { label: "C", text: "Gardens can grow without water or pollination" },
        { label: "D", text: "Only adults can grow plants successfully" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies a shared idea across the two texts.",
      points: 1,
      explanation: "The garden story shows steady care, and the bee article shows pollination, both of which help plants thrive.",
    },
  },
  {
    test: 4,
    presentationOneTitle: "Where Did the Kite Land?",
    presentationOneTranscript: `Listen to the presentation. Then answer the questions.

**Where Did the Kite Land?**
*presentation transcript for classroom use*

Speaker 1: This report retells how Ben finally found his lost kite.

Speaker 2: First, the kite flew too high when the wind changed. Ben and his mother followed the string as far as they could.

Speaker 1: They searched near the field and along the path. Then Ben noticed a flash of red caught in a bush.

Speaker 2: Ben was disappointed at first, but he kept looking carefully. In the end, patience helped him solve the problem and get the kite back.`,
    presentationTwoTitle: "How Butterflies Change",
    presentationTwoTranscript: `Listen to the presentation. Then answer the questions.

**How Butterflies Change**
*presentation transcript for classroom use*

Speaker 1: Butterflies go through four stages as they grow.

Speaker 2: A butterfly begins as an egg. Next, it becomes a caterpillar that eats and grows quickly.

Speaker 1: After that, the caterpillar forms a chrysalis. Inside, its body changes in major ways.

Speaker 2: Finally, an adult butterfly comes out. The full life cycle shows that change can happen step by step over time.`,
    researchTopic: "kites and butterflies",
    pairTitle: "The Lost Kite / All About Butterflies",
    question25: {
      claim: 3, target: "18", dok: 2, standard: "SL.3.2", type: "multiple-choice",
      passage: "",
      passageTitle: "Where Did the Kite Land?",
      questionText: "What is the main idea of the presentation?",
      options: [
        { label: "A", text: "Ben found his kite because he searched carefully and did not give up" },
        { label: "B", text: "Bushes are the best place to fly kites" },
        { label: "C", text: "Wind always ruins outdoor games" },
        { label: "D", text: "Kites should only be blue" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies the main idea of the presentation.",
      points: 1,
      explanation: "The speakers explain that Ben kept looking carefully and eventually found the kite.",
    },
    question26: {
      claim: 3, target: "18", dok: 3, standard: "SL.3.2", type: "two-part",
      passage: "",
      passageTitle: "Where Did the Kite Land?",
      questionText: "Answer both parts of the question.",
      partAPrompt: "Part A: Why do the speakers mention the field, the path, and the bush?",
      partAOptions: [
        { label: "A", text: "to show the order of places Ben searched" },
        { label: "B", text: "to explain how butterflies travel" },
        { label: "C", text: "to tell why the wind stopped" },
        { label: "D", text: "to compare red and blue kites" },
      ],
      partBPrompt: "Part B: Which detail best supports your answer?",
      partBOptions: [
        { label: "A", text: "The kite flew too high when the wind changed." },
        { label: "B", text: "They searched near the field and along the path." },
        { label: "C", text: "Ben was disappointed at first." },
        { label: "D", text: "Patience helped him solve the problem." },
      ],
      correctAnswer: ["A", "B"],
      rubric: "The student identifies why the details were included and the best supporting evidence.",
      points: 1,
      explanation: "The different places show the sequence of Ben's search.",
    },
    question27: {
      claim: 3, target: "19", dok: 3, standard: "SL.3.2", type: "grid-match",
      passage: "",
      passageTitle: "How Butterflies Change",
      questionText: "Complete the chart to show the order of the butterfly life cycle.",
      gridRows: ["Egg", "Caterpillar", "Chrysalis", "Adult butterfly"],
      gridColumns: ["First", "Second", "Third", "Fourth"],
      correctAnswer: ["0:0", "1:1", "2:2", "3:3"],
      rubric: "The student matches each life-cycle stage to its correct order.",
      points: 1,
      explanation: "The life cycle moves from egg to caterpillar to chrysalis to adult butterfly.",
    },
    question28: {
      claim: 3, target: "19", dok: 2, standard: "SL.3.2", type: "multiple-choice",
      passage: "",
      passageTitle: "How Butterflies Change",
      questionText: "Which idea is explained in the presentation?",
      options: [
        { label: "A", text: "Butterflies skip the caterpillar stage" },
        { label: "B", text: "Butterflies change in several steps over time" },
        { label: "C", text: "Adult butterflies turn back into eggs" },
        { label: "D", text: "Only butterflies with bright wings can fly" },
      ],
      correctAnswer: "B",
      rubric: "The student identifies the central idea of the presentation.",
      points: 1,
      explanation: "The speakers explain each life-cycle stage to show how butterflies change step by step.",
    },
    question29: {
      claim: 4, target: "20", dok: 3, standard: "W.3.8", type: "multi-select",
      questionText: "A student is researching how living things or objects move through air. Which two sources would be most helpful?",
      options: [
        { label: "A", text: "A science article about the life cycle of butterflies" },
        { label: "B", text: "A weather report about wind speed and flying kites" },
        { label: "C", text: "A menu from a park snack stand" },
        { label: "D", text: "A joke book about insects" },
        { label: "E", text: "A coloring page of a kite" },
      ],
      correctAnswer: ["A", "B"],
      rubric: "The student selects the two most relevant sources.",
      points: 1,
      explanation: "The butterfly article and wind report both give useful information about movement through air.",
    },
    question30: {
      claim: 4, target: "21", dok: 3, standard: "RI.3.9", type: "multiple-choice",
      passage: "",
      passageTitle: "The Lost Kite / All About Butterflies",
      questionText: "Which idea is supported by both texts?",
      options: [
        { label: "A", text: "Things that move through air can change direction in ways people notice" },
        { label: "B", text: "All flying things are alive" },
        { label: "C", text: "A kite and a butterfly move in exactly the same way" },
        { label: "D", text: "Only strong wind helps things move" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies a shared idea across the two texts.",
      points: 1,
      explanation: "Ben follows the kite's movement in wind, and the butterfly text explains how butterflies move from place to place.",
    },
  },
  {
    test: 5,
    presentationOneTitle: "Building the Lemonade Stand",
    presentationOneTranscript: `Listen to the presentation. Then answer the questions.

**Building the Lemonade Stand**
*presentation transcript for classroom use*

Speaker 1: Our class report explains how Lily and Jake prepared their lemonade stand.

Speaker 2: First, they gathered supplies such as cups, lemons, markers, and cardboard for the sign.

Speaker 1: Next, they decided how to arrange the table so customers could read the sign, pay safely, and pick up drinks easily.

Speaker 2: They also practiced working together. One person poured lemonade while the other handled money and greeted customers.

Speaker 1: The report shows that planning ahead helped the stand run smoothly on the big day.`,
    presentationTwoTitle: "Homes Animals Build",
    presentationTwoTranscript: `Listen to the presentation. Then answer the questions.

**Homes Animals Build**
*presentation transcript for classroom use*

Speaker 1: Animals build homes for important reasons.

Speaker 2: A robin makes a nest from grass and mud to hold eggs safely. A beaver builds a lodge from sticks and mud to create shelter near water.

Speaker 1: Prairie dogs dig connected tunnels underground, and bees build hives with wax cells.

Speaker 2: Each home is built from materials the animal can find nearby. The shape of the home helps meet the animal's needs.

Speaker 1: Even though the homes are different, each one shows careful building for protection and daily life.`,
    researchTopic: "building things",
    pairTitle: "The Lemonade Stand / Amazing Animal Homes",
    question25: {
      claim: 3, target: "18", dok: 2, standard: "SL.3.2", type: "multiple-choice",
      passage: "",
      passageTitle: "Building the Lemonade Stand",
      questionText: "What is the main idea of the presentation?",
      options: [
        { label: "A", text: "Running a lemonade stand works better when people plan and share jobs" },
        { label: "B", text: "Lemons are difficult to cut evenly" },
        { label: "C", text: "Cardboard signs should always be blue" },
        { label: "D", text: "Customers only care about the price of drinks" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies the main idea of the presentation.",
      points: 1,
      explanation: "The speakers focus on gathering supplies, arranging the table, and sharing jobs so the stand runs well.",
    },
    question26: {
      claim: 3, target: "18", dok: 3, standard: "SL.3.2", type: "two-part",
      passage: "",
      passageTitle: "Building the Lemonade Stand",
      questionText: "Answer both parts of the question.",
      partAPrompt: "Part A: Why do the speakers mention different jobs at the stand?",
      partAOptions: [
        { label: "A", text: "to show that teamwork helped the stand run smoothly" },
        { label: "B", text: "to prove that signs are more important than lemonade" },
        { label: "C", text: "to explain why the stand closed early" },
        { label: "D", text: "to compare beavers and birds" },
      ],
      partBPrompt: "Part B: Which detail best supports your answer?",
      partBOptions: [
        { label: "A", text: "They gathered supplies such as cups, lemons, markers, and cardboard." },
        { label: "B", text: "One person poured lemonade while the other handled money and greeted customers." },
        { label: "C", text: "They practiced working together." },
        { label: "D", text: "The report explains how Lily and Jake prepared their stand." },
      ],
      correctAnswer: ["A", "B"],
      rubric: "The student identifies the reason for the detail and the best evidence.",
      points: 1,
      explanation: "The different jobs show how teamwork made the stand work better.",
    },
    question27: {
      claim: 3, target: "19", dok: 3, standard: "SL.3.2", type: "grid-match",
      passage: "",
      passageTitle: "Homes Animals Build",
      questionText: "Complete the chart to show which home each animal builds.",
      gridRows: ["Robin", "Beaver", "Prairie dog", "Bee"],
      gridColumns: ["Nest", "Lodge", "Tunnel", "Hive"],
      correctAnswer: ["0:0", "1:1", "2:2", "3:3"],
      rubric: "The student matches each animal to its home.",
      points: 1,
      explanation: "Robins build nests, beavers build lodges, prairie dogs dig tunnels, and bees build hives.",
    },
    question28: {
      claim: 3, target: "19", dok: 2, standard: "SL.3.2", type: "multiple-choice",
      passage: "",
      passageTitle: "Homes Animals Build",
      questionText: "Which idea is explained in the presentation?",
      options: [
        { label: "A", text: "Animals build homes that fit their needs and materials" },
        { label: "B", text: "All animal homes are made from wax" },
        { label: "C", text: "Birds and bees build the same kind of home" },
        { label: "D", text: "Only water animals build shelters" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies a main idea from the presentation.",
      points: 1,
      explanation: "The speakers explain that different animals use nearby materials and shapes that meet their needs.",
    },
    question29: {
      claim: 4, target: "20", dok: 3, standard: "W.3.8", type: "multi-select",
      questionText: "A student is researching how people and animals build useful things. Which two sources would be most helpful?",
      options: [
        { label: "A", text: "A guide about planning a small stand or booth" },
        { label: "B", text: "A poster of favorite summer drinks" },
        { label: "C", text: "A nonfiction article about animal homes and shelters" },
        { label: "D", text: "A menu from a restaurant" },
        { label: "E", text: "A comic about a talking lemon" },
      ],
      correctAnswer: ["A", "C"],
      rubric: "The student selects the strongest research sources.",
      points: 1,
      explanation: "The guide and the nonfiction article both give useful facts about building and shelter.",
    },
    question30: {
      claim: 4, target: "21", dok: 3, standard: "RI.3.9", type: "multiple-choice",
      passage: "",
      passageTitle: "The Lemonade Stand / Amazing Animal Homes",
      questionText: "Which idea is supported by both texts?",
      options: [
        { label: "A", text: "Building something useful takes planning and the right materials" },
        { label: "B", text: "Only humans can work together on a project" },
        { label: "C", text: "All homes should be built above ground" },
        { label: "D", text: "A stand and a hive are exactly the same" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies a shared idea across the two texts.",
      points: 1,
      explanation: "Both texts show planning and materials helping to build something useful.",
    },
  },
  {
    test: 6,
    presentationOneTitle: "Planning the Lantern Walk",
    presentationOneTranscript: `Listen to the presentation. Then answer the questions.

**Planning the Lantern Walk**
*presentation transcript for classroom use*

Speaker 1: This presentation tells how the town kept its lantern walk tradition after the bridge changed.

Speaker 2: People first noticed that the old route would not work safely anymore. Instead of canceling the event, they met to think of new ideas.

Speaker 1: Bakers, artists, and families all helped. Some prepared food, some built lanterns, and others suggested a new path through town.

Speaker 2: By sharing ideas, the town protected the tradition while also adjusting to a changed place.

Speaker 1: The report shows that a community can solve a problem when many people contribute.`,
    presentationTwoTitle: "What Rivers Change",
    presentationTwoTranscript: `Listen to the presentation. Then answer the questions.

**What Rivers Change**
*presentation transcript for classroom use*

Speaker 1: Rivers do more than carry water.

Speaker 2: Over time, moving water can wear away rock and soil. This process is called erosion.

Speaker 1: Rivers can also carry soil to new places and build up banks or deltas. At the same time, rivers provide water and habitats for living things.

Speaker 2: Because rivers shape both land and life, people often depend on them in many ways.

Speaker 1: The main idea is that rivers are always affecting the places around them.`,
    researchTopic: "communities and rivers",
    pairTitle: "The Lantern Bridge / How Rivers Shape the Land",
    question25: {
      claim: 3, target: "18", dok: 2, standard: "SL.3.2", type: "multiple-choice",
      passage: "",
      passageTitle: "Planning the Lantern Walk",
      questionText: "What is the main idea of the presentation?",
      options: [
        { label: "A", text: "A community can keep a tradition by solving problems together" },
        { label: "B", text: "Bakeries are the most important part of a town festival" },
        { label: "C", text: "Lanterns should only be used on bridges" },
        { label: "D", text: "Traditions should never change" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies the main idea of the presentation.",
      points: 1,
      explanation: "The speakers explain that the town worked together to protect the lantern walk after the route changed.",
    },
    question26: {
      claim: 3, target: "18", dok: 3, standard: "SL.3.2", type: "two-part",
      passage: "",
      passageTitle: "Planning the Lantern Walk",
      questionText: "Answer both parts of the question.",
      partAPrompt: "Part A: Why do the speakers name bakers, artists, and families?",
      partAOptions: [
        { label: "A", text: "to show that many different people helped solve the problem" },
        { label: "B", text: "to explain why the event moved to another town" },
        { label: "C", text: "to compare food with lanterns" },
        { label: "D", text: "to describe the weather during the event" },
      ],
      partBPrompt: "Part B: Which detail best supports your answer?",
      partBOptions: [
        { label: "A", text: "People first noticed that the old route would not work safely anymore." },
        { label: "B", text: "Some prepared food, some built lanterns, and others suggested a new path through town." },
        { label: "C", text: "This presentation tells how the town kept its lantern walk tradition." },
        { label: "D", text: "The report shows that a community can solve a problem." },
      ],
      correctAnswer: ["A", "B"],
      rubric: "The student identifies the purpose of the detail and the best support.",
      points: 1,
      explanation: "The list of helpers shows how many people contributed to the solution.",
    },
    question27: {
      claim: 3, target: "19", dok: 3, standard: "SL.3.2", type: "grid-match",
      passage: "",
      passageTitle: "What Rivers Change",
      questionText: "Complete the chart to show whether each detail tells how rivers shape land or support life.",
      gridRows: [
        "Wear away rock and soil",
        "Build up banks or deltas",
        "Provide habitats",
        "Supply water to living things",
      ],
      gridColumns: ["Shape land", "Support life"],
      correctAnswer: ["0:0", "1:0", "2:1", "3:1"],
      rubric: "The student sorts river effects correctly.",
      points: 1,
      explanation: "Erosion and build-up shape land, while habitats and water support life.",
    },
    question28: {
      claim: 3, target: "19", dok: 2, standard: "SL.3.2", type: "multiple-choice",
      passage: "",
      passageTitle: "What Rivers Change",
      questionText: "Which idea is explained in the presentation?",
      options: [
        { label: "A", text: "Rivers affect both land and living things over time" },
        { label: "B", text: "Rivers only matter to fish" },
        { label: "C", text: "Erosion stops all plants from growing" },
        { label: "D", text: "Every river makes the same kinds of landforms" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies a main idea from the presentation.",
      points: 1,
      explanation: "The speakers explain erosion, land build-up, habitats, and water supply as effects of rivers.",
    },
    question29: {
      claim: 4, target: "20", dok: 3, standard: "W.3.8", type: "multi-select",
      questionText: "A student is researching how communities and rivers affect places. Which two sources would be most helpful?",
      options: [
        { label: "A", text: "An article about river erosion and habitats" },
        { label: "B", text: "A poster advertising a bakery sale" },
        { label: "C", text: "A local history report about a town tradition" },
        { label: "D", text: "A joke book about bridges" },
        { label: "E", text: "A blank map with no labels" },
      ],
      correctAnswer: ["A", "C"],
      rubric: "The student selects the best research sources.",
      points: 1,
      explanation: "The river article and local history report both support the research topic directly.",
    },
    question30: {
      claim: 4, target: "21", dok: 3, standard: "RI.3.9", type: "multiple-choice",
      passage: "",
      passageTitle: "The Lantern Bridge / How Rivers Shape the Land",
      questionText: "Which idea is supported by both texts?",
      options: [
        { label: "A", text: "Water and the places around it can affect a whole community" },
        { label: "B", text: "Rivers always make towns smaller" },
        { label: "C", text: "Traditions cannot survive change" },
        { label: "D", text: "Only scientists understand rivers" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies a shared idea across the texts.",
      points: 1,
      explanation: "Both texts show waterways affecting people, land, and community life.",
    },
  },
  {
    test: 7,
    presentationOneTitle: "How the Courtyard Changed",
    presentationOneTranscript: `Listen to the presentation. Then answer the questions.

**How the Courtyard Changed**
*presentation transcript for classroom use*

Speaker 1: Our presentation explains how the library courtyard became a moonlight garden.

Speaker 2: At first, the courtyard seemed plain and empty. The student helpers had to imagine what it could become.

Speaker 1: Week after week, they planted flowers, added paths, and worked quietly until the space felt welcoming.

Speaker 2: One student changed her mind about the project. She learned that quiet places can be meaningful and beautiful.

Speaker 1: The report shows that patient work can transform a place people once ignored.`,
    presentationTwoTitle: "Why Wetlands Help",
    presentationTwoTranscript: `Listen to the presentation. Then answer the questions.

**Why Wetlands Help**
*presentation transcript for classroom use*

Speaker 1: Wetlands may look muddy or still, but they do important work.

Speaker 2: Wetlands hold extra water during storms, which can reduce flooding nearby.

Speaker 1: They also provide habitats for animals and help improve water quality by trapping some mud and pollution.

Speaker 2: Communities now protect many wetlands because people better understand their value.

Speaker 1: The main message is that wetlands quietly help both nature and people.`,
    researchTopic: "quiet places that help communities",
    pairTitle: "The Moonlight Garden / Why Wetlands Matter",
    question25: {
      claim: 3, target: "18", dok: 2, standard: "SL.3.2", type: "multiple-choice",
      passage: "",
      passageTitle: "How the Courtyard Changed",
      questionText: "What is the main idea of the presentation?",
      options: [
        { label: "A", text: "Patient work helped turn an overlooked courtyard into a special place" },
        { label: "B", text: "Libraries should always stay open late at night" },
        { label: "C", text: "Flowers only bloom in moonlight" },
        { label: "D", text: "Quiet projects are never interesting" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies the main idea of the presentation.",
      points: 1,
      explanation: "The speakers focus on steady work changing the courtyard into a welcoming moonlight garden.",
    },
    question26: {
      claim: 3, target: "18", dok: 3, standard: "SL.3.2", type: "two-part",
      passage: "",
      passageTitle: "How the Courtyard Changed",
      questionText: "Answer both parts of the question.",
      partAPrompt: "Part A: Why do the speakers mention that one student changed her mind?",
      partAOptions: [
        { label: "A", text: "to show that the project helped people notice value they had missed at first" },
        { label: "B", text: "to prove the student disliked libraries" },
        { label: "C", text: "to explain how to grow wetland plants" },
        { label: "D", text: "to compare the courtyard to a storm" },
      ],
      partBPrompt: "Part B: Which detail best supports your answer?",
      partBOptions: [
        { label: "A", text: "At first, the courtyard seemed plain and empty." },
        { label: "B", text: "One student changed her mind about the project." },
        { label: "C", text: "She learned that quiet places can be meaningful and beautiful." },
        { label: "D", text: "The student helpers added paths." },
      ],
      correctAnswer: ["A", "C"],
      rubric: "The student identifies the purpose of the detail and the best support.",
      points: 1,
      explanation: "The change in the student's thinking shows how the project revealed the courtyard's value.",
    },
    question27: {
      claim: 3, target: "19", dok: 3, standard: "SL.3.2", type: "grid-match",
      passage: "",
      passageTitle: "Why Wetlands Help",
      questionText: "Complete the chart to show how each detail helps wetlands support nature or people.",
      gridRows: [
        "Hold extra storm water",
        "Provide animal habitats",
        "Improve water quality",
        "Reduce flooding nearby",
      ],
      gridColumns: ["Helps nature", "Helps people"],
      correctAnswer: ["0:1", "1:0", "2:1", "3:1"],
      rubric: "The student sorts wetland benefits correctly.",
      points: 1,
      explanation: "Habitats help nature directly, while holding water, improving water quality, and reducing flooding all help people too.",
    },
    question28: {
      claim: 3, target: "19", dok: 2, standard: "SL.3.2", type: "multiple-choice",
      passage: "",
      passageTitle: "Why Wetlands Help",
      questionText: "Which idea is explained in the presentation?",
      options: [
        { label: "A", text: "Wetlands quietly help both nature and people" },
        { label: "B", text: "Wetlands should always be filled with dirt" },
        { label: "C", text: "Only animals benefit from wetlands" },
        { label: "D", text: "Wetlands stop all storms from happening" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies a main idea from the presentation.",
      points: 1,
      explanation: "The speakers describe multiple ways wetlands support animals, water, and nearby communities.",
    },
    question29: {
      claim: 4, target: "20", dok: 3, standard: "W.3.8", type: "multi-select",
      questionText: "A student is researching how overlooked places can become important. Which two sources would be most helpful?",
      options: [
        { label: "A", text: "An article about restoring habitats such as wetlands" },
        { label: "B", text: "A flyer about moon phases only" },
        { label: "C", text: "A report on improving a community garden or courtyard" },
        { label: "D", text: "A list of library card numbers" },
        { label: "E", text: "A comic about a talking frog" },
      ],
      correctAnswer: ["A", "C"],
      rubric: "The student selects the most useful research sources.",
      points: 1,
      explanation: "The restoration article and improvement report both relate directly to the research topic.",
    },
    question30: {
      claim: 4, target: "21", dok: 3, standard: "RI.3.9", type: "multiple-choice",
      passage: "",
      passageTitle: "The Moonlight Garden / Why Wetlands Matter",
      questionText: "Which idea is supported by both texts?",
      options: [
        { label: "A", text: "Places that seem quiet or plain can become valuable when people understand and care for them" },
        { label: "B", text: "Only experts should take care of natural spaces" },
        { label: "C", text: "All useful places must be bright and noisy" },
        { label: "D", text: "Wetlands and courtyards should be closed to visitors" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies a shared idea across the texts.",
      points: 1,
      explanation: "Both texts show overlooked places becoming important when people notice and care for them.",
    },
  },
  {
    test: 8,
    presentationOneTitle: "The Story Inside the Bell Tower",
    presentationOneTranscript: `Listen to the presentation. Then answer the questions.

**The Story Inside the Bell Tower**
*presentation transcript for classroom use*

Speaker 1: This presentation explains how Leah's discovery in the bell tower helped the town understand its past.

Speaker 2: Leah found an old map and realized it matched the harbor route that people once used.

Speaker 1: The discovery helped the town see why the bell and tower had mattered so much. They were part of guiding sailors safely home.

Speaker 2: Instead of staying hidden under dust, the map became a clue that connected the present town to earlier generations.

Speaker 1: The report shows that old objects can still teach important lessons.`,
    presentationTwoTitle: "How New Land Forms",
    presentationTwoTranscript: `Listen to the presentation. Then answer the questions.

**How New Land Forms**
*presentation transcript for classroom use*

Speaker 1: Volcanoes can change Earth's surface over time.

Speaker 2: Melted rock called magma rises, erupts, and cools into solid rock. After many eruptions, new land can build up.

Speaker 1: Some islands and mountains form from these repeated changes. What begins as hot rock can later become part of a landscape people use and study.

Speaker 2: The process may be slow, but it can create something new and valuable.

Speaker 1: The main idea is that change over time can build land rather than only destroy it.`,
    researchTopic: "how places change over time",
    pairTitle: "The Map in the Bell Tower / How Volcanoes Build New Land",
    question25: {
      claim: 3, target: "18", dok: 2, standard: "SL.3.2", type: "multiple-choice",
      passage: "",
      passageTitle: "The Story Inside the Bell Tower",
      questionText: "What is the main idea of the presentation?",
      options: [
        { label: "A", text: "Leah's discovery helped the town understand an important part of its history" },
        { label: "B", text: "Bell towers should be cleaned every day" },
        { label: "C", text: "Maps are only useful to sailors" },
        { label: "D", text: "Dust always ruins old objects" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies the main idea of the presentation.",
      points: 1,
      explanation: "The speakers explain that the map helped the town reconnect with its harbor history.",
    },
    question26: {
      claim: 3, target: "18", dok: 3, standard: "SL.3.2", type: "two-part",
      passage: "",
      passageTitle: "The Story Inside the Bell Tower",
      questionText: "Answer both parts of the question.",
      partAPrompt: "Part A: Why do the speakers mention that the map was hidden under dust?",
      partAOptions: [
        { label: "A", text: "to show that something forgotten can still be meaningful" },
        { label: "B", text: "to prove the tower was dangerous" },
        { label: "C", text: "to explain why volcanoes erupt" },
        { label: "D", text: "to compare maps and bells" },
      ],
      partBPrompt: "Part B: Which detail best supports your answer?",
      partBOptions: [
        { label: "A", text: "Leah found an old map and realized it matched the harbor route." },
        { label: "B", text: "Instead of staying hidden under dust, the map became a clue that connected the present town to earlier generations." },
        { label: "C", text: "The tower had mattered so much." },
        { label: "D", text: "The report shows that old objects can still teach important lessons." },
      ],
      correctAnswer: ["A", "B"],
      rubric: "The student identifies the purpose of the detail and the best support.",
      points: 1,
      explanation: "The dust detail helps show that something forgotten still had important meaning.",
    },
    question27: {
      claim: 3, target: "19", dok: 3, standard: "SL.3.2", type: "grid-match",
      passage: "",
      passageTitle: "How New Land Forms",
      questionText: "Complete the chart to show the order of the land-building process.",
      gridRows: ["Magma rises", "Rock erupts", "Rock cools", "Land builds up over time"],
      gridColumns: ["First", "Second", "Third", "Fourth"],
      correctAnswer: ["0:0", "1:1", "2:2", "3:3"],
      rubric: "The student matches each stage to the correct order.",
      points: 1,
      explanation: "The process begins with rising magma and ends with land building over time.",
    },
    question28: {
      claim: 3, target: "19", dok: 2, standard: "SL.3.2", type: "multiple-choice",
      passage: "",
      passageTitle: "How New Land Forms",
      questionText: "Which idea is explained in the presentation?",
      options: [
        { label: "A", text: "Change over time can create new land" },
        { label: "B", text: "Volcanoes never help people" },
        { label: "C", text: "All islands are made in one day" },
        { label: "D", text: "Only scientists can see cooled rock" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies a main idea from the presentation.",
      points: 1,
      explanation: "The speakers explain that repeated eruptions and cooling can build something new over time.",
    },
    question29: {
      claim: 4, target: "20", dok: 3, standard: "W.3.8", type: "multi-select",
      questionText: "A student is researching how places change over time. Which two sources would be most helpful?",
      options: [
        { label: "A", text: "A history article about old landmarks and town records" },
        { label: "B", text: "A recipe for soup" },
        { label: "C", text: "A science article about volcanic eruptions and landforms" },
        { label: "D", text: "A comic about a lost shoe" },
        { label: "E", text: "A list of bell sounds" },
      ],
      correctAnswer: ["A", "C"],
      rubric: "The student selects the most useful research sources.",
      points: 1,
      explanation: "The history and science articles both relate directly to changes in important places over time.",
    },
    question30: {
      claim: 4, target: "21", dok: 3, standard: "RI.3.9", type: "multiple-choice",
      passage: "",
      passageTitle: "The Map in the Bell Tower / How Volcanoes Build New Land",
      questionText: "Which idea is supported by both texts?",
      options: [
        { label: "A", text: "Changes over time can create something people later value" },
        { label: "B", text: "Old objects should always stay hidden" },
        { label: "C", text: "Natural forces only destroy places" },
        { label: "D", text: "History and science have nothing in common" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies a shared idea across the texts.",
      points: 1,
      explanation: "Both texts show time and change creating something meaningful or useful.",
    },
  },
  {
    test: 9,
    presentationOneTitle: "Making the Best Rainy Day Plan",
    presentationOneTranscript: `Listen to the presentation. Then answer the questions.

**Making the Best Rainy Day Plan**
*presentation transcript for classroom use*

Speaker 1: This presentation explains how the children turned a rainy problem into a good day.

Speaker 2: At first, they were disappointed because outdoor plans had to change.

Speaker 1: Instead of giving up, they looked for indoor choices that would still be fun for the whole group.

Speaker 2: By trying a new plan, they discovered that the day could still be successful even though the weather changed.

Speaker 1: The report shows that flexible thinking can improve a difficult situation.`,
    presentationTwoTitle: "What Clouds Tell Us",
    presentationTwoTranscript: `Listen to the presentation. Then answer the questions.

**What Clouds Tell Us**
*presentation transcript for classroom use*

Speaker 1: Different clouds can help people predict weather.

Speaker 2: Stratus clouds often spread across the sky and may bring light rain or drizzle. Puffy cumulus clouds are more common on fair days.

Speaker 1: High, thin cirrus clouds can show that weather is changing. By watching clouds, people can learn clues about what might happen next.

Speaker 2: Clouds also help Earth by affecting temperature and bringing water.

Speaker 1: The main idea is that clouds give useful information about weather and the environment.`,
    researchTopic: "weather and planning",
    pairTitle: "The Rainy Day Plan / Clouds in the Sky",
    question25: {
      claim: 3, target: "18", dok: 2, standard: "SL.3.2", type: "multiple-choice",
      passage: "",
      passageTitle: "Making the Best Rainy Day Plan",
      questionText: "What is the main idea of the presentation?",
      options: [
        { label: "A", text: "Changing a plan can still lead to a good result" },
        { label: "B", text: "Rain always ruins a day" },
        { label: "C", text: "Indoor games are better than outdoor games" },
        { label: "D", text: "Weather forecasts are never correct" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies the main idea of the presentation.",
      points: 1,
      explanation: "The speakers focus on flexible thinking helping the children enjoy the day despite the rain.",
    },
    question26: {
      claim: 3, target: "18", dok: 3, standard: "SL.3.2", type: "two-part",
      passage: "",
      passageTitle: "Making the Best Rainy Day Plan",
      questionText: "Answer both parts of the question.",
      partAPrompt: "Part A: Why do the speakers mention the children's disappointment at first?",
      partAOptions: [
        { label: "A", text: "to show how much the situation improved after they changed plans" },
        { label: "B", text: "to explain what clouds are made of" },
        { label: "C", text: "to prove they disliked one another" },
        { label: "D", text: "to compare indoor games with science reports" },
      ],
      partBPrompt: "Part B: Which detail best supports your answer?",
      partBOptions: [
        { label: "A", text: "At first, they were disappointed because outdoor plans had to change." },
        { label: "B", text: "By trying a new plan, they discovered that the day could still be successful." },
        { label: "C", text: "They looked for indoor choices." },
        { label: "D", text: "This presentation explains how the children turned a rainy problem into a good day." },
      ],
      correctAnswer: ["A", "B"],
      rubric: "The student identifies the purpose of the detail and the best support.",
      points: 1,
      explanation: "The disappointment detail helps highlight how much better the day became after the new plan.",
    },
    question27: {
      claim: 3, target: "19", dok: 3, standard: "SL.3.2", type: "grid-match",
      passage: "",
      passageTitle: "What Clouds Tell Us",
      questionText: "Complete the chart to show which cloud clue matches each cloud type.",
      gridRows: ["Stratus", "Cumulus", "Cirrus"],
      gridColumns: ["Often linked to light rain", "Often seen on fair days", "Can show weather is changing"],
      correctAnswer: ["0:0", "1:1", "2:2"],
      rubric: "The student matches each cloud type to its clue.",
      points: 1,
      explanation: "Stratus is tied to drizzle, cumulus to fair weather, and cirrus to changing weather.",
    },
    question28: {
      claim: 3, target: "19", dok: 2, standard: "SL.3.2", type: "multiple-choice",
      passage: "",
      passageTitle: "What Clouds Tell Us",
      questionText: "Which idea is explained in the presentation?",
      options: [
        { label: "A", text: "Clouds can give clues about weather and also help Earth" },
        { label: "B", text: "Only one kind of cloud matters" },
        { label: "C", text: "Rain can happen without clouds" },
        { label: "D", text: "People should never study the sky" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies a main idea from the presentation.",
      points: 1,
      explanation: "The speakers explain cloud clues, temperature effects, and water in the environment.",
    },
    question29: {
      claim: 4, target: "20", dok: 3, standard: "W.3.8", type: "multi-select",
      questionText: "A student is researching weather and planning ahead. Which two sources would be most helpful?",
      options: [
        { label: "A", text: "A science article about cloud types and weather clues" },
        { label: "B", text: "A comic about a talking umbrella" },
        { label: "C", text: "A story about changing plans when weather shifts" },
        { label: "D", text: "A menu of soup flavors" },
        { label: "E", text: "A list of favorite playground games only" },
      ],
      correctAnswer: ["A", "C"],
      rubric: "The student selects the strongest research sources.",
      points: 1,
      explanation: "The cloud article and the story about changing plans both support the topic directly.",
    },
    question30: {
      claim: 4, target: "21", dok: 3, standard: "RI.3.9", type: "multiple-choice",
      passage: "",
      passageTitle: "The Rainy Day Plan / Clouds in the Sky",
      questionText: "Which idea is supported by both texts?",
      options: [
        { label: "A", text: "Weather affects what people do, so understanding it can be useful" },
        { label: "B", text: "Rain should always stop activities completely" },
        { label: "C", text: "Only scientists can learn from clouds" },
        { label: "D", text: "All clouds bring the same kind of weather" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies a shared idea across the texts.",
      points: 1,
      explanation: "The story shows plans changing because of rain, and the article shows how cloud knowledge helps people understand weather.",
    },
  },
  {
    test: 10,
    presentationOneTitle: "Training for the River Race",
    presentationOneTranscript: `Listen to the presentation. Then answer the questions.

**Training for the River Race**
*presentation transcript for classroom use*

Speaker 1: This presentation explains how Nadia prepared for the river race.

Speaker 2: She did not depend on speed alone. She practiced in different conditions and learned how the river moved.

Speaker 1: During the race, she remembered that working with the current could help her more than fighting against it.

Speaker 2: Her success came from both steady practice and smart decisions while she was in the water.

Speaker 1: The report shows that preparation matters when a challenge is long and difficult.`,
    presentationTwoTitle: "How Monarchs Make the Trip",
    presentationTwoTranscript: `Listen to the presentation. Then answer the questions.

**How Monarchs Make the Trip**
*presentation transcript for classroom use*

Speaker 1: Monarch butterflies travel a very long distance during migration.

Speaker 2: They use clues such as the sun and Earth's magnetic field to stay on course.

Speaker 1: The trip does not happen in a single lifetime. Different generations complete parts of the journey.

Speaker 2: Even with threats such as habitat loss, monarchs continue the migration by relying on built-in abilities that help them survive.

Speaker 1: The main idea is that difficult journeys can be completed through special skills and persistence.`,
    researchTopic: "how living things complete difficult journeys",
    pairTitle: "The River Race / The Long Journey of the Monarch Butterfly",
    question25: {
      claim: 3, target: "18", dok: 2, standard: "SL.3.2", type: "multiple-choice",
      passage: "",
      passageTitle: "Training for the River Race",
      questionText: "What is the main idea of the presentation?",
      options: [
        { label: "A", text: "Success in a difficult race depends on preparation and smart choices" },
        { label: "B", text: "Rivers are easier than pools" },
        { label: "C", text: "Only speed matters in swimming" },
        { label: "D", text: "Practice should never change" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies the main idea of the presentation.",
      points: 1,
      explanation: "The speakers explain that Nadia used training and smart choices to succeed.",
    },
    question26: {
      claim: 3, target: "18", dok: 3, standard: "SL.3.2", type: "two-part",
      passage: "",
      passageTitle: "Training for the River Race",
      questionText: "Answer both parts of the question.",
      partAPrompt: "Part A: Why do the speakers mention that Nadia learned how the river moved?",
      partAOptions: [
        { label: "A", text: "to show that understanding conditions helped her make good decisions" },
        { label: "B", text: "to prove the river never changes" },
        { label: "C", text: "to compare the race with butterfly wings" },
        { label: "D", text: "to explain why training is unnecessary" },
      ],
      partBPrompt: "Part B: Which detail best supports your answer?",
      partBOptions: [
        { label: "A", text: "She practiced in different conditions and learned how the river moved." },
        { label: "B", text: "During the race, she remembered that working with the current could help her more than fighting against it." },
        { label: "C", text: "The report shows that preparation matters." },
        { label: "D", text: "This presentation explains how Nadia prepared." },
      ],
      correctAnswer: ["A", "B"],
      rubric: "The student identifies the purpose of the detail and the best support.",
      points: 1,
      explanation: "Learning the river helped Nadia make the smart choice to work with the current.",
    },
    question27: {
      claim: 3, target: "19", dok: 3, standard: "SL.3.2", type: "grid-match",
      passage: "",
      passageTitle: "How Monarchs Make the Trip",
      questionText: "Complete the chart to show which detail tells about navigation or about completing the journey over time.",
      gridRows: [
        "Use the sun to stay on course",
        "Use Earth's magnetic field",
        "Different generations complete parts of the trip",
        "Migration continues even with threats",
      ],
      gridColumns: ["Navigation detail", "Journey-over-time detail"],
      correctAnswer: ["0:0", "1:0", "2:1", "3:1"],
      rubric: "The student sorts details from the presentation correctly.",
      points: 1,
      explanation: "The first two rows describe navigation, while the last two describe how the migration continues over time.",
    },
    question28: {
      claim: 3, target: "19", dok: 2, standard: "SL.3.2", type: "multiple-choice",
      passage: "",
      passageTitle: "How Monarchs Make the Trip",
      questionText: "Which idea is explained in the presentation?",
      options: [
        { label: "A", text: "Monarchs complete long journeys by relying on special abilities and persistence" },
        { label: "B", text: "Monarchs only migrate when humans help them" },
        { label: "C", text: "All butterflies travel the same route every day" },
        { label: "D", text: "Migration is easy and never dangerous" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies a main idea from the presentation.",
      points: 1,
      explanation: "The speakers explain navigation clues, multiple generations, and persistence during migration.",
    },
    question29: {
      claim: 4, target: "20", dok: 3, standard: "W.3.8", type: "multi-select",
      questionText: "A student is researching how people or animals finish difficult journeys. Which two sources would be most helpful?",
      options: [
        { label: "A", text: "A report about training for long races or swims" },
        { label: "B", text: "A poster of river fish" },
        { label: "C", text: "A science article about animal migration and navigation" },
        { label: "D", text: "A recipe for trail mix" },
        { label: "E", text: "A list of favorite sports uniforms" },
      ],
      correctAnswer: ["A", "C"],
      rubric: "The student selects the strongest research sources.",
      points: 1,
      explanation: "The race report and migration article both directly support the research topic.",
    },
    question30: {
      claim: 4, target: "21", dok: 3, standard: "RI.3.9", type: "multiple-choice",
      passage: "",
      passageTitle: "The River Race / The Long Journey of the Monarch Butterfly",
      questionText: "Which idea is supported by both texts?",
      options: [
        { label: "A", text: "Long challenges can be completed by using the right skills and persistence" },
        { label: "B", text: "Winning always means coming in first place" },
        { label: "C", text: "Only humans can prepare for difficult travel" },
        { label: "D", text: "Natural forces should always be fought against" },
      ],
      correctAnswer: "A",
      rubric: "The student identifies a shared idea across the texts.",
      points: 1,
      explanation: "Both texts show difficult journeys being completed through skill, preparation, and persistence.",
    },
  },
];

const configMap = new Map(configs.map((config) => [config.test, config]));

function updateElaCat(test: number, questions: Question[]): Question[] {
  const config = configMap.get(test);
  if (!config) {
    return questions;
  }

  const ids = questions.slice(-6).map((question) => question.id);
  const replacements = [
    makeTailQuestion(test, ids[0], {
      ...config.question25,
      passage: config.presentationOneTranscript,
    }),
    makeTailQuestion(test, ids[1], {
      ...config.question26,
      passage: config.presentationOneTranscript,
    }),
    makeTailQuestion(test, ids[2], {
      ...config.question27,
      passage:
        config.question27.passageTitle === config.presentationTwoTitle
          ? config.presentationTwoTranscript
          : config.presentationOneTranscript,
    }),
    makeTailQuestion(test, ids[3], {
      ...config.question28,
      passage: config.presentationTwoTranscript,
    }),
    makeTailQuestion(test, ids[4], config.question29),
    makeTailQuestion(test, ids[5], {
      ...config.question30,
      passage:
        questions.find((question) => question.passageTitle && !question.passageTitle.includes("/"))?.passage ??
        config.presentationOneTranscript,
    }),
  ];

  const untouched = questions.filter((question) => question.id < ids[0]);
  const finalQuestion = replacements[5];
  finalQuestion.passage =
    [
      questions.find((question) => question.passageTitle === replacements[0].passageTitle)?.passage ??
        config.presentationOneTranscript,
      questions.find((question) => question.passageTitle === replacements[3].passageTitle)?.passage ??
        config.presentationTwoTranscript,
    ].join("\n\n---\n\n");

  return [...untouched, ...replacements];
}

for (const test of Array.from({ length: 9 }, (_, index) => index + 2)) {
  const questions = buildDedicatedPracticeTestQuestions(test);

  const mathCat = questions.filter((question) => question.subject === "math" && question.testType === "cat");
  const mathPt = questions.filter((question) => question.subject === "math" && question.testType === "pt");
  const elaCat = updateElaCat(
    test,
    questions.filter((question) => question.subject === "ela" && question.testType === "cat")
  );
  const elaPt = questions.filter((question) => question.subject === "ela" && question.testType === "pt");

  const rebuilt = [...mathCat, ...mathPt, ...elaCat, ...elaPt];

  const content =
    `import type { Question } from "./questions";\n\n` +
    `export const practiceTest${test}Questions: Question[] = ${JSON.stringify(rebuilt, null, 2)};\n`;

  writeFileSync(`lib/practice-test-${test}.ts`, content);
}
