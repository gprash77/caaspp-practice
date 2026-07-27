# Grade 4 Phase 4 Plan — Learn MVP and Tests 6–10

Date: 2026-07-27

Status: Approved scope; implementation design gate

Baseline: corrected Grade 4 Test 1, bank version `2026-07-20.1`

New companion-bank version: `2026-07-27.1`

## Approved scope

Phase 4 delivers two independent additions:

1. A small Grade 4 Learn MVP for standard English Math and ELA preparation.
2. Five complete original Grade 4 assessments:
   - Test 6 — Original · Easy
   - Test 7 — Original · Easy
   - Test 8 — Original · Medium
   - Test 9 — Original · Hard
   - Test 10 — Original · Hard

Grade 3, Spanish localization, production secrets, and the released Grade 4 Tests 1–5 are out of scope.

## Grade 4 Learn MVP

The first Learn release will be deliberately small and usable:

- A separate `/learn` route linked from the home page.
- Grade 4 only, with Math and ELA resource groups.
- Eight original mini-lessons:
  - Math: place value and rounding (`4.NBT.A.1`, `4.NBT.A.3`)
  - Math: multiplicative comparison (`4.OA.A.1`, `4.OA.A.2`)
  - Math: fraction equivalence and comparison (`4.NF.A.1`, `4.NF.A.2`)
  - Math: measurement word problems (`4.MD.A.1`, `4.MD.A.2`)
  - ELA: citing details and inference (`RL.4.1`, `RI.4.1`)
  - ELA: main idea and summary (`RI.4.2`)
  - ELA: text structure (`RI.4.5`)
  - ELA: opinion writing with evidence (`W.4.1`, `W.4.9`)
- Each lesson visibly shows its standard tags, a concise explanation, one original worked example, and two original preparation questions.
- Practice feedback is confined to Learn and uses no released assessment prompts, sources, keys, or attempt records.
- Learn will not appear inside `/test`, will not inspect or coach an active attempt, and will state that it is preparation rather than an assessment helper.
- MVP evaluation will cover standards metadata, content separation, initial-answer hiding, feedback after an explicit response, desktop layout, and narrow-viewport usability.

## Locked assessment structure

Every new form matches Tests 1–5:

| Section | Items | Raw points |
|---|---:|---:|
| Math CAT | 31 | 32 |
| Math PT | 5 | 6 |
| ELA CAT | 30 | 30 |
| ELA PT | 3 | 13 |
| **Total** | **69** | **81** |

Common blueprint:

- Math CAT claims: `17 / 3 / 8 / 3`
- Math CAT: one independently tested 2-point partial-credit item
- Math PT claims: three Problem Solving, one Communicating Reasoning, one Modeling/Data Analysis
- ELA CAT claims: Reading `15`, Writing `6`, Listening `6`, Research `3`
- ELA PT: 2-point research response, 1-point research task, 10-point full write
- ELA PT flow: two Part 1 tasks, explicit review, transition, forward-only Part 2
- Three manual rubrics per form: Math PT reasoning, ELA research response, ELA full write

Reserved IDs:

| Test | Math CAT | Math PT | ELA CAT | ELA PT |
|---|---|---|---|---|
| 6 | `50001–50031` | `50101–50105` | `51001–51030` | `51101–51103` |
| 7 | `52001–52031` | `52101–52105` | `53001–53030` | `53101–53103` |
| 8 | `54001–54031` | `54101–54105` | `55001–55030` | `55101–55103` |
| 9 | `56001–56031` | `56101–56105` | `57001–57030` | `57101–57103` |
| 10 | `58001–58031` | `58101–58105` | `59001–59030` | `59101–59103` |

## Original form identities

The themes below are separation contracts, not names to substitute into an existing bank.

| Test | Difficulty | Math PT | Literary | Informational | Listening presentations | ELA PT |
|---|---|---|---|---|---|---|
| 6 | Easy | School Garden Watering Plan | “The Measure in the Music Box” | “How Seeds Travel Without a Map” | “Building a Paper Bridge”; “Why Morning Dew Forms” | “Should the School Create a Quiet Reading Courtyard?” |
| 7 | Easy | Library Book Cart Plan | “A Map in the Margins” | “How Coral Builders Shape a Reef” | “Making a Shadow Clock”; “Why Rivers Curve” | “Should the Park Add a Community Art Wall?” |
| 8 | Medium | Wildlife Camera Battery Plan | “The Lantern Code” | “How a Canal Lock Lifts a Boat” | “Testing a Wetland Model”; “What Tree Rings Record” | “How Should the Library Use Flexible Spaces?” |
| 9 | Hard | Museum Exhibit Transport Plan | “The Route with Two Endings” | “Cooling a City Block” | “Testing a Flood-Barrier Model”; “How Bees Find Their Way Home” | “Should the Town Build a Pocket Park?” |
| 10 | Hard | Community Event Power Plan | “The Echo Between Stations” | “Helping Fish Pass a Dam” | “Measuring a Melting-Ice Model”; “How Sound Changes in a Room” | “Should the School Use Reusable Food Containers?” |

Each form must differ from Tests 1–5 and the other Phase 4 forms in plot, setting, source organization, data, response path, constraint model, listening sequence, and decision tensions. Exact prompts, exact passages, normalized-number prompt shells, and near-identical PT structures are rejected.

## Difficulty contracts

### Tests 6–7 — Easy

- Familiar contexts and explicit directions.
- Mostly DOK 1–2 CAT work, with required DOK 3–4 explanation/modeling tasks.
- Bounded calculations, visible scaffolds, and direct evidence paths.
- Plausible distractors without hidden conditions.

### Test 8 — Medium

- Balanced direct application, inference, representation connections, and multistep reasoning.
- Less prompting than Easy forms while all response rules remain explicit.
- More decisions about relevant information and evidence quality.

### Tests 9–10 — Hard

- More non-routine reasoning, evidence qualification, and meaningful constraints.
- DOK 3–4 work remains fully supported by visible or spoken information.
- Difficulty comes from thinking, not language load, tricks, or interface novelty.

## Authoring and release sequence

1. Add Learn as an isolated preparation surface and verify it independently.
2. Add Tests 6–10 to the manifest as unavailable records.
3. Author the five forms with distinct source/configuration packages.
4. Register ELA PT flows and all manual rubrics.
5. Generate and verify ten original listening M4A files at 125–145 effective words per minute.
6. Build locked `golden.json` and `sources.json` fixtures plus independent evaluators.
7. Run scoring, malformed/blank/boundary, partial-credit, constraint, row-cardinality, rubric, answer-position, provenance, source-length, media, and duplicate gates.
8. Run Tests 1–10 evals, unit tests, lint, production build, every-form browser navigation, persistence, ELA PT transition/submission, Learn interaction, desktop visual QA, and 390 × 844 checks.
9. Enable Tests 6–10 only after their gates pass.
10. Commit only intended Phase 4 files, push `main`, let Vercel deploy, and verify Learn, labels, representative routes, and audio assets in production.

## Required evaluation evidence

- Tests 1–5 remain byte/content locked and pass their existing evaluators.
- Every new section has the exact item and point count.
- IDs are globally unique and provenance is complete.
- Every objective key scores correctly; only registered manual tasks return manual status.
- Partial-credit tiers and DOK-4 constraint models include positive, alternate-valid, negative, malformed, integer, and boundary cases.
- Answer positions avoid excessive repeated letter patterns and are reasonably balanced by section.
- Literary, informational, listening, and ELA PT sources are complete, age-appropriate, answer-sufficient, and free of answer leakage.
- Listening transcript/audio associations are exact and playable.
- Math PT tables/directions contain every quantity, conversion, timing rule, and constraint required for all five tasks.
- Exact and normalized duplicate checks include Grade 4 Tests 1–10 and all Grade 3 banks.
- Attempt identity, reload persistence, result isolation, stale-bank protection, ELA PT source/notes continuity, forward-only Part 2, and manual-score persistence remain intact.

## Release rule

No new test is student-visible until the complete five-form cross-bank gate passes. Learn may be implemented and tested earlier, but Phase 4 is released as one coherent production update unless a blocking defect requires a narrower recovery commit.
