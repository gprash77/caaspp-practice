# Tests 2-10 Implementation Map

## Date

April 17, 2026

## Goal

Tests `2-10` should follow the corrected Test 1 baseline in structure for both ELA and math while keeping distinct companion-test content.

For Tests `2-10`, the target scaffold is:

- Math CAT: `36` items
- Math PT: `5` items
- ELA CAT: `30` items
- ELA PT: `3` items

## Integration Strategy

Use the same successful pattern used for Tests `11-15`:

1. Create dedicated per-test files for Tests `2-10`.
2. Keep the old grouped banks in place until the dedicated files are ready.
3. Route Tests `2-10` through the dedicated files in `lib/questions.ts`.
4. Run integrity, scoring, build, and browser verification before check-in.

## Current Legacy State

The legacy authored banks for Tests `2-10` are still loaded from the grouped files:

- `lib/practice-tests-extra.ts`
- `lib/practice-tests-easy.ts`
- `lib/practice-tests-medium.ts`
- `lib/practice-tests-challenge.ts`

Legacy structure currently differs from corrected Test 1:

- Math PT: `7` items
- ELA CAT: `37` items
- ELA PT: `4` items

## Approved Theme Families

These are the existing test families that should be preserved unless a quality issue is discovered during implementation:

### Test 2

- ELA CAT literary: `The Storm Dog`
- ELA CAT informational: `The Amazing Ocean`
- ELA PT source pair: `The Storm Dog / The Amazing Ocean`
- Math theme: keep Test 2 math family, but normalize to corrected Test 1 scaffold

### Test 3

- ELA CAT literary: `The Surprise Garden`
- ELA CAT informational: `The Busy World of Honeybees`
- ELA PT source pair: `The Surprise Garden / The Busy World of Honeybees`
- Math theme: keep Test 3 math family, but normalize to corrected Test 1 scaffold

### Test 4

- ELA CAT literary: `The Lost Kite`
- ELA CAT informational: `All About Butterflies`
- ELA PT source pair: `The Lost Kite / All About Butterflies`
- Math theme: keep Test 4 math family, but normalize to corrected Test 1 scaffold

### Test 5

- ELA CAT literary: `The Lemonade Stand`
- ELA CAT informational: `Amazing Animal Homes`
- ELA PT source pair: `The Lemonade Stand / Amazing Animal Homes`
- Math theme: keep Test 5 math family, but normalize to corrected Test 1 scaffold

### Test 6

- ELA CAT literary: `The Lantern Bridge`
- ELA CAT informational: `How Rivers Shape the Land`
- ELA PT source pair: `The Lantern Bridge / How Rivers Shape the Land`
- Math theme: keep Test 6 math family, but normalize to corrected Test 1 scaffold

### Test 7

- ELA CAT literary: `The Moonlight Garden`
- ELA CAT informational: `Why Wetlands Matter`
- ELA PT source pair: `The Moonlight Garden / Why Wetlands Matter`
- Math theme: keep Test 7 math family, but normalize to corrected Test 1 scaffold

### Test 8

- ELA CAT literary: `The Map in the Bell Tower`
- ELA CAT informational: `How Volcanoes Build New Land`
- ELA PT source pair: `The Map in the Bell Tower / How Volcanoes Build New Land`
- Math theme: keep Test 8 math family, but normalize to corrected Test 1 scaffold

### Test 9

- ELA CAT literary: `The Rainy Day Plan`
- ELA CAT informational: `Clouds in the Sky`
- ELA PT source pair: `The Rainy Day Plan / Clouds in the Sky`
- Math theme: keep Test 9 math family, but normalize to corrected Test 1 scaffold

### Test 10

- ELA CAT literary: `The River Race`
- ELA CAT informational: `The Long Journey of the Monarch Butterfly`
- ELA PT source pair: `The River Race / The Long Journey of the Monarch Butterfly`
- Math theme: keep Test 10 math family, but normalize to corrected Test 1 scaffold

## Guardrails

- Match corrected Test 1 structure, not the older pre-correction Test 1 scaffold.
- Do not rely on transformed content as the final solution.
- Preserve distinct story and article families across Tests `2-15`.
- Prefer existing supported item types already used by corrected Test 1.
- Trim or rewrite legacy PT / CAT tails when they exceed the corrected Test 1 counts.

## Implementation Decision

Instead of hand-authoring nine giant replacement files, the chosen implementation uses:

- dedicated per-test entry files for Tests `2-10`
- one shared adapter that trims each legacy bank to the corrected Test 1 scaffold

This preserves the existing companion-test themes while normalizing the section counts and PT direction behavior.

## Verification Plan

Before check-in:

- `npm test -- --run tests/question-data.test.ts`
- `npm test -- --run tests/scoring.test.ts`
- `npm run build`
- browser verification for representative sections across Tests `2-10`

## Result

- Tests `2-10` now have dedicated routing targets
- the normalized scaffold is enforced in code
- shared ELA PT directions are preserved after trimming
