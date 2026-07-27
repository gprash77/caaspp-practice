import type { Question } from "./questions";

export interface Phase4SourceConfig {
  testNumber: 6 | 7 | 8 | 9 | 10;
  difficulty: "easy" | "medium" | "hard";
  literary: {
    title: string;
    character: string;
    partner: string;
    setting: string;
    task: string;
    mistake: string;
    preservedEvidence: string;
    revision: string;
    word: string;
    wordMeaning: string;
    theme: string;
  };
  information: {
    title: string;
    subject: string;
    process: string[];
    term: string;
    termMeaning: string;
    benefit: string;
    limitation: string;
    comparison: string;
  };
  listening: [
    {
      title: string;
      subject: string;
      question: string;
      changedVariable: string;
      controls: [string, string];
      measurements: [string, string, string];
      conclusion: string;
      limitation: string;
    },
    {
      title: string;
      subject: string;
      stages: [string, string, string];
      evidence: [string, string];
      conclusion: string;
      limitation: string;
    },
  ];
  pt: {
    title: string;
    issue: string;
    explanationFocus: string;
    requirements: [string, string, string];
    pilot: {
      scope: string;
      resultA: string;
      resultB: string;
      concern: string;
      limitation: string;
    };
    table: NonNullable<Question["dataTable"]>;
  };
  research: [string, string, string];
  writingContexts: [string, string, string, string, string, string];
}

function literaryText(config: Phase4SourceConfig["literary"]): string {
  return [
    `${config.character} arrived at ${config.setting} before the room became busy. The day's work was to ${config.task}. ${config.partner} had already laid out a notebook, a pencil, and the few tools they had agreed to share. Their plan looked simple on paper, but ${config.character} knew that a useful record had to show more than a final answer.`,
    `During the first part of the work, the two students followed the steps they had written. ${config.character} called out each observation while ${config.partner} recorded it. They paused at the same points and compared what they could see. For a while, the two columns in the notebook matched, and the plan seemed to be working exactly as expected.`,
    `Then ${config.mistake}. ${config.character} first wanted to erase the line and continue. The page would look neater, and no one else would know that the sequence had broken. Instead, ${config.character} wrote a box around the entry and added a short note. ${config.preservedEvidence} The marked line made the problem visible rather than hiding it.`,
    `${config.partner} read the note and offered a different explanation. Each student could point to part of the record that supported an idea, yet neither explanation fit every entry. They returned to the last moment when both columns matched. From there, they rebuilt the order one observation at a time and said aloud what each mark was supposed to mean.`,
    `One word in the directions had been ${config.word}. To ${config.character}, it had meant ${config.wordMeaning}. ${config.partner} had used the word in a narrower way. The difference had seemed too small to matter when they planned, but it changed what each student did when the unexpected moment arrived.`,
    `They did not decide that one person had simply failed. Their directions had allowed two reasonable interpretations. ${config.revision} The new version included a way to report uncertainty, a way to repeat one exact step, and a place to record what had changed. They tested the revision from opposite sides of the room and then tested it again with a small distraction.`,
    `The second test was intentionally less comfortable than the first. They changed their positions, covered part of one reference mark, and asked a classmate to create a harmless interruption at a planned time. The goal was not to make the task impossible. It was to learn whether the revised directions still carried enough information when the easiest conditions disappeared.`,
    `Their classmate watched without giving hints. Afterward, she compared the two records and asked why each new mark existed. ${config.character} could explain the uncertainty signal, and ${config.partner} could point to the exact step that had been repeated. Because every mark had a purpose, another reader could reconstruct the sequence without depending on either student's memory.`,
    `On the next trial, another confusing moment occurred. This time, neither student rushed to fill the gap with an assumption. They used the new signal, repeated the exact step, and wrote the same time beside it. Their final totals were not perfectly identical, but the difference could be explained by ordinary observation rather than by mismatched directions.`,
    `They also wrote a short limit beside the result. The revised system had worked in the tested space and under the tested distractions; it had not been proven for every room or distance. Naming that limit did not weaken their work. It told the next group what evidence already existed and what still needed to be checked.`,
    `${config.character} kept the boxed entry in the notebook. It no longer looked like an embarrassing mark. It showed where the first plan stopped being reliable and where the better plan began. ${config.theme} The record was strongest because it included both the successful observations and the limit they had learned to correct.`,
  ].join("\n\n");
}

function informationText(config: Phase4SourceConfig["information"]): string {
  const [first, second, third] = config.process;
  return [
    `${config.title}\n\n${config.subject} can look simple when viewed from a distance, but it depends on connected parts and changing conditions. A useful explanation follows material, energy, or information through the system rather than naming only what is visible at the end.`,
    `The process begins when ${first}. At this stage, location and timing matter. A small change may not stop the process, but it can change what happens later. Scientists and engineers therefore measure the starting condition before comparing a new design or a later result.`,
    `Next, ${second}. This middle stage connects the beginning to the outcome. The article uses the term ${config.term}. Here, ${config.term} means ${config.termMeaning}. The term describes a relationship within this system, not every possible meaning the word may have in another context.`,
    `Finally, ${third}. The result can be measured in more than one way. A team might record distance, time, temperature, amount, or repeated observations. One measurement gives a position at one moment; repeated measurements can show whether a pattern continues.`,
    `${config.benefit} That benefit explains why communities or researchers may choose the approach. However, ${config.limitation} A complete decision includes the tradeoff instead of treating the benefit as proof that one design works everywhere.`,
    `A fair comparison begins with a baseline. Researchers mark locations, describe the equipment, and record conditions before a change. Later measurements should use the same units and comparable locations. If weather, maintenance, or another condition changes, the report should name it so readers do not mistake two different situations for a controlled comparison.`,
    `The comparison in the article is ${config.comparison}. The comparison helps a reader picture how parts connect, but it is not exact in every detail. Models and comparisons simplify a system so that one relationship is easier to understand.`,
    `Diagrams can add another kind of information. Arrows may show direction, labels may identify parts, and a cross section may reveal something hidden from the surface. A diagram should be read with the text: the picture shows where parts are located, while the paragraphs explain why their relationship matters.`,
    `Conditions also vary by place. Soil, water, weather, available space, maintenance, and nearby structures can change the result. A solution tested in one location should be measured again before it is expanded. Adjusting a plan is evidence of careful use, not evidence that the original goal was unimportant.`,
    `Long-term monitoring asks different questions from a short demonstration. A brief test may show that a mechanism can work. Months or years of records can show repair needs, seasonal changes, and effects that were too rare to appear at first. Both kinds of evidence are useful when their limits are stated clearly.`,
    `People who live or work near the system may contribute observations that instruments do not explain by themselves. Their reports can identify a time, place, sound, blockage, or maintenance problem for closer study. A report becomes stronger when it can be checked against a measurement or repeated observation.`,
    `Access and safety are part of performance, not separate decorations. A design that improves one average but blocks a route, creates a hazard, or leaves some users without the intended service has not fully met its goal. Evaluation should therefore include required conditions as well as the most visible benefit.`,
    `The central idea is that ${config.subject} works through linked stages and must be evaluated with both benefits and limits in view. The process is useful when people understand what each stage does, measure the outcome, and revise the design when local evidence calls for a change.`,
  ].join("\n\n");
}

function experimentText(config: Phase4SourceConfig["listening"][0]): string {
  return [
    `Listen to or read this presentation about ${config.subject}. The investigation begins with one focused question: ${config.question}`,
    `The team builds two versions that are alike except for ${config.changedVariable}. That difference is the changed variable. To make the comparison fair, the team keeps ${config.controls[0]} and ${config.controls[1]} the same. If those conditions changed too, the result would not show which difference mattered.`,
    `Before testing, the team marks a starting line and chooses the same measuring tool for every trial. The first trial records ${config.measurements[0]}. The second records ${config.measurements[1]}. A third trial records ${config.measurements[2]}. The students write every result, including one that does not match the first two.`,
    `Instead of erasing the unusual result, they check the setup. They find that one clip had shifted. They restore the marked position and repeat that trial. This step does not guarantee a preferred answer; it makes the test conditions match the plan.`,
    `The repeated results support this conclusion: ${config.conclusion} The conclusion is limited to the model, materials, and conditions that were tested. It should not be stretched into a claim about every full-size system.`,
    `One important limitation is that ${config.limitation} A stronger investigation could add more trials or test another condition while still changing only one planned variable at a time.`,
    `The main lesson is not that one model wins forever. A fair comparison controls conditions, records measurements, repeats trials, and states what the evidence can and cannot show.`,
  ].join("\n\n");
}

function processText(config: Phase4SourceConfig["listening"][1]): string {
  return [
    `Listen to or read this explanation of ${config.subject}. The process is easiest to understand as three connected stages, but the stages can repeat or change when conditions change.`,
    `First, ${config.stages[0]}. This stage sets the direction or starting condition. A single observation can show what is happening at that moment, but it cannot establish how long the condition has lasted.`,
    `Second, ${config.stages[1]}. Material, energy, or information moves through the system. Obstacles and local conditions can speed, slow, or redirect that movement.`,
    `Third, ${config.stages[2]}. The result becomes visible or measurable. The location of the measurement matters because two points in the same system may not change in exactly the same way.`,
    `Researchers use evidence such as ${config.evidence[0]} and ${config.evidence[1]}. Those sources complement each other: one can show a measured pattern while the other explains the conditions surrounding it.`,
    `Measurements must use a stable reference. A marked point, repeated route, consistent unit, or timed observation lets researchers compare results that were collected on different days. Without a shared reference, an apparent change might come from moving the measuring location rather than from the process itself.`,
    `Researchers also record unusual conditions. A storm, moved object, equipment problem, or missed observation can explain why one result differs. They do not automatically discard that result; they label it and decide whether another measurement is needed.`,
    `The evidence supports the conclusion that ${config.conclusion} However, ${config.limitation} Repeated measurements help separate a lasting pattern from one unusual event.`,
    `A careful explanation therefore connects the stages, identifies the evidence, and states the limit. That is more useful than a claim based on one picture, one day, or one location.`,
  ].join("\n\n");
}

function ptText(config: Phase4SourceConfig["pt"]): string {
  const [requirementA, requirementB, requirementC] = config.requirements;
  return [
    `Source 1: Understanding the Choice\n\n${config.explanationFocus} A useful plan begins by naming the goal, the people or places affected, and the evidence that will show whether the change works. A benefit measured in one way does not automatically prove that every other condition improved. Designers need measurements connected to the actual purpose of the change.\n\nA pilot can compare current conditions with one or more proposed approaches. Measurements should be taken at the same marked locations or during comparable time periods. Observers should record unexpected outcomes instead of removing them. If a setting is adjusted during the pilot, the report should state what changed and why.\n\nCosts include more than the purchase price. Installation, training, inspection, repair, replacement, storage, and staff time can affect whether a plan continues to work. A choice that saves one resource may require more of another. The strongest proposal explains the tradeoff and identifies how it will be monitored.\n\nThe people who use a place can notice problems that one measurement misses. Their reports are important evidence, but a report should be checked at the named time and location when possible. Combining measurements, direct observations, and user reports gives the planning team a fuller picture than relying on any one source alone.\n\nAverages also need context. If most locations improve but one required location fails, the average does not erase that failure. Results should be separated by location, time, or user group when those differences could change the decision. A strong report explains both the overall pattern and any important exception.`,
    `Source 2: Requirements That Every Plan Must Meet\n\nThe planning group listed three requirements. First, ${requirementA} Second, ${requirementB} Third, ${requirementC}\n\nThese requirements are obligations, not optional advantages to trade away. A plan that produces a useful average but fails a required access or safety check needs revision before expansion. Different locations may use different settings if all locations still meet the shared requirements.\n\nImplementation should be phased so the current service remains available while new work is inspected. People need a clear way to report a problem, and reports should be checked with direct observation or measurement. Public information should explain what is being tested, what counts as success, and what would cause the plan to change or stop.\n\nA schedule should identify who performs inspections and how quickly a failed requirement will be corrected. The budget should reserve resources for maintenance rather than using the entire amount for installation. If a required route, service, or safety feature is unavailable, the older working arrangement should remain until the replacement passes inspection.\n\nThe group should publish a review date and keep the original measurements. That allows later results to be compared with the same baseline. It also prevents a temporary improvement from being treated as permanent before repair records, seasonal conditions, and user reports have been examined.`,
    `Source 3: Local Pilot Evidence\n\nThe pilot covered ${config.pilot.scope}. The report found that ${config.pilot.resultA} It also found that ${config.pilot.resultB}\n\nThe result was not entirely positive. ${config.pilot.concern} The team investigated the concern rather than averaging it away. In some locations an adjustment improved the result; in others the group recommended more testing before expansion.\n\nThe pilot has an important limit: ${config.pilot.limitation} The evidence describes the tested places and period. It does not prove the same result for every location or season. Still, the measurements identify which parts of the idea deserve expansion, revision, or another comparison.\n\nThe team separated results by location instead of reporting only one average. That choice revealed where the proposal met requirements and where a local adjustment was necessary. It also prevented a strong result in one area from hiding a failure in another.\n\nParticipants were invited to describe both benefits and problems. Their reports were compared with the time and place of direct observations. Some reports confirmed a measured issue, while others described preferences rather than a failed requirement. The team kept both kinds of information but labeled them differently.\n\nThe planning group can reasonably support the proposal, oppose it, or recommend a conditional phase. A defensible recommendation must use accurate evidence from more than one source, address a competing result or limitation, and keep every required condition in the plan.`,
  ].join("\n\n");
}

const configs: Phase4SourceConfig[] = [
  {
    testNumber: 6, difficulty: "easy",
    literary: { title: "The Measure in the Music Box", character: "Mara", partner: "Eli", setting: "the school music room", task: "measure and label the repeating notes made by a hand-built music box", mistake: "a paper strip slipped one notch, so the notes and timing marks no longer lined up", preservedEvidence: "The old mark showed exactly where the strip had shifted.", revision: "They replaced one vague arrow with numbered positions and a separate repeat symbol.", word: "aligned", wordMeaning: "placed so matching parts line up", theme: "Careful learners improve a system by preserving and examining conflicting evidence." },
    information: { title: "How Seeds Travel Without a Map", subject: "seed movement", process: ["a seed separates from its parent plant", "wind, water, animals, or gravity carries it", "the seed reaches a place where it may begin growing"], term: "dispersal", termMeaning: "the spreading of seeds away from the parent plant", benefit: "Moving away can reduce competition for light, water, and space.", limitation: "many seeds land where conditions do not support growth.", comparison: "like sending many small travelers along different routes instead of placing them all at one crowded stop" },
    listening: [
      { title: "Building a Paper Bridge", subject: "a fair paper-bridge test", question: "Does folding the paper into ridges change how many counters the bridge can hold?", changedVariable: "the paper's shape", controls: ["the paper size", "the distance between the supports"], measurements: ["a flat bridge holding 6 counters", "a ridged bridge holding 19 counters", "a repeated ridged trial holding 18 counters"], conclusion: "the ridged shape supported more counters in this model", limitation: "paper bridges do not represent every material or full-size bridge connection" },
      { title: "Why Morning Dew Forms", subject: "morning dew", stages: ["air near the ground cools overnight", "water vapor reaches a cool surface", "vapor changes into tiny liquid drops"], evidence: ["temperature readings beside the grass", "drop observations before and after sunrise"], conclusion: "cool surfaces can cause water vapor to condense even when it has not rained", limitation: "one morning does not describe every season or surface" },
    ],
    pt: { title: "Should the School Create a Quiet Reading Courtyard?", issue: "a quiet reading courtyard", explanationFocus: "Outdoor reading spaces can offer fresh air and a different place to read, but the design must support actual reading rather than simply move students outside.", requirements: ["the route and seating must be accessible to students with different mobility needs.", "shade, supervision, and safe temperatures must be maintained.", "indoor reading space must remain available when weather or noise makes the courtyard unsuitable."], pilot: { scope: "one shaded patio used by two classes for six weeks", resultA: "students stayed on reading tasks for a slightly larger share of the period outdoors.", resultB: "most students reported that the new setting felt comfortable.", concern: "Noise from deliveries interrupted three sessions, and two tables could not be reached by the widest mobility device until furniture was moved.", limitation: "six weeks with two classes does not show year-round use, maintenance cost, or results for every reader." }, table: { rowHeader: "Measure", columns: ["Indoor comparison", "Courtyard pilot"], rows: [{ label: "Average on-task share", values: ["78%", "84%"] }, { label: "Interrupted sessions", values: [1, 3] }, { label: "Accessible tables after adjustment", values: ["6 of 6", "6 of 6"] }] } },
    research: ["school compost systems", "local bird-safe window designs", "ways libraries protect old books"],
    writingContexts: ["a rehearsal schedule", "a recycling explanation", "a shared art-supply rule", "a measured plant comparison", "a sentence about a collection of maps", "dialogue during a club meeting"],
  },
  {
    testNumber: 7, difficulty: "easy",
    literary: { title: "A Map in the Margins", character: "Noah", partner: "Priya", setting: "the neighborhood library", task: "follow handwritten clues that locate books for a history display", mistake: "one arrow in the margin pointed toward the old shelf layout instead of the new one", preservedEvidence: "The uncrossed arrow proved the clue had been written before the shelves moved.", revision: "They added shelf numbers, dates, and a box for noting when a location had changed.", word: "current", wordMeaning: "accurate for the present arrangement", theme: "A useful map must be tested against the place it describes and revised when conditions change." },
    information: { title: "How Coral Builders Shape a Reef", subject: "coral reef growth", process: ["tiny coral animals build hard cups around themselves", "new generations grow on older structures", "many structures form shelter and uneven surfaces"], term: "colony", termMeaning: "many connected coral animals living together", benefit: "The growing structure creates habitat for many organisms.", limitation: "warming water, pollution, and physical damage can slow growth or harm living coral.", comparison: "like a neighborhood built gradually on strong foundations left by earlier builders" },
    listening: [
      { title: "Making a Shadow Clock", subject: "a model shadow clock", question: "Do shadow positions change predictably when they are recorded from the same marker?", changedVariable: "the time of observation", controls: ["the marker location", "the measuring direction"], measurements: ["a long westward shadow in the morning", "a shorter shadow near midday", "a longer eastward shadow later"], conclusion: "the marked shadow position changed in an ordered pattern during the test day", limitation: "clouds, season, and location can change the pattern or its visibility" },
      { title: "Why Rivers Curve", subject: "the development of river bends", stages: ["water moves faster along the outside of a bend", "the faster water removes more soil there", "slower water deposits material along the inside"], evidence: ["repeated bank measurements", "aerial images taken in different years"], conclusion: "erosion and deposition can slowly shift a river bend", limitation: "one photograph cannot show the direction or rate of long-term movement" },
    ],
    pt: { title: "Should the Park Add a Community Art Wall?", issue: "a community art wall", explanationFocus: "A public art wall can provide a legal place for changing artwork and community messages, but it needs a clear purpose, fair access, and regular care.", requirements: ["paths and painting areas must be physically accessible.", "materials and supervision must meet health and safety rules.", "the process for selecting space and scheduling groups must be transparent and fair."], pilot: { scope: "one temporary panel used during eight supervised Saturdays", resultA: "all scheduled groups completed a section and cleanup time fell after storage labels were added.", resultB: "visitors reported more interest in returning to see new work.", concern: "Two nearby residents reported early-morning noise, and one group lacked enough low work surfaces.", limitation: "a temporary panel over eight Saturdays does not establish yearly cost, weather damage, or neighborhood response." }, table: { rowHeader: "Pilot measure", columns: ["First four Saturdays", "Last four Saturdays"], rows: [{ label: "Average cleanup minutes", values: [31, 18] }, { label: "Scheduled groups completing work", values: ["4 of 4", "4 of 4"] }, { label: "Access problems reported", values: [2, 0] }] } },
    research: ["reef restoration methods", "safe bicycle-route planning", "how museums label replicas"],
    writingContexts: ["a library search narrative", "an explanation of erosion", "a park-equipment opinion", "an exact distance comparison", "agreement with neither/nor", "punctuation in an announcement"],
  },
  {
    testNumber: 8, difficulty: "medium",
    literary: { title: "The Lantern Code", character: "Imani", partner: "Seth", setting: "a historic rail-station exhibit", task: "demonstrate a lantern code from opposite ends of a long platform", mistake: "light reflected from a glass case and made one steady signal look like two flashes", preservedEvidence: "The recorded time and reflection note separated the real signal from the extra glint.", revision: "They combined flash number with lantern height so each message carried two clues.", word: "ambiguous", wordMeaning: "open to more than one reasonable interpretation", theme: "When evidence supports two explanations, redesigning the message is stronger than defending an assumption." },
    information: { title: "How a Canal Lock Lifts a Boat", subject: "canal-lock operation", process: ["gates close around a boat in a chamber", "valves let water enter or leave the chamber", "the water level matches the next section and the opposite gate opens"], term: "chamber", termMeaning: "the enclosed space where the water level changes", benefit: "Locks let boats travel between waterways at different elevations without a steep channel.", limitation: "operation takes time and depends on maintained gates, valves, and water supply.", comparison: "like a water elevator whose platform is the surface beneath the boat" },
    listening: [
      { title: "Testing a Wetland Model", subject: "a tabletop wetland model", question: "Does a planted sponge zone change how quickly muddy water reaches the outlet?", changedVariable: "the presence of the sponge-and-stem zone", controls: ["the tray slope", "the poured water amount"], measurements: ["clear tray runoff reaching the outlet in 18 seconds", "wetland-model runoff reaching it in 43 seconds", "a repeat wetland trial reaching it in 41 seconds"], conclusion: "the model zone slowed the water and trapped some visible sediment", limitation: "a tray cannot represent every wetland soil, plant, storm, or watershed" },
      { title: "What Tree Rings Record", subject: "tree-ring evidence", stages: ["a tree adds new wood during a growing season", "growth conditions influence ring width and structure", "researchers compare patterns across many trees and years"], evidence: ["measured ring widths", "weather records from overlapping years"], conclusion: "ring patterns can contribute evidence about past growing conditions", limitation: "one tree or one narrow ring does not identify a single cause by itself" },
    ],
    pt: { title: "How Should the Library Use Flexible Spaces?", issue: "flexible library spaces", explanationFocus: "Movable furniture and reservable areas can support reading, tutoring, making, and meetings, but flexibility works only when quiet access and clear schedules remain available.", requirements: ["at least one quiet route and reading area must remain open.", "furniture arrangements must preserve accessible widths and safe exits.", "reservation rules must give different age groups and unscheduled visitors fair access."], pilot: { scope: "two rooms rearranged for ten weeks with six furniture layouts", resultA: "scheduled group use increased while total visitor counts stayed similar.", resultB: "sound readings stayed within the target in the protected quiet area during most sessions.", concern: "Three crowded layouts narrowed a route, and evening users reported that the reservation board was difficult to understand.", limitation: "ten weeks did not include summer programs, long-term furniture repair, or every type of event." }, table: { rowHeader: "Measure", columns: ["Before pilot", "During pilot"], rows: [{ label: "Weekly scheduled groups", values: [11, 19] }, { label: "Quiet-area sound target met", values: ["8 of 10 checks", "17 of 20 checks"] }, { label: "Layouts passing access check", values: ["2 of 2", "3 of 6 initially; 6 of 6 after revision"] }] } },
    research: ["canal water conservation", "camera traps used in wildlife studies", "materials that reduce room echoes"],
    writingContexts: ["a lantern demonstration narrative", "a wetland cause-and-effect explanation", "a library-space claim", "a precise sound comparison", "agreement with a list of furniture", "punctuating directions and dialogue"],
  },
  {
    testNumber: 9, difficulty: "hard",
    literary: { title: "The Route with Two Endings", character: "Talia", partner: "Marcus", setting: "a museum preparation room", task: "test two written routes for moving a replica safely to a temporary gallery", mistake: "a temporary barrier changed one corridor after the route sheets were printed", preservedEvidence: "The time stamps showed that both teams had followed accurate but differently dated instructions.", revision: "They added version numbers, decision points, and a required check before the route divided.", word: "valid", wordMeaning: "supported by the conditions and evidence available at that time", theme: "Competing records can both be reasonable until new evidence reveals which conditions each one describes." },
    information: { title: "Cooling a City Block", subject: "neighborhood heat reduction", process: ["sunlight reaches roofs, pavement, trees, and walls", "surfaces absorb or reflect different amounts of energy", "shade, air movement, and stored heat affect nearby temperatures over time"], term: "baseline", termMeaning: "a starting measurement used for later comparison", benefit: "Shade trees, reflective surfaces, and carefully placed structures can reduce heat exposure in selected locations.", limitation: "one method may shift maintenance, water, glare, cost, or access problems to another part of the block.", comparison: "like adjusting several connected dials rather than flipping one switch for the whole neighborhood" },
    listening: [
      { title: "Testing a Flood-Barrier Model", subject: "a modular flood-barrier model", question: "Do overlapping joints change leakage when water depth and test time stay constant?", changedVariable: "the joint arrangement", controls: ["the water depth", "the two-minute test period"], measurements: ["straight joints leaking 240 milliliters", "overlapping joints leaking 85 milliliters", "a repeated overlapping trial leaking 91 milliliters"], conclusion: "overlapping joints reduced leakage in the tested model", limitation: "the model does not include full-size ground movement, debris, installation errors, or long storms" },
      { title: "How Bees Find Their Way Home", subject: "bee navigation evidence", stages: ["a bee observes patterns around the nest", "it combines visual cues with light direction and movement information", "it adjusts the return path when wind or landmarks change"], evidence: ["tracked flight paths after a landmark moved", "comparisons under clear and cloudy conditions"], conclusion: "bees use more than one source of information while navigating", limitation: "a change in one flight does not prove that every bee weighs each cue the same way" },
    ],
    pt: { title: "Should the Town Build a Pocket Park?", issue: "a pocket park", explanationFocus: "A small park can add shade, seating, habitat, and a gathering place on a limited site, but the design must account for access, water, maintenance, and nearby uses.", requirements: ["entrances, routes, and seating must meet access requirements.", "the design must maintain sight lines, safe lighting, and emergency access.", "the budget must include water, plant replacement, cleaning, and long-term repair."], pilot: { scope: "a temporary block installation observed for twelve weeks across warm and cool periods", resultA: "midday surface temperature under the shade structure averaged lower than the uncovered comparison point.", resultB: "pedestrian counts increased during lunch hours without blocking the required clear route.", concern: "Water use exceeded the first estimate, and two evening observations found glare aimed toward an apartment window.", limitation: "a temporary installation cannot establish mature-tree shade, yearly maintenance, or long-term neighborhood use." }, table: { rowHeader: "Pilot measure", columns: ["Comparison area", "Temporary park"], rows: [{ label: "Average midday surface temperature", values: ["42°C", "34°C under shade"] }, { label: "Lunch-hour visitors", values: [18, 41] }, { label: "Weeks meeting water target", values: ["12 of 12", "7 of 12"] }] } },
    research: ["cool-pavement studies", "museum vibration controls", "methods for measuring urban tree shade"],
    writingContexts: ["a route-conflict narrative", "an urban-heat explanation", "a museum-access opinion", "a qualified temperature comparison", "agreement with either/or subjects", "punctuation in a technical interview"],
  },
  {
    testNumber: 10, difficulty: "hard",
    literary: { title: "The Echo Between Stations", character: "Owen", partner: "Leila", setting: "a community radio practice studio", task: "coordinate a timed sound demonstration from two separated booths", mistake: "a delayed monitor returned one signal after the next cue had already begun", preservedEvidence: "The waveform and cue log showed the original sound and its delayed return as separate events.", revision: "They replaced one spoken cue with a numbered visual card and recorded the monitor delay before each trial.", word: "synchronized", wordMeaning: "matched in timing according to the same reference", theme: "Reliable coordination requires a shared reference and a way to identify delay rather than blame it on attention." },
    information: { title: "Helping Fish Pass a Dam", subject: "fish-passage design", process: ["moving fish encounter a barrier or changed current", "a bypass route offers a sequence of manageable water conditions", "monitoring shows where fish enter, pause, exit, or turn back"], term: "gradient", termMeaning: "the amount of rise over a horizontal distance", benefit: "A well-designed passage can reconnect habitat while the dam continues serving its planned purpose.", limitation: "species, season, water level, entrance location, maintenance, and predators can change how well one design works.", comparison: "like replacing one very tall step with a route of shorter steps and resting places" },
    listening: [
      { title: "Measuring a Melting-Ice Model", subject: "a melting-ice comparison", question: "Does placing ice on a dark or light surface change measured melting under the same lamp?", changedVariable: "the surface color beneath the ice", controls: ["the ice mass", "the lamp distance"], measurements: ["dark-surface ice losing 18 grams", "light-surface ice losing 11 grams", "a repeated pair losing 17 and 12 grams"], conclusion: "the dark surface was associated with more melting in this model", limitation: "a lamp, tray, and small ice pieces do not represent the atmosphere, ocean, or every outdoor condition" },
      { title: "How Sound Changes in a Room", subject: "room acoustics", stages: ["a source creates vibrations that travel through air", "sound reaches walls, floors, objects, and listeners", "reflected and absorbed energy changes what arrives later"], evidence: ["measured echo time before and after panels", "listener reports from the same marked seats"], conclusion: "surface materials and room shape influence clarity and echo", limitation: "one seat or one sound level cannot describe the experience throughout the room" },
    ],
    pt: { title: "Should the School Use Reusable Food Containers?", issue: "reusable food containers", explanationFocus: "Reusable containers can reduce discarded packaging, but their full effect depends on washing, return rates, replacement, food safety, and the resources used to operate the system.", requirements: ["food-safety temperatures and cleaning checks must be documented.", "students who cannot pay deposits or return a container immediately must still receive equal meal access.", "water, energy, labor, storage, transport, and replacement must be included in cost and resource estimates."], pilot: { scope: "three lunch periods over fourteen weeks using 420 numbered containers", resultA: "discarded single-use packages fell substantially during pilot days.", resultB: "the return rate improved after collection bins were moved beside tray-return stations.", concern: "Washing used more hot water than forecast, and 36 containers were lost or too damaged to reuse.", limitation: "fourteen weeks did not include a full school year, summer storage, equipment replacement, or every menu type." }, table: { rowHeader: "Pilot measure", columns: ["First 7 weeks", "Second 7 weeks"], rows: [{ label: "Container return rate", values: ["86%", "95%"] }, { label: "Single-use packages per day", values: [620, 170] }, { label: "Hot-water use versus forecast", values: ["18% above", "11% above"] }] } },
    research: ["fish-passage monitoring", "life-cycle studies of reusable containers", "sound-panel testing methods"],
    writingContexts: ["a delayed-signal narrative", "an acoustics explanation", "a reusable-system opinion", "a qualified energy comparison", "agreement with collective nouns", "punctuating a source-based quotation"],
  },
];

export const grade4Phase4Sources = configs.map((config) => ({
  ...config,
  literaryText: literaryText(config.literary),
  informationText: informationText(config.information),
  listeningTexts: [experimentText(config.listening[0]), processText(config.listening[1])] as [string, string],
  ptText: ptText(config.pt),
}));
