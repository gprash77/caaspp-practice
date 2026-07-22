# Grade 4 Test 4 Medium — Evaluation Report

Date: 2026-07-22

Status: Release gate passed

Bank version: `2026-07-22.1`

## Outcome

Grade 4 Test 4 is a complete original Medium form with 69 scored tasks and 81 raw points. It preserves the corrected Test 1 scaffold and the validated Phase 2 response, persistence, manual-scoring, and ELA PT segmentation architecture.

| Section | Items | Points | Result |
|---|---:|---:|---|
| Math CAT | 31 | 32 | Pass |
| Math PT | 5 | 6 | Pass |
| ELA CAT | 30 | 30 | Pass |
| ELA PT | 3 | 13 | Pass |
| **Total** | **69** | **81** | **Pass** |

Math CAT claim counts are `17 / 3 / 8 / 3`; ELA CAT claim counts are `15 / 6 / 6 / 3`. The single two-point CAT item, three manual rubrics, and ELA PT 1/2/1 row cardinality are independently tested.

## Golden baseline and fairness review

- Tests 1–4 evaluation gates pass against their locked fixtures; Test 1 remains unchanged as the corrected official baseline.
- The Medium profile increases inference, representation connections, and multistep work without using obscure vocabulary, hidden response rules, or missing source information.
- Every pantry quantity, package rate, reserve, mass, and cart limit is visible on all five Math PT tasks. The final model accepts multiple valid whole-number plans and rejects box-range, reserve, food-minimum, availability, weight, and integer violations.
- Reading and listening keys are explicitly supported by their attached sources. Passage lengths are 950 words for the literary source, 981 for informational, 464 and 512 spoken words for listening, and 1,173 for the ELA PT package.
- The lunch-line package supports more than one defensible recommendation and explicitly protects eating time, accessibility, food choice, staffing, cost, and family-resource fairness.
- Exact prompt and passage comparison found no reuse against Grade 4 Tests 1–3 or the Grade 3 banks.

## Audio review

| Presentation | Words | Duration | Effective rate |
|---|---:|---:|---:|
| From Clay to a Fired Bowl | 464 | 206.96 s | 134.5 wpm |
| Reading a Weather Map | 512 | 212.05 s | 144.9 wpm |

Both M4A files load in the browser, match the attached transcripts, and remain inside the approved 125–145 effective words-per-minute band.

## Automated and browser verification

- Unit/integrity: 9 files, 1,770 tests passed after the Test 4 flow registration.
- Production build: passed, including TypeScript and static generation.
- Full Playwright regression: 68/68 passed.
- Test 4 browser coverage: every Math CAT, Math PT, ELA CAT, and ELA PT task rendered; audio loaded; a pantry response persisted across reload; the ELA PT review and forward-only transition completed; submission reached results.
- Desktop visual inspection: Medium label, semantic pantry table, response controls, complete lunch-line sources, and pilot table are readable with no missing stimulus.
- Narrow viewport: 390 × 844 Math PT check passed with no horizontal page overflow.

## Release disposition

Test 4 is approved for availability as `Original · Medium`. Test 5 remains unavailable until its separate Hard-form gate passes.
