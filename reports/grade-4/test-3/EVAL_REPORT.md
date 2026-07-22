# Grade 4 Test 3 Eval Report

Date: 2026-07-22

Bank version: `2026-07-22.1`

Form label: Original · Easy

Status: Ready for release

## Locked structure

| Section | Items | Raw points | Result |
|---|---:|---:|---|
| Math CAT | 31 | 32 | Pass |
| Math PT | 5 | 6 | Pass |
| ELA CAT | 30 | 30 | Pass |
| ELA PT | 3 | 13 | Pass |
| Total | 69 | 81 | Pass |

The runtime bank matches the validated item matrix, original-source manifest, and locked canonical hashes in `data/original/grade-4/test-3/golden.json`. Every item includes original-content provenance.

## Blueprint and difficulty review

- Math CAT claims: 17 / 3 / 8 / 3; DOK: 7 / 20 / 4.
- Math PT claims: 3 / 1 / 1; DOK: 2 / 2 / 1 across DOK 2–4.
- ELA CAT claims: 15 / 6 / 6 / 3; DOK: 6 / 20 / 4.
- ELA PT contains two DOK 3 research tasks and one DOK 4 full write.

The form remains Easy through familiar contexts, explicit directions, bounded calculations, visible scaffolds, and direct source evidence while retaining the required higher-DOK explanation and modeling tasks.

## Fairness and stimulus sufficiency

- The Community Theater Seating Plan supplies all row counts, seats-per-row values, capacities, limits, and section requirements used by its five tasks.
- The DOK 4 seating model accepts every whole-number response satisfying the declarative 250–280-seat constraints, not only the exemplar.
- “The Extra Stitch” is 983 words and “Inside a Water Tower” is 925 words. The water-system diagram and semantic component table appear with the article.
- The six writing excerpts are 58–76 words, within the approved 55–110-word band.
- The two listening scripts are 436 and 432 words. Every scored fact is spoken; the map-symbol image is optional.
- The 1,153-word student-news package supports yes, no, and conditional opinions. It treats privacy, accessibility, permission, shared equipment, and adult review as requirements and does not assume home technology.
- Image descriptions were audited for answer leakage. Two geometry descriptions were neutralized before the bank was re-locked.

## Scoring and rubrics

- All 66 objective keys return `correct` through production scoring.
- The three constructed responses return `manual` and have versioned rubrics matching their maximum points.
- Item 44020 independently covers 0-, 1-, and 2-point partial-credit boundaries.
- Item 44105 covers valid exemplars, alternate valid models, row maxima, required Center use, section cardinality, integer-only input, and lower/upper seat boundaries.
- Grid cardinality, ordered fields, unordered sets, numeric equivalence, malformed input, blank input, rubric ranges, trait totals, and no-score behavior are covered.

## Audio

| Presentation | Words | Duration | Effective rate | Result |
|---|---:|---:|---:|---|
| From Cotton Fiber to Cloth | 436 | 197.77 s | 132.3 wpm | Pass |
| Mapping a Neighborhood with Symbols | 432 | 195.25 s | 132.8 wpm | Pass |

Both M4A files load through the production control, use their exact visible transcripts, support play/pause/replay, and fall inside the approved 125–145 wpm band.

## Automated and browser evidence

- `npm run eval:grade4-test3`: PASS, 69 locked items.
- Grade 4 Test 1 and Test 2 evals: PASS, 69 items each.
- `npm test`: PASS, 1,758 tests.
- `npm run lint`: PASS.
- `npm run build`: PASS.
- Targeted Test 3 Playwright: PASS, 5/5.
- Full Playwright regression: PASS, 62/62.
- In-app visual QA: PASS for theater layout, two-dot ELA PT, semantic Source 3 table, and listening/transcript layout.

All Test 3 release gates passed before commit and push.
