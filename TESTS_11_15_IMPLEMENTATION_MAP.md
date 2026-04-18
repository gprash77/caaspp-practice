# Tests 11-15 Implementation Map

## Date

April 17, 2026

## Goal

Tests `11-15` should follow the corrected Test 1 baseline in structure for both ELA and math while using fully new content families.

For Tests `11-15`, the target scaffold is:

- Math CAT: `36` items
- Math PT: `5` items
- ELA CAT: `30` items
- ELA PT: `3` items

## Difficulty Split

- Test `11` = easy
- Test `12` = easy
- Test `13` = medium
- Test `14` = hard
- Test `15` = hard

## Approved Mapping

### Test 11

- ELA CAT literary: `The Sidewalk Chalk Team`
- ELA CAT informational: `How Murals Tell Community Stories`
- ELA PT sources: `A Wall for Everyone` + `Why Public Art Matters`
- Math CAT theme: `School Garden Day`
- Math PT theme: `Community Garden Helpers`

### Test 12

- ELA CAT literary: `The Broken Robot`
- ELA CAT informational: `How Simple Machines Help People Work`
- ELA PT sources: `Fixing the Parade Robot` + `Machines in Everyday Life`
- Math CAT theme: `Neighborhood Pet Fair`
- Math PT theme: `Pet Fair Supplies`

### Test 13

- ELA CAT literary: `The Fossil in the Schoolyard`
- ELA CAT informational: `How Fossils Form`
- ELA PT sources: `The Ridge Discovery` + `Why Fossils Help Scientists`
- Math CAT theme: `Museum Discovery Week`
- Math PT theme: `Fossil Hall Exhibit Plan`

### Test 14

- ELA CAT literary: `The Midnight Rehearsal`
- ELA CAT informational: `How Sound Moves Through Space`
- ELA PT sources: `Saving the Concert` + `Why Acoustics Matter`
- Math CAT theme: `Harbor Build Project`
- Math PT theme: `Concert Hall Renovation`

### Test 15

- ELA CAT literary: `The Desert Observatory`
- ELA CAT informational: `How Telescopes Gather Light`
- ELA PT sources: `Night at Mesa Station` + `Why Dark Skies Matter`
- Math CAT theme: `Mountain Science Camp`
- Math PT theme: `Mesa Station Skywatch Plan`

## Guardrails

- Match corrected Test 1 structure, not the old transformed `11-15` structure.
- Do not use the rewrite/transform approach in `practice-tests-parallel.ts` as the final solution.
- Do not reuse Test `1-10` story families, article families, or PT source families.
- Keep difficulty differences in reasoning and reading load, not by drifting outside Grade 3 scope.
- Prefer existing supported item types already used by corrected Test 1.

## Integration Plan

1. Add dedicated new-bank files for Tests `11-15`.
2. Import those banks into the main question-loading path.
3. Stop relying on transformed older tests for `11-15`.
4. Run integrity, scoring, and build checks.
5. Browser-check each of the five new tests locally before deploy.

## Current Status

Steps `1-4` are now complete.

Completed integration:

- dedicated files added for Tests `11-15`
- `lib/questions.ts` now routes Tests `11-15` to those dedicated banks
- integrity, scoring, and build checks passed

Remaining step:

- browser-check each of the five new tests locally before deploy

Browser verification is now complete for:

- all `11-15` section entry pages
- ELA title/source rendering
- Math PT stimulus-table rendering
- the custom `line-plot` and `shade-grid` interactions
