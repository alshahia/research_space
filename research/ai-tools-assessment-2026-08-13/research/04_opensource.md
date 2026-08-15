# Deep Research 04 — Open Source Projects (researched, verified, mapped to this business)

> Stream: `ai-tools-assessment-2026-08-13` · Date: 2026-08-13
> Star counts + licenses verified live on GitHub this session (2026-08-13) unless marked ≈ (approximate, not re-verified this session).
> Method note: GitHub API rate-limited this session; repo pages fetched directly. GEO/AEO OSS rows carry over from the 2026-08-12 competitor matrix.

---

## 1. Verified live this session (stars/license/description)

| Project | Stars | License | What it is | Role in THIS business |
|---|---|---|---|---|
| **openclaw/openclaw** | **386k** | MIT | Personal AI assistant gateway (OpenClaw Foundation): channels (WhatsApp, Telegram, Slack, Discord, Signal…), skills, plugins, ClawHub registry. Sponsored by OpenAI, GitHub, NVIDIA, Vercel | **Concierge delivery OS**: run the client's "AI concierge" as an OpenClaw assistant with your skills; WhatsApp channel = MENA-native Voxer replacement |
| **n8n-io/n8n** | **200k** | Fair-code (Sustainable Use License) | Visual AI-agent + workflow automation, 1,500+ integrations, MCP client/server, self-host or cloud | **The automation-build upsell engine** (replaces Zapier/Make): build client automations, white-label, zero per-task fees when self-hosted |
| **anthropics/skills** | **168.6k** | Apache-2.0 (examples) + source-available doc skills | Official Agent Skills: spec, template, docx/pdf/pptx/xlsx skills; drives the Agent Skills standard (agentskills.io) + skills.sh registry | **The phase-2 skill + every client skill you build**: use the template + spec; borrow doc skills for report generation |
| **langgenius/dify** | **152k** | Dify OSS license (Apache-2.0 + conditions); Linux Foundation project | LLM app platform: workflows, RAG, agents, prompt IDE, model management, observability; Arabic README exists | **SaaS MVP accelerator** (05): the assessment engine (workflow + RAG over tool catalog) without building orchestration |
| **open-webui/open-webui** | **148.6k** | Open WebUI license (branding requirement) | Self-hosted AI platform: RAG, RBAC, plugins, MCP, scheduled automations, multi-model | **Knowledge-system upsell**: deploy per-client "private ChatGPT over their docs" (custom-GPT alternative), multi-tenant |
| **Mintplex-Labs/anything-llm** | **64.7k** | MIT | Local-first all-in-one AI app: agents, scheduled tasks, MCP, embed widget, multi-user, model routing | **Knowledge-system upsell (best OSS fit)**: MIT license → can ship to clients freely; embed widget = client-facing chatbot |
| **ggml-org/whisper.cpp** | **52.9k** | MIT | C/C++ Whisper port, CPU/GPU, includes `whisper-server` HTTP transcription API | **Phase-1 transcription**: self-host recording→transcript pipeline; private (no third-party recording of client calls) |

**Carry-over from the 2026-08-12 matrix (GEO/AEO OSS — relevant for the SaaS phase):** Auriti-Labs/geo-optimizer-skill (661★, MIT, audit+optimize+track, MCP), unifapi-agent/agents (545★, marketing agents via MCP), danishashko/geo-aeo-tracker (229★, local AI-visibility dashboard), onism1767-creator/potato (179★, free citation tracker), mverab/eGEOagents (155★, Claude Code + MCP), aryamantodkar/oneglanse (147★, self-hosted GEO tracker), alexpospekhov/searchstack-aeo (92★, 22-command CLI), AKzar1el/mcp-geo (24★, MCP server on Cloudflare Workers), anyin-ai/aperture (22★, BYOK Profound alternative).

---

## 2. Approximate (≈, not re-verified this session — treat as indicative)

| Project | ≈Stars | License | Role |
|---|---|---|---|
| FlowiseAI/Flowise | ≈40k | Apache-2.0 | Drag-drop LLM app builder (alternative to Dify) |
| Langflow-org/langflow | ≈40k | MIT | Visual agent builder (DataStax) |
| infiniflow/ragflow | ≈30k | Apache-2.0 | Deep-document RAG engine |
| danny-avila/LibreChat | ≈25k | MIT | Multi-provider chat UI (custom-GPT alternative) |
| Onyx-DMS/onyx (ex-Danswer) | ≈15k | MIT | Enterprise search/RAG (knowledge-system upsell, heavier) |
| botpress/botpress | ≈13k | MIT | Conversational agent builder (client chatbots) |
| windmill-labs/windmill | ≈10k | AGPL | Script/flow engine (n8n alternative) |
| langfuse/langfuse | ≈10k | MIT (self-host) | LLM observability — the SaaS phase's monitoring |
| triggerdotdev/trigger.dev | ≈10k | Apache-2.0 | Background job/queue for the SaaS phase |
| Activepieces/activepieces | ≈10k | MIT | n8n-style automation, MIT-licensed |
| open-gpt-app/OpenGPT | ≈8k | MIT | Open-source custom-GPT builder (knowledge systems) |
| alphacep/vosk-api | ≈8k | Apache-2.0 | Offline speech recognition (whisper alternative) |
| inngest/inngest | ≈5k | Apache-2.0 | Event-driven queues (SaaS phase alternative to trigger.dev) |
| Marp / Slidev / Typst / Pandoc | n/a | MIT/other | OSS report rendering: markdown → slides/PDF (Claude Design alternative for the SaaS phase) |

---

## 3. How the OSS stack maps to each revenue lane

| Lane | OSS choice | Why it wins over the paid default |
|---|---|---|
| **Assessment phase 1** (transcription) | whisper.cpp (self-hosted) | Client calls never leave your infra; zero per-minute cost; GDPR-friendly |
| **Assessment phase 2** (analysis) | anthropics/skills spec + template → your own skill | The skill IS the product; the spec keeps it portable across Claude, OpenClaw, API |
| **Assessment phase 3** (report) | Claude Design (paid) now; Marp/Typst (OSS) when productizing | 9-slide markdown → rendered PDF/slides via CI = free, repeatable, branded |
| **Automation builds upsell** | n8n self-hosted | Unlimited clients at zero per-task fees (vs Zapier per-task); MCP-native; deliverable = reusable template you keep |
| **Knowledge systems upsell** | anything-llm (MIT) — per-client workspace; or open-gpt-app for GPT-style chat | MIT = you can resell/embed; scheduled tasks + memory = "knowledge system" without custom dev |
| **Concierge delivery** | OpenClaw + your skills on a WhatsApp channel | The "unlimited access" layer with near-zero load, MENA-native, fully under your control; client gets an assistant, not a message queue |
| **SaaS phase (05)** | Dify or n8n for orchestration MVP; langfuse for tracing; trigger.dev/inngest for jobs; GEO OSS (geo-optimizer-skill etc.) for the measurement module | Reuses the exact prompts in `02_prompt_pack.md` as Dify/n8n nodes — the service work becomes the SaaS logic for free |

---

## 4. Licensing cautions (read before shipping to clients)

1. **n8n is fair-code, not MIT** — Sustainable Use License: self-host fine for your own ops and client builds; restrictions apply if you resell n8n itself as a SaaS. Check the license text before white-labeling.
2. **Dify's OSS license** = Apache-2.0 + additional conditions (cloud/service resale restrictions apply to Dify's own cloud features). Self-host for internal engine use is fine; re-check for commercial embedding.
3. **Open WebUI requires preserving branding** in the base license — fine for internal/knowledge-system delivery, not for white-label resale without a commercial agreement.
4. **anything-llm (MIT)** is the cleanest for client-facing resale of knowledge systems.
5. **OpenClaw (MIT)** — verify the plugin/extension licenses individually when shipping to clients.

---

## 5. The build-your-own open loop (why OSS matters more than the episode shows)

Corey's stack is 100% paid SaaS (Fathom, Claude, Claude Design, Zapier, Voxer, Notion). Every layer has a verified OSS equivalent — which matters because:

1. **Unit economics:** the SaaS phase needs per-client costs near zero; OSS orchestration + BYO-model keeps the 5–6 hr fulfillment cost flat while the report gets productized.
2. **The SaaS endgame needs the measurement layer** — that's exactly what the GEO/AEO OSS projects (661★ geo-optimizer-skill and friends) provide free, with MCP already built in.
3. **MENA delivery needs local hosting + WhatsApp** — OpenClaw (channels) + whisper.cpp (Arabic-capable local STT) + anything-llm (Arabic UI exists) make the Arabic-first service/SaaS viable without US-EC2 latency or vendor lock-in.
4. **The skill format is the interface** — anthropics/skills made Agent Skills a standard (agentskills.io, skills.sh). Your phase-2 prompt from `02_prompt_pack.md` #2 is already one SKILL.md away from being portable across every agent runtime.

**Next:** `05_saas_conversion.md` — converting the service into SaaS, using everything above.
