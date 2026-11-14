# Grade 4 practice readiness

Review date: November 14, 2026. See the [fresh official-source recheck](grade4-official-recheck.md) and the site’s `/alignment` parent reference for current source fingerprints, item links, known adaptations, and the Test 1 scoring correction.

## Available practice forms

All 18 grade 4 CAASPP-style forms have all four sections. Test 1 remains the corrected released-content public-practice baseline, with adapted controls and re-recorded audio. Tests 2–18 are original companion forms, not additional official CAASPP exams.

| Level | Tests | Forms |
| --- | --- | --- |
| Official baseline | 1 | 1 |
| Easy practice | 2, 3, 6, 7, 11, 12 | 6 |
| Medium practice | 4, 8, 13, 14, 15 | 5 |
| Hard practice | 5, 9, 10, 16, 17, 18 | 6 |

Every form matches corrected Test 1: 31 Math CAT items / 32 points; 5 Math PT items / 6 points; 30 ELA CAT items / 30 points; 3 ELA PT items / 13 points. That is 69 items and 81 raw points per form, 1,242 items in total. ELA PT presents its two research questions before a forward-only transition to its separate full-write question.

## Corrections from this audit

- Test 4 Math CAT 12 had three mathematically equivalent answer options for a single-answer sum. The two alternative correct options were replaced with incorrect distractors; an independent numeric-equivalence check now verifies uniqueness.
- Test 6 Math PT 5 allowed loads below the table's morning and afternoon delivery minimums. The prompt, constraints, exemplar, and alternative solution now require at least 34 L and 26 L respectively. A regression test exhaustively compares whole-can scoring against minimums independently totaled from the table.
- Tests 6–10 used fractional shares of discrete objects that could produce half an object. The generator now supplies quantities divisible by eight; that condition is checked for the added forms too.
- The generated division items now use one-digit divisors, consistent with their grade 4 standard. An exact-division case also exposed two equivalent remainder interpretations; the extra true distractor was replaced and independently checked.
- Generated quotient-estimate choices now use reasonable rounded values and compatible-number explanations rather than long decimal expansions.
- A hidden maximum count in the generated CAT planning constraint could reject a plan allowed by the visible rules. The hidden cap was removed and all bounded candidate plans are checked independently against visible conditions.
- Corrected Test 1 Math PT manual-response rubric registrations were missing for items 40103 and 40105. They are now registered for 2 and 1 points, preserving the official questions and golden fixture.

Changed forms have a new bank version so stored attempts cannot silently be rescored against changed content. Locked fixtures were updated only after the corrections and independent regression checks; fixture matching alone is not treated as proof of correctness.

## Content and stimulus review

The review compared section counts and point totals with corrected Test 1, inspected shared Math PT plans and answer calculations, examined presentation/transcript sufficiency and source-based task requirements, and added independent tests for ambiguities the previous locked fixtures could not detect.

Tests 11–18 contain original literary and informational texts, two complete presentations with generated local narration per form, and three-source opinion-writing packages with tables, requirements, competing evidence, and limitations. Fictional pilot results are practice evidence, not research findings about actual schools or towns. Every required number, control, stage, source statement, and selection count is provided to the student. No hidden visual or unavailable school resource is needed.

The companion forms share some templates and skills. The labels are intended practice levels, not calibrated test difficulty, and these fixed forms do not reproduce an actual computer-adaptive CAASPP session. Written reasoning and extended writing require parent or teacher rubric scoring; they are not silently treated as automatically correct.

## Verification and repeatable release gate

- `npm run eval:grade4`: all 18 forms pass; 1,242 runtime items checked against locked fixtures, corrected Test 1 section counts/points, scoring keys, required assets, and manual-rubric registrations.
- Test 1’s documented adaptations include typed/selected response controls and visible editing targets. Its listening warning remains: local narration follows exact official transcripts rather than copying the original session-scoped audio file.
- All 1,834 automated tests pass, including data, integrity, scoring, constraint, and content regressions.
- Production build and TypeScript checks pass.
- The complete 114-check Chromium browser suite passes: existing CAASPP flows, new forms and question screens, custom response controls, listening-media metadata loading, forward-only writing flow, persistence, navigation, version isolation, School Studies regression, all six complete STAR fixed attempts, both adaptive routes, timer expiry and legacy-record isolation.
- Desktop and mobile STAR screenshots visually reviewed; no horizontal overflow in the mobile check. Screenshots and local QA files remain outside the commit.

For future forms: author and independently review answers and distractors; include complete stimuli and matching audio; register manual rubrics and segmented writing flow; compare counts, points, and fairness with corrected Test 1; lock only the reviewed content; run the combined eval, automated checks, build, and browser interactions before commit/push. Actual school assessments and psychometric equivalence are outside the claims of this practice site.

## STAR practice delivered separately

`/star` provides a revised 204-question original bank: six fixed 34-question tests at Easy, Medium, and Hard in Reading and Math, plus adaptive practice routes drawing from that bank. See the [STAR alignment review](star-alignment-review.md) for public sources, category coverage, content changes, and limits. Students choose one answer at a time, may change it before entering it, can pause/resume on the same browser, and review raw results with explanations and practice skill groups. Optional feedback after each answer supports teaching; independent mode withholds explanations until completion.

SFUSD's public assessment guidance and the school's November 13 announcement informed orientation. No private email text, family identifiers, or school reports are published. The revised bank follows five published Reading and four Math categories, with standalone reading texts, sentence completion, and supplied math tables/diagrams. A transparent three-level staircase changes practice difficulty after each answer. Optional per-question pacing is configurable home practice, not verified SFUSD timing. It does not use Renaissance's protected item bank or calibrated adaptive/scaled-score model, and does not predict percentiles, grade equivalents, or school proficiency levels. Practice category counts are explicitly distinguished from official domain scores. Real test settings vary by version and school configuration.
