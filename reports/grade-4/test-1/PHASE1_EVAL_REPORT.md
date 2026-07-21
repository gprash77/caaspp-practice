# Grade 4 Test 1 — Phase 1 Eval Report

Baseline version: `2026-07-20.1`

Official source retrieval date: 2026-07-20
Runtime scope: Grade 4, Practice Test 1 only

## Official structure

| Section | Items | Raw points | Official source |
|---|---:|---:|---|
| Math CAT | 31 | 32 | Grade 4 Mathematics Practice Test Scoring Guide |
| Math PT — *Art Day!* | 5 | 6 | Grade 4 Mathematics Performance Task Scoring Guide |
| ELA CAT | 30 | 30 | Grade 4 ELA Practice Test Scoring Guide |
| ELA PT — *Animals and Their Surroundings* | 3 | 13 | Grade 4 ELA Performance Task Scoring Guide |
| **Total** | **69** | **81** | Four pinned official PDFs |

The official PDF URLs, retrieval date, page counts, item counts, and SHA-256 hashes are locked in `data/official/grade-4/test-1/sources.json`.

## Required gate coverage

- Every runtime item is matched to its official section, item number, and scoring-guide page.
- Locked section hashes cover prompt text, option order, passages/transcripts, directions, interaction data, keys, accepted answers, point values, rubrics, metadata, scoring rules, and asset references.
- Independent key sequences are stored separately from the runtime bank.
- Mutation tests prove that prompt, option-order, key, rubric, asset-hash, and scoring-rule changes fail the gate.
- Independent scoring tests cover ordered multipart responses, fraction/decimal equivalence, malformed responses, Math CAT item 19 partial credit, factor families, comparison boundaries, fruit grouping, and valid/invalid Art Day schedules.
- Stimulus sufficiency review covers all reading clusters, both listening clusters, every math diagram/model item, the full Art Day setup, and all three ELA PT sources.
- Browser automation opens and checks all 69 items, exercises each new interaction family, verifies reload persistence, parallel-attempt isolation, source images/transcripts, and partial-credit results.

## Fidelity status

All question text, source text, answer keys, scoring rules, point values, and item rubrics are locked to the reviewed official baseline. Official visual source crops are stored locally and hash-checked.

The two listening transcripts are exact transcriptions recovered from the live public CAASPP practice interface. The local M4A files are accessibility narrations generated from those exact transcripts because the public interface serves the original audio through a session-scoped player. This is recorded as `equivalent-approved`, not falsely labeled as the original audio binary.

## Commands

```bash
npm run eval:grade4-test1
npm test
npm run test:e2e -- e2e/grade4-test1.spec.ts
npm run build
```

The Phase 1 gate must pass before any future Grade 4 test-bank change is committed.
