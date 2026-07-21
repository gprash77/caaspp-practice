# Grade 4 Phase 2 Plan — Full-Length Practice Tests 2 and 3

Status: Revised draft for approval before implementation

Baseline: Grade 4 Test 1, bank version `2026-07-20.1`

Planned forms: Grade 4 Test 2 and Grade 4 Test 3

## 1. Objective

Create two new, full-length Grade 4 CAASPP practice forms. Each form will match the section and item counts of the reviewed public Practice Test 1. Difficulty is assigned to the complete practice form, not divided into equal easy, medium, and hard item quotas inside each form.

Tests 2 and 3 will both be **Easy** full-length forms and will be labeled **original, CAASPP blueprint-aligned practice tests**. They will not be labeled official copies. Test 1 remains the exact public-practice golden baseline. Medium and Hard forms will be created as later full-length tests in a separate phase.

Phase 2 includes both content creation and the reusable validation system needed to prove that the forms are complete, answerable, correctly scored, and safe to change later.

## 2. Full-Length Form Structure

Each new form will contain the same 69 scored items and 81 raw points as Test 1.

| Section | Items | Raw points | Test 1 structural baseline |
|---|---:|---:|---|
| Math CAT | 31 | 32 | Full machine-scored section, including one 2-point partial-credit item |
| Math PT | 5 | 6 | One shared task context, including one 2-point constructed-response item |
| ELA CAT | 30 | 30 | Literary, informational, writing, listening, and research clusters |
| ELA PT | 3 scored tasks | 13 | Two Part 1 research tasks plus one separate 10-point Part 2 essay |
| **Total** | **69** | **81** | Full-length form |

The current adjusted operational blueprint is shorter, but Phase 2 will deliberately remain full-length because these forms are intended to provide more practice and to remain structurally comparable with public Practice Test 1.

## 3. Form-Level Difficulty Model

Difficulty will be an explicit property of the complete practice form. It will remain separate from Depth of Knowledge (DOK). DOK describes the cognitive process required by an item; it does not by itself determine the overall difficulty of a form.

| Form | Overall difficulty | Length |
|---|---|---:|
| Test 2 | Easy | 69 items / 81 points |
| Test 3 | Easy | 69 items / 81 points |
| Future form(s) | Medium | Same full length |
| Future form(s) | Hard | Same full length |

### Form definitions

- **Easy form:** Uses clear language, familiar contexts, visible scaffolds, more direct retrieval and standard applications, and fewer layered constraints. It still covers the full Grade 4 blueprint and includes the DOK levels required for valid coverage.
- **Medium form:** Uses a balanced amount of direct application, inference, multistep reasoning, and evidence integration. Test 1 provides an important structural and complexity reference.
- **Hard form:** Uses more non-routine reasoning, evidence integration, plausible misconception-based distractors, multiple constraints, and reduced scaffolding while remaining fully Grade 4 appropriate.

An Easy form is not a form containing only easy questions. It must still include enough medium-complexity and higher-DOK work to represent the Grade 4 standards honestly. Its overall student experience, language load, scaffolding, and reasoning burden should be easier than the Medium and Hard forms.

Difficulty may never be created through obscure vocabulary, cultural knowledge, ambiguous wording, excessive reading in Math, confusing controls, or missing stimulus information.

## 4. Claim and Cognitive-Complexity Structure

The new forms will use Test 1 as the structural comparison baseline while also satisfying the current official Grade 4 claim and DOK expectations.

### Math CAT

Planned Test 1 claim scaffold:

| Claim | Description | Items |
|---|---|---:|
| 1 | Concepts and Procedures | 17 |
| 2 | Problem Solving | 3 |
| 3 | Communicating Reasoning | 8 |
| 4 | Modeling and Data Analysis | 3 |

Requirements:

- Cover Grade 4 OA, NBT, NF, MD, and G standards without overusing one standard.
- Meet the official minimum higher-DOK expectations across Claims 2, 3, and 4 without adding artificial complexity to the Easy forms.
- Include direct computation, models, tables, diagrams, multipart responses, and reasoning tasks.
- Include one independently tested 2-point partial-credit item.
- All CAT responses must be machine-scoreable.

### Math Performance Task

Each Math PT will use one coherent, original shared context and five connected items:

- Use clear, familiar contexts and progressive scaffolding appropriate for an Easy form.
- Begin with accessible entry tasks and build toward grade-appropriate reasoning.
- Three items primarily aligned to Problem Solving.
- One item primarily aligned to Communicating Reasoning.
- One item primarily aligned to Modeling and Data Analysis.
- At least one 2-point item with an explicit, operational rubric.

Every table, diagram, measurement, schedule, and constraint needed to answer the five items must be present in the shared stimulus.

### ELA CAT

Planned Test 1 claim scaffold:

| Claim | Description | Items |
|---|---|---:|
| 1 | Reading | 15 |
| 2 | Writing | 6 |
| 3 | Listening | 6 |
| 4 | Research/Inquiry | 3 |

Requirements:

- At least one complete literary passage cluster and one complete informational passage cluster.
- Passage length, vocabulary, syntax, and subject matter appropriate for Grade 4.
- Maintain an overall Easy-form reading and reasoning profile while preserving full standards and DOK coverage.
- Include two listening presentations with three questions each.
- Listening questions must be answerable from the audio alone; transcripts provide accessibility support.
- Include machine-scored editing, revision, research, two-part, multi-select, and grid/matching interactions.
- Multipart answer order and required selection counts must be enforced.

### ELA Performance Task

Each ELA PT will use a complete, original multi-source stimulus package.

**Part 1**

- Exactly two visible research questions.
- One accessible machine-scored source-selection or source-matching item.
- One evidence-based short response with a complete point-level rubric and clear source expectations.
- Students may review all sources and notes during Part 1.

**Part 2**

- A separate transition screen explains that the student is moving to the writing task.
- One full-write response with clear directions, sufficient sources, and grade-appropriate expectations.
- Sources and notes remain available.
- The official-style essay rubric uses Organization/Purpose `0–4`, Evidence/Elaboration `0–4`, and Conventions `0–2`, plus NS criteria.
- The essay is one student-facing task worth 10 points, not three separate questions.
- After entering Part 2, the normal practice flow will not return the student to Part 1.

Proposed writing purposes:

- Test 2: opinion.
- Test 3: narrative or informational, selected after the source-package fairness review.

## 5. Required Architecture Work Before Authoring

The following changes must pass Test 1 regression checks before Test 2 content is enabled.

1. **Assessment manifest**
   - Replace hardcoded Grade 4 Test 1 availability with a grade-aware manifest.
   - Record test title, origin, bank version, overall form difficulty, sections, item counts, points, and availability.
   - Validation must reject an exposed test with a missing or empty section.

2. **ELA PT segmentation**
   - Represent Part 1 and Part 2 explicitly.
   - Persist the current segment, sources, notes, answers, and transition state.
   - Results must report three scored tasks without calling the essay a third Part 1 question.

3. **Reusable interaction registry**
   - Render interactions from data rather than item-specific conditionals.
   - Generalize symmetry to support zero, one, or multiple selectable lines.
   - Make None mutually exclusive with selected lines.
   - Add free-draw coordinate/tolerance scoring only if an authored item truly requires arbitrary drawing.

4. **Declarative scoring rules**
   - Replace Test 1 item-number-specific branches with reusable exact, ordered, unordered-set, numeric-range, constraint, partial-credit, schedule, and manual-rubric rules.
   - Every rule must have positive, negative, malformed, boundary, and partial-credit test cases where applicable.

5. **Operational manual rubrics**
   - Permit a parent or teacher to enter trait or point scores.
   - Enforce rubric ranges and total calculations.
   - Store rubric version, scorer name or role, scoring date, optional comments, and awarded points.
   - Clearly separate unscored manual responses from zero-point responses.

6. **Version-safe attempts and results**
   - Store the complete bank hash and response-schema version with each attempt.
   - Do not silently rescore an old attempt against a changed bank.
   - Persist each attempt and its results under its attempt ID.
   - Preserve parallel-tab isolation.

7. **Reusable evaluation engine**
   - Parameterize the Test 1 evaluator so every bank receives its own manifest and golden fixture.
   - Lock every scoring, rubric, stimulus, media, interaction, form-difficulty, claim, target, DOK, and standard field.
   - Retain Test 1 as the cross-bank structural and fairness baseline.

## 6. Content-Authoring Rules

- Tests 2 and 3 must contain genuinely original questions, not number-swapped copies of Test 1 or Grade 3 forms.
- Passages and listening scripts must be original, public domain, or properly licensed, with provenance recorded.
- Test 2 and Test 3 may use parallel claim/standard matrices, but they must use different contexts, stimuli, wording, values, and answer structures.
- No item may expose its answer through labels, helper text, image alt text, field names, or interaction behavior.
- Distractors must reflect plausible Grade 4 misconceptions and must not be trick answers.
- All objective items require exactly one defensible scoring interpretation.
- Every constructed response requires a complete point-level rubric and exemplar/anchor guidance.
- Accessibility adaptations may change the response mechanism only when the mathematical or literacy construct and scoring remain equivalent; every adaptation must be documented.

## 7. Test 2 and Test 3 Separation

Both Phase 2 forms will have the same full length and Easy classification, but they will not be clones.

| Dimension | Test 2 | Test 3 |
|---|---|---|
| Overall difficulty | Easy | Easy |
| Math contexts | Original context set A | Original context set B |
| Literary passage | Original literary stimulus A | Original literary stimulus B |
| Informational passage | Original informational stimulus A | Original informational stimulus B |
| Listening | Two original presentations A | Two original presentations B |
| ELA PT | Original source package A; opinion | Original source package B; narrative or informational |
| Standards/claims | Full Grade 4 matrix | Parallel coverage with different item constructions |

Cross-form duplicate evaluation will reject:

- Exact duplicate prompts or options.
- Simple number or name substitutions.
- Near-identical sentence structures with the same reasoning path.
- Reused passages, listening scripts, source packages, or PT data.

## 8. Evaluation and Testing Gates

No Phase 2 bank is ready until all applicable gates pass.

### Data and structural gates

- Exact section item and point counts.
- Correct form-level difficulty classification and approved Easy-form complexity profile.
- Claim, domain, target, DOK, and standard coverage.
- Unique stable item IDs and source IDs.
- Complete prompts, options, keys, rubrics, explanations, and metadata.
- No accidental Test 1, Test 2, Test 3, or Grade 3 data leakage.

### Content and fairness gates

- Independent answer-key review.
- Stimulus sufficiency review for every source-based item.
- Passage and listening-script grade-level review.
- Math reading-load and diagram-sufficiency review.
- Cultural fairness, accessibility, ambiguity, and answer-leakage review.
- Cross-form duplication and template-similarity review.

### Scoring gates

- Correct, incorrect, malformed, and blank responses.
- Required selection counts and ordered multipart answers.
- Equivalent numeric forms and tolerances where allowed.
- Partial-credit boundaries.
- Manual rubric range, NS, trait-total, and persistence behavior.
- Results calculated from the exact attempted bank version.

### Browser and media gates

- Open and navigate every item in all four sections.
- Verify all required images and audio requests succeed.
- Test listening audio metadata, play, pause, replay, and transcript association.
- Test every interaction family through response, reload, submission, and results.
- Verify Part 1 review, Part 2 transition, source/note continuity, and no return to Part 1.
- Verify parallel attempts and stale-bank handling.
- Visual QA at desktop and narrow viewport for high-risk diagrams, tables, audio, and PT screens.

### Regression gates

- Test 1 fidelity evaluation remains green.
- All existing unit, scoring, persistence, browser, lint, and production-build checks pass.
- Mutation tests prove that changes to prompts, option order, keys, form difficulty, rubrics, scoring rules, assets, audio, and manifests fail the appropriate gate.

## 9. Delivery Sequence

1. Approve this Phase 2 plan.
2. Implement and validate the shared architecture prerequisites.
3. Re-run the complete Test 1 regression gate.
4. Produce the detailed Test 2 item matrix before writing full item content.
5. Author Test 2, build its independent fixture/evals, and complete all QA gates.
6. Produce the detailed Test 3 item matrix using Test 2 duplication findings.
7. Author Test 3, build its independent fixture/evals, and complete all QA gates.
8. Run cross-form Test 1/2/3 coverage, form-difficulty, duplication, scoring, browser, and visual reports.
9. Commit only validated files, push `main`, and allow Vercel to deploy.

## 10. Required Reports

- Phase 2 architecture regression report.
- Test 2 content matrix and eval report.
- Test 3 content matrix and eval report.
- Test 1/2/3 cross-form coverage and duplication report.
- Scoring and rubric report.
- Browser, audio, persistence, and visual QA report.
- Final release checklist with GitHub and Vercel status.

## 11. Official References

- [Smarter Balanced ELA adjusted blueprint](https://portal.smarterbalanced.org/library/en/elaliteracy-adjusted-blueprint.pdf)
- [Smarter Balanced Mathematics adjusted blueprint](https://portal.smarterbalanced.org/library/en/mathematics-adjusted-blueprint.pdf)
- [CAASPP practice and training resources](https://www.caaspp-elpac.org/resources/preparation/practice-and-training-tests/practice-and-training-resources)
- [CAASPP frequently asked questions](https://www.caaspp-elpac.org/help/get-answers)

These references define claims, DOK expectations, and test structure. The decision to keep Tests 2 and 3 at the longer 69-item Practice Test 1 length and classify both complete forms as Easy is a Phase 2 product decision, not an official CAASPP requirement.
