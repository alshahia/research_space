# Open-Source NotebookLM Alternatives — Full Research (Aug 2026)

> Research date: 2026-08-10. All stars/licenses/push-dates verified against the GitHub API on that date unless noted. URLs cited inline.

---

## 1. Executive summary

The open-source NotebookLM ecosystem has exploded since NotebookLM's late-2024 audio-overview virality. As of Aug 2026 there are **563+ repos tagged `notebooklm`** on GitHub and thousands more tagged `rag`/`notebooklm-alternative`. The landscape splits into four tiers:

1. **Full NotebookLM clones** (notebooks + sources + grounded chat + audio) — dominated by **Open Notebook** (~36.5k stars) and **SurfSense** (~15.9k), plus a long tail of small 2025–2026 clones.
2. **Podcast/audio-only generators** — **Podcastfy** (~6.5k), **gabrielchua/open-notebooklm** (~2.6k), **Meta NotebookLlama**, **Local-NotebookLM**, GroqCasters, neuralnoise, podcast-llm. This is the only area where open source *roughly* matches NotebookLM's signature feature.
3. **General RAG chat platforms** (NotebookLM-adjacent, no audio) — **RAGFlow** (~87k), **AnythingLLM** (~64.5k), **Kotaemon** (~25.7k), Onyx/Danswer (~31.5k), Khoj (~36.4k), PrivateGPT (~57.4k), DocsGPT (~18.2k), Open WebUI (~148k), Dify (~152k), QAnything, Verba (⚠️ archived).
4. **RAG frameworks/libraries** (build-it-yourself) — LlamaIndex, LangChain, Haystack, txtai, LightRAG, GraphRAG, R2R, llmware, AutoRAG, Morphik, Epsilla.

**Nobody matches NotebookLM end-to-end.** Every clone falls short on at least one of: audio quality (all local-TTS options sound noticeably worse), citation depth (Open Notebook admits "basic references (will improve)"), or polished UX. The most NotebookLM-like *experience* today is **Open Notebook** (closest feature parity + audio + REST API), the most NotebookLM-like *audio quality* is **Podcastfy** (ElevenLabs/OpenAI TTS), and the most production-grade *RAG* is **RAGFlow**.

---

## 2. Tier 1 — Full NotebookLM clones

| Project | Stars | License | Lang/Stack | Inputs | Outputs | Notes |
|---|---|---|---|---|---|---|
| [lfnovo/open-notebook](https://github.com/lfnovo/open-notebook) | ~36.5k | MIT | Python (FastAPI) + Next.js/React + SurrealDB + LangChain | PDF, DOCX, web links, audio, video, text, YouTube | Grounded chat w/ citations, **podcast (1–4 speakers, custom profiles)**, notes, multi-notebook, REST API | **Closest full clone.** 18+ LLM providers. Docker. Podcastfy-powered TTS. Citations are "basic" by own admission. 117–124 open issues; very active. |
| [MODSetter/SurfSense](https://github.com/MODSetter/SurfSense) | ~15.9k | Custom (SurfSense license, portions ELv2-style) | Python (FastAPI, LangGraph) + Next.js + TS | Web connectors: Reddit, YT, IG, TikTok, Amazon, Google Maps/Search, Indeed + docs | Research workspace, chat w/ citations, reports, **podcasts**, presentations, agent automations, MCP server | Pivoted from "NotebookLM alternative" to "open-web research platform for agents." Self-host via Docker one-liner. |
| [CaviraOSS/PageLM](https://github.com/CaviraOSS/PageLM) | ~1.7k | PageLM Community License (non-OSI) | TypeScript (React 18, LangChain, Vite) | PDF, DOCX, MD, TXT | Contextual chat, flashcards, quizzes, notes, **AI podcast** | Education-focused. Models: Gemini, GPT, Claude, Grok, MiniMax, Ollama, OpenRouter. Docker. |
| [MrSibe/KnowNote](https://github.com/MrSibe/KnowNote) | ~1.1k | GPL-3.0 | TypeScript (Electron, React, SQLite + sqlite-vec) | PDF, DOCX, PPTX, web pages | Chat/summarize w/ source traceability, knowledge base | Local-first **desktop app, no Docker** — aimed at beginners. OpenAI, DeepSeek, Ollama. |
| [theaiautomators/insights-lm-public](https://github.com/theaiautomators/insights-lm-public) | ~654 | MIT | TypeScript (React) + Supabase + n8n | Documents | Chat w/ citations, **podcast generation** | "Vibe-coded" app; n8n backend is NOT open source (fair-use license). Local variant: [insights-lm-local-package](https://github.com/theaiautomators/insights-lm-local-package) (~221★, Ollama + Whisper + CoquiTTS). |
| [Goekdeniz-Guelmez/Local-NotebookLM](https://github.com/Goekdeniz-Guelmez/Local-NotebookLM) | ~981 | Apache-2.0 | Python (FastAPI) | PDF | **Audio podcasts/summaries/interviews**, customizable styles, voice selection, programmatic API | Audio-only clone (no chat). Local LLMs + TTS. Stand-alone desktop app spin-off released. |
| [smallnest/notex](https://github.com/smallnest/notex) | ~230 | Apache-2.0 | Go | PDF, TXT, MD, DOCX, HTML, audio (MP3/WAV/M4A), video URLs (YouTube/Bilibili) | Summaries, FAQs, study guides, outlines, timelines, glossaries, quizzes, **mindmaps, infographics, podcasts** | Go-based; yt-dlp + vosk for media. OpenAI/Ollama. One of the widest transformation sets. |
| [teng-lin/notebooklm-py](https://github.com/teng-lin/notebooklm-py) | ~18.6k | (verify) | Python | — | — | ⚠️ NOT a clone: unofficial **API wrapper for the real Google NotebookLM** (browser automation). Included for completeness. |
| [Goekdeniz-Guelmez/Local-Notebook-LM-App](https://github.com/Goekdeniz-Guelmez/Local-Notebook-LM-App) | n/a | Apache-2.0 | — | PDF | Audio | Stand-alone app from Local-NotebookLM author. |

**Long tail (2025–2026, small but on-topic):** [NoobBook](https://github.com/ppcmaverick/NoobBook) (1★, 16-container Docker, Supabase; 2025-12, appears abandoned/marketing), [NotebookLM-Lite](https://github.com/LRriver/NotebookLM-Lite) (7★; mind maps, flashcards, study guides, data tables, infographics, podcasts), [Memorwise](https://github.com/robzilla1738/Memorwise) (38★; 8 LLM providers, knowledge graph, study tools, flashcards), [AI-notebook](https://github.com/lukoplt/AI-notebook) (16★; native macOS SwiftUI / Windows .NET 10 desktop, offline Ollama), [chatboxai/local-notebook](https://github.com/chatboxai/local-notebook) (14★; FastAPI + Vue 3, block-level citations, MinerU/FunASR offline), [NotebookLM-Clone / Chithhi LM](https://github.com/Yasho321/NotebookLM-Clone) (10★; MERN + LangChain.js + Qdrant), [decipher-research-agent](https://github.com/mtwn105/decipher-research-agent) (152★; CrewAI + Qdrant, research notebooks), [Local-NotebookLM](https://github.com/Goekdeniz-Guelmez/Local-NotebookLM) (above), [opensource_notebooklm](https://github.com/satvik314/opensource_notebooklm) (309★; DeepSeek-V3 + PlayHT), [NotebookMLX](https://github.com/johnmai-dev/NotebookMLX) (355★; NotebookLlama port to Apple MLX).

---

## 3. Tier 2 — Podcast/audio-only generators

| Project | Stars | License | How it works | Audio quality | Maintenance |
|---|---|---|---|---|---|
| [souzatharsis/podcastfy](https://github.com/souzatharsis/podcastfy) | ~6.5k | Apache-2.0 | Python lib + CLI + Gradio demo + FastAPI. Multimodal → script (Gemini/GPT/Claude) → TTS (**ElevenLabs or OpenAI**) | **Best-in-class open source**; multi-lingual, multi-voice; users report it close to NotebookLM when ElevenLabs used | Very active; paper + PyPI package |
| [gabrielchua/open-notebooklm](https://github.com/gabrielchua/open-notebooklm) | ~2.6k | Apache-2.0 | Gradio app; PDF/URL → dialogue via **Llama 3.3 70B (Fireworks JSON mode)** → **MeloTTS** (13 languages) | Decent; MeloTTS noticeably more robotic than NotebookLM; HF Space currently down (RUNTIME_ERROR) | Fork of knowsuchagency/pdf-to-podcast; light maintenance |
| [Meta NotebookLlama](https://github.com/meta-llama/llama-cookbook/tree/main/end-to-end-use-cases/NotebookLlama) | (in llama-cookbook, ~18.6k total) | (llama-cookbook license) | 4-step Jupyter tutorial: Llama-3.2-1B preprocessing → Llama-3.1-70B transcript → Llama-3.1-8B dramatization → **parler-tts-mini + Bark** TTS | **Robotic**; Meta admits "TTS is the limitation of how natural this will sound"; needs ~140GB VRAM for 70B or API | Tutorial, not product; officially superseded by NotebookLlama+ refactor |
| [run-llama/notebookllama](https://github.com/run-llama/notebookllama) | ~2.0k | MIT | LlamaCloud + OpenAI embeddings + **ElevenLabs**; Streamlit UI + MCP server | Good (ElevenLabs); script from LlamaCloud pipeline | Active |
| [Leopiney/neuralnoise](https://github.com/leopiney/neuralnoise) | ~227 | (verify) | AG2/AutoGen multi-agent podcast studio; ElevenLabs | Good (ElevenLabs) | Semi-active |
| [jgravelle/GroqCasters](https://github.com/jgravelle/GroqCasters) | ~140 | MIT | Groq (PocketGroq) script + Bark TTS + voice cloning | Robotic (Bark) | Stale-ish |
| [evandempsey/podcast-llm](https://github.com/evandempsey/podcast-llm) | ~151 | MIT | Title → LangChain script → ElevenLabs; no document input | Good (ElevenLabs) | Semi-active |
| [martinopiaggi/summarize](https://github.com/martinopiaggi/summarize) | ~211 | (verify) | Multi-source (YouTube, X, IG, TikTok, Drive, files) summarization + audio; Streamlit, Docker | Depends on TTS config | Semi-active |
| [johnmai-dev/NotebookMLX](https://github.com/johnmai-dev/NotebookMLX) | ~355 | (verify) | NotebookLlama port to Apple MLX (local on M-series) | Robotic (Bark) | Light |

**Key insight:** every local-TTS pipeline (Bark, MeloTTS, Parler-TTS, Kokoro) is the quality ceiling. The only open projects that sound near-NotebookLM rely on **ElevenLabs/OpenAI cloud TTS** (podcastfy, notebookllama, neuralnoise) — i.e., the "free local" promise breaks exactly at the signature feature.

---

## 4. Tier 3 — General RAG chat platforms (NotebookLM-adjacent)

| Project | Stars | License | Lang | RAG approach | Citations | Audio | Inputs | Models | Storage/Vector DB | Self-host |
|---|---|---|---|---|---|---|---|---|---|---|
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | ~148k | Open WebUI License (custom) | Python + Svelte | Basic RAG (single-stage dense), 9 vector DBs, web search; no reranker | Per-chunk source links | TTS read-aloud only, **no podcast** | Docs, URLs, web search, voice/video calls | Ollama, OpenAI-compatible, everything | Chroma (default), PGVector, Qdrant, Milvus, ES, etc. | pip/uv/Docker/K8s |
| [langgenius/dify](https://github.com/langgenius/dify) | ~152k | Modified Apache-2.0 | TypeScript + Python | Visual RAG pipelines, agentic workflows, hybrid search, reranking (via config), GraphRAG option | Yes (dataset references) | TTS in chat apps, **no podcast** | Docs, APIs, 50+ tools | 100s of models | Weaviate, Qdrant, Milvus, PGVector, etc. | Docker Compose |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | ~87.2k | Apache-2.0 | Go + Python + React | **Deep doc understanding** (DeepDoc parsing incl. tables/layout/OCR, MinerU/Docling), hybrid retrieval, fused reranking, GraphRAG, agentic RAG, RAPTOR, self-RAG | **Yes — grounded, traceable** | ❌ | PDF/DOCX/PPT/XLS/images/audio/YouTube… | OpenAI, Anthropic, Gemini 3 Pro, Ollama, DeepSeek, etc. | Elasticsearch + Infinity (native), Qdrant/Milvus | Docker (slim 2GB / full 9GB) |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | ~64.5k | MIT | JS (Node/React, desktop apps) | Workspaces w/ RAG, cross-encoder reranking, `@agent` tools (web search, scrape, SQL, files, charts), Agent Flows | Yes (source citations in UI) | ❌ (TTS/voice only) | PDF, TXT, DOCX, URL, YouTube (transcript), MD, CSV… | 30+ providers + Ollama/LM Studio/local | **LanceDB default**, + Chroma, Qdrant, Milvus, Weaviate, Pinecone, AstraDB | Docker, desktop, cloud |
| [Cinnamon/kotaemon](https://github.com/Cinnamon/kotaemon) | ~25.7k | Apache-2.0 | Python (Gradio + FastAPI) | **Hybrid (full-text + vector) + reranking**, question decomposition, ReAct/ReWOO, GraphRAG | **Yes — advanced, with in-page PDF preview + highlight** | ❌ | PDF, DOCX, PPT, images, HTML… | OpenAI, Azure, Cohere, Ollama, llama.cpp, Groq | Qdrant default (uses `litellm`) | pip/Docker (GHCR) |
| [onyx-dot-app/onyx](https://github.com/onyx-dot-app/onyx) (ex-Danswer) | ~31.5k | MIT (parts ELv2) | Python + React/Next.js | Agentic RAG, hybrid index, 50+ connectors, deep-research leaderboard #1 (Feb 2026) | Yes | ❌ | Connectors: Slack, Notion, Google Drive, GitHub… + docs | Any LLM (OpenAI, Anthropic, local via Ollama) | Postgres + Vespa | Docker `install_onyx.sh` |
| [khoj-ai/khoj](https://github.com/khoj-ai/khoj) | ~36.4k | AGPL-3.0 | Python | Semantic search + agentic RAG, automations, deep research, offline LLM | Partial | ❌ | PDF, MD, org-mode, Word, Notion, images, web | GPT/Claude/Gemini/llama/qwen + offline | Local embeddings DB | Docker, pip, desktop |
| [zylon-ai/private-gpt](https://github.com/zylon-ai/private-gpt) | ~57.4k | Apache-2.0 | Python | **API layer**, retrieval w/ citations, agentic RAG, skills, MCP, text-to-SQL; does NOT run models (needs Ollama/vLLM etc.) | Yes | ❌ | Docs via API | Any OpenAI-compatible server | Qdrant (default), pgvector, etc. | Docker/pip |
| [arc53/DocsGPT](https://github.com/arc53/DocsGPT) | ~18.2k | MIT | Python + React | Basic RAG + agents, agent builder, deep research; wide format support incl. audio ingest | Yes | ❌ (ingests audio, no podcast out) | PDF, DOCX, CSV, XLSX, EPUB, MD, HTML, PPTX, images, **MP3/WAV**, URLs | OpenAI, Google, Anthropic, Ollama, llama.cpp | Elasticsearch (default) | Docker |
| [netease-youdao/QAnything](https://github.com/netease-youdao/QAnything) | ~14.1k | AGPL-3.0 | Python | Two-stage: embedding recall + **BGE reranker**; CPU-friendly, one-click install | Partial | ❌ | PDF, DOCX, PPT, XLS, MD, EML, TXT, images | OpenAI, custom models | FAISS/BCE embedding | Docker one-click |
| [weaviate/Verba](https://github.com/weaviate/Verba) | ~7.7k | BSD-3-Clause | Python | RAG chatbot on Weaviate; hybrid + generative modules | Partial | ❌ | DOCX, PDF, URLs (Firecrawl) | OpenAI, Ollama, Cohere | Weaviate | Docker — ⚠️ **ARCHIVED** (repo archived, unmaintained) |
| [nomic-ai/gpt4all](https://github.com/nomic-ai/gpt4all) | ~77.4k | MIT (gpt4all-chat) | C++ + Python | Local LLM client; local document collection chat (LocalDocs) | No | ❌ | Local docs | Local GGUF via llama.cpp | Local (nomic embed) | Desktop app |
| [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | ~55.3k | Apache-2.0 (ent. dir commercial) | TypeScript | Visual LangChain builder; RAG via drag-drop; rerankers/hybrid available as nodes | Via nodes | ❌ | Anything LangChain loads | 100+ | Any LangChain vectorstore | Docker/pip |
| [neuml/txtai](https://github.com/neuml/txtai) | ~12.8k | Apache-2.0 | Python | All-in-one embeddings DB; semantic search, RAG, agents (smolagents) | Partial | ❌ | Text, docs, audio, images, video | HF/sentence-transformers + any LLM | Built-in SQLite vectors | pip/Docker |

---

## 5. Tier 4 — RAG frameworks / engines (build-your-own)

| Project | Stars | License | Type | Notes |
|---|---|---|---|---|
| [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | ~38.7k | MIT | Library (+ API/WebUI) | Lightweight **graph RAG**; 2026 additions: RagAnything merge (MinerU/Docling multimodal), reranker, citations, RAGAS eval, setup wizard |
| [microsoft/graphrag](https://github.com/microsoft/graphrag) | ~35.4k | MIT | Library/pipeline | The original GraphRAG; entity/community graph extraction, global/local search; no UI |
| [deepset-ai/haystack](https://github.com/deepset-ai/haystack) | ~26.2k | Apache-2.0 | Framework | Production RAG/agent pipelines; eval tooling; Hayhooks REST/MCP |
| [llmware-ai/llmware](https://github.com/llmware-ai/llmware) | ~14.9k | Apache-2.0 | Library | Enterprise RAG w/ small specialized models, 300+ model catalog, on-device |
| [SciPhi-AI/R2R](https://github.com/SciPhi-AI/R2R) | ~8.0k | MIT | API server | Agentic RAG as RESTful service; SoTA claim; R2R v4+ agentic |
| [Marker-Inc-Korea/AutoRAG](https://github.com/Marker-Inc-Korea/AutoRAG) | ~5.0k | MIT | Library+agent | AutoML for RAG pipelines: BM25/hybrid, rerank, eval; now agentic "find anything on your computer"; Jikji index layer |
| [morphik-org/morphik-core](https://github.com/morphik-org/morphik-core) | ~3.7k | **BSL 1.1** (source-available; → Apache-2.0 after 4yr) | Engine | Multimodal retrieval, **ColPali**, cache-augmented generation, rules-based ingestion; Python SDK + REST |
| [epsilla-cloud/vectordb](https://github.com/epsilla-cloud/vectordb) | ~875 | GPL-3.0 | Vector DB | High-perf C++ vector DB + optional RAG (no full app UI) |
| [BerriAI/litellm](https://github.com/BerriAI/litellm) | ~56.0k | MIT (ent. dir separate) | Proxy | 100+ LLM gateway — the provider layer most clones use (incl. Kotaemon, Morphik) |
| [mindsdb/mindsdb](https://github.com/mindsdb/mindsdb) | (unverifiable via API this session) | GPL-3.0 | DB | AI over databases; adjacent, not a NotebookLM clone |
| [SuperDuperDB](https://github.com/SuperDuperDB/superduperdb) | (org restructured 2025; verify) | (verify) | Framework | DB-integrated AI; company pivoted — treat as dormant |

---

## 6. Deep dives — top 5 most NotebookLM-like

### 6.1 Open Notebook (`lfnovo/open-notebook`) — the closest full clone
- **Architecture:** Python **FastAPI** backend + **Next.js/React** frontend + **SurrealDB** (graph+vector hybrid DB) + **LangChain** orchestration; Docker Compose (server on :5055 REST API, SurrealDB RPC on :8000). Source: README tech badges + docs (https://github.com/lfnovo/open-notebook).
- **Feature parity vs NotebookLM:** notebooks ✓, multi-source upload (PDF, DOCX, web links, audio, video, YouTube) ✓, grounded chat with citations (⚠️ "basic references (will improve)") ~, podcast 1–4 speakers with custom voice profiles (vs NotebookLM's 2) ✓+, multi-notebook organization ✓, REST API ✓ (NotebookLM has none), 18+ providers ✓+.
- **Audio:** built on Podcastfy pipeline (podcastfy README lists open-notebook.ai as a builder) → TTS quality = ElevenLabs/OpenAI or local engines, configurable. Above-average for OSS.
- **Community:** ~36.5k stars, 4.1k forks, ~117–124 open issues, Discord active, covered by XDA (https://www.xda-developers.com/switched-from-notebooklm-to-open-source-tool-open-notebook/), MakeUseOf, ZDNET, The New Stack (https://thenewstack.io/how-to-deploy-an-open-source-version-of-notebooklm/). Trendshift top-15k.
- **Maintenance:** Very active (2026 commits); v0.x rapid cadence. Self-host: Docker one-liner; local via Ollama/LM Studio.

### 6.2 RAGFlow (`infiniflow/ragflow`) — deepest document understanding, no audio
- **Architecture:** Go backend + Python (FastAPI) + React UI; storage Elasticsearch + Infinity (native vector), optional Qdrant/Milvus; DeepDoc deep-document parser; Agentic RAG + GraphRAG + RAPTOR + self-RAG; multi-recall + fused reranking. Docker slim 2GB / full 9GB images.
- **Why it matters:** the anti-hallucination engineering (traceable citations, deep table/layout parsing, MinerU/Docling plug-in parsers, Gemini 3 Pro support added 2025-11) is the strongest of any OSS RAG app. It is the top OSS result for "document-grounded QA" (olostep.com 2026 roundup; firecrawl.dev RAG frameworks blog).
- **Audio:** ❌ none.
- **Community:** ~87.2k stars, 10.2k forks — largest RAG-app community; 1.9k open issues (scale of use). Heavy infra: needs 8GB+ RAM for full image.

### 6.3 AnythingLLM (`Mintplex-Labs/anything-llm`) — easiest general RAG app
- **Architecture:** Node.js/JavaScript monorepo (server + React frontend + Electron desktop for Win/Mac/Linux), LangChain.js-based, **LanceDB** bundled zero-config vector store (Chroma/Qdrant/Milvus/Weaviate/Pinecone/AstraDB/Zilliz optional), cross-encoder reranking, workspace isolation, `@agent` tooling (web search, scrape, SQL, files, charts) + visual Agent Flows. (Sources: repo README; localaimaster.com AnythingLLM vs Open WebUI comparison; promptquorum.com architecture review.)
- **Citations:** yes, in-chat source citations. **Audio:** ❌ no podcast; TTS for chat only.
- **Community:** ~64.5k stars, 7.1k forks; mature (since Jun 2023), frequent releases; MIT.
- **Deployment:** Docker, desktop app, cloud; docs-first UX.

### 6.4 Kotaemon (`Cinnamon/kotaemon`) — best citations UX, no audio
- **Architecture:** Python, **Gradio + FastAPI**, LiteLLM for model abstraction; hybrid (full-text + dense) retriever + reranker default; question decomposition, ReAct/ReWOO agent reasoning; GraphRAG retriever; **citation-grounded answer UI with in-browser PDF preview + sentence highlighting** — the closest UX to NotebookLM's "see sources" experience (maintainers' comparison: issue #154).
- **Audio:** ❌ none. **Models:** OpenAI/Azure/Cohere/Groq + local (Ollama, llama.cpp). **Storage:** Qdrant default.
- **Community:** ~25.7k stars, 69 releases (latest v0.12.0, 2026-05-31), 40 contributors; very active; Apache-2.0. Docker (GHCR) or pip.

### 6.5 Podcastfy / open-notebooklm / NotebookLlama (audio contenders)
- **Podcastfy** (~6.5k★, Apache-2.0): Python package + CLI + FastAPI + Gradio demo. Inputs: URLs, PDFs, YouTube, images, text. Script via Gemini/GPT/Claude (structured output), audio via **ElevenLabs or OpenAI TTS**, multi-language. The reference OSS implementation — HN Show HN, Reddit praise; users say "sounds incredible" (ElevenLabs route). This is the pipeline Open Notebook itself uses.
- **gabrielchua/open-notebooklm** (~2.6k★, Apache-2.0): the first viral clone (Sep 2024). Gradio; PDF → Llama 3.3 70B (Fireworks) script → MeloTTS, 13 languages. Quality ceiling = MeloTTS (robotic vs NotebookLM). HF Space currently RUNTIME_ERROR (broken demo). Fork of knowsuchagency/pdf-to-podcast.
- **Meta NotebookLlama** (in llama-cookbook, ~18.6k★ repo): 4-notebook tutorial; Llama 3.2-1B → 70B script → 8B dramatizer → parler-tts-mini + Bark. Open weights end-to-end but the worst audio of the three (Meta: "TTS is the limitation"); needs ~140GB VRAM or API for the 70B step. (https://techcrunch.com/2024/10/27/meta-releases-an-open-version-of-googles-podcast-generator/; infoq.com/news/2024/11/meta-notebook-llama/)

---

## 7. Comparison table (consolidated)

| Project | Stars (Aug 2026) | License | Language | RAG approach | Audio overview | Citations | Inputs | Models | Maintenance |
|---|---|---|---|---|---|---|---|---|---|
| Open Notebook | ~36.5k | MIT | Python/Next.js | LangChain RAG (basic) | ✅ 1–4 speakers (podcastfy TTS) | ⚠️ basic | PDF, DOCX, audio, video, URLs, YT | 18+ providers + local | Very active |
| SurfSense | ~15.9k | Custom | Python/TS | Web connectors + KB RAG | ✅ | ✅ | Web (Reddit, YT, IG, Maps…), docs | Multi-provider + Ollama | Active |
| Podcastfy | ~6.5k | Apache-2.0 | Python | n/a (summarization→TTS) | ✅✅ best OSS (ElevenLabs) | n/a | PDF, URLs, images, YT | Gemini/GPT/Claude + ElevenLabs/OpenAI TTS | Very active |
| open-notebooklm | ~2.6k | Apache-2.0 | Python (Gradio) | n/a | ✅ (MeloTTS, 13 langs) | n/a | PDF, URL | Llama 3.3 70B (Fireworks) | Light |
| NotebookLlama | in llama-cookbook | — | Python notebooks | n/a | ✅ (Bark/Parler, robotic) | n/a | PDF | Llama 3.x | Tutorial |
| RAGFlow | ~87.2k | Apache-2.0 | Go/Python/React | Deep-doc + hybrid + rerank + GraphRAG + agentic | ❌ | ✅✅ traceable | PDF, DOCX, PPT, XLS, images, audio, YT | GPT-5, Gemini 3 Pro, DeepSeek, Ollama… | Very active |
| AnythingLLM | ~64.5k | MIT | JS/Node/React | Workspace RAG + rerank + agents | ❌ | ✅ | PDF, TXT, DOCX, MD, CSV, URL, YT | 30+ providers + local | Very active |
| Kotaemon | ~25.7k | Apache-2.0 | Python (Gradio) | Hybrid + rerank + agentic + GraphRAG | ❌ | ✅✅ + PDF preview | PDF, DOCX, PPT, images, HTML | OpenAI/Azure/Cohere/Groq/Ollama/llama.cpp | Very active (v0.12.0) |
| Onyx (Danswer) | ~31.5k | MIT (+ELv2 parts) | Python/Next.js | Agentic RAG, hybrid, 50+ connectors | ❌ | ✅ | Connectors + docs | Any LLM | Very active |
| Khoj | ~36.4k | AGPL-3.0 | Python | Semantic search + agents + deep research | ❌ | partial | PDF, MD, Word, Notion, org, web | All major + offline | Very active |
| PrivateGPT | ~57.4k | Apache-2.0 | Python | API-layer RAG w/ citations + agents | ❌ | ✅ | Docs via API | Any OpenAI-compatible server | Active |
| DocsGPT | ~18.2k | MIT | Python/React | Basic RAG + agents | ❌ | ✅ | 12+ formats incl. audio ingest | OpenAI/Google/Anthropic/Ollama | Active |
| QAnything | ~14.1k | AGPL-3.0 | Python | Two-stage + BGE rerank | ❌ | partial | PDF, DOCX, PPT, XLS, MD, images | OpenAI + custom | Active |
| Open WebUI | ~148k | Custom (Open WebUI License) | Python/Svelte | Basic RAG (9 VDBs) | ❌ | partial | Docs, URLs, web | Ollama + OpenAI-compatible | Very active |
| Dify | ~152k | Modified Apache-2.0 | TS/Python | Visual RAG + agentic + GraphRAG opt | ❌ | ✅ | Docs, APIs, tools | 100s of models | Very active |
| LightRAG | ~38.7k | MIT | Python | Lightweight GraphRAG + rerank + citations | ❌ | ✅ (2025.03+) | Text, multimodal (MinerU/Docling) | Many | Active |
| GraphRAG (MS) | ~35.4k | MIT | Python | GraphRAG global/local | ❌ | partial | Text | OpenAI | Active |
| Verba | ~7.7k | BSD-3 | Python | Hybrid on Weaviate | ❌ | partial | DOCX, PDF, URLs | OpenAI/Ollama/Cohere | ⚠️ **ARCHIVED** |
| GPT4All | ~77.4k | MIT | C++/Python | LocalDocs local RAG | ❌ | ❌ | Local docs | Local GGUF | Active |
| txtai | ~12.8k | Apache-2.0 | Python | Embeddings DB + RAG + agents | ❌ | partial | Text/docs/audio/images/video | HF + any LLM | Active |
| Flowise | ~55.3k | Apache-2.0 | TypeScript | Visual LangChain RAG | ❌ | via nodes | LangChain loaders | 100+ | Active |

---

## 8. Bottom line / recommendations

- **Want the closest NotebookLM clone, self-hosted, with audio:** → **Open Notebook** (MIT, active, podcastfy-grade audio, REST API). Caveat: citations still basic.
- **Want the best open-source audio/podcast:** → **Podcastfy** as engine, or Open Notebook for the full app; accept cloud TTS (ElevenLabs/OpenAI) for near-NotebookLM voices — pure-local TTS (Bark/MeloTTS/Kokoro) is the audible gap.
- **Want production-grade document RAG with citations (no audio):** → **RAGFlow** (deep parsing) or **Kotaemon** (best citation UX) or **AnythingLLM** (easiest ops).
- **Want an enterprise knowledge platform:** → Onyx (connectors), Dify/Flowise (visual builders).
- **Avoid:** Verba (archived), NoobBook (abandoned marketing), open-notebooklm HF demo (down), anything with an "insights-lm" clone-farm pattern; check n8n licensing if you take InsightsLM.
- **Category watch:** the "unofficial NotebookLM API" wave (notebooklm-py 18.6k★, notebooklm-skill 7.6k★, notebooklm-mcp 3.2k★) — wrappers over the real Google product via browser automation, not clones; different risk profile.

---

## 9. Sources

- GitHub repos (stars/license/push dates via GitHub Search/API, 2026-08-10): links inline above; topic search `notebooklm` (563 repos), name search (7,684 hits).
- lfnovo/open-notebook README + docs/0-START-HERE/index.md (stack: FastAPI, Next.js, SurrealDB, LangChain; podcast features) — https://github.com/lfnovo/open-notebook
- Kotaemon maintainers' comparison (issue #154) — https://github.com/Cinnamon/kotaemon/issues/154
- Medium — "Open source RAG solutions: comparaison" (Cyprien Arnold) — https://medium.com/@cyp.arnold/open-source-rag-solutions-comparaison-c6787d929733
- olostep.com — "Best Open Source RAG Frameworks in 2026" — https://www.olostep.com/blog/open-source-rag-frameworks
- firecrawl.dev — "15 Best Open-Source RAG Frameworks in 2026" — https://www.firecrawl.dev/blog/best-open-source-rag-frameworks
- localaimaster.com — "AnythingLLM vs Open WebUI (2026)" — https://localaimaster.com/blog/anythingllm-vs-open-webui
- promptquorum.com — "AnythingLLM vs PrivateGPT vs Open WebUI RAG (2026)" (architecture: LangChain.js + LanceDB + cross-encoder; llama-index + Qdrant; unstructured.io + ChromaDB) — https://www.promptquorum.com/power-local-llm/anythingllm-vs-privategpt-vs-openwebui-rag
- TechCrunch — "Meta releases an 'open' version of Google's podcast generator" — https://techcrunch.com/2024/10/27/meta-releases-an-open-version-of-googles-podcast-generator/
- InfoQ — "Meta Releases NotebookLlama" — https://www.infoq.com/news/2024/11/meta-notebook-llama/
- DeepWiki — open-notebooklm architecture — https://deepwiki.com/gabrielchua/open-notebooklm
- XDA — "I switched from NotebookLM to this open-source tool" — https://www.xda-developers.com/switched-from-notebooklm-to-open-source-tool-open-notebook/
- The New Stack — "How To Deploy an Open Source Version of NotebookLM" — https://thenewstack.io/how-to-deploy-an-open-source-version-of-notebooklm/
- ItsFOSS — "An Open Source Alternative to Google's NotebookLM" — https://itsfoss.com/open-notebooklm/
- peekaboolabs.ai — "5 Best Open-Source NotebookLM Alternatives (2025)" — https://peekaboolabs.ai/blog/best-open-source-notebooklm-alternatives
- atlasworkspace.ai — "6 Best NotebookLM Audio Overview Alternatives (2026)" — https://www.atlasworkspace.ai/blog/notebooklm-audio-alternatives

---

## 10. Refresh pass (2026-08-10) — newly found / re-verified

> Second pass on the same date. Method: GitHub topic `notebooklm` (563 repos, top-50 by stars via authenticated GitHub Search API), queries "notebooklm clone" (224), "notebooklm alternative" (84), "ai podcast generator" (485), `repo:` lookups, raw LICENSE/README fetches, plus web roundups (rohitraj.tech, andrew.ooo, dev.to, GhTrends). All star counts API-verified 2026-08-10 unless marked.

### 10.1 New finds table

| Project | Stars | License | Stack | Last commit | Fit |
|---|---|---|---|---|---|
| [Future-House/paper-qa](https://github.com/Future-House/paper-qa) (PaperQA2) | 9,010 | Apache-2.0 | Python | 2026-07-30 (active) | **Top new find.** High-accuracy RAG for scientific documents with citations (FutureHouse). Tier 4 framework — the research-grade counterpart to NotebookLM's grounded Q&A, no audio |
| [open-biz/OpenBookLM](https://github.com/open-biz/OpenBookLM) | 131 | MIT | Python | 2026-08-03 (active) | Full-stack education-focused NotebookLM alternative: interactive, **audio-based courses**, chat, study outputs; freemium guest mode; demo at openbooklm.com. Small but alive |
| [PndaMan/cortex](https://github.com/PndaMan/cortex) | 25 | Apache-2.0 | Svelte desktop (Tauri-class) | 2026-08-05 (active) | **The notable 2026 new clone:** local-first desktop "study OS" — slides/PDFs/docs/lectures/YouTube → cheatsheets, flashcards w/ spaced repetition, quizzes, **two-host audio overviews**, infographics, mind maps, citation-grounded chat. Tiny community, exactly the NotebookLM shape |
| [RecursiveIntell/Gloss](https://github.com/RecursiveIntell/Gloss) | 44 | AGPL-3.0 | Rust (Tauri 2, React 19) | 2026-07-30 (⚠️ broken) | Local-first desktop source-grounded notebook; SQLite FTS5/BM25 + HNSW, evidence receipts. **README warning 2026-07-29: "not presently in working order"** — architecture worth watching, not usable today |
| [receptron/mulmocast-cli](https://github.com/receptron/mulmocast-cli) | 467 | none listed (check before use) | TypeScript (npm) | 2026-08-08 (active) | Multi-modal AI podcast & **video** generator ("AI-native presentation tool", 0.1.x beta). Adjacent Tier 2 |
| [serenakeyitan/awesome-notebookLM-prompts](https://github.com/serenakeyitan/awesome-notebookLM-prompts) | 4,447 | MIT (README badge says CC BY 4.0 — conflict) | Markdown | 2026-06-19 (active) | Curated NotebookLM slide-prompt/template collection (community-driven Kael.im/first-tree ecosystem). Prompts, not software |
| [panyanyany/Twocast](https://github.com/panyanyany/Twocast) | 1,253 | none listed | TypeScript (Next.js, Postgres, Docker) | 2025-07-01 (stale ~13 mo) | Two-person podcast generator: topic/link/document/list-page inputs, 3–9 min episodes, multi-language; TTS via Fish Audio / MiniMax / Google Gemini. No license = reuse caution |
| [HKUDS/VideoAgent](https://github.com/HKUDS/VideoAgent) | 1,690 | MIT | Python | 2026-07-22 (active) | All-in-one agentic video understanding/editing/remaking framework (same lab as LightRAG). Adjacent — closest OSS analog to NotebookLM Video Overviews, not a notebook |
| [claude-world/notebooklm-skill](https://github.com/claude-world/notebooklm-skill) | 423 | MIT | Python | 2026-07-18 (active) | Wrapper-wave entry (automates real NotebookLM via Claude skills); family keeps growing alongside notebooklm-py |
| [K-dash/nblm-rs](https://github.com/K-dash/nblm-rs) | 85 | MIT | Rust | 2026-08-09 (active) | Unofficial NotebookLM Enterprise API client (Rust CLI+lib) — wrapper wave, not a clone |
| [roomi-fields/notebooklm-mcp](https://github.com/roomi-fields/notebooklm-mcp) | 148 | MIT | TypeScript | 2026-08-07 (active) | NotebookLM over MCP + local REST (citation-backed Q&A, audio/video gen) — wrapper wave |
| [israelbls/notebooklm-podcast-automator](https://github.com/israelbls/notebooklm-podcast-automator) | 111 | MIT | Python | 2026-06-11 (active) | REST API automating real NotebookLM podcast generation — wrapper wave |
| [302ai/302_podcast_generator](https://github.com/302ai/302_podcast_generator) | 97 | AGPL-3.0 | TypeScript | 2025-08-25 (stale) | Audio-only podcast generator (Tier 2 long tail) |
| [nhaouari/local11labs](https://github.com/nhaouari/local11labs) | 52 | none listed | Python | 2025-01-13 (stale) | Local Kokoro-82M TTS podcast generator — evidence the "local TTS" lane keeps getting attempts |
| [nagaforcloud/notebooklm-local](https://github.com/nagaforcloud/notebooklm-local) | 7 | none listed | Python | 2025-09-25 (stale) | Bundled Qwen-3 4B fully-offline clone (llama.cpp) — featured in a June-2026 dev.to roundup but repo untouched since Sep-2025; treat review claims as optimistic |
| [tobocop2/obsidian-lilbee](https://github.com/tobocop2/obsidian-lilbee) | 8 | MIT | TypeScript (Obsidian plugin) | 2026-08-10 (active) | Obsidian vault as private self-hosted NotebookLM alternative w/ built-in MCP — new 2026 plugin lane |
| [WenyuChiou/research-hub](https://github.com/WenyuChiou/research-hub) | 46 | MIT | Python (CLI/MCP/REST) | 2026-07-21 (active) | Zotero + Obsidian + NotebookLM orchestration workspace (academic workflow glue) |
| [baturyilmaz/open-video-overview](https://github.com/baturyilmaz/open-video-overview) | 29 | MIT | TypeScript | 2025-11-29 (stale) | Local alternative to NotebookLM Video Overviews (narrated video from text) |

**Negative results (explicitly checked):** **KnowledgeCanvas** — no notable repo exists (only 0★ stub repos; not a real project). **paper-clipper** — nothing >20★; the concept lives as small Obsidian plugins (ras0q/obsidian-paper-clipper, 22★, ARCHIVED; windzu/paper-clipper, 1★). **"notebooklm-py family"** — confirmed healthy: teng-lin/notebooklm-py now **18,601★, MIT, pushed 2026-08-10**, description updated to "…for Google Gemini Notebook" (rename tracked). No new >1k★ full clone appeared since the original pass.

### 10.2 Re-verified top-tier claims (GitHub API / LICENSE files, 2026-08-10)

| Project | Original pass | Now | Delta |
|---|---|---|---|
| Open Notebook (lfnovo/open-notebook) | ~36.5k★, MIT, very active | **36,616★**, MIT, pushed 2026-08-06, 124 open issues; v1.9.0 (2026-06-02, 37th release) "Esperanto 2.22 & New Audio Providers" | ✅ confirmed; primary language now shows TypeScript (Next.js UI growth) |
| RAGFlow | ~87.2k★, Apache-2.0 | **87,175★**, Apache-2.0, pushed 2026-08-10 | ✅ confirmed active |
| AnythingLLM | ~64.5k★, MIT | **64,549★**, MIT, pushed 2026-08-07 | ✅ confirmed |
| Kotaemon | ~25.7k★, Apache-2.0 | **25,694★**, Apache-2.0, pushed 2026-07-14 | ✅ confirmed |
| Podcastfy | ~6.5k★, Apache-2.0 | **6,491★**, Apache-2.0, pushed 2026-05-04 | ✅ confirmed (slower cadence but alive) |
| run-llama/notebookllama | ~2.0k★, MIT | **1,960★**, MIT, pushed 2026-03-02 | ✅ confirmed |
| gabrielchua/open-notebooklm | ~2.6k★, Apache-2.0 | **2,592★**, Apache-2.0, still alive (fork of knowsuchagency/pdf-to-podcast; HF Space linked) | ✅ confirmed, not dead |
| Verba | ~7.7k★, ⚠️ archived | **7,712★**, BSD-3, `archived: true` | ✅ still archived |
| MindsDB | unverified (gap) | Main repo **renamed → mindsdb/mindshub**: **39,526★, MIT**, pushed 2026-07-10 ("Make AI do actual work"; GitHub API 422 on old name = rename, old URL 200s via redirect) | **Gap resolved** — note license shows MIT now |
| SuperDuperDB | org restructured (gap) | **superduper-io/superduper** ("Superduper"): **5,308★, Apache-2.0**, created 2022-08-30 (same repo, renamed); SuperDuperDB/.github points to superduper-io | **Gap resolved** — modest, active-ish |
| Dify | ~152k★, "Modified Apache-2.0" | **151,951★**; LICENSE file confirmed: **modified Apache-2.0** (multi-tenant commercial clause) — **NOT AGPL** | ✅ confirmed |
| Flowise | ~55.3k★, Apache-2.0 | **55,296★**; LICENSE.md: Apache-2.0 core + commercial `enterprise` dir | ✅ confirmed |
| Langflow | (not in original file) | **153,014★, MIT**, pushed 2026-08-10 — very active | ➕ added (visual builder, Flowise-class) |
| Onyx (Danswer) | ~31.5k★, MIT (+ELv2 parts) | **31,528★**, pushed 2026-08-10; LICENSE: DanswerAI header, `ee/` dirs under Onyx Enterprise License, core OSS | ✅ confirmed; self-hostable via install_onyx.sh; **cloud free-tier details UNVERIFIED** |
| SurfSense | ~15.9k★, custom license | **15,867★**, license = NOASSERTION (custom) — a June-2026 article claims Apache-2.0 (https://rohitraj.tech/en/notes/open-notebook-vs-khoj-vs-surfsense-notebooklm-2026); conflict unresolved → keep original "custom license" claim | ✅ stars; ⚠️ license conflict noted |
| notebooklm-py | ~18.6k★, license unverified | **18,601★, MIT**, pushed 2026-08-10 | ✅ resolved (MIT) |
| neuralnoise | ~227★, license unverified | **227★, MIT** | ✅ resolved (MIT) |
| NotebookMLX | ~355★, license unverified | **355★, MIT** (pushed 2025-03-03, stale) | ✅ resolved (MIT) |
| KnowNote | ~1.1k★ | 1,100★ (pushed 2026-02-12) | ✅ confirmed |
| PageLM | ~1.7k★ | 1,698★ (pushed 2026-06-11) | ✅ confirmed |
| insights-lm-public | ~654★ | 654★ (pushed 2026-01-16) | ✅ confirmed |

### 10.3 Verdict refresh (2026-08-10)

1. **"No OSS project fully matches NotebookLM" still stands** — no new full clone rivals Open Notebook (36.6k★, weekly releases, June-2026 GitHub Trending #1 moment per https://rohitraj.tech + https://andrew.ooo/posts/open-notebook-self-hosted-notebooklm-alternative-review/). Open Notebook's own comparison still concedes "basic references (will improve)" vs NotebookLM's citations.
2. **But the audio gap is closing from two directions in 2026:** (a) **RAGFlow** added **audio output via FishAudio / Tongyi Qwen TTS** in its AI-search release (https://ragflow.io/docs/release_notes) — the first Tier-3 giant with audio-out; (b) **Cortex** (new, 25★) ships **two-host audio overviews** in a local-first notebook clone. Kotaemon's audio *ingest* (FunASR) is still an open feature request (https://github.com/Cinnamon/kotaemon/issues/835); RAGFlow is adding FunASR/SenseVoice STT (PR #16473).
3. **Deep-research lane crystallized:** FutureHouse **paper-qa** (9,010★, Apache-2.0, active) is the strongest OSS answer-to-papers-with-citations engine — pairs well with NotebookLM-style notebooks as the "citations" half the clones lack.
4. **Reconfirm:** best *experience* = Open Notebook; best *audio quality* = Podcastfy/cloud TTS; best *RAG* = RAGFlow (now with TTS audio-out); the pure-local TTS quality ceiling (Bark/MeloTTS/Kokoro) is unchanged and is why no local-only clone sounds like NotebookLM.
5. **New watch list:** Cortex (audio clone, tiny), Gloss (fix pending), OpenBookLM (education clone), mulmocast-cli (podcast/video), notebooklm-py family (18.6k★ wrapper wave).
