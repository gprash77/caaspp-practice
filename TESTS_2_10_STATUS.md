# Tests 2-10 Status

## Date

April 17, 2026

## Project Info

- App name: `CAASPP Practice Test`
- Repository name: `caaspp-practice`
- Local repo path: `/Users/gprash77/projects/caaspp-practice`
- Git remote: `git@github.com:gprash77/caaspp-practice.git`
- Vercel project: `caaspp-practice`
- Production URL: `https://caaspp-practice.vercel.app`

## Goal

Rebaseline Tests `2-10` so they follow the corrected Test 1 scaffold while preserving their distinct companion-test content families.

## Target Scaffold

- Math CAT: `36`
- Math PT: `5`
- ELA CAT: `30`
- ELA PT: `3`

## Legacy Gap

The current grouped banks for Tests `2-10` still use the older app scaffold:

- Math PT: `7`
- ELA CAT: `37`
- ELA PT: `4`

That means Tests `2-10` still need the same normalization that was already completed for Test 1 and Tests `11-15`.

## Working Plan

Use the same delivery flow used for Test 1 and Tests `11-15`:

1. Create dedicated per-test files for Tests `2-10`.
2. Route those tests through the dedicated files in `lib/questions.ts`.
3. Run integrity, scoring, build, and browser verification.
4. Commit focused changes.
5. Push `main` to GitHub.
6. Let Vercel deploy from `main`.

## Approved Theme Families

- Test `2`: `The Storm Dog` / `The Amazing Ocean`
- Test `3`: `The Surprise Garden` / `The Busy World of Honeybees`
- Test `4`: `The Lost Kite` / `All About Butterflies`
- Test `5`: `The Lemonade Stand` / `Amazing Animal Homes`
- Test `6`: `The Lantern Bridge` / `How Rivers Shape the Land`
- Test `7`: `The Moonlight Garden` / `Why Wetlands Matter`
- Test `8`: `The Map in the Bell Tower` / `How Volcanoes Build New Land`
- Test `9`: `The Rainy Day Plan` / `Clouds in the Sky`
- Test `10`: `The River Race` / `The Long Journey of the Monarch Butterfly`

## Current Work Split

- Dedicated standalone files for Tests `2-10`: complete
- Router updates: complete
- Automated verification: complete
- Browser verification: complete

## What Was Done

- added dedicated entry files for Tests `2-10`
- added a shared adapter that first normalized the legacy grouped banks to the corrected Test 1 scaffold
- routed Tests `2-10` through the dedicated files in `lib/questions.ts`
- preserved shared ELA PT directions when the normalized `3`-item PT cut would otherwise drop them
- replaced the wrapper-only dedicated files with real standalone bank files for Tests `2-10`
- rebuilt the ELA CAT tails so Tests `2-10` now use presentation-style authored endings that feel closer to corrected Test 1 and authored Tests `11-15`

## Verification Completed

These checks passed:

- `npm test -- --run tests/question-data.test.ts`
- `npm test -- --run tests/scoring.test.ts`
- `npm run build`

Representative browser verification also passed on localhost:

- Test `2` ELA CAT loaded with `30` questions and `The Storm Dog`
- Test `6` Math PT loaded with `5` questions
- Test `8` ELA CAT loaded with `30` questions and `The Map in the Bell Tower`
- Test `10` ELA PT loaded with `3` questions and visible student directions

Additional localhost browser verification after the authored-bank rebuild:

- Test `5` ELA CAT loaded cleanly
- Test `7` ELA CAT loaded cleanly
- Test `10` ELA CAT loaded cleanly

## Eval Follow-Up Completed

A later detailed eval pass found and fixed one fairness issue in the adapted Tests `2-10` bank:

- Tests `2` and `3` ELA PT had been trimmed to `3` items, but the final retained writing item was still showing only one source while asking students to use both sources

That issue is now fixed in `lib/practice-test-adapter.ts`, and the loaded ELA PT questions for Tests `2` and `3` now show the full combined source set on all retained PT items.

Additional runtime scans did not find any other blocking source-visibility or custom math-interaction metadata issue in Tests `2-10`.

After the authored-bank rebuild, the new presentation-style ELA CAT tails for Tests `2-10` also passed:

- `npm test -- --run tests/question-data.test.ts`
- `npm test -- --run tests/scoring.test.ts`
- `npm run build`

## Next Step

- commit the authored Tests `2-10` rebuild
- push `main` to GitHub
- let Vercel deploy from `main`
