# Agent Benchmarks Matrix — August 2026

> Compiled 2026-08-13. Scope: every benchmark relevant to the "agent benchmark wars" narrative — code agents, tool use, web/computer use, reasoning, long-context, math, and the ARC-AGI series that anchors this dossier.
>
> **Reading notes.**
> - "SOTA" = top published score for that benchmark as of August 2026. Where the headline number is a vendor self-report on a non-public split, it is flagged `⚠ self-reported`.
> - "Harness" = the wrapper that turns a model into an agent (tool loop, memory, retry). It is included on every row because it is now a first-class variable — see [FINDINGS_BENCHMARKS.md](FINDINGS_BENCHMARKS.md).
> - "Squaring" / "RHAE" terms are explained in §1 of the findings file.
> - URLs are cited in `[label](url)` form. Some leaderboards are gated by JavaScript and were captured via Playwright snapshots on 2026-08-13.

---

## 0. Cross-benchmark summary table

The benchmarks that *matter for the "harness > model" thesis* are flagged `★`. The ones that *matter for the ARC-AGI 3 controversy* are flagged `◆`.

| Benchmark | Domain | Maintainer | Top model/harness (Aug 2026) | Score | Source | Harness |
|---|---|---|---|---|---|---|
| ★◆ **ARC-AGI 3** | Interactive games | ARC Prize / Chollet | **Prime Agent (Opus 5)** ⚠ self-reported | **95.5% RHAE Best@1** (human exp. 95.4%) | [Prime Intellect blog](https://www.primeintellect.ai/blog/prime-agent) | RLM + Continual Harness |
| ★◆ ARC-AGI 3 (private split) | Interactive games | ARC Prize | Frontier LLMs w/ native harness | **0.18–0.43%** (Opus 4.7 → GPT-5.5 high) | [Ark Prize blog](https://arcprize.org/blog/arc-agi-3-gpt-5-5-opus-4-7-analysis) | Native (Claude Code / Codex) |
| ★◆ ARC-AGI 3 (Kaggle) | $50-budget agent comp. | Kaggle / ARC Prize | **cstl team** (gold) | **2.70** (≈ score units; see §1) | [Kaggle LB](https://www.kaggle.com/competitions/arc-prize-2026-arc-agi-3/leaderboard) | Mixed |
| ★◆ PRO-LONG on ARC-AGI 3 | Same, programmatic log | Fox et al., arXiv 2607.20064 | **PRO-LONG + Fable 5** ⚠ self-reported | **97.4% Best@2 / $1,750 total** | [PRO-LONG repo](https://github.com/alexisfox7/PRO-LONG) | Read-Grep-Bash |
| ◆ **Schema traces (ARC-AGI 3)** | Same, trace dataset | schema-harness (Li & Zeng) | **claude-opus-4-8 / claude-fable-5** ⚠ self-reported | **100 RHAE** on 18/25 public games | [HuggingFace dataset](https://huggingface.co/datasets/schema-harness/arc-agi-3-schema-traces) | "Schema" (closed) |
| **ARC-AGI 2** | Static grids | ARC Prize | Open-source + reasoning | ~85% (est. from 2025 results) | [ARC Prize 2025](https://arcprize.org/blog/arc-prize-2025-results-analysis) | Various |
| **ARC-AGI 1** | Static grids | François Chollet | Various Kaggle submissions | ~44% (top Kaggle) | [2024 results](https://arcprize.org/blog/arc-prize-2024-winners-technical-report) | Various |
| ★ **SWE-bench Verified** | Real GitHub issues | OpenAI / Princeton | Anthropic Claude + harness | ~80–82% (mid-2026 est., varies by harness) | [SWE-bench site](https://www.swebench.com/) | Various |
| **SWE-bench Multilingual** | 9 languages | Same | n/a (newer) | ~70% est. | same | Various |
| **SWE-bench Lite** | 300-instance subset | Same | n/a | ~85% | same | Various |
| ★ **SWE-Bench Pro** | Harder subset, no contamination | Same + Scale AI | Various | ~40–55% | [Scale announcement](https://scale.com/research/swe-bench-pro) | Various |
| ★ **Multi-SWE-Bench** | Multi-repo issues | Alibaba | Various | ~40% est. | [Multi-SWE-Bench](https://github.com/alibaba/multi-swe-bench) | Various |
| ★ **TerminalBench (Tbench)** | Terminal tasks | Tbench team | Various | 60–75% est. | [Tbench repo](https://github.com/TerminalBench/terminal-bench) | Various |
| **GAIA** | Multi-modal agent | Meta / Hugging Face | Various | ~70% (mid-2026) | [GAIA HF](https://huggingface.co/spaces/gaia-benchmark/leaderboard) | Various |
| **AgentBench** | Multi-domain agent | THUDM | Various | n/a | [AgentBench](https://github.com/THUDM/AgentBench) | Various |
| **MultiPL-E** | Multi-lang code | Google | Various | n/a | [MultiPL-E](https://github.com/nuprl/MultiPL-E) | n/a |
| **APPS** | Programming | UCB | n/a | saturated | [APPS](https://github.com/hendrycks/apps) | n/a |
| **HumanEval / MBPP** | Basic code | OpenAI / Google | saturated (~99%) | saturated | [HumanEval](https://github.com/openai/human-eval) | n/a |
| ★ **LiveCodeBench** | Live contest problems | Various | Various | ~80–85% est. | [LCB](https://livecodebench.com/) | Various |
| **FrontierMath** | Hard math | Epoch AI | Various | ~30% est. | [Epoch AI](https://epochai.org/data/frontiermath) | Various |
| **GPQA Diamond** | PhD-level science | Google DeepMind | Various | ~70–78% est. | [GPQA](https://github.com/idavidrein/gpqa) | Various |
| **MMLU-Pro** | Multitask | Various | Various | ~85–90% est. | [MMLU-Pro](https://github.com/TIGER-Lab/MMLU-Pro) | n/a |
| **AIME 2025/2026** | Math contest | MAA | Various | ~90%+ | [AIME](https://artofproblemsolving.com/wiki/index.php/AIME_Problems_and_Solutions) | n/a |
| **Putnam** | Math contest | n/a | n/a | n/a | n/a | n/a |
| **HLE (Humanity's Last Exam)** | Multitask hardest | CAIS + Scale | Various | ~20–30% est. | [HLE](https://humanitys-last-exam.ai/) | Various |
| ★ **LMArena / Chatbot Arena** | Human-pref ELO | UC Berkeley | Various | dynamic | [LMArena](https://lmarena.ai/) | Chat interfaces |
| **ToolBench** | Tool use | OpenAI | Various | saturated | [ToolBench](https://github.com/salesforce/BOLAA/tree/main/toolbench) | Tool-calling |
| **ML-Bench** | ML engineering | Various | Various | n/a | [ML-Bench](https://github.com/MLSysOps/MLAgentBench) | Various |
| **DevBench** | Dev tasks | Various | Various | n/a | [DevBench](https://github.com/open-compass/DevBench) | Various |
| ★ **OSWorld** | Computer use | Various | Various | ~38–55% est. | [OSWorld](https://github.com/xlang-ai/OSWorld) | GUI agents |
| ★ **WebArena** | Web browser agent | CMU | Various | ~60% est. | [WebArena](https://github.com/web-arena-x/webarena) | Browser harness |
| **Mind2Web** | Web tasks | Various | Various | n/a | [Mind2Web](https://github.com/OSU-NLP/Mind2Web) | Web harness |

---

## 1. ★◆ ARC-AGI 3 — the contested benchmark

- **Maintainer.** ARC Prize Foundation / François Chollet. Launched [March 25, 2026](https://arcprize.org/blog/arc-agi-3-launch). Public Demo set = 25 of 135 total environments (the rest are hidden + Kaggle holdout).
- **What it measures.** Per-level action efficiency of an agent on novel, no-instructions interactive games (think Sokoban/Frogger hybrids, no training-data priors). 100% human-solvable. Score is normalized against the **median human per-level action count**, capped at 115% per level, then averaged across games. The headline metric is called **RHAE** (Relative Human Action Efficiency), as used in Prime Intellect's launch post.
- **Current SOTA (Aug 2026).** Four competing claims — none fully verifiable against a single official leaderboard row because the ARC Prize Verified leaderboard does not currently list all harness-only entrants:
  1. **Prime Agent + Opus 5 → 95.5% RHAE Best@1** (and 99.97% Best@3, 183/183 levels complete). ⚠ Self-reported by Prime Intellect on Aug 5, 2026. ([source](https://www.primeintellect.ai/blog/prime-agent))
  2. **Schema harness + claude-opus-4-8 → 100 RHAE on 18/25 public games** (one game at 89.87). ⚠ Self-reported trace dataset by `schema-harness` (Xiuyu Li, Guanning Zeng). ([source](https://huggingface.co/datasets/schema-harness/arc-agi-3-schema-traces))
  3. **PRO-LONG + Fable 5 → 97.4% Best@2 / $1,750 total** on the full 25-game public set. ⚠ Self-reported by Fox, Wang, Rosu & Dhingra, [arXiv:2607.20064](https://arxiv.org/abs/2607.20064). ([repo](https://github.com/alexisfox7/PRO-LONG))
  4. **Kaggle Milestone-1 winners (Tufa Labs "Duck") → leaderboard score 1.62–2.70** under a $50 budget on the hidden 120-task split. ([source](https://www.kaggle.com/competitions/arc-prize-2026-arc-agi-3/leaderboard))
- **Frontier-model-without-specialized-harness SOTA.** GPT-5.5: 0.43%; Opus 4.7: 0.18% on the semi-private set per Ark Prize's own audit ([source](https://arcprize.org/blog/arc-agi-3-gpt-5-5-opus-4-7-analysis)). This is what is normally published on the [ARC Prize Verified leaderboard](https://arcprize.org/leaderboard).
- **Why it is the central benchmark.** ARC-AGI 3 is the first frontier benchmark designed so that **brute-force search scores near zero** (because action count is squared into efficiency). It is also the first ARC-AGI with **replayable runs** and a public analysis tooling chain, which is what enables harness-vs-model A/B comparisons.
- **Controversies.**
  - **Few-shot rule ambiguity.** The benchmark is described as "few-shot" but no agent (including Prime Agent's `/refine`) explicitly resets between attempts. A self-refining harness is doing in-session learning — see findings §1.4 for the steelman.
  - **Harness vs model confusion.** Same weights (Opus 5) score 0.18% in Claude Code vs 95.5% in Prime Agent. Whether this means "Opus 5 is smarter than we thought" or "the harness is cheating" is the live debate.
  - **Reproducibility.** Schema harness is a closed dataset, not a public repo; Prime Agent's median scorecard is published but no third party has independently reproduced 95.5% (per video claim). The Prime Intellect post explicitly notes "self-scored."
  - **Scoring rule change mid-stream.** The April 14, 2026 update ([source](https://arcprize.org/blog/arc-agi-3-human-dataset)) moved the per-level human baseline from "2nd best human" to "median human" and raised the per-level cap from 100% to 115%. The change increased everyone's score ~0.5pp and was specifically a reaction to outlier-run noise — it benefits high-end harness entries disproportionately.

---

## 2. ★◆ ARC-AGI 2

- **Maintainer.** ARC Prize / Chollet. Launched March 24, 2025 ([source](https://arcprize.org/blog/announcing-arc-agi-2-and-arc-prize-2025)).
- **What it measures.** Static grid puzzles (no agent loop) — successor to ARC-AGI 1, harder.
- **Current SOTA.** ~85% est. on the public test set; OpenAI o3 high-compute reportedly crossed ~85% with massive compute budget; open-source Grok-4 + program-synthesis hybrids in low 70s. ([source](https://arcprize.org/blog/which-ai-reasoning-model-is-best))
- **Harness.** Static prompts; not an agent benchmark. Some "harness wins" exist via search-augmented programs.

---

## 3. ARC-AGI 1

- **Maintainer.** François Chollet, 2019 (Kaggle 2020).
- **What it measures.** Static grid transformations; tests few-shot pattern induction.
- **Current SOTA.** ~44% (saturating since 2024). Top systems use program synthesis + neural guidance ([2024 winners](https://arcprize.org/blog/arc-prize-2024-winners-technical-report)).
- **Harness.** Static. Not relevant to the harness thesis.

---

## 4. ★ SWE-bench Verified

- **Maintainer.** OpenAI + Princeton (Carlos et al., 2024).
- **What it measures.** Whether an agent can resolve a real GitHub issue from a real OSS repo, given a unit-test verifier. ~500 instances human-validated from SWE-bench.
- **Current SOTA (Aug 2026).** ~80–82% on the leaderboard, held by Claude + Anthropic's harness variants. Reported numbers vary 70–82% by harness (Claude Code vs Aider vs Cline vs Roo Code vs Continue). ([SWE-bench leaderboard](https://www.swebench.com/))
- **Harness sensitivity.** The single biggest known spread among agents on a public benchmark — see [findings §6](FINDINGS_BENCHMARKS.md#6-other-benchmarks-that-show-30-point-harness-gaps). The same Claude model can vary ~10pp depending on whether you give it `git apply` or `edit_file`, and whether retries are bounded.

---

## 5. SWE-bench Multilingual / Lite / Pro / Multi-SWE-Bench

- **Multilingual.** 9-language extension (Python/JS/Go/Java/Rust/PHP/C#/Ruby/C++). Held by Anthropic + harness variants, ~70% est. ([source](https://www.swebench.com/)).
- **Lite.** 300-instance curated subset, ~85% SOTA. ([source](https://www.swebench.com/))
- **Pro.** Newer, anti-contamination subset curated by Scale AI; ~40–55% on top. ([source](https://scale.com/research/swe-bench-pro))
- **Multi-SWE-Bench.** Multi-repo issues, ~40% est. ([source](https://github.com/alibaba/multi-swe-bench))

---

## 6. ★ TerminalBench (Tbench)

- **Maintainer.** Tbench open-source team; ~1000 tasks spanning terminal use, scripting, system admin.
- **What it measures.** Real shell commands on real Linux environments.
- **Current SOTA.** 60–75% est., leader is typically Claude + Codex-style harness. ([source](https://github.com/TerminalBench/terminal-bench))
- **Harness sensitivity.** Like SWE-bench, large variance from harness choice. The Prime Intellect post reports `0.940` for Opus 5 + Prime-Agent on OOLONG 128k but only `0.500` for Opus 5 + Codex on the same task — a 44-point harness gap on a single benchmark. ([source](https://www.primeintellect.ai/blog/prime-agent))

---

## 7. GAIA

- **Maintainer.** Meta + Hugging Face (2023).
- **What it measures.** Multi-modal agentic tasks requiring tool use, web browsing, reasoning. ~466 instances.
- **Current SOTA.** ~70%, held by closed models with strong tool harnesses. ([source](https://huggingface.co/spaces/gaia-benchmark/leaderboard))
- **Harness.** HuggingFace `smolagents` and similar wrappers top the leaderboard.

---

## 8. AgentBench

- **Maintainer.** THUDM (Tsinghua).
- **What it measures.** 8 domains: OS, DB, knowledge graph, web shopping, web browsing, lateral thinking, ALFWorld, Mind2Web.
- **Current SOTA.** Varied by domain; aggregate GPT-4-class around 60%.
- **Controversies.** Some sub-domains are saturated, others stale.

---

## 9. MultiPL-E / APPS / HumanEval / MBPP

- **MultiPL-E.** Multi-language code completion (18 languages). Largely saturated at 80%+ on Python; non-Python lags.
- **APPS.** 10,000 competitive-programming problems, 1–2 sentence prompts, no agent loop. Saturated for top competitors.
- **HumanEval.** 164 problems, **saturated** at ~99% for top models. Mostly used as a "is the model alive?" sanity check.
- **MBPP.** 974 basic Python problems. Saturated.

These benchmarks are **not** in the harness-war story because they don't have a real agent loop. They are listed for completeness.

---

## 10. ★ LiveCodeBench

- **Maintainer.** LiveCodeBench consortium (Naman Jain et al., 2024).
- **What it measures.** Continuously updated contest problems from LeetCode/AtCoder/Codeforces, with strict decontamination.
- **Current SOTA.** ~80–85% est. on the leaderboard; top models with reasoning modes.
- **Controversy.** The leaderboard is one of the few with **rolling decontamination**, so vendors have less opportunity to game.

---

## 11. FrontierMath / GPQA / MMLU-Pro / AIME / Putnam / HLE

- **FrontierMath** (Epoch AI). Hard research-level math. ~30% est. SOTA. Top closed models with deep reasoning. ([source](https://epochai.org/data/frontiermath))
- **GPQA Diamond** (Google DeepMind). PhD-level science (physics/chem/bio). 198 instances. ~70–78% est. SOTA. ([source](https://github.com/idavidrein/gpqa))
- **MMLU-Pro** (TIGER-Lab). 12K hard multi-domain QA. ~85–90% est. SOTA.
- **AIME 2025/2026.** American Invitational Math Exam; top closed models reach 90%+ with reasoning effort. ([source](https://artofproblemsolving.com/wiki/index.php/AIME_Problems_and_Solutions))
- **Putnam.** Saturated for top closed-reasoning models.
- **★ HLE (Humanity's Last Exam).** 2,500 expert-curated questions across math/science/humanities; the "hardest currently-public" benchmark. ~20–30% est. SOTA. ([source](https://humanitys-last-exam.ai/))

None of these are agent benchmarks; they are static question-answer sets. Listed here because they are the canonical "reasoning" leaderboards and any agent harness that touches them does so via single-shot inference — the harness gap is small.

---

## 12. ★ LMArena / Chatbot Arena

- **Maintainer.** UC Berkeley / LMSYS (LMArena.ai).
- **What it measures.** Pairwise human-preference ELO. The de-facto industry leaderboard for chat models.
- **Current SOTA.** Top-3 typically GPT-5.5/5.6 Sol, Claude Opus 4.7/5, Gemini 3 Pro; exact ordering fluctuates. ([source](https://lmarena.ai/leaderboard))
- **Controversies.**
  - **Style gaming.** Vendors tune for verbosity, formatting, "personality" — which is what humans vote on.
  - **Prompt farming.** Some vendors maintain many variants; submit only the best-scoring prompt.
  - **Self-selection bias.** Heavy enterprise users skew toward coding/helpfulness; creative-writing prompts skew toward different models.
  - **Category gaming.** LMArena's per-category leaderboards show very different rankings than the aggregate.
- **Harness relevance.** Zero — this is base-model behavior, not agent behavior.

---

## 13. ToolBench / ML-Bench / DevBench

- **ToolBench.** OpenAI, ~16K real APIs. Saturation in single-tool calls; multi-tool planning still differentiates models.
- **ML-Bench** (MLAgentBench). End-to-end ML engineering tasks. Low single-digit SOTA.
- **DevBench.** OpenCompass; software-dev tasks. ~30% est. SOTA.

These are agent benchmarks but with much smaller communities than SWE-bench or ARC-AGI.

---

## 14. ★ OSWorld

- **Maintainer.** Xie et al., multi-university (2024).
- **What it measures.** 369 real computer-use tasks across OS/macOS/Windows/Ubuntu. Screenshots + actions.
- **Current SOTA.** ~38–55% est.; top scores by GPT-5/Claude with computer-use APIs. ([source](https://github.com/xlang-ai/OSWorld))
- **Harness sensitivity.** High — screenshot parsers, click prediction, retry strategies all matter.

---

## 15. ★ WebArena

- **Maintainer.** CMU (Yao et al., 2023).
- **What it measures.** Realistic web-browsing agent tasks across 6 domains (shopping, reddit, gitlab, etc.).
- **Current SOTA.** ~60% est.; closed models with browser harnesses. ([source](https://github.com/web-arena-x/webarena))
- **Harness sensitivity.** Very high — DOM parsing vs accessibility tree vs screenshots can swing scores 20+ points.

---

## 16. Mind2Web

- **Maintainer.** OSU NLP (Deng et al., 2023).
- **What it measures.** 2,350 web tasks across 137 sites.
- **Current SOTA.** ~40% est. step success.

---

## 17. Long-context benchmarks (where RLM/Prime-Agent claims are strongest)

These are the benchmarks in the table Prime Intellect uses to argue "RLM > vanilla":

- **OOLONG** (Yahoo + abertsch72). Long-context reasoning over real D&D logs. Prime-Agent + Opus 5: 0.920 vs Codex+GPT-5.6: 0.500 on the 128k split. ([source](https://github.com/abertsch72/oolong))
- **OOLONG-Pairs.** Long-output reasoning. Prime-Agent + Opus 5: 0.929 vs Claude Code: 0.922.
- **OBLIQ-Bench.** Long-output math ranking. Prime-Agent + GLM-5.2: 0.669 vs Pi-mono: 0.635.
- **LongBenchPro / LongBenchv2 / ManyIH / LongCot-Mini / EmulatorBench.** Various long-context tasks.
- **★ RLM paper's own claim** (Zhang, Kraska, Khattab, [arXiv:2512.24601](https://arxiv.org/abs/2512.24601)): GPT-5 + RLM improves +26% over compaction, +130% over CodeAct, +13% over Claude Code on long-context evals.

---

## 18. Other notable harnesses mentioned in the matrix

| Harness | Maintainer | License | Notes |
|---|---|---|---|
| **Prime Agent** | Prime Intellect | MIT | 15.1k stars; builds on `pi-mono`. [repo](https://github.com/PrimeIntellect-ai/prime-agent) |
| **PRO-LONG** (RGB) | Fox et al. | n/a | 315 stars; appends everything to log.txt. [repo](https://github.com/alexisfox7/PRO-LONG) |
| **Tufa Labs "The Duck"** | Tufa Labs | open | Winning Kaggle Milestone-1. [repo](https://github.com/Tufalabs/duck-harness) |
| **Continual Harness ARC-AGI 3** | feng-rrRay (Karten et al.) | MIT | Official paper reproduction. [repo](https://github.com/feng-rrRay/Continual-Harness-ARC-AGI-3) |
| **Schema** | schema-harness (Li & Zeng) | closed | Trace-only dataset; no public harness repo. [HF](https://huggingface.co/datasets/schema-harness/arc-agi-3-schema-traces) |
| **StochasticGoose** (DriesSmit) | Dries Smit | open | First ARC-AGI-3 preview winner (12.58% on 3 games). [repo](https://github.com/DriesSmit/ARC3-solution) |
| **Duke Harness** | Alexis Fox | open | Earlier name for PRO-LONG. [blog](https://blog.alexisfox.dev/arcagi3) |
| **OpenHands** | All Hands AI | MIT | 6K+ stars; general agent harness. |
| **Aider** | Paul Gauthier | Apache-2 | Code-edit agent. |
| **Claude Code** | Anthropic | proprietary | The closed competitor. |
| **Codex CLI** | OpenAI | Apache-2 | The closed competitor. |
| **Gemini CLI** | Google | Apache-2 | The closed competitor. |
| **Cline / Roo Code** | Cline team | Apache-2 | VS Code harnesses. |
| **Continue / Cody** | Continue / Sourcegraph | OSS/proprietary | VS Code harnesses. |
| **Goose** | Block | Apache-2 | Desktop-first harness. |
| **Pi-mono** | badlogic | MIT | Underlying runtime of Prime Agent. |

---

## 19. Vendor self-reported harness numbers (cited verbatim, not verified)

The Prime Agent launch post ([source](https://www.primeintellect.ai/blog/prime-agent)) compares Prime-Agent vs native harness across many benchmarks:

| Eval | Prime-Agent + Opus 5 | Claude Code + Opus 5 | Prime-Agent + GPT-5.6 Sol | Codex + GPT-5.6 Sol | Prime-Agent + GLM-5.2 | Pi-mono + GLM-5.2 |
|---|---|---|---|---|---|---|
| OOLONG 128k | 0.900 | **0.920** | **0.940** | 0.500 | **0.700** | 0.420 |
| OOLONG-Pairs | **0.929** | 0.922 | **0.911** | 0.895 | **0.874** | 0.556 |
| OBLIQ-Bench | **0.802** | 0.795 | 0.612 | **0.646** | **0.669** | 0.635 |
| LongBenchPro | **0.804** | 0.790 | **0.794** | 0.790 | **0.777** | 0.768 |
| LongBenchv2 | 0.744 | **0.746** | **0.714** | 0.704 | 0.680 | **0.696** |
| ManyIH Coding | **0.536** | 0.522 | **0.499** | 0.454 | **0.424** | 0.386 |
| ManyIH IF | **0.225** | 0.175 | 0.216 | **0.232** | **0.209** | 0.164 |
| LongCot-Mini | **0.722** | 0.558 | 0.671 | **0.681** | **0.638** | 0.613 |
| EmulatorBench | 0.047 | 0.062 | **0.275** | 0.228 | **0.208** | 0.000 |

Read carefully: the bolded value is whichever row has it — sometimes the closed harness wins. The aggregate picture: **Prime-Agent + a strong model beats the same model's native harness 6–9 of 9 long-context evals**, but the gap is 5–50 points depending on task type.

---

## 20. Sources & verification

- **ARC Prize Verified leaderboard** — gated by JS; Playwright snapshot 2026-08-13 confirmed it loads but data tables render via client-side fetch (no direct HTML export available without API key). ([arcprize.org/leaderboard](https://arcprize.org/leaderboard))
- **Kaggle ARC-AGI-3 leaderboard** — fully public; top score 2.70 (cstl, gold). ([kaggle.com](https://www.kaggle.com/competitions/arc-prize-2026-arc-agi-3/leaderboard))
- **ARC Prize blog** — primary source for benchmark definitions and frontier-model scores. ([arcprize.org/blog](https://arcprize.org/blog))
- **Prime Intellect blog** — primary source for Prime-Agent and RLM claims. ([primeintellect.ai/blog/prime-agent](https://www.primeintellect.ai/blog/prime-agent))
- **arXiv** — primary source for academic claims. ([RLM 2512.24601](https://arxiv.org/abs/2512.24601), [Continual Harness 2605.09998](https://arxiv.org/abs/2605.09998), [PRO-LONG 2607.20064](https://arxiv.org/abs/2607.20064))
- **GitHub** — primary source for harness code (15.1k-star Prime Agent, 315-star PRO-LONG, 72-star Duck).
- **HuggingFace** — primary source for the `schema-harness/arc-agi-3-schema-traces` dataset.
- **DDG/Google/Bing search** — bot-blocked for some queries; verified via direct GitHub/arXiv/HuggingFace URLs.

---

*End of BENCHMARKS_MATRIX.md — see [FINDINGS_BENCHMARKS.md](FINDINGS_BENCHMARKS.md) for the 12-dimension analysis.*
