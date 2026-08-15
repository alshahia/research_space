---
name: research-eval-readme
description: Research golden-test eval harness. Walks hand-crafted topics, grades per-criterion, aggregates per-date scores. Activates alongside Tier 4 multi-agent research loop.
---

# Research Eval Harness

**Date:** 2026-08-13
**Tier:** 4 (multi-agent research loop + verifier + human eval)
**Sub-agent:** research / review / master

## What this is

The research eval harness is a **human-eval calibration loop** for the multi-agent research flow (Tier 4). It ships three hand-crafted golden tests that exercise the workflow end-to-end:

- **01_arxiv_topic.md** - academic survey (RAG state of 2026).
- **02_web_topic.md** - recent web events (agent-harness comparison).
- **03_comparison_topic.md** - cross-product comparison (NotebookLM vs Perplexity DR vs ChatGPT DR).

Each golden test is a self-contained `*.md` file with: topic, suggested sub-question decomposition, expected sources, expected key findings, and a 5-criterion grading rubric (6 for comparison topics). The runner script walks all 3 tests, prepares per-test prompts, ingests the resulting synthesis, and aggregates the user-provided scores into a single per-date report.

The harness exists because LLM-research quality drifts - without a calibration loop, the multi-agent loop can degrade silently as the model changes. Running a golden test monthly, or after every Tier 4 change, keeps the workflow honest.

## How to add a new golden test

Template - copy this into `agents_manager/eval/golden-tests/<NNN>_<short_slug>.md`. Match the frontmatter and section headings of the existing three.

```markdown
---
name: golden-test-NNN-<slug>
description: <one-line description - what domain / tier / sub-questions>
---

# Golden Test NNN - <slug>

**Test id:** <NNN>-<slug>
**Date:** <YYYY-MM-DD>
**Domain:** <academic | web | comparison | ...>
**Tier:** 4
**Sub-agent:** research / planner / coder / eval runner

## Topic

> "<the research topic>"

## Sub-question decomposition (suggested for master)

1. **Sub-<name>** - <description>
2. ...

## Expected sources

- <canonical URL 1>
- <canonical URL 2>
- ...

## Expected key findings

1. <key claim 1>
2. ...

## Coverage risks to flag in verifier

- <risk 1>
- ...

## Run instructions

Same as <existing test id> - see this README § How to run a test.

## Grading rubric (5 criteria × 1-5 score)

| # | Criterion | Score 1 (worst) | Score 3 (acceptable) | Score 5 (best) |
|---|-----------|-----------------|----------------------|----------------|
| 1 | Citation density | ... | ... | ... |
| ... |

Total possible: 25. Pass: ≥ 18 (72%). Excellent: ≥ 22 (88%).

### Bonus criterion (comparison topics only)

| 6 | Comparison-table specific | ... | ... | ... |

## References

| # | Source | Type | URL | Access date |
|---|--------|------|-----|-------------|
| [S1] | ... | ... | ... | ... |

## Metrics

- rubric_criteria: 5
- pass_threshold: 18
- excellent_threshold: 22
- expected_sources_min: ...
- expected_key_findings_min: ...
- sub_questions_suggested: ...
```

The two existing comparison tests (`02_web_topic.md`, `03_comparison_topic.md`) are exemplary templates for comparison topics. `01_arxiv_topic.md` is the template for academic / arXiv topics.

Naming conventions:

- Test id is `NN-<slug>` - three-digit prefix (zero-padded), hyphen, kebab-case slug.
- File name is `NN_<slug>.md` with an underscore separator (because Windows-friendly names are easier when copy-pasted from shell).
- Frontmatter `name:` mirrors the file name (`golden-test-NN-<slug>`).
- The grading rubric MUST total either 25 (no bonus) or 30 (with bonus criterion).

## How to run a test

### Step 1 - list all tests

```bash
bash scripts/run-research-eval.sh
# or: pwsh scripts/run-research-eval.ps1
```

This walks all three tests, creates `share/eval/<YYYY-MM-DD>/<test-id>/PROMPT.md` and `RUBRIC.md`, and prints an aggregate scaffold at `share/notes/04_eval_run_<YYYY-MM-DD>.md`.

### Step 2 - read the prepared prompt

```bash
cat share/eval/<YYYY-MM-DD>/<test-id>/PROMPT.md
```

This file has: the topic, the suggested sub-questions, and a reminder of the workflow steps (multi-agent loop → synthesis → verifier → master synthesis).

### Step 3 - run the multi-agent research loop

Dispatch the workflow per `agents_manager/research/WORKFLOW.md`:

1. Master dispatches one `am-research` sub-agent per sub-question (in parallel).
2. Each writes `share/notes/01_research_<task-id>_<sub>.md` with `[S1]..[Sn]` citations.
3. Lead am-research synthesizes to `share/notes/01_research_<task-id>.md`.
4. am-review (verifier mode) writes `share/notes/04_review_<task-id>_verifier.md`.
5. Master writes `share/notes/01_master_synthesis_<task-id>.md`.

The result is the canonical research file under `share/notes/`.

### Step 4 - ingest the run

```bash
bash scripts/run-research-eval.sh <test-id> --ingest
# or: pwsh scripts/run-research-eval.ps1 <test-id> --ingest
```

This copies the latest eligible synthesis (filtered to skip `_sub-`, `_verifier`, `_master_synthesis`) into `share/eval/<YYYY-MM-DD>/<test-id>/RUN.md`.

### Step 5 - grade

Open `share/eval/<YYYY-MM-DD>/<test-id>/RUBRIC.md` and grade each criterion 1-5. Paste the scores into the aggregate scaffold at `share/notes/04_eval_run_<YYYY-MM-DD>.md`. Sum the scores; verify pass / excellent thresholds.

### Step 6 - archive

Commit `share/eval/<YYYY-MM-DD>/` and `share/notes/04_eval_run_<YYYY-MM-DD>.md` so the results survive in `git log`. Comparison with future runs reads from these committed scaffolds.

## How to interpret the results

The grading rubric is a **contract**: it is the spec for what a good run looks like. A score below the pass threshold is a real signal - the run failed, not the grader.

| Total | Verdict | Action |
|-------|---------|--------|
| ≥ excellent (22 / 26 / 27) | Excellent - ship tier-4 output as is. | No action. |
| ≥ pass (18 / 21) | Pass - works, room to improve. | Tweak the workflow or the rubric; re-run. |
| < pass | Fail - the loop drifted. | Read verifier report, fix workflow, re-run. |

Comparison across runs:

- A run-month-over-month delta in any criterion > 1.0 = real change. Investigate.
- A run that climbs from "pass" to "excellent" after a Tier 4 change = the change worked.
- A run that drops from "excellent" to "pass" without a Tier 4 change = the model drifted; surface to the user.

## How often to run

Suggested cadence (the user is the judge; this is a default):

- **After any Tier 4 change.** A new golden test prompt, a new sub-agent, a new verifier flag. Re-run the 3 (or 4) tests; before/after.
- **Monthly.** A "model-drift baseline." Pick the first business day of each month. The 3 tests are designed to be ≤ 30 minutes wall-clock each.
- **When the user says "calibrate."** Trigger phrase. Run the full set.
- **Before any Tier 4 release.** If you tag a release that changes the multi-agent loop, run the eval first.

Skip cadence (the test is not free):

- **During Tier 1 / Tier 2 / Tier 3 work.** The eval is for Tier 4 outputs.
- **For trivial one-line edits.** Skip - no Tier 4.

## See also

- `agents_manager/research/WORKFLOW.md` - the multi-agent research loop.
- `agents_manager/review/SKILL.md` § Research verifier mode - the verifier rubric.
- `agents_manager/SKILL.md` § Research-detector - when Tier 4 fires.
- `agents_manager/memory/projects/research-space/playbook.md` - prior outputs the eval references.

## References

| # | Source | Type | URL | Access date |
|---|--------|------|-----|-------------|
| [S1] | Multi-agent research loop workflow | controller doc | agents_manager/research/WORKFLOW.md | 2026-08-13 |
| [S2] | Verifier mode | controller doc | agents_manager/review/SKILL.md § Research verifier mode | 2026-08-13 |
| [S3] | Eval runner script (bash) | tool | scripts/run-research-eval.sh | 2026-08-13 |
| [S4] | Eval runner script (PowerShell) | tool | scripts/run-research-eval.ps1 | 2026-08-13 |
| [S5] | Research-detector heuristic | controller doc | agents_manager/SKILL.md:755-803 | 2026-08-13 |
| [S6] | Eval golden tests directory | controller doc | agents_manager/eval/golden-tests/ | 2026-08-13 |
| [S7] | Eval README | controller doc | agents_manager/eval/README.md | 2026-08-13 |

## Metrics

- golden_tests: 3
- rubric_criteria_per_test: 5 (6 for comparison)
- pass_thresholds: 18 / 21
- excellent_thresholds: 22 / 26 / 27
- cadence: per Tier 4 change + monthly
- audit_log: share/eval/<YYYY-MM-DD>/ + share/notes/04_eval_run_<YYYY-MM-DD>.md
