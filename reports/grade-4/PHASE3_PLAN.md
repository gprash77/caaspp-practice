# Grade 4 Phase 3 Plan — Medium Test 4 and Hard Test 5

Status: Direction approved; detailed item matrices required before bank authoring

Date: 2026-07-22

Baseline: corrected official Grade 4 Test 1, bank version `2026-07-20.1`

Phase 3 forms:

- Grade 4 Test 4 — Original · Medium
- Grade 4 Test 5 — Original · Hard

## Objective

Create one full-length Medium companion form and one full-length Hard companion form. Both forms remain structurally comparable with Tests 1–3 and use the validated manifest, scoring, ELA PT segmentation, persistence, manual-rubric, audio, and evaluation architecture delivered in Phase 2.

Difficulty applies to the complete form. Neither form may create difficulty through obscure vocabulary, cultural assumptions, ambiguous wording, hidden response rules, missing stimulus information, or unfamiliar controls.

## Locked form structure

| Section | Items | Raw points |
|---|---:|---:|
| Math CAT | 31 | 32 |
| Math PT | 5 | 6 |
| ELA CAT | 30 | 30 |
| ELA PT | 3 scored tasks | 13 |
| **Total** | **69** | **81** |

Each ELA PT contains two visible Part 1 research tasks, an explicit review and transition, and one separate 10-point Part 2 full write.

## Form difficulty contracts

### Test 4 — Medium

- Balance direct application with inference, multistep reasoning, and evidence integration.
- Use less prompting than Tests 2–3 while keeping directions explicit.
- Include plausible misconception-based distractors and more frequent decisions about relevant information.
- Require students to connect representations, justify conclusions, and integrate sources without excessive constraint layering.
- Keep reading load and interface demands appropriate for Grade 4.

### Test 5 — Hard

- Increase non-routine reasoning, evidence integration, and the number of meaningful constraints.
- Use distractors tied to likely Grade 4 misconceptions rather than tricks.
- Require careful comparison of competing evidence and more sustained explanations.
- Include DOK 3–4 work that remains fully supported by visible sources, tables, diagrams, and directions.
- Preserve grade-level language and accessible controls; difficulty must come from the thinking.

## Blueprint scaffold

Both forms retain the validated full-length scaffold:

- Math CAT claims: Claim 1 = 17, Claim 2 = 3, Claim 3 = 8, Claim 4 = 3.
- Math CAT includes one independently tested 2-point partial-credit item.
- Math PT claims: three Problem Solving, one Communicating Reasoning, one Modeling/Data Analysis.
- ELA CAT claims: Reading = 15, Writing = 6, Listening = 6, Research = 3.
- ELA CAT includes complete literary and informational clusters, two original listening presentations, writing items, and research items.
- ELA PT includes a balanced original multi-source package, one 2-point research response, one 1-point machine-scored research task, and one 10-point full write.

The item matrices may modestly increase DOK 3 within the existing claim scaffold for the Hard form, but must remain defensible against Test 1 and Grade 4 standards.

## Separation requirements

Tests 4 and 5 must differ from each other and from Tests 1–3 in:

- Math contexts, values, diagrams, tables, and reasoning paths.
- Math PT setting, data model, constraints, and final modeling task.
- Literary plot, setting, conflict, characters, and craft focus.
- Informational subject, organization, diagram/table purpose, and evidence path.
- Listening topics, sequence, examples, and scored details.
- ELA PT issue, source roles, data, writing purpose, and evidence tensions.

Cross-form evaluation rejects exact prompts, reused passages, number/name substitutions, and near-identical reasoning shells.

## Authoring sequence

1. Produce complete Test 4 and Test 5 item matrices and run a cross-form design audit.
2. Add both forms to the assessment manifest as unavailable records.
3. Author Test 4 Medium while it remains hidden.
4. Build Test 4 golden/source fixtures, scoring cases, media, eval report, and browser suite.
5. Run Test 1–4 regressions, fairness review, build, and full browser QA; then enable and deploy Test 4.
6. Author Test 5 Hard while it remains hidden, incorporating Test 4 duplication findings.
7. Build Test 5 fixtures, scoring cases, media, eval report, and browser suite.
8. Run Test 1–5 cross-form, difficulty, fairness, scoring, persistence, build, and browser gates; then enable and deploy Test 5.

## Required evaluation gates

- Exact item/point counts, unique IDs, complete metadata, and manifest isolation.
- Claim, target/domain, DOK, and standard coverage.
- Independent answer-key and distractor review.
- Math stimulus sufficiency and reading-load review.
- ELA passage, listening, source sufficiency, and accessibility review.
- Exact and semantic cross-form duplication review against Grade 4 Tests 1–3 and Grade 3 banks.
- Positive, negative, blank, malformed, boundary, partial-credit, constraint, and manual-rubric scoring tests.
- Audio duration and 125–145 effective words-per-minute review.
- Every-item browser navigation and all interaction families.
- ELA PT review, transition, notes/source continuity, forward-only Part 2, submission, and manual-score persistence.
- Desktop and 390 × 844 visual QA.
- Test 1 golden eval, Tests 2–3 regression evals, unit tests, lint, production build, and full Playwright suite.

## Release rules

- Neither form is exposed before its independent release gate passes.
- Test 4 may be released after its own complete gate; Test 5 remains hidden until its later gate.
- Commit only intended files, keep `tmp/` untracked, push `main`, allow Vercel to deploy, and verify the live label, route, audio, and representative assets.
- Student-facing labels remain honest: Test 4 is `Original · Medium`; Test 5 is `Original · Hard`.
