import { extraReading } from './star-reading-extra';
import { extraMath } from './star-math-extra';
export type StarSubject = 'reading' | 'math';
export type StarItem = { id: string; skill: string; domain: string; prompt: string; passage?: string; title?: string; options: string[]; answer: number; explanation: string; tip: string };
export type StarForm = { id: string; subject: StarSubject; title: string; difficulty: 'easy' | 'medium' | 'hard'; items: StarItem[] };
const item = (id: string, domain: string, skill: string, prompt: string, options: string[], answer: number, explanation: string, tip: string, passage?: string, title?: string): StarItem => ({ id, domain, skill, prompt, options, answer, explanation, tip, passage, title });
const numberItem = (id: string, domain: string, skill: string, prompt: string, values: number[], correct: number, explanation: string, tip: string): StarItem => {
  // Move the correct answer through the choices without changing which value is keyed.
  const shift = Number(id.split('-').at(-1)) % values.length;
  const options = [...values.slice(shift), ...values.slice(0, shift)].map(String);
  return { id, domain, skill, prompt, options, answer: options.indexOf(String(correct)), explanation, tip };
};
const mathForms: StarForm[] = [0, 1, 2].map(seed => {
  const id = `math-${seed + 1}`, n = seed + 1;
  const make = (index: number, domain: string, skill: string, prompt: string, values: number[], correct: number, explanation: string, tip: string) => numberItem(`${id}-${index}`, domain, skill, prompt, values, correct, explanation, tip);
  const round = [34672, 58426, 72581][seed], rounded = Math.round(round / 1000) * 1000;
  const boxes = 7 + n, perBox = 24, removed = 13 + n, remaining = boxes * perBox - removed;
  const a = 23 + 2 * n, b = 14 + n, product = a * b;
  const riders = 121 + seed * 12, seats = 30, buses = Math.ceil(riders / seats);
  const numerator = 2 + n, denominator = 8 + 2 * seed, equivalent = `${numerator * 2}/${denominator * 2}`;
  const meters = 3 + n, length = 7 + n, width = 4 + seed, angle = 28 + n * 7;
  return { id, subject: 'math', title: `Test ${n}`, difficulty: (['easy', 'medium', 'hard'] as const)[seed], items: [
    make(1, 'Number & operations', 'Rounding', `Round ${round.toLocaleString('en-US')} to the nearest thousand.`, [rounded, rounded - 1000, rounded + 1000, round], rounded, `Look at the hundreds digit. ${round.toLocaleString('en-US')} rounds to ${rounded.toLocaleString('en-US')}.`, 'Locate the two neighboring multiples of 1,000 and find which is closer.'),
    make(2, 'Number & operations', 'Multi-step operations', `A library receives ${boxes} boxes with ${perBox} books each. It lends ${removed} of those books. How many received books remain?`, [remaining, boxes * perBox, remaining + 10, remaining - 10], remaining, `${boxes} × ${perBox} = ${boxes * perBox}. Then subtract ${removed} to get ${remaining}.`, 'Find the total before subtracting what was lent.'),
    make(3, 'Number & operations', 'Multiplication', `What is ${a} × ${b}?`, [product, product + 10, product - 10, a + b], product, `Break ${b} into 10 + ${b - 10}: ${a * 10} + ${a * (b - 10)} = ${product}.`, 'Use place value or partial products.'),
    make(4, 'Number & operations', 'Interpreting remainders', `${riders} students need seats on buses. Each bus holds ${seats} students. What is the fewest buses needed for everyone?`, [buses, buses - 1, buses + 1, 30], buses, `${buses - 1} buses hold ${(buses - 1) * seats} students, which is too few. One more bus gives enough seats.`, 'A remainder can mean another vehicle is needed.'),
    item(`${id}-5`, 'Fractions & decimals', 'Equivalent fractions', `Which fraction is equivalent to ${numerator}/${denominator}?`, [`${numerator + 2}/${denominator + 2}`, equivalent, `${numerator * 2}/${denominator}`, `${numerator}/${denominator * 2}`], 1, `Multiply both numerator and denominator by 2: ${numerator}/${denominator} = ${equivalent}.`, 'Keep the size of the whole the same; multiply the top and bottom by the same number.'),
    item(`${id}-6`, 'Fractions & decimals', 'Adding fractions', `What is ${n}/8 + ${n + 1}/8?`, [`${2 * n + 1}/16`, `${n + 1}/8`, `${2 * n + 1}/8`, `${2 * n + 2}/8`], 2, `The pieces are all eighths. Add the numerators: ${n} + ${n + 1} = ${2 * n + 1}. The denominator stays 8.`, 'Count equal-size parts, keeping their denominator.'),
    item(`${id}-7`, 'Fractions & decimals', 'Mixed-number subtraction', `What is ${n + 3} 1/4 − ${n} 3/4?`, ['3 1/2', '2 3/4', '2 1/4', '2 1/2'], 3, `Regroup ${n + 3} 1/4 as ${n + 2} 5/4. Subtract ${n} 3/4 to get 2 2/4, or 2 1/2.`, 'Trade one whole for four fourths before subtracting.'),
    item(`${id}-8`, 'Fractions & decimals', 'Comparing decimals', 'Which statement is true?', ['0.6 = 0.06', '0.6 > 0.57', '0.57 > 0.6', '0.50 < 0.05'], 1, 'Write 0.6 as 0.60. Sixty hundredths is greater than fifty-seven hundredths.', 'Write both decimals to the hundredths place.'),
    make(9, 'Measurement & geometry', 'Metric conversion', `A rope is ${meters} meters long. How many centimeters long is it?`, [meters * 100, meters * 10, meters + 100, meters * 1000], meters * 100, `Each meter is 100 centimeters, so ${meters} × 100 = ${meters * 100}.`, 'Use 1 meter = 100 centimeters.'),
    item(`${id}-10`, 'Measurement & geometry', 'Area and perimeter', `A rectangle is ${length} cm long and ${width} cm wide. Which gives its area and perimeter?`, [`Area ${length * width} cm²; perimeter ${2 * (length + width)} cm`, `Area ${length + width} cm²; perimeter ${length * width} cm`, `Area ${2 * (length + width)} cm²; perimeter ${length * width} cm`, `Area ${length * width} cm²; perimeter ${length + width} cm`], 0, `Area = ${length} × ${width} = ${length * width} cm². Perimeter = 2 × (${length} + ${width}) = ${2 * (length + width)} cm.`, 'Area covers the inside; perimeter follows the boundary.'),
    make(11, 'Measurement & geometry', 'Angle addition', `A right angle is split into two angles. One measures ${angle}°. What is the other angle’s measure in degrees?`, [90 - angle, 90 + angle, 180 - angle, angle], 90 - angle, `A right angle is 90°. Subtract ${angle}° to get ${90 - angle}°.`, 'The parts must add to the whole angle.'),
    make(12, 'Measurement & geometry', 'Reading data', `Ribbon lengths: 1/4 yard occurs ${n + 1} times, 1/2 yard occurs ${n + 3} times, and 3/4 yard occurs ${n} times. How many ribbons are at least 1/2 yard long?`, [2 * n + 3, 3 * n + 4, n + 3, n], 2 * n + 3, `Count the ${n + 3} half-yard ribbons and ${n} three-quarter-yard ribbons: ${2 * n + 3} in all.`, '“At least” includes the boundary value.')
  ] };
});

const stories = [
  { title: 'The Cart with the Wobbly Wheel', passage: 'Nia wanted the class supply cart ready before the art fair. She pushed it across the room, but one wheel rattled. “It still rolls,” she said, reaching for the paint boxes. Her partner Mateo placed a hand on the handle. “Try it with the books first.”\n\nThe heavier load made the cart tilt. Nia unloaded it and examined the wheel. A small bolt was loose. With their teacher’s help, they tightened it and tested the cart again. This time it rolled smoothly. Nia added “test with a full load” to their preparation list. She had fewer boxes packed than planned, but she felt more ready for the fair.', questions: [
    ['Why does Mateo suggest testing the cart with books?', ['He wants to cancel the art fair.', 'He wants to see how the cart works under a heavier load.', 'He wants Nia to read a book.', 'He thinks paint boxes are too colorful.'], 1, 'The heavier load reveals a problem that the empty cart did not show clearly.', 'Inference'],
    ['Which detail best shows that Nia changed her approach?', ['She reaches for paint boxes.', 'The wheel rattles.', 'She adds a full-load test to the list.', 'Mateo touches the handle.'], 2, 'Adding a test to the list shows that she now values checking the cart before packing it.', 'Text evidence'],
    ['What is a theme of the story?', ['Preparation includes checking how something works.', 'All carts are dangerous.', 'Finishing first is always most important.', 'Friends should never disagree.'], 0, 'Nia learns that solving the wheel problem matters more than quickly filling the cart.', 'Theme'],
    ['Why does Nia feel more ready even with fewer boxes packed?', ['She has decided not to help.', 'The fair is over.', 'She no longer needs supplies.', 'She knows the cart can carry the supplies safely.'], 3, 'She has tested the repaired cart with a heavier load, making the plan more reliable.', 'Character motivation']
  ] },
  { title: 'A Different Kind of Map', passage: 'Omar drew a map for his grandmother’s visit to the school garden. He marked every flower bed with a bright color and drew the shortest path from the gate. His friend Ada asked where the benches were. “They are not part of the route,” Omar replied.\n\nAda reminded him that his grandmother liked to rest during long walks. Omar walked the path again. The shortest way crossed a steep patch, while a longer paved path passed two benches. He redrew his map, adding both paths, their surfaces, and resting places. “Now she can choose,” he said. The map had more lines, but it offered a clearer welcome.', questions: [
    ['What causes Omar to revise the map?', ['He loses his colored pencils.', 'Ada points out a visitor’s need for resting places.', 'The garden closes.', 'All the paths disappear.'], 1, 'Ada’s reminder leads Omar to walk the route again and add useful details.', 'Cause and effect'],
    ['Which sentence best supports the idea that Omar wants visitors to make their own choices?', ['“They are not part of the route.”', 'He marked every bed with a color.', '“Now she can choose,” he said.', 'Omar drew a map.'], 2, 'The sentence directly connects the revised map to giving his grandmother a choice.', 'Text evidence'],
    ['What does “a clearer welcome” suggest?', ['The map now better supports his grandmother’s visit.', 'The paper is transparent.', 'The garden has fewer flowers.', 'The school changed its name.'], 0, 'The new details help a visitor choose a comfortable route; the phrase is not about literal transparency.', 'Author’s language'],
    ['Which summary is best?', ['Omar colors flowers, then goes home.', 'Ada draws a map for herself.', 'Omar removes every long path.', 'After considering his grandmother’s needs, Omar adds route and rest information to his map.'], 3, 'This captures the original plan, the reason for change, and the important result.', 'Summary']
  ] },
  { title: 'The Last Note', passage: 'At rehearsal, June played the final note before the rest of the group had finished. She had practiced the difficult section all week and wanted everyone to hear it. The conductor did not ask her to play faster. Instead, he asked the group to hum the melody while June listened.\n\nJune tapped the beat softly. She heard the flute pause, the drum answer, and the strings hold their sound. When she played again, she waited for the drum’s answer. Her final note joined the strings instead of covering them. The conductor smiled. June wrote a new reminder above the music: “Listen before entering.”', questions: [
    ['What does June learn?', ['Playing alone is always better.', 'Listening helps her fit her part into the group’s music.', 'Fast notes are always correct.', 'Practice is unnecessary.'], 1, 'Waiting for the drum’s answer lets June’s note join the other musicians.', 'Theme'],
    ['Which event happens just before June’s second attempt?', ['The audience applauds.', 'She throws away her music.', 'She listens while the group hums the melody.', 'The rehearsal ends.'], 2, 'The conductor asks her to listen to the group before she plays the section again.', 'Sequence'],
    ['Why does the author describe the flute, drum, and strings?', ['To show what June notices when she listens.', 'To list instruments for sale.', 'To prove the drum is broken.', 'To explain the concert ticket price.'], 0, 'The details make June’s new attention to the whole group visible to the reader.', 'Author’s craft'],
    ['What is the best evidence that June plans to use what she learned?', ['She practiced all week.', 'The conductor smiles.', 'The strings hold a sound.', 'She writes “Listen before entering” above her music.'], 3, 'The reminder records the strategy she wants to use in future rehearsals.', 'Text evidence']
  ] }
] as const;
const information = [
  { title: 'A Roof That Holds Rain', passage: 'Some buildings have planted roofs. Under the plants are layers that protect the building and hold growing material. During rain, the plants and growing material can retain some water. The rest must drain through a designed outlet.\n\nA school tested two model roofs during the same artificial rain. Water reached the drain sooner on the plain model than on the planted model. This showed that the planted model delayed runoff during that test. It did not show that a planted roof could hold every storm’s water. Real roofs must also be checked for weight, drainage, maintenance, and local growing conditions.', questions: [
    ['What is the main idea?', ['Every roof should hold all rain forever.', 'Planted roofs can slow some runoff but need careful design and evaluation.', 'Model roofs are identical to real buildings.', 'Plants remove the need for drains.'], 1, 'Both paragraphs describe a potential benefit together with design needs and limits.', 'Main idea'],
    ['Why were both models tested during the same artificial rain?', ['To make the comparison fairer.', 'To make one model look larger.', 'To avoid measuring anything.', 'To prove all storms are alike.'], 0, 'Keeping the rain conditions alike helps connect a difference in runoff to the roofs.', 'Reasoning from evidence'],
    ['Which conclusion goes beyond the evidence?', ['The planted model delayed runoff in this test.', 'Water reached the plain model’s drain sooner.', 'A planted roof will prevent every flood.', 'Real roofs need drainage.'], 2, 'One model test cannot establish that every storm or building will have that result.', 'Evaluating claims'],
    ['What does retain most nearly mean in this passage?', ['Color.', 'Measure.', 'Forget.', 'Keep or hold.'], 3, 'The next sentences describe water being held before the rest drains away.', 'Vocabulary in context']
  ] },
  { title: 'Why Libraries Count More Than Visits', passage: 'A library counted visits for one month and found that the total had stayed about the same. Yet the staff noticed that people used the building differently. More visitors came to group workshops, while fewer used individual computer stations.\n\nThe staff compared workshop reservations, computer use, and visitor comments. Comments described a need for quieter reading areas during busy workshops. The library tried moving workshops to a room with a door and measured noise near the reading area before and after the change. Noise was lower during the trial. Staff planned to repeat the measurements in other weeks before making the arrangement permanent.', questions: [
    ['Why was the visit total alone insufficient?', ['It showed the color of every room.', 'It hid changes in how visitors used different services.', 'It proved there were no visitors.', 'It counted only librarians.'], 1, 'The same total can include different patterns of workshop and computer use.', 'Main idea'],
    ['What problem did the comments identify?', ['Workshop noise could disturb quiet reading.', 'All computers were missing.', 'The library had no doors.', 'No one wanted workshops.'], 0, 'Visitors asked for quieter reading areas during busy workshops.', 'Key details'],
    ['What structure best describes the second paragraph?', ['A list of unrelated facts.', 'A fictional adventure.', 'A problem, a trial response, and a plan to check results.', 'A recipe with ingredients.'], 2, 'Staff identify noise, try a different room, and plan repeated measurements.', 'Text structure'],
    ['Why repeat the noise measurements?', ['To erase the first result.', 'To avoid making a decision forever.', 'To make all visitors agree.', 'To see whether the lower noise continues under other conditions.'], 3, 'Results from other weeks can show whether the trial’s improvement is consistent.', 'Evaluating evidence']
  ] },
  { title: 'Following a Stream’s Changes', passage: 'A stream can change after rain. Water may flow faster and carry more soil particles. To study the changes, a class observed the same marked spot before rain and again the next day. Students recorded water speed, cloudiness, and the weather. They did not enter the water.\n\nThe water looked cloudier after rain. A student suggested that rain had washed soil into the stream. The observation supported that idea, but the class had not tested every possible source of the particles. They planned more observations and a comparison with an upstream site. Their report separated what they observed from the explanation they were still investigating.', questions: [
    ['What is the passage mainly about?', ['Why all streams are always muddy.', 'How students use observations and cautious explanations to study a stream.', 'How to swim in fast water.', 'Why measuring weather is impossible.'], 1, 'The class records evidence, considers an explanation, and plans ways to check it.', 'Main idea'],
    ['Which statement is an observation rather than a proposed explanation?', ['The water looked cloudier after rain.', 'Rain definitely caused every particle.', 'All particles came from one field.', 'The stream will never clear.'], 0, 'The students directly saw cloudier water. The source of the particles still needs investigation.', 'Evidence and inference'],
    ['Why observe the same marked spot twice?', ['To hide differences.', 'To count every fish.', 'To make the before-and-after comparison more meaningful.', 'To stop the rain.'], 2, 'Using the same location reduces one source of difference between observations.', 'Reasoning from evidence'],
    ['What does the last sentence reveal about the report?', ['It treats every guess as a fact.', 'It leaves out all measurements.', 'It refuses to suggest explanations.', 'It distinguishes observations from an explanation that needs more testing.'], 3, 'The class clearly labels which statements are direct evidence and which are still being checked.', 'Author’s purpose']
  ] }
] as const;
const vocab = [
  [
    ['The careful builder inspected each joint before adding the next board. What does inspected mean?', ['Painted quickly.', 'Examined closely.', 'Threw away.', 'Forgot about.'], 1, 'Checking each joint before continuing means examining it closely.'],
    ['The trail was narrow, so the hikers walked one behind another. Which clue helps explain narrow?', ['The hikers had shoes.', 'The trail was outside.', 'They walked one behind another.', 'It was morning.'], 2, 'Walking in a single line suggests there was little space from side to side.'],
    ['Which word means the opposite of temporary?', ['Brief.', 'Short-lived.', 'Changing.', 'Permanent.'], 3, 'Temporary means lasting for a limited time; permanent means intended to last.'],
    ['Which word best completes the sentence? The scientists compared the results to find a repeated ___.', ['pattern', 'pillow', 'whisper', 'ticket'], 0, 'A repeated arrangement or result is a pattern.']
  ],
  [
    ['The two teams cooperated to finish the mural. What does cooperated mean?', ['Argued silently.', 'Worked together.', 'Started over alone.', 'Left the room.'], 1, 'The teams combined their effort to finish the mural.'],
    ['The jar was transparent; we could see the pebbles inside. Which phrase explains transparent?', ['The jar was heavy.', 'The pebbles were round.', 'We could see the pebbles inside.', 'There were many pebbles.'], 2, 'Being able to see through the jar explains the word.'],
    ['Which word means the opposite of scarce?', ['Limited.', 'Rare.', 'Insufficient.', 'Abundant.'], 3, 'Scarce means in short supply; abundant means plentiful.'],
    ['Which word best completes the sentence? The author used a clear ___ to help readers understand the new idea.', ['example', 'suitcase', 'blanket', 'whistle'], 0, 'An example gives a specific case that helps explain an idea.']
  ],
  [
    ['A reliable tool gives consistent results when used correctly. What does reliable mean?', ['Colorful.', 'Dependable.', 'Expensive.', 'Unusual.'], 1, 'Consistent results support describing something as dependable.'],
    ['The path was slippery, so Ava shortened her steps and held the rail. Which clue helps explain slippery?', ['Ava was outside.', 'The path was long.', 'She shortened her steps and held the rail.', 'The rail was painted.'], 2, 'Those actions help prevent a fall on a surface with little grip.'],
    ['Which word means the opposite of expand?', ['Grow.', 'Spread.', 'Increase.', 'Shrink.'], 3, 'Expand means become larger; shrink means become smaller.'],
    ['Which word best completes the sentence? Before accepting the claim, the class asked for ___.', ['evidence', 'confetti', 'dessert', 'a costume'], 0, 'Evidence is information that can support or challenge a claim.']
  ]
] as const;
const readingForms: StarForm[] = [0, 1, 2].map(seed => {
  const id = `reading-${seed + 1}`, story = stories[seed], info = information[seed];
  return { id, subject: 'reading', title: `Test ${seed + 1}`, difficulty: (['easy', 'medium', 'hard'] as const)[seed], items: [
    ...vocab[seed].map(([prompt, options, answer, explanation], i) => item(`${id}-${i + 1}`, 'Word meaning', 'Vocabulary', prompt, [...options], answer, explanation, 'Use the surrounding sentence or the word’s meaning to check every option.')),
    ...story.questions.map(([prompt, options, answer, explanation, skill], i) => item(`${id}-${i + 5}`, 'Literary reading', skill, prompt, [...options], answer, explanation, 'Find a detail in the story that supports your answer.', story.passage, story.title)),
    ...info.questions.map(([prompt, options, answer, explanation, skill], i) => item(`${id}-${i + 9}`, 'Informational reading', skill, prompt, [...options], answer, explanation, 'Use what the passage actually says; watch for claims stronger than its evidence.', info.passage, info.title))
  ] };
});
export const starForms: StarForm[] = [...readingForms.map((form, seed) => ({ ...form, items: [...form.items.slice(0, 4), ...extraReading(seed).slice(0, 6), ...form.items.slice(4), ...extraReading(seed).slice(6)] })), ...mathForms.map((form, seed) => ({ ...form, items: [...form.items, ...extraMath(seed)] }))];
export type StarSession = { formId: string; mode: 'learn' | 'check'; answers: number[]; draft: number | null };
export function isStarSession(value: unknown): value is StarSession {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as StarSession, form = starForms.find(form => form.id === candidate.formId);
  return !!form && ['learn', 'check'].includes(candidate.mode) && Array.isArray(candidate.answers) && candidate.answers.length <= form.items.length
    && candidate.answers.every((answer, index) => Number.isInteger(answer) && answer >= 0 && answer < form.items[index].options.length)
    && (candidate.draft === null || Number.isInteger(candidate.draft) && candidate.draft >= 0 && candidate.draft < 4);
}
export function summarizeStar(session: StarSession) {
  const form = starForms.find(form => form.id === session.formId)!;
  const domains: Record<string, { correct: number; answered: number; total: number }> = {};
  let correct = 0;
  form.items.forEach((question, index) => {
    const domain = domains[question.domain] ??= { correct: 0, answered: 0, total: 0 };
    domain.total++;
    if (index < session.answers.length) { domain.answered++; if (session.answers[index] === question.answer) { correct++; domain.correct++; } }
  });
  return { correct, answered: session.answers.length, total: form.items.length, domains };
}
