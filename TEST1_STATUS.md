# Test 1 Status

## Date

April 17, 2026

## Summary

Test 1 baseline correction is complete enough to serve as the reference scaffold for the rest of the rollout.

The completed sections are:

- Test 1 Math CAT
- Test 1 Math PT
- Test 1 ELA CAT
- Test 1 ELA PT

The remaining work for Test 1 is:

- optional follow-up polish if later `Tests 2-15` comparison work reveals any fidelity gaps

## Completed Work

### Math CAT

Completed:

- official baseline gap analysis created
- item-by-item baseline matrix created
- feasibility plan for official items `#14-#31` created
- Bucket A implemented
- Bucket B implemented
- Bucket C implemented
- local scoring updated for new response shapes
- local question loading updated so Test 1 uses the corrected local bank
- integrity and scoring tests passed
- local browser spot-check completed by user and reported as fine

Key docs:

- `TEST1_BASELINE_GAP_ANALYSIS.md`
- `TEST1_MATH_CAT_BASELINE_MATRIX.md`
- `TEST1_MATH_CAT_14_31_FEASIBILITY_PLAN.md`

Key code areas touched:

- `lib/questions.ts`
- `lib/scoring.ts`
- `tests/scoring.test.ts`
- `tests/question-data.test.ts`
- `app/test/page.tsx`
- `app/globals.css`

## Remaining Work

Test 1 no longer has a blocking implementation gap.

The remaining work is rollout work that depends on Test 1:

- use corrected Test 1 as the scaffold for Tests `2-10`
- keep Tests `11-15` aligned with the same scaffold during any follow-up fixes

### Completed Math PT Work

Implemented:

- replaced custom `School Fun Fair` PT with the official public `Going Green` structure
- aligned Test 1 Math PT to the official `5`-item sequence instead of the old `7`-item app sequence
- added a new `table-input` interaction for the official row-completion item
- added auto-scoring support for the `table-input` rule
- updated local integrity tests to reflect the official Test 1 PT length
- integrity and scoring tests passed

Key doc:

- `TEST1_MATH_PT_GAP_ANALYSIS.md`

### ELA CAT Progress

Completed:

- official breakpoint confirmed through item `#14`
- official public CAT length confirmed as `30` items
- official item `#10` restored as a true two-part item
- official public items `#15-#21` restored
- official public items `#22-#30` restored
- custom app-only continuation removed from the Test 1 CAT baseline
- local integrity/scoring tests passed after the full CAT restoration

Key doc:

- `TEST1_ELA_CAT_BASELINE_MATRIX.md`
- `TEST1_ELA_CAT_15_21_IMPLEMENTATION_PLAN.md`

Next action at the time this section was completed:

- browser-check items `#22-#30`, then move to ELA PT

### 2. ELA PT

Current state:

- official astronaut/space PT is now restored in Test 1
- custom `rewards from nature` PT has been removed from the Test 1 baseline
- Test 1 ELA PT now uses the official `3`-item scored structure

Key doc:

- `TEST1_ELA_PT_GAP_ANALYSIS.md`

Next action at the time this section was completed:

- browser-check the restored astronaut/space PT

## Recommended Next Step

Start with:

- **Begin Tests 2-10 rebaseline work**

Reason:

- Test 1 baseline correction is complete enough to act as the reference scaffold
- Tests `11-15` are now integrated, browser-verified, pushed to GitHub, and deployed
- the next planned rollout phase is to re-evaluate and correct Tests `2-10` against the corrected Test 1 baseline

## Full Rollout Plan

After Test 1 is fully corrected, the broader sequence should be:

1. Finish Test 1 completely
   - Math CAT
   - Math PT
   - ELA CAT
   - ELA PT

2. Then move directly to Tests 11-15
   - these should follow the corrected Test 1 standard as closely as practical
   - they should keep the planned difficulty distribution:
     - Test 11 = easy
     - Test 12 = easy
     - Test 13 = medium
     - Test 14 = hard
     - Test 15 = hard

3. Then come back to Tests 2-10
   - these should be reevaluated and corrected against the corrected Test 1 baseline after Tests 11-15 are complete
   - they should be reviewed for structure, fidelity, difficulty, and content quality relative to the corrected Test 1 baseline

## Important Product Intent

Tests 2-15 should not merely match the old app-specific Test 1 style.

They should match the corrected Test 1 baseline as closely as practical, while still being new companion tests rather than copies of the official public practice test.

That means:

- same overall CAASPP / Smarter Balanced style structure
- same general CAT / PT feel
- same grade-level expectations
- difficulty mapped intentionally across tests
- new content, not reused source families
