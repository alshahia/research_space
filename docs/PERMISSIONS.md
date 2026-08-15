# Permissions in research_space

This project uses the agents-manager controller with **soft walls** (v0.5.0+): all 10 agents have `permission: "allow"` in `opencode.jsonc`, and boundaries are enforced by prose contracts inside each agent's `SKILL.md` (the inline prompt's Can/Can't list, and the skill discipline documented in this file). OpenCode's permission layer is **not** used as the enforcement mechanism. The rationale lives in the controller's `docs/PERMISSIONS.md`; this file is a focused addendum for the research-first orientation.

## What a soft wall is

A soft wall is a documented boundary that an agent reads and honors by discipline. It is not a hard barrier. The master may authorize cross-lane work for a deliberate maintenance task (a route redesign, a controller bug, a tier-shift conversion), and the authorization is recorded in the dispatch prompt + the per-task ledger at `share/notes/99_progress_<task-id>.md`. The user is the ground truth on which lanes are open for which tasks.

## What changes when research-mode routing fires

Research-mode routing: when the master's research-detector activates (sum-of-axes >= 1.5, see `agents_manager/SKILL.md` § Research-detector), research-flow dispatches override the standard pipeline boundaries. Soft walls still apply (specialists do not write outside their lanes); the change is which specialist gets the task and which output path they use.

Specifically:

- **`am-research`** writes to `share/notes/01_research_<task-id>.md` (the canonical research path) instead of the per-sub-agent paths. It uses `[S1]..[Sn]` citation discipline + a per-source reference table. Access date 2026-08-13.
- **Eight downstream specialists** (planning, coder, review, design, assets, investigate, ship, health) carry a `## Research mode` reflex in their `SKILL.md`. When the dispatch carries `tier: >= 1`, the specialist pivots: it cites sources it generates, writes to a research-namespace path, preserves primary sources by URL + access date, writes a 1-line `What new pattern did this task reveal?` back to `agents_manager/memory/projects/research-space/playbook.md`, and supports Arabic synthesis when the user requests it.
- **Master** never writes research outputs directly; it routes. The master also inherits research-detector scoring discipline: detect tier, set tier in the dispatch prompt, route accordingly.
- **`am-coder` in research mode** still codes when the master assigns coding work; citation discipline applies only to claims it writes in prose (commit messages, summaries), not to source code.
- **`am-review` in research mode** still reviews; citation discipline applies to claims in its review report. The reviewer still runs documented tests and cites `path:line` evidence.
- **`am-design` in research mode** still produces design artifacts. The reflex applies only to design handoff prose with factual claims, not to mockups or tokens.

## What stays unchanged

- `research/` and `research_doc/` are READ-ONLY (historical artifacts). No agent writes there, regardless of tier.
- `platform/` is untouched (out of scope for the research-first conversion).
- `opencode.jsonc` is unchanged (no agent roster changes; the 10-agent roster stays intact).
- Hard walls on the controller's permission block are not re-introduced; the v0.5.0+ soft-wall architecture is preserved.
- Default tools only - no paid APIs (Tavily, Exa, Brave, Perplexity Sonar, etc.). External research uses `webfetch` on free endpoints + Jina Reader. The skill catalog ships `arxiv-search.md`, `pubmed-search.md`, `pdf-fetch.md`, `citation-format.md`, `synthesis-pattern.md`, `compare-sources.md`, `research-ar.md` at `agents_manager/research/resources/skills/` (Tier 2).

## `/standard` opt-out

The user can prepend `/standard` to any task to bypass the research-detector and use the default pipeline. This preserves backward compatibility for downstream projects that installed the controller without the new heuristic.

## Sources

- `agents_manager/SKILL.md` - research-detector definition + tier routing table.
- `agents_manager/research/SKILL.md` - 5 enhanced protocol sections (source-connector, citation discipline, synthesis patterns, AR support, memory reuse).
- `agents_manager/CHANGELOG.md` - release history (no release is cut for this research-mode enhancement; it is a project-internal upgrade, not a controller release).
- `CLAUDE.md` - research-first auto-routing rule.
- `AGENTS.md` - research-first orientation section.
- `README.md` - research-first orientation section.
- Access date for all access dates cited above: 2026-08-13.
