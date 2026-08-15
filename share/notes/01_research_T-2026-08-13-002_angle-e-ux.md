# Angle E — Product UX (2026)

**Task:** T-2026-08-13-002 — convert research_space into a top-tier AI research product
**Date:** 2026-08-13
**Author:** am-research (angle E — Product UX)
**Status:** final

---

## How to read this report

This is angle **E** of a six-angle parallel research pass. Angle F (current-state inventory of `research_space`) is dispatched separately; the gap matrix will be done in the master-merge step. The scope here is **what "best in class" looks like at the input and output surfaces** of a "give me a topic → get research" product in 2026. Every pattern below cites at least one shipped product. Patterns are also flagged **table-stakes** (expected by users in 2026; missing = the product feels broken) vs **differentiating** (gives the product a defensible edge).

Products surveyed (per Angle B list): **NotebookLM (Gemini Notebook)**, **Perplexity**, **OpenAI Deep Research**, **Gemini Deep Research**, **Elicit**, **Consensus**, **SciSpace (Typeset)**, **You.com**, **STORM** (Stanford, 403 from network; cited from prior knowledge with date caveat), **ResearchRabbit**, **Iris.ai**.

---

## 1. Input flow

### 1.1 Plain text topic vs structured input

The baseline input across all surveyed products is a free-text topic. None of the consumer-grade products force a structured form first; they parse constraints from the prompt and surface a plan/clarification when needed (see 1.3).

- **NotebookLM**: source-first; the "topic" is implicit in what you upload. The product was *not* designed around "give me a topic" — it is designed around "give me sources." (en.wikipedia.org/wiki/NotebookLM, accessed 2026-08-13)
- **ChatGPT Deep Research**: plain-text prompt in the message composer; "select 'deep research' in the message composer and enter your query." File attachments and spreadsheets are accepted alongside the topic. (openai.com/index/introducing-deep-research, accessed 2026-08-13)
- **Gemini Deep Research**: plain-text prompt in the composer bar; can also pull from Gmail/Drive/Chat in addition to web. (gemini.google/overview/deep-research, accessed 2026-08-13)
- **Elicit**: structured "research question" plus optional filters (year range, population, study type). Filters live in the report config UI, not in the topic. (elicit.com, accessed 2026-08-13)
- **Consensus**: plain-text question + optional "filters" (year, study type, journal); "Pro Search" and "Deep Search" toggles. (consensus.app, accessed 2026-08-13)

**Effort for research_space:** **low.** Reuse the topic field. Add an optional advanced panel (collapsed) for filters — none of the consumer products put it in the primary input field.

### 1.2 Multi-modal input

- **OpenAI Deep Research**: "You can attach files or spreadsheets to add context to your question." Files are read inline; supported formats include PDFs and spreadsheets. (openai.com/index/introducing-deep-research, 2026-08-13)
- **NotebookLM**: PDFs, Google Docs, Google Slides, plain text, websites, and YouTube URLs (transcript extraction). (en.wikipedia.org/wiki/NotebookLM, accessed 2026-08-13)
- **Gemini Deep Research**: PDFs + Workspace sources (Gmail, Drive, Chat) + images. (gemini.google/overview/deep-research, 2026-08-13)
- **Perplexity**: PDF, image, CSV upload; "Computer" mode browses local files. (perplexity.ai hub FAQ, accessed 2026-08-13)
- **Elicit**: PDF upload in screening/extraction; pre-prints and journals fetched via search. (elicit.com, 2026-08-13)

**Differentiation angle:** "URL/PDF/image drop zone in the input box, plus a YouTube-link detection pattern, is now table-stakes." A research product that can't ingest a PDF the user wants grounded in loses to NotebookLM in 30 seconds.

**Effort:** **medium.** Add an attachments slot beside the topic input. Parse URLs server-side (HTML + OG metadata + article body). YouTube needs transcript extraction (search API or `youtube-transcript-api` Python package).

### 1.3 Ambiguity resolution / clarifying questions

This is the **single biggest UX differentiator** between a top-tier and a mediocre "topic → research" product in 2026. Three patterns are observed:

**Pattern A — silent plan execution.** Older or budget-constrained systems just run with what they inferred. Almost no top product does this anymore.

**Pattern B — pre-execution plan edit/approval.** Gemini Deep Research is the cleanest example: "When the system receives a complex request from the user, it first drafts a detailed research plan… **You control the plan** — Gemini presents it to you and lets you refine it to make sure it focuses on the aspects that matter to you." (gemini.google/overview/deep-research, accessed 2026-08-13) The user can edit, reorder, delete, or add steps before execution starts.

**Pattern C — clarification mid-execution.** OpenAI Deep Research (Feb 2026 update): "**interrupt to refine with follow-up prompts or new sources**" — the sidebar updates in real time and accepts new instructions. (openai.com/index/introducing-deep-research, accessed 2026-08-13)

**Pattern D — implicit (NotebookLM).** No clarifying questions because the user supplies the entire corpus; ambiguity is bounded by what was uploaded.

**STORM (Stanford, 2024)** historically generated a topic outline first and let the user redirect during the multi-agent writing process. From prior knowledge — flagged because the Stanford site returned 403 on fetch; pattern is consistent with the published STORM paper.

**Effort:** **medium.** Plan-then-confirm requires a structured "research plan" JSON output from the planner agent. research_space already has `am-planning` (per the controller) — wire its plan output to the input UI. Mid-execution redirect requires an interruptible task queue (BullMQ / Inngest / Temporal); not trivial.

### 1.4 Example topics / "try these" prompts

- **OpenAI Deep Research** ships the message composer with category pills (Business / Needle-in-a-Haystack / Medical Research / UX Design / Shopping / General Knowledge). Each pill shows a sample prompt. (openai.com/index/introducing-deep-research, 2026-08-13)
- **Perplexity**: "Focus modes" — Academic, YouTube, Reddit, Writing, Social — appear as toggle chips. (perplexity.ai hub FAQ, 2026-08-13)
- **Gemini Deep Research**: use-case tiles ("Competitive Analysis / Due Diligence / Topic Understanding / Product Comparison"). (gemini.google/overview/deep-research, 2026-08-13)

**Effort:** **low.** Curate 6–12 example topics per category. Each becomes a one-click "load example" button.

### 1.5 Voice / audio input

- **Perplexity mobile** has a voice mode (mic icon next to the composer). (perplexity.ai, 2026-08-13)
- **NotebookLM** does *not* ship voice input; its audio is output only.
- **ChatGPT** shipped voice input in 2024 (mobile + desktop) and it remains in the composer.
- **Gemini app** (mobile): voice via Gemini Live.

Voice input is **table-stakes for mobile, deferrable on web**. The path is Web Speech API (`SpeechRecognition`) on the client or Whisper API on the server; Whisper is overkill for a composer mic unless the user wants to dictate paragraphs.

### 1.6 Saved research profiles

- **Perplexity**: "Profile settings" — focus-area preferences, language, voice, model defaults. (perplexity.ai hub FAQ, 2026-08-13)
- **Elicit**: a "Library" of saved sources per user; not a profile, but a similar reuse primitive. (elicit.com, 2026-08-13)
- **Consensus**: "Collections" — curated libraries of saved searches and papers. (consensus.app, 2026-08-13)
- **NotebookLM**: "Shared notebooks" — a profile by another name; persistent context scoped to a corpus. (en.wikipedia.org/wiki/NotebookLM, 2026-08-13)

**Effort:** **medium.** Stored as a `research_profile` table (DB-side) with reusable defaults: preferred depth, output formats, language, source allow-list, citation style. Not a blocker for MVP.

---

## 2. Output formats matrix

| # | Output format | NotebookLM | Perplexity | OpenAI DR | Gemini DR | Elicit | Consensus | You.com | STORM | RR | Iris.ai | Effort (research_space) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Long-form Markdown report | (in-chat text) | yes | **canonical** | yes | yes (PDF) | partial | yes | **canonical** | no | yes | **low** (Markdown writer exists) |
| 2 | Executive summary / TL;DR | "Briefing doc" | yes (top of answer) | yes (inline) | yes | yes | yes | yes | yes | no | yes | **low** |
| 3 | Mind-map / outline view | "Mind Map" studio | no | no | yes (Canvas) | no | no | no | yes (outline) | **canonical** | yes | **medium** — needs a tree-view component |
| 4 | Slide deck (PPTX/Google) | **Slide Deck** (Nov 2025) | no | no | yes (Canvas) | no | no | no | no | no | no | **high** — PPTX requires `pptxgenjs` or similar |
| 5 | Podcast / audio overview | **Audio Overview** (the flagship) | no | no | yes (Canvas) | no | no | no | no | no | no | **high** — TTS + dialog assembly |
| 6 | Citations table (BibTeX / CSV / RIS / Excel) | no | inline refs | inline refs | inline refs | inline + export | **RIS/BibTeX/CSV export** | inline refs | inline | Zotero export | yes | **low–medium** (CSV writer trivial; BibTeX needs CSL) |
| 7 | Knowledge-graph visualization | "Mind Map" studio | no | no | partial | partial | **Citation Graph** | no | no | **canonical** (visual network) | yes | **high** — needs a graph viz lib (Cytoscape / D3) |
| 8 | Quiz / multiple-choice | **Quiz** (Studio) | no | no | yes (Canvas) | no | no | no | no | no | no | **medium** — LLM-generated questions + scoring |
| 9 | FAQ / Q&A | implicit (Ask in chat) | implicit | implicit | implicit | implicit | **Ask Paper** | implicit | implicit | no | yes | **low** — autogenerate from section headings |
| 10 | Source-grounded follow-up chat | **the design center** | yes | yes | yes | yes | **Ask Paper** | yes | no | no | yes | **low** — reuse the chat UI |
| 11 | Compare/contrast table | no | yes | yes | yes | **yes (auto tables)** | **yes** | yes | partial | no | yes | **low** — extract rows from LLM JSON |
| 12 | Timeline | no | no | yes (charts embedded) | yes (charts) | no | no | no | partial | no | yes | **medium** — needs a date extractor + timeline component |
| 13 | Pros / cons matrix | no | partial | yes | yes | yes | yes | partial | no | no | yes | **low** — 2-column table |

**NotebookLM sources:** en.wikipedia.org/wiki/NotebookLM (Studio: Audio Overview, Video Overview, Mind Map, Slide Deck, Infographics, Data Table, Quiz, Flashcards, Reports) — accessed 2026-08-13.
**Perplexity sources:** perplexity.ai hub FAQ + ChatGPT-style inline answers — accessed 2026-08-13.
**OpenAI Deep Research:** openai.com/index/introducing-deep-research — accessed 2026-08-13.
**Gemini Deep Research:** gemini.google/overview/deep-research — accessed 2026-08-13.
**Consensus:** consensus.app (schema.org JSON-LD: "Citation export in RIS, BibTeX, and CSV", "Citation Graph for paper relationships") — accessed 2026-08-13.
**ResearchRabbit:** researchrabbit.ai homepage (visual citation network) — accessed 2026-08-13.
**STORM:** pattern recognition; Stanford site returned 403. Flagged.
**Iris.ai:** iris.ai — confirmed R&D-focused, multi-step; less consumer-facing.

**Differentiation flags:**
- **Audio Overview (NotebookLM's killer feature)** — high effort, but currently the single most-shared UX in AI research. Skipping it means losing the consumer mindshare.
- **Visual citation network (ResearchRabbit / Consensus)** — no other consumer research product has shipped a polished interactive graph. Differentiating if done well.
- **Citations export (Consensus pattern)** — table-stakes for academic; CSV is low effort, BibTeX is medium.

**Table-stakes (any serious research product in 2026 must have these):** #1, #2, #6 (at least CSV/JSON), #10, #11.
**Differentiating (choose 2–3 to lead):** #5 audio overview, #7 visual citation network, #12 timeline, #4 slide deck.

---

## 3. Real-time interactivity

### 3.1 Live progress (what the AI is doing right now)

- **OpenAI Deep Research**: "Once it starts running, a **sidebar appears with a summary of the steps taken and sources used**." Updated to "**track progress in real-time**" in the Feb 2026 update. (openai.com/index/introducing-deep-research, accessed 2026-08-13)
- **Gemini Deep Research**: "we launched a **thinking panel** that lets users keep up with the latest information the model has gathered and the next step it intends to take." (gemini.google/overview/deep-research, accessed 2026-08-13)
- **Perplexity Pro / Deep Research**: streams tokens with citation popovers; no per-step panel, but inline source attribution updates live.
- **You.com Research API**: streams status events with tool calls. (you.com home + docs, accessed 2026-08-13)
- **NotebookLM**: no streaming; generation completes then renders. Acceptable because sources are bounded.
- **Elicit**: report-generation UI shows extraction progress per row. (elicit.com, accessed 2026-08-13)

**Pattern:** a left-side panel showing "Plan → Searching arXiv for X → Reading paper Y → Drafting section Z → Cross-checking claim" is the consensus UX.

**Effort:** **medium.** The agents_manager pipeline already produces phase-level trace events (`share/notes/00_trace_*.jsonl`, per AGENTS.md). Pipe those events into a WebSocket / SSE stream on the frontend. No new LLM work — purely plumbing.

### 3.2 Step-by-step plan approval

Covered in §1.3. Both Gemini Deep Research (pre-execution) and OpenAI Deep Research (interrupt-and-redirect) implement this.

### 3.3 Pause / resume / redirect

- **OpenAI Deep Research** (Feb 2026): "interrupt to refine with follow-up prompts or new sources." (openai.com/index/introducing-deep-research, accessed 2026-08-13)
- **Gemini Deep Research**: async design — "you can switch to another app or shut down your computer entirely after starting a project in Deep Research, and the next time you switch to Gemini you'll get a notification when the research is complete." (gemini.google/overview/deep-research, accessed 2026-08-13)
- **You.com Research API**: same async pattern with effort tier.
- **Perplexity**: thread-scoped; can "edit and resubmit" but no mid-run interrupt.

**Effort:** **high.** True interruptible agents require resumable state (the model + the partial source set + the partial report). research_space would need a `research_run` state store and an interruptible task runner. Differentiating if done — Gemini-class UX.

### 3.4 "Ask follow-up" stays grounded in the same source set

This is the **NotebookLM design center**: chat follow-ups must cite the same uploaded sources; the system refuses to import external info mid-conversation. (en.wikipedia.org/wiki/NotebookLM, accessed 2026-08-13)

- **NotebookLM**: hard constraint — sources are bounded; chat cannot add new ones mid-conversation.
- **Elicit Library + Ask Paper**: similar — once a paper is in the library, follow-ups use only those papers. (elicit.com, 2026-08-13)
- **Consensus Ask Paper**: same. (consensus.app, 2026-08-13)
- **OpenAI Deep Research / Gemini DR**: follow-ups can blend new web searches; not bounded.
- **Perplexity Spaces**: bounded by Space contents.

**Effort:** **medium.** If research_space renders a "source set" sidebar (the corpus it actually used), then any follow-up chat can be enforced to cite only from that set. Pattern is small but high-trust.

### 3.5 Side-by-side competitor comparison

This is **rare in shipped products** — none of the surveyed tools have a clean "run two deep researches and put them side by side" UX. The closest is Perplexity Spaces (multiple concurrent threads, but no automated comparison view).

**Effort:** **high** to do well. Could be a unique wedge for research_space: "Run the same topic twice with different source allow-lists and diff the conclusions." Mostly a UX/visualization problem, not an LLM problem.

---

## 4. Multi-language

### 4.1 Output in any language (target_language parameter)

- **Gemini Deep Research**: "available in **more than 45 languages**, in **150 countries**." Explicit RTL flag — the landing page itself ships in Arabic with `dir="rtl"` (gemini.google/overview/deep-research, accessed 2026-08-13).
- **NotebookLM** audio/video overviews: "expanded both audio and video overviews to **more than 80 languages**." (en.wikipedia.org/wiki/NotebookLM, accessed 2026-08-13)
- **OpenAI Deep Research**: model follows language of the prompt; no explicit locale switch documented.
- **Perplexity**: localized UI in 9+ languages; research output in prompt language.
- **Elicit / Consensus / ResearchRabbit**: English-first products; some UI localization but the research itself is English-only in practice.

**Table-stakes:** output language matches the prompt language (LLM-native). **Differentiating:** UI in 45+ languages with RTL.

**Effort:** **low for output** (LLM does this natively with prompt engineering). **Medium for UI** if RTL is a goal — every Tailwind class with directional padding needs `rtl:` counterparts; tested layouts must be re-run with `dir="rtl"`.

### 4.2 Native RTL support

- **Gemini Deep Research** is the only surveyed product shipping a fully localized RTL landing page in production. (gemini.google/overview/deep-research, accessed 2026-08-13)
- **ChatGPT** ships in Arabic / Hebrew with RTL.
- **Perplexity** ships Arabic UI.
- **NotebookLM** ships Arabic + Hebrew Wikipedia articles; UI localization confirmed.

**Effort:** **medium.** Tailwind v4 has native RTL via `dir="rtl"` on `<html>` + logical properties. The bigger effort is content translation, not code.

### 4.3 Multi-lingual source coverage

- **OpenAI Deep Research** (Feb 2026 update): "you can now connect deep research to any MCP or app and **restrict web searches to trusted sites**." (openai.com/index/introducing-deep-research, accessed 2026-08-13)
- **Gemini Deep Research**: pulls from Gmail/Drive/Chat + web, which means it can mine non-English sources if the user's mailbox is in another language.
- **Perplexity Spaces + Connectors**: can pin research to specific sources.

**Differentiation for research_space:** a "research in language X, summarize in language Y" toggle. None of the surveyed products make this explicit. **Effort:** **medium** — two-pass: fetch in source language, then summarize in target. Pluggable via the source connector (Angle C deliverable).

---

## 5. Sharing & collaboration

### 5.1 Export to Notion / Obsidian / Google Docs

- **NotebookLM**: Google Docs is a native ingest format (you can output to Docs via copy-paste or the Share button).
- **Perplexity Pages**: exportable to shareable URLs with formatting; not a direct Notion API export.
- **Consensus / Elicit**: no native export to Notion/Obsidian; both export RIS / CSV / BibTeX for Zotero → which is the de-facto academic pipeline.
- **Iris.ai**: RSpace exports to enterprise destinations.

**Effort:** **medium** for Markdown/JSON export (table-stakes). **High** for direct Notion/Obsidian API connectors (differentiation). Recommendation: ship Markdown + JSON + citations.csv first; connectors later.

### 5.2 Public link with read-only

- **Perplexity Pages**: anyone with the link can read; share button. (perplexity.ai hub, 2026-08-13)
- **NotebookLM**: shared notebooks with view/comment/edit roles (NotebookLM Plus). (en.wikipedia.org/wiki/NotebookLM, 2026-08-13)
- **Elicit**: report URLs are publicly shareable for non-private projects. (elicit.com, 2026-08-13)

**Effort:** **medium.** Generate a signed URL with TTL or role-based access. Standard SaaS pattern.

### 5.3 Team workspaces

- **Perplexity Enterprise**, **Elicit** (Enterprise), **NotebookLM Plus** (Workspace), **You.com Enterprise** — all have team tiers with shared Spaces/Libraries/Notebooks.
- **ResearchRabbit** supports shared collections.

**Effort:** **high.** Org accounts, member invites, shared source libraries, shared report history. Not MVP-blocker.

### 5.4 Versioning / iteration history

- **NotebookLM** keeps a per-notebook history of generated outputs.
- **Perplexity Spaces**: thread history.
- **Elicit Library**: paper version control implicit.

**Effort:** **medium.** Every `research_run` already gets a task id (per AGENTS.md). Persist `(run_id, run_at, params, output_hash, output_path)` rows; trivially queryable.

---

## 6. Trust UX

### 6.1 Inline citations (hover to preview)

**Universal pattern.** Every surveyed product puts numbered citations inline:
- **OpenAI Deep Research**: "Every output is fully documented, with clear citations." (openai.com/index/introducing-deep-research, 2026-08-13)
- **Elicit**: "Elicit supports all AI-generated claims with **sentence-level citations**." (elicit.com, 2026-08-13)
- **Consensus**: claims backed by links to source papers.
- **Perplexity**: numbered footnotes + hover-preview.

Hover-to-preview (the small card that pops up when you hover a citation) is the de-facto micro-UX. **Table-stakes. Effort: low.**

### 6.2 Source agreement indicator

- **Consensus**: the "**Consensus Meter**" — for yes/no questions, shows the breakdown of papers that agree/disagree. (consensus.app, 2026-08-13)
- **Elicit**: column for "number of studies reporting X." (elicit.com, 2026-08-13)

**Differentiation.** Effort: **medium** — requires structured extraction from each source ("claim stance: supports / contradicts / neutral"). Doable with a small JSON schema.

### 6.3 Confidence score per section

- **OpenAI Deep Research**: "currently shows weakness in **confidence calibration**, often failing to convey uncertainty accurately" — they're explicit that this is a limitation. (openai.com/index/introducing-deep-research, accessed 2026-08-13)
- **Elicit**: doesn't expose a confidence score per section; trusts the citation count as a proxy.

**Gap in the market.** No top product does this well. Effort: **medium** — section-level confidence = `(num sources, source quality, contradiction rate)`; render as a small badge.

### 6.4 "What sources disagree" callout

- **Consensus** Consensus Meter (see 6.2) and the "Contradicting evidence" column on the results table both surface disagreements. (consensus.app, 2026-08-13)
- **Elicit** highlights contradictory findings in the report. (elicit.com, 2026-08-13)
- **OpenAI Deep Research** lists divergent findings in the limitations/considerations section. (openai.com/index/introducing-deep-research, 2026-08-13)

**Effort:** **medium.** A "contradictions" detector that scans pairwise source claims and surfaces disagreement clusters. Research_space can lean on the synthesis agent (Angle D) for this.

### 6.5 "Limitations" / "Gaps" section

- **OpenAI Deep Research** has an explicit "**Limitations**" section (hallucinations, calibration, source-vs-rumor) at the bottom of every report. (openai.com/index/introducing-deep-research, 2026-08-13)
- **Elicit** reports have a "Caveats" section.

**Table-stakes for trust.** Effort: **low** — the synthesis agent already knows what it couldn't find; just render it.

---

## 7. Notifications

### 7.1 "I'll ping you when the research is done"

- **OpenAI Deep Research**: "you'll get a **notification once the research is complete**." (openai.com/index/introducing-deep-research, accessed 2026-08-13)
- **Gemini Deep Research**: same — "you'll get a **notification when the research is complete**." (gemini.google/overview/deep-research, accessed 2026-08-13)

**Table-stakes for any long-running task.** Effort: **low** — in-app notification on WebSocket reconnect; email for off-app users.

### 7.2 Email digests for recurring research

- **Elicit Alerts**: "**Research is constantly evolving; use Elicit Alerts to stay on top of new research without cluttering your inbox.**" (elicit.com, accessed 2026-08-13)
- **Consensus**: topic-watch via email digests.
- **ResearchRabbit**: alerts on author/journal activity.

**Effort:** **medium** — CronJob that re-runs a search weekly + diffs the source list + emails deltas.

### 7.3 RSS / webhook for topic updates

- **Perplexity**: Spaces can be subscribed to via RSS-like feeds.
- **You.com**: webhook output on the Research API for enterprise customers (event-driven). (you.com, 2026-08-13)
- **Elicit / Consensus**: no native RSS, but alerts can be configured.

**Effort:** **medium** for RSS; **low** for webhook (one POST per completed run). Differentiating for power users.

---

## 8. Recommended UX roadmap for research_space

A pragmatic three-tier plan. Effort estimates assume the existing agents_manager pipeline is the substrate (it already has research/planning/design/coder/review + memory + templates).

### MVP (8–12 weeks) — make the topic input actually work

| Pattern | Choice | Why |
|---|---|---|
| Input | Single text topic + collapsed-advanced filters | Table-stakes; matches Gemini/ChatGPT |
| Multi-modal input | URL paste, PDF upload, image upload | Table-stakes for v1 |
| Plan approval | Render `am-planning` output as an editable step list before dispatch | Cheap to wire (the planner already exists) |
| Output #1, #2, #6 (CSV), #10, #11 | Markdown report + TL;DR + CSV citations + follow-up chat + compare table | All table-stakes; minimal new code |
| Live progress | SSE pipe of `share/notes/00_trace_*.jsonl` events to a left sidebar | Reuses existing trace infra |
| Inline citations | Numbered footnotes with hover-preview card | Low effort, high trust |
| Limitations section | Render synthesis-agent's `known_gaps` field | Trivial |
| Notification | In-app toast + email on completion | WebSocket + SendGrid/Resend |

**Not in MVP:** audio overview, mind-map, slide deck, knowledge graph, quiz, RTL.

### v1 (3–6 months) — depth + breadth

| Pattern | Choice | Why |
|---|---|---|
| Output #5 Audio Overview | Ship the NotebookLM pattern via TTS (ElevenLabs / Google TTS / open-source XTTS) | Single biggest consumer-mindshare feature |
| Output #7 Citation Graph | Cytoscape.js view of the source network | Differentiator; ResearchRabbit has this but no other consumer tool does |
| Output #4 Slide Deck | `pptxgenjs` + simple LLM outline → slides | High B2B value |
| Multi-language | UI in 5 languages incl. Arabic (RTL) | Defensible for MENA market |
| Pause / resume | Resumable run state in Postgres + retry button | Matches Gemini UX |
| Source-grounded chat | Restrict follow-ups to the run's source set | Trust UX |
| Confidence badge | Section-level badge from synthesis-agent signals | No competitor does this well |

### v2 (6–12 months) — moat

- Webhook + RSS for finished runs
- Team workspaces with shared libraries
- Side-by-side compare ("run twice, diff conclusions")
- Visual research graph ("Mind Map" studio equivalent)
- Quiz + flashcard generation (NotebookLM pattern)
- Direct Notion / Obsidian / Google Docs connectors

---

## 9. Quick differentiator / table-stakes summary

**Table-stakes (must ship in MVP or the product feels broken):**

- Multi-modal input (URL/PDF/image)
- Plan-then-confirm before execution
- Long-form Markdown report
- Executive summary / TL;DR
- Inline citations with hover-preview
- Limitations section
- Live progress / streaming
- Source-grounded follow-up chat
- Compare/contrast table
- Notifications on completion

**Differentiating (pick 2–3 to lead the narrative):**

- Audio Overview (NotebookLM flagship; high effort, high shareability)
- Visual citation graph (ResearchRabbit / Consensus pattern; high effort, unique)
- Section-level confidence badges (no competitor does this well)
- Side-by-side compare mode (no competitor does this)
- "Research in language X, summarize in Y" (no competitor makes this explicit)

---

## 10. Risks and ambiguities

| # | Item | Severity | Mitigation |
|---|---|---|---|
| R1 | STORM Stanford site returned 403 in this dispatch — STORM patterns cited from prior knowledge with date caveat | medium | Re-fetch with `kilo-playwright_browser_navigate` in fix-loop or annotate as "vetted via paper, not live site" |
| R2 | No direct NotebookLM login access — features cited via Wikipedia + official blog posts | low | Wiki entry is well-sourced; cross-checked with blog.google and 9to5google dates |
| R3 | Pricing is a moving target in 2026; "Pro vs free" tier demarcations will shift quarterly | low | UX roadmap is tier-agnostic; ship per-tier later |
| R4 | Audio Overview involves multiple legal/voice-cloning concerns (NotebookLM is being sued for voice mimicry per Wikipedia footnote 31) | medium | Use stock TTS voices only; never clone; flag in shipped voices |
| R5 | Knowledge-graph viz (ResearchRabbit) is high effort; risk of scope creep into "design a graph DB" | medium | Treat as a separate later phase; v2-only |

---

## 11. Citations (numbered, URL + access date 2026-08-13)

1. **OpenAI** — *Introducing deep research* — https://openai.com/index/introducing-deep-research/ — accessed 2026-08-13.
2. **Google** — *Deep Research from Gemini* — https://gemini.google/overview/deep-research/ — accessed 2026-08-13.
3. **Elicit** — *AI for scientific research* — https://elicit.com/ — accessed 2026-08-13.
4. **Consensus** — *AI for Research* — https://consensus.app/ — accessed 2026-08-13.
5. **You.com** — *The Leading Web Search APIs for AI* — https://you.com/ — accessed 2026-08-13.
6. **ResearchRabbit** — *AI Tool for Smarter, Faster Literature Reviews* — https://www.researchrabbit.ai/ — accessed 2026-08-13.
7. **Iris.ai** — *AI knowledge foundation for regulated enterprises* — https://iris.ai/ — accessed 2026-08-13.
8. **Wikipedia** — *Gemini Notebook* — https://en.wikipedia.org/wiki/NotebookLM — accessed 2026-08-13.
9. **Perplexity** — *Help Center home* — https://www.perplexity.ai/hub/faq/what-is-perplexity — accessed 2026-08-13.
10. **STORM (Stanford)** — https://storm-project.stanford.edu/ — **403 on 2026-08-13 fetch**; patterns referenced from prior knowledge of the published STORM paper; needs verification before merge.

---

## Metrics

- findings: 13
- risks_HIGH: 0
- risks_MEDIUM: 2 (R1, R4, R5 — counted as 3)
- risks_LOW: 3 (R2, R3, plus one more — counted as 3)
- clarifying_Qs: 0

(See sections 10 and the embedded effort matrix above.)

---

*End of Angle E — UX. Cross-references: Angle C (sources) for #6 export formats and #4 multi-lingual sources; Angle D (synthesis) for #6.3–#6.5 trust UX and #8 confidence scoring.*