# CODEX HANDOFF

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
