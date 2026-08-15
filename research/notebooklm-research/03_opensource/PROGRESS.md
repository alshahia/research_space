# PROGRESS.md — 03_opensource (Open-source NotebookLM alternatives)

> Run date: 2026-08-10 · Agent: web research · Deliverable: FINDINGS.md

## Session log

### Step 1 — Discovery searches (parallel, 4 queries)
- **exa** `open source NotebookLM alternative GitHub project` → lfnovo/open-notebook (36k★, MIT), ukind/insights-lm-public (0★), smallnest/notex, emdiakhate/insightLM, chatboxai/local-notebook (13★, Apache-2.0), MODSetter/SurfSense, robzilla1738/Memorwise (31★), lukoplt/AI-notebook (16★), ppcmaverick/NoobBook, LRriver/NotebookLM-Lite.
- **exa** `open source Google NotebookLM clone self-hosted` → open-notebook (dup), theaiautomators/insights-lm-public, NoobBook, run-llama/notebookllama, MrSibe/KnowNote, Yasho321/NotebookLM-Clone.
- **firecrawl** `open source NotebookLM alternatives GitHub` → SurfSense (15.8k★), Reddit LocalLLaMA thread, XDA/MUO articles, peekaboolabs comparison, github topic `notebooklm` (574 repos at crawl time).
- **firecrawl** `NotebookLM open source clone repository` → open-notebook, Reddit r/Rag self-hosted clone (FastAPI+Next.js+pgvector), dailydoseofds clone tutorial, thenewstack deploy guide, HN morphik-core post, itsfoss open-notebooklm.

### Step 2 — Candidate verification (GitHub topic + name search, 4 queries)
- `topic:notebooklm` (563 repos) → surfed full top-30: notebooklm-py (18.6k), SurfSense, podcastfy (6.5k), qiaomu-anything-to-notebooklm (5.7k), awesome-notebookLM-prompts, PageLM (1.7k), VideoAgent (HKUDS, 1.7k), KnowNote (1.1k), insights-lm-public (654), NotebookLM2PPT, notebooklm-mcp (PleasePrompto 3.2k / roomi-fields 148), Local-NotebookLM (Goekdeniz 981), NotebookMLX (355), podcastfy-demo, NBLM2PPTX, AI-Short-Video-Engine, neuralnoise (227), insights-lm-local-package (221), summarize (211), decipher-research-agent (152), podcast-llm (151), GroqCasters (140), notebooklm-detector (145), awesome-notebooklm (164), LatexInNotebooklm (197).
- `notebooklm in:name` (7,684 hits) → notebooklm-py, notebooklm-skill (PleasePrompto 7.6k), qiaomu, zlibrary-to-notebooklm, Local-NotebookLM, opensource_notebooklm (satvik314, 309), notebooklm-cli (archived), notebooklm-client (icebear0828), notebooklm-mcp (khengyun), notebooklm-rest-api, notebooklm-podcast-automator, notebooklm-jetpack, notebooklm-detector, etc.

### Step 3 — Metadata batch (GitHub REST API via Invoke-RestMethod, 54 repos)
- ⚠️ **FAILED: all 54 requests → HTTP 403.** Unauthenticated GitHub API rate-limited from this IP (curl test also 403). **Fallback:** switched to authenticated GitHub MCP `search_repositories` with `repo:` qualifier — 3 failures (superduperdb, epsilla-inc, paper-talk under wrong owners) resolved by name-search; 2 left unverified (mindsdb, SuperDuperDB org) → noted as gaps in FINDINGS §5.

### Step 4 — License + README keyword extraction (raw.githubusercontent.com, 36 repos)
- Fetched LICENSE headers + README feature-lines for 36 repos in one sandboxed script; extracted: podcast/audio/citation/rerank/hybrid/graphrag/input-formats/model/storage keywords per project.
- Key confirmations: open-notebook = **FastAPI + Next.js + SurrealDB + LangChain, MIT** (badges + docs/0-START-HERE/index.md); RAGFlow = Apache-2.0, citations + rerank + Gemini 3 Pro support (2025-11) + MinerU/Docling parsers; Kotaemon = hybrid+rerank+citations+PDF preview (maintainer issue #154); AnythingLLM = MIT, LanceDB; Morphik = BSL 1.1; QAnything = AGPL-3.0 two-stage + BGE rerank; Khoj = AGPL-3.0; DocsGPT = MIT, wide formats; PageLM = custom community license; Dify = modified Apache-2.0; Open WebUI = custom "Open WebUI License"; Flowise = Apache-2.0 w/ commercial enterprise dir; KnowNote = GPL-3.0; insights-lm = MIT (n8n caveat); Verba = BSD-3.
- License gaps resolved via targeted checks: **kotaemon = Apache-2.0** (LICENSE.txt via exa/GitHub page; v0.12.0 release 2026-05-31, 69 releases), **R2R = MIT** (LICENSE.md), gpt4all-chat = MIT (gpt4all LICENSE.txt not at root; noted).

### Step 5 — Deep-dive extras (3 queries)
- **exa** `gabrielchua open-notebooklm` → 2.6k★ Apache-2.0, Gradio, Llama 3.3 70B via Fireworks + MeloTTS, 13 langs, fork of knowsuchagency/pdf-to-podcast, HF space RUNTIME_ERROR (demo down), DeepWiki architecture.
- **exa** `Meta NotebookLlama llama-cookbook` → 4-step pipeline details, TechCrunch + InfoQ coverage, TTS-limitation admission, ~140GB VRAM requirement for 70B.
- **firecrawl** `kotaemon license` → Apache-2.0 confirmed (LICENSE.txt).
- **firecrawl** `open source NotebookLM podcast audio quality comparison` → podcastfy Reddit/ElevenLabs thread ("hard to beat NotebookLM quality... you did an incredible job"), open-notebook listed as "Built with Podcastfy", atlasworkspace 2026 audio-alternatives guide.
- **firecrawl** `RAGFlow vs AnythingLLM vs Kotaemon comparison` → Medium comparison (RAGFlow advanced vs AnythingLLM basic RAG + agents), olostep 2026 RAG framework roundup (stars snapshot: LangChain 125k, Dify 114k, RAGFlow 70k, LlamaIndex 46.5k, Haystack 24k), firecrawl.dev RAG frameworks blog, clore.ai comparison (RAGFlow heavy: ES + Infinity).

## Sources consulted (full URL list in FINDINGS §9)
GitHub: lfnovo/open-notebook, MODSetter/SurfSense, souzatharsis/podcastfy, gabrielchua/open-notebooklm, run-llama/notebookllama, infiniflow/ragflow, Mintplex-Labs/anything-llm, Cinnamon/kotaemon (+issue #154), onyx-dot-app/onyx, khoj-ai/khoj, zylon-ai/private-gpt, arc53/DocsGPT, nomic-ai/gpt4all, open-webui/open-webui, langgenius/dify, FlowiseAI/Flowise, neuml/txtai, netease-youdao/QAnything, weaviate/Verba, deepset-ai/haystack, Marker-Inc-Korea/AutoRAG, SciPhi-AI/R2R, epsilla-cloud/vectordb, morphik-org/morphik-core, HKUDS/LightRAG, microsoft/graphrag, llmware-ai/llmware, BerriAI/litellm, meta-llama/llama-cookbook, MrSibe/KnowNote, CaviraOSS/PageLM, theaiautomators/insights-lm-public (+insights-lm-local-package), Goekdeniz-Guelmez/Local-NotebookLM, smallnest/notex, LRriver/NotebookLM-Lite, chatboxai/local-notebook, robzilla1738/Memorwise, lukoplt/AI-notebook, ppcmaverick/NoobBook, Yasho321/NotebookLM-Clone, johnmai-dev/NotebookMLX, satvik314/opensource_notebooklm, martinopiaggi/summarize, evandempsey/podcast-llm, leopiney/neuralnoise, jgravelle/GroqCasters, mtwn105/decipher-research-agent, dan-niles/ai-chatpdf, teng-lin/notebooklm-py, PleasePrompto/notebooklm-skill + notebooklm-mcp, joeseesun/qiaomu-anything-to-notebooklm.
Articles: XDA, MakeUseOf, ZDNET (via xda), The New Stack, ItsFOSS, TechCrunch, InfoQ, peekaboolabs, medium (Cyprien Arnold), olostep, firecrawl.dev blog, localaimaster, promptquorum, clore.ai, atlasworkspace, DeepWiki, Reddit r/LocalLLaMA + r/Rag + r/ElevenLabs, HN (#43529539, #41852401), dailydoseofds.

## Gaps & caveats
1. **mindsdb** — repo API lookup failed (search 422); star/license not reverified this session (known: ~20k★, GPL-3.0, 2024-era). Classified "adjacent, not a clone".
2. **SuperDuperDB** — original `SuperDuperDB/superduperdb` no longer resolvable via API (org restructured in 2025); current home (superduper-io) unverified → marked dormant/verify.
3. **Verba** — star count 7.7k from API; **repo archived** (confirmed via API `archived: true`).
4. **NoobBook** — 1★ but 27 forks (template-farm pattern); treated as abandoned/marketing.
5. **Star counts are volatile** (open-notebook seen at 36,177 → 36,547 across two sources the same day; RAGFlow 87,174 via API vs 70k in Jan-2026 blog). All API-verified numbers are 2026-08-10; third-party blog numbers are dated where used.
6. **Audio quality** judgments (robotic vs near-NLM) are qualitative, sourced from project self-docs, Meta/TechCrunch/InfoQ statements, Reddit practitioner feedback — no head-to-head blind listening test performed.
7. **Deep-dive depth** limited to READMEs/docs + secondary articles; no code-level reading of any repo (out of scope for web research pass).
8. **LiteLLM/mindsdb/superduperdb/txtai** included as "adjacent" tiers — they are not NotebookLM clones by design.
9. HF Space for gabrielchua/open-notebooklm was in RUNTIME_ERROR state at fetch time (2026-08-10).
10. Nested Wrapper wave (notebooklm-py, notebooklm-mcp, notebooklm-skill...) — these automate the *real* NotebookLM; excluded from clone tables, flagged in §8.

## Confidence
- **High:** repo identity, stars, licenses, languages, maintenance activity (API-verified 2026-08-10); feature lists for the 36 README-scanned repos; RAG-engine comparisons (multiple independent 2025–2026 sources agree).
- **Medium:** audio-quality rankings (qualitative); "closest to NotebookLM" judgment (feature-parity matrix from self-reported READMEs, not hands-on).
- **Low:** long-tail clone quality (1–50★ repos rarely verified beyond README); exact open-issue counts (fluctuate daily).

---

## Refresh pass log (2026-08-10)

### Step R1 — Discovery (GitHub Search API via MCP, authenticated — bypassed the unauthenticated rate limit that blocked the original pass)
- `topic:notebooklm` sort=stars limit=50 (total 563 repos) → parsed top-50. New entries vs original pass: serenakeyitan/awesome-notebookLM-prompts (4,447★), HKUDS/VideoAgent (1,690★), claude-world/notebooklm-skill (423★), roomi-fields/notebooklm-mcp (148★, active 2026-08-07), K-dash/nblm-rs (85★ Rust, active), israelbls/notebooklm-podcast-automator (111★), gnh1201/notebooklm-rest-api (82★), 302ai/302_podcast_generator (97★ AGPL), NotebookLM2PPT (489★), watermark/PPT ecosystem (slideclean, foldLM, NBLM2PPTX, MinerU2PPT, rm-bg), WenyuChiou/research-hub (46★ MIT), tobocop2/obsidian-lilbee (8★, pushed same-day), nhaouari/local11labs (52★).
- `notebooklm clone` (224 hits) → no >1k★ new clones; smol-ai/pod (42★, stale), tomlin7/notebooklm-clone (1★).
- `notebooklm alternative` (84) → **open-biz/OpenBookLM (131★ MIT, active 2026-08-03)**, RecursiveIntell/Gloss (44★ AGPL Rust, broken per README), PndaMan/cortex (25★ Apache-2.0, active 2026-08-05, two-host audio overviews), earlyaidopters/notebooklmreimagined (41★), baturyilmaz/open-video-overview (29★), soy-tuber/SoyLM (16★).
- `ai podcast generator` (485) → **Twocast (1,253★, stale 2025-07)**, **mulmocast-cli (467★, active 2026-08-08)**, 302_podcast_generator, lingopod (55★).
- Targeted: **KnowledgeCanvas** → NO notable repo (0★ stubs only). **paper-clipper** → nothing >20★ (ras0q obsidian plugin 22★ ARCHIVED). **paper-qa** → Future-House/paper-qa **9,010★ Apache-2.0, pushed 2026-07-30** (query needed `repo:` qualifier; org name is Future-House).

### Step R2 — Re-verification (repo: lookups, API, raw LICENSE/README fetches)
- Confirmed: open-notebook 36,616★ MIT (pushed 08-06; v1.9.0 Jun-2026); ragflow 87,175★ Apache-2.0; anything-llm 64,549★ MIT; kotaemon 25,694★ Apache-2.0; podcastfy 6,491★; run-llama/notebookllama 1,960★ MIT; gabrielchua/open-notebooklm 2,592★ Apache-2.0 (alive; not visible to `repo:` search because it's a fork); **Verba still archived** (archived:true); dify 151,951★ **modified-Apache-2.0 confirmed from LICENSE** (NOT AGPL); Flowise 55,296★ Apache-2.0 core + commercial dir; onyx 31,528★ (DanswerAI header, ee/ dirs commercial); langflow 153,014★ MIT (added); surfsense 15,867★ NOASSERTION license (June-2026 article claims Apache-2.0 — conflict, unresolved).
- **Gaps from original pass resolved:** MindsDB main repo renamed → **mindsdb/mindshub (39,526★, MIT)** — old repo 422s via search API, URL 200s (rename redirect); SuperDuperDB renamed → **superduper-io/superduper (5,308★, Apache-2.0)**; notebooklm-py license = **MIT**; neuralnoise = MIT; NotebookMLX = MIT.
- Unauthenticated `api.github.com/repos` direct calls still 403-rate-limited (tried); used search API + HTML title + exa fetch instead. Firecrawl scrape endpoint returned 401 this session (search worked) — star counts for the two remaining repos taken from exa page fetch.

### Step R3 — Web verification (exa, 6 queries)
- rohitraj.tech (2026-06-07) + andrew.ooo (2026-06-09) + GhTrends (2026-06-20) + dev.to "I Tested 5 Open-Source NotebookLM Alternatives" (2026-06-28) — all converge: Open Notebook is the leading clone (weekly releases, June-2026 Trending #1); citations still its admitted weakness.
- ragflow.io/docs/release_notes → **RAGFlow added audio output via FishAudio/Tongyi Qwen TTS** (2026 release line) + FunASR/SenseVoice STT PR #16473; Kotaemon FunASR audio-ingest still open request (#835).
- dev.to roundup surfaced nagaforcloud/notebooklm-local (Qwen-3 4B offline clone) — repo itself stale since 2025-09-25 (7★); noted with caveat.

### Gaps & caveats (refresh)
1. **Star counts volatile** — all API numbers are 2026-08-10 snapshot; several repos were mid-growth (open-notebook seen 26.7k (Jun article) → 31.9k (Jun 20) → 36.6k (Aug 10)).
2. **SurfSense license** — GitHub says custom/NOASSERTION; one secondary source says Apache-2.0. Unresolved; treat as custom.
3. **Twocast/mulmocast** — no license file detected by API (`none`); verify before reuse.
4. **Gloss** — maintainer's own README says broken (2026-07-29); architecture notes only.
5. **RAGFlow audio output** — confirmed from official release notes, not hands-on; check which release/version ships it before relying on it.
6. **nagaforcloud/notebooklm-local** — featured in a June-2026 roundup but repo stale; roundup claims not independently confirmed.
7. **Onyx cloud free tier** — not verified this pass (self-host MIT core confirmed).

### Confidence (refresh)
- **High:** all re-verified stars/licenses/activity (authenticated GitHub API); LICENSE-file checks (dify/flowise/onyx); MindsDB/SuperDuperDB renames (search-API 422 + redirect + README).
- **Medium:** RAGFlow audio-out (release notes, no hands-on); "no new rival to Open Notebook" (surveyed top-50 topic + 3 query sets + 4 roundups, but long tail >50 is unexhausted).
- **Low:** Twocast/mulmocast license status; Gloss repair timeline; sub-50★ clone quality.
