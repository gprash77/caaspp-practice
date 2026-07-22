# Grade 4 Phase 2 — Architecture Regression Report

Status: Final Phase 2 regression gate passed

Date: 2026-07-22

Test 1 baseline: `2026-07-20.1`

## Outcome

The shared Phase 2 architecture prerequisites are implemented and now support the released Grade 4 Tests 2 and 3. Grade 4 Test 1 remains unchanged as the official 69-item golden baseline.

The canonical Test 1 hashes were deliberately regenerated because the evaluator now serializes every enumerable authored/runtime field and because five item-named scoring rules were replaced by declarative rules. This is an architecture-hash projection change, not a content rebaseline.

## Delivered Architecture

### Grade-aware assessment manifest

- Availability, title, origin, bank version, response-schema version, form difficulty, section counts, and raw points now live in `lib/assessment-manifest.ts`.
- Grade and test number form a composite bank identity.
- Grade 4 Tests 2 and 3 are complete manifest-backed original Easy forms.
- The homepage derives available tests from the manifest.
- Direct routes to unavailable forms return no questions.
- Supabase fallback now filters by practice-test number and rejects a section unless its count exactly matches the manifest.

### Explicit ELA PT segmentation

- Grade 4 Test 1 ELA PT now exposes two Part 1 research tasks.
- Completing Part 1 leads to a review screen and a separate Part 2 transition.
- Entering Part 2 is forward-only in normal practice flow.
- Sources remain available in Part 2.
- Global Notes persist across Part 1, review/transition, Part 2, reload, and pause/resume.
- Results label the work as two Part 1 research tasks and one Part 2 full write.

### Reusable interactions and scoring

- Symmetry configuration is authored as data and supports zero, one, or multiple lines.
- `None` is mutually exclusive with line selections.
- Item-specific helper copy is authored as interaction metadata rather than selected by item ID.
- Item-named scoring branches were replaced with reusable exact/ordered/unordered/numeric-range/constraint/partial-credit/schedule/manual rule families.
- Multi-select and grid interactions support authored minimum/maximum cardinality, prevent excess choices, and require the configured count before a response is complete.
- Grid contracts can override cardinality by row, and symmetry contracts can require multiple non-None lines while preserving exclusive None behavior.
- Numeric-equivalent scoring parses whole numbers, decimals, fractions, mixed numbers, and supported vulgar-fraction characters.
- Reusable linear comparisons support cross-field quantity, distance, and ceiling/floor constraints without item-named logic.
- Line-plot input is normalized to bottom-up column stacks so a response cannot contain vertical gaps.
- Schedule boundaries and rest/meal roles are data-driven rather than hardcoded to Art Day names or times.

### Manual scoring

- Parent/teacher point entry is supported for the 2-point research response.
- The 10-point essay is entered through Organization/Purpose `0–4`, Evidence/Elaboration `0–4`, and Conventions `0–2` traits.
- Range validation, computed totals, rubric version, scorer name, scorer role, scoring date, optional comments, and NS are persisted.
- An unscored response remains distinct from a response explicitly awarded zero.

### Version-safe attempts and results

- Each attempt stores its complete section-bank SHA-256 and response-schema version.
- Mismatched attempts are preserved and blocked from silent overwrite.
- Submission freezes objective scoring outcomes.
- Results are stored and retrieved under their attempt ID and route through `/results?attempt=...`.
- Results verify the current resolvable bank hash/schema before display and refuse to rescore a stale record.

### Reusable evaluator

- `lib/validation/assessment-bank.ts` accepts a manifest, golden fixture, source fixture, and bank resolver.
- Complete stable serialization now locks all enumerable authored/runtime fields, including accepted-answer families, interaction configuration, explanations, scoring rules, media, and metadata.
- Test 1 remains the golden cross-bank baseline through the Grade 4 wrapper.

## Regression Evidence

| Gate | Result |
|---|---|
| Grade 4 Test 1 eval | PASS — 69 items reviewed |
| Unit/data/scoring tests | PASS — 8 files / 1,758 tests |
| TypeScript | PASS |
| ESLint | PASS |
| Production build | PASS |
| Full Playwright suite | PASS — 62/62 |
| Targeted Test 3 browser suite | PASS — 5/5 |
| In-app browser visual review | PASS — theater PT, student-news PT, semantic source table, and listening layout |

The production build initially hit a sandbox-only Turbopack restriction while creating an internal helper process and binding a port. It passed when rerun with the required execution permission. This was not an application/build error.

## Browser Contracts Covered

- Every Grade 4 Test 1 CAT/PT item opens in Chromium.
- Grade 4 exposes only Test 1.
- ELA PT Part 1 review, transition, Part 2 entry, and no-return behavior.
- Source and Global Notes continuity.
- Manual zero-point scoring and reload persistence.
- Attempt-isolated answer persistence.
- Attempt-addressed result records.
- Stale-bank results blocked without rescoring.
- Official partial credit retained.
- Existing Grade 3 homepage, test flow, input, passage, and results behavior.

## Final Phase 2 status

Both original Easy forms now use the architecture described above. Test 2 and Test 3 each passed their locked-bank eval, scoring tests, complete browser navigation, PT segmentation, manual-score persistence, production build, and cross-form review before release.

No Test 2 question, passage, listening script, source package, image, or audio has been authored or enabled at this checkpoint.
