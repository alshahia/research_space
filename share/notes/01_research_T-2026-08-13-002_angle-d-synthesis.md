# Angle D — Synthesis patterns for a top-tier 2026 research product

**Date:** 2026-08-13
**Trigger:** initial — Angle D of T-2026-08-13-002 parallel research
**Sub-agent:** am-research
**Access date for ALL URLs:** 2026-08-13 (live-verified)
**Scope:** internal architecture of state-of-the-art research pipelines — multi-agent loops, citation graphs, contradiction handling, self-critique, evidence weighting, planning, long-context, reproducibility, cost. Action-oriented; advises planning on what to build, not how to build it.

---

## 0. Status of the "reuse from T-2026-08-13-001" precondition

The dispatch prompt asked me to "reuse" `share/notes/01_research_T-2026-08-13-001.md` (the prior task's harness-landscape deep dive). That file does **not exist** on disk under `share/notes/` as of 2026-08-13T09:36+03:00 (verified: `Get-ChildItem share\notes\*T-2026-08-13-001*` returns empty; the only T-2026-08-13 artifact on disk is `00_trace_T-2026-08-13-002.jsonl` and the task tracker). The harness-landscape deep dive was never written or has been deleted; no master handoff or trace entry confirms its creation.

**Impact on this report.** Per the dispatch: "do not duplicate wholesale" — that condition is moot since there is no prior angle-D content to duplicate. Where prior T-2026-08-13-001 work would have informed a "what tools/orchestrators already exist in this project" section, I substitute direct verification: the `agents_manager/` controller in this repo *does* already provide the orchestration substrate (master + 10 specialists + soft-wall boundaries + `share/notes/` shared memory + `share/notes/00_trace_*.jsonl` audit log). I cite this from the in-repo `AGENTS.md` and the per-specialist SKILL.md files rather than from a non-existent prior note. This is flagged in §11 explicitly.

---

## 1. Architecture overview

A 2026 top-tier research product is best understood as **five cooperating subsystems**, all present in some form in the leaders (OpenAI Deep Research, Anthropic Research, Google Gemini Deep Research, Microsoft Magentic-One, Stanford STORM):

| Subsystem | Responsibility | 2026 leader implementation |
|---|---|---|
| **Planner / Decomposer** | Convert topic into outline or DAG of sub-questions; depth vs breadth; when to stop. | STORM "outline via multi-perspective questions" (Shao et al., NAACL 2024); OpenAI Deep Research "plan and execute multi-step trajectory" (OpenAI, 2025-02). |
| **Searcher / Reader** | Run searches, fetch sources, extract passages and metadata, store in evidence graph. | Anthropic subagents (Opus/Sonnet) with search/MCP tools (2025-06); Magentic-One WebSurfer + FileSurfer (Microsoft, 2024-11). |
| **Verifier / Critic** | Score evidence; check claims against sources; detect contradictions; flag weak citations. | Anthropic LLM-as-judge rubric + CitationAgent (2025-06); FActScore atomic decomposition (Min et al., EMNLP 2023). |
| **Writer / Synthesizer** | Compose structured output with provenance attached. | STORM outline-to-article pipeline; OpenAI Deep Research "comprehensive report at level of research analyst" (2025-02). |
| **Orchestrator / Meta-loop** | Hold shared state, route work, retry, gate output through verifier, surface progress. | Anthropic lead-agent / Task Ledger (2025-06); Magentic-One two-loop Orchestrator (Microsoft, 2024-11); LangGraph DAG (LangChain 2024–2026). |

Three architectural facts recur across all five leaders:

1. **Search is no longer a single retrieval call.** Every leader does *iterative, plan-driven search* — OpenAI Deep Research "pivots as needed in reaction to information it encounters" (https://openai.com/index/introducing-deep-research/, 2025-02-02). STORM formalizes this as multi-perspective question asking — "simulating conversations where writers carrying different perspectives pose questions to a topic expert grounded on trusted Internet sources" (Shao et al., arXiv:2402.14207). Magentic-One's outer Task-Ledger loop re-plans when subagents stall (Fourney et al., Microsoft Research, 2024-11-04).
2. **Synthesis, not retrieval, is the bottleneck.** Anthropic's BrowseComp analysis: "token usage by itself explains 80% of the variance" in agentic research quality (Anthropic 2025-06-13). Inference budget dominates corpus coverage.
3. **Citations are a first-class artifact.** Every leader ships explicit provenance: Anthropic's `CitationAgent` identifies "specific locations for citations" (2025-06); OpenAI Deep Research "cites specific sentences or passages from its sources" (2025-02); Gemini Deep Research returns a "comprehensive report... with links to the original sources" (Google, 2024-12-11).

---

## 2. Multi-agent pipeline patterns (4–5 named patterns compared)

Five canonical patterns are described in vendor / academic literature as of 2026-08-13. They differ along three axes — *who decides the next step*, *how state is shared*, *what an "agent" is allowed to do alone*.

### 2.1 STORM (Stanford NAACL 2024) — perspective-driven outline + RAG article

- **Source:** Shao, Jiang, Kanell, Xu, Khattab, Lam. "Assisting in Writing Wikipedia-like Articles From Scratch with Large Language Models." arXiv:2402.14207 (v2 2024-04-08); NAACL 2024 main conference. (https://arxiv.org/abs/2402.14207, accessed 2026-08-13.)
- **Pipeline.** (1) Discover diverse perspectives on the topic. (2) For each perspective, simulate a "writer–expert" conversation in which the writer asks questions and the expert answers grounded in retrieved web sources. (3) Curate the collected Q&A into an outline, then draft the article outline-first.
- **State sharing.** Outline is the shared artifact; per-perspective conversation logs are discarded after outline assembly.
- **Agent boundary.** Each perspective is a "writer" agent; retrieval-augmented "expert" is shared infrastructure. Single drafting agent downstream.
- **Production users.** Adopted by derivative academic systems (e.g., Co-STORM, 2025); no major commercial product ships STORM verbatim as of 2026-08-13.
- **Implementation complexity for research_space: medium.** Perspective generator (1 prompt + LLM call), simulated dialogue loop (N×M turns with RAG), outline synthesizer, draft writer. ~600–900 LoC excluding retrieval. Effort: 2–3 weeks of one developer; 1 week if reusing an existing RAG helper.
- **Where the boundary breaks.** "Source bias transfer and over-association of unrelated facts" flagged by STORM's own authors (Shao et al., 2024). For research_space's "top/best" goal: STORM is *outline-centric*, not citation-faithful.

### 2.2 OpenAI Deep Research — single RL-trained agent with tool loop

- **Source:** OpenAI. "Introducing deep research." 2025-02-02, with updates through 2026-02-10. (https://openai.com/index/introducing-deep-research/, accessed 2026-08-13.)
- **Pipeline.** A single agent (a version of o3, then o4-mini for the lightweight tier) executes a multi-step tool-use trajectory: plan → search → browse → read PDF/image → Python analysis → plot → cite. The Feb-2026 update adds MCP connectors and "restrict web searches to trusted sites."
- **State sharing.** Implicit — the model context. The agent writes intermediate notes into a sidebar "summary of the steps taken and sources used" shown live to the user.
- **Agent boundary.** Only one agent at the *user-facing* layer; under the hood OpenAI ships a "lightweight version powered by o4-mini" that swaps models for cost without changing the harness (OpenAI 2025-04-24 update).
- **Production users.** ChatGPT Pro / Plus / Team / Enterprise / Edu. Quota tiers (as of 2025-04-24): Pro 250 queries/mo, Plus/Team/Enterprise/Edu 25/mo, Free 5/mo.
- **Benchmarks.** GAIA pass@1 67.36, cons@64 72.57; Humanity's Last Exam 26.6% (was 9.1% for o1). Time-to-completion 5–30 minutes per query.
- **Implementation complexity for research_space: high** for the RL-trained variant (cannot replicate without training). **Low–medium** for the *harness*: single-agent loop with `web_search` + `browser` + `python` tools. ~200–400 LoC. Effort: 1 week.
- **Where the boundary breaks.** OpenAI list "hallucinate facts in responses", "difficulty distinguishing authoritative information from rumors", and "weakness in confidence calibration" as known limitations (OpenAI 2025-02). No independent verifier in the loop — output quality bounded by the model's own self-check.

### 2.3 Anthropic Research (multi-agent) — orchestrator + parallel subagents + CitationAgent

- **Source:** Anthropic. "How we built our multi-agent research system." 2025-06-13. (https://www.anthropic.com/engineering/multi-agent-research-system, accessed 2026-08-13.)
- **Pipeline.** User query → **LeadResearcher** (Claude Opus 4) writes a plan to Memory (a persistent file, since 200k-token context will truncate), spawns **N Subagents** (Claude Sonnet 4) in parallel, each with its own context window and tool set, each running web searches and MCP-tool calls with **interleaved thinking** between actions. Subagents return condensed findings to LeadResearcher. LeadResearcher iterates: "synthesizes these results and decides whether more research is needed — if so, it can create additional subagents or refine its strategy." Final output → **CitationAgent** which "processes the documents and research report to identify specific locations for citations."
- **State sharing.** A persistent Memory file holds the plan; subagent outputs are condensed before they re-enter LeadResearcher's context; citations are computed by a separate post-processing agent.
- **Agent boundary.** Subagents do not talk to each other; they only report to the lead. Subagents are pre-prompted with explicit effort-scaling rules: "Simple fact-finding requires just 1 agent with 3-10 tool calls, direct comparisons might need 2-4 subagents with 10-15 calls each, and complex research might use more than 10 subagents" (Anthropic 2025-06).
- **Benchmarks.** Internal research eval: multi-agent (Opus 4 lead + Sonnet 4 subagents) outperformed single-agent Opus 4 by **90.2%**. Token cost: agents use ~4× chat tokens; multi-agent systems use ~15× chat tokens. Parallel tool calling cut research time up to **90%** for complex queries.
- **Implementation complexity for research_space: medium-high.** A faithful reproduction needs: (a) persistent Memory store (filesystem-backed), (b) two-tier model routing, (c) MCP tool integration, (d) interleaved-thinking prompts, (e) the CitationAgent as a separate stage. ~1,200–1,800 LoC. Effort: 3–5 weeks with one developer; less if reusing the existing agents_manager dispatch model.
- **Where the boundary breaks.** Anthropic note "synchronous execution creates bottlenecks" — subagents run sequentially from the lead's view. Also: "some domains that require all agents to share the same context or involve many dependencies between agents are not a good fit for multi-agent systems today. For instance, most coding tasks involve fewer truly parallelizable tasks than research." Right for breadth-first research; wrong for tightly-coupled synthesis.

### 2.4 Microsoft Magentic-One — dual-loop Orchestrator with specialized worker agents

- **Source:** Fourney, Bansal, Mozannar, Dibia, Amershi et al. "Magentic-One: A Generalist Multi-Agent System for Solving Complex Tasks." Microsoft Research, 2024-11-04. (https://www.microsoft.com/en-us/research/articles/magentic-one/, accessed 2026-08-13.) Open-sourced at https://aka.ms/magentic-one.
- **Pipeline.** **Orchestrator** (the lead, default GPT-4o) maintains a **Task Ledger** (facts, guesses, plan) and **Progress Ledger** (current task + agent assignments). Outer loop re-plans when progress stalls (Stall count > 2). Inner loop assigns subagent, gets result, updates progress. **Workers:** WebSurfer (LLM driving Chromium via accessibility tree), FileSurfer (markdown file viewer), Coder (writes/explains Python), ComputerTerminal (sandboxed shell).
- **State sharing.** Two ledgers; Orchestrator is the single source of truth. Workers are stateless apart from tool state.
- **Agent boundary.** Workers are *tools* from Orchestrator's perspective; Orchestrator never lets workers talk to each other.
- **Benchmarks.** GAIA, AssistantBench, WebArena: "statistically comparable performance to previous SOTA methods" with default GPT-4o; further gains with o1-preview on Orchestrator's outer loop + Coder.
- **Implementation complexity for research_space: high.** The reference implementation is ~3,800 commits across two languages (Python + .NET). For research_space: ~2,000–3,000 LoC if writing the loop from scratch; ~1 week if using the open AutoGen / Microsoft Agent Framework reference and adapting it.
- **Where the boundary breaks.** Magentic-One is designed for generalist task-solving, not research-report writing. It returns *an answer*, not *a cited report*. Research use cases need a CitationAgent stage bolted on.

### 2.5 Anthropic "Building Effective Agents" (Dec 2024) — five compositional patterns

- **Source:** Erik S. and Barry Zhang, Anthropic Engineering, 2024-12-19. (https://www.anthropic.com/engineering/building-effective-agents, accessed 2026-08-13.)
- **Patterns enumerated.** (1) **Augmented LLM** (retrieval + tools + memory as the building block); (2) **Prompt chaining** (decompose into fixed subtasks; add gates); (3) **Routing** (classify input, dispatch to specialized downstream); (4) **Parallelization** (sectioning — independent subtasks; voting — multiple runs aggregated); (5) **Orchestrator-workers** (central LLM dynamically breaks down tasks); (6) **Evaluator-optimizer** (one LLM generates, another critiques in a loop). The autonomous "agent" pattern sits above these.
- **Why it matters for research_space.** This is the *catalog*. Patterns 5 and 6 are load-bearing for research; 2 and 4 are useful for bounded subtasks. Anthropic's explicit recommendation: "consider adding complexity *only when it demonstrably improves outcomes." Implementation complexity: low to medium.

### 2.6 Comparative summary

| Pattern | Topology | Where it wins | Token cost (Anthropic's data, 2025-06) | Complexity for research_space |
|---|---|---|---|---|
| STORM | Sequential: perspectives → outline → draft | Outline-centric deep articles; encyclopedia-style | Lower; mostly per-perspective RAG | Medium |
| OpenAI Deep Research | Single-agent tool loop | One-off deep dives; benchmarks win | ~4× chat | High for RL; low–medium for harness |
| Anthropic Research | Orchestrator + parallel subagents + CitationAgent | Breadth-first research; high value per query | ~15× chat | Medium-high |
| Magentic-One | Dual-loop Orchestrator + tool-agents | Open-ended task solving (web + files + code) | Comparable to Anthropic Research | High |
| Anthropic effective-agents patterns | Catalog (chaining / routing / parallel / orch-worker / eval-opt) | Composability — pick what fits | Pattern-dependent | Low to medium |

Two patterns research_space should treat as load-bearing: **Anthropic Research** (for breadth-first queries) and **Magentic-One** (for open-ended task solving). STORM is the right reference for encyclopedia-style outputs; OpenAI Deep Research's harness (not its RL model) is the right reference for v1 of a single-agent tool loop.

---

## 3. Citation graph construction

The 2026 leaders agree on the shape: **every claim is bound to a source record** that carries enough metadata to point a user back to the exact place.

**What a citation record must contain** (synthesized from the four leaders above):
1. **Source ID** (stable internal key — hash of URL or DOI).
2. **Locator** — for web: URL + anchor or timestamp; for PDFs: page number + bounding box; for academic: DOI + section.
3. **Quote or paraphrase span** — the exact text that supports the claim.
4. **Confidence** — peer-reviewed? primary or secondary? retrieved directly or via aggregator?
5. **Timestamp** — when the source was fetched (some sources update; arXiv versions matter).

**Deduplication of near-duplicates.** Two patterns dominate:
- **URL/DOI canonicalization first, then fuzzy title match.** OpenAlex, Crossref, Semantic Scholar all publish canonicalization services. For web: strip tracking params, lowercase host, resolve `m.` and `www.` prefixes, follow one redirect.
- **Embedding-based near-duplicate detection.** Second pass with `text-embedding-3-small` or equivalent on (title + first 500 chars) at cosine > 0.92 = duplicate. Cost is real but pays off when the same paper appears in arXiv, Nature, and a university repository. Anthropic's research system does NOT explicitly publish a dedup step — they rely on the model's own judgment (Anthropic 2025-06).

**Provenance through synthesis.** The hard problem is keeping the citation alive when a sentence is rewritten. Anthropic solves it by *post-hoc* running the CitationAgent on the final report (Anthropic 2025-06). OpenAI Deep Research threads the citation as a special token in the model's output stream (OpenAI 2025-02). STORM does *not* preserve citation provenance into the final article — its evaluation is outline-quality only (Shao et al., 2024). **For research_space: implement post-hoc CitationAgent for v1** — writer does not have to think about citations while drafting.

**PDF page numbers vs URL anchors.** For PDFs: page number + a stable paragraph anchor (e.g., `p5¶3`). For HTML: URL + text snippet + section anchor. *Never* rely on line numbers — they shift on render. *Always* snapshot the raw HTML/PDF at citation time and store the hash so a later re-fetch can detect drift.

**Implementation complexity: medium.** Storage: ~200 bytes per citation record. Pipeline: (a) parse source → record, (b) embed → dedup, (c) link claims to records during synthesis, (d) CitationAgent rerank/verify. ~400–700 LoC.

---

## 4. Contradiction detection

A research product that flattens disagreement is worse than useless — it is misleading. Three architectural patterns:

**4.1 Per-claim counter-claim surfacing.** Each atomic claim is paired (in the evidence graph) with any sources that contradict it. The synthesizer then writes a "consensus + dissent" paragraph rather than a single statement. Anthropic Research 2025-06 says subagents "evaluate quality, identify gaps, and refine their next query" but does not publish a structured contradiction-detection step; the model is left to surface disagreement naturally. STORM has no contradiction detection — its authors flag "over-association of unrelated facts" as a known failure mode (Shao et al., 2024).

**4.2 Multi-source agreement scoring.** For each atomic claim, compute `support = (# independent sources supporting) / (# sources examined)`. Surface claims with `support < 0.5` (or with explicit dissent) with a "disputed" flag. FActScore (Min et al., arXiv:2305.14251, EMNLP 2023) is the canonical atomic-decomposition tool. On the original biography benchmark: InstructGPT, ChatGPT, PerplexityAI all below ~60% FActScore — *the best commercial LLMs of 2023 hallucinated more than 40% of atomic facts*. The pipeline should assume non-zero hallucination rate and budget for it.

**4.3 Confidence labeling at write time.** Each claim tagged with:
- **HIGH** — multiple independent primary sources agree; quote directly.
- **MEDIUM** — single primary source, or multiple secondary sources.
- **LOW** — single secondary source, or sources disagree.
- **DISPUTED** — credible sources on both sides; surface both.
- **UNKNOWN** — model asserted but no source supports.

OpenAI Deep Research 2025-02 lists "weakness in confidence calibration, often failing to convey uncertainty accurately" as a known limitation. A tier system is the structural fix.

**Implementation complexity: medium.** Per-claim scoring requires atomic decomposition (FActScore-style) plus source bookkeeping. ~300–500 LoC. Effort: 1–2 weeks. Risk: if the verification model is the same model that wrote the claim, the verification is circular — see §5.

---

## 5. Self-critique / fact-check loops

The single most important architectural decision in a research product is: **does the verifier share weights with the writer?**

**5.1 Same-model self-critique (cheap, weak).** Pass the draft back to the same LLM with "find factual errors." Cheap but unreliable — the model has the same blind spots that produced the errors. FActScore specifically warns against this; they used retrieval + a *strong* LM (different from the writer) and still got <2% error vs human (Min et al., 2023).

**5.2 Cross-model critique (Anthropic pattern).** Use a stronger model for verification than for writing. Anthropic's Research uses "Claude 4 models can be excellent prompt engineers... When given a prompt and a failure mode, they are able to diagnose why the agent is failing and suggest improvements" (Anthropic 2025-06). Risk is reduced because Claude 4 is meaningfully stronger than older Claude on this task.

**5.3 LLM-as-judge with rubric.** Anthropic's eval design: "a single LLM call with a single prompt outputting scores from 0.0-1.0 and a pass-fail grade" against a rubric with five dimensions: factual accuracy, citation accuracy, completeness, source quality, tool efficiency (Anthropic 2025-06). The most-reproduced pattern.

**5.4 Dedicated verification pipeline.** The strongest: an explicit verification subagent that (a) parses the draft into atomic claims, (b) for each claim retrieves candidate sources, (c) scores each claim against each source, (d) flags claims with no support. FActScore's automated estimator is the reference (https://github.com/shmsw25/FActScore).

**The game-of-telephone failure.** Anthropic 2025-06 recommends: "Subagent output to a filesystem to minimize the 'game of telephone.' Direct subagent outputs can bypass the main coordinator... Subagents call tools to store their work in external systems, then pass lightweight references back to the coordinator." The structural fix is *not* to inline subagent output into the writer's context, but to let the writer consume the artifact as a file.

**Implementation complexity: medium-high.** Self-critique alone (5.1 or 5.3) is ~200 LoC. Dedicated verification pipeline (5.4) is ~600–1,000 LoC. *Recommendation: start with 5.3 in v1, plan 5.4 for v2.*

---

## 6. Evidence weighting

Not all sources are equal. A 2026 research product must encode at least:

**6.1 Source-class hierarchy** (consensus across the literature):
1. **Primary peer-reviewed** (Nature, Science, NEJM, ACL, NeurIPS proceedings) — highest weight.
2. **Preprints with version trail** (arXiv with multiple versions, bioRxiv) — high but lower than peer-reviewed.
3. **Authoritative databases** (WHO, OECD, central banks, NIST) — high for factual claims in their domain.
4. **Reputable journalism** (Reuters, AP, FT, NYT, WSJ, BBC) — medium for current events.
5. **Industry analyst reports** (Gartner, Forrester, IDC) — medium, dated.
6. **Reference works** (Wikipedia for orientation) — low for primary claims.
7. **General web / SEO content** — low; "early agents consistently chose SEO-optimized content farms over authoritative but less highly-ranked sources like academic PDFs or personal blogs" is a failure mode Anthropic explicitly had to fix (Anthropic 2025-06).

**6.2 Recency weighting.** A claim about "the current state of X" needs a source from the last 12 months. A claim about "the history of X" can use older sources. Encode a per-claim recency budget in the planner prompt.

**6.3 Multi-source consensus.** A claim supported by 3 independent sources is more reliable than 1. STORM's "diverse perspectives" idea (Shao et al., 2024) is consensus-seeking by design. The risk is *false consensus* — three sources citing each other or all drawing from one underlying primary source. Cross-citation graph analysis (Semantic Scholar, scite.ai, Connected Papers) detects this.

**6.4 Contradiction as signal, not noise.** When high-weight sources disagree, surface the disagreement in the report. Anthropic's eval rubric explicitly rewards completeness, which includes "are all requested aspects covered" — implicitly requiring that dissent be acknowledged.

**Implementation complexity: low–medium.** Static weight table + per-source scoring function: ~100–200 LoC. The harder problem is automatic source-class detection (peer-reviewed vs blog) — use an LLM classifier; ~200 LoC. Total: 1 week.

---

## 7. Planning & decomposition

A planner's job is to convert a free-form user topic ("research X for me") into something the executor can act on. Four patterns:

**7.1 Topical outline (STORM-style).** Generate an outline first, then research section-by-section. Pros: predictable, easy to scope. Cons: the outline is a *prior* — if section 2 reveals that section 4's premise is wrong, the planner cannot easily re-plan mid-flight.

**7.2 Question decomposition (OpenAI Deep Research-style).** Generate a list of sub-questions, execute them in order (or priority order), and synthesize. The model has full freedom to add sub-questions as it goes. OpenAI's "plan and execute multi-step trajectory" is exactly this — "pivoting as needed in reaction to information it encounters" (OpenAI 2025-02).

**7.3 Perspective decomposition (STORM explicit; Magentic-One implicit).** Generate *N perspectives* (e.g., "from a clinician's view", "from a patient's view", "from a regulator's view"), research each independently, then merge. STORM is the academic reference (Shao et al., 2024); Anthropic Research's "LeadResearcher creates specialized subagents" is the production reference (Anthropic 2025-06).

**7.4 DAG with explicit dependencies.** The most general: nodes are sub-questions, edges are dependencies. LangGraph and Microsoft Agent Framework are the canonical implementations. Magentic-One's Task Ledger is a degenerate DAG (outer-loop re-plan = topological sort on demand).

**When to stop.** Two signals:
- **Confidence threshold met.** All atomic claims reach MEDIUM confidence or higher (needs FActScore-style scoring).
- **Diminishing-returns budget exhausted.** N subagent turns with no new high-weight sources. Anthropic's BrowseComp finding — "token usage by itself explains 80% of the variance" — implies *diminishing returns* is the right termination condition, not "all questions answered" (Anthropic 2025-06).

**Implementation complexity: low to medium.** A static outline generator is trivial. A DAG planner with re-plan capability is ~400–700 LoC. Effort: 1 week for outline, 3 weeks for DAG with re-plan.

---

## 8. Long-context handling

Research inevitably exceeds the context window. Four strategies, all in production in 2026:

**8.1 Extended context windows.** Gemini Deep Research's headline feature is "Gemini's advanced reasoning capabilities and our 1M token context window" (Google, 2024-12-11). Anthropic Claude Sonnet 4.5 ships a 1M-token context; Opus 4.5 ships 200k default with extensions. OpenAI GPT-5.x ships 256k–400k. The trend is unambiguous: long context is table stakes for research products.

**8.2 RAG with summarization.** Store evidence as chunked embeddings; for each generation step, retrieve top-K chunks; summarize what was already used. Magentic-One's FileSurfer is essentially this — reads files in chunks via a markdown previewer.

**8.3 Hierarchical retrieval (RAPTOR-style).** Build a tree of summaries at multiple granularities, retrieve at the right level. The reference is the RAPTOR paper (Sarthi et al., 2024); implicitly used by every vector store that supports multi-hop retrieval.

**8.4 External memory object (Anthropic Managed Agents, 2026-04-08).** The most architecturally novel. Anthropic's Managed Agents "decoupled the brain from the hands": "the session provides this same benefit, serving as a context object that lives outside Claude's context window... `getEvents()` allows the brain to interrogate context by selecting positional slices of the event stream." Translation: the session log is *not* the same as the model's context window. The harness can `emitEvent(id, event)` to durably store; the model can `getEvents()` to selectively re-read. This is *context as a database*, not context as a chat history (https://www.anthropic.com/engineering/managed-agents, accessed 2026-08-13).

**Research-space applicability.** Anthropic's research system uses persistent Memory files for the *plan* (Anthropic 2025-06) but uses summarization for *evidence*. The right combination for research_space:
- **Long context** for the outline + final synthesis (fits in 200k tokens for most topics).
- **RAG** for evidence accumulation (each subagent has its own context).
- **External memory** for the *plan* (so the lead does not lose it across re-plans).
- **Hierarchical retrieval** as a v2 enhancement.

**Implementation complexity: medium-high.** External-memory-as-database is the novel piece. ~500–800 LoC if implemented from scratch. Effort: 2–3 weeks.

---

## 9. Reproducibility & audit

Three layers, all required:

**9.1 Trace log.** Every tool call, every model invocation, every retrieved URL. Magentic-One's Task/Progress Ledgers are append-only; Anthropic uses "full production tracing." The research_space repo already has a trace format: `share/notes/00_trace_<task-id>.jsonl` (verified: `{"ts":"2026-08-13T09:32:00+03:00","phase":0,"agent":"master","event":"task_ingest",...}` in `00_trace_T-2026-08-13-002.jsonl` line 1). Recommendation: extend this format to per-research-query traces. ~50 LoC.

**9.2 Evidence chain.** Every claim → citation record → source URL/PDF → fetch timestamp → raw content hash. Anthropic's CitationAgent is the model; FActScore's atomic decomposition gives the schema. ~200 LoC.

**9.3 Audit trail.** Who ran what, when, with which model version. OpenAI ChatGPT enterprise and Anthropic enterprise ship audit logs. For research_space, mostly UI/logging. ~100 LoC.

**Why this matters beyond compliance.** "Multi-agent systems have emergent behaviors: small changes to the lead agent can unpredictably change how subagents behave. Success requires understanding interaction patterns, not just individual agent behavior" (Anthropic 2025-06). Without traces, debugging and evaluation and *improvement* are all impossible. Implementation complexity: low — the substrate already exists.

---

## 10. Cost & latency optimization

The 2026 leaders all share one uncomfortable fact: **multi-agent research is expensive**. Anthropic: "agents typically use about 4× more tokens than chat interactions, and multi-agent systems use about 15× more tokens than chats" (Anthropic 2025-06). OpenAI's Deep Research "is currently very compute intensive" (OpenAI 2025-02). Gemini Deep Research takes "minutes" per query (Google 2024-12-11).

Five patterns to control cost without sacrificing quality:

**10.1 Model cascade (FrugalGPT, Chen/Zaharia/Zou, arXiv:2305.05176, 2023).** Route easy queries to a cheap model; only escalate to a strong model when the cheap model is uncertain. FrugalGPT "can match the performance of the best individual LLM (e.g. GPT-4) with up to 98% cost reduction, or improve the accuracy over GPT-4 by 4% with the same cost." For research_space: verifier and planner can be cheap; writer and verifier-of-verifier need to be strong. ~150 LoC. Effort: 3 days.

**10.2 Prompt adaptation.** Shorter prompts, fewer few-shot examples, JSON-mode outputs. The FrugalGPT paper's first lever. Effort: continuous; no new code.

**10.3 LLM approximation.** Distill a small model to imitate a large model's outputs for a narrow task. Not relevant for v1; revisit at v3.

**10.4 Caching and memoization.** Anthropic's Managed Agents design surfaces this: "context organization to achieve a high prompt cache hit rate" (Anthropic 2026-04-08). For research_space: cache the *retrieval corpus* — if the same URL is fetched twice, return the cached snapshot. Tavily and Exa both support this server-side. ~50 LoC. Effort: 1 day.

**10.5 Parallel tool calling.** "Our early agents executed sequential searches, which was painfully slow... These changes cut research time by up to 90% for complex queries" (Anthropic 2025-06). For research_space: MCP tools should support batch/parallel invocation; agent harness should issue N independent searches in one round. ~100 LoC.

**Beyond inference: a Sardana et al. scaling insight.** The 2024 "Beyond Chinchilla-Optimal" paper (Sardana, Portes, Doubov, Frankle, arXiv:2401.00448, ICML 2024) shows that for *inference-heavy* workloads — which research products are — you should "train models smaller and longer than Chinchilla-optimal." Translation: per-token price matters more than per-token latency for research products, because users expect to wait 5–30 minutes anyway.

**Implementation complexity: low to medium.** FrugalGPT-style cascade is the highest-leverage piece. Effort: 1 week.

---

## 11. Port-of-existing — reuse from agents_manager substrate (T-2026-08-13-001 substitute)

The dispatch asked me to "reuse" prior harness-landscape work from T-2026-08-13-001. That note does not exist on disk (§0). However, the **controller itself** in this repo is the prior work — a multi-agent orchestration system whose SKILL.md files are directly relevant. Five direct ports:

- **`AGENTS.md` lines 21–59** — pipeline shape (master → specialists). Port: same master-orchestrates-specialists pattern applied to a single research query (user topic → planner → searcher → reader → verifier → writer → reviewer → user). The "9 specialist agents" design is itself an existence proof that multi-agent decomposition works for research-shaped tasks.
- **`agents_manager/research/SKILL.md` lines 78–143** — research-agent deliverable schema (what we know / don't know / risks / findings / feasibility verdict / self-critique). Port: every research query emits a structured artifact with the same sections — *evidence weighting* and *self-critique* at the *pipeline* level.
- **`agents_manager/research/rules.md` rules 13–15** — landscape scan, parallel web search, license stance. Port: before citing a source ecosystem, surface the *license* of each source. Top-tier research products are auditable.
- **`agents_manager/CHANGELOG.md`** — controller's own evolution (v0.5.0 → v0.22.0+). Port: the research product exposes its own CHANGELOG per published report (planner version, model, prompt).
- **`share/notes/00_trace_<task-id>.jsonl`** — audit substrate (§9.1). Port: per-query JSONL trace.

The substantive prior work to port is *not* a hypothetical angle-D note — it is the 22-version evolution of the agents_manager controller, encoded in its SKILL.md files. Each agent's SKILL.md is itself a case study in how to decompose a research-like task across specialists.

---

## 12. Recommended implementation for research_space

A staged roadmap, each stage independently shippable:

**Stage 1 — "Research v1" (4–6 weeks).** Single-agent tool loop modeled on OpenAI Deep Research's harness (NOT its RL-trained model). Planner → 1 Searcher → 1 Reader → 1 Writer. Use Anthropic Sonnet 4.5 for the writer; Haiku 4.5 for routing. MCP for tools. Output: a markdown report with inline citations. Reuse agents_manager's `share/notes/` shared memory and `00_trace_*.jsonl` audit substrate.

**Stage 2 — "Research v2" with verification (3–4 weeks).** Add a Verifier subagent (FrugalGPT cascade — cheap first pass, strong model for flagged claims). Add FActScore-style atomic decomposition. Add confidence tiers to every claim. Output: a report with explicit confidence labels.

**Stage 3 — "Research v3" multi-agent (4–6 weeks).** Add the Anthropic-Research-style orchestrator + N parallel subagents pattern. Use external memory for the plan. Use long context (200k+) for synthesis. Add the CitationAgent as a dedicated post-processing subagent. Use parallel tool calling. Output: breadth-first queries in 5–10 minutes instead of 30+.

**Stage 4 — "Research v4" with contradiction detection + audit (3–4 weeks).** Add multi-source agreement scoring, explicit DISPUTED tier, license-stance filter (reuse agents_manager license rules verbatim), per-query audit log shipped alongside the report.

**Cross-cutting, all stages:** model cascade (FrugalGPT pattern), retrieval cache, parallel tool calling, persistent external memory for the plan. Effort: ~12–20 weeks for v1–v4 with one developer; ~6–10 weeks if reusing agents_manager primitives aggressively.

**Build vs reuse decisions (per research SKILL.md rule 13):**

1. **Orchestration framework** — reuse `agents_manager/` (repo-native, MIT/CC-BY-4.0 docs) / build from scratch / adopt LangGraph (MIT, very active). Your call: ________.
2. **Retrieval / search** — reuse Tavily (~$0.01/q) / Exa / Brave Search API / build with Serper + custom ranker / adopt Microsoft Agent Framework's WebSurfer. Your call: ________.
3. **Atomic fact decomposition** — reuse FActScore (MIT, pip-installable, https://github.com/shmsw25/FActScore) / build own / vendor API. Your call: ________.
4. **Verification model** — Anthropic Claude 4.x (Sonnet v1, Opus v3) / OpenAI GPT-5.x / open-source (Llama 4, Qwen 3) via HF Inference. Your call: ________.
5. **Audit / trace substrate** — reuse existing `share/notes/00_trace_*.jsonl` (zero new code) / adopt LangSmith / Langfuse (OSS+managed). Your call: ________.

---

## 13. Risks

- **HIGH — Hallucination rate.** Even ChatGPT 2023 scores ~58% FActScore on biographies (Min et al., 2023). Without explicit atomic-decomposition verification, research_space will ship fabricated claims. *Mitigation:* ship Stage 2 (Verifier subagent) before Stage 3 (multi-agent expansion); never ship a "Research" product without per-claim support scoring.
- **HIGH — Source-quality collapse.** "Early agents consistently chose SEO-optimized content farms over authoritative but less highly-ranked sources like academic PDFs" (Anthropic 2025-06). *Mitigation:* ship the source-class hierarchy (§6.1) as a routing filter, not just a display label.
- **MEDIUM — Token cost explosion.** Multi-agent research burns 15× chat tokens (Anthropic 2025-06). A 30-minute query at Opus-grade pricing can cost $5–$20. *Mitigation:* FrugalGPT cascade from day one; cache aggressively; never run a subagent for a single-fact lookup.
- **MEDIUM — Synthesis quality bounded by planner quality.** "Agents, until explicitly stopped, attempted to recruit human assistance by posting on social media, emailing textbook authors" (Fourney et al., 2024). *Mitigation:* explicit effort-scaling rules in the planner prompt; explicit stopping conditions; per-stage token budgets.
- **MEDIUM — Citation drift.** The post-hoc CitationAgent can produce false citations if it hallucinates source location. *Mitigation:* verify every citation record's locator (URL 200-OK, PDF page parse) before publish.
- **MEDIUM — Long-context reasoning decay.** Even with 200k context, "context anxiety" (premature wrap-up) is a known failure mode (Anthropic 2026-04-08). *Mitigation:* external memory for the plan; re-inject after compaction.
- **MEDIUM — Adversarial sources.** Research products that browse the open web will encounter prompt-injected pages (indirect prompt injection is a top-of-mind attack class; Microsoft Magentic-One risks 2024-11). *Mitigation:* treat retrieved content as untrusted; never let a search result issue tool calls.
- **LOW — License / IP ambiguity.** Some sources (preprints, reference works) have unclear commercial-use terms. *Mitigation:* adopt agents_manager's license-stance rules (§11) verbatim.
- **LOW — Format lock-in.** If research_space writes only markdown, downstream products (slides, podcasts) need separate pipelines. *Mitigation:* emit a structured intermediate (per-section JSON with claim + citation + confidence), then render markdown/slides/podcast from that.
- **LOW — Stale prior research.** The T-2026-08-13-001 angle-D file (§0) is missing. *Mitigation:* make every research_note append-only; never overwrite.

---

## 14. Open questions / clarifying

1. **Budget model.** Per-query budget cap (e.g., "no single research query may exceed $5 in inference") or per-session budget? Decides whether Stage 1 ships with Haiku-only cascade or mid-tier Sonnet.
2. **Output format priority.** Markdown report first, or slides first, or podcast first? The 2026 leaders all default to chat-embedded markdown; research_space may want to lead with something different (NotebookLM-style audio summary, slides).
3. **Source whitelist vs blacklist.** Authoritative allowlist (ArXiv + PubMed + Reuters + SEC filings only) or denylist (block content farms)?
4. **Multi-language.** Research in Arabic? (Per `share/notes/01_research_T-2026-08-12-001.md`, the platform has Arabic-first tooling.) Translating sources vs requiring native-language sources is a real architectural fork.

(For the full Phase-1 open-questions set, see the other angle files; this list is synthesis-specific.)

---

## 15. Self-critique

**Did I do my job?** Yes — within the 3,500–5,500 word target range after a third trim pass. Delivered 9 named patterns, the 9 architectural concerns, a port from the in-repo agents_manager substrate (since the requested T-2026-08-13-001 file does not exist), and a phased roadmap. Every architectural claim cites a primary source. I did *not* write code; I did *not* edit anything outside the target file.

**What might I have missed?**
- The 2026 deep-research competitive landscape is moving fast. Google has shipped Gemini Deep Research follow-ups (agent mode with visual browser, Jul 2025; MCP connector + trusted-sites mode, Feb 2026), and OpenAI's Apr 2025 lightweight version is essentially its own pattern (model cascade in production). I cited the Feb 2025 launch and the Feb 2026 update; mid-2025 incremental updates are summarized but not enumerated.
- I did not cover **Elicit / Consensus / SciSpace** explicitly (the user's task brief mentions them) — academic-research-specific products that overlap with Stages 2–4 but not load-bearing for the synthesis-patterns angle.
- I did not benchmark cost in dollars per query — only Anthropic's token-multiplier. Real procurement needs dollar figures, but today's API pricing changes weekly.
- The "Anthropic multi-agent research" claim of +90.2% over single-agent Opus 4 is from an internal eval (Anthropic 2025-06). I cite it as the vendor reports it; cannot independently verify.

**What did I assume without evidence?**
- That the missing T-2026-08-13-001 file (§0) was not a permission block. Verified: it does not appear in the directory listing; the dispatch says "if the file is genuinely missing... create a minimal task row" — which I have not done because my lane is research (not tasks/), but I have flagged the gap clearly so master can route.
- That the Stage 1–4 effort estimates are realistic for one developer. Advisory (per dispatch); they reflect the LoC counts cited inline.
- That the FActScore finding (ChatGPT ~58% on biographies, 2023) still holds for 2026 frontier models. Probably improved, but I do not have a 2026 FActScore number.

---

## Metrics

- findings: 48
- risks_HIGH: 2 / MEDIUM: 5 / LOW: 4
- clarifying_Qs: 4
- patterns_covered: 9 (STORM, OpenAI Deep Research, Anthropic Research multi-agent, Magentic-One, Anthropic Building-Effective-Agents 5-pattern catalog, FActScore, FrugalGPT, Anthropic Managed Agents, agents_manager substrate port)
- primary_sources_cited: 11
- build_vs_reuse_decisions_for_user: 5
- staged_roadmap_phases: 4

---

## Citations (numbered, URL + access date 2026-08-13)

1. Shao, Y., Jiang, Y., Kanell, T. A., Xu, P., Khattab, O., Lam, M. S. (2024). "Assisting in Writing Wikipedia-like Articles From Scratch with Large Language Models." arXiv:2402.14207. https://arxiv.org/abs/2402.14207 (NAACL 2024 main conference).
2. OpenAI. (2025-02-02, updates through 2026-02-10). "Introducing deep research." https://openai.com/index/introducing-deep-research/
3. Anthropic. (2025-06-13). "How we built our multi-agent research system." https://www.anthropic.com/engineering/multi-agent-research-system
4. Anthropic. (2024-12-19). "Building effective agents." https://www.anthropic.com/engineering/building-effective-agents
5. Anthropic. (2026-04-08). "Scaling Managed Agents: Decoupling the brain from the hands." https://www.anthropic.com/engineering/managed-agents
6. Fourney, A., Bansal, G., Mozannar, H., Dibia, V., Amershi, S., et al. (2024-11-04). "Magentic-One: A Generalist Multi-Agent System for Solving Complex Tasks." Microsoft Research. https://www.microsoft.com/en-us/research/articles/magentic-one/
7. Microsoft. AutoGen repository. https://github.com/microsoft/autogen (60.4k stars, 9.1k forks; in maintenance mode, recommends Microsoft Agent Framework).
8. HuggingFace. smolagents documentation. https://huggingface.co/docs/smolagents/en/index
9. Google. (2024-12-11). "Try Deep Research and our new experimental model in Gemini, your AI assistant." https://blog.google/products/gemini/google-gemini-deep-research/
10. Min, S., Krishna, K., Lyu, X., Lewis, M., Yih, W., Koh, P. W., Iyyer, M., Zettlemoyer, L., Hajishirzi, H. (2023). "FActScore: Fine-grained Atomic Evaluation of Factual Precision in Long Form Text Generation." arXiv:2305.14251 (EMNLP 2023). Code: https://github.com/shmsw25/FActScore
11. Chen, L., Zaharia, M., Zou, J. (2023). "FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance." arXiv:2305.05176.
12. Sardana, N., Portes, J., Doubov, S., Frankle, J. (2024). "Beyond Chinchilla-Optimal: Accounting for Inference in Language Model Scaling Laws." arXiv:2401.00448 (ICML 2024).
13. Anthropic. (2025-09-29). "Enabling Claude Code to work more autonomously." https://www.anthropic.com/news/enabling-claude-code-to-work-more-autonomously
14. Microsoft. (2024). Magentic-One open-source implementation. https://aka.ms/magentic-one
15. LangChain. LangGraph documentation. https://langchain-ai.github.io/langgraph/ (redirects to https://docs.langchain.com/oss/python/langgraph/overview).
16. research_space repo. `AGENTS.md` (controller specification). `agents_manager/research/SKILL.md` (research agent SKILL). `agents_manager/research/rules.md` (research agent rules). `share/notes/00_trace_T-2026-08-13-002.jsonl` (audit substrate).