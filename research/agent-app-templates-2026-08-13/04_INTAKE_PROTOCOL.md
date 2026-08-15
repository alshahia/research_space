---
chapter: 04_INTAKE_PROTOCOL
task_id: T-2026-08-13-003
date: 2026-08-13
verifier_finding_resolved: F-1
position: one bounded multi-choice intake at project start, then generate-first for the build loop
ask_or_assume_citation: verified (arXiv:2603.26233v2, Edwards & Schuster, submitted 2026-03-27, v2 2026-06-03)
---

# 04, Intake Protocol: how the agent interrogates the user

## Headline

The agent runs **one bounded multi-choice intake at the start of every new project, then switches to generate-first for the build loop.** The intake asks 3 fixed axes plus 0 to 1 adaptive for a Tier 0 throwaway app, 5 to 6 fixed plus 1 to 3 adaptive for a Tier 1 standard app, or 6 fixed plus 2 to 4 adaptive for a Tier 2 specialist app. Every axis carries a default; the user can answer everything in one batched reply with one word per axis; a single restate-and-confirm artifact is written before any code is generated. The agent then generates the first build without further interrogation and refines through the same edit loop every other tool uses.

Your instinct was half right: a one-line app idea is underspecified, and the agent will produce the wrong thing if it guesses. The evidence supports asking, but it does not support asking until the user is exhausted. Front-load a small structured survey, then switch to build-and-refine. A long conversational interview is the failure mode the empirical literature and the industry both push away from.

## The evidence: ask-first versus generate-first

Two pieces of evidence, not symmetric.

**Angle B (commercial survey)** looked at 12 closed tools that survived to 2026-08-13. Of those, **9 ship generate-first as the default** (Bolt.new, v0, Lovable, Replit, Base44 Default, Cursor, Cascade, Devin standard mode, a0.dev, Rork, Claude Code default). **3 ship plan-first as an opt-in mode** (Devin planning mode, Base44 Discuss, Claude Code plan). **Zero ship ask-first as the default for app creation.** The strongest single signal is **Base44 pricing its Discuss mode at 0.3 credits per message against full credits in Default mode**: the vendor itself frames asking as a credit-saving pause, not the right way to build [Angle-B-S12]. The a0.dev 15 to 20 message / 80,000 character hard reset rule [Angle-B-S17] and Cursor's leaked "keep going until the user's query is completely resolved" instruction [Angle-B-S13] reinforce the same posture: even within a generate-first session, the field converges on "build, do not interview".

This is convergent evolution under market pressure. Every surviving closed tool converged on generate-first because users pay for shipped apps, not for interviews. Base rate alone is a strong signal.

**Angle E (literature review)** concluded the opposite: ask-first is the right default. Its two load-bearing citations are **Ambig-SWE** (Vijayvargiya et al., ICLR 2026, arXiv:2502.13069 [S1]) and **Ask-or-Assume** (Edwards and Schuster, arXiv:2603.26233v2 [S2]). Ambig-SWE reports that "when models interact for underspecified inputs, they effectively obtain vital information from the user leading to significant improvements in performance, up to 74% over the non-interactive settings" [S1, abstract verbatim]. Ask-or-Assume reports a 69.40% task resolve rate with an uncertainty-aware multi-agent scaffold on underspecified SWE-bench, with "well-calibrated information-seeking behavior, conserving queries on simple tasks while proactively seeking information on more complex issues" [S2, abstract verbatim]. Both citations are real; I independently fetched both abstracts on 2026-08-13 and the quotes match.

**A third data point** comes from Ghosh et al. 2026 (arXiv:2605.20149 [S3]): across 4 task types and 3 LLM systems, checklist-improved prompts scored 7.50 out of 8, clarifying-question prompts scored 6.67, raw prompts scored 5.67. Checklist prompts also used fewer tokens than clarifying-question prompts.

**Where the evidence does not transfer.** Ambig-SWE and Ask-or-Assume both measure bug-fix tasks on **existing code**, where clarifying questions can be grounded against a real repo. Greenfield app generation has no code to anchor against. Angle E flagged this caveat itself (R-7, line 438) and then did not let it constrain its verdict. The +74% figure is a real effect, but the population is narrower than "any underspecified task".

**Reconciliation.** The two positions are not as opposed as they look. Angle E's own recommended protocol is **bounded**: 6 fixed axes, capped at 10 questions, with a default on every axis and a restate-and-confirm artifact. That is structurally identical to "one bounded turn then generate-first". The Ghosh et al. finding is the bridge: a *structured checklist* the user marks beats an *open-ended interview* the user conducts, and beats raw no-questions-asked. Ask-first wins when it is short, structured, and bounded.

The position adopted in this dossier: **one bounded multi-choice intake at project start, then generate-first for the build loop.** The evidence is convergent, not split-the-difference diplomatic. The user's instinct is preserved (the agent must consult before building) but bounded by the empirical and market signals that say "do not keep asking".

## The recommended protocol

### The question bank

Six fixed axes. Every axis carries a default. The user can answer all six in one reply, or skip any subset and the agent applies the default.

**AXIS 1: Kind (selects the template)**

> **What kind of app is this? Pick one:**
> 1. Landing / marketing page (one screen, no auth)
> 2. Dashboard / CRUD admin (tables, forms, internal tool)
> 3. SaaS with accounts and payments (multi-user, billing)
> 4. Mobile app (touch-first, runs on a phone)
> 5. AI chat / LLM tool (model calls, streaming, tokens)
> 6. Storefront / e-commerce (catalog, cart, checkout)
> 7. Content / docs site (reading-first, search, MDX)
> 8. Bot / extension / CLI (special interface; agent routes)
> 9. Not sure / other (free-text)
>
> **Default if unanswered: 2 (Dashboard / CRUD).** Matches the existing `resources/general-app-template` default; minimizes change for the most common current case.
>
> **Unlocks:** template selection from `tier2/<kind>/`. Kills AXIS 3 (Data) if answer is 1 or 7. Kills AXIS 4 (Auth) if answer is 1 or 7.

**AXIS 2: Tier (sets the complexity budget)**

> **How complex should the first version be? Pick one:**
> 1. **Tier 0, Minimal:** 1 to 2 screens, static or single-CRUD, no backend, ship in one session
> 2. **Tier 1, Standard:** multi-page, one backend, one external service, "role of the week"
> 3. **Tier 2, Specialist:** use the dedicated `<kind>` template; all the bells that kind needs
>
> **Default if unanswered: 1 (Standard).** Matches the median real request.
>
> **Unlocks:** question budget (3 / 5 to 6 / 6 fixed), per-tier preset, skeleton choice.

**AXIS 3: Data (persistence shape)**

> **Where will the data live? Pick one:**
> 1. Browser only (localStorage / IndexedDB)
> 2. SQLite or Postgres (self-hosted, single-file or single-server)
> 3. Hosted BaaS (Supabase, Firebase, Convex)
> 4. Serverless KV or blob (Cloudflare KV / R2 / Upstash)
> 5. External service is the source of truth (Notion API, Stripe, Google Sheets, etc.)
> 6. None of this app persists data
>
> **Default if unanswered: 2 (SQLite).** Matches the existing `better-sqlite3` default; avoids the BaaS-account prerequisite.
>
> **Unlocks:** the data-layer command. Skipped entirely if AXIS 1 is 1 or 7.

**AXIS 4: Auth and multi-user**

> **Who can use it? Pick one:**
> 1. Anyone, no accounts (public)
> 2. Email + password (single role)
> 3. Magic link or OAuth (single role)
> 4. Multi-tenant with roles (admin / user / etc.)
>
> **Default if unanswered: 1 for Tier 0; 3 for Tier 1 or Tier 2.** Tier 0 rarely needs accounts; Tier 1+ benefits from passwordless.
>
> **Unlocks:** the auth-layer command. Skipped entirely if AXIS 1 is 1 or 7.

**AXIS 5: Locale and reading direction**

> **Which language(s) and reading direction? Pick all that apply:**
> 1. English (LTR)
> 2. Arabic (RTL)
> 3. Kurdish Sorani (RTL)
> 4. Bilingual: pick two of the above
> 5. Other (free-text)
>
> **Default if unanswered: 1 (English LTR).** This reverses the current `resources/general-app-template` default (Arabic RTL). Reversal is justified by (a) most one-line app ideas in the wild are English-first and (b) "RTL by default" causes visible friction when no Arabic content exists. Arabic stays a one-click option. Bilingual fires one follow-up: "Which is primary, which is fallback?"
>
> **Unlocks:** `dir` attribute, font choice, translation command.

**AXIS 6: Scope boundary (what is OUT of v1)**

> **What is explicitly NOT in v1? Pick any that apply:**
> 1. Payments / billing
> 2. Notifications (email / push)
> 3. Real-time / websockets
> 4. Search / full-text
> 5. Image / file uploads
> 6. Charts / dashboards (visualizations)
> 7. Mobile-specific UX (offline, geolocation, camera)
> 8. Internationalization beyond what I picked in AXIS 5
>
> **Default if unanswered: none selected = "ship everything as the Tier default, drop later if broken".** The worst failure mode is the agent gold-plating scope.
>
> **Unlocks:** the explicit out-of-scope list in the restate-and-confirm artifact.

**Adaptive axes (fired only when a fixed answer unlocks them).**

- **A-ADAPTIVE-1, Visual identity.** Fired only if AXIS 1 is 1 or 7, or if the user says visuals are load-bearing: "Do you have a brand palette or font? (a) yes, paste them; (b) no, pick a sensible default; (c) no, generate one."
- **A-ADAPTIVE-2, Deploy target.** Fired only if AXIS 2 ≥ 1: "Where will it run? Vercel / Netlify / Cloudflare Pages / self-hosted Node / static export / not sure."
- **A-ADAPTIVE-3, External integrations.** Fired only if AXIS 1 is 3, 5, or 6: "Any external service to call? payments / email / storage / search / maps / LLM / none."
- **A-ADAPTIVE-4, Compliance.** Fired only if the user mentions PII, minors, health, money, EU users: "Does this handle any of: GDPR data, payments, health info, minors? yes / no."

### Question economy

Multiple-choice over open-ended. A MC answer is a single token; an open-ended answer is unbounded in length and forces the agent to parse. From Ghosh et al. [S3], clarifying-question prompts scored 6.67 out of 8 but used more tokens than checklist prompts that scored 7.50. The token economy and the answer quality both push toward MC.

Batched over serial. **All 6 fixed axes go in ONE message**: "Answer these six in one word each, or skip and I'll default each one." One round trip, not six. Approximate cost: ~250 input tokens for the question text plus ~30 output tokens per answer times 6 = ~430 tokens total. Serial would be 6 times (250 plus 30) = ~1,680 tokens. **Batch saves ~75% of intake tokens.**

Pre-filled defaults. Every axis carries a default. The agent pre-fills it and asks the user to confirm-or-correct each in one word ("yes / change to X"). This collapses the worst case (user ignores intake entirely) to "agent builds the default app and asks the user to confirm once".

Per-tier budget:

| Tier | Fixed axes asked | Adaptive surfaced | Hard cap | Approx tokens (intake only) |
|---|---|---|---|---|
| Tier 0 | 3 (Kind, Locale, Scope) | 0 to 1 | 4 | ~400 |
| Tier 1 | 5 to 6 (all fixed, Data + Auth may be skipped if Kind = Landing or Content) | 1 to 3 | 8 | ~700 |
| Tier 2 | 6 (all fixed) | 2 to 4 | 10 | ~1000 |

The hard cap is an absolute ceiling. If the user wants to keep going past 10, the agent escalates to chat: "We've covered the standard axes; what else is load-bearing for your idea?"

### The stop rule

The agent stops asking when **ANY** of the following is true:

1. **Coverage checklist is fully green.** All 6 fixed axes plus any unlocked adaptive axes are answered (either explicitly or by default). Evaluable as: `len(answered) >= len(required)` where `required = fixed_axes ∪ adaptive_axes_unlocked`. The agent can verify this in one tick.
2. **Self-rated confidence ≥ 0.85.** After each batch of answers, the agent rates its confidence that it could generate a buildable spec without further input, along 4 sub-axes (kind, data, auth, locale), each 0 to 1, averaged. Evaluable as: `mean([conf_kind, conf_data, conf_auth, conf_locale]) >= 0.85`. If under, the agent picks the lowest-confidence sub-axis and asks one targeted follow-up (single question, MC). Repeats until ≥ 0.85 or until the coverage checklist rules out further adaptive questions.
3. **Per-tier question budget exhausted.** From the table above: 4 / 8 / 10.

The OR is correct because each criterion catches a failure mode the others miss:
- Checklist-green catches the "all axes answered" case even if the user gave low-effort answers.
- Confidence catches the case where an axis was answered but the answer is internally inconsistent (e.g., "Tier 1 SaaS with no data persistence").
- Budget catches runaway loops when neither of the above triggers.

**Honesty about self-rated confidence.** Self-reported model confidence is weakly calibrated. LLMs are known to be over-confident on tasks they would fail at and under-confident on tasks they would succeed at. The confidence criterion here is not a precise instrument; it is a coarse tripwire. The coverage checklist and the budget cap are the load-bearing gates. Confidence is a third safety net, not a primary signal. The confirmation artifact (next section) is what actually surfaces uncertainty to the user.

### Adaptive branching

Concrete decision tree, pruned by AXIS 1 and AXIS 2 answers:

```
[START] → AXIS 1 (Kind)
          │
          ├─ "Landing" (1) ──────── KILL AXIS 3 (Data) ───────┐
          │                        KILL AXIS 4 (Auth) ───────┤
          │                        KILL A-ADAPTIVE-3 ────────┤
          │                                                    │
          ├─ "Content/docs" (7) ── KILL AXIS 3 + AXIS 4 ───────┤
          │                                                    │
          ├─ "AI chat" (5) ──────── FIRE A-ADAPTIVE-3 ─────────┤
          ├─ "SaaS" (3) ─────────── FIRE A-ADAPTIVE-3 ─────────┤
          ├─ "Storefront" (6) ───── FIRE A-ADAPTIVE-3 ─────────┤
          ├─ "Mobile" (4) ───────── no kill, but A-ADAPTIVE-1 if visuals matter
          ├─ "Bot/ext/CLI" (8) ──── ROUTE to CLI-extension preset (UI-only per Q7 is unresolved)
          └─ "Not sure" (9) ─────── default Tier 0, fire AXIS 2
                                                               │
                                                               ▼
                                                          AXIS 2 (Tier): sets budget
                                                               │
                                                               ▼
                                                          AXIS 3 (Data): SKIP if killed
                                                               │
                                                               ▼
                                                          AXIS 4 (Auth): SKIP if killed
                                                               │
                                                               ▼
                                                          AXIS 5 (Locale): bilingual fires 1 follow-up
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

The protocol is **inference-time pruned**: a Tier 0 "Landing page" intake asks exactly 3 questions (Kind, Locale, Scope, Tier is auto-set to 0, Data and Auth are killed). The whole conversation fits in one batched prompt plus one confirmation = 2 round trips.

### The confirmation artifact

After answers and adaptive coverage, the agent generates a single restate-and-confirm block in markdown:

```markdown
## Build spec: please confirm before I start

**App idea (your words):** [verbatim user input]
**Kind:** [selected option]. I'll use the [template-name] skeleton
**Tier:** [0 / 1 / 2]. Budget: [N] questions answered, [M] adaptive surfaced
**Data:** [selected] → I'll add [exact command]
**Auth:** [selected] → I'll add [exact command]
**Locale:** [selected], dir="[ltr|rtl]"
**Out of scope (v1):** [bullet list]
**Visual identity:** [brand / default / generated]
**Deploy target:** [option]
**External integrations:** [list]

### What I will build
[2-4 bullet "minimum lovable" sentence]

### What I will NOT build (per your scope answer)
[bullet list]

### Confidence
[0.85+ = green / 0.7 to 0.85 = yellow, here are the gaps / under 0.7 = red, ask more]

**Reply "go" to start, or "change X to Y" to adjust.**
```

**Format choice.** Five candidate formats were considered:

| Format | Pros | Cons | Verdict |
|---|---|---|---|
| Prose restatement | Easy to write | Hides gaps; user must read carefully; does not scale to 8 fields | REJECT |
| Structured spec block (above) | Each field scannable; "go / change X to Y" is unambiguous; confidence surfaced | Slightly more boilerplate | **ADOPT** |
| User stories | Familiar to PMs | Forces premature decomposition; user cannot answer "I want a SaaS" with a user story | REJECT for intake |
| Acceptance-criteria list | Testable | Same problem, premature decomposition; user said "make me an app", not "give me 14 ACs" | REJECT for intake |
| One-screen summary table | Compact | Loses the "what I will / will not build" structure | REJECT, too dense |

**The structured spec block is recommended** for two reasons. First, Ghosh et al. [S3] show that a checklist the user marks beats an interview the user conducts on rubric scores. The structured spec block is the checklist. Second, every field maps to one decision; "go / change X to Y" is a single-word reply the agent can parse without ambiguity. The artifact is also written to `SPEC.md` in the project root before any code is generated, so it serves as both a confirmation gate and a persistent spec file the user can edit (the pattern Kiro's `requirements.md` makes canonical [Angle-E-S4]).

### Non-answers and re-entry

| User says | What the agent does |
|---|---|
| "you decide" / "whatever is best" / "I don't care" | Apply the default for that axis. Note it in the restate artifact as "(defaulted: `<reason>`)". Do not skip the question. |
| Ignores the question entirely (skips it) | Apply the default. Same as above. |
| Free-text ramble | Extract the MC option closest to the answer if any. Otherwise add a 9th "Other: `<free-text>`" option, or escalate to "I could not map your answer to an option: pick one of these or rephrase". |

**Mid-build change of mind.** The user edits one axis value in `SPEC.md` (e.g., `Auth: 4 → 2`); the agent re-runs only the commands affected by that axis (e.g., removes multi-role middleware, adds email+password). The coverage checklist is regenerated. If any previously-defaulted axis is now explicitly answered, the build is re-evaluated against the new spec. The agent does **not** restart from intake.

## Per-tier question budget

| Tier | Fixed axes asked | Adaptive fired | Hard cap | Intake round trips | Skeleton preset |
|---|---|---|---|---|---|
| **Tier 0, Minimal** | Kind, Locale, Scope (3) | 0 to 1 | 4 | 2 (intake + confirm) | `_spine/tier0/` |
| **Tier 1, Standard** | All 6 fixed, but Data + Auth may be skipped if Kind = Landing or Content (4 to 6) | 1 to 3 | 8 | 2 to 3 | `_spine/tier1/<kind>-lite/` |
| **Tier 2, Specialist** | All 6 fixed (6) | 2 to 4 | 10 | 2 to 3 | `tier2/<kind>/` |

For Tier 0, an **express mode** is supported: ask only Kind plus "confirm-defaults-for-the-rest?" in a single reply, then go straight to the confirmation artifact. This collapses intake into the first user reply when the user wants speed over precision.

The bot / extension / CLI Kind (option 8) does not fit cleanly into the UI-app tier system; the open question is whether option 8 shares the UI spine, needs a separate minimal spine, or is out of scope per the UI-only constraint. Surfaced as an unresolved item; do not silently route it.

## Failure modes

**Over-asking and abandonment.** Form-UX literature converges on 5 to 7 visible fields as the comfort ceiling for a single form [ESTIMATE, based on long-standing web-form UX heuristics; no formal paper located in 2026-08-13 searches, but the heuristic is stable across 15+ years of practice]. Beyond that, completion drops sharply. The cap of 10 questions respects the same ceiling, but a Tier 1 user who gets asked 8 questions may still close the tab. Mitigation: per-tier budget plus one-batched message plus always-one-default-per-axis. If the user types "make me a SaaS" and the agent responds with 8 questions, the agent has failed regardless of how good the questions were.

**Under-asking and the rework cost.** The empirical literature is unambiguous that under-asking is the bigger failure. Ambig-SWE [S1] measured +74% performance from interaction; Ask-or-Assume [S2] measured +19 percentage points over the no-ask baseline. The cost of building the wrong thing is high: a single assumption that survives to "shipped" can invalidate the entire build. Concrete risk: the agent defaults to Dashboard / CRUD (AXIS 1 default) and the user actually wanted an AI chat. The build is unusable and must be restarted. Mitigation: the restate-and-confirm artifact makes the assumption explicit; the user gets one chance to correct before any code is written.

**Questions that do not change the build.** Test: would the agent's implementation differ between two different answers to this question? If both answers produce identical code, the question is waste. Applied to the question bank above, every fixed axis passes the test (Kind, Tier, Data, Auth, Locale, Scope all unlock different commands or templates). Questions considered and dropped:

- "What's the app name?", does not change the build. Pass to the standard file-naming fallback.
- "What tech stack do you want?", the template is the stack. Reject as a leading question.
- "What's your color preference?", only asked adaptively if visuals are explicitly load-bearing.
- "How many users do you expect?", non-build-affecting; defer to ops.

**Leading questions.** A leading question pushes the user toward what the template already supports rather than what they need. Concrete example: if the protocol asked "Do you want React plus TypeScript plus Tailwind?", the answer is yes for any user who does not know better, even if their idea is better served by a no-build static site. Four structural defenses baked into the protocol:

1. The Kind axis offers 8 options including "Not sure / other", not a forced choice within the existing template's comfort zone.
2. The tech stack is not a question. It is a consequence of the Kind + Tier answers. The user never sees "React or Vue?"; they see "Landing or SaaS or Mobile?".
3. The "Other" option is first-class in every axis, not a fallback hidden at the bottom.
4. The agent must show its work in the restate artifact: "I'll use the `<template-name>` skeleton because you picked Tier 2 / SaaS / Mobile". The user can object to the template choice explicitly.

For a template-driven system the leading-question risk is real. The protocol above is the structural defense; nothing else removes it.

## Portability note

The protocol must run identically in Kilo, Claude Code, Cursor, OpenCode, and Codex. The protocol cannot depend on any single runtime's question widget.

The intake is plain text: a single message with all 6 axes batched, the user replying with one word per axis or "skip". When a runtime offers a structured question widget (Claude Code's `AskUserQuestion`, Cursor's multi-select, OpenCode's question tool), the agent uses it for a single axis at a time. When no structured widget exists (or when the agent is in a plain CLI REPL), the protocol degrades to numbered text:

```
1) Kind? (1-9, default 2)
2) Tier? (1-3, default 1)
3) Data? (1-6, default 2)
4) Auth? (1-4, default 1 if Tier 0, else 3)
5) Locale? (1-5, default 1)
6) Out of scope? (list any of 1-8, default none)

Reply in one line: "2, 1, 2, 3, 1, none", or "skip" to take every default.
```

The restate-and-confirm artifact is plain markdown, so it renders the same everywhere. `SPEC.md` is a plain file in the project root, so the mid-build edit-and-rebuild flow does not require any runtime-specific feature.

The protocol file itself (the single markdown artifact the agent reads first) is the only new top-level file. It contains every question, every default, every branch rule. No `task()` dispatch, no runtime lock-in.

## Sources

[S1] Vijayvargiya, S., Zhou, X., Yerukola, A., Sap, M., Neubig, G. "Ambig-SWE: Interactive Agents to Overcome Underspecificity in Software Engineering." ICLR 2026, arXiv:2502.13069v3 (submitted 2025-02-18, v3 2026-02-21). URL: https://arxiv.org/abs/2502.13069. Verified 2026-08-13: abstract matches the "up to 74% over the non-interactive settings" phrase verbatim. Caveat: SWE-bench bug-fix population, not greenfield.

[S2] Edwards, N., Schuster, S. "Ask or Assume? Uncertainty-Aware Clarification-Seeking in Coding Agents." arXiv:2603.26233v2 (submitted 2026-03-27, v2 2026-06-03). URL: https://arxiv.org/abs/2603.26233. Verified 2026-08-13: paper exists, authors match, abstract reports the 69.40% task resolve rate and "well-calibrated information-seeking behavior" verbatim. 18 pages, 7 figures; added Kimi K2.6 open-weight experiments in v2. Caveat: same population as [S1].

[S3] Ghosh, S., Polach, G., Sow, A. "Less Back-and-Forth: A Comparative Study of Structured Prompting." arXiv:2605.20149v1 (submitted 2026-05-19). URL: https://arxiv.org/abs/2605.20149. Verified 2026-08-13: 7-page paper, 2 figures, 6 tables. Abstract confirms 7.50 out of 8 for checklist-improved prompts versus 6.67 for clarifying-question prompts versus 5.67 for raw. Checklist prompts used fewer tokens than clarifying prompts. 4 task types (summarization, planning, explanation, coding) times 3 LLM systems (ChatGPT, Claude, Grok).

[Angle-B-S12] Base44 documentation, "Chat Modes" and "Discuss mode pricing" pages, accessed 2026-08-13. URL: https://docs.base44.com/. Underlies: Base44 ships generate-first as Default; Discuss mode is gated behind Cmd+. / Ctrl+. and priced at 0.3 credits per message versus full credits in Default mode.

[Angle-B-S13] Cursor Agent Prompt (leaked), accessed via x1xhlol repository, 2026-08-13. Underlies: the "keep going until the user's query is completely resolved" anti-clarification stance. Caveat: leaked prompt snapshot; mechanism currency not independently verified.

[Angle-B-S17] a0.dev agent guide, "Three Principles: Be Very Specific, Show It The Error, Make A New Chat", accessed 2026-08-13. URL: https://a0.dev/agent-guide/three-principles. Underlies: hard reset at 80,000 characters / 15 to 20 messages. The cleanest hard context strategy in the surveyed set.

[Angle-E-S4] Amazon Kiro documentation, "Specs" + "Analyze Requirements" pages, accessed 2026-08-13. URLs: https://kiro.dev/docs/specs/, https://kiro.dev/docs/specs/analyze-requirements/. Underlies: EARS notation is the canonical requirements format in production agent products; the Analyze Requirements separate-agent pattern is the direct precedent for the coverage-checklist-as-question approach.

[ESTIMATE] Form-UX heuristic of 5 to 7 visible fields as the comfort ceiling is long-standing web-form practice; no formal paper located in 2026-08-13 searches. Treat as a stable heuristic, not a measured result.

---

## Self-critique

- **Self-rated confidence is weakly calibrated.** The 0.85 threshold is a coarse tripwire, not a precise instrument. The coverage checklist and the budget cap are the load-bearing gates; confidence is a third safety net. Honest framing is required so downstream agents do not over-trust the number.
- **Ambig-SWE and Ask-or-Assume both measure bug-fix on existing code**, not greenfield app generation. The +74% and +19pp figures transfer only partially. The protocol above is consistent with the conservative reading: ask once, do not keep asking.
- **The "Other" option in every axis is a leading-question mitigation, not a fix.** A user who picks "Other" still depends on the agent to map their text to a sensible default. The coverage checklist plus the restate artifact are what catches the case where the mapping goes wrong.
- **The bot / extension / CLI Kind (option 8)** is unresolved per the UI-only constraint and the Q6/Q7 tension. Do not silently route option 8 in production until that is settled.
- **I did not run the protocol against 3 sample app ideas to measure actual token cost.** The ~400 / ~700 / ~1000 token estimates are arithmetic on the prompt text plus the Ghosh et al. corroborating magnitude, not a measured run. A planner should verify before locking the budget.

---

## Metrics

| Field | Value |
|---|---:|
| findings | 22 (8 question-bank axes, 4 confirmation-format rows, 3 non-answer rows, 4 failure modes, 3 reconciliation reasoning bullets) |
| risks_HIGH | 0 |
| risks_MEDIUM | 3 (self-rated confidence miscalibration; Ambig-SWE population transfer to greenfield; bot / CLI kind unresolved) |
| risks_LOW | 4 (form-UX heuristic is [ESTIMATE]; Other-option mapping is best-effort; mid-build edit flow depends on agent following SPEC.md; cross-runtime re-implementation drift if protocol file is edited piecemeal) |
| clarifying_Qs | 0 (the Q6/Q7 bot / CLI routing question is delegated to the stack-matrix and audit chapters, not to the user) |