# CLAUDE.md

# research_space - research-first controller

This repo's job is to do research well. Every layer (orchestrator, specialists, docs, docs-site, examples) leads with research excellence. The agents-manager controller underneath is the platform; research is the product.

## Research-first, auto-routing

When the user gives a research-y task - "research X", "compare X and Y", "what is the state of X", "investigate X", "find out about X", "analyze X", "study X" - the system routes to the enhanced `am-research` flow and writes a citation-rich, multi-source report at `share/notes/01_research_<task-id>.md`. See `agents_manager/SKILL.md` § Research-detector for the heuristic and tier routing.

When the user gives any other task (code, design, plan, build, ship, health, debug, install), the system uses the **standard pipeline unchanged**: capture → research if needed → plan → build → review. Default-tools only. Pipeline stays the default shape, not a hard rule.

To opt out of the research detector on a single task, prepend `/standard` to the dispatch prompt. Example: `/standard research how to deploy Llama 3` still routes to `am-research` via the standard pipeline, skipping the Tier 1+ enhancements. The `/standard` prefix preserves backward compat for downstream projects that installed the controller without the new heuristic.

For single-step work (quick edit, one-off question, "rename X"), do it directly. No master, no pipeline.

## Clarification gate (before dispatching am-research for unbounded research tasks)

If the user's task is ambiguous about any of:
- (a) build new vs enhance existing
- (b) which layer of the project (orchestrator, platform, docs, both)
- (c) what the user will do with the output (build it, read it, share it, archive it)
- (d) scope (full conversion vs focused enhancement vs audit)

Ask 1-3 sharp questions via `question()` BEFORE dispatching am-research for any task that could spawn a multi-hour research sweep. Skip the gate only when the task is fully unambiguous. Skipping clarification on a research sweep wastes ~30 minutes per occurrence and produces ~10K words of off-target artifacts.

Concrete test: if the request could reasonably produce two different outputs that differ in >50% of content, ask. If the request maps to exactly one deliverable, proceed.

## The 10-agent roster

Defined in `opencode.jsonc`. Soft walls (v0.5.0+). Each agent has `permission: "allow"`; boundaries are prose contracts in each `SKILL.md` + inline prompt's Can/Can't list.

| Agent | Owns |
|---|---|
| `master` | `share/handoffs/`, `share/notes/99_decisions.md`, `tasks/`, `agents_manager/SKILL.md` (own doc only) |
| `am-research` (v0.14.1+, enhanced Tier 1) | `share/notes/01_research_*.md` with `[S1]..[Sn]` citations + source table |
| `am-planning` | `share/notes/02_plan_*.md`, `tasks/<id>.md` rows |
| `am-design` (v0.9.0+) | `share/design/<task-id>/**` - never `src/**` |
| `am-assets` (v0.9.0+, Phase 3a, opt-in) | `assets/MANIFEST.json`, `share/notes/03a_assets_*.md` |
| `am-coder` | source code, `share/notes/03_coder_summary_*.md` |
| `am-review` | `share/reports/04_review_*.md` |
| `am-investigate` (v0.18.0+) | `share/notes/04_investigate_*.md` |
| `am-ship` (v0.18.0+) | `share/notes/05_ship_*.md`, `VERSION`, `agents_manager/CHANGELOG.md` |
| `am-health` (v0.18.0+) | `share/health/<date>.json`, `share/notes/05_health_*.md` |

When `master` detects a research task it dispatches `am-research` first. The specialist reads `agents_manager/research/SKILL.md` for the 5 enhanced sections (source-connector protocol, citation discipline, synthesis patterns, Arabic support, memory reuse).

## Voice and conventions

- Direct, builder-to-builder. Name the file, function, command, user-visible impact. No AI vocabulary: no "delve", "crucial", "robust", "comprehensive", "nuanced", "multifaceted". No em dashes. Short paragraphs.

**Em-dash enforcement (v0.21.0+):** before returning any artifact, run `grep -rn $'\u2014' <files-touched>` to find any U+2014 em-dash characters. Replace each with ` - ` (hyphen with surrounding spaces), `:`, or `,` as appropriate. PRESERVE em dashes only in citation rows where the format spec explicitly requires them (see `agents_manager/research/resources/skills/citation-format/SKILL.md` for the allowed pattern). This is non-negotiable. Re-run the grep after each replacement batch until zero non-citation em dashes remain.
- Master never codes, plans, designs, or reviews. It routes.
- Specialists never spawn other specialists. Only master orchestrates.
- All inter-agent communication goes through files in `share/`. No out-of-band chat.
- Task id format: `T-YYYY-MM-DD-NNN`. One task file per id in `tasks/`.
- Review reports are brutally honest. False PASS ships bugs; false FAIL just costs a fix loop.
- Sub-agent `SKILL.md` and `rules.md` are reference docs read on agent startup.

## Tool usage efficiency (v0.5.1+)

Applies to this LLM and to every specialist. The full pattern: batch parallel reads when you know which files you need, batch parallel edits when independent. Read once, edit many. Discovery first (grep/glob), read second. Only sequence when later edits depend on earlier (line shifts). Verify oldString uniqueness across a batch before issuing. Validate once after the batch, not mid-batch. See `agents_manager/SKILL.md` and each specialist's `SKILL.md` for caveats.

## Project structure

```
agents_manager/         - controller (master + 9 specialists) with one SKILL.md + rules.md each
share/                  - inter-agent bus: handoffs/, notes/, reports/, design/, messages/
tasks/                  - canonical task tracker (one .md per task id)
research/               - 3 historical research outputs (read-only, not touched)
research_doc/           - 8 historical research outputs (read-only, not touched)
docs/                   - docs-site content + PERMISSIONS + superpowers specs/plans
opencode.jsonc          - agent definitions + permissions (10 agents)
CLAUDE.md               - this file
agents_manager/memory/  - 3-scope memory (global + projects + per-role)
agents_manager/memory/projects/research-space/playbook.md  - per-project research index (Tier 3)
```

## Don't do

- Do NOT edit files inside `agents_manager/` unless explicitly redesigning the controller (Tier 1+ rewrites are an exception; they ship append-only `## Research mode` sections).
- Do NOT spawn specialists from a specialist. Only master orchestrates.
- Do NOT skip the review phase because "it looks fine."
- Do NOT accept the first review report without reading it.
- Do NOT touch `research/` or `research_doc/` (historical artifacts, read-only).
- Do NOT touch `platform/` (out of scope for the research-first conversion).

## Memory

Cross-session memory in three scopes, read in this order on re-entry:

1. **Global** - `agents_manager/memory/global/` - cross-project insights.
2. **Project** - `agents_manager/memory/projects/<slug>/` - active project (slug = `agents_manager/.active-project` if present, else `basename $(pwd)`). For this repo the slug is `research-space`.
3. **Role** - `agents_manager/<role>/notes/{semantic,episodic}/` - per-specialist memory.

Master writes global + project. Specialists write role. All entries follow the schema in `agents_manager/memory/README.md`. Validator: `bash scripts/validate-memory.sh`.

`am-research` additionally reads `agents_manager/memory/projects/research-space/playbook.md` on every dispatch (Tier 3 hook) and writes a one-line "what new pattern did this task reveal?" back when finished. Playbook indexes the 11 historical outputs (3 in `research/` + 8 in `research_doc/`) without modifying them.

## See also

- `agents_manager/SKILL.md` - master orchestration protocol + § Research-detector (Tier 1+)
- `agents_manager/research/SKILL.md` - enhanced `am-research` (5 new sections)
- `agents_manager/README.md` - controller overview
- `agents_manager/CHANGELOG.md` - system evolution
- `AGENTS.md` - project-orientation doc (controller config)
- `research/00_TOP_RESEARCH_PRODUCT_ROADMAP_T-2026-08-13-002.md` - the research-first conversion roadmap (read-only reference)