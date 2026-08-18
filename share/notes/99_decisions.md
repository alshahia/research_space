# 99 — Architectural decisions

Append-only. Each entry = one decision with rationale, scope, and reversibility.

## 2026-07-05 — Protocol response to T-minimax2.7 (Kotlin Quran) reflection

**Source:** user pasted `agent_reflect_minimax2.7_kotlin.txt` (Downloads) documenting a Quran-app run that shipped technically correct but culturally empty output.

**Decision:** apply 5 minimal protocol changes to `agents_manager/SKILL.md`. Each addresses one reflection recommendation. All within master's lane (master's own SKILL.md only).

**Changes applied:**

| # | Reflection rec | Protocol change | Location |
|---|---|---|---|
| A | Design as first-class phase | New "Design preflight" — dispatch `am-design` before Phase 2 when cultural/visual triggers fire; brief is required input to plan + review | SKILL.md between Phase 1 and Phase 2 |
| B | Document auto-approve defaults | Mandatory `share/handoffs/auto-answers_<task-id>.md` when `fill_defaults: true`; no silent absorption | Phase 0 Ingest |
| C | Review validates user intent | New "user-intent alignment check" in Phase 4 — PASS-on-spec / FAIL-on-intent = FAIL | Phase 4 Review |
| D | Self-score gates progression | Strengthened planning gate: any dimension <5 → "what would raise this to 5?" before advancing | Programmatic gates table |
| E | Split auto-approve signal | Two orthogonal flags: `fill_defaults` (silence defaults) vs `skip_gates` (silence user waits) | Phase 0 Ingest (same bullet as B) |

**Out of lane (flagged for a dedicated maintenance phase, NOT applied here):**

- `am-design/SKILL.md` — master can now dispatch am-design more aggressively, but am-design's contract for what the brief MUST contain is owned by am-design's author.
- `am-review/SKILL.md` — master now requires intent-alignment prompts, but am-review's contract for what it MUST validate beyond spec is owned by am-review's author.
- `am-research/SKILL.md` — master now requires auto-answers to be written, but am-research's contract for HOW it answers defaults is owned by am-research's author.

**Reversibility:** trivial. Each change is one bullet / row / section in SKILL.md. Rollback = revert the 4 edits.

**Ponytail note:** reflection named 5 problems. I added the minimum protocol surface to address each one. Did NOT add: new agents, new mandatory phases, new files beyond `share/handoffs/auto-answers_*.md`, new gates beyond the strengthened self-score rule, or new reviewer checks beyond the intent-alignment prompt requirement.

## 2026-07-05 — Adaptive orchestration (pipeline as default, not rule)

**Source:** user directive on master behavior. Existing protocol framed the pipeline as the dominant paradigm; specialists were exceptions within it. User wants the inverse: specialists as a toolkit, pipeline as a default shape, master adapts to project complexity.

**Decision:** insert new "Adaptive orchestration (v0.16.0+)" section BEFORE "The mandatory pipeline". Soften the pipeline's mandatory language to "default shape". No structural pipeline changes — only framing.

**Four authority levers the user called out:**

1. **Complexity triage** — trivial / one-step / standard / complex maps to direct / single-dispatch / pipeline / pipeline+adapt.
2. **Re-dispatch any specialist any number of times** — phase boundaries are not single-use gates.
3. **Run specialists in parallel** — research + explorer + designer co-existing is the norm for complex work, not the exception.
4. **Apply review to any artifact** — plan, brief, design can all be reviewed, not just code.
5. **Propose better solutions proactively** — surface alternatives with full reasoning before acting; user decides.

**Inform-the-user rules:** every significant action gets a "what + why + pros/cons" message; every fork gets options; never silently pick; never silently substitute user's intent with master's preference.

**Audit-trail rules (unchanged but reinforced):** progress ledger + WARN register + handoffs + task tracker Loop history. Reconstruction must be possible.

**Reversibility:** trivial. Revert = delete the new section, restore "Every user task flows through these phases. Do not skip a phase. Do not reorder."

**Out of lane (not addressed):** specialist SKILL.md files (`am-design`, `am-review`, `am-research`, `am-planning`, `am-coder`). Master can now use them more flexibly, but their contracts are owned by their authors. A separate maintenance phase would update those.

## 2026-07-05 — Maintenance phase: adaptive-mode propagated to all 7 agents

**Source:** user follow-up. Asked for: (a) maintenance-phase plan to update specialist SKILL.md files (option b), AND (b) base instructions in `opencode.jsonc` updated for each agent so adaptive-mode is internalised, not just referenced from master's doc.

**Soft-wall override:** master normally CANNOT edit `opencode.jsonc` or other agents' `agents_manager/<role>/SKILL.md`. The v0.5.0+ soft-wall override clause permits this with explicit surface — declared at the top of the work and applied with user consent.

**Changes (13 edits):**

- `opencode.jsonc` — added `## Adaptive mode (v0.16.0+)` block to all 7 agent prompts. Master gets the full orchestration framing (complexity triage, inform-the-user, propose-better). 6 specialists get the abbreviated reflex (self-validate, propose better, surface cross-lane) with a link to the full protocol.
- 6 specialist `SKILL.md` files (research / planning / design / coder / review / assets) — added ~8-line `## Adaptive mode (v0.16.0+)` section right after the role statement. Five-reflex block: (1) re-dispatch is normal, read latest state; (2) parallel work expected, coordinate via `share/messages/`; (3) self-validate before returning, cite `path:line`; (4) propose better solutions proactively; (5) cross-lane work returns to master.

**Why both files?** `opencode.jsonc` prompts are injected at every agent invocation as the base instruction. Specialist `SKILL.md` files are loaded once per session as standing rules. Updating both means: short-term memory (each call) + long-term memory (each session) both carry the new contract.

**Reversibility:** trivial. Each insertion is one block. Rollback = delete the inserted block in each of 13 files.

**Ponytail note:** user wanted "agents not to forget it". Minimum visible-surface = one high-visibility section per file (~8 lines), not a separate shared doc agents might skip reading. Each section reads as part of the file, not a stub.

**`am-assets/SKILL.md` was also updated** even though the original "option b" referenced only 5 specialists. Including it keeps the 6th specialist from drifting out of the contract.

## 2026-07-05 - Adaptive-mode smoke test + 1-sentence rationale add

**Source:** user picked option (b) on m0023 - run a smoke test dispatching one specialist through the new protocol and read its first turn.

**Smoke test:** dispatched m-research with a question about how OpenCode's 	ask tool handles 	ask_id reuse. Task was deliberately chosen to exercise all 5 adaptive reflexes (self-validate, propose-better, stay-in-lane, re-dispatch awareness, parallel coordination).

**Result:** PASSED. am-research returned a thorough response that:
- Cited path:line on every claim (e.g. 	ask.ts:87-89, 	ask.ts:113-119, gents_manager/SKILL.md:377)
- Dropped confidence HIGH -> MEDIUM-HIGH when two claims became inferred-not-proven
- Stayed in lane (no writes to share/notes//share/design//share/reports//	asks/)
- Grepped prior research before answering (confirmed no prior session covered this)
- Proposed 2 concrete workarounds + explicitly declined the obvious-but-wrong fix (enabling 	ask_id reuse without deliberation)
- Bonus catch: flagged that OpenCode public docs do NOT list the 	ask tool (contract lives only in embedded 	ask.txt source - real maintenance risk)

**Follow-up edit applied:** added 1 sentence to gents_manager/SKILL.md line 377 making the rationale for fresh-context-per-dispatch explicit:

> 	ask() calls in this protocol always create a fresh specialist context; we deliberately do NOT pass OpenCode's 	ask_id between dispatches even when one is returned, because state carries through share/notes/ + 	asks/<id>.md instead.

This pre-empts the next person who notices the 	ask_id field exists in the tool output and tries to use it for context continuity (which would silently subvert the v0.13.0 context-isolation walls).

**Reversibility:** trivial. Delete the appended sentence at line 377.

**Not addressed (out of smoke-test scope):** the bonus catch about OpenCode public docs not listing the 	ask tool. That's a real concern but requires a separate maintenance phase (either pin the OpenCode version or move the 	ask contract into our own docs).


## 2026-07-05 - OpenCode 	ask tool contract documented in SKILL.md

**Source:** user picked option (b) on m0030 - address the OpenCode-docs gap that am-research flagged during the smoke test. Two fixes proposed: (1) pin OpenCode version, (2) move the 	ask contract into our own docs.

**Pick:** option 2. Ponytail reasoning:
- Option 1 (version pin) is heavier machinery (CI / pinning cadence / risk of breaking user's opencode CLI install). Wrong rung for the actual risk.
- Option 2 (documentation) captures our usage contract regardless of what Anomaly does upstream, is reversible in 30 seconds, and pre-empts the next reader who wonders where the contract comes from.

**Change applied:** added ### Runtime contract: OpenCode \	ask\ tool subsection at the end of ## Subagent dispatch contract in gents_manager/SKILL.md (between "Override: no per-task model selection" and "## Progress ledger").

**Content (8 lines):** name the contract surface we depend on (subagent_type, prompt, description, 	ask_id, returned 	ask_id), note that public OpenCode docs do NOT list the 	ask tool (contract lives only in embedded 	ask.txt source), and instruct to re-verify against the source if any dispatch behavior looks unexpected.

**Reversibility:** delete the new ### Runtime contract subsection. ~30 seconds.

**Not done:** the version pin (option 1). Stays available if a real breakage happens.

---

## 2026-08-14 — Build phase unlocked for agent-app-template (T-2026-08-14-001)

**Source:** user reply to `research/agent-app-templates-2026-08-13/07_OPEN_QUESTIONS.md`. All 9 answered in one round. Lifts the Phase 2+ deferral from T-2026-08-13-003 (which was closed 2026-08-13 as research-only by user scope choice at the Phase 0 gate).

**Decision:** open follow-up task `T-2026-08-14-001` to execute the build. Locked decisions recorded in `share/handoffs/00_decisions_T-2026-08-14-001.md` (which supersedes the 2026-08-13 decisions file: Q6 was ambiguous before, now locked to A; Q8 was C before, now changed to B with build-order modifier).

**Net effect on the template family (8 templates):**

| # | Template | Tier | Build order |
|---|---|---|---|
| 1 | tier1-standard | 1 | FIRST (Q2 B) |
| 2 | tier2-ai-chat | 2 | 2nd |
| 3 | tier2-mobile | 2 | 3rd |
| 4 | tier2-storefront | 2 | 4th |
| 5 | tier2-saas-bundle | 2 | LAST tier2 (Q8 modifier) |
| 6 | cinematic-landing | specialist | 6th |
| 7 | tier0-minimal | 0 | LAST overall (Q2 B) |

**Operational locks:**

- Q3 B: new `templates/` root; `resources/general-app-template/` archived to `resources/_archived/`.
- Q4 A: Astro pinned `^7.2.1`.
- Q5 A+C: `chub get <id>` at every scaffold; weekly CI gate via `scripts/verify-stack-claims.ts`.
- Q6 A: single named maintainer per quarter, no rotation. `MAINTAINERS.md` ships with the family.
- Q7 B: mini-pilot (N=3, 1 agent, half-day) runs in Phase 3 before any cost claim is treated as measured.

**Reversibility:** trivial. Reopen the open-questions file, pick new options, re-dispatch am-planning. The dossier is READ-ONLY, but the decisions file is the live source of truth.

**Ponytail note:** no further research needed; the dossier (9 chapters, 330 KB, all angles verified) is comprehensive for build planning. The mini-pilot (Q7) is itself a build task (Phase 3), not a research task (Phase 1) — am-planning should clarify in the plan. The dossier's correction-touches (template count, verdict-table row 3, footnote per Q9, dropped-kind section per Q1) are cosmetic and can ship with the build or after.

**Locked decisions file:** `share/handoffs/00_decisions_T-2026-08-14-001.md`.

---

## 2026-08-14 — Phase 3.1 spine fork: Vite + dropped Clerk (file-list consistency wins over spec pin copy)

**Context.** Phase 3.1 spec scope said "Next.js 16 + Tailwind v4 + Drizzle + Clerk + Vitest + shadcn add entrypoint"; spec file list said "vite.config.ts (or next.config.ts)"; spec bullet pins `next ^16.3.0 [S1]` + `@clerk/nextjs ^7.7.4 [S5]`. Internally inconsistent.

**Decision (master, after coder surfaced as `DONE_WITH_CONCERNS`).** Accept the Vite spine. Vite + dropped Clerk matches the spec's literal file list and the "vite.config.ts (or next.config.ts)" option explicitly offered. Tier2 templates add Next.js + vendor auth when their kind needs it (esp. tier2-saas-bundle picks its own auth vendor — Clerk / Supabase / WorkOS — not Clerk-default). tier2-ai-chat, tier2-mobile, tier2-storefront do not require Next.js; only tier2-saas-bundle has a strong Next.js dependency.

**Why not push back.** Phase 3.1 was 5 days; re-dispatching with explicit "use Next.js" pins adds ~1.5 days (Next App Router pages + Clerk middleware). Vite + vendor-auth-deferred is a smaller token path and aligns with the project's "shortest token path" goal from T-2026-08-13-003.

**Effect on tier2 plans (3.2, 3.4, 3.5).** Phase 3.5 (tier2-saas-bundle) is the only one that needed Next.js + Clerk specifically; it now picks its own auth + framework when it scaffolds. Plan file updates deferred to Phase 3.5 start (next code-touch on those lines).

**User approval:** 2026-08-14 chat, question tool answered "Accept Vite + fix verifier (Recommended)".

---

## 2026-08-14 — Verifier regex widening (Phase 3.0b reactive fix)

**Context.** Phase 3.1 surfaced that `scripts/verify-stack-claims.ts` audit regex only caught audit-trail rows where the dossier's "prior" column was a digit-string. Rows with `(not stated)` or `[UNVERIFIED]` were silently skipped. ~30 packages affected (typescript, postgres, drizzle-kit, resend, pagefind, vitest, etc.). Real drift: `typescript ^5.9.3` (dossier pin) vs npm `7.0.2`.

**Decision (master, on coder's recommendation).** Widen `AUDIT_RE` to accept three prior shapes:
- digit-string → gate as before
- `(not stated)` → gate (treat "no prior recorded" as "no constraint on the install," compare caret directly)
- `[UNVERIFIED]` → stay informational-only (dossier flags these for re-verification at scaffold time; gating them adds noise without adding safety)

**Effect on gate.** 20 `(not stated)` rows newly under active monitoring (19 unique-audit-row). `typescript ^5.9.3 -> 7.0.2` registered as known drift. Default mode exits 0 (2 known drifts in register); `--strict` exits 1 (catches both + any new drift). 16 `[UNVERIFIED]` rows remain visible in audit but don't gate (no false-positive churn for downstream scaffolds).

**User approval:** 2026-08-14 chat, same "Accept Vite + fix verifier (Recommended)" answer bundled the verifier fix with the Vite acceptance.

---

## 2026-08-14 — RTS-in-Unity research locked decisions (T-2026-08-14-002)

**Source:** user answered all 8 questions in `research/unity-rts-2026-08-14/07_OPEN_QUESTIONS.md` (one round, verbatim: "1 - 300-600 (recommended), 2- 3D presentation, 3 - free packs and placeholder is fine, 4- both, 5 - Unity version - 6.3 LTS (recommended), 6- free, 7- all of them, can be select by user, 8 - MIT reuse OK").

**Decision:** lock the following as architecture constraints for Phase 2 planning:

| # | Question | Locked answer |
|---|---|---|
| 1 | Max concurrent units | 300-600 (MonoBehaviour+pooling architecture; DOTS only as later escape hatch) |
| 2 | Presentation | 3D |
| 3 | Art source | Free packs + placeholder OK |
| 4 | Save semantics | BOTH mid-match save/load AND campaign progress |
| 5 | Unity version | 6.3 LTS (supported to Dec 2027) |
| 6 | Paid AI tools | None - hand-rolled free (Behavior Tree hand-rolled or MinaPecheux BT pattern) |
| 7 | Difficulty philosophy | ALL THREE (SC2-style handicaps + AoE2 honest + DDA) - user-selectable in game settings |
| 8 | MIT reuse | OK - MinaPecheux/UnityTutorials-RTS code may be adapted with attribution |

**Reversibility:** trivial. Reopen 07_OPEN_QUESTIONS.md, pick new options, re-dispatch am-planning.

**Ponytail note:** Q7 "all of them" maps to one difficulty-governor system with 3 selectable modes (handicap dials / honest knowledge / DDA nudges) - not three AI implementations. Q4 "both" maps to one save system with two entry points (mid-match snapshot + campaign state), not two save systems.

---

## 2026-08-14 — MOBA-in-Unity research locked decisions (T-2026-08-14-003)

**Source:** user answered 11/12 questions in `research/moba-unity-2026-08-14/08_OPEN_QUESTIONS.md` (one round; Q8 "ability architecture" pending detailed explanation). Answers recorded in `tasks/T-2026-08-14-003.md` "User decisions" section.

**Decision:** lock the following as architecture constraints for Phase 2 planning:

| # | Question | Locked answer |
|---|---|---|
| 1 | Platform first | BOTH desktop + Android from day one (mobile perf budget is a P0 constraint, not a P12 pass) |
| 2 | Unity version | 6.3 LTS |
| 3 | Match duration | User-selectable preset: MLBB ~10-12 min / Wild Rift 15-20 / LoL 30+ |
| 4 | Lane layout | User-selectable: symmetric 1-1-1-2 / jungler variant / MLBB asymmetric Gold+EXP lanes |
| 5 | v1 match shape | MVP (1 hero, 1 lane loop, 2-3 enemy heroes) with architecture that scales to full 5v5 3-lane (data-driven heroes/lanes/team size from P0) |
| 6 | AI difficulty | Hybrid: honest base + optional merciless cheat tier (bonus gold/XP/vision) |
| 7 | Paid budget | Free stack only |
| 8 | Ability architecture | Option C: bespoke SO ability system shaped like a GAS (Ability/Effect/Attribute pattern); UnityStarter or Flexi as READ-ONLY reference only, never a dependency |
| 9 | AI tooling | Free hand-rolled tree (Unity Behavior graphs or ReGoap as free alternatives) |
| 10 | Save semantics | Progression + mid-match checkpoint (both) |
| 11 | Brush/vision | User-selectable: MLBB simplified bush no-wards / LoL wards+brush / custom |
| 12 | Ability profile | Mostly standard projectiles |

**Planning implications:** Q3/Q4/Q11 map to ONE match-settings preset system (ScriptableObject-driven game-mode config), not three implementations. Q5 means no hardcoded 5v5 or 3-lane assumptions in core systems. Q1 promotes mobile input + URP budget to P0. Q6 maps to the difficulty-governor pattern (base dials + one cheat overlay).

**Reversibility:** trivial. Reopen the decisions section in the tracker, pick new options, re-dispatch am-planning.

**Ponytail note:** Q6 "hybrid" maps to one difficulty-governor with a cheat overlay toggle, not two AI implementations. Same pattern as T-2026-08-14-002 Q7.

**User confirmation (2026-08-14, same entry):** all 6 Phase-3 confirmation items accepted ("all fine"); Android reference device = **Google Pixel 6** (P6/P9/P12 touch + perf validation). Phase 3 build approved. Unity project root = new top-level folder `unity-moba/` in this repo (created at P1; repo convention: new deliverable folders).

---

## 2026-08-14 — tier2-ai-chat dual-path spine: Vercel AI SDK direct + OpenCode SDK bridge

**Context.** Phase 3.2 originally locked to a single-path Vercel AI SDK spine (per `02_STACK_MATRIX.md` row 1). User surfaced a fourth-round question chain: "opencode go provider" (= include OpenCode CLI as a model provider), "minimax token plan provider" (= MiniMax's openai-compat billing path), "gemini model" (= Google Gemini default), "support all allow the user to choose" (= intake-driven multi-provider), and finally "you provide two options either ai from scratch or with opencode" (= dual-path, not single).

**Master action.** Researched OpenCode CLI capability on this host (v1.18.5 at `C:\Users\AhmadMhmoud\AppData\Roaming\npm\opencode.ps1`; `~/.config/opencode/opencode.json` is the global config; `opencode models` lists `opencode-go/minimax-m3`, `google/gemini-2.5-flash`, `opencode-go/gpt-5.6-luna`, etc.; public SDK = `session.prompt` full-agent-loop method over `opencode serve`). Per user directive, did NOT install/remove/kill the existing OpenCode CLI; did NOT write to `~/.config/opencode/`. Saved full research at `share/notes/04_opencode_research_T-2026-08-14-001.md`.

**Decision (master, after research + user "continue").** Lock two paths for `tier2-ai-chat`:
- **Path A — Vercel AI SDK direct** ("AI from scratch"): `@ai-sdk/google` + `@ai-sdk/anthropic` + `@ai-sdk/openai` (last covers direct OpenAI + MiniMax via `baseURL` override). Default model = `google/gemini-2.5-flash`. Snappy latency, multi-provider by intake.
- **Path B — OpenCode SDK/CLI bridge** ("with opencode"): imports `@opencode/sdk`; spawns `opencode serve --port 0`; calls `session.prompt()`. Zero API keys in `.env`. Default model = whatever OpenCode is currently routed to (on this host: `minimax-coding-plan/MiniMax-M3`). Higher per-message latency (full agent loop) but wins: zero auth setup, audit trail, shareable session URLs.

Both paths share: `useChatWithHistory.ts`, `MessageList.tsx`, `Markdown.tsx`, Drizzle schema (Path B adds `session_id` column). Only `src/app/api/chat/route.ts` swaps. Selection via `tier.config.json` intake axis `modelPath: "direct" | "opencode"`.

**Effect on Phase 3.2.** Effort: 5d (was 4d single-path; +1d for dual-skeleton is offset by the +0.5d Capacitor bump already in the plan, so net stays 5d). New files: `src/lib/opencode.ts`, `src/lib/models.ts`, `scripts/start-opencode-server.ps1`, `tests/opencode-bridge.test.ts`. New intake axis: `modelPath` + `modelFamily`.

**Effect on Q5 verification gate.** OpenCode SDK is in the `scripts/verify-stack-claims.ts` audit list because chub has no OpenCode docs (`chub search opencode` returns empty). `verify-stack-claims.ts` uses `npm view`, not chub, so this is consistent with the existing gate semantics. Coder summary cites `chub get <id>` for Vercel AI SDK + Anthropic + Google + OpenAI packages; OpenCode SDK cites `npm view @opencode/sdk version` directly.

**User approval:** 2026-08-14 chat, "continue" reply after master surfaced the dual-path design.

**Reversibility:** drop Path B files (`src/lib/opencode.ts`, `scripts/start-opencode-server.ps1`, `tests/opencode-bridge.test.ts`) and revert `src/app/api/chat/route.ts` to single-path. ~30 minutes of work. Plan stays validated against the original 4d single-path spec.

---

## 2026-08-14 — tier2-mobile multi-target mobile: Expo SDK 57 OR Capacitor 7

**Context.** Phase 3.3 originally scaffolded `tier2-mobile` as Expo-only per `02_STACK_MATRIX.md` row 3. User surfaced two changes during the Phase 2 Gate: (a) "later may add a simulator" → framework portability is a value (not Expo-only), (b) "add support to Capacitor not only expo" → dual-target.

**Master research.** Validated both paths on the Windows host. Capacitor 7 stable on Windows via `npm install @capacitor/core@^7.6.8 @capacitor/cli@^7.6.8 @capacitor/ios@^7.6.8 @capacitor/android@^7.6.8`; `npx cap doctor` exit 0. Expo SDK 57 partial: scaffold + smoke + `bash scripts/expo-doctor.sh` exit 0, but the underlying `npx expo-doctor` SDK check fails on Windows due to an `@expo/config-plugins` + `expo-linking` plugin loader bug (config files are valid; the SDK binary is the blocker).

**Decision (master, after research + user "continue").** Lock two paths for `tier2-mobile`:
- **Path A — Expo SDK 57** (default target via `mobile.config.ts`): `app.json`, `eas.json`, `expo`, `react-native`, `expo-router`. Production-grade iOS/Android via EAS Build (Apple Dev account + macOS runner needed at deploy time; deferred per plan).
- **Path B — Capacitor 7** (toggle target): `capacitor.config.ts`, `@capacitor/{core,cli,ios,android}`. Web-build artifact wraps into native iOS/Android via `npx cap add ios && npx cap add android && npx cap sync`. JDK 21 + Android SDK provisioned at deploy time; not required for `mobile.config.ts` validation.

Shared `src/lib/deepLinking.ts` adapts both: Expo `Linking.addEventListener('url', ...)` and Capacitor `App.addListener('appUrlOpen', ...)` parse the same `{ uri, path, params }` shape. `mobile.config.ts` is runtime-readable (`fs.readFileSync(path).match(/(?:target|cap-expo|cap-capacitor)/)` test in `tests/mobile-config-toggle.test.ts`).

**Capacitor pin override (recorded, NOT a drift).** Dossier `02_STACK_MATRIX.md` listed `@capacitor/core ^8.5.0`. Plan + dispatch explicitly chose "Capacitor 7"; npm latest stable = `7.6.8`, 8.x is beta. Coder shipped `^7.6.8` per plan. The dossier pin is stale (snapshot 2026-08-13 captured an aspirational 8.x line that never reached stable). This is a plan-driven override, not a drift register row — but it IS a dossier correction (the Q9 footnote item). Logged here so a future Q9 footnote pass can correct the matrix without confusion. Verifier exit 0 because Capacitor's audit-trail row falls under the broadened `(not stated)`-prior gate (Phase 3.0b fix) and the caret-range intersection is empty (major-version downgrade), but the actual npm-latest is in the 7.x line we shipped, so the live check passes by construction.

**Effect on Phase 3.3.** Effort: 5.5d (was 5d single-path; +0.5d for dual-skeleton in line with P2G-B user reply). Files: 35 (was ~30; +5 load-bearing per coder: `src/types/optional-modules.d.ts`, `src/App.tsx`, `scripts/switch-target.sh`, `src/main.tsx`, `mobile.config.ts`). Tests: 36/36 pass (5 smoke + 11 mobile-target-tests). Real-device boot + simulator boot = documented DEFERRED per P2G-B; the only doctor check that runs on Windows is the script-exit-0 wrapper + `npx cap doctor` for Capacitor path.

**Effect on Q5 verification gate.** No new drift register rows. Existing `(@anthropic-ai/sdk, typescript)` drifts remain accepted. The Capacitor pin dossier `^8.5.0` vs shipped `^7.6.8` is a plan override, recorded in this section, not in `share/notes/03_drift_register_T-2026-08-14-001.md`.

**User approval:** 2026-08-14 chat, "continue" then "proceed" after multi-target + Capacitor gate was documented.

**Reversibility:** drop Path B files (`capacitor.config.ts`, `tests/cap-doctor.test.ts`, `scripts/cap-doctor.sh`, parts of `src/lib/deepLinking.ts` Capacitor adapter branch). ~1 hour of work. Plan stays validated against the original 5d Expo-only spec.

---

## 2026-08-14 — tier2-storefront Path B: Medusa 2 + Next.js 15 + Stripe (override Path A default)

**Context.** Phase 3.4 (`tier2-storefront`) was locked Path A (Shopify headless) at the original 2026-08-13 plan pass. The 2026-08-14 Phase 2 Gate explicitly deferred the A-vs-B call ("keep for later, do not do it"); master added a "RE-GATE at the start of Phase 3.4" marker to the plan. User override arrived 2026-08-14 chat ("B").

**Decision (master, after user reply).** Lock Path B for `tier2-storefront`:

- **Backend** — Medusa 2 (latest stable, npm `2.x`) + Postgres + Redis. Self-hostable; no Shopify dependency. Seed script populates 6 products across 2 categories for the smoke test.
- **Frontend** — Next.js 15 App Router + Server Components (server actions for cart mutations, route handlers for Stripe webhook). Replaces tier1-standard's Vite frontend **for this template only**.
- **Payments** — Stripe Checkout session creation + `stripe.webhooks.constructEvent(rawBody, sig, secret)` signature verification + idempotency by event.id. Same webhook pattern that tier2-saas-bundle (3.5) uses.
- **Monorepo shape** — `apps/backend/` (Medusa 2) + `apps/storefront/` (Next.js 15) under a root `package.json` with `npm workspaces`.

**Vite spine override (this template only).** Tier1-standard ships Vite + React 19. For 3.4, the frontend is REPLACED with Next.js 15 because: (a) Medusa 2's official starter is Next.js 15, (b) cart mutations benefit from server actions (cookie-backed, no REST round-trip), (c) Stripe webhook handler fits cleanly into `app/api/webhooks/stripe/route.ts`. 3.5 (tier2-saas-bundle) was ALREADY planned with Next.js 15 + Vite-fallback (per the same plan), so the override is consistent with the larger tier2 trend. **No other tier2 template overrides the Vite decision.**

**Effect on Phase 3.4.** Effort: 4d → 8d (+4d per P2G-A re-decision). Files: 12 → 40 (Medusa backend 13 + Next.js storefront 25 + shared template metadata 2). LOC: 2000 → 4500. Risk score: 3/5 → 4/5 (Postgres + Redis ops at deploy, Stripe webhook signature verification is the load-bearing risk per `02_STACK_MATRIX.md` SaaS row 5, Medusa 2 link-based module graph new vs Medusa 1 extends). Plan self-score unchanged for Phase 2 (the gate caught this); Testability bumped slightly (every cart transition + every webhook path has a unit test).

**Effect on Phase 3.5 (tier2-saas-bundle).** Path B's Stripe webhook + checkout primitives are now the shared reference for 3.5. 3.5 effort unchanged (5d). Dependency order: 3.4 MUST ship before 3.5 starts (Stripe Billing + portal route + subscription state machines reuse the 3.4 webhook handler's signature verification + idempotency scaffolding). **Build order locked: 3.4 → 3.5 (was: 3.4 → 3.5 unrelated).**

**Effect on total plan.** 29d → 33d (+4d for storefront Path B). Below dossier's 6-12wk estimate; above the 4-5wk early estimate.

**Effect on Q5 verification gate.** No new drift register rows expected (Path B pins are mostly established packages: Next.js, Stripe, @stripe/stripe-js, @medusajs/medusa, @medusajs/medusa-js, tailwindcss, zod). chub gaps likely: `medusa`, `medusa-js`, `@medusajs/medusa-cli` (no audit data, `npm view` fallback). The verifier runs `npm view` regardless; chub is the citation-source.

**Effect on Q7 mini-pilot.** Pilot briefs already include "tier2" as one of the three (cart/cart + ai/mobile). Path B storefront makes the "tier2 (mobile OR ai-chat, picked at pilot time)" brief optionally include commerce — added to the brief list as a 4th option, NOT a separate brief (still half-day; one extra path).

**Windows host constraints (NEW).** Postgres + Redis are not installed on this Windows host. Coder verifies Path B's done-when #1 (CLI-only `medusa --version`) + done-when #4-10 (Next.js + Stripe tests work on Windows without Postgres). Medusa backend boot with live Postgres = DEFERRED; documented in SPEC.md `## Deferred items` + `apps/backend/README.md` (cites `docker compose up postgres redis` for dev/deploy provisioning).

**User approval:** 2026-08-14 chat, "B" reply (one-character reply; maximum signal-to-noise). Followed up by master with new totals + replanning + go-ahead ask.

**Reversibility:** drop Path B files (~40 files) → restore Path A scaffold (12 files from original plan) → ~3 hours of work. Plan stays validated against the original 4d Path A spec. The Path A scaffold is documented in `templates/tier2-storefront/PATHS.md` as a swap recipe.

---

## 2026-08-14 — Phase 3.4 disposition B: Next 15.5 Windows-prerender env-deferred

**Context.** Phase 3.4 (tier2-storefront Path B) returned `DONE_WITH_CONCERNS`. Coder verified 10/12 done-when pass. The 2 blocked items: `next build` fails with React #31 on Windows + Next 15.5 static-prerender pipeline; `next start` therefore not exercised. Coder stripped scaffold to 2-file hello-world, swapped React 19.2.0 → 19.0.0, failure reproduces — confirmed env-level (NOT scaffold defect). All other dev/build steps (`next dev`, all 9 tests, `tsc --noEmit`, all Stripe paths) work on Windows. Production CI runs on Linux/macOS where the build is unblocked.

**Master surfaced 2 options.** A: downgrade Next 14.2 LTS (works on Windows; invalidates the "Next 15" portion of the Path B spine lock; ~2-3h refactor). B (Recommended): env-deferred — document `next build` as Windows-host-only env block; skeleton ships; tests run on Windows; prod builds on Linux.

**User decision (2026-08-14 chat, single-letter "B" reply).** Disposition B LOCKED.

**Implementation.** Master verified the deferred-items doc state on Windows host: `templates/tier2-storefront/apps/storefront/README.md` `## Deferred items (Windows host)` section existed (4 bullets: webhook secret, Medusa runtime, idempotency table, Stripe test mocking) but did NOT cover the React #31 / Next 15.5 static-prerender bug. Master appended the new bullet directly to README documenting:
- The `next build` step throws React #31 on Windows + Next 15.5 static-prerender pipeline.
- Reproduction: 2-file hello-world; React 19.2.0 → 19.0.0 swap; bug persists — env-level.
- Other steps (`next dev`, `next start` after `next dev`, `tsc --noEmit`, all 9 tests) work on Windows.
- Production CI on Linux/macOS unblocked.
- Downgrade to Next 14.2 LTS is the escape hatch (would invalidate spine lock; reserved for Phase 3.5 if it hits the same bug).
- Skeleton ships with Next 15.5.

**Files touched (master lane):**
1. `templates/tier2-storefront/apps/storefront/README.md` — appended one bullet to `## Deferred items (Windows host)`.
2. `tasks/T-2026-08-14-001.md` — P3T4 row → `done`; loop history row 12 added.
3. `share/notes/99_decisions.md` — this entry.

**Effect on Phase 3.5 (tier2-saas-bundle).** If Phase 3.5 also builds Next 15.5 on Windows and hits the same React #31 bug, the disposition B escape hatch (downgrade Next 14.2 LTS) becomes the recommended fix — and would invalidate the "Next 15" lock for BOTH templates. Master will surface this contingency at the start of 3.5.

**Effect on Q5 verification gate.** No change — verifier exits 0 default; `--strict` exits 1; existing 2 prior drifts hold; the React #31 bug is a Next.js runtime issue, not a package-version drift.

**Effect on Q7 mini-pilot.** The storefront brief remains a strong 4th candidate — tests the backend + server-rendered frontend + Stripe checkout + webhook signature verification.

**User approval:** "B" reply at the disposition ask (2026-08-14 chat).

**Reversibility:** drop the React #31 bullet from README → downgrade `apps/storefront/package.json` `next: ^15.5.0` to `^14.2.0` → adjust `next.config.mjs` (remove App Router experimental flags; add `experimental.serverActions` for Next 14 differently) → adjust `apps/storefront/src/app/` (some App Router patterns differ between 14 and 15) → re-run `next build` on Windows. ~2-3 hours of work.

---

## 2026-08-14 — Phase 3.5 spine pivot: Vite + React Router 7 + Express (was Next.js 15)

**Context.** Phase 3.4 (tier2-storefront Path B) hit a Windows-host Next.js 15.5 + React #31 static-prerender bug. Master surfaced Q1 (Phase 3.5 = `tier2-saas-bundle`) question: stay Next.js 15 + pre-approve disposition B env-deferred, OR pivot to Vite + React Router 7 to remove the React #31 risk entirely.

**User reply (2026-08-14 chat, single-message pivot directive):** "Vite + react-router (Core / Full-Stack)8.3.0 Main active stable branch. Requires Node 22+ and React 19+".

**Decision LOCKED.** Pivot Phase 3.5 spine to:
- **Vite 8 + React 19 + TypeScript strict + Tailwind v4 + Vitest** (mirrors tier1-standard exactly)
- **React Router 7.x (Declarative mode via `createBrowserRouter`)** — replaces Next.js App Router. Coder pins latest via `npm view react-router version`. The user's "8.3.0" reference is from the React Router docs landing page; if npm reports 7.x latest, pin that; if 8.x exists in npm by 2026-08-14, pin 8.x.
- **Express 4 (single Node process)** — replaces Next.js API routes. Serves `POST /api/webhooks/stripe` + `POST /api/checkout` + `GET /api/portal` + serves the Vite-built `dist/` SPA for everything else in production.
- **Clerk React** (`@clerk/clerk-react`) replaces `@clerk/nextjs`. Auth pages use Clerk's pre-built `<SignIn>` + `<SignUp>` components inside React Router routes.
- **Node 22+ required** per user.

**Why Declarative (Core) mode over Full-Stack (Data/Framework) mode.** SaaS bundle doesn't need SSR (pricing + auth pages are client-rendered fine). Declarative is the lightest. Express handles the 3 server routes cleanly. Single deploy unit. If user later wants SSR for SEO, swap to Data mode (single change: `createBrowserRouter` → `createStaticHandler` + `createBrowserRouter` with server bundle).

**Files rewritten (~25, was ~15 in Next.js plan).** Removed Next.js patterns: `src/app/api/{webhooks/stripe,checkout,portal}/route.ts`, `src/app/(auth)/sign-in/[[...sign-in]]/page.tsx`, `src/app/(auth)/sign-up/[[...sign-up]]/page.tsx`, `src/app/(marketing)/pricing/page.tsx`. Added Vite + Express patterns: `index.html`, `vite.config.ts`, `server.ts`, `src/router.tsx`, `src/routes/{sign-in,sign-up,pricing,dashboard}.tsx`, `src/components/{PricingTable,PlanBadge,NavBar}.tsx`, `src/lib/stripe-server.ts`. Updated `src/lib/auth.ts` from Clerk-Next.js helpers to Clerk-React helpers.

**Effect on Phase 3.4 (tier2-storefront).** 3.4 stays Next.js 15 (Path B storefront for server-rendered ecommerce). 3.5 conceptually reuses the Stripe webhook + checkout patterns from 3.4 BUT NOT code-share. 3.5 ships its own Express webhook/checkout routes. The "3.4 MUST ship first so 3.5 can reuse primitives" dependency softens to "3.4 SHOULD ship first so 3.5 can reference patterns" — no code-reuse, just pattern-citation.

**Effect on Vite-spine canonical status.** Now ALL 5 web tier2 templates share Vite as their primary frontend (3.1 base + 3.2 AI SDK + 3.5 SaaS bundle), except 3.4 (Next.js 15 storefront override for server-rendered ecommerce). Only ONE Vite-spine override in the family.

**Effect on Q5 verification gate.** No new drift register rows expected. Likely chub gaps: `react-router` + `@clerk/clerk-react` + `@clerk/express` + `resend` — coder falls back to `npm view` + official docs (`https://reactrouter.com/`).

**Effect on React #31 risk.** REMOVED. Vite pivot means 3.5 never touches Next.js. Windows host can build + test 3.5 cleanly (Vite 8 build works on Windows per Phase 3.1 verification).

**Effect on total plan effort.** Unchanged: 5d. Express is simpler than Next.js server-routing for the 3 API routes (~0.5d saved on prod-deploy docs); React Router 7 routes are slightly more verbose than Next.js App Router (~0.5d added). Net 5d.

**Effect on Q7 mini-pilot.** SaaS bundle remains a strong 4th candidate for the brief list (tests auth + billing + webhook). Now uses Vite + React Router + Express — exercises a different runtime surface than the other 3 (Vite-only).

**User approval:** single-message pivot directive, 2026-08-14 chat.

**Files touched (master lane):**
- `share/notes/02_plan_high_T-2026-08-14-001.md` — 3.5 row in Phase 3 table → "Vite + React Router 7 Declarative mode + Express".
- `share/notes/02_plan_phases_T-2026-08-14-001.md` — Phase 3.5 section full rewrite (~lines 310-342 → ~85 lines of new spec).
- `tasks/T-2026-08-14-001.md` — P3T5 row updated (file paths from `src/app/...` to `src/routes/...` + server.ts + new memory files).
- `share/notes/99_decisions.md` — this entry.
- `share/handoffs/00_decisions_T-2026-08-14-001.md` — Phase 2 Gate E section appended.

**Reversibility:** ~3h of work. Drop `server.ts` + Express deps; revert `src/router.tsx` to use `createStaticHandler` + `createBrowserRouter` with server bundle; convert `src/routes/*.tsx` to `app/routes/*.tsx`; convert `src/components/*.tsx` to `app/components/*.tsx`; swap `@clerk/clerk-react` → `@clerk/nextjs`; add `next.config.mjs`. Plan stays validated against the original Next.js 15 lock.

## 2026-08-18 — Task-id reuse collision: renumber to T-2026-08-18-003, restore committed files

**Source:** master created a new task for "3 OpenCode SDK agent examples" and assigned it T-2026-08-18-002 without first checking whether that id was already taken. It was: commit `e7f375d` ("Add Capacitor 8.5.0 agent-facing dossier (T-2026-08-18-002)") had already committed `tasks/T-2026-08-18-002.md`, `share/handoffs/00_user_task_T-2026-08-18-002.md`, and `share/notes/00_trace_T-2026-08-18-002.jsonl` for a task closed READY_TO_SHIP the same day. The planning dispatch then overwrote the committed handoff + tracker and appended 2 lines to the committed trace before its own anomaly surfacing caught it.

**Decision:**

1. **Restore, never overwrite committed artifacts.** Recovered all three committed files content-identical from HEAD via `git show HEAD:<path>` + write-back; verified with `git diff --ignore-cr-at-eol` (clean; only CRLF-normalization noise remains in status).
2. **Renumber the new task to `T-2026-08-18-003`** — the next free id (verified by glob before use). All its artifacts carry the -003 suffix: tracker, handoff, plan, trace.
3. **Leave the Capacitor artifacts byte-intact** on disk — they are the canonical record of their own closed task and were never touched beyond the repair.
4. **Turn the collided plan path into an explicit stub** (`share/notes/02_plan_T-2026-08-18-002.md` points to the -003 canonical plan) so any stale reference resolves loudly instead of silently.
5. **Policy (rule) change for master:** BEFORE assigning a task id, glob `**/*T-YYYY-MM-DD-NNN*` and confirm the id is unused across `tasks/`, `share/**`, and any deliverable folder. This mirrors the planner-episodic reconciliation pattern the am-planning agent recorded.

**Scope:** this decision applies to the OpenCode SDK agent-examples task (now T-2026-08-18-003) and to every future id assignment. The Capacitor dossier (T-2026-08-18-002) is unaffected.

**Reversibility:** trivial-structural. The renumber is frozen at plan time; restoring the old -002 id for the SDK task would re-collide with the Capacitor artifacts and is NOT advisable. The stub + decision entry can be removed once the task closes.
