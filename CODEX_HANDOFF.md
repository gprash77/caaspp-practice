# CODEX HANDOFF

## August 5, 2026 Handoff — Guided Learn Pilot Complete and Live

### Read This First

The first step toward a deeper Grade 4 curriculum is complete and live. Grade 4
Learn now opens with a guided instructional path while preserving the released
31-lesson, 124-task Practice Library. This release does not add Tests 11–15;
additional full-length forms remain a later objective after the instructional
model is expanded or refined.

Before changing Guided Learn, read:

1. `AGENTS.md`
2. This section
3. `reports/grade-4/GUIDED_LEARN_PILOT_REPORT.md`
4. `reports/grade-4/LEARN_ALIGNMENT_REPORT.md`

### Current Repository and Production State

- Guided Learn release commit: `f10fa32` `Add guided Grade 4 learning pilots`
- The release was pushed to `main` and the GitHub-triggered Vercel production
  deployment reached `Ready`.
- Production: `https://caaspp-practice.vercel.app/learn`
- The production alias was checked for both live pilot entry points:
  `Fractions That Make Sense` and `Evidence Detective`.
- The original Practice Library remains live and selectable.
- The known untracked `tmp/` audit directory remains user-owned and unmodified.

### Delivered Guided Units

| Subject | Unit | Standards | Steps | Guided checks |
| --- | --- | --- | ---: | ---: |
| Math | Fractions That Make Sense | `4.NF.A.1`, `4.NF.A.2` | 6 | 5 |
| ELA | Evidence Detective | `RL.4.1`, `RI.4.1` | 6 | 5 |

Each unit provides direct teaching, a reusable strategy, a modeled example,
guided practice, targeted retry feedback, optional hints, independent work, and
a mastery check. Steps unlock sequentially and completed work remains
revisitable.

### Locked Product Decisions and Safety

- Guided Learn is the default Learn mode; the comprehensive lesson bank is the
  separate Practice Library mode.
- Preserve all released Practice Library lessons, tasks, standards tags, SFUSD
  priority tags, and written-guidance gating.
- Guided progress extends `caaspp-learn:grade4:v2`; it does not create or read
  assessment-attempt records.
- Preserve Learn/assessment isolation and never expose released test-bank keys.
- The two pilot units are the proof of the instructional model, not a claim that
  the full guided Grade 4 curriculum is complete.

### Verification Evidence

- Corrected Test 1 69-item evaluation gate passed with only its longstanding
  approved generated-audio equivalence warning.
- All 1,804 unit, integrity, and scoring tests passed.
- Lint, TypeScript, and the production build passed.
- All 85 Playwright browser regressions passed.
- Desktop and 390 × 844 visual QA passed for the Math and ELA pilots with no
  horizontal overflow or browser warning/error output.
- Production was checked after Vercel reached `Ready`; both guided units and the
  Practice Library selector were present with no browser errors.

### Recommended Next Decision

Use the pilot to decide whether the child-facing lesson rhythm, reading level,
amount of explanation, retry feedback, and sequential unlocking feel right.
Then choose between:

1. expanding this guided contract across the complete Grade 4 Math and ELA
   standards crosswalk, or
2. adjusting the pilot interaction before scaling it.

After the learning path is on a stable expansion track, additional original
full-length assessments can be scoped as Tests 11–15 with the same corrected
Test 1 eval and locked-fixture gates used for Tests 2–10.

## August 5, 2026 Handoff — Grade 4 Phase 4 and Comprehensive Learn Complete and Live

### Read This First

Grade 4 Phases 1–4 are complete. Tests 1–10 and the comprehensive Grade 4 Learn
program are pushed to `main`, deployed through Vercel, and verified in
production. There is no unfinished implementation task at this handoff.

Before changing Grade 4 code or content, read:

1. `AGENTS.md`
2. This August 5 section in `CODEX_HANDOFF.md`
3. `reports/grade-4/PHASE4_PLAN.md`
4. `reports/grade-4/PHASE4_EVAL_REPORT.md`
5. `reports/grade-4/LEARN_ALIGNMENT_PLAN.md`
6. `reports/grade-4/LEARN_ALIGNMENT_REPORT.md`
7. The test-specific matrix and evaluation report for any released form being
   changed.

The July 23 section remains useful for the Phase 1–3 architecture and locked
product decisions, but its statement that Tests 1–5 are the complete Grade 4
program is superseded by this section. Tests 6–10 and the expanded Learn program
are now released.

### Current Repository and Production State

- Repo: `/Users/gprash77/projects/caaspp-practice`
- Branch: `main`
- Latest pushed application/content commit before this handoff update:
  `c70622c` `Expand Grade 4 Learn alignment`
- Phase 4 assessment release commit:
  `714bd6a` `Implement Grade 4 Phase 4 learn and assessments`
- At handoff start, `HEAD`, `origin/main`, and `origin/HEAD` all resolved to
  `c70622ce0e6e8a66e33753d37be760d63d8e9832`.
- Production: `https://caaspp-practice.vercel.app`
- The Vercel production deployment triggered by `c70622c` reached `Ready`, and
  the public `/learn` route was checked for the new headline, Math lesson/task
  totals, and independent-resource/SFUSD disclaimer.
- The only pre-existing untracked path is `tmp/`. It contains local audit
  material and must remain untracked. Do not commit, delete, or clean it merely
  to make `git status` empty.
- No active goal or unfinished code change remains. Confirm the user's next
  objective rather than inferring Grade 5, Spanish, more test forms, or a
  redesign.

### Delivered Phase 4 Assessments

Five additional original Grade 4 companion forms are live:

| Test | Label | Math PT | ELA PT decision topic |
| --- | --- | --- | --- |
| 6 | Original · Easy | School Garden Watering Plan | Quiet Reading Courtyard |
| 7 | Original · Easy | Library Book Cart Plan | Community Art Wall |
| 8 | Original · Medium | Wildlife Camera Battery Plan | Flexible Library Spaces |
| 9 | Original · Hard | Museum Exhibit Transport Plan | Pocket Park |
| 10 | Original · Hard | Community Event Power Plan | Reusable Food Containers |

Each form preserves the established complete-assessment contract:

- Math CAT: 31 items / 32 points
- Math PT: 5 items / 6 points
- ELA CAT: 30 items / 30 points
- ELA PT: 3 authored tasks / 13 points, with two Part 1 research tasks and one
  forward-only Part 2 full write
- Total: 69 items / 81 raw points

All five forms use bank version `2026-07-27.1`. Their locked fixtures live under
`data/original/grade-4/test-6/` through `test-10/`. Treat the fixtures, source
packages, transcripts, audio, keys, constraints, and rubrics as released data.
Any content change requires re-locking the affected form and rerunning the full
CAASPP eval gate.

### Comprehensive Grade 4 Learn Program

The initial eight-question Learn MVP was expanded after the user requested a
more comprehensive program aligned to both California and SFUSD public
guidance.

- Route: `/learn`
- Math: 15 lessons, 60 tasks, 15 guided written tasks, all 28 targeted Grade 4
  California Math standards, and six SFUSD instructional priorities
- ELA: 16 lessons, 64 tasks, 16 guided written tasks, 43 applicable Grade 4
  California ELA standards, and nine SFUSD instructional priorities
- Total: 31 lessons, 124 original tasks, 31 guided written tasks
- Every lesson visibly shows California standard tags and SFUSD-priority tags.
- Difficulty progresses from Foundation to Core to Challenge.
- Subject and domain filters, lesson progress, and completion summaries make the
  larger bank navigable.
- Learn progress persists under the dedicated browser key
  `caaspp-learn:grade4:v2` and remains isolated from assessment attempts.
- Choice feedback appears after answering. Written guidance and a model response
  remain hidden until the learner drafts a response and explicitly chooses to
  review it.
- Learn is preparation-only: it never reads active assessment answers, exposes
  released test-bank keys, or coaches an active test.
- “SFUSD aligned” means crosswalked to SFUSD's public Grade 4 expectations and
  instructional priorities. It does not mean SFUSD endorsement or affiliation,
  and no proprietary SFUSD, Imagine Learning, HMH, or CAASPP content was copied.

The durable standard/priorities crosswalk and source list are in
`reports/grade-4/LEARN_ALIGNMENT_REPORT.md`.

### Locked Product Decisions and Invariants

- Grade 4 Test 1 remains the corrected official public-practice golden baseline.
- Tests 2–10 are original CAASPP-blueprint-aligned companion forms. Never call
  them official copies.
- Preserve every released form's 69-item / 81-point structure.
- Preserve form-level difficulty labels:
  - Test 1: Official Baseline
  - Tests 2, 3, 6, and 7: Original · Easy
  - Tests 4 and 8: Original · Medium
  - Tests 5, 9, and 10: Original · Hard
- Difficulty must come from reasoning, evidence integration, scaffolding, and
  meaningful visible constraints—not tricks, ambiguity, obscure vocabulary,
  cultural assumptions, or missing information.
- Preserve attempt isolation, bank-hash/schema checks, frozen submission
  scoring, manual-rubric state, ELA PT Part 1 review, and the forward-only Part
  2 transition.
- Preserve the clarified Exit Test behavior and source-selection completeness
  guidance added in the earlier user-reported UX fixes.
- Keep Learn storage and assessment-attempt storage independent.

### Final Verification Evidence

Phase 4 assessment release (`714bd6a`):

- Grade 4 Tests 1–10 eval gate passed across 690 runtime items.
- Tests 6–10 had zero eval errors and zero warnings; Test 1 retained only its
  longstanding approved generated-audio equivalence warning.
- All 345 Phase 4 item keys passed runtime scoring.
- Cross-bank checks found no exact or number-normalized prompt duplicates
  against Grade 3, Grade 4 Tests 1–5, or another Phase 4 form.
- All 25 Phase 4 passage/source clusters were distinct.
- Ten local M4A narrations exactly matched their visible transcripts.
- 1,800 unit/integrity tests, lint, TypeScript, production build, and 83 browser
  regressions passed.

Comprehensive Learn release (`c70622c`):

- Corrected Test 1 structural/stimulus/fairness eval gate passed for 69 items;
  only the approved audio-equivalence warning remained.
- 1,803 unit, integrity, and scoring tests passed.
- Learn coverage tests confirmed every targeted California standard and all 15
  SFUSD priorities, unique IDs/prompts, valid keys/explanations, guided-response
  criteria, and balanced answer positions.
- No exact or number-normalized Learn prompt duplicated Grade 4 Tests 1–10.
- Lint, TypeScript, and the production build passed.
- All 84 Playwright tests passed, covering Learn persistence and assessment
  isolation as well as Tests 1–10, scoring, navigation, and narrow screens.
- Desktop and 390 × 844 visual QA passed for Math and ELA Learn. There was no
  horizontal overflow and no browser warning/error output.
- `main` was pushed, Vercel reached `Ready`, and the public production Learn
  content was verified.

### Exact Next-Agent Instructions

1. Read this August 5 section, `AGENTS.md`, and the directly relevant plan,
   matrix, fixture, and eval report before touching released content.
2. Run `git status --short`. Expect only the known untracked `tmp/` directory
   unless the user intentionally added work.
3. Ask the user for the next product objective. Phase 4 and the comprehensive
   Learn expansion are complete; do not invent a Phase 5 scope.
4. For a reported bug, reproduce it locally first and add focused regression
   coverage. Preserve Test 1, attempt isolation, bank-version safety, ELA PT
   segmentation, Learn/assessment separation, and released fixtures.
5. For any test-bank content change, run the corrected Test 1 eval gate plus the
   affected locked-fixture evals, scoring checks, originality comparisons,
   stimulus/source fairness review, and cross-form regression coverage.
6. For Learn content changes, maintain California/SFUSD tags, original-content
   checks, answer-position quality, written-guidance gating, and independence
   from active assessments.
7. For visible or stateful changes, complete unit/scoring tests, lint,
   production build, full browser automation, and in-app desktop/mobile visual
   QA before asking the user to test.
8. Commit only intended files, never include `tmp/`, push `main`, let Vercel
   deploy from GitHub, and verify production rather than assuming it succeeded.

### Do Not Do

- Do not modify Grade 3 or add Spanish support without explicit user approval.
- Do not alter Test 1 as a convenience template.
- Do not label Tests 2–10 or generated narration as official/exact.
- Do not shorten a released Grade 4 form or change its 69-item / 81-point
  contract without explicit approval.
- Do not change locked prompts, sources, keys, rubrics, constraints, fixtures,
  hashes, schemas, or bank versions without rebuilding and rerunning the gate.
- Do not silently rescore or overwrite an attempt created from a different bank
  hash or response schema.
- Do not flatten ELA PT into ordinary tabs or remove its Part 1 review and
  forward-only Part 2 transition.
- Do not connect Learn to active assessment answers or reveal released keys.
- Do not claim official SFUSD endorsement or copy proprietary curriculum.
- Do not ask the user to be the first QA pass.
- Do not commit or delete `tmp/`, `.playwright-cli/`, screenshots, traces, or
  other local artifacts unless explicitly requested.

### Key Commit Timeline

- `9529402` Add official Grade 4 Test 1 baseline
- `accf3e3` Release Grade 4 Test 2 easy form
- `bf4c5d4` Release Grade 4 Test 3 easy form
- `aa85cef` Add Grade 4 medium practice Test 4
- `8d0cda6` Add Grade 4 hard practice Test 5
- `714bd6a` Implement Grade 4 Phase 4 learn and assessments
- `c70622c` Expand Grade 4 Learn alignment

## July 23, 2026 Handoff — Grade 4 Phases 1–3 Complete and Live

### Read This First

The Grade 4 program is no longer waiting on Phase 2 or Phase 3 implementation. Grade 4 Tests 1–5 are complete, pushed to `main`, deployed through Vercel, and independently verified in production.

Before changing Grade 4 code or content, read:

1. `AGENTS.md`
2. This July 23 section in `CODEX_HANDOFF.md`
3. `reports/grade-4/PHASE2_ARCHITECTURE_REPORT.md`
4. `reports/grade-4/PHASE2_RELEASE_CHECKLIST.md`
5. `reports/grade-4/PHASE3_PLAN.md`
6. The item matrix and evaluation report for any form being touched:
   - `reports/grade-4/test-1/PHASE1_EVAL_REPORT.md`
   - `reports/grade-4/test-2/ITEM_MATRIX.md`
   - `reports/grade-4/test-2/EVAL_REPORT.md`
   - `reports/grade-4/test-3/ITEM_MATRIX.md`
   - `reports/grade-4/test-3/EVAL_REPORT.md`
   - `reports/grade-4/test-4/ITEM_MATRIX.md`
   - `reports/grade-4/test-4/EVAL_REPORT.md`
   - `reports/grade-4/test-5/ITEM_MATRIX.md`
   - `reports/grade-4/test-5/EVAL_REPORT.md`

The older July 21 section below is retained as history. Its instructions to wait for Phase 2 approval and its list of unimplemented architecture prerequisites are superseded: the user approved the work, and Phases 2 and 3 are finished.

### Current Repository and Production State

- Repo: `/Users/gprash77/projects/caaspp-practice`
- Branch: `main`
- Current application/content commit: `8d0cda6` `Add Grade 4 hard practice Test 5`
- `HEAD`, `origin/main`, and `origin/HEAD` all resolved to `8d0cda6caa0c7305bbb61bcd6c8fc32834d1a70d` before this documentation-only handoff update.
- Production: `https://caaspp-practice.vercel.app`
- Production was checked after the Test 5 push:
  - Grade 4 selector showed Test 4 as `Original · Medium`.
  - Grade 4 selector showed Test 5 as `Original · Hard`.
  - Test 5 Math PT opened the complete five-item Community Water Station Delivery Plan.
  - Test 5 ELA listening loaded its deployed audio without console errors.
  - Both Test 5 M4A assets returned HTTP 200 with their expected byte sizes.
- The only pre-existing untracked path is `tmp/`. It contains local audit material and must remain untracked. Do not commit, delete, or “clean” it merely to make `git status` empty.
- There is no unfinished Grade 4 Phase 3 task. Ask the user what they want next rather than assuming a new phase or modifying the released forms speculatively.

### Locked Product Decisions

- Grade 4 Test 1 is the corrected official public-practice golden baseline.
- Grade 4 Tests 2–5 are original, CAASPP-blueprint-aligned companion forms. Never describe them as official copies.
- Every Grade 4 form is full length:
  - Math CAT: 31 items / 32 points
  - Math PT: 5 items / 6 points
  - ELA CAT: 30 items / 30 points
  - ELA PT: 3 scored tasks / 13 points
  - Total: 69 scored tasks / 81 raw points
- Difficulty is assigned to the complete form:
  - Test 1: Official Baseline
  - Test 2: Original · Easy
  - Test 3: Original · Easy
  - Test 4: Original · Medium
  - Test 5: Original · Hard
- Difficulty must come from reasoning, evidence integration, scaffolding, and meaningful constraints—not obscure vocabulary, tricks, missing information, cultural assumptions, or unfamiliar controls.
- Test 1 bank version is `2026-07-20.1`.
- Tests 2–5 use original companion bank version `2026-07-22.1`.
- Treat the locked fixtures, matrices, rubrics, source packages, and generated audio as released data. Any content change requires re-locking the affected fixture and rerunning the complete CAASPP eval gate.

### Delivered Grade 4 Forms

#### Test 1 — Official Baseline

- Commit: `9529402` plus interaction/fidelity fixes `6308b25` and `21aef28`.
- Exact locked official-baseline counts, prompts, source associations, keys, points, and rubrics.
- Local listening narration uses exact recovered transcripts but generated M4A files; it remains explicitly `equivalent-approved`, not the original protected official audio binary.
- This is the canonical comparison dataset for all companion-form evaluations.

#### Test 2 — Original · Easy

- Release commit: `accf3e3`.
- Locked fixture: `data/original/grade-4/test-2/golden.json`.
- Shared Math PT: fictional walking-route plan with visible distances, conversion facts, Rest Point condition, and route rules.
- Literary source: “The Last Practice Lap.”
- Informational source: “How a Letter Finds Its Way.”
- Listening: “From Paper Bin to New Paper” and “Watching the Moon's Appearance.”
- ELA PT: a balanced school-improvement source package with access, safety, budget, upkeep, and mixed outcome evidence.
- Passed complete fairness, scoring, browser, audio, persistence, manual-rubric, desktop, and 390 × 844 checks.

#### Test 3 — Original · Easy

- Release commit: `bf4c5d4`.
- Locked fixture: `data/original/grade-4/test-3/golden.json`.
- Shared Math PT: Community Theater Seating Plan.
- Literary source: “The Extra Stitch.”
- Informational source: “Inside a Water Tower.”
- Listening: “From Cotton Fiber to Cloth” and “Mapping a Neighborhood with Symbols.”
- ELA PT: “Should Our School Create a Student News Program?”
- The source package supports yes, no, and conditional positions and treats privacy, accessibility, permission, shared equipment, and adult review as requirements.

#### Test 4 — Original · Medium

- Release commit: `aa85cef`.
- Locked fixture: `data/original/grade-4/test-4/golden.json`.
- Shared Math PT: Community Food Pantry Packing Plan.
- Literary source: “The Unmarked Beat.”
- Informational source: “When a Drawbridge Opens.”
- Listening: “From Clay to a Fired Bowl” and “Reading a Weather Map.”
- ELA PT: “How Should Our School Improve the Lunch Line?”
- Medium difficulty increases inference, representation connections, relevant-information decisions, and multistep reasoning while keeping every rule and source visible.
- Cross-form comparison found no exact prompt or passage reuse against Grade 4 Tests 1–3 or the Grade 3 banks.

#### Test 5 — Original · Hard

- Release commit: `8d0cda6`.
- Locked fixture: `data/original/grade-4/test-5/golden.json`.
- Shared Math PT: Community Water Station Delivery Plan.
- Literary source: “Signals Across the Cove.”
- Informational source: “Room for Roots Beneath a City Street.”
- Listening: “Testing a Model Building Against Shaking” and “How Sand Dunes Move.”
- ELA PT: “Should the Town Use Shielded LED Streetlights?”
- Hard difficulty comes from non-routine modeling, evidence qualification, competing evidence, and layered but fully visible constraints.
- The streetlight package supports replacement, rejection, and conditional/phased recommendations. Safety and accessibility are required constraints; mixed pilot evidence prevents one forced position.
- Exact and normalized-number duplicate review found no reuse against Grade 4 Tests 1–4 or any Grade 3 bank.

### Shared Architecture Now in Production

The Phase 2 architecture prerequisites listed in the older handoff are complete:

- `lib/assessment-manifest.ts`
  - grade-aware manifest
  - availability, origin, difficulty, bank version, response schema, item counts, and raw points
  - homepage labels and available-form behavior derive from the manifest
- `lib/assessment-flow.ts`
  - explicit ELA PT Part 1 research tasks
  - Part 1 review
  - separate Part 2 transition
  - forward-only Part 2 in normal flow
  - source and Global Notes continuity
- `lib/scoring.ts`
  - reusable exact, ordered, unordered, numeric-equivalent, numeric-range, partial-credit, schedule, constraint, and manual scoring
  - no released Grade 4 form depends on item-ID-specific scoring logic
- `lib/manual-rubrics.ts`
  - versioned 2-point research rubrics
  - 10-point 4/4/2 writing rubrics
  - NS, scorer metadata, comments, dates, range validation, and persisted totals
  - unscored remains distinct from a scored zero
- `lib/attempt-records.ts` and `/results`
  - attempt-isolated persistence
  - complete bank SHA-256 and response-schema identity
  - frozen submission scoring
  - stale-bank records are blocked from silent overwrite or rescoring
- `lib/validation/assessment-bank.ts`
  - reusable locked-fixture evaluator
  - complete stable serialization of authored/runtime fields
- Interaction contracts support exact row/selection cardinality, mutually exclusive `None`, multiple symmetry lines, normalized line plots, structured multi-input constraints, and explicit response-completeness guidance.

### Important User-Reported UX Fixes

The user manually exercised the released ELA flows and identified ambiguity that was corrected:

- Commit `4f9d9c2` `Fix ELA PT source-selection guidance`
  - clarified the required number of selections for source-matching rows
  - removed the confusing “please answer the questions” loop caused by incomplete row-cardinality feedback
- Commit `2bcaf8c` `Clarify leaving a practice test`
  - made Exit Test behavior clearer
  - normal browser Back is not the supported way to switch tests because attempt history/persistence can return to the prior test
- Test 5 release also fixed stale-attempt recovery in `app/test/page.tsx`.
  - Previously, “START NEW ATTEMPT” could update the attempt ID but remain on the stale-version warning because component state was not cleared.
  - The question-load effect now clears `staleAttempt` before hydrating the new attempt.
  - `e2e/grade4-test5.spec.ts` contains a regression that seeds an old-bank attempt, preserves it, starts a clean current-bank attempt, and reaches question 1.

Do not remove these behaviors without replacing their regression coverage.

### Final Verification Evidence

Final gates after Test 5 and the stale-attempt recovery fix:

- `npm test`: 10 files / 1,784 tests passed.
- `npm run eval:grade4-test1`: passed, 69 locked baseline items.
  - The only warning is the longstanding, approved Test 1 generated-audio equivalence notice.
- `npm run eval:grade4-test2`: passed, 69 locked original items.
- `npm run eval:grade4-test3`: passed, 69 locked original items.
- `npm run eval:grade4-test4`: passed, 69 reviewed items, zero errors/warnings.
- `npm run eval:grade4-test5`: passed, 69 reviewed items, zero errors/warnings.
- `npm run lint`: passed.
- `npm run build`: passed, including Vitest, TypeScript, Next production compilation, and static generation.
- `npm run test:e2e`: 74/74 passed after adding stale-attempt recovery coverage.
- Every Test 5 Math CAT, Math PT, ELA CAT, and ELA PT item rendered in Chromium.
- High-risk interaction, partial-credit, constraint, grid-cardinality, manual-scoring, PT transition, submission, answer persistence, notes/source continuity, and stale-bank behaviors are covered across the full suite.
- Desktop visual QA passed for the Medium pantry/lunch-line and Hard water/streetlight layouts.
- 390 × 844 checks passed without page-level horizontal overflow.
- Final production checks passed for the Test 5 label, Math PT route, listening route, representative source content, and both audio assets.

Test-specific evidence remains in:

- `reports/grade-4/test-2/EVAL_REPORT.md`
- `reports/grade-4/test-3/EVAL_REPORT.md`
- `reports/grade-4/test-4/EVAL_REPORT.md`
- `reports/grade-4/test-5/EVAL_REPORT.md`

### Commit Timeline for the Completed Grade 4 Work

- `9529402` Add official Grade 4 Test 1 baseline
- `6308b25` Improve Grade 4 Math interactions
- `21aef28` Show fixed Art Day boundary times
- `f26e73a` Document Grade 4 Phase 2 handoff
- `cf56adb` Build Grade 4 Phase 2 architecture
- `18750e6` Harden Grade 4 Test 2 planning contracts
- `8142182` Finalize Grade 4 Test 2 review matrix
- `accf3e3` Release Grade 4 Test 2 easy form
- `bf4c5d4` Release Grade 4 Test 3 easy form
- `7e9636e` Record Grade 4 Phase 2 production release
- `4f9d9c2` Fix ELA PT source-selection guidance
- `2bcaf8c` Clarify leaving a practice test
- `aa85cef` Add Grade 4 medium practice Test 4
- `8d0cda6` Add Grade 4 hard practice Test 5

### Exact Next-Agent Instructions

1. Read this July 23 section, `AGENTS.md`, and the relevant plan/matrix/eval report before touching a released form.
2. Run `git status --short` and confirm that only the known untracked `tmp/` path is present unless the user has intentionally added other work.
3. Confirm the user's next objective. Phase 3 is complete; do not infer that the next task is Grade 5, more Grade 4 forms, or a redesign.
4. If the user reports a bug, reproduce it locally first and add a focused regression test. Preserve attempt isolation, bank-version safety, ELA PT segmentation, and the Test 1 golden baseline.
5. If any test-bank content changes, run the affected locked-fixture eval plus Test 1 and all intervening Grade 4 regression evals.
6. For visible or stateful changes, run unit/scoring tests, lint, production build, full browser automation, and in-app visual QA before asking the user to check.
7. Commit only intended files, never include `tmp/`, push `main`, allow Vercel to deploy from GitHub, and verify production rather than assuming deployment succeeded.

### Do Not Do

- Do not alter Grade 4 Test 1 as a convenience template for companion-form changes.
- Do not label Tests 2–5 or their generated audio as official or exact.
- Do not shorten any released Grade 4 form or change its 69-item / 81-point structure without explicit user approval.
- Do not weaken Hard difficulty by removing required reasoning, or make it harder through ambiguity or missing information.
- Do not change locked answers, rubrics, sources, constraints, hashes, or bank versions without rebuilding the fixture and rerunning the complete gate.
- Do not silently rescore or overwrite attempts from a different bank hash/schema.
- Do not flatten ELA PT back into three ordinary tabs; preserve Part 1 review and the forward-only Part 2 transition.
- Do not ask the user to be the first QA pass.
- Do not commit or delete `tmp/`, `.playwright-cli/`, screenshots, traces, or local generated artifacts unless explicitly requested.

## July 21, 2026 End-of-Day Handoff — Grade 4 Phase 1 Complete / Phase 2 Planned

### Read This First

The user is building a carefully validated Grade 4 CAASPP practice program. Grade 4 Test 1 is the corrected official public-practice baseline. The next work is Phase 2: two new full-length Easy companion forms, Grade 4 Tests 2 and 3.

Before changing code, read:

1. `AGENTS.md`
2. `reports/grade-4/PHASE2_PLAN.md`
3. `reports/grade-4/test-1/PHASE1_EVAL_REPORT.md`
4. `data/official/grade-4/test-1/golden.json`
5. `data/official/grade-4/test-1/sources.json`

Do not generate Test 2 or Test 3 content until the user approves the revised Phase 2 plan. The plan is intentionally a draft at this handoff.

### Current Repository State

- Repo: `/Users/gprash77/projects/caaspp-practice`
- Branch: `main`
- Latest pushed commit: `21aef28` `Show fixed Art Day boundary times`
- `HEAD` and `origin/main` both resolve to `21aef2809d71985051c2e9815f989a4d9d69fa41` before this documentation-only handoff update.
- Application/content work is pushed.
- `tmp/` contains local official-PDF audit materials and must remain untracked.
- `reports/grade-4/PHASE2_PLAN.md` is the new Phase 2 planning document being added with this handoff.
- Vercel deploys from pushed `main`. The latest production deployment was triggered by the push, but production was not independently rechecked after every final UI adjustment.

### User Decisions — Treat These as Requirements

- Grade 4 Test 1 must remain the exact public-practice golden baseline for prompts, sources, keys, points, and rubrics.
- Tests 2 and 3 are original companion forms. Do not label them official or exact CAASPP copies.
- Tests 2 and 3 must remain **full length**, matching Test 1:
  - Math CAT: 31 items / 32 points
  - Math PT: 5 items / 6 points
  - ELA CAT: 30 items / 30 points
  - ELA PT: 3 scored tasks / 13 points
  - Total: 69 items / 81 points
- Difficulty is assigned to the **whole practice test**, not split into equal easy/medium/hard item quotas inside one form.
- Grade 4 Test 2: full-length Easy form.
- Grade 4 Test 3: full-length Easy form.
- Future Medium and Hard tests must also remain full length; they are outside the immediate Phase 2 scope.
- An Easy form still needs honest Grade 4 standards and required higher-DOK coverage. Make it easier through language, contexts, scaffolding, and reduced constraint layering—not through missing coverage or weak questions.
- The user wants reusable data, scoring, rubric, browser, persistence, audio, fairness, and regression evals—not a one-time content dump.
- Continue using subagents where parallel audits or independent evaluation materially improve accuracy.

### Grade 4 Phase 1 Delivered

Commit `9529402` added the official Grade 4 Test 1 baseline:

- Math CAT: 31 items / 32 points
- Math PT: 5 items / 6 points
- ELA CAT: 30 items / 30 points
- ELA PT: 3 scored tasks / 13 points
- Total: 69 items / 81 points

Primary implementation files:

- `lib/grade4-test1-math.ts`
- `lib/grade4-test1-ela.ts`
- `lib/scoring.ts`
- `lib/validation/grade4-test1.ts`
- `tests/grade4-test1-fidelity.test.ts`
- `e2e/grade4-test1.spec.ts`
- `scripts/eval-grade4-test1.ts`

The baseline includes locked source PDF hashes, independent key sequences, content hashes, asset hashes, scoring rules, rubrics, mutation tests, point scoring, persistence, and browser coverage.

### Phase 1 Follow-Up Fixes

Commit `6308b25` improved Grade 4 Math interactions:

- Math CAT item 18 now uses large Vertical, Horizontal, Diagonal, and None choices with a visual preview.
- Math CAT item 30 uses numeric fruit-count fields and explicitly says students do not need to drag fruit.
- Important Phase 2 requirement: the item 18 component is still a single-selection Test 1 solution. Generalize future symmetry items for zero, one, or multiple lines before reusing it.

Commit `21aef28` fixed Math PT Art Day question 4:

- Painting start is visibly locked at `9:00 a.m.`.
- Chalk Art end is visibly locked at `2:00 p.m.`.
- Scoring treats both boundary times as fixed, including older saved attempts.

### User Manual QA Completed

The user manually reviewed the Grade 4 ELA CAT and said it is good.

Recommended high-risk ELA CAT review had included:

- hot-text/selection equivalents
- ordered two-part items
- multi-select limits
- listening items 22–27
- balloon matching chart
- passage switching and standalone writing items

Treat this as user acceptance of the current ELA CAT experience, not permission to weaken future automated checks.

### Known ELA Performance Task Flow Defect

The ELA PT content count and scoring are correct, but the current navigation is not an exact match to the official flow.

Correct student-facing structure:

- Part 1: two research questions
  - evidence-based short response: 2 points
  - source-matching chart: 1 point
- Part 2: one separate informational essay: 10 points

Current app behavior:

- All three scored tasks appear as ordinary question tabs in one continuous segment.

Required correction before cloning the PT flow:

- Represent Part 1 and Part 2 explicitly.
- Add a Part 1 review/submit step and Part 2 transition screen.
- Preserve sources and notes across both parts.
- Persist segment state.
- Do not allow the normal practice flow to return to Part 1 after entering Part 2.
- Results should report three scored tasks without calling the essay a third Part 1 research question.

### Rubric and Scoring Status

- Objective items auto-score with official keys and supported partial credit.
- Written short responses and essays correctly return `manual` status rather than pretending to be automatically graded.
- The current results page displays the rubric and manual-scoring notice.
- The 10-point ELA essay rubric is correctly structured as:
  - Organization/Purpose: 0–4
  - Evidence/Elaboration: 0–4
  - Conventions: 0–2
  - NS criteria
- Phase 2 plan calls for an operational parent/teacher rubric-entry workflow with range validation, trait totals, rubric version, optional comments, scorer role/name, and scoring date.
- Distinguish an unscored manual response from a response awarded zero points.

### Listening Audio Caveat

- ELA CAT items 22–27 use exact transcripts recovered from the live public CAASPP practice interface.
- Local M4A narration was generated from those exact transcripts.
- The local audio is **not** the original session-protected CAASPP audio binary and must remain labeled `equivalent-approved`, not exact.
- Future Test 2/3 listening scripts and audio must be original, answer-sufficient, provenance-recorded, and browser-tested for metadata, play, pause, replay, and transcript association.

### Latest Validation Evidence

After the Art Day boundary-time fix:

- `npm run eval:grade4-test1`: passed; 69 runtime items reviewed against the locked fixture.
- `npm test`: passed; 4 files / 1,716 tests.
- `npm run lint`: passed.
- `npm run build`: passed, including the 1,716 tests and Next production build.
- `npm run test:e2e -- e2e/grade4-test1.spec.ts`: 9/9 passed.
- Visual browser QA confirmed both locked Art Day times.

Earlier, the full repository browser suite passed 49/49 after the initial Phase 1 baseline. The most recent UI fixes were verified with the targeted 9-test Grade 4 browser suite plus unit/build/lint/eval gates; do not misstate that a new full 49-test run occurred after every later UI fix.

### Phase 2 Research Findings

Official current California adjusted blueprints are shorter than the public Practice Test 1, but the user explicitly rejected shortening the companion forms. Use official blueprints as claim/DOK/standards constraints while keeping the longer Test 1 item counts.

Grade 4 subjects:

- ELA CAT
- ELA PT
- Math CAT
- Math PT
- No Grade 4 CAST; science begins in Grade 5.

Official references are linked in `reports/grade-4/PHASE2_PLAN.md`.

The Grade 3 custom banks are not safe templates for Grade 4 content. Audit findings included shallow rubrics, transcript-only or miswired audio, near-parallel prompt shells, simplified PT scoring, inconsistent difficulty comments, and flat ELA PT navigation. Reuse only broad structural ideas—not passages, questions, counts, keys, or copy-and-substitute patterns.

### Phase 2 Architecture Prerequisites

Complete these before authoring Test 2:

1. Add a grade-aware assessment manifest for test availability, origin, form difficulty, sections, counts, points, and bank version.
2. Correct ELA PT Part 1/Part 2 segmentation.
3. Generalize symmetry for zero, one, or multiple lines with None mutually exclusive.
4. Replace item-number-specific scoring branches with reusable declarative scoring rules.
5. Add operational manual rubric score entry.
6. Pin attempts/results to the complete attempted bank hash and response-schema version.
7. Parameterize the Test 1 evaluator for Tests 2 and 3 with schema-complete canonicalization.
8. Expand browser contracts for audio playback, all response types, PT transitions, persistence, results, stale-bank handling, desktop, and narrow viewport.

Important registry issue: `getQuestions()` currently handles `practiceTest > 1` through the global Grade 3 dedicated-test map before the Grade 4 Test 1 branch. The current filters avoid returning mismatched Grade 3 items, but Grade 4 Tests 2/3 need a proper grade-aware manifest/registry rather than extending this global switch.

### Exact Next-Agent Instructions

1. Read the five files listed under “Read This First.”
2. Read the latest user messages in the task and confirm the revised plan reflects:
   - full-length forms
   - Test 2 Easy
   - Test 3 Easy
   - difficulty at the form level
3. Ask the user to approve or revise `reports/grade-4/PHASE2_PLAN.md` before implementation.
4. Once approved, create a focused implementation plan for the architecture prerequisites only.
5. Implement the grade-aware manifest and ELA PT segmentation first.
6. Run the complete Test 1 eval/regression/browser gate and fix all regressions before enabling Test 2.
7. Produce a detailed Test 2 item matrix for user review before writing full item content.
8. Author and validate Test 2 completely before starting Test 3.
9. Use independent author/reviewer passes and cross-form duplicate checks.
10. Follow `AGENTS.md`: evals, tests, build, browser/visual QA, focused commit, push `main`, then let Vercel deploy.

### Do Not Do

- Do not shorten Tests 2 or 3 to current adjusted operational counts.
- Do not assign equal easy/medium/hard item quotas inside Tests 2 or 3.
- Do not label original tests or generated audio as official/exact.
- Do not copy Grade 3 Test 2/3 passages, questions, shallow rubrics, or audio wiring.
- Do not expose Test 2 before all four of its sections exist and pass validation.
- Do not silently rescore saved attempts against a changed bank.
- Do not ask the user to QA before the agent completes local eval, browser, and visual checks.
- Do not commit `tmp/`, `.playwright-cli/`, or generated test artifacts.

### Handoff Deliverables

- Revised Phase 2 plan: `reports/grade-4/PHASE2_PLAN.md`
- This handoff: `CODEX_HANDOFF.md`
- Test 1 Phase 1 report: `reports/grade-4/test-1/PHASE1_EVAL_REPORT.md`
- Latest application commit before docs: `21aef28`

## May 8, 2026 End-of-Day Handoff

### Current State

- Repo: `/Users/gprash77/projects/caaspp-practice`
- Branch: `main`
- Latest pushed commit: `4e34734` `Make hard Math CAT tests unique`
- Previous hard-batch commit: `3cc6651` `Rebaseline hard Tests 8 through 10`
- Tests `4`, `5`, `8`, `9`, and `10` have been rebaselined and pushed.
- Worktree state at handoff start: clean and aligned with `origin/main`.
- Vercel should deploy from pushed `main`; production redeploy was not manually rechecked after the final handoff-doc update unless noted in a later section.

### Completed Today

- Completed and pushed the Tests `4` and `5` batch:
  - Test `4` now uses the kite / butterfly source family:
    - `The Lost Kite`
    - `All About Butterflies`
    - transcript-style presentation clusters about kite searching and butterfly gardens
  - Test `5` now uses the lemonade / animal-homes source family:
    - `The Lemonade Stand`
    - `Amazing Animal Homes`
    - transcript-style presentation clusters about lemonade planning and animal homes
  - Added coherent shared Math PT tables for:
    - Test `4` school kite festival
    - Test `5` lemonade stand
  - Fixed Test `5` ELA PT fairness by changing the writing task from unsupported teamwork/cooperation language to the better-supported idea of planning/building to meet a need.
  - Updated the data-integrity guard so Tests `4` and `5` presentation clusters validate transcript sufficiency instead of requiring audio metadata.

- Completed and pushed the hard-batch Tests `8`, `9`, and `10`:
  - Added shared helper:
    - `lib/hard-practice-test-rebaseline.ts`
  - Replaced repeated Test-1-style ELA CAT source families with unique hard companion content:
    - Test `8`: `The Case of the Missing Fossil`, `Life in the Desert`, museum/desert transcript clusters
    - Test `9`: `The Weather Station Problem`, `How Water Changes Land`, weather/erosion transcript clusters
    - Test `10`: `The Trail Crew`, `The Long Journey of the Monarch Butterfly`, trail/monarch transcript clusters
  - Replaced repeated `Go Green` Math PT setup with unique harder shared-table Math PTs:
    - Test `8`: field-study notebooks, pencils, and water bottles
    - Test `9`: garden-weather observations and seed trays
    - Test `10`: nature-walk trail markers, maps, and signs
  - Fixed the Math CAT number-line key in Tests `8-10` from `5` to `5/8`.
  - After user noticed Test `4` and Test `8` were exactly the same in Math CAT, replaced the hard-batch Math CAT overlays for Tests `8`, `9`, and `10`.
  - Confirmed Test `4` vs Tests `8`, `9`, and `10` now has `0` exact duplicate Math CAT prompts.
  - Audited hard-batch math fields carefully, especially:
    - `correctAnswer`
    - `acceptedAnswers`
    - `dataTable`
    - `tableColumns`
    - `tableRowLabel`
    - `tableMinSumExclusive`
    - text-input answer values
    - table-input scoring constraints
  - Fixed time-answer formatting across noon in the hard Math CAT (`a.m.` to `p.m.` transitions).

### Validation Completed Today

- CAASPP eval / content gate for Tests `4`, `5`, `8`, `9`, and `10`:
  - compared runtime section counts against corrected Test `1` baseline expectations
  - reviewed Math PT shared table sufficiency and answerability
  - reviewed ELA CAT source-family uniqueness and transcript fairness
  - reviewed ELA PT source visibility and prompt support
  - confirmed Tests `8-10` are harder companion tests, not exact copies of Test `1` or the easier batches
- `npm test -- --run tests/question-data.test.ts` passed during the Test `4` / `5` batch: `1646` tests.
- `npm test -- --run tests/scoring.test.ts` passed during the Test `4` / `5` batch: `49` tests.
- `npm test -- --run tests/question-data.test.ts tests/scoring.test.ts` passed after hard-batch updates: `1695` tests.
- Hard Math CAT auto-score audit passed:
  - Test `8`: `0` bad auto-scored answers
  - Test `9`: `0` bad auto-scored answers
  - Test `10`: `0` bad auto-scored answers
- Hard Math PT field audit passed:
  - text-input answers score correctly
  - table-input sample answers score correctly
  - table metadata matches prompt expectations
- `npm run build` passed after both major batches:
  - full Vitest suite passed: `1700` tests
  - Next production build passed
- `npm run test:e2e` passed after both major batches:
  - `40/40` tests passed
- Targeted local browser verification passed for:
  - Test `4` Math PT shared kite-festival table
  - Test `5` Math PT shared lemonade table
  - Test `4` ELA CAT source family and transcript clusters
  - Test `5` ELA CAT source family and transcript clusters
  - Test `4` / `5` ELA PT prompts and source visibility
  - Tests `8`, `9`, and `10` Math PT shared tables
  - Tests `8`, `9`, and `10` ELA CAT first/second sources
  - Tests `8`, `9`, and `10` ELA CAT transcript clusters

### Important Product Intent

- Test `1` remains the corrected official baseline reference.
- Tests `2-10` should be CAASPP-similar companion tests, not exact official CAASPP copies.
- Difficulty should now vary more meaningfully:
  - Tests `2-5`: easier companion tests
  - Tests `8-10`: harder companion tests with more multi-step reasoning and less duplicated content
- Keep being honest about exactness:
  - Test `1` is the official-alignment target.
  - Tests `2-10` are similarity, fairness, structure, and practice-quality targets.

### Known Caveats

- Tests `6` and `7` were not rebaselined today and likely still need their own medium-batch audit.
- Tests `8-10` now have unique Math CAT, Math PT, and ELA CAT runtime content, but they are still local companion tests rather than exact official CAASPP forms.
- Tests `4`, `5`, `8`, `9`, and `10` presentation clusters are transcript-based and do not use generated audio.
- The current integrity tests validate counts, metadata, answer references, auto-scored answers, transcript sufficiency, and passage/source presence; they do not prove full CAASPP pixel parity.
- A new remote branch seen earlier, `origin/claude/fix-cassp-add-tests-Gs1nV`, looked unsafe to merge as-is because it deleted many current project files/audio and collapsed test-bank structure.

### Recommended Next Work

1. Start the medium batch: Tests `6` and `7`.
2. Use the same workflow:
   - audit runtime bank against corrected Test `1`
   - compare against nearby batches to avoid duplicated Math CAT / ELA CAT / Math PT content
   - improve Math PT shared stimulus and table sufficiency
   - review all math text-input and table-input fields for correctness
   - review ELA CAT source-family uniqueness and transcript fairness
   - run data/scoring/build/e2e/browser checks
   - commit and push `main`
   - let Vercel deploy from GitHub
3. After Tests `6` and `7`, do a cross-test duplication audit across Tests `2-10`, especially:
   - exact `questionText` duplicates
   - repeated Math CAT scaffolds
   - repeated ELA CAT source families
   - repeated Math PT shared-stimulus contexts
4. Consider adding a durable automated duplicate-report script/test so future batches cannot accidentally repeat the Test `4` / Test `8` Math CAT issue.

### Git Notes

- `main` was pushed today with:
  - `a431d38` `Rebaseline Tests 4 and 5`
  - `3cc6651` `Rebaseline hard Tests 8 through 10`
  - `4e34734` `Make hard Math CAT tests unique`
- At the time this handoff was written, only `CODEX_HANDOFF.md` was being intentionally updated for this docs-only handoff commit.

## May 2, 2026 End-of-Day Handoff

### Current State

- Repo: `/Users/gprash77/projects/caaspp-practice`
- Branch: `main`
- Latest pushed app/content commit: `e288c71` `Rebaseline Tests 2 and 3`
- Production URL checked: `https://caaspp-practice.vercel.app`
- Production is serving the Test `2` / Test `3` batch changes.
- Worktree state after this handoff update: clean after the handoff docs commit.

### Completed Today

- Continued the Tests `2-10` rebaseline rollout in two-test batches.
- Completed the first easy batch: Tests `2` and `3`.
- Rebuilt Test `2` around the approved companion-test source family:
  - `The Storm Dog`
  - `The Amazing Ocean`
  - themed transcript-style CAT items for helping animals
- Rebuilt Test `3` around the approved companion-test source family:
  - `The Surprise Garden`
  - `The Busy World of Honeybees`
  - themed transcript-style CAT items for gardens and bees
- Fixed a serious pre-existing issue where Tests `2` and `3` had too much duplicated runtime content and did not consistently reflect their approved source families.
- Added shared Math PT setup/stimulus tables for:
  - Test `2` bake-sale / field-trip context
  - Test `3` school-garden context
- Strengthened ELA PT scaffolds for Tests `2` and `3` so each now uses:
  - source-matching `grid-match`
  - source-based `short-answer`
  - `extended-writing`
- Revised Test `3` ELA PT writing prompt from an overbroad plant/insect dependency claim to the better-supported prompt: how people and bees can help plants grow.
- Revised themed presentation wording for Tests `2` and `3` to say students read presentation transcripts, rather than implying unavailable generated audio.
- Updated the data-integrity guard so Tests `2` and `3` validate transcript sufficiency for their themed presentation clusters, while later tests with generated audio still require audio metadata.

### Validation Completed Today

- CAASPP eval / content gate for Tests `2` and `3`:
  - compared runtime section counts against the corrected Test `1` baseline expectations
  - reviewed stimulus sufficiency for Math PT shared tables
  - reviewed ELA CAT presentation transcript fairness
  - reviewed ELA PT source visibility and prompt support
  - confirmed Tests `2` and `3` are CAASPP-similar companion tests, not exact official CAASPP copies
- `npm test -- --run tests/question-data.test.ts` passed: `1646` tests.
- `npm test -- --run tests/scoring.test.ts` passed: `49` tests.
- `npm run build` passed:
  - full Vitest suite passed: `1700` tests
  - Next production build passed
- `npm run test:e2e` passed: `40/40`.
- Targeted local browser verification passed for:
  - Test `2` Math PT shared bake-sale table
  - Test `3` Math PT shared garden table
  - Test `2` ELA PT source-match first item
  - Test `3` ELA PT source-match first item
  - Test `2` ELA CAT source family
  - Test `3` ELA CAT source family
- Production browser verification passed for:
  - Test `2` Math PT
  - Test `3` Math PT
  - Test `2` ELA PT
  - Test `3` ELA PT

### Important Product Intent

- Test `1` remains the corrected official baseline reference.
- Tests `2-10` should **not** be exact copies of official CAASPP tests.
- Tests `2-10` should be CAASPP-similar companion tests:
  - similar structure and grade-level rigor
  - similar CAT / PT feel
  - source-based ELA with fair visible stimuli
  - math items answerable from prompt/table/stimulus
  - new content families, not reused official public-test content
- Continue to be honest about exactness: Test `1` is the official-alignment target; Tests `2-10` are similarity and quality targets.

### Known Caveats

- Tests `2` and `3` are now much more coherent and source-family aligned, but their Math CATs still have fewer custom interaction types than corrected Test `1`.
- Math PTs for Tests `2` and `3` now have shared setup tables and coherent context, but they are still simpler companion PTs than the official Test `1` `Going Green` PT.
- The themed Test `2` / Test `3` presentation clusters are transcript-based. They do not have generated audio files.
- This batch did not touch Tests `4-10`; leave those for their own two-test passes.

### Recommended Next Work

1. Start the next easy batch: Tests `4` and `5`.
2. Use the same workflow:
   - audit runtime bank against corrected Test `1`
   - preserve approved source families
   - improve Math PT shared stimulus / table sufficiency
   - strengthen ELA PT prewriting shape where needed
   - verify answer keys and prompt fairness
   - run data/scoring/build/e2e/browser checks
   - commit and push `main`
   - verify production
3. After Tests `4` and `5`, continue:
   - Medium batch: Tests `6` and `7`
   - Hard batch: Tests `8` and `9`
   - Final hard batch: Test `10` alone with extra review

### Git Notes

- `main` was pushed with:
  - `e288c71` `Rebaseline Tests 2 and 3`
- Production was verified after the push.
- Handoff update was committed separately as docs-only work.

## May 1, 2026 End-of-Day Handoff

### Current State

- Repo: `/Users/gprash77/projects/caaspp-practice`
- Branch: `main`
- Latest pushed commit: `543836a` `Document Test 1 official comparison`
- Previous app/content commit: `b994856` `Align Test 1 with official CAASPP baseline`
- Current priority: user will validate Test 1 against the official CAASPP practice-test experience.

### Completed Today

- Corrected Grade 3 Test 1 toward the official public CAASPP / Smarter Balanced baseline.
- Updated Math CAT Test 1 from the old local 36-item set to the official 31-item structure.
- Corrected many Math CAT Test 1 prompts, options, keys, tables, grid-match items, line-plot item, fraction model item, and related explanations.
- Corrected ELA CAT Test 1 prompts/options/keys against the official public scoring-guide item screens.
- Kept scoring/rubric behavior in scope only where answer keys/content required it. The scoring model itself was not refactored.
- Added generated Test 1 presentation audio files:
  - `public/audio/presentations/grade-3/test-1-soaring-on-the-wings-of-the-wind.m4a`
  - `public/audio/presentations/grade-3/test-1-all-about-pizza.m4a`
- Wired Test 1 ELA presentation items to those audio files.
- Updated the test UI so math `dataTable` stimulus tables render for math questions, not only in ELA passage panels.
- Updated question text rendering to preserve official multiline prompt formatting.
- Added comparison/audit document:
  - `TEST1_OFFICIAL_COMPARISON.md`

### Validation Completed Today

- CAASPP eval gate script passed:
  - Math CAT count: `31`
  - Math PT count: `5`
  - ELA CAT count: `30`
  - ELA PT count: `3`
  - key/sample-answer checks passed for the corrected Test 1 baseline.
- `npm test -- --run tests/question-data.test.ts tests/scoring.test.ts` passed: `1695` tests.
- `npm run build` passed.
- Targeted Playwright/browser verification passed for:
  - Math CAT official count/navigation
  - Math item 7 table
  - Math grid-match item
  - Math line-plot item
  - Math fraction-model item
  - ELA CAT official count/navigation
  - ELA presentation audio wiring for both Test 1 presentations
- `npm run test:e2e` passed: `40/40`.
- Pushed `main`; Vercel should deploy from `main`.

### Test 1 Comparison Receipt

- The durable audit table is in:
  - `TEST1_OFFICIAL_COMPARISON.md`
- It compares:
  - Math CAT: official `31`, local `31`
  - Math PT: official `5`, local `5`
  - ELA CAT: official `30`, local `30`
  - ELA PT: official `3`, local `3`
- It includes item-by-item official key vs local key and content-status notes.

### Known Caveats

- The public CAASPP / Smarter Balanced scoring-guide PDFs provide static item screens, answer keys, rubrics, and presentation question screens.
- They do not provide the original official audio binaries.
- Therefore, the app now has generated local audio and sufficient transcript-style presentation content, but we cannot prove byte-for-byte identical CAASPP audio from the public PDFs alone.
- Some official math interactions/diagrams are represented with local app controls or textual equivalents where the app does not yet have exact CAASPP interaction widgets:
  - clock/shape/number-line diagrams
  - multiplication table response
  - area diagram
  - line plot
  - fraction model
- These were checked for answerability and key alignment, but not pixel-perfect CAASPP UI parity.

### Important User Notes

- User wants Test 1 to be exactly like the CAASPP site, including presentation/listening content.
- User said scoring/rubric seems fine and should not be the focus.
- User will validate the comparison and Test 1 experience.
- Be honest about exactness: counts, keys, prompts, and major item content are now documented, but the remaining exactness risk is official audio and pixel-perfect custom interactions.

### Recommended Next Work

1. User validates `TEST1_OFFICIAL_COMPARISON.md` and the live/deployed Test 1.
2. If user finds mismatches, fix Test 1 first before expanding any more tests.
3. If user wants stricter exactness, next engineering task is to add visual/custom widgets for the remaining official math presentations:
   - analog clock item
   - polygon/perimeter diagram
   - unequal-part fraction shape
   - multiplication table with embedded response boxes
   - number-line choice diagrams
   - area grid diagram
   - richer official-style line plot and fraction-bar interactions
4. After Test 1 is accepted, return to content quality for Tests `16-18`:
   - presentation scripts are still shorter/simpler than ideal
   - some math items may still be too template-like
   - improve CAASPP style before using them as a pattern.
5. Later rebuild Tests `2-10` in difficulty batches after Test 1 is accepted and Tests `16-18` are strengthened.

### Git Notes

- `main` was pushed with:
  - `b994856` `Align Test 1 with official CAASPP baseline`
  - `543836a` `Document Test 1 official comparison`
- At the time this handoff was written, `CODEX_HANDOFF.md` itself was the only local file being intentionally updated for tomorrow.
