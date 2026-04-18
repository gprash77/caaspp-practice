# Tests 11-15 Status

## Date

April 17, 2026

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

Before any further deploy, do one final content-quality review of the new ELA/math families against Tests `1-10`, then prepare the `Test 1` + `Tests 11-15` check-in.
