# Tests 11-15 Status

## Date

April 17, 2026

## April 18 Follow-Up

User validation on Test `11` found one scoring-review regression:

- the end-of-test review told users to go check rubrics instead of keeping the answer, rubric, and rationale inline in the review flow

Immediate follow-up:

- restore inline answer / rubric / rationale display in the results review for manually scored items

After that fix lands, continue the remaining lower-priority review work listed below.

## Project Info

- App name: `CAASPP Practice Test`
- Repository name: `caaspp-practice`
- Local repo path: `/Users/gprash77/projects/caaspp-practice`
- Git remote: `git@github.com:gprash77/caaspp-practice.git`
- Vercel project: `caaspp-practice`
- Production URL: `https://caaspp-practice.vercel.app`

## Current Situation

The app now has dedicated authored banks for Practice Tests `11-15`, and those banks are wired into the main local question-loading path.

As of April 17, 2026, Tests `11-15` are no longer relying only on the old transform-based content path when loaded locally through `getQuestions`.

## Requirement

Tests 11-15 must:

- keep the same CAASPP / Smarter Balanced style format
- keep the same CAT / PT structure
- keep the same question counts and general difficulty bands
- use genuinely different stories, articles, contexts, and answer choices
- not reuse the same underlying ELA source sets from Tests 2-10

## Difficulty Mapping

- Test 11 = easy
- Test 12 = easy
- Test 13 = medium
- Test 14 = hard
- Test 15 = hard

## What Was Done

The following commits were created and pushed:

- `f098e84` - Add practice tests 11-15
- `02e7838` - Make practice tests 11-15 distinct
- `84bb74f` - Deepen content changes for practice tests 11-15

Manual production deploy was completed on Vercel:

- Production URL: `https://caaspp-practice.vercel.app`
- Deployment ID: `dpl_54yiSbGbLiQtDsJ4XQTcsTaXWihi`

## What Was Corrected

The old transform-based path in `practice-tests-parallel.ts` was still useful as a temporary scaffold, but Tests `11-15` now have dedicated authored banks:

- `lib/practice-test-11.ts`
- `lib/practice-test-12.ts`
- `lib/practice-test-13.ts`
- `lib/practice-test-14.ts`
- `lib/practice-test-15.ts`

The main question-loading path in `lib/questions.ts` now routes Tests `11-15` to those dedicated banks before falling back to transformed content.

## Remaining Risk

The remaining risk is no longer structural correctness in code. The remaining work is browser verification and content review:

- confirm each new bank reads clearly in the UI
- confirm no new ELA family accidentally overlaps Tests `1-10`
- confirm math contexts feel distinct while still matching corrected Test 1 structure
- confirm PT directions and stimulus layouts read cleanly on localhost

## Verification Completed

These checks passed after integrating the dedicated banks:

- `npm test -- --run tests/question-data.test.ts`
- `npm test -- --run tests/scoring.test.ts`
- `npm run build`

These checks confirm:

- Tests `11-15` match the corrected Test 1 scaffold counts
- the new banks load through the main app question path
- the new banks satisfy current data-integrity and auto-scoring expectations

## Browser Verification Completed

A local Playwright verification pass was also completed for Tests `11-15`.

Confirmed in the browser:

- all `20` section entry pages for Tests `11-15` loaded
- ELA CAT and ELA PT source titles now render in the stimulus panel
- Math PT stimulus tables render correctly for Tests `11-15`
- Test `14` custom `line-plot` interaction renders and responds
- Test `15` custom `shade-grid` interaction renders and its filled state persists across navigation
- browser console showed no errors during the verification pass

## Eval Follow-Up Completed

A deeper stimulus audit is now also complete for the highest-risk `11-15` content:

- presentation / transcript-style ELA CAT blocks
- shared Math PT table stimuli
- table-driven Math CAT items

That follow-up did not find a blocking fairness issue in Tests `11-15`.

The detailed audit notes live in `STIMULUS_AUDIT_2_15.md`.

## Approved Clean Mapping

- Test 11 easy -> brand-new easy set A
- Test 12 easy -> brand-new easy set B
- Test 13 medium -> brand-new medium set C
- Test 14 hard -> brand-new hard set D
- Test 15 hard -> brand-new hard set E

Each set should have its own:

- Math CAT
- Math PT
- ELA CAT fiction passage
- ELA CAT informational passage
- ELA PT source pair

## Next Step

- confirm the Test `11` scoring review once the inline answer / rubric / rationale fix is live
- optional broader non-presentation editorial review if we want a stricter question-by-question pass beyond the completed stimulus eval

## Tomorrow Handoff

When work resumes, the remaining lower-priority review for Tests `11-15` is:

- verify the repaired Test `11` scoring review flow in the browser
- broader non-presentation editorial review across ELA
- optional fuller answer-key spot checks
- any follow-up polish if future comparison against corrected Test 1 reveals fidelity gaps

## Open Product Exploration

One experience question still needs a product decision for presentation-style ELA items:

- whether transcript-only delivery is enough
- or whether the app should provide actual presentation audio so the experience is closer to the real CAASPP / Smarter Balanced flow

Possible direction to explore:

- use the finalized transcript text as the source of truth
- generate presentation-style narration audio from that text
- attach audio playback to the relevant ELA CAT presentation items
- keep visible transcript text as a fallback and accessibility aid
