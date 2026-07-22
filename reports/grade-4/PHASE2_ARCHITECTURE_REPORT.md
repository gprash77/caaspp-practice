# Grade 4 Phase 2 — Architecture Regression Report

Status: Ready for Test 2 item-matrix review

Date: 2026-07-21

Test 1 baseline: `2026-07-20.1`

## Outcome

The shared Phase 2 architecture prerequisites are implemented without exposing Grade 4 Test 2 or Test 3. Grade 4 Test 1 remains the only available Grade 4 form, and its 69 prompts, answer keys, point values, sources, and rubrics remain unchanged.

The canonical Test 1 hashes were deliberately regenerated because the evaluator now serializes every enumerable authored/runtime field and because five item-named scoring rules were replaced by declarative rules. This is an architecture-hash projection change, not a content rebaseline.

## Delivered Architecture

### Grade-aware assessment manifest

- Availability, title, origin, bank version, response-schema version, form difficulty, section counts, and raw points now live in `lib/assessment-manifest.ts`.
- Grade and test number form a composite bank identity.
- Grade 4 Tests 2 and 3 exist only as unavailable planning records.
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
| Unit/data/scoring tests | PASS — 6 files / 1,728 tests |
| TypeScript | PASS |
| ESLint | PASS |
| Production build | PASS |
| Full Playwright suite | PASS — 52/52 |
| Targeted Grade 4 browser suite | PASS — 10/10 within full run |
| In-app browser visual review | Unavailable in this session; browser discovery returned no available browser |

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

## Remaining Before Test 2 Content

1. User reviews and approves/revises the detailed Test 2 item matrix.
2. After approval, author the complete Test 2 source packages and items.
3. Add Test 2 golden fixture, provenance, media, scoring cases, fairness review, and browser coverage.
4. Keep Test 2 unavailable until all four sections pass every gate.

No Test 2 question, passage, listening script, source package, image, or audio has been authored or enabled at this checkpoint.
