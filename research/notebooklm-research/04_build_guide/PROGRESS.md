# PROGRESS — NotebookLM-Like App Build Research Log

Every research step logged: queries, sources (URLs), gaps, confidence. Companion deliverable: `FINDINGS.md` (same directory).

**Session:** 2026-08-10 · **Tools:** exa web search, firecrawl search + scrape · **Total queries:** 17 · **Sources cited:** 40+ URLs

---

## Step 1 — Reference architecture of NotebookLM + grounded RAG pipelines

**Queries (run in parallel, batch 1):**
- `NotebookLM architecture reference how it works retrieval grounded answers audio overviews technical breakdown`
- `grounded RAG pipeline reference architecture ingestion chunking embeddings vector database hybrid search reranking`
- `NotebookLM audio overviews how it works Gemini SoundStorm multi-speaker podcast generation` (firecrawl)
- `how to build NotebookLM clone architecture RAG podcast audio overviews technical guide` (firecrawl)

**Sources used:**
- https://blog.google/innovation-and-ai/products/developing-notebooklm/ — product history, Audio Overview languages, citation pivot
- https://www.latent.space/p/notebooklm — creators interview: dialogue personas, disfluency, script structure
- https://blog.google/innovation-and-ai/products/notebooklm-audio-overviews/ — official feature launch, known limitations
- https://www.teacherandtask.com/blog/notebooklm-explained-google-research-tool — architecture: parse→chunk→embed→retrieve→prompt→generate→cite; Gemini 2.0 Flash / 2.5 Pro split
- https://jasonspielman.com/notebooklm — UX mental model (inputs→conversation→outputs), design lead on Audio Overviews
- https://simonwillison.net/2024/Sep/29/notebooklm-audio-overview/ — SoundStorm link, disfluency pipeline, prompt leaks
- https://medium.com/data-and-beyond/notebooklm-explained-a-complete-guide-to-googles-ai-powered-research-assistant-36c57586ada2 — paragraph chunking, citation mechanics, in-context learning
- https://neurlcreators.substack.com/p/how-notebooklm-audio-overview-works — AudioLM/SoundStorm/SpearTTS inference
- https://jrodthoughts.medium.com/how-did-google-build-notebooklms-cool-podcast-generation-features-854e65738cfb — SoundStorm technical detail
- https://github.com/pallavi-chandrashekar/enterprise-rag-reference-architecture — multi-tenant RAG reference: intent router, hybrid retrieval, abstention, citations, eval harness
- https://bigdataboutique.com/blog/rag-pipeline-end-to-end-architecture-guide — 9-stage production pipeline, chunk sizes 256–512 tok, RRF, contextual retrieval stats
- https://palakorn.com/blog/production-rag-system/ — offline/online pipeline split, citation prompt design, validator
- https://www.stackai.com/insights/retrieval-augmented-generation-(rag)-best-practices-for-enterprise-ai-chunking-embeddings-reranking-and-hybrid-search-optimization — "boring defaults" config block
- https://hld.handbook.academy/curriculum/case-studies/enterprise-rag/ — tenant isolation patterns, CDC delta re-embed, 67% failure reduction
- https://developers.redhat.com/articles/2026/05/26/build-enterprise-rag-system-ogx — metadata filters, RRF vs weighted fusion, rerank
- https://www.databricks.com/blog/rag-workflow — 5-stage RAG framing, retriever = quality ceiling

**Confidence:** HIGH. Multiple independent sources agree on the architecture shape (RAG + citations + Gemini; offline/online split; hybrid + rerank default).

---

## Step 2 — OSS reuse landscape

**Queries (batch 2):**
- `RAGFlow vs AnythingLLM vs Kotaemon vs Dify comparison local RAG document Q&A self-hosted features`
- `Open NotebookLM GitHub open source NotebookLM alternative podcast generation` (batch 1)
- `OpenNotebook Jina notebooklm alternative open source RAG` (batch 1)

**Sources used:**
- https://github.com/lfnovo/open-notebook — 36k stars, MIT, closest product; podcast docs
- https://github.com/lfnovo/open-notebook/blob/main/docs/2-CORE-CONCEPTS/podcasts-explained.md — full podcast pipeline spec (content selection → episode profile → speakers → outline → dialogue → TTS)
- https://github.com/gabrielchua/open-notebooklm — 2.6k stars, PDF→podcast demo
- https://github.com/LRriver/NotebookLM-Lite — Docling + SeekDB + LiteLLM blueprint
- https://github.com/theaiautomators/insights-lm-public — Supabase + n8n clone
- https://everylocalai.com/tool/ragflow — RAGFlow feature table vs AnythingLLM/Dify/Onyx
- https://ossalt.com/guides/best-open-source-rag-frameworks-2026 — LangChain/LlamaIndex/RAGFlow/Dify/AnythingLLM/Haystack classification
- https://dreaming.press/posts/2026-06-23-best-open-source-rag-platforms.html — RAGFlow vs R2R vs Kotaemon; Verba archived; Quivr repositioned
- https://www.learnwithparam.com/blog/batteries-included-rag-platforms-dify-ragflow-onyx — Dify vs RAGFlow vs Onyx philosophies
- https://mockarty.ru/docs/knowledge-base — resource needs (RAGFlow ~4GB, Dify 5+ containers)

**Confidence:** HIGH on landscape + feature sets; MEDIUM on exact star counts (they drift; multiple sources conflict slightly, e.g., RAGFlow 36k vs 83–85k — I reported the range).

---

## Step 3 — TTS / audio generation stack

**Queries (batch 2–3):**
- `open source TTS comparison 2025 Kokoro Piper edge-tts Coqui XTTS quality latency podcast multi-speaker`
- `ElevenLabs pricing per character OpenAI TTS pricing Azure TTS pricing edge-tts free comparison 2025`
- `NotebookLM clone podcast pipeline steps outline script critique disfluencies TTS multi-speaker dialogue generation approach GPT-4o ElevenLabs`
- `edge-tts python library free Microsoft Edge text to speech usage notes limitations` (batch 4)

**Sources used:**
- https://gigagpu.com/self-hosted-tts-comparison/ — Kokoro/XTTS/Bark/Piper params, VRAM, RTF, concurrency
- https://gigagpu.com/tts-latency-benchmarks/ — first-audio latency per GPU tier
- https://contracollective.com/blog/kokoro-vs-piper-vs-xtts-local-text-to-speech-m5-max-2026 — M5 Max RTF/latency/memory
- https://www.openspeech.dev/ — side-by-side model catalogue (Kokoro, Orpheus, Chatterbox, XTTS)
- https://www.codesota.com/speech/best-open-source — MOS ratings, licenses
- https://paksopi/Text-to-Speech-Analysis (github) — WER/cloning benchmarks incl. license notes (XTTS CPML weights, Kokoro Apache-2.0)
- https://github.com/rany2/edge-tts/discussions/261 + https://learn.microsoft.com/en-us/answers/questions/2088770/are-opensource-edge-tts-free-for-commercial-use — edge-tts unofficial status, commercial risk
- https://hakaru.io/tools/tts-cost-calculator — hosted TTS per-1k-char pricing table
- https://elevenlabs.io/pricing — plan credits (Free 10k, Starter $6/30k, Creator $22/121k, Pro $99/600k)
- https://tomodahinata.com/en/blog/qwen-tts-vs-elevenlabs-openai-google-azure-tts-comparison — cross-vendor TTS comparison incl. Qwen3-TTS self-host
- https://elevenlabs.io/docs/overview/capabilities/text-to-dialogue — multi-speaker dialogue API, 2000-char limit, seed
- https://pub.towardsai.net/how-i-developed-a-notebooklm-clone-2d901d1c72a6 — full clone recipe (GPT-4o + ElevenLabs, overlap, pydub)
- https://medium.com/google-cloud/building-a-dynamic-podcast-generator-inspired-by-googles-notebooklm-and-illuminate-e585cfcd0af1 — Gemini Flash JSON dialogue + Google TTS/ElevenLabs
- https://mastra.ai/blog/notebooklm-clone-with-agent-orchestration — orchestrator agent, play.ai, script format lessons

**Confidence:** HIGH on pricing/latency numbers (multiple agreeing benchmarks); MEDIUM on edge-tts long-term reliability (by nature of being unofficial).

---

## Step 4 — Cost analysis

**Queries (batch 2):**
- `RAG cost analysis per document tokens embedding cost LLM API pricing vector database free tier self-hosted tradeoffs`

**Sources used:**
- https://computecomparison.com/guides/rag-pipeline-cost-guide — 4 cost layers, per-query costs, break-even 1.06M queries/day
- https://aicostcheck.com/blog/ai-api-costs-rag-applications — worked monthly examples (10k queries ≈ $3–165 by model)
- https://eltherion.com/blog/rag-architecture-production-scale — 1M-doc budget $3k–12k/mo, caching levers
- https://thellms.dev/cache/rag-costs-vector-database-embeddings-reranking-and-generation/ — worked $665/mo example, rerank $1–2/1k
- https://pierrekasparian.com/en/tools/rag-cost-calculator — 50-user SMB ≈ $100/mo Claude / $14/mo Mistral
- https://kenodo.com/tools/rag-monthly-cost-calculator — cost levers (top-K, chunk size, model)
- https://www.besthub.dev/articles/comprehensive-cost-assessment-of-end-to-end-rag-systems-6d90c3f8cbd6 — LLM ≈ 40%+ of cost, quantization halves vector cost
- https://www.sphereinc.com/blogs/enterprise-rag-cost — generation dominates; routing/caching levers

**Confidence:** HIGH on structure (generation dominates 80–95%); MEDIUM on absolute prices (they shift quarterly; all figures flagged as of 2026 dates and "verify before budgeting").

---

## Step 5 — Vector DB comparison

**Queries (batch 3):**
- `vector database comparison 2025 Chroma Qdrant Weaviate Pinecone pgvector Milvus latency cost features HNSW` (exa; firecrawl 429'd once, retried with exa)

**Sources used:**
- https://www.data-dynamics.io/en/blog/vector-database-comparison — feature/index matrix, 1M-vector benchmarks
- https://buttondown.com/ultradune/archive/eval-002-vector-databases-in-2026-qdrant-vs/ — 2026 eval incl. pricing per 10M vectors
- https://www.kargin-utkin.com/vector-database-comparison-2026-benchmarks — p50/p99 benchmark table, binary quantization
- https://inductivee.com/blog/vector-database-performance-benchmarks-2025 — 100M-vector benchmarks, cost/month
- https://jbdai.org/index.php/JBDAI/article/view/80 — academic benchmark (cold-start, CV)
- https://lushbinary.com/blog/vector-database-benchmarks-production-selection-guide-2026 — 2026 updates (Qdrant 1.17/1.18, Milvus 2.6, Weaviate 1.38, pgvectorscale)

**Confidence:** HIGH on relative positioning (Qdrant fastest/simplest self-host, pgvector below ~10M, Milvus at scale, Pinecone zero-ops); MEDIUM on exact latency numbers (hardware-dependent, sources vary ±few ms).

---

## Step 6 — Security, pitfalls, hallucination/citation research

**Queries (batch 2–3):**
- `prompt injection RAG security tenant isolation vector database compliance copyright documents pitfalls` (firecrawl)
- `long context vs RAG tradeoffs when to use which Gemini 1.5 million token context retrieval quality`
- `LLM RAG hallucination citation grounding failure modes evaluation RAGAS faithfulness abstention`

**Sources used:**
- https://cheatsheetseries.owasp.org/cheatsheets/RAG_Security_Cheat_Sheet.html — document poisoning, chunk isolation, index integrity
- https://truto.one/blog/how-to-architect-strict-data-isolation-in-multi-tenant-rag-pipelines/ — silo vs pool, JWT tenant enforcement
- https://christian-schneider.net/blog/rag-security-forgotten-attack-surface/ — USENIX 2025 5-doc poisoning stat, embedding inversion, Slack AI incident
- https://www.langprotect.com/blog/rag-security-guide-prevent-data-leakage — retrieved-doc prompt injection, vector DB as sensitive repo
- https://ai.google.dev/gemini-api/docs/long-context — context caching, multi-needle caveat
- https://arxiv.org/pdf/2403.05530v3 — Gemini 1.5 recall ≥99% to 10M tokens
- https://dataku.ai/blog/gemini-1-5-pro-million-token-context-tested — 58% at 1M tokens, lost-in-middle, RAG vs LC table
- https://aclanthology.org/2024.emnlp-industry.66/ — Self-Route (RAG+LC hybrid)
- https://arxiv.org/html/2501.01880 — LC vs RAG comprehensive evaluation
- https://aclanthology.org/anthology-files/anthology-files/pdf/eacl/2024.eacl-demo.16.pdf — RAGAS paper
- https://arxiv.org/html/2409.11242 — TRUST-SCORE, refusal/citation metrics, TRUST-ALIGN
- https://arxiv.org/html/2510.20303v2 — citation failure modes, Citention
- https://github.com/shryu1994/provenance-bench — abstention-as-pass, RAGAS NaN caveat
- https://link.springer.com/article/10.1007/s10994-026-07121-y — faithfulness hallucinations benchmark

**Confidence:** HIGH on security guidance (OWASP + multiple enterprise sources converge); HIGH on LC-vs-RAG findings (peer-reviewed + independent tests converge: LC better on dense corpora, RAG cheaper/faster, hybrid best).

---

## Step 7 — Document parsing, transcription, YouTube ingestion

**Queries (batch 3–4):**
- `document parsing PDF DOCX PPTX extraction tools comparison PyMuPDF unstructured docling LlamaParse markitdown` (firecrawl)
- `Whisper WhisperX transcription comparison accuracy speed faster-whisper youtube-transcript-api transcript ingestion RAG`
- `youtube-transcript-api python fetch YouTube transcript RAG chunking NotebookLM YouTube source`

**Sources used:**
- https://arxiv.org/html/2410.09871v1 — 10-parser benchmark across 6 doc categories (PyMuPDF/pypdfium best text; Nougat best scientific)
- https://www.firecrawl.dev/blog/best-pdf-parsers — Docling (61k stars), Marker-PDF, LlamaParse, Unstructured, Reducto
- https://procycons.com/en/blogs/pdf-data-extraction-benchmark/ — Docling 97.9% table cell accuracy; LlamaParse 6 s/doc; Unstructured slowest
- https://mixpeek.com/curated-lists/best-pdf-extraction-tools — LlamaParse credits (~$1.25/1k credits), PyMuPDF speed
- https://vstorm.co/llamaindex/top-10-document-parsing-services-for-rag-pipelines-and-llm-applications/ — parser roundup incl. LiteParse, PyMuPDF4LLM
- https://gigagpu.com/whisper-vs-faster-whisper-for-document-rag/ — 11.2x vs 5.7x realtime, VRAM, WER
- https://modal.com/blog/choosing-whisper-variants — faster-whisper vs insanely-fast-whisper vs WhisperX
- https://github.com/m-bain/whisperX/ — WhisperX features (70x realtime, wav2vec2 alignment, pyannote diarization)
- https://hps.vi4io.org/_media/research/labs/2026/2026-02-deepak_budha-performance_benchmarking_and_evaluation_of_open_source_asr_frameworks_for_real_time_transcription-report.pdf — academic ASR comparison (WER 2.37% WhisperX vs 3.12% faster-whisper on M3)
- https://github.com/jdepoix/youtube-transcript-api — API docs, languages, formatters
- https://github.com/melyx-id/youtube-to-notebooklm — channel→NotebookLM bundles (500k-word per-source cap insight)
- https://akshayonly.github.io/2025/06/12/yt-transcript-llm.html — playlist → transcript file recipe (yt-dlp + youtube-transcript-api)

**Confidence:** HIGH.

---

## Gaps / open questions (flagged)

1. **NotebookLM's exact retrieval internals are undisclosed** — Google publishes product behavior, not the retriever. All architecture claims about NotebookLM itself are inferred from interviews + prompt leaks; the generic RAG guidance (hybrid/rerank/RRF) is from production practitioners and is solid independently.
2. **Pricing drift:** all $ figures are as of mid-2026 sources; model pricing changes quarterly. Verify against provider pages before budgeting. Flagged inside FINDINGS.
3. **Star counts vary across sources** (e.g., RAGFlow 36k vs 85k; open-notebook 36k) — used ranges and emphasized "check last release date, not stars."
4. **Audio quality thresholds are subjective** — TTS "naturalness" rankings (MOS) conflict across benchmarkers; findings present speed/memory/latency data (objective) and let quality claims be directional.
5. **firecrawl search rate limit (HTTP 429)** hit once on the vector-DB query — retried via exa with equivalent coverage. No data loss.
6. **Audio Overview generation time/cost at Google scale** (minutes for large notebooks) — noted qualitatively; no public cost figures exist to cite.

## Confidence summary

| Topic | Confidence |
|---|---|
| NotebookLM product behavior + architecture shape | High |
| Generic production RAG pipeline guidance | High |
| Audio pipeline (script→TTS) + open-source recipe | High |
| TTS model benchmarks (speed/memory) | High |
| TTS hosted pricing | Medium (drifts) |
| RAG unit costs | Medium (drifts) |
| OSS landscape + licenses | High |
| Vector DB positioning | High (numbers hardware-dependent) |
| Security pitfalls (OWASP + incidents) | High |
| LC-vs-RAG research | High |

---

## Re-research pass (OSS-first) — 2026-08-10

**Purpose:** complementary pass replacing the paid-stack bias of the original guide. Tools: exa search + exa fetch, firecrawl (search/scrape), webfetch. ~20 queries, ~35 URLs. Deliverable: `FINDINGS.md` §11.

### Queries run

1. `Open Notebook lfnovo GitHub repository stars license NotebookLM open source alternative` (exa)
2. `Kokoro-82M TTS GitHub stars license Apache quality vs ElevenLabs local` (exa)
3. `Gemini API free tier rate limits RPM RPD tokens 2026` (exa) + fetch https://ai.google.dev/gemini-api/docs/models (exa)
4. `Ollama Qwen2.5 7B 14B Llama 3.1 8B Phi-4-mini VRAM requirements RAM RAG local` (exa)
5. `Groq free tier rate limits tokens per minute 2026 llama` (exa) + https://console.groq.com/docs/rate-limits (exa)
6. `Coqui XTTS v2 license change non-commercial Hugging Face removed 2025` (exa)
7. `BGE-M3 vs nomic-embed-text vs jina-embeddings-v3 vs mxbai multilingual embedding MTEB ranking` (exa)
8. `Docling IBM GitHub stars license MIT document parsing 2026` (exa)
9. `SQLite-vec vs LanceDB vs Chroma local self-hosted RAG vector database comparison 2026` (exa)
10. `Chonkie Chunknorris chunking library RAG semantic chunking 2026` (exa)
11. `Mistral AI La Plateforme free tier rate limits 2026` (exa)
12. `GitHub Models free tier rate limits requests per minute 2026` (exa) + github/docs prototyping page
13. `Cerebras inference free tier rate limits 2026` (exa) + https://inference-docs.cerebras.ai/support/rate-limits
14. `best local LLM for RAG citations hallucination Qwen2.5 7B vs Llama 3.1 8B vs Gemma 3 12B vs Phi-4-mini` (exa)
15. `F5-TTS license Zonos license open source TTS 2026` (exa)
16. `MeloTTS license MIT mylanguagetools GitHub` (exa)
17. `ElevenLabs free tier 2026 characters per month credits` (exa) + https://elevenlabs.io/pricing
18. `faster-whisper vs whisper.cpp comparison speed accuracy 2026` (exa)
19. `RAGAS vs TruLens LLM evaluation framework 2026 RAG metrics open source` (exa)
20. `LibreChat license MIT RAG mode document upload 2026` (exa)
21. `PaperQA2 FutureHouse arXiv agentic RAG stars license` (exa)
22. `bge-reranker-v2-m3 multilingual reranker quality` (exa)
23. `PaddleOCR vs Tesseract accuracy comparison 2026` (exa)
24. `Render free tier limits vs Railway free plan vs Cloudflare Workers free tier 2026` — failed (Exa rate limit); replaced with webfetch of https://render.com/docs/free + https://developers.cloudflare.com/workers/platform/limits/
25. `https://github.com/chonkie-inc/chonkie` (webfetch) — license + org move (feyninc/chonkie)

### Key URLs consulted (verified claims)

- https://github.com/lfnovo/open-notebook — 36.2–36.5k★, MIT, 1–4-speaker podcasts, 18+ providers, "basic references" citations (HIGH)
- https://huggingface.co/hexgrad/Kokoro-82M · https://kokoro82m.com/ · https://texttolab.com/blog/kokoro-tts-review · https://www.visionstory.ai/en-us/open-source/kokoro-tts — Apache-2.0, 82M, CPU 3–6× RT, 54 voices; language count conflicts (v1.0 English-only claims vs 8–10 langs) → MEDIUM on languages, HIGH on license/CPU
- https://ai.google.dev/gemini-api/docs/rate-limits + /pricing + /models — free tier exists, free tokens, RPD resets midnight PT, spend limit N/A; **model-specific RPM/RPD only in AI Studio dashboard → UNVERIFIED** (HIGH on existence, LOW on numbers)
- https://console.groq.com/docs/rate-limits — llama-3.1-8b-instant 30 RPM/6K TPM/14.4K RPD; llama-3.3-70b 30/12K/1K; whisper-large-v3-turbo 20 RPM/2K RPD; org-level limits (HIGH)
- https://github.com/coqui-ai/TTS/discussions/4304 + /issues/3490 + https://huggingface.co/coqui/XTTS-v2 — CPML non-commercial weights; **no commercial license obtainable** (HIGH)
- https://github.com/SWivid/F5-TTS + discussions/1295 + /997 — MIT code, CC-BY-NC weights incl. after fine-tuning (HIGH)
- https://github.com/Zyphra/Zonos — Apache-2.0, 7.2k★, 200k hrs multilingual (HIGH)
- https://github.com/myshell-ai/MeloTTS — MIT, 7.5k★ (HIGH)
- https://d-central.tech/local-embedding-models/ · https://www.promptquorum.com/power-local-llm/best-embedding-models-local-rag-2026 · https://surrealdb.com/blog/embedding-models-comparison — BGE-M3 MIT/100+ langs; jina-v3 CC-BY-NC; nomic Apache-2.0; Qwen3-Embedding-0.6B 70.7 MTEB-eng-v2 (HIGH for licenses, MEDIUM for benchmark deltas — benchmarks differ across sources)
- https://dreaming.press/posts/sqlite-vec-vs-lancedb-vs-chroma-embedded-vector-store-solo-builder.html · https://d-central.tech/self-hosted-vector-databases/ · strophios report — LanceDB hybrid/versioning; sqlite-vec brute-force-only ceiling ~100–250k; Chroma ~1M (HIGH)
- https://localmodel.run/model/qwen2.5-7b · https://tinyweights.dev/posts/how-much-ram-for-local-llms/ · https://llmconfigurator.com/en/models/qwen-2.5 — VRAM tables: 7B Q4 ≈6.1 GB @4k / 10.6 @32k / 25.8 @128k; 14B ≈9 GB; Phi-4-mini ≈2.5 GB (HIGH)
- https://arxiv.org/html/2605.20815 — GraphRAG consumer-GPU benchmark: Qwen2.5 best answers (3.3/5), Phi-4-mini pipeline failure, 7B floor (HIGH — peer-reviewed-style study, single study caveat)
- https://insiderllm.com/guides/best-local-llms-rag/ — Qwen3 8B/14B picks, Command R citations + CC-BY-NC flag (MEDIUM — vendor-adjacent blog, numbers cross-checked)
- https://earezki.com/codexity-part6-small-models/ — citation-hallucination mitigations, Qwen2.5-7B >90% citation accuracy (MEDIUM)
- https://inference-docs.cerebras.ai/support/rate-limits — **no renewable free tier**; $5 credits/30 days; 5 RPM/30K TPM/1M TPD trial (HIGH — official; **conflicts** with tokenmix.ai Apr-2026 blog claiming 1M tok/day free → official wins)
- https://pricepertoken.com/endpoints/mistral/free + https://docs.mistral.ai/admin/billing-usage/usage-limits — free Experiment tier ~1B tok/mo, exact RPM unpublished (MEDIUM on cap, HIGH on existence)
- github docs prototyping-with-ai-models — GitHub Models 15/150/8K low tier, 10/50 high tier, embedding 15/150/64K (HIGH)
- https://www.promptquorum.com/power-local-llm/local-whisper-stt-comparison-2026 · https://codersera.com/blog/faster-whisper-vs-whisper-cpp-speech-to-text-2026/ — faster-whisper NVIDIA ~12× RT/2.5 GB; whisper.cpp Metal ~10× RT on M5; identical WER (HIGH)
- https://gigagpu.com/paddleocr-vs-tesseract-vs-easyocr/ · https://codesota.com/ocr/paddleocr-vs-tesseract — PaddleOCR leads all classes; VLM OCR is 2026 SOTA (HIGH on ranking, MEDIUM on exact %)
- https://github.com/vibrantlabsai/ragas · https://genalphai.com/ragas-vs-trulens-vs-deepeval-the-2026-llm-eval-showdown/ — RAGAS Apache-2.0 15.2k★ v0.4.3; TruLens MIT 3.3k★ Snowflake (HIGH)
- https://github.com/danny-avila/LibreChat + https://www.librechat.ai/docs/features/rag_api — MIT 41.9k★; RAG API = LangChain+FastAPI+PGVector (HIGH)
- https://github.com/Future-House/paper-qa + https://arxiv.org/abs/2409.13740 — Apache-2.0 ~9k★; RCS; $1–3/query frontier (HIGH)
- https://huggingface.co/BAAI/bge-reranker-v2-m3 — MIT, 568M, multilingual, 8K ctx (HIGH)
- https://render.com/docs/free — 750 h/mo, 15-min spin-down, free PG expires 30 days (HIGH)
- https://developers.cloudflare.com/workers/platform/limits/ — free: 100k req/day, 10 ms CPU, 128 MB (HIGH)
- https://github.com/feyninc/chonkie — MIT, 4.7k★ (HIGH)

### Confidence by topic

| Claim | Confidence |
|---|---|
| Licenses (Kokoro Apache-2.0, XTTS CPML, F5 CC-BY-NC, MeloTTS MIT, Zonos Apache-2.0, Docling MIT, jina-v3 NC) | HIGH (official repos/HF cards) |
| Groq / GitHub Models / Cerebras / ElevenLabs free-tier numbers | HIGH (official docs) |
| Gemini free-tier existence; exact RPM/RPD | HIGH / UNVERIFIED (dashboard-only) |
| Local LLM VRAM tables | HIGH |
| Local LLM quality ranking (Qwen > Llama > Phi-4-mini structured-output failures) | HIGH (one study + corroborating blogs) |
| 17–33% citation hallucination (legal RAG) | MEDIUM (single research claim via blog) |
| Kokoro language count (8–10 vs English-only) | MEDIUM (sources conflict) |
| Embedding benchmark deltas (retrieval@10 etc.) | MEDIUM (benchmark-dependent, sources differ) |
| Railway free tier | UNVERIFIED (rate-limited out; historically $5 one-time trial) |
| Jina Reranker free-tier limits | UNVERIFIED |
| Gemini 2.5 Flash TTS free-tier availability | UNVERIFIED |

### Gaps not verifiable this pass

1. Gemini free-tier per-model RPM/RPD — only exposed in the AI Studio dashboard, not docs; treat ~15 RPM/250 RPD (2.5 Flash, historical) as stale/UNVERIFIED.
2. Railway's 2026 free tier — fetch failed twice (Exa + Firecrawl auth); replaced with Render (verified) in FINDINGS.
3. Firecrawl MCP returned 401 unauthorized this pass — all firecrawl queries fell back to exa/webfetch without data loss.
4. Kotaeemon/AnythingLLM/Open WebUI/Meilisearch claims re-used from the 03_opensource pass (their PROGRESS.md) rather than re-fetched; star counts are point-in-time.
