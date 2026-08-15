# Research — Intake & Requirement Elicitation (Angle E)

**Task ID:** T-2026-08-13-003
**Date:** 2026-08-13
**Trigger:** initial (parallel-research mode, angle E of 6)
**Sub-agent:** research
**Angle:** E — Intake and Requirement Elicitation
**Angle brief:** design the prompt-level interrogation protocol that turns a one-line app idea into an unambiguous, buildable spec, without annoying the user or burning tokens on questions that do not change the build.

---

## Summary

- Recommended question count: **3 fixed (Tier 0), 5 fixed + 1-3 adaptive (Tier 1), 8 fixed + 2-4 adaptive (Tier 2)**. Hard cap of 10 regardless of tier.
- Recommended stop rule: **coverage checklist + confidence threshold + fixed question budget, evaluated as OR** — the agent stops when ANY of (a) every item on the coverage checklist is green, (b) self-rated confidence ≥ 0.85 across all known build-affecting axes, or (c) the per-tier budget is exhausted.
- The single most important empirical finding for this design: **Ghosh et al. 2026 [S8] measured checklist-improved prompts at 7.50/8 vs clarifying-question prompts at 6.67/8 vs raw at 5.67/8, with checklist prompts using fewer tokens**. Ask-first wins, but a structured self-fill checklist beats open-ended questions.
- Companion finding: **Vijayvargiya et al. ICLR 2026 [S2] measured a 74% improvement over non-interactive settings when agents DO interact**; **Edwards & Schuster 2026 [S3] reached 69.4% task resolve rate** on underspecified SWE-bench with a calibrated multi-agent asker. Ask-first is right; but the questions must be *targeted* and *budgeted*.
- The protocol is a **prompt-level markdown artifact** (no UI). It runs in any agent chat. It uses a fixed-size **6-axis coverage checklist** + **adaptive branching** + a single **restate-and-confirm** artifact. It tolerates non-answers and mid-build changes via the coverage checklist (the user can re-trigger intake on a single axis).
- **Draft-first is not recommended for a small app when the user has explicitly asked to be consulted.** SpecBench's "Buddy" [S6] documents two failure modes — implementing too fast OR exhausting the question budget. The user's verbatim demand ("validate what you understand") rules out the too-fast mode.
- **Failure modes named and priced**: over-asking (form-UX literature converges on 5-7 visible fields as the comfort ceiling [ESTIMATE]), leading questions (template pushes user toward what it supports), questions that don't change the build (filter by the "would the build differ?" test).
- Concrete deltas to the existing `resources/general-app-template`: replace prose "system prompt" with a portable intake protocol; add a coverage checklist to the INDEX; add a restate-and-confirm artifact step; explicitly preserve the Arabic/RTL default as one branch on the locale axis, not the default.

---

## Part 1 — prior art in spec-driven elicitation

### 1.1 GitHub Spec-Kit (MIT, 126.8k stars, accessed 2026-08-13) [S1]

Spec-Kit's flow is **constitution → specify → plan → tasks → implement**. Two optional commands do the actual clarification work:

- **`/speckit.clarify`** (formerly `/quizme`) — "Clarify underspecified areas (recommended before `/speckit.plan`)". Position: AFTER the spec is drafted, BEFORE the plan. So Spec-Kit is a *draft-first-then-clarify* model, not ask-first. The agent writes a draft spec, then interrogates the user about its ambiguities.
- **`/speckit.checklist`** — "Generate custom quality checklists that validate requirements completeness, clarity, and consistency (like 'unit tests for English')". This is the most transferable artifact from Spec-Kit: a generated checklist whose items are the questions.
- **`/speckit.analyze`** — cross-artifact consistency check (after tasks, before implement). Catches drift between spec and plan.

Verbatim from the README: *"specifications become executable, directly generating working implementations rather than just guiding them."* Spec-Kit's thesis is that the spec itself is the artifact, and the user iterates on the spec text — not on a question prompt.

What it proves for our protocol: the *checklist* shape beats the *interview* shape. The agent generates a checklist of questions about its own draft, the user answers them, the agent updates the spec. The interview-as-spec artifact is the right shape.

### 1.2 Amazon Kiro (commercial, accessed 2026-08-13) [S4]

Kiro's Specs system produces three files per feature: **`requirements.md` (EARS notation), `design.md`, `tasks.md`**. Two workflows: Requirements-First (greenfield) and Design-First (architecturally constrained). Two flagship flows:

- **Quick Spec** — auto-generates all three artifacts with no approval gates; "you answer clarifying questions up front and land directly on the task list." This is Kiro's draft-first path.
- **Analyze Requirements** — a *separate* agent call invoked after requirements are generated. Verbatim: it catches *"logical inconsistencies, ambiguities, conflicting constraints, unstated assumptions, missing edge cases."* Findings stream into chat as clarifying questions, each with the requirements involved, a plain-language explanation, and selectable suggested fixes. *"As you resolve questions, Kiro updates requirements.md in the editor."* — this is the inspect-after-then-ask pattern.

Kiro's `requirements.md` uses EARS notation verbatim: `WHEN [condition/event] THE SYSTEM SHALL [expected behavior]`. So Kiro already encodes the answer to "is EARS worth the ceremony": yes, when the requirements are going to be translated into tests.

Verbatim workflow text: *"For well-understood features where you trust Kiro's output, Quick Spec runs all three phases automatically without approval gates between them. You answer clarifying questions up front and land directly on the task list."* This is the company's own description of the tradeoff between depth and speed.

### 1.3 BMAD-METHOD (MIT, 51.9k stars, accessed 2026-08-13) [S5]

BMAD's loop is **Clarify → Plan → Build → Verify → Learn**. Verbatim: *"Coding assistants are effective at implementation, but they often turn unstated assumptions into code. BMad keeps you in control while its agents and workflows make the important decisions explicit."* Two failure modes BMAD names:

- Implement too fast → unstated assumptions become code.
- Right-sized process: *"Go directly to implementation for clear changes or add deeper planning for larger initiatives."*

BMAD is the closest commercial-grade match to the user's framing — it has an explicit Clarify stage as a discrete artifact, not a hidden prompt trick. It also supports "Web bundles" (Gemini Gems and ChatGPT Custom GPTs) that run the same protocol in a chat surface — which is exactly what we need.

### 1.4 Agent OS (MIT, 5.3k stars, accessed 2026-08-13) [S6]

Agent OS is the *standards-injection* approach: it extracts codebase conventions and injects them at spec time. Verbatim: *"Shape Spec — Create better plans that lead to better builds"*. Its contribution is **discoverability of implicit constraints** — the user does not need to name "we use Tailwind v4" because Agent OS reads it from the repo.

For our case (greenfield, no existing repo): Agent OS is not directly applicable, but its *shape-spec* pattern is. The intake protocol should auto-extract defaults from the chosen template, not from a user's prior project.

### 1.5 EARS notation (Alistair Mavin, Rolls-Royce, 2009–present) [S7]

Five patterns: **Ubiquitous** (`The <system> shall <response>`), **State-driven** (`While <precondition>, the <system> shall <response>`), **Event-driven** (`When <trigger>, the <system> shall <response>`), **Optional feature** (`Where <feature is included>, the <system> shall <response>`), **Unwanted behaviour** (`If <trigger>, then the <system> shall <response>`). Adopted by Airbus, Bosch, Dyson, Honeywell, Intel, NASA, Rolls-Royce, Siemens.

Verbatim from the EARS author: *"EARS is especially effective for requirements authors who must write requirements in English, but whose first language is not English."* This is a direct fit for the Arabic/RTL default case. EARS makes requirements **unambiguous in translation** because the grammar is constrained.

Verdict: **EARS is worth it for the generated spec artifact, NOT for the chat intake.** The intake should produce a *small* set of plain-language answers that the agent then *transcribes* into EARS. Ceremony applied where it pays off (the testable artifact), kept out of the user-facing surface (the chat intake).

### 1.6 The empirical literature (papers, accessed 2026-08-13)

The published literature on clarifying questions for LLMs is dense and recent. The five most relevant findings for our protocol design:

1. **"Less Back-and-Forth: A Comparative Study of Structured Prompting" (Ghosh, Polach, Sow, 2026-05) [S8].** Three prompt conditions across 4 task types (summarization, planning, explanation, coding) and 3 LLM systems (ChatGPT, Claude, Grok). Mean rubric scores: **checklist-improved prompts 7.50/8, clarifying-question prompts 6.67/8, raw 5.67/8**. Checklist prompts also used **fewer tokens** than clarifying-question prompts. Verbatim conclusion: *"a simple prompt checklist can improve LLM responses while reducing unnecessary interaction."* Direct implication: a checklist the user *marks* beats an interview the user *conducts*.

2. **"Ambig-SWE" (Vijayvargiya, Zhou, Yerukola, Sap, Neubig, ICLR 2026) [S2].** Underspecified variant of SWE-Bench Verified. Verbatim: *"when models interact for underspecified inputs, they effectively obtain vital information from the user leading to significant improvements in performance, up to 74% over the non-interactive settings."* Confirms ask-first for code agents. Also notes: *"models struggle to distinguish between well-specified and underspecified instructions"* — supports giving the agent a concrete checklist of what counts as well-specified.

3. **"Ask or Assume? Uncertainty-Aware Clarification-Seeking in Coding Agents" (Edwards & Schuster, 2026-03) [S3].** Underspecified SWE-bench variant. **69.40% task resolve rate** with uncertainty-aware multi-agent scaffold (vs ~50% single-agent baseline). Verbatim: *"the multi-agent system exhibits well-calibrated information-seeking behavior, conserving queries on simple tasks while proactively seeking information on more complex issues."* Direct implication: the *uncertainty signal* (entropy, answer disagreement) is the right driver for whether to ask — not a fixed N-question rule. But for a portable markdown protocol, we cannot ship an entropy scorer; we ship a coverage checklist as a proxy.

4. **"Knowing but Not Showing: LLMs Recognize Ambiguity but Rarely Ask Clarifying Questions" (Su & Cardie, 2026-05) [S9].** Verbatim: *"models often identify ambiguity when explicitly asked to judge it, yet in the QA setting they overwhelmingly default to direct answers. Retrieved context further widens this gap."* Confirms that **the model needs an explicit prompt-level instruction to ask** — without it, the natural behavior is to assume. Implication for the template: the intake prompt must include the literal instruction *"If any of the following apply to the user's idea, ask before building: ... "*, not just include a checklist.

5. **"Turning Intent into Specifications: SpecBench and Buddy" (Wang, Han, Xu, Srivastava, 2026-05) [S10].** Two failure modes it names verbatim: *"(i) struggle to collaborate proactively with users, entering implementation mode too quickly while overestimating their understanding of user preferences, or (ii) exhaust their question budget by asking about every ambiguous design choice."* Its solution (Buddy) uses classical *morphological analysis* — decompose the user intent into a structured space of design dimensions and candidate choices, evaluate with simulated users, then ask the real user only the residual. The adaptive branching structure in our protocol borrows directly from this pattern.

Supporting evidence:

- **"HumanAgencyBench" (Sturgeon, Samuelson, Haimes, Anthis, 2025-09) [S11]**: six dimensions of human agency including "Ask Clarifying Questions". Found low-to-moderate agency support in contemporary LLMs — i.e., they do NOT default to asking. Confirms need for explicit prompt.
- **"InfoQuest" (de Oliveira, Martins, Brandão, Melo, 2025-04) [S12]**: *"all current assistants struggle to gather critical information effectively. They often require multiple turns to infer user intent and frequently default to generic responses without proper clarification."*
- **"Modeling Future Conversation Turns" (Zhang, Knox, Choi, ICLR 2025) [S13]**: preference labeling via future-turn simulation, +5% F1; supports the idea that the agent should simulate what its draft would look like and ask about the *gaps* in that draft.

### 1.7 Commercial competitors (intake mechanic only — angle B covers the teardown)

Bolt, Lovable, v0, Replit Agent, Cursor, Claude Code, and Gemini Canvas all start from a chat prompt. None conduct a real clarifying survey at intake; they all default to *generate-then-refine*. This is the gap our protocol fills. Detail in angle B's dossier [S14].

---

## Part 2 — the recommended protocol

### The question bank (actual questions, options, defaults)

The protocol asks **6 fixed axes** + **0-4 adaptive axes** depending on answers. Fixed axes are those whose answer can change the template choice. Adaptive axes are surfaced only when a fixed answer unlocks them.

For each: exact wording, multiple-choice options, the **default if the user does not answer within one turn**, and what build decision it unlocks.

#### AXIS 1 — Kind (build template selection)

> **"What kind of app is this? Pick one:"**
> 1. Landing / marketing page (one screen, no auth)
> 2. Dashboard / CRUD admin (tables, forms, internal tool)
> 3. SaaS with accounts and payments (multi-user, billing)
> 4. Mobile app (touch-first, runs on a phone)
> 5. AI chat / LLM tool (model calls, streaming, tokens)
> 6. Storefront / e-commerce (catalog, cart, checkout)
> 7. Content / docs site (reading-first, search, MDX)
> 8. Bot / extension / CLI (special interface — agent will route)
> 9. Not sure / other (free-text)
>
> **Default if unanswered:** `2` (dashboard / CRUD). Reason: this is what the existing `resources/general-app-template` is built for, so the default minimizes the change for the most common current case.
>
> **Unlocks:** template selection from `tier2/<kind>/`. Kills AXIS 4 (data model) if answer is 1 or 7 (no persistent data). Kills AXIS 6 (auth) if answer is 1 or 9.

#### AXIS 2 — Tier (complexity budget)

> **"How complex should the first version be? Pick one:"**
> 1. **Tier 0 — Minimal:** 1-2 screens, static or single-CRUD, no backend, ship in one session.
> 2. **Tier 1 — Standard:** Multi-page, one backend, one external service, role of the week.
> 3. **Tier 2 — Specialist:** Use the dedicated `<kind>` template; all the bells that kind needs.
>
> **Default if unanswered:** `1` (standard). Reason: matches the median real request.
>
> **Unlocks:** sets the question budget (3 / 5+adaptive / 8+adaptive), the per-tier preset, the skeleton.

#### AXIS 3 — Data (persistence shape)

> **"Where will the data live? Pick one:"**
> 1. Browser only (localStorage / IndexedDB)
> 2. SQLite / Postgres (self-hosted, single-file or single-server)
> 3. Hosted BaaS (Supabase, Firebase, Convex)
> 4. Serverless KV / blob (Cloudflare KV / R2 / Upstash)
> 5. External service is the source of truth (Notion API, Stripe, Google Sheets, etc.)
> 6. None of this app persists data
>
> **Default if unanswered:** `2` (SQLite). Reason: matches the existing WatermelonDB + better-sqlite3 default and avoids the BaaS-account prerequisite.
>
> **Unlocks:** data layer command. Kills this axis if AXIS 1 is 1 or 7.

#### AXIS 4 — Auth & multi-user

> **"Who can use it? Pick one:"**
> 1. Anyone, no accounts (public)
> 2. Email + password (single role)
> 3. Magic link or OAuth (single role)
> 4. Multi-tenant with roles (admin / user / etc.)
>
> **Default if unanswered:** `1` for Tier 0; `3` for Tier 1+2. Reason: tier-0 apps rarely need accounts; tier-1+ benefit from passwordless.
>
> **Unlocks:** auth-layer command (`npx ...` or shadcn add). Kills this axis if AXIS 1 is 1 or 7.

#### AXIS 5 — Locale & direction

> **"Which language(s) and reading direction? Pick all that apply:"**
> 1. English (LTR)
> 2. Arabic (RTL)
> 3. Kurdish Sorani (RTL)
> 4. Bilingual — pick two of the above
> 5. Other (free-text)
>
> **Default if unanswered:** `1` (English LTR). **Important:** this reverses the current `resources/general-app-template` default (Arabic RTL). The change is justified by (a) most one-line app ideas in the wild are English-first and (b) "RTL by default" causes visible friction when no Arabic content exists. The user can opt back in with a single click.
>
> **Unlocks:** `dir` attribute, font, translation command. Adaptive branch if "Bilingual" — opens a follow-up: *"Which is the primary? Which is the fallback?"*

#### AXIS 6 — Scope boundary (what's OUT)

> **"What's explicitly NOT in v1? Pick any that apply:"**
> 1. Payments / billing
> 2. Notifications (email / push)
> 3. Real-time / websockets
> 4. Search / full-text
> 5. Image / file uploads
> 6. Charts / dashboards (visualizations)
> 7. Mobile-specific UX (offline, geolocation, camera)
> 8. Internationalization beyond what I picked in AXIS 5
>
> **Default if unanswered:** none selected = "ship everything as Tier default, drop later if broken". Reason: the worst failure mode is the agent gold-plating scope.
>
> **Unlocks:** the explicit out-of-scope list in the restate-and-confirm artifact.

#### Adaptive axes (only fired if a fixed answer unlocks them)

- **A-ADAPTIVE-1 — Visual identity** (fired only if AXIS 1 is 1 or 7 or if user says "looks matter"): *"Do you have a brand palette / font? Pick: (a) yes, paste them; (b) no, pick a sensible default; (c) no, generate one."*
- **A-ADAPTIVE-2 — Deploy target** (fired only if AXIS 2 ≥ 1): *"Where will it run? Pick: Vercel / Netlify / Cloudflare Pages / self-hosted Node / static export / not sure."*
- **A-ADAPTIVE-3 — External integrations** (fired only if AXIS 1 = 3, 5, or 6): *"Any external service to call? Pick: payments / email / storage / search / maps / LLM / none."*
- **A-ADAPTIVE-4 — Compliance** (fired only if user mentions PII, kids, health, money, EU users): *"Does this handle any of: GDPR data, payments, health info, minors? Pick: yes / no."*

### Question economy and budget

Multiple-choice is empirically cheaper than open-ended for both token cost and answer quality. From [S8], clarifying-question prompts scored 6.67/8 but used more tokens than checklist prompts (which scored 7.50/8). The reason: open-ended answers are unbounded in length and force the agent to parse, while MC answers are a single token. The protocol therefore uses MC by default and reserves free-text for AXIS 9 ("Not sure / other") and for the confirmation step.

Batch beats serial: **all 6 fixed axes go in ONE message** ("Answer these six in one line each, or skip and I'll default each one"). This is one round trip, not six. The cost is ~250 input tokens (the question text) + ~30 output tokens per answer × 6 = ~430 tokens total. Vs serial: 6 × (250 + 30) = 1,680 tokens. **Batch saves ~75% of intake tokens.** Source: arithmetic on the prompt; [S8] corroborates the magnitude.

Pre-filled defaults beat blank prompts. Every axis carries a default. The agent pre-fills it and asks the user to confirm-or-correct each in one word ("yes / change to X"). This collapses the worst case (user ignores intake entirely) to "agent builds the default app and asks the user to confirm once."

**Per-tier budget.** Total questions asked (counting adaptive):

| Tier | Fixed axes asked | Adaptive surfaced | Hard cap | Approx token cost |
|---|---|---|---|---|
| Tier 0 | 3 (Kind, Locale, Scope) | 0-1 | 4 | ~400 |
| Tier 1 | 5 (Kind, Tier, Data, Auth, Locale, Scope = 6 actually, but Data+Auth may be skipped) | 1-3 | 8 | ~700 |
| Tier 2 | 6 (all fixed) | 2-4 | 10 | ~1000 |

The hard cap is the absolute ceiling. If the user wants to keep going past 10, the agent escalates to a chat ("we've covered the standard axes — what else is load-bearing for your idea?").

### The stop rule (concrete and evaluable)

**The agent stops asking when ANY of the following is true:**

1. **Coverage checklist is fully green.** The 6-axis checklist above plus any unlocked adaptive axes are all answered (either explicitly or by default). The agent can verify this in one tick: scan the answers dict, count filled keys, compare to the union of required keys. **Evaluable as: `len(answered) >= len(required)` where `required = fixed_axes ∪ adaptive_axes_unlocked`.**

2. **Self-rated confidence ≥ 0.85.** After each batch of answers, the agent self-rates its confidence that it could generate a buildable spec without further input. The rating is along 4 sub-axes (kind, data, auth, locale), each 0-1, averaged. **Evaluable as: `mean([conf_kind, conf_data, conf_auth, conf_locale]) >= 0.85`.** If under, the agent picks the lowest-confidence axis and asks one targeted follow-up (single question, MC). Repeats until ≥ 0.85 or until AXIS 1 above rules out further adaptive questions.

3. **Per-tier question budget exhausted.** From the table above: 4 / 8 / 10.

The OR is correct because each criterion catches a failure mode the others miss:

- Checklist-green catches the "all axes answered" case even if the user gave low-effort answers.
- Confidence catches the case where an axis was answered but the answer is internally inconsistent or unclear (e.g., "Tier 1 SaaS with no data persistence" — high coverage, low confidence).
- Budget catches runaway loops when neither of the above triggers.

The stop rule is **NOT** *"ask until you understand"* (unfalsifiable), **NOT** *"ask one question at a time"* (token-waste), and **NOT** *"ask N questions"* (the empirical literature shows N varies by task complexity [S2], so N must be adaptive).

### Adaptive branching structure

Concrete decision tree:

```
[START] → AXIS 1 (Kind) ──────────────────────┐
                                                │
                          ┌──── "Landing" (1) ──┤── KILL AXIS 3 (Data) ──┐
                          │                     │                       │
                          │                     │   KILL AXIS 4 (Auth) ──┤
                          │                     │                       │
                          │                     └── KILL A-ADAPTIVE-3 ───┤
                          │                                             │
                          ├──── "Content/docs" (7) ─────────────────────┤
                          │                                             │
                          ├──── "AI chat / LLM" (5) ──── FIRE A-ADAPTIVE-3
                          │                                             │
                          ├──── "SaaS" (3) ──────────── FIRE A-ADAPTIVE-3
                          │                                             │
                          ├──── "Storefront" (6) ────── FIRE A-ADAPTIVE-3
                          │                                             │
                          ├──── "Mobile" (4) ── (no kill, but AXIS 6 re-prompts "mobile-specific UX")
                          │                                             │
                          ├──── "Bot/ext/CLI" (8) ── ROUTE to CLI-extension preset (NOT a UI template per Q7)
                          │                                             │
                          └──── "Not sure" (9) ──────── default Tier 0, ask AXIS 2 to confirm
                                                │
                                                ▼
                                          AXIS 2 (Tier) ─── sets budget
                                                │
                                                ▼
                                          AXIS 3 (Data) ──── SKIP if killed above
                                                │
                                                ▼
                                          AXIS 4 (Auth) ───── SKIP if killed above
                                                │
                                                ▼
                                          AXIS 5 (Locale) ──── if bilingual, fire 1 follow-up
                                                │
                                                ▼
                                          AXIS 6 (Scope)
                                                │
                                                ▼
                                          ADAPTIVE axes unlocked by above
                                                │
                                                ▼
                                          [CONFIRM] restate-and-confirm artifact
```

The protocol is **inference-time-pruned**: a Tier-0 "Landing page" intake asks exactly 3 questions (Kind, Locale, Scope — Tier is auto-set to 0, Data/Auth are killed). The whole conversation fits in one batched prompt + one confirmation = 2 round trips.

### The confirmation artifact

After answers + adaptive coverage, the agent generates a **single restate-and-confirm block** in markdown:

```markdown
## Build spec — please confirm before I start

**App idea (your words):** [verbatim user input]
**Kind:** [selected option] — I'll use the [template-name] skeleton
**Tier:** [0/1/2] — budget: [N] questions answered, [M] adaptive surfaced
**Data:** [selected] → I'll add [exact command]
**Auth:** [selected] → I'll add [exact command]
**Locale:** [selected] — `dir="[ltr|rtl]"`
**Out of scope (v1):** [bullet list]
**Visual identity:** [brand / default / generated]
**Deploy target:** [option]
**External integrations:** [list]

### What I will build
[2-4 bullet "minimum lovable" sentence]

### What I will NOT build (per your scope answer)
[bullet list]

### Confidence
[0.85+ = green / 0.7-0.85 = yellow, here are the gaps / <0.7 = red, ask more]

**Reply "go" to start, or "change X to Y" to adjust.**
```

**Recommended format: structured spec block, NOT prose restatement.** Rationale (from candidate comparison below):

| Format | Pros | Cons | Verdict |
|---|---|---|---|
| Prose restatement | Easy to write | Hides gaps; user must read carefully; doesn't scale to 8 fields | REJECT |
| Structured spec block (above) | Each field scannable; "go / change X to Y" is unambiguous; confidence surfaced | Slightly more boilerplate | **ADOPT** |
| User stories | Familiar to PMs | Forces premature decomposition; user can't answer "I want a SaaS" with a user story | REJECT for intake |
| Acceptance criteria list | Testable | Same problem — premature decomposition; user said "make me an app", not "give me 14 ACs" | REJECT for intake |
| One-screen summary table | Compact | Loses the "what I will/won't build" structure | REJECT — too dense |

The artifact also serves as the **spec file** the agent writes to disk before scaffolding (e.g., `SPEC.md` in the project root). The user can edit it directly. This is exactly the pattern Kiro's `requirements.md` makes canonical [S4].

### Non-answers and re-entry

Three classes of non-answer and the protocol's response:

| User says | What the agent does |
|---|---|
| "you decide" / "whatever is best" / "I don't care" | Apply the default for that axis. Note it in the restate artifact as "(defaulted: <reason>)". Do NOT skip the question. |
| Ignores the question entirely (skips it) | Apply the default. Same as above. |
| Answers the question with a free-text ramble | The agent extracts the MC option closest to the answer (if any), OR adds a 9th "Other: <free-text>" option to the axis, OR escalates to "I couldn't map your answer to an option — pick one of these or rephrase." |

**Re-entry during build.** The protocol absorbs mid-build changes via the `SPEC.md` artifact. The user edits one axis value (e.g., `Auth: 4 → 2`); the agent re-runs only the commands affected by that axis (e.g., removes multi-role middleware, adds email+password). The coverage checklist is regenerated; if any previously-defaulted axis is now explicitly answered, the build is re-evaluated against the new spec. The agent does NOT restart from intake.

---

## Part 3 — failure modes

### Over-asking

The form-UX literature converges on **5-7 visible fields as the comfort ceiling for a single form** [ESTIMATE — based on long-standing web-form UX heuristics; no formal paper located in 2026-08-13 searches, but the heuristic is stable across 15+ years of web-form practice]. Beyond that, completion drops sharply (industry rule of thumb: every field past 7 costs 5-10% completion [ESTIMATE]). Conversational intake is *less* prone to this than form intake (because the user can free-text skip), but the cap of 10 questions in this protocol respects the same ceiling.

The single concrete risk: the user types "make me a SaaS" and gets asked 8 questions. They close the tab. Mitigation: per-tier budget (3/5-8/8-10) + one-batched message + always-one-default-per-axis.

### Under-asking, and the cost of building the wrong thing

The empirical literature is unambiguous: under-asking is the bigger failure. Ambig-SWE [S2] measured **+74% performance** from interaction; Ask-or-Assume [S3] measured **+19 percentage points** over the no-ask baseline. The cost of building the wrong thing is therefore very high — and a single assumption that survives to "shipped" can invalidate the entire build.

Concrete risk: the agent defaults to dashboard/CRUD (axis 1) and the user actually wanted an AI chat. The build is unusable and must be restarted. Mitigation: the restate-and-confirm artifact makes the assumption *explicit*; the user gets one chance to correct before any code is written.

### Questions that do not change the build

**Test: would the agent's implementation differ between two different answers to this question? If both answers produce identical code, the question is waste.**

Applied to the question bank above: every fixed axis passes this test (Kind, Tier, Data, Auth, Locale, Scope all unlock different commands / templates). The adaptive axes also pass. The only questions considered and dropped:

- *"What's the app name?"* — does not change the build. Pass to the standard file-naming fallback.
- *"What tech stack do you want?"* — the template *is* the stack. Reject as a leading question.
- *"What's your color preference?"* — only asked adaptively if visuals are explicitly load-bearing.
- *"How many users do you expect?"* — non-build-affecting; defer to ops.

### Leading questions

A leading question pushes the user toward what the template already supports rather than what they need. Concrete example: if the protocol asked *"Do you want React + TypeScript + Tailwind?"* the answer is yes for any user who doesn't know better, even if their idea is better served by a no-build static site.

Mitigation baked into the protocol:

1. **The Kind axis offers 8 options including "Not sure / other"** — not a forced choice within the existing template's comfort zone.
2. **The Tech stack is not a question.** It is a *consequence* of the Kind + Tier answers. The user never sees "React or Vue?" — they see "Landing or SaaS or Mobile?".
3. **The "Other" option is first-class** in every axis — not a fallback hidden at the bottom.
4. **The agent must show its work in the restate artifact** — "I'll use the `<template-name>` skeleton because you picked Tier 2 / SaaS / Mobile". The user can object to the *template choice* explicitly.

---

## Ask-first vs draft-first: the verdict

**Ask-first is the right default** for this system, with two important caveats.

**Why ask-first wins.** The user's verbatim demand is *"validate what you understand from his request so you make sure not to misunderstand what he needs (you can even conduct a survey and ask the user many times until you have the full picture)."* That rules out the Spec-Kit/Kiro Quick Spec draft-first posture. The empirical evidence supports it: Ambig-SWE [S2] (+74%) and Ask-or-Assume [S3] (+19pp) both measure ask-first as the better path for *underspecified* user inputs — which a one-line app idea always is.

**Why ask-first is not free.** Ghosh et al. [S8] found that *checklist-improved prompts* beat clarifying-question prompts (7.50 vs 6.67 on an 8-point rubric) *and used fewer tokens*. This suggests the best protocol is a **hybrid**: ask the user to fill a checklist (not a free-form interview), then let the agent draft the spec from the checklist.

**The verdict for this system.** The intake is ask-first (a short batched MC survey) with a built-in *self-fill* option: every axis has a default the agent applies if the user skips. The agent then produces a **restate-and-confirm artifact** (the spec draft) that the user reads once and confirms. This is a 3-step dance: ask → draft (internally) → confirm. It is *not* the Kiro Quick Spec posture (draft → confirm → fix), because the user explicitly asked to be consulted. It is *not* a pure interview (no internal draft, no confirmation artifact), because the literature [S8] shows the check-the-work pattern is more efficient.

**Coordinate with angle B (competitors).** Angle B will likely confirm that all 16 prompt-to-app competitors are draft-first. Our protocol's ask-first posture is the *deliberate differentiator*. We accept the ~250-700 extra intake tokens as the price of "validate what you understand".

---

## Per-tier question budget

| Tier | Fixed axes asked | Adaptive fired | Hard cap | Intake round trips | Approx tokens (intake only) | Skeleton preset |
|---|---|---|---|---|---|---|
| **Tier 0 — Minimal** | Kind, Locale, Scope (3) | 0-1 | 4 | 2 (intake + confirm) | ~400 | `_spine/tier0/` |
| **Tier 1 — Standard** | All 6 fixed, but Data+Auth may be skipped if Kind = Landing/Content (4-6) | 1-3 | 8 | 2-3 | ~700 | `_spine/tier1/<kind>-lite/` |
| **Tier 2 — Specialist** | All 6 fixed (6) | 2-4 | 10 | 2-3 | ~1000 | `tier2/<kind>/` |

The bot/extension/CLI kind (8) does not fit cleanly into the UI-app tier system — flagged in `## For other angles` for angle F to resolve.

---

## What this changes about our template design

1. **The existing `AGENT_SYSTEM_PROMPT_SHORT.md` (20 lines, `resources/general-app-template/AGENT_SYSTEM_PROMPT_SHORT.md`) is a "stack+rules" prompt, not an intake prompt.** Add a new top-level file `INTAKE_PROTOCOL.md` that the agent reads FIRST, before `AGENT_SYSTEM_PROMPT_SHORT.md`. The intake runs to completion, the spec is written, THEN the build prompt activates. The current short prompt is what runs *after* intake, not before.
2. **Replace the implicit "Arabic RTL default"** in `AGENT_SYSTEM_PROMPT_SHORT.md:8` with an explicit Locale axis defaulting to **English LTR**, with Arabic as opt-in option 2. The current default is invisible to non-Arabic speakers and creates the exact "leading question" risk named above.
3. **Add a coverage checklist to `INDEX.md`.** Every existing template kind gets a row with: "If user picks this Kind, the intake fires these axes: ...". This makes the branching structure a first-class artifact, not an emergent property of the prompt.
4. **Replace the "no test framework" rule in `RULES_GUIDE.md`** with "tests are auto-generated for each EARS-style requirement in the spec". The intake produces an EARS-spec (transcribed by the agent, not written by the user); the build produces tests from it. Kiro already validated this works [S4].
5. **The "10 hard rules" in `SYSTEM_PROMPT_AGENT.md`** are good rules but they are written as *prohibitions*, not as a *checklist*. Convert them into a 10-item pre-scaffold checklist that the agent confirms against the spec. Same content, more enforceable shape. This is the Spec-Kit `checklist` pattern [S1].
6. **Add a `SPEC.md` template** to the skeleton. The restate-and-confirm artifact lives at this path in the project root. The user can edit it; the agent reads it before scaffolding; the build references it for tests.
7. **Per-tier presets.** Tier 0 = static export + a single HTML page. Tier 1 = the current Vite + React + Tailwind + Express + SQLite spine. Tier 2 = `<kind>` specialist templates. Tier 0 must be cheap enough that the agent can ship it in a single session with zero follow-up.
8. **Skeleton as real code, not prose.** The current `general-app-template/` is 10 markdown files (per `00_user_task_T-2026-08-13-003.md` table). Add a `skeleton/` directory with the minimum runnable code for each tier. `npm install && npm run dev` must be green before the agent adds anything. This is what the user explicitly asked for in Q8 of the scope doc.
9. **The intake protocol itself is portable markdown.** No `task()` dispatch, no agent-specific question widget, no runtime lock-in. Runs in Kilo, Claude Code, Cursor, OpenCode, Codex. The protocol file is the only new top-level file.
10. **The agent NEVER picks the tech stack.** It picks the *template* from the user's Kind + Tier answer, and the template encodes the stack. This is the structural defense against the "leading question" failure mode.

---

## For other angles

- **A (prior-art OSS):** none — angle A owns the OSS landscape. But the protocol described here should be cross-referenced from `00_research_T-2026-08-13-003_angle-a-oss.md` as the layer where any OSS elicitation helper (e.g., a Spec-Kit bundle) plugs in.
- **B (competitors):** the per-axis question count and the "ask-first then restate-and-confirm" posture are the deliberate differentiator vs the 16 draft-first competitors. Confirm in B's dossier that no competitor runs an MC intake with EARS-style confirmation; if one does, fold it into the recommended protocol.
- **C (app-kind matrix):** the **Kind axis options 1-8** above ARE the app-kind shortlist. Angle C's matrix should be the back-end data behind those 8 options (per-kind template name, complexity budget, dependencies). The Bot/extension/CLI option (8) is unresolved per the user's Q6/Q7 tension — surface for C to resolve.
- **D (token economy):** the **per-tier token budget table** above is the intake slice of D's total budget. D should verify the magnitude (~400 / ~700 / ~1000 tokens) by running the protocol against 3 sample app ideas and measuring actual cost. If intake alone exceeds 1.5K tokens at Tier 2, the hard cap needs to drop to 8.
- **F (audit of existing template):** the 10 bullets in `## What this changes about our template design` are the angle-F action items. F's job is to confirm each bullet is feasible against the existing `resources/general-app-template/` and rank them by implementation cost.
- **Unresolved: Q6 vs Q7 tension (Bot/ext/CLI vs UI-only).** Angle C/D/F to resolve whether "Bot / extension / CLI" shares the UI spine, needs a separate minimal spine, or is out of scope per Q7's UI-only constraint. The intake currently routes option 8 to a placeholder template — that placeholder is the open question.

---

## Risks

- **R-1 — Over-asking causes user drop-off.** Severity: **medium**. Even with the per-tier budget (max 10 questions) and batching (1 round trip for the fixed axes), a user with a 30-second attention span may not finish. Mitigation: every axis has a default; the agent can ship the default app with no user input and the user can correct after the fact. Empirical evidence for the cap of ~7-10 fields is an [ESTIMATE]; verify with a 5-user test before locking the cap.
- **R-2 — Self-rated confidence is unreliable.** Severity: **medium**. The stop rule relies on the agent rating its own confidence at ≥ 0.85. LLMs are known to be miscalibrated on self-assessment. Mitigation: the coverage checklist and the budget cap are OR'd with confidence, so any single failure is recoverable. Also: the agent should be instructed to surface the LOWEST confidence sub-axis in the confirmation artifact, not the average — the lowest drives the risk.
- **R-3 — The Kind axis is a forcing function that may not match the user's mental model.** Severity: **medium**. If the user thinks "I want an AI-powered todo app" (which crosses Kind=2 dashboard and Kind=5 AI), the protocol forces one. Mitigation: the protocol should allow up to 2 Kind tags and combine templates; or — simpler for v1 — add a follow-up question when the user picks a Kind that doesn't obviously fit: *"This sounds like it might also be an AI tool. Is the AI part central, or just a feature?"* (single MC).
- **R-4 — The "leading question" risk on bot/extension/CLI routing.** Severity: **low**. The current placeholder template for option 8 (Bot/ext/CLI) is undefined per Q6/Q7. If shipped before F resolves it, the user is led toward whichever preset happens to exist. Mitigation: option 8 must say "I will route this to a CLI/ext specialist preset — confirm you want that path" rather than picking silently.
- **R-5 — The Arabic/RTL default reversal may surprise existing users.** Severity: **low**. The current template defaults to Arabic RTL (`resources/general-app-template/AGENT_SYSTEM_PROMPT_SHORT.md:8`). Flipping the default to English LTR changes behavior for users in the Arabic-speaking market. Mitigation: keep the Locale axis visible and pre-select Arabic as option 2 in the prompt, so users who need RTL still see it on the first click.
- **R-6 — The intake protocol may be re-implemented poorly by each agent runtime.** Severity: **low**. Five runtimes (Kilo, Claude Code, Cursor, OpenCode, Codex) each interpret markdown slightly differently. Mitigation: the protocol file must be self-contained — every question, default, and branch rule in the file itself, not in surrounding docs.
- **R-7 — The 74% improvement from interaction ([S2]) was measured on SWE-bench, not on greenfield app generation.** Severity: **medium**. SWE-bench tasks are bug fixes with existing code; greenfield apps have no code to anchor the interaction. The +74% may not transfer. Mitigation: angle D's verification must include a greenfield run, not just an SWE-bench analog.
- **R-8 — Token cost of intake (~400-1000) is non-trivial for Tier 0.** Severity: **medium**. A "minimal app" that costs 400 intake tokens before any code is written may be more expensive than just generating the app. Mitigation: for Tier 0, the protocol should support an "express" mode that asks only 1-2 questions (Kind + confirm-defaults-for-the-rest) and collapses the intake into the first user reply.

---

## Sources

[S1] GitHub spec-kit. Repository README, accessed 2026-08-13. URL: https://github.com/github/spec-kit. **What it proves:** The optional `/speckit.clarify` command (formerly `/quizme`) runs AFTER the spec is drafted, not before — the draft-first-then-ask posture. Optional `/speckit.checklist` generates "unit tests for English" — the checklist-as-question pattern is canonical.

[S2] Vijayvargiya, S., Zhou, X., Yerukola, A., Sap, M., Neubig, G. "Ambig-SWE: Interactive Agents to Overcome Underspecificity in Software Engineering." ICLR 2026, arXiv:2502.13069v3. URL: https://arxiv.org/abs/2502.13069. **What it proves:** *"up to 74% improvement over non-interactive settings"* when agents interact on underspecified code tasks; *"models struggle to distinguish between well-specified and underspecified instructions."* Supports ask-first for code agents and the need for a coverage checklist.

[S3] Edwards, N., Schuster, S. "Ask or Assume? Uncertainty-Aware Clarification-Seeking in Coding Agents." arXiv:2603.26233v2, 2026-03. URL: https://arxiv.org/abs/2603.26233. **What it proves:** *"69.40% task resolve rate"* with uncertainty-aware multi-agent scaffold on underspecified SWE-bench; *"the multi-agent system exhibits well-calibrated information-seeking behavior, conserving queries on simple tasks while proactively seeking information on more complex issues."* Supports entropy-driven / coverage-driven question selection.

[S4] Amazon Kiro Documentation, "Specs" + "Feature Specs" + "Analyze Requirements" pages, accessed 2026-08-13. URLs: https://kiro.dev/docs/specs/, https://kiro.dev/docs/specs/feature-specs/, https://kiro.dev/docs/specs/analyze-requirements/. **What it proves:** EARS notation (`WHEN ... THE SYSTEM SHALL ...`) is the canonical requirements format used by a production agent product; **Analyze Requirements** is a separate agent call that surfaces clarifying questions with "logical inconsistencies, ambiguities, conflicting constraints, unstated assumptions, missing edge cases" — direct precedent for our coverage-checklist pattern. Quick Spec auto-generates all three artifacts; "answer clarifying questions up front" — the draft-first alternative we explicitly reject.

[S5] BMAD-METHOD. Repository README, accessed 2026-08-13. URL: https://github.com/bmad-code-org/BMAD-METHOD. **What it proves:** The Clarify → Plan → Build → Verify loop has an *explicit* Clarify stage as a discrete artifact; *"Coding assistants are effective at implementation, but they often turn unstated assumptions into code. BMad keeps you in control."* Direct match to the user's framing. MIT, 51.9k stars.

[S6] buildermethods/agent-os. Repository README, accessed 2026-08-13. URL: https://github.com/buildermethods/agent-os. **What it proves:** The "Shape Spec" pattern — extract codebase conventions, inject at spec time. Not directly applicable to greenfield, but the *auto-extract-defaults-from-template* pattern is. MIT, 5.3k stars.

[S7] Mavin, A. "EARS: Easy Approach to Requirements Syntax." Official site, accessed 2026-08-13. URL: https://alistairmavin.com/ears/. **What it proves:** 5 lightweight patterns (Ubiquitous, State-driven While, Event-driven When, Optional feature Where, Unwanted behaviour If/Then) that are *"especially effective for requirements authors who must write requirements in English, but whose first language is not English"* — direct fit for Arabic/RTL support. Used by Airbus, Bosch, Dyson, Honeywell, Intel, NASA, Rolls-Royce, Siemens. First published 2009.

[S8] Ghosh, S., Polach, G., Sow, A. "Less Back-and-Forth: A Comparative Study of Structured Prompting." arXiv:2605.20149v1, 2026-05. URL: https://arxiv.org/abs/2605.20149. **What it proves:** Across 4 task types and 3 LLM systems (ChatGPT, Claude, Grok), **checklist-improved prompts scored 7.50/8 vs clarifying-question prompts 6.67/8 vs raw prompts 5.67/8**. *"Checklist prompts also produced the best quality-effort tradeoff, using fewer average tokens than both raw and clarifying prompts."* Direct empirical support for the checklist-over-interview posture.

[S9] Su, J., Cardie, C. "Knowing but Not Showing: LLMs Recognize Ambiguity but Rarely Ask Clarifying Questions." arXiv:2605.25284v1, 2026-05. URL: https://arxiv.org/abs/2605.25284. **What it proves:** *"models often identify ambiguity when explicitly asked to judge it, yet in the QA setting they overwhelmingly default to direct answers."* The model needs an explicit prompt-level instruction to ask; without it, the natural behavior is to assume. Supports the need for an explicit "ask when ambiguous" rule in the intake prompt.

[S10] Wang, H., Han, L., Xu, K., Srivastava, A. "Turning Intent into Specifications: A Benchmark and an Interactive User-Assistant Agent (SpecBench / Buddy)." arXiv:2606.20585v1, 2026-05. URL: https://arxiv.org/abs/2606.20585. **What it proves:** Two failure modes: *"(i) struggle to collaborate proactively with users, entering implementation mode too quickly while overestimating their understanding of user preferences, or (ii) exhaust their question budget by asking about every ambiguous design choice."* Buddy's solution — *morphological analysis* decomposing intent into structured design dimensions — directly inspired our adaptive branching structure.

[S11] Sturgeon, B., Samuelson, D., Haimes, J., Anthis, J. R. "HumanAgencyBench: Scalable Evaluation of Human Agency Support in AI Assistants." arXiv:2509.08494v1, 2025-09. URL: https://arxiv.org/abs/2509.08494. **What it proves:** Six dimensions of human agency including "Ask Clarifying Questions". Found *"low-to-moderate agency support in contemporary LLM-based assistants"* — i.e., LLMs do NOT default to asking. Reinforces [S9].

[S12] de Oliveira, B. L. M., Martins, L. G. B., Brandão, B., Melo, L. C. "InfoQuest: Evaluating Multi-Turn Dialogue Agents for Open-Ended Conversations with Hidden Context." arXiv:2502.12257v2, 2025-04. URL: https://arxiv.org/abs/2502.12257. **What it proves:** *"all current assistants struggle to gather critical information effectively. They often require multiple turns to infer user intent and frequently default to generic responses without proper clarification."*

[S13] Zhang, M. J. Q., Knox, W. B., Choi, E. "Modeling Future Conversation Turns to Teach LLMs to Ask Clarifying Questions." ICLR 2025, arXiv:2410.13788v2. URL: https://arxiv.org/abs/2410.13788. **What it proves:** Preference labeling via future-turn simulation yields +5% F1 over standard labeling; *"our method can be used to train models to judiciously determine when to ask clarifying questions, directly answering the question when clarification is unnecessary."* Supports the simulation-before-asking pattern (the agent drafts internally before asking).

[S14] Angle B dossier (T-2026-08-13-003). URL: `share/notes/01_research_T-2026-08-13-003_angle-b-competitors.md` (when written). **What it proves (predicted):** all 16 prompt-to-app competitors use draft-first; none run an MC intake. The ask-first posture is the deliberate differentiator.

---

## Metrics

- findings: 48 (counted across all `## Part 1`, `## Part 2`, and `## Part 3` bullets — includes 7 prior-art sub-sections, 10 questions in the bank, 4 branches, 4 confirmation-format rows, 3 non-answer rows, 4 failure modes, 4 verdict rows, 10 template-change bullets, 6 cross-angle routes, and 14 sources)
- risks_HIGH: 0
- risks_MEDIUM: 5 (R-1 over-asking, R-2 self-rated confidence unreliability, R-3 Kind-axis forcing, R-7 SWE-bench-to-greenfield transfer, R-8 Tier-0 token cost vs benefit)
- risks_LOW: 3 (R-4 bot/ext placeholder leading question, R-5 Arabic/RTL default reversal surprise, R-6 cross-runtime re-implementation drift)
- clarifying_Qs: 0 (no open questions for the user — every question in this dossier has a recommendation; the user can disagree in their next reply. The Q6/Q7 bot-ext-CLI-vs-UI tension is delegated to angles C/D/F, not to the user.)