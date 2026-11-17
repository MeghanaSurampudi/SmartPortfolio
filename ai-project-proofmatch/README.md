# ProofMatch — Evidence-First AI Job Readiness Analyzer

**A small, explainable NLP-style career tool that compares a resume with a job description and shows evidence, wording gaps, and a focused learning plan.**

## Why this project is different

Most beginner resume matchers return one percentage. ProofMatch also shows:
- which role skills were detected in the resume;
- a sentence from the resume that supports each detected skill;
- skills not detected, clearly labelled as *not found* rather than proof that the person cannot do them;
- a seven-day micro-plan to close or investigate the gaps;
- a downloadable plain-text report.

It is intentionally privacy-first: text is processed in the browser and is not sent to a server.

## Run it

1. Download or clone this repository.
2. Open `ai-project-proofmatch/index.html` in a modern browser.
3. Paste resume text and a job description, or load the sample inputs.
4. Select **Analyze my match** and review the evidence map.

No API key, installation, database, or paid service is required.

## How it works

1. A small, editable skill dictionary maps common skill names and aliases to canonical categories.
2. The analyzer scans the job description and resume for those terms.
3. It calculates coverage as: detected overlapping job skills ÷ detected job skills × 100.
4. It displays the first resume sentence containing an alias for each matched skill.
5. It creates a simple seven-day practice plan from the first missing skills.

## Technology

- HTML5, CSS3, vanilla JavaScript
- Browser text processing and regular expressions
- DOM manipulation and Blob-based report export

## Limitations and honest claims

This is an **explainable keyword-matching prototype**, not a trained LLM, semantic embedding model, or validated hiring predictor. The score measures dictionary overlap only; it does not measure skill depth, project quality, years of experience, or actual job suitability. Synonyms and context may be missed. A detected term is not proof of proficiency. Users should manually verify every result.

## Next improvements

- Add a user-editable skill dictionary and synonym editor.
- Add PDF/DOCX resume parsing with explicit local-only processing.
- Add semantic similarity using a small open-source embedding model.
- Add unit tests for aliases, boundary matching, and score calculation.
- Add role-specific learning resources with verified links.

## Resume description (use after you test it)

**ProofMatch — Evidence-First Job Readiness Analyzer:** Built a privacy-first JavaScript tool that compares resume and job-description text, maps detected skills to supporting resume sentences, highlights unmentioned requirements, calculates transparent keyword coverage, and generates a seven-day learning plan.
