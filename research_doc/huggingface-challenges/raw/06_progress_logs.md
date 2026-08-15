# Progress Logs — T-2026-08-08-001 (concatenated, 4 research angles)

> Archive copy. Source files live in `share/notes/`. Concatenated 2026-08-08 by am-coder for the deliverable archive.

---

## Progress Log — Angle A (Core OSS libraries & Hub engineering)

Source: `share/notes/05_progress_T-2026-08-08-001_angle-A.md`

Angle: transformers/tokenizers/accelerate/peft/diffusers/safetensors/datasets/trl/hf_transfer maintenance + Hub engineering (huggingface_hub, hf_transfer, duf, cache, gated, China) + model/dataset I/O + docs/contribution pain.

- **2026-08-08 — Stage 1 (search start):** 0 sources scanned, 0 problems identified. Reading SKILL/rules/handoff done; beginning parallel websearch batch 1 (8 queries: transformers maintainers, tokenizers 1.0, hf download speed/hf_transfer, China access, bitsandbytes, safetensors/llama.cpp, datasets streaming, optimum/ONNX).
- **2026-08-08 — Stage 2a (partial finds):** batch 1 returned ~30 candidate source URLs. Problems identified so far: ~16 (maintainer churn, tokenizers 1.0 breakage, hub download auth/EE changes, China blockage, bitsandbytes bms status, safetensors adoption gaps, optimum fragmentation, etc.). Dead ends: none major; some vague results (bitsandbytes drama) needing follow-up.
- **2026-08-08 — Stage 2b (follow-up batches):** more targeted searches (duf binary, hf_hub v1.0 breaking, gated repo/tokens, cache v2, datasets streaming memory, docs/good-first-issue, duf/China mirrors, trl stabilize). Problems identified: ~20 candidate problems.
- **2026-08-08 — Stage 2c (final gaps):** batch 3 (accelerate 1.0, pickle RCE advisories, contributors/GFI overload + AI-agent PR flood, Xet upload stalls/Windows 2GB bug). Confirmed 19 problems, no dead ends.
- **2026-08-08 — Stage 3 (drafting):** writing 01_research file: 19 problems selected, structured with sources.
- **2026-08-08 — Stage 3b (polish):** rewrite pass to fix numbering (P-A01..P-A19), fill missing fields (Breadth/Trend/Why/Proposed/Fix difficulty) on all 19 blocks, remove garbled tokens.
- **2026-08-08 — Stage 4 (done):** `share/notes/01_research_T-2026-08-08-001_angle-A-libraries.md` complete: 19 problems, top-5 shortlist, feasibility verdict, recommendations, self-critique, search summary. ~40 sources cited across 20 search queries. Status: DONE.

---

## Progress Log — Angle B (Product surfaces & platform services)

Source: `share/notes/angle_progress_T-2026-08-08-001_angle-B.md`

## 2026-08-08 (start)
- Read SKILL.md, rules.md, handoff. tasks file exists.
- Assignment: Spaces, Gradio, Inference API/Providers, Hub discoverability, Docs/Doc Builder, model submission/mgmt, Datasets, Teams/Enterprise, hub.api code bugs. Target >=15 problems, 2024-2026 evidence.
- Plan: (1) websearch batch on forum/GH/blog/HN/Reddit, (2) GitHub issue searches via MCP, (3) fetch key thread URLs, (4) compile problems, (5) top-5 + self-critique.

## 2026-08-08 (mid)
- Ran 3 websearch batches + 5 GitHub MCP searches (~22 queries). 429s from exa on several queries; retried with rephrased queries.
- Evidence collected per area (see final report for full URL list): Spaces cold boot (~2 min) + quota index; Gradio 5→6 migration breakage (#9463), gradio-client serializing crash (#12844), share-link 72h + frpc blockers; Inference Providers `:cheapest` routing complaints (discuss 171912), rate-limit opacity (155420); parquet streaming hang (arrow#45214), dataset viewer 429 queue, search first 5GB; Hub ModelFilter tag bug (hugface_hub #1668), discoverability complaints; create_repo(exist_ok=True) privacy footgun; slow downloads + Xet stall 99% (xet-core #409); gated approvals days-weeks; doc-builder breaks (#465, transformers #38613, #10900); Teams SSO/SCIM gaps.
- EXTERNAL hardware claim: NOT verifiable in huggingface_hub constants.py/hf_api.py main (dropped from report).

## 2026-08-08 (done)
- Wrote `share/notes/01_research_T-2026-08-08-001_angle-B-products.md`: 19 problem blocks P-B01..P-B19, top-5 shortlist, risks, feasibility verdict, recommendations, self-critique, search summary (~22 queries).
- Status: DONE. NEEDS_USER_INPUT: false.

---

## Progress Log — Angle C (governance, safety, trust, community, docs, licensing)

Source: `share/notes/agent_doc_progress_T-2026-08-08-001_angle-C.md`

**Task:** T-2026-08-08-001 (Phase 1, P1T3)
**Agent:** am-research (angle C)

- **Stage 1 — Setup (2026-08-08):** read research SKILL/rules, handoff, task file; resolved slightly-off dispatch paths; scope locked (model cards/trust, licensing, T&S, C2PA, red teaming, moderation, gated access, contributor experience, bug bounty, provenance).
- **Stage 2 — Search batch 1 (2026-08-08):** card quality, license registry, Trail of Bits audit, CSAM false positives, bug bounty.
- **Stage 3 — Search batch 2 (2026-08-08):** moderation transparency, gated friction, space abuse, triage backlog, uncensored-model policy, C2PA.
- **Stage 4 — Search batch 3 (2026-08-08):** arXiv governance paper, metadata hallucination, FineWeb critique, malicious models, red-teaming, open-source-definition stance.
- **Stage 5 — Search batch 4 (2026-08-08):** docs contributor friction, region blocks, dataset export approval, moderator incidents, stale maintainer repos, security.txt/bounty.
- **Stage 6 — Deep fetches (2026-08-08):** primary sources verified (HF blog, discuss threads, arXiv, GitHub issues) for quotes/dates.
- **Stage 7 — Synthesis (2026-08-08):** wrote 15 problem blocks (P-C001–P-C016; two P-C014 placeholders reclassified into P-C001); 16 in-session web searches (4 batches); top-5 (P-C003, P-C004, P-C001, P-C007, P-C012; runner-up P-C011); 2 verification flags (copyright lawsuit; IBTimes nudify report). Status: DONE.

---

## Progress Log — Angle D (business, competition, strategy, moat)

Source: `share/notes/agent_progress_T-2026-08-08-001_angle-D.md`

## Stage log

- **2026-08-08 (start)** — Read SKILL.md, rules.md, handoff, task file (row P1T4 confirmed). Boundaries: angle D only; no tasks/ edits; no code.
- **2026-08-08 (search batch 1 — funding/valuation/layoffs)** — Series D ($235M, $4.5B, Aug 2023); Observer interview (Jeff Boudier: no ads, no-rush-to-raise, "net profitable or investing by quarter"); TechCrunch (Delangue "LLM bubble"); Sacra + Contrary revenue est.; The Information Feb 2025 layoff (~10 GTM/Expert Support); Revelio headcount shrinking.
- **2026-08-08 (search batch 2 — Nvidia deal, competition, unit economics)** — Declined $500M Nvidia offer at $7B (late 2025); Ollama vs Spaces deployment study; MIT Sloan 80% closed-model spend.
- **2026-08-08 (search batch 3 — ToS/data, DeepSeek, EU)** — HF ToS "may include training-related use" ambiguity, ConductAtlas/AIRIN readings; DeepSeek-R1 10.9M downloads; Storage Regions docs (US default; EU Team+); EU AI Act Art. 53 guide co-authored by HF/Mozilla/LF AI.
- **2026-08-08 (search batch 4 — infra cost, agents, COSS/VC)** — Xet blogs (45PB stored, 2M repos); 1B req/day + 6PB/day CDN + 88-country uploads (rearchitecting blog); pricing pages; Tiny Agents/MCP; CB Insights open-vs-closed funding; ZeroGPU quota docs.
- **2026-08-08 (search batch 5 — support pain, OpenAI marketplace, Stargate, ZeroGPU)** — api-enterprise@ unanswered months; "What happened to HuggingFace?" thread; OpenAI external models via OpenRouter; Azure AI Foundry/Vertex Model Garden listing; gpt-oss launch (4.1M downloads/mo); Stargate/OpenAI burn projections.
- **2026-08-08 (search batch 6 — sanctions, France, state-of-OSS, enterprise)** — export-control ToS clause; French AI narrative (€109B, CIR, Station F, French Tech visa); State of Open Source Spring 2026 (2M models, 13M users, 41% China downloads, top 0.01% = 49.6% downloads, median engagement 6 weeks); RFP.wiki 4.2/5 + SLA gaps.
- **2026-08-08 (write phase)** — `01_research_..._angle-D-business.md` written (18 problems P-D01..P-D18, top-5: P-D03, P-D01, P-D02, P-D10, P-D09). Status DONE.

## Gaps (candidate-facing caveats)

- HF does not publish revenue; all figures third-party estimates — flagged and presented as ranges.
- 45PB stored / 6PB day CDN / 1B req/day figures come from HF architecture blogs (CI-infra-cited), not the task brief.

---
*End of concatenated progress logs.*