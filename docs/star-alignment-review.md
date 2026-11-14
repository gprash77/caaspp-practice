# STAR companion alignment review — November 14, 2026

Edition: `2026-11-alignment-2`. This is a source-informed practice companion, not a validated equivalent assessment or an official Renaissance product.

## Evidence and scope

Reviewed the public [Renaissance Reading categories and sample screenshots](https://www.renaissance.com/products/assessment/star-assessments/star-reading/) and [Math categories and samples](https://www.renaissance.com/products/assessment/star-assessments/star-math/). Visually inspected the [grade 4 multiplication sample](https://www.renaissance.com/wp-content/uploads/2023/01/numbers-and-operations-screenshot-1.webp), a [short author’s-craft sample](https://www.renaissance.com/wp-content/uploads/2023/01/understanding-authors-craft-screenshot-1.webp), and an [argument sample](https://www.renaissance.com/wp-content/uploads/2023/01/analyzing-argument-and-evaluating-text-screenshot-2.webp). Reading sample screenshot grade labels vary; the argument image itself says Grade 7 despite a Grade Four alt label on the webpage. No claim that all inspected samples are grade 4.

Public materials support the category names, standalone text/item format, short math problems, four choices and adaptive behavior. They do not supply SFUSD’s exact grade 4 item distribution, current local timing settings, item parameters, or score-conversion model. The complete account-specific Renaissance learning progression was not available. Common Core references on original questions are author crosswalks for instructional context, not Renaissance-verified item mappings.

## Content crosswalk

Each fixed form has 34 original questions with four choices, one keyed answer and an explanation. The adaptive routes draw from the same 204-item bank.

| Published category | Items per fixed form | Practice coverage |
| --- | ---: | --- |
| Word knowledge and skills | 10 | Sentence completion using context; vocabulary complexity varies by level |
| Comprehension strategies and constructing meaning | 6 | Main idea, details, cause/effect, compare/contrast, sequence, inference, summary |
| Analyzing literary text | 6 | Character, motivation, conflict/resolution, point of view, setting, theme |
| Understanding author’s craft | 6 | Figurative language, suspense, sensory detail, flashback, poetry, tone |
| Analyzing argument and evaluating text | 6 | Claims, relevant evidence, opinion, limited samples, fair comparisons, audience |
| Numbers and operations | 12 | Place value, rounding, arithmetic, fractions, decimals, comparisons |
| Algebra | 8 | Unknowns, patterns, expressions, comparison, multistep reasoning, factors |
| Geometry and measurement | 9 | Area, perimeter, labeled rectangle, units, time, angles, shape hierarchy, symmetry; volume extension |
| Data analysis, statistics, and probability | 5 | Included tables, comparisons, fractional measurements, scaled graphs; mean extension |

Reading totals 34 across five categories; Math totals 34 across four categories. These counts are our coverage design, NOT an official test blueprint. The broad Math category includes probability in its name; probability is not included in this grade-focused bank. Scaled-graph questions give the entire key and symbol counts in words. Tables and the rectangle are rendered visually and accessibly, and retained in results.

Every Reading form now has ten sentence-completion items followed by 24 different short texts with one question per text. Each text has an easy, medium and hard question; texts recur across fixed levels. Adaptive routes use a text only once. Fixed levels are learning variants rather than independent parallel tests. The former shared four-question passage sets and implausible standalone word lists were replaced.

## Level review

- Easy: basic vocabulary, explicit text details, foundational number facts and earlier-grade skills. Some tasks introduce grade 4 concepts.
- Medium: grade 4 operations (including two-digit multiplication and one-digit division), like-denominator fractions and regrouping, tenths/hundredths, measurement, and supported reading inference.
- Hard: more demanding reading analysis and vocabulary; larger computations, unlike-denominator fractions, fraction multiplication, decimal operations, volume, and selected extensions. Mean is explicitly defined because it is beyond grade 4. Hard does not claim that all its material should already have been taught.

Reading difficulty varies mainly through vocabulary and the reasoning demanded by each question. Shared passages have not received Lexile measures, readability calibration, empirical item-difficulty estimates or child trials. Challenge questions are an exposure to harder work, not a measured grade-equivalent level.

## Experience and scoring

- 34 locked, forward-only responses, with explanations withheld by default; optional immediate feedback.
- Adaptive practice begins at Medium, goes one level up after correct and one down after incorrect, and is bounded at Easy/Hard. Category coverage is preserved slot-by-slot. This deterministic staircase is explicitly explained; it is NOT Renaissance CAT, item-response theory, or an ability estimate.
- Optional 120/180/240-second per-item practice pacing, plus untimed. These are selectable home settings, not claimed official limits. The timer submits an existing selection at expiry; otherwise records an unanswered miss. Fifteen seconds or less is visually emphasized. Pause stops time; reload retains the deadline. Leaving without Pause does not stop it.
- Paused work, selected choices, adaptive history and results persist on the same browser. This edition uses a separate v2 storage key so old answers cannot be silently applied to changed questions. Prior v1 data is left intact but is not shown against the new bank.
- Raw correct counts, practice category counts, levels attempted and timeout indicators only. No scaled score, percentile, grade equivalent, school proficiency estimate, normative comparison, or comparison of raw scores across different adaptive routes.

## Fairness and release gate

Reviewed all original Reading stems, supplied texts, keyed choices and rationales: each answer follows from supplied text or sentence context; future predictions are phrased as likely, and evidence questions avoid outside knowledge. Math problems supply necessary quantities, units, tables, graph keys, and diagram labels. Rectangle diagrams say not to scale. Extension vocabulary and skills are labeled as approximate in setup/results. Numeric answer uniqueness is checked, alongside independent worked-key checks across operations and data/measurement items. An initial all-zero place-value distractor set in Hard was caught by integrity tests and corrected before release.

Corrected CAASPP Test 1 remains the golden baseline for the separate CAASPP bank: rerun the required all-18-form evaluation for regressions. Its 69-item/section scaffold does not apply to a 34-item STAR companion. No CAASPP content is changed by this revision.

Release checks: STAR integrity/scoring/adaptation/timer tests; all project unit tests and production build; browser completion of all six fixed forms and both adaptive routes; pause/resume/reload, feedback, timer expiry (selected and blank), tables/diagram, mobile layout, malformed/legacy storage handling, and visible screenshot review. Executed results: all 18 CAASPP forms pass their evaluation (1,242 items); 1,830 unit tests pass; production build and TypeScript pass; the full 110-test Chromium suite passes, plus the added mobile math test (and a repeat of final-question timeout). Desktop/mobile screenshots were visually inspected, including the diagram and table. Local screenshots and QA logs are not committed.

## Remaining limits

Comparability is in skill exposure and format familiarization. Statistical equivalence would require a calibrated item bank, validation with representative students, authorized access to local settings and evidence linking scores to Renaissance’s scale. This release does not provide those. SFUSD administration settings remain unconfirmed; the student should follow the teacher’s instructions at school.
