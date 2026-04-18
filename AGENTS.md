# Repo Workflow Rules

This file is the CAASPP-specific supplement to the shared workflow rules in [/Users/gprash77/projects/AGENTS.md](/Users/gprash77/projects/AGENTS.md).

If there is a conflict, follow the stricter rule.

These rules apply to every coding session in this repository.

## Delivery Order

1. Make the code changes.
2. Run local automated checks relevant to the work.
3. Run browser / UI verification when the work affects visible behavior.
4. Fix issues found in testing before asking the user to check.
5. Commit the intended changes.
6. Push `main` to GitHub.
7. Let Vercel deploy from `main`.

Do not skip straight to deploy from an unpushed local state unless the user explicitly asks for that.

## Testing Expectations

Before handing work back to the user, the agent should do its own verification first.

Expected checks, when applicable:

- data and integrity tests
- scoring tests
- build
- browser testing with automation
- targeted interaction checks for custom question types
- persistence / navigation checks for answer state when UI interactions were touched

If browser automation is available, use it before asking the user to manually verify.

If a check cannot be run, say exactly what was blocked and why.

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
- Preferred release flow is:
  - local test
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
