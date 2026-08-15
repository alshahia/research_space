# Google NotebookLM (now Gemini Notebook) — Research Findings

> Research date: 2026-08-10. Product renamed **Gemini Notebook** in July 2026; "NotebookLM" and "Gemini Notebook" refer to the same product throughout. Every claim cites its URL; confidence ratings per claim in `PROGRESS.md`.

---

## 1. Overview

**NotebookLM** (LM = "Language Model") is Google's AI-powered research and note-taking assistant developed by **Google Labs**. Users upload their own documents ("sources"), then chat with an AI that answers **exclusively from those sources**, with inline citations back to the exact passages used. Launched July 2023 as an experiment (code-named **Project Tailwind**, announced at Google I/O May 2023); **renamed Gemini Notebook on July 16, 2026** with all notebooks preserved. It is a retrieval-augmented generation (RAG) tool, not a general chatbot.

- Product page: https://notebooklm.google/ (FAQ: "NotebookLM is now Gemini Notebook as of July 2026")
- Wikipedia: https://en.wikipedia.org/wiki/Gemini_Notebook

**Positioning:** "an AI-first notebook, grounded in your own documents, designed to help you gain insights faster" — Google blog, Jul 2023 (https://blog.google/innovation-and-ai/technology/ai/notebooklm-google-ai/). Also described as a "personalized AI research assistant" (https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-video-overviews-studio-upgrades/).

**Origin:** mid-2022, a small Google Labs team began building the app (then "Project Tailwind"); the first prototype was built in six weeks by 4–5 people part-time. Steven Johnson (author) is editorial director; Ani Mohan (group PM) and Raiza Martin (senior PM) are key figures. Sources: https://blog.google/innovation-and-ai/products/developing-notebooklm/ (Jul 2025 retrospective); https://creatoreconomy.so/p/notebooklm-small-teams-big-impact-ai (Oct 2024).

---

## 2. How it operates (architecture)

### 2.1 Source grounding — the core design principle

NotebookLM is built on **"source-grounded AI"**: the model has access only to the source material the user uploads. Google: "the model only has access to the source material that you've chosen to upload" (https://blog.google/innovation-and-ai/technology/ai/notebooklm-google-ai/). Raiza Martin: NotebookLM "is a closed system" — no web searches beyond what users add (The Verge, Jun 2024: https://www.theverge.com/2024/6/6/24172422/google-notebooklm-ai-gemini-pro-chatbot). The June 2026 update added Google Search–assisted source *discovery*, but generation remains source-bound (https://blog.google/innovation-and-ai/products/notebooklm/better-research-notebooklm/).

Consequences (official support docs):
- "Gemini Notebook is designed to answer questions based on the information provided in your uploaded sources" (https://support.google.com/notebooklm/answer/16164461).
- Out-of-source or creative requests (e.g. "rewrite the end of my short story") can return "Gemini Notebook can't answer this question" (https://support.google.com/notebooklm/answer/16179559).
- Chat responses use **direct quotes, text, and images from sources as citations**; hovering shows the full quote, clicking navigates to the passage (same URLs above).

### 2.2 Retrieval pipeline (grounded RAG)

Closed-loop RAG: retrieval from a per-notebook index, then generation bounded by the retrieved evidence. Third-party architectural analysis (blog-level, not official) describes: upload → parse → chunk → embed into vector index → embed query → retrieve top-k chunks → build prompt (question + chunks) → Gemini generates → citations inserted (https://www.teacherandtask.com/blog/notebooklm-explained-google-research-tool; https://notebooklm-guide.com/notebooklm-grounded-rag-pipeline/). The DEV Community deep-dive argues Gemini 1.5 Pro's very long context (up to 2M tokens) let NotebookLM de-emphasize aggressive chunking for small/mid datasets ("source grounding" instead of classic vector RAG) (https://dev.to/jubinsoni/architecting-the-future-of-research-a-technical-deep-dive-into-notebooklm-and-gemini-integration-m60).

**Context window:** Oct 2025 — the full **1M-token context window of Gemini** enabled in chat across all plans, ~8x larger than before; multiturn memory up >6x; response quality +50% (https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-custom-personas-engine-upgrade/; https://9to5google.com/2025/10/29/notebooklm-chat-upgrade/).

### 2.3 Model lineage (official announcements)

| Period | Model | Source |
|---|---|---|
| Jul 2023 launch | Unspecified (PaLM-era; not officially confirmed) | — |
| Dec 2023 (US public launch) | Gemini Pro | https://www.androidcentral.com/apps-software/notebooklm-us-launch-new-features |
| Jun 2024 (global) | Gemini 1.5 Pro | https://blog.google/innovation-and-ai/products/notebooklm-goes-global-support-for-websites-slides-fact-check/ |
| Dec 2024 | Gemini 2.0 Flash (experimental) | https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-new-features-december-2024/ |
| May 2025 | Gemini 2.5 Flash (chat/Q&A) | https://9to5google.com/2025/05/02/notebooklm-gemini-2-5-flash/ |
| Dec 2025 | Gemini 3 ("Officially built on Gemini 3!") | https://9to5google.com/2025/12/19/notebooklm-gemini-3-data-tables/ |
| Jun 2026 | Gemini 3.5 + Antigravity (Ultra-first rollout) | https://blog.google/innovation-and-ai/products/notebooklm/better-research-notebooklm/ |

### 2.4 Privacy & data handling

- Sources and chat are not used to train models: "your personal data is never used to train NotebookLM" (https://blog.google/innovation-and-ai/products/notebooklm-audio-overviews/); "We do not use any of the data collected to train new AI models" (https://blog.google/innovation-and-ai/technology/ai/notebooklm-google-ai/).
- Current help-center policy: data not used for training unless the user submits feedback (then the full interaction context may be reviewed); Workspace/Education users are never human-reviewed or training-fed; enterprise (Cloud) data stays in the GCP project, honors data regionalization (https://support.google.com/gemininotebook/answer/16213268).

### 2.5 Interface: three panels (Dec 2024 redesign)

Sources panel (documents), Chat panel (Q&A with citations), Studio panel (artifact generation). "A new interface, optimized for managing and generating new content based on your sources" (https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-new-features-december-2024/). Studio now shows four tiles — Audio Overviews, Video Overviews, Mind Maps, Reports — with multiple outputs of each type allowed per notebook (https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-video-overviews-studio-upgrades/).

---

## 3. Input support (what you can add as a source)

Official list (https://support.google.com/notebooklm/answer/16215270 — "Add or discover new sources"):

| Source type | Details / limits |
|---|---|
| Audio files | MP3, WAV and more: 3g2, 3gp, aac, aif, aifc, aiff, amr, au, avi, cda, m4a, mid, mp3, mp4, mpeg, ogg, opus, ra, ram, snd, wav, wma. Transcribed at import; audio without speech unsupported. **Cannot be imported from Drive.** |
| Copy-pasted text | Plain text pasted directly |
| Google Docs | Imported (copy made); footnotes/comments not imported; multiple tabs pulled in as one source |
| Google Slides | Up to 100 slides |
| Google Sheets | Limited to 100k tokens |
| Images | avif, bmp, gif, heic, heif, ico, jp2, jpe, jpeg, jpg, png, tif, tiff, webp (some types may work less well) |
| Documents | Microsoft Word (docx), TXT, Markdown (md), PDF, CSV, PowerPoint (pptx), **ePub** |
| Web URLs | HTML text scraped only; no images/embedded videos/nested pages; **paywalled pages unsupported**; PDF URLs treated as PDF sources |
| YouTube URLs | Public videos with captions (user or auto); **transcript only**; videos <72h old may fail; no-speech videos unsupported; deleted/private videos auto-removed within 30 days; caption file cap 500k words |
| Google Drive | Import supported file types from Drive (multiple at once) |
| Drive files as URLs | Nov 2025: copy-paste Drive links like any URL, comma-separated multiple (https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-deep-research-file-types/) |
| Gemini Chats | Import Gemini conversations as notebook context |

Per-source size cap (all plans): **500,000 words or 200MB**, whichever first (https://support.google.com/gemininotebook/answer/16213268; https://www.theverge.com/2024/6/6/24172422/google-notebooklm-ai-gemini-pro-chatbot).

**Source discovery (agentic input):** "Fast Research" web/Drive search within the sources panel, and **Deep Research** (Nov 13, 2025) — multi-source web research whose report *and* sources can be imported straight into the notebook; runs in background (https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-deep-research-file-types/). June 2026: chat guides building a source repository using Google Search, user retains control of what's added (https://blog.google/innovation-and-ai/products/notebooklm/better-research-notebooklm/).

---

## 4. Output support (what you can generate)

### 4.1 Chat & notes
- **Grounded chat answers** with inline citations (hover = quote, click = jump to passage) — https://support.google.com/notebooklm/answer/16179559
- **Notes** — save responses/ideas as notes; pinned chat responses; saved chat history (auto-saved since Oct 2025) — https://support.google.com/notebooklm/answer/16206563; https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-custom-personas-engine-upgrade/
- **Agentic outputs** (for Google AI Ultra/Pro subscribers, source-optional): data visualizations/charts (png, svg), documents (PDF, Word, Markdown, text), images (png/jpg/gif), structured data (CSV, JSON), Excel (xlsx), PowerPoint (pptx), editable artifacts/versions, expanded "thinking steps" — https://support.google.com/notebooklm/answer/16179559

### 4.2 Studio artifacts (https://support.google.com/notebooklm/answer/16206563)

| Artifact | Notes / formats |
|---|---|
| Audio Overviews | Podcast-style AI-host discussion; **Deep Dive** (default), **Brief**, **Critique**, **Debate** formats; length Shorter/Default/Longer (English only); **80+ languages**; **Interactive "Join" mode** (voice Q&A with hosts, English only, newly generated overviews); download (WAV on desktop per https://exploreaitogether.com/export-download-notebooklm-guide/) and share links. https://support.google.com/notebooklm/answer/16212820; https://blog.google/innovation-and-ai/products/notebooklm-audio-overviews/ (launch Sep 11, 2024); https://blog.google/innovation-and-ai/products/notebooklm-audio-video-sources/ (share links Sep 26, 2024); https://blog.google/innovation-and-ai/models-and-research/google-labs/notebook-lm-audio-video-overviews-more-languages-longer-content/ (80 languages + longer non-English, Aug 25, 2025) |
| Video Overviews | Narrated-slides video (AI host + visuals pulled from sources); 80+ languages; **Cinematic Video Overviews** (richer visuals, Ultra 18+ only, 2/day on Pro); download MP4/share. Launched Jul 29, 2025 (https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-video-overviews-studio-upgrades/) |
| Mind Maps | Hierarchical visualization of sources; per-day limits |
| Reports | FAQ, Study Guide, Briefing Doc, Blog Post, custom; auto-generated suggestions |
| Flashcards | Active-learning cards; share-by-link |
| Quizzes | Auto-generated from sources; share-by-link |
| Infographics | Visual summaries (PNG); orientations/detail levels; Nano Banana (Gemini image model) integration (https://www.xda-developers.com/notebooklm-slide-deck-infographics-feature/) |
| Slide Decks | AI presentation decks; PDF + PPTX export (https://www.xda-developers.com/notebooklm-slide-deck-infographics-feature/) |
| Data Tables | Structured tables from sources; export to Google Sheets (citations on second tab) — https://support.google.com/notebooklm/answer/16206563; introduced with Gemini 3 (https://9to5google.com/2025/12/19/notebooklm-gemini-3-data-tables/) |
| Deep Research reports | Importable as source; exportable via standard methods |

### 4.3 Export & sharing
- **Export to Google Docs** for notes/reports (native, added Dec 2025); data tables auto-route to Sheets — https://exploreaitogether.com/export-download-notebooklm-guide/
- **Downloads**: audio (WAV), video (MP4), slides (PDF/PPTX), infographics (PNG), data tables (CSV/Sheets), documents (PDF/DOCX/MD/TXT), structured data (CSV/JSON), xlsx, pptx
- **Notebook sharing**: private (Viewer/Editor by email), **public link** (consumer accounts only; full notebook or chat-only), "Copy link to chat view" — https://support.google.com/notebooklm/answer/16206563; https://support.google.com/notebooklm/answer/16322204
- **Audio Overview share links**: public, need notebook shared/made public; Workspace Enterprise/Education public sharing disabled — https://support.google.com/notebooklm/answer/16212820
- **No full-notebook export** (structure of notes/sources/outputs as one package) — https://exploreaitogether.com/export-download-notebooklm-guide/

---

## 5. Key features

1. **Grounding + inline citations** — every claim traceable to a passage (official, above).
2. **Audio Overviews** — breakout feature (Sep 2024); viral on TikTok; used in Spotify Wrapped (https://www.emarketer.com/content/google-s-notebooklm-plus-could-redefine-ai-podcast-creation-enterprises). Criticized for flattening nuance and adding US-centric content to non-US sources (Wikipedia).
3. **Interactive Audio** ("Join") — Dec 2024 beta: speak to the AI hosts mid-podcast (https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-new-features-december-2024/).
4. **Video Overviews + Cinematic** (Jul 2025; Ultra for Cinematic).
5. **Notebook Guide** — auto summary, key topics, suggested questions on source add (2023–2024; now Reports/FAQs/Study Guides/Briefing Docs).
6. **Chat goals / personas** — custom response style, voice, role; Plus+: response style + length settings (https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-custom-personas-engine-upgrade/; https://9to5google.com/2024/12/13/notebooklm-redesign-plus-tier/).
7. **Deep Research** (Nov 2025) — agentic source gathering.
8. **1M-token context window** in chat (Oct 2025, all plans).
9. **Mobile apps** — iOS (17+) & Android (10+) launched May 19, 2025; offline Audio Overview downloads, background playback, share-to-NotebookLM; app limits: only PDF/Website/YouTube/Audio/Copied-text sources; no notes/mind maps/reports/data tables in app (https://blog.google/innovation-and-ai/products/notebooklm-app/; https://support.google.com/notebooklm/answer/16296687).
10. **Secure cloud computer per notebook** (Jun 2026, Ultra-first) — native code execution, 100+ curated software skills, expanded thinking-step visibility (https://blog.google/innovation-and-ai/products/notebooklm/better-research-notebooklm/; https://www.makeuseof.com/these-notebooklm-updates-make-our-favorite-research-tool-even-smarter/).
11. **Workspace integration** — "Ask NotebookLM" step in Google Workspace Studio (Jul 2026) (https://releasebot.io/updates/google/notebooklm).

---

## 6. Plans, tiers & usage limits

Official table (https://support.google.com/gemininotebook/answer/16213268; https://notebooklm.google/plans):

| Limit | Standard (free) | Plus | Pro | Ultra (20TB) | Ultra (30TB) |
|---|---|---|---|---|---|
| Notebooks | 100 | 200 | 500 | 500 | 500 |
| Sources / notebook | 50 | 100 | 300 | 500 | 600 |
| Chats / day | 50 | 200 | 500 | 2,500 | 5,000 |
| Audio Overviews / day | 3 | 6 | 20 | 100 | 200 |
| Video Overviews / day | 3 | 6 | 20 (Cinematic 2) | 100 (Cinematic 10) | 200 (Cinematic 20) |
| Reports / day | 10 | 20 | 100 | 500 | 1,000 |
| Flashcards / day | 10 | 20 | 100 | 500 | 1,000 |
| Quizzes / day | 10 | 20 | 100 | 500 | 1,000 |
| Mind Maps / day | 10 | 20 | 100 | 500 | 1,000 |
| Deep Research | 10/month | 3/day | 20/day | 75/day | 200/day |
| Data Tables / Infographics / Slide Decks | Limited | More | High | Higher | Highest |

Other official details:
- **Per-source cap identical on all plans: 500,000 words or 200MB.**
- Daily quotas reset after 24h; monthly after 30 days. One-time auto-generated starter artifacts don't count toward limits.
- Plus ≈ 2x Standard; Pro ≈ 5x; Ultra up to 50x generations. Google AI Plus/Pro/Ultra are Google One AI plans (regional availability).
- **Watermark removal** for image/asset outputs: Ultra only (30TB includes Infographics & Slide Decks).
- Premium features: Advanced Sharing (paid), Custom Chat & Analytics (all users since Oct 2025 upgrade).
- **Enterprise** (via Google Cloud "Gemini Notebook for Enterprise" / Workspace Gemini add-ons): 5x+ artifact limits, VPC-SC, IAM controls, data stays in GCP project with regionalization, no human review, no training on org data. Workspace access levels: 50/100/300/400/600 sources per notebook (https://notebooklm-guide.com/notebooklm-system-limits-benchmarks/).
- **NotebookLM Plus launch (Dec 13, 2024):** "5x more Audio Overviews, notebooks, and sources per notebook"; enterprise via Workspace/Cloud; Google One AI Premium inclusion from early 2025 (https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-new-features-december-2024/; https://workspaceupdates.googleblog.com/2024/12/notebooklm-plus-gemini-for-google-workspace-users.html).
- Third-party price claims (2026): Plus $4.99–7.99/mo, Pro $19.99/mo, Ultra $99.99/$199.99 — verify against Google AI plan pages; official pages show only feature tables.

---

## 7. API (NotebookLM Enterprise API)

- **Official API exists for enterprise only**, part of Google Cloud's Gemini Enterprise (built on Discovery Engine, `google.cloud.notebooklm.v1alpha`): `notebooks.create/get/list/share`, add/manage sources, `audioOverviews.create/delete` (one audio overview per notebook at a time; `episodeFocus` + `languageCode` options), REST via `discoveryengine.googleapis.com/v1alpha`, OAuth scopes, IAM (`notebooklm.editor`). https://docs.cloud.google.com/gemini/enterprise/notebooklm-enterprise/docs/api-audio-overview; https://docs.cloud.google.com/gemini/enterprise/notebooklm-enterprise/docs/api-notebooks; https://docs.cloud.google.com/gemini/enterprise/docs/reference/rpc/google.cloud.notebooklm.v1alpha
- Python client library: `google-cloud-notebooklm`; `generate_podcast` operation pattern (third-party walkthrough: https://gemilab.net/en/articles/gemini-advanced/notebooklm-gemini-api-research-workflow-automation).
- **No public consumer API.** Unofficial reverse-engineered SDKs exist: `agmmnn/notebooklm-sdk` (npm, TS) and `teng-lin/notebooklm-py` (Python/CLI) — both explicitly unofficial, break-prone (https://github.com/agmmnn/notebooklm-sdk; https://github.com/teng-lin/notebooklm-py).
- Gemini API integration: the Gemini app can use your notebooks as context sources ("Gemini Chats" import direction also exists) — https://support.google.com/notebooklm/answer/16215270.

---

## 8. Timeline

| Date | Milestone | Source |
|---|---|---|
| May 2023 | Project Tailwind announced at Google I/O | https://www.theverge.com/23845856/google-notebooklm-tailwind-ai-notes-research |
| Jul 12, 2023 | Renamed NotebookLM; US early access; Google Docs sources only | https://blog.google/innovation-and-ai/technology/ai/notebooklm-google-ai/ |
| Aug–Oct 2023 | PDFs + pasted text; 10 sources/notebook, 50k words each | https://adjacentpossible.substack.com/p/introducing-notebooklm |
| Dec 8, 2023 | Public US launch; Gemini Pro; 16 new features (save-as-note, suggested actions, format templates) | https://www.androidcentral.com/apps-software/notebooklm-us-launch-new-features |
| Jun 6, 2024 | Global (200+ countries); Gemini 1.5 Pro; Slides + URLs; Notebook Guide; clickable inline citations; 50 sources/notebook, 500k words | https://blog.google/innovation-and-ai/products/notebooklm-goes-global-support-for-websites-slides-fact-check/ |
| Sep 11, 2024 | Audio Overviews launch | https://blog.google/innovation-and-ai/products/notebooklm-audio-overviews/ |
| Sep 26, 2024 | YouTube + audio sources; Audio Overview share links | https://blog.google/innovation-and-ai/products/notebooklm-audio-video-sources/ |
| Oct 17, 2024 | "Experimental" label removed | https://en.wikipedia.org/wiki/Gemini_Notebook |
| Dec 13, 2024 | Redesign (Sources/Chat/Studio); Interactive Audio "Join"; NotebookLM Plus launch; Gemini 2.0 Flash experimental | https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-new-features-december-2024/ |
| Early 2025 | NotebookLM Plus included in Google One AI Premium | https://9to5google.com/2024/12/13/notebooklm-redesign-plus-tier/ |
| May 2, 2025 | Gemini 2.5 Flash powers chat | https://9to5google.com/2025/05/02/notebooklm-gemini-2-5-flash/ |
| May 19, 2025 | iOS + Android apps | https://blog.google/innovation-and-ai/products/notebooklm-app/ |
| Jul 29, 2025 | Video Overviews; Studio redesign (multi-output) | https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-video-overviews-studio-upgrades/ |
| Aug 25, 2025 | Video Overviews in 80 languages; non-English Audio Overviews full-length | https://blog.google/innovation-and-ai/models-and-research/google-labs/notebook-lm-audio-video-overviews-more-languages-longer-content/ |
| Oct 29, 2025 | Chat: 1M-token context, saved history, chat goals/personas | https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-custom-personas-engine-upgrade/ |
| Nov 13, 2025 | Deep Research; Sheets, Drive-as-URL, images, docx, Drive PDFs | https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-deep-research-file-types/ |
| Nov 2025 | Slide Decks + Infographics (Pro first) | https://www.xda-developers.com/notebooklm-slide-deck-infographics-feature/ |
| Dec 2025 | Gemini 3; Data Tables; native export to Google Docs | https://9to5google.com/2025/12/19/notebooklm-gemini-3-data-tables/; https://exploreaitogether.com/export-download-notebooklm-guide/ |
| Jun 8, 2026 | Gemini 3.5 + Antigravity; secure cloud computer; thinking steps; new output formats (Ultra-first) | https://blog.google/innovation-and-ai/products/notebooklm/better-research-notebooklm/ |
| Jul 16, 2026 | **Renamed Gemini Notebook** | https://en.wikipedia.org/wiki/Gemini_Notebook; https://notebooklm.google/ |
| Jul 2026 | "Ask NotebookLM" step in Google Workspace Studio | https://releasebot.io/updates/google/notebooklm |

**Note on "Ask for me":** no NotebookLM feature named "Ask for me" exists in any official source found. "Ask for Me" is an unrelated Google Search/Ads agent that calls local businesses (https://www.nearmedia.co/memo/). The nearest NotebookLM equivalents are suggested follow-up questions, chat goals, Deep Research, and the Workspace Studio "Ask NotebookLM" step. The user prompt's mention was treated as a possible misremembering and flagged in PROGRESS.md.

---

## 9. Limitations & caveats

- **Source-bound**: refuses questions outside uploaded material; can't answer creative out-of-scope requests (official).
- **Audio/Video Overviews are AI-generated**: "may contain inaccuracies or audio glitches"; not comprehensive/objective views; hosts originally English-only, now 80+ languages; interactive mode English-only (official; https://support.google.com/notebooklm/answer/16212820).
- **Citation accuracy**: audio formats lack per-claim source traceability; cross-check important claims (https://recast.studio/blog/how-to-create-notebook-lm-podcast).
- **Input limits**: YouTube needs captions + public + >72h old; paywalled web pages unsupported; audio can't import from Drive; footnotes/comments stripped from Google files (official).
- **No full-notebook export**; flashcards/quizzes share-by-link only; exported PPTX elements may rasterize; mobile app is a subset (official + https://exploreaitogether.com/export-download-notebooklm-guide/).
- **Not a podcast platform**: no RSS, no editable scripts, no direct distribution (https://recast.studio/blog/how-to-create-notebook-lm-podcast).
- **Public sharing** disabled for Workspace Enterprise/Education (official).
- **One audio overview per notebook at a time** via API (https://docs.cloud.google.com/gemini/enterprise/notebooklm-enterprise/docs/api-audio-overview); in-app multiple outputs allowed since Jul 2025.
- **Model identity**: Google rarely announces model switches in-app; official announcements lag (9to5Google analysis).
- Third-party limit tables sometimes conflict (e.g. Plus sources 100 vs 300; audio counts) — this report follows the **official Google help table** (section 6).

---

*Primary sources: official Google blog (blog.google), Google Help Center (support.google.com/gemininotebook), Google Cloud docs, notebooklm.google. Secondary: The Verge, 9to5Google, TechCrunch, Wikipedia, third-party guides (flagged in PROGRESS.md).*
