import type { Question } from "./questions";

const brokenRobotPassage = `Read the passage and answer the questions.

**The Broken Robot**
*by Nina Park*

Ms. Vega's class was getting ready for the Spring Parade. Each class would bring something special to the school gym. Ms. Vega's class had built a small robot named Pip. Pip was made from cardboard, small wheels, a shiny bowl for a head, and a battery pack.

"Pip can carry our class sign," said Ava.

"And Pip can blink its lights," said Theo.

The class had practiced all week. Theo pulled a string to make Pip roll. Ava pressed a button to make Pip's lights flash. Everyone clapped each time Pip moved across the floor.

On parade morning, the class set Pip by the door. Ms. Vega checked the sign. Ava checked the lights. Theo held the string.

"Ready?" Ms. Vega asked.

Theo gave the string a gentle pull.

Nothing happened.

Theo tried again. Pip did not move.

"Oh no," Ava said. "The parade starts in ten minutes!"

The class gathered around the robot. Some students wanted to pull harder. Some wanted to shake the battery pack. Ms. Vega held up her hand.

"Engineers solve problems step by step," she said. "First, we look. Then, we test."

Ava knelt beside Pip. "The wheels are not stuck," she said.

Theo looked at the battery pack. "The light wire is connected," he said.

Mina pointed to the string. "The string is wrapped around the back wheel," she said. "It can't turn."

Theo carefully unwound the string. Then he pulled again.

Pip rolled across the room.

"Now press the light button!" called Ava.

The lights flashed bright blue.

The class cheered. Ms. Vega smiled.

"You fixed it by observing and testing," she said. "That is what real engineers do."

During the parade, Pip carried the class sign all the way across the gym. When the other classes clapped, Ava whispered, "Good job, team."

Theo grinned. "Good job, Pip too."`;

const simpleMachinesPassage = `Read the passage and answer the questions.

**How Simple Machines Help People Work**

People use tools every day. Some tools are called **simple machines**. A simple machine makes work easier by helping people lift, move, or change the direction of a force.

One simple machine is a **lever**. A lever is a stiff bar that moves on a point called a fulcrum. A seesaw is a kind of lever. So is a crowbar. When a person pushes down on one end, the other end lifts up.

Another simple machine is a **wheel and axle**. A wheel turns around a rod called an axle. Doorknobs, rolling carts, and toy wagons use wheels and axles. This machine helps people move things more easily.

A **pulley** uses a wheel and rope. A flagpole often has a pulley. When a person pulls down on the rope, the flag goes up. Pulleys help lift things and change the direction of a pull.

A **ramp** is also called an inclined plane. A ramp helps move objects to a higher place without lifting them straight up. Moving a box up a ramp is often easier than carrying it up steps.

People also use a **wedge**. A wedge has a sharp edge. It can split or cut things apart. An ax and the blade of a shovel are examples of wedges.

Simple machines may look small, but they do important jobs. They help workers unload trucks. They help families move heavy boxes. They even help students use scissors, staplers, and classroom doors. When people understand how simple machines work, they can choose the best tool for each job.`;

const balloonPresentation = `Listen to or read the presentation. Then answer the questions.

**Soaring on the Wings of the Wind**

Good morning, class. Today I am going to tell you about one of the first hot-air balloon flights in America.

Long ago, people were curious about whether a person could rise into the sky inside a balloon. In Baltimore, a man named Peter Carnes wanted to show a crowd how a balloon could fly. He built a balloon from light cloth and filled it with hot air. Hot air rises, so the balloon began to lift.

Peter Carnes used a stove to make the balloon rise again and again while people watched. The crowd clapped because many of them had never seen anything like it before.

Then something surprising happened. Smoke from a nearby fire swelled the balloon even more. The balloon lifted suddenly, and Edward Warren Jr. was carried up with it. Edward had not planned to take a ride that day, but he became the first American to rise into the air in a hot-air balloon.

As the balloon floated, Edward could see the city from above. People below stared up at the sky. Even though the ride was unexpected, the event became an important moment in American history because it showed that hot-air balloons could really carry people.`;

const pizzaPresentation = `Listen to or read the presentation. Then answer the questions.

**Pizza Around the World**

Hello, everyone. Today I want to talk about pizza in a new way. Many people think of pizza as one kind of food, but pizza can look very different from place to place.

In the United States, many people enjoy pizza topped with pepperoni. In India, cooks may add ginger to give pizza a spicy taste. In Japan, some pizzas are topped with eel. These toppings may sound unusual to some people, but they are normal in those places.

These examples show that pizza is not just one recipe. A pizza can be made with many different ingredients. People in each place choose toppings they like and ingredients they know well.

So when you see a pizza that looks different from the one you usually eat, try thinking about it in a new way. Almost anything can go on a pizza, and that is part of what makes pizza interesting.`;

const robotPtSource1 = `Source 1

**Fixing the Parade Robot**

Students in Room 8 built a small robot for the town parade. The robot was supposed to carry a sign and blink its lights while it rolled down the street. During the last practice, the robot stopped moving. The students did not panic. They checked the wheels, the wires, and the battery. Then one student noticed that a ribbon had wrapped around an axle. After the ribbon was removed, the robot worked again. The class learned that careful observing can help solve a problem quickly.`;

const robotPtSource2 = `Source 2

**Machines in Everyday Life**

Simple machines help people do jobs at home, at school, and at work. A ramp helps move heavy boxes into a truck. A pulley helps raise a flag. A wheel and axle helps a cart roll. These tools do not solve problems by themselves. People must choose the right tool and use it the right way. When people understand how a machine works, they can finish a task more safely and more easily.`;

const petFairPtDirections = `**Mathematics Performance Task**

The neighborhood pet fair needs tables, ribbons, and treat bags for each pet group.

Use the table to answer the questions about the pet fair.`;

const petFairTable = {
  columns: ["Dogs", "Cats", "Rabbits"],
  rows: [
    { label: "Pets entered", values: [8, 6, 4] },
    { label: "Treat bags packed", values: [10, 8, 5] },
    { label: "Blue ribbons", values: [3, 3, 2] },
  ],
};

const practiceTest12MathCAT: Question[] = [
  {
    id: 12001, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 1, domain: "OA", target: "A", dok: 1, standard: "3.OA.A.1",
    type: "text-input",
    questionText: "At the pet fair, 3 dogs each wear 2 tags. How many tags are there in all?",
    correctAnswer: "6",
    rubric: "The student enters the correct product.",
    points: 1,
  },
  {
    id: 12002, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 1, domain: "OA", target: "A", dok: 1, standard: "3.OA.A.3",
    type: "multiple-choice",
    questionText: "There are 4 pet cages. Each cage has 5 water cups. How many water cups are there in all?",
    options: [
      { label: "A", text: "9" },
      { label: "B", text: "20" },
      { label: "C", text: "15" },
      { label: "D", text: "25" },
    ],
    correctAnswer: "B",
    rubric: "The student selects the correct product.",
    points: 1,
  },
  {
    id: 12003, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 1, domain: "OA", target: "B", dok: 1, standard: "3.OA.A.4",
    type: "text-input",
    questionText: "What number makes this equation true?\n\n? × 4 = 16",
    correctAnswer: "4",
    rubric: "The student enters the missing factor.",
    points: 1,
  },
  {
    id: 12004, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 1, domain: "OA", target: "A", dok: 2, standard: "3.OA.A.2",
    type: "text-input",
    questionText: "A helper packs 18 dog treats equally into 3 bags. How many treats go in each bag?",
    correctAnswer: "6",
    rubric: "The student enters the correct quotient.",
    points: 1,
  },
  {
    id: 12005, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 3, domain: "OA", target: "F", dok: 2, standard: "3.OA.B.5",
    type: "multiple-choice",
    questionText: "Which equation shows the commutative property of multiplication?",
    options: [
      { label: "A", text: "3 × 5 = 5 × 3" },
      { label: "B", text: "12 ÷ 3 = 4" },
      { label: "C", text: "7 + 2 = 9" },
      { label: "D", text: "6 × 1 = 6" },
    ],
    correctAnswer: "A",
    rubric: "The student identifies the commutative property.",
    points: 1,
  },
  {
    id: 12006, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 1, domain: "OA", target: "D", dok: 1, standard: "3.OA.C.7",
    type: "multiple-choice",
    questionText: "Which number sentence is true?",
    options: [
      { label: "A", text: "7 × 3 = 18" },
      { label: "B", text: "4 × 5 = 20" },
      { label: "C", text: "6 × 2 = 10" },
      { label: "D", text: "9 × 3 = 24" },
    ],
    correctAnswer: "B",
    rubric: "The student selects the true equation.",
    points: 1,
  },
  {
    id: 12007, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 1, domain: "OA", target: "D", dok: 2, standard: "3.OA.D.8",
    type: "text-input",
    questionText: "A table has 25 pet ribbons. Then 7 ribbons are used. How many ribbons are left?",
    correctAnswer: "18",
    rubric: "The student enters the correct difference.",
    points: 1,
  },
  {
    id: 12008, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 1, domain: "OA", target: "D", dok: 2, standard: "3.OA.D.8",
    type: "multiple-choice",
    questionText: "A volunteer fills 3 bowls with 4 cups of water in each bowl. Then she adds 2 more cups of water. How many cups of water did she use in all?",
    options: [
      { label: "A", text: "10" },
      { label: "B", text: "12" },
      { label: "C", text: "14" },
      { label: "D", text: "15" },
    ],
    correctAnswer: "C",
    rubric: "The student solves a two-step problem.",
    points: 1,
  },
  {
    id: 12009, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 2, domain: "NBT", target: "A", dok: 1, standard: "3.NBT.A.2",
    type: "text-input",
    questionText: "What is 234 + 125?",
    correctAnswer: "359",
    rubric: "The student enters the correct sum.",
    points: 1,
  },
  {
    id: 12010, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 2, domain: "NBT", target: "A", dok: 1, standard: "3.NBT.A.2",
    type: "text-input",
    questionText: "What is 462 - 140?",
    correctAnswer: "322",
    rubric: "The student enters the correct difference.",
    points: 1,
  },
  {
    id: 12011, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 2, domain: "NBT", target: "A", dok: 1, standard: "3.NBT.A.1",
    type: "multiple-choice",
    questionText: "Which number is 507 written in expanded form?",
    options: [
      { label: "A", text: "500 + 7" },
      { label: "B", text: "50 + 7" },
      { label: "C", text: "500 + 70" },
      { label: "D", text: "5 + 7" },
    ],
    correctAnswer: "A",
    rubric: "The student identifies expanded form.",
    points: 1,
  },
  {
    id: 12012, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 2, domain: "NBT", target: "A", dok: 1, standard: "3.NBT.A.2",
    type: "multiple-choice",
    questionText: "A pet club sold 215 tickets in the morning and 120 tickets in the afternoon. How many tickets were sold in all?",
    options: [
      { label: "A", text: "325" },
      { label: "B", text: "335" },
      { label: "C", text: "345" },
      { label: "D", text: "305" },
    ],
    correctAnswer: "B",
    rubric: "The student adds within 1,000.",
    points: 1,
  },
  {
    id: 12013, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 2, domain: "NBT", target: "A", dok: 2, standard: "3.NBT.A.2",
    type: "multiple-choice",
    questionText: "A supply closet had 500 paper cups. The pet fair used 178 cups. About how many cups are left?",
    options: [
      { label: "A", text: "About 300" },
      { label: "B", text: "About 200" },
      { label: "C", text: "About 100" },
      { label: "D", text: "About 400" },
    ],
    correctAnswer: "A",
    rubric: "The student estimates a difference reasonably.",
    points: 1,
  },
  {
    id: 12014, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 1, domain: "OA", target: "D", dok: 2, standard: "3.OA.D.8",
    type: "multiple-choice",
    questionText: "A judge gave 6 rabbits carrots. Each rabbit got 2 carrots. Then 3 more carrots were added to the basket. How many carrots were there in all?",
    options: [
      { label: "A", text: "9" },
      { label: "B", text: "12" },
      { label: "C", text: "15" },
      { label: "D", text: "18" },
    ],
    correctAnswer: "C",
    rubric: "The student solves a two-step problem with multiplication and addition.",
    points: 1,
  },
  {
    id: 12015, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 3, domain: "OA", target: "F", dok: 2, standard: "3.OA.B.5",
    type: "multiple-choice",
    questionText: "Which expression is the same as 5 × 6?",
    options: [
      { label: "A", text: "(5 × 3) + (5 × 3)" },
      { label: "B", text: "5 + 6" },
      { label: "C", text: "6 - 5" },
      { label: "D", text: "30 - 5" },
    ],
    correctAnswer: "A",
    rubric: "The student uses the distributive property.",
    points: 1,
  },
  {
    id: 12016, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 4, domain: "NF", target: "A", dok: 1, standard: "3.NF.A.1",
    type: "multiple-choice",
    questionText: "One treat tray is split into 4 equal parts. 1 part has dog biscuits. Which fraction of the tray has dog biscuits?",
    options: [
      { label: "A", text: "1/2" },
      { label: "B", text: "1/3" },
      { label: "C", text: "1/4" },
      { label: "D", text: "4/1" },
    ],
    correctAnswer: "C",
    rubric: "The student identifies a unit fraction.",
    points: 1,
  },
  {
    id: 12017, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 4, domain: "NF", target: "A", dok: 1, standard: "3.NF.A.1",
    type: "text-input",
    questionText: "A ribbon board has 6 equal spaces. 2 spaces have blue ribbons. What fraction of the spaces have blue ribbons? Write the fraction.",
    correctAnswer: "2/6",
    acceptedAnswers: ["2/6", "1/3"],
    rubric: "The student enters an equivalent correct fraction.",
    points: 1,
  },
  {
    id: 12018, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 4, domain: "NF", target: "A", dok: 2, standard: "3.NF.A.3a",
    type: "multiple-choice",
    questionText: "Which fraction is equal to 3/3?",
    options: [
      { label: "A", text: "1" },
      { label: "B", text: "1/3" },
      { label: "C", text: "2/3" },
      { label: "D", text: "3/6" },
    ],
    correctAnswer: "A",
    rubric: "The student understands fractions equal to a whole.",
    points: 1,
  },
  {
    id: 12019, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 4, domain: "NF", target: "A", dok: 2, standard: "3.NF.A.3d",
    type: "multiple-choice",
    questionText: "Which comparison is true?",
    options: [
      { label: "A", text: "1/2 < 1/4" },
      { label: "B", text: "2/4 = 1/2" },
      { label: "C", text: "3/4 < 2/4" },
      { label: "D", text: "1/3 = 1/2" },
    ],
    correctAnswer: "B",
    rubric: "The student compares fractions with like values.",
    points: 1,
  },
  {
    id: 12020, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 4, domain: "MD", target: "A", dok: 1, standard: "3.MD.A.1",
    type: "multiple-choice",
    questionText: "The pet fair starts at 9:00 a.m. and ends at 11:00 a.m. How long is the fair open?",
    options: [
      { label: "A", text: "1 hour" },
      { label: "B", text: "2 hours" },
      { label: "C", text: "3 hours" },
      { label: "D", text: "4 hours" },
    ],
    correctAnswer: "B",
    rubric: "The student tells elapsed time to the hour.",
    points: 1,
  },
  {
    id: 12021, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 4, domain: "MD", target: "A", dok: 1, standard: "3.MD.A.2",
    type: "text-input",
    questionText: "A leash is 3 feet long. Another leash is 2 feet long. How many feet long are the two leashes together?",
    correctAnswer: "5",
    rubric: "The student adds lengths in whole numbers.",
    points: 1,
  },
  {
    id: 12022, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 4, domain: "MD", target: "B", dok: 2, standard: "3.MD.B.3",
    type: "multiple-choice",
    questionText: "A chart shows 4 dogs, 2 cats, and 3 rabbits entered in a game. Which statement is true?",
    options: [
      { label: "A", text: "There are fewer dogs than cats." },
      { label: "B", text: "There are more rabbits than dogs." },
      { label: "C", text: "There are 2 more dogs than cats." },
      { label: "D", text: "There are 3 more cats than rabbits." },
    ],
    correctAnswer: "C",
    rubric: "The student interprets simple data.",
    points: 1,
  },
  {
    id: 12023, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 4, domain: "MD", target: "C", dok: 1, standard: "3.MD.C.5",
    type: "multiple-choice",
    questionText: "A pet bed is shaped like a rectangle. It is 4 feet long and 3 feet wide. What is its area?",
    options: [
      { label: "A", text: "7 square feet" },
      { label: "B", text: "12 square feet" },
      { label: "C", text: "14 square feet" },
      { label: "D", text: "24 square feet" },
    ],
    correctAnswer: "B",
    rubric: "The student finds area by multiplying side lengths.",
    points: 1,
  },
  {
    id: 12024, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 4, domain: "MD", target: "D", dok: 1, standard: "3.MD.D.8",
    type: "text-input",
    questionText: "A rabbit pen is 5 feet long and 3 feet wide. What is the perimeter of the pen?",
    correctAnswer: "16",
    rubric: "The student enters the correct perimeter.",
    points: 1,
  },
  {
    id: 12025, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 4, domain: "G", target: "A", dok: 1, standard: "3.G.A.1",
    type: "multiple-choice",
    questionText: "Which shape has 4 equal sides?",
    options: [
      { label: "A", text: "Square" },
      { label: "B", text: "Triangle" },
      { label: "C", text: "Hexagon" },
      { label: "D", text: "Oval" },
    ],
    correctAnswer: "A",
    rubric: "The student identifies a square.",
    points: 1,
  },
  {
    id: 12026, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 4, domain: "G", target: "A", dok: 1, standard: "3.G.A.1",
    type: "multi-select",
    questionText: "Which TWO shapes are quadrilaterals? Select two answers.",
    options: [
      { label: "A", text: "Rectangle" },
      { label: "B", text: "Triangle" },
      { label: "C", text: "Square" },
      { label: "D", text: "Circle" },
    ],
    correctAnswer: ["A", "C"],
    rubric: "The student selects both quadrilaterals.",
    points: 1,
  },
  {
    id: 12027, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 1, domain: "OA", target: "B", dok: 1, standard: "3.OA.A.4",
    type: "multiple-choice",
    questionText: "What number makes this equation true?\n\n8 × ? = 40",
    options: [
      { label: "A", text: "4" },
      { label: "B", text: "5" },
      { label: "C", text: "6" },
      { label: "D", text: "8" },
    ],
    correctAnswer: "B",
    rubric: "The student finds the missing factor.",
    points: 1,
  },
  {
    id: 12028, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 1, domain: "OA", target: "A", dok: 1, standard: "3.OA.A.1",
    type: "text-input",
    questionText: "There are 5 rows of chairs with 2 chairs in each row. How many chairs are there in all?",
    correctAnswer: "10",
    rubric: "The student enters the correct product.",
    points: 1,
  },
  {
    id: 12029, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 2, domain: "NBT", target: "A", dok: 1, standard: "3.NBT.A.1",
    type: "multiple-choice",
    questionText: "Which number has 6 hundreds, 2 tens, and 4 ones?",
    options: [
      { label: "A", text: "624" },
      { label: "B", text: "264" },
      { label: "C", text: "642" },
      { label: "D", text: "462" },
    ],
    correctAnswer: "A",
    rubric: "The student identifies place value.",
    points: 1,
  },
  {
    id: 12030, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 4, domain: "MD", target: "C", dok: 2, standard: "3.MD.C.7",
    type: "multiple-choice",
    questionText: "A square pet mat has side length 4 feet. What is its area?",
    options: [
      { label: "A", text: "8 square feet" },
      { label: "B", text: "12 square feet" },
      { label: "C", text: "16 square feet" },
      { label: "D", text: "20 square feet" },
    ],
    correctAnswer: "C",
    rubric: "The student finds the area of a square.",
    points: 1,
  },
  {
    id: 12031, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 4, domain: "MD", target: "B", dok: 2, standard: "3.MD.B.3",
    type: "grid-match",
    questionText: "Match each pet-fair count to the correct description.",
    gridRows: ["2", "5", "8"],
    gridColumns: ["number of rabbit cages", "number of dogs in a race", "number of judges"],
    correctAnswer: ["0:2", "1:0", "2:1"],
    rubric: "The student correctly matches each count to a description.",
    points: 1,
  },
  {
    id: 12032, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 4, domain: "NF", target: "A", dok: 1, standard: "3.NF.A.2",
    type: "multiple-choice",
    questionText: "A ribbon strip is split into 8 equal parts. 4 parts are blue. Which fraction names the blue part?",
    options: [
      { label: "A", text: "4/8" },
      { label: "B", text: "4/4" },
      { label: "C", text: "8/4" },
      { label: "D", text: "1/8" },
    ],
    correctAnswer: "A",
    rubric: "The student names the fraction represented.",
    points: 1,
  },
  {
    id: 12033, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 1, domain: "OA", target: "C", dok: 1, standard: "3.OA.B.6",
    type: "multiple-choice",
    questionText: "Which division fact is related to 5 × 4 = 20?",
    options: [
      { label: "A", text: "20 ÷ 5 = 4" },
      { label: "B", text: "20 + 5 = 25" },
      { label: "C", text: "20 - 4 = 16" },
      { label: "D", text: "4 + 5 = 9" },
    ],
    correctAnswer: "A",
    rubric: "The student identifies a related division fact.",
    points: 1,
  },
  {
    id: 12034, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 2, domain: "NBT", target: "A", dok: 2, standard: "3.NBT.A.2",
    type: "text-input",
    questionText: "There were 650 fair flyers printed. Then 125 flyers were handed out. How many flyers are left?",
    correctAnswer: "525",
    rubric: "The student subtracts within 1,000.",
    points: 1,
  },
  {
    id: 12035, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 4, domain: "MD", target: "D", dok: 2, standard: "3.MD.D.8",
    type: "multiple-choice",
    questionText: "A cat play area is a rectangle that is 6 feet long and 2 feet wide. What is the perimeter?",
    options: [
      { label: "A", text: "8 feet" },
      { label: "B", text: "12 feet" },
      { label: "C", text: "16 feet" },
      { label: "D", text: "24 feet" },
    ],
    correctAnswer: "C",
    rubric: "The student finds perimeter using side lengths.",
    points: 1,
  },
  {
    id: 12036, practiceTest: 12, testType: "cat", subject: "math", grade: 3,
    claim: 3, domain: "OA", target: "F", dok: 2, standard: "3.OA.D.8",
    type: "multiple-choice",
    questionText: "Which expression can be used to find the number of water bowls if there are 24 bowls placed equally on 6 tables?",
    options: [
      { label: "A", text: "24 + 6" },
      { label: "B", text: "24 - 6" },
      { label: "C", text: "24 ÷ 6" },
      { label: "D", text: "6 × 24" },
    ],
    correctAnswer: "C",
    rubric: "The student chooses the correct operation and expression.",
    points: 1,
  },
];

const practiceTest12MathPT: Question[] = [
  {
    id: 12040, practiceTest: 12, testType: "pt", subject: "math", grade: 3,
    claim: 2, domain: "MD", target: "B", dok: 1, standard: "3.MD.B.3",
    type: "multi-select",
    studentDirections: petFairPtDirections,
    dataTable: petFairTable,
    questionText: "Which pet groups have more treat bags packed than pets entered? Select all that apply.",
    options: [
      { label: "A", text: "Dogs" },
      { label: "B", text: "Cats" },
      { label: "C", text: "Rabbits" },
    ],
    correctAnswer: ["A", "B", "C"],
    rubric: "The student selects all three pet groups.",
    points: 1,
  },
  {
    id: 12041, practiceTest: 12, testType: "pt", subject: "math", grade: 3,
    claim: 2, domain: "NBT", target: "A", dok: 1, standard: "3.NBT.A.2",
    type: "text-input",
    studentDirections: petFairPtDirections,
    dataTable: petFairTable,
    questionText: "How many pets entered the fair altogether?",
    correctAnswer: "18",
    rubric: "The student adds the pets entered across all groups.",
    points: 1,
  },
  {
    id: 12042, practiceTest: 12, testType: "pt", subject: "math", grade: 3,
    claim: 4, domain: "OA", target: "A", dok: 3, standard: "3.OA.D.8",
    type: "text-input",
    studentDirections: petFairPtDirections,
    dataTable: petFairTable,
    questionText: "A bird group wants to join the pet fair. Enter the pets entered, treat bags packed, and blue ribbons for one valid bird-group row, in that order, separated by commas. The bird group must enter more pets than rabbits and pack exactly 6 treat bags and 2 blue ribbons.",
    correctAnswer: "5,6,2",
    rubric: "The student enters a valid row with more than 4 pets, exactly 6 treat bags, and exactly 2 blue ribbons.",
    points: 1,
  },
  {
    id: 12043, practiceTest: 12, testType: "pt", subject: "math", grade: 3,
    claim: 3, domain: "NBT", target: "F", dok: 2, standard: "3.NBT.A.2",
    type: "short-answer",
    studentDirections: petFairPtDirections,
    dataTable: petFairTable,
    questionText: "Which pet group should get the largest table? Use numbers from the table to explain your answer.",
    correctAnswer: "The dog group should get the largest table because 8 dogs entered, which is more than 6 cats and 4 rabbits.",
    rubric: "2 points: The student names the dog group and supports the answer with numbers from the table. 1 point: The student names the dog group with incomplete support. 0 points: All other responses.",
    points: 2,
  },
  {
    id: 12044, practiceTest: 12, testType: "pt", subject: "math", grade: 3,
    claim: 4, domain: "OA", target: "A", dok: 3, standard: "3.OA.D.8",
    type: "short-answer",
    studentDirections: petFairPtDirections,
    dataTable: petFairTable,
    questionText: "The fair leader wants one extra treat bag for every pet group. Explain how many treat bags will be needed then.",
    correctAnswer: "There are 10 + 8 + 5 = 23 treat bags now. There are 3 pet groups, so 3 more treat bags are needed. The new total is 26 treat bags.",
    rubric: "2 points: The student finds 23 current treat bags, adds 3 more, and explains the new total of 26. 1 point: The student shows part of the reasoning. 0 points: All other responses.",
    points: 2,
  },
];

const practiceTest12ElaCAT: Question[] = [
  {
    id: 12101, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "RL", target: "A", dok: 1, standard: "RL.3.1",
    type: "multiple-choice",
    passage: brokenRobotPassage,
    passageTitle: "The Broken Robot",
    passageAuthor: "Nina Park",
    questionText: "What was Pip supposed to do in the parade?",
    options: [
      { label: "A", text: "Play music for the crowd" },
      { label: "B", text: "Carry the class sign and blink its lights" },
      { label: "C", text: "Sweep the gym floor" },
      { label: "D", text: "Pass out snacks to students" },
    ],
    correctAnswer: "B",
    rubric: "The student identifies a key detail from the story.",
    points: 1,
  },
  {
    id: 12102, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "RL", target: "B", dok: 2, standard: "RL.3.3",
    type: "multiple-choice",
    passage: brokenRobotPassage,
    passageTitle: "The Broken Robot",
    passageAuthor: "Nina Park",
    questionText: "How did Ava feel when Pip would not move?",
    options: [
      { label: "A", text: "Proud" },
      { label: "B", text: "Sleepy" },
      { label: "C", text: "Worried" },
      { label: "D", text: "Calm" },
    ],
    correctAnswer: "C",
    rubric: "The student identifies a character's feeling.",
    points: 1,
  },
  {
    id: 12103, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "RL", target: "B", dok: 2, standard: "RL.3.3",
    type: "two-part",
    passage: brokenRobotPassage,
    passageTitle: "The Broken Robot",
    passageAuthor: "Nina Park",
    questionText: "Answer both parts of the question.",
    partAPrompt: "What problem caused Pip to stop moving?",
    partAOptions: [
      { label: "A", text: "Its lights were too bright" },
      { label: "B", text: "The string was wrapped around a wheel" },
      { label: "C", text: "The class sign was too small" },
      { label: "D", text: "Ms. Vega forgot the battery" },
    ],
    partBPrompt: "Which detail from the story best supports your answer to Part A?",
    partBOptions: [
      { label: "A", text: "\"The wheels are not stuck,\" she said." },
      { label: "B", text: "\"The light wire is connected,\" he said." },
      { label: "C", text: "\"The string is wrapped around the back wheel,\" she said." },
      { label: "D", text: "\"The class had practiced all week.\"" },
    ],
    correctAnswer: ["B", "C"],
    rubric: "The student identifies the problem and supporting detail.",
    points: 1,
  },
  {
    id: 12104, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "RL", target: "C", dok: 1, standard: "RL.3.4",
    type: "multiple-choice",
    passage: brokenRobotPassage,
    passageTitle: "The Broken Robot",
    passageAuthor: "Nina Park",
    questionText: "What does the word \"gathered\" mean in the sentence \"The class gathered around the robot\"?",
    options: [
      { label: "A", text: "ran away" },
      { label: "B", text: "came together" },
      { label: "C", text: "whispered softly" },
      { label: "D", text: "looked outside" },
    ],
    correctAnswer: "B",
    rubric: "The student uses context to determine the meaning of a word.",
    points: 1,
  },
  {
    id: 12105, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "RL", target: "A", dok: 1, standard: "RL.3.2",
    type: "multiple-choice",
    passage: brokenRobotPassage,
    passageTitle: "The Broken Robot",
    passageAuthor: "Nina Park",
    questionText: "What is the main lesson of the story?",
    options: [
      { label: "A", text: "It is best to work alone." },
      { label: "B", text: "Careful teamwork can solve a problem." },
      { label: "C", text: "Robots always need new batteries." },
      { label: "D", text: "Parades should be held outside." },
    ],
    correctAnswer: "B",
    rubric: "The student identifies the story's lesson.",
    points: 1,
  },
  {
    id: 12106, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "RL", target: "D", dok: 2, standard: "RL.3.5",
    type: "multiple-choice",
    passage: brokenRobotPassage,
    passageTitle: "The Broken Robot",
    passageAuthor: "Nina Park",
    questionText: "Why does the problem with Pip happen before the parade begins?",
    options: [
      { label: "A", text: "It gives the class time to show how they solve a problem." },
      { label: "B", text: "It explains why the school gym is noisy." },
      { label: "C", text: "It shows that Pip was never built correctly." },
      { label: "D", text: "It helps the reader know what the parade looked like." },
    ],
    correctAnswer: "A",
    rubric: "The student analyzes how the story is organized.",
    points: 1,
  },
  {
    id: 12107, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "RL", target: "B", dok: 2, standard: "RL.3.3",
    type: "multiple-choice",
    passage: brokenRobotPassage,
    passageTitle: "The Broken Robot",
    passageAuthor: "Nina Park",
    questionText: "Why does Ms. Vega say, \"Engineers solve problems step by step\"?",
    options: [
      { label: "A", text: "She wants the class to calm down and think carefully." },
      { label: "B", text: "She wants the class to start the parade early." },
      { label: "C", text: "She thinks the robot is too heavy to move." },
      { label: "D", text: "She wants Ava to stop asking questions." },
    ],
    correctAnswer: "A",
    rubric: "The student interprets a character's words.",
    points: 1,
  },
  {
    id: 12108, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "RL", target: "A", dok: 1, standard: "RL.3.1",
    type: "multi-select",
    passage: brokenRobotPassage,
    passageTitle: "The Broken Robot",
    passageAuthor: "Nina Park",
    questionText: "Which TWO details show that the class worked together? Select two answers.",
    options: [
      { label: "A", text: "Ava checked the lights." },
      { label: "B", text: "Theo looked at the battery pack." },
      { label: "C", text: "Mina noticed the string around the wheel." },
      { label: "D", text: "The parade was held in the gym." },
    ],
    correctAnswer: ["B", "C"],
    rubric: "The student identifies details showing teamwork.",
    points: 1,
  },
  {
    id: 12109, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 2, domain: "L", target: "E", dok: 1, standard: "L.3.5",
    type: "multiple-choice",
    passage: brokenRobotPassage,
    passageTitle: "The Broken Robot",
    passageAuthor: "Nina Park",
    questionText: "In the sentence \"The lights flashed bright blue,\" what does the word \"bright\" tell the reader?",
    options: [
      { label: "A", text: "The lights shone strongly." },
      { label: "B", text: "The lights were hard to find." },
      { label: "C", text: "The lights were broken." },
      { label: "D", text: "The lights moved slowly." },
    ],
    correctAnswer: "A",
    rubric: "The student interprets a descriptive word in context.",
    points: 1,
  },
  {
    id: 12110, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "RL", target: "D", dok: 2, standard: "RL.3.7",
    type: "multiple-choice",
    passage: brokenRobotPassage,
    passageTitle: "The Broken Robot",
    passageAuthor: "Nina Park",
    questionText: "If the story had a picture at the end, what would it most likely show?",
    options: [
      { label: "A", text: "Pip rolling with the class sign during the parade" },
      { label: "B", text: "Ms. Vega sitting alone in the classroom" },
      { label: "C", text: "Ava putting the robot in a box" },
      { label: "D", text: "The empty gym before school" },
    ],
    correctAnswer: "A",
    rubric: "The student predicts an illustration using the ending.",
    points: 1,
  },
  {
    id: 12111, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "RI", target: "A", dok: 1, standard: "RI.3.1",
    type: "multiple-choice",
    passage: simpleMachinesPassage,
    passageTitle: "How Simple Machines Help People Work",
    questionText: "What does a pulley use?",
    options: [
      { label: "A", text: "A wheel and rope" },
      { label: "B", text: "A sharp blade" },
      { label: "C", text: "A flat seat" },
      { label: "D", text: "A long tunnel" },
    ],
    correctAnswer: "A",
    rubric: "The student identifies a key detail.",
    points: 1,
  },
  {
    id: 12112, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "RI", target: "A", dok: 1, standard: "RI.3.2",
    type: "multiple-choice",
    passage: simpleMachinesPassage,
    passageTitle: "How Simple Machines Help People Work",
    questionText: "What is the main idea of the passage?",
    options: [
      { label: "A", text: "Only workers use simple machines." },
      { label: "B", text: "Simple machines make many jobs easier." },
      { label: "C", text: "A pulley is the strongest machine." },
      { label: "D", text: "Students should build their own tools." },
    ],
    correctAnswer: "B",
    rubric: "The student identifies the main idea.",
    points: 1,
  },
  {
    id: 12113, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "RI", target: "C", dok: 1, standard: "RI.3.4",
    type: "multiple-choice",
    passage: simpleMachinesPassage,
    passageTitle: "How Simple Machines Help People Work",
    questionText: "What is a fulcrum?",
    options: [
      { label: "A", text: "The point a lever moves on" },
      { label: "B", text: "The sharp edge of a wedge" },
      { label: "C", text: "The rope on a pulley" },
      { label: "D", text: "The floor under a ramp" },
    ],
    correctAnswer: "A",
    rubric: "The student determines the meaning of a domain-specific word.",
    points: 1,
  },
  {
    id: 12114, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "RI", target: "B", dok: 2, standard: "RI.3.3",
    type: "multiple-choice",
    passage: simpleMachinesPassage,
    passageTitle: "How Simple Machines Help People Work",
    questionText: "How does a ramp help people?",
    options: [
      { label: "A", text: "It cuts things apart." },
      { label: "B", text: "It helps move objects to a higher place." },
      { label: "C", text: "It makes wheels spin faster." },
      { label: "D", text: "It holds flags in place." },
    ],
    correctAnswer: "B",
    rubric: "The student explains a relationship in the text.",
    points: 1,
  },
  {
    id: 12115, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "RI", target: "B", dok: 2, standard: "RI.3.5",
    type: "multiple-choice",
    passage: simpleMachinesPassage,
    passageTitle: "How Simple Machines Help People Work",
    questionText: "How is the passage organized?",
    options: [
      { label: "A", text: "It tells one long story about a factory." },
      { label: "B", text: "It gives examples of different simple machines." },
      { label: "C", text: "It lists steps for building a wagon." },
      { label: "D", text: "It compares two students in class." },
    ],
    correctAnswer: "B",
    rubric: "The student identifies text structure.",
    points: 1,
  },
  {
    id: 12116, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "RI", target: "D", dok: 2, standard: "RI.3.8",
    type: "two-part",
    passage: simpleMachinesPassage,
    passageTitle: "How Simple Machines Help People Work",
    questionText: "Answer both parts of the question.",
    partAPrompt: "What point does the author make about simple machines?",
    partAOptions: [
      { label: "A", text: "They are only useful in schools." },
      { label: "B", text: "They can help people with many kinds of work." },
      { label: "C", text: "They are hard for families to understand." },
      { label: "D", text: "They should never be used outside." },
    ],
    partBPrompt: "Which sentence from the passage best supports your answer to Part A?",
    partBOptions: [
      { label: "A", text: "\"A seesaw is a kind of lever.\"" },
      { label: "B", text: "\"A wheel turns around a rod called an axle.\"" },
      { label: "C", text: "\"They help workers unload trucks. They help families move heavy boxes.\"" },
      { label: "D", text: "\"A wedge has a sharp edge.\"" },
    ],
    correctAnswer: ["B", "C"],
    rubric: "The student identifies the author's point and supporting evidence.",
    points: 1,
  },
  {
    id: 12117, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "RI", target: "A", dok: 1, standard: "RI.3.1",
    type: "multi-select",
    passage: simpleMachinesPassage,
    passageTitle: "How Simple Machines Help People Work",
    questionText: "Which TWO examples from the passage use a wheel and axle? Select two answers.",
    options: [
      { label: "A", text: "Doorknobs" },
      { label: "B", text: "Toy wagons" },
      { label: "C", text: "Flagpoles" },
      { label: "D", text: "Shovels" },
    ],
    correctAnswer: ["A", "B"],
    rubric: "The student identifies two examples from the text.",
    points: 1,
  },
  {
    id: 12118, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "RI", target: "D", dok: 2, standard: "RI.3.6",
    type: "multiple-choice",
    passage: simpleMachinesPassage,
    passageTitle: "How Simple Machines Help People Work",
    questionText: "What is the author's purpose for writing this passage?",
    options: [
      { label: "A", text: "To entertain readers with a funny story" },
      { label: "B", text: "To teach readers about simple machines" },
      { label: "C", text: "To persuade readers to buy new tools" },
      { label: "D", text: "To describe one student's science project" },
    ],
    correctAnswer: "B",
    rubric: "The student identifies the author's purpose.",
    points: 1,
  },
  {
    id: 12119, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "RI", target: "C", dok: 1, standard: "RI.3.4",
    type: "text-input",
    passage: simpleMachinesPassage,
    passageTitle: "How Simple Machines Help People Work",
    questionText: "What is an inclined plane? Use a word from the passage in your answer.",
    correctAnswer: "An inclined plane is a ramp",
    acceptedAnswers: ["An inclined plane is a ramp", "A ramp", "It is a ramp"],
    rubric: "The student explains the meaning of inclined plane using the text.",
    points: 1,
  },
  {
    id: 12120, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 4, domain: "RI", target: "D", dok: 2, standard: "RI.3.9",
    type: "multiple-choice",
    passage: simpleMachinesPassage,
    passageTitle: "How Simple Machines Help People Work",
    questionText: "Which sentence best tells how the examples in the passage are connected?",
    options: [
      { label: "A", text: "They all describe ways tools can make work easier." },
      { label: "B", text: "They all describe machines used only outside." },
      { label: "C", text: "They all show tools that are heavy to carry." },
      { label: "D", text: "They all explain how to build a robot." },
    ],
    correctAnswer: "A",
    rubric: "The student connects ideas across the passage.",
    points: 1,
  },
  {
    id: 12121, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 2, domain: "L", target: "E", dok: 1, standard: "L.3.2",
    type: "multiple-choice",
    questionText: "Which sentence is written correctly?",
    options: [
      { label: "A", text: "we fixed the wheel before lunch." },
      { label: "B", text: "We fixed the wheel before lunch." },
      { label: "C", text: "We fixed the wheel before lunch" },
      { label: "D", text: "we fixed the wheel before lunch" },
    ],
    correctAnswer: "B",
    rubric: "The student identifies correct capitalization and punctuation.",
    points: 1,
  },
  {
    id: 12122, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 2, domain: "L", target: "E", dok: 1, standard: "L.3.1",
    type: "multiple-choice",
    questionText: "Choose the sentence with the correct verb.",
    options: [
      { label: "A", text: "The helpers was lifting the sign." },
      { label: "B", text: "The helpers were lifting the sign." },
      { label: "C", text: "The helpers am lifting the sign." },
      { label: "D", text: "The helpers is lifting the sign." },
    ],
    correctAnswer: "B",
    rubric: "The student identifies correct subject-verb agreement.",
    points: 1,
  },
  {
    id: 12123, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 2, domain: "W", target: "A", dok: 2, standard: "W.3.5",
    type: "multiple-choice",
    questionText: "A student wrote this sentence:\n\nPip rolled fast down the hall and the class cheered.\n\nWhich word would be the best replacement for \"fast\" to make the writing more exact?",
    options: [
      { label: "A", text: "quickly" },
      { label: "B", text: "nice" },
      { label: "C", text: "good" },
      { label: "D", text: "fun" },
    ],
    correctAnswer: "A",
    rubric: "The student selects a more precise word.",
    points: 1,
  },
  {
    id: 12124, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 2, domain: "L", target: "E", dok: 1, standard: "L.3.2",
    type: "multiple-choice",
    questionText: "Which sentence uses commas correctly?",
    options: [
      { label: "A", text: "The fair had dogs cats, and rabbits." },
      { label: "B", text: "The fair had dogs, cats, and rabbits." },
      { label: "C", text: "The fair had, dogs cats and rabbits." },
      { label: "D", text: "The fair, had dogs, cats and rabbits." },
    ],
    correctAnswer: "B",
    rubric: "The student identifies correct comma use in a series.",
    points: 1,
  },
  {
    id: 12125, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 2, domain: "W", target: "A", dok: 2, standard: "W.3.5",
    type: "multiple-choice",
    questionText: "Which sentence would be the best ending for a paragraph about simple machines?",
    options: [
      { label: "A", text: "Simple machines help people do many kinds of work more easily." },
      { label: "B", text: "My favorite lunch is pizza and fruit." },
      { label: "C", text: "Some machines are painted red." },
      { label: "D", text: "The school bus arrived early." },
    ],
    correctAnswer: "A",
    rubric: "The student selects a sentence that fits the topic.",
    points: 1,
  },
  {
    id: 12126, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "SL", target: "A", dok: 2, standard: "SL.3.2",
    type: "two-part",
    passage: balloonPresentation,
    passageTitle: "Soaring on the Wings of the Wind",
    questionText: "Answer both parts of the question.",
    partAPrompt: "What is the most likely reason the speaker gave this presentation?",
    partAOptions: [
      { label: "A", text: "to explain how to build a robot" },
      { label: "B", text: "to describe an important event in American history" },
      { label: "C", text: "to tell why pizza is popular" },
      { label: "D", text: "to show how to train a dog" },
    ],
    partBPrompt: "Which detail from the presentation best supports your answer to Part A?",
    partBOptions: [
      { label: "A", text: "The balloon was made from light cloth." },
      { label: "B", text: "The crowd clapped when they saw the balloon rise." },
      { label: "C", text: "Edward became the first American to rise into the air in a hot-air balloon." },
      { label: "D", text: "Hot air rises." },
    ],
    correctAnswer: ["B", "C"],
    rubric: "The student identifies the speaker's purpose and supporting detail.",
    points: 1,
  },
  {
    id: 12127, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "SL", target: "A", dok: 1, standard: "SL.3.2",
    type: "multiple-choice",
    passage: balloonPresentation,
    passageTitle: "Soaring on the Wings of the Wind",
    questionText: "Which question can a listener answer after hearing the presentation?",
    options: [
      { label: "A", text: "What happened during the balloon ride?" },
      { label: "B", text: "What color were all the buildings in the city?" },
      { label: "C", text: "What did Edward eat before the ride?" },
      { label: "D", text: "How many balloons were built that year?" },
    ],
    correctAnswer: "A",
    rubric: "The student identifies what information is provided by the presentation.",
    points: 1,
  },
  {
    id: 12128, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "SL", target: "A", dok: 2, standard: "SL.3.3",
    type: "multiple-choice",
    passage: pizzaPresentation,
    passageTitle: "Pizza Around the World",
    questionText: "Which conclusion is supported by the presentation?",
    options: [
      { label: "A", text: "Pizza can be made with many different toppings." },
      { label: "B", text: "Pepperoni pizza is the best kind of pizza." },
      { label: "C", text: "People should eat pizza every day." },
      { label: "D", text: "Only one country knows how to make pizza." },
    ],
    correctAnswer: "A",
    rubric: "The student draws a conclusion from the presentation.",
    points: 1,
  },
  {
    id: 12129, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 1, domain: "SL", target: "A", dok: 2, standard: "SL.3.2",
    type: "multiple-choice",
    passage: pizzaPresentation,
    passageTitle: "Pizza Around the World",
    questionText: "What is the most likely reason the speaker made the presentation?",
    options: [
      { label: "A", text: "to suggest another way of looking at pizza" },
      { label: "B", text: "to show that one topping is always correct" },
      { label: "C", text: "to explain how to open a restaurant" },
      { label: "D", text: "to describe how to bake bread" },
    ],
    correctAnswer: "A",
    rubric: "The student identifies the speaker's purpose.",
    points: 1,
  },
  {
    id: 12130, practiceTest: 12, testType: "cat", subject: "ela", grade: 3,
    claim: 4, domain: "W", target: "B", dok: 2, standard: "W.3.7",
    type: "multi-select",
    questionText: "A student is writing a report about simple machines. Which TWO sources would help the student learn more? Select two answers.",
    options: [
      { label: "A", text: "A book called Tools That Lift and Move Things" },
      { label: "B", text: "A menu from a pizza shop" },
      { label: "C", text: "A website that explains levers, ramps, and pulleys" },
      { label: "D", text: "A story about a lost mitten" },
      { label: "E", text: "A poster about favorite playground games" },
    ],
    correctAnswer: ["A", "C"],
    rubric: "The student selects the two most relevant research sources.",
    points: 1,
  },
];

const practiceTest12ElaPT: Question[] = [
  {
    id: 12150, practiceTest: 12, testType: "pt", subject: "ela", grade: 3,
    claim: 4, domain: "RI", target: "D", dok: 2, standard: "W.3.8",
    type: "grid-match",
    passage: `${robotPtSource1}\n\n${robotPtSource2}`,
    passageTitle: "Sources for Writing",
    studentDirections: `**English Language Arts Performance Task**

Read the two sources. Then answer the questions about how machines help people solve problems.`,
    questionText: "Match each detail to the source where it belongs.",
    gridRows: [
      "Students checked the robot's wheels, wires, and battery.",
      "A pulley can help raise a flag.",
      "A ribbon wrapped around an axle.",
      "A ramp can help move heavy boxes.",
    ],
    gridColumns: ["Fixing the Parade Robot", "Machines in Everyday Life"],
    correctAnswer: ["0:0", "1:1", "2:0", "3:1"],
    rubric: "The student matches each detail to the correct source.",
    points: 1,
  },
  {
    id: 12151, practiceTest: 12, testType: "pt", subject: "ela", grade: 3,
    claim: 4, domain: "W", target: "B", dok: 2, standard: "W.3.8",
    type: "short-answer",
    passage: `${robotPtSource1}\n\n${robotPtSource2}`,
    passageTitle: "Sources for Writing",
    studentDirections: `**English Language Arts Performance Task**

Read the two sources. Then answer the questions about how machines help people solve problems.`,
    questionText: "Use details from both sources to explain one way people solve problems with machines.",
    correctAnswer: "People solve problems with machines by understanding how the machine works and checking it carefully. In Source 1, the students found a ribbon around the axle. In Source 2, people choose the right tool, like a ramp or pulley, to make work easier.",
    rubric: "2 points: The student uses a relevant detail from both sources to explain how machines help solve problems. 1 point: The student uses a detail from one source or gives partial explanation. 0 points: All other responses.",
    points: 2,
  },
  {
    id: 12152, practiceTest: 12, testType: "pt", subject: "ela", grade: 3,
    claim: 4, domain: "W", target: "A", dok: 4, standard: "W.3.2",
    type: "extended-writing",
    passage: `${robotPtSource1}\n\n${robotPtSource2}`,
    passageTitle: "Sources for Writing",
    studentDirections: `**English Language Arts Performance Task**

Read the two sources. Then write an essay explaining how machines help people solve problems.

Be sure to:
- write about both sources
- use details from the sources
- organize your ideas clearly`,
    questionText: "Write an informational essay explaining how machines help people solve problems in everyday life.",
    correctAnswer: "Responses should explain that machines help people solve problems by making work easier and by helping them complete tasks. Strong responses use examples from both sources, such as fixing the parade robot and using tools like ramps, pulleys, or wheels and axles.",
    rubric: "4 points: The response clearly explains how machines help people solve problems, uses details from both sources, and is well organized. 3 points: The response is adequate with support from both sources. 2 points: The response has partial development or weak support. 1 point: The response is minimal. 0 points: Off topic, blank, or insufficient.",
    points: 4,
  },
];

export const practiceTest12Questions: Question[] = [
  ...practiceTest12MathCAT,
  ...practiceTest12MathPT,
  ...practiceTest12ElaCAT,
  ...practiceTest12ElaPT,
];
