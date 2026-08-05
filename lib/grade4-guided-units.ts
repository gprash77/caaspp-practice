import type { LearnSubject } from "./grade4-learn";

export interface GuidedQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
  retry: string;
}

export interface GuidedTutorialStep {
  id: string;
  phase: "Learn" | "Practice together" | "Try it" | "Mastery check";
  title: string;
  goal: string;
  teaching: Array<{
    heading: string;
    body: string;
  }>;
  strategy?: string[];
  example?: {
    prompt: string;
    steps: string[];
    conclusion: string;
  };
  question?: GuidedQuestion;
  continueLabel?: string;
}

export interface Grade4GuidedUnit {
  id: string;
  subject: LearnSubject;
  title: string;
  description: string;
  outcome: string;
  standards: string[];
  estimatedMinutes: number;
  steps: GuidedTutorialStep[];
}

export const grade4GuidedUnits: Grade4GuidedUnit[] = [
  {
    id: "fraction-foundations",
    subject: "math",
    title: "Fractions That Make Sense",
    description: "Build fractions, make equivalent fractions, and compare them with a clear plan.",
    outcome: "I can explain what a fraction means and compare fractions using a model or equivalent fractions.",
    standards: ["4.NF.A.1", "4.NF.A.2"],
    estimatedMinutes: 25,
    steps: [
      {
        id: "fraction-parts",
        phase: "Learn",
        title: "Start with equal parts",
        goal: "Understand what the numerator and denominator tell us.",
        teaching: [
          {
            heading: "The denominator names the size",
            body: "The bottom number tells how many equal parts make one whole. If a whole is split into 6 equal parts, each part is one sixth.",
          },
          {
            heading: "The numerator counts the parts",
            body: "The top number tells how many of those equal parts we have. In 4/6, we have four parts, and every part is one sixth.",
          },
        ],
        strategy: ["Check that the whole was divided equally.", "Read the bottom number to name the parts.", "Read the top number to count the parts."],
        example: {
          prompt: "A strip is divided into 8 equal sections. Three sections are shaded. What fraction is shaded?",
          steps: ["Eight equal sections make the denominator 8.", "Three shaded sections make the numerator 3."],
          conclusion: "The shaded part is 3/8 of the strip.",
        },
        continueLabel: "I understand the parts",
      },
      {
        id: "fraction-equivalent",
        phase: "Practice together",
        title: "Make an equivalent fraction",
        goal: "Rename a fraction without changing its value.",
        teaching: [
          {
            heading: "Change the pieces, not the amount",
            body: "Equivalent fractions cover the same amount of a whole. When every piece is split into the same number of smaller pieces, the numerator and denominator change together.",
          },
        ],
        strategy: ["Choose one multiplication factor.", "Multiply the numerator by that factor.", "Multiply the denominator by the same factor."],
        example: {
          prompt: "Rename 2/5 using tenths.",
          steps: ["Five must be multiplied by 2 to make 10.", "Multiply the numerator by 2 as well: 2 × 2 = 4."],
          conclusion: "2/5 and 4/10 are equivalent.",
        },
        question: {
          id: "guided-fraction-1",
          prompt: "Which fraction is equivalent to 3/4?",
          options: ["4/5", "5/8", "6/8", "6/10"],
          correctIndex: 2,
          hint: "Ask: What number multiplies 4 to make one of the denominators? Use that same number on 3.",
          explanation: "Multiplying both 3 and 4 by 2 gives 6/8, so the amount stays the same.",
          retry: "The numerator and denominator must be multiplied by the same number. Check both parts of your choice.",
        },
      },
      {
        id: "fraction-common-parts",
        phase: "Practice together",
        title: "Compare with common parts",
        goal: "Compare fractions after naming them with equal-size pieces.",
        teaching: [
          {
            heading: "Equal-size pieces are easy to compare",
            body: "It is hard to compare thirds and sixths by counting pieces alone because the pieces have different sizes. Rename one fraction so both use the same denominator.",
          },
        ],
        strategy: ["Look for a shared denominator.", "Rename one or both fractions.", "Compare the numerators only after the denominators match."],
        example: {
          prompt: "Compare 2/3 and 3/6.",
          steps: ["Rename 2/3 as 4/6.", "Now compare 4/6 and 3/6."],
          conclusion: "Because 4/6 is greater than 3/6, 2/3 > 3/6.",
        },
        question: {
          id: "guided-fraction-2",
          prompt: "Which comparison is true?",
          options: ["3/4 < 5/8", "3/4 = 5/8", "3/4 > 5/8", "The fractions cannot be compared"],
          correctIndex: 2,
          hint: "Rename 3/4 in eighths. Multiply its numerator and denominator by 2.",
          explanation: "Three fourths is 6/8. Since 6/8 is greater than 5/8, 3/4 > 5/8.",
          retry: "Try giving both fractions a denominator of 8 before deciding.",
        },
      },
      {
        id: "fraction-benchmarks",
        phase: "Try it",
        title: "Use one-half as a benchmark",
        goal: "Compare some fractions without making a common denominator.",
        teaching: [
          {
            heading: "A benchmark is a familiar stopping point",
            body: "One-half is a useful benchmark. In a fraction with an even denominator, half the denominator tells the numerator that would make exactly one-half.",
          },
        ],
        strategy: ["Find half of each denominator.", "Decide whether each numerator is below, at, or above that number.", "Use those positions to compare."],
        question: {
          id: "guided-fraction-3",
          prompt: "Which fraction is less than 1/2?",
          options: ["5/8", "4/6", "3/10", "6/10"],
          correctIndex: 2,
          hint: "Half of 10 is 5. Compare the numerator 3 with 5.",
          explanation: "Five tenths equals 1/2, and 3/10 is below 5/10. The other choices are greater than 1/2.",
          retry: "For each denominator, first determine which numerator would make exactly one-half.",
        },
      },
      {
        id: "fraction-story",
        phase: "Try it",
        title: "Use the whole story",
        goal: "Compare fractions only when they refer to the same-size whole.",
        teaching: [
          {
            heading: "The whole matters",
            body: "A fraction describes part of a particular whole. You can directly compare two fractions only when their wholes are the same size, or when the problem gives enough information to relate the wholes.",
          },
        ],
        question: {
          id: "guided-fraction-4",
          prompt: "Two same-size garden beds are planted. Bed A has 5/6 planted. Bed B has 7/9 planted. Which bed has the greater planted portion?",
          options: ["Bed A", "Bed B", "They are equal", "There is not enough information"],
          correctIndex: 0,
          hint: "Use eighteenths: 5/6 = 15/18 and 7/9 = 14/18.",
          explanation: "The beds are the same size, and 15/18 is greater than 14/18, so Bed A has the greater planted portion.",
          retry: "The problem says the beds are the same size. Rename both fractions using eighteenths.",
        },
      },
      {
        id: "fraction-mastery",
        phase: "Mastery check",
        title: "Show what you know",
        goal: "Choose and use an efficient fraction comparison strategy independently.",
        teaching: [
          {
            heading: "Choose your tool",
            body: "You can use equivalent fractions, a benchmark such as one-half, or a visual model. Pick the method that makes the comparison easiest to explain.",
          },
        ],
        question: {
          id: "guided-fraction-5",
          prompt: "Lena walked 5/12 mile. Omar walked 3/8 mile on the same trail. Who walked farther?",
          options: ["Lena", "Omar", "They walked the same distance", "The distances cannot be compared"],
          correctIndex: 0,
          hint: "A common denominator for 12 and 8 is 24.",
          explanation: "Lena walked 10/24 mile and Omar walked 9/24 mile. Because 10/24 > 9/24, Lena walked farther.",
          retry: "Rename both fractions with a denominator of 24, then compare the numerators.",
        },
      },
    ],
  },
  {
    id: "evidence-inference",
    subject: "ela",
    title: "Evidence Detective",
    description: "Notice exact details, make careful inferences, and prove ideas with the strongest evidence.",
    outcome: "I can make an inference and support it with exact details from a text.",
    standards: ["RL.4.1", "RI.4.1"],
    estimatedMinutes: 25,
    steps: [
      {
        id: "evidence-notice",
        phase: "Learn",
        title: "Separate evidence from inference",
        goal: "Tell the difference between what a text says and what a reader figures out.",
        teaching: [
          {
            heading: "Evidence comes from the text",
            body: "Evidence is a detail the author gives you. You should be able to point to the words or accurately paraphrase them.",
          },
          {
            heading: "An inference comes from thinking",
            body: "An inference is an idea you build by combining text evidence with something reasonable that you already know. It is more than a guess.",
          },
        ],
        strategy: ["Notice an exact detail.", "Ask what that detail suggests.", "Make a conclusion that does not go beyond the evidence."],
        example: {
          prompt: "The text says, “Nia placed the seedling near the window and checked the soil before adding water.”",
          steps: ["Evidence: Nia checks the soil before watering.", "Reasoning: Checking first helps avoid giving a plant too much water."],
          conclusion: "A supported inference is that Nia is caring and careful with the seedling.",
        },
        continueLabel: "I can spot the difference",
      },
      {
        id: "evidence-build",
        phase: "Practice together",
        title: "Build an inference",
        goal: "Connect a detail to a reasonable conclusion.",
        teaching: [
          {
            heading: "Use the evidence bridge",
            body: "Think of three parts: The text says… I know… Therefore… Each part of the bridge should connect to the next.",
          },
        ],
        strategy: ["The text says…", "This matters because…", "Therefore, I can infer…"],
        example: {
          prompt: "Before the presentation, Luis whispers each opening sentence, erases one word, and tries it again.",
          steps: ["The text says Luis repeats and revises his opening.", "People often rehearse and revise when they want to do well."],
          conclusion: "Luis is preparing carefully for the presentation.",
        },
        question: {
          id: "guided-evidence-1",
          prompt: "Mara arrives early, compares her supply list with the boxes, and labels one missing item. What is the best inference?",
          options: ["Mara dislikes the activity.", "Mara is checking that the group is prepared.", "Mara owns every box.", "Mara has done the activity many times."],
          correctIndex: 1,
          hint: "Focus on what arriving early, checking a list, and marking a missing item have in common.",
          explanation: "All three details show Mara checking readiness. The text does not prove who owns the boxes or how often she has done this.",
          retry: "Choose the conclusion supported by all three actions without adding information the text never gives.",
        },
      },
      {
        id: "evidence-strongest",
        phase: "Practice together",
        title: "Choose the strongest evidence",
        goal: "Find the detail that most directly proves an inference.",
        teaching: [
          {
            heading: "Relevant is not always strongest",
            body: "Several details may relate to a topic. The strongest evidence is the detail that most directly supports the exact inference you need to prove.",
          },
        ],
        question: {
          id: "guided-evidence-2",
          prompt: "Which detail best supports the inference that Devon does not want to disappoint his partner?",
          options: [
            "Devon carries a blue notebook.",
            "The contest takes place on Friday.",
            "Devon stays after practice to repeat the difficult handoff until both runners are satisfied.",
            "The track has six lanes.",
          ],
          correctIndex: 2,
          hint: "Look for an action that shows Devon putting in extra effort for someone else.",
          explanation: "Staying late and repeating the handoff until both partners are satisfied most directly shows Devon's concern about letting his partner down.",
          retry: "Ask which detail reveals Devon's motivation, not merely the setting or an object.",
        },
      },
      {
        id: "evidence-limit",
        phase: "Try it",
        title: "Do not stretch the evidence",
        goal: "Make a conclusion that is strong but appropriately limited.",
        teaching: [
          {
            heading: "Avoid words the evidence cannot prove",
            body: "Words such as always, never, everyone, and certainly often make an inference too broad. Match the strength of your claim to the amount of evidence provided.",
          },
        ],
        question: {
          id: "guided-evidence-3",
          prompt: "A class tested two paper-airplane designs three times. Design B flew farther in two trials. Which conclusion is best supported?",
          options: [
            "Design B will always fly farthest.",
            "Design B performed better in most of these trials.",
            "Design A can never fly well.",
            "Every class should use Design B.",
          ],
          correctIndex: 1,
          hint: "Choose the statement limited to what happened in these three trials.",
          explanation: "The evidence supports a conclusion about most of the recorded trials, but it cannot prove what will always happen.",
          retry: "Be careful with broad words such as always, never, and every. The evidence comes from only three trials.",
        },
      },
      {
        id: "evidence-combine",
        phase: "Try it",
        title: "Combine details",
        goal: "Use more than one detail to make a stronger inference.",
        teaching: [
          {
            heading: "Details can work as a team",
            body: "One detail may suggest an idea. Two connected details can make the idea clearer and more convincing.",
          },
        ],
        question: {
          id: "guided-evidence-4",
          prompt: "A library moved its return box beside the entrance. The next report showed fewer late books and shorter lines at the desk. What is the best inference?",
          options: [
            "The library bought more books.",
            "The entrance is now closed.",
            "The new return-box location likely made returns more convenient.",
            "No books will ever be late again.",
          ],
          correctIndex: 2,
          hint: "Connect the location change with both results, but avoid claiming the change solved every problem forever.",
          explanation: "The new location followed by fewer late books and shorter lines supports a careful inference that returns became more convenient.",
          retry: "Look for the choice that explains both results and uses appropriately cautious language.",
        },
      },
      {
        id: "evidence-mastery",
        phase: "Mastery check",
        title: "Prove your inference",
        goal: "Select an inference that uses all the evidence and stays within the text.",
        teaching: [
          {
            heading: "Read, connect, check",
            body: "Before choosing, check that your inference uses the important details, follows logically, and does not add a fact the text never establishes.",
          },
        ],
        question: {
          id: "guided-evidence-5",
          prompt: "After the first community cleanup, organizers added picture labels to the sorting bins and placed volunteers beside them. At the second cleanup, fewer items went into the wrong bins. Which inference is best supported?",
          options: [
            "The picture labels and volunteers likely helped people sort more accurately.",
            "Every item at the second cleanup was sorted correctly.",
            "The first cleanup had no sorting bins.",
            "Volunteers completed all the sorting themselves."
          ],
          correctIndex: 0,
          hint: "Connect the two changes with the measured improvement, without claiming more than the text reports.",
          explanation: "The added guidance and the decrease in sorting errors support a limited cause-and-effect inference. The text does not say every item was correct.",
          retry: "Choose the answer that connects the changes and outcome while avoiding an absolute claim.",
        },
      },
    ],
  },
];

export const guidedUnitsForSubject = (subject: LearnSubject) =>
  grade4GuidedUnits.filter((unit) => unit.subject === subject);
