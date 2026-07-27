# Grade 4 Phase 4 Evaluation Report

Date: July 27, 2026
Bank version: `2026-07-27.1`
Status: Release gate passed

## Delivered Scope

- Grade 4 Learn MVP at `/learn`
  - four Math lessons and four ELA lessons
  - two original practice questions per lesson
  - visible California Grade 4 standard tags
  - prep-only boundary: Learn does not read assessment attempts, reveal bank answers, or coach an active test
- Five original full Grade 4 assessments
  - Test 6: Original Easy
  - Test 7: Original Easy
  - Test 8: Original Medium
  - Test 9: Original Hard
  - Test 10: Original Hard

Grade 3 and Spanish localization were not changed.

## Assessment Contract

Every Phase 4 form matches the released Grade 4 Test 1–5 contract:

| Section | Items | Points |
| --- | ---: | ---: |
| Math CAT | 31 | 32 |
| Math PT | 5 | 6 |
| ELA CAT | 30 | 30 |
| ELA PT | 3 authored; 2 in Part 1 and 1 in Part 2 | 13 |
| **Total** | **69** | **81** |

Each form contains 17/3/8/3 Math CAT claim items and 15/6/6/3 ELA CAT claim items. Tests 6–7 retain accessible DOK 1 scaffolding; Tests 9–10 contain no DOK 1 Math CAT items and include at least 17 DOK 3–4 Math CAT items.

## Form Content

| Test | Difficulty | Math PT | ELA literary / informational | Listening presentations | ELA PT |
| --- | --- | --- | --- | --- | --- |
| 6 | Easy | School Garden Watering Plan | *The Measure in the Music Box* / *How Seeds Travel Without a Map* | *Building a Paper Bridge*; *Why Morning Dew Forms* | Quiet Reading Courtyard |
| 7 | Easy | Library Book Cart Plan | *A Map in the Margins* / *How Coral Builders Shape a Reef* | *Making a Shadow Clock*; *Why Rivers Curve* | Community Art Wall |
| 8 | Medium | Wildlife Camera Battery Plan | *The Lantern Code* / *How a Canal Lock Lifts a Boat* | *Testing a Wetland Model*; *What Tree Rings Record* | Flexible Library Spaces |
| 9 | Hard | Museum Exhibit Transport Plan | *The Route with Two Endings* / *Cooling a City Block* | *Testing a Flood-Barrier Model*; *How Bees Find Their Way Home* | Pocket Park |
| 10 | Hard | Community Event Power Plan | *The Echo Between Stations* / *Helping Fish Pass a Dam* | *Measuring a Melting-Ice Model*; *How Sound Changes in a Room* | Reusable Food Containers |

All content and narration transcripts are original. Automated comparison found no exact or number-normalized prompt duplicates against Grade 3, Grade 4 Tests 1–5, or another Phase 4 form. All 25 Phase 4 passage/source clusters are distinct.

## Source and Audio Sufficiency

Word counts are listed as literary, informational, listening A, listening B, and ELA PT:

| Test | Source word counts |
| --- | --- |
| 6 | 673, 648, 291, 315, 821 |
| 7 | 679, 641, 291, 318, 807 |
| 8 | 679, 653, 300, 318, 811 |
| 9 | 683, 658, 289, 331, 815 |
| 10 | 688, 659, 300, 322, 817 |

The ten local M4A narrations exactly match their visible transcripts. Final narration pacing is approximately 123–136 words per minute:

| Test | Presentation A | Presentation B |
| --- | ---: | ---: |
| 6 | 135.1 WPM | 124.7 WPM |
| 7 | 135.9 WPM | 125.1 WPM |
| 8 | 134.1 WPM | 124.9 WPM |
| 9 | 128.8 WPM | 127.1 WPM |
| 10 | 133.7 WPM | 123.0 WPM |

The content review confirmed that every source-based ELA question is answerable from its displayed source or transcript. Math PT data tables expose every value and constraint required by their questions. ELA PT prompts require evidence from the visible three-source packet and explicitly preserve competing evidence and limitations.

## Scoring and Answer Quality

- All 345 Phase 4 item keys pass runtime scoring.
- Manual scoring is limited to the registered Math PT explanation and ELA PT constructed-response tasks.
- Every form includes the required 2-point partial-credit Math CAT item.
- Open plans accept alternate valid responses through visible mathematical constraints.
- ELA PT uses the established two-question Part 1 review, explicit Part 2 transition, and 10-point full-write rubric.
- Single-answer positions are balanced:
  - Math: A/B/C/D = 5/5/4/4 per form
  - ELA: A/B/C/D = 7/7/7/7 per form

## Verification

- Grade 4 Test 1–10 eval gate: passed
  - 690 runtime items reviewed against locked fixtures
  - Tests 6–10: zero errors and zero warnings
  - Test 1 retains its existing approved local-narration equivalence warning
- Unit and integrity suite: 12 files, 1,800 tests passed
- ESLint: passed
- Production build and TypeScript: passed
- Playwright full regression: 83 tests passed
- Phase 4 browser coverage includes:
  - all new difficulty labels and routes
  - representative complete Easy, Medium, and Hard section scaffolds
  - Learn Math/ELA navigation and delayed practice feedback
  - answer persistence and Test 6/Test 7 attempt isolation
  - both Test 10 local narrations
  - Test 8 ELA PT review and forward transition
  - narrow-screen Learn and Hard Math PT
- In-app visual QA completed for:
  - Learn desktop lesson view
  - Test 6 Easy Math PT
  - Test 8 Medium ELA PT
  - Test 10 Hard ELA listening

## Main Changed Areas

- Learn UI and lesson bank: `app/learn/`, `lib/grade4-learn.ts`
- Phase 4 assessment banks: `lib/grade4-phase4-math.ts`, `lib/grade4-phase4-ela.ts`, `lib/grade4-phase4-sources.ts`
- Registration, flow, and rubrics: assessment manifest, question registry, ELA PT flow, manual rubrics
- Locked fixtures and evaluators: `data/original/grade-4/test-6/` through `test-10/`, Phase 4 validation and eval scripts
- Narration: ten Grade 4 M4A files plus generation targets
- Regression coverage: Phase 4 unit tests and browser tests, with existing Grade 4 selector tests updated for Tests 1–10
