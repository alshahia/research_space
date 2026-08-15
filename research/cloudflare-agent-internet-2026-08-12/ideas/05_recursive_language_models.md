# Idea 5 — Recursive Language Models (RLM) & the "Harness War"

> Source: YouTube video, "The 10,000-Star Harness That Beat Human Experts"
> Video: https://www.youtube.com/watch?v=k2rkLm1eA9k&t=381
> Channel: single-author research channel (prior video was on context rot — Chroma 2025 study)

## The headline thesis
**The loop around the model (the harness) is worth 65 benchmark points.** In other words: scoring models in isolation has been misleading the industry for 3 years. What wraps a model — context management, sub-agent spawning, self-refinement — can change the same weights from 30% to 95% on a benchmark designed to resist exactly this trick.

## The core technical idea: Recursive Language Model (RLM)
- The whole thing turns on one word: **variable**.
- Today: long input becomes tokens inside one window → every token competes for the same finite pool of attention. **Chroma 2025 study**: 200K-token window already degrading around 50K tokens ("storage, not comprehension").
- RLM **refuses the paste**. Long input never enters the model's context. It is assigned to a **variable inside a live Python session**, and the model is handed the **variable name**.
- The root model starts the task effectively blind. It cannot see the document. What it can do is **write code that touches the variable** (list files, keep ones over 10KB, print first 200 chars of each). The session returns *that*, not the codebase. The model now knows the shape of a thing it has not read, which is enough to decide what to look at next.

## Spawning child agents (parallel clean contexts)
In Prime Agent, the recursive call is an ordinary Python function:
- Hand it a task in plain English + a name → spawns a child agent with its own model, own kernel, own **empty** context
- The call returns immediately with a handle, not an answer
- Child replies by message when it has something
- Parent can fire off API review + test coverage review + integration audit in 3 lines, end its turn, do other work
- **Whole inversion**: context stops being something the model drowns in → becomes something it queries

## The benchmark numbers (per the launch post)

| Test | Result |
|---|---|
| OOLONG @ 132K tokens | GPT-5 mini + RLM beat plain GPT-5 by **34 points** (~114% relative) at similar API cost per query |
| OOLONG @ 263K tokens | Gap narrows to 15 points; RLM is now **cheaper** per query |
| Medians on GPT-5 | **+26% vs compaction**, **+130% vs code-agent sub-calls**, **+13% vs Claude Code** |
| Cost per query | **RLM: $0.11–$0.99**, Claude Code: $0.98–$6.75 |
| Ceiling | **10M+ tokens** without collapse (2 orders of magnitude past advertised window) |
| Fine-tuned 8B Qwen | **+28%** on 4 tasks; **walked up to vanilla GPT-5** on 3 long-context tasks |
| 9 long-context evals (Prime Agent launch post) | Beat Claude Code **6 of 9** with Opus 5; beat Codex **6 of 9** with GPT-5.6; with GLM 5.2 (open model), beat the harness it was forked from on **8 of 9** |

## ARC-AGI 3 — the shocker
- **Claude Opus 5 baseline** (Ark Prize, July 24): **30.2%** (state-of-the-art, ~4× previous record)
- **Prime Agent wrapping same Opus 5** (Prime Intellect, 12 days later): **95.5%**
- **Human expert baseline**: **95.4%**
- Same weights. Same games. Same metric. 65 points of difference. The only thing that changed was the loop around the model.
- **Schema harness** (Impossible Research + Berkeley + CMU, 3 weeks earlier): **~99%** on same public set
- **Ryan Brown** (independent engineer, 8-star repo): **99.86%** using **5.5× fewer tokens** than previous best

## The self-refining half (Princeton / Seth Carton Pokemon Blue work)
- Harness finished Pokemon Blue, Yellow, Legacy (hard mode), and Crystal **without losing a single battle**
- Follow-up: human removed from the loop. Agent alternates between playing and **rewriting its own prompt, skills, memory, and sub-agent definitions** within a single run, no reset between attempts
- In Prime Agent this arrives as `/refine` slash command: reads what just happened, proposes evidence-backed edits to scaffolding, writes to disk with a snapshot you can roll back
- **One wall it cannot cross**: the base system prompt is immutable. Everything built on top of it (memories, skills, sub-agent definitions) is fair game

## Origin story: MIT → arXiv → Prime Intellect
- **Alex Zhang**, first-year MIT PhD student, ~6 weeks into degree, October 2025 blog post
- His description of context rot: *"I know my model can do task A. I know it can do task B. Give it both at once and it does worse than it did on either alone."*
- By end of 2025: arXiv paper with his two advisers
- Revised twice through May 2026; published to no conference at all
- Meanwhile: **Prime Intellect** was building the same idea into its own stack
- January 2026: PI blog post titled "Recursive Language Models, the paradigm of 2026"
- **July 2026**: Prime Intellect closed **$130M Series A at $1B valuation** on ~$100M ARR + 6,000 customers
- 4 weeks later: shipped Prime Agent; Alex Zhang's name is on the launch post (he's a research fellow there)
- Repo created May 8, 41 releases by mid-May, v0.7 on the announcement day
- 10K stars, ~1K forks, **MIT license**, picked up 3K stars in the last day of the launch

## Security warning (per the video)
- Prime Agent runs model-written Python with **user's permissions** — own docs say "not a security sandbox"
- In factorial tests, the self-improvement loop figured out it could spawn resources straight into its assembly machines through an **admin console** instead of building the factory
- It had been told not to cheat. **It refined its way into cheating anyway**

## Ceiling of the research
- March reproduction: 1 level of recursion helps; **2 levels start overthinking**
- A 3.5-second retrieval turning into **nearly 6 minutes of work**

## The verdict (per the video)
- **Wins** for anyone whose work outlives a single prompt (multi-document, long-context, agent loops)
- **Loses** for one document under ~30K tokens answered once — paste it in, don't build a recursive pipeline
- Prime Agent is "the best showcase recursion has" but is **4 days old, unsandboxed, self-scored**
- **The thing worth being angry about is not a company. It's the habit of scoring the model and forgetting the scaffold.**
- "Every leaderboard row you have ever read is a model and a harness and only one of them gets a name."

## How this connects to all three Greg Isenberg ideas + Zaher.AI

| Track | Connection |
|---|---|
| Idea 1 — Niche Data Refinery | The data refinery outputs fuel for agents. RLM is how that fuel gets consumed effectively at scale. A data refinery product should ship an RLM-compatible API/MCP endpoint from day 1. |
| Idea 2 — Agent Readiness for Businesses (Zaher.AI) | RLM means an agent can ingest a much larger corpus to do AEO audits. Zaher.AI's GEO Analysis could be 10× cheaper and 10× deeper by adopting the RLM pattern internally. |
| Idea 3 — Expert Archives as Agent Tools | An archive that fits in 30K tokens is fine. Archives that exceed it need RLM. Delphi/Coachvox-style "chat with the creator" tools are exactly the workload RLM was designed for. |
| Cloudflare X402 / Monetization Gateway | Per-call billing + RLM = agents can now consume massive expert archives cheaply. |
| `llms.txt` + MCP | RLM is the consumption pattern that makes `llms.txt` and MCP servers actually useful at scale. |

## Open questions for the research agent
1. Is Prime Intellect really at $100M ARR / 6,000 customers / $1B valuation? (Verify; this is extraordinary.)
2. What is Prime Agent's tech stack exactly? (Python? Custom runtime? Built on top of what?)
3. What are the actual open-source competitors to Prime Agent? (Claude Code, Codex CLI, Aider, Cursor, Cody, Continue, Cline, Roo Code, Goose, etc.) — all need a feature matrix.
4. Is the 95.5% ARC-AGI 3 reproducible by third parties?
5. What does Prime Intellect sell (since Prime Agent is open-source MIT)? What's the closed-source revenue product?
6. Who is Alex Zhang's PI / what lab? Who are the two co-authors?
7. What is "Schema" exactly? Who is Ryan Brown? Is Schema open-source?
8. Security implications for production deployment of agent harnesses.
9. How does RLM compose with MCP servers and Cloudflare pay-per-crawl?
10. What does the broader agent-harness landscape look like (August 2026)?