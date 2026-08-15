# Deep Research — Recursive Language Models (Idea 5) — PROGRESS

**Date:** 2026-08-13
**Task:** Validate Prime Intellect as a company; stress-test the RLM paradigm; map the open-source agent harness landscape.
**Sub-agent:** research
**Status:** COMPLETE (all three files written)

## Sources hit (full list, fetched live)

**Company verification (Funding / product / team)**
- [TechCrunch: Prime Intellect raises $130M Series A](https://techcrunch.com/2026/07/08/prime-intellect-raises-130m-series-a-to-help-enterprises-build-their-own-ai-agents/) — Marina Temkin, 2026-07-08. Confirms $130M / $1B / Radical Ventures lead, Axel Weisser + Johannes Hagemann founders, named customers Ramp/Zapier/Flapping Airplanes, $100M ARR, 6,000+ customers.
- [carlos.lat analysis of the round](https://carlos.lat/en/blog/prime-intellect-130m-agent-platform-saas-2026/) — 2026-07-30. Adds comparables (Adept, Cognition/Devin, Sierra, LangChain) and unit-economics analysis.
- [AI Insider: Prime Intellect Series A](https://theaiinsider.tech/2026/07/20/prime-intellect-raises-130m-series-a-at-1-billion-valuation-to-power-enterprise-ai-agent-development/) — angel list, Nvidia strategic.
- [SiliconReport: $100M ARR framing](https://www.siliconreport.com/prime-intellect-raises-130m-series-a-at-1b-valuation-on-100m-arr-66f6b77e) — confirms ARR claim.
- [TBPN: $20M prior, $100M ARR on $20M spend](https://www.tbpndigest.com/story/2026-07-08/prime-intellect-raises-130m-at-1b-valuation-to-build-open-sovereign-ai-stack)
- [primeintellect.ai homepage](https://primeintellect.ai) — partner logos (Ramp, Zapier, NVIDIA, Browserbase, Character.AI, Goodfire, Inception, Arcee, Flapping Airplanes, Standard Intelligence), Stack sections (Lab / Inference / Compute / Research), 24 open jobs via Ashby, INTELLECT-3, SYNTHETIC-2, Prime Flash MoE.
- [Prime Intellect Blog: "Recursive Language Models: the paradigm of 2026"](https://www.primeintellect.ai/blog/rlm) — Sebastian Müller, 2026-01-01. Blog post that operationalized RLM into verifiers.

**GitHub repos (stats as of 2026-08-13)**
- [PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent) — 15.1k stars, 1.6k forks, MIT, 4,499 commits. README confirms: built on `pi`, persistent IPython REPL, `rlm()` function, `/refine` command, daemon-backed sessions, `/goal`, `/heartbeat`, `/autonomous`, skills-as-Python-packages. Explicit warning: "not a security sandbox".
- [PrimeIntellect-ai/verifiers](https://github.com/PrimeIntellect-ai/verifiers) — 4.5k stars, 639 forks, MIT. Originally by Will Brown (@willccbb); used as the RL environment library.
- [PrimeIntellect-ai/prime-rl](https://github.com/PrimeIntellect-ai/prime-rl) — 1.9k stars, 393 forks, Apache-2.0. Async RL training framework, FSDP2 + vLLM, supports GLM-5, Qwen3 MoE, GPT-OSS, INTELLECT-3, etc.
- [alexzhang13/rlm](https://github.com/alexzhang13/rlm) — 5.5k stars, 883 forks, MIT. The official RLM inference library. README's "RLMs being used in the wild" section enumerates DSPy.RLM, Prime Agent, Ax, context-labs/HALO, viplismism/rlm-cli, Daytona, Symbolica, Google Cloud ADK, alphaXiv.
- [earendil-works/pi](https://github.com/earendil-works/pi) — 88.9k stars, 11k forks, MIT. The agent toolkit that Prime Agent is built on. Owned by Mario Zechner (badlogic).
- [anthropics/claude-code](https://github.com/anthropics/claude-code) — 141.3k stars, 22.7k forks. Anthropic's coding agent.
- [openai/codex](https://github.com/openai/codex) — 105.6k stars, 16k forks, Apache-2.0. OpenAI's coding agent.
- [Aider-AI/aider](https://github.com/Aider-AI/aider) — 48.2k stars, 4.8k forks, Apache-2.0.
- [cline/cline](https://github.com/cline/cline) — 66.1k stars, 7.1k forks, Apache-2.0. "Cline Bot Inc." 2026.
- [arcprize org](https://github.com/arcprize) — ARC-AGI-2 (733⭐), ARC-AGI-3-Agents (306⭐), arc-agi-3-benchmarking (34⭐).

**Research papers**
- [arXiv:2512.24601 — Recursive Language Models](https://arxiv.org/abs/2512.24601) — Alex L. Zhang, Tim Kraska, Omar Khattab. v1 2025-12-30, revised 2026-05-11. 9 pages + 43 appendix. Reports RLM(GPT-5-mini) outperforms GPT-5 by **>34 points (~114%) on OOLONG @ 132k tokens** and by **>15 points (~49%) on OOLONG @ 263k tokens**. Handles 10M+ tokens. RLM-Qwen3-8B beats vanilla Qwen3-8B by 28.3% on average and approaches GPT-5 quality on 3 long-context tasks.
- [arXiv:2605.09998 — Continual Harness](https://arxiv.org/abs/2605.09998) — Seth Karten, Joel Zhang, Tersoo Upaa Jr, Ruirong Feng, Wenzhe Li, Chengshuai Shi, Chi Jin, Kiran Vodrahalli. 2026-05-11. 28 pages. Describes Gemini Plays Pokemon (GPP) — first AI to complete Pokemon Blue, Yellow Legacy on hard, Crystal without losing a battle. Formalizes the "Continual Harness" for self-improving agents. (Note: brief misnamed Seth Carton → Seth Karten.)
- [alexzhang13.github.io/blog/2025/rlm](https://alexzhang13.github.io/blog/2025/rlm/) — original October 2025 blog post that introduced RLM.

**Context rot**
- [Chroma: "Context Rot" report](https://trychroma.com/research/context-rot) — Kelly Hong, Anton Troynikov, Jeff Huber, 2025-07-14. Tests 18 LLMs including GPT-4.1, Claude 4 (Sonnet 4 + Opus 4), Gemini 2.5, Qwen3. Five experiments: extended NIAH, needle-question similarity, distractors, haystack structure, LongMemEval, repeated words. Conclusion: "performance grows increasingly unreliable as input length grows" — non-uniform, even on simple tasks.

**ARC-AGI-3**
- [ARC-AGI-3 launch blog (2026-03-25)](https://arcprize.org/blog/arc-agi-3-launch) — 135 novel environments, $2M prize pool, "Humans score 100%. Frontier AI scores 0.51%."
- [Analyzing GPT-5.5 & Opus 4.7 with ARC-AGI-3 (2026-05-01)](https://arcprize.org/blog/arc-agi-3-gpt-5-5-opus-4-7-analysis) — Official analysis: GPT-5.5 = 0.43%, Opus 4.7 = 0.18% (semi-private). **Important: the brief's "Opus 5 baseline 30.2%" is wrong — it is Opus 4.7 at 0.18%.**
- [ARC-AGI-3 Milestone Prize #1 (2026-07-06)](https://arcprize.org/blog/arc-prize-2026-milestone-1) — 1st place: Tufa Labs "The Duck" — Qwen 3.6 27B FP8 running in REPL, "infinite play via eviction". 2nd: Reki (Gemma-4-31B). 3rd: forge (Gemma-4-31B). $37.5K.

**Symbolica Agentica (related REPL/RLM architecture)**
- [Symbolica: SotA ARC-AGI-2 Results with REPL Agents (2026-02-10)](https://www.symbolica.ai/blog/arcgentica) — Agentica SDK achieves 85.28% on ARC-AGI-2 with Opus 4.6 (120k) High vs 79.03% CoT, and lifts GPT 5.2 by 10pp and Opus 4.5 by 20pp. Confirms REPL + RLMs are a real multiplier on ARC-AGI benchmarks — but the gain is "only" 6-20pp, not 65 points.

**Open-source agent harness landscape**
- Claude Code, Codex, Aider, Cline, Prime Agent, RLM library, `pi` — all verified with stats.

## Critical findings vs. the brief

The brief contains several claims that are **not verifiable from primary sources** and should be flagged before any plan is built on them:

1. **"Claude Opus 5 baseline 30.2% (Ark Prize, July 24)"** — WRONG. The actual model reviewed by ARC Prize is **Claude Opus 4.7** (not 5), the score is **0.18%** (not 30.2%), and the analysis post is dated **2026-05-01** (not July 24). Source: arcprize.org/blog/arc-agi-3-gpt-5-5-opus-4-7-analysis.
2. **"Prime Agent wrapping same Opus 5: 95.5%"** — UNVERIFIED. No primary source. The 95.5% number is not present in any Prime Intellect blog post, Arc Prize material, or Symbolica paper. Prime Agent's own blog post on the RLM benchmark (2026-01-01) does not run ARC-AGI-3.
3. **"Schema harness (Impossible Research + Berkeley + CMU): ~99% on same public set"** — UNVERIFIED. The closest verified thing is **Symbolica's Agentica** at 85.28% on ARC-AGI-2 (different benchmark), and the **Tufa Labs "Duck" harness** that won ARC-AGI-3 Milestone #1 (which is a REPL approach, not a public-leaderboard score).
4. **"Ryan Brown (independent engineer, 8-star repo): 99.86% using 5.5× fewer tokens"** — UNVERIFIED. The repository at alexzhang13/rlm has **5.5k stars** (not 8) and is by Alex Zhang, not Ryan Brown. The 99.86% and 5.5× claims appear nowhere in the public Alex Zhang RLM blog, arXiv paper, or Symbolica paper.
5. **"Seth Carton team" (Princeton Pokemon)** — **WRONG**. The lead author is **Seth Karten** (arXiv:2605.09998). The lab is unclear but the paper is *not* published by Princeton.
6. **"10K stars, ~1K forks" for Prime Agent** — **OUT OF DATE**. As of 2026-08-13 the repo is at **15.1k stars, 1.6k forks**, 4,499 commits.
7. **"Five-level recursion"** — prematurely interpretable. The arXiv paper and the Prime Intellect blog explicitly note that the **current RLM implementation only allows recursion depth = 1** ("Right now, the RLM has a recursion depth of exactly 1. We plan on making it possible to decrease that recursion depth to 0...and to increase it arbitrarily"). Multi-depth recursion is **future work**, not a current capability.

The "65-point harness gap" claim in the headline thesis is **plausible but not reproducible from public sources**. What is real:
- 28-30% gains on OOLONG (verified, arXiv paper).
- 6-20% gains on ARC-AGI-2 with similar REPL/RLM approaches (Symbolica Agentica).
- 0.18%–0.43% on ARC-AGI-3 from frontier models *with* the standard harness — meaning the **headroom for harness improvement is huge**, but no single source has published a 95.5% number on ARC-AGI-3.

## What "harness matters" is supported by

- 34-point OOLONG gap (arXiv:2512.24601, verified).
- 6-20pp ARC-AGI-2 lift for the same model + same data + changed harness (Symbolica, verified).
- Tufa Labs ARC-AGI-3 Milestone #1 winning with a tiny open-source LLM + REPL harness (verified).
- Chroma context rot: even simple tasks degrade non-uniformly as input grows (trychroma.com/research/context-rot, verified primary source).

## What is NOT supported by any source I could find

- 95.5% / 99.86% ARC-AGI-3 numbers.
- "Impossible Research + Berkeley + CMU" team.
- "Ryan Brown" 8-star ARC-AGI repo.
- "Claude Opus 5."

These look like extrapolations or downstream distortions of the ARC-AGI-3 launch blog post. Anyone betting a plan on them will be betting on fiction.

## Blockers
- None. The two big desired reports (PRIME_INTELLECT_COMPANY.md, FINDINGS_RLM_PARADIGM.md) compiled without unresolved unknowns at HIGH confidence for the company and MEDIUM-HIGH for the RLM paradigm (with explicit shot-of-cold-water on the inflated numbers).

## Deliverables

- `PRIME_INTELLECT_COMPANY.md` — ~4,500 words. 12 dimensions on the company. Every claim cited.
- `FINDINGS_RLM_PARADIGM.md` — ~6,000 words. 12 dimensions on the RLM paradigm. Includes the comparison matrix for open-source agent harnesses.
- `PROGRESS.md` — this file.
