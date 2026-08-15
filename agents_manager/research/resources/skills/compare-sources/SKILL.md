---
name: compare-sources
description: Cross-source agreement scoring and comparison tables. Output: claim x source x agreement (yes/partial/no) x confidence. Two-product and multi-option comparison patterns.
allowed-tools: Read, Write, Edit, grep, glob, webfetch
triggers: compare, comparison, A vs B, versus, vs, benchmark, feature matrix, side-by-side, comparison table, agreement scoring
preamble-tier: 0
version: 0.1.0
---

# compare-sources

## When to use

- The research output needs to weigh evidence across multiple sources for the same claim.
- The user asks "what do sources say about X?" and the answer is "it depends".
- The deliverable is a side-by-side comparison of two or more products / methods / approaches.

If the answer is unanimous across sources, this skill is overkill. Just write the claim with `[Sn]` markers.

## How to use

Two patterns:

1. **Source agreement scoring** - for each claim, count how many sources support it.
2. **Comparison matrix** - for product/method A vs B vs C, build a feature table.

Both output markdown tables. Every cell carries a citation.

## Recipes

### Pattern 1: Source agreement scoring

For each claim in the synthesis, score it against the source set:

- `unanimous` - ≥ 75% of sources agree
- `majority` - 50–75% agree
- `contested` - < 50% agree
- `single-source` - only 1 source supports

Output:

```markdown
| Claim | Sources | Agreement | Confidence |
|-------|---------|-----------|------------|
| Claim 1 | [S1][S2][S3][S4] | unanimous (4/4) | high |
| Claim 2 | [S1][S2] | majority (2/4) | medium |
| Claim 3 | [S1] only | single-source | low, flag for follow-up |
| Claim 4 | [S1] vs [S2] | contested | surface in contradictions |
```

### Pattern 2: Two-product comparison

Output a feature-by-feature table. Columns: feature, product A, product B, citations.

```markdown
| Feature | Product A | Product B | Citations |
|---------|-----------|-----------|-----------|
| Launch year | 2023 | 2024 | [S1][S2] |
| Free tier | yes | yes | [S1][S2] |
| API access | no | yes | [S1][S2] |
| Source count | 100M | 50M | [S1][S3] |
```

Rows where products differ are the headline. Rows where they match are context.

### Pattern 3: Multi-option comparison

Same as two-product, but extend to N columns. Use sparingly: beyond 4 columns, the table is hard to read. Consider grouping or splitting into multiple tables.

### Pattern 4: Pricing comparison

Pricing is its own table because the rows are different (per-seat vs per-query vs flat).

```markdown
| Pricing model | Product A | Product B | Product C |
|---------------|-----------|-----------|-----------|
| Free tier | 100 queries/mo | unlimited | 50 queries/mo |
| Pro tier | $20/mo | $30/mo | $50/mo |
| Enterprise | custom | $500/mo | custom |
| Citations | [S1][S2] | [S2][S3] | [S1][S3] |
```

### Pattern 5: Disagreement deep-dive

When two sources disagree on a specific fact, drill in:

```markdown
### Disagreement: "X is the leading Y"

- Source A [S1] claims: <quote>, primary source
- Source B [S2] claims: <quote>, secondary source
- Possible reconciliation: <reasoned guess>
- Recommendation: prefer A; flag in caveats.
```

## Citations / sources

- [S1] This skill pairs with `citation-format` for the reference table - internal - access date 2026-08-13
- [S2] Comparison-table pattern reference: `research_doc/kotobee_publishing/` - internal - access date 2026-08-13

## Self-critique

- Agreement scoring is sensitive to source selection. If you picked 4 sources that all derive from one primary, the "unanimous" is meaningless. Always include at least one source from a different lineage.
- Two-product tables can hide nuance. "Product A is faster" may be true for one benchmark but false for another. Cite the benchmark per row.
- Multi-option tables past 4 columns are unreadable. Group or split.
- Pricing tables go stale fast. Stamp every pricing row with the access date and add a "verify on vendor site" note.
- "Disagreement deep-dive" is the most labor-intensive pattern. Use it only for claims that actually drive the conclusion.
