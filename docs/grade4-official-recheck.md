# Grade 4 official-source recheck — November 14, 2026

## Result and claim boundary

Test 1 implements the released Smarter Balanced grade 4 practice content linked from the current [CAASPP resource index](https://www.caaspp-elpac.org/resources/preparation/practice-and-training-tests/practice-and-training-resources/). It is not an identical copy of the official delivery system. The published content is the reference for 69 questions, source texts, diagrams, keyed answers, and rubrics. Adapted interactions and re-recorded audio are explicitly recorded. Tests 2–18 are original practice; their shared structure is not proof of official or psychometric equivalence.

The parent-facing `/alignment` page links every Test 1 question to its source PDF page, lists adaptations, shows file fingerprints and available forms, and explains the limits of both CAASPP and STAR alignment.

## Three independent layers

1. **Fresh official sources.** Followed the grade 4 Smarter Balanced links from the CAASPP resource index, downloaded all four PDFs anew, and compared SHA-256 fingerprints with the recorded sources. All four match exactly. Correct page counts: Math CAT 34, Math PT 19, ELA CAT 39, ELA PT 22. The previously recorded Math PT count of 32 was metadata error, not a changed PDF. `npm run verify:grade4-sources` repeats downloads, fingerprints and page-count checks (page counts require local `pdfinfo`). It intentionally cannot regenerate or approve golden data. The resource index must also be reviewed for changed links; the script checks the recorded URLs.
2. **Source and scoring review.** Read PDF text plus OCR of the embedded question images across the four guides, checked runtime stems/options/keys/source packages against the published pages, and visually reviewed flagged OCR differences and mathematical diagrams/exemplars. OCR mismatches such as “tlower” for “flower” were not treated as source errors. Every CAT stem’s substantive words matched apart from OCR errors and documented presentation clarifications. PT source vocabulary and questions were checked across the entire packages. Confirmed all keyed answers remain unchanged. Checked multi-response answer families, numeric equivalence, source matching, the 4/4/2 essay rubric, Art Day constraints and the unusual Math CAT 19 partial-credit text. Opened the live official guest interface through the CAASPP student link, selected grade 4 Math practice and confirmed its first live question against Test 1. This was a live spot check, not a complete 69-question live-session comparison.
3. **Runtime gates.** Re-ran all-18-form evaluation against the corrected Test 1 scaffold and locked datasets, independent scoring regressions, the full automated suite, a production build, and browser interactions. A locked fixture detects drift but cannot establish correctness by itself. A matching source-file fingerprint proves freshness, not a correct transcription or scorer.

## Corrections made before release

- **Math CAT 19:** the earlier one-point tier admitted any factor 1–9 paired with a 3- or 4-digit number ending in 2. Thus `3 / 222` incorrectly earned one point. The published first partial-credit sentence requires a correct Part A factor, i.e. 4 or 9. This is now enforced; `4 / 222` earns one point and `3 / 222` earns zero. Full-credit pairs remain `4 / 712` and `9 / 1602`; equivalent decimal entry is accepted. Independent checks cover all one-digit factors paired with every 3- or 4-digit value ending in 2, plus boundary and field-reversal cases.
- The official guide’s second partial-credit sentence unusually reverses the fields: a correct Part B value plus a 3- or 4-digit number ending in 2 in Part A. This release follows the printed wording, without silently correcting or interpreting it away. This is disclosed on the parent page. This does not imply that the factor prompt itself allows a three-digit factor or that an actual school scorer has been inspected.
- **ELA CAT 17:** restored the missing transition as `[blank]`; the earlier draft incorrectly inserted the distractor “Later on” into that gap. Options and keyed answers are unchanged.
- **ELA CAT 19–21:** explicitly marked the editing target words/sentence in bold and made the instructions refer to that visible emphasis. Earlier text referred to underlining that was not rendered. Keyed answers are unchanged.
- **Adaptation provenance:** flagged text-selection conversions, clarified ELA wording, Math typed responses in place of two drag tasks, selectable symmetry lines, the shortened ELA PT source-matching instruction, and re-recorded listening audio as adaptations. The complete official source texts and necessary mathematical data remain available.
- Added explicit typed-response help for Math CAT 10.
- Fixed Math PT source metadata from 32 to 19 pages.

After independent source review, updated the golden hashes while asserting that all 69 keyed answers, item counts and point totals remained unchanged. Bank version is now `2026-11-14.2`, preventing silent rescoring/resumption of old attempts against changed scoring or presentation. The new version also updates the ELA PT package version; original source PDFs and their hashes are unchanged.

## Inventory and limits

There are 18 grade 4 CAASPP forms (1,242 questions): one released-content baseline, six Easy originals, five Medium originals, and six Hard originals. Each has 31 Math CAT / 5 Math PT / 30 ELA CAT / 3 ELA PT items, and 32 / 6 / 30 / 13 points. Revalidated original-form stimuli, source/transcript availability, table/model quantities and existing independent mathematical regressions through the established gate. The original forms share templates and are not empirically calibrated alternate tests. This audit does not assert a new independent expert/child validation of every original question or an item-by-item match between originals and protected school assessments.

STAR’s separate [alignment review](star-alignment-review.md) gives public category and sample evidence. Five Reading/four Math categories are checked against every practice form. Those checks demonstrate intended coverage; they do not validate item difficulty, an actual Renaissance adaptive algorithm, normative scores, or SFUSD’s local settings.

Local downloaded PDFs, OCR, page renders, screenshots, and logs remain outside the commit. Public source records, the repeatable freshness checker, the updated runtime/golden data, independent tests, and the parent review are committed together after verification.

## Verification outcome

All four source-file checks pass. The all-18-form eval passes for 1,242 questions, with explicit audio/interaction adaptation notices. All 1,834 unit tests pass, including the independent scoring sweep. The production build passes. The complete 114-test Chromium suite passes after fixing a home-page hydration race that could ignore an early grade selection; an intentionally delayed-script test now verifies that the grade controls wait until ready. A final targeted browser run checks the restored ELA 17 blank and marked ELA 19–21 targets. Desktop editing-target and mobile source-review screenshots were visually inspected.
