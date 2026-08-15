# PROGRESS.md — Research log: Google NotebookLM (Gemini Notebook)

> Session date: 2026-08-10. Scope: NotebookLM operation, input support, output support, features, tiers, API, timeline. Every step below is logged with queries, findings, sources, decisions, and confidence ratings.

---

## Step 1 — Initial parallel search sweep (4 queries)

**Query 1.1 (exa):** `Google NotebookLM how it works grounded retrieval RAG architecture citations grounding` → 10 results.
- **Key finds:** Official "Learn about NotebookLM" help page (https://support.google.com/notebooklm/answer/16164461) — describes grounded chat, inline citations, source types, "information not in sources" behavior. 2023 launch blog (https://blog.google/innovation-and-ai/technology/ai/notebooklm-google-ai/) — source-grounding concept, no training on user data. 2024 global-launch blog (https://blog.google/innovation-and-ai/products/notebooklm-goes-global-support-for-websites-slides-fact-check/) — Gemini 1.5 Pro, Slides/URLs, Notebook Guide. Jul 2025 retrospective (https://blog.google/innovation-and-ai/products/developing-notebooklm/) — origin story (Project Tailwind, mid-2022, 6-week prototype). DEV Community architecture deep-dive (https://dev.to/jubinsoni/architecting-the-future-of-research-a-technical-deep-dive-into-notebooklm-and-gemini-integration-m60) — blog-grade analysis: source grounding, Gemini 1.5 Pro long context vs chunked RAG. Third-party guide (https://notebooklm-guide.com/notebooklm-grounded-rag-pipeline/) — closed-loop RAG framing.
- **Decision:** Use official help + blog as primary; dev.to/guides as secondary analysis only.

**Query 1.2 (exa):** `NotebookLM supported input formats Google Docs PDFs slides URLs YouTube audio files Google Drive 2025` → 10 results.
- **Key finds:** Official "Add or discover new sources" (https://support.google.com/notebooklm/answer/16215270) — full input list incl. audio codecs, images, ePub, YouTube constraints, Drive import rules. Blog: YouTube+audio sources (https://blog.google/innovation-and-ai/products/notebooklm-audio-video-sources/), Nov 2025 file-type expansion (https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-deep-research-file-types/). AI Weekly 2026 guide (https://aiweekly.co/learning-ai/generative-ai/how-to-use-notebooklm) — per-source 500k words/200MB, sync-from-Drive claim.
- **Decision:** Input table sourced from official help page; the "syncs automatically every few minutes" claim from AI Weekly is third-party → marked lower confidence (not in official docs).

**Query 1.3 (exa):** `NotebookLM output formats Audio Overviews podcast generation notes citations shareable links` → 10 results.
- **Key finds:** Official Audio Overview help (https://support.google.com/notebooklm/answer/16212820) — Deep Dive/Brief/Critique/Debate formats, 80+ languages, interactive Join (English-only), share links, download. Audio Overview launch blog (https://blog.google/innovation-and-ai/products/notebooklm-audio-overviews/). "Create a notebook" help (https://support.google.com/notebooklm/answer/16206563) — Studio artifacts: notes, audio/video overviews, mind maps, reports, flashcards, quizzes, data tables, export to Sheets/Docs. Explore AI Together export guide (https://exploreaitogether.com/export-download-notebooklm-guide/) — WAV downloads, Docs export (Dec 2025), PPTX export, no full-notebook export.
- **Decision:** Artifact table from official help; export format details (WAV etc.) flagged third-party.

**Query 1.4 (firecrawl search):** `NotebookLM sources limit 50 sources per notebook Plus Business pricing tiers features` → 10 results.
- **Key finds:** notebooklm.google/plans (official) — sources: 50/100/300/600 (Standard/Plus/Pro/Ultra); multiple third-party limit tables (elephas.app, felloai.com, notebooklm-guide.com) with **conflicting numbers** (Plus 100 vs 300 sources; audio counts vary).
- **Decision:** Do NOT trust third-party tables for the limits table; fetch official help-center page in Step 3.

---

## Step 2 — API, timeline, Plus, plans (4 queries)

**Query 2.1 (exa):** `NotebookLM API Gemini API notebooklm.generateAudioOverviews docs developers` → 8 results.
- **Key finds:** Official Google Cloud docs — NotebookLM Enterprise API: audio overviews create/delete (https://docs.cloud.google.com/gemini/enterprise/notebooklm-enterprise/docs/api-audio-overview), notebooks CRUD/share (https://docs.cloud.google.com/gemini/enterprise/notebooklm-enterprise/docs/api-notebooks), RPC reference `google.cloud.notebooklm.v1alpha` (https://docs.cloud.google.com/gemini/enterprise/docs/reference/rpc/google.cloud.notebooklm.v1alpha). Gemini Lab walkthrough (https://gemilab.net/en/articles/gemini-advanced/notebooklm-gemini-api-research-workflow-automation) — `google-cloud-notebooklm` Python lib, generate_podcast. Unofficial SDKs: agmmnn/notebooklm-sdk (https://github.com/agmmnn/notebooklm-sdk), teng-lin/notebooklm-py (https://github.com/teng-lin/notebooklm-py) — both self-declared unofficial/reverse-engineered.
- **Decision:** Report API as enterprise-only; list unofficial SDKs clearly labeled.

**Query 2.2 (exa):** `NotebookLM history timeline evolution "Ask for me" feature Gemini 1.5 launch 2023` → 8 results.
- **Key finds:** Steven Johnson's Substack (https://adjacentpossible.substack.com/p/introducing-notebooklm) — Oct 2023: 10 sources × 50k words, PDFs/pasted text, suggested follow-ups. The Verge Aug 2023 (https://www.theverge.com/23845856/google-notebooklm-tailwind-ai-notes-research) — 5 sources × 10k words at launch (prototype era). The Verge Jun 2024 (https://www.theverge.com/2024/6/6/24172422/google-notebooklm-ai-gemini-pro-chatbot) — "closed system", 50 sources, Gemini 1.5 Pro. Android Central Dec 2023 (https://www.androidcentral.com/apps-software/notebooklm-us-launch-new-features) — public US launch, Gemini Pro, 16 features. Wikipedia (https://en.wikipedia.org/wiki/Gemini_Notebook) — Oct 17 2024 stable, Dec 2024 Plus, Jul 16 2026 Gemini Notebook rebrand + secure cloud computer. Creator Economy interview (https://creatoreconomy.so/p/notebooklm-small-teams-big-impact-ai) — Audio Overview built in ~2 months, TikTok virality.
- **Decision:** Reconcile source-count history as a clear evolution (5→10→50). **"Ask for me" not found in any NotebookLM context** → flagged for dedicated check in Step 4.

**Query 2.3 (exa):** `NotebookLM Plus launch December 2024 business enterprise features announcement` → 8 results.
- **Key finds:** Official Dec 13 2024 blog (https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-new-features-december-2024/) — redesign, interactive audio, NotebookLM Plus ("5x more Audio Overviews, notebooks and sources per notebook"), Gemini 2.0 Flash experimental. Workspace Updates blog (https://workspaceupdates.googleblog.com/2024/12/notebooklm-plus-gemini-for-google-workspace-users.html) — Gemini add-ons, 180+ regions, 35+ languages, English-only audio then. 9to5Google (https://9to5google.com/2024/12/13/notebooklm-redesign-plus-tier/) — Plus numbers: 3→20 Audio Overviews/day, 100→500 notebooks, 50→500 chats/day, 50→300 sources; Google One AI Premium in early 2025. Computerworld/VentureBeat — enterprise details, Agentspace, $20/user/month Workspace add-on.
- **Decision:** Dec 2024 Plus numbers came from press; the current official table (Step 3) supersedes them — present both with dates.

**Query 2.4 (firecrawl scrape):** `https://notebooklm.google/plans` → full markdown.
- **Key finds (official):** Sources per notebook 50/100/300/600 for Standard/Plus/Pro/Ultra; "2X more generations" (Plus), "5X more" (Pro), "up to 50X more" (Ultra); org/school/enterprise paths; customer logos (ASU, Deloitte, Shopify…); privacy statement (no training on org data); FAQ confirming rebrand July 2026.
- **Decision:** Use this + help-center table as the authoritative tier source.

---

## Step 3 — Feature gap-fill (4 queries)

**Query 3.1 (exa):** `NotebookLM "Ask for me" OR "ask for you" feature product update` → 6 results.
- **Key finds:** No NotebookLM feature named "Ask for me." Closest: "Ask NotebookLM" step in Google Workspace Studio (Jul 2026, https://releasebot.io/updates/google/notebooklm); chat follow-up question suggestions (https://thoughtsbrewing.com/blog/ai-quick-tips-360-follow-up-questions-in-notebooklm-chats). "Ask for Me" is Google Search's local-business calling agent (https://www.nearmedia.co/memo/), unrelated to NotebookLM.
- **Decision:** Conclude the "Ask for me" feature is a misattribution (likely confused with Search's "Ask for Me" or Gemini features); document the closest real equivalents.

**Query 3.2 (exa):** `NotebookLM Video Overviews launch announcement mind maps infographics slides 2025` → 8 results.
- **Key finds:** Official Video Overviews blog (https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-video-overviews-studio-upgrades/, Jul 29 2025) — narrated slides, Studio tiles, multi-output; 80-language expansion (https://blog.google/innovation-and-ai/models-and-research/google-labs/notebook-lm-audio-video-overviews-more-languages-longer-content/, Aug 25 2025); XDA (https://www.xda-developers.com/notebooklm-slide-deck-infographics-feature/) — Slide Decks + Infographics (Nov 2025), Nano Banana; TechCrunch/Verge coverage confirmed dates.
- **Decision:** Video/slide/infographic dates anchored to official blogs; XDA flagged third-party for Nano Banana claim.

**Query 3.3 (exa):** `NotebookLM mobile app iOS Android offline audio overviews support.google.com` → 8 results.
- **Key finds:** Official app launch blog (https://blog.google/innovation-and-ai/products/notebooklm-app/, May 19 2025); official mobile-app help (https://support.google.com/notebooklm/answer/16296687) — app source-type subset, no notes/mind maps/reports/data tables in app, offline audio download (in-app only); 9to5Google/Android Central confirmations.
- **Decision:** Mobile limitations taken from official help page.

**Query 3.4 (exa):** `NotebookLM Gemini 2.5 model version which Gemini powers NotebookLM 2025 2026` → 6 results.
- **Key finds:** 9to5Google May 2025 (https://9to5google.com/2025/05/02/notebooklm-gemini-2-5-flash/) — Gemini 2.5 Flash powers chat; Dec 2025 (https://9to5google.com/2025/12/19/notebooklm-gemini-3-data-tables/) — Gemini 3 + Data Tables; official Jun 8 2026 blog (https://blog.google/innovation-and-ai/products/notebooklm/better-research-notebooklm/) — **Gemini 3.5 + Antigravity**, secure cloud computer, thinking steps, new output formats (charts png/svg, docs, csv/json, xlsx, pptx), Ultra-first; MakeUseOf (https://www.makeuseof.com/these-notebooklm-updates-make-our-favorite-research-tool-even-smarter/) — 100+ curated software skills.
- **Decision:** Model lineage table assembled from official announcements where available; 2.5 Flash/Gemini 3 via 9to5Google citing official X posts (high confidence, press-sourced).

---

## Step 4 — Official limits verification (1 scrape)

**Query 4.1 (firecrawl scrape):** `https://support.google.com/gemininotebook/answer/16213268?hl=en` ("Upgrade Gemini Notebook").
- **Key finds (official, authoritative):** Full limits table Standard/Plus/Pro/Ultra(20TB)/Ultra(30TB): notebooks 100/200/500/500/500; sources 50/100/300/500/600; chats 50/200/500/2.5K/5K per day; Audio Overviews 3/6/20/100/200 per day; Video Overviews 3/6/20(Cinematic 2)/100(10)/200(20); Reports/Flashcards/Quizzes/Mind Maps 10/20/100/500/1K per day; Deep Research 10/month → 3/20/75/200 per day; Data Tables/Infographics/Slide Decks "Limited→Highest". Watermark removal Ultra-only. Data-handling policy: no training without feedback; Workspace never reviewed/trained; enterprise VPC-SC + IAM + regionalization. Quota reset 24h/30d; one-time starter artifacts excluded. Enterprise via Cloud: 5X+ artifacts.
- **Decision:** This table is THE canonical limits source; third-party tables with conflicting numbers are explicitly noted as superseded in FINDINGS §6.

**Total steps: 4 batches, 13 queries/scrapes. Sources used: 40+ URLs (12 official Google domains incl. blog.google, support.google.com, workspaceupdates.googleblog.com, docs.cloud.google.com, notebooklm.google; press: The Verge, 9to5Google, TechCrunch, Android Central, VentureBeat, Forbes, BGR, XDA, MacRumors, Computerworld, eMarketer; third-party guides: teacherandtask, notebooklm-guide, exploreaitogether, recast.studio, elephas, felloai, aiweekly, makeuseof, gemilab.net, releasebot, creator economy; Wikipedia).**

---

## Decisions made during research

1. **Primary sources = official Google** (blog.google, support.google.com/gemininotebook, docs.cloud.google.com, notebooklm.google). Press used to date events and confirm; third-party guides used only for operational detail (e.g., WAV file format, PPTX export) and always flagged.
2. **Limits table** taken exclusively from the official help center (Step 4.1) — third-party tables conflict with each other and with official numbers.
3. **"Ask for me"** investigated specifically (Step 3.1); concluded it's a misattribution (likely Google Search's "Ask for Me" local-business agent). Documented the real NotebookLM equivalents (suggested follow-ups, chat goals, Deep Research, Workspace Studio "Ask NotebookLM" step).
4. **Model version claims:** only officially announced switches are stated as fact (Gemini Pro Dec 2023, 1.5 Pro Jun 2024, 2.0 Flash Dec 2024, 3.5+Antigravity Jun 2026); 2.5 Flash and Gemini 3 are press-confirmed via official X posts → high confidence but marked as press-sourced. Launch-era model (Jul 2023) not officially confirmed → left unspecified.
5. **Rebrand to Gemini Notebook (Jul 16, 2026)** reported by Wikipedia + official FAQ on notebooklm.google ("as of July 2026") → high confidence.
6. **Conflicting detail flagged:** "Plus = 5x" (Dec 2024 launch) vs "Plus = 2x" (current official table); audio overview counts on third-party sites vary (3/6 vs 3/20). Official current table wins; history preserved in timeline.

---

## Confidence notes per claim family

| Claim | Confidence | Basis |
|---|---|---|
| Source grounding / closed system / refusal behavior | **Verified (official)** | Google blog 2023 + 2024; help center 16164461/16179559; Verge interview quote |
| Inline citations (hover/click) | **Verified (official)** | help 16179559, 16164461 |
| No training on user data (consumer) | **Verified (official)** | blogs 2023/2024; help 16213268 (with feedback exception) |
| Input format list + per-type limits | **Verified (official)** | help 16215270; blog Nov 2025 for Drive-URL/Sheets/docx/images |
| Per-source cap 500k words / 200MB | **Verified (official)** | help 16213268 (table note); Verge 2024 |
| Audio Overview formats/languages/interactive | **Verified (official)** | help 16212820; blogs Sep 2024–Aug 2025 |
| Video Overviews + 80 languages + Cinematic (Ultra) | **Verified (official)** | blog Jul 29 2025, Aug 25 2025; help 16213268 (Cinematic limits) |
| Studio artifacts (reports, mind maps, flashcards, quizzes, data tables, infographics, slide decks) | **Verified (official)** | help 16206563, 16213268; blog Dec 2025 (Gemini 3/data tables) |
| Export mechanics (WAV download, Docs/Sheets export, PPTX) | **Medium (official help + one third-party)** | help 16206563 (Sheets export); exploreaitogether for WAV/PPTX/Docs details |
| Limits table (50/100/300/500/600 etc.) | **Verified (official)** | help 16213268 (fetched live) |
| Plus 5x / One AI Premium inclusion | **Verified (official)** | blog Dec 13 2024; Workspace Updates; 9to5Google |
| Enterprise API surface (notebooks, audioOverviews, v1alpha, IAM) | **Verified (official)** | docs.cloud.google.com (3 pages) |
| No consumer API / unofficial SDKs | **High** | absence of official docs + SDK self-descriptions |
| Model lineage (Gemini Pro→1.5→2.0→2.5→3→3.5) | **High** | official blogs for 4 switches; press (quoting official X) for 2.5 Flash & Gemini 3 |
| 1M-token context window in chat | **Verified (official)** | blog Oct 29 2025; 9to5Google |
| Rebrand Gemini Notebook Jul 2026 | **High** | official FAQ + Wikipedia |
| Secure cloud computer / 100+ skills (Jun 2026) | **High** | official blog + MakeUseOf; Wikipedia dates it Jul 16 2026 — date presented with both sources |
| Mobile app scope/limits | **Verified (official)** | blog May 19 2025; help 16296687 |
| "Closed-loop RAG / chunk-embed-retrieve" pipeline detail | **Speculation/analysis** | third-party blog-grade breakdowns (teacherandtask, notebooklm-guide, dev.to) — Google publishes no official architecture docs |
| Source counts 5→10→50 historical evolution | **High (historical)** | Verge 2023 (5), Substack Oct 2023 (10), Verge/blog Jun 2024 (50) |
| Google Search–assisted source discovery (Jun 2026) | **High** | official blog 2026-06-08 + MakeUseOf |
| "Ask for me" NotebookLM feature | **None — disproven** | absent from all official sources; nearest matches documented |

---

## Known gaps / follow-ups

- Official pricing in USD per tier not published on notebooklm.google (Google AI plans pages regional) — prices quoted by third parties only; deliberately excluded from FINDINGS except as a flagged aside.
- Exact retrieval implementation (chunk sizes, embedding model, retriever type) is **not publicly documented** by Google — all architecture detail beyond the grounding principle is third-party analysis.
- Whether the "secure cloud computer" shipped with the Jun 8 2026 update or the Jul 16 2026 rebrand — sources disagree (MakeUseOf: Jun 8; Wikipedia: Jul 16); both cited.
- PaLM-era model at 2023 launch never officially confirmed.

*Log complete — 13 queries/scrapes across 4 batches, 40+ source URLs, two deliverables written.*
