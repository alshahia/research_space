# Research Progress Log — NotebookLM Competitors (Commercial)

**Task:** Find all notable commercial products similar to Google NotebookLM; document what they do, inputs, outputs, pricing, strengths/weaknesses; build a comparison table.
**Date:** 2026-08-10
**Tools used:** Exa web_search (hit free-tier rate limit mid-session), Firecrawl search + scrape, one targeted page scrape per key product.
**Coverage:** 20 products profiled in FINDINGS.md, 30+ more named as adjacent. Open-source products deliberately excluded (handoff to the OSS agent).

---

## Step 1 — Broad competitor sweeps (6 parallel queries)

**Queries run:**
1. `exa: Google NotebookLM alternatives and competitors list of AI research tools`
2. `exa: best NotebookLM alternatives 2025 comparison AI document Q&A tools pricing`
3. `exa: ElevenLabs GenFM audio overviews feature pricing what it does` — FAILED (Exa rate limit; recovered later)
4. `exa: Perplexity Comet Spaces pages AI research features pricing 2025`
5. `firecrawl_search: NotebookLM competitors comparison AI notebook tools` — returned empty `web: []` (no data; tool gap)
6. `firecrawl_search: best alternatives to NotebookLM 2025 pricing features` — empty `web: []`

**Sources captured (high value):**
- toolchase.com/alternatives/notebooklm/ — Consensus, Perplexity, Elicit, ChatPDF; Mendeley/Zotero adjacent
- toolworthy.ai/blog/notebooklm-alternatives — Claude/Elicit/ChatGPT/AnythingLLM/Perplexity/SurfSense/Consensus/Recall/Elephas/Saner.AI; NotebookLM source caps 50/100/300/600
- atlasworkspace.ai/blog/notebooklm-competitors — Atlas, Claude, Elicit, Perplexity, Scite, Consensus, Notion AI, Obsidian; 3-year cost table ($720 cluster); trains-on-uploads matrix
- storyflow.so/blog/best-notebooklm-alternatives-2026 — Perplexity Spaces, Elicit, Humata, Glasp, ChatPDF, PodGenie, Claude/ChatGPT Projects, Mem, Anara + pricing table
- getsidenote.app/blog/best-notebooklm-alternatives — Sidenote, Sider, ChatPDF, Humata, SciSpace
- androidauthority.com/notebooklm-alternatives-3672278/ — Notion, Obsidian, Recall, Atlas, OpenNotebook
- ponder.ing/blog/notebooklm-alternatives — Ponder, Elicit, SciSpace, Consensus, ResearchRabbit, Perplexity, ChatPDF, Notion AI, Readwise Reader, Scopus AI; NotebookLM vs Ponder table
- prezent.ai/blog/notebooklm-alternatives — Saner.AI, Notion, Obsidian, TheDrive.AI, Paperguide, ElevenLabs GenFM, SciSpace, Tana
- omidsaffari.com/blog/best-ai-research-tools — Elicit vs Consensus vs Scite vs NotebookLM pricing
- thedatascientist.com/notebooklm-alternatives/ — BeFreed, Paperguide, Notion AI, Obsidian, AnythingLLM, Recall, ClickUp Brain, Wondercraft
- eweek.com/news/5-notebooklm-alternatives-2026/ — Notion, Obsidian, Recall, Atlas, Open Notebook; availability + pricing
- thedrive.ai/blog/best-notebooklm-alternatives-2025 — The Drive AI, Elephas, Saner.AI, Afforai, Unriddl, GenFM, Tana
- elephas.app/blog/best-notebooklm-alternatives — Elephas, Open NotebookLM, Afforai, Anara, Bohrium, Claude Projects, OneNote, Notion AI, MyMind pricing
- notebookcheck.net/Your-second-brain-Obsidian-Notion-and-who-lets-the-AI-in.1351960.0.html — **KEY FINDING: NotebookLM renamed to Gemini Notebook on 16 July 2026**; limits table (50 sources free vs ChatGPT 5 files); Obsidian/Logseq/Joplin/Anytype/OneNote notes

**Notes/gaps:** Firecrawl web search returned zero hits on the two broad queries — switched strategy to Exa + targeted Firecrawl scrapes. Exa rate-limited twice in this session; affected queries re-ran later. Secondary sources disagree on prices (Elicit $10 vs $49; Consensus $9.99 vs $20) — resolved via official pricing pages in later steps. The rename to Gemini Notebook appears in only 1 of 13 roundups — risk of source duplication from a single outlet; confirmed via Google's own domains (notebooklm.google/plans, support.google.com/gemininotebook).

**Confidence:** NotebookLM source caps and free-tier limits — HIGH (Google help center, Step 7). Rename — HIGH (Google property + notebookcheck). All roundup "best for X" claims — MEDIUM (marketing-flavored, affiliate links present in toolchase).

---

## Step 2 — Major platforms (5 queries)

**Queries run:**
1. `exa: ChatGPT Projects Canvas attachments GPTs file upload document analysis features pricing`
2. `exa: Claude Projects knowledge base artifacts document upload features pricing Anthropic` — FAILED (rate limit); retried in Step 3
3. `exa: Microsoft Copilot document grounding file upload teams Copilot Studio features pricing`
4. `firecrawl_scrape: https://elevenlabs.io/genfm` — **redirects to elevenlabs.io/studio (Studio 3.0)** — GenFM now lives inside Studio; documented as such
5. `exa: Notion AI Q&A workspace knowledge features pricing 2025`

**Sources captured:**
- openai.com/chatgpt/pricing; help.openai.com/en/articles/10169521-projects-in-chatgpt (file caps: Free 5 / Go+Plus 25 / Edu-Pro-Business-Enterprise 40; GPTs vs Projects); help.openai.com/en/articles/9930697 (Canvas: PDF/MD/DOCX export, sharing); openai.com/academy/working-with-files; learn.chatgpt.com/docs/projects (local projects, folders)
- claude.com/pricing (Free / Pro $20, $17 annual / Max $100–200); support.claude.com/en/articles/9519177 (project knowledge base); support.anthropic.com/en/articles/11473015 (auto-RAG, up to 10?�); support.claude.com/en/articles/9487310 (artifacts); support.claude.com/en/articles/8241126 (30MB files, unlimited count)
- microsoft.com/en-us/microsoft-365-copilot/pricing ($30/user/mo core; Business promos $18–25); cdw.com Copilot Pro vs Copilot guide ($20/mo, M365 Personal/Family required, deep research); microsoft.com Copilot Studio pricing ($200/25k Copilot Credits pack, pay-as-you-go); learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-file-upload (500 files, 512MB, ~20 formats, Dataverse storage); learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing (Copilot Credits, zero-rated usage for M365-licensed users)
- elevenlabs.io/studio (Studio 3.0: TTS, music, SFX, captions, voice changer; file types EPUB/PDF/TXT/HTML/MP4/MOV/MP3/WAV/FLAC; 32+ languages; URL projects)
- notion.com/pricing (Free / Plus $10 / Business $20 / Enterprise; Agent $10 per 1,000 credits; Workers beta); notion.com/blog/notion-ai-for-work (Research Mode, Enterprise Search, connectors, all-in-one pricing from $20); notion.com/help Q&A guides (workspace-only grounding, page citations, won't invent answers, no database search)

**Confidence:** HIGH for everything on this list (all official vendor pages). Medium items: ChatGPT "Go" tier $8/mo and Business ~$25/user — the OpenAI pricing page text did not surface numeric values in the scrape; corroborated by dust.tt blog (Business €29/user/mo) and 2025 launch coverage. Adobe AI Assistant add-on ~$5/mo — MEDIUM (bundling changed over time, no clean pricing scrape this pass).

---

## Step 3 — Claude retry, Elicit, Consensus, SciSpace (4 queries)

**Queries run:**
1. `exa: Claude Projects knowledge base upload documents artifacts Anthropic pricing Pro Max` (retry — success)
2. `exa: Elicit AI research assistant pricing plans features systematic review 2025`
3. `exa: Consensus AI pricing premium plan features evidence-based answers 2025`
4. `firecrawl_scrape: https://scispace.com/pricing` (official, live page)

**Sources captured:**
- claude.com/pricing + Claude help center articles (above) — RAG for projects on all plans, auto-activation, 10?� expansion
- elicit.com/pricing (Basic free; Pro $49/user/mo billed $588 annually; Scale $169/user/mo billed $2,028; Enterprise custom); support.elicit.com/en/articles/14759154 (systematic reviews: 5,000/20,000/40,000 papers per plan; PRISMA; dual review; report caps 80/135/200 papers); elicit.com/solutions/systematic-review (138M papers, 545k clinical trials, sentence-level citations, 99.4% extraction accuracy claim, BYOData uploads, Zotero import); pro.elicit.com (LEGACY pricing: $10/$12/$42/$49/$65 — superseded, kept as volatility evidence)
- help.consensus.app/en/articles/10280275 (Premium feature set); help.consensus.app/en/articles/10087865 (plans: Pro $20/mo or $144/yr; Deep $65/mo or $540/yr; Enterprise); help.consensus.app/en/articles/11408820 (Pro = unlimited Pro messages, 15 Deep reviews/mo, unlimited snapshots); consensus.app/pricing; consensus.app/home/features/start-trial (220M+ papers; Deep research screens up to 1,000 papers; clinical mode; LibKey; upload own papers)
- scispace.com/pricing (live: Premium $20/mo or $12 annual; Advanced $90/$70; Max $200/$160; credits: 1,200 / 10,000 / 40,000; Enterprise; 270M+ papers; SCI30 promo flag)

**Gaps:** Elicit's current official pricing ($49 Pro) conflicts with $10–12 Plus figures in several 2026 roundups — official page wins; both recorded (FINDINGS ?�5.7 pricing volatility). Consensus older "Premium $8.99–9.99/mo" from atlasworkspace/ponder roundups vs current Pro $20 — same treatment.

---

## Step 4 — Mid-tier tools (4 queries)

**Queries run:**
1. `exa: ChatPDF pricing free plan features how it works upload PDF chat`
2. `exa: Julius AI data analysis pricing plan features document upload`
3. `exa: RAGFlow AnythingLLM open source RAG document Q&A knowledge base features` — captured, then EXCLUDED from FINDINGS (OSS handoff)
4. `exa: Khanmigo Khan Academy AI tutor pricing Fermat AI learning platform` — FAILED (rate limit); retried in Step 6

**Sources captured:**
- chatpdf.com (official: free 2 docs/day, Plus, page citations, side-by-side view, multi-file folders, no-account start); otio.ai/blog/how-does-chatpdf-work (detailed limits: free 3 PDFs/day 10MB 120pp 50 Qs; Plus $5/mo 50/day 32MB 2,000pp 1,000 Qs; enterprise unlimited); apps.apple.com ChatPDF listing (premium in-app purchases, "we don't store your data")
- julius.ai/pricing (official live: Free / Plus $20 or $16 annual / Pro $45 or $37 / Max $200 / Ultra $500 / Business $450; credits, RAM, frontier models GPT-5.5/Claude Opus 4.8); julius.ai/docs/get-started/files (formats incl. .sav/.parquet; retention: free 1h inactivity, paid 7 days); julius.ai/docs/faqs (Snowflake/BigQuery/MySQL/Postgres/SQL Server; Slack agent)
- github.com/Mintplex-Labs/anything-llm (MIT; agents, multi-user, vector DBs, embed widget) + ragflow.io + github.com/infiniflow/ragflow (deep-document understanding, template chunking, grounded citations, GraphRAG, Self-RAG, RAPTOR) — **all handed to OSS agent**

---

## Step 5 — Education, Adobe, GenFM pricing, Fermat, Copilot consumer, Dust, Fixie, DocumindAI (4 rounds of mixed queries)

**Queries run (in order):**
1. `exa: Khanmigo pricing $4 per month Khan Academy AI tutor Fermat AI learning` (retry — success)
2. `firecrawl_search: Dust Lindy Fixie AI agent platforms autonomous assistants document processing`
3. `firecrawl_search: Documind AI document analysis tool features`
4. `firecrawl_scrape: https://notebooklm.google.com/pricing` — redirected to accounts.google.com sign-in, then **notebook.google.com** — confirmed rename domain-level; pricing captured instead from support.google.com/gemininotebook/answer/16213268
5. `exa: Gemini Notebook Google NotebookLM Plus pricing free plan source limits 2026`
6. `firecrawl_search: Adobe Liquid Mode Acrobat AI mobile document summarization`
7. `firecrawl_search: ElevenLabs GenFM pricing credits plans podcast audio`
8. `firecrawl_search: Fermat AI learning platform personalized courses AI tutor`
9. `exa: Fermat AI math learning app tutor students solving steps`
10. `firecrawl_search: Microsoft Copilot free plan Copilot Pro $20 month pricing features 2025`
11. `firecrawl_search: Dust AI platform pricing per user assistants workspaces`
12. `firecrawl_scrape: https://documindai.com/analyze` (official)
13. `firecrawl_search: Fixie AI agent platform company status acquired 2025` — no clear current-status data (gap)

**Sources captured:**
- khanmigo.ai/pricing + /learners + /parents ($4/mo or $44/yr; teachers free US; GPT-4-powered; US-only, 18+); support.khanacademy.org (3 plans: Learner/Parent $4, Teacher free)
- notebooklm.google/plans (Standard 50 sources; Plus 100; rename FAQ); support.google.com/gemininotebook/answer/16213268 (full limits table: notebooks 100/200/500/500/500; sources 50/100/300/500/600; chats 50/200/500/2.5K/5K; audio overviews 3/6/20/100/200; video overviews; reports/flashcards/quizzes/mind maps 10→1K/day; Deep Research 10/mo→200/day); support.google.com/gemininotebook/answer/16269187 (500k words/200MB per source); support.google.com/googleone/answer/16882689 (Google AI Plus benefits incl. Gemini Notebook 100 sources); gemini.google/subscriptions (Pro/Ultra tiers)
- adobe.com/acrobat/hub/what-is-adobe-liquid-mode.html; adobe.com/acrobat/generative-ai-pdf.html (AI Assistant: summaries, Q&A, outlines, cited); adobe.com/devnet-docs/acrobat/android/en/lmode.html (Sensei-powered, mobile, Summarize + attributions); techcrunch.com 2020 Liquid Mode launch (background)
- elevenlabs.io/pricing (Free 10k credits; Starter $5 30k; Creator ~$22 121k; credit-based, per-goodcall ~$22 Creator; flexprice.io breakdown for overages)
- fermat-app.space (AI tutor, quiz generator, study planner, concept map, **podcast generator**, task manager); fermat.app (fashion AI — disambiguation note); stimyapp.com, mathpal.study, gettutor.app (adjacent math tutors, Step-6 context only)
- microsoft.com M365 Premium page (Copilot in apps, 6TB); cdw.com guide (free Copilot vs Pro $20: credits, peak-time, deep research); microsoft.com/microsoft-365-copilot/business (Business plan pricing $18–25 promo)
- dust.tt/home/pricing (Free 500 credits lifetime; Business; Enterprise; $0.01/credit programmatic); dust.tt; tooliverse.ai/tools/dust (Pro $29/user/mo, 3,000+ orgs, 300k agents, SOC 2)
- usecarly.com/blog/dust-alternatives (Lindy from $49.99/mo; Manus $39/mo); vellum.ai/blog/best-lindy-ai-alternatives-2026
- documindai.com/analyze (summaries, risks/obligations/deadlines, source-backed Q&A, contract/invoice/policy focus, PDF/Word/TXT); documind.cloud (separate IDP platform — disambiguation)

**Gaps / low confidence:**
- **Fixie** — no current pricing or status found; only a 2025 LinkedIn roundup naming it as an agent-platform startup. Include with LOW confidence, flag for verification.
- **Lindy** — official pricing page not scraped; $49.99/mo from third-party comparison. MEDIUM.
- **DocumindAI** — pricing not published on analyzed pages. GAP.
- **Fermat (fermat-app.space)** — pricing not published. GAP. Name collision with fermat.app (fashion AI) resolved by keeping the education product under its full domain.
- **Dust grounding** — "agent answers source-cited" is from the product pitch; not verified hands-on. MEDIUM.
- **Khanmigo** — US-only paid plans confirmed; non-US pricing absent. HIGH for US figure.

---

## Step 6 — Verification & cross-checks

- Cross-checked rename (Gemini Notebook) across 3 independent sources: notebooklm.google/plans ("NotebookLM is now Gemini Notebook as of July 2026"), notebookcheck.net (dated 16 July 2026), support.google.com/gemininotebook URLs. → HIGH confidence.
- Cross-checked the "$20/mo cluster" claim: ChatGPT Plus $20 (openai.com), Claude Pro $20 (claude.com), Perplexity Pro $20 (perplexity.ai/hub/pricing), Copilot Pro $20 (CDW + microsoft.com), Consensus Pro $20/$144 (help.consensus.app), SciSpace Premium $20/$12 (scispace.com), Gemini Notebook Plus ~$20 (googleone support). → HIGH.
- Cross-checked NotebookLM free-tier caps: notebookcheck (50 sources), support.google.com (50 sources, 500k words), toolworthy (50/100/300/600 across tiers). → HIGH (50 free; tier numbers differ slightly between sources — used official Google table in FINDINGS).
- Audio-overview competitors: ElevenLabs GenFM (official + pricing page + blog), PodGenie (storyflow), BeFreed (thedatascientist), Wondercraft (thedatascientist), Fermat podcast generator (fermat-app.space), Open NotebookLM (OSS — excluded). → HIGH for GenFM; MEDIUM for the smaller audio tools (single-source claims).

---

## Step 7 — Overall gaps & recommendations

1. **Fixie** — re-verify current status/pricing before any downstream use (agent may have pivoted or been acquired; no 2025-26 evidence found).
2. **Lindy** — pull official pricing page next pass.
3. **DocumindAI / Fermat pricing** — not published; reach out or check App Store listings.
4. **ChatGPT Go $8 / Business $25** — confirm on openai.com pricing page directly (scrape didn't render numbers).
5. **Acrobat AI Assistant pricing** — check current add-on vs bundle price.
6. **Pricing volatility** — Elicit, Consensus, SciSpace, M365 Copilot all repriced within 12 months; all prices are point-in-time as of 2026-08-10.
7. **Source-count caps** for Perplexity Spaces (50/500/5,000/50MB) verified from official help center — HIGH.
8. **Open-source products** (AnythingLLM, RAGFlow, Open Notebook, Open-NotebookLM, SurfSense, LM Studio, Zotero, Logseq, Joplin) captured in this log but EXCLUDED from FINDINGS per task brief — handoff to OSS agent with pointers to: github.com/Mintplex-Labs/anything-llm, github.com/infiniflow/ragflow, and notebookcheck MCP/DB notes for Logseq/Joplin.

---

## Refresh pass log (2026-08-10) — free tiers

### Step F1 — Queries run (exa web_search, 11 queries, all with official-page verification)
1. `Gemini API free tier limits 2026` → ai.google.dev pricing + rate-limits (official) + tokenmix breakdown (1,500 RPD / 15 RPM / 1M TPM Flash; Pro 50 RPD; grounding free 500 RPD Flash; Gemini 3 family has separate 5,000 prompts/mo grounding pool).
2. `ChatGPT free plan limits 2026` → **TechCrunch 2026-08-06 + The Verge**: unlimited text chats announced (rolling out "next week"), GPT-5.6 Luna default for Free/Go; help.openai.com free-tier FAQ; chatgpt.com/pricing (ads, limited uploads/images/voice/deep research).
3. `Claude free plan discontinued 2026` → **NOT discontinued — expanded**: claude.com/pricing, Engadget 2026-06-03 (Sonnet 4.6/Haiku 4.5 free, 20 files/chat × 500MB, no Opus/Claude Code), winbuzzer 2026-03-03 (memory free since Mar), winbuzzer/macrumors 2026-02 (file creation/connectors/skills free, compaction).
4. `Perplexity free plan limits` → help center 10352998 (5 Pro searches/day, 3 file uploads/day, Collections), techsifted (5/day + unlimited standard), felloai 2026-07-08 (Comet free; model switching/image gen paid).
5. `ElevenLabs free plan` → elevenlabs.io/pricing + billing docs (10,000 credits/mo; 1 cr/char V2 ≈10 min, 0.5 cr/char Flash v2.5 ≈20 min; no commercial use; attribution; no rollover/top-up; 3 Studio projects), nexodatech 2026-05-23 + clarratools 2026-06-07 corroboration.
6. `Microsoft Copilot free plan limits` → microsoft.com individuals page (15 boosts/day, non-peak latest models), support.microsoft.com free-vs-365 comparison, **AI-credits table (support.microsoft.com/Microsoft-365-Copilot/ai-credits...)**: NEW row "Audio Overview in Notebooks" 6 uses/day Personal, extensive Family/Premium; 60 credits/mo in-app; Voice 30/60 min/day; Vision 10/15 min/day; Agents 25 tasks/mo Premium.
7. `Notion AI free plan` → notion.com/pricing + help (AI only on Business/Enterprise; **Free/Plus = limited complimentary responses only**; image gen 10/24h paid) — corrects original file's "Free tier" row.
8. `Adobe Acrobat AI Assistant free trial` → helpx.adobe.com usage policy (2026-04-15: **1,000 AI Assistant Requests/mo/user** Individuals & Teams; limited complimentary on trial), adobe.com free-trial page (**AI Assistant Plus $4.99/mo** confirmed), pcworld Studio review ($24.99–35/mo, 250 gen credits).
9. `Groq free tier` → console.groq.com/docs/rate-limits (official table), tokenmix (llama-3.3-70b 30 RPM/1K RPD/12K TPM/100K TPD), eesel (org-level limits; whisper 2K audio reqs/day).
10. `Mistral free tier` → docs.mistral.ai (Experiment plan: all models, phone verification, no card; limits on account Limits page), help.mistral.ai (Free mode = lowest tier), unified.to (approx 2 RPM / 500K TPM / 1B tokens/mo — third-party estimate).
11. `OpenRouter free models` → openrouter.ai docs limits (**50 req/day free, 1,000/day with ≥$10 credits, 20 RPM**; failed requests count; smaller contexts), blog tutorial (20+ free models), lilting.ch (tool-call quirks on :free).
12. `GitHub Models free tier` → **github.blog changelog 2026-07-01: GitHub Models fully retired 2026-07-30** (playground/catalog/inference API/BYOK gone; brownouts Jul 16/23); prior limits (low 15 RPM/150 RPD; high 10 RPM/50 RPD) now historical; successor = Microsoft Foundry.

### Step F2 — Confidence
- **High:** Gemini API (official docs), ChatGPT (official + two news outlets), Claude (official + 3 outlets), ElevenLabs (official pricing + docs + 2 testers), Copilot/M365 (Microsoft support pages), Adobe (official usage policy + pricing), Groq (official docs), OpenRouter (official docs), GitHub Models (official changelog).
- **Medium:** Mistral exact limits (official docs point to per-account page; third-party numbers approximate), Perplexity "~5 Pro searches/day" (official help center says "five"; third parties agree but note Perplexity adjusts silently).
- **UNVERIFIED:** Onyx cloud free tier; Copilot free-tier "peak-time" behavior specifics; whether ChatGPT unlimited-text rollout completed by 08-10 (announced 08-06, "next week").
- **Corrections to original file:** (1) Notion AI NOT on Free/Plus (trial compliments only); (2) Adobe AI Assistant add-on confirmed $4.99/mo (was medium-confidence ~$5); (3) Claude free tier expanded, not at risk; (4) GitHub Models retired — remove from any future free-API shortlist; (5) M365 consumers now get "Audio Overview in Notebooks" (6/day Personal).

