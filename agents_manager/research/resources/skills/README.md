---
name: skills
description: Index of 7 research skills shipped under agents_manager/research/resources/skills/. One-line description and USE THIS WHEN trigger per skill.
allowed-tools: Read, grep, glob
triggers: skill index, which skill, find a skill, list skills, skills readme
preamble-tier: 0
version: 0.1.0
---

# Research Skills Index

## Purpose

Seven markdown skill files that activate the enhanced research flow when the master routes a task to `am-research` and the research-detector scores intent + evidence ≥ 1.5. Each skill is prompt discipline + a documented webfetch recipe. No code, no dependencies.

## When to load

Load this README when:

- You are unsure which skill to pick.
- You want the full list of triggers across skills.
- You need to verify the skill set covers a research need before defaulting to ad-hoc webfetch.

Pick a specific skill by reading its `## When to use` section.

## Skill index

| Skill | USE THIS WHEN | Effort | API / Source |
|-------|---------------|--------|--------------|
| `arxiv-search` | Academic, CS, physics, math, preprint topics | XS | `http://export.arxiv.org/api/query` (XML) |
| `pubmed-search` | Biomedical, clinical, pharmaceutical, life-sciences topics | XS | `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/` (JSON + XML) |
| `pdf-fetch` | Need full text beyond abstract, PDF or JS-heavy source | S | `https://r.jina.ai/<url>` + Playwright + `pdftotext` |
| `citation-format` | Every multi-source research output that has factual claims | S | discipline layer (no API) |
| `synthesis-pattern` | Multi-source synthesis with atomic fact-check, contradiction handling | S | discipline layer (no API) |
| `compare-sources` | Source agreement scoring or A vs B comparison table | S | discipline layer (no API) |
| `research-ar` | Arabic content, bilingual EN/AR output, RTL, Gulf/MENA topics | S | Shamela / Noon / Hindawi / Kitab / Yasoob |

## Discipline layers

`citation-format`, `synthesis-pattern`, and `compare-sources` are discipline, not data sources. They apply on top of any data source. Always pair them with `arxiv-search`, `pubmed-search`, `pdf-fetch`, or general webfetch.

## Hard rules

- Default tools only. No Tavily / Exa / Brave / Perplexity Sonar API keys.
- Every API endpoint is cited with access date 2026-08-13.
- Skills are markdown only. No executable code.
- Each skill ≤ 200 lines.
- The skills do not modify `research/` or `research_doc/`. Read-only historical artifacts.

## How to extend

When a new research pattern emerges:

1. Add a new skill file under this folder in its own subdirectory matching the name.
2. Update this README's skill index table.
3. Run `python3 scripts/validate-frontmatter.py` to verify frontmatter.
4. Cite the source-connector table in `agents_manager/research/SKILL.md` for any new external API.

## Citations / sources

- [S1] Source-connector protocol - `agents_manager/research/SKILL.md` § Source-connector protocol - internal - access date 2026-08-13
- [S2] Research-detector heuristic - `agents_manager/research/SKILL.md` § Research-detector - internal - access date 2026-08-13

## Self-critique

- The skill set covers 2026 needs. If a new connector type emerges (example: Reddit, X/Twitter, patents), add a new skill rather than retrofitting an existing one.
- Effort column is a rough guide. XS = 1 file, S = 1-2 files, M = 2-5 files.
- Skills are not versioned independently of the controller. Bump the controller version when a skill changes its API contract.
