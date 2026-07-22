import type { Question } from "./questions";

const BANK_VERSION = "2026-07-22.1";
type Item = Omit<Question, "grade" | "subject" | "practiceTest" | "provenance">;

function sourceId(value: Item): string {
  if (value.testType === "pt") return "g4-t2-ela-pt-outdoor-learning";
  if (value.id <= 43007) return "g4-t2-ela-literary-last-practice-lap";
  if (value.id <= 43015) return "g4-t2-ela-informational-letter-journey";
  if (value.id <= 43021) return `g4-t2-ela-writing-${value.id}`;
  if (value.id <= 43024) return "g4-t2-ela-listening-paper";
  if (value.id <= 43027) return "g4-t2-ela-listening-moon";
  return `g4-t2-ela-research-${value.id}`;
}

function item(value: Item): Question {
  const dataTable = value.dataTable ?? (
    value.id >= 43008 && value.id <= 43015
      ? letterStageTable
      : value.testType === "pt"
        ? maplePointTable
        : undefined
  );
  return {
    ...value,
    ...(dataTable ? { dataTable } : {}),
    grade: 4,
    subject: "ela",
    practiceTest: 2,
    provenance: {
      sourceId: sourceId(value),
      origin: "original",
      author: "CAASPP Practice Project",
      license: "Original companion content; all rights reserved for this project.",
      reviewedAt: "2026-07-22",
    },
  };
}

const options = (texts: string[]) => texts.map((text, index) => ({ label: "ABCDEF"[index], text }));

const letterStageTable = {
  rowHeader: "Stage",
  columns: ["Main purpose"],
  rows: [
    { label: "Collection", values: ["Gather outgoing mail"] },
    { label: "First sorting center", values: ["Send mail toward the correct region"] },
    { label: "Transportation", values: ["Carry grouped mail between regions"] },
    { label: "Local sorting center", values: ["Put mail in delivery-route order"] },
    { label: "Delivery", values: ["Bring each piece to its addressed location"] },
  ],
};

const maplePointTable = {
  rowHeader: "Measure",
  columns: ["First 3 months", "Most recent 3 months"],
  rows: [
    { label: "Scheduled learning sessions", values: ["18", "31"] },
    { label: "Sessions moved indoors for weather", values: ["5", "7"] },
    { label: "Programs using the space", values: ["2", "6"] },
    { label: "Weekly maintenance hours", values: ["4", "7"] },
  ],
};

const lastPracticeLap = `**The Last Practice Lap**

Nia had been excited when Coach Rivera placed her on the recreation center's relay team. She liked the steady rhythm of running, and she could finish a lap faster than anyone else in her practice group. But on Thursday afternoon, the team practiced passing the baton. Speed suddenly seemed like the easy part.

“The runner with the baton calls *now*,” Coach Rivera reminded them. “The next runner keeps moving, reaches one hand back, and does not turn around.”

Nia waited in the exchange zone while her teammate Owen rounded the curve. His shoes struck the track in quick, even beats. When he called, “Now!” Nia started forward and reached back. The smooth metal baton tapped her palm, bounced against her fingers, and rolled onto the red track.

The other runners stopped. Nia snatched up the baton, but the exchange was already ruined.

“Reset and try again,” Coach Rivera said calmly.

They tried. This time Nia turned her head to look for the baton. Her feet crossed awkwardly, and she stepped outside the exchange zone before Owen could reach her.

On the third try, Nia began too early. Owen stretched as far as he could, but a wide space remained between them. The baton felt like a hot coal when it finally reached her hand. She wanted to get rid of it before everyone could see another mistake.

Nia finished the lap, then walked past the starting line instead of returning to the group. At the edge of the field, she bent to retie a shoe that was not loose. Her cheeks burned. The team's first practice meet was two days away. If she dropped the baton there, three other runners would lose time because of her.

“Are you planning to wear out that shoelace?” Owen asked.

Nia looked up. He had followed her from the track. “Maybe I should let someone else run,” she said. “I keep making the handoff worse.”

Owen sat on the low curb beside her. “At my first relay last year, I threw the baton.”

Nia blinked. “You threw it?”

“Not on purpose. I reached too hard, hit Mara's wrist, and the baton flew into the grass.” He pointed beyond the track. “Coach made us practice the exchange at walking speed. It felt silly, but it helped me learn where my hand should be.”

Nia watched the rest of the team begin another lap. Coach Rivera did not look angry. She was moving two cones closer together and explaining something with her hands.

Across the track, the runners repeated their starts without rushing. Each pair stopped, compared what happened, and returned to its mark.

The cones marked the exchange zone, the part of the track where the baton had to change hands. During an earlier lesson, Nia had thought the painted lines were simply boundaries to memorize. Now she noticed how each runner used a small mark beside the track as a signal to begin moving. A runner who started too soon would leave a gap. A runner who waited too long would force the teammate behind to slow down. The mark was not the same for every pair because runners reached full speed at different rates. Coach Rivera had moved Nia's mark after watching her first attempts, giving Owen enough room to reach her without stretching.

“I can run fast,” Nia said. “Why can't I do one simple pass?”

“Because it isn't one simple thing,” Owen replied. “We have to match our speed, listen for the call, and put the baton in the same place. Let's practice only that part.”

Nia hesitated. Walking back meant that everyone would know she had almost quit. Then Coach Rivera waved them over, not impatiently, but as if she had been expecting them.

Owen and Nia stood ten steps apart. First they walked. Owen said “now,” and Nia reached back without turning. He placed the baton firmly across her palm. They repeated the motion until Nia could feel the center of the baton before closing her fingers.

Next they tried at a slow jog. On the first pass, Nia's hand was too high. On the second, Owen called a moment too late. They adjusted the starting mark and tried again. This time the baton slid into Nia's open hand without a tap or wobble.

“That was it,” Coach Rivera said. “Build the speed after the pattern is steady.”

The sun was dropping behind the recreation center when Coach called for one last full lap. Nia waited at the new mark. She heard Owen's steps, then his clear call. She began running. Her hand opened behind her, and the baton settled into it as neatly as a key fitting a lock.

Nia ran through the exchange zone before looking down. The baton was still there.

At the finish, her teammates cheered, but Nia turned first to Owen. “No flying baton,” she said.

“And no worn-out shoelace,” he answered.

Nia smiled. The practice meet could still include mistakes. Now she knew a mistake did not decide the next attempt. What mattered was slowing down long enough to learn from it—and then taking the next lap.`;

const letterJourney = `**How a Letter Finds Its Way**

A letter can travel across a town or across a country, yet it usually begins in the same simple way: someone writes a complete address, adds postage, and places the envelope in a mailbox. After that, people, machines, and vehicles work through a careful sequence to move the letter toward the correct door.

![A five-stage diagram showing collection, first sorting, travel, local sorting, and delivery.](/images/grade-4/test-2/ela/mail-process.svg)

**1. Reading the Address**

An address gives directions in layers. A person's name identifies the receiver. A street number and street name identify a building. An apartment number may identify one home inside that building. The city, state, and postal code identify a larger area. A return address tells postal workers where to send the letter if it cannot be delivered.

Clear writing matters. A smudged street number can send a letter to the wrong route. A missing apartment number can bring the letter to the correct building but not to the correct home. Postal codes are especially useful because they divide large regions into smaller delivery areas.

**2. Collection and the First Sorting Center**

A mail carrier or collection driver empties public mailboxes and gathers outgoing letters from neighborhood post offices. The letters travel to a sorting center. There, a machine photographs the front of each envelope. Computer software looks for the address and changes important information into a pattern of short printed bars.

Those routing marks are not a secret message. They are a machine-readable version of part of the address. A scanner can read the marks quickly as letters move along a conveyor. Gates beside the conveyor open and close, guiding letters into bins for different destinations. The moving letters are like boats on a branching river: each gate sends a group into the channel that leads closer to its destination.

Postage receives attention at the center too. A printed stamp or postage label shows that the sender paid for the kind of mail service being used. Processing equipment places a cancellation mark across many stamps so they cannot be used again. The mark also records information about where or when the letter entered the mail stream. An envelope with too little postage may need special handling instead of continuing with the regular group.

Machines do not understand every envelope. Fancy handwriting, a torn label, or an address placed in an unusual spot may be difficult to read. When that happens, a postal worker reviews the image or envelope and enters the needed information. Human attention helps the sorting system recover from unclear clues.

**3. Traveling Between Places**

After the first sort, nearby letters may remain in the same region. Letters going farther are loaded into containers and carried by truck or airplane. Distance, available routes, and delivery schedules help determine the kind of transportation used.

The containers protect loose envelopes and keep destination groups together while workers move them between belts, loading areas, and vehicles. Labels on the containers identify the next facility. Workers scan those labels as a check, much as a traveler might check a station sign before boarding. The envelopes inside are not read one by one during every transfer, but the labeled container keeps the whole group moving along the planned route.

During this stage, letters headed toward the same region travel together. They do not yet need to be in the exact order of houses on one street. The goal is to bring each group to the correct local sorting center.

**4. Sorting for a Local Route**

At the local center, letters are sorted again. This time, the job becomes more detailed. A machine or worker groups the mail by delivery route. Then the pieces are placed in an order that follows the carrier's path. A letter for 12 Pine Street should come before a letter for 84 Pine Street if that is the order in which the carrier reaches those homes.

The same address information serves different purposes at different stages. Early in the trip, the postal code helps choose a region. Near the end, the street number and apartment number help choose an exact stop.

[[DATA_TABLE]]

A reader can use the stage-and-purpose table to preview the route or to review it after reading. The short entries do not replace the article's details; instead, they organize the five major stages so their different jobs can be compared quickly. Reading across one row connects each stage name with the job it performs.

**5. Delivery—and Corrections**

The carrier loads the ordered mail and follows the assigned route. At each stop, the carrier checks the building number and places the letter in the proper box. In apartment buildings, labeled boxes help match names or unit numbers.

Sometimes a letter takes a wrong turn. A scanner may read a damaged number incorrectly, or a letter may slip into the wrong bin. The next worker or machine can often notice that the address does not belong with the rest of the group. The letter is then returned to the correct part of the sorting process. A delay does not always mean the entire system failed; the repeated checks are designed to catch many errors.

From mailbox to mailbox, a letter's trip is a chain of smaller decisions. The diagram shows the main order, while the address supplies the clues used at every step. Machines add speed, people solve unusual problems, and both help one envelope reach one precise place.`;

const paperPresentation = `Listen to the presentation. Then answer the questions.

**From Paper Bin to New Paper**

When a worksheet goes into a classroom recycling bin, it does not instantly become a new sheet of paper. It begins a trip with several carefully ordered steps. Today I will explain that trip and why each step matters.

No single step can do the whole job.

First, collection workers empty paper bins into a truck. The truck carries the paper to a recycling facility. At the facility, workers and machines sort the material. Clean office paper and notebook paper can be separated from cardboard. Plastic wrappers, food, and other objects must be removed. A greasy paper plate, for example, can damage the quality of a batch because oil does not wash out of paper fibers easily.

Next, the sorted paper is chopped into small pieces and mixed with warm water. Large machines stir the mixture until it becomes a thick, wet pulp. Pulp may look like oatmeal, but it is actually made of tiny paper fibers floating in water.

The pulp then passes through screens. The screens catch objects such as staples, bits of tape, or pieces of plastic that were missed during sorting. Some facilities also clean ink from the pulp. Air bubbles and safe cleaning materials help lift ink away from the fibers. This step is called de-inking.

After cleaning, the watery pulp spreads across a wide moving screen. Water drains through the screen while paper fibers remain on top. Rollers press the damp fibers together and squeeze out even more water. Heated rollers dry the pressed layer. The long sheet is wound into a large roll before it is cut into smaller sizes.

Recycled fibers cannot be reused forever. Each time paper is pulped, the fibers become a little shorter and weaker. A mill may mix recycled pulp with some new wood fiber so the finished paper is strong enough for its purpose. A cardboard box needs different strength than a paper towel or writing paper.

The most helpful classroom habit happens before the truck arrives: put only accepted, reasonably clean paper in the correct bin. Removing plastic covers and keeping food out of the bin makes sorting easier. It also means more of the collected paper can actually be used.

So the trip has a clear sequence: collect, sort, pulp, clean, form, press, dry, and cut. Recycling does not erase the need for materials or energy, but it gives many paper fibers another useful life. The next sheet you write on may contain fibers that once held someone else's spelling list, drawing, or math notes.`;

const moonPresentation = `Listen to the presentation. Then answer the questions.

**Watching the Moon's Appearance**

If you look at the Moon on different clear evenings, its bright part seems to change shape. The Moon itself is not being cut into different shapes. Half of the Moon is always lit by the Sun. As the Moon moves around Earth, we see different amounts of that sunlit half.

A group of students made observations for one month. They looked from the same safe place at about the same time whenever weather allowed. They drew the bright part they could see and wrote the date. Repeating the observation helped them notice an order that one evening could not show.

Here are three pairings from their chart. I will say each one twice. Observation 1 showed a thin bright curve on the right side. That appearance is called a waxing crescent: a thin bright curve on the right, waxing crescent. Observation 2 showed the right half bright. That appearance is called first quarter: the right half bright, first quarter. Observation 3 showed a complete bright circle. That appearance is called full moon: a complete bright circle, full moon.

The word *waxing* means the bright portion we see is growing. After the full moon, the visible bright portion begins to shrink, or wane. The whole cycle from one new moon to the next takes about a month, so observations spread across several weeks reveal much more than observations made only on two neighboring nights.

The students also learned why consistent methods matter. Looking at about the same time made their notes easier to compare. Writing the date kept the drawings in order. Using the same chart labels prevented one student from writing “half circle” while another wrote “first quarter” for the same appearance.

Their chart was a record, not a promise that everyone would see the Moon at an exact clock time. Location, trees, buildings, weather, and the time the Moon rises can affect whether it is visible. The phase name describes the sunlit portion seen from Earth, while the observation note describes what the students actually saw on that date.

Clouds blocked the Moon on four planned observation nights. The students did not guess what the Moon looked like. They marked those dates “not visible” and continued on the next clear night. Missing data can be recorded honestly; it does not need to be invented.

Their chart was useful, but every fact needed here has been spoken aloud. The key pairings are: thin bright curve on the right, waxing crescent; right half bright, first quarter; complete bright circle, full moon. By observing repeatedly and recording carefully, the students turned separate glimpses into evidence of a repeating pattern.`;

export const grade4Test2ElaCat: Question[] = [
  item({id:43001,testType:"cat",claim:1,target:"1",dok:1,standard:"RL.4.1",type:"multiple-choice",passage:lastPracticeLap,passageTitle:"The Last Practice Lap",questionText:"Why does Nia walk away from the starting line after the third handoff?",options:options(["She wants to practice tying her shoe.","She is embarrassed and worries that another mistake will hurt the team.","She has finished all the laps Coach Rivera assigned.","She wants Owen to take her place immediately."]),correctAnswer:"B",rubric:"1 point: The student selects B.",points:1,explanation:"The passage says Nia's cheeks burn and she worries that a dropped baton would cost her teammates time."}),
  item({id:43002,testType:"cat",claim:1,target:"2",dok:2,standard:"RL.4.2",type:"multiple-choice",passage:lastPracticeLap,passageTitle:"The Last Practice Lap",questionText:"Which theme is best supported by the story?",options:options(["Natural talent is more useful than careful practice.","A team should replace anyone who makes a mistake.","Mistakes can become useful when people accept help and adjust their approach.","Winning a race is the only way to know that practice worked."]),correctAnswer:"C",rubric:"1 point: The student selects C.",points:1,explanation:"Nia improves after Owen shares his experience and the pair slows down to correct each part of the exchange."}),
  item({id:43003,testType:"cat",claim:1,target:"3",dok:2,standard:"RL.4.4",type:"multiple-choice",passage:lastPracticeLap,passageTitle:"The Last Practice Lap",questionText:"What does *hesitated* mean when Nia “hesitated” before returning to the track?",options:options(["paused because she was uncertain","hurried because she was excited","laughed because she was relieved","called because she needed help"]),correctAnswer:"A",rubric:"1 point: The student selects A.",points:1,explanation:"Nia is unsure about returning because everyone will know she almost quit, so she pauses before deciding."}),
  item({id:43004,testType:"cat",claim:1,target:"4",dok:3,standard:"RL.4.1",type:"two-part",passage:lastPracticeLap,passageTitle:"The Last Practice Lap",questionText:"Answer both parts about Nia's reaction to the failed handoffs.",partAPrompt:"Part A: What can the reader infer about Nia after the failed handoffs?",partAOptions:options(["She is angry that Owen runs too slowly.","She believes her mistake could affect people besides herself.","She has decided that relay races are unfair.","She thinks Coach Rivera did not explain the rules."]),partBPrompt:"Part B: Which sentence best supports the inference?",partBOptions:options(["The other runners stopped.","Her cheeks burned.","If she dropped the baton there, three other runners would lose time because of her.","Coach Rivera did not look angry."]),correctAnswer:["B","C"],rubric:"1 point: Both parts are correct.",points:1,explanation:"Nia specifically worries that her mistake could cost three teammates time, showing concern for the whole team."}),
  item({id:43005,testType:"cat",claim:1,target:"5",dok:2,standard:"RL.4.3",type:"multi-select",selection:{min:2,max:2},passage:lastPracticeLap,passageTitle:"The Last Practice Lap",questionText:"Which two events most directly change Nia's plan to leave the relay team?",options:options(["Coach Rivera moves two cones.","Owen admits that he once threw a baton during a relay.","Nia remembers that the practice meet is two days away.","Owen and Nia complete a steady exchange while jogging slowly.","The sun begins to drop behind the recreation center."]),correctAnswer:["B","D"],scoringRule:{kind:"unordered-set",acceptedAnswers:["B","D"]},rubric:"1 point: The student selects B and D.",points:1,explanation:"Owen's honest story makes the mistake feel fixable, and their successful slow exchange proves Nia can improve."}),
  item({id:43006,testType:"cat",claim:1,target:"6",dok:2,standard:"RL.4.5",type:"multiple-choice",passage:lastPracticeLap,passageTitle:"The Last Practice Lap",questionText:"Why does the author include the paragraph describing Owen and Nia practicing at walking speed?",options:options(["to explain why the recreation center closes early","to show the specific process that helps Nia improve","to introduce a new conflict between Owen and Coach Rivera","to prove that walking is faster than running in a relay"]),correctAnswer:"B",rubric:"1 point: The student selects B.",points:1,explanation:"The paragraph shows them isolating the handoff and repeating it before adding speed, which explains the improvement."}),
  item({id:43007,testType:"cat",claim:1,target:"7",dok:2,standard:"L.4.5a",type:"two-part",passage:lastPracticeLap,passageTitle:"The Last Practice Lap",questionText:"Answer both parts about language in the story.",partAPrompt:"Part A: What does the comparison “The baton felt like a hot coal” suggest?",partAOptions:options(["The baton has been heated by the sun.","Nia wants to get the baton out of her hand quickly.","The baton is too heavy for Nia to carry.","Nia cannot see the baton clearly."]),partBPrompt:"Part B: What effect does the comparison have?",partBOptions:options(["It emphasizes Nia's anxious wish to escape another mistake.","It explains the material used to make a baton.","It creates a calm mood before the final lap.","It shows that Owen is angry with Nia."]),correctAnswer:["B","A"],rubric:"1 point: Both parts are correct.",points:1,explanation:"A hot coal is something a person would release quickly, so the image emphasizes Nia's anxiety."}),

  item({id:43008,testType:"cat",claim:1,target:"8",dok:1,standard:"RI.4.1",type:"multiple-choice",passage:letterJourney,passageTitle:"How a Letter Finds Its Way",questionText:"What is the main purpose of the local sorting center?",options:options(["to write a return address on every envelope","to put mail in the order of a carrier's delivery route","to decide whether every letter travels by airplane","to manufacture new envelopes for damaged mail"]),correctAnswer:"B",rubric:"1 point: The student selects B.",points:1,explanation:"The local center groups mail by route and places it in the order the carrier reaches each stop."}),
  item({id:43009,testType:"cat",claim:1,target:"9",dok:2,standard:"RI.4.2",type:"multiple-choice",passage:letterJourney,passageTitle:"How a Letter Finds Its Way",questionText:"What is the main idea of “How a Letter Finds Its Way”?",options:options(["Most letters should be sent only within one town.","A letter reaches its destination through an ordered process that uses address clues, machines, and people.","Postal workers spend most of their time repairing damaged mailboxes.","Airplanes are the most important part of every letter's trip."]),correctAnswer:"B",rubric:"1 point: The student selects B.",points:1,explanation:"Every section explains a stage in the ordered process and how people or machines use the address."}),
  item({id:43010,testType:"cat",claim:1,target:"10",dok:2,standard:"RI.4.4",type:"multiple-choice",passage:letterJourney,passageTitle:"How a Letter Finds Its Way",questionText:"What does *sequence* mean in the first paragraph?",options:options(["a cost that changes","a set of steps in order","a machine that takes pictures","a mistake in an address"]),correctAnswer:"B",rubric:"1 point: The student selects B.",points:1,explanation:"The article then presents the stages in the order they occur, so sequence means ordered steps."}),
  item({id:43011,testType:"cat",claim:1,target:"11",dok:3,standard:"RI.4.1",type:"two-part",passage:letterJourney,passageTitle:"How a Letter Finds Its Way",questionText:"Answer both parts about how people and machines support mail delivery.",partAPrompt:"Part A: Which conclusion is best supported by the article?",partAOptions:options(["Machines have completely replaced postal workers.","People and machines perform different jobs that help the same system work.","Every delivery error begins at the local sorting center.","Postal codes are useful only after a letter reaches its final street."]),partBPrompt:"Part B: Which detail best supports the conclusion?",partBOptions:options(["Letters going farther may travel by truck or airplane.","A machine photographs envelopes, while workers review addresses the machine cannot read.","A return address may be printed in the corner.","The carrier loads ordered mail before leaving the center."]),correctAnswer:["B","B"],rubric:"1 point: Both parts are correct.",points:1,explanation:"The paired detail directly contrasts a machine's fast reading task with a worker's problem-solving task."}),
  item({id:43012,testType:"cat",claim:1,target:"12",dok:3,standard:"RI.4.7",type:"multi-select",selection:{min:2,max:2},passage:letterJourney,passageTitle:"How a Letter Finds Its Way",questionText:"Which two statements are supported by both the process diagram and the article?",stimulusImages:[{src:"/images/grade-4/test-2/ela/mail-process.svg",alt:"Five stages: collection, first sorting center, travel, local sorting center, and delivery.",sha256:"d71e032a02a4a5a69110969d1e8d7cee60d73039d0b284a633f3e00cd974d104"}],options:options(["Collection happens before the first sorting center.","Delivery happens before transportation.","The local sorting center comes after transportation.","A return address is added during delivery.","Every letter travels by airplane between sorting centers."]),correctAnswer:["A","C"],scoringRule:{kind:"unordered-set",acceptedAnswers:["A","C"]},rubric:"1 point: The student selects A and C.",points:1,explanation:"Both the diagram order and the article place collection before first sorting and local sorting after travel."}),
  item({id:43013,testType:"cat",claim:1,target:"13",dok:2,standard:"RI.4.5",type:"grid-match",passage:letterJourney,passageTitle:"How a Letter Finds Its Way",questionText:"Match each text feature to the information it helps a reader locate.",gridRows:["Heading “Reading the Address”","Five-stage process diagram","Stage/purpose table"],gridColumns:["Parts of an address and why they matter","The overall order of a letter's trip","A brief statement of each stage's job"],gridSelection:{perRowMin:1,perRowMax:1,totalMin:3,totalMax:3},correctAnswer:["0:0","1:1","2:2"],scoringRule:{kind:"unordered-set",acceptedAnswers:["0:0","1:1","2:2"]},rubric:"1 point: All three features are matched correctly.",points:1,explanation:"The heading introduces address details, the diagram shows order, and the table summarizes each stage's purpose."}),
  item({id:43014,testType:"cat",claim:1,target:"14",dok:2,standard:"L.4.5a",type:"multiple-choice",passage:letterJourney,passageTitle:"How a Letter Finds Its Way",questionText:"Why does the author compare moving letters to “boats on a branching river”?",options:options(["to show that envelopes may get wet","to help readers picture gates sending moving groups onto different paths","to suggest that postal workers deliver mail by boat","to explain why routing marks use blue ink"]),correctAnswer:"B",rubric:"1 point: The student selects B.",points:1,explanation:"The comparison makes the moving conveyor and its branching destination paths easier to imagine."}),
  item({id:43015,testType:"cat",claim:1,target:"8,11",dok:2,standard:"RI.4.1",type:"multi-select",selection:{min:2,max:2},passage:letterJourney,passageTitle:"How a Letter Finds Its Way",questionText:"Which two details best support the claim that a complete, readable address can prevent delays?",options:options(["Postal codes divide large regions into smaller delivery areas.","A missing apartment number can bring a letter to the building but not the correct home.","Some letters travel by truck or airplane.","Carriers load ordered mail before leaving the center.","A conveyor moves continuously through the first sorting center."]),correctAnswer:["A","B"],scoringRule:{kind:"unordered-set",acceptedAnswers:["A","B"]},rubric:"1 point: The student selects A and B.",points:1,explanation:"Both details explain how specific address information guides a letter accurately and avoids correction steps."}),

  item({id:43016,testType:"cat",claim:2,target:"1b",dok:2,standard:"W.4.3b",type:"multiple-choice",questionText:"A student is revising a narrative about building a kite. Read the excerpt.\n\nAfter two afternoons of measuring sticks and gluing paper, I carried the kite outside. My brother held the frame while I unwound the string across the grass. At first, the air was still, and the kite leaned against his shoulder. Then the treetops began to shake. A gust caught the paper sail before I was ready, and the frame pulled hard against the string. [Add a sentence here.] I planted both feet and slowly let out more line. Above us, the red tail snapped and danced.\n\nWhich sentence best shows the narrator's response through concrete action and sensory detail?",options:options(["The kite was very interesting and nice.","The rough string burned across my palm as I tightened my grip.","People have flown kites for many years.","My friend owns a kite with a blue tail."]),correctAnswer:"B",rubric:"1 point: The student selects B.",points:1,explanation:"Option B uses touch and a specific action to show the narrator reacting to the strong pull."}),
  item({id:43017,testType:"cat",claim:2,target:"3b",dok:2,standard:"W.4.2c",type:"two-part",questionText:"A student is revising an explanation.\n\nA shadow forms when an object blocks light. The shadow points away from the light source, and its length depends on the angle of the light. [Gap 1], the shadow of a tree is usually long in the early morning because sunlight reaches the tree at a low angle. As the Sun appears higher, the shadow becomes shorter. Near midday, it may look much smaller than it did at breakfast time. [Gap 2], as the Sun appears lower in the western sky, the tree's shadow grows long again on the opposite side. These changes repeat in a predictable daily pattern.\n\nAnswer both parts.",partAPrompt:"Part A: Which transition best fits Gap 1?",partAOptions:options(["For example","On the other hand","In conclusion","Instead"]),partBPrompt:"Part B: Which transition best fits Gap 2?",partBOptions:options(["For instance","Later","Because","First"]),correctAnswer:["A","B"],rubric:"1 point: Both transitions are correct.",points:1,explanation:"“For example” introduces an example of the idea, and “Later” signals the final change in time."}),
  item({id:43018,testType:"cat",claim:2,target:"6b",dok:2,standard:"W.4.1a",type:"multiple-choice",questionText:"A student is writing a letter to the principal. Read the planning notes.\n\nMany students enjoy talking with friends during lunch, but the cafeteria can become loud. Some students need a calmer place where they can eat and speak quietly. A quieter choice could also help them return to afternoon classes feeling settled and ready to learn. The area would be optional, so students who enjoy the regular cafeteria could continue to use it. The writer needs an opening sentence that clearly states the opinion supported by these reasons.\n\nWhich opening best introduces the matching claim?",options:options(["Lunch is served in the middle of the school day.","Our school should offer a quiet lunch area for students who choose it.","Some cafeterias have round tables, and others have square tables.","My favorite lunch is soup and bread."]),correctAnswer:"B",rubric:"1 point: The student selects B.",points:1,explanation:"Option B clearly states the opinion that the supplied reasons will support."}),
  item({id:43019,testType:"cat",claim:2,target:"8",dok:1,standard:"L.4.3",type:"multiple-choice",questionText:"A student is revising a description of a toy-boat test.\n\nI placed the toy boat in the shallow stream beside a flat rock. For a moment, it rested against the bank. Then I nudged it toward the middle, where the water moved faster. The current **did something to** the boat, sending it quickly around the bend. I ran along the path and found the boat spinning in a quiet pool below a fallen branch.\n\nWhich word best replaces **did something to**?",options:options(["looked at","carried","knew about","was near"]),correctAnswer:"B",rubric:"1 point: The student selects carried.",points:1,explanation:"“Carried” precisely describes the current moving the boat around the bend."}),
  item({id:43020,testType:"cat",claim:2,target:"9",dok:1,standard:"L.4.1",type:"multiple-choice",questionText:"Read the paragraph from a class pet-care calendar.\n\nOur class takes turns caring for the guinea pig. The calendar gives one student a job each morning and another student a job before dismissal. Each student **check** the water bowl on the day assigned to that student. The morning helper also adds hay, while the afternoon helper makes sure the cage door is secure. Ms. Lee checks the calendar after both jobs are finished.\n\nWhich revision of the marked sentence is correct?",options:options(["Each student checks the water bowl on the day assigned to that student.","Each students check the water bowl on the day assigned to that student.","Each student checking the water bowl on the day assigned to that student.","Each student have checked the water bowl on the day assigned to that student."]),correctAnswer:"A",rubric:"1 point: The student selects A.",points:1,explanation:"The singular subject “Each student” requires the singular verb “checks.”"}),
  item({id:43021,testType:"cat",claim:2,target:"9",dok:2,standard:"L.4.2",type:"multi-select",selection:{min:2,max:2},questionText:"A student writes this reminder for classmates.\n\n“On friday, our class will visit the history museum. We will meet our guide near the front doors at nine o'clock. Please bring a pencil, a notebook and your lunch. Wear comfortable shoes because we will walk through three exhibits. Before leaving school, your partner will help you check that you have every item. The bus will return before dismissal.”\n\nSelect the two needed corrections.",options:options(["Capitalize On at the beginning.","Capitalize Friday.","Remove the comma after pencil.","Add a comma after notebook.","Capitalize history."]),correctAnswer:["B","D"],scoringRule:{kind:"unordered-set",acceptedAnswers:["B","D"]},rubric:"1 point: The student selects B and D.",points:1,explanation:"Days of the week are capitalized, and a comma separates each item in this three-item series."}),

  item({id:43022,testType:"cat",claim:3,target:"4",dok:1,standard:"SL.4.2",type:"multiple-choice",passage:paperPresentation,passageTitle:"From Paper Bin to New Paper",audio:{src:"/audio/presentations/grade-4/test-2-from-paper-bin-to-new-paper.m4a",title:"From Paper Bin to New Paper narration",transcript:paperPresentation},questionText:"What is the main idea of “From Paper Bin to New Paper”?",options:options(["Paper recycling uses an ordered process to clean and reshape used fibers.","Every kind of used paper can be recycled in the same bin.","Paper mills make all products from recycled fibers only.","Classrooms should stop using paper for writing."]),correctAnswer:"A",rubric:"1 point: The student selects A.",points:1,explanation:"The speaker explains each ordered stage from collection through forming and cutting new paper."}),
  item({id:43023,testType:"cat",claim:3,target:"4",dok:2,standard:"SL.4.2",type:"multi-select",selection:{min:2,max:2},passage:paperPresentation,passageTitle:"From Paper Bin to New Paper",audio:{src:"/audio/presentations/grade-4/test-2-from-paper-bin-to-new-paper.m4a",title:"From Paper Bin to New Paper narration",transcript:paperPresentation},questionText:"Which two spoken details explain why sorting and screening matter?",options:options(["Food and plastic can lower the quality of a batch.","Screens catch staples, tape, and plastic missed during sorting.","The finished sheet is wound onto a large roll.","A paper towel needs a different strength than writing paper.","Collection trucks visit classroom recycling bins."]),correctAnswer:["A","B"],scoringRule:{kind:"unordered-set",acceptedAnswers:["A","B"]},rubric:"1 point: The student selects A and B.",points:1,explanation:"Both details describe unwanted materials and how sorting or screens keep them out of the pulp."}),
  item({id:43024,testType:"cat",claim:3,target:"4",dok:3,standard:"SL.4.3",type:"two-part",passage:paperPresentation,passageTitle:"From Paper Bin to New Paper",audio:{src:"/audio/presentations/grade-4/test-2-from-paper-bin-to-new-paper.m4a",title:"From Paper Bin to New Paper narration",transcript:paperPresentation},questionText:"Answer both parts about students' role in paper recycling.",partAPrompt:"Part A: What conclusion does the speaker make about students' role in recycling?",partAOptions:options(["Students should wash every sheet before recycling it.","Students can help more collected paper be usable by putting clean, accepted paper in the correct bin.","Students should remove all ink from paper before collection.","Students should mix plastic covers with notebook paper."]),partBPrompt:"Part B: Which spoken detail best supports the conclusion?",partBOptions:options(["Rollers press water from the pulp.","Recycled fibers become shorter after repeated use.","Removing plastic covers and keeping food out makes sorting easier.","The truck carries paper to a recycling facility."]),correctAnswer:["B","C"],rubric:"1 point: Both parts are correct.",points:1,explanation:"The speaker directly connects correct, clean bin contents with easier sorting and more usable paper."}),
  item({id:43025,testType:"cat",claim:3,target:"4",dok:1,standard:"SL.4.2",type:"multiple-choice",passage:moonPresentation,passageTitle:"Watching the Moon's Appearance",audio:{src:"/audio/presentations/grade-4/test-2-watching-the-moons-appearance.m4a",title:"Watching the Moon's Appearance narration",transcript:moonPresentation},questionText:"What is the main idea of “Watching the Moon's Appearance”?",options:options(["The Moon changes its physical shape several times each month.","Repeated, careful observations reveal a pattern in how the Moon's sunlit part appears from Earth.","Cloudy nights provide the most accurate Moon observations.","Students must observe the Moon at a different time every night."]),correctAnswer:"B",rubric:"1 point: The student selects B.",points:1,explanation:"The presentation explains the apparent changes and why repeated, consistent observations reveal the cycle."}),
  item({id:43026,testType:"cat",claim:3,target:"4",dok:2,standard:"SL.4.2",type:"grid-match",passage:moonPresentation,passageTitle:"Watching the Moon's Appearance",audio:{src:"/audio/presentations/grade-4/test-2-watching-the-moons-appearance.m4a",title:"Watching the Moon's Appearance narration",transcript:moonPresentation},questionText:"Match each spoken observation to the phase name.",stimulusImages:[{src:"/images/grade-4/test-2/ela/moon-observations.svg",alt:"Optional chart showing a right-side crescent, a right half, and a full bright circle.",sha256:"cbb2d10613f3df833b29f2bb3804c543c6d3a193aacafd6603c6c09630561843"}],gridRows:["Thin bright curve on the right","Right half bright","Complete bright circle"],gridColumns:["Waxing crescent","First quarter","Full moon"],gridSelection:{perRowMin:1,perRowMax:1,totalMin:3,totalMax:3},correctAnswer:["0:0","1:1","2:2"],scoringRule:{kind:"unordered-set",acceptedAnswers:["0:0","1:1","2:2"]},rubric:"1 point: All three observations are matched correctly.",points:1,explanation:"The narration states and repeats each pairing: crescent, first quarter, and full moon."}),
  item({id:43027,testType:"cat",claim:3,target:"4",dok:2,standard:"SL.4.3",type:"multi-select",selection:{min:2,max:2},passage:moonPresentation,passageTitle:"Watching the Moon's Appearance",audio:{src:"/audio/presentations/grade-4/test-2-watching-the-moons-appearance.m4a",title:"Watching the Moon's Appearance narration",transcript:moonPresentation},questionText:"Which two details explain why repeated, consistent observations matter?",options:options(["Several weeks of observations show more of the repeating order than two neighboring nights.","Looking at about the same time makes notes easier to compare.","Clouds prove that the Moon has disappeared.","Students should guess the appearance on missing dates.","The Moon produces its own light during a full moon."]),correctAnswer:["A","B"],scoringRule:{kind:"unordered-set",acceptedAnswers:["A","B"]},rubric:"1 point: The student selects A and B.",points:1,explanation:"The speaker says a longer series reveals the cycle and a consistent time improves comparison."}),

  item({id:43028,testType:"cat",claim:4,target:"2",dok:2,standard:"W.4.8",type:"multi-select",selection:{min:2,max:2},questionText:"A student is researching this question: **How do canal locks move boats between different water levels?**\n\nSelect the two source cards most useful for the research.",options:options(["Boat Colors Through History — photographs of paint styles on boats","Inside a Lock Chamber — a diagram showing gates closing while water enters or leaves","How Lock Gates Work — an engineer explains how gates control water and boat movement","Famous Dams — a list of the world's tallest dams"]),correctAnswer:["B","C"],scoringRule:{kind:"unordered-set",acceptedAnswers:["B","C"]},rubric:"1 point: The student selects B and C.",points:1,explanation:"Both sources directly address lock chambers, water levels, and gates; the other topics do not answer the question."}),
  item({id:43029,testType:"cat",claim:4,target:"3",dok:2,standard:"W.4.8",type:"multiple-choice",questionText:"A student is writing a report about the streets near a school. Read this source excerpt.\n\n**Interview with a crossing guard:** “I have worked at the east entrance every school morning for three years. Between 7:45 and 8:00, cars often form a line beside that entrance. The line becomes shorter after the first bell. On rainy days, more families arrive by car, so the line sometimes reaches the corner. Tuesdays are usually less crowded because two fourth-grade classes begin with a walking club at the park. Buses use the west entrance, so they do not join the east-side line. I record unusual delays in a notebook and share the pattern with the principal each month.”\n\nWhich report section can this source best support?",options:options(["Traffic patterns near arrival time","Rules for playground games","How school buses are designed","Kinds of clouds that bring rain"]),correctAnswer:"A",rubric:"1 point: The student selects A.",points:1,explanation:"The firsthand observations describe when and where vehicle lines form, which directly supports traffic patterns."}),
  item({id:43030,testType:"cat",claim:4,target:"4",dok:2,standard:"W.4.9",type:"multi-select",selection:{min:2,max:2},questionText:"A student claims that reusable water bottles can reduce disposable-bottle waste. Read the fact-sheet sentences.\n\n1. A reusable bottle can be washed and filled again many times instead of being thrown away after one drink.\n2. Some reusable bottles come in bright colors, and stores sell them in many sizes.\n3. Cedar School recorded 320 fewer disposable bottles in its trash during the month after it added two water-bottle refill stations.\n4. Students can write their names on bottles or attach labels so the bottles are easier to identify.\n5. Bottle lids are made in several shapes, including flat screw tops and raised drinking spouts.\n6. The school custodian explained that the trash count included bottles from classrooms, the cafeteria, and the playground.\n\nSelect the two sentences that best support the claim.",options:options(["Sentence 1","Sentence 2","Sentence 3","Sentence 4","Sentence 5"]),correctAnswer:["A","C"],scoringRule:{kind:"unordered-set",acceptedAnswers:["A","C"]},rubric:"1 point: The student selects A and C.",points:1,explanation:"Repeated use and the recorded reduction in discarded bottles both directly support the waste-reduction claim."}),
];

const outdoorSources = `The Harbor View Community Planning Committee is considering an outdoor learning space beside a fictional community center. The site is level and can be reached from the center by an existing paved path. Read all three sources. The committee must follow accessibility requirements no matter which design it chooses.

### Source 1: Learning Beyond Four Walls

An outdoor learning space is more than a playground. It is a place designed for lessons, observation, discussion, reading, or art. A simple space may include a shaded gathering area, weather-safe tables, a writing surface, and nearby plants. A more developed space might add raised planting beds, measuring tools, or storage for clipboards and magnifiers.

Some lessons fit naturally outdoors. Students can measure shadows at different times, compare leaf shapes, record temperature, sketch clouds, or observe how rainwater moves. These experiences give students real objects and events to connect with ideas from books. A class studying insects, for example, can observe without needing to collect or disturb the animals.

Outdoor spaces can also support reading and discussion. A class may read the same text indoors or outdoors, but a new setting can renew attention. Small groups can spread out while remaining within the teacher's view. Teachers still need clear routines so students know where to sit, how to carry materials, and how to return inside efficiently.

Good design is essential. Shade protects learners from strong sun. Firm, wide paths and table spaces allow people using wheelchairs or other mobility supports to participate with classmates. Seating should offer back support and spaces for different bodies and needs. Printed signs should use readable text, and teachers should have a way to move a lesson indoors when weather or air quality is unsafe.

An outdoor space does not replace classrooms. It gives teachers another setting to use when the lesson and conditions are a good match. Its value depends on thoughtful design, clear plans, and regular use—not simply on placing benches outside.

Teachers also need a quick way to decide whether an outdoor lesson fits the day's goal. A reading discussion may need fewer materials than a measurement investigation, while an art activity may require washable surfaces and nearby storage. Planning the task before moving outside protects learning time. It also helps teachers bring only the tools students need, reducing trips back into the building and keeping paths clear.

### Source 2: Harbor View Planning Notes

The planning team studied the proposed site and listed requirements and limits.

**Access and safety:** The existing paved path is wide enough for two mobility devices to pass. Any new route from the path to tables must have a firm, stable surface and gentle slope. At least two tables must provide open knee space. The design must keep the emergency access lane clear. These are required features, not optional extras.

**Weather:** The site receives direct sun from late morning through afternoon. A shade structure would be needed for regular daytime use. The center closes the outdoor area during lightning, heavy rain, unhealthy air, or excessive heat. Lessons must always have an indoor backup.

**Cost:** The committee has $24,000 available. Estimates are $11,000 for a shade structure, $5,000 for accessible tables and seating, $4,000 for firm connecting surfaces, $2,000 for a lockable storage cabinet, and $1,500 for raised planters. These are planning estimates, so the committee should keep some money unassigned for price changes or repairs.

**Upkeep:** Staff estimate that sweeping, checking surfaces, watering plants, and inspecting furniture would take about six hours each week. Volunteers may help with plants, but the center must have a reliable plan even when volunteers are unavailable. Materials left outdoors must be weather resistant or stored after use.

**Shared use:** Community groups use the center after school and on weekends. The outdoor area could be open to them when it is not reserved for a class. A posted schedule would reduce conflicts. Evening groups requested low lighting along the path, but lighting must point downward so it does not shine into nearby homes.

The notes do not recommend yes or no. They show that a useful space is possible only if the final plan meets access and safety requirements, fits the budget, and includes dependable upkeep.

Committee members must also decide which features belong in the first construction phase. Required access work cannot be delayed, but planters or extra storage could be added later. A written priority list would help the group compare bids without accidentally spending repair funds on optional features.

### Source 3: One Year at Maple Point

Maple Point Community Center opened a small outdoor learning court last year. Its site and weather are not identical to Harbor View's, but its records show both successes and challenges.

The court includes a roofed teaching circle, four accessible tables, storage bins, and two raised beds. During the first three months, instructors reserved it mostly for nature study. Later, writing groups, an after-school art club, and a family science program began using it.

[[DATA_TABLE]]

The Maple Point records compare the center's first three months with its most recent three months. Reading across each row shows how scheduled sessions, weather moves, participating programs, and weekly maintenance hours changed over the year. These figures are records from Maple Point, not predictions for Harbor View.

In a survey of 84 participants, 62 said the space helped them notice or discuss things they might have missed indoors. Fifty-eight wanted programs to keep using it. Twelve said traffic noise sometimes made instructions hard to hear, and nine wanted more seat backs.

The first raised-bed design created a problem: one bed could be reached only from a loose gravel strip. Staff replaced the strip with a firm surface and lowered one section of the bed. After the change, every group could approach the plants from the main path. The center treated the repair as necessary access work, not as a reason to exclude participants.

Maintenance also took more time as use increased. The center assigned one staff member to a weekly inspection and chose fewer plants that needed frequent watering. Programs now return tools to labeled storage bins after every session. These changes reduced missing materials, although upkeep still averages seven hours per week.

Staff members review reservation records every season. If one program rarely uses the court, they ask whether timing, noise, shade, or equipment is the obstacle. That review gives the center evidence for small changes instead of assuming that every problem requires a major rebuilding project.

Maple Point's experience offers evidence for more than one position. The rising number of sessions and positive survey responses show that people found value in the space. Weather moves, noise, seating concerns, and maintenance hours show that outdoor learning also requires backup plans and continuing work.`;

const outdoorDirections = `You will complete two Part 1 research tasks and then a separate Part 2 opinion writing task. Read all three sources and take notes. Your sources and Global Notes remain available in Part 2. After you begin Part 2, you cannot return to Part 1.`;

const opinionRubric = `Organization/Purpose — 4 points: The response has a clear, sustained opinion; logical organization; an effective introduction and conclusion; and transitions that connect reasons and evidence.

Organization/Purpose — 3 points: The opinion is clear and mostly sustained with evident organization, an introduction and conclusion, and generally appropriate transitions.

Organization/Purpose — 2 points: The opinion or organization is uneven; ideas may be loosely connected or an introduction/conclusion may be weak.

Organization/Purpose — 1 point: The opinion is confusing or minimally sustained, with little recognizable organization.

Organization/Purpose — 0 points: The response has no discernible opinion or organizational structure.

Evidence/Elaboration — 4 points: The response uses accurate, well-chosen evidence from more than one source, thoroughly explains how evidence supports the opinion, and uses precise grade-appropriate language.

Evidence/Elaboration — 3 points: The response uses relevant evidence from more than one source and adequately explains its connection to the opinion.

Evidence/Elaboration — 2 points: The response uses some source evidence, but support or explanation is incomplete, uneven, or drawn mainly from one source.

Evidence/Elaboration — 1 point: The response provides minimal, vague, or weakly connected source support.

Evidence/Elaboration — 0 points: The response provides no relevant source evidence.

Conventions — 2 points: The response demonstrates adequate command of sentence formation, punctuation, capitalization, grammar, usage, and spelling for its length and complexity.

Conventions — 1 point: The response demonstrates partial command; errors sometimes interfere with clarity.

Conventions — 0 points: The response demonstrates little command; frequent errors interfere with meaning.

NS for every trait: The response is insufficient, copied from the sources without original writing, in a language other than English, off-topic, or off-purpose.`;

export const grade4Test2ElaPt: Question[] = [
  item({id:43101,testType:"pt",claim:4,target:"4",dok:3,standard:"W.4.9",type:"short-answer",passage:outdoorSources,passageTitle:"Should Our Community Add More Outdoor Learning Spaces?",studentDirections:outdoorDirections,questionText:"Compare how Source 1 and Source 2 support different sides of the decision. Use one specific detail from Source 1 and one specific detail from Source 2.",correctAnswer:"A complete response explains that Source 1 supplies a potential learning or participation benefit while Source 2 supplies a concrete planning requirement or limitation, using one accurate detail from each.",scoringRule:{kind:"manual-rubric"},rubric:"2 points: The response accurately explains how the two sources support different sides or considerations and uses one relevant source-specific detail from each. 1 point: The response accurately links one source and one relevant detail, or gives two accurate details without explaining their different roles. 0 points: The response is incorrect, irrelevant, insufficient, or blank.",points:2,explanation:"An exemplar may contrast Source 1's observation-based learning benefit with Source 2's required shade, access, budget, weather, or upkeep planning."}),
  item({id:43102,testType:"pt",claim:4,target:"2,3",dok:3,standard:"W.4.8",type:"grid-match",passage:outdoorSources,passageTitle:"Should Our Community Add More Outdoor Learning Spaces?",studentDirections:outdoorDirections,questionText:"Select every source that provides evidence for each planning statement.",gridRows:["Outdoor learning can support direct observation during lessons.","Weather and ongoing upkeep can limit or change outdoor use.","Use increased after Maple Point opened its learning court."],gridColumns:["Source 1","Source 2","Source 3"],gridSelection:{perRowMin:1,perRowMax:2,rowSelections:[{min:1,max:1},{min:2,max:2},{min:1,max:1}],totalMin:4,totalMax:4},correctAnswer:["0:0","1:1","1:2","2:2"],scoringRule:{kind:"unordered-set",acceptedAnswers:["0:0","1:1","1:2","2:2"]},rubric:"1 point: All four source selections are correct. 0 points: Any selection is missing or incorrect.",points:1,explanation:"Source 1 addresses direct observation; Sources 2 and 3 address weather/upkeep; Source 3 contains Maple Point's usage data."}),
  item({id:43103,testType:"pt",claim:2,target:"7",dok:4,standard:"W.4.1",type:"extended-writing",passage:outdoorSources,passageTitle:"Should Our Community Add More Outdoor Learning Spaces?",studentDirections:outdoorDirections,questionText:"Write an opinion for the Harbor View Community Planning Committee. Should the committee add an outdoor learning space, decide not to add one, or add one only under certain conditions?\n\nState your opinion clearly. Use evidence from more than one source. Explain how the evidence supports your reasons. Address the committee as your audience, organize your ideas into several paragraphs, and use your own words except when quoting briefly.",correctAnswer:"Responses will vary. Either position or a conditional position is acceptable when supported with accurate evidence from more than one source.",scoringRule:{kind:"manual-rubric"},rubric:opinionRubric,points:10,explanation:"Strong responses present a clear position, use accurate evidence from multiple sources, explain the evidence, and acknowledge relevant benefits, requirements, or limitations."}),
];

export const grade4Test2ElaBankVersion = BANK_VERSION;
