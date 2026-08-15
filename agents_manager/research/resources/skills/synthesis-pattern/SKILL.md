---
name: synthesis-pattern
description: Four synthesis patterns for multi-source research: multi-source synthesis, atomic-fact decomposition (FActScore), contradiction detection, outline-first (STORM).
allowed-tools: Read, Write, Edit, grep, glob, webfetch
triggers: synthesize, combine sources, multi-source, fact-check, atomic fact, FActScore, contradiction, outline, STORM, structured synthesis
preamble-tier: 0
version: 0.1.0
---

# synthesis-pattern

## When to use

- The research pulls from more than two sources.
- The output is a synthesis (not a literature dump).
- The user expects claim-level verification, not just summary.
- Contradictions between sources need surfacing.

If the research is a single source or a quick lookup, this skill is overkill. Use the standard template in `agents_manager/research/SKILL.md`.

## How to use

Apply the four patterns below in order:

1. **Outline first.** Build a 5–9-bullet outline before any prose.
2. **Atomic-fact decomposition.** Break compound claims into atomic facts.
3. **Multi-source synthesis.** Cross-reference each claim against multiple sources.
4. **Contradiction detection.** Flag where sources disagree, do not pick.

Reference implementation: `research/cloudflare-agent-internet-2026-08-12/00_MASTER_SYNTHESIS.md:14-37` (claim-by-claim fact-check style, read-only).

## Recipes

### Pattern 1: Outline-first (STORM)

Before writing prose, produce an outline. Each bullet maps to ≥ 1 source.

```markdown
## Outline

- Bullet 1: claim about topic A - [S1][S3]
- Bullet 2: claim about topic B - [S2]
- Bullet 3: claim about topic C - [S1][S4]
```

Then expand each bullet into prose below. The outline stays pinned at the top of the file as the structural backbone.

Reference: STORM (Stanford, 2024) - generate outline, research per outline point, write article.

### Pattern 2: Atomic-fact decomposition (FActScore)

Compound claims hide multiple atomic facts. Decompose each claim before citing.

Example compound claim: "GPT-4 launched in March 2023 and outperformed humans on the bar exam."

Decomposed:

- Atomic 1: GPT-4 launched in March 2023 - [S1]
- Atomic 2: GPT-4 outperformed humans on the bar exam - [S2]
- Atomic 3 (implicit): The bar exam is a standardized test of legal knowledge - [S3]

Each atomic fact gets one citation (or marks itself `[unverified]`). The original compound claim is the prose; the atomic facts are the verification layer.

Reference: FActScore (Min et al., 2023) - atomic fact decomposition for factuality evaluation.

### Pattern 3: Multi-source synthesis

For each claim in the outline, check against ≥ 2 sources. Tag the claim with its source count:

- `[2+ sources]` - claim is robust
- `[single-source, flag]` - claim is supported by exactly one source; flag for follow-up
- `[0 sources, abstained]` - claim is not verifiable; surface in abstention gate

Build a cross-reference table:

```
| Claim | S1 | S2 | S3 | S4 | Confidence |
|-------|----|----|----|----|------------|
| Claim 1 | yes | yes | partial | no | high |
| Claim 2 | yes | no | no | no | low |
```

### Pattern 4: Contradiction detection

When two sources disagree, the synthesis block reads:

> Source A says X ([Sn]). Source B says Y ([Sm]). We report both; the reader decides.

Do NOT:

- Pick one silently.
- Average the two.
- "Balance" without flagging.

Do:

- Name both sources by `[Sn]` in the contradiction block.
- Note the type of each (primary vs secondary).
- Suggest a reconciliation if one is obvious.
- Surface in `## Contradictions and caveats`.

## Citations / sources

- [S1] FActScore - Min et al., 2023 - https://arxiv.org/abs/2305.14251 - access date 2026-08-13
- [S2] STORM - Stanford, 2024 - https://arxiv.org/abs/2402.14207 - access date 2026-08-13
- [S3] Canonical example - research/cloudflare-agent-internet-2026-08-12/00_MASTER_SYNTHESIS.md:14-37 - internal - access date 2026-08-13

## Self-critique

- Outline-first can over-constrain. If a new finding emerges during research that does not fit the outline, revise the outline and note the change.
- Atomic decomposition can explode a simple claim into 10 sub-facts. Stop decomposing when the sub-fact is itself well-known or trivial.
- Multi-source synthesis is only as good as the source diversity. Two sources citing the same primary still count as one source for synthesis purposes.
- Contradiction detection requires the researcher to actually notice the disagreement. Build a habit of asking "what does the other source say?" before locking a claim.
- This skill is discipline, not a library. No code runs. The user (or reviewer) verifies the patterns by reading the output.
