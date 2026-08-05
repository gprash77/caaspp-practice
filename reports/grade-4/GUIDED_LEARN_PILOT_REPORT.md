# Grade 4 Guided Learn Pilot Evaluation Report

Date: August 5, 2026

Status: Local release gate passed

## Outcome

Grade 4 Learn now opens with a sequenced instructional path instead of placing a
child directly into the existing practice library. The original 31-lesson,
124-task California/SFUSD-aligned library remains available as a separate
Practice Library mode.

The pilot contains two complete guided units:

| Subject | Unit | Standards | Guided steps | Original checks |
| --- | --- | --- | ---: | ---: |
| Math | Fractions That Make Sense | `4.NF.A.1`, `4.NF.A.2` | 6 | 5 |
| ELA | Evidence Detective | `RL.4.1`, `RI.4.1` | 6 | 5 |

## Instructional Contract

Each unit moves through a locked, child-readable sequence:

1. Direct teaching in concise sections
2. A reusable step-by-step strategy
3. A fully modeled “Watch me” example
4. Guided practice with targeted retry feedback
5. Optional hints that remain available after an incorrect attempt
6. Independent application
7. A final mastery check

Later steps remain locked until the preceding step is complete. Children can
revisit completed steps at any time. A correct answer explains why the reasoning
works; an incorrect answer identifies what to reconsider without revealing a
test-bank key.

## Progress and Safety

- Guided answers, completed steps, and requested hints persist in the existing
  Learn-only `caaspp-learn:grade4:v2` record.
- Existing Learn progress migrates without losing prior choice or written work.
- Guided Learn does not read, create, or modify `caaspp-attempt:*` assessment
  records.
- No released Grade 4 prompt is reused in the ten guided checks.
- The official Test 1 baseline and original Tests 2–10 are unchanged.

## Verification

- Corrected Grade 4 Test 1 structural, fairness, and stimulus-sufficiency gate:
  passed for all 69 items. The longstanding approved generated-audio
  equivalence warning remains unchanged.
- Unit, integrity, and scoring suite: 12 files and 1,804 tests passed.
- Guided-content checks: unique unit, step, and question IDs; valid answer keys;
  complete hints, retry guidance, and explanations; original prompts distinct
  from released Tests 1–10.
- ESLint: passed.
- TypeScript and production build: passed.
- Full Playwright regression: 85 tests passed.
- Browser coverage verified sequential locking, incorrect-answer remediation,
  post-error hints, correct-answer explanations, reload persistence, subject
  switching, Practice Library continuity, and Learn/assessment isolation.
- In-app visual QA passed on desktop and at 390 × 844 for both Math and ELA.
  There was no horizontal overflow and no browser warning/error output.
- The browser suite can use `PLAYWRIGHT_PORT` to avoid reusing an unrelated
  local app that happens to occupy port 3000.

## Pilot Boundary and Recommended Expansion

This release intentionally proves the instructional model with one high-value
unit per subject. It is not yet a full guided Grade 4 curriculum. After learner
or parent review, the same contract can be expanded across the existing
California/SFUSD crosswalk before additional full-length practice forms are
added.
