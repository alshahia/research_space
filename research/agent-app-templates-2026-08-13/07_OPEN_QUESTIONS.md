# 07_OPEN_QUESTIONS - decisions only the user can make

**Task:** T-2026-08-13-003
**Date:** 2026-08-13
**Owner:** am-research
**Purpose:** every decision the dossier surfaced that the user must answer before any planner or builder can lock anything. None of these is technical; all are scope calls.

Until these are answered, the safest action is to leave `resources/general-app-template/` in place. No new template family should be started beside it.

---

## Q1. Tier 2 tooling: bot and CLI shims in or out?

**Why it matters.** Q6 in the user scoping round selected "Bot / extension / CLI" as a deep-dive specialist kind. Q7 restricted the family to UI apps. Those two answers collide: a Chrome extension has UI, a Telegram bot does not, a CLI does not. The dossier (`02_STACK_MATRIX.md` rows 6a, 6b, 6c; `04_INTAKE_PROTOCOL.md` Per-tier question budget note) recommends **Option C**: shared `_spine/` plus three per-shim overlays (extension in family, bot and CLI as non-UI siblings). Angle C flagged this as `clarifying_Qs: 1` and explicitly told the synthesis writer not to treat it as settled.

**Options.**

| Option | What it means | Files added | Maintenance cost (per quarter) |
|---|---|---|---|
| **A. In, all three** | Extension, bot, CLI live as three tier2 templates in the family. The UI-only constraint relaxes. | ~3 × 8 = 24 files | +1 day/quarter (more kinds = more drift) |
| **B. Out, drop bot and CLI** | Only the extension shim survives. Tier 2 tooling becomes "browser extension". Bot and CLI templates deferred. | ~8 files | unchanged from baseline |
| **C. Hybrid, shared spine + 3 shims** (dossier recommendation) | Shared `_spine/` (5 files) plus 4 to 12 files per shim. Extension in family; bot and CLI are siblings with a "non-UI" marker in `tier.config.json`. | ~20 files | +0.5 day/quarter |
| **D. Drop the whole kind** | No tier2-tooling at all. Bot/CLI/extension are tier1 + a layer when needed. | 0 files | unchanged from baseline |

**Recommendation.** Option C, but only if you confirm that the non-UI siblings are acceptable inside a "UI app family". If you cannot, drop to Option B (extension only) and treat bot/CLI as out-of-scope for now.

**Blocked until answered.** The intake protocol's AXIS 1 option 8 ("Bot / extension / CLI") cannot be safely routed; the `tier2-tooling/` folder does not get built; `04` §Per-tier question budget's "bot / CLI routing is unresolved" caveat stays open.

---

## Q2. Which templates to build first, and in what order?

**Why it matters.** The 8-template family cannot ship in one pass. The order matters because `tier1-standard/` is the spine that most other templates inherit from; `tier0-minimal/` is the entry point for the user's "build me a quick thing" use case; the tier2 templates are specialist and can wait. A bad order means rebuilding a tier2 on top of a tier1 that later changes.

**Options.**

| Order | Sequence | Rationale | Risk |
|---|---|---|---|
| **A. tier0 then tier1 then all 5 tier2** | Bottom-up. tier0 first (3 to 5 days); tier1 (5 to 10 days); tier2 one at a time (3 to 5 days each) | Lowest risk; each layer locked before the next depends on it | Slowest path to a complete family (~6 to 8 weeks) |
| **B. tier1 first, then tier2, then tier0** | Start with the highest-value template. tier0 last because it is the simplest | Fast path to a usable Tier 1 app | If tier0 turns out to need different scaffolding, you rebuild |
| **C. Vertical slice first** | Build tier0 + tier1 + one tier2 (tier2-ai-chat, say) end-to-end. Then fill in the rest | Validates the whole shape on a single real use case before scaling out | If the vertical slice hits a wall, you discover it late |
| **D. tier1 + cinematic-landing only, defer all tier2** | Ship the family with just tier0 + tier1 + cinematic-landing. tier2 templates become a follow-up task | Minimum viable family. User gets value in 2 to 3 weeks | Leaves the "specialist kinds" question unanswered in production |

**Recommendation.** Order B if the user's primary near-term use is "Tier 1 standard app" (CRUD with auth, the most common current request). Order C if the user has a specific tier2 use case already (a real AI chat or mobile project). Order D if the user wants to validate the family shape before committing to the full 8.

**Blocked until answered.** The scaffolding work does not start. `tier.config.json` shape, the `registry.json` schema, and the per-tier folder structure all sit in `01` Decision 1 but get implemented only after this order is fixed.

---

## Q3. Repair `resources/general-app-template/` in place, or start a new family beside it?

**Why it matters.** The current template has 20 to 25% survival rate (`06_TEMPLATE_AUDIT.md` Headline). Three rules in it are actively harmful (the "no comments" ban, the "no test framework" ban, the hard-coded Arabic/RTL default) and another 16 of ~50 rules DROP outright. Repairing in place means editing the existing 10 files and ~1,720 lines. Starting fresh means new folder, new `AGENTS.md`, new skeletons, old template retired.

**Options.**

| Option | What it means | Cost | Risk |
|---|---|---|---|
| **A. Repair in place** | Edit the 10 existing files. Add the runnable skeleton as `SKELETON.md` describing what to scaffold. Keep the audit-survivor rules. Reverse the three harmful rules. | Lowest (1 to 3 days) | Carries the file-format debt forward. The template is still a single-tier prose pack with a runnable scaffold prompt glued on. |
| **B. Start new beside it, retire the old** | New `templates/` family root. Old `resources/general-app-template/` archived with a pointer. | Medium (1 to 2 weeks for tier0 + tier1) | User has to migrate any in-flight work from the old template |
| **C. Repair + extend** | Edit the existing 10 files to reverse the harmful rules, then add the new tier0/tier1 skeletons as additional folders inside `resources/general-app-template/` | Mixed (3 to 5 days) | Naming collision risk; the folder is named "general-app-template" but it now contains tier2-specific siblings |

**Recommendation.** Option B. The existing template's name and shape are wrong for what the new design needs (tier router, AGENTS.md at root, per-tier SKILL.md, runnable spine). Starting fresh beside it is cheaper than forcing a name-and-shape migration. The old template gets archived, not deleted, so anyone mid-build can still reference it.

**Blocked until answered.** The folder layout in `01` Decision 1 (the diagram at the top of this file) does not exist on disk. The audit-survivor pattern (`logCreate / logUpdate / logDelete`) is not in version control anywhere yet.

---

## Q4. Astro sits behind a major version. Upgrade now or pin?

**Why it matters.** Angle C picked `Astro 6.4.2` for the content / docs site kind. The current major is `7.2.1` (verified 2026-08-13, `share/reports/01_verify_T-2026-08-13-003.md` Job 3 F-12). The existing `content` recommendation in `02_STACK_MATRIX.md` row 5 now shows `Astro ^7.2.1` after the verifier correction. The version exists either way; the question is whether to commit to the new major now or pin to the old line for stability.

**Options.**

| Option | Pin | Trade-off |
|---|---|---|
| **A. Upgrade to `^7.2.1`** | Current major | New features; consistent with "current 2026 stacks" framing; first Astro 7 project will hit breaking-change fixes that are not yet battle-tested |
| **B. Pin to `~6.4.2`** | Old major, patch updates only | Maximum stability; known-good ecosystem; no MDX / Tailwind integration rework; falls behind the framework in 6 to 12 months |
| **C. Defer the decision** | `^6.4.2 || ^7.2.1` | Both versions acceptable; the planner picks at scaffold time based on what `npm install` resolves first | Spreads the choice across every fresh project |

**Recommendation.** Option A. The user explicitly framed the request as "what to use and why for kind app" with no constraint on stability (Q5 in scoping round answered "nothing is fixed"). Pinning to a behind-major version contradicts the brief. The breakage window for Astro 6 → 7 is small (mostly internal API renames for content collections; MDX + Tailwind v4 integration unchanged).

**Blocked until answered.** The content / docs site kind's stack pin. The `02_STACK_MATRIX.md` row 5 recommendation is correct either way; this is a planner-not-research call.

---

## Q5. The `[UNVERIFIED]` items in `02_STACK_MATRIX.md`. Who verifies them, and when?

**Why it matters.** `02_STACK_MATRIX.md` ships with 9 to 11 stack items marked `[UNVERIFIED]`: shadcn/ui (registry, not package), Auth.js v5, `react-markdown` + `remark-gfm` + `rehype-highlight`, `lucide-react`, `recharts`, `@hookform/resolvers`, Pagefind, TanStack Table. The verifier (`share/reports/01_verify_T-2026-08-13-003.md` Job 3) accepted these as UNVERIFIED because the dossier mitigates them ("planner verifies at plan time"). That mitigation is a promise, not an action.

**Options.**

| Option | Who verifies | When |
|---|---|---|
| **A. Planner at plan time** | The planner runs `chub get <id>` for each item at the moment it pins the package in a new skeleton's `package.json` | Once per project that uses the package |
| **B. Maintainer at skeleton build time** | The skeleton maintainer re-verifies every quarter as part of the 1 to 2 day maintenance budget | Once per quarter per package |
| **C. CI as a weekly gate** | A new `scripts/verify-stack-claims.ts` runs against the `02` chapter's `[Sn]` markers weekly | Once per week per package, automated |
| **D. Skip verification** | Trust the README claims; ship and patch if production breaks | Never, until breakage |

**Recommendation.** Option A combined with Option C. The planner must `chub get <id>` at first use (the moment a package gets pinned); CI runs the weekly gate to catch silent drift on already-pinned packages. The maintainer's quarterly review covers items that do not get pinned.

**Blocked until answered.** The first skeleton's `package.json` does not get written. Any planner action on `tier1-standard/` waits for verification policy.

---

## Q6. Who owns skeleton maintenance?

**Why it matters.** `03_TOKEN_ECONOMY.md` §5.3 sets the maintenance budget at 1 to 2 days per quarter per template (dependency drift, lockfile rot, framework majors). Without a named owner, the skeleton rots silently within one quarter. The user explicitly asked for "audit-grade provenance" in the requirements; an unmaintained skeleton contradicts that.

**Options.**

| Option | Owner | Cadence |
|---|---|---|
| **A. Single named maintainer** | One person per quarter; named in `MAINTAINERS.md` | 1 to 2 days per quarter |
| **B. Rotating maintainer** | One person per quarter on rotation across a small team | Same |
| **C. CI + on-call** | The weekly `verify-stack-claims.ts` catches drift; an on-call engineer handles framework-major updates | Reactive, not scheduled |
| **D. Community** | Open contribution model; no named owner | Lowest commitment; highest rot risk |

**Recommendation.** Option A or B. A single named maintainer (rotating quarterly across a small team if the user prefers shared load) is the cleanest accountability model. The 1 to 2 days per quarter is small enough that it fits inside an existing engineer's maintenance slice. CI is the safety net, not the owner.

**Blocked until answered.** `agents_manager/CHANGELOG.md` does not get a `## v0.X.Y - <theme> (YYYY-MM-DD)` block for the new family. `dependabot.yml` does not get written. The skeleton's `VERSION` and `CHANGELOG.md` files do not exist.

---

## Q7. Pilot measurement before trusting the cost headline?

**Why it matters.** The 2.7× USD reduction headline (`03_TOKEN_ECONOMY.md` Headline) is a model, not a measurement. It assumes A8 = 22 tokens per line of generated TSX, Sonnet 4.6 pricing, and a mixed-cache mix. None of those has been measured end-to-end on a real build. The user explicitly framed the brief as "shortest path with wasting tokens", so the headline matters. A pilot that validates or kills it costs 1 to 2 days.

**Options.**

| Option | What it does | Cost |
|---|---|---|
| **A. Full pilot, N=10 builds across 3 agents** | Run the current template and the recommended design on the same 10 briefs across Kilo, Claude Code, and OpenCode. Compare mean USD per build. | 1 to 2 days of engineer time + API cost |
| **B. Mini-pilot, N=3 builds, 1 agent** | Run the recommended design only on 3 representative briefs. Measure output tokens and cache hit rate. | 4 to 6 hours |
| **C. No pilot, ship and observe** | Trust the model; instrument the production builds; revisit at 3 months | $0 now, $X in production mis-pricing risk |
| **D. Back-of-envelope only** | Publish the model with its assumptions inline; mark every USD figure with `[MODEL]` | Free, but the headline stays untrusted |

**Recommendation.** Option B as the cheapest useful pilot. Three briefs (one Tier 0, one Tier 1 with auth, one Tier 2 mobile) on one agent (Claude Code is the most ergonomic) over half a day. The pilot produces: actual `output_tokens`, `cache_read_input_tokens`, USD per build, and a sanity check on the A8 assumption by sampling one generated file with `tiktoken`. If the result lands within 30% of the model's prediction, the headline is validated for the user's purposes. If it does not, the model needs to be re-stated before the template ships.

**Blocked until answered.** The headline in `00_README.md` carries a `[MODEL]` tag pending the pilot. Any user-facing cost claim in marketing or planning documents does not get green-lit.

---

## Q8. Tier 2 SaaS bundle: graduate to tier2 or stay as tier1 + layers?

**Why it matters.** `02_STACK_MATRIX.md` row 3 treats SaaS as `tier1-standard + auth + billing layers`, not as its own tier2. This collapses the cluster of SaaS-shaped apps into a layer addition. If your usage pattern shows > 30% of Tier 1 builds adding auth + billing together, the cluster is real enough to deserve its own tier2 (`tier2-saas-bundle`).

**Options.**

| Option | What it means | Cost |
|---|---|---|
| **A. Stay as tier1 + layers** | Keep SaaS as a layer combination. The auth and billing commands stay independent. | unchanged from baseline |
| **B. Promote to tier2-saas-bundle** | Move the auth + billing combination into a single tier2 template. Standalone, opinionated. | +2 to 3 days build + ongoing maintenance |
| **C. Defer** | Track the cluster over the first 6 months. Promote if the cluster holds | Decision is in 6 months |

**Recommendation.** Option C. The decision needs usage data. Six months of telemetry on "which combinations of layers fire together" answers the question empirically.

**Blocked until answered.** `02_STACK_MATRIX.md` row 3 stays as written (tier1 + layers). No folder created.

---

## Q9. Acceptance of the trade-off: 5 to 7× output-token reduction does not survive contact with reality

**Why it matters.** The original Angle D summary claimed "5 to 7× reduction"; the verifier caught it as a unit-of-measurement error (`share/reports/01_verify_T-2026-08-13-003.md` F-4). The corrected headline is **2.7× USD reduction / 63% output-token reduction**. If the user has read the angle files directly and remembers the 5 to 7× figure, the corrected headline will read as a downgrade rather than a correction.

**Options.**

| Option | How the dossier handles it |
|---|---|
| **A. State the correction in the headline; do not mention 5 to 7×** | Already done in `03_TOKEN_ECONOMY.md` Headline and `00_README.md` Numbers table. Risk: user wonders where the bigger number went. |
| **B. Footnote the correction explicitly** | One line at the bottom of `00_README.md` Numbers table: "Earlier internal drafts cited 5 to 7× output reduction; the corrected, arithmetic-verified figure is 63% (or 2.73× ratio) and 2.7× USD cached." |
| **C. Both** | Headline + footnote |

**Recommendation.** Option C. The user is the primary audience and may have seen the earlier draft. The footnote costs one line and prevents the headline from reading as a regression.

**Blocked until answered.** Nothing in the dossier. This is purely a presentation call. If you skip it, the dossier is still correct; the user just may not trust the corrected number on first read.

---

## Summary

| # | Question | Recommendation | Days blocked |
|---|---|---|---|
| 1 | Tier 2 tooling (bot/CLI in or out) | Option C with explicit user confirmation of non-UI siblings | until answered |
| 2 | Build order | Order B (tier1 first) or C (vertical slice) | until answered |
| 3 | Repair in place vs new beside | Option B (new beside, retire old) | until answered |
| 4 | Astro 6 vs 7 | Option A (`^7.2.1`) | none (planner call) |
| 5 | `[UNVERIFIED]` verification policy | Option A + C (planner + CI) | until answered |
| 6 | Maintenance owner | Option A or B (named maintainer) | until answered |
| 7 | Pilot before trusting the cost headline | Option B (mini-pilot, N=3, 1 agent, half-day) | 0.5 day once answered |
| 8 | Tier 2 SaaS graduation | Option C (defer 6 months) | none |
| 9 | Handle the 5 to 7× correction | Option C (headline + footnote) | none (presentation) |

Six of these block any next phase. Two are presentation-only. One is a planner call.