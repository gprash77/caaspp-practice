# School Studies content and release review

Reviewed November 14, 2026.

## Scope and alignment

- Added a separate `/studies` area linked from the CAASPP home page.
- Classroom-topic alignment checked against the September, October, and November–December 2026 grade 4/5 family newsletters. Email text, private links, identifiers, and family details are not published in the app or repository.
- Science: Modeling Matter first, Patterns of Earth and Sky review, The Earth System and Ecosystem Restoration previews. The future unit order is the publisher recommendation, not a school-confirmed schedule.
- The public Modeling Matter guide has three chapters. Section 4 is explicitly labeled an original home review; no official fourth chapter is invented.
- Social studies: California regions, continuing Indigenous presence, stewardship, water scarcity and management, brochures, missions, Mexican rule, Gold Rush, statehood, source evaluation, and introductory government.
- All 21 home-study sections and 63 practice questions are original companion content, not publisher assessments. Public primary references appear in each unit. Exact school assessments and future teaching dates remain unverified.

## Required corrected Test 1 comparison

- No CAASPP bank, scoring, section manifests, stimulus files, or golden fixtures changed. Test-bank scaffold and section counts remain unchanged.
- `npm run eval:grade4-test1`: PASS, all 69 runtime items checked against the locked corrected Test 1 fixture. Existing approved audio-equivalence warning remains: local narration uses exact official transcripts.
- Following the baseline's stimulus-sufficiency principle, each new practice item can be answered from its lesson, included invented observations, or an explicitly open-ended prompt. No school simulation, hidden teacher text, external audio, unprovided diagram, or undisclosed data is required.
- Invented experimental data and imagined viewpoint cards are labeled. Open responses have model answers and self-check guidance rather than unsupported automatic scoring.
- Fairness review: distinguish evidence from inference; discuss experimental limitations; explain conservation of matter; avoid presenting all Native nations as one culture; include Native perspectives and colonial harms; distinguish free-state admission from equal rights.
- No shared math, performance task, presentation, or transcript stimuli were altered.

## Verification

- Production build and all 1,806 Vitest tests pass, including bank integrity and scoring suites.
- TypeScript and whitespace checks pass.
- 16 Chromium browser checks pass across the study area and existing home page: all 21 lessons, question controls, answer explanations, retry, persistence after navigation and reload, review/undo, malformed storage recovery, print styles, and mobile overflow.
- Desktop and 390px mobile screenshots visually reviewed. Local QA screenshots stay outside the repository.
- Progress is browser-local and shared among users of that browser profile. No account sync or school-grade claims are made.

The release uses a focused commit pushed to `main`, followed by the existing GitHub-driven Vercel deployment. Deployment status must be checked separately after pushing; this review does not itself assert production status.
