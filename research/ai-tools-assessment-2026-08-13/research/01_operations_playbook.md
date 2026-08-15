# Deep Research 01 — Operations Playbook: what to do, what to use, what to avoid, how, why

> Stream: `ai-tools-assessment-2026-08-13` · Date: 2026-08-13
> Base source: Corey Ganon's playbook (Greg Isenberg podcast transcript in `source/00_video_transcript.md`)
> Companion files: `02_prompt_pack.md` (the prompts), `03_competitors.md`, `04_opensource.md`, `05_saas_conversion.md`, `06_llm_agent_guide.md`

---

## 1. What to do (the operating model)

**The business is two products on one funnel:**
1. **AI Tools Assessment ($999)** — trip wire. 45-min discovery call → AI analysis → 9-slide report → 30-min review call. Sold ~15× in 2026; 50–60% convert into implementation work.
2. **AI Concierge retainer ($1,200–$2,000/mo)** — the money machine. 2 × 45-min monthly sessions teaching Claude skills (AOA method) + "unlimited" async access. $8K MRR in 10 days at launch; ~$1,000/hr effective; hard cap 6 clients.

**Weekly operating rhythm (solo founder):**
| Activity | Cadence | Effort | Purpose |
|---|---|---|---|
| 1–2 discovery calls | per week | 45 min each | Pipeline |
| Analysis + report fulfillment | per sold audit | 3–4 hrs | Delivery |
| 1 review call | per sold audit | 30 min | Close upsell |
| Concierge sessions (up to 12 calls/mo at cap) | 2 per client/mo | 45 min each + 30 min prep | MRR |
| Outreach (meetup/office hours/DMs/partners) | 3–5 hrs/week | ongoing | Fill pipeline |
| Skill refinement (feed back transcripts+reports) | monthly | 1 hr | Compounding quality |

**Sequencing rule (from the episode):** do the assessment (easy to fulfill) + **choose one** upsell lane (recommended: concierge). Focus on one ICP: **2–20 employees, $500K–$5M revenue**.

**Positioning rule:** "AI guy for X" — niche by geography (e.g., "the AI guy in Charlotte") or vertical (e.g., "AI assessments for financial services"). Niche = higher prices, less pricing pressure, faster referrals.

---

## 2. What to use (verified tool stack + why)

| Layer | Tool | Why (evidence) | Alternatives |
|---|---|---|---|
| Call recording + AI notetaker | **Fathom** (his default) | Auto-transcript is the fuel for phase 2; records the call you can't take notes on | Otter, Fireflies |
| Analysis engine | **Claude + a custom Skill** | Skill holds the deep-research instructions (web research for tools); fed past transcripts+reports it reaches copy-paste quality by audit #4–6 | Any frontier LLM with web search; base prompt works too |
| Tool research directories | **futurepedia.io** (HubSpot-acquired), **theresanaiforthat.com** (live; large) | Industry-tagged catalogs — "AI tools for realtors" is a filter, not a search | Manual research (slower) |
| Report builder | **Claude Design** (migrated from Gamma.app) | Templated plug-and-play; the 9-slide format is the whole deliverable | Gamma, Canva, Marp (OSS) |
| Report template | **audittemplate.ai** (verified live 2026-08-13) | Free; clone and rebrand | Build your own after 12 iterations |
| Automation builds (upsell lane) | **Zapier / Make.com / n8n** | Cut-and-dry 1–3 step flows; $1.5K builds; "nobody needs to be a genius" | n8n if you want self-host + no per-task fees |
| Knowledge systems (upsell lane) | **Custom GPTs** (OpenAI) | Business-broker example: GPT trained on listing package replaces 400–500 repetitive emails | AnythingLLM/Dify (OSS, see 04) |
| Concierge delivery | **Claude Co-work + Claude skills + plugins** | First-call guided onboarding plugin; AOA sessions build skills together | OpenClaw (OSS assistant) + skills |
| Async access | **Voxer** (voice messages) | "Unlimited access, 12-hr response" — actual load ~1 msg/client/2.5 months | WhatsApp Business (MENA) |
| Client hub | **Notion one-pager** | Inventory of accomplishments emailed after every call = retention engine | Any shared doc |
| Onboarding form | **Google Forms** | The 90-day-win question lives here | Typeform, Tally |

**Why this exact stack:** every piece either (a) replaces a skill you don't need to learn (notetaker, directories), (b) makes the deliverable templated and stupid-simple (Claude Design + audittemplate.ai), or (c) creates perceived value at near-zero actual load (Voxer). Total tool cost for the services phase: **under $100/mo**.

---

## 3. How to use (per-phase SOP)

### Phase 1 — Discovery call (45 min)
1. Zoom/Meet + Fathom recording. Tell the client you're recording (compliance).
2. Ask the question set (see `02_prompt_pack.md` #1). **Probe only. Never prescribe on call 1** — "I have to bite my tongue." First call is only for pulling out problems.
3. Capture: pain points, tasks dreaded, where work piles up, past automation failures, the magic-wand answer (usually email).

### Phase 2 — AI analysis (1–2 hrs)
1. Export transcript → paste into the Claude skill (or use the base prompt, `02_prompt_pack.md` #2).
2. Claude returns structured pain points + candidate tools (name, cost, setup time, hours saved, lever, fit).
3. **QA step (non-negotiable):** review every prescription against client size/industry/budget. The "4-person landscaping company doesn't need Salesforce" test. Sub in appropriate tools. (This judgment is the moat.)
4. Round 1–3 will need substitutions; feed back transcripts + finished reports monthly to sharpen the skill.

### Phase 3 — Report (1–2 hrs)
1. Clone audittemplate.ai into Claude Design; fill client data.
2. Keep the 9 slides: title → exec summary (1–2 pain points, outcome, hours reclaimable 5–10, primary focus lever) → effort×impact matrix (quick wins) → quick wins summary (one pain → one tool per line) → recommended solutions (tool, pain, cost, setup time, hours saved) → 4-day quick start plan (≤10 min/day) → what comes after quick wins (major projects = upsell seeds) → financial impact (weekly hours × hourly rate − tool cost) → next steps.
3. Design law: **one pain → one tool per line**. If the client must think, the slide failed.

### Phase 4 — Review call (30 min)
1. Email report 24h before. Screen-share walkthrough; ~50% of time on recommended solutions.
2. Ask the **3 closing questions** (`02_prompt_pack.md` #6). 50–60% will ask for implementation.
3. Use the **credit trick** when closing upsells: mark up the upsell $1K, credit the $999 toward it. Client feels "$1,000 off"; you make the same money.

### Concierge delivery (per client, monthly)
1. Pre-engagement: Google Form with the 90-day-win question.
2. Call 1 = foundation only: guided onboarding plugin — connect tools, context files, global instructions, scheduled tasks, what a skill does. No building.
3. Calls 2+ = **AOA per workflow**: Audit (show me how you do it) → Optimize (13 steps → 7) → Automate (turn it into a skill). Rinse, repeat.
4. After every call: update the Notion hub, email it. When you beat their stated 90-day win, remind them in writing and upsell.
5. Enforce the cap (6) and real scarcity on sales calls.

---

## 4. What to avoid (the do-not list)

| # | Avoid | Why |
|---|---|---|
| 1 | Prescribing on the discovery call | Kills the report's perceived value; the client needs the doctor's visit to value the prescription |
| 2 | Enterprise tools for SMB clients | Salesforce-for-a-landscaper destroys trust; QA step exists for exactly this |
| 3 | Unverified tool pricing in reports | One wrong price on the financial-impact slide kills credibility — verify live before sending |
| 4 | Fabricated/soft ROI math | Hours × rate − tool cost must be defensible; the guarantee covers 5 hrs minimum, not made-up hours |
| 5 | Pitching in cold DM #1 | "Quickest way to never get success from cold DMs" — probe first, always |
| 6 | Automating before optimizing | "Throwing AI at a broken process makes it fall apart faster" — process redesign is a *separate* paid engagement |
| 7 | Scope creep in process redesign | Deliverable is the blueprint only; automation is a separate engagement by design |
| 8 | Blindly trusting AI output | Phase-2 output is a draft, not a deliverable; human QA is the product |
| 9 | Saturated positioning ("AI transformation for everyone") | Nobody is "the go-to" when you're everything; niche down, then niche down more |
| 10 | Scaling before the system is solid | $200 of each $999 into Meta ads only after the funnel converts reliably (Greg's self-liquidating-funnel idea) |
| 11 | Building a SaaS before selling services | The SaaS (see 05) must be born from 10+ paid audits, not from a whiteboard |
| 12 | Ignoring privacy/compliance on recordings | Transcripts contain business PII; record with consent, store securely, delete on request |

---

## 5. Why this works (the mechanisms, with evidence)

1. **Risk reversal collapses the buying decision** — "worst case you lose 45 minutes; best case 5+ hrs/week forever." Only objection left is time.
2. **The client is paying you to find reasons to pay you more** — the report's "what comes after quick wins" slide is a written pre-sale of the upsell. Attach rate 50–60% is the proof.
3. **Quantified ROI beats promises** — financial-impact slide is "always four figures, sometimes five, monthly" at ~$60/mo tool cost. The ROI is in the artifact, not the pitch.
4. **Stupid-simple output drives implementation** — "a confused mind doesn't buy, doesn't implement, doesn't get ROI, doesn't upsell." 4-day quick start = client feels the win in week 1.
5. **Zero-code barrier admits you into a blue ocean** — you're prescribing, not building; entry cost is hours, not engineering.
6. **The retainer is priced on perceived value, delivered at near-zero load** — Voxer "unlimited access" costs ~3 messages per 2.5 months across 5 clients; $1,500/mo ÷ 1.5 billable hrs = $1,000/hr.
7. **Scarcity is real and sellable** — cap 6 clients, raise price on every yes, and "if you say no today and someone else says yes, I'm not available until a churn."
8. **The skill compounds** — every audit makes the next audit cheaper and better (60–70% → copy-paste by #4–6), which is the seed of the SaaS engine (05).

---

## 6. Unit economics reference

| Metric | Value | Source |
|---|---|---|
| Assessment price / fulfillment time | $999 / ~5–6 hrs | episode 6:11 |
| Effective hourly (assessment only) | ~$165–$200/hr | derived |
| Concierge price ladder | $1,200 → $2,000/mo | episode 50:54 |
| Effective hourly (concierge) | ~$1,000/hr | episode 51:06 |
| Attach rate to implementation | 50–60% | episode 6:20, 24:38 |
| Avg hours reclaimed | 7 hrs/week (guarantee: ≥5) | episode 4:53 |
| Avg tool cost prescribed | ~$60/mo | episode 21:41 |
| LTV of assessment client | $3K–$10K+ | episode 6:33 |
| Cap / MRR at cap | 6 clients / $12K MRR max (at $2K) | episode 52:38 |
| Voxer real load | ~1 msg/client/2.5 months (3/5 clients) | episode 53:45 |

**Files:** `../ideas/01_ai_tools_assessment.md`, `../ideas/02_ai_concierge_retainer.md`, `../ideas/03_zero_capital_client_acquisition.md` hold the full blueprints this playbook compresses.
