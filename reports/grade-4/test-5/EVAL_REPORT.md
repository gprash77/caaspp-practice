# Grade 4 Test 5 Hard — Evaluation Report

Date: 2026-07-22

Status: Release gate passed

Bank version: `2026-07-22.1`

## Outcome

Grade 4 Test 5 is a complete original Hard form with 69 scored tasks and 81 raw points. It preserves the corrected Test 1 scaffold and the validated response, persistence, manual-scoring, and ELA PT segmentation architecture used by Tests 2–4.

| Section | Items | Points | Result |
|---|---:|---:|---|
| Math CAT | 31 | 32 | Pass |
| Math PT | 5 | 6 | Pass |
| ELA CAT | 30 | 30 | Pass |
| ELA PT | 3 | 13 | Pass |
| **Total** | **69** | **81** | **Pass** |

Math CAT claim counts are `17 / 3 / 8 / 3`, with DOK counts `13 / 16 / 2` for DOK 2/3/4. ELA CAT claim counts are `15 / 6 / 6 / 3`, with DOK counts `11 / 19` for DOK 2/3. The single two-point CAT item, three manual rubrics, constrained-response boundaries, and ELA PT 1/2/1 row cardinality are independently tested.

## Golden baseline and fairness review

- Tests 1–5 evaluation gates pass against their locked fixtures; Test 1 remains unchanged as the corrected official baseline.
- The Hard profile increases evidence integration, non-routine modeling, qualification, and multistep constraint reasoning without relying on obscure vocabulary, hidden rules, or missing information.
- Every capacity, time window, conversion, minimum, reserve, and whole-container rule needed by the water-station Math PT is visible. The final model accepts multiple valid two-trip plans and rejects capacity, container-count, integer, minimum-delivery, and reserve violations.
- Reading and listening keys are explicitly supported by their attached sources. Source lengths are 995 words for the literary passage, 1,034 for informational, 513 and 530 clean spoken words for listening, and 1,345 for the ELA PT package.
- The streetlight package supports replacement, rejection, or a conditional/phased recommendation. Safety and accessibility remain required constraints, while the pilot's mixed outcomes and stated limitations prevent the data from forcing one position.
- Exact and normalized-number prompt comparison found no reuse against Grade 4 Tests 1–4 or any Grade 3 bank.

## Audio review

| Presentation | Spoken words | Duration | Effective rate |
|---|---:|---:|---:|
| Testing a Model Building Against Shaking | 513 | 233.58 s | 131.8 wpm |
| How Sand Dunes Move | 530 | 234.59 s | 135.6 wpm |

Both M4A files load in the browser, match their attached transcripts, and remain inside the approved 125–145 effective words-per-minute band.

## Automated and browser verification

- Unit/integrity: 10 files, 1,784 tests passed.
- Test 1–5 fixture/content evals: passed; Test 5 reviewed all 69 items with zero errors or warnings.
- Lint and production build: passed, including TypeScript and static generation.
- Full Playwright regression: 74/74 passed.
- Test 5 browser coverage: every Math CAT, Math PT, ELA CAT, and ELA PT task rendered; high-risk interactions worked; both narrations loaded; a two-trip water response persisted across reload; the ELA PT review and forward-only transition completed; submission reached results.
- Version safety: a stale saved-bank attempt is preserved, and the recovery action now opens a clean current-bank attempt instead of looping on the warning screen.
- Desktop visual inspection: the Hard label, semantic water-plan table, response controls, complete streetlight sources, and pilot data table are readable with no missing stimulus or console errors.
- Narrow viewport: 390 × 844 Math PT check passed with no horizontal page overflow.

## Release disposition

Test 5 is approved for availability as `Original · Hard`. Together with the already released Test 4 `Original · Medium` form, it completes the Grade 4 Phase 3 scope.
