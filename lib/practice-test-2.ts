import type { Question } from "./questions";

export const practiceTest2Questions: Question[] = [
  {
    "id": 1001,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "OA",
    "target": "A",
    "dok": 1,
    "standard": "3.OA.A.1",
    "type": "text-input",
    "questionText": "There are 5 bags of marbles. Each bag has 9 marbles. How many marbles are there in all?",
    "correctAnswer": "45",
    "rubric": "The student enters the correct product.",
    "points": 1,
    "explanation": "Multiply the number of bags by marbles per bag: 5 × 9 = 45 marbles."
  },
  {
    "id": 1002,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "OA",
    "target": "A",
    "dok": 1,
    "standard": "3.OA.A.3",
    "type": "text-input",
    "questionText": "A classroom has 4 tables. Each table seats 6 students. How many students can sit at all the tables?",
    "correctAnswer": "24",
    "rubric": "The student enters the correct number.",
    "points": 1,
    "explanation": "This is an equal-groups multiplication problem: 4 tables × 6 students = 24 students."
  },
  {
    "id": 1003,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "OA",
    "target": "B",
    "dok": 1,
    "standard": "3.OA.A.4",
    "type": "text-input",
    "questionText": "What number makes this equation true?\n\n? × 7 = 63",
    "correctAnswer": "9",
    "rubric": "The student enters the correct missing factor.",
    "points": 1,
    "explanation": "Find the missing factor: ? × 7 = 63. Since 9 × 7 = 63, the answer is 9."
  },
  {
    "id": 1004,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "OA",
    "target": "B",
    "dok": 1,
    "standard": "3.OA.B.6",
    "type": "multiple-choice",
    "questionText": "Which equation is in the same fact family as 6 × 9 = 54?",
    "options": [
      {
        "label": "A",
        "text": "54 − 9 = 45"
      },
      {
        "label": "B",
        "text": "54 ÷ 6 = 9"
      },
      {
        "label": "C",
        "text": "54 + 6 = 60"
      },
      {
        "label": "D",
        "text": "9 + 6 = 15"
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student selects the related division fact.",
    "points": 1,
    "explanation": "Fact families link multiplication and division. Since 6 × 9 = 54, then 54 ÷ 6 = 9 is in the same fact family."
  },
  {
    "id": 1005,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "OA",
    "target": "C",
    "dok": 1,
    "standard": "3.OA.C.7",
    "type": "text-input",
    "questionText": "What is 8 × 7?",
    "correctAnswer": "56",
    "rubric": "The student enters the correct product.",
    "points": 1,
    "explanation": "8 × 7 = 56. You can think of it as 8 × 5 = 40 plus 8 × 2 = 16, so 40 + 16 = 56."
  },
  {
    "id": 1006,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "OA",
    "target": "C",
    "dok": 1,
    "standard": "3.OA.C.7",
    "type": "text-input",
    "questionText": "What is 42 ÷ 6?",
    "correctAnswer": "7",
    "rubric": "The student enters the correct quotient.",
    "points": 1,
    "explanation": "42 ÷ 6 = 7. You can verify: 6 × 7 = 42."
  },
  {
    "id": 1007,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "OA",
    "target": "D",
    "dok": 2,
    "standard": "3.OA.D.8",
    "type": "text-input",
    "questionText": "Leo had 85 stickers. He gave 37 to his sister and then bought 12 more. How many stickers does Leo have now?",
    "correctAnswer": "60",
    "rubric": "The student enters the correct number of stickers.",
    "points": 1,
    "explanation": "First subtract: 85 − 37 = 48. Then add: 48 + 12 = 60 stickers."
  },
  {
    "id": 1008,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "OA",
    "target": "D",
    "dok": 2,
    "standard": "3.OA.D.9",
    "type": "text-input",
    "questionText": "Look at the pattern: 4, 8, 12, 16, ?, ?\n\nWhat are the next two numbers? Enter them separated by a comma.",
    "correctAnswer": "20, 24",
    "rubric": "The student enters the correct numbers in the pattern.",
    "points": 1,
    "explanation": "The pattern adds 4 each time: 4, 8, 12, 16, 20, 24."
  },
  {
    "id": 1009,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 3,
    "domain": "OA",
    "target": "F",
    "dok": 2,
    "standard": "3.OA.B.5",
    "type": "multiple-choice",
    "questionText": "Which equation shows that multiplication is commutative (order doesn't matter)?",
    "options": [
      {
        "label": "A",
        "text": "3 × (4 + 2) = (3 × 4) + (3 × 2)"
      },
      {
        "label": "B",
        "text": "5 × 8 = 8 × 5"
      },
      {
        "label": "C",
        "text": "6 × 1 = 6"
      },
      {
        "label": "D",
        "text": "4 × 0 = 0"
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student identifies the commutative property.",
    "points": 1,
    "explanation": "The commutative property says you can multiply numbers in any order: 5 × 8 = 8 × 5 = 40."
  },
  {
    "id": 1010,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 3,
    "domain": "OA",
    "target": "F",
    "dok": 2,
    "standard": "3.OA.B.5",
    "type": "multiple-choice",
    "questionText": "Which shows the distributive property applied to 6 × 8?",
    "options": [
      {
        "label": "A",
        "text": "6 × 8 = 8 × 6"
      },
      {
        "label": "B",
        "text": "(6 × 5) + (6 × 3) = 48"
      },
      {
        "label": "C",
        "text": "6 × 8 = 6 × 8"
      },
      {
        "label": "D",
        "text": "(6 + 5) × (6 + 3) = 99"
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student identifies the distributive property.",
    "points": 1,
    "explanation": "The distributive property breaks a factor apart: 6 × 8 = 6 × (5 + 3) = (6 × 5) + (6 × 3) = 30 + 18 = 48."
  },
  {
    "id": 1011,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 2,
    "domain": "OA",
    "target": "A",
    "dok": 2,
    "standard": "3.OA.A.3",
    "type": "multiple-choice",
    "questionText": "Sam has 24 baseball cards. He wants to put the same number of cards on each page of his album. Which shows a way Sam could arrange his cards?",
    "options": [
      {
        "label": "A",
        "text": "5 pages with 5 cards on each page"
      },
      {
        "label": "B",
        "text": "3 pages with 8 cards on each page"
      },
      {
        "label": "C",
        "text": "4 pages with 7 cards on each page"
      },
      {
        "label": "D",
        "text": "6 pages with 5 cards on each page"
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student selects the correct equal grouping.",
    "points": 1,
    "explanation": "Check each: 5×5=25 (no), 3×8=24 (yes!), 4×7=28 (no), 6×5=30 (no). Only 3 pages with 8 cards equals 24."
  },
  {
    "id": 1012,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "NBT",
    "target": "E",
    "dok": 1,
    "standard": "3.NBT.A.1",
    "type": "multiple-choice",
    "questionText": "What is 657 rounded to the nearest hundred?",
    "options": [
      {
        "label": "A",
        "text": "600"
      },
      {
        "label": "B",
        "text": "650"
      },
      {
        "label": "C",
        "text": "660"
      },
      {
        "label": "D",
        "text": "700"
      }
    ],
    "correctAnswer": "D",
    "rubric": "The student selects the correct rounded number.",
    "points": 1,
    "explanation": "To round to the nearest hundred, look at the tens digit (5). Since 5 ≥ 5, round up: 657 rounds to 700."
  },
  {
    "id": 1013,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "NBT",
    "target": "E",
    "dok": 1,
    "standard": "3.NBT.A.1",
    "type": "multiple-choice",
    "questionText": "What is 345 rounded to the nearest ten?",
    "options": [
      {
        "label": "A",
        "text": "340"
      },
      {
        "label": "B",
        "text": "350"
      },
      {
        "label": "C",
        "text": "300"
      },
      {
        "label": "D",
        "text": "400"
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student rounds correctly.",
    "points": 1,
    "explanation": "To round 345 to the nearest ten, look at the ones digit (5). Since 5 ≥ 5, round up to 350."
  },
  {
    "id": 1014,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "NBT",
    "target": "E",
    "dok": 1,
    "standard": "3.NBT.A.2",
    "type": "text-input",
    "questionText": "What is 284 + 539?",
    "correctAnswer": "823",
    "rubric": "The student enters the correct sum.",
    "points": 1,
    "explanation": "Add column by column: ones: 4+9=13 (write 3, carry 1), tens: 8+3+1=12 (write 2, carry 1), hundreds: 2+5+1=8. Answer: 823."
  },
  {
    "id": 1015,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "NBT",
    "target": "E",
    "dok": 1,
    "standard": "3.NBT.A.2",
    "type": "text-input",
    "questionText": "What is 600 − 347?",
    "correctAnswer": "253",
    "rubric": "The student enters the correct difference.",
    "points": 1,
    "explanation": "Subtract using regrouping: 600 − 347 = 253. You can check: 253 + 347 = 600."
  },
  {
    "id": 1016,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "NBT",
    "target": "E",
    "dok": 1,
    "standard": "3.NBT.A.3",
    "type": "text-input",
    "questionText": "What is 7 × 80?",
    "correctAnswer": "560",
    "rubric": "The student enters the correct product.",
    "points": 1,
    "explanation": "Multiply: 7 × 80 = 7 × 8 × 10 = 56 × 10 = 560."
  },
  {
    "id": 1017,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 2,
    "domain": "NBT",
    "target": "C",
    "dok": 2,
    "standard": "3.NBT.A.2",
    "type": "multiple-choice",
    "questionText": "A school collected cans for recycling. Room A collected 278 cans, Room B collected 312 cans, and Room C collected 195 cans. Which room collected the fewest cans?",
    "options": [
      {
        "label": "A",
        "text": "Room A"
      },
      {
        "label": "B",
        "text": "Room B"
      },
      {
        "label": "C",
        "text": "Room C"
      },
      {
        "label": "D",
        "text": "Rooms A and C collected the same amount"
      }
    ],
    "correctAnswer": "C",
    "rubric": "The student selects the correct room.",
    "points": 1,
    "explanation": "Compare: 195 < 278 < 312. Room C collected the fewest cans with 195."
  },
  {
    "id": 1018,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "NF",
    "target": "F",
    "dok": 1,
    "standard": "3.NF.A.1",
    "type": "multiple-choice",
    "questionText": "A chocolate bar is divided into 6 equal pieces. Tom eats 2 pieces. What fraction of the chocolate bar did Tom eat?",
    "options": [
      {
        "label": "A",
        "text": "2/6"
      },
      {
        "label": "B",
        "text": "6/2"
      },
      {
        "label": "C",
        "text": "2/4"
      },
      {
        "label": "D",
        "text": "4/6"
      }
    ],
    "correctAnswer": "A",
    "rubric": "The student selects the correct fraction.",
    "points": 1,
    "explanation": "Tom ate 2 pieces out of 6 total pieces, which is the fraction 2/6."
  },
  {
    "id": 1019,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "NF",
    "target": "F",
    "dok": 2,
    "standard": "3.NF.A.3",
    "type": "multiple-choice",
    "questionText": "Which fraction is equivalent to 2/6?",
    "options": [
      {
        "label": "A",
        "text": "1/2"
      },
      {
        "label": "B",
        "text": "1/3"
      },
      {
        "label": "C",
        "text": "2/3"
      },
      {
        "label": "D",
        "text": "3/6"
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student identifies the equivalent fraction.",
    "points": 1,
    "explanation": "Simplify 2/6 by dividing numerator and denominator by 2: 2÷2 = 1, 6÷2 = 3. So 2/6 = 1/3."
  },
  {
    "id": 1020,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "NF",
    "target": "F",
    "dok": 2,
    "standard": "3.NF.A.2",
    "type": "multiple-choice",
    "questionText": "A number line goes from 0 to 1 and is divided into 4 equal parts. Which fraction is located at the second mark?",
    "options": [
      {
        "label": "A",
        "text": "1/4"
      },
      {
        "label": "B",
        "text": "2/4"
      },
      {
        "label": "C",
        "text": "3/4"
      },
      {
        "label": "D",
        "text": "4/4"
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student identifies the correct fraction on the number line.",
    "points": 1,
    "explanation": "On a number line divided into 4 equal parts, the 1st mark is 1/4, the 2nd mark is 2/4 (or 1/2), the 3rd is 3/4, and the 4th is 4/4 (or 1)."
  },
  {
    "id": 1021,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 3,
    "domain": "NF",
    "target": "D",
    "dok": 2,
    "standard": "3.NF.A.3",
    "type": "multiple-choice",
    "questionText": "Which comparison is correct?",
    "options": [
      {
        "label": "A",
        "text": "1/4 > 1/2"
      },
      {
        "label": "B",
        "text": "3/8 > 7/8"
      },
      {
        "label": "C",
        "text": "2/3 < 1/3"
      },
      {
        "label": "D",
        "text": "5/6 > 2/6"
      }
    ],
    "correctAnswer": "D",
    "rubric": "The student selects the correct comparison.",
    "points": 1,
    "explanation": "When fractions have the same denominator, compare the numerators: 5/6 > 2/6 because 5 > 2."
  },
  {
    "id": 1022,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "MD",
    "target": "G",
    "dok": 1,
    "standard": "3.MD.A.1",
    "type": "multiple-choice",
    "questionText": "Sara starts reading at 3:30 p.m. She reads for 1 hour and 15 minutes. What time does she finish reading?",
    "options": [
      {
        "label": "A",
        "text": "4:15 p.m."
      },
      {
        "label": "B",
        "text": "4:30 p.m."
      },
      {
        "label": "C",
        "text": "4:45 p.m."
      },
      {
        "label": "D",
        "text": "5:00 p.m."
      }
    ],
    "correctAnswer": "C",
    "rubric": "The student selects the correct time.",
    "points": 1,
    "explanation": "Start at 3:30. Add 1 hour → 4:30. Add 15 minutes → 4:45 p.m."
  },
  {
    "id": 1023,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "MD",
    "target": "G",
    "dok": 2,
    "standard": "3.MD.A.1",
    "type": "multiple-choice",
    "questionText": "Recess starts at 11:45 a.m. and ends at 12:15 p.m. How long is recess?",
    "options": [
      {
        "label": "A",
        "text": "15 minutes"
      },
      {
        "label": "B",
        "text": "25 minutes"
      },
      {
        "label": "C",
        "text": "30 minutes"
      },
      {
        "label": "D",
        "text": "45 minutes"
      }
    ],
    "correctAnswer": "C",
    "rubric": "The student calculates elapsed time correctly.",
    "points": 1,
    "explanation": "From 11:45 to 12:00 is 15 minutes. From 12:00 to 12:15 is 15 minutes. Total: 15 + 15 = 30 minutes."
  },
  {
    "id": 1024,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "MD",
    "target": "G",
    "dok": 2,
    "standard": "3.MD.A.2",
    "type": "multiple-choice",
    "questionText": "A jug holds 2 liters of juice. Marcus pours out 750 milliliters. How many milliliters of juice are left?",
    "options": [
      {
        "label": "A",
        "text": "1,000 milliliters"
      },
      {
        "label": "B",
        "text": "1,250 milliliters"
      },
      {
        "label": "C",
        "text": "1,350 milliliters"
      },
      {
        "label": "D",
        "text": "1,750 milliliters"
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student converts and subtracts correctly.",
    "points": 1,
    "explanation": "First convert: 2 liters = 2,000 milliliters. Then subtract: 2,000 − 750 = 1,250 milliliters."
  },
  {
    "id": 1025,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "MD",
    "target": "H",
    "dok": 2,
    "standard": "3.MD.B.3",
    "type": "multiple-choice",
    "questionText": "A picture graph shows favorite sports. Each picture stands for 2 students. Soccer has 4 pictures, Basketball has 3 pictures, and Baseball has 5 pictures. How many students chose baseball?",
    "options": [
      {
        "label": "A",
        "text": "5"
      },
      {
        "label": "B",
        "text": "7"
      },
      {
        "label": "C",
        "text": "10"
      },
      {
        "label": "D",
        "text": "12"
      }
    ],
    "correctAnswer": "C",
    "rubric": "The student interprets the picture graph correctly.",
    "points": 1,
    "explanation": "Each picture = 2 students. Baseball has 5 pictures, so 5 × 2 = 10 students chose baseball."
  },
  {
    "id": 1026,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "MD",
    "target": "H",
    "dok": 2,
    "standard": "3.MD.B.3",
    "type": "text-input",
    "questionText": "A bar graph shows how many books students read: Week 1 = 12, Week 2 = 8, Week 3 = 15, Week 4 = 10. How many total books were read in all 4 weeks?",
    "correctAnswer": "45",
    "rubric": "The student adds all values correctly.",
    "points": 1,
    "explanation": "Add all the values: 12 + 8 + 15 + 10 = 45 books."
  },
  {
    "id": 1027,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "MD",
    "target": "I",
    "dok": 2,
    "standard": "3.MD.C.7",
    "type": "text-input",
    "questionText": "A rug is 8 feet long and 5 feet wide. What is the area of the rug in square feet?",
    "correctAnswer": "40",
    "rubric": "The student enters the correct area.",
    "points": 1,
    "explanation": "Area = length × width = 8 × 5 = 40 square feet."
  },
  {
    "id": 1028,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "MD",
    "target": "I",
    "dok": 2,
    "standard": "3.MD.C.7",
    "type": "text-input",
    "questionText": "A floor tile is a square with sides that are 3 inches long. What is the area of one tile in square inches?",
    "correctAnswer": "9",
    "rubric": "The student enters the correct area.",
    "points": 1,
    "explanation": "Area of a square = side × side = 3 × 3 = 9 square inches."
  },
  {
    "id": 1029,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 2,
    "domain": "MD",
    "target": "J",
    "dok": 2,
    "standard": "3.MD.D.8",
    "type": "text-input",
    "questionText": "A rectangular garden is 12 feet long and 7 feet wide. What is the perimeter of the garden in feet?",
    "correctAnswer": "38",
    "rubric": "The student enters the correct perimeter.",
    "points": 1,
    "explanation": "Perimeter = 2 × length + 2 × width = 2 × 12 + 2 × 7 = 24 + 14 = 38 feet."
  },
  {
    "id": 1030,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "MD",
    "target": "J",
    "dok": 2,
    "standard": "3.MD.D.8",
    "type": "text-input",
    "questionText": "A square picture frame has sides that are each 9 inches long. What is the perimeter of the frame in inches?",
    "correctAnswer": "36",
    "rubric": "The student enters the correct perimeter.",
    "points": 1,
    "explanation": "Perimeter of a square = 4 × side = 4 × 9 = 36 inches."
  },
  {
    "id": 1031,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "MD",
    "target": "H",
    "dok": 2,
    "standard": "3.MD.B.4",
    "type": "multiple-choice",
    "questionText": "Five students measured their hand spans. The measurements were: 6 inches, 5 inches, 7 inches, 6 inches, 6 inches. What is the most common measurement?",
    "options": [
      {
        "label": "A",
        "text": "5 inches"
      },
      {
        "label": "B",
        "text": "6 inches"
      },
      {
        "label": "C",
        "text": "7 inches"
      },
      {
        "label": "D",
        "text": "8 inches"
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student identifies the mode.",
    "points": 1,
    "explanation": "6 inches appears three times, which is more than any other measurement. The mode (most common value) is 6 inches."
  },
  {
    "id": 1032,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "G",
    "target": "K",
    "dok": 1,
    "standard": "3.G.A.1",
    "type": "multiple-choice",
    "questionText": "Which shape is a quadrilateral?",
    "options": [
      {
        "label": "A",
        "text": "Triangle"
      },
      {
        "label": "B",
        "text": "Pentagon"
      },
      {
        "label": "C",
        "text": "Rectangle"
      },
      {
        "label": "D",
        "text": "Circle"
      }
    ],
    "correctAnswer": "C",
    "rubric": "The student identifies the quadrilateral.",
    "points": 1,
    "explanation": "A quadrilateral is any shape with exactly 4 sides. A rectangle has 4 sides, so it is a quadrilateral."
  },
  {
    "id": 1033,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "G",
    "target": "K",
    "dok": 2,
    "standard": "3.G.A.2",
    "type": "multiple-choice",
    "questionText": "A circle is divided into 8 equal parts. Three parts are shaded. What fraction of the circle is shaded?",
    "options": [
      {
        "label": "A",
        "text": "3/5"
      },
      {
        "label": "B",
        "text": "5/8"
      },
      {
        "label": "C",
        "text": "3/8"
      },
      {
        "label": "D",
        "text": "8/3"
      }
    ],
    "correctAnswer": "C",
    "rubric": "The student selects the correct fraction.",
    "points": 1,
    "explanation": "3 parts shaded out of 8 total equal parts = 3/8."
  },
  {
    "id": 1034,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "OA",
    "target": "A",
    "dok": 2,
    "standard": "3.OA.A.3",
    "type": "text-input",
    "questionText": "A parking lot has 6 rows of cars. Each row has 8 cars. How many cars are in the parking lot?",
    "correctAnswer": "48",
    "rubric": "The student enters the correct product.",
    "points": 1,
    "explanation": "Multiply rows by cars per row: 6 × 8 = 48 cars."
  },
  {
    "id": 1035,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 1,
    "domain": "OA",
    "target": "B",
    "dok": 2,
    "standard": "3.OA.A.4",
    "type": "text-input",
    "questionText": "A teacher has 45 pencils to share equally among 9 students. How many pencils does each student get?",
    "correctAnswer": "5",
    "rubric": "The student enters the correct quotient.",
    "points": 1,
    "explanation": "Divide equally: 45 ÷ 9 = 5 pencils each."
  },
  {
    "id": 1036,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "math",
    "grade": 3,
    "claim": 4,
    "domain": "MD",
    "target": "I",
    "dok": 2,
    "standard": "3.MD.C.7",
    "type": "multiple-choice",
    "questionText": "Two rectangles are placed side by side to form a larger rectangle. Each small rectangle has an area of 12 square inches. What is the area of the larger rectangle?",
    "options": [
      {
        "label": "A",
        "text": "12 square inches"
      },
      {
        "label": "B",
        "text": "18 square inches"
      },
      {
        "label": "C",
        "text": "24 square inches"
      },
      {
        "label": "D",
        "text": "36 square inches"
      }
    ],
    "correctAnswer": "C",
    "rubric": "The student adds the areas.",
    "points": 1,
    "explanation": "When two shapes are placed together without overlap, add the areas: 12 + 12 = 24 square inches."
  },
  {
    "id": 1040,
    "practiceTest": 2,
    "testType": "pt",
    "subject": "math",
    "grade": 3,
    "claim": 2,
    "domain": "OA",
    "target": "A",
    "dok": 2,
    "standard": "3.OA.A.3",
    "type": "multiple-choice",
    "questionText": "The third-grade class is having a bake sale to raise money for a field trip.\n\nMrs. Johnson's class baked 8 trays of cupcakes. Each tray holds 6 cupcakes. How many cupcakes did they bake in all?",
    "options": [
      {
        "label": "A",
        "text": "14 cupcakes"
      },
      {
        "label": "B",
        "text": "42 cupcakes"
      },
      {
        "label": "C",
        "text": "48 cupcakes"
      },
      {
        "label": "D",
        "text": "56 cupcakes"
      }
    ],
    "correctAnswer": "C",
    "rubric": "The student selects the correct product.",
    "points": 1,
    "explanation": "Multiply trays by cupcakes per tray: 8 × 6 = 48 cupcakes."
  },
  {
    "id": 1041,
    "practiceTest": 2,
    "testType": "pt",
    "subject": "math",
    "grade": 3,
    "claim": 2,
    "domain": "OA",
    "target": "C",
    "dok": 2,
    "standard": "3.OA.D.8",
    "type": "text-input",
    "questionText": "Cupcakes sell for $2 each and brownies sell for $3 each. If the class sells 48 cupcakes and 24 brownies, how much money will they make in all?",
    "correctAnswer": "168",
    "rubric": "The student enters the correct total.",
    "points": 1,
    "explanation": "Cupcakes: 48 × $2 = $96. Brownies: 24 × $3 = $72. Total: $96 + $72 = $168."
  },
  {
    "id": 1042,
    "practiceTest": 2,
    "testType": "pt",
    "subject": "math",
    "grade": 3,
    "claim": 4,
    "domain": "OA",
    "target": "C",
    "dok": 2,
    "standard": "3.OA.D.8",
    "type": "text-input",
    "questionText": "The field trip costs $125 for the bus and $75 for museum tickets. The class already has $32 saved. How much more money do they need to raise?",
    "correctAnswer": "168",
    "rubric": "The student enters the correct amount.",
    "points": 1,
    "explanation": "Total cost: $125 + $75 = $200. Money still needed: $200 − $32 = $168."
  },
  {
    "id": 1043,
    "practiceTest": 2,
    "testType": "pt",
    "subject": "math",
    "grade": 3,
    "claim": 3,
    "domain": "OA",
    "target": "E",
    "dok": 2,
    "standard": "3.OA.A.3",
    "type": "multiple-choice",
    "questionText": "The class wants to package leftover cupcakes in boxes that hold 4 cupcakes each. If there are 20 cupcakes left, which expression shows how to find the number of boxes needed?",
    "options": [
      {
        "label": "A",
        "text": "20 + 4"
      },
      {
        "label": "B",
        "text": "20 × 4"
      },
      {
        "label": "C",
        "text": "20 − 4"
      },
      {
        "label": "D",
        "text": "20 ÷ 4"
      }
    ],
    "correctAnswer": "D",
    "rubric": "The student selects the division expression.",
    "points": 1,
    "explanation": "To split a total into equal groups, use division: 20 ÷ 4 = 5 boxes."
  },
  {
    "id": 1044,
    "practiceTest": 2,
    "testType": "pt",
    "subject": "math",
    "grade": 3,
    "claim": 2,
    "domain": "MD",
    "target": "J",
    "dok": 2,
    "standard": "3.MD.D.8",
    "type": "text-input",
    "questionText": "The class wants to decorate a rectangular table for the bake sale. The table is 6 feet long and 3 feet wide. They need to tape streamers around the entire edge. How many feet of streamers do they need?",
    "correctAnswer": "18",
    "rubric": "The student enters the correct perimeter.",
    "points": 1,
    "explanation": "Perimeter = 2 × length + 2 × width = 2 × 6 + 2 × 3 = 12 + 6 = 18 feet."
  },
  {
    "id": 1101,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 1,
    "target": "1",
    "dok": 2,
    "standard": "RL.1",
    "type": "multiple-choice",
    "passage": "Read the passage and answer the questions.\n\n**The Storm Dog**\n*by Clara Mitchell*\n\nMaya pressed her face against the window. The sky was dark gray, and the wind bent the trees sideways. Thunder rumbled in the distance.\n\n\"Come away from the window,\" said Mama. \"The storm will pass.\"\n\nBut Maya wasn't worried about the storm. She was worried about the dog. That morning, on the way to school, she had seen a small brown dog sitting near the bus stop. It had no collar and its fur was matted. It looked at Maya with big, sad eyes.\n\nAll day at school, Maya thought about the dog. She drew pictures of it during art class. She wrote about it in her journal. When her teacher, Ms. Rivera, asked what was on her mind, Maya told her about the stray dog.\n\n\"Sometimes animals find their way,\" Ms. Rivera said kindly. \"But it's good that you care.\"\n\nNow the storm was here, and Maya couldn't stop thinking about the little dog out there alone.\n\n\"Mama, there's a dog outside. I saw it this morning. It doesn't have a home,\" Maya said.\n\nMama looked at her daughter's worried face. \"Where did you see it?\"\n\n\"Near the bus stop on Oak Street.\"\n\nMama was quiet for a moment. Then she grabbed two towels and the car keys. \"Let's go look,\" she said.\n\nThey drove slowly through the rain. At first, Maya couldn't see anything. The rain was too heavy. But then, huddled under a bench near the bus stop, she spotted the brown dog. It was shaking.\n\n\"There!\" Maya pointed.\n\nMama pulled over. Maya jumped out with a towel and wrapped it around the trembling dog. It licked her hand.\n\nThey brought the dog home and dried it off. Mama warmed some leftover chicken and put water in a bowl. The dog ate hungrily.\n\n\"We'll take it to the shelter tomorrow to check for a microchip,\" Mama said. \"Someone might be looking for this little one.\"\n\nMaya nodded, but she already knew what she hoped—that no one would claim the dog, and it could stay with them forever.\n\nThe next day, the shelter found no microchip and no one had reported a missing dog matching its description. After a week of waiting, Mama said the words Maya had been dreaming of: \"I think we have a new family member.\"\n\nMaya named the dog Storm.",
    "passageTitle": "The Storm Dog",
    "questionText": "Why was Maya worried during the storm?",
    "options": [
      {
        "label": "A",
        "text": "She was afraid the thunder would be loud."
      },
      {
        "label": "B",
        "text": "She was thinking about the stray dog outside."
      },
      {
        "label": "C",
        "text": "She didn't want to go to school the next day."
      },
      {
        "label": "D",
        "text": "She forgot to close the windows."
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student identifies Maya's concern.",
    "points": 1,
    "explanation": "The passage says 'Maya wasn't worried about the storm. She was worried about the dog.' She kept thinking about the stray dog she had seen."
  },
  {
    "id": 1102,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 1,
    "target": "2",
    "dok": 2,
    "standard": "RL.2",
    "type": "multiple-choice",
    "passage": "Read the passage and answer the questions.\n\n**The Storm Dog**\n*by Clara Mitchell*\n\nMaya pressed her face against the window. The sky was dark gray, and the wind bent the trees sideways. Thunder rumbled in the distance.\n\n\"Come away from the window,\" said Mama. \"The storm will pass.\"\n\nBut Maya wasn't worried about the storm. She was worried about the dog. That morning, on the way to school, she had seen a small brown dog sitting near the bus stop. It had no collar and its fur was matted. It looked at Maya with big, sad eyes.\n\nAll day at school, Maya thought about the dog. She drew pictures of it during art class. She wrote about it in her journal. When her teacher, Ms. Rivera, asked what was on her mind, Maya told her about the stray dog.\n\n\"Sometimes animals find their way,\" Ms. Rivera said kindly. \"But it's good that you care.\"\n\nNow the storm was here, and Maya couldn't stop thinking about the little dog out there alone.\n\n\"Mama, there's a dog outside. I saw it this morning. It doesn't have a home,\" Maya said.\n\nMama looked at her daughter's worried face. \"Where did you see it?\"\n\n\"Near the bus stop on Oak Street.\"\n\nMama was quiet for a moment. Then she grabbed two towels and the car keys. \"Let's go look,\" she said.\n\nThey drove slowly through the rain. At first, Maya couldn't see anything. The rain was too heavy. But then, huddled under a bench near the bus stop, she spotted the brown dog. It was shaking.\n\n\"There!\" Maya pointed.\n\nMama pulled over. Maya jumped out with a towel and wrapped it around the trembling dog. It licked her hand.\n\nThey brought the dog home and dried it off. Mama warmed some leftover chicken and put water in a bowl. The dog ate hungrily.\n\n\"We'll take it to the shelter tomorrow to check for a microchip,\" Mama said. \"Someone might be looking for this little one.\"\n\nMaya nodded, but she already knew what she hoped—that no one would claim the dog, and it could stay with them forever.\n\nThe next day, the shelter found no microchip and no one had reported a missing dog matching its description. After a week of waiting, Mama said the words Maya had been dreaming of: \"I think we have a new family member.\"\n\nMaya named the dog Storm.",
    "passageTitle": "The Storm Dog",
    "questionText": "Which sentence best describes the main message of the story?",
    "options": [
      {
        "label": "A",
        "text": "Dogs make the best pets for families."
      },
      {
        "label": "B",
        "text": "Storms can be dangerous for animals."
      },
      {
        "label": "C",
        "text": "Caring about others can lead to good things."
      },
      {
        "label": "D",
        "text": "Children should always ask before going outside."
      }
    ],
    "correctAnswer": "C",
    "rubric": "The student identifies the theme.",
    "points": 1,
    "explanation": "The story shows that Maya's caring and compassion for the stray dog led to her family gaining a new pet. The theme is that caring about others brings good results."
  },
  {
    "id": 1103,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 1,
    "target": "3",
    "dok": 2,
    "standard": "RL.3",
    "type": "multiple-choice",
    "passage": "Read the passage and answer the questions.\n\n**The Storm Dog**\n*by Clara Mitchell*\n\nMaya pressed her face against the window. The sky was dark gray, and the wind bent the trees sideways. Thunder rumbled in the distance.\n\n\"Come away from the window,\" said Mama. \"The storm will pass.\"\n\nBut Maya wasn't worried about the storm. She was worried about the dog. That morning, on the way to school, she had seen a small brown dog sitting near the bus stop. It had no collar and its fur was matted. It looked at Maya with big, sad eyes.\n\nAll day at school, Maya thought about the dog. She drew pictures of it during art class. She wrote about it in her journal. When her teacher, Ms. Rivera, asked what was on her mind, Maya told her about the stray dog.\n\n\"Sometimes animals find their way,\" Ms. Rivera said kindly. \"But it's good that you care.\"\n\nNow the storm was here, and Maya couldn't stop thinking about the little dog out there alone.\n\n\"Mama, there's a dog outside. I saw it this morning. It doesn't have a home,\" Maya said.\n\nMama looked at her daughter's worried face. \"Where did you see it?\"\n\n\"Near the bus stop on Oak Street.\"\n\nMama was quiet for a moment. Then she grabbed two towels and the car keys. \"Let's go look,\" she said.\n\nThey drove slowly through the rain. At first, Maya couldn't see anything. The rain was too heavy. But then, huddled under a bench near the bus stop, she spotted the brown dog. It was shaking.\n\n\"There!\" Maya pointed.\n\nMama pulled over. Maya jumped out with a towel and wrapped it around the trembling dog. It licked her hand.\n\nThey brought the dog home and dried it off. Mama warmed some leftover chicken and put water in a bowl. The dog ate hungrily.\n\n\"We'll take it to the shelter tomorrow to check for a microchip,\" Mama said. \"Someone might be looking for this little one.\"\n\nMaya nodded, but she already knew what she hoped—that no one would claim the dog, and it could stay with them forever.\n\nThe next day, the shelter found no microchip and no one had reported a missing dog matching its description. After a week of waiting, Mama said the words Maya had been dreaming of: \"I think we have a new family member.\"\n\nMaya named the dog Storm.",
    "passageTitle": "The Storm Dog",
    "questionText": "How did Mama's feelings about the dog change during the story?",
    "options": [
      {
        "label": "A",
        "text": "She was angry at first but then became happy."
      },
      {
        "label": "B",
        "text": "She didn't want to help at first but then decided to go look."
      },
      {
        "label": "C",
        "text": "She was scared of the dog but then liked it."
      },
      {
        "label": "D",
        "text": "She wanted to keep the dog right away."
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student identifies the character change.",
    "points": 1,
    "explanation": "At first Mama told Maya to come away from the window. But when she saw Maya's worry, 'she grabbed two towels and the car keys' and decided to help."
  },
  {
    "id": 1104,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 1,
    "target": "4",
    "dok": 2,
    "standard": "RL.4",
    "type": "multiple-choice",
    "passage": "Read the passage and answer the questions.\n\n**The Storm Dog**\n*by Clara Mitchell*\n\nMaya pressed her face against the window. The sky was dark gray, and the wind bent the trees sideways. Thunder rumbled in the distance.\n\n\"Come away from the window,\" said Mama. \"The storm will pass.\"\n\nBut Maya wasn't worried about the storm. She was worried about the dog. That morning, on the way to school, she had seen a small brown dog sitting near the bus stop. It had no collar and its fur was matted. It looked at Maya with big, sad eyes.\n\nAll day at school, Maya thought about the dog. She drew pictures of it during art class. She wrote about it in her journal. When her teacher, Ms. Rivera, asked what was on her mind, Maya told her about the stray dog.\n\n\"Sometimes animals find their way,\" Ms. Rivera said kindly. \"But it's good that you care.\"\n\nNow the storm was here, and Maya couldn't stop thinking about the little dog out there alone.\n\n\"Mama, there's a dog outside. I saw it this morning. It doesn't have a home,\" Maya said.\n\nMama looked at her daughter's worried face. \"Where did you see it?\"\n\n\"Near the bus stop on Oak Street.\"\n\nMama was quiet for a moment. Then she grabbed two towels and the car keys. \"Let's go look,\" she said.\n\nThey drove slowly through the rain. At first, Maya couldn't see anything. The rain was too heavy. But then, huddled under a bench near the bus stop, she spotted the brown dog. It was shaking.\n\n\"There!\" Maya pointed.\n\nMama pulled over. Maya jumped out with a towel and wrapped it around the trembling dog. It licked her hand.\n\nThey brought the dog home and dried it off. Mama warmed some leftover chicken and put water in a bowl. The dog ate hungrily.\n\n\"We'll take it to the shelter tomorrow to check for a microchip,\" Mama said. \"Someone might be looking for this little one.\"\n\nMaya nodded, but she already knew what she hoped—that no one would claim the dog, and it could stay with them forever.\n\nThe next day, the shelter found no microchip and no one had reported a missing dog matching its description. After a week of waiting, Mama said the words Maya had been dreaming of: \"I think we have a new family member.\"\n\nMaya named the dog Storm.",
    "passageTitle": "The Storm Dog",
    "questionText": "What does the word \"matted\" mean in the phrase \"its fur was matted\"?",
    "options": [
      {
        "label": "A",
        "text": "Soft and fluffy"
      },
      {
        "label": "B",
        "text": "Tangled and messy"
      },
      {
        "label": "C",
        "text": "Wet and shiny"
      },
      {
        "label": "D",
        "text": "Short and smooth"
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student determines the meaning from context.",
    "points": 1,
    "explanation": "Context clues tell us the dog was a stray with no collar. 'Matted' fur means tangled, knotted, and messy—a sign the dog hadn't been groomed."
  },
  {
    "id": 1105,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 1,
    "target": "5",
    "dok": 2,
    "standard": "RL.5",
    "type": "multiple-choice",
    "passage": "Read the passage and answer the questions.\n\n**The Storm Dog**\n*by Clara Mitchell*\n\nMaya pressed her face against the window. The sky was dark gray, and the wind bent the trees sideways. Thunder rumbled in the distance.\n\n\"Come away from the window,\" said Mama. \"The storm will pass.\"\n\nBut Maya wasn't worried about the storm. She was worried about the dog. That morning, on the way to school, she had seen a small brown dog sitting near the bus stop. It had no collar and its fur was matted. It looked at Maya with big, sad eyes.\n\nAll day at school, Maya thought about the dog. She drew pictures of it during art class. She wrote about it in her journal. When her teacher, Ms. Rivera, asked what was on her mind, Maya told her about the stray dog.\n\n\"Sometimes animals find their way,\" Ms. Rivera said kindly. \"But it's good that you care.\"\n\nNow the storm was here, and Maya couldn't stop thinking about the little dog out there alone.\n\n\"Mama, there's a dog outside. I saw it this morning. It doesn't have a home,\" Maya said.\n\nMama looked at her daughter's worried face. \"Where did you see it?\"\n\n\"Near the bus stop on Oak Street.\"\n\nMama was quiet for a moment. Then she grabbed two towels and the car keys. \"Let's go look,\" she said.\n\nThey drove slowly through the rain. At first, Maya couldn't see anything. The rain was too heavy. But then, huddled under a bench near the bus stop, she spotted the brown dog. It was shaking.\n\n\"There!\" Maya pointed.\n\nMama pulled over. Maya jumped out with a towel and wrapped it around the trembling dog. It licked her hand.\n\nThey brought the dog home and dried it off. Mama warmed some leftover chicken and put water in a bowl. The dog ate hungrily.\n\n\"We'll take it to the shelter tomorrow to check for a microchip,\" Mama said. \"Someone might be looking for this little one.\"\n\nMaya nodded, but she already knew what she hoped—that no one would claim the dog, and it could stay with them forever.\n\nThe next day, the shelter found no microchip and no one had reported a missing dog matching its description. After a week of waiting, Mama said the words Maya had been dreaming of: \"I think we have a new family member.\"\n\nMaya named the dog Storm.",
    "passageTitle": "The Storm Dog",
    "questionText": "Which part of the story is the climax (the most exciting or important moment)?",
    "options": [
      {
        "label": "A",
        "text": "When Maya sees the dog at the bus stop in the morning."
      },
      {
        "label": "B",
        "text": "When Maya draws pictures of the dog in art class."
      },
      {
        "label": "C",
        "text": "When Maya and Mama find the dog huddled under the bench in the rain."
      },
      {
        "label": "D",
        "text": "When Mama says the dog can stay."
      }
    ],
    "correctAnswer": "C",
    "rubric": "The student identifies the climax.",
    "points": 1,
    "explanation": "The climax is the turning point with the most tension. Finding and rescuing the shaking dog in the storm is the most dramatic moment that leads to the resolution."
  },
  {
    "id": 1106,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 1,
    "target": "6",
    "dok": 2,
    "standard": "RL.6",
    "type": "multiple-choice",
    "passage": "Read the passage and answer the questions.\n\n**The Storm Dog**\n*by Clara Mitchell*\n\nMaya pressed her face against the window. The sky was dark gray, and the wind bent the trees sideways. Thunder rumbled in the distance.\n\n\"Come away from the window,\" said Mama. \"The storm will pass.\"\n\nBut Maya wasn't worried about the storm. She was worried about the dog. That morning, on the way to school, she had seen a small brown dog sitting near the bus stop. It had no collar and its fur was matted. It looked at Maya with big, sad eyes.\n\nAll day at school, Maya thought about the dog. She drew pictures of it during art class. She wrote about it in her journal. When her teacher, Ms. Rivera, asked what was on her mind, Maya told her about the stray dog.\n\n\"Sometimes animals find their way,\" Ms. Rivera said kindly. \"But it's good that you care.\"\n\nNow the storm was here, and Maya couldn't stop thinking about the little dog out there alone.\n\n\"Mama, there's a dog outside. I saw it this morning. It doesn't have a home,\" Maya said.\n\nMama looked at her daughter's worried face. \"Where did you see it?\"\n\n\"Near the bus stop on Oak Street.\"\n\nMama was quiet for a moment. Then she grabbed two towels and the car keys. \"Let's go look,\" she said.\n\nThey drove slowly through the rain. At first, Maya couldn't see anything. The rain was too heavy. But then, huddled under a bench near the bus stop, she spotted the brown dog. It was shaking.\n\n\"There!\" Maya pointed.\n\nMama pulled over. Maya jumped out with a towel and wrapped it around the trembling dog. It licked her hand.\n\nThey brought the dog home and dried it off. Mama warmed some leftover chicken and put water in a bowl. The dog ate hungrily.\n\n\"We'll take it to the shelter tomorrow to check for a microchip,\" Mama said. \"Someone might be looking for this little one.\"\n\nMaya nodded, but she already knew what she hoped—that no one would claim the dog, and it could stay with them forever.\n\nThe next day, the shelter found no microchip and no one had reported a missing dog matching its description. After a week of waiting, Mama said the words Maya had been dreaming of: \"I think we have a new family member.\"\n\nMaya named the dog Storm.",
    "passageTitle": "The Storm Dog",
    "questionText": "From whose point of view is the story told?",
    "options": [
      {
        "label": "A",
        "text": "Maya's point of view (first person)"
      },
      {
        "label": "B",
        "text": "The dog's point of view"
      },
      {
        "label": "C",
        "text": "Mama's point of view"
      },
      {
        "label": "D",
        "text": "A narrator who is not a character (third person)"
      }
    ],
    "correctAnswer": "D",
    "rubric": "The student identifies the narrative perspective.",
    "points": 1,
    "explanation": "The story uses 'Maya,' 'she,' and 'Mama' (not 'I' or 'we'). This is third-person point of view—a narrator tells the story from outside."
  },
  {
    "id": 1107,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 1,
    "target": "1",
    "dok": 2,
    "standard": "RL.1",
    "type": "multiple-choice",
    "passage": "Read the passage and answer the questions.\n\n**The Storm Dog**\n*by Clara Mitchell*\n\nMaya pressed her face against the window. The sky was dark gray, and the wind bent the trees sideways. Thunder rumbled in the distance.\n\n\"Come away from the window,\" said Mama. \"The storm will pass.\"\n\nBut Maya wasn't worried about the storm. She was worried about the dog. That morning, on the way to school, she had seen a small brown dog sitting near the bus stop. It had no collar and its fur was matted. It looked at Maya with big, sad eyes.\n\nAll day at school, Maya thought about the dog. She drew pictures of it during art class. She wrote about it in her journal. When her teacher, Ms. Rivera, asked what was on her mind, Maya told her about the stray dog.\n\n\"Sometimes animals find their way,\" Ms. Rivera said kindly. \"But it's good that you care.\"\n\nNow the storm was here, and Maya couldn't stop thinking about the little dog out there alone.\n\n\"Mama, there's a dog outside. I saw it this morning. It doesn't have a home,\" Maya said.\n\nMama looked at her daughter's worried face. \"Where did you see it?\"\n\n\"Near the bus stop on Oak Street.\"\n\nMama was quiet for a moment. Then she grabbed two towels and the car keys. \"Let's go look,\" she said.\n\nThey drove slowly through the rain. At first, Maya couldn't see anything. The rain was too heavy. But then, huddled under a bench near the bus stop, she spotted the brown dog. It was shaking.\n\n\"There!\" Maya pointed.\n\nMama pulled over. Maya jumped out with a towel and wrapped it around the trembling dog. It licked her hand.\n\nThey brought the dog home and dried it off. Mama warmed some leftover chicken and put water in a bowl. The dog ate hungrily.\n\n\"We'll take it to the shelter tomorrow to check for a microchip,\" Mama said. \"Someone might be looking for this little one.\"\n\nMaya nodded, but she already knew what she hoped—that no one would claim the dog, and it could stay with them forever.\n\nThe next day, the shelter found no microchip and no one had reported a missing dog matching its description. After a week of waiting, Mama said the words Maya had been dreaming of: \"I think we have a new family member.\"\n\nMaya named the dog Storm.",
    "passageTitle": "The Storm Dog",
    "questionText": "What did the shelter check for when Maya and Mama brought the dog in?",
    "options": [
      {
        "label": "A",
        "text": "If the dog was sick"
      },
      {
        "label": "B",
        "text": "If the dog had a microchip"
      },
      {
        "label": "C",
        "text": "If the dog was friendly"
      },
      {
        "label": "D",
        "text": "How old the dog was"
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student recalls a detail from the text.",
    "points": 1,
    "explanation": "The passage states: 'We'll take it to the shelter tomorrow to check for a microchip.' A microchip would help identify the dog's owner."
  },
  {
    "id": 1108,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 1,
    "target": "3",
    "dok": 2,
    "standard": "RL.3",
    "type": "multiple-choice",
    "passage": "Read the passage and answer the questions.\n\n**The Storm Dog**\n*by Clara Mitchell*\n\nMaya pressed her face against the window. The sky was dark gray, and the wind bent the trees sideways. Thunder rumbled in the distance.\n\n\"Come away from the window,\" said Mama. \"The storm will pass.\"\n\nBut Maya wasn't worried about the storm. She was worried about the dog. That morning, on the way to school, she had seen a small brown dog sitting near the bus stop. It had no collar and its fur was matted. It looked at Maya with big, sad eyes.\n\nAll day at school, Maya thought about the dog. She drew pictures of it during art class. She wrote about it in her journal. When her teacher, Ms. Rivera, asked what was on her mind, Maya told her about the stray dog.\n\n\"Sometimes animals find their way,\" Ms. Rivera said kindly. \"But it's good that you care.\"\n\nNow the storm was here, and Maya couldn't stop thinking about the little dog out there alone.\n\n\"Mama, there's a dog outside. I saw it this morning. It doesn't have a home,\" Maya said.\n\nMama looked at her daughter's worried face. \"Where did you see it?\"\n\n\"Near the bus stop on Oak Street.\"\n\nMama was quiet for a moment. Then she grabbed two towels and the car keys. \"Let's go look,\" she said.\n\nThey drove slowly through the rain. At first, Maya couldn't see anything. The rain was too heavy. But then, huddled under a bench near the bus stop, she spotted the brown dog. It was shaking.\n\n\"There!\" Maya pointed.\n\nMama pulled over. Maya jumped out with a towel and wrapped it around the trembling dog. It licked her hand.\n\nThey brought the dog home and dried it off. Mama warmed some leftover chicken and put water in a bowl. The dog ate hungrily.\n\n\"We'll take it to the shelter tomorrow to check for a microchip,\" Mama said. \"Someone might be looking for this little one.\"\n\nMaya nodded, but she already knew what she hoped—that no one would claim the dog, and it could stay with them forever.\n\nThe next day, the shelter found no microchip and no one had reported a missing dog matching its description. After a week of waiting, Mama said the words Maya had been dreaming of: \"I think we have a new family member.\"\n\nMaya named the dog Storm.",
    "passageTitle": "The Storm Dog",
    "questionText": "Why did Maya name the dog Storm?",
    "options": [
      {
        "label": "A",
        "text": "The dog was loud like thunder."
      },
      {
        "label": "B",
        "text": "Maya found the dog during a storm."
      },
      {
        "label": "C",
        "text": "The dog's fur was the color of storm clouds."
      },
      {
        "label": "D",
        "text": "Ms. Rivera suggested the name."
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student makes a logical inference.",
    "points": 1,
    "explanation": "Maya rescued the dog during a thunderstorm. Naming it 'Storm' connects to how they found each other—during the storm that brought them together."
  },
  {
    "id": 1109,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 1,
    "target": "2",
    "dok": 2,
    "standard": "RL.2",
    "type": "multiple-choice",
    "passage": "Read the passage and answer the questions.\n\n**The Storm Dog**\n*by Clara Mitchell*\n\nMaya pressed her face against the window. The sky was dark gray, and the wind bent the trees sideways. Thunder rumbled in the distance.\n\n\"Come away from the window,\" said Mama. \"The storm will pass.\"\n\nBut Maya wasn't worried about the storm. She was worried about the dog. That morning, on the way to school, she had seen a small brown dog sitting near the bus stop. It had no collar and its fur was matted. It looked at Maya with big, sad eyes.\n\nAll day at school, Maya thought about the dog. She drew pictures of it during art class. She wrote about it in her journal. When her teacher, Ms. Rivera, asked what was on her mind, Maya told her about the stray dog.\n\n\"Sometimes animals find their way,\" Ms. Rivera said kindly. \"But it's good that you care.\"\n\nNow the storm was here, and Maya couldn't stop thinking about the little dog out there alone.\n\n\"Mama, there's a dog outside. I saw it this morning. It doesn't have a home,\" Maya said.\n\nMama looked at her daughter's worried face. \"Where did you see it?\"\n\n\"Near the bus stop on Oak Street.\"\n\nMama was quiet for a moment. Then she grabbed two towels and the car keys. \"Let's go look,\" she said.\n\nThey drove slowly through the rain. At first, Maya couldn't see anything. The rain was too heavy. But then, huddled under a bench near the bus stop, she spotted the brown dog. It was shaking.\n\n\"There!\" Maya pointed.\n\nMama pulled over. Maya jumped out with a towel and wrapped it around the trembling dog. It licked her hand.\n\nThey brought the dog home and dried it off. Mama warmed some leftover chicken and put water in a bowl. The dog ate hungrily.\n\n\"We'll take it to the shelter tomorrow to check for a microchip,\" Mama said. \"Someone might be looking for this little one.\"\n\nMaya nodded, but she already knew what she hoped—that no one would claim the dog, and it could stay with them forever.\n\nThe next day, the shelter found no microchip and no one had reported a missing dog matching its description. After a week of waiting, Mama said the words Maya had been dreaming of: \"I think we have a new family member.\"\n\nMaya named the dog Storm.",
    "passageTitle": "The Storm Dog",
    "questionText": "Which detail best shows that Maya cared deeply about the dog all day?",
    "options": [
      {
        "label": "A",
        "text": "She pressed her face against the window."
      },
      {
        "label": "B",
        "text": "She drew pictures of the dog and wrote about it in her journal."
      },
      {
        "label": "C",
        "text": "She told her Mama about the dog."
      },
      {
        "label": "D",
        "text": "She jumped out with a towel."
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student identifies supporting evidence.",
    "points": 1,
    "explanation": "Drawing pictures in art class AND writing about the dog in her journal shows she was thinking about it all day long—not just briefly."
  },
  {
    "id": 1110,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 1,
    "target": "7",
    "dok": 2,
    "standard": "RI.1",
    "type": "multiple-choice",
    "passage": "Read the passage and answer the questions.\n\n**The Amazing Ocean**\n*adapted from National Geographic Kids*\n\nThe ocean covers more than 70 percent of Earth's surface. It is home to millions of species of plants and animals, from tiny plankton to enormous blue whales. Scientists divide the ocean into five main regions: the Pacific, Atlantic, Indian, Southern, and Arctic Oceans.\n\n**Ocean Zones**\n\nThe ocean is divided into layers called zones. The sunlight zone is the top layer, reaching about 656 feet deep. Most ocean life lives here because sunlight helps plants grow, which feeds the animals. Below that is the twilight zone, where only a little light reaches. Deeper still is the midnight zone, where it is completely dark. Strange creatures live here, and some even make their own light through a process called bioluminescence.\n\n**Why the Ocean Matters**\n\nThe ocean affects weather and climate all over the world. Water evaporates from the ocean surface, forms clouds, and falls as rain over land. Without the ocean, there would be very little rainfall, and most plants could not survive.\n\nThe ocean also produces more than half of the world's oxygen. Tiny ocean plants called phytoplankton take in carbon dioxide and release oxygen, just like trees and plants on land. In fact, phytoplankton produce more oxygen than all the world's forests combined.\n\n**Ocean Problems**\n\nPollution is one of the biggest threats to the ocean. Plastic waste, oil spills, and chemicals all harm ocean life. Every year, about 8 million tons of plastic end up in the ocean. Sea turtles, fish, and seabirds often mistake plastic for food, which can make them sick or even kill them.\n\nScientists and ordinary people are working to help. Beach cleanups remove trash from shorelines. New laws limit how much pollution factories can release into waterways. Some inventors have even created machines that collect floating plastic from the ocean surface.\n\n**What You Can Do**\n\nEveryone can help protect the ocean. Reducing plastic use, recycling, and never littering are simple steps that make a difference. Learning about the ocean is important too—the more people understand how valuable the ocean is, the more they will want to protect it.",
    "passageTitle": "The Amazing Ocean",
    "questionText": "How much of Earth's surface does the ocean cover?",
    "options": [
      {
        "label": "A",
        "text": "About 50 percent"
      },
      {
        "label": "B",
        "text": "About 60 percent"
      },
      {
        "label": "C",
        "text": "More than 70 percent"
      },
      {
        "label": "D",
        "text": "About 90 percent"
      }
    ],
    "correctAnswer": "C",
    "rubric": "The student recalls a key detail.",
    "points": 1,
    "explanation": "The first sentence of the passage states: 'The ocean covers more than 70 percent of Earth's surface.'"
  },
  {
    "id": 1111,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 1,
    "target": "8",
    "dok": 2,
    "standard": "RI.2",
    "type": "multiple-choice",
    "passage": "Read the passage and answer the questions.\n\n**The Amazing Ocean**\n*adapted from National Geographic Kids*\n\nThe ocean covers more than 70 percent of Earth's surface. It is home to millions of species of plants and animals, from tiny plankton to enormous blue whales. Scientists divide the ocean into five main regions: the Pacific, Atlantic, Indian, Southern, and Arctic Oceans.\n\n**Ocean Zones**\n\nThe ocean is divided into layers called zones. The sunlight zone is the top layer, reaching about 656 feet deep. Most ocean life lives here because sunlight helps plants grow, which feeds the animals. Below that is the twilight zone, where only a little light reaches. Deeper still is the midnight zone, where it is completely dark. Strange creatures live here, and some even make their own light through a process called bioluminescence.\n\n**Why the Ocean Matters**\n\nThe ocean affects weather and climate all over the world. Water evaporates from the ocean surface, forms clouds, and falls as rain over land. Without the ocean, there would be very little rainfall, and most plants could not survive.\n\nThe ocean also produces more than half of the world's oxygen. Tiny ocean plants called phytoplankton take in carbon dioxide and release oxygen, just like trees and plants on land. In fact, phytoplankton produce more oxygen than all the world's forests combined.\n\n**Ocean Problems**\n\nPollution is one of the biggest threats to the ocean. Plastic waste, oil spills, and chemicals all harm ocean life. Every year, about 8 million tons of plastic end up in the ocean. Sea turtles, fish, and seabirds often mistake plastic for food, which can make them sick or even kill them.\n\nScientists and ordinary people are working to help. Beach cleanups remove trash from shorelines. New laws limit how much pollution factories can release into waterways. Some inventors have even created machines that collect floating plastic from the ocean surface.\n\n**What You Can Do**\n\nEveryone can help protect the ocean. Reducing plastic use, recycling, and never littering are simple steps that make a difference. Learning about the ocean is important too—the more people understand how valuable the ocean is, the more they will want to protect it.",
    "passageTitle": "The Amazing Ocean",
    "questionText": "What is the main idea of the section called 'Why the Ocean Matters'?",
    "options": [
      {
        "label": "A",
        "text": "The ocean is the largest body of water on Earth."
      },
      {
        "label": "B",
        "text": "The ocean is important for weather, climate, and producing oxygen."
      },
      {
        "label": "C",
        "text": "Pollution is harming the ocean."
      },
      {
        "label": "D",
        "text": "The ocean has many different zones."
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student identifies the main idea of a section.",
    "points": 1,
    "explanation": "The 'Why the Ocean Matters' section explains two key roles: affecting weather/climate (through evaporation and rain) and producing oxygen (through phytoplankton)."
  },
  {
    "id": 1112,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 1,
    "target": "9",
    "dok": 2,
    "standard": "RI.3",
    "type": "multiple-choice",
    "passage": "Read the passage and answer the questions.\n\n**The Amazing Ocean**\n*adapted from National Geographic Kids*\n\nThe ocean covers more than 70 percent of Earth's surface. It is home to millions of species of plants and animals, from tiny plankton to enormous blue whales. Scientists divide the ocean into five main regions: the Pacific, Atlantic, Indian, Southern, and Arctic Oceans.\n\n**Ocean Zones**\n\nThe ocean is divided into layers called zones. The sunlight zone is the top layer, reaching about 656 feet deep. Most ocean life lives here because sunlight helps plants grow, which feeds the animals. Below that is the twilight zone, where only a little light reaches. Deeper still is the midnight zone, where it is completely dark. Strange creatures live here, and some even make their own light through a process called bioluminescence.\n\n**Why the Ocean Matters**\n\nThe ocean affects weather and climate all over the world. Water evaporates from the ocean surface, forms clouds, and falls as rain over land. Without the ocean, there would be very little rainfall, and most plants could not survive.\n\nThe ocean also produces more than half of the world's oxygen. Tiny ocean plants called phytoplankton take in carbon dioxide and release oxygen, just like trees and plants on land. In fact, phytoplankton produce more oxygen than all the world's forests combined.\n\n**Ocean Problems**\n\nPollution is one of the biggest threats to the ocean. Plastic waste, oil spills, and chemicals all harm ocean life. Every year, about 8 million tons of plastic end up in the ocean. Sea turtles, fish, and seabirds often mistake plastic for food, which can make them sick or even kill them.\n\nScientists and ordinary people are working to help. Beach cleanups remove trash from shorelines. New laws limit how much pollution factories can release into waterways. Some inventors have even created machines that collect floating plastic from the ocean surface.\n\n**What You Can Do**\n\nEveryone can help protect the ocean. Reducing plastic use, recycling, and never littering are simple steps that make a difference. Learning about the ocean is important too—the more people understand how valuable the ocean is, the more they will want to protect it.",
    "passageTitle": "The Amazing Ocean",
    "questionText": "What happens to sea animals when they eat plastic?",
    "options": [
      {
        "label": "A",
        "text": "They grow stronger."
      },
      {
        "label": "B",
        "text": "They can get sick or die."
      },
      {
        "label": "C",
        "text": "They swim faster."
      },
      {
        "label": "D",
        "text": "They learn to avoid it."
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student identifies a cause-and-effect relationship.",
    "points": 1,
    "explanation": "The passage states that animals 'often mistake plastic for food, which can make them sick or even kill them.'"
  },
  {
    "id": 1113,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 1,
    "target": "10",
    "dok": 2,
    "standard": "RI.4",
    "type": "multiple-choice",
    "passage": "Read the passage and answer the questions.\n\n**The Amazing Ocean**\n*adapted from National Geographic Kids*\n\nThe ocean covers more than 70 percent of Earth's surface. It is home to millions of species of plants and animals, from tiny plankton to enormous blue whales. Scientists divide the ocean into five main regions: the Pacific, Atlantic, Indian, Southern, and Arctic Oceans.\n\n**Ocean Zones**\n\nThe ocean is divided into layers called zones. The sunlight zone is the top layer, reaching about 656 feet deep. Most ocean life lives here because sunlight helps plants grow, which feeds the animals. Below that is the twilight zone, where only a little light reaches. Deeper still is the midnight zone, where it is completely dark. Strange creatures live here, and some even make their own light through a process called bioluminescence.\n\n**Why the Ocean Matters**\n\nThe ocean affects weather and climate all over the world. Water evaporates from the ocean surface, forms clouds, and falls as rain over land. Without the ocean, there would be very little rainfall, and most plants could not survive.\n\nThe ocean also produces more than half of the world's oxygen. Tiny ocean plants called phytoplankton take in carbon dioxide and release oxygen, just like trees and plants on land. In fact, phytoplankton produce more oxygen than all the world's forests combined.\n\n**Ocean Problems**\n\nPollution is one of the biggest threats to the ocean. Plastic waste, oil spills, and chemicals all harm ocean life. Every year, about 8 million tons of plastic end up in the ocean. Sea turtles, fish, and seabirds often mistake plastic for food, which can make them sick or even kill them.\n\nScientists and ordinary people are working to help. Beach cleanups remove trash from shorelines. New laws limit how much pollution factories can release into waterways. Some inventors have even created machines that collect floating plastic from the ocean surface.\n\n**What You Can Do**\n\nEveryone can help protect the ocean. Reducing plastic use, recycling, and never littering are simple steps that make a difference. Learning about the ocean is important too—the more people understand how valuable the ocean is, the more they will want to protect it.",
    "passageTitle": "The Amazing Ocean",
    "questionText": "What does the word \"bioluminescence\" mean based on the passage?",
    "options": [
      {
        "label": "A",
        "text": "The ability to swim in deep water"
      },
      {
        "label": "B",
        "text": "The process of making their own light"
      },
      {
        "label": "C",
        "text": "A type of ocean plant"
      },
      {
        "label": "D",
        "text": "The way water changes color"
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student uses context to determine meaning.",
    "points": 1,
    "explanation": "The passage defines bioluminescence right in the text: 'some even make their own light through a process called bioluminescence.'"
  },
  {
    "id": 1114,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 1,
    "target": "11",
    "dok": 2,
    "standard": "RI.5",
    "type": "multiple-choice",
    "passage": "Read the passage and answer the questions.\n\n**The Amazing Ocean**\n*adapted from National Geographic Kids*\n\nThe ocean covers more than 70 percent of Earth's surface. It is home to millions of species of plants and animals, from tiny plankton to enormous blue whales. Scientists divide the ocean into five main regions: the Pacific, Atlantic, Indian, Southern, and Arctic Oceans.\n\n**Ocean Zones**\n\nThe ocean is divided into layers called zones. The sunlight zone is the top layer, reaching about 656 feet deep. Most ocean life lives here because sunlight helps plants grow, which feeds the animals. Below that is the twilight zone, where only a little light reaches. Deeper still is the midnight zone, where it is completely dark. Strange creatures live here, and some even make their own light through a process called bioluminescence.\n\n**Why the Ocean Matters**\n\nThe ocean affects weather and climate all over the world. Water evaporates from the ocean surface, forms clouds, and falls as rain over land. Without the ocean, there would be very little rainfall, and most plants could not survive.\n\nThe ocean also produces more than half of the world's oxygen. Tiny ocean plants called phytoplankton take in carbon dioxide and release oxygen, just like trees and plants on land. In fact, phytoplankton produce more oxygen than all the world's forests combined.\n\n**Ocean Problems**\n\nPollution is one of the biggest threats to the ocean. Plastic waste, oil spills, and chemicals all harm ocean life. Every year, about 8 million tons of plastic end up in the ocean. Sea turtles, fish, and seabirds often mistake plastic for food, which can make them sick or even kill them.\n\nScientists and ordinary people are working to help. Beach cleanups remove trash from shorelines. New laws limit how much pollution factories can release into waterways. Some inventors have even created machines that collect floating plastic from the ocean surface.\n\n**What You Can Do**\n\nEveryone can help protect the ocean. Reducing plastic use, recycling, and never littering are simple steps that make a difference. Learning about the ocean is important too—the more people understand how valuable the ocean is, the more they will want to protect it.",
    "passageTitle": "The Amazing Ocean",
    "questionText": "Why does the author use bold headings in this passage?",
    "options": [
      {
        "label": "A",
        "text": "To make the passage look longer"
      },
      {
        "label": "B",
        "text": "To separate the passage into topics so readers can find information"
      },
      {
        "label": "C",
        "text": "To show which words are the most important"
      },
      {
        "label": "D",
        "text": "To tell readers which part to read first"
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student understands the purpose of text features.",
    "points": 1,
    "explanation": "Bold headings organize information into sections (Ocean Zones, Why the Ocean Matters, etc.) so readers can quickly find the topic they need."
  },
  {
    "id": 1115,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 1,
    "target": "7",
    "dok": 2,
    "standard": "RI.1",
    "type": "multiple-choice",
    "passage": "Read the passage and answer the questions.\n\n**The Amazing Ocean**\n*adapted from National Geographic Kids*\n\nThe ocean covers more than 70 percent of Earth's surface. It is home to millions of species of plants and animals, from tiny plankton to enormous blue whales. Scientists divide the ocean into five main regions: the Pacific, Atlantic, Indian, Southern, and Arctic Oceans.\n\n**Ocean Zones**\n\nThe ocean is divided into layers called zones. The sunlight zone is the top layer, reaching about 656 feet deep. Most ocean life lives here because sunlight helps plants grow, which feeds the animals. Below that is the twilight zone, where only a little light reaches. Deeper still is the midnight zone, where it is completely dark. Strange creatures live here, and some even make their own light through a process called bioluminescence.\n\n**Why the Ocean Matters**\n\nThe ocean affects weather and climate all over the world. Water evaporates from the ocean surface, forms clouds, and falls as rain over land. Without the ocean, there would be very little rainfall, and most plants could not survive.\n\nThe ocean also produces more than half of the world's oxygen. Tiny ocean plants called phytoplankton take in carbon dioxide and release oxygen, just like trees and plants on land. In fact, phytoplankton produce more oxygen than all the world's forests combined.\n\n**Ocean Problems**\n\nPollution is one of the biggest threats to the ocean. Plastic waste, oil spills, and chemicals all harm ocean life. Every year, about 8 million tons of plastic end up in the ocean. Sea turtles, fish, and seabirds often mistake plastic for food, which can make them sick or even kill them.\n\nScientists and ordinary people are working to help. Beach cleanups remove trash from shorelines. New laws limit how much pollution factories can release into waterways. Some inventors have even created machines that collect floating plastic from the ocean surface.\n\n**What You Can Do**\n\nEveryone can help protect the ocean. Reducing plastic use, recycling, and never littering are simple steps that make a difference. Learning about the ocean is important too—the more people understand how valuable the ocean is, the more they will want to protect it.",
    "passageTitle": "The Amazing Ocean",
    "questionText": "According to the passage, what produces more oxygen than all the world's forests?",
    "options": [
      {
        "label": "A",
        "text": "Ocean waves"
      },
      {
        "label": "B",
        "text": "Coral reefs"
      },
      {
        "label": "C",
        "text": "Phytoplankton"
      },
      {
        "label": "D",
        "text": "Seaweed"
      }
    ],
    "correctAnswer": "C",
    "rubric": "The student recalls a key detail.",
    "points": 1,
    "explanation": "The passage states: 'phytoplankton produce more oxygen than all the world's forests combined.'"
  },
  {
    "id": 1116,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 1,
    "target": "8",
    "dok": 2,
    "standard": "RI.2",
    "type": "multiple-choice",
    "passage": "Read the passage and answer the questions.\n\n**The Amazing Ocean**\n*adapted from National Geographic Kids*\n\nThe ocean covers more than 70 percent of Earth's surface. It is home to millions of species of plants and animals, from tiny plankton to enormous blue whales. Scientists divide the ocean into five main regions: the Pacific, Atlantic, Indian, Southern, and Arctic Oceans.\n\n**Ocean Zones**\n\nThe ocean is divided into layers called zones. The sunlight zone is the top layer, reaching about 656 feet deep. Most ocean life lives here because sunlight helps plants grow, which feeds the animals. Below that is the twilight zone, where only a little light reaches. Deeper still is the midnight zone, where it is completely dark. Strange creatures live here, and some even make their own light through a process called bioluminescence.\n\n**Why the Ocean Matters**\n\nThe ocean affects weather and climate all over the world. Water evaporates from the ocean surface, forms clouds, and falls as rain over land. Without the ocean, there would be very little rainfall, and most plants could not survive.\n\nThe ocean also produces more than half of the world's oxygen. Tiny ocean plants called phytoplankton take in carbon dioxide and release oxygen, just like trees and plants on land. In fact, phytoplankton produce more oxygen than all the world's forests combined.\n\n**Ocean Problems**\n\nPollution is one of the biggest threats to the ocean. Plastic waste, oil spills, and chemicals all harm ocean life. Every year, about 8 million tons of plastic end up in the ocean. Sea turtles, fish, and seabirds often mistake plastic for food, which can make them sick or even kill them.\n\nScientists and ordinary people are working to help. Beach cleanups remove trash from shorelines. New laws limit how much pollution factories can release into waterways. Some inventors have even created machines that collect floating plastic from the ocean surface.\n\n**What You Can Do**\n\nEveryone can help protect the ocean. Reducing plastic use, recycling, and never littering are simple steps that make a difference. Learning about the ocean is important too—the more people understand how valuable the ocean is, the more they will want to protect it.",
    "passageTitle": "The Amazing Ocean",
    "questionText": "What is the main purpose of the 'What You Can Do' section?",
    "options": [
      {
        "label": "A",
        "text": "To explain how the ocean zones work"
      },
      {
        "label": "B",
        "text": "To describe different ocean animals"
      },
      {
        "label": "C",
        "text": "To encourage readers to help protect the ocean"
      },
      {
        "label": "D",
        "text": "To list facts about ocean pollution"
      }
    ],
    "correctAnswer": "C",
    "rubric": "The student identifies the author's purpose.",
    "points": 1,
    "explanation": "The section gives specific actions readers can take (reduce plastic, recycle, don't litter) to help protect the ocean."
  },
  {
    "id": 1117,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 1,
    "target": "9",
    "dok": 2,
    "standard": "RI.3",
    "type": "multiple-choice",
    "passage": "Read the passage and answer the questions.\n\n**The Amazing Ocean**\n*adapted from National Geographic Kids*\n\nThe ocean covers more than 70 percent of Earth's surface. It is home to millions of species of plants and animals, from tiny plankton to enormous blue whales. Scientists divide the ocean into five main regions: the Pacific, Atlantic, Indian, Southern, and Arctic Oceans.\n\n**Ocean Zones**\n\nThe ocean is divided into layers called zones. The sunlight zone is the top layer, reaching about 656 feet deep. Most ocean life lives here because sunlight helps plants grow, which feeds the animals. Below that is the twilight zone, where only a little light reaches. Deeper still is the midnight zone, where it is completely dark. Strange creatures live here, and some even make their own light through a process called bioluminescence.\n\n**Why the Ocean Matters**\n\nThe ocean affects weather and climate all over the world. Water evaporates from the ocean surface, forms clouds, and falls as rain over land. Without the ocean, there would be very little rainfall, and most plants could not survive.\n\nThe ocean also produces more than half of the world's oxygen. Tiny ocean plants called phytoplankton take in carbon dioxide and release oxygen, just like trees and plants on land. In fact, phytoplankton produce more oxygen than all the world's forests combined.\n\n**Ocean Problems**\n\nPollution is one of the biggest threats to the ocean. Plastic waste, oil spills, and chemicals all harm ocean life. Every year, about 8 million tons of plastic end up in the ocean. Sea turtles, fish, and seabirds often mistake plastic for food, which can make them sick or even kill them.\n\nScientists and ordinary people are working to help. Beach cleanups remove trash from shorelines. New laws limit how much pollution factories can release into waterways. Some inventors have even created machines that collect floating plastic from the ocean surface.\n\n**What You Can Do**\n\nEveryone can help protect the ocean. Reducing plastic use, recycling, and never littering are simple steps that make a difference. Learning about the ocean is important too—the more people understand how valuable the ocean is, the more they will want to protect it.",
    "passageTitle": "The Amazing Ocean",
    "questionText": "What is the order of ocean zones from top to bottom?",
    "options": [
      {
        "label": "A",
        "text": "Midnight zone, twilight zone, sunlight zone"
      },
      {
        "label": "B",
        "text": "Sunlight zone, twilight zone, midnight zone"
      },
      {
        "label": "C",
        "text": "Twilight zone, sunlight zone, midnight zone"
      },
      {
        "label": "D",
        "text": "Sunlight zone, midnight zone, twilight zone"
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student identifies the correct sequence.",
    "points": 1,
    "explanation": "The passage describes the zones from top to bottom: sunlight zone (top), twilight zone (middle), midnight zone (deepest, completely dark)."
  },
  {
    "id": 1118,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 1,
    "target": "10",
    "dok": 2,
    "standard": "RI.4",
    "type": "multiple-choice",
    "passage": "Read the passage and answer the questions.\n\n**The Amazing Ocean**\n*adapted from National Geographic Kids*\n\nThe ocean covers more than 70 percent of Earth's surface. It is home to millions of species of plants and animals, from tiny plankton to enormous blue whales. Scientists divide the ocean into five main regions: the Pacific, Atlantic, Indian, Southern, and Arctic Oceans.\n\n**Ocean Zones**\n\nThe ocean is divided into layers called zones. The sunlight zone is the top layer, reaching about 656 feet deep. Most ocean life lives here because sunlight helps plants grow, which feeds the animals. Below that is the twilight zone, where only a little light reaches. Deeper still is the midnight zone, where it is completely dark. Strange creatures live here, and some even make their own light through a process called bioluminescence.\n\n**Why the Ocean Matters**\n\nThe ocean affects weather and climate all over the world. Water evaporates from the ocean surface, forms clouds, and falls as rain over land. Without the ocean, there would be very little rainfall, and most plants could not survive.\n\nThe ocean also produces more than half of the world's oxygen. Tiny ocean plants called phytoplankton take in carbon dioxide and release oxygen, just like trees and plants on land. In fact, phytoplankton produce more oxygen than all the world's forests combined.\n\n**Ocean Problems**\n\nPollution is one of the biggest threats to the ocean. Plastic waste, oil spills, and chemicals all harm ocean life. Every year, about 8 million tons of plastic end up in the ocean. Sea turtles, fish, and seabirds often mistake plastic for food, which can make them sick or even kill them.\n\nScientists and ordinary people are working to help. Beach cleanups remove trash from shorelines. New laws limit how much pollution factories can release into waterways. Some inventors have even created machines that collect floating plastic from the ocean surface.\n\n**What You Can Do**\n\nEveryone can help protect the ocean. Reducing plastic use, recycling, and never littering are simple steps that make a difference. Learning about the ocean is important too—the more people understand how valuable the ocean is, the more they will want to protect it.",
    "passageTitle": "The Amazing Ocean",
    "questionText": "In the passage, what does the word \"species\" mean?",
    "options": [
      {
        "label": "A",
        "text": "A body of water"
      },
      {
        "label": "B",
        "text": "A type of plant or animal"
      },
      {
        "label": "C",
        "text": "A special ability"
      },
      {
        "label": "D",
        "text": "A layer of the ocean"
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student determines meaning from context.",
    "points": 1,
    "explanation": "The passage says 'millions of species of plants and animals.' Context shows 'species' means a type or kind of living thing."
  },
  {
    "id": 1119,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 1,
    "target": "1",
    "dok": 2,
    "standard": "RL.1",
    "type": "multiple-choice",
    "passage": "Read the passage and answer the questions.\n\n**The Storm Dog**\n*by Clara Mitchell*\n\nMaya pressed her face against the window. The sky was dark gray, and the wind bent the trees sideways. Thunder rumbled in the distance.\n\n\"Come away from the window,\" said Mama. \"The storm will pass.\"\n\nBut Maya wasn't worried about the storm. She was worried about the dog. That morning, on the way to school, she had seen a small brown dog sitting near the bus stop. It had no collar and its fur was matted. It looked at Maya with big, sad eyes.\n\nAll day at school, Maya thought about the dog. She drew pictures of it during art class. She wrote about it in her journal. When her teacher, Ms. Rivera, asked what was on her mind, Maya told her about the stray dog.\n\n\"Sometimes animals find their way,\" Ms. Rivera said kindly. \"But it's good that you care.\"\n\nNow the storm was here, and Maya couldn't stop thinking about the little dog out there alone.\n\n\"Mama, there's a dog outside. I saw it this morning. It doesn't have a home,\" Maya said.\n\nMama looked at her daughter's worried face. \"Where did you see it?\"\n\n\"Near the bus stop on Oak Street.\"\n\nMama was quiet for a moment. Then she grabbed two towels and the car keys. \"Let's go look,\" she said.\n\nThey drove slowly through the rain. At first, Maya couldn't see anything. The rain was too heavy. But then, huddled under a bench near the bus stop, she spotted the brown dog. It was shaking.\n\n\"There!\" Maya pointed.\n\nMama pulled over. Maya jumped out with a towel and wrapped it around the trembling dog. It licked her hand.\n\nThey brought the dog home and dried it off. Mama warmed some leftover chicken and put water in a bowl. The dog ate hungrily.\n\n\"We'll take it to the shelter tomorrow to check for a microchip,\" Mama said. \"Someone might be looking for this little one.\"\n\nMaya nodded, but she already knew what she hoped—that no one would claim the dog, and it could stay with them forever.\n\nThe next day, the shelter found no microchip and no one had reported a missing dog matching its description. After a week of waiting, Mama said the words Maya had been dreaming of: \"I think we have a new family member.\"\n\nMaya named the dog Storm.",
    "passageTitle": "The Storm Dog",
    "questionText": "What did Mama bring when she decided to go look for the dog?",
    "options": [
      {
        "label": "A",
        "text": "An umbrella and a leash"
      },
      {
        "label": "B",
        "text": "Two towels and the car keys"
      },
      {
        "label": "C",
        "text": "Dog food and water"
      },
      {
        "label": "D",
        "text": "A flashlight and a blanket"
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student recalls a specific detail.",
    "points": 1,
    "explanation": "The passage states: 'she grabbed two towels and the car keys.' The towels were for drying the wet dog."
  },
  {
    "id": 1120,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 2,
    "target": "1",
    "dok": 2,
    "standard": "W.1",
    "type": "multiple-choice",
    "questionText": "Which sentence would be the best topic sentence for a paragraph about why dogs make good pets?",
    "options": [
      {
        "label": "A",
        "text": "My neighbor has a big brown dog."
      },
      {
        "label": "B",
        "text": "Dogs are loyal, fun, and make great companions for families."
      },
      {
        "label": "C",
        "text": "Some dogs like to play fetch."
      },
      {
        "label": "D",
        "text": "There are many types of animals in the world."
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student identifies an effective topic sentence.",
    "points": 1,
    "explanation": "A good topic sentence states the main idea of the paragraph clearly. Option B tells the reader what the whole paragraph will be about."
  },
  {
    "id": 1121,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 2,
    "target": "2",
    "dok": 2,
    "standard": "W.2",
    "type": "multiple-choice",
    "questionText": "A student is writing a report about ocean pollution. Which sentence would best support the main idea that pollution harms sea life?",
    "options": [
      {
        "label": "A",
        "text": "The ocean is very big and deep."
      },
      {
        "label": "B",
        "text": "Many people enjoy going to the beach."
      },
      {
        "label": "C",
        "text": "Sea turtles often eat plastic bags because they look like jellyfish."
      },
      {
        "label": "D",
        "text": "The Pacific Ocean is the largest ocean."
      }
    ],
    "correctAnswer": "C",
    "rubric": "The student selects relevant supporting evidence.",
    "points": 1,
    "explanation": "The detail about sea turtles eating plastic directly supports the idea that pollution harms sea life. The other options are off-topic."
  },
  {
    "id": 1122,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 2,
    "target": "3",
    "dok": 1,
    "standard": "L.1",
    "type": "multiple-choice",
    "questionText": "Which sentence uses correct punctuation?",
    "options": [
      {
        "label": "A",
        "text": "Maya said, \"Look at the dog!\""
      },
      {
        "label": "B",
        "text": "Maya said \"Look at the dog!."
      },
      {
        "label": "C",
        "text": "Maya said, look at the dog!"
      },
      {
        "label": "D",
        "text": "Maya said \"Look at the dog\"!"
      }
    ],
    "correctAnswer": "A",
    "rubric": "The student identifies correct dialogue punctuation.",
    "points": 1,
    "explanation": "In dialogue, use a comma after 'said,' open quotes, capitalize the first word, and put the end punctuation inside the closing quotes."
  },
  {
    "id": 1123,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 2,
    "target": "3",
    "dok": 1,
    "standard": "L.1",
    "type": "multiple-choice",
    "questionText": "Which sentence is written correctly?",
    "options": [
      {
        "label": "A",
        "text": "The children plays in the park every day."
      },
      {
        "label": "B",
        "text": "The children play in the park every day."
      },
      {
        "label": "C",
        "text": "The children playing in the park every day."
      },
      {
        "label": "D",
        "text": "The children has played in the park every day."
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student identifies correct subject-verb agreement.",
    "points": 1,
    "explanation": "'Children' is a plural noun, so it needs the plural verb 'play' (not 'plays'). Option C is a fragment (no main verb), and D uses incorrect agreement."
  },
  {
    "id": 1124,
    "practiceTest": 2,
    "testType": "cat",
    "subject": "ela",
    "grade": 3,
    "claim": 2,
    "target": "4",
    "dok": 1,
    "standard": "L.2",
    "type": "multiple-choice",
    "questionText": "Which word correctly completes this sentence?\n\nThe two _____ played together at recess.",
    "options": [
      {
        "label": "A",
        "text": "girl's"
      },
      {
        "label": "B",
        "text": "girls"
      },
      {
        "label": "C",
        "text": "girls'"
      },
      {
        "label": "D",
        "text": "girles"
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student uses the correct plural form.",
    "points": 1,
    "explanation": "We need a simple plural noun (more than one girl). 'Girls' is the correct plural. 'Girl's' and 'girls'' are possessive forms."
  },
  {
    "id": 1125,
    "grade": 3,
    "practiceTest": 2,
    "subject": "ela",
    "testType": "cat",
    "claim": 3,
    "target": "18",
    "dok": 2,
    "standard": "SL.3.2",
    "type": "multiple-choice",
    "passage": "Listen to the presentation. Then answer the questions.\n\n**Caring for Storm After the Rain**\n*presentation transcript for classroom use*\n\nSpeaker 1: Our class is sharing a report about how Maya helped a lost dog during a storm.\n\nSpeaker 2: Maya first noticed the dog shivering beside the road. She did not walk away. Instead, she told her mother what she saw.\n\nSpeaker 1: Maya and her mother brought a towel, guided the dog into their car, and took it home so it could get warm and dry.\n\nSpeaker 2: After that, Maya helped by giving the dog water and staying calm while her mother made phone calls to find out whether the dog belonged to someone nearby.\n\nSpeaker 1: The report teaches that helping an animal can begin with one small choice. A person must notice the problem, act carefully, and keep trying until the animal is safe.",
    "passageTitle": "Caring for Storm After the Rain",
    "questionText": "What is the main idea of the presentation?",
    "options": [
      {
        "label": "A",
        "text": "Storms always scare animals away from towns"
      },
      {
        "label": "B",
        "text": "People can help a lost animal by noticing the problem and acting carefully"
      },
      {
        "label": "C",
        "text": "Dogs like riding in cars during storms"
      },
      {
        "label": "D",
        "text": "Maya wanted to keep every dog she found"
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student identifies the main idea of the presentation.",
    "points": 1,
    "explanation": "The speakers explain that Maya noticed the dog, acted carefully, and kept helping until it was safe."
  },
  {
    "id": 1126,
    "grade": 3,
    "practiceTest": 2,
    "subject": "ela",
    "testType": "cat",
    "claim": 3,
    "target": "18",
    "dok": 3,
    "standard": "SL.3.2",
    "type": "two-part",
    "passage": "Listen to the presentation. Then answer the questions.\n\n**Caring for Storm After the Rain**\n*presentation transcript for classroom use*\n\nSpeaker 1: Our class is sharing a report about how Maya helped a lost dog during a storm.\n\nSpeaker 2: Maya first noticed the dog shivering beside the road. She did not walk away. Instead, she told her mother what she saw.\n\nSpeaker 1: Maya and her mother brought a towel, guided the dog into their car, and took it home so it could get warm and dry.\n\nSpeaker 2: After that, Maya helped by giving the dog water and staying calm while her mother made phone calls to find out whether the dog belonged to someone nearby.\n\nSpeaker 1: The report teaches that helping an animal can begin with one small choice. A person must notice the problem, act carefully, and keep trying until the animal is safe.",
    "passageTitle": "Caring for Storm After the Rain",
    "questionText": "Answer both parts of the question.",
    "partAPrompt": "Part A: Why did the speakers include details about the towel, water, and phone calls?",
    "partAOptions": [
      {
        "label": "A",
        "text": "to show the order of steps people took to help the dog"
      },
      {
        "label": "B",
        "text": "to prove storms are worse than snow"
      },
      {
        "label": "C",
        "text": "to compare dogs with ocean animals"
      },
      {
        "label": "D",
        "text": "to explain why Maya missed school"
      }
    ],
    "partBPrompt": "Part B: Which detail best supports your answer?",
    "partBOptions": [
      {
        "label": "A",
        "text": "Maya first noticed the dog shivering beside the road."
      },
      {
        "label": "B",
        "text": "Maya helped by giving the dog water and staying calm while her mother made phone calls."
      },
      {
        "label": "C",
        "text": "A person must keep trying until the animal is safe."
      },
      {
        "label": "D",
        "text": "Our class is sharing a report."
      }
    ],
    "correctAnswer": [
      "A",
      "B"
    ],
    "rubric": "The student identifies the purpose of the details and the best supporting evidence.",
    "points": 1,
    "explanation": "The listed details show the careful steps Maya and her mother used to help the dog."
  },
  {
    "id": 1127,
    "grade": 3,
    "practiceTest": 2,
    "subject": "ela",
    "testType": "cat",
    "claim": 3,
    "target": "19",
    "dok": 3,
    "standard": "SL.3.2",
    "type": "grid-match",
    "passage": "Listen to the presentation. Then answer the questions.\n\n**Caring for Storm After the Rain**\n*presentation transcript for classroom use*\n\nSpeaker 1: Our class is sharing a report about how Maya helped a lost dog during a storm.\n\nSpeaker 2: Maya first noticed the dog shivering beside the road. She did not walk away. Instead, she told her mother what she saw.\n\nSpeaker 1: Maya and her mother brought a towel, guided the dog into their car, and took it home so it could get warm and dry.\n\nSpeaker 2: After that, Maya helped by giving the dog water and staying calm while her mother made phone calls to find out whether the dog belonged to someone nearby.\n\nSpeaker 1: The report teaches that helping an animal can begin with one small choice. A person must notice the problem, act carefully, and keep trying until the animal is safe.",
    "passageTitle": "Caring for Storm After the Rain",
    "questionText": "Complete the chart to show what happened before or after Storm was safe inside the car.",
    "gridRows": [
      "Maya noticed the dog shivering.",
      "Maya and her mother brought a towel.",
      "The dog received water at home.",
      "Phone calls were made to find the owner."
    ],
    "gridColumns": [
      "Before Storm was safe in the car",
      "After Storm was safe in the car"
    ],
    "correctAnswer": [
      "0:0",
      "1:0",
      "2:1",
      "3:1"
    ],
    "rubric": "The student correctly sorts events from the presentation.",
    "points": 1,
    "explanation": "Maya noticing the dog and bringing the towel happened first; the water and phone calls happened afterward."
  },
  {
    "id": 1128,
    "grade": 3,
    "practiceTest": 2,
    "subject": "ela",
    "testType": "cat",
    "claim": 3,
    "target": "19",
    "dok": 2,
    "standard": "SL.3.2",
    "type": "multiple-choice",
    "passage": "Listen to the presentation. Then answer the questions.\n\n**Keeping Ocean Animals Safe**\n*presentation transcript for classroom use*\n\nSpeaker 1: This presentation explains two ways people help ocean animals.\n\nSpeaker 2: First, many volunteers collect plastic and trash from beaches before that trash can wash into the ocean.\n\nSpeaker 1: Second, inventors have created machines that gather floating plastic from ocean water. These tools help remove dangerous trash that animals might mistake for food.\n\nSpeaker 2: Scientists and community groups also teach people to use less plastic. When people throw away less trash, fewer harmful materials reach the ocean in the first place.\n\nSpeaker 1: The main message is simple: people can protect ocean animals by cleaning up pollution and by preventing new pollution from spreading.",
    "passageTitle": "Keeping Ocean Animals Safe",
    "questionText": "Which idea is explained in the presentation?",
    "options": [
      {
        "label": "A",
        "text": "Ocean animals can solve pollution problems without people"
      },
      {
        "label": "B",
        "text": "People can protect ocean animals by removing trash and using less plastic"
      },
      {
        "label": "C",
        "text": "Only scientists should visit beaches"
      },
      {
        "label": "D",
        "text": "Beach cleanups do not change anything"
      }
    ],
    "correctAnswer": "B",
    "rubric": "The student identifies a key idea from the presentation.",
    "points": 1,
    "explanation": "The speakers describe cleanup work, plastic-collecting machines, and using less plastic to help animals."
  },
  {
    "id": 1129,
    "grade": 3,
    "practiceTest": 2,
    "subject": "ela",
    "testType": "cat",
    "claim": 4,
    "target": "20",
    "dok": 3,
    "standard": "W.3.8",
    "type": "multi-select",
    "questionText": "A student is researching ways people help animals. Which two sources would give the most useful information?",
    "options": [
      {
        "label": "A",
        "text": "A fact article about how beach cleanups protect sea life"
      },
      {
        "label": "B",
        "text": "A comic strip about a talking goldfish"
      },
      {
        "label": "C",
        "text": "An interview with a veterinarian about rescuing lost pets"
      },
      {
        "label": "D",
        "text": "A menu from a seafood restaurant"
      },
      {
        "label": "E",
        "text": "A poster showing favorite dog names"
      }
    ],
    "correctAnswer": [
      "A",
      "C"
    ],
    "rubric": "The student selects the two best research sources.",
    "points": 1,
    "explanation": "The beach-cleanup article and veterinarian interview both give factual information about helping animals."
  },
  {
    "id": 1130,
    "grade": 3,
    "practiceTest": 2,
    "subject": "ela",
    "testType": "cat",
    "claim": 4,
    "target": "21",
    "dok": 3,
    "standard": "RI.3.9",
    "type": "multiple-choice",
    "passage": "Listen to the presentation. Then answer the questions.\n\n**Caring for Storm After the Rain**\n*presentation transcript for classroom use*\n\nSpeaker 1: Our class is sharing a report about how Maya helped a lost dog during a storm.\n\nSpeaker 2: Maya first noticed the dog shivering beside the road. She did not walk away. Instead, she told her mother what she saw.\n\nSpeaker 1: Maya and her mother brought a towel, guided the dog into their car, and took it home so it could get warm and dry.\n\nSpeaker 2: After that, Maya helped by giving the dog water and staying calm while her mother made phone calls to find out whether the dog belonged to someone nearby.\n\nSpeaker 1: The report teaches that helping an animal can begin with one small choice. A person must notice the problem, act carefully, and keep trying until the animal is safe.\n\n---\n\nListen to the presentation. Then answer the questions.\n\n**Keeping Ocean Animals Safe**\n*presentation transcript for classroom use*\n\nSpeaker 1: This presentation explains two ways people help ocean animals.\n\nSpeaker 2: First, many volunteers collect plastic and trash from beaches before that trash can wash into the ocean.\n\nSpeaker 1: Second, inventors have created machines that gather floating plastic from ocean water. These tools help remove dangerous trash that animals might mistake for food.\n\nSpeaker 2: Scientists and community groups also teach people to use less plastic. When people throw away less trash, fewer harmful materials reach the ocean in the first place.\n\nSpeaker 1: The main message is simple: people can protect ocean animals by cleaning up pollution and by preventing new pollution from spreading.",
    "passageTitle": "The Storm Dog / The Amazing Ocean",
    "questionText": "Which idea is supported by both texts?",
    "options": [
      {
        "label": "A",
        "text": "People can make a difference when they notice a problem and take action"
      },
      {
        "label": "B",
        "text": "All animals should live with humans"
      },
      {
        "label": "C",
        "text": "Storms are the main cause of ocean pollution"
      },
      {
        "label": "D",
        "text": "Helping animals is always easy"
      }
    ],
    "correctAnswer": "A",
    "rubric": "The student identifies a shared idea across the two texts.",
    "points": 1,
    "explanation": "Maya helps a lost dog directly, and people help ocean animals by cleaning pollution and changing habits."
  },
  {
    "id": 1150,
    "practiceTest": 2,
    "testType": "pt",
    "subject": "ela",
    "grade": 3,
    "claim": 4,
    "target": "1",
    "dok": 2,
    "standard": "W.2",
    "type": "grid-match",
    "passage": "Read the passage and answer the questions.\n\n**The Storm Dog**\n*by Clara Mitchell*\n\nMaya pressed her face against the window. The sky was dark gray, and the wind bent the trees sideways. Thunder rumbled in the distance.\n\n\"Come away from the window,\" said Mama. \"The storm will pass.\"\n\nBut Maya wasn't worried about the storm. She was worried about the dog. That morning, on the way to school, she had seen a small brown dog sitting near the bus stop. It had no collar and its fur was matted. It looked at Maya with big, sad eyes.\n\nAll day at school, Maya thought about the dog. She drew pictures of it during art class. She wrote about it in her journal. When her teacher, Ms. Rivera, asked what was on her mind, Maya told her about the stray dog.\n\n\"Sometimes animals find their way,\" Ms. Rivera said kindly. \"But it's good that you care.\"\n\nNow the storm was here, and Maya couldn't stop thinking about the little dog out there alone.\n\n\"Mama, there's a dog outside. I saw it this morning. It doesn't have a home,\" Maya said.\n\nMama looked at her daughter's worried face. \"Where did you see it?\"\n\n\"Near the bus stop on Oak Street.\"\n\nMama was quiet for a moment. Then she grabbed two towels and the car keys. \"Let's go look,\" she said.\n\nThey drove slowly through the rain. At first, Maya couldn't see anything. The rain was too heavy. But then, huddled under a bench near the bus stop, she spotted the brown dog. It was shaking.\n\n\"There!\" Maya pointed.\n\nMama pulled over. Maya jumped out with a towel and wrapped it around the trembling dog. It licked her hand.\n\nThey brought the dog home and dried it off. Mama warmed some leftover chicken and put water in a bowl. The dog ate hungrily.\n\n\"We'll take it to the shelter tomorrow to check for a microchip,\" Mama said. \"Someone might be looking for this little one.\"\n\nMaya nodded, but she already knew what she hoped—that no one would claim the dog, and it could stay with them forever.\n\nThe next day, the shelter found no microchip and no one had reported a missing dog matching its description. After a week of waiting, Mama said the words Maya had been dreaming of: \"I think we have a new family member.\"\n\nMaya named the dog Storm.\n\n---\n\nRead the passage and answer the questions.\n\n**The Amazing Ocean**\n*adapted from National Geographic Kids*\n\nThe ocean covers more than 70 percent of Earth's surface. It is home to millions of species of plants and animals, from tiny plankton to enormous blue whales. Scientists divide the ocean into five main regions: the Pacific, Atlantic, Indian, Southern, and Arctic Oceans.\n\n**Ocean Zones**\n\nThe ocean is divided into layers called zones. The sunlight zone is the top layer, reaching about 656 feet deep. Most ocean life lives here because sunlight helps plants grow, which feeds the animals. Below that is the twilight zone, where only a little light reaches. Deeper still is the midnight zone, where it is completely dark. Strange creatures live here, and some even make their own light through a process called bioluminescence.\n\n**Why the Ocean Matters**\n\nThe ocean affects weather and climate all over the world. Water evaporates from the ocean surface, forms clouds, and falls as rain over land. Without the ocean, there would be very little rainfall, and most plants could not survive.\n\nThe ocean also produces more than half of the world's oxygen. Tiny ocean plants called phytoplankton take in carbon dioxide and release oxygen, just like trees and plants on land. In fact, phytoplankton produce more oxygen than all the world's forests combined.\n\n**Ocean Problems**\n\nPollution is one of the biggest threats to the ocean. Plastic waste, oil spills, and chemicals all harm ocean life. Every year, about 8 million tons of plastic end up in the ocean. Sea turtles, fish, and seabirds often mistake plastic for food, which can make them sick or even kill them.\n\nScientists and ordinary people are working to help. Beach cleanups remove trash from shorelines. New laws limit how much pollution factories can release into waterways. Some inventors have even created machines that collect floating plastic from the ocean surface.\n\n**What You Can Do**\n\nEveryone can help protect the ocean. Reducing plastic use, recycling, and never littering are simple steps that make a difference. Learning about the ocean is important too—the more people understand how valuable the ocean is, the more they will want to protect it.",
    "passageTitle": "The Storm Dog / The Amazing Ocean",
    "passageAuthor": "Clara Mitchell",
    "studentDirections": "**Your Assignment**\n\nYou will read the story \"The Storm Dog\" and the article \"The Amazing Ocean.\" Then you will answer questions and write an essay about how people can help animals.\n\n**Steps:**\n1. Read both sources carefully.\n2. Answer the research questions.\n3. Plan and write your essay.",
    "questionText": "Match each detail to the source where it belongs.",
    "gridRows": [
      "Maya wrapped a towel around the trembling dog.",
      "Plastic waste can make sea animals sick.",
      "A shelter checked the dog for a microchip.",
      "People can reduce plastic use to help the ocean."
    ],
    "gridColumns": [
      "The Storm Dog",
      "The Amazing Ocean"
    ],
    "correctAnswer": [
      "0:0",
      "1:1",
      "2:0",
      "3:1"
    ],
    "rubric": "The student correctly matches each detail to the source where it appears.",
    "points": 1,
    "explanation": "The story includes details about rescuing and caring for Storm, while the article explains how pollution harms ocean animals and how people can help."
  },
  {
    "id": 1151,
    "practiceTest": 2,
    "testType": "pt",
    "subject": "ela",
    "grade": 3,
    "claim": 4,
    "target": "3",
    "dok": 3,
    "standard": "W.2",
    "type": "short-answer",
    "passage": "Read the passage and answer the questions.\n\n**The Storm Dog**\n*by Clara Mitchell*\n\nMaya pressed her face against the window. The sky was dark gray, and the wind bent the trees sideways. Thunder rumbled in the distance.\n\n\"Come away from the window,\" said Mama. \"The storm will pass.\"\n\nBut Maya wasn't worried about the storm. She was worried about the dog. That morning, on the way to school, she had seen a small brown dog sitting near the bus stop. It had no collar and its fur was matted. It looked at Maya with big, sad eyes.\n\nAll day at school, Maya thought about the dog. She drew pictures of it during art class. She wrote about it in her journal. When her teacher, Ms. Rivera, asked what was on her mind, Maya told her about the stray dog.\n\n\"Sometimes animals find their way,\" Ms. Rivera said kindly. \"But it's good that you care.\"\n\nNow the storm was here, and Maya couldn't stop thinking about the little dog out there alone.\n\n\"Mama, there's a dog outside. I saw it this morning. It doesn't have a home,\" Maya said.\n\nMama looked at her daughter's worried face. \"Where did you see it?\"\n\n\"Near the bus stop on Oak Street.\"\n\nMama was quiet for a moment. Then she grabbed two towels and the car keys. \"Let's go look,\" she said.\n\nThey drove slowly through the rain. At first, Maya couldn't see anything. The rain was too heavy. But then, huddled under a bench near the bus stop, she spotted the brown dog. It was shaking.\n\n\"There!\" Maya pointed.\n\nMama pulled over. Maya jumped out with a towel and wrapped it around the trembling dog. It licked her hand.\n\nThey brought the dog home and dried it off. Mama warmed some leftover chicken and put water in a bowl. The dog ate hungrily.\n\n\"We'll take it to the shelter tomorrow to check for a microchip,\" Mama said. \"Someone might be looking for this little one.\"\n\nMaya nodded, but she already knew what she hoped—that no one would claim the dog, and it could stay with them forever.\n\nThe next day, the shelter found no microchip and no one had reported a missing dog matching its description. After a week of waiting, Mama said the words Maya had been dreaming of: \"I think we have a new family member.\"\n\nMaya named the dog Storm.\n\n---\n\nRead the passage and answer the questions.\n\n**The Amazing Ocean**\n*adapted from National Geographic Kids*\n\nThe ocean covers more than 70 percent of Earth's surface. It is home to millions of species of plants and animals, from tiny plankton to enormous blue whales. Scientists divide the ocean into five main regions: the Pacific, Atlantic, Indian, Southern, and Arctic Oceans.\n\n**Ocean Zones**\n\nThe ocean is divided into layers called zones. The sunlight zone is the top layer, reaching about 656 feet deep. Most ocean life lives here because sunlight helps plants grow, which feeds the animals. Below that is the twilight zone, where only a little light reaches. Deeper still is the midnight zone, where it is completely dark. Strange creatures live here, and some even make their own light through a process called bioluminescence.\n\n**Why the Ocean Matters**\n\nThe ocean affects weather and climate all over the world. Water evaporates from the ocean surface, forms clouds, and falls as rain over land. Without the ocean, there would be very little rainfall, and most plants could not survive.\n\nThe ocean also produces more than half of the world's oxygen. Tiny ocean plants called phytoplankton take in carbon dioxide and release oxygen, just like trees and plants on land. In fact, phytoplankton produce more oxygen than all the world's forests combined.\n\n**Ocean Problems**\n\nPollution is one of the biggest threats to the ocean. Plastic waste, oil spills, and chemicals all harm ocean life. Every year, about 8 million tons of plastic end up in the ocean. Sea turtles, fish, and seabirds often mistake plastic for food, which can make them sick or even kill them.\n\nScientists and ordinary people are working to help. Beach cleanups remove trash from shorelines. New laws limit how much pollution factories can release into waterways. Some inventors have even created machines that collect floating plastic from the ocean surface.\n\n**What You Can Do**\n\nEveryone can help protect the ocean. Reducing plastic use, recycling, and never littering are simple steps that make a difference. Learning about the ocean is important too—the more people understand how valuable the ocean is, the more they will want to protect it.",
    "passageTitle": "The Storm Dog / The Amazing Ocean",
    "questionText": "How does each source show that people can help animals? Use one detail from each source in your answer.",
    "correctAnswer": "In The Storm Dog, Maya and her mother rescue the dog from the storm and care for it. In The Amazing Ocean, people help animals by cleaning beaches, limiting pollution, or collecting plastic from the ocean.",
    "rubric": "2 points: The student explains how each source shows people helping animals and includes one accurate detail from each source. 1 point: The student uses one source clearly or gives a partial answer about both. 0 points: All other responses.",
    "points": 2,
    "explanation": "A complete response uses the rescue in the story and an action from the article, such as removing plastic or reducing pollution, to show how people help animals.",
    "studentDirections": "**Your Assignment**\n\nYou will read the story \"The Storm Dog\" and the article \"The Amazing Ocean.\" Then you will answer questions and write an essay about how people can help animals.\n\n**Steps:**\n1. Read both sources carefully.\n2. Answer the research questions.\n3. Plan and write your essay.",
    "passageAuthor": "Clara Mitchell"
  },
  {
    "id": 1152,
    "practiceTest": 2,
    "testType": "pt",
    "subject": "ela",
    "grade": 3,
    "claim": 2,
    "target": "1",
    "dok": 3,
    "standard": "W.2",
    "type": "extended-writing",
    "passage": "Read the passage and answer the questions.\n\n**The Storm Dog**\n*by Clara Mitchell*\n\nMaya pressed her face against the window. The sky was dark gray, and the wind bent the trees sideways. Thunder rumbled in the distance.\n\n\"Come away from the window,\" said Mama. \"The storm will pass.\"\n\nBut Maya wasn't worried about the storm. She was worried about the dog. That morning, on the way to school, she had seen a small brown dog sitting near the bus stop. It had no collar and its fur was matted. It looked at Maya with big, sad eyes.\n\nAll day at school, Maya thought about the dog. She drew pictures of it during art class. She wrote about it in her journal. When her teacher, Ms. Rivera, asked what was on her mind, Maya told her about the stray dog.\n\n\"Sometimes animals find their way,\" Ms. Rivera said kindly. \"But it's good that you care.\"\n\nNow the storm was here, and Maya couldn't stop thinking about the little dog out there alone.\n\n\"Mama, there's a dog outside. I saw it this morning. It doesn't have a home,\" Maya said.\n\nMama looked at her daughter's worried face. \"Where did you see it?\"\n\n\"Near the bus stop on Oak Street.\"\n\nMama was quiet for a moment. Then she grabbed two towels and the car keys. \"Let's go look,\" she said.\n\nThey drove slowly through the rain. At first, Maya couldn't see anything. The rain was too heavy. But then, huddled under a bench near the bus stop, she spotted the brown dog. It was shaking.\n\n\"There!\" Maya pointed.\n\nMama pulled over. Maya jumped out with a towel and wrapped it around the trembling dog. It licked her hand.\n\nThey brought the dog home and dried it off. Mama warmed some leftover chicken and put water in a bowl. The dog ate hungrily.\n\n\"We'll take it to the shelter tomorrow to check for a microchip,\" Mama said. \"Someone might be looking for this little one.\"\n\nMaya nodded, but she already knew what she hoped—that no one would claim the dog, and it could stay with them forever.\n\nThe next day, the shelter found no microchip and no one had reported a missing dog matching its description. After a week of waiting, Mama said the words Maya had been dreaming of: \"I think we have a new family member.\"\n\nMaya named the dog Storm.\n\n---\n\nRead the passage and answer the questions.\n\n**The Amazing Ocean**\n*adapted from National Geographic Kids*\n\nThe ocean covers more than 70 percent of Earth's surface. It is home to millions of species of plants and animals, from tiny plankton to enormous blue whales. Scientists divide the ocean into five main regions: the Pacific, Atlantic, Indian, Southern, and Arctic Oceans.\n\n**Ocean Zones**\n\nThe ocean is divided into layers called zones. The sunlight zone is the top layer, reaching about 656 feet deep. Most ocean life lives here because sunlight helps plants grow, which feeds the animals. Below that is the twilight zone, where only a little light reaches. Deeper still is the midnight zone, where it is completely dark. Strange creatures live here, and some even make their own light through a process called bioluminescence.\n\n**Why the Ocean Matters**\n\nThe ocean affects weather and climate all over the world. Water evaporates from the ocean surface, forms clouds, and falls as rain over land. Without the ocean, there would be very little rainfall, and most plants could not survive.\n\nThe ocean also produces more than half of the world's oxygen. Tiny ocean plants called phytoplankton take in carbon dioxide and release oxygen, just like trees and plants on land. In fact, phytoplankton produce more oxygen than all the world's forests combined.\n\n**Ocean Problems**\n\nPollution is one of the biggest threats to the ocean. Plastic waste, oil spills, and chemicals all harm ocean life. Every year, about 8 million tons of plastic end up in the ocean. Sea turtles, fish, and seabirds often mistake plastic for food, which can make them sick or even kill them.\n\nScientists and ordinary people are working to help. Beach cleanups remove trash from shorelines. New laws limit how much pollution factories can release into waterways. Some inventors have even created machines that collect floating plastic from the ocean surface.\n\n**What You Can Do**\n\nEveryone can help protect the ocean. Reducing plastic use, recycling, and never littering are simple steps that make a difference. Learning about the ocean is important too—the more people understand how valuable the ocean is, the more they will want to protect it.",
    "passageTitle": "The Storm Dog / The Amazing Ocean",
    "questionText": "Using information from both 'The Storm Dog' and 'The Amazing Ocean,' write an essay explaining how people can help animals. Use details and examples from both sources to support your ideas.\n\nBe sure to:\n• State your main idea clearly\n• Use details from both sources\n• Organize your ideas\n• Use correct spelling and grammar",
    "correctAnswer": "Student should cite examples from both texts: Maya rescuing the stray dog, and people cleaning beaches / collecting plastic / making new laws to protect ocean animals.",
    "rubric": "4 points: Clear main idea, uses details from both sources, organized with introduction and conclusion, few errors. 3 points: Main idea present, uses both sources but less detail. 2 points: Main idea unclear or only uses one source. 1 point: Attempts the task but minimal evidence or organization.",
    "points": 4,
    "explanation": "A strong essay would state that people can help animals in many ways, then give examples from both texts: rescuing stray pets (The Storm Dog) and reducing pollution/cleaning oceans (The Amazing Ocean).",
    "studentDirections": "**Your Assignment**\n\nYou will read the story \"The Storm Dog\" and the article \"The Amazing Ocean.\" Then you will answer questions and write an essay about how people can help animals.\n\n**Steps:**\n1. Read both sources carefully.\n2. Answer the research questions.\n3. Plan and write your essay.",
    "passageAuthor": "Clara Mitchell"
  }
];
