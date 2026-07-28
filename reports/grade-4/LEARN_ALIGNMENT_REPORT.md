# Grade 4 Learn California + SFUSD Alignment Report

**Reviewed:** July 28, 2026  
**Scope:** Grade 4 standard-English Math and English Language Arts Learn experience  
**Status:** Release-ready after the checks recorded below

## Outcome

Grade 4 Learn is now a comprehensive, independent preparation program rather
than an eight-question preview. It contains 31 original lessons and 124 original
practice tasks. Every lesson displays its California standard mapping and its
SFUSD instructional-priority mapping.

| Subject | Lessons | Tasks | Guided written tasks | California targets | SFUSD priorities |
| --- | ---: | ---: | ---: | ---: | ---: |
| Math | 15 | 60 | 15 | 28 | 6 |
| English Language Arts | 16 | 64 | 16 | 43 | 9 |
| **Total** | **31** | **124** | **31** | **71** | **15** |

The program is an independent resource. Alignment means that its original
content was crosswalked to the public standards and district guidance below; it
does not imply endorsement by or affiliation with SFUSD.

## Authoritative alignment sources

California:

- [California Department of Education standards](https://www.cde.ca.gov/BE/ST/SS/)
- [California Common Core resources](https://www.cde.ca.gov/re/cc/)
- [California Common Core State Standards for Mathematics](https://www.cde.ca.gov/BE/ST/SS/documents/ccssmathstandardaug2013.pdf)
- [California Mathematics Framework — Grade Four](https://www.cde.ca.gov/ci/ma/cf/documents/mathgrade4fwlmg2.pdf)
- [California Grade 4 English Language Arts standards](https://www2.cde.ca.gov/cacs/ela?dl=0&maxgrade=4&mingrade=4&order=0&page=0&perpage=100)
- [California English Language Arts/English Language Development Framework](https://www.cde.ca.gov/CI/rl/cf/)

SFUSD:

- [Grade 4 Report Card Family Guide](https://www.sfusd.edu/ReportCards/gr-4-report-card-family-guide)
- [Grade 4 Math](https://www.sfusd.edu/learning/curriculum/elementary-school/mathematics/grade-4-math)
- [Elementary School Mathematics](https://www.sfusd.edu/learning/curriculum/elementary-school/mathematics)
- [Elementary English Language Arts](https://www.sfusd.edu/learning/curriculum/elementary-school/elementary-english-language-arts)

## Coverage

### Math

All 28 Grade 4 California mathematics identifiers in the OA, NBT, NF, MD, and
G domains are represented.

| Learn domain | Lessons |
| --- | ---: |
| Operations | 4 |
| Base Ten | 3 |
| Fractions | 4 |
| Measurement | 2 |
| Geometry & Measurement | 2 |

The crosswalk also covers the public SFUSD emphases on multi-digit fluency,
fraction understanding, geometry and angles, problem-based learning,
explanation/comparison of reasoning, and mathematical reflection.

### English Language Arts

Learn targets 43 applicable Grade 4 California identifiers across Reading
Literature, Reading Informational Text, Foundational Skills, Writing, Speaking
and Listening, and Language.

| Learn domain | Lessons |
| --- | ---: |
| Foundational Reading | 1 |
| Reading Literature | 3 |
| Reading Information | 5 |
| Reading Literature & Information | 1 |
| Writing | 4 |
| Speaking & Listening | 1 |
| Language | 1 |

The crosswalk covers SFUSD's public emphases on complex-text comprehension,
vocabulary, evidence and critical thinking, narrative/informative/opinion
writing, research and paraphrasing, speaking and listening, and conventions.

## Instructional and product design

- Each lesson contains a worked example, two concise teaching points, and four
  original tasks.
- Difficulty progresses from Foundation through Core to Challenge: Math has
  15/30/15 tasks and ELA has 16/32/16 tasks in those bands.
- Every lesson ends with a guided written task. Guidance and a model response
  stay hidden until the learner drafts a response and explicitly asks to review
  it.
- Subject, domain, lesson, standards, and progress controls make the larger bank
  navigable.
- Progress persists in a dedicated Learn-only browser record and is isolated
  from assessment attempts.
- Choice-answer positions are balanced: Math 12/11/11/11 and ELA 12/12/12/12
  across positions A–D.
- Learn never reads active assessment answers or exposes test-bank keys.

## Quality evidence

- Corrected Test 1 eval gate: passed the 69-item structural, stimulus-
  sufficiency, and fairness baseline. The existing approved audio-equivalence
  warning remains unchanged.
- Unit/integrity/scoring regression: 1,803 tests passed.
- Learn content checks: all target standards and SFUSD priorities covered;
  unique IDs and prompts; valid scoring keys, explanations, response criteria,
  and model responses; balanced answer positions.
- Originality regression: no exact or number-normalized Learn prompt duplicates
  against released Grade 4 Tests 1–10.
- Lint: passed.
- TypeScript and production build: passed.
- Browser regression: 84 Playwright tests passed, including Learn progress
  persistence, assessment isolation, Tests 1–10, scoring, and narrow-screen
  behavior.
- Visual QA: reviewed Math and ELA on desktop and at 390 × 844. Navigation,
  tags, coverage cards, lesson content, and practice controls were readable; no
  horizontal overflow or browser console warnings/errors were found.

## Boundaries

- Grade 4 only.
- Standard English only.
- No Grade 3 changes.
- No Spanish localization.
- No proprietary SFUSD, Imagine Learning, HMH, or CAASPP content copied.
- No claim of official district or state endorsement.
