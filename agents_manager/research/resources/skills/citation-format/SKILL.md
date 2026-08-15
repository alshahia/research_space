---
name: citation-format
description: Enforce numbered inline citations [S1]..[Sn] with a reference table at the end of every research output. Includes abstention gate for unverifiable claims.
allowed-tools: Read, Write, Edit, grep, glob, webfetch
triggers: cite, citation, reference, source, where did this come from, mark the source, [S1], reference table, bibliography, attribution
preamble-tier: 0
version: 0.1.0
---

# citation-format

## When to use

- Every research output that has factual claims.
- Whenever you synthesize across multiple sources.
- Whenever you want downstream readers to verify your claims.

This is the discipline layer. It applies to every other research skill.

## How to use

Every factual claim gets a `[Sn]` marker. The marker binds to a row in the reference table at the bottom of the file.

Three rules, no exceptions:

1. **Inline markers only.** `[S1]`, `[S2][S5]` for multi-source support. Never invent numbers out of order.
2. **Bind to the reference table.** Every `[Sn]` used inline must appear in the table. Every row in the table should be cited at least once.
3. **Primary over secondary.** Peer-reviewed papers, official docs, and government data outweigh news articles and blogs. Flag secondary-only claims as `[secondary]` in the table.

## Recipes

### Recipe 1: Academic source

Inline: "Retrieval-augmented generation improves factuality on knowledge-intensive tasks [S1]."

Table row:

```
| [S1] | <title> — <authors> — <journal> — <year> — <url> | academic | <url> | 2026-08-13 |
```

### Recipe 2: Web source

Inline: "NotebookLM was launched in 2023 [S2]."

Table row:

```
| [S2] | NotebookLM product page — Google — 2023 — <url> | web | <url> | 2026-08-13 |
```

### Recipe 3: Mixed (multi-source claim)

Inline: "Transformer attention variants have grown 3x year over year [S3][S4][S5]."

Three table rows (one per source):

```
| [S3] | <title> — <authors> — <venue> | academic | <url> | 2026-08-13 |
| [S4] | <title> — <site> | web | <url> | 2026-08-13 |
| [S5] | <leaderboard-name> | leaderboard | <url> | 2026-08-13 |
```

### The reference table schema

```
| # | Source | Type | URL | Access date |
|---|--------|------|-----|-------------|
| [S1] | <title> — <authors> — <venue> — <year> | academic | <url> | 2026-08-13 |
| [S2] | <title> — <author> — <site> — <date> | web | <url> | 2026-08-13 |
| [S3] | <title> | wiki | <url> | 2026-08-13 |
| [S4] | <leaderboard-name> | leaderboard | <url> | 2026-08-13 |
| [S5] | <product-page> | product-page | <url> | 2026-08-13 |
```

Type values: `academic`, `web`, `wiki`, `official-docs`, `leaderboard`, `product-page`, `blog`, `dataset`.

### Abstention gate

When you cannot verify a claim:

1. Do NOT invent a citation.
2. Write: "Could not verify: <what>" in the relevant section.
3. If the gap matters, surface in `## Self-critique` and flag `NEEDS_USER_INPUT: true`.

Examples of unverifiable:

- A leaderboard number with no accessible URL.
- A product feature behind a paywall that you cannot test.
- A quote attributed to a person without a traceable source.
- A statistic from a date-range you cannot pin down.

### Inline link to specific passages

When citing a long source, link to the relevant passage, not just the URL. Use Jina Reader to generate deep links:

```
https://r.jina.ai/<url>#:~:text=<encoded-quote>
```

Or for arXiv, link to the abstract page with the paper id (stable): `https://arxiv.org/abs/<id>`.

### Contradictions

When sources disagree, do not pick one. Flag in `## Contradictions and caveats`:

```markdown
## Contradictions and caveats

- Source A says X ([S1]). Source B says Y ([S2]). We report both; the reader decides.
- Source A's claim is secondary; Source B is primary. Recommend weighting toward B.
```

## Citations / sources

- [S1] This skill is referenced from `agents_manager/research/SKILL.md` § Citation discipline — internal — access date 2026-08-13
- [S2] Jina Reader deep-link syntax — https://jina.ai/reader/ — access date 2026-08-13

## Self-critique

- The discipline breaks if a researcher cites a source without reading it. Always read before citing.
- "Multiple sources" is not a substitute for "primary sources". Two blog posts citing each other is one source, not two.
- The reference table can drift out of sync with the inline markers. Run `grep -oP '\[S\d+\]' <file> | sort -u` to find all cited markers, then verify each appears in the table.
- Access dates matter. If a page changes, the citation needs to be re-verified. Always stamp 2026-08-13 unless the dispatch specifies otherwise.
- When the claim is "no one knows", the abstention gate is the correct response. Do not pad with speculation.
