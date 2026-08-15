---
name: research-workflow-doc
description: Multi-agent research workflow - orchestrator + parallel sub-agents + verifier + master synthesis. Activate when the research-detector scores sum > 3.5 (Tier 4).
---

# Multi-Agent Research Workflow

**Date:** 2026-08-13
**Tier:** 4 (activate on research-detector sum > 3.5)
**Sub-agent:** research / master / review
**Standing on:** Anthropic Research engineering blog - "Building a multi-agent research system" [S1], plus the cloudflare synthesis style at `research/cloudflare-agent-internet-2026-08-12/00_MASTER_SYNTHESIS.md` (read-only).

## When to use this workflow

The standard pipeline routes research through a single `am-research` call. That is the right shape for short, fact-anchored, single-source questions. For multi-faceted research, that shape underperforms - a single agent pastes in its context window, loses track of citations, and synthesizes threads that were never connected.

This workflow activates when the **research-detector** scores a sum greater than 3.5 across four axes (intent, scope, evidence, reuse - see `agents_manager/SKILL.md` § Research-detector). Master surfaces the routing decision in `share/notes/02_plan_high_<task-id>.md` § Routing decision and prepends `research-detector tier: 4` to the orchestrator prompt.

Manual opt-in: if the user prefixed `/standard` to the dispatch, the standard pipeline runs and this workflow stays dormant. The user can also explicitly say "do it the multi-agent way" or "use the verifier loop" - that bypasses the detector.

## The five-stage pattern

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Orchestrator│ →  │  N parallel │ →  │  Synthesis  │
│  (master)   │    │ sub-agents  │    │ (lead am-   │
│             │    │ (am-research│    │  research)  │
└──────┬──────┘    └──────┬──────┘    └──────┬──────┘
       │                  │                  │
       │                  ▼                  ▼
       │            01_research_<task-id>_<sub>.md
       │                                            ┌─────────────┐
       └───────────────────────────────────────────▶│  Verifier   │
                                                     │  (am-review │
                                                     │  in verifier│
                                                     │   mode)     │
                                                     └──────┬──────┘
                                                            │
                                                            ▼
                                                   04_review_<task-id>_verifier.md
                                                            │
                                                            ▼
                                                   Master reviews + writes
                                                   01_master_synthesis_<task-id>.md
```

### Stage 1 - Orchestrator dispatches

Master (which acts as LeadResearcher) reads the user's topic and decides on **3-7 sub-questions**. Sub-question criteria:

- Each one is independently answerable.
- Coverage of the topic does not leave a major gap.
- Sub-questions do not overlap (overlap wastes sub-agents).
- The set is non-trivial to answer from memory alone (otherwise a single `am-research` call suffices).

Master writes the sub-question list as part of the orchestrator prompt to each sub-agent:

```
Research sub-question for task T-YYYY-MM-DD-NNN:

  "<the user's topic>"

  Own this sub-question:
  <verbatim sub-question text>

  Stand on:
  - The user task verbatim: share/handoffs/00_user_task_T-...md
  - The full topic: <one paragraph of context so the sub-agent does not have to re-read the master session>
  - Prior research: <list of relevant share/notes/01_research_*.md paths>

  Constraints:
  - Write your findings to: share/notes/01_research_<task-id>_<sub>.md
  - Use citation discipline ([S1]..[Sn] + per-source reference table).
  - Default tools only (webfetch + browse MCP). No Tavily / Exa / Brave / Perplexity Sonar.
  - Read agents_manager/memory/projects/research-space/playbook.md before starting (memory-reuse reflex).
  - Top of your file: "Reuses:" line citing the matching playbook entries.
  - Do NOT propose a plan. Do NOT write code. Return a research report only.

  Domain triggers:
  - If the sub-question is academic / CS / quantitative → use arXiv connector.
  - If biomedical → use PubMed.
  - If Arabic content → switch to locale-aware variant (see am-research/SKILL.md § AR support).
```

Master **files one handoff per sub-question** at `share/handoffs/03a_research-to-research_<task-id>_<sub>.md` so the audit trail is recoverable if a sub-agent loops or fails.

### Stage 2 - Parallel sub-agents

Master dispatches all sub-agents in a **single response** (parallel execution). The sub-agents are N fresh `am-research` calls, one per sub-question.

- Each sub-agent reads the playbook first (memory-reuse reflex from `am-research/SKILL.md`).
- Each writes to its own file: `share/notes/01_research_<task-id>_<sub>.md`. Sub-question filenames are slugified (e.g. `_sub-rag-architectures`, `_sub-rag-limitations`).
- Each sub-agent is **scoped to one sub-question**. It may reference sibling files but does NOT consume them - that consumption is the lead agent's job in Stage 3.
- Each sub-agent's report includes: per-source citation table, atomic-fact decomposition for the sub-question, contradiction handling, self-critique, `## Metrics` block.

Master waits for all sub-agents to complete. If a sub-agent fails (BLOCKED / NEEDS_CONTEXT), master either re-dispatches with more context or surfaces to the user.

### Stage 3 - Synthesis

The lead `am-research` agent (a fresh call, not a re-dispatch of one of the sub-agents) reads all sub-agent files and produces the canonical research file at `share/notes/01_research_<task-id>.md`. The lead's job is structural integration, not new investigation.

Synthesis work:

1. **Outline first.** 5-9 bullet outline pinned at the top of the file. Each bullet maps to ≥ 1 sub-agent (cite the sub-agent's source path:line).
2. **Atomic-fact integration.** Each atomic fact from the sub-agents gets one citation. If two sub-agents disagree on the same fact, the contradiction surfaces as a row in the `## Contradictions and caveats` block - do NOT pick one silently.
3. **Citation re-binding.** The lead re-numbers citations `[S1]..[Sn]` so the canonical file has a single reference table. Sub-agent file paths appear under each `[Sn]` row in the `sub_questions:` field.
4. **Coverage flag.** If a section has ≤ 1 citation per claim, mark the section header with `[low-citation-density]`. Master's gate flags this for re-research.
5. **Bilingual check.** If the task is Arabic, the lead writes the bilingual output (EN section + AR section) and uses RTL markdown for AR.

The synthesis file is also stored at `share/notes/01_research_<task-id>.md` per the standard convention. Master does NOT need a separate file at this stage.

### Stage 4 - Verifier (Tier 4 keystone)

A second `am-review` pass is dispatched against the synthesized research file. This is **not** the standard coder-review pass. It is the research verifier mode. The dispatch prompt reads:

```
Verifier dispatch for task T-YYYY-MM-DD-NNN:

  Synthesis file: share/notes/01_research_<task-id>.md
  Sub-agent files: share/notes/01_research_<task-id>_sub-*.md
  Output path: share/notes/04_review_<task-id>_verifier.md

  Flags I want you to raise (5 categories, per-claim + overall):
    1. claim-without-citation: any factual claim with no [Sn] marker or with [Sn] that does not exist in the reference table.
    2. cited-but-404: the URL in [Sn] row fails to resolve when fetched (HTTP 404, 410, or DNS error). Use webfetch.
    3. contradiction-between-sub-agents: two sub-agents disagree on the same atomic fact. Cite both sources.
    4. factscore-low-confidence: atomic fact from a single secondary source when a primary source would have been available. Tag with [secondary-only] + the kind of primary source expected (peer-reviewed paper, official docs, source code).
    5. arithmetic-quant-error: any percentage, dollar amount, version number, or date that did not pass a second-source verification.

  For each flag: PASS (no issue), WARN (minor - fix in next loop), FAIL (block).
  Overall verdict: PASS / WARN / FAIL plus a 1-2 sentence rationale.

  Do NOT fix anything. Do NOT edit any source file. Write the verifier report only.
```

The verifier agent uses the `## Research verifier mode` reflex added to `agents_manager/review/SKILL.md` (Phase 8 Task 2). See that doc for the per-claim rubric.

### Stage 5 - Final synthesis and master sign-off

Master reads the verifier report and decides:

- **PASS** - write the master synthesis at `share/notes/01_master_synthesis_<task-id>.md` and advance to Phase 2 (Planning).
- **WARN** - patch the synthesis file in place (loop sub-agents as needed) then master synthesis.
- **FAIL** - re-dispatch the affected sub-agents with the verifier's flags. Cap at 3 fix loops per sub-question (matches `max_fix_loops = 3` in `agents_manager/SKILL.md`). After 3 loops on the same sub-question, surface to the user.

The master synthesis file at `share/notes/01_master_synthesis_<task-id>.md` carries:
- The research question + sub-questions.
- The 5-9-bullet outline that the lead produced (master verifies it is still the right structure).
- Section-by-section summary, each section flagging the verifier verdict for that section.
- The verified reference table (one row per `[Sn]`).
- `## Recommended actions for planner` - a 3-7-bullet bridge between research findings and the planned build.
- `## Open questions for user` - anything the verifier flagged that requires user input.

## Boundaries

This workflow does NOT replace `am-planning` or `am-coder`. It produces research output only. The plan and the code are downstream - Phase 2 and Phase 3 of the default pipeline.

Master does NOT activate this workflow for tasks where:
- The research-detector scored Tier 0, 1, 2, or 3 (the simpler patterns work).
- The user prefixed `/standard` (explicit opt-out).
- The topic is one fact ("what version of X is current?") - a single `am-research` call suffices.

The workflow DOES activate for:
- Multi-faceted topics with known literature (RAG state-of-2026, agent harness comparisons, transformation roadmap).
- Comparison research across 3+ options.
- Tasks where prior research_space outputs (read from the playbook) are ≥ 50% relevant - the multi-agent loop lets one sub-agent focus on each option.

## Idempotence + audit trail

Each dispatch writes a trace entry to `share/notes/00_trace_<task-id>.jsonl` per `am-research/SKILL.md` § Trace log. The orchestrator (master) writes an additional entry with `phase: orchestration` at the start of Stage 1 and `phase: orchestration-synthesis` after Stage 5.

Sub-question filenames use the slugified sub-question title (≤ 40 chars). Example: "RAG architectures" → `_sub-rag-architectures.md`. If a sub-question title contains spaces, replace them with hyphens and lowercase.

The full workflow is auditable from `share/notes/99_progress_<task-id>.md`. Master appends one row per stage. The workflow does not bypass the progress ledger - it adds rows to it.

## See also

- `agents_manager/SKILL.md` § Research-detector - the activation heuristic.
- `agents_manager/research/SKILL.md` § Source-connector protocol + § Memory reuse - what each sub-agent loads.
- `agents_manager/review/SKILL.md` § Research verifier mode - Stage 4 mechanics.
- `agents_manager/eval/README.md` - golden tests that exercise this workflow end-to-end.
- `research/cloudflare-agent-internet-2026-08-12/00_MASTER_SYNTHESIS.md` (read-only) - the synthesis style this workflow aims for.

## References

| # | Source | Type | URL | Access date |
|---|--------|------|-----|-------------|
| [S1] | Anthropic - "Building a multi-agent research system" | engineering blog | https://www.anthropic.com/engineering/multi-agent-research-system | 2026-08-13 |
| [S2] | Anthropic - "Building effective agents" | engineering blog | https://www.anthropic.com/engineering/building-effective-agents | 2026-08-13 |
| [S3] | Master SKILL.md § Research-detector | controller doc | agents_manager/SKILL.md:755-803 | 2026-08-13 |
| [S4] | am-review § Research verifier mode | controller doc | agents_manager/review/SKILL.md (append in P8T2) | 2026-08-13 |
| [S5] | am-research § Source-connector protocol | controller doc | agents_manager/research/SKILL.md:387-409 | 2026-08-13 |
| [S6] | Eval README | controller doc | agents_manager/eval/README.md | 2026-08-13 |
| [S7] | Cloudflare synthesis (in-repo, read-only) | historical research | research/cloudflare-agent-internet-2026-08-12/00_MASTER_SYNTHESIS.md | 2026-08-13 |

## Metrics

- stages: 5
- parallel_sub_agents: 3-7
- fix_loop_cap: 3
- audit_log: share/notes/00_trace_<task-id>.jsonl + share/notes/99_progress_<task-id>.md
- bypass: /standard or tier < 4
