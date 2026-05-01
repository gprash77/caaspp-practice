# Test 1 Official CAASPP Comparison

This audit compares local Grade 3 Test 1 content against the public Smarter Balanced / CAASPP scoring-guide baseline used for the Test 1 correction work.

Official baseline files used locally:

- `/private/tmp/caaspp-official/g3-math-cat.pdf`
- `/private/tmp/caaspp-official/g3-math-pt.pdf`
- `/private/tmp/caaspp-official/g3-ela-cat.pdf`
- `/private/tmp/caaspp-official/g3-ela-pt.pdf`

## Structural Comparison

| Section | Official count | Local count | Status |
| --- | ---: | ---: | --- |
| Math CAT | 31 | 31 | Match |
| Math PT, Going Green | 5 | 5 | Match |
| ELA CAT | 30 | 30 | Match |
| ELA PT | 3 | 3 | Match |

## Math CAT

| Official item | Local ID | Official answer/key | Local answer/key | Content status |
| --- | ---: | --- | --- | --- |
| 1 | 1 | 52 | 52 | Matched prompt/key |
| 2 | 2 | 809 | 809 | Matched prompt/key |
| 3 | 3 | 15 | 15 | Matched prompt/key |
| 4 | 4 | D | D | Matched prompt/options/key |
| 5 | 5 | 6 | 6 | Matched prompt/key |
| 6 | 6 | D | D | Matched prompt/options/key; clock represented in text |
| 7 | 7 | B | B | Matched table/prompt/options/key |
| 8 | 8 | 60 | 60 | Matched prompt/key; diagram side lengths represented in text |
| 9 | 9 | 5 | 5 | Matched prompt/key |
| 10 | 10 | C | C | Matched prompt/options/key; shape represented in text |
| 11 | 11 | 48 | 48 | Matched prompt/key |
| 12 | 12 | C | C | Matched prompt/options/key |
| 13 | 13 | 20, 25 | 20, 25 | Matched key; multiplication table represented in text-input form |
| 14 | 14 | true/false grid | true/false grid | Matched grid rows/key |
| 15 | 15 | 40, 56 | 40,56 | Matched prompt/key |
| 16 | 16 | B | B | Matched key; number-line choices represented textually |
| 17 | 17 | C | C | Matched key; area diagram represented textually |
| 18 | 18 | 58 | 58 | Matched prompt/key |
| 19 | 19 | C | C | Matched prompt/options/key |
| 20 | 20 | 4 | 4 | Matched prompt/key |
| 21 | 21 | acceptable fraction set | accepted sets | Matched response intent/key family |
| 22 | 22 | yes/no grid | yes/no grid | Matched grid rows/key |
| 23 | 23 | 3 or 4 | 3 or 4 | Matched prompt/key |
| 24 | 24 | line plot marks | line plot marks | Matched data/key; rendered with local line-plot control |
| 25 | 25 | first and third equations | A, C | Matched prompt/options/key |
| 26 | 26 | any fraction between 2/6 and 2/3 | fraction-range scoring | Matched acceptable-answer rule |
| 27 | 27 | 39 | 39 | Matched prompt/key |
| 28 | 28 | 7/8 or equivalent | 7/8 | Matched prompt/key |
| 29 | 29 | Part A 2/3 and 2/4; Part B Yes, > | 2, 2, yes, > | Matched interaction intent/key |
| 30 | 30 | shade 1/4 of rectangle | any 1 of 4 cells | Matched scoring intent |
| 31 | 31 | yes/no grid | yes/no grid | Matched grid rows/key |

## Math PT

| Official item | Local ID | Official answer/key | Local answer/key | Content status |
| --- | ---: | --- | --- | --- |
| 1 | 40 | Thursday and Friday | D, E | Matched prompt/table/key |
| 2 | 41 | 30 | 30 | Matched prompt/table/key |
| 3 | 42 | 3rd grade with explanation | short answer rubric | Matched task/rubric |
| 4 | 43 | any Wednesday-Friday values totaling more than 410 | table-input sum > 410 | Matched scoring rule |
| 5 | 44 | explain how 2nd grade could win | short answer rubric | Matched task/rubric |

## ELA CAT

| Official item | Local ID | Official answer/key | Local answer/key | Content status |
| --- | ---: | --- | --- | --- |
| 1 | 101 | D | D | Matched prompt/options/key |
| 2 | 102 | D | D | Matched prompt/options/key |
| 3 | 103 | Part A D; Part B B | D, B | Matched prompt/options/key |
| 4 | 104 | C | C | Matched prompt/options/key |
| 5 | 105 | A, E | A, E | Matched prompt/options/key |
| 6 | 106 | C | C | Matched prompt/options/key |
| 7 | 107 | C | C | Matched prompt/options/key |
| 8 | 108 | B | B | Matched prompt/options/key |
| 9 | 109 | C | C | Matched prompt/options/key |
| 10 | 110 | Part A C; Part B D | C, D | Matched prompt/options/key |
| 11 | 111 | C | C | Matched prompt/options/key |
| 12 | 112 | C | C | Matched prompt/options/key |
| 13 | 113 | C, D | C, D | Matched prompt/options/key |
| 14 | 114 | D | D | Matched prompt/options/key |
| 15 | 115 | B | B | Matched prompt/options/key |
| 16 | 116 | A, E | A, E | Matched prompt/options/key |
| 17 | 117 | D, F | D, F | Matched prompt/options/key |
| 18 | 118 | D | D | Matched key; local renders choices as selectable sentence options |
| 19 | 119 | C, F | C, F | Matched prompt/options/key |
| 20 | 120 | punctuation sentences | A, B | Matched key |
| 21 | 121 | verb-tense sentences | B, D | Matched key |
| 22 | 122 | Part A D; Part B B | D, B | Matched question/key; presentation has generated local audio |
| 23 | 123 | D | D | Matched question/key; presentation has generated local audio |
| 24 | 124 | planned/unplanned grid | grid-match | Matched grid/key; presentation has generated local audio |
| 25 | 125 | C | C | Matched question/key; presentation has generated local audio |
| 26 | 126 | country/topping grid | grid-match | Matched grid/key; presentation has generated local audio |
| 27 | 127 | A | A | Matched question/key; presentation has generated local audio |
| 28 | 128 | B, C | B, C | Matched prompt/options/key |
| 29 | 129 | C | C | Matched prompt/options/key |
| 30 | 130 | B | B | Matched prompt/options/key |

## ELA PT

| Official item | Local ID | Official answer/key | Local answer/key | Content status |
| --- | ---: | --- | --- | --- |
| 1 | 150 | source matching | grid-match | Matched task/rubric intent |
| 2 | 151 | short research response | short answer rubric | Matched task/rubric intent |
| 3 | 152 | full informational essay | extended writing rubric | Matched task/rubric intent |

## Verification Commands

| Check | Result |
| --- | --- |
| CAASPP eval gate script | Passed |
| `npm test -- --run tests/question-data.test.ts tests/scoring.test.ts` | Passed, 1695 tests |
| `npm run build` | Passed, includes 1700 tests |
| Targeted Playwright UI verification | Passed |
| `npm run test:e2e` | Passed, 40/40 |

## Known Caveat

The public scoring-guide PDFs provide static item screens, keys, rubrics, and the presentation question screens. They do not provide the original audio binaries. The local Test 1 presentation audio files are generated from the local transcript-style presentation text and are wired to the correct presentation items. The presentation questions, keys, and enough listening content to answer fairly were checked, but the generated audio cannot be proven byte-for-byte identical to CAASPP's original audio from the public PDFs alone.
