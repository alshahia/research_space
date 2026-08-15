# 05 — Apply guide (how to use this catalog)

This catalog was built for two consumers: **a candidate preparing** (the
priority) and **HF maintainers**. This file is the playbook.

## Files at a glance

| File | Content |
|------|---------|
| `01-overview.md` | scope, method, dedupe map (72 raw → 66 blocks), score anchors |
| `02-problem-catalog.md` | the 66 blocks, cluster by cluster, with evidence + proposers |
| `03-ranking.md` | the sortable/ranked table (the only file with raw scores) |
| `04-top-picks.md` | the 10 best candidate moves |
| `05-apply-guide.md` | this playbook |

## How the scores work (2 minutes)

Each problem is scored on three factors:

- **Impact (I /40)** = severity (15) + breadth (15) + trend (10). Research
  severity labels are kept verbatim even when the score disagrees — the label
  is the community's taxonomy, the score is ours.
- **Fit (F /40)** = realistic + identifiable + responsible (12+12+16) — how
  far a pure single dev can get.
- **Entry (E /20)** = difficulty (10) + domain expertise (10) — how hard the
  first merge is.
- Composite `C = 0.4·I + 0.4·F + 0.2·E`.

Anchors (locked): M1-08 = 38/40/28 → **C 36.8**; M4-01 = 40/16/12 → **C 24.8**.
Every other row was scored against those two; see `01-overview.md` §3.1.

## The 3-week candidate plan

**Week 1 — pick.** Read `04-top-picks.md`. Pick ONE of rows 1-8 and validate
it on the live Hub (open the issues cited; see severity match). Write a
half-page "why this matters + how I'd fix it" note. This note is your opening
line in the interview.

**Week 2 — build the 80% version.** For the elected block, build the
client-side fix/tool regardless of maintainer merge: it produces a portfolio
artifact, works offline, and shields you from community/legal borders (see
M3-08/M3-14/copyright boundaries).

**Week 3 — senior framing.** Prepare the "what breaks if we don't" story with
real numbers from `02-problem-catalog.md` (e.g., for M2-09: "pyarrow <25 still
hangs; the upstream fix ships in 0.8 (datasets#8188) but versions float — the
Hub's most-downloaded path is the one that hangs"). Rehearse the follow-up:
"What else in this catalog did you rank most highly?" ready with the top-5.

## Shortcuts per cluster

| Cluster | One-liner for the interview |
|---------|-----------------------------|
| **M1 libraries** | "The team that builds the developer experience is itself the bottleneck: transformers' fast path is optional, datasets leaks, downloads stall." |
| **M2 platform** | "The product hood keeps the cheap guarantees invisible: cold starts, 429s, no quota, share links dying." |
| **M3 governance** | "The trust surface is where the platform will be won or lost: pickle, license drift, agent-PR floods." |
| **M4 business** | "The bigger the ecosystem, the harder the capture — the whole existence thesis is a bet." |

## Where to be careful

- **M3-08 (CSAM)** and **M3-09 (copyright)**: policy requires extreme care;
  this catalog only proposes *detection tooling without enforcement*.
- **Security blocks**: never claim "I fixed HF" — claim "I shipped a
  client-side scanner that flags the class".
- Numbers are directional (private company) — always hedge the M4 revenue
  lines with "estimates".

## The two anchors in one sentence each

- **M1-08** (C 36.8) — streaming is recommended and leaks: memory-profiling
  fix in `datasets` + a bench = canonical win.
- **M4-01** (C 24.8) — the perfect "why do you want to work here?" answer:
  "because they've built the moat but not the castle".

---

Reuse: extract any block's `Evidence` URLs to start your own thread. Every
row in `02-problem-catalog.md` carries proposers or the
"no named proposer found in research" sentinel — where the sentinel appears you
can claim the proposal.

## The 5-step pipeline (before any submission)

1. **Re-verify freshness** — re-open the issue/thread cited in the block;
   confirm today the problem is still open/unfixed (date-stamp it).
2. **Mini-spike ≤ 1 hour** — build the smallest repro/demo first; a
   block that doesn't repro in 1h gets re-picked.
3. **Smallest viable merge/PR** — one focused fix or PR, never a refactor;
   name the maintainer-visible acceptance check.
4. **Story template (5 sections)** — (1) Problem + evidence (numbers from
   the block), (2) Why it matters to HF/community, (3) The fix/proposal
   you made, (4) Measured result (bench/repro), (5) What's next if hired.
5. **Security disclosure etiquette** — for any security-adjacent block
   (M3-03, M3-08, M3-05): file a private disclosure (HF security contact /
   reserved CVE) before any public PR; never share exploit payloads
   publicly; reference the report number in the PR description.

## Three solution-form variants

1. **Public PR** — the default for clusters 1–2 and most M3 blocks along
   with the strongest recognizability. Use it when the block sits in a
   public repo with an open issue and a merge lane; it proves a signed,
   measurable contribution in the actual project the interviewer can see.
2. **Case study / white paper** — for topics where a merge is unlikely
   (M4 strategy, policy niches like M3-01/M3-12). Use it when the
   deliverable is analysis, not patch; a public, dated write-up with the
   block's numbers proves the thinking it says it delivers.
3. **Internal tool / demo** — build a private CLI/scanner/dashboard you
   can demo in the interview. Use it when repos are gated, the fix needs
   an HF server-side change, or the topic is sensitive (M3-08, M3-05),
   and it proves what a merge can't: a working artifact.