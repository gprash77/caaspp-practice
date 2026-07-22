import type { Question } from "./questions";

const BANK_VERSION = "2026-07-22.1";
type Item = Omit<Question, "grade" | "subject" | "practiceTest" | "provenance">;

const waterTable = {rowHeader:"Component",columns:["Main purpose"],rows:[{label:"Pump",values:["Moves treated water up into the tank"]},{label:"Elevated tank",values:["Stores water and helps create pressure"]},{label:"Distribution pipes",values:["Carry water toward buildings"]},{label:"Valves and sensors",values:["Control flow and report changing conditions"]}]};
const newsTable = {rowHeader:"Measure",columns:["First 3 months","Most recent 3 months"],rows:[{label:"Published programs",values:[6,10]},{label:"Student team members",values:[12,21]},{label:"Programs posted late",values:[1,3]},{label:"Weekly adult review hours",values:[2,5]}]};

function sourceId(value: Item): string {
  if (value.testType === "pt") return "g4-t3-ela-pt-student-news";
  if (value.id <= 45007) return "g4-t3-ela-literary-extra-stitch";
  if (value.id <= 45015) return "g4-t3-ela-informational-water-tower";
  if (value.id <= 45021) return `g4-t3-ela-writing-${value.id}`;
  if (value.id <= 45024) return "g4-t3-ela-listening-cotton-cloth";
  if (value.id <= 45027) return "g4-t3-ela-listening-map-symbols";
  return `g4-t3-ela-research-${value.id}`;
}

function item(value: Item): Question {
  const dataTable = value.dataTable ?? (value.id >= 45008 && value.id <= 45015 ? waterTable : value.testType === "pt" ? newsTable : undefined);
  return {
    ...value,
    ...(dataTable ? { dataTable } : {}),
    grade: 4,
    subject: "ela",
    practiceTest: 3,
    provenance: {sourceId:sourceId(value),origin:"original",author:"CAASPP Practice Project",license:"Original companion content; all rights reserved for this project.",reviewedAt:"2026-07-22"},
  };
}

const options = (texts: string[]) => texts.map((text, index) => ({ label: "ABCDEF"[index], text }));

const extraStitch = `**The Extra Stitch**

Maya pressed the blue fabric flat with both palms. Across the community-center worktable, twelve bright squares waited to become a banner for the neighborhood festival. Some squares showed painted flowers or buildings. Others held stitched words. Maya's square showed a silver river curving beneath a yellow sun.

Ms. Chen, who led the Saturday sewing group, had already joined the first two rows. “Today we connect the last row and add the border,” she said. “Check your pins before you sew. Slow preparation saves time later.”

Maya nodded, though she was thinking about the festival display. The finished banner would hang above the center's front desk. Everyone who entered would see it—including Maya's cousin Lena, who could sew a straight line without even drawing a guide.

Jamal carried the last row to Maya's machine. “You sew this end, and I'll sew the other,” he suggested. “Then we can meet in the middle.”

Maya placed two fabric edges together. She removed the first pin, lowered the machine's presser foot, and touched the pedal. The needle began its quick tapping. At first, the seam followed the chalk line. Then someone dropped a metal box behind her. The clatter made Maya look over her shoulder.

Her hands kept moving.

When she looked back, the seam had drifted. It crossed the chalk line, bent toward the edge, and then returned. The crooked section was only as long as her thumb, but it pulled one blue square into a small wrinkle.

Maya stopped the machine. Jamal was trimming threads at the far end of the table. Ms. Chen was helping two younger students thread a needle. No one had noticed.

Maya rubbed the wrinkle. Perhaps the border would cover it. She folded the fabric over the crooked seam and held it up. From across the room, the banner probably looked fine. She took three extra stitches over the loose end and carried the row to the pressing board.

“Ready to join it?” Jamal asked.

“Ready,” Maya said too quickly.

They pinned the last row beneath the others. As Jamal matched the corners, he reached Maya's blue square. “This corner won't lie flat.”

“The cloth is probably stretched,” Maya said.

Jamal smoothed the square, then turned the row over. His finger followed the crooked seam. He did not sound accusing. “This part wandered off the guide.”

Heat crept into Maya's face. The mistake tugged at her thoughts like a loose thread. If she admitted hiding it, Jamal might think she could not handle the machine. If they removed the seam, the group might finish late.

“The border will hide most of it,” Maya said.

Jamal studied the wrinkle. “It might hide the stitches, but it won't make the fabric flat. We should ask Ms. Chen.”

Maya pictured Lena looking up at the finished banner. A bent square would be visible beside eleven smooth ones. Worse, Maya would know she had passed the problem to everyone else.

Before she could answer, Ms. Chen came over. Maya expected a disappointed frown. Instead, Ms. Chen turned the row to the back and examined the thread.

“Good news,” she said. “You used a long practice stitch, so it can be removed without hurting the fabric.”

“I noticed it earlier,” Maya admitted. “I thought the border might cover it.”

Ms. Chen set a small seam ripper on the table. “Covering and correcting are different jobs. Which one does this seam need?”

“Correcting,” Maya said.

Jamal pulled a chair beside hers. Ms. Chen showed them how to slide the seam ripper under every fourth stitch from the back. They snipped those threads, then turned the cloth over and lifted the uncut thread in one long piece. The extra stitches Maya had added were tighter. Removing them took patience. She held the cloth loose so the tool would not cut it while Jamal used tweezers to pick out short threads.

One clipped thread unraveled between Maya's fingers, separating into several finer strands before she brushed them into the scrap bowl.

The work felt slower than sewing, but it revealed a pattern. Each removed stitch released a little tension. The wrinkle softened. Soon the blue square lay flat again, marked only by a faint chalk guide and tiny holes that closed when Ms. Chen pressed the fabric.

“Want me to sew the new seam?” Jamal asked.

Maya almost said yes. Then she looked at the cleaned edge. “Will you watch the guide from that side?”

They repinned the fabric. This time Maya checked that every corner matched before lowering the needle. Jamal stood where he could see the chalk line beyond the machine. He called “steady” when the fabric moved straight and “left a little” when Maya's hands began to drift.

The new seam was not perfectly straight. Near the middle, it wavered by the width of a pencil line. Yet the squares met evenly, and the fabric remained smooth.

When they attached the border, the group formed a long line to hold the banner off the floor. The silver river on Maya's square joined a green field on Jamal's square. From a few steps away, the separate pieces looked like one planned picture.

At the festival the next afternoon, Lena found Maya beneath the banner. “Which part did you make?” she asked.

Maya pointed to the blue square, then to the seam below it. “I made that seam twice.”

Lena looked closer. “Why twice?”

“The first one taught me where the second one needed to go.”

Jamal, standing nearby, grinned. “And it taught both of us how to remove a row of stitches.”

Maya ran one finger along the smooth border. A corrected mistake was still part of the work, even when no one else could see it. She no longer wished to hide the first seam. Without it, she would not have learned how careful hands—and honest teammates—could repair what rushing had bent.`;

const waterTower = `**Inside a Water Tower**

A water tower is easy to recognize from far away. A large tank stands high above the ground on thick legs or on top of a wide column. The tower may carry a town's name in letters large enough to read from a road. Its most important work, however, happens through pipes and changes in pressure that are mostly hidden from view.

![Five stages show a treatment plant, pump, elevated tank, distribution pipes, and buildings.](/images/grade-4/test-3/ela/water-tower-system.svg)

**Water Before the Tower**

Water does not enter a tower directly from a lake or river. It first travels to a treatment plant. There, workers and equipment remove unwanted material and make the water safe for the public system. Tests check the water before it moves onward.

Powerful pumps then push treated water through a pipe and up into the tower's tank. Moving water upward takes energy because the pump works against gravity. Many systems run pumps when electricity use is lower or when the tank needs refilling. Sensors report the water level so operators know when to start or stop a pump.

**Why Height Matters**

Once water is stored high above the ground, gravity helps move it downward. The weight of the elevated water creates pressure in the connected pipes. That pressure helps water flow from a faucet or fill a container even when the pump at the treatment plant is not running at that exact moment.

Think of the tank as a raised reserve cup connected to many smaller tubes. Water in the raised cup can move down through the tubes. A real water system is much larger and carefully controlled, but the comparison helps explain why elevation matters.

Height is not the only factor controlling pressure. Pipe size, changes in land height, valves, and distance also affect the system. Engineers choose tower height and equipment for the area the tower serves. A building on a hill may need different support from a building in a low area.

**Changing Demand During a Day**

In a water system, *demand* means how much water people and buildings are using. Demand often changes by time of day. Early in the morning, many people shower, prepare food, or start washing machines. Schools and businesses also begin using water. Demand may rise again in the evening.

When demand is high, water can leave the tower faster than pumps send new water into it. The level in the tank drops, and the stored supply helps the system meet the busy period. When demand is lower, pumps refill the tank. The tower does not create water. It stores treated water so supply and demand do not have to match every minute.

[[DATA_TABLE]]

The component-and-purpose table organizes four important parts of the system. Reading across a row connects each part with its main job, while the article explains how those jobs work together.

**More Than Everyday Use**

Stored water can also help during a short power interruption or equipment problem. Gravity may keep some water moving while workers respond. The amount and length of support depend on the tank level and the local system, so a tower is not an unlimited backup.

Fire protection is another reason communities store water. Firefighters may need a large amount quickly. A tower can provide part of that supply while pumps and other storage sources also operate. System planners estimate ordinary use and emergency needs when choosing tank size.

**Inspection and Care**

A tower must be inspected even though most people never enter it. Workers check the outside for rust, damaged coatings, loose parts, or signs of leaks. They inspect ladders, railings, vents, and openings that must remain secure. Inside inspections check surfaces that touch the water.

Cleaning and protective coatings help prevent damage. Crews may temporarily lower the water level or take a tank out of service. Operators then use other tanks, pumps, or planned connections to keep water moving. This is why backup plans matter: maintenance should not leave an entire area without service.

Sensors provide another kind of check. They can report water level, pressure, temperature, or whether a valve is open. An unusual reading does not explain a problem by itself, but it tells an operator where to investigate. People compare sensor information with direct inspection before deciding what action is needed.

Operators also keep records from day to day. A single low reading might come from planned cleaning, while a repeated change at the same hour may reveal a demand pattern. Comparing records helps workers separate an expected change from a condition that needs repair. The record is evidence for a decision, not a replacement for checking the equipment.

**From Tank to Tap**

Water leaving the tower enters distribution pipes. Large pipes branch into smaller ones, and service lines connect buildings to the system. Valves can close one section when workers repair a pipe. Meters record how much water enters many homes or businesses.

The diagram shows the main order: treatment plant, pump, elevated tank, distribution pipes, and buildings. Water may move through a complex network rather than one straight line, but each stage has a clear role. Pumps lift water, the tower stores it high, gravity supports pressure, and pipes guide it toward users.

A water tower is therefore both a container and a working part of a larger system. Its height turns stored water into useful pressure. Its tank helps balance busy and quiet times. Regular inspection, sensors, and backup plans help the system keep doing a job that is noticed most when a faucet is opened.`;

const cottonPresentation = `Listen to the presentation. Then answer the questions.

**From Cotton Fiber to Cloth**

A cotton shirt begins as thousands of soft fibers around seeds inside a cotton boll. Turning those loose fibers into cloth requires several different jobs. Today I will follow the main sequence from harvested cotton to woven fabric.

After cotton bolls open, machines or workers collect them. The harvested material contains fiber, seeds, and small pieces of leaves or stems. At a cotton gin, rotating equipment separates most seeds and plant pieces from the useful fiber. The cleaned fiber is pressed into large bundles so it can be moved to a mill.

At the mill, the bundles are opened. The fibers are still tangled and point in many directions. Carding machines comb and separate them, arranging many fibers in the same general direction. Carding also removes some remaining bits that do not belong. The result is a soft, loose rope of fiber called a sliver.

The sliver is not strong enough to use as thread. During spinning, machines draw the fibers into a thinner strand and twist them together. Twisting matters because short fibers grip one another when they wind around the strand. A loose group can pull apart, while properly twisted yarn can be wound, carried, and used by another machine.

I will repeat the two preparation jobs: carding combs and lines up loose fibers; spinning draws and twists those fibers into yarn. Carding prepares the fibers for spinning, and spinning makes the continuous yarn needed for cloth.

Next, many yarns are arranged on a loom. One group stretches lengthwise and stays under tension. Another yarn passes over and under those lengthwise yarns. This crossing pattern is weaving. Different over-and-under patterns can change the fabric's appearance and strength.

The woven fabric may then be washed, colored, printed, or finished so it has the needed feel. Inspectors look for broken yarns, stains, or uneven places. Finally, the cloth is rolled, cut into pattern pieces, and sewn into products.

Not every cotton product follows exactly the same machines or finish. A towel needs loops that absorb water, while a smooth shirt fabric needs a different surface. Some yarn may also be knitted into connected loops instead of woven across straight yarns.

The important conclusion is that careful preparation affects later strength and evenness. If seeds remain, if fibers are not lined up, or if yarn has uneven twist, later machines cannot simply hide every problem. Each stage prepares material for the next: separate, card, spin, weave or knit, finish, cut, and sew. A soft boll becomes useful cloth through an ordered chain of changes.`;

const mapPresentation = `Listen to the presentation. Then answer the questions.

**Mapping a Neighborhood with Symbols**

A neighborhood map turns real streets and places into a smaller drawing. Because the paper cannot show every tree, doorway, or bench at its real size, mapmakers choose symbols, a legend, and a scale. I will explain how those tools help a reader.

First, a symbol is a simple mark that stands for something in the real place. A green tree shape can stand for a park. Two dark lines crossing a blue band can stand for a bridge over water. A small building with a flag can stand for a school.

Here are those three pairings again. A green tree means park: green tree, park. A double line across blue water means bridge: lines across water, bridge. A small building with a flag means school: building with flag, school.

Symbols save space, but a reader should not have to guess what they mean. A legend, sometimes called a key, lists the symbols and their meanings. If two maps use different marks for a park, each map's legend explains its own choice. The legend makes the symbol system consistent for that map.

Direction is another tool. Many maps place north near the top and include a north arrow. A reader can then describe the library as east of the park or the school as south of the bridge. The arrow is more reliable than assuming the top always means north.

Scale connects map distance with real distance. Suppose one inch on a map represents four blocks. A route measuring two inches on the page represents eight blocks in the neighborhood. The streets are not actually squeezed together; the scale tells how much the real place has been reduced.

A useful map must also leave room for labels. If symbols overlap or every small object is drawn, important paths become hard to follow. Mapmakers decide which details fit the map's purpose. A walking-route map might show sidewalks and crossings, while a bus map might emphasize stops and major roads.

Imagine that a new footbridge opens. The mapmaker should add the bridge symbol at the correct location, update any route that uses it, and check that the legend still explains the mark. If the printed area changes, the scale may also need review.

The most important conclusion is that map tools work together. Symbols represent places, the legend explains symbols, the north arrow supports direction, and scale connects paper distance to real distance. A reader who checks all four can understand a small drawing as information about a much larger neighborhood.`;

export const grade4Test3ElaCat: Question[] = [
  item({id:45001,testType:"cat",claim:1,target:"1",dok:1,standard:"RL.4.1",type:"multiple-choice",passage:extraStitch,passageTitle:"The Extra Stitch",questionText:"Why does Maya first fold the fabric over the crooked seam?",options:options(["She plans to cut the blue square away.","She wants Jamal to sew the entire row.","She wants to test whether the border might hide it.","She is checking the color of the thread."]),correctAnswer:"C",rubric:"1 point: The student selects C.",points:1,explanation:"Maya hopes the border will cover the mistake, so she folds the fabric to test that idea."}),
  item({id:45002,testType:"cat",claim:1,target:"2",dok:2,standard:"RL.4.2",type:"multiple-choice",passage:extraStitch,passageTitle:"The Extra Stitch",questionText:"Which theme is best supported by “The Extra Stitch”?",options:options(["A hidden mistake always disappears with time.","Honest revision and teamwork can turn a mistake into useful learning.","People should avoid difficult crafts until they are experts.","Finishing first matters more than doing shared work carefully."]),correctAnswer:"B",rubric:"1 point: The student selects B.",points:1,explanation:"Maya admits the problem, works with Jamal to correct it, and learns from the process."}),
  item({id:45003,testType:"cat",claim:1,target:"3",dok:2,standard:"RL.4.4",type:"multiple-choice",passage:extraStitch,passageTitle:"The Extra Stitch",questionText:"What does *unraveled* most nearly mean as used in the story's sewing context?",options:options(["became brighter in color","was measured with a ruler","was displayed above a desk","became untwisted or came apart"]),correctAnswer:"D",rubric:"1 point: The student selects D.",points:1,explanation:"Thread that unravels comes apart or becomes untwisted."}),
  item({id:45004,testType:"cat",claim:1,target:"4",dok:3,standard:"RL.4.1",type:"two-part",passage:extraStitch,passageTitle:"The Extra Stitch",questionText:"Answer both parts about Maya after Jamal finds the crooked seam.",partAPrompt:"Part A: What can the reader infer about Maya?",partAOptions:options(["She is concerned about both her reputation and the group's work.","She believes Jamal caused the seam to bend.","She no longer wants the banner displayed.","She thinks Ms. Chen will cut away every blue square."]),partBPrompt:"Part B: Which detail best supports the inference?",partBOptions:options(["Jamal was trimming threads at the far end of the table.","Maya worries Jamal may doubt her and that the group may finish late.","The banner will hang over the front desk.","Ms. Chen places a seam ripper on the table."]),correctAnswer:["A","B"],rubric:"1 point: Both parts are correct.",points:1,explanation:"Maya's two worries concern how Jamal sees her and how fixing the seam may affect the group."}),
  item({id:45005,testType:"cat",claim:1,target:"5",dok:2,standard:"RL.4.3",type:"multi-select",selection:{min:2,max:2},passage:extraStitch,passageTitle:"The Extra Stitch",questionText:"Which two events most directly change Maya's plan to hide the crooked seam?",options:options(["Jamal points out that the wrinkle will remain under the border.","The metal box falls behind Maya.","Maya later notices that her silver river joins Jamal's green field.","Ms. Chen says the long stitch can be removed safely.","The festival begins the next afternoon."]),correctAnswer:["A","D"],scoringRule:{kind:"unordered-set",acceptedAnswers:["A","D"]},rubric:"1 point: The student selects A and D.",points:1,explanation:"Jamal explains why covering will not solve the problem, and Ms. Chen shows it can be corrected safely."}),
  item({id:45006,testType:"cat",claim:1,target:"6",dok:2,standard:"RL.4.5",type:"multiple-choice",passage:extraStitch,passageTitle:"The Extra Stitch",questionText:"Why does the author describe the seam-removal process step by step?",options:options(["to prove that removing stitches is faster than using a machine","to introduce a conflict about who owns the seam ripper","to explain the careful work that releases the wrinkle and changes Maya's thinking","to show why the festival must be delayed"]),correctAnswer:"C",rubric:"1 point: The student selects C.",points:1,explanation:"The detailed process connects the physical repair with Maya's growing willingness to correct the mistake."}),
  item({id:45007,testType:"cat",claim:1,target:"7",dok:2,standard:"L.4.5a",type:"two-part",passage:extraStitch,passageTitle:"The Extra Stitch",questionText:"Answer both parts about the comparison “The mistake tugged at her thoughts like a loose thread.”",partAPrompt:"Part A: What does the comparison suggest?",partAOptions:options(["Maya cannot stop noticing and worrying about the mistake.","The thread is physically tied around Maya's hand.","Maya wants to choose a different thread color.","The banner is too heavy for Maya to carry."]),partBPrompt:"Part B: What effect does the comparison create?",partBOptions:options(["It connects Maya's worry to the sewing problem she is hiding.","It proves the thread is too weak for the banner.","It changes the setting from the center to a factory.","It shows that Jamal is angry with Ms. Chen."]),correctAnswer:["A","A"],rubric:"1 point: Both parts are correct.",points:1,explanation:"A loose thread keeps pulling attention, just as the hidden seam keeps pulling at Maya's thoughts."}),

  item({id:45008,testType:"cat",claim:1,target:"8",dok:1,standard:"RI.4.1",type:"multiple-choice",passage:waterTower,passageTitle:"Inside a Water Tower",questionText:"According to the article, what is one main purpose of storing water high above the ground?",options:options(["to freeze water before it reaches buildings","to use gravity to help create pressure in pipes","to remove seeds and leaves from untreated water","to make every pipe in town the same size"]),correctAnswer:"B",rubric:"1 point: The student selects B.",points:1,explanation:"The article explains that the weight of elevated water helps create pressure."}),
  item({id:45009,testType:"cat",claim:1,target:"9",dok:2,standard:"RI.4.2",type:"multiple-choice",passage:waterTower,passageTitle:"Inside a Water Tower",questionText:"What is the main idea of “Inside a Water Tower”?",options:options(["Water towers decorate towns with large painted names.","A water tower stores treated water above ground so gravity, equipment, and careful maintenance can support a larger water system.","Every building receives water from one straight pipe.","A tower can supply unlimited water when other equipment stops."]),correctAnswer:"B",rubric:"1 point: The student selects B.",points:1,explanation:"The article connects storage and height with pressure, changing demand, distribution, and maintenance."}),
  item({id:45010,testType:"cat",claim:1,target:"10",dok:2,standard:"RI.4.4",type:"multiple-choice",passage:waterTower,passageTitle:"Inside a Water Tower",questionText:"What does *demand* mean in the section “Changing Demand During a Day”?",options:options(["the height of the tower above a road","the amount of water people and buildings are using","a coating placed on the outside of a tank","a test performed before water is treated"]),correctAnswer:"B",rubric:"1 point: The student selects B.",points:1,explanation:"The article directly defines demand as how much water people and buildings use."}),
  item({id:45011,testType:"cat",claim:1,target:"11",dok:3,standard:"RI.4.1",type:"two-part",passage:waterTower,passageTitle:"Inside a Water Tower",questionText:"Answer both parts about stored water and changing demand.",partAPrompt:"Part A: Which conclusion is best supported?",partAOptions:options(["Stored water helps the system handle busy periods when use rises quickly.","Pumps must stop whenever people begin using water.","The tower creates new water during the evening.","Demand remains exactly the same throughout a day."]),partBPrompt:"Part B: Which detail best supports the conclusion?",partBOptions:options(["A tower may carry a town's name.","During high demand, water can leave the tower faster than pumps send new water into it.","Meters record water entering many buildings.","Some towers stand on a wide column."]),correctAnswer:["A","B"],rubric:"1 point: Both parts are correct.",points:1,explanation:"The quoted detail directly explains how stored water supports a high-demand period."}),
  item({id:45012,testType:"cat",claim:1,target:"12",dok:3,standard:"RI.4.7",type:"multi-select",selection:{min:2,max:2},passage:waterTower,passageTitle:"Inside a Water Tower",questionText:"Which two statements are supported by both the system diagram and the article?",stimulusImages:[{src:"/images/grade-4/test-3/ela/water-tower-system.svg",alt:"Five stages: treatment plant, pump, elevated tank, distribution pipes, and buildings.",sha256:"dbdcb6ae74d8e429f1ca39ecd3b6155387ccc07fd17080784301b8509c747520"}],options:options(["Water is treated before a pump sends it toward the tower.","Buildings come before the treatment plant in the system order.","Distribution pipes carry water from the tower toward buildings.","The tower removes seeds from raw water.","Every building pumps water up into the tank."]),correctAnswer:["A","C"],scoringRule:{kind:"unordered-set",acceptedAnswers:["A","C"]},rubric:"1 point: The student selects A and C.",points:1,explanation:"Both the diagram and article place treatment and pumping before storage and pipes before buildings."}),
  item({id:45013,testType:"cat",claim:1,target:"13",dok:2,standard:"RI.4.5",type:"grid-match",passage:waterTower,passageTitle:"Inside a Water Tower",questionText:"Match each feature in “Inside a Water Tower” to the information it helps a reader locate.",gridRows:["Heading “Changing Demand During a Day”","Five-stage system diagram","Component-and-purpose table"],gridColumns:["How water use changes over time","The main order from treatment to buildings","A short summary of each part's job"],gridSelection:{perRowMin:1,perRowMax:1,totalMin:3,totalMax:3},correctAnswer:["0:0","1:1","2:2"],scoringRule:{kind:"unordered-set",acceptedAnswers:["0:0","1:1","2:2"]},rubric:"1 point: All three features are matched correctly.",points:1,explanation:"The heading locates demand information, the diagram shows order, and the table summarizes purposes."}),
  item({id:45014,testType:"cat",claim:1,target:"14",dok:2,standard:"L.4.5a",type:"multiple-choice",passage:waterTower,passageTitle:"Inside a Water Tower",questionText:"Why does the author compare the tank to “a raised reserve cup connected to many smaller tubes”?",options:options(["to suggest that drinking cups should be stored on towers","to prove that town pipes are made from drinking straws","to show that tower water is used only for cooking","to help readers picture stored water moving downward through connected paths"]),correctAnswer:"D",rubric:"1 point: The student selects D.",points:1,explanation:"The familiar comparison helps explain elevation, connected pipes, and downward movement."}),
  item({id:45015,testType:"cat",claim:1,target:"8,11",dok:2,standard:"RI.4.1",type:"multi-select",selection:{min:2,max:2},passage:waterTower,passageTitle:"Inside a Water Tower",questionText:"Which two details best support the claim that inspections and backup plans help protect water service?",options:options(["Crews check for rust, damaged coatings, loose parts, and leaks.","A tower may have a town's name painted on it.","Operators use other tanks, pumps, or connections when one tank is out of service.","Early morning can be a busy time for water use.","A service line connects a building to a pipe."]),correctAnswer:["A","C"],scoringRule:{kind:"unordered-set",acceptedAnswers:["A","C"]},rubric:"1 point: The student selects A and C.",points:1,explanation:"Inspection finds problems, and alternate equipment keeps service moving during maintenance."}),

  item({id:45016,testType:"cat",claim:2,target:"1b",dok:2,standard:"W.4.3b",type:"multiple-choice",questionText:"A student is revising a narrative about a clay model.\n\nI rolled a thick piece of clay into a tower and pressed it onto the cardboard base. The top leaned farther with every new piece. I reached out just as the tower began to fold. [Add a sentence here.] After setting the fallen clay beside me, I built a wider base and tried again.\n\nWhich sentence best shows the narrator's response through action and sensory detail?",options:options(["The clay was used in many art projects.","The cool, heavy clay sagged between my fingers as I caught it.","My friend likes to draw buildings.","The model was a thing that I made."]),correctAnswer:"B",rubric:"1 point: The student selects B.",points:1,explanation:"Option B uses touch and a concrete catching action."}),
  item({id:45017,testType:"cat",claim:2,target:"3b",dok:2,standard:"W.4.2c",type:"two-part",questionText:"A student is revising an explanation.\n\nWater vapor is an invisible gas in the air. [Gap 1], when warm, moist air touches a cold glass, some vapor cools and becomes liquid drops. The drops gather on the outside rather than leaking through the glass. [Gap 2], the drops may join and slide down the side. This change from gas to liquid is condensation.\n\nAnswer both parts.",partAPrompt:"Part A: Which transition best fits Gap 1?",partAOptions:options(["For example","However","In conclusion","Instead"]),partBPrompt:"Part B: Which transition best fits Gap 2?",partBOptions:options(["As more water collects","Before the glass exists","For the opposite reason","At the same location never"]),correctAnswer:["A","A"],rubric:"1 point: Both transitions are correct.",points:1,explanation:"“For example” introduces the case, and “As more water collects” explains the next stage."}),
  item({id:45018,testType:"cat",claim:2,target:"6b",dok:2,standard:"W.4.1a",type:"multiple-choice",questionText:"A student plans a letter about a classroom supply-return station. Pencils, rulers, and markers are sometimes left on tables. One labeled station would give students a known place to return shared supplies, make materials easier to find, and reduce class time spent searching. Students could still keep personal supplies in their desks. Which opening best states the opinion supported by these reasons?",options:options(["Markers are sold in several colors.","Some classroom tables are near the windows.","Our classroom should add a labeled station for returning shared supplies.","I used a ruler during yesterday's math lesson."]),correctAnswer:"C",rubric:"1 point: The student selects C.",points:1,explanation:"Option C states the claim matched by all supplied reasons."}),
  item({id:45019,testType:"cat",claim:2,target:"8",dok:1,standard:"L.4.3",type:"multiple-choice",questionText:"A student revises a marble-ramp description.\n\nI raised one end of the cardboard ramp on two books. When I released the marble, it **did something down** the steep surface, crossed the rug, and tapped the wall. On the next trial, I used one book, and the marble moved more slowly.\n\nWhich word best replaces **did something down**?",options:options(["thought","rolled","belonged","watched"]),correctAnswer:"B",rubric:"1 point: The student selects rolled.",points:1,explanation:"“Rolled” precisely names the marble's movement down the ramp."}),
  item({id:45020,testType:"cat",claim:2,target:"9",dok:1,standard:"L.4.1",type:"multiple-choice",questionText:"Read the paragraph from a music-practice schedule.\n\nThe brass group meets before lunch, and the string group meets after lunch. Each musician **bring** the assigned music and a pencil. The group leader checks the attendance list and marks any music that needs to be replaced. At the end, every student returns the folding chair to the storage wall.\n\nWhich revision of the marked words is correct?",options:options(["Each musicians bring","Each musician bringing","Each musician have brought","Each musician brings"]),correctAnswer:"D",rubric:"1 point: The student selects D.",points:1,explanation:"The singular subject “Each musician” requires the singular verb “brings.”"}),
  item({id:45021,testType:"cat",claim:2,target:"9",dok:2,standard:"L.4.2",type:"multi-select",selection:{min:2,max:2},questionText:"A student writes this field-day note.\n\n“On monday, teams will meet beside the track at nine o'clock. Bring a water bottle, a hat and sunscreen. Your teacher will give each group a schedule before the first activity. After lunch, teams will rotate through three new stations. Buses will leave at the usual dismissal time.”\n\nSelect the two needed corrections.",options:options(["Lowercase On at the beginning.","Capitalize Monday.","Remove the comma after bottle.","Add a comma after hat.","Capitalize track."]),correctAnswer:["B","D"],scoringRule:{kind:"unordered-set",acceptedAnswers:["B","D"]},rubric:"1 point: The student selects B and D.",points:1,explanation:"Monday is capitalized, and a comma separates items in a three-item series."}),

  item({id:45022,testType:"cat",claim:3,target:"4",dok:1,standard:"SL.4.2",type:"multiple-choice",passage:cottonPresentation,passageTitle:"From Cotton Fiber to Cloth",audio:{src:"/audio/presentations/grade-4/test-3-from-cotton-fiber-to-cloth.m4a",title:"From Cotton Fiber to Cloth narration",transcript:cottonPresentation},questionText:"What is the main idea of “From Cotton Fiber to Cloth”?",options:options(["Every cotton product is woven with the same pattern.","Cotton fibers pass through an ordered series of preparation and fabric-making steps.","Seeds make cotton yarn stronger when they remain in it.","A finished shirt is made directly from an unopened cotton boll."]),correctAnswer:"B",rubric:"1 point: The student selects B.",points:1,explanation:"The presentation follows the sequence from harvested fiber through finished cloth."}),
  item({id:45023,testType:"cat",claim:3,target:"4",dok:2,standard:"SL.4.2",type:"multi-select",selection:{min:2,max:2},passage:cottonPresentation,passageTitle:"From Cotton Fiber to Cloth",audio:{src:"/audio/presentations/grade-4/test-3-from-cotton-fiber-to-cloth.m4a",title:"From Cotton Fiber to Cloth narration",transcript:cottonPresentation},questionText:"Which two spoken details explain the jobs of carding and spinning?",options:options(["Carding combs and lines up loose fibers.","Spinning draws and twists fibers into yarn.","Weaving removes seeds from cotton bolls.","Inspectors plant cotton beside the mill.","Cutting makes loose fibers point in one direction."]),correctAnswer:["A","B"],scoringRule:{kind:"unordered-set",acceptedAnswers:["A","B"]},rubric:"1 point: The student selects A and B.",points:1,explanation:"The speaker explicitly repeats these two preparation jobs."}),
  item({id:45024,testType:"cat",claim:3,target:"4",dok:3,standard:"SL.4.3",type:"two-part",passage:cottonPresentation,passageTitle:"From Cotton Fiber to Cloth",audio:{src:"/audio/presentations/grade-4/test-3-from-cotton-fiber-to-cloth.m4a",title:"From Cotton Fiber to Cloth narration",transcript:cottonPresentation},questionText:"Answer both parts about why fiber preparation matters.",partAPrompt:"Part A: What conclusion does the speaker make?",partAOptions:options(["Early preparation affects the strength and evenness of later material.","Every flaw can be hidden during sewing.","Cotton seeds should remain in yarn.","A towel and shirt require identical fabric surfaces."]),partBPrompt:"Part B: Which detail best supports the conclusion?",partBOptions:options(["The cloth is rolled before it is cut.","If fibers are not lined up or yarn has uneven twist, later machines cannot hide every problem.","A cotton boll opens around its seeds.","Some yarn is knitted instead of woven."]),correctAnswer:["A","B"],rubric:"1 point: Both parts are correct.",points:1,explanation:"The supporting detail directly connects early problems with later fabric quality."}),
  item({id:45025,testType:"cat",claim:3,target:"4",dok:1,standard:"SL.4.2",type:"multiple-choice",passage:mapPresentation,passageTitle:"Mapping a Neighborhood with Symbols",audio:{src:"/audio/presentations/grade-4/test-3-mapping-a-neighborhood-with-symbols.m4a",title:"Mapping a Neighborhood with Symbols narration",transcript:mapPresentation},questionText:"What is the main idea of “Mapping a Neighborhood with Symbols”?",options:options(["A map should draw every real object at its full size.","Every map uses the same symbol for every park.","Map symbols, legends, direction, and scale work together to represent a larger real place.","A north arrow measures the length of a walking route."]),correctAnswer:"C",rubric:"1 point: The student selects C.",points:1,explanation:"The presentation explains the separate and combined jobs of four map tools."}),
  item({id:45026,testType:"cat",claim:3,target:"4",dok:2,standard:"SL.4.2",type:"grid-match",passage:mapPresentation,passageTitle:"Mapping a Neighborhood with Symbols",audio:{src:"/audio/presentations/grade-4/test-3-mapping-a-neighborhood-with-symbols.m4a",title:"Mapping a Neighborhood with Symbols narration",transcript:mapPresentation},questionText:"Match each explicitly described symbol to its meaning.",stimulusImages:[{src:"/images/grade-4/test-3/ela/map-symbols.svg",alt:"Optional chart showing the park, bridge, and school symbols described in the narration.",sha256:"fc0203224afeb49f16f1fb55c862248d8ab3515c3eaf48de946c7a4b444a248c"}],gridRows:["Green tree","Double line across blue water","Small building with a flag"],gridColumns:["Park","Bridge","School"],gridSelection:{perRowMin:1,perRowMax:1,totalMin:3,totalMax:3},correctAnswer:["0:0","1:1","2:2"],scoringRule:{kind:"unordered-set",acceptedAnswers:["0:0","1:1","2:2"]},rubric:"1 point: All three symbols are matched correctly.",points:1,explanation:"The speaker states and repeats each symbol/meaning pair."}),
  item({id:45027,testType:"cat",claim:3,target:"4",dok:2,standard:"SL.4.3",type:"multi-select",selection:{min:2,max:2},passage:mapPresentation,passageTitle:"Mapping a Neighborhood with Symbols",audio:{src:"/audio/presentations/grade-4/test-3-mapping-a-neighborhood-with-symbols.m4a",title:"Mapping a Neighborhood with Symbols narration",transcript:mapPresentation},questionText:"Which two spoken details explain why a legend and scale matter?",options:options(["A legend lists symbols and their meanings so readers do not have to guess.","A scale connects distance on paper with distance in the real neighborhood.","A park symbol must always be a blue square.","Every small bench must appear on every map.","A north arrow replaces the need for a legend."]),correctAnswer:["A","B"],scoringRule:{kind:"unordered-set",acceptedAnswers:["A","B"]},rubric:"1 point: The student selects A and B.",points:1,explanation:"The narration explicitly gives these jobs for the legend and scale."}),

  item({id:45028,testType:"cat",claim:4,target:"2",dok:2,standard:"W.4.8",type:"multi-select",selection:{min:2,max:2},questionText:"A student is researching this question: **How do suspension bridges carry weight across a wide space?** Select the two source cards most useful for the research.",options:options(["Bridge Cable Forces — an engineer explains how cables transfer force to towers and anchors","Painting Famous Bridges — photographs of bridge colors","Parts of a Suspension Bridge — a labeled diagram of the deck, cables, towers, and anchorages","Road Signs Near Bridges — a list of traffic signs"]),correctAnswer:["A","C"],scoringRule:{kind:"unordered-set",acceptedAnswers:["A","C"]},rubric:"1 point: The student selects A and C.",points:1,explanation:"Both selected sources directly explain structural parts and how they carry force."}),
  item({id:45029,testType:"cat",claim:4,target:"3",dok:2,standard:"W.4.8",type:"multiple-choice",questionText:"A student is writing a report about food use in a school cafeteria. Read this source excerpt.\n\n**Interview with a cafeteria manager:** “We record unopened food and food left on trays after each lunch. On pizza days, fewer main dishes remain, but more unopened fruit is returned. On soup days, the pattern is reversed. In September, we moved the fruit display beside the checkout line. More students selected fruit, yet the number returned also rose. We now test one change at a time and compare four weeks of records before deciding whether it helped. Weather and field trips can change attendance, so we note those days separately.”\n\nWhich report section can this source best support?",options:options(["How ovens are manufactured","Rules for playground equipment","The history of school buildings","Patterns in leftover cafeteria food"]),correctAnswer:"D",rubric:"1 point: The student selects D.",points:1,explanation:"The manager provides recorded patterns in food selection and leftovers."}),
  item({id:45030,testType:"cat",claim:4,target:"4",dok:2,standard:"W.4.9",type:"multi-select",selection:{min:2,max:2},questionText:"A student claims that reusable cafeteria trays can reduce disposable waste. Read the fact-sheet sentences.\n\n1. A reusable tray can be washed and used again for many meals.\n2. Some trays are made in several colors.\n3. Pine School counted 1,200 fewer disposable trays in its trash during the month after switching to washable trays.\n4. Students carry trays from the serving line to a table.\n5. Tray sections can keep foods apart.\n6. The school added a washing routine and checked that clean trays were ready before each lunch period.\n\nSelect the two sentences that best support the claim.",options:options(["Sentence 1","Sentence 2","Sentence 3","Sentence 4","Sentence 5"]),correctAnswer:["A","C"],scoringRule:{kind:"unordered-set",acceptedAnswers:["A","C"]},rubric:"1 point: The student selects A and C.",points:1,explanation:"Repeated use and the measured trash reduction directly support the waste claim."}),
];

const newsSources = `The school planning team is considering a student news program. The program could share a short recorded or audio-only update twice each month. Read all three sources. Any program must follow the school's privacy, accessibility, and permission rules.

### Source 1: News Made by Students

A student news program can give learners a real audience for skills they practice in class. A team might report schedule reminders, interview a club leader, explain a science project, recognize a team accomplishment, or summarize a community event. Preparing a two-minute story requires more than speaking into a microphone.

Students first decide what information their audience needs. They confirm names, dates, and quotations. Then they write a script that has a clear beginning, middle, and ending. Reading the script aloud helps writers notice sentences that are too long or words that sound unclear. Team members revise before recording.

The work can include different roles. Reporters gather information. Writers shape a script. Presenters practice pace and volume. Audio or video editors arrange recorded parts. A fact-checker compares the final script with notes and approved sources. Rotating roles gives more students a chance to contribute without requiring everyone to appear on camera.

A program can also improve school communication. Families may miss a paper reminder at the bottom of a backpack, while a short update posted in the usual school message system can repeat important dates. Captions and a written transcript help people read the same information. An audio-only version can be useful when a story does not need pictures.

Real audiences make accuracy important. Students learn that an exciting sentence is not enough if a name is wrong or a quotation changes someone's meaning. They also learn to ask useful questions, listen to an answer, and choose only the parts connected to the story.

A student news program should not replace classroom writing, announcements, or direct messages from the school. It is another way to practice and share information. Its value depends on careful supervision, fair access to roles, accurate reporting, and a schedule that the team can actually maintain.

Teams can begin with a small trial instead of promising a long program immediately. A trial gives students time to learn the equipment and lets adults measure how much review is actually needed. After several programs, the school can ask whether the information was accurate, useful, accessible, and worth the time required.

### Source 2: Planning Requirements

The planning team listed requirements and limits for any student news program.

**Privacy and permission:** A student may not be named, photographed, or recorded for public sharing without the required permission. The team must use the approved name list for every program. Private information, including grades, addresses, medical details, or personal schedules, must never be included. These rules apply even when a story seems positive.

**Accuracy and review:** At least one supervising adult must check every script before recording and review the finished program before it is posted. Students must confirm dates and quotations from a reliable source. Corrections should be posted clearly if an error is discovered later.

**Accessibility:** Every recorded program needs accurate captions or a complete transcript. Important information shown in a picture must also be explained in words. Text on a screen must be large enough to read, and color cannot be the only way information is identified.

**Time:** The team can meet for 45 minutes twice each week. Teachers estimate that planning, reporting, revising, recording, captioning, and review will take three to five hours for each short program. The schedule should include extra time before holidays or large events, when facts may change quickly.

**Equipment and access:** The school already owns two microphones, one camera, and three editing laptops. Equipment must stay at school and be available to all team members during scheduled work time. The program cannot require a student to own a phone, computer, or internet connection at home.

**Cost:** The first-year budget is $2,600. Estimates include $900 for two additional microphones, $600 for simple lighting, $500 for storage and replacement cables, $300 for caption-review support, and $200 for printed training materials. The team should keep part of the budget for repairs.

**Fair participation:** Students need a clear way to apply for or rotate through roles. Speaking on camera cannot be treated as the only important job. Writing, sound, captioning, research, and fact-checking must also be recognized so students with different strengths can contribute.

These requirements do not decide whether the school should create the program. They show that a fair and reliable program needs permission checks, adult review, accessible versions, shared equipment, and enough time.

### Source 3: One Year of Riverbend Student News

Riverbend School tested a student news team for one year. Its size and schedule are not identical to this school's, but its records show possible benefits and difficulties.

The team began with twelve students and produced an update twice each month. Students could choose reporting, writing, presenting, sound, captions, or fact-checking. During the first three months, the team completed six programs. In the most recent three months, it completed ten.

[[DATA_TABLE]]

The Riverbend records compare the first and most recent three-month periods. Participation and completed programs grew, but late programs and adult review time also increased.

In a survey of 146 students, 103 said the program helped them remember at least one school date or event. Eighty-seven said they learned about an activity they had not noticed before. Twenty-two said some stories felt too long, and seventeen wanted more audio-only stories because pictures were not always necessary.

The team made mistakes. One early program gave the wrong start time for a concert. The correction was posted the next morning, but some families had already copied the incorrect time. After that, students created a checklist requiring two sources for event times and a final adult review.

Privacy review also changed the program. A student interview had been recorded correctly, but the permission form allowed classroom use only, not public posting. The team replaced the interview with a narrator's summary before release. Students learned that receiving an interview answer does not automatically give permission to publish it.

As participation grew, editing took longer. Riverbend added a rotating deadline manager and shortened most programs from six minutes to four. It also created templates for captions and credits. These changes helped, but adult review still averaged five hours per week during the most recent period.

Riverbend reviewed its program at the end of each term. The team compared survey responses, error logs, deadlines, and participation rather than relying only on view counts. That review led to shorter stories, additional training, and a rule that no student would stay in the same role for every program.

Riverbend's experience supports more than one position. More students joined, and many survey responses described communication benefits. Late programs, growing review time, an incorrect date, and a permission problem show that a news program also requires dependable routines and close supervision.`;

const newsDirections = `You will complete two Part 1 research tasks and then a separate Part 2 opinion writing task. Read all three sources and take notes. Your sources and Global Notes remain available in Part 2. After you begin Part 2, you cannot return to Part 1.`;
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

export const grade4Test3ElaPt: Question[] = [
  item({id:45101,testType:"pt",claim:4,target:"4",dok:3,standard:"W.4.9",type:"short-answer",passage:newsSources,passageTitle:"Should Our School Create a Student News Program?",studentDirections:newsDirections,questionText:"Compare how Source 1 and Source 2 contribute different considerations to the decision. Use one specific detail from Source 1 and one specific detail from Source 2.",correctAnswer:"A complete response explains that Source 1 supplies a communication, learning, or participation benefit while Source 2 supplies a required safeguard or practical limitation, using one accurate detail from each.",scoringRule:{kind:"manual-rubric"},rubric:"2 points: The response accurately explains the different roles of Sources 1 and 2 and uses one relevant detail from each. 1 point: The response accurately links one source and one detail, or gives two accurate details without explaining their different roles. 0 points: The response is incorrect, irrelevant, insufficient, or blank.",points:2,explanation:"An exemplar may contrast Source 1's authentic writing benefit with Source 2's permission, review, accessibility, equipment, time, or cost requirement."}),
  item({id:45102,testType:"pt",claim:4,target:"2,3",dok:3,standard:"W.4.8",type:"grid-match",passage:newsSources,passageTitle:"Should Our School Create a Student News Program?",studentDirections:newsDirections,questionText:"For the student news proposal, select every source that provides evidence for each planning statement.",gridRows:["A news program can give students authentic writing and speaking practice.","Privacy review and adult time are necessary parts of the work.","Riverbend's participation and completed programs increased."],gridColumns:["Source 1","Source 2","Source 3"],gridSelection:{perRowMin:1,perRowMax:2,rowSelections:[{min:1,max:1},{min:2,max:2},{min:1,max:1}],totalMin:4,totalMax:4},correctAnswer:["0:0","1:1","1:2","2:2"],scoringRule:{kind:"unordered-set",acceptedAnswers:["0:0","1:1","1:2","2:2"]},rubric:"1 point: All four source selections are correct. 0 points: Any selection is missing or incorrect.",points:1,explanation:"Source 1 discusses authentic practice; Sources 2 and 3 show review/privacy demands; Source 3 contains Riverbend's growth data."}),
  item({id:45103,testType:"pt",claim:2,target:"7",dok:4,standard:"W.4.1",type:"extended-writing",passage:newsSources,passageTitle:"Should Our School Create a Student News Program?",studentDirections:newsDirections,questionText:"Write an opinion for the school planning team. Should the school create a student news program, decide not to create one, or create one only under certain conditions?\n\nState your opinion clearly. Use evidence from more than one source. Explain how the evidence supports your reasons. Address the planning team as your audience, organize your ideas into several paragraphs, and use your own words except when quoting briefly.",correctAnswer:"Responses will vary. A positive, negative, or conditional position is acceptable when supported with accurate evidence from more than one source.",scoringRule:{kind:"manual-rubric"},rubric:opinionRubric,points:10,explanation:"Strong responses present a clear position, use accurate evidence from multiple sources, explain it, and address benefits, safeguards, or limitations."}),
];

export const grade4Test3ElaBankVersion = BANK_VERSION;
