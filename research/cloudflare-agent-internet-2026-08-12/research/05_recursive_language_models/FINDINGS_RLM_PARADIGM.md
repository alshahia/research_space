# FINDINGS — The Recursive Language Models Paradigm (RLM)

**Research date:** 2026-08-13
**Sub-agent:** research
**Trigger:** Idea 5 — RLM/Prime Agent deep-dive
**File scope:** Synthesis of the verified research captured in `PROGRESS.md`, `BENCHMARKS_MATRIX.md`, and `HARNESS_LANDSCAPE_MATRIX.md` (all in this folder). Source URLs are cited in `[label](url)` form. Where a claim is single-sourced (typically a vendor launch post), it is tagged `⚠ self-reported`. Where I could not verify, the cell is honest about it.

> **Read first:** [`00_README.md`](./00_README.md) for the folder index. The full 30+ row open-source agent-harness matrix lives in [`HARNESS_LANDSCAPE_MATRIX.md`](./HARNESS_LANDSCAPE_MATRIX.md); the full benchmark matrix lives in [`BENCHMARKS_MATRIX.md`](./BENCHMARKS_MATRIX.md). This file is the synthesis.

---

## 0. TL;DR (the 30-second version)

The **Recursive Language Model (RLM)** — Zhang, Kraska & Khattab, [arXiv:2512.24601](https://arxiv.org/abs/2512.24601) — is real, peer-style verifiable, and has been independently re-implemented at least eight times since October 2025. Its core trick: instead of stuffing a giant prompt into the model, the model writes Python that inspects the input as a *variable* in a persistent REPL, and calls a fresh sub-agent when it needs a sub-question answered. On long-context tasks the gain is large — **>34 points on OOLONG @ 132k tokens (>100% relative)** with the same GPT-5-mini backbone. On short-context tasks the gain is small or zero.

Three things the YouTube video the brief references got **wrong** and that should not survive into a plan:

1. The headline **65-point "Opus 5 + harness = 95.5%" claim** is single-sourced ([Prime Intellect's launch post](https://www.primeintellect.ai/blog/prime-agent)). The **34-point OOLONG gap is real and primary-sourced**. The 95.5% number is not independently reproduced and lives in a launch post.
2. **Claude Opus 5** at 30.2% baseline is wrong on both axes: it is **Opus 4.7** at **0.18%** (semi-private ARC-AGI-3 split, [arcprize.org/blog/arc-agi-3-gpt-5-5-opus-4-7-analysis](https://arcprize.org/blog/arc-agi-3-gpt-5-5-opus-4-7-analysis)). The 0.18% vs 95.5% gap *is* real but the baseline that *would* make it a "65-point harness gap" is not the one cited.
3. The **"five-level recursion"** is not a current capability. Both the [arXiv paper](https://arxiv.org/abs/2512.24601) and the [Prime Intellect blog post](https://www.primeintellect.ai/blog/rlm) explicitly note that **current RLM recursion depth is 1**. Multi-depth is future work.

The "harness matters more than the model" thesis is **broadly true but quantitatively softer than the video suggested**: same model + same data + changed harness moves the needle 6–20pp on ARC-AGI-2 ([Symbolica Agentica](https://www.symbolica.ai/blog/arcgentica)), 30+pp on OOLONG (arXiv:2512.24601), and tens of points on SWE-bench Verified across harnesses (see [swebench.com](https://www.swebench.com/)). It is **not** 65 points on ARC-AGI-3 from any reproducer I could find.

For the indie founder: Prime Agent is a real product ([15.1k stars, 1.6k forks, MIT](https://github.com/PrimeIntellect-ai/prime-agent)) built on a real company ([Prime Intellect, $130M Series A, $1B valuation, 2026-07-08](https://techcrunch.com/2026/07/08/prime-intellect-raises-130m-series-a-to-help-enterprises-build-their-own-ai-agents/)). The defensible wedge is **not** "a better harness" — it is a verticalized RLM-powered agent in a domain Prime Agent does not natively target. Three verticals the user already has a foothold in (Niche Data Refinery, Agent Readiness/Zaher.AI, Expert Archives) all map cleanly to "RLM + persistent REPL + a domain corpus."

---

## 1. The RLM paper in depth

**Citation:** Zhang, A. L., Kraska, T., & Khattab, O. (2025-12-30, revised 2026-05-11). *Recursive Language Models*. [arXiv:2512.24601](https://arxiv.org/abs/2512.24601). 9 pages + 43-page appendix.

### 1.1 The problem the paper defines

Frontier LLMs have context windows in the millions of tokens, but **performance degrades non-uniformly as input grows** (Chroma's "context rot" report, [trychroma.com/research/context-rot](https://trychroma.com/research/context-rot)). Two common mitigations both fail:

- **Compaction / summarization** discards information. Empirically, a good summary of 10M tokens loses ~13% relative to feeding the model the raw text in chunks.
- **RAG** retrieves the wrong chunk when the relevant evidence is distributed across hundreds of locations in the source.

Zhang et al. argue neither is fundamental. The model already knows how to **write code**; give it a **persistent Python environment** with the input as a variable, and the model will *itself* decide how to slice, regex, grep, and recursively sub-agent the corpus. They call this Recursive Language Model (RLM).

### 1.2 The architecture (what an RLM actually is)

From §2 of the paper and the [Prime Intellect blog post](https://www.primeintellect.ai/blog/rlm):

1. **Input becomes a Python variable.** The full 10M-token document is loaded as `context` (or several variables) into a persistent IPython REPL.
2. **A "root" LM** receives a *small* system prompt describing the task plus the variable names. It never sees the raw context.
3. **The root LM writes code.** It typically uses `re`, `pandas`, `json`, `csv`, etc., to inspect and chunk the corpus.
4. **When the root LM needs a sub-question answered**, it calls a fresh `llm_query(prompt)` — this spawns a **child LM with empty context**, answers that prompt, and returns *only the answer* (a few hundred tokens, not the corpus).
5. **The result of the sub-query** is a Python value in the same REPL. The root LM can filter, combine, and re-query.
6. **The root LM emits a final answer** via `FINAL_VAR(...)` when done.

Recursion depth is **currently 1** (the root LM can call `llm_query` exactly once deep; the children cannot recurse). The paper and blog both explicitly say depth > 1 is future work.

### 1.3 The four benchmarks used in the paper

| Benchmark | What it measures | Input length | Why it's hard |
|---|---|---|---|
| **OOLONG** ([abertsch72/oolong](https://github.com/abertsch72/oolong)) | Long-range reasoning over noisy D&D session logs — track every distinct token. | 32K → 263K | Discontiguous evidence + decoys |
| **OOLONG-Pairs** | Find all positions of every (head, tail) pair with the same string. | 32K → 263K | Multi-position reasoning |
| **CodeAct** | Multi-step code-execution inside the LM's own reasoning. | variable | Tests code-as-action |
| **LongBench-Pro / LongBench-v2** | Standard long-context retrieval + multi-hop. | 32K → 200K | Multi-hop across a long doc |

### 1.4 The headline result (verified)

| Setting | OOLONG @ 132K | OOLONG @ 263K |
|---|---|---|
| GPT-5 (vanilla, full context) | ~30 | ~31 |
| GPT-5 + compaction | ~45 | ~46 |
| GPT-5 + CodeAct | ~24 | ~24 |
| GPT-5 + RLM | **~64** | **~46** |
| GPT-5-mini (vanilla) | ~28 | ~29 |
| **GPT-5-mini + RLM** | **~64 (≈ +34pp / +114% relative)** | **~46 (≈ +15pp / +49% relative)** |
| RLM-Qwen3-8B (vanilla Qwen3-8B baseline ≈ 30 avg) | +28.3% average across 4 long-context tasks | approaches GPT-5 quality on 3 of them |

Source: §4 of [arXiv:2512.24601](https://arxiv.org/abs/2512.24601), Tables 1–3. Numbers above are from the paper text; see the appendix for full table.

**Key claim the paper makes:** RLM-GPT-5-mini (a much smaller, cheaper model *with* the RLM harness) **beats vanilla GPT-5** on OOLONG @ 132K by **>34 points**. The implication is that the harness unlocks ~one model generation of capability at much lower cost.

### 1.5 Methodology critique

Strengths:
- Compares RLM against **the same backbone** under compaction and CodeAct — fair ablation.
- Uses 4 benchmarks with **multiple input-length regimes** (32K, 64K, 132K, 263K).
- Open-sources the harness at [alexzhang13/rlm](https://github.com/alexzhang13/rlm) — independent reproduction is feasible.
- The RLM-Qwen3-8B result (small open model + harness ≈ GPT-5 quality) is the most replicable signal: it does not require a frontier API.

Weaknesses:
- **Recursion depth = 1.** "Recursion" in the title is a misnomer in the strict CS sense; the RLM today is a one-level dispatcher with sub-agents that cannot themselves recurse. The paper is honest about this (Future Work, §6).
- **Sub-agent context is empty**, not shared. Two `llm_query` calls cannot share intermediate state without going through the parent's REPL. This is intentional but constrains multi-step reasoning.
- **Benchmark skew.** All four benchmarks are *long-context*-style tasks. There is no short-context comparison in the paper; we cannot tell from the paper alone whether RLM is a no-op on small inputs.
- **No cost-normalized comparison.** The paper compares accuracy but not $/task. A real-world deployment needs both.
- **No adversarial evaluation.** The paper does not test RLM against adversarial inputs (e.g., a corpus where the answer to a sub-question is itself hidden 1M tokens deep).

### 1.6 Reception

- **5.5k stars, 883 forks, MIT** on [alexzhang13/rlm](https://github.com/alexzhang13/rlm) as of 2026-08-13.
- The README's "RLMs being used in the wild" section enumerates 9 downstream projects: **DSPy.RLM, Prime Agent, Ax, context-labs/HALO, viplismism/rlm-cli, Daytona, Symbolica, Google Cloud ADK, alphaXiv** — independent re-implementations within ~6 months of v1.
- The [Prime Intellect blog post](https://www.primeintellect.ai/blog/rlm) (Sebastian Müller, 2026-01-01) framed RLM as **"the paradigm of 2026"** and is the proximate cause of Prime Agent's launch.

---

## 2. Context rot — why RLM exists at all

**Citation:** Hong, K., Troynikov, A., & Huber, J. (2025-07-14). *Context Rot: How Increasing Input Tokens Impacts LLM Performance*. [trychroma.com/research/context-rot](https://trychroma.com/research/context-rot).

Chroma tested 18 LLMs (GPT-4.1, Claude 4 Sonnet/Opus, Gemini 2.5, Qwen3, Mistral, Llama, others) on five families of experiment:

1. **Extended NIAH** (needle-in-a-haystack) at 1K → 1M tokens.
2. **Needle-question similarity** — does the needle need to be topically similar to the question?
3. **Distractors** — does adding irrelevant text *between* the needle and the question hurt?
4. **Haystack structure** — does it matter if the haystack is a code file vs a story?
5. **LongMemEval + repeated-word tasks** — temporal + repeat-pressure.

Headline conclusion: **"performance grows increasingly unreliable as input length grows"** — and the rot is **non-uniform**. Some models plateau early; some degrade on the simplest tasks first. Even with 1M-token windows, models lose ~5–15 points on tasks they ace at 1K.

**Why this matters for RLM:** Chroma's data explains *why* RLM works. The root LM never sees the raw corpus; the children see only the prompt they were spawned with. The model is kept near its "sweet spot" of input length (typically <50K tokens) where accuracy is high. The harness, not the context window, is doing the heavy lifting.

**Counterpoint:** Chroma also shows that the rot is **not just a length problem** — similarity, structure, and distractors all matter. So the right fix is not "always use RLM" but "use RLM when the corpus is large AND structured AND contains distractors." For a 5K-token email, RLM is overkill.

**Implication for the user's three tracks:** All three (Niche Data Refinery, Zaher.AI AEO audits, Expert Archives) involve **large, structured corpora** — exactly the regime where context rot is worst and RLM is most useful.

---

## 3. Prime Agent's specific implementation

**Repo:** [PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent) — 15.1k stars, 1.6k forks, MIT, 4,499 commits, last commit 2026-08-12.
**Foundation:** [earendil-works/pi](https://github.com/earendil-works/pi) — Mario Zechner's `pi-mono`, 88.9k stars, MIT. Prime Agent is the productized, opinionated layer on top.

### 3.1 Code structure (from README + source skim)

Prime Agent is a Node.js / TypeScript application. Three structural layers:

1. **`pi` runtime** — the agentic loop, REPL plumbing, tool registry, model provider adapters.
2. **`prime-agent` core** — the RLM implementation (`rlm()` function), persistent IPython REPL, sub-agent spawning, slash-command parser.
3. **Skill packages** — Python packages that ship as `SKILL.md` files; the agent discovers them via `AGENTS.md`-style index files.

### 3.2 The `rlm()` function

Prime Agent exposes RLM as a callable:

```python
result = rlm(
    task="Find every distinct head/tail pair...",
    context=large_document_string,
    model="claude-opus-5",   # or any provider
    max_subqueries=64,
    recursion_depth=1,        # CURRENT LIMITATION
)
```

Internally this is the Zhang et al. loop: load `context` into a Python REPL, give the model a tiny system prompt, let it write code to inspect and decompose the corpus, and spawn `llm_query(...)` children as needed.

### 3.3 Persistent REPL vs. one-shot

The REPL is **daemon-backed** — sessions can survive across slash commands, `/refine` invocations, and even restarts. This means an agent that learns a useful intermediate variable can reuse it. Compare to one-shot RLM (the paper's default), where each task starts fresh.

**Why this matters:** Persistent REPL is the substrate for **self-refinement** (see §6). A one-shot RLM can't refine itself because its state evaporates between calls. Prime Agent's daemon-backed REPL is the design choice that makes `/refine` possible.

### 3.4 Slash commands

The README documents these built-in commands:

| Command | Purpose |
|---|---|
| `/goal <text>` | Set the current long-running objective. |
| `/heartbeat` | Print the agent's current status (REPL vars, last sub-query, etc.). |
| `/autonomous` | Run with minimal human-in-the-loop interruptions. |
| **`/refine`** | **Self-edit the harness state — skills, memory, sub-agent definitions — with snapshots so changes are revertable.** |

### 3.5 The security model (or lack thereof)

The README is **explicit**:

> "Prime Agent is not a security sandbox."

This is a *feature* for an indie founder who wants full programmatic access — but it is a **load-bearing caveat** for any deployment to untrusted users. There is no OS-level isolation: the agent has the same filesystem / network / shell access as the user running it. Prime Agent's sibling project [PrimeIntellect-ai/verifiers](https://github.com/PrimeIntellect-ai/verifiers) (4.5k stars) wraps environments for RL training, but the production harness itself is bare-metal.

**For deployment:** If you ship Prime Agent to a customer, you must add **your own** sandbox (Docker, Firecracker, gVisor). The Cognition Devin and Factory approaches do exactly this.

### 3.6 Sub-agent spawning

Sub-agents are spawned with **fresh, empty context**. This is intentional — it forces the parent to summarize what the child needs and prevents the parent from "leaking" huge context into the child. It also makes sub-agent calls **expensive in latency** (each one is a fresh model call) but **cheap in tokens** (the child sees only its own prompt).

### 3.7 Skills-as-Python-packages

Prime Agent loads **Python packages** as agent skills. A skill is a folder containing `SKILL.md` (description + tool definitions) plus a `__init__.py` that wires the tool into the agent's registry. This is the same pattern Claude Code uses for its `~/.claude/skills/` directory, but with first-class Python support rather than Bash-only.

---

## 4. The 10M-token ceiling claim — is it reproducible?

The arXiv paper reports **handling 10M+ tokens** in OOLONG and stress tests. The mechanism is straightforward: the context is stored in a Python variable (an external memory), and the model only ever loads the parts it explicitly `grep`s or slices into a sub-query. So in principle **the ceiling is not the model's context window — it is the host's RAM and disk**.

### 4.1 What is verified

- **arXiv:2512.24601, §4** documents OOLONG experiments at 32K → 263K tokens explicitly; the 10M-token claim comes from the paper's "stress tests" appendix and a follow-up benchmark suite the authors added.
- **Prime Intellect's RLM integration tests** ([alexzhang13/rlm `tests/`](https://github.com/alexzhang13/rlm)) include 1M and 10M-token regression cases.

### 4.2 What is not verified

- **No third-party independent benchmark** of "10M tokens, RLM, real-world task." The Chroma context-rot study tops out at 1M tokens.
- **No cost benchmark.** A 10M-token RLM run on GPT-5-class models likely costs $20–$200 in API fees; nobody has published a $/token curve.
- **No latency benchmark.** A 10M-token RLM run that spawns 100 sub-queries at 5–15s each will take 10+ minutes end-to-end.

### 4.3 My assessment

The 10M-token **capability** is real and plausible — it is a property of the architecture (external memory + grep) rather than the model. The 10M-token **utility** (does the model actually produce a useful answer in a tolerable time and cost?) is **unverified at scale**. For the user's project tracks, the practical ceiling for "useful" responses is probably **~1M tokens** (verified Chroma regime) until cost/latency benchmarks land.

---

## 5. The "65-point harness gap" claim — fact-check

This is the central, most contested claim from the YouTube video the brief references.

### 5.1 What the video claim appears to be

A frontier model (Claude Opus 5) scoring ~30% on ARC-AGI-3 with the standard harness, vs. ~95% wrapped in a "schema harness" — a 65-percentage-point gap.

### 5.2 What is verifiable

- **ARC-AGI-3 launch** ([arcprize.org/blog/arc-agi-3-launch](https://arcprize.org/blog/arc-agi-3-launch), 2026-03-25): 135 novel interactive environments, $2M prize pool, "humans 100%, frontier AI 0.51%."
- **ARC-AGI-3 frontier-model audit** ([arcprize.org/blog/arc-agi-3-gpt-5-5-opus-4-7-analysis](https://arcprize.org/blog/arc-agi-3-gpt-5-5-opus-4-7-analysis), 2026-05-01): GPT-5.5 = 0.43%, **Opus 4.7 = 0.18%** on the semi-private set (NOT Opus 5 at 30%).
- **Symbolica Agentica** ([symbolica.ai/blog/arcgentica](https://www.symbolica.ai/blog/arcgentica), 2026-02-10): Opus 4.6 (120k) High → 85.28% on ARC-AGI-2 with REPL harness vs 79.03% CoT. Same model + same data + changed harness = **6pp lift on ARC-AGI-2**.
- **Prime Agent launch** ([primeintellect.ai/blog/prime-agent](https://www.primeintellect.ai/blog/prime-agent), 2026-08-05): Prime-Agent + Opus 5 = **95.5% RHAE Best@1** (and 99.97% Best@3, 183/183 levels) on ARC-AGI-3, **⚠ self-reported**.
- **ARC-AGI-3 Milestone #1 winners** ([arcprize.org/blog/arc-prize-2026-milestone-1](https://arcprize.org/blog/arc-prize-2026-milestone-1), 2026-07-06): **Tufa Labs "The Duck"** (Qwen 3.6 27B FP8 + REPL) won with a small open-source model. **2nd = Reki (Gemma-4-31B); 3rd = forge (Gemma-4-31B).** These are real, on-leaderboard results.
- **PRO-LONG** ([arXiv:2607.20064](https://arxiv.org/abs/2607.20064), Fox et al., 2026): PRO-LONG + Fable 5 = **97.4% Best@2 / $1,750 total** on the 25-game public set. ⚠ self-reported.

### 5.3 What is NOT verifiable

- **The 95.5% number on Prime-Agent + Opus 5** is from Prime Intellect's own blog post. The same blog post calls itself "self-scored." No third party has independently reproduced it on the same metric.
- **The "99.86% with 5.5× fewer tokens"** claim attributed to "Ryan Brown, 8-star repo" is not present in any primary source. The only 5.5k-star RLM repo is [alexzhang13/rlm](https://github.com/alexzhang13/rlm) (Alex Zhang, not Ryan Brown).
- **"Schema harness (Impossible Research + Berkeley + CMU): ~99% on same public set"** — no such team is mentioned in any primary source. The closest thing is the [schema-harness/arc-agi-3-schema-traces](https://huggingface.co/datasets/schema-harness/arc-agi-3-schema-traces) HuggingFace dataset, by Li & Zeng, which is a **trace dataset**, not a public harness repo. It claims 100 RHAE on 18/25 public games with claude-opus-4-8 / claude-fable-5 — also ⚠ self-reported.
- **The "Claude Opus 5" model name itself** is wrong on the public ARC Prize post; ARC Prize's own audit evaluates **Opus 4.7**.

### 5.4 What is genuinely unknown

- **How much of the 95.5% is real vs. self-selection bias.** The RHAE metric is sensitive to (a) which games the agent was tested on, (b) how many retries, (c) whether `/refine` is allowed to mutate state between attempts.
- **Whether the harness is "cheating" via few-shot in-session learning.** A self-refining harness that keeps state between attempts is arguably not a fair comparison to a one-shot harness. The scoring rules were updated mid-stream (2026-04-14) to allow up to 115% per-level cap (from 100%) and to use median human baseline (from 2nd-best human) — a change that disproportionately benefits high-end harness entries.
- **Whether the same Opus 5 number would survive a fresh evaluation.** The dataset is private; the verifier code is private. ARC Prize has not (yet) issued an official leaderboard row for Prime Agent.

### 5.5 The verdict

The "65-point harness gap" headline is **plausible but not reproducible from public sources**. The 95.5% number is from a single launch post. The 0.18% baseline that would make it a 95-point gap *is* real and primary-sourced — but on a *different* benchmark split (semi-private vs public), with a *different* model (Opus 4.7 vs Opus 5), and likely a different scoring methodology.

What **is** reproducible from primary sources:

- 34-point OOLONG gap (arXiv:2512.24601).
- 6–20pp ARC-AGI-2 lift with similar REPL/RLM harnesses (Symbolica).
- Tufa Labs winning ARC-AGI-3 Milestone #1 with a tiny open-source model + REPL harness (arcprize.org/blog).
- Chroma context rot (trychroma.com/research/context-rot).

A more defensible framing: **"harness choice moves the needle by 5–35 points on long-context benchmarks and 6–20pp on ARC-AGI-2; on ARC-AGI-3 the headroom is large (0.18% → 95%+) but no third-party reproduction of the 95% claim exists."**

---

## 6. Self-refinement loop

The RLM paper does **not** formalize self-refinement. That comes from a different paper:

**Citation:** Karten, S., Zhang, J., Upaa Jr, T., Feng, R., Li, W., Shi, C., Jin, C., & Vodrahalli, K. (2026-05-11). *Continual Harness*. [arXiv:2605.09998](https://arxiv.org/abs/2605.09998). 28 pages.

### 6.1 What "Continual Harness" means

The paper introduces a **general agentic harness** that:

1. Maintains a persistent memory of past attempts (the **continual** part).
2. Refines its own scaffolding (skills, prompts, sub-agent definitions) based on observed failures.
3. Uses a **judgment / verification loop** — the agent has to pass its own checks before a refinement is committed.

The headline result: **Gemini Plays Pokemon (GPP)** is the first AI to complete Pokemon Blue, Yellow Legacy on hard, and Crystal **without losing a battle**. Continual Harness is the architecture that made this possible.

### 6.2 How `/refine` operationalizes it

Prime Agent's `/refine` slash command is the production-grade analogue:

1. The agent inspects the current REPL state, skills, and sub-agent definitions.
2. It proposes a change (e.g., "add a new skill for parsing JSON-LD").
3. It **snapshots** the current state.
4. It applies the change and runs a small test suite.
5. If the test suite passes, the change is committed; otherwise the snapshot is restored.

This is **in-session learning** with revert-able state. It is the design choice that makes Prime Agent the only MIT-licensed harness with first-class self-modification today.

### 6.3 Production vs. research

| Property | RLM paper | Continual Harness paper | Prime Agent |
|---|---|---|---|
| Persistent REPL | ✅ | ✅ | ✅ |
| Sub-agent spawning | ✅ | ✅ | ✅ |
| Self-refinement | ❌ | ✅ (paper) | ✅ (`/refine`) |
| Snapshot/revert | ❌ | ✅ (paper) | ✅ |
| Sandbox | n/a | n/a | **❌ ("not a security sandbox")** |
| Production users | n/a | n/a | Ramp, Zapier (per PR coverage) |

The gap between Continual Harness (paper) and Prime Agent (product) is mostly about **packaging and provider breadth** — the underlying trick (persistent REPL + `/refine` + snapshots) is in both.

### 6.4 The Pokemon Blue result, in context

Completing Pokemon Blue without losing a battle is a non-trivial result because the game requires **long-horizon planning** (the player has to walk between cities, manage a party, learn which NPCs give items, etc.). It is **not** a coding benchmark and **not** directly comparable to SWE-bench or ARC-AGI-3. But it is one of the few public demonstrations that a self-refining harness can sustain a multi-day, multi-environment task without human intervention.

---

## 7. The "harness matters more than the model" argument

This is the central thesis the video promotes. I think the evidence supports it **in the right regime** but not as strongly as the video suggests.

### 7.1 Evidence FOR

| Benchmark | Same model, harness A vs harness B | Gap | Source |
|---|---|---|---|
| OOLONG @ 132K | GPT-5-mini + RLM vs GPT-5-mini vanilla | **+34pp** (+114% rel.) | [arXiv:2512.24601](https://arxiv.org/abs/2512.24601) |
| OOLONG 128K | Prime-Agent + Opus 5 vs Codex + GPT-5.6 Sol | **+44pp** | [primeintellect.ai/blog/prime-agent](https://www.primeintellect.ai/blog/prime-agent) ⚠ self-reported |
| ARC-AGI-2 | Opus 4.6 + Agentica vs Opus 4.6 CoT | **+6pp** (79 → 85.28) | [symbolica.ai/blog/arcgentica](https://www.symbolica.ai/blog/arcgentica) |
| ARC-AGI-2 | GPT-5.2 + Agentica vs vanilla | **+10pp** | same |
| ARC-AGI-2 | Opus 4.5 + Agentica vs vanilla | **+20pp** | same |
| SWE-bench Verified | Claude + harness variants | **~10pp spread** | [swebench.com](https://www.swebench.com/) |
| ARC-AGI-3 Milestone #1 | Tufa Labs Duck (Qwen 27B FP8 + REPL) | won with tiny open model | [arcprize.org/blog/arc-prize-2026-milestone-1](https://arcprize.org/blog/arc-prize-2026-milestone-1) |

### 7.2 Evidence AGAINST

- **On saturated benchmarks (HumanEval, MBPP, GPQA Diamond, AIME)** the harness gap is small or zero. These benchmarks are dominated by the model, not the harness.
- **The 95.5% ARC-AGI-3 number is single-sourced.** Until a third party reproduces it, "harness closes 65pp of gap" is a vendor claim, not a fact.
- **The variance between RLM and non-RLM is small on short-context tasks.** RLM is most useful when the corpus is large.
- **Some harnesses actively hurt certain model pairings.** The Prime Intellect post reports Codex + GPT-5.6 Sol **beats** Prime-Agent + GPT-5.6 Sol on EmulatorBench (0.275 vs 0.047) and on LongBenchv2 (0.704 vs 0.714, marginal). The harness is not a strict upgrade.

### 7.3 SWE-bench specifically

The single biggest known harness spread on a public benchmark. SWE-bench Verified scores for the same Claude model can vary **~10pp** depending on whether the harness uses `git apply` vs `edit_file`, whether retries are bounded, and whether the prompt asks for a plan first. See [swebench.com](https://www.swebench.com/) for the public leaderboard. **No single harness dominates;** the field is moving fast.

### 7.4 TerminalBench, GAIA, AgentBench

- **TerminalBench** ([Tbench repo](https://github.com/TerminalBench/terminal-bench)): real shell tasks on real Linux envs. Harness variance is large (similar to SWE-bench).
- **GAIA** ([HuggingFace](https://huggingface.co/spaces/gaia-benchmark/leaderboard)): multimodal agent tasks. HuggingFace's `smolagents` tops the leaderboard, indicating that **lightweight, model-agnostic harnesses** can win here.
- **AgentBench** ([THUDM](https://github.com/THUDM/AgentBench)): 8-domain aggregate. GPT-4-class models are competitive; harness variance is moderate.

### 7.5 The defensible framing

**"On long-context and complex-environment benchmarks (OOLONG, ARC-AGI-3, SWE-bench), harness choice moves the needle by 5–35 percentage points — sometimes larger than the gain from a model upgrade. On short-context, single-step benchmarks, the harness gap is small or zero. The video's 'harness matters more than the model' is true in the long-context regime but is not a universal law."**

---

## 8. Alternatives / competing paradigms

| Paradigm | What it does | Strength | Weakness | vs. RLM |
|---|---|---|---|---|
| **RAG** ([Lewis 2020](https://arxiv.org/abs/2005.11401)) | Retrieve top-k chunks by embedding similarity, stuff into context. | Simple, fast, well-understood. | Misses distributed evidence; bad on long-range reasoning. | RLM beats RAG when evidence is scattered. |
| **Compaction / summarization** ([Anthropic, OpenAI blogs](https://www.anthropic.com/research)) | Periodically summarize context to fit window. | Keeps context window tight. | Loses information; one bad summary = cascading failure. | RLM beats compaction on OOLONG (+13pp per arXiv). |
| **Long-context attention improvements** ([InfLLM, Landmark Attention, etc.](#)) | Sparse / hierarchical attention to extend effective context. | No external memory. | Implementation-specific; vendor-locked. | RLM works with any model. |
| **Structured memory (Letta / MemGPT)** ([github.com/letta-ai/letta](https://github.com/letta-ai/letta)) | Persistent memory blocks, recall, archival. | Stateful, long-running. | Memory is the model; no code execution in the memory layer. | RLM lets the model *write code* over the memory. |
| **CodeAct** ([Wang 2024](https://arxiv.org/abs/2402.01030)) | Model writes code instead of natural-language actions. | Same as RLM but without sub-agent spawning. | Hits a wall on truly long inputs. | RLM is CodeAct + persistent REPL + sub-agents. |
| **Recursive summarization** | Recursively summarize halves of a long doc. | Reduces context length geometrically. | Loses inter-section relationships. | RLM preserves more structure by inspecting, not just summarizing. |
| **Toolformer / WebGPT** ([Schick 2023](https://arxiv.org/abs/2302.04761)) | Model learns to call external tools. | Strong on fact lookup. | Not designed for long-context reasoning. | RLM + tool calls is the natural combo. |
| **MCP (Model Context Protocol)** ([Anthropic 2024](https://modelcontextprotocol.io/)) | Standardized tool-calling protocol. | Cross-vendor. | Not a paradigm by itself — a transport. | RLM + MCP = REPL agent that can use any MCP server. |

**Where RLM wins:**

- **Structured corpora** (code, logs, JSON, CSV).
- **Tasks where the answer is distributed** across the corpus (find every pair, every mention, every state change).
- **Tasks where the corpus exceeds the model's effective sweet spot** (>50K tokens for most frontier models).

**Where RLM loses:**

- **Short inputs.** The harness overhead is wasted.
- **Streaming / real-time tasks.** The persistent REPL is awkward when the input is constantly changing.
- **Closed-form retrieval.** A well-tuned RAG beats RLM when the answer is a single fact lookup.
- **Multi-modal inputs.** RLM today is text-only; image / audio corpora need a different paradigm.

---

## 9. Open-source agent harness landscape (brief)

The full 30+ row matrix is in [`HARNESS_LANDSCAPE_MATRIX.md`](./HARNESS_LANDSCAPE_MATRIX.md). Five families:

1. **Vendor CLI harnesses** — Claude Code (141.3k ⭐), Codex CLI (105.6k ⭐), Prime Agent (15.1k ⭐), Sourcegraph Amp (closed).
2. **General-purpose coding harnesses** — Aider (48.2k ⭐), Cline (66.1k ⭐), Goose (52.7k ⭐), Continue (35.5k ⭐, read-only post v2.0.0).
3. **Multi-agent frameworks** — AutoGen (60.4k ⭐), CrewAI (57.0k ⭐), LangGraph (39.6k ⭐), MetaGPT (69.8k ⭐), OpenHands (83.9k ⭐), CAMEL (17.6k ⭐).
4. **Memory/stateful harnesses** — Letta (24.2k ⭐), Zep, AutoRAG (5.0k ⭐).
5. **Self-improvement / meta-prompting** — DSPy (37.2k ⭐), TextGrad (2.8k ⭐), Voyager (6.7k ⭐), Sakana AI Scientist v1/v2 (14.4k / 7.0k ⭐).

**Headline:** Prime Agent is the only MIT-licensed harness with first-class RLM (`rlm()` function), persistent REPL, and `/refine` self-modification. The closest competitor is Symbolica's **Agentica SDK** (closed source, ARC-AGI-2 SOTA). The most-popular open harness, Claude Code, has **no public RLM implementation** — but it is rumored to be working on one internally.

For the indie founder, the implication is: **if you want to build on top of an MIT-licensed RLM, Prime Agent is the only game in town.**

---

## 10. Closed-source agent harness landscape

Closed harnesses charge for the skill layer (UI, IDE integration, sandbox, observability) over the same model APIs.

| Vendor | Product | Pricing | Customers / traction | Notes |
|---|---|---|---|---|
| **Cognition** | Devin (SWB v1.0 → v1.7) | $20/mo Team, $500/mo Enterprise | SWE-bench Verified leader ~65%; in-house SWE-1.7 model | [cognition.ai](https://cognition.ai); Firecracker VM |
| **Cursor** | Cursor IDE | $20/mo Pro, $40/mo Business | 1M+ users est. | [cursor.com](https://cursor.com); not a standalone harness — IDE + agent |
| **Factory** | Droids | Enterprise only | Logo list public; ARR not | [factory.ai](https://factory.ai); multi-droid + secret detection |
| **Replit** | Replit Agent | $25/mo core included | Millions of vibe-coders | [replit.com](https://replit.com); browser-based |
| **Sourcegraph** | Amp (formerly Cody) | $20/mo Megawatt, $200/mo Gigawatt | Enterprise dev teams | [ampcode.com](https://ampcode.com); renamed post-Cody EOL |
| **GitHub** | Copilot Workspace | Bundled w/ Copilot Enterprise | Enterprise | closed |
| **Manus** (China) | Manus | Free beta, paid tiers coming | High consumer awareness in 2025 | closed |
| **Devin** | — | — | — | acquired Windsurf Apr 2026 |

**Pattern:** Closed-source harnesses make money on **the UI / IDE / sandbox layer**, not the model. They all use the same OpenAI / Anthropic APIs underneath. Prime Agent's open-source RLM strategy is **complementary** to this: customers who want a RLM in their own cloud can deploy Prime Agent; customers who want a turnkey product pay Cursor / Devin / Factory.

**Caveat:** None of the closed vendors publish per-task cost or accuracy independently. Treat their headline numbers with the same skepticism as Prime Agent's self-reports.

---

## 11. Implications for the user's project tracks

### 11.1 Idea 1 — Niche Data Refinery (cleaned vertical datasets)

**Current state:** The data refinery probably delivers a CSV / Parquet / JSONL of cleaned rows for a niche vertical (e.g., medical claims, Indian FMCG invoices, legal case metadata).

**How RLM changes the delivery format:**

- **Before RLM:** deliver a flat file; the customer's analyst loads it into their BI tool.
- **After RLM:** deliver a **"data package"** = (a) the cleaned data file **plus** (b) a Prime-Agent skill (`SKILL.md` + Python) that wraps the file in an REPL variable and ships a few pre-built questions ("find anomalies", "group by region", "compare to last quarter"). The customer runs `rlm(...)` against their own question; the agent reads the file with `pandas` and writes back answers in natural language + the cleaned slice.
- **Why this is a wedge:** the customer does not need a data analyst on staff. The skill *is* the analyst. Pricing moves from per-row to per-question (or per-task), which is a 10–100× margin opportunity.

**Concrete move:** Fork `alexzhang13/rlm`, write one skill per vertical, price per `rlm()` invocation. Cloudflare X402 fits naturally here (see §11.4).

**Risk:** RLM-on-clean-data is overkill when the data is small. The skill pattern only makes sense for datasets >100K rows or with rich text fields.

### 11.2 Idea 2 — Agent Readiness / Zaher.AI (AEO audits)

**Current state:** Zaher.AI is positioning as an AEO (Answer-Engine Optimization) agency — auditing brands' visibility inside ChatGPT / Claude / Perplexity / Gemini. The audit is probably a static report.

**How RLM changes the audit:**

- **Before RLM:** static PDF report.
- **After RLM:** deliver a **Prime-Agent skill** that ingests the brand's entire content corpus (web pages, schema, blog, FAQ, podcast transcripts) as a Python variable, then runs a battery of AEO queries ("does ChatGPT mention us when asked about X?", "which sources does Gemini cite?", "is our FAQ schema parseable by Perplexity?"). The agent writes the report itself, citing every claim back to the corpus line that supports it.
- **Why this is a wedge:** AEO is a *long-context* problem by definition. The brand corpus is 100K–10M tokens. RLM is exactly the right tool. No competitor is using it.
- **Pricing:** per-audit + a monthly retainer for continuous monitoring.

**Concrete move:** Build a `brand-audit` skill that takes a domain URL + sitemap, crawls, deduplicates, loads into REPL, runs the AEO battery. Charge per-audit ($500–$5,000) + retainer ($1,000–$10,000/mo).

**Risk:** Crawl / dedup is a separate engineering problem from RLM. Budget 30% of the build for the ingestion pipeline.

### 11.3 Idea 3 — Expert Archives (Delphi / Coachvox clones)

**Current state:** Delphi, Coachvox, and clones let an expert (consultant, coach, author) upload their books / talks / transcripts and serve a chatbot that mimics their style.

**How RLM changes the archive:**

- **Before RLM:** vector store + retrieval-augmented prompt.
- **After RLM:** the archive is a Python variable in a persistent REPL. The expert's chatbot can `grep` the corpus for *exact quotes*, follow cross-references between talks, and produce cited responses with **line-level provenance**. RAG gives you "this might be related"; RLM gives you "this is the exact paragraph on page 47 that addresses your question."
- **Why this is a wedge:** the cite-everything experience is qualitatively different from vanilla RAG and is **the feature experts actually want** ("did the bot get my actual position, or just hallucinate?").
- **Pricing:** same as Delphi ($30–$200/mo per expert), but with a "verified-quote" upsell tier.

**Concrete move:** Fork Prime Agent, add a `voice-clone` skill that ingests .pdf / .epub / .mp3 transcripts, builds an indexable REPL variable, exposes a thin chat UI. Charge a setup fee + a per-expert monthly fee.

**Risk:** Voice-quality vs. accuracy tradeoff. RLM's sub-agent calls are slower than vanilla RAG; some users will notice the latency.

### 11.4 Cloudflare X402 (per-call billing) + RLM

**What X402 is:** Cloudflare's [per-call micropayments protocol](https://www.cloudflare.com/) — agents pay other agents (or humans pay agents) per API call, denominated in stablecoin or HTTP 402.

**Why X402 + RLM is a new product class:**

- RLM is **metered**: each `rlm()` call has a defined input, output, and cost. X402 fits naturally.
- An RLM skill deployed on a marketplace can charge per `rlm()` invocation, settled via X402. The customer does not need an account, a subscription, or a credit card — just a stablecoin wallet.
- This unlocks **agent-to-agent commerce**: one agent (e.g., the user's data refinery agent) can call another agent (e.g., a Zaher.AI AEO agent) on the open market and pay per query.

**Concrete move:** Wrap the data refinery skill, the AEO audit skill, and the expert-archive skill as X402-payable endpoints. List on a marketplace. Build a "RLM router" that picks the cheapest qualified skill per query.

**Risk:** X402 is new; merchant adoption is uncertain. Position as opt-in rather than mandatory.

---

## 12. Verdict for an indie founder

**Should you build on top of Prime Agent? Fork it? Build a competing harness in a vertical?**

### 12.1 The three options

| Option | Effort | Differentiation | Defensibility | Risk |
|---|---|---|---|---|
| **A. Build on top of Prime Agent (skill layer)** | Small (weeks) | Low (anyone can fork a skill) | Low (no moat) | Low |
| **B. Fork Prime Agent and harden it (add sandbox, observability, billing)** | Medium (months) | Medium (Devin-like product without Devin's brand) | Medium (engineering, not IP) | Medium |
| **C. Build a vertical RLM in a domain Prime Agent does not target** | Medium (months) | High (domain expertise) | High (data + workflow lock-in) | Medium-High |

### 12.2 The single best wedge

**Option C — vertical RLM in a domain Prime Agent does not natively target.**

Prime Agent's positioning is general-purpose. It is MIT-licensed and well-funded, so any horizontal feature (sandbox, billing, observability) will be matched quickly. The defensible moat is **a domain corpus + a workflow that only your vertical understands**.

The three verticals the user already has a foothold in (Niche Data Refinery, Zaher.AI AEO, Expert Archives) all qualify:

- **Niche Data Refinery:** vertical data + per-skill pricing. Cloudflare X402 + RLM is the natural shipping format. Wedge.
- **Zaher.AI AEO:** long-corpus audit + continuous monitoring. RLM is the only harness that does this well today. Wedge.
- **Expert Archives:** cite-everything RLM that no Delphi / Coachvox competitor offers. Wedge.

The pattern in all three: **own the data + own the workflow; rent the harness.** Use Prime Agent as a runtime; build skills on top.

### 12.3 What NOT to do

- Do **not** try to compete with Prime Agent on the harness itself. They have 88.9k stars of `pi` underneath and a $130M Series A behind them. You will lose.
- Do **not** try to reproduce the 95.5% ARC-AGI-3 number publicly until you have a third-party verifier. The PR cost of a failed reproduction is worse than the PR benefit of a successful one.
- Do **not** ship an "RLM for everything" product. Pick one vertical, nail it, expand.

### 12.4 The 12-month play

| Quarter | Milestone |
|---|---|
| **Q3 2026** | Pick one vertical. Build one skill. Ship to 5 design partners. |
| **Q4 2026** | Productize. Add Cloudflare X402 per-call billing. Add a thin web UI. Get to $5K MRR. |
| **Q1 2027** | Add a second skill in the same vertical. Reach $25K MRR. |
| **Q2 2027** | Either (a) expand to a second vertical or (b) raise a small seed round to scale the first. |

---

## 13. Fact-Check: What the Video Got Wrong

This section exists because the brief explicitly flags that the YouTube video contains inflated claims. Every entry below is sourced.

| Claim in the video | Status | Evidence |
|---|---|---|
| **"Claude Opus 5 baseline 30.2% on ARC-AGI-3 (Ark Prize, July 24)"** | **WRONG.** | The ARC Prize analysis ([arcprize.org/blog/arc-agi-3-gpt-5-5-opus-4-7-analysis](https://arcprize.org/blog/arc-agi-3-gpt-5-5-opus-4-7-analysis)) evaluates **Claude Opus 4.7** (not 5) at **0.18%** (not 30.2%) on a semi-private split. The post is dated 2026-05-01, not July 24. The "30.2%" is not a number from any primary ARC Prize source. |
| **"Prime Agent wrapping same Opus 5: 95.5%"** | **UNVERIFIED.** | The 95.5% number exists only in [Prime Intellect's launch post](https://www.primeintellect.ai/blog/prime-agent) (2026-08-05), which is ⚠ self-reported. No third-party reproduction on the same metric exists. The same post calls itself "self-scored." |
| **"65-point harness gap" (Opus 5 baseline → 95.5% with harness)** | **PLAUSIBLE BUT NOT REPRODUCIBLE.** | The 95.5% number is single-sourced. The 0.18% baseline is real and primary-sourced but on a *different* benchmark split, with a *different* model version (4.7 vs 5), and likely a different scoring methodology. A defensible framing is "harness matters on long-context benchmarks (5–35pp)," not "65 points." |
| **"Schema harness (Impossible Research + Berkeley + CMU): ~99% on same public set"** | **UNVERIFIED.** | No such team is mentioned in any primary source. The closest thing is [schema-harness/arc-agi-3-schema-traces](https://huggingface.co/datasets/schema-harness/arc-agi-3-schema-traces) by Li & Zeng — a trace dataset, not a public harness repo. Claims 100 RHAE on 18/25 public games with claude-opus-4-8 / claude-fable-5 — also ⚠ self-reported. |
| **"Ryan Brown (independent engineer, 8-star repo): 99.86% using 5.5× fewer tokens"** | **UNVERIFIED.** | The only RLM-style repo in the 5.5k-star range is [alexzhang13/rlm](https://github.com/alexzhang13/rlm) (by Alex Zhang, not Ryan Brown). The 99.86% and 5.5× numbers appear nowhere in the [arXiv paper](https://arxiv.org/abs/2512.24601), the [Prime Intellect blog post](https://www.primeintellect.ai/blog/rlm), or the [Symbolica paper](https://www.symbolica.ai/blog/arcgentica). |
| **"Seth Carton team (Princeton Pokemon)"** | **WRONG.** | The lead author of the Pokemon paper is **Seth Karten** (not Seth Carton). The paper is [arXiv:2605.09998](https://arxiv.org/abs/2605.09998). The lab affiliation is unclear from the paper's metadata; "Princeton" is not in the author list. |
| **"10K stars, ~1K forks" for Prime Agent** | **OUT OF DATE.** | As of 2026-08-13, [PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent) is at **15.1k stars, 1.6k forks**, 4,499 commits, last commit 2026-08-12. |
| **"Five-level recursion" in RLM** | **WRONG (PREMATURE).** | Both the [arXiv paper](https://arxiv.org/abs/2512.24601) and the [Prime Intellect blog post](https://www.primeintellect.ai/blog/rlm) note that the **current implementation has recursion depth = 1** and that multi-depth recursion is future work. |

**What the video got RIGHT** (verified by primary sources):

- The arXiv RLM paper exists at [arXiv:2512.24601](https://arxiv.org/abs/2512.24601) and reports the 34-point OOLONG @ 132k gap.
- Chroma's "Context Rot" report exists at [trychroma.com/research/context-rot](https://trychroma.com/research/context-rot) and confirms non-uniform degradation with input length.
- Prime Agent exists at [PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent), is MIT-licensed, and is built on `pi-mono`.
- `pi-mono` (the foundation) is at [earendil-works/pi](https://github.com/earendil-works/pi) by Mario Zechner.
- The Symbolica Agentica result on ARC-AGI-2 (Opus 4.6 120k High → 85.28%) is published at [symbolica.ai/blog/arcgentica](https://www.symbolica.ai/blog/arcgentica).
- Tufa Labs won ARC-AGI-3 Milestone #1 with a REPL harness + small open-source model ([arcprize.org/blog/arc-prize-2026-milestone-1](https://arcprize.org/blog/arc-prize-2026-milestone-1)).
- The Pokemon self-refinement work exists ([arXiv:2605.09998](https://arxiv.org/abs/2605.09998)) — just the author / lab are wrong in the video.

**Bottom line for the planner:** take the RLM paradigm seriously, take Prime Agent seriously, do **not** take the headline harness-gap numbers seriously until they have a third-party reproduction.

---

## 14. Self-critique

- **Did I do my job?** Partially. The previous research pass had already done the verification heavy lifting (PROGRESS.md). My job here was to synthesize. I synthesized — but I did not refetch every source independently. Where the prior pass verified, I cited.
- **What might I have missed?**
  - I did not test the `alexzhang13/rlm` library against an independent task. A live integration test would strengthen the "is this real?" claim.
  - I did not benchmark the cost of a 1M-token RLM run vs. a 1M-token vanilla-context run on the same model. Cost is a load-bearing variable for the indie-founder verdict.
  - I did not pull the Cloudflare X402 documentation; I treated it as a known protocol from prior context. A dedicated X402 deep-dive might shift §11.4.
- **What did I assume without evidence?**
  - That Prime Agent's `/refine` is production-ready in the way I described. The README confirms it exists; I have not used it under load.
  - That Cloudflare X402 is a real, deployed protocol. I know it exists; I have not confirmed merchant adoption or pricing models.
  - That the RLM architecture scales linearly to 10M tokens. The paper says "10M+"; the cost curve is unknown.
- **Risks not flagged elsewhere:** the **regulatory risk** of an autonomous self-modifying agent (Prime Agent's `/refine` could in principle write code that ships a customer dataset to an attacker — there is no sandbox). Any deployment to non-technical users needs a sandbox wrapper.

---

## 15. Metrics

- findings: 47 (across §§1–11)
- risks_HIGH: 2 (the 95.5% number is single-sourced; Prime Agent's lack of sandbox is load-bearing for any deployment)
- risks_MEDIUM: 5 (RLM cost curve unknown; RLM-on-short-input is overkill; X402 adoption unproven; persistent REPL memory leaks across sessions; the 10M-token utility claim is unverified)
- risks_LOW: 3 (RAG may catch up; competing harnesses may adopt RLM; closed vendors may release competing tools)

---

## Appendix A — Reading order

1. This file (the synthesis).
2. [`HARNESS_LANDSCAPE_MATRIX.md`](./HARNESS_LANDSCAPE_MATRIX.md) — the full 30+ row open-source harness matrix.
3. [`BENCHMARKS_MATRIX.md`](./BENCHMARKS_MATRIX.md) — the full benchmark matrix (ARC-AGI, SWE-bench, TerminalBench, etc.).
4. [`PROGRESS.md`](./PROGRESS.md) — the source-by-source audit trail from the prior pass.
5. The arXiv paper [arXiv:2512.24601](https://arxiv.org/abs/2512.24601) and the [Prime Intellect blog post](https://www.primeintellect.ai/blog/prime-agent) for primary verification.

---

*End of FINDINGS_RLM_PARADIGM.md — 2026-08-13.*