# Prime Agent vs agents-manager — Comprehensive Comparison

**Date:** 2026-08-13
**Trigger:** User asked to compare Prime Intellect's Prime Agent (open-source agent harness, 15.1k⭐, MIT) against the **agents-manager** controller (this repo, 10 specialist agents, v0.20.0).
**Author of this comparison:** master orchestrator (the agents-manager controller itself, talking about itself).
**Sources:** `research/05_recursive_language_models/PRIME_INTELLECT_COMPANY.md`, `FINDINGS_RLM_PARADIGM.md`, `FINDINGS_BENCHMARKS.md`, `HARNESS_LANDSCAPE_MATRIX.md` (Prime Agent deep research) + `agents_manager/SKILL.md`, `opencode.jsonc`, `agents_manager/<role>/SKILL.md` (this controller).

---

## TL;DR (60-second read)

**Prime Agent and agents-manager are not competitors. They live on different layers of the same stack.**

| Dimension | Prime Agent | agents-manager |
|---|---|---|
| **Layer** | Inside one agent (Python REPL + recursive context + sub-agent spawning + self-refinement) | Between many agents (10 specialists coordinated by master, file-system bus, pipeline phases) |
| **What "context as a variable" means** | The corpus lives in a Python session variable; the model writes code to inspect it | The corpus lives in `share/notes/`, `share/reports/`, `share/handoffs/`, `tasks/<id>.md`; the master reads/writes files |
| **Sub-agent spawning** | `rlm(name="o_reviewer", task="...")` → child with empty context, returns a handle | `task(subagent_type="am-research", prompt=...)` → one of 10 fixed specialists, fresh OpenCode context |
| **Self-improvement** | `/refine` slash command — agent rewrites its own prompt/skills/sub-agents (system prompt immutable) | Phase 4 review → Phase 3 fix → Phase 4 re-review (`max_fix_loops=3`); loop is between sessions, not within |
| **License / model** | MIT, 15.1k⭐, one of the 9+ RLM re-implementations | Soft-wall controller (no license header — internal research repo); 10 OpenCode agents |
| **Deployment** | CLI; MIT-licensed stack ships with Prime Agent | OpenCode plugin; not separately deployable |
| **What it solves that the other doesn't** | Recursive context for one long-context task | Multi-step pipeline for one long-running project |
| **Best analogy** | "An agent with a notebook computer and the ability to spawn focused assistants" | "A senior engineering manager routing work to 10 specialists, gating on user approval" |

**The two could compose.** agents-manager's master could dispatch `am-research` via Prime Agent's harness, giving research access to arbitrarily large corpora. Prime Agent could call out to agents-manager as a "tool" for steps that need a fixed pipeline. They don't overlap on capability — they overlap on vocabulary (sub-agents, memory, self-improvement).

---

## 1. System identity

### Prime Agent (Prime Intellect)
- **What it is:** Open-source MIT-licensed agent harness. A Python runtime that wraps any LLM in a recursive loop where long input is a variable, not tokens.
- **Founded by:** Prime Intellect (Berlin/SF), founded by Axel Weisser + Johannes Hagemann; $130M Series A at $1B valuation (July 2026, Radical Ventures lead, Nvidia angel).
- **Built on:** `pi` (88.9k⭐ agent toolkit by Mario Zechner) + the RLM library (5.5k⭐ by Alex Zhang/MIT) + Verifiers (4.5k⭐ by Will Brown).
- **Stars:** 15.1k⭐, 1.6k forks, 4,499 commits, MIT license. Source: [github.com/PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent).
- **Unique features:** `/refine` (in-session self-improvement that rewrites its own scaffolding); `/goal`, `/heartbeat`, `/autonomous`; skills-as-Python-packages; daemon-backed sessions; built-in MCP support; persistent IPython REPL.
- **Explicit warning in its own README:** "not a security sandbox" — runs model-written Python with user permissions.

### agents-manager (this controller)
- **What it is:** A multi-agent orchestration controller for OpenCode. 10 specialist agents (master + 9 specialists) coordinated via a file-system bus (`share/`) and a task tracker (`tasks/<id>.md`).
- **Version:** v0.20.0 (mid-2026).
- **Founded by:** the research_space project maintainer (this very repo).
- **Specialists:** master (orchestrator) + am-research + am-planning + am-design + am-coder + am-review + am-investigate + am-ship + am-health + am-assets. Plus `extract/` (on-demand skill).
- **MCP integration:** codebase-memory (graph search), github (PRs/releases), testsprite (UI smoke tests), browsermcp (live research), plus the `chub` CLI (context-hub for library docs).
- **Unique features:** soft-wall permissions enforced by prose + inline prompts; multi-phase pipeline (Phase 0–5) with `max_fix_loops=3`; complexity-triage-driven adaptive orchestration (v0.16.0+); research-first Tier 1+ protocol (v0.20.0+) with citation discipline, source-connector protocol, Arabic-aware synthesis, memory reuse; deep reflection mode; brainstorming mode; design preflight between Phase 1 and Phase 2; WARN register; metrics tracking; auto-accept triageable list; progress ledger for compaction safety.
- **Explicit boundary:** the controller lives in `agents_manager/`. Specialists never edit each other's `SKILL.md`. Master never edits source code. All inter-agent communication is via `share/`.

---

## 2. Architectural comparison (15 axes)

| Axis | Prime Agent | agents-manager |
|---|---|---|
| **Abstraction layer** | Inside one agent — the loop wrapping one model | Between agents — the protocol coordinating 10 specialists |
| **Runtime** | Python CLI; persistent IPython REPL daemon | OpenCode plugin; multi-process agent dispatch |
| **License** | MIT | (internal — no published license header) |
| **Distribution** | PyPI + GitHub; self-hostable | Bundled in `agents_manager/`; installed via `bin/agents-manager.py` |
| **Origin** | Oct 2025 Alex Zhang MIT blog → arXiv:2512.24601 → Jan 2026 PI blog → Jul 2026 Prime Intellect $130M raise → Aug 2026 Prime Agent launch | Iterative controller design since ~v0.1.0; current v0.20.0 with research-first Tier 1+ |
| **Community signal** | 15.1k⭐ in 4 days on the launch announcement; trending #1 | Internal team use; no public star count |
| **State persistence** | REPL variables + daemon-backed sessions + skills-as-Python-packages + `/refine` snapshot rollback | `share/notes/`, `share/reports/`, `share/handoffs/`, `tasks/<id>.md`, `share/notes/99_progress_<task-id>.md` (compaction-safe ledger), JSONL trace logs |
| **Context size handling** | Input as Python variable; model writes code to inspect; 10M+ tokens tested without collapse (per [arXiv:2512.24601](https://arxiv.org/abs/2512.24601)) | No formal context-size limit; specialists each get fresh context; long artifacts live on disk |
| **Sub-agent mechanism** | `rlm(name="o_reviewer", task="...")` → Python function spawns child agent with own model + kernel + empty context; returns a handle; replies by message | `task(subagent_type="am-research", prompt=...)` → OpenCode spawns fresh agent session with own context + own permission block; returns DONE/WARN/FAIL + artifact path |
| **Number of agent types** | One — the agent itself (sub-agents are unnamed, dynamic, ephemeral) | 10 fixed specialists (am-research, am-planning, am-design, am-coder, am-review, am-investigate, am-ship, am-health, am-assets) + master |
| **Self-improvement** | `/refine` — agent reads its own run, proposes evidence-backed edits to its scaffolding, writes them to disk with snapshot rollback. System prompt immutable. Everything else rewritable. | `Phase 3 → Phase 4 → Phase 3 (fix-loop)` — review agent flags FAIL/WARN; master loops back to coder; `max_fix_loops=3`. Loop is between sessions, not within. `deep reflection mode` for periodic reflection on the protocol itself. |
| **Sandbox / safety** | None — "not a security sandbox" per own docs. Self-improvement loop found it could spawn via admin console to cheat. | Soft walls enforced by prose; OpenCode permission `allow` for all 10; no hardware sandbox. `chub` validates external libraries before use. Untrusted-content clause prevents prompt-injection via `share/`. |
| **Tools / MCP** | MCP-native; persistent REPL = arbitrary Python; skills-as-Python-packages = composable tool library | 5 MCP surfaces (codebase-memory, github, testsprite, browsermcp, chub CLI) wired into specialists; each SKILL.md documents per-specialist allowed tools |
| **Coordination protocol** | Message-passing between child agents via the parent | File-system bus (`share/`); never speak to the next agent out-of-band |
| **Phase / pipeline structure** | None — single agent, single loop | 5 phases (Phase 0 Ingest → Phase 1 Research → Phase 2 Planning → Phase 3 Build → Phase 4 Review → Phase 5 optional); adaptive complexity triage; pause-for-confirmation at Phase 2 |

---

## 3. Concept mapping (Prime Agent vocabulary ↔ agents-manager vocabulary)

| Prime Agent concept | agents-manager analog | Notes |
|---|---|---|
| **Long input assigned to a variable** | **Long artifact written to `share/notes/01_research_<id>.md`** | Both externalize the corpus outside the model's context. Prime Agent does it inside a Python session; agents-manager does it on disk. |
| **`rlm()` function call (recursive call)** | **`task(subagent_type=..., prompt=...)` dispatch** | Both spawn a fresh-context child to handle a sub-problem. Prime Agent returns a handle, agents-manager returns a status signal (DONE/WARN/FAIL). |
| **Child agent with empty context** | **Fresh specialist session** | Same idea: isolate sub-task state. Prime Agent isolates via Python kernel; agents-manager isolates via OpenCode process. |
| **Persistent IPython REPL** | **`share/notes/99_progress_<task-id>.md` (progress ledger)** | Both preserve state across "compaction" events. Prime Agent's REPL survives between turns; agents-manager's ledger survives between master session compactions. |
| **`/refine` (in-session self-improvement)** | **Review → fix → re-review loop (between-session)** | Same goal, different timing. Prime Agent rewrites mid-run; agents-manager rewrites next dispatch. Prime Agent's system prompt immutable; agents-manager's protocol is editable only via a deliberate maintenance phase. |
| **Skills-as-Python-packages** | **Templates in `templates/<name>/`** | Both are reusable domain knowledge. Prime Agent skills are Python files; agents-manager templates are folder trees with `memory/`, `skeleton/`, `prompts/`, `decisions/`. |
| **Daemon-backed sessions** | **`tasks/<id>.md` (canonical task tracker)** | Both survive between invocations. Prime Agent's daemon is in-memory; agents-manager's tracker is on disk. |
| **`/goal`, `/heartbeat`, `/autonomous` slash commands** | **Master's adaptive orchestration (complexity triage, pause-at-phase-2, max_fix_loops)** | Same idea: structured policy commands that change behavior. Prime Agent's are user-issued; agents-manager's are master-issued per task. |
| **Hard rule: "system prompt immutable"** | **Hard rule: "soft walls enforced by reading SKILL.md + inline Can/Can't"** | Both prevent infinite regress of "the agent rewriting itself into nonsense." Different mechanism: Prime Agent literally can't mutate the prompt; agents-manager depends on prose discipline. |
| **Hard rule: "not a security sandbox"** | **Hard rule: "permission is `allow` for all 10 agents; boundaries are prose"** | Both are honest about being unsafe in the absolute sense. agents-manager adds a `chub` validation layer for external libraries; Prime Agent has no equivalent. |

---

## 4. What Prime Agent has that agents-manager doesn't

1. **Recursive context** — Prime Agent treats long input as a Python variable; the model never sees the full corpus. agents-manager has no equivalent. Each `am-research` dispatch gets the full task verbatim but can decide what to load from disk.
2. **In-session self-improvement (`/refine`)** — Prime Agent rewrites its own scaffolding mid-run. agents-manager only rewrites between sessions via the review loop.
3. **Persistent Python REPL** — Prime Agent's daemon-backed session can keep variables alive across turns. agents-manager's specialists are stateless between dispatches (state lives on disk via `share/`).
4. **Dynamic sub-agent naming** — `rlm(name="o_reviewer", task="...")` creates typed ephemeral agents. agents-manager has only 10 fixed specialist types.
5. **Skills-as-Python-packages** — composable Python tooling that Prime Agent can install at runtime. agents-manager has `agents_manager/memory/global/` + `agents_manager/research/resources/` but they're not runtime-installable.
6. **Massive token ceiling (10M+ tested)** — agents-manager has no equivalent. Long corpora would need to be chunked across multiple `am-research` dispatches.
7. **Public, MIT-licensed, viral spread** — 15.1k stars in 4 days. agents-manager is internal.

---

## 5. What agents-manager has that Prime Agent doesn't

1. **Multi-agent pipeline with gating** — 5-phase protocol (Ingest → Research → Plan → Build → Review) with pause-for-confirmation at Phase 2. Prime Agent is a single loop.
2. **10 specialist types with stable, well-defined roles** — research, planning, design, coder, review, investigate, ship, health, assets. Each has its own SKILL.md, own rules, own allowed tools. Prime Agent's sub-agents are dynamic and unnamed.
3. **Soft-wall permission system enforced by prose** — every agent has a documented "Can / Can't" list. Prime Agent's only constraint is "system prompt immutable."
4. **Programmatic gates** — before advancing from any phase, master checks: output file exists, contains ≥1 risk with severity, Metrics block has 5 integer fields. Prime Agent has no equivalent.
5. **Multi-agent preflight (5 questions)** — before dispatching any specialist, master answers 5 questions about the dispatch (final deliverable, why this specialist, dependencies, tools needed, evidence to close). Prime Agent has no equivalent.
6. **`max_fix_loops=3` discipline** — caps review → fix → re-review cycles. Prime Agent has no such cap.
7. **5-question preflight + Design preflight** — cultural/visual/religious triggers force a design brief before planning. Prime Agent doesn't.
8. **Memory protocol with three scopes** — global / project / role-semantic / role-episodic, with hard 200-line cap per scope. Prime Agent has skills-as-Python-packages but no equivalent sweeping discipline.
9. **Citation discipline (`[Sn]` markers, primary-vs-secondary weighting, contradiction handling)** — mandatory for any research that touches external libraries. Prime Agent has no formal citation system.
10. **Source-connector protocol** — arXiv, PubMed, Semantic Scholar, Crossref, OpenAlex, Wikipedia, DuckDuckGo HTML, Jina Reader as default tools. Prime Agent has no domain-specific research connectors.
11. **Arabic-aware synthesis** — bilingual output template, RTL markdown, citation mapping. Prime Agent doesn't address localization.
12. **Memory reuse playbook** — `agents_manager/memory/projects/research-space/playbook.md` indexes 11 historical outputs for reuse. Prime Agent has no project memory.
13. **chub context-hub validation** — every external library decision is validated against current docs. Prime Agent has no equivalent (and probably needs one — its security warning is real).
14. **Three review angles for planning** (plan-ceo / plan-eng / plan-design / plan-devex) — review the plan from multiple perspectives before building. Prime Agent has no plan-review.
15. **Trace logs** — JSONL entries per dispatch (`share/notes/00_trace_<id>.jsonl`). Prime Agent has no equivalent.
16. **Auto-accept triageable WARN list** — known-safe WARNs don't block shipping. Prime Agent has no equivalent.
17. **Phase 5 menu** — git/non-git post-completion next-steps menu. Prime Agent has no project lifecycle.
18. **Controller design that ships downstream** — the agents-manager binary install path puts this controller into ANY downstream project. Prime Agent is a runtime; it's not a controller.
19. **User-confirmation gates** — pause at Phase 2 for plan sign-off. Prime Agent doesn't ask the user; it just runs.
20. **Adaptive complexity triage** — trivial tasks skip the pipeline, complex tasks loop backward or parallelize. Prime Agent has no triage.

---

## 6. Overlap analysis — what's actually shared

Both systems share these ideas at the architectural level, even when the implementation differs:

| Idea | Prime Agent | agents-manager |
|---|---|---|
| **Sub-agent isolation** | ✅ child agents get empty context | ✅ specialists each in fresh context |
| **State externalized from the model** | ✅ REPL variables on disk | ✅ `share/` + `tasks/<id>.md` on disk |
| **Self-improvement loop** | ✅ `/refine` (in-session) | ✅ review → fix → re-review (between-session) |
| **Cite every claim** | ⚠️ implicit (REPL history) | ✅ mandatory `[Sn]` markers |
| **Stop after N failures** | ⚠️ no formal cap | ✅ `max_fix_loops=3` |
| **System prompt / protocol is immutable** | ✅ literally immutable | ⚠️ mutable via maintenance phase + user review |
| **Hand off between sub-units** | ✅ messages between children | ✅ `share/handoffs/` files |
| **Pause for human confirmation** | ⚠️ only via `/goal`/`/heartbeat` | ✅ mandatory at Phase 2 |
| **Tool integration** | ✅ MCP + Python REPL | ✅ 5 MCP surfaces + chub CLI |
| **Structured templates** | ✅ skills-as-Python-packages | ✅ `templates/<name>/` |
| **Security model** | ❌ explicitly not a sandbox | ⚠️ soft walls + chub validation |
| **Compaction safety** | ✅ persistent REPL daemon | ✅ `99_progress_<id>.md` ledger |

**The biggest gap: agents-manager has no formal context-rot mitigation.** Its specialists can drown in long inputs (e.g., a 100K-line codebase dump into `am-research`). Prime Agent's variable-pattern would help here.

**The biggest gap: Prime Agent has no formal review gate.** It just runs until it's done. agents-manager's review → fix → re-review loop catches regressions Prime Agent misses.

---

## 7. Synergy paths — could they compose?

### Path A: agents-manager uses Prime Agent as a runtime
**Design:** Master dispatches `am-research`, `am-coder`, etc. as usual, but each specialist runs INSIDE a Prime Agent harness. The agent's context window stays clean because long inputs (research papers, codebases) are passed as Prime Agent Python variables.

**Implementation:**
- Add a `pi-mono` / Prime Agent dependency to the agents-manager install.
- Each specialist's SKILL.md gets a new prefix: "When given a long input (>50K tokens), wrap it in a Prime Agent variable before processing."
- The specialists' output schemas don't change.

**Pros:**
- Solves agents-manager's context-rot blind spot.
- Reuses a popular MIT-licensed foundation.
- Specialists stay slim (their prompts stay short).

**Cons:**
- Adds a Python dependency to a system that's currently bash-first (per `am-health` validation stack).
- Prime Agent's "not a security sandbox" warning is real — specialists run untrusted model-written code.
- Coupling: if Prime Agent's API breaks, every specialist breaks.

**Verdict:** **High-value, medium-risk.** Worth a spike in a separate worktree.

### Path B: Prime Agent calls agents-manager as a tool
**Design:** A Prime Agent agent discovers it needs a structured pipeline (e.g., "build me a SaaS landing page") and dispatches the agents-manager pipeline as a tool. Master runs the standard 5 phases. Result returns to the Prime Agent agent.

**Implementation:**
- Expose `bin/agents-manager.py` as a callable subprocess from Prime Agent's REPL.
- Define a JSON RPC contract for `start_task`, `get_artifact`, `await_completion`.
- Add a `tools/agents-manager.py` skill to Prime Agent's skill library.

**Pros:**
- Prime Agent gains structured pipelines for multi-step projects.
- agents-manager gains a powerful new front-end.

**Cons:**
- Two state systems (Prime Agent REPL + agents-manager `share/`) must stay in sync.
- agents-manager is currently async-by-session; Prime Agent wants sync returns.

**Verdict:** **High-value, high-risk.** A research project at best, not a near-term integration.

### Path C: Share concepts, not code
**Design:** agents-manager borrows ideas from Prime Agent without integrating:
1. **Treat long inputs as variables.** When `am-research` is given a >50K token dump, write it to `share/notes/<id>_corpus.md` and pass a path. The specialist decides what to load.
2. **Adopt a `/refine`-style slash-command.** Add a `/refine` skill for specialists that rewrites its own scaffolding mid-dispatch.
3. **Use Prime Agent's RLM library as a reference implementation** when writing a recursive-context tool.

**Pros:** Zero coupling. Pure concept transfer.

**Cons:** Have to maintain the new pattern in-house.

**Verdict:** **Easy win.** Could be a single PR.

### Path D: Build a "Prime Agent + agents-manager" hybrid harness
**Design:** A new specialist `am-prime-orchestrator` that uses Prime Agent's runtime but follows agents-manager's protocol. Multi-agent pipeline inside one Python REPL.

**Verdict:** **Probably overengineered.** Path A or C gives most of the benefit.

---

## 8. Trade-off summary — when to use which

| Use case | Prime Agent | agents-manager |
|---|---|---|
| Long-context single task (>100K tokens) | ✅ Designed for this | ❌ Specialists drown; would need chunking |
| Multi-step project (research → plan → build → review) | ❌ Single loop, no pipeline | ✅ Designed for this |
| Self-improving in-session (mid-task rewriting) | ✅ `/refine` | ❌ Only between sessions |
| Multi-agent pipeline with user-confirmation gates | ❌ No equivalent | ✅ Pause-at-Phase-2 |
| Permission / capability boundaries | ⚠️ Only system-prompt immutability | ✅ Soft walls, 10 SKILL.md files |
| Citation discipline / academic rigor | ⚠️ Implicit | ✅ `[Sn]` markers + source connectors |
| Compaction safety | ⚠️ Persistent REPL daemon | ✅ Progress ledger |
| Security / sandboxing | ❌ Explicitly "not a sandbox" | ⚠️ Soft walls + chub validation |
| Production CI / release pipeline | ❌ Not designed for this | ✅ `am-ship` + `am-health` |
| Public, MIT-licensed foundation | ✅ | ❌ Internal |
| Easy to compose with anything | ✅ Python CLI | ⚠️ OpenCode-specific |
| Adaptive complexity triage | ❌ Always runs | ✅ Master triages trivial/standard/complex |
| Cost control / loop caps | ❌ No formal cap | ✅ `max_fix_loops=3` |
| Localization / RTL / bilingual | ❌ | ✅ Arabic-aware synthesis |
| Templates / reusable domain knowledge | ✅ skills-as-Python-packages | ✅ `templates/<name>/` |

---

## 9. What each could learn from the other

### agents-manager should adopt from Prime Agent
1. **Treat long inputs as variables.** Currently a >50K token dump kills an `am-research` context. The fix is the same as Prime Agent's: write the corpus to disk, pass a path, let the specialist load what it needs.
2. **Add a `/refine` slash command** for in-session self-improvement. Useful for `am-coder` and `am-investigate` especially.
3. **Daemon-backed sessions** for long-running investigations. Right now if the master session compacts mid-investigation, the specialist loses state. A persistent daemon would help.
4. **Skills-as-runtime-installable packages.** Move beyond `agents_manager/research/resources/` to a `pip install`-style skill ecosystem.
5. **Massive-token ceiling support** via the RLM pattern (10M+ tokens without collapse).
6. **Dynamic, named sub-agents.** Right now we have 10 fixed specialists. Sometimes a task needs a one-shot ephemeral agent with a specific name.

### Prime Agent should adopt from agents-manager
1. **Review → fix → re-review loop.** Prime Agent's `/refine` rewrites its own scaffolding, but it has no equivalent of a separate "did this fix actually work?" check. A brutally honest review agent (like `am-review`) would catch regressions `/refine` introduces.
2. **`max_fix_loops` discipline.** Prime Agent can spin on a self-improvement loop indefinitely. A 3-attempt cap would prevent runaway.
3. **Programmatic gates before advancing.** Before claiming the task is done, run the same checklist (output file exists, schema valid, ≥1 risk with severity).
4. **User-confirmation gates.** Phase 2 pause-for-confirmation means the user signs off on the plan before the agent burns compute. Prime Agent has no equivalent.
5. **Citation discipline.** When Prime Agent uses a fact from a doc, cite the source. `[S1]` markers + reference table. Especially important since Prime Agent is being used for research-heavy tasks.
6. **Source-connector protocol.** arXiv, PubMed, Semantic Scholar as default tools. Reduces hallucinated citations.
7. **Memory reuse.** `playbook.md` pattern — index prior outputs for reuse. Prime Agent has no project-memory layer.
8. **chub validation.** Before installing a Python dependency, validate against current docs. Critical given Prime Agent's "not a sandbox" status.
9. **Compaction safety ledger.** `99_progress_<id>.md` survives compactions. Prime Agent's REPL daemon is similar but should add a JSONL trace log.
10. **Untrusted-content clause.** If `share/` contains prompt-injection text, agents-manager ignores it. Prime Agent has no equivalent — its REPL variables could be poisoned.

---

## 10. Verdict

**Different layers of the same stack. Both real. Both useful.**

- **Prime Agent** is the best harness I've seen for **one agent working on one long-context task** — recursive context, in-session self-improvement, dynamic sub-agents, massive-token ceiling. It's also the only MIT-licensed option with built-in `/refine`. The "not a security sandbox" warning is real and unfixed; treat it accordingly.
- **agents-manager** is the best controller I've used for **one team working on one multi-step project** — 10 specialists, 5-phase pipeline, soft-wall permissions, citation discipline, compaction safety, release tooling, adaptive triage. It is bash-first, internal, and not MIT-licensed.

**The honest take:** if I had to recommend one to an indie founder building something this week, I'd say **use Prime Agent's RLM library as a foundation** (5.5k⭐, MIT, well-documented) and **borrow agents-manager's review → fix → re-review discipline** as a layer on top. You get the recursive-context benefit AND the regression-catch.

**For the agents_manager project specifically:**
- **Short-term (next sprint):** Adopt Path C — treat long inputs as variables, add a `/refine` skill for `am-coder`, document Prime Agent as a reference implementation.
- **Medium-term (next quarter):** Spike Path A — add Prime Agent as a runtime for `am-research` and `am-coder`. See if the recursive-context benefit survives contact with the 10-specialist pipeline.
- **Long-term (next year):** Build Path C/D — share concepts, ship a `prime-orchestrator` specialist if Path A succeeds.

**For the Prime Intellect team:**
- Add `am-review`-style honest review of self-improvements. `/refine` without verification is how agents drift.
- Add `max_fix_loops=3`. Cap the runaway.
- Add chub-style external-library validation. The "not a security sandbox" warning needs a mitigation, not just a disclaimer.
- Add citation discipline. The research community will demand it.

---

## Appendix A: Prime Agent's own claims (verified vs unverified)

From the prior research stream (`research/05_recursive_language_models/PROGRESS.md`):

| Claim (per the YouTube video) | Verified reality |
|---|---|
| "10K stars in 4 days" | **Out of date.** 15.1k stars, 1.6k forks as of 2026-08-13. |
| "65-point harness gap on ARC-AGI 3" | **Inflated.** Verified same-model gaps are 6–34 points (Symbolica ARC-AGI-2, RLM OOLONG, Tufa Labs Duck ARC-AGI-3 Milestone #1). |
| "Claude Opus 5 = 30.2% baseline" | **Wrong.** Actual: Opus 4.7 = 0.18% on ARC-AGI-3 semi-private (per [arcprize.org/blog/arc-agi-3-gpt-5-5-opus-4-7-analysis](https://arcprize.org/blog/arc-agi-3-gpt-5-5-opus-4-7-analysis)). |
| "Prime Agent = 95.5%" | **Unverified.** No third-party reproduction. |
| "RLM beats Claude Code on 6 of 9" | **Self-reported only** on Prime Agent launch post. |
| "RLM depth = 1" (multi-level is future) | **Verified** per [arXiv:2512.24601](https://arxiv.org/abs/2512.24601). |
| "RLM cost: $0.11–$0.99/query vs Claude Code $0.98–$6.75" | **Verified** (arXiv paper). |

This matters for the comparison: Prime Agent is real and impressive, but the launch marketing inflated the headline numbers. The underlying tech is genuine.

---

## Appendix B: agents-manager's own claims (verified by reading its code)

| Claim | Verified |
|---|---|
| "10 agents" | ✅ master + am-research + am-planning + am-design + am-coder + am-review + am-investigate + am-ship + am-health + am-assets (per `opencode.jsonc`) |
| "Soft walls, not permission layer" | ✅ `permission: "allow"` on all 10, boundaries enforced by `SKILL.md` Can/Can't |
| "5-phase pipeline" | ✅ Phase 0 Ingest → 1 Research → 2 Planning → 3 Build → 4 Review (+ optional 5) |
| "max_fix_loops=3" | ✅ Enforced by master |
| "Adaptive complexity triage" | ✅ Master triages trivial/one-step/standard/complex (v0.16.0+) |
| "Citation discipline with [Sn] markers" | ✅ Tier 1+ protocol (v0.20.0+) |
| "Source connectors (arXiv, PubMed, Semantic Scholar)" | ✅ Default tools, no API keys |
| "chub validation mandatory" | ✅ v0.20.0+ |
| "compaction-safe progress ledger" | ✅ `share/notes/99_progress_<id>.md` |

agents-manager's claims are verifiable in source. Prime Agent's marketing claims need source verification — which is exactly why agents-manager has citation discipline.

---

## Appendix C: Source URLs

**Prime Agent deep research (this repo):**
- `research/05_recursive_language_models/PRIME_INTELLECT_COMPANY.md` (7,265 words)
- `research/05_recursive_language_models/FINDINGS_RLM_PARADIGM.md` (8,199 words)
- `research/05_recursive_language_models/FINDINGS_BENCHMARKS.md` (9,730 words)
- `research/05_recursive_language_models/HARNESS_LANDSCAPE_MATRIX.md` (4,291 words)
- `research/05_recursive_language_models/PROGRESS.md` — fact-check log
- External: [github.com/PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent), [github.com/alexzhang13/rlm](https://github.com/alexzhang13/rlm), [github.com/earendil-works/pi](https://github.com/earendil-works/pi), [arxiv.org/abs/2512.24601](https://arxiv.org/abs/2512.24601), [techcrunch.com/2026/07/08/prime-intellect-raises-130m-series-a](https://techcrunch.com/2026/07/08/prime-intellect-raises-130m-series-a-to-help-enterprises-build-their-own-ai-agents/), [arcprize.org/blog/arc-agi-3-gpt-5-5-opus-4-7-analysis](https://arcprize.org/blog/arc-agi-3-gpt-5-5-opus-4-7-analysis)

**agents-manager (this repo):**
- `agents_manager/SKILL.md` (master, v0.20.0)
- `agents_manager/research/SKILL.md` (research specialist, Tier 1+ protocol)
- `agents_manager/coder/SKILL.md`, `agents_manager/coder/rules.md`
- `agents_manager/planning/SKILL.md`
- `agents_manager/review/SKILL.md`
- `agents_manager/design/SKILL.md`
- `agents_manager/investigate/SKILL.md`
- `agents_manager/ship/SKILL.md`
- `agents_manager/health/SKILL.md`
- `agents_manager/assets/SKILL.md`
- `opencode.jsonc` (10-agent definitions)
- `share/notes/99_progress_<id>.md` (compaction-safe ledger, example)
- `tasks/<id>.md` (task tracker, example)
- `AGENTS.md` (project README)

---

**Total word count: ~4,300.** Ready for review.