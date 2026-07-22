import type { Question } from "./questions";

const BANK_VERSION="2026-07-22.1";
type Item=Omit<Question,"grade"|"subject"|"practiceTest"|"provenance">;
const options=(texts:string[])=>texts.map((text,index)=>({label:"ABCDEF"[index],text}));

const unmarkedBeat=`**The Unmarked Beat**

Elena rested two wooden rhythm sticks across her music stand. Around her, the community music room filled with small sounds: chairs scraping, pages turning, and drum cases clicking shut. On Saturday, the youth music group would perform at the library's open house. Today was their final rehearsal.

Mr. Imani lifted one hand. “From the beginning of Harbor Walk,” he said.

Elena watched the hand-copied percussion score. Her part repeated a four-measure pattern. Tap-tap, rest, tap. Tap-tap, rest, tap. The notes were simple, but all six percussion players had to enter together.

They reached the middle section. Suddenly, the rhythm leaned sideways. Elena heard Marco's hand drum arrive before her sticks. She hurried to catch up, and then Priya's shaker sounded late. By the end, the string players were staring back at them.

Mr. Imani lowered his hand. “Something separated there. Mark your places, and we will try again.”

Elena circled measure twenty-two. Marco often played boldly, sometimes so boldly that everyone else followed him. She leaned toward Priya. “I think Marco rushed the turn.”

Priya tapped the edge of her page. “Maybe. My count felt short before his entrance.”

On the second try, Elena counted under her breath. One-two-three-four. For three lines, the printed boxes matched the steady count. Near the circled place, however, her eyes jumped from a box ending with a rest to another box beginning with two taps. The rhythm broke again.

“Marco entered early twice,” Elena whispered.

Marco had heard her. “I entered where my page says,” he replied, holding it up. His score had dark pencil marks and a coffee-colored corner, but his finger rested exactly on the printed entrance.

Elena felt heat rise in her face. She had expected an argument, yet Marco only looked puzzled. Mr. Imani asked each section to clap its pattern alone. Marco's drum group clapped eight even measures. Priya's shaker group also clapped eight. Elena's group reached the turn first.

“Again,” Elena said. She pointed to each box while Priya counted.

One, two, three, four. Each measure was like a step in a staircase. Then Elena's finger seemed to skip a stair: the printed pattern changed before the count expected it to change.

She compared the top edges of the pages. Page two began with measure seventeen. It showed measures seventeen through twenty, followed by twenty-two. The tiny number twenty-one was missing.

“Wait,” Elena said. “My page jumps from twenty to twenty-two.”

Mr. Imani brought the conductor's score. His copy contained measure twenty-one: four rests for Elena's sticks while Marco played a short drum signal. When a volunteer had copied Elena's page, that quiet measure had been left out. Because it contained no stick notes, the empty-looking box was easy to overlook.

Elena glanced at Marco. “You weren't rushing. My page sent me to the next measure too soon.”

“Then your mistake was following the page correctly,” Marco said with a grin.

Mr. Imani did not let them simply write “rest” in the margin. “How can we rebuild the missing space so another player can follow it?”

The students examined the repeated patterns before and after the gap. Priya noticed that each large section had four groups of four measures. Marco found that his signal always came at the end of the third group. Elena drew a full measure box between twenty and twenty-two, added four rest marks, and labeled the count beneath it.

Priya suggested checking the page after the repair too. They compared measure twenty-two on all three copies, then twenty-three and twenty-four. Those measures matched. Elena also counted the groups from the beginning of the piece instead of starting near the error. Both checks led to the same location for the missing box. The repair was no longer only a guess that sounded better; it fit the numbering, the repeated structure, and the conductor's complete score.

They tested only that section. This time Elena held her sticks still while Marco played his signal. The silence was not empty. It made room for the drum and kept the pattern aligned. When Elena entered on measure twenty-two, Priya's shaker landed with her.

“Resolved,” Mr. Imani said, meaning both that the problem had been settled and that the uneasy sound had returned to order.

During a short break, Elena copied the repair neatly. She thought about how quickly she had blamed Marco. She had heard a true problem but chosen an explanation before checking all the evidence. Marco had trusted his page, just as she had trusted hers. Neither page alone had shown the whole pattern.

At the final run-through, Elena no longer stared only at her own notes. She listened for Priya's soft shaker and watched for Marco to raise his hand before the signal. Measure twenty-one approached. Elena counted its four silent beats, one by one. The missing space now felt as solid as every sounded note.

At the library performance, the audience could not see Elena count the rests. They heard Marco's drum call, then the percussion section answer together. Afterward, a visitor asked how the group had made such an uneven collection of instruments sound like one piece.

Marco started to say that they had fixed a copying mistake, but Elena added that the copying mistake was only half the problem. “We also had three different clues,” she said. “His entrance, Priya's count, and my page seemed to disagree until we set them beside one another.” Priya held her hands four beats apart, showing the space they had restored.

Elena looked at Marco and Priya. “We compared what each of us had,” she said. “The part none of us could explain alone was the part that helped us listen to one another.”`;

const drawbridge=`**When a Drawbridge Opens**

A drawbridge carries a road across a waterway but can also move out of the way for tall boats. Drivers may see the roadway rise and think the bridge simply swings upward. In fact, a safe opening depends on signals, barriers, motors, counterweights, sensors, and an operator following a fixed sequence.

**A Request to Open**

A boat operator may call by radio or use a horn signal to request an opening. The bridge operator checks the boat's location and height. A low boat might pass underneath without an opening, while a sailboat with a tall mast may need the roadway raised.

The operator also checks road traffic, pedestrians, weather, and equipment reports. A request does not cause the bridge to rise immediately. First, the bridge area must be clear.

In this setting, *clear* means free of vehicles, bicycles, pedestrians, and objects that could be trapped by moving equipment. Warning bells and flashing lights begin. Traffic signals turn red. Gates lower across sidewalks and vehicle lanes. Some bridges use two sets of gates so no vehicle can enter from either side.

Sensors can report whether a gate is fully down, but the operator also watches cameras or windows. A sensor is useful evidence, not permission to ignore a visible problem. If a person is still between the gates, the sequence stops.

**Moving a Heavy Roadway**

Many drawbridges use a bascule design. The word comes from a term for a balance scale. One end is the roadway leaf. A heavy counterweight sits on the other side of a pivot. As the road rises, the counterweight moves downward.

The counterweight does not make the roadway weightless. It balances much of the load so motors do not have to lift the full weight alone. Think of two children of similar weight on opposite ends of a seesaw. A smaller push can move the balanced board than would be needed to lift one child straight upward.

Electric motors turn gears connected to the bridge. Brakes hold the leaf when it stops. Position sensors report how far it has moved. On a two-leaf bridge, equipment keeps both sides coordinated so their tips meet correctly when the road closes.

The normal sequence is:

1. Confirm the opening request and conditions.
2. Start warnings and stop road users.
3. Confirm that the movable area is clear.
4. Release the locks that hold the road ends together.
5. Run the motors until the leaf reaches the needed height.
6. Hold the bridge while the boat passes.
7. Lower, lock, inspect, and then reopen the gates.

Each step prepares for the next. Releasing roadway locks while traffic is moving would be dangerous. Raising before the area is clear would also be dangerous. That is why operators do not rearrange the order just to save a minute.

**Checks During the Opening**

The operator watches more than the boat. Wind can push against a raised leaf. An unusual motor sound may signal a problem. A position reading that changes too slowly can show that equipment is not moving normally. The operator can pause the motion and call a maintenance crew.

After the boat passes, the bridge lowers gradually. Sensors indicate when the leaf is seated. Locks slide into place to connect the road sections. The operator checks that the roadway surfaces align and that warning systems show the correct state. Only then do gates rise and traffic signals change.

**Backup Systems**

Bridges are built with backup plans because equipment can fail. A second motor, emergency generator, manual brake release, or alternate radio may be available. Maintenance workers inspect gears, cables, pivots, electrical parts, and protective coatings. Test openings reveal problems before a busy opening is requested.

A backup system does not replace normal checks. An emergency generator can supply electricity, but it cannot tell whether a bicycle remains inside a gate. A second motor can move the leaf, but it does not prove the roadway locks are released. People still follow the sequence and confirm conditions.

Some openings are delayed because of high wind, an emergency vehicle approaching, or a warning light that does not behave as expected. The delay may be inconvenient for a boat or drivers, but the bridge connects two transportation routes. Both must be protected.

**Information Has Different Jobs**

An operator's display may place several reports together. A gate symbol shows whether a gate reached its expected position. A number shows the roadway leaf's angle. A camera shows the space that the sensor cannot describe. A radio message provides information from the boat. These reports overlap, but they are not interchangeable.

For example, a position sensor might correctly report that the bridge is fully raised while a camera shows that a loose object has blown onto the roadway. The position reading is not wrong; it simply answers a different question. Operators compare information to the decision they must make next.

Crews also keep opening records. If one motor repeatedly takes longer on cold mornings, technicians can inspect it before it stops working. Records may include dates, weather, opening time, equipment readings, and unusual observations. One slow opening does not prove a motor is failing, but a repeated pattern can guide an inspection.

Drawbridges vary. Some lift a center span straight upward between towers. Some rotate sideways on a central pier. The bascule bridge described here is common, but its exact gates, controls, and backup equipment depend on the site. What the designs share is the need to separate traffic, control motion, communicate clearly, and confirm that the route is safe before reopening it.

A drawbridge therefore works less like one giant moving part and more like a team. Signals communicate, gates separate traffic, counterweights balance, motors move, locks join, sensors report, and operators decide. When the sequence is complete, the roadway rises and returns so smoothly that the careful checks can be easy to miss.`;

const clay=`Listen to the presentation. Then answer the questions.

**From Clay to a Fired Bowl**

A finished clay bowl feels hard, but it begins as a soft mixture of tiny mineral particles and water. Today I will explain the main steps a potter uses to turn that soft material into a useful bowl.

First, the potter wedges the clay by pressing, folding, and turning it many times. Wedging makes the moisture more even and pushes out pockets of trapped air. An air pocket can expand during firing and crack the piece, so this preparation matters even though it is not visible in the final bowl.

Next, the potter shapes the clay. On a spinning wheel, the clay must be centered so it does not wobble. The potter presses a hollow into the middle and gently pulls the walls upward. A bowl can also be shaped by hand from coils or slabs. In every method, the walls should have a fairly even thickness.

The new bowl cannot go directly into a hot kiln. It must dry slowly. If the rim dries much faster than the base, one part shrinks before another and the bowl may bend or crack. Potters often cover a piece loosely at first, then uncover it more as the moisture becomes even.

When the bowl is completely dry, it receives a first firing. Heat changes the clay into a hard but still somewhat absorbent material called bisque. After cooling, the potter may apply glaze. Glaze is a mixture of minerals that can add color and form a glasslike surface. It is not ordinary paint.

The bowl returns to the kiln for a glaze firing. The kiln follows a planned heating and cooling schedule. During firing, the glaze melts and bonds with the clay surface. The potter waits until the kiln cools before opening it, because a sudden temperature change can damage the bowl.

Before glazing, a potter often smooths rough edges and wipes away dust. Glaze on the bottom could melt and stick the bowl to the kiln shelf, so the base is usually kept clean. The potter records which glaze was used and where the bowl was placed. Because heat can vary slightly inside a kiln, those notes help explain the result and improve a later firing.

The potter also checks the bowl after each stage. A small surface mark in soft clay may be repaired before drying. A crack in bone-dry clay is more difficult to fix, and a crack after firing cannot simply be pressed closed. Careful checking early prevents wasted work later.

Remember the jobs of three important steps: wedging prepares the soft clay and removes air pockets; gradual drying lets moisture leave evenly; firing permanently hardens the shape. Glaze can add a sealed, colorful surface, but careful preparation is what helps the bowl survive the heat.`;

const weather=`Listen to the presentation. Then answer the questions.

**Reading a Weather Map**

A weather map uses several kinds of symbols to show conditions across a large area at one time. No single symbol tells the entire story. Today I will explain how a reader combines a legend, station symbols, fronts, and air-pressure labels.

Start with the legend. It identifies what colors, lines, and small pictures mean on this particular map. A blue line with triangles often represents a cold front, while a red line with semicircles often represents a warm front. The shapes point in the direction the front is moving. Because maps can use different designs, checking the legend prevents a reader from guessing.

A station symbol reports conditions at one location. A number may show temperature. A filled circle can show cloud cover, and a short line with feathers can show wind direction and speed. A rain or snow symbol may show current precipitation. These details describe a place, not the whole region.

Curving lines called isobars connect places with equal air pressure. When isobars are close together, pressure changes quickly across a short distance, which can be connected with stronger winds. Letters H and L mark centers of relatively high and low pressure.

Now imagine a map with a cold front west of a city, a low-pressure center to the north, and station symbols showing winds from the southwest. The front shows a boundary and its direction. The pressure labels show the larger pattern. The station symbols show what observers are measuring now. Reading the tools together supports a better description than any one tool alone.

A map is also a snapshot. A front's triangles show a movement direction, but the map does not guarantee the exact minute rain will begin at one street. Forecasters compare maps made at different times and use other measurements.

Distance matters too. A station symbol printed near a city represents the observing station, not every neighborhood around it. A mountain, lake, or coastline may cause nearby places to have different conditions. That is another reason a reader should avoid turning one local observation into a claim about an entire state.

Suppose two maps made six hours apart show the same cold front farther east on the second map. That comparison provides evidence that the boundary moved east. If the station temperatures behind the front are also lower, the observations support the description of colder air following it. The line and the numbers strengthen the explanation together.

Isobars add another clue. Wide spacing suggests a smaller pressure change over distance, while close spacing suggests a larger change. The lines do not show wind speed at one yard. They help a reader recognize the pressure pattern, which can then be compared with station wind symbols.

The key idea is to give each map tool its proper job. The legend explains the code. Station symbols report local observations. Front lines show boundaries between air masses and a direction of movement. Pressure labels and isobars show a broader air-pressure pattern. A careful reader combines them without asking one symbol to prove more than it can.`;

const lunchSources=`**Source 1: Why Lunch Lines Slow Down**

Students in one school enter the cafeteria through two doors, choose food, sometimes ask questions, type an identification number, and then find a seat. A delay at any step can spread backward through the line. School planners call such a slow point a bottleneck.

Several changes may reduce waiting. Clearly labeled menu signs can help students decide before reaching the serving counter. Placing the most commonly chosen items first may reduce reaching across the line. A second checkout station can help when payment is the bottleneck, but it will not help if food serving is slower. Staggering arrival times by a few minutes can reduce the number entering at once, though class schedules must still provide equal lunch time.

The physical path matters as well. If trays, utensils, and drinks are placed so students must cross one another's routes, the line may pause even when staff serve quickly. Moving an item is useful only if students can still reach it safely and workers can refill it. Floor arrows can clarify direction, but they should not create a route so narrow that someone using a mobility device cannot turn.

Planners can map the process by watching where students wait. They might record the time when a student enters, receives food, checks out, and sits down. If the longest pause occurs before checkout, adding a serving lane may not solve the main bottleneck. If students reach the counter without knowing the choices, a menu display could address the earlier decision point.

Before changing the whole cafeteria, a school can test one idea for several days. Staff should record more than the shortest wait. They should compare typical and longest waits, late arrivals to class, available choices near the end of lunch, and whether students who need assistance can move through comfortably. A faster line is not successful if it creates a different problem.

A fair test should also note what stayed the same. A special menu, a field trip, or an absent staff member could change the line independently of the new plan. Several days of observations are more useful than one unusually quiet day. Students and workers can add comments that explain numbers, such as why a turn felt crowded even after the wait became shorter.

**Source 2: Requirements for Any Lunch Plan**

A planning team listed conditions that every proposal must meet. Students must have enough time to eat, not only time to stand in line. Routes must remain wide enough for mobility devices, and students who need help reading a menu or carrying a tray must be able to receive it without being rushed.

The kitchen must keep foods at safe temperatures and follow nutrition rules. Staff members need clear supervision areas. A plan cannot depend on families buying special items or students bringing lunch from home. Costs include equipment, staff time, training, and cleaning—not just the purchase price.

Student choice also matters. Offering only the quickest item could shorten a line while making the meal less useful. The team should check whether popular choices remain available throughout every lunch period. Any schedule change must give each class a fair amount of eating time.

The requirements can sometimes pull in different directions. Adding another station may improve flow but increase staffing and cleaning. Moving tables may widen a path but reduce seating. A later arrival group may face shorter lines but have less time before the next class unless the schedule is adjusted. The team must describe these tradeoffs instead of counting every faster result as an automatic success.

Communication is another requirement. Students should know where to enter, what choices are available, and how a trial schedule works. Families and staff need a way to report access or allergy concerns. Directions should use readable print and symbols, and important information should also be available from a person, not only from a sign.

Finally, the team should decide in advance what evidence will count as improvement. Possible measures include median wait, longest wait, eating time, late returns, food availability, safety observations, and student feedback. No single measure answers every question. A recommendation should explain which results improved, which did not, and what should be tested next.

**Source 3: A Four-Day Pilot**

Brookside School tested menu signs, two serving lanes, and arrival groups separated by four minutes. The same meals and staffing were used before and during the pilot.

[[DATA_TABLE]]

The median wait fell from 11 minutes to 7 minutes. The longest wait fell from 18 to 13 minutes. Late classroom returns decreased. However, the second serving lane required a staff member to leave cleanup work for about 25 minutes each day. Two students using mobility devices reported that a movable sign narrowed one turn; staff moved the sign after the first day.

In a survey of 180 students, 118 preferred the pilot, 36 preferred the old system, and 26 had no preference. Some students liked choosing while reading the menu sign. Others said their class's later arrival group had fewer seats together. Food-choice records showed that all advertised choices remained available, although one fruit choice ran low on the third day.

Staff observations added details that the table did not show. During the busiest ten minutes, the two lanes stayed fairly even until one lane paused for a student who needed ingredient information. The other lane continued moving. Workers said the menu sign reduced repeated questions about the main choices, but it did not include every ingredient. The school kept a staff member available to answer those questions.

The principal compared eating time for the first and last arrival groups. The middle half of students in both groups had at least 19 minutes after sitting down. A few students in the later group had only 15 minutes on the day one class arrived late from another activity. That delay was not caused by the cafeteria trial, but it showed that a staggered schedule needs a plan for late classes.

The pilot cost no money for permanent equipment. The movable signs were borrowed, and folding tables formed the second lane. If the school keeps that lane, it would need to price a stable accessible sign, an additional checkout device, and staff training. The four-day trial did not measure those long-term costs.

Students on the planning team proposed two next steps. One group wanted to keep the menu signs while returning to a single lane, which would test whether earlier decisions explain much of the improvement. Another group wanted to test two lanes without staggering arrivals. Both proposals would keep the accessibility check, ingredient help, and eating-time records. Comparing the results could help the school learn which change provides enough benefit to justify its cost and scheduling effects.

The pilot gives evidence about one combined plan for four days. It does not show which change caused each result or what would happen with fewer staff, a different menu, or a longer trial. The planning team recommended another test in which one change is introduced at a time.`;

const lunchTable={rowHeader:"Measure",columns:["Before pilot","During pilot"],rows:[{label:"Median wait",values:["11 min","7 min"]},{label:"Longest wait",values:["18 min","13 min"]},{label:"Late classroom returns",values:[14,6]},{label:"Choices available at end",values:["All but 1 on one day","All advertised choices"]}]};

function sourceId(value:Item){if(value.testType==="pt")return"g4-t4-ela-pt-lunch-line";if(value.id<=47007)return"g4-t4-ela-literary-unmarked-beat";if(value.id<=47015)return"g4-t4-ela-informational-drawbridge";if(value.id<=47021)return`g4-t4-ela-writing-${value.id}`;if(value.id<=47024)return"g4-t4-ela-listening-clay";if(value.id<=47027)return"g4-t4-ela-listening-weather-map";return`g4-t4-ela-research-${value.id}`;}
function item(value:Item):Question{return{...value,grade:4,subject:"ela",practiceTest:4,provenance:{sourceId:sourceId(value),origin:"original",author:"CAASPP Practice Project",license:"Original companion content; all rights reserved for this project.",reviewedAt:"2026-07-22"}};}

export const grade4Test4ElaCat:Question[]=[
  item({id:47001,testType:"cat",claim:1,target:"1",dok:1,standard:"RL.4.1",type:"multiple-choice",passage:unmarkedBeat,passageTitle:"The Unmarked Beat",questionText:"Why does Elena first circle measure twenty-two?",options:options(["She hears the percussion rhythm separate there.","She wants to remove Marco's drum signal.","She plans to make the song shorter.","She cannot read the number twenty-two."]),correctAnswer:"A",rubric:"1 point: A.",points:1,explanation:"The group loses alignment near that measure."}),
  item({id:47002,testType:"cat",claim:1,target:"2",dok:2,standard:"RL.4.2",type:"multiple-choice",passage:unmarkedBeat,passageTitle:"The Unmarked Beat",questionText:"Which theme is best supported by Elena's work on the missing measure?",options:options(["The loudest musician should lead every group.","Comparing evidence can correct an early assumption.","A performance matters more than rehearsal.","Written directions are always complete."]),correctAnswer:"B",rubric:"1 point: B.",points:1,explanation:"Elena revises her blame after comparing the scores and repeated pattern."}),
  item({id:47003,testType:"cat",claim:1,target:"3",dok:2,standard:"RL.4.4",type:"multiple-choice",passage:unmarkedBeat,passageTitle:"The Unmarked Beat",questionText:"What does “resolved” most nearly mean when Mr. Imani uses it?",options:options(["copied and decorated","settled and returned to order","performed for visitors","made louder than before"]),correctAnswer:"B",rubric:"1 point: B.",points:1,explanation:"The missing measure is repaired and the uneasy sound is settled."}),
  item({id:47004,testType:"cat",claim:1,target:"4",dok:3,standard:"RL.4.1",type:"two-part",passage:unmarkedBeat,passageTitle:"The Unmarked Beat",questionText:"Answer both parts about Elena's changing view.",partAPrompt:"Part A: What does Elena come to understand?",partAOptions:options(["Marco caused the error on purpose.","Her first explanation did not use all available evidence.","Silent measures should be removed.","The conductor's score was incorrect."]),partBPrompt:"Part B: Which detail best supports the answer?",partBOptions:options(["She rests the sticks on her stand.","She circles measure twenty-two.","She notices her page jumps from twenty to twenty-two.","A visitor asks about the instruments."]),correctAnswer:["B","C"],rubric:"1 point: Both parts.",points:1,explanation:"Finding the missing numbered measure disproves her early blame."}),
  item({id:47005,testType:"cat",claim:1,target:"5",dok:3,standard:"RL.4.3",type:"multi-select",selection:{min:2,max:2},passage:unmarkedBeat,passageTitle:"The Unmarked Beat",questionText:"Select the two events that most directly cause Elena to revise her explanation.",options:options(["Marco shows that he enters where his page directs.","The groups clap their parts separately.","The audience enters the library.","Elena places rhythm sticks on a stand."]),correctAnswer:["A","B"],scoringRule:{kind:"unordered-set",acceptedAnswers:["A","B"]},rubric:"1 point: A and B.",points:1,explanation:"Those events reveal that the issue is in Elena's score, not Marco's timing."}),
  item({id:47006,testType:"cat",claim:1,target:"6",dok:2,standard:"RL.4.5",type:"multiple-choice",passage:unmarkedBeat,passageTitle:"The Unmarked Beat",questionText:"Why does the author repeat the four-beat pattern at several points?",options:options(["To show how the missing measure disrupts and then restores the structure","To prove that the piece has only four measures","To explain how rhythm sticks are built","To show that Elena dislikes counting"]),correctAnswer:"A",rubric:"1 point: A.",points:1,explanation:"The repeated pattern makes the disruption and repair visible to the reader."}),
  item({id:47007,testType:"cat",claim:1,target:"7",dok:2,standard:"L.4.5a",type:"two-part",passage:unmarkedBeat,passageTitle:"The Unmarked Beat",questionText:"The text says Elena's finger seemed to “skip a stair.”",partAPrompt:"Part A: What does the comparison mean?",partAOptions:options(["Her page omitted a needed step in the pattern.","She dropped her score on a staircase.","She counted upward too quickly.","She wanted to leave rehearsal."]),partBPrompt:"Part B: What does the comparison help the reader understand?",partBOptions:options(["Why the missing measure makes the sequence feel incomplete","Why the library has many floors","Why Marco plays a hand drum","Why the page has a coffee-colored corner"]),correctAnswer:["A","A"],rubric:"1 point: Both parts.",points:1,explanation:"A missing stair and a missing measure both interrupt an expected sequence."}),
  item({id:47008,testType:"cat",claim:1,target:"8",dok:1,standard:"RI.4.1",type:"multiple-choice",passage:drawbridge,passageTitle:"When a Drawbridge Opens",questionText:"What is the main purpose of a counterweight?",options:options(["To balance much of the roadway load","To warn drivers with a bell","To measure the boat's height","To lock the traffic gates"]),correctAnswer:"A",rubric:"1 point: A.",points:1,explanation:"The counterweight balances much of the load so motors do less work."}),
  item({id:47009,testType:"cat",claim:1,target:"9",dok:2,standard:"RI.4.2",type:"multiple-choice",passage:drawbridge,passageTitle:"When a Drawbridge Opens",questionText:"What is the article's main idea?",options:options(["Only motors are needed to open a drawbridge.","A drawbridge uses coordinated equipment and ordered safety checks to serve roads and waterways.","Boats always have priority over emergency vehicles.","Every drawbridge uses exactly the same design."]),correctAnswer:"B",rubric:"1 point: B.",points:1,explanation:"The article connects the moving parts with the safety sequence."}),
  item({id:47010,testType:"cat",claim:1,target:"10",dok:2,standard:"RI.4.4",type:"multiple-choice",passage:drawbridge,passageTitle:"When a Drawbridge Opens",questionText:"What does *clear* mean in the bridge-opening sequence?",options:options(["easy to see through","free of people, vehicles, and objects","brightly lit","explained in simple language"]),correctAnswer:"B",rubric:"1 point: B.",points:1,explanation:"The article defines clear for this setting."}),
  item({id:47011,testType:"cat",claim:1,target:"11",dok:3,standard:"RI.4.1",type:"two-part",passage:drawbridge,passageTitle:"When a Drawbridge Opens",questionText:"Answer both parts about the fixed opening sequence.",partAPrompt:"Part A: Why must operators follow the steps in order?",partAOptions:options(["Each step establishes a condition needed for the next.","The boat operator chooses every step.","The bridge can move only at night.","The counterweight powers the warning lights."]),partBPrompt:"Part B: Which detail best supports the answer?",partBOptions:options(["A low boat might pass without an opening.","Releasing locks while traffic is moving would be dangerous.","Some bridges have two leaves.","The bridge may carry a town name."]),correctAnswer:["A","B"],rubric:"1 point: Both parts.",points:1,explanation:"The safety condition must be established before movement."}),
  item({id:47012,testType:"cat",claim:1,target:"12",dok:3,standard:"RI.4.7",type:"multi-select",selection:{min:2,max:2},passage:drawbridge,passageTitle:"When a Drawbridge Opens",questionText:"Select two details that together explain how the roadway can move safely.",options:options(["The counterweight balances much of the load.","Motors turn gears while brakes and sensors control or report motion.","The bridge carries letters large enough to read.","A boat may use a horn signal."]),correctAnswer:["A","B"],scoringRule:{kind:"unordered-set",acceptedAnswers:["A","B"]},rubric:"1 point: A and B.",points:1,explanation:"Balance, powered movement, holding, and position information work together."}),
  item({id:47013,testType:"cat",claim:1,target:"13",dok:2,standard:"RI.4.5",type:"grid-match",passage:drawbridge,passageTitle:"When a Drawbridge Opens",questionText:"Match each text feature to its job.",gridRows:["Numbered sequence","Heading “Backup Systems”","Balance-scale comparison"],gridColumns:["Shows order","Groups information about failures and alternatives","Explains counterweight action"],gridSelection:{perRowMin:1,perRowMax:1,totalMin:3,totalMax:3},correctAnswer:["0:0","1:1","2:2"],scoringRule:{kind:"unordered-set",acceptedAnswers:["0:0","1:1","2:2"]},rubric:"1 point: All three.",points:1,explanation:"Each feature has a distinct organizational or explanatory job."}),
  item({id:47014,testType:"cat",claim:1,target:"14",dok:2,standard:"L.4.5a",type:"multiple-choice",passage:drawbridge,passageTitle:"When a Drawbridge Opens",questionText:"Why does the author compare the bridge to a balance scale?",options:options(["To explain how opposite loads reduce the effort needed to move the roadway","To show that every bridge weighs boats","To prove that bridges are playground equipment","To describe the color of the counterweight"]),correctAnswer:"A",rubric:"1 point: A.",points:1,explanation:"The familiar balance helps explain the counterweight."}),
  item({id:47015,testType:"cat",claim:1,target:"8,11",dok:3,standard:"RI.4.1",type:"multi-select",selection:{min:2,max:2},passage:drawbridge,passageTitle:"When a Drawbridge Opens",questionText:"Select two details showing why backup equipment cannot replace normal checks.",options:options(["A generator cannot tell whether a bicycle remains inside a gate.","A second motor does not prove the roadway locks are released.","A bridge may have a town name.","A low boat may fit under the bridge."]),correctAnswer:["A","B"],scoringRule:{kind:"unordered-set",acceptedAnswers:["A","B"]},rubric:"1 point: A and B.",points:1,explanation:"Both examples separate backup power or motion from required safety information."}),
  item({id:47016,testType:"cat",claim:2,target:"1b",dok:2,standard:"W.4.3b",type:"multiple-choice",questionText:"Lena lifted the museum drawer and found a faded train ticket beneath a map. Which sentence best continues the narrative by adding action and an internal response?",options:options(["Tickets are made from paper.","She carried it to the curator, wondering whether the penciled date matched the map's journey.","The museum opened at nine o'clock.","Maps can show many roads."]),correctAnswer:"B",rubric:"1 point: B.",points:1,explanation:"The sentence advances the action and reveals Lena's question."}),
  item({id:47017,testType:"cat",claim:2,target:"3b",dok:2,standard:"W.4.2c",type:"two-part",questionText:"A writer explains evaporation: Water absorbs heat. ___, faster-moving particles escape into the air. ___, the liquid level slowly drops.",partAPrompt:"Part A: Choose the first transition.",partAOptions:options(["As a result","For example","Meanwhile","On the other hand"]),partBPrompt:"Part B: Choose the second transition.",partBOptions:options(["Therefore","Before","In contrast","Similarly"]),correctAnswer:["A","A"],rubric:"1 point: Both transitions.",points:1,explanation:"Both blanks express cause and result."}),
  item({id:47018,testType:"cat",claim:2,target:"6b",dok:2,standard:"W.4.1a",type:"multiple-choice",questionText:"A class has limited art supplies. Which opinion best matches reasons about sharing access and reducing waste?",options:options(["The class should use a checkout chart so everyone can find materials and return unused items.","Art is the best subject.","Every student should buy a separate set.","The cabinet should remain locked all year."]),correctAnswer:"A",rubric:"1 point: A.",points:1,explanation:"The qualified proposal matches both reasons."}),
  item({id:47019,testType:"cat",claim:2,target:"8",dok:1,standard:"L.4.3",type:"multiple-choice",questionText:"Which word most precisely completes the sentence? The marble ___ down the steep ramp and struck the block.",options:options(["went","moved","raced","was"]),correctAnswer:"C",rubric:"1 point: C.",points:1,explanation:"Raced precisely conveys rapid motion."}),
  item({id:47020,testType:"cat",claim:2,target:"9",dok:2,standard:"L.4.1",type:"multiple-choice",questionText:"Choose the sentence with correct pronoun agreement.",options:options(["Each club member placed their name card on the table.","All club members placed their name cards on the table.","All club member placed his name cards on the table.","The club members placed its name card on the table."]),correctAnswer:"B",rubric:"1 point: B.",points:1,explanation:"Plural members agrees with their and cards."}),
  item({id:47021,testType:"cat",claim:2,target:"9",dok:2,standard:"L.4.2",type:"multi-select",selection:{min:2,max:2},questionText:"Select the two edits needed: on friday our class visited the harbor museum, and wrote notes about boats.",options:options(["Capitalize On.","Capitalize Friday.","Remove the comma after museum.","Add a comma after class."]),correctAnswer:["B","C"],scoringRule:{kind:"unordered-set",acceptedAnswers:["B","C"]},rubric:"1 point: B and C.",points:1,explanation:"Friday is a proper noun, and no comma should separate the compound predicate."}),
  item({id:47022,testType:"cat",claim:3,target:"4",dok:1,standard:"SL.4.2",type:"multiple-choice",passage:clay,passageTitle:"From Clay to a Fired Bowl",audio:{src:"/audio/presentations/grade-4/test-4-from-clay-to-a-fired-bowl.m4a",title:"From Clay to a Fired Bowl narration",transcript:clay},questionText:"What is the presentation mainly about?",options:options(["Steps that turn soft clay into a fired bowl","Ways to paint a wooden bowl","History of mineral mining","Reasons every bowl must be identical"]),correctAnswer:"A",rubric:"1 point: A.",points:1,explanation:"The presentation follows the preparation, shaping, drying, and firing sequence."}),
  item({id:47023,testType:"cat",claim:3,target:"4",dok:2,standard:"SL.4.2",type:"multi-select",selection:{min:2,max:2},passage:clay,passageTitle:"From Clay to a Fired Bowl",audio:{src:"/audio/presentations/grade-4/test-4-from-clay-to-a-fired-bowl.m4a",title:"From Clay to a Fired Bowl narration",transcript:clay},questionText:"Select the two preparation details stated in the presentation.",options:options(["Wedging evens moisture and removes air pockets.","The shaped bowl dries slowly before firing.","Glaze is applied before the clay is shaped.","The kiln is opened while hottest."]),correctAnswer:["A","B"],scoringRule:{kind:"unordered-set",acceptedAnswers:["A","B"]},rubric:"1 point: A and B.",points:1,explanation:"Both are explicitly described preparation steps."}),
  item({id:47024,testType:"cat",claim:3,target:"4",dok:3,standard:"SL.4.3",type:"two-part",passage:clay,passageTitle:"From Clay to a Fired Bowl",audio:{src:"/audio/presentations/grade-4/test-4-from-clay-to-a-fired-bowl.m4a",title:"From Clay to a Fired Bowl narration",transcript:clay},questionText:"Answer both parts about gradual drying.",partAPrompt:"Part A: Why is gradual drying important?",partAOptions:options(["It helps all parts shrink more evenly.","It makes the bowl wobble.","It replaces the first firing.","It removes the need to wedge clay."]),partBPrompt:"Part B: Which detail best supports the answer?",partBOptions:options(["A rim that dries faster than the base may crack or bend.","Glaze can add color.","Clay contains mineral particles.","A wheel spins."]),correctAnswer:["A","A"],rubric:"1 point: Both parts.",points:1,explanation:"Uneven moisture loss causes uneven shrinkage and damage."}),
  item({id:47025,testType:"cat",claim:3,target:"4",dok:1,standard:"SL.4.2",type:"multiple-choice",passage:weather,passageTitle:"Reading a Weather Map",audio:{src:"/audio/presentations/grade-4/test-4-reading-a-weather-map.m4a",title:"Reading a Weather Map narration",transcript:weather},questionText:"What main idea does the weather-map presentation develop?",options:options(["Readers combine several map tools, each with a different job.","One station symbol predicts all future weather.","Legends are unnecessary when colors are used.","Weather maps show only temperature."]),correctAnswer:"A",rubric:"1 point: A.",points:1,explanation:"The speaker explains each tool and the value of combining them."}),
  item({id:47026,testType:"cat",claim:3,target:"4",dok:2,standard:"SL.4.2",type:"grid-match",passage:weather,passageTitle:"Reading a Weather Map",audio:{src:"/audio/presentations/grade-4/test-4-reading-a-weather-map.m4a",title:"Reading a Weather Map narration",transcript:weather},questionText:"Match each map tool to its narrated job.",gridRows:["Legend","Station symbol","Front line"],gridColumns:["Explains the map's code","Reports local observations","Shows an air-mass boundary and movement direction"],gridSelection:{perRowMin:1,perRowMax:1,totalMin:3,totalMax:3},correctAnswer:["0:0","1:1","2:2"],scoringRule:{kind:"unordered-set",acceptedAnswers:["0:0","1:1","2:2"]},rubric:"1 point: All three.",points:1,explanation:"The presentation explicitly defines each job."}),
  item({id:47027,testType:"cat",claim:3,target:"4",dok:3,standard:"SL.4.3",type:"multi-select",selection:{min:2,max:2},passage:weather,passageTitle:"Reading a Weather Map",audio:{src:"/audio/presentations/grade-4/test-4-reading-a-weather-map.m4a",title:"Reading a Weather Map narration",transcript:weather},questionText:"Select two details supporting the conclusion that map tools should be read together.",options:options(["Station symbols describe one location, not a whole region.","Fronts, pressure labels, and observations provide different information.","All weather maps use identical designs.","One snapshot guarantees the exact minute rain begins."]),correctAnswer:["A","B"],scoringRule:{kind:"unordered-set",acceptedAnswers:["A","B"]},rubric:"1 point: A and B.",points:1,explanation:"The tools have complementary limits and jobs."}),
  item({id:47028,testType:"cat",claim:4,target:"2",dok:2,standard:"W.4.8",type:"multi-select",selection:{min:2,max:2},questionText:"Select the two most useful sources for a report explaining how elevators move safely.",options:options(["A diagram from an elevator manufacturer labeling brakes, cables, and sensors","An interview with a certified elevator inspector about safety checks","A travel blog listing famous tall buildings","An advertisement for carpet used in elevator cars"]),correctAnswer:["A","B"],scoringRule:{kind:"unordered-set",acceptedAnswers:["A","B"]},rubric:"1 point: A and B.",points:1,explanation:"The technical diagram and qualified inspector address mechanisms and checks."}),
  item({id:47029,testType:"cat",claim:4,target:"3",dok:2,standard:"W.4.8",type:"multiple-choice",questionText:"A park-maintenance worker explains how crews inspect playground bolts each month. Which report section would the interview best support?",options:options(["How regular inspections find loose equipment","How playground colors are chosen","Why parks contain grass","Where families buy sports shoes"]),correctAnswer:"A",rubric:"1 point: A.",points:1,explanation:"The worker's experience directly supports inspection procedures."}),
  item({id:47030,testType:"cat",claim:4,target:"4",dok:3,standard:"W.4.9",type:"multi-select",selection:{min:2,max:2},questionText:"A writer claims that refill stations can reduce single-use bottle waste. Select the two sentences that best support the claim.",options:options(["After two stations opened, the school bought 1,200 fewer disposable bottles in one semester.","A survey found that 68% of students refilled a reusable bottle at least weekly.","The stations are painted blue and silver.","The hallway floor was replaced last summer."]),correctAnswer:["A","B"],scoringRule:{kind:"unordered-set",acceptedAnswers:["A","B"]},rubric:"1 point: A and B.",points:1,explanation:"Both details connect station use with reduced disposable-bottle demand."}),
];

export const grade4Test4ElaPt:Question[]=[
  item({id:47101,testType:"pt",claim:4,target:"4",dok:3,standard:"W.4.9",type:"short-answer",passage:lunchSources,passageTitle:"How Should Our School Improve the Lunch Line?",dataTable:lunchTable,questionText:"Compare the roles of Sources 1 and 2. Use one accurate detail from each source.",correctAnswer:"Source 1 explains possible causes of lunch-line delays and ways to test changes, while Source 2 gives requirements any plan must meet, such as accessible routes and enough time to eat.",scoringRule:{kind:"manual-rubric"},rubric:"2 points: Accurately compares the sources' roles and cites one relevant detail from each. 1 point: Gives a partly accurate comparison or accurate detail from only one source. 0 points: Incorrect, irrelevant, insufficient, or blank.",points:2,explanation:"Source 1 supplies improvement strategies; Source 2 supplies nonnegotiable planning conditions."}),
  item({id:47102,testType:"pt",claim:4,target:"2,3",dok:3,standard:"W.4.8",type:"grid-match",passage:lunchSources,passageTitle:"How Should Our School Improve the Lunch Line?",dataTable:lunchTable,questionText:"Match each planning statement to the source or sources that support it. Select exactly 1 source in Row 1, exactly 2 sources in Row 2, and exactly 1 source in Row 3.",gridRows:["Row 1: Menu signs may help students decide earlier.","Row 2: A faster plan still must protect access and eating time.","Row 3: The pilot reduced both typical and longest waits."],gridColumns:["Source 1","Source 2","Source 3"],gridSelection:{perRowMin:1,perRowMax:2,rowSelections:[{min:1,max:1},{min:2,max:2},{min:1,max:1}],totalMin:4,totalMax:4},correctAnswer:["0:0","1:0","1:1","2:2"],scoringRule:{kind:"unordered-set",acceptedAnswers:["0:0","1:0","1:1","2:2"]},rubric:"1 point: All four source matches are correct.",points:1,explanation:"Source 1 discusses signs and cautions; Source 2 gives access/time requirements; Source 3 reports wait data."}),
  item({id:47103,testType:"pt",claim:2,target:"7",dok:4,standard:"W.4.1",type:"extended-writing",passage:lunchSources,passageTitle:"How Should Our School Improve the Lunch Line?",dataTable:lunchTable,studentDirections:"Write an opinion for the school planning team. You may recommend one change, a combined plan, or keeping the current system with targeted adjustments. Use evidence from more than one source and address at least one limitation or competing concern.",questionText:"How should the school improve the lunch line? Write a well-organized opinion using information from the sources.",correctAnswer:"Responses will vary and are scored with the 4-4-2 opinion-writing rubric.",scoringRule:{kind:"manual-rubric"},rubric:"10 points: Organization/Purpose 0–4, Evidence/Elaboration 0–4, Conventions 0–2. NS applies to blank, copied, off-topic, or non-English responses that cannot be scored.",points:10,explanation:"A strong response states a position, integrates accurate evidence from multiple sources, addresses a limitation, and uses clear conventions."}),
];

export const grade4Test4ElaBankVersion=BANK_VERSION;
