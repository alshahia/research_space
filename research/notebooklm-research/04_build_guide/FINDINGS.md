# FINDINGS — How to Build a NotebookLM-Like Application

Research study covering all technical approaches: grounded RAG pipelines, audio/podcast generation, tech stacks, costs, OSS reuse, pitfalls, and an MVP roadmap. No code — spec/research only.

**Research date:** 2026-08-10 · **Sources:** 40+ URLs cited inline · Companion log: `PROGRESS.md`

---

## 1. What NotebookLM actually is (the reference product)

NotebookLM is "an end-user customizable RAG product": users gather sources (PDFs, web pages, YouTube, Docs, slides, audio, text), then chat with them; every answer is **strictly grounded** in the uploaded sources with inline citations that jump to the exact passage, and the model **refuses** to answer from outside knowledge (https://www.teacherandtask.com/blog/notebooklm-explained-google-research-tool). Under the hood it is a clean RAG implementation on the Gemini family — the "polish is the integration, not the model" (https://www.teacherandtask.com/blog/notebooklm-explained-google-research-tool; https://simonwillison.net/2024/Sep/29/notebooklm-audio-overview/).

Key design decisions that define the product (https://blog.google/innovation-and-ai/products/developing-notebooklm/; https://jasonspielman.com/notebooklm):

1. **Sources in → grounded answers with citations → derived artifacts** (notes, study guides, Audio Overviews). The user journey is Read → Chat → Create.
2. **No web browsing during chat, no training on user data.**
3. **In-context learning, not fine-tuning** — the model is never retrained on user docs (https://medium.com/data-and-beyond/notebooklm-explained-a-complete-guide-to-googles-ai-powered-research-assistant-36c57586ada2).
4. **Paragraph-level citation** — answers cite document + section + passage; retrieval is over chunks, generation is over the top-K retrieved passages (https://medium.com/data-and-beyond/notebooklm-explained-a-complete-guide-to-googles-ai-powered-research-assistant-36c57586ada2).
5. As of 2026: Gemini 2.0 Flash for routine answers, Gemini 2.5 Pro for long tasks like Audio Overviews (https://www.teacherandtask.com/blog/notebooklm-explained-google-research-tool).

---

## 2. Reference architecture (ASCII)

The consensus production shape across all sources: **two pipelines that share an index and nothing else** — an offline indexing pipeline and an online query pipeline (https://palakorn.com/blog/production-rag-system/).

```
                         OFFLINE / INDEXING PIPELINE
  ┌───────────────────────────────────────────────────────────────────────────┐
  │  Source (PDF/DOCX/PPTX/HTML/YT/audio/txt)                                 │
  │    │                                                                      │
  │    ▼                                                                      │
  │  Parse + OCR ──► Clean text + structure (headings, tables, page, doc_id)  │
  │    │                                                                      │
  │    ▼                                                                      │
  │  Chunk (structure-aware, 256–512 tok, 10–20% overlap) + metadata          │
  │    │                                                                      │
  │    ▼                                                                      │
  │  Embed (bi-encoder) ──► (optional reranker-prep: contextual chunking)     │
  │    │                                                                      │
  │    ▼                                                                      │
  │  Index: vector store (HNSW) + BM25/keyword index  ◄── chunk_hash dedupe   │
  └───────────────────────────────────────────────────────────────────────────┘
                                     │ (shared index, ACL/tenant-scoped)
                                     ▼
                           ONLINE / QUERY PIPELINE
  ┌───────────────────────────────────────────────────────────────────────────┐
  │  User query ──► embed query ──► hybrid retrieve:                          │
  │      BM25 (sparse) ∥ vector (dense)  [both tenant/ACL pre-filtered]       │
  │    │                                                                      │
  │    ▼                                                                      │
  │  Fuse (RRF, k≈60) ──► Rerank (cross-encoder, top-50→top-5)                │
  │    │                                                                      │
  │    ▼                                                                      │
  │  Build prompt: numbered chunks [S1..Sn] + "answer only from context"      │
  │    │                                                                      │
  │    ▼                                                                      │
  │  LLM generate (streaming) ──► Citation validator (reject uncited claims)  │
  │    │                                                                      │
  │    ▼                                                                      │
  │  Answer + inline citations + source list  ──► eval/telemetry              │
  └───────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
                        DERIVED ARTIFACTS (Notes / Audio Overview)
  Sources ──► retrieve top chunks ──► outline ──► dialogue script ──►
  disfluency pass ──► TTS per speaker ──► mix/overlap ──► MP3
```

Why two pipelines: indexing can take hours and must not starve user queries; the query service must answer in hundreds of milliseconds (https://palakorn.com/blog/production-rag-system/). Retrieval quality is the ceiling of RAG quality — "the model can only answer from context it actually receives" (https://palakorn.com/blog/production-rag-system/; https://www.databricks.com/blog/rag-workflow).

---

## 3. Pipeline stages — decisions at each step

### 3.1 Ingestion & document parsing

"Expect to spend more time on parsing than on prompts, embeddings, and vector DBs combined" (https://palakorn.com/blog/production-rag-system/). A flattened table poisons the embedding of its whole chunk, and no reranker recovers what the parser destroyed (https://dreaming.press/posts/2026-06-23-best-open-source-rag-platforms.html).

| Tool | License | Formats | Notes | Source |
|---|---|---|---|---|
| **PyMuPDF / pymupdf4llm** | AGPL-3.0 (commercial license for proprietary) | PDF, images; Office via Pro ext | Fastest; benchmark-best text extraction F1/BLEU across doc categories; hybrid OCR (only needed pages) | https://arxiv.org/html/2410.09871v1; https://vstorm.co/llamaindex/top-10-document-parsing-services-for-rag-pipelines-and-llm-applications/ |
| **Docling (IBM)** | MIT-ish OSS (61k stars) | PDF, DOCX, PPTX, XLSX, HTML, images, LaTeX | Best structure preservation (97.9% table cell accuracy in 2025 benchmark); unified DoclingDocument → Markdown/HTML/JSON; MCP server | https://www.firecrawl.dev/blog/best-pdf-parsers; https://procycons.com/en/blogs/pdf-data-extraction-benchmark/ |
| **unstructured** | Apache 2.0 | PDF, DOCX, PPTX, HTML, email, images | Semantic element types (Title/NarrativeText/Table) good for chunking-by-element; slower (51–141 s/doc w/ OCR) | https://www.firecrawl.dev/blog/best-pdf-parsers; https://procycons.com/en/blogs/pdf-data-extraction-benchmark/ |
| **LlamaParse** | Cloud API (10k free credits/mo) | 90+ formats | Vision-LLM layout understanding; fast (~6 s/doc); weaker multi-column; credit pricing hard to predict | https://mixpeek.com/curated-lists/best-pdf-extraction-tools; https://procycons.com/en/blogs/pdf-data-extraction-benchmark/ |
| **markitdown (Microsoft)** | MIT | Office, PDF, audio/video (transcription), HTML | Converts everything to Markdown; OCR + transcription built in | https://www.facebook.com/0xSojalSec/posts/open-source-tool-for-parsing-docx-pdfs-word-and-powerpoint-for-llms-/1273029834351417/ |

**Recommendation:** PyMuPDF (or pymupdf4llm) as the fast default for clean digital PDFs; Docling where layout/tables matter (financial filings, slide decks); LlamaParse/markitdown as the convenience layer. Scientific/patent PDFs are hard for every rule-based parser — Nougat (transformer) outperforms all rule-based ones there (https://arxiv.org/html/2410.09871v1).

### 3.2 Chunking

"If you only fix one thing, fix chunking" — chunking defines the units of knowledge the system can retrieve (https://www.stackai.com/insights/retrieval-augmented-generation-(rag)-best-practices-for-enterprise-ai-chunking-embeddings-reranking-and-hybrid-search-optimization).

- **Default:** structure-aware chunking where headings exist (split by heading hierarchy, keep heading trail as metadata); recursive splitting on `["\n\n", "\n", " ", ""]` as fallback; overlap 10–20% (https://palakorn.com/blog/production-rag-system/; https://hld.handbook.academy/curriculum/case-studies/enterprise-rag/).
- **Sizes to test:** 256 / 512 / 1024 tokens (https://bigdataboutique.com/blog/rag-pipeline-end-to-end-architecture-guide). Smaller chunks (150–300 tok) raise recall@10 from ~70% to 88–95% but 2–4× index/embedding cost; larger chunks cut cost but hurt fine-grained recall (https://eltherion.com/blog/rag-architecture-production-scale).
- **Metadata is the hidden lever:** doc title, heading path, page, version/date, ACL labels, stable chunk IDs for citations (https://www.stackai.com/insights/retrieval-augmented-generation-(rag)-best-practices-for-enterprise-ai-chunking-embeddings-reranking-and-hybrid-search-optimization).
- **Contextual Retrieval (Anthropic):** prepend a 1–2 sentence LLM-generated context to each chunk before embedding + BM25; cuts top-20 retrieval failure by 49% alone, 67% with reranking; ~$1.02 per 1M doc tokens one-time with prompt caching (https://bigdataboutique.com/blog/rag-pipeline-end-to-end-architecture-guide; https://hld.handbook.academy/curriculum/case-studies/enterprise-rag/).
- **Chunk-level hashing / delta re-indexing:** only re-embed changed chunks; at 1% daily churn this is ~100× cheaper than full reindex (https://hld.handbook.academy/curriculum/case-studies/enterprise-rag/).
- NotebookLM itself chunks "usually paragraphs" (https://medium.com/data-and-beyond/notebooklm-explained-a-complete-guide-to-googles-ai-powered-research-assistant-36c57586ada2).

### 3.3 Embeddings

- Dense bi-encoders (OpenAI text-embedding-3-small/large, Cohere embed, open-source BGE/E5/GTE) are the default; SPLADE/BM25-learned-sparse and ColBERT-family exist for hard queries (https://bigdataboutique.com/blog/rag-pipeline-end-to-end-architecture-guide).
- Small model is enough for most RAG — `text-embedding-3-large` costs 6.5× more for modest gain (https://computecomparison.com/guides/rag-pipeline-cost-guide). Instruction-tuned embedding prompts (bge/e5 task prefix) are a free win (https://palakorn.com/blog/production-rag-system/).
- Same embedding model at ingest and query time, always (https://www.databricks.com/blog/rag-workflow).

### 3.4 Vector database / hybrid retrieval / reranking

Hybrid search is the production default, not an upgrade: dense-only misses exact terms (error codes, names, acronyms), BM25-only misses paraphrases (https://bigdataboutique.com/blog/rag-pipeline-end-to-end-architecture-guide; https://hld.handbook.academy/curriculum/case-studies/enterprise-rag/).

- **Fuse with RRF** (rank-based, no score calibration, k=60 default) or weighted score fusion (https://www.stackai.com/insights/retrieval-augmented-generation-(rag)-best-practices-for-enterprise-ai-chunking-embeddings-reranking-and-hybrid-search-optimization; https://developers.redhat.com/articles/2026/05/26/build-enterprise-rag-system-ogx).
- **Rerank** fused top-50–200 with a cross-encoder → top-3–8 for the LLM. Lifts NDCG@10 by 5–15 points, adds 100–300 ms and ~$0.005–0.03/query (Cohere rerank ~$1–2 per 1k searches) (https://bigdataboutique.com/blog/rag-pipeline-end-to-end-architecture-guide; https://thellms.dev/cache/rag-costs-vector-database-embeddings-reranking-and-generation/).
- "Boring defaults" config: chunk 512 tok / overlap 15% / topN 100 each retriever / RRF k=60 / rerank topM 150 / final topK 8 / dedupe by (doc_id, section_path, chunk_hash) (https://www.stackai.com/insights/retrieval-augmented-generation-(rag)-best-practices-for-enterprise-ai-chunking-embeddings-reranking-and-hybrid-search-optimization).

Vector DB shortlist (self-hosted unless noted) — see full comparison in §5 table:

| DB | Strengths | Limits | Practical ceiling |
|---|---|---|---|
| **pgvector** | Zero new infra if you run Postgres; SQL joins; ACID | No native sharding; slow index build (~210 s/1M); filtered p99 degrades | ~5–10M vectors (pgvectorscale extends) |
| **Qdrant** | Fastest p99 (1–5 ms); best filtering; binary quantization 32× memory cut | Smaller ecosystem | 100M+ with sharding |
| **Weaviate** | Native hybrid BM25+vector; built-in vectorizers; tenant-native | Heavier memory; managed pricing jumped | 100M/node |
| **Milvus/Zilliz** | Billions of vectors, GPU indexes, DiskANN | Ops-heavy (etcd/MinIO/Pulsar deps) | 10B+ |
| **Pinecone** | Zero-ops serverless | No self-host; pricey at scale | 1B+ |
| **Chroma** | Prototype in 60 seconds | No sparse/hybrid, no scaling past ~1M | 1M |

Sources: https://buttondown.com/ultradune/archive/eval-002-vector-databases-in-2026-qdrant-vs/; https://www.kargin-utkin.com/vector-database-comparison-2026-benchmarks; https://inductivee.com/blog/vector-database-performance-benchmarks-2025; https://www.data-dynamics.io/en/blog/vector-database-comparison; https://lushbinary.com/blog/vector-database-benchmarks-production-selection-guide-2026/

### 3.5 Grounded generation & citations

- Number the sources in the prompt `[S1]..[Sn]`; include heading trail + doc_id per chunk; instruct model to cite and to **"say so" when the answer isn't in context**; order chunks by rerank score (https://palakorn.com/blog/production-rag-system/).
- Post-process: parse `[S#]` refs → attach source metadata; **reject answers with uncited claims** — "an unvalidated answer is not shipped" (https://palakorn.com/blog/production-rag-system/).
- Abstention: confidence gate (e.g., RAG_MIN_CONFIDENCE_SCORE 0.55) returns "I don't know based on the available documents" — implemented with explicit metric in the enterprise RAG reference architecture (https://github.com/pallavi-chandrashekar/enterprise-rag-reference-architecture).
- Streaming responses are expected UX; SSE is the standard pattern.
- Citation research: models under-generate citations on multi-document reasoning; combining generative + retrieval-based citation methods is the best mitigation (https://arxiv.org/html/2510.20303v2).

### 3.6 Evaluation

- RAGAS metrics: faithfulness, answer relevancy, context relevancy/recall — reference-free (https://aclanthology.org/anthology-files/anthology-files/pdf/eacl/2024.eacl-demo.16.pdf).
- Keep an offline eval set (≥50 gold examples) and run in CI on every prompt/retrieval change (https://palakorn.com/blog/production-rag-system/).
- Watch: RAGAS faithfulness returns NaN on correct refusals by design — track abstention as a first-class behavior (https://github.com/shryu1994/provenance-bench).
- Citation grounding eval: ALCE + trust metrics (citation recall/precision, refusal F1) (https://arxiv.org/html/2409.11242).

---

## 4. Audio: the Audio Overview / podcast feature

### 4.1 How Google does it (to imitate, not replicate)

Two-stage pipeline, confirmed by multiple sources:

1. **Dialogue script generation (Gemini):** outline → revised outline → detailed script → critique pass → modified script → **disfluency pass** (adds "uh", "oh really?", pauses, laughter). "You cannot listen to two robots talking to each other" — the disfluencies are the magic (https://simonwillison.net/2024/Sep/29/notebooklm-audio-overview/; Hard Fork interview with Steven Johnson). Latent.space interview adds: two AI personas with different angles, information unrolled gradually, tension/withholding, no scripted-overlap — natural back-and-forth (https://www.latent.space/p/notebooklm).
2. **Speech synthesis:** Google DeepMind research stack — **AudioLM** (semantic + acoustic tokens) and **SoundStorm** (parallel, non-autoregressive decoding, ~100× faster than AudioLM, multi-speaker dialogue from transcript + speaker prompts) (https://neurlcreators.substack.com/p/how-notebooklm-audio-overview-works; https://jrodthoughts.medium.com/how-did-google-build-notebooklms-cool-podcast-generation-features-854e65738cfb; https://google-research.github.io/seanet/soundstorm/examples/).

NotebookLM specifics vs the SoundStorm paper: no initial audio prompt (works directly from transcript), consistent speaker identities across generations, longer than the paper's 30-second dialogue limit (https://neurlcreators.substack.com/p/how-notebooklm-audio-overview-works).

**Key insight for builders:** the audio quality ceiling is set by the dialogue script, not the TTS. Open-source clones (gabrielchua/open-notebooklm) got most of the way with LLM-generated scripts + basic TTS (https://github.com/gabrielchua/open-notebooklm).

### 4.2 Buildable approaches (cheap → premium)

| Approach | Pipeline | Quality | Cost | Notes |
|---|---|---|---|---|
| **A. Prompt → script → per-line TTS → stitch** | LLM generates `{speaker, text}[]` JSON; TTS per line; pydub/ffmpeg join with overlaps | Good | Cheap | The Vatsal Saglani clone: GPT-4o function-calling for dialogue incl. overlapping interjections + ElevenLabs per-speaker clips, concurrency 2, md5-cached clips, pydub overlay for overlaps (https://pub.towardsai.net/how-i-developed-a-notebooklm-clone-2d901d1c72a6). Google Cloud blog clone: Gemini 1.5 Flash JSON schema output + Google TTS + ElevenLabs cloned voice (https://medium.com/google-cloud/building-a-dynamic-podcast-generator-inspired-by-googles-notebooklm-and-illuminate-e585cfcd0af1) |
| **B. Orchestrated agent pipeline** | Orchestrator agent (Claude Sonnet) with tools: validate sources → query embeddings → outline agent → script agent → submit for production (play.ai API) | High | Mid | Mastra's clone; found explicit detailed prompts + strict `Host 1:`/`Host 2:` script format critical; play.ai beat ElevenLabs on natural host-to-host transitions (https://mastra.ai/blog/notebooklm-clone-with-agent-orchestration) |
| **C. Open Notebook approach** | Content selection → Episode Profile (topic/length/tone/format/audience) → Speaker profiles (expertise/personality/accent/voice model) → Outline → Dialogue → TTS → mix (https://github.com/lfnovo/open-notebook/blob/main/docs/2-CORE-CONCEPTS/podcasts-explained.md) | High | Mid | 1–4 speakers, per-speaker voice model registry, async generation |
| **D. ElevenLabs Text-to-Dialogue** | One API call, multi-speaker turns + audio tags `[laughing]`, unlimited speakers, v3 model; ≤2000 chars/request; non-deterministic — use seed (https://elevenlabs.io/docs/overview/capabilities/text-to-dialogue) | Excellent | Premium | Fewest moving parts |

### 4.3 TTS options

**Hosted APIs** (≈$ per 1k chars, 1000 chars ≈ 1.3 min speech) (https://hakaru.io/tools/tts-cost-calculator; https://elevenlabs.io/pricing):

| Provider | $/1k chars | Free tier | Notes |
|---|---|---|---|
| OpenAI tts-1 | $0.015 | none | 6 voices, fast |
| OpenAI tts-1-hd | $0.030 | none | better quality |
| Azure Neural | $0.016 | generous F0 tier | 100+ languages, 150+ voices |
| Google Cloud TTS (Chirp 3 HD) | ~$0.030 | 1M chars/mo | 75+ languages |
| ElevenLabs Creator | ~$0.30 (1 credit/char; Flash/Turbo 0.5 credit/char) | 10k credits/mo | best quality + cloning |
| AWS Polly | $0.016 | 5M chars first 12 mo | 60+ voices |

**Open-source / self-hosted** (benchmarks on RTX 3090-class) (https://gigagpu.com/self-hosted-tts-comparison/; https://gigagpu.com/tts-latency-benchmarks/; https://contracollective.com/blog/kokoro-vs-piper-vs-xtts-local-text-to-speech-m5-max-2026):

| Model | Params | VRAM | RTF (RTX 3090) | Voice cloning | License | Verdict |
|---|---|---|---|---|---|---|
| **Kokoro-82M** | 82M | ~0.5–1 GB | 0.02–0.03 | No | Apache 2.0 | Best quality-per-speed default; ~600 concurrent streams |
| **Piper** | ~20M | ~0.3 GB | 0.04 (CPU-able) | No | GPL (voices per-voice licenses) | Edge/CPU; robotic |
| **XTTS v2** | ~467M | 4–6 GB | 0.12–0.18 | Yes (6 s clip) | MPL-2.0 lib; CPML non-commercial weights | The cloning pick; 17 languages; async only |
| **Bark** | ~600M | 8–12 GB | 0.25–0.4 | Speaker prompts | MIT | Most expressive (laughter, music) — batch only |
| **Chatterbox** | 0.5B | 2–3 GB | 0.08 | Yes | MIT | ElevenLabs-tier cloning claims |
| **edge-tts** | — (scrapes MS Edge endpoint) | 0 | instant | No | GPL-3.0 | Free but **unofficial**: no SLA, blocked historically, commercial use = Microsoft ToS violation risk; fine for prototypes/personal (https://github.com/rany2/edge-tts/discussions/261; https://learn.microsoft.com/en-us/answers/questions/2088770/are-opensource-edge-tts-free-for-commercial-use) |

**Recommendation ladder:** MVP → OpenAI tts-1 or edge-tts (zero cost) per speaker; quality → ElevenLabs or OpenAI tts-1-hd; self-hosted privacy → Kokoro (2 fixed voices, ~30× realtime); cloned voices → XTTS v2 off the live path. Multi-speaker "overlap" effect → generate short overlapping interjections and mix with pydub (https://pub.towardsai.net/how-i-developed-a-notebooklm-clone-2d901d1c72a6).

---

## 5. Tech stack options

| Layer | Option A — hosted API (fastest) | Option B — self-hosted (cheapest at scale) | Notes / source |
|---|---|---|---|
| Backend | Python FastAPI | Python FastAPI (same) | Reference arch: FastAPI + SQLAlchemy + pgvector (https://github.com/pallavi-chandrashekar/enterprise-rag-reference-architecture) |
| Frontend | Next.js/React | Next.js/React | Open Notebook: Next.js + REST API (https://github.com/lfnovo/open-notebook) |
| Orchestration lib | LlamaIndex or LangChain | Plain Python (no framework) | "Library vs engine" — frameworks give components, you assemble; RAG is 80% assembly (https://dreaming.press/posts/2026-06-23-best-open-source-rag-platforms.html). Mastra's clone used LlamaIndex + Mastra (https://mastra.ai/blog/notebooklm-clone-with-agent-orchestration) |
| LLM | OpenAI gpt-4o-mini / Gemini 2.0 Flash | Ollama / vLLM (Llama 3.x, Qwen) | Gemini 2.5 Flash is the cost-quality winner for RAG per multiple cost guides (https://aicostcheck.com/blog/ai-api-costs-rag-applications; https://computecomparison.com/guides/rag-pipeline-cost-guide) |
| Embeddings | OpenAI text-embedding-3-small ($0.02/M tok) / Google (free tier) | BGE-M3 / E5 via sentence-transformers | Break-even self-hosting ≈ 1M queries/day (https://computecomparison.com/guides/rag-pipeline-cost-guide) |
| Vector DB | Pinecone Serverless | pgvector (start) → Qdrant (scale) | See §3.4 table |
| BM25/hybrid | Weaviate hybrid or OpenSearch | Postgres FTS (tsvector) or Tantivy/rank-bm25 in-process | pgvector + tsvector hybrid works fine <5M chunks (https://palakorn.com/blog/production-rag-system/) |
| Reranker | Cohere Rerank API | cross-encoder (bge-reranker) local | ~$1–2/1k searches hosted (https://thellms.dev/cache/rag-costs-vector-database-embeddings-reranking-and-generation/) |
| Parsing | LlamaParse / markitdown | PyMuPDF / Docling | §3.1 |
| Transcription | OpenAI Whisper API ($0.006/min) | faster-whisper (CTranslate2, 2× speed, 34% less VRAM) or WhisperX (word timestamps + diarization via pyannote) | WhisperX = Whisper + VAD + wav2vec2 forced alignment (https://gigagpu.com/whisper-vs-faster-whisper-for-document-rag/; https://modal.com/blog/choosing-whisper-variants; https://github.com/m-bain/whisperX/) |
| YouTube | youtube-transcript-api (no API key, no browser) | same | `pip install youtube-transcript-api`; list → fetch → formatter; fallback language chains (https://github.com/jdepoix/youtube-transcript-api) |
| TTS | OpenAI/Azure/Google API | Kokoro / Piper / XTTS | §4.3 |
| Auth/tenancy | Supabase | Django/Postgres RLS | (https://github.com/theaiautomators/insights-lm-public) |
| Background jobs | Celery/Redis or queues | n8n / Celery | Podcasts are async: upload → background → notify (https://github.com/lfnovo/open-notebook/blob/main/docs/2-CORE-CONCEPTS/podcasts-explained.md) |
| Eval | RAGAS (LLM-judge) | same | §3.6 |
| Observability | Langfuse/Helicone | OTel + custom | $50–200/mo at 50k events (https://thellms.dev/cache/rag-costs-vector-database-embeddings-reranking-and-generation/) |

---

## 6. Cost estimates

**The one number that matters:** generation (LLM tokens) is 80–95% of RAG spend; embedding is a rounding error; vector DB is a fixed floor (https://aicostcheck.com/blog/ai-api-costs-rag-applications; https://www.besthub.dev/articles/comprehensive-cost-assessment-of-end-to-end-rag-systems-6d90c3f8cbd6; https://www.sphereinc.com/blogs/enterprise-rag-cost).

### 6.1 Embedding (one-time + churn)

- 1M docs @ 500 tok/chunk with text-embedding-3-small: **~$10–40 one-time** (https://computecomparison.com/guides/rag-pipeline-cost-guide; https://aicostcheck.com/blog/ai-api-costs-rag-applications).
- Delta re-indexing (chunk hash diff) keeps recurring cost tiny — e.g., 100k changed docs/day ≈ $40/mo (https://eltherion.com/blog/rag-architecture-production-scale).

### 6.2 Vector DB (per month, ~1–10M vectors)

- pgvector on existing Postgres: ~$0–25; Qdrant Cloud ~$25–175; self-hosted Qdrant on r6g.xlarge ~$95; Pinecone Serverless ~$120–280 at 10M (https://www.kargin-utkin.com/vector-database-comparison-2026-benchmarks; https://aicostcheck.com/blog/ai-api-costs-rag-applications).
- Binary quantization (Qdrant) cuts memory ~32× (1.2 ms p50, 2.1 GB at 1M vecs) — the first cost lever (https://www.kargin-utkin.com/vector-database-comparison-2026-benchmarks).

### 6.3 Generation (the dominant cost)

Typical RAG query = 3,000–8,000 input tokens (context) + 200–500 output (https://computecomparison.com/guides/rag-pipeline-cost-guide):

| Model (2026 prices) | ~$/query @5k in/300 out | 10k queries/mo | 100k queries/mo |
|---|---|---|---|
| Gemini 2.5 Flash | ~$0.0006 | ~$3 | ~$28 |
| gpt-4o-mini / GPT-5 nano | ~$0.0009–0.0013 | ~$4–9 | ~$35–93 |
| GPT-4o / GPT-5 class | ~$0.015 | ~$88 | ~$875+ |
| Claude Sonnet 4.x | ~$0.017 | ~$165 | ~$1,650 |

(https://computecomparison.com/guides/rag-pipeline-cost-guide; https://aicostcheck.com/blog/ai-api-costs-rag-applications; https://www.besthub.dev/articles/comprehensive-cost-assessment-of-end-to-end-rag-systems-6d90c3f8cbd6)

**Levers:** prompt caching (−50–90% on cached input), model routing (cheap model for easy queries), tighter retrieval (4 good chunks beat 12 mediocre — cheaper AND better), answer caching (60–80% hit rate cuts model spend 50–80%) (https://computecomparison.com/guides/rag-pipeline-cost-guide; https://eltherion.com/blog/rag-architecture-production-scale).

### 6.4 Worked examples

- **10k queries/mo RAG app, 100k docs:** embeddings ~$1 amortized + Qdrant Cloud ~$30 + Gemini 2.5 Flash ~$3–15 = **~$35–46/mo**; same app on GPT-5-class = ~$470/mo (https://aicostcheck.com/blog/ai-api-costs-rag-applications).
- **100k queries/mo (mid-scale):** ~$381–3,810/mo depending on model tier (https://computecomparison.com/guides/rag-pipeline-cost-guide).
- **1M docs + 150k queries/mo (enterprise-ish):** generation $150–2,000+/mo by model routing; self-hosting wins unit economics at high volume (https://www.sphereinc.com/blogs/enterprise-rag-cost).

### 6.5 Audio costs

- 10-min podcast ≈ 10k chars ≈ $0.15 (OpenAI tts-1) to $3.00 (ElevenLabs Creator); Kokoro self-hosted ≈ $0 (fixed infra) (https://hakaru.io/tools/tts-cost-calculator).
- Script generation for the podcast: ~2–5k output tokens Gemini Flash ≈ $0.005–0.02 per episode.

### 6.6 Self-host vs API

Break-even points: embeddings ~1M queries/day; LLM ~100k–1M queries/mo for GPU self-hosting; managed vector DB vs self-host at ~10M vectors (https://computecomparison.com/guides/rag-pipeline-cost-guide; https://pierrekasparian.com/en/tools/rag-cost-calculator). SaaS wins for the first 12–24 months of a product unless you need data residency or sub-150 ms latency (https://eltherion.com/blog/rag-architecture-production-scale).

---

## 7. OSS reuse strategy — fork vs build

### 7.1 The landscape (all active as of mid-2026)

| Project | Stars | Shape | Best for | Reuse value for a NotebookLM clone |
|---|---|---|---|---|
| **open-notebook** (lfnovo) | 36k | Full NotebookLM alternative, TS/Python, Docker | Multi-speaker podcasts (1–4), 18+ model providers, transformations, REST API, citations | **Highest** — closest product match; podcast pipeline docs are the best public spec of the audio feature (https://github.com/lfnovo/open-notebook; https://github.com/lfnovo/open-notebook/blob/main/docs/2-CORE-CONCEPTS/podcasts-explained.md) |
| **gabrielchua/open-notebooklm** | 2.6k | Gradio PDF→podcast (fork of pdf-to-podcast) | Quick audio-overview-style demo | Reuse the dialogue-gen prompt + TTS wiring; it's LLM + TTS only, no RAG (https://github.com/gabrielchua/open-notebooklm) |
| **RAGFlow** (InfiniFlow) | 83–85k | RAG engine, DeepDoc layout parsing + KG | Complex documents (tables, scans) | Reuse DeepDoc-style parsing quality; heavier ops (ES + MinIO + Redis) (https://everylocalai.com/tool/ragflow; https://ossalt.com/guides/best-open-source-rag-frameworks-2026) |
| **AnythingLLM** | 35k | No-code document chat, single container, MIT | Fastest working chat-with-docs UI | Good base UI/UX + LanceDB vector store; limited custom retrieval (https://ossalt.com/guides/best-open-source-rag-frameworks-2026; https://mockarty.ru/docs/knowledge-base) |
| **Kotaemon** | 25k | Gradio chat-with-docs UI, multi-provider | Turnkey app + customizable pipeline | Good "stand up in an afternoon" option (https://dreaming.press/posts/2026-06-23-best-open-source-rag-platforms.html) |
| **Dify** | 80k | All-in-one LLM app platform, visual workflows | Ship a RAG app+API+UI in hours | Good platform, but you're boxed into its nodes; not NotebookLM-shaped (https://www.learnwithparam.com/blog/batteries-included-rag-platforms-dify-ragflow-onyx) |
| **Onyx** | — | Enterprise self-hosted platform, 40+ connectors, SOC2/GDPR | Enterprise teams | Connectors + compliance are heavy for a NotebookLM-style product (https://www.learnwithparam.com/blog/batteries-included-rag-platforms-dify-ragflow-onyx) |
| **R2R** | ~8k | "Supabase for RAG" REST backend, hybrid+KG+auth | API-first backend | Interesting plumbing; release cadence slowed (https://dreaming.press/posts/2026-06-23-best-open-source-rag-platforms.html) |
| **NotebookLM-Lite** (LRriver) | — | Self-hosted RAG + Studio artifacts + podcast, Docling + SeekDB + LiteLLM | Directly NotebookLM-shaped | Read its architecture as a blueprint (https://github.com/LRriver/NotebookLM-Lite) |
| **InsightsLM** | 648 | Supabase + n8n + React clone | Supabase-stack teams | n8n backend is not open-core-friendly for control (https://github.com/theaiautomators/insights-lm-public) |

### 7.2 Recommendation

- **If goal = ship a product quickly:** fork **open-notebook** (MIT, closest feature set, has the podcast pipeline, 18+ providers, citations) and customize the citation/UX layer. It already acknowledges citations are weaker than Google's — that's your differentiation work.
- **If goal = learn / control the full stack:** build from scratch in FastAPI + React, but copy the pipeline shape from `open-notebook/docs/2-CORE-CONCEPTS/podcasts-explained.md` and the RAG reference architecture (https://github.com/pallavi-chandrashekar/enterprise-rag-reference-architecture). Start with **pgvector** (no new infra), graduate to **Qdrant**.
- **Don't start from:** RAGFlow/Dify as the app itself (they're engines/platforms, not NotebookLM-shaped products — you'd fight their abstractions; you'd still write your own FastAPI+React app around RAGFlow's API if you chose it) (https://www.learnwithparam.com/blog/batteries-included-rag-platforms-dify-ragflow-onyx).
- Reuse OSS building blocks rather than platforms: PyMuPDF/Docling, faster-whisper/WhisperX, youtube-transcript-api, Kokoro/XTTS, RAGAS, Langfuse.
- Health check before forking: check last release date, not star count — Verba was archived, Quivr repositioned to a library (https://dreaming.press/posts/2026-06-23-best-open-source-rag-platforms.html).

---

## 8. What to AVOID (pitfalls)

### 8.1 Hallucination / un-grounded answers
- Prompting alone cannot enforce refusal — models remain over-responsive; alignment (TRUST-ALIGN) helps, but the practical defense is **citation validation + confidence-gated abstention** at the system level (https://arxiv.org/html/2409.11242; https://github.com/pallavi-chandrashekar/enterprise-rag-reference-architecture).
- Retrieval errors amplify generation hallucinations — fix retrieval first (https://link.springer.com/article/10.1007/s10994-026-07121-y).
- NotebookLM itself warns: Audio Overviews "sometimes introduce inaccuracies" — audio hosts sound confident even when sources are uncertain; ship a disclaimer and prefer transcript citations (https://blog.google/innovation-and-ai/products/notebooklm-audio-overviews/).

### 8.2 Citation errors
- Failure modes: too few citations, wrong citations; worse on multi-document reasoning; small models fail even 1-to-1. Mitigate with generative + retrieval-based combined citation (https://arxiv.org/html/2510.20303v2). Validate citations against the actual retrieved chunk set (reject phantom citations) (https://github.com/shryu1994/provenance-bench).

### 8.3 Chunking mistakes
- Chunks too big → irrelevant tokens dilute signal; too small → context lost (https://bigdataboutique.com/blog/rag-pipeline-end-to-end-architecture-guide). Blind fixed-size splits break tables/headings (https://palakorn.com/blog/production-rag-system/). No metadata → no filtered retrieval, no citations (https://www.stackai.com/insights/retrieval-augmented-generation-(rag)-best-practices-for-enterprise-ai-chunking-embeddings-reranking-and-hybrid-search-optimization).

### 8.4 Long-context vs RAG
- LC beats RAG on well-structured dense corpora (Wikipedia-style); RAG wins on fragmented/dialogue data and at 10–100× lower cost. Never all-or-nothing — route (Self-Route) or hybrid (RAG retrieve + LC verify) (https://aclanthology.org/2024.emnlp-industry.66/; https://arxiv.org/html/2501.01880).
- Long-context degrades: ~58% needle retrieval at 1M tokens, "lost in the middle" beyond ~400–800k; latency scales with context (118 s at 1M) (https://dataku.ai/blog/gemini-1-5-pro-million-token-context-tested). Gemini's own docs: multi-needle accuracy drops; use context caching for cost (https://ai.google.dev/gemini-api/docs/long-context).
- NotebookLM's actual choice: RAG for chat (retrieval + Gemini 2.0 Flash) + long-context Gemini 2.5 Pro for the audio/briefing generation path (https://www.teacherandtask.com/blog/notebooklm-explained-google-research-tool).

### 8.5 Scaling
- Collapsing index and query pipelines into one script (https://palakorn.com/blog/production-rag-system/).
- Full reindex on every change — use chunk-hash delta re-embedding (~100× cheaper) (https://hld.handbook.academy/curriculum/case-studies/enterprise-rag/).
- pgvector past ~10–50M vectors without pgvectorscale; Chroma in production (https://inductivee.com/blog/vector-database-performance-benchmarks-2025).
- Embedding/rerank runs starving query traffic — separate worker pools (https://palakorn.com/blog/production-rag-system/).

### 8.6 Security (tenancy + prompt injection)
- **Never** enforce tenant isolation in the LLM layer — "instruct the model to only use Tenant A's docs" fails under adversarial prompts. Enforce at the vector store query layer (namespace per tenant / collection / payload filter) with the tenant_id from a signed JWT, and pre-filter ACLs at ANN time (https://truto.one/blog/how-to-architect-strict-data-isolation-in-multi-tenant-rag-pipelines/; https://christian-schneider.net/blog/rag-security-forgotten-attack-surface/).
- **Document poisoning / indirect prompt injection** is the #1 RAG attack: 5 crafted docs manipulate responses >90% of the time (USENIX 2025); scanned-in PDFs with hidden text are a real path (Slack AI incident). Treat ingestion like code review; scan with PromptGuard-class classifiers (https://cheatsheetseries.owasp.org/cheatsheets/RAG_Security_Cheat_Sheet.html; https://christian-schneider.net/blog/rag-security-forgotten-attack-surface/; https://www.langprotect.com/blog/rag-security-guide-prevent-data-leakage).
- Vector DBs ship insecure by default: enable auth, encrypt at rest, never default credentials (https://cheatsheetseries.owasp.org/cheatsheets/RAG_Security_Cheat_Sheet.html).
- **Embedding inversion:** embeddings leak text; treat vectors as sensitive data (https://christian-schneider.net/blog/rag-security-forgotten-attack-surface/).
- Logging: never log raw answers or document text (https://github.com/pallavi-chandrashekar/enterprise-rag-reference-architecture).

### 8.7 Compliance / copyright
- User-uploaded docs: "your personal data is never used to train NotebookLM" is the promise to replicate; add data-processing agreements with model providers (data residency matters for EU/GDPR — self-host Mistral/Qwen on EU infra as the compliant path) (https://pierrekasparian.com/en/tools/rag-cost-calculator).
- Generated podcasts over user docs: user retains ownership; don't train on or redistribute user sources (https://elevenlabs.io/docs/overview/capabilities/text-to-dialogue — ownership note; https://blog.google/innovation-and-ai/products/notebooklm-audio-overviews/).
- edge-tts: unofficial API — commercial use is a Microsoft ToS violation risk; use Azure officially for anything commercial (https://learn.microsoft.com/en-us/answers/questions/2088770/are-opensource-edge-tts-free-for-commercial-use).

### 8.8 Latency / cost blowups
- Streaming everything through frontier models (route to cheap models); skipping prompt caching; stuffing 12+ chunks when 4 reranked ones are better (https://computecomparison.com/guides/rag-pipeline-cost-guide; https://www.stackai.com/insights/retrieval-augmented-generation-(rag)-best-practices-for-enterprise-ai-chunking-embeddings-reranking-and-hybrid-search-optimization).
- TTS: naive per-line API calls without caching/clip caching blow up cost and rate limits — md5-cache clips (https://pub.towardsai.net/how-i-developed-a-notebooklm-clone-2d901d1c72a6).

---

## 9. MVP roadmap

Scope: a minimal viable NotebookLM clone — **sources ingest → grounded Q&A with citations → notes → audio overview**. ~4–6 weeks part-time, single dev, hosted API stack.

### Phase 0 — Foundation (week 1)
- FastAPI backend + Next.js/React frontend; Postgres (pgvector) via Supabase or plain Docker; auth + notebook/source models.
- `sources`, `chunks`, `chat_sessions`, `notes`, `artifacts` tables; `tenant_id` on every row (https://github.com/pallavi-chandrashekar/enterprise-rag-reference-architecture).

### Phase 1 — Ingestion (week 1–2)
- Accept: PDF, DOCX, PPTX, TXT/MD, URL (markitdown or Docling), YouTube URL (youtube-transcript-api), audio (faster-whisper via API worker).
- Parse → structure-aware chunk (256–512 tok, 10–20% overlap, heading-path + doc_id + page metadata) → embed (OpenAI text-embedding-3-small or Google free tier) → pgvector + Postgres FTS (tsvector).
- Background job queue (Celery or plain Redis queue); status endpoint per source.

### Phase 2 — Grounded chat + citations (week 2–3)
- Hybrid retrieval (vector + tsvector, RRF fusion) → optional local cross-encoder rerank (bge-reranker) on top-50 → top-5.
- Prompt with numbered chunks + "only answer from context; say so if absent; cite [S#]" → Gemini 2.5 Flash (or gpt-4o-mini) streaming via SSE.
- Citation validator: reject/patch uncited claims; render inline clickable citations to the source passage.
- Abstention: confidence floor → "I don't know based on your sources."
- Eval: 50-question gold set + RAGAS faithfulness/context-relevance in CI from day one.

### Phase 3 — Notes + derived artifacts (week 3–4)
- Save-answer-as-note; AI-assisted note generation (summary/FAQ/study guide) from retrieved chunks.
- Source auto-suggested questions (NotebookLM's signature touch) (https://blog.google/innovation-and-ai/products/developing-notebooklm/).

### Phase 4 — Audio Overview (week 4–5)
- Pipeline: retrieve top chunks → **outline → dialogue script (JSON `{speaker, text}`) → disfluency pass** with Gemini Flash (copy the open-notebook episode-profile pattern) (https://github.com/lfnovo/open-notebook/blob/main/docs/2-CORE-CONCEPTS/podcasts-explained.md).
- TTS: start with **edge-tts** (free, 2 voices) for a working loop; upgrade to OpenAI tts-1 per speaker; optionally ElevenLabs for quality.
- Stitch with pydub; async job + progress; download/share MP3.
- **Do not** attempt SoundStorm-class dialogue synthesis in the MVP — the disfluent script + per-line TTS gets 80% of the effect at 1% of the effort (https://simonwillison.net/2024/Sep/29/notebooklm-audio-overview/).

### Phase 5 — Harden (week 5–6)
- Tenant isolation audit (namespace/collection per tenant + query-time filters), doc-poisoning scan on ingestion, auth on vector DB.
- Prompt caching (context is 60–70% of spend), model routing, answer caching.
- Observability: per-query latency/confidence/token logging + Langfuse; weekly eval runs.

### Post-MVP backlog
Interactive podcast mode (voice interruption), multi-speaker profiles (open-notebook), Video Overviews, workspace sharing, mobile PWA, cloned voices (XTTS), self-hosted everything (Ollama + Kokoro) for the privacy tier.

---

## 10. Summary verdicts

1. **Architecture:** two pipelines (offline index / online query) sharing a tenant-scoped index; hybrid retrieval (BM25+dense, RRF) + rerank is the production default, not an upgrade.
2. **Differentiation is in integration, not models:** NotebookLM's edge = strict grounding + paragraph citations + refusal behavior + the disfluency-rich podcast script. Copy those product behaviors.
3. **Cost:** embeddings are negligible, generation dominates; a 10k-query/mo MVP with Gemini Flash + pgvector runs **under $50/month**.
4. **Reuse:** fork open-notebook for product speed, or build on the reference RAG architecture + OSS blocks for control. Don't build on RAGFlow/Dify as your app.
5. **Avoid:** LLM-layer tenancy, uncited answers, flat chunking of structured docs, full reindexing, edge-tts in commercial products, frontier-model-only routing.
6. **MVP order:** ingestion → cited chat → notes → audio. Audio last, script quality first.

---

*Research log, queries, source URLs and confidence ratings: see `PROGRESS.md` in this directory.*

---

## 11. OSS-first free stack (2026-08-10 re-research)

> **Complementary pass to §1–10.** The original guide assumed a paid hosted stack (Gemini 2.5 Flash + pgvector + cloud TTS, MVP ~$35–50/mo). This section answers: what does the SAME product cost on **free, open-source components only** — fully local, on free API tiers, or forked from free OSS projects. Companion log with per-query confidence: `PROGRESS.md` → "Re-research pass (OSS-first)".
> **Bottom line up front:** a working chat+citations+podcast MVP is buildable at $0 on consumer hardware or free tiers, with two honest ceilings — (1) small local LLMs hallucinate citations 17–33% of the time without a validator, and (2) free/local TTS reaches "good podcast" not "ElevenLabs-class" voices. Every stage below has a free winner; the paid upgrade paths are only where the free option audibly/measurably fails.

### 11.1 Per-stage decision table

| Stage | Best free OSS | License | Maintenance | Quality ceiling | Paid upgrade path |
|---|---|---|---|---|---|
| **PDF/OCR parsing** | **Docling** (IBM, LF AI & Data) | MIT | Very active — v2.84.0 (2026-04-01), 64.5k★, docling-serve API (1.7k★) | Best OSS structure preservation (headings/tables/reading order → Markdown/JSON); rule-based, no vision | VLM parsers (MinerU, Qwen2.5-VL, LlamaParse) for tables/scans a GPU can see |
| **Parsing (fast fallback)** | PyMuPDF / pymupdf4llm | AGPL-3.0 (commercial license available) | Active | Fastest text extraction; no layout structure | same |
| **Parsing (Office/web)** | markitdown (MS) / pandoc / Mammoth | MIT / GPL-2.0+ / BSD-2 (per tool) | Active (markitdown); mature | DOCX/PPTX/XLSX/HTML → Markdown, good enough for RAG | Docling for tables |
| **Chunking** | **No library needed** — Docling Markdown + heading-hierarchy split + parent-heading trail (the ChunkNorris recipe); **Chonkie** (MIT, 4.7k★) if you want semantic/neural chunkers | MIT (Chonkie) | Chonkie very active (feyninc/chonkie, 45+ integrations, 56 languages) | Semantic chunking > fixed-size; gains are real but small vs metadata + rerank | — (chunking is ~free either way) |
| **Embeddings (multilingual — NotebookLM's 80+ langs)** | **BGE-M3** (BAAI) | MIT | Stable; the hybrid specialist (dense+sparse+ColBERT in one 568M model, 100+ langs, 8K ctx) | ~59 MMTEB mean; cross-lingual solid but not SOTA | Qwen3-Embedding-0.6B/8B (Apache-2.0, ~70.7 MTEB-eng-v2, #1 open-weight multilingual 70.58) on GPU; Gemini Embedding API on free tier |
| **Embeddings (CPU speed)** | nomic-embed-text-v1.5 / v2-moe | Apache-2.0 | Active | 62.3 MTEB; v2-MoE ~92% cross-lingual retrieval@10 in 2026 tests; runs on a laptop | same |
| **Embeddings (⚠️ avoid)** | jina-embeddings-v3 (and NV-Embed-v2) | **CC-BY-NC-4.0 weights** | — | Best 2026 retrieval@10 (~92%) — but non-commercial weights; fine for hobby, blocker for product | Jina paid API ($0.018/M tokens) or license |
| **Vector DB (free self-hosted MVP)** | **LanceDB** | Apache-2.0 | Very active | Embedded, no server; **native BM25+vector hybrid + RRF**, MVCC versioning, disk-scale beyond RAM | Qdrant (Apache-2.0) when you need a multi-tenant server |
| **Vector DB (personal ≤250k chunks)** | sqlite-vec | MIT OR Apache-2.0 (dual) | Active; **brute-force only** (ANN still alpha mid-2026) | Exact KNN in your SQLite file; degrades past ~100–250k vectors | LanceDB/Chroma |
| **Vector DB (easiest DX)** | Chroma | Apache-2.0 | Active (Rust 1.x core) | In-memory, ~1M vector ceiling | LanceDB/Qdrant |
| **Reranker** | **bge-reranker-v2-m3** (BAAI) | MIT | Stable | 568M cross-encoder, multilingual, 8K ctx — the standard free hybrid-retrieval companion; ~equals hosted rerank at MVP scale | Cohere Rerank / Jina Reranker API (Jina free tier limits UNVERIFIED) |
| **LLM (local, no GPU / 16GB RAM)** | **Qwen2.5-7B or Qwen3-4B** via Ollama | Apache-2.0 | Active; Qwen3 8B/14B are 2026's best-in-class for instruction following | Qwen2.5-7B best grounded-answer quality of the 7B class (3.3/5 vs Llama 3.1 8B's 2.7/5 in a consumer-GPU GraphRAG study); 7B is the floor for reliable structured output | Gemma 3 12B QAT (~7GB, near-FP16 quality) with 12–16GB |
| **LLM (local, M-series/16GB+) + native citations** | **Qwen3 14B** (Q4 ≈9GB) via Ollama | Apache-2.0 | Active | 14B >> 7B for multi-doc reasoning; still needs a citation validator; Command R 35B is the only local model with built-in citation grounding but its weights are **CC-BY-NC** (trap) | 32B Q4 (~20GB) or cloud |
| **LLM (free API tier)** | **Gemini API free tier** (chat) + **Groq free** (chat + Whisper) + **Mistral free** (~1B tok/mo) as backup (⚠️ GitHub Models was **retired 2026-07-30** — do not design around it; use Microsoft Foundry instead) | n/a | n/a — limits churn | Gemini-class quality at $0; see §11.4 for the rate-limit math | Tier 1 (linked billing) |
| **TTS — the audio moat** | **Kokoro-82M** | **Apache-2.0** | Active; 13.4M HF downloads; 82M params, runs CPU (3–6× realtime on a laptop), 54 voices, 8–10 languages (sources conflict: v1.0 English-only claims vs 10-lang model card — MEDIUM) | #1 on TTS Arena (Jan 2026); beats models 10–100× its size; no voice cloning; less emotional range than ElevenLabs | ElevenLabs (10k free chars/mo), Gemini TTS preview (free-tier availability UNVERIFIED), or F5-TTS/Zonos |
| **TTS (expressive/multilingual, GPU)** | **Zonos** (Zyphra) | Apache-2.0 | Active — 7.2k★, 200k+ hrs multilingual, "on par with or surpassing top TTS providers" | Best Apache-licensed voice quality; ~1.5B params, needs a GPU | — |
| **TTS (⚠️ license traps)** | F5-TTS (MIT code / **CC-BY-NC weights**), XTTS-v2 (**CPML, no commercial license obtainable** — Coqui dead), edge-tts (ToS risk) | see notes | — | XTTS cloning is dead for products; F5 weights non-commercial even after fine-tuning | only via self-trained weights or paid API |
| **STT (audio input)** | **faster-whisper** (NVIDIA/Python: ~12× RT large-v3 int8, 2.5GB VRAM) or **whisper.cpp** (Apple Silicon Metal: ~10× RT; CPU-only elsewhere) — same weights, same WER (~2.5% large-v3) | MIT (both) | Both active | Whisper large-v3 quality, free | Groq free tier also serves whisper-large-v3 (20 RPM / 2K audio req/day) |
| **OCR (scans)** | **PaddleOCR** | Apache-2.0 | Active | Beats Tesseract on every benchmark class (noisy 91.5% vs 84.3%, curved 88.7% vs 52.1%, multilingual 85.3% vs 78.6%); 8× GPU speedup; best CJK | VLM OCR (dots.ocr 3B, Qwen2.5-VL) preserves table structure — needs ≥6GB GPU |
| **Eval** | **RAGAS** | Apache-2.0 | Active — 15.2k★, v0.4.3 | Reference-free faithfulness/relevancy/context metrics; LLM-judge; CI-friendly; note: uses your LLM for judging | TruLens (MIT, Snowflake-owned) if you also want tracing; both free |
| **Frontend (chat+docs)** | **LibreChat** (MIT, 41.9k★) + its RAG API (LangChain + FastAPI + Postgres/PGVector) | MIT | Very active | Polished ChatGPT-class UI, file upload → RAG; **no podcast** | — |
| **Frontend (full product, incl. podcast)** | **Fork Open Notebook** (see §11.3) | MIT | Very active — 36.5k★, 2026 commits | The closest OSS NotebookLM; podcast pipeline built in | — |
| **Search (BM25)** | skip for MVP — LanceDB's built-in Tantivy BM25 covers hybrid; Meilisearch (MIT core) only when you need a separate full-text engine | MIT | — | — | — |
| **Hosting (free)** | Render free (750 h/mo) for the API + Cloudflare Workers free (100k req/day) for the frontend — **with hard caveats** (§11.4) | — | — | Cold starts + 30-day DB expiry make free hosting demo-grade only | $5/mo VPS is the practical floor |

Sources for §11.1: Docling https://github.com/docling-project/docling (stars/license/release) · Chonkie https://github.com/feyninc/chonkie + https://pypi.org/project/chonkie/ · ChunkNorris recipe https://arxiv.org/html/2602.00010 · embeddings https://d-central.tech/local-embedding-models/ , https://www.promptquorum.com/power-local-llm/best-embedding-models-local-rag-2026 , https://surrealdb.com/blog/embedding-models-comparison · vector DBs https://dreaming.press/posts/sqlite-vec-vs-lancedb-vs-chroma-embedded-vector-store-solo-builder.html , https://d-central.tech/self-hosted-vector-databases/ , https://github.com/strophios/local-library/blob/main/docs/RAG_background/vector_storage_report.md · reranker https://huggingface.co/BAAI/bge-reranker-v2-m3 · local LLM VRAM https://localmodel.run/model/qwen2.5-7b , https://tinyweights.dev/posts/how-much-ram-for-local-llms/ , https://llmconfigurator.com/en/models/qwen-2.5 · LLM quality + 7B floor https://arxiv.org/html/2605.20815 , https://insiderllm.com/guides/best-local-llms-rag/ , https://earezki.com/codexity-part6-small-models/ , https://medium.com/@shereshevsky/local-llms-for-graph-rag-extraction-the-mid-2026-re-benchmark-5f36b3d19383 · Kokoro https://huggingface.co/hexgrad/Kokoro-82M , https://kokoro82m.com/ , https://texttolab.com/blog/kokoro-tts-review , https://www.visionstory.ai/en-us/open-source/kokoro-tts · Zonos https://github.com/Zyphra/Zonos · F5-TTS https://github.com/SWivid/F5-TTS (+discussions #1295/#997) · XTTS https://github.com/coqui-ai/TTS/discussions/4304 + https://huggingface.co/coqui/XTTS-v2 · MeloTTS https://github.com/myshell-ai/MeloTTS · STT https://www.promptquorum.com/power-local-llm/local-whisper-stt-comparison-2026 , https://codersera.com/blog/faster-whisper-vs-whisper-cpp-speech-to-text-2026/ · OCR https://gigagpu.com/paddleocr-vs-tesseract-vs-easyocr/ , https://codesota.com/ocr/paddleocr-vs-tesseract · eval https://github.com/vibrantlabsai/ragas , https://genalphai.com/ragas-vs-trulens-vs-deepeval-the-2026-llm-eval-showdown/ · LibreChat https://github.com/danny-avila/LibreChat + https://www.librechat.ai/docs/features/rag_api · PaperQA2 https://github.com/Future-House/paper-qa · hosting https://render.com/docs/free , https://developers.cloudflare.com/workers/platform/limits/

### 11.2 The zero-$ question — three concrete stacks

**(a) Consumer hardware — 16 GB RAM, no GPU (e.g., a mid laptop):**
- **Stack:** Ollama **Qwen2.5-7B Q4** (~6.1 GB @4k ctx; ~10.6 GB @32k — keep context short) or **Qwen3-4B**; **BGE-M3** for embeddings (CPU, slow but fine at MVP scale); **sqlite-vec** (≤250k chunks) or **LanceDB**; **bge-reranker-v2-m3** (CPU); **Kokoro-82M** for both podcast voices (CPU 3–6× realtime); **faster-whisper or whisper.cpp** (small/medium model) for audio input; **PaddleOCR** (CPU) for scans; **RAGAS** for eval; frontend = Streamlit/Gradio for a demo or fork Open Notebook with Ollama pointed at localhost.
- **Reality check:** chat works but is slow (CPU-only 7B ≈ 2–8 tok/s) and 7B is the floor for reliable structured/cited output (Phi-4-mini 3.8B fails unconstrained JSON; arxiv 2605.20815). **Weakest link: LLM quality+latency on CPU** — expect to verify citations programmatically, and TTS voice quality is the second gap (Kokoro is good, not ElevenLabs).
- **Verdict: usable for personal/single-user use; borderline for demos.**

**(b) Mac M-series (16–24 GB unified):**
- **Stack:** Ollama with Metal — **Qwen3 14B Q4 (~9 GB)** fits 16 GB; **whisper.cpp with Metal** (~10× realtime large-v3); **BGE-M3**; **LanceDB**; **Kokoro** (CPU); PaddleOCR/whisper.cpp as above. This is the best free all-local box in the three scenarios.
- **Weakest link: still the 14B model ceiling** vs Gemini-class grounding on long multi-doc questions, and Kokoro's English-centric voice/language set for non-English podcasts.
- **Verdict: genuinely good single-user NotebookLM-lite, fully offline.**

**(c) Pure free tiers (no local compute):**
- **Stack:** **Gemini API free tier** for chat + (optionally) embeddings; **Groq free** for Llama-3.3-70B chat (30 RPM / 12K TPM / 1K RPD) + **whisper-large-v3** STT (2K audio req/day); **Mistral free** (~1B tok/mo cap) as fallback (GitHub Models **retired 2026-07-30** — cross-validated against github.blog changelog); **ElevenLabs free** (10k credits/mo ≈ 10–20 min audio — non-commercial + attribution required) for the podcast; frontend/API on **Render free** (750 h/mo) + **Cloudflare Workers free** (100k req/day, but 10 ms CPU — proxy/frontend only).
- **Rate-limit math that actually binds:** Groq's 6–12K TPM means one typical RAG request (5k context + answer) can consume a full minute's budget — fine for a single demo user, dead for bursts; ElevenLabs 10k chars ≈ **one 10-min podcast episode per month**; Gemini free-tier RPM/RPD are model-specific and only visible in the AI Studio dashboard (**UNVERIFIED exact numbers** — https://ai.google.dev/gemini-api/docs/rate-limits); Cerebras is **not** a renewable free tier anymore (official: $5 credits, 30-day expiry, payment method required — https://inference-docs.cerebras.ai/support/rate-limits; conflicts with older blogs claiming 1M tokens/day free — trust the official page).
- **Weakest link: TTS monthly cap + chat rate limits** — the demo works, but one podcast episode/month and ~a few hundred chats/day is the ceiling.
- **Verdict: viable for a demo/personal MVP; not for real users.**

### 11.3 Fork recommendation verdict

| Project | License / stars | Fit for THIS use case (podcast + citations) | Verdict |
|---|---|---|---|
| **Open Notebook** (lfnovo) | MIT / ~36.5k★ | Full NotebookLM shape: notebooks, sources, grounded chat, 1–4-speaker podcast pipeline with per-speaker profiles, 18+ providers **incl. Ollama** (the all-local path), REST API. Citations admitted "basic (will improve)" | **FORK THIS.** It is the only free OSS base with the podcast pipeline AND local-model support already wired |
| LibreChat + RAG API | MIT / 41.9k★ | Great chat UX + PGVector RAG; no podcast; RAG API is LangChain+FastAPI (swap embedder/LLM freely) | **Steal the UI layer** if you want a chat-first product; bolt podcastfy on top |
| PaperQA2 (FutureHouse) | Apache-2.0 / ~9k★ | Agentic RAG with in-text citations + LLM reranking + contextual summarization (RCS); $1–3/query at frontier-model cost but model-agnostic | **Steal the citation discipline** (RCS + validation) — the best OSS answer to NotebookLM's grounding problem |
| Kotaemon | Apache-2.0 / 25.7k★ | Best citation UX (in-page PDF preview + highlight), hybrid + rerank out of the box; no audio | Steal the **citations UX**; not a fork base (Gradio) |
| RAGFlow | Apache-2.0 / 87.2k★ | Deep-document parsing + traceable citations; **no audio**; heavy ops (ES + MinIO + Redis/Infinity, 8GB+ RAM full image) | Do **not** fork — borrow DeepDoc-parsing ideas only |
| Open WebUI | Custom license / ~148k★ | Basic RAG (no reranker, no podcast); custom (non-OSI) license | Skip for this use case |
| NotebookLM-Lite (LRriver) | (small) | Docling + SeekDB + LiteLLM — a clean blueprint of the same idea | Read as architecture reference |

**Recommended free build path:** fork **Open Notebook** → point it at Ollama (Qwen3 14B) + BGE-M3 + Kokoro → add a **citation validator** (reject uncited claims; validate `[S#]` against the retrieved chunk set — the pattern from PaperQA2/§3.5) → use **RAGAS** in CI. That's the whole free stack. Don't hand-roll a frontend; don't start from RAGFlow/Dify.

Sources: https://github.com/lfnovo/open-notebook · https://github.com/danny-avila/LibreChat · https://github.com/Future-House/paper-qa · https://arxiv.org/abs/2409.13740 · https://github.com/Cinnamon/kotaemon (maintainers' comparison issue #154) · 03_opensource/FINDINGS.md (RAGFlow/Open WebUI/AnythingLLM detail)

### 11.4 Pitfalls specific to the free path

1. **Small-model citation hallucination is the #1 killer.** Legal-RAG research: 17–33% hallucinated citations; a 7B told to cite will invent `[7]` when only 5 chunks exist. Mitigations that actually work: label chunks `[S1]..[Sn]` in the prompt, cap sources at 4–7, **validate citations post-hoc** (reject phantom refs), confidence-gated abstention, and constrained decoding (Ollama `format`/grammars) for any JSON step — Phi-4-mini went 0% → 100% schema-valid under constraints (https://arxiv.org/html/2605.20815 ; https://earezki.com/codexity-part6-small-models/ ; https://medium.com/@shereshevsky/local-llms-for-graph-rag-extraction-the-mid-2026-re-benchmark-5f36b3d19383).
2. **Long-context memory traps on local hardware:** KV cache dominates — Qwen2.5-7B is ~6.1 GB @4k ctx but **~25.8 GB @128k** (https://localmodel.run/model/qwen2.5-7b). A "128k context" marketing number doesn't fit in 16 GB; keep ctx short and rely on retrieval.
3. **License traps (all verified this pass):** XTTS-v2 weights are **CPML non-commercial and no commercial license is obtainable** (company defunct) — https://github.com/coqui-ai/TTS/discussions/4304 ; F5-TTS official weights **CC-BY-NC** even after fine-tuning — https://github.com/SWivid/F5-TTS/discussions/997 ; jina-embeddings-v3 and NV-Embed-v2 weights **CC-BY-NC** — https://d-central.tech/local-embedding-models/ ; Command R (only local model with native citations) is **CC-BY-NC** — https://insiderllm.com/guides/best-local-llms-rag/ ; edge-tts = unofficial API, Microsoft ToS risk (see §8.7); Kokoro pulls in **espeak-ng (GPL)** for phonemes — fine for most use, check for enterprise (https://kokoro82m.com/); Piper voices carry per-voice licenses (see §4.3).
4. **Free-tier traps:** Groq limits are **per-organization**, not per-key — 5 keys ≠ 5× quota (https://console.groq.com/docs/rate-limits); Cerebras free is a **30-day $5 trial**, not a tier (official docs, conflicts with blogs — official wins); Gemini/Mistral free tiers' fine print: free-tier prompts **may be used to improve products** (https://ai.google.dev/gemini-api/docs/pricing); ElevenLabs free is **non-commercial + attribution required** (https://clarratools.com/elevenlabs-free-plan-limits/); **GitHub Models is retired** (playground + inference API + BYOK shut down 2026-07-30; announced 2026-06-16 → brownouts 07-16/07-23 → gone 07-30; https://github.blog/changelog/2026-07-30-github-models-is-now-retired/) — any tutorial citing its free tier is stale; migration path is Microsoft Foundry.
5. **Free hosting is demo-grade only:** Render free = 750 h/mo, spins down after 15 min idle with ~1 min cold start, ephemeral filesystem, and free Postgres **expires after 30 days** (https://render.com/docs/free); Cloudflare Workers free = **10 ms CPU/request** and 128 MB — can't run Python/TTS/LLM, only a thin proxy (https://developers.cloudflare.com/workers/platform/limits/). Railway free tier: **UNVERIFIED** (rate-limited out this pass; historically a one-time $5 trial credit). **Practical floor: a $4–5/mo VPS** — at which point "free" means free software, not free hosting.
6. **Quality-ceiling honesty:** the free stack reaches "very good podcast" (Kokoro + a strong disfluent script — the script is 80% of the effect, §4.1) but not ElevenLabs/NotebookLM-class voices, and local 7–14B models underperform Gemini-class on long multi-doc grounding. If either of those is the product's promise, budget for the paid tier listed in §11.1.

### 11.5 Voicebox & VoiceStudio (user follow-up, 2026-08-10)

| Project | What it is | License / status | Fit for this build |
|---|---|---|---|
| **Meta Voicebox** | Meta FAIR flow-matching NAR speech model (June 2023; 60K hr EN / 50K hr 6-lang audiobooks; zero-shot TTS, style transfer, denoising, editing; up to 20× faster than autoregressive, beat VALL-E at the time) | **Never released** — no weights, no code; demo + paper only (ai.meta.com: "not making the Voicebox model or code publicly available") | **Not usable — do not design around it.** Its technical lineage (flow matching + text-guided infilling) lives on in open models: Dia (TME), OpenAudio S1, Qwen3-TTS |
| **VoiceStudio (debpalash)** — formerly OmniVoice-Studio | "Open-source ElevenLabs alternative": 100% local desktop app (macOS/Win/Linux), 3s zero-shot voice cloning, voice design from text description, video dubbing (transcribe→translate→re-voice→MP4), audiobook editor (EPUB/PDF→m4b, multi-voice), stories editor, dictation widget, batch queue, Demucs vocal isolation, Pyannote+WhisperX diarization, 14 TTS engines + 11 ASR engines, **MCP server** (drives from Claude/Cursor), diagnostics suite | **AGPL-3.0** (commercial license available) | **Strong OSS candidate for a TTS/voice product** — the closest free local suite to ElevenLabs feature-parity. Caveats: (1) **AGPL copyleft** — modify+distribute/serve ⇒ must share source (MIT-fork Open Notebook stays cleaner if you only need podcast TTS); (2) "646 languages" = engine-matrix claim, per-engine quality varies; (3) quality depends on engine + hardware + reference clip (zero-shot cloning is prompt-conditioned, not fine-tuned — ~8s ref sweet spot, hard cap 15s); (4) desktop app, not a headless API out of the box (has MCP). **Where ElevenLabs still wins:** out-of-the-box English consistency/polish |
| VoiceStudio (wtsteward11) | WinUI 3 desktop voice-cloning studio: XTTS v2, **Chatterbox (Resemble AI — 23 langs, emotion)** recommended, Tortoise HQ | Small project, scale/activity unverified | Niche desktop tool; Chatterbox engine itself is the notable takeaway |
| VoiceStudio (latentforge) | Research toolkit: text-style-prompted synthesis + instant LoRA adaptation over Parler-TTS/Higgs-Audio/Qwen3-TTS/Dia | Research project (2026), arXiv placeholder | Research reference only |
| "Voice Studio" (aiaudiogen.com) | Commercial local-Mac TTS/cloning/design + MCP server for agents | Proprietary | Not OSS — pay-tier alternative to ElevenLabs |

**Verdict for a NotebookLM-like build:** VoiceStudio (debpalash) is the best free OSS voice suite for a *voice-first* product, but for the podcast pipeline in this build the license-clean path remains **Kokoro-82M (Apache-2.0) inside an MIT base (Open Notebook)**; add Chatterbox/VoiceStudio engines only if you accept AGPL or buy the commercial license. Voicebox: skip (unavailable) — but mine its ideas: the disfluent-script + flow-matching-TTS recipe (§4.1) is the same magic.

Sources (2026-08-10): https://ai.meta.com/blog/voicebox-generative-ai-model-speech/ · https://voicebox.metademolab.com/ · https://arxiv.org/abs/2306.15687 · https://github.com/debpalash/VoiceStudio · https://github.com/wtsteward11/VoiceStudio · https://github.com/LatentForge/VoiceStudio · https://www.aiaudiogen.com/developers
