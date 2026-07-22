# Grade 4 Phase 2 Final Release Checklist

Date: 2026-07-22

## Content and data

- [x] Test 1 remains the corrected official golden baseline.
- [x] Tests 2 and 3 each contain 69 items and 81 points.
- [x] Claim, DOK, domain/target, standard, provenance, stimulus, media, and scoring fields are locked.
- [x] Fairness, ambiguity, reading load, stimulus sufficiency, answer leakage, and cross-form duplication reviewed.

## Scoring and application

- [x] All three independent evals pass.
- [x] Objective, partial-credit, constraint, manual-rubric, malformed, blank, and boundary behavior tested.
- [x] Version-safe attempts, persistence, results isolation, and stale-bank behavior tested.
- [x] Unit/data/scoring tests pass: 1,758.
- [x] Lint passes.
- [x] Production build passes.
- [x] Full Playwright suite passes: 62/62.
- [x] Desktop and narrow-viewport visual QA pass.

## Release

- [ ] Intended Phase 2 files committed to `main`.
- [ ] `main` pushed to GitHub.
- [ ] Vercel production deployment confirmed.
- [ ] Live Test 3 routes, audio, images, and homepage label verified.

The release boxes are completed only after the corresponding GitHub, Vercel, and live HTTP checks succeed.
