# Grade 4 Test 2 Eval Report

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

The runtime bank matches the approved item matrix, the `2026-07-22.1` original-source manifest, and the locked canonical hashes in `data/original/grade-4/test-2/golden.json`. Every item records an original source ID, author, license statement, and review date.

## Blueprint and difficulty review

- Math CAT claims: Claim 1 = 17, Claim 2 = 3, Claim 3 = 8, Claim 4 = 3.
- Math CAT DOK: DOK 1 = 7, DOK 2 = 20, DOK 3 = 4.
- Math PT DOK: DOK 2 = 2, DOK 3 = 2, DOK 4 = 1.
- ELA CAT claims: Claim 1 = 15, Claim 2 = 6, Claim 3 = 6, Claim 4 = 3.
- ELA CAT DOK: DOK 1 = 6, DOK 2 = 20, DOK 3 = 4.
- ELA PT DOK: DOK 3 = 2, DOK 4 = 1.

The form remains Easy through familiar contexts, direct wording, bounded arithmetic, explicit source evidence, and mostly DOK 1–2 CAT items. DOK 3–4 items require explanation, integration, or modeling without relying on advanced content.

## Content fairness and stimulus sufficiency

- Math diagrams and interaction data were reviewed item by item. Every plotted value, property, distance, and response constraint needed for scoring is visible in the prompt, table, or hashed image.
- The five-item Math PT uses one complete fictional walking-route map. The three segment distances, Rest Point condition, conversion facts, and route rules are available throughout the task.
- “The Last Practice Lap” is 858 words and “How a Letter Finds Its Way” is 905 words, inside the approved reading bands. The mail-process diagram and accessible stage/purpose table are rendered with the article.
- The two listening scripts are 434 and 450 words. Every keyed fact is explicitly spoken, including the three observation/phase pairings in the Moon presentation. The optional chart is not required to answer any listening item.
- The ELA PT source package is 1,123 words. It presents benefits, required access/safety features, budget and upkeep limits, and mixed outcome data. It supports positive, negative, and conditional opinions without privileging one position.
- The Maple Point data table is rendered inside Source 3 with semantic row and column headers. Required accessibility work is described as a design obligation rather than an optional benefit.
- Topics, names, settings, numerical models, passages, listening scripts, and PT packages were reviewed against Grade 4 Test 1 and all available Grade 3 forms. No exact prompt or passage reuse remains. Semantic review found no number-swapped Test 1 or Grade 3 item shell.

## Scoring and rubric review

- All 66 objective item keys independently return `correct` through the production scoring function.
- The three constructed-response items return `manual` and have registered rubric versions matching their point values.
- Negative cases cover incorrect ordered pairs, under/over-selection, malformed responses, partial-credit boundaries, invalid decimals and negatives, distance-range boundaries, the required Segment B condition, and the requirement to use at least two segment types.
- Item 42020 awards 2 points only for both corrected values and 1 point only for the corrected partial product.
- Item 42105 accepts any whole-number route model satisfying all declarative constraints rather than only the exemplar response.
- The ELA full-write rubric preserves the 4/4/2 trait structure and a no-score path.

## Audio review

| Presentation | Script words | Duration | Effective rate | Result |
|---|---:|---:|---:|---|
| From Paper Bin to New Paper | 434 | 202.51 s | 128.6 wpm | Pass |
| Watching the Moon's Appearance | 450 | 198.77 s | 135.8 wpm | Pass |

Both local M4A files are nonempty, load through the production audio control, use the exact attached transcript, support replay through the native player, and remain inside the approved 125–145 words-per-minute band.

## Browser and visual QA

- All 31 Math CAT, 5 Math PT, 30 ELA CAT, and 3 ELA PT items render with nonempty prompts.
- High-risk interactions verified: exact-cardinality multi-select, grid match, symmetry lines, line plot, multi-input, manual response, and DOK-4 constraint response.
- Test 2 ELA PT is registered as two Part 1 research tasks followed by review, an explicit transition, and one forward-only Part 2 full write. Global Notes persist across the transition.
- Manual scoring was saved and displayed on the results page.
- Both listening files loaded with their transcript association and generated no failed Test 2 asset requests.
- Desktop visual inspection confirmed semantic table headers, correct Source 3 table placement, two Part 1 progress dots, and no page-level horizontal overflow.
- A 390 × 844 viewport check confirmed the Test 2 PT remains usable without page-level horizontal overflow.
- Browser QA initially caught the missing Test 2 PT flow registration and Markdown tables rendering as pipe text. Both were corrected before this report was marked ready.

## Automated evidence

- `npm run eval:grade4-test2`: PASS, 69 locked items.
- `npm run eval:grade4-test1`: PASS, 69 official-baseline items; only the pre-approved Test 1 generated-audio equivalence warning remains.
- `npm test`: PASS, 1,747 tests.
- `npm run lint`: PASS.
- `npm run build`: PASS, including the production TypeScript and static-page build.
- `npm run test:e2e`: PASS, 57/57 browser tests, including the corrected Test 2 suite at 5/5.

All Test 2 release gates passed before commit and push.
