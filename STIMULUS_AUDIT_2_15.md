# Stimulus Audit for Tests 2-15

## Date

April 17, 2026

## Scope

This audit focuses on whether the loaded question banks for Tests `2-15` depend on:

- presentation or transcript-style ELA stimuli
- shared ELA PT source sets and directions
- shared math tables or other common math stimuli

The purpose is to identify where a deeper content-fairness review is still needed.

## Key Findings

### Tests 2-10

Loaded runtime results show:

- no presentation/listening-style ELA CAT directions in Tests `2-10`
- ELA CAT content is passage-based and source-pair based
- ELA PT directions are present for all Tests `2-10`
- no math `dataTable` stimulus blocks are present in the currently loaded Tests `2-10`

That means the main fairness risk in Tests `2-10` is not missing presentation transcripts.
The main remaining risk is ordinary content accuracy and prompt fairness within the passage/source-based ELA and math items.

### Tests 11-15

Loaded runtime results show:

- Test `11` ELA CAT includes transcript/presentation-style blocks:
  - `A Chalk Picture for the Whole Block`
  - `Colors on a City Wall`
- Test `12` ELA CAT includes transcript/presentation-style blocks:
  - `Soaring on the Wings of the Wind`
  - `Pizza Around the World`
- Test `13` ELA CAT includes transcript-style blocks with explicit directions:
  - `A Day at Ridge Museum`
  - `Clues in Stone`
- Test `14` ELA CAT uses additional source-style titles:
  - `Saving the Midnight Rehearsal`
  - `Rooms That Help Music Travel`
  but does not currently use explicit presentation directions
- Test `15` ELA CAT includes transcript/presentation-style blocks:
  - `Seeing the Sky From Above`
  - `Pizza Travels the World`

For ELA PT:

- Tests `11-15` all have directions present in the loaded runtime bank

For math shared stimuli:

- Tests `11-15` Math PT all use shared `dataTable` stimulus blocks
- Tests `13-14` Math CAT also use `dataTable` blocks in some items

## Highest-Risk Areas For Deeper Review

The highest-risk content-fairness areas are:

1. Tests `11`, `12`, `13`, and `15` ELA CAT transcript/presentation blocks
2. Tests `11-15` Math PT shared tables
3. Tests `13-14` Math CAT table-driven items

## Lower-Risk Areas

Lower risk, but still worth later review:

- Tests `2-10` ELA PT source-pair prompts and directions
- Tests `2-10` general passage-to-question fairness
- Tests `14-15` non-presentation ELA source blocks

## Important Conclusion

The earlier concern that Tests `2-10` might still be using hidden presentation/listening-style items is not supported by the loaded runtime bank.

The stronger presentation/transcript audit need is concentrated in Tests `11-15`, not Tests `2-10`.

## Detailed Eval Result

### High-Risk Sets Reviewed In Detail

Detailed prompt-level review was completed for:

- Test `11` ELA CAT presentation items
- Test `12` ELA CAT presentation items
- Test `13` ELA CAT transcript items
- Test `14` ELA CAT presentation-note items
- Test `15` ELA CAT presentation items
- Tests `11-15` Math PT shared-table items
- Tests `13-14` Math CAT shared-table items

Representative browser readability checks were also completed for:

- Test `12` ELA CAT
- Test `14` Math PT

### Result Summary

No blocking fairness issue was found in the reviewed high-risk `11-15` stimulus sets.

The reviewed items appear answerable from the provided stimulus because:

- the presentation/transcript text includes the concrete event details referenced by the questions
- the two-part ELA items have supportable evidence choices tied to specific transcript lines
- the grid-match ELA items use event categories or source matches that are explicitly stated in the transcript/source text
- the shared math tables contain the full values needed for the corresponding table-based questions
- the browser UI displays the transcript text and math tables clearly enough to be read

### Notes By Test

#### Test 11

- `A Chalk Picture for the Whole Block` and `Colors on a City Wall` provide enough detail for the linked two-part, multiple-choice, and grid-match items.
- Math PT table is readable and the questions are directly supported by the displayed weekly seedling counts.

#### Test 12

- `Soaring on the Wings of the Wind` and `Pizza Around the World` are sufficient for the linked ELA CAT questions.
- The wording `Listen to or read the presentation` is consistent with the app's transcript-style delivery.
- Math PT table questions are directly answerable from the displayed pet-fair counts.

#### Test 13

- `A Day at Ridge Museum` and `Clues in Stone` are explicit transcript-style stimuli with matching directions.
- The museum visitor tables in Math CAT/PT support the corresponding questions without missing data.

#### Test 14

- `Saving the Midnight Rehearsal` and `Rooms That Help Music Travel` presentation-note items support the linked CAT questions.
- The concert hall table in Math PT is visible and sufficient for the corresponding area, perimeter, equal-groups, and subtraction questions.

#### Test 15

- `Seeing the Sky From Above` and `Pizza Travels the World` provide enough information for the linked ELA CAT questions.
- The Mesa Station table supports the Math PT questions directly.

## Remaining Audit Work

The remaining lower-priority audit work is:

- broader content-fairness review for Tests `2-10`
- non-presentation standard passage review across Tests `11-15`
- full-answer-key spot checks if we want a stricter editorial pass beyond the current stimulus-sufficiency review

## Follow-Up Fix During Lower-Priority Review

During the lower-priority review, a real fairness issue was found in the adapted ELA PT banks for Tests `2` and `3`.

### Issue

The adapter trimmed the legacy 4-question ELA PT sets down to the corrected 3-question scaffold, but Tests `2` and `3` were originally authored as alternating single-source PT items.

That meant the final retained essay items:

- Test `2` item `1152`
- Test `3` item `2152`

still asked students to use **both** sources while only showing Source 1 in the stimulus panel.

### Fix

The adapter was updated so Tests `2` and `3` ELA PT now normalize to the same combined-source pattern used by the corrected baseline and the other adapted PT banks:

- all retained ELA PT items now show both sources together
- the combined PT title is preserved in the loaded runtime bank
- the shared student directions remain attached

### Regression Guard

A data-integrity test now verifies that every loaded ELA PT question keeps the full source set visible by checking for the combined-source separator in the passage text.

### Additional Systematic Scan

After this fix, a broader runtime scan was run across Tests `2-15` to look for:

- ELA items that ask students to use both sources while only one source is visible
- custom math interaction items missing their required rendering metadata

No additional blocking stimulus issue was found after the Test `2` / Test `3` PT repair.
