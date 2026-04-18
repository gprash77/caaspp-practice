# Repo Workflow Rules

This file is the CAASPP-specific supplement to the shared workflow rules in [/Users/gprash77/projects/AGENTS.md](/Users/gprash77/projects/AGENTS.md).

If there is a conflict, follow the stricter rule.

These rules apply to every coding session in this repository.

## Delivery Order

1. Make the code changes.
2. Run the CAASPP eval gate against the corrected Test 1 baseline.
3. Run local automated checks relevant to the work.
4. Run browser / UI verification when the work affects visible behavior.
5. Fix issues found in testing before asking the user to check.
6. Commit the intended changes.
7. Push `main` to GitHub.
8. Let Vercel deploy from `main`.

Do not skip straight to deploy from an unpushed local state unless the user explicitly asks for that.

## Testing Expectations

Before handing work back to the user, the agent should do its own verification first.

Expected checks, when applicable:

- golden-set / eval review against corrected Test 1
- data and integrity tests
- scoring tests
- build
- browser testing with automation
- targeted interaction checks for custom question types
- persistence / navigation checks for answer state when UI interactions were touched

If browser automation is available, use it before asking the user to manually verify.

If a check cannot be run, say exactly what was blocked and why.

## CAASPP Eval Rule

For this repository, corrected Test 1 is the golden baseline dataset.

Before any test-bank change is considered ready, the agent must evaluate the changed content against that baseline as applicable:

- compare scaffold and section counts against corrected Test 1
- compare stimulus fairness against corrected Test 1 expectations
- review presentation / transcript / source-based questions to make sure students have enough information to answer fairly
- review shared math stimulus items such as tables, diagrams, and PT setup data to make sure the question can be answered from the provided stimulus
- treat this evaluation step as a required gate before commit, not a follow-up step after commit

For CAASPP work, "evals" means more than automated tests. It includes content-fairness review, stimulus sufficiency review, browser verification, and structural comparison to corrected Test 1.

## User QA Rule

Do not ask the user to test something until the agent has already:

- tested locally as much as possible
- reviewed the visible UI
- checked for obvious regressions

User testing is a final confirmation step, not the first line of QA.

## Git And Deploy Rules

- Prefer focused commits.
- Do not mix unrelated local files into the main app commit.
- Do not commit local artifacts such as `.playwright-cli/` unless explicitly requested.
- Do not deploy from a dirty worktree unless the user explicitly approves that workflow.
- Do not commit CAASPP test-bank changes until the eval gate above has been completed.
- Preferred release flow is:
  - local test
  - evals
  - commit
  - push
  - Vercel deploys from `main`

## Scope Control

When unrelated local changes are present:

- keep the intended app work isolated
- stage only the relevant files
- leave unrelated files unstaged unless the user asks to include them

## Communication Rule

Be clear about:

- what was changed
- what was verified
- what remains unverified
- whether GitHub and Vercel are both updated
