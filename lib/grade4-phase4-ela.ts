import type { Question } from "./questions";
import { grade4Phase4Sources } from "./grade4-phase4-sources";

const BANK_VERSION = "2026-07-27.1";
const LETTERS = "ABCDEFGH";
type ElaItem = Omit<Question, "id" | "grade" | "subject" | "practiceTest" | "provenance" | "claim" | "dok"> & { dok?: number };

function options(values: string[]): { label: string; text: string }[] {
  return values.map((text, index) => ({ label: LETTERS[index], text }));
}

function relabel(label: string, shift: number, length: number): string {
  const original = LETTERS.indexOf(label);
  return original < 0 ? label : LETTERS[(original - shift + length) % length];
}

function balance(question: Question): Question {
  const rotate = (values: { label: string; text: string }[], shift: number) => {
    const amount = shift % values.length;
    return [...values.slice(amount), ...values.slice(0, amount)].map((entry, index) => ({ ...entry, label: LETTERS[index] }));
  };
  const shift = question.id % 4;
  const copy = { ...question };
  if (copy.options?.length) {
    const length = copy.options.length;
    copy.options = rotate(copy.options, shift);
    if (typeof copy.correctAnswer === "string") copy.correctAnswer = relabel(copy.correctAnswer, shift, length);
    if (Array.isArray(copy.correctAnswer) && copy.type === "multi-select") {
      copy.correctAnswer = copy.correctAnswer.map((label) => relabel(label, shift, length)).sort();
      if (copy.scoringRule?.kind === "unordered-set") {
        copy.scoringRule = {
          kind: "unordered-set",
          acceptedAnswers: copy.scoringRule.acceptedAnswers.map((label) => relabel(label, shift, length)).sort(),
        };
      }
    }
  }
  if (copy.partAOptions?.length && Array.isArray(copy.correctAnswer)) {
    const length = copy.partAOptions.length;
    copy.partAOptions = rotate(copy.partAOptions, shift);
    copy.correctAnswer = [relabel(copy.correctAnswer[0], shift, length), copy.correctAnswer[1]];
  }
  if (copy.partBOptions?.length && Array.isArray(copy.correctAnswer)) {
    const partBShift = (shift + 1) % copy.partBOptions.length;
    const length = copy.partBOptions.length;
    copy.partBOptions = rotate(copy.partBOptions, partBShift);
    copy.correctAnswer = [copy.correctAnswer[0], relabel(copy.correctAnswer[1], partBShift, length)];
  }
  return copy;
}

function balanceSingleAnswerPositions(questions: Question[]): Question[] {
  let cursor = 0;
  const rotateTo = (
    values: { label: string; text: string }[],
    answer: string,
    target: string
  ): { values: { label: string; text: string }[]; answer: string } => {
    const length = values.length;
    const shift = (LETTERS.indexOf(answer) - LETTERS.indexOf(target) + length) % length;
    return {
      values: [...values.slice(shift), ...values.slice(0, shift)].map((entry, index) => ({
        ...entry,
        label: LETTERS[index],
      })),
      answer: relabel(answer, shift, length),
    };
  };
  return questions.map((question) => {
    const copy = { ...question };
    if (copy.options?.length && typeof copy.correctAnswer === "string") {
      const moved = rotateTo(copy.options, copy.correctAnswer, LETTERS[cursor++ % 4]);
      copy.options = moved.values;
      copy.correctAnswer = moved.answer;
    }
    if (copy.partAOptions?.length && Array.isArray(copy.correctAnswer)) {
      const moved = rotateTo(copy.partAOptions, copy.correctAnswer[0], LETTERS[cursor++ % 4]);
      copy.partAOptions = moved.values;
      copy.correctAnswer = [moved.answer, copy.correctAnswer[1]];
    }
    if (copy.partBOptions?.length && Array.isArray(copy.correctAnswer)) {
      const moved = rotateTo(copy.partBOptions, copy.correctAnswer[1], LETTERS[cursor++ % 4]);
      copy.partBOptions = moved.values;
      copy.correctAnswer = [copy.correctAnswer[0], moved.answer];
    }
    return copy;
  });
}

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function buildEla(source: (typeof grade4Phase4Sources)[number]): { cat: Question[]; pt: Question[] } {
  const { testNumber, difficulty, literary, information, listening, pt: ptConfig, research, writingContexts } = source;
  const catBase = 51000 + (testNumber - 6) * 2000;
  const ptBase = catBase + 100;
  const dok = difficulty === "easy"
    ? [...Array(6).fill(1), ...Array(9).fill(2), ...Array(6).fill(2), ...Array(3).fill(2), ...Array(6).fill(3)]
    : difficulty === "medium"
      ? [...Array(3).fill(1), ...Array(8).fill(2), ...Array(4).fill(3), ...Array(6).fill(2), ...Array(3).fill(2), ...Array(6).fill(3)]
      : [...Array(11).fill(2), ...Array(4).fill(3), ...Array(6).fill(2), ...Array(2).fill(2), ...Array(7).fill(3)];
  const make = (index: number, value: ElaItem): Question => balance({
    ...value,
    id: catBase + index,
    grade: 4,
    subject: "ela",
    practiceTest: testNumber,
    claim: index <= 15 ? 1 : index <= 21 ? 2 : index <= 27 ? 3 : 4,
    dok: value.dok ?? dok[index - 1],
    provenance: {
      sourceId: `g4-t${testNumber}-ela-${index <= 7 ? "literary" : index <= 15 ? "information" : index <= 21 ? "writing" : index <= 24 ? "listening-a" : index <= 27 ? "listening-b" : "research"}`,
      origin: "original",
      author: "CAASPP Practice Project",
      license: "Original companion content; all rights reserved for this project.",
      reviewedAt: "2026-07-27",
    },
  });
  const literaryFields = { passage: source.literaryText, passageTitle: literary.title };
  const infoFields = { passage: source.informationText, passageTitle: information.title };
  const audioA = {
    passage: source.listeningTexts[0],
    passageTitle: listening[0].title,
    audio: {
      src: `/audio/presentations/grade-4/test-${testNumber}-${slug(listening[0].title)}.m4a`,
      title: `${listening[0].title} narration`,
      transcript: source.listeningTexts[0],
    },
  };
  const audioB = {
    passage: source.listeningTexts[1],
    passageTitle: listening[1].title,
    audio: {
      src: `/audio/presentations/grade-4/test-${testNumber}-${slug(listening[1].title)}.m4a`,
      title: `${listening[1].title} narration`,
      transcript: source.listeningTexts[1],
    },
  };
  const cat: Question[] = [
    make(1, { ...literaryFields, testType: "cat", target: "1", standard: "RL.4.1", type: "multiple-choice", questionText: `In “${literary.title},” why does ${literary.character} keep the marked entry instead of erasing it?`, options: options(["It preserves where the first plan stopped matching the evidence.", "It makes the notebook look empty.", `It proves ${literary.partner} refused to help.`, "It guarantees that every later total will match."]), correctAnswer: "A", rubric: "1 point: A.", points: 1, explanation: literary.preservedEvidence }),
    make(2, { ...literaryFields, testType: "cat", target: "2", standard: "RL.4.2", type: "multiple-choice", questionText: `Which theme is developed most completely in “${literary.title}”?`, options: options([literary.theme, "A neat page is more valuable than an accurate record.", "Partners should avoid explaining different ideas.", "The first plan should never be changed."]), correctAnswer: "A", rubric: "1 point: A.", points: 1, explanation: literary.theme }),
    make(3, { ...literaryFields, testType: "cat", target: "3", standard: "RL.4.4", type: "two-part", questionText: `Answer both parts about the word “${literary.word}” in “${literary.title}.”`, partAPrompt: "Part A: What does the word mean in the story?", partAOptions: options([literary.wordMeaning, "completely erased", "louder than expected", "chosen without evidence"]), partBPrompt: "Part B: Why is that meaning important?", partBOptions: options(["It explains why the partners interpreted one step differently.", "It shows the setting was closed.", "It identifies a new character.", "It proves the final totals were identical."]), correctAnswer: ["A", "A"], rubric: "1 point: Both parts.", points: 1, explanation: `The meaning of ${literary.word} helps explain the disagreement.` }),
    make(4, { ...literaryFields, testType: "cat", target: "4", standard: "RL.4.1", type: "two-part", questionText: `What can a reader infer about the first directions used in “${literary.title}”?`, partAPrompt: "Part A: Choose the best inference.", partAOptions: options(["They allowed more than one reasonable interpretation.", "They contained no steps.", "They had already been tested in every condition.", "They required the students to erase mistakes."]), partBPrompt: "Part B: Which detail best supports the inference?", partBOptions: options([literary.mistake, `${literary.character} arrived early.`, `${literary.partner} brought a pencil.`, "The room later became busy."]), correctAnswer: ["A", "A"], rubric: "1 point: Both inference and evidence.", points: 1, explanation: "The same directions led to different but reasonable interpretations." }),
    make(5, { ...literaryFields, testType: "cat", target: "5", standard: "RL.4.3", type: "multi-select", selection: { min: 2, max: 2 }, questionText: `Select the two events that most change how the partners solve the problem in “${literary.title}.”`, options: options([literary.mistake, literary.revision, `${literary.character} arrives before the room is busy.`, `${literary.partner} places a pencil beside the notebook.`]), correctAnswer: ["A", "B"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["A", "B"] }, rubric: "1 point: A and B.", points: 1, explanation: "The conflicting evidence creates the problem, and the redesign resolves it." }),
    make(6, { ...literaryFields, testType: "cat", target: "6", standard: "RL.4.5", type: "grid-match", questionText: `Match each detail from “${literary.title}” to its role in the story.`, gridRows: [literary.mistake, literary.preservedEvidence, literary.revision], gridColumns: ["Creates the conflict", "Preserves evidence", "Builds the resolution"], gridSelection: { perRowMin: 1, perRowMax: 1, totalMin: 3, totalMax: 3 }, correctAnswer: ["0:0", "1:1", "2:2"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["0:0", "1:1", "2:2"] }, rubric: "1 point: All three matches.", points: 1, explanation: "The details move the story from conflict through evidence to a revised plan." }),
    make(7, { ...literaryFields, testType: "cat", target: "7", standard: "L.4.5", type: "two-part", questionText: `Near the end of “${literary.title},” the marked entry shows “where the better plan began.”`, partAPrompt: "Part A: What does this phrase suggest?", partAOptions: options(["The mistake became useful evidence for improvement.", "The students physically moved to another room.", "The notebook created the new plan by itself.", "Only the final answer mattered."]), partBPrompt: "Part B: Which idea does the phrase reinforce?", partBOptions: options([literary.theme, "Records should contain only successes.", "Different interpretations are always dishonest.", "Testing a revision is unnecessary."]), correctAnswer: ["A", "A"], rubric: "1 point: Both parts.", points: 1, explanation: "The phrase treats the recorded problem as the starting point for improvement." }),
    make(8, { ...infoFields, testType: "cat", target: "8", standard: "RI.4.1", type: "multiple-choice", questionText: `According to “${information.title},” why are repeated measurements more useful than one observation?`, options: options(["They can show whether a pattern continues.", "They make every location identical.", "They remove all tradeoffs.", "They guarantee one cause."]), correctAnswer: "A", rubric: "1 point: A.", points: 1, explanation: "Repeated measurements distinguish a continuing pattern from one moment." }),
    make(9, { ...infoFields, testType: "cat", target: "9", standard: "RI.4.2", type: "multiple-choice", questionText: `Which statement best expresses the main idea of “${information.title}”?`, options: options([`${information.subject} works through linked stages and should be evaluated with benefits and limits in view.`, "One design works the same in every place.", "Only the final stage matters.", "Comparisons prove every detail of a system."]), correctAnswer: "A", rubric: "1 point: A.", points: 1, explanation: "The article connects stages, evidence, benefits, and limitations." }),
    make(10, { ...infoFields, testType: "cat", target: "10", standard: "RI.4.4", type: "multiple-choice", questionText: `What does “${information.term}” mean as used in “${information.title}”?`, options: options([information.termMeaning, "a tool that measures temperature", "a disagreement between two readers", "a final result with no earlier stages"]), correctAnswer: "A", rubric: "1 point: A.", points: 1, explanation: information.termMeaning }),
    make(11, { ...infoFields, testType: "cat", target: "11", standard: "RI.4.1", type: "two-part", questionText: `Why does “${information.title}” warn against using one solution everywhere?`, partAPrompt: "Part A: Choose the best conclusion.", partAOptions: options(["Local conditions can change both results and tradeoffs.", "The process has no measurable stages.", "Every location uses identical materials.", "Benefits should never be considered."]), partBPrompt: "Part B: Which detail best supports the conclusion?", partBOptions: options([information.limitation, information.benefit, `The article defines ${information.term}.`, "The title contains several words."]), correctAnswer: ["A", "A"], rubric: "1 point: Both conclusion and evidence.", points: 1, explanation: "The stated limitation shows why location-specific evidence matters." }),
    make(12, { ...infoFields, testType: "cat", target: "12", standard: "RI.4.7", type: "multi-select", selection: { min: 2, max: 2 }, questionText: `Select the two details that together explain the full process in “${information.title}.”`, options: options([information.process[0], information.process[2], information.limitation, "The title is printed before the article."]), correctAnswer: ["A", "B"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["A", "B"] }, rubric: "1 point: A and B.", points: 1, explanation: "The beginning and outcome frame the connected process." }),
    make(13, { ...infoFields, testType: "cat", target: "13", standard: "RI.4.5", type: "grid-match", questionText: `Match each part of “${information.title}” to the way it supports the explanation.`, gridRows: ["Three linked stages", `Definition of ${information.term}`, "Benefit and limitation"], gridColumns: ["Sequence", "Definition", "Balanced comparison"], gridSelection: { perRowMin: 1, perRowMax: 1, totalMin: 3, totalMax: 3 }, correctAnswer: ["0:0", "1:1", "2:2"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["0:0", "1:1", "2:2"] }, rubric: "1 point: All three matches.", points: 1, explanation: "Each feature has a different organizational purpose." }),
    make(14, { ...infoFields, testType: "cat", target: "14", standard: "L.4.5", type: "two-part", questionText: `The article compares ${information.subject} to ${information.comparison}.`, partAPrompt: "Part A: What does the comparison help explain?", partAOptions: options(["How connected stages or parts work together", "The exact size of every part", "Why measurements are unnecessary", "That the system never changes"]), partBPrompt: "Part B: What is one limit of the comparison?", partBOptions: options(["A comparison simplifies the real system.", "The comparison is a measured data table.", "The comparison proves one design is best.", "The comparison removes local conditions."]), correctAnswer: ["A", "A"], rubric: "1 point: Both parts.", points: 1, explanation: "The comparison clarifies a relationship but does not copy every detail." }),
    make(15, { ...infoFields, testType: "cat", target: "8,11", standard: "RI.4.1", type: "multi-select", selection: { min: 2, max: 2 }, questionText: `Choose one benefit and one limitation supported by “${information.title}.”`, options: options([information.benefit, information.limitation, "The approach has no cost or maintenance.", "The process is identical in every place."]), correctAnswer: ["A", "B"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["A", "B"] }, rubric: "1 point: A and B.", points: 1, explanation: "The article explicitly presents both the benefit and its limit." }),
    make(16, { testType: "cat", target: "1b", standard: "W.4.3", type: "multiple-choice", questionText: `A student revises ${writingContexts[0]}. Which added sentence best advances the action and reveals a response?`, options: options(["After the unexpected change, Niko checked the time card and quietly moved the next group to the open station.", "The schedule used paper.", "Many events have schedules.", "The room had a ceiling."]), correctAnswer: "A", rubric: "1 point: A.", points: 1, explanation: "The sentence adds a specific action and character response." }),
    make(17, { testType: "cat", target: "3b", standard: "W.4.2", type: "two-part", questionText: `Choose transitions for ${writingContexts[1]}.`, partAPrompt: "Part A: Which transition introduces a cause?", partAOptions: options(["Because the surface absorbed more water,", "At the same time,", "For example,", "In contrast,"]), partBPrompt: "Part B: Which transition introduces a result with a limitation?", partBOptions: options(["As a result, the flow slowed, although it did not stop.", "First, the title was printed.", "Meanwhile, every cause disappeared.", "In conclusion, no evidence was needed."]), correctAnswer: ["A", "A"], rubric: "1 point: Both transitions.", points: 1, explanation: "The transitions express cause, result, and qualification." }),
    make(18, { testType: "cat", target: "6b", standard: "W.4.1", type: "multiple-choice", questionText: `Which claim best fits evidence about ${writingContexts[2]}?`, options: options(["The plan should begin with a limited schedule and a repair fund before expanding.", "The topic is interesting.", "Everyone must agree immediately.", "Costs and access should not be discussed."]), correctAnswer: "A", rubric: "1 point: A.", points: 1, explanation: "The claim is specific, qualified, and connected to decision evidence." }),
    make(19, { testType: "cat", target: "8", standard: "L.4.3", type: "multiple-choice", questionText: `Which wording makes ${writingContexts[3]} most precise?`, options: options(["decreased by 2.6 centimeters at the marked center point", "changed a lot", "was different", "looked better"]), correctAnswer: "A", rubric: "1 point: A.", points: 1, explanation: "The measurement and location make the comparison precise." }),
    make(20, { testType: "cat", target: "9", standard: "L.4.1", type: "two-part", questionText: `Revise the verb agreement in ${writingContexts[4]}: “Neither the folder nor the three charts ___ in the cabinet.”`, partAPrompt: "Part A: Choose the verb.", partAOptions: options(["belong", "belongs", "belonging", "has belonged"]), partBPrompt: "Part B: Which subject controls agreement?", partBOptions: options(["the nearer plural subject, three charts", "the singular word folder", "the word cabinet", "the word neither alone"]), correctAnswer: ["A", "A"], rubric: "1 point: Both parts.", points: 1, explanation: "With neither/nor, the verb agrees with the nearer subject." }),
    make(21, { testType: "cat", target: "9", standard: "L.4.2", type: "multi-select", selection: { min: 2, max: 2 }, questionText: `Select the two edits needed in ${writingContexts[5]}: “Bring the notes, ruler and timer” Mei said, “then meet at the table.”`, options: options(["Add a comma after ruler.", "Add a comma after timer, before the closing quotation mark.", "Remove all quotation marks.", "Lowercase Mei."]), correctAnswer: ["A", "B"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["A", "B"] }, rubric: "1 point: A and B.", points: 1, explanation: "The series and dialogue tag both need commas." }),
    make(22, { ...audioA, testType: "cat", target: "4", standard: "SL.4.2", type: "multiple-choice", questionText: `What main idea does “${listening[0].title}” develop?`, options: options([`A fair investigation of ${listening[0].subject} controls conditions, measures results, and limits its conclusion.`, "One trial proves every full-size result.", "The changed variable should also be held constant.", "Unexpected results should be erased."]), correctAnswer: "A", rubric: "1 point: A.", points: 1, explanation: "The presentation connects a focused variable, controls, repeated data, and a limited conclusion." }),
    make(23, { ...audioA, testType: "cat", target: "4", standard: "SL.4.2", type: "multi-select", selection: { min: 2, max: 2 }, questionText: `Which two conditions are kept the same in “${listening[0].title}”?`, options: options([listening[0].controls[0], listening[0].controls[1], listening[0].changedVariable, listening[0].measurements[1]]), correctAnswer: ["A", "B"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["A", "B"] }, rubric: "1 point: A and B.", points: 1, explanation: "Those are the two named controls." }),
    make(24, { ...audioA, testType: "cat", target: "4", standard: "SL.4.3", type: "two-part", questionText: `Evaluate the conclusion in “${listening[0].title}.”`, partAPrompt: "Part A: Which conclusion is supported?", partAOptions: options([listening[0].conclusion, "The model proves every real system behaves the same way.", "The controls caused the changed variable.", "One unusual result makes all trials useless."]), partBPrompt: "Part B: Which detail most limits the conclusion?", partBOptions: options([listening[0].limitation, listening[0].controls[0], listening[0].measurements[0], "The team used a notebook."]), correctAnswer: ["A", "A"], rubric: "1 point: Both conclusion and limitation.", points: 1, explanation: "The conclusion fits the trials and remains limited to the model." }),
    make(25, { ...audioB, testType: "cat", target: "4", standard: "SL.4.2", type: "multiple-choice", questionText: `Which statement best summarizes “${listening[1].title}”?`, options: options([`${listening[1].subject} develops through connected stages, and repeated evidence is needed to describe the pattern.`, "The third stage always happens first.", "One photograph proves a long-term change.", "Local conditions never influence the process."]), correctAnswer: "A", rubric: "1 point: A.", points: 1, explanation: "The presentation links stages, evidence, and limits." }),
    make(26, { ...audioB, testType: "cat", target: "4", standard: "SL.4.2", type: "grid-match", questionText: `Match each detail from “${listening[1].title}” to its role.`, gridRows: listening[1].stages, gridColumns: ["First stage", "Middle stage", "Result stage"], gridSelection: { perRowMin: 1, perRowMax: 1, totalMin: 3, totalMax: 3 }, correctAnswer: ["0:0", "1:1", "2:2"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["0:0", "1:1", "2:2"] }, rubric: "1 point: All three matches.", points: 1, explanation: "The presentation explains the stages in that order." }),
    make(27, { ...audioB, testType: "cat", target: "4", standard: "SL.4.3", type: "multi-select", selection: { min: 2, max: 2 }, questionText: `Select the two details that support repeated study in “${listening[1].title}.”`, options: options([listening[1].evidence[0], listening[1].evidence[1], "One observation establishes every season.", "Every location has identical conditions."]), correctAnswer: ["A", "B"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["A", "B"] }, rubric: "1 point: A and B.", points: 1, explanation: "The two evidence sources support comparison across conditions or time." }),
    make(28, { testType: "cat", target: "2", standard: "W.4.8", type: "multi-select", selection: { min: 2, max: 2 }, questionText: `Select the two complementary sources most useful for researching ${research[0]}.`, options: options(["A labeled diagram from a public research organization", "A measurement report describing methods and results", "A page of unrelated product colors", "An unsigned statement with no evidence"]), correctAnswer: ["A", "B"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["A", "B"] }, rubric: "1 point: A and B.", points: 1, explanation: "The diagram explains parts while the report provides measured evidence." }),
    make(29, { testType: "cat", target: "3", standard: "W.4.8", type: "two-part", questionText: `An interview with one specialist describes a successful example of ${research[1]}.`, partAPrompt: "Part A: Which claim can the interview support?", partAOptions: options(["The specialist observed the stated result in that example.", "Every location will have the same result.", "The approach has no cost.", "Interviews prove causes without other evidence."]), partBPrompt: "Part B: Which caveat belongs with the evidence?", partBOptions: options(["One person's example does not establish results for every place.", "The interview must be ignored.", "Specialists cannot make observations.", "The example has no location."]), correctAnswer: ["A", "A"], rubric: "1 point: Both parts.", points: 1, explanation: "The source supports its limited example, not a universal conclusion." }),
    make(30, { testType: "cat", target: "4", standard: "W.4.9", type: "multi-select", selection: { min: 2, max: 2 }, questionText: `A writer makes a qualified claim about ${research[2]}. Select the two sentences that together support a benefit and a limitation.`, options: options(["A repeated comparison measured improvement at three tested locations.", "A fourth location changed little until the design was adjusted.", "The report used blue headings.", "The topic has appeared in several photographs."]), correctAnswer: ["A", "B"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["A", "B"] }, rubric: "1 point: A and B.", points: 1, explanation: "One sentence supports a benefit and the other shows a condition or limitation." }),
  ];

  const ptProvenance = {
    sourceId: `g4-t${testNumber}-ela-pt-${slug(ptConfig.issue)}`,
    origin: "original" as const,
    author: "CAASPP Practice Project",
    license: "Original companion content; all rights reserved for this project.",
    reviewedAt: "2026-07-27",
  };
  const ptShared = { passage: source.ptText, passageTitle: ptConfig.title, dataTable: ptConfig.table };
  const pt: Question[] = [
    {
      ...ptShared, id: ptBase + 1, grade: 4, subject: "ela", practiceTest: testNumber, testType: "pt", claim: 4, target: "4", dok: 3, standard: "W.4.9", type: "short-answer",
      questionText: `Compare how Sources 1 and 3 provide different evidence about ${ptConfig.issue}. Include one accurate detail from each and one limitation of the pilot.`,
      correctAnswer: `Source 1 explains the planning idea and how it should be evaluated. Source 3 reports local pilot measurements, including ${ptConfig.pilot.resultA} The pilot is limited because ${ptConfig.pilot.limitation}`,
      scoringRule: { kind: "manual-rubric" }, rubric: "2 points: Accurate comparison, one relevant detail from each source, and a valid pilot limitation. 1 point: Partly accurate or incomplete. 0 points: Incorrect, irrelevant, insufficient, or blank.", points: 2,
      explanation: "Source 1 provides explanatory planning evidence; Source 3 provides limited local pilot evidence.", provenance: ptProvenance,
    },
    {
      ...ptShared, id: ptBase + 2, grade: 4, subject: "ela", practiceTest: testNumber, testType: "pt", claim: 4, target: "2,3", dok: 3, standard: "W.4.8", type: "grid-match",
      questionText: `Match each qualified statement about ${ptConfig.issue} to its supporting source or sources. Select exactly 1 source in Row 1, exactly 2 in Row 2, and exactly 1 in Row 3.`,
      gridRows: [`Row 1: ${ptConfig.explanationFocus}`, `Row 2: ${ptConfig.requirements[0]} Pilot evidence must also be checked.`, `Row 3: ${ptConfig.pilot.resultA}`],
      gridColumns: ["Source 1", "Source 2", "Source 3"], gridSelection: { perRowMin: 1, perRowMax: 2, rowSelections: [{ min: 1, max: 1 }, { min: 2, max: 2 }, { min: 1, max: 1 }], totalMin: 4, totalMax: 4 },
      correctAnswer: ["0:0", "1:1", "1:2", "2:2"], scoringRule: { kind: "unordered-set", acceptedAnswers: ["0:0", "1:1", "1:2", "2:2"] }, rubric: "1 point: All four source matches.", points: 1,
      explanation: "Source 1 explains the idea, Source 2 states requirements, and Source 3 reports pilot evidence.", provenance: ptProvenance,
    },
    {
      ...ptShared, id: ptBase + 3, grade: 4, subject: "ela", practiceTest: testNumber, testType: "pt", claim: 2, target: "7", dok: 4, standard: "W.4.1", type: "extended-writing",
      studentDirections: `Write an opinion for the planning group. You may support, oppose, or recommend a conditional/phased approach to ${ptConfig.issue}. Use accurate evidence from more than one source, address competing evidence or a limitation, and preserve every stated access and safety requirement.`,
      questionText: `What should the planning group decide about ${ptConfig.issue}, and how should the decision be carried out? Write a well-organized source-based opinion.`,
      correctAnswer: "Responses vary and are scored with the 4-4-2 opinion-writing rubric.", scoringRule: { kind: "manual-rubric" },
      rubric: "10 points: Organization/Purpose 0–4, Evidence/Elaboration 0–4, Conventions 0–2. NS applies to blank, copied, off-topic, or non-English responses that cannot be scored.", points: 10,
      explanation: "A strong response states a defensible position, integrates multiple sources, addresses competing evidence, and preserves required conditions.", provenance: ptProvenance,
    },
  ];
  return { cat: balanceSingleAnswerPositions(cat), pt };
}

export const grade4Phase4ElaBanks = new Map(grade4Phase4Sources.map((source) => [source.testNumber, buildEla(source)]));
export const grade4Phase4ElaBankVersion = BANK_VERSION;
