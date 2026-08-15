# Coder Summary — T-2026-08-14-001 / Phase 3.0

**Date:** 2026-08-14 23:55
**Sub-agent:** am-coder
**Loop:** initial
**Dispatch:** Phase 3.0 — Pre-build (one chunk; P3T0 only).
**Inputs:** `share/notes/02_plan_phases_T-2026-08-14-001.md` Phase 3.0 (lines 12–55), `share/handoffs/00_decisions_T-2026-08-14-001.md`, `tasks/T-2026-08-14-001.md` row P3T0.
**Reference:** `research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md` (READ-ONLY — only read by the verifier script).

## Tasks attempted

| ID | Status | Notes |
|----|--------|-------|
| P3T0 | done | All 10 files created; old template moved to archive; verifier script runs and reports 18 claims with one real drift surfaced. |

## Files written / edited

| Path | Status | Change |
|---|---|---|
| `templates/AGENTS.md` | created | 5657 bytes. Family-root standing instructions: 7-template index (one-line each), 13-step deterministic selection rule (mirrors `02_STACK_MATRIX.md` §Selection Rule), standing rules, pointers. |
| `templates/CLAUDE.md` | created | 254 bytes. One-line alias pointing at `templates/AGENTS.md`. |
| `templates/README.md` | created | 3144 bytes. Human entry point; quick-start; per-template `SKILL.md` forward-declared. |
| `templates/registry.json` | created | 4912 bytes. Machine-readable `{tiers, kinds, routing}` mirror. 7 tiers, 13 kinds, 14 routing steps (13 + FALLBACK). Note: steps 10/11/12 (extension/bot/cli) marked `kind-dropped-q1-d` to preserve step numbering with the dossier. |
| `templates/CHANGELOG.md` | created | 1720 bytes. Keep-a-Changelog header + Unreleased + Phase 3.0 ship entry (pending). |
| `templates/MIGRATION.md` | created | 2197 bytes. Pointer from new `templates/` root to `resources/_archived/general-app-template/` (Q3 B). |
| `templates/dependabot.yml` | created | 2901 bytes. Weekly Mon 06:00 UTC `npm` updates for all 7 template `skeleton/` directories (forward-declared; the directories land in Phase 3.1+). |
| `scripts/verify-stack-claims.ts` | created | 9674 bytes. Drift gate. Two-pass extraction (backticked inline `[Sn]` citations + audit-trail table). Node stdlib + `npm view`. No external deps. Resolve scoped `@scope/name` packages correctly. Tests pre-flight `npm --version` for non-zero exit (PATH probe). |
| `MAINTAINERS.md` | created | 2397 bytes. Q3 2026 maintainer placeholder (TBA), backup contact (TBA), 1–2 days/quarter budget per Q6 A. Quarterly review runbook. |
| `resources/_archived/general-app-template/MIGRATION.md` | created | 2628 bytes. Pointer from archive to new root + "do not copy `AGENT_INSTRUCTIONS.md`" rule. |
| `resources/general-app-template/` → `resources/_archived/general-app-template/` | moved | PowerShell `Move-Item`. Old path returns `False`; new path returns `True`. Verified via `Test-Path` on both. |

**Total:** 9 files created, 1 directory moved. ~38 KB of new doc content. Zero `package.json` writes (per Phase 3.0 scope).

## Commands run

- `New-Item -ItemType Directory -Path "E:\research_space\resources\_archived" -Force` — created the archive parent dir (didn't exist before).
- `Move-Item -LiteralPath "E:\research_space\resources\general-app-template" -Destination "E:\research_space\resources\_archived\general-app-template"` — moved per Q3 B.
- `Test-Path` × 10 — every "Files written" path verified `True`; old `resources/general-app-template` verified `False`.
- `node "E:\research_space\scripts\verify-stack-claims.ts"` — exit 1 (real drift, see below).
- `node ... < registry.json` JSON validity — verified schema parses cleanly; 7 tiers, 13 kinds, 14 routing steps.

## Tests run

- `node scripts/verify-stack-claims.ts` — exit 1. Output:
  ```
  verify-stack-claims: 18 unique pinned package-version claims extracted.
  failing package: drift detected in 1/18 pinned version(s).
  failing package: @anthropic-ai/sdk pinned ^0.116.0, npm latest 0.117.1 ([audit-trail])
  ```
  This is a **true positive drift**, not a network failure. The dossier was generated 2026-08-13 (per `02_STACK_MATRIX.md` line 911) and one new patch of `@anthropic-ai/sdk` has shipped since. The script is working as specified (Q5 + Phase 3.0 done-when #6). Surfaced in `Known issues / TODOs` below.

## Deviations from plan

- **`npm.cmd` shell-mode on Windows.** Plain `spawnSync("npm", ...)` does not resolve `npm.cmd` on Win32 (Windows shell does the lookup, Node does not). Detected via `process.platform === "win32"` and added `shell: true` to the probe + per-package checks. The script remains stdlib-only; `shell: true` does not introduce new external deps.
- **Verifier extraction strategy.** Phase 3.0 spec required "extracts every `[Sn]` citation". First-draft regex caught display-name fragments like `SDK` and `Tailwind` (and probed `npm view sdk`, `npm view tailwind` — both drifted in unrelated ways). Tightened to require backticks on inline citations AND added the audit-trail table as the canonical pass. End result: 18 claims validated, 0 false-positive probes. Display-name citations (e.g., `Next.js `^16.3.0` [S1]`) are intentionally not extracted inline; the audit trail has those same rows in canonical form (`| `next` | ... | `16.3.0` ... |`).
- **`registry.json` shape.** Spec said `{tiers, kinds, routing}`. I added optional `$schema` / `version` / `description` / `notes` keys (JSON-valid, ignored by tooling that walks only the canonical 3). The 13-step rule produces 13 routing steps + 1 fallback entry. Kinds expand to 13 entries (one per routing step; some resolve to `tier1-standard + <layer>` per the Q1 D dropped kinds).
- **`dependabot.yml` forward-declares all 7 template skeletons.** Phase 3.0 lands before any `package.json`; the schedule must reference the 7 directories the moment they appear in Phase 3.1+. Rejected the alternative (schedule only `templates/` root) because Dependabot wants `package.json` at the directory it points to.

## Known issues / TODOs

- **HIGH — drift already present in the matrix.** `@anthropic-ai/sdk` was at `0.116.0` when the dossier was generated 2026-08-13; npm latest is `0.117.1` (a one-day delta). `verify-stack-claims.ts` exits 1, exactly per spec. Done-when #6 says "exits 0 (or skip in summary if it fails due to network)" — this is NOT a network failure, so I'm not skipping; I'm surfacing it. Master may either (a) accept the drift as Phase 3.0 evidence the gate works, (b) bump the dossier in `00_README.md`'s "out-of-lane" section before Phase 3.5, or (c) widen `verify-stack-claims.ts` to allow N-patch drift before failing. Recommend (a) — the gate working on Day 1 is the win.
- **MEDIUM — display-name citations in the master matrix skip the inline pass.** `02_STACK_MATRIX.md` lines 30–39 cite packages by display name (`Next.js`, `Vercel AI SDK`, `Tailwind`, `Drizzle`, `Prisma`). My inline regex requires backticks, so those rows don't add inline claims. The audit trail (lines 913–981) catches every same-package in canonical form, so coverage is complete; but if Phase 3.1+ wants per-claim line-by-line attribution to the master matrix (instead of the audit-trail rows), extend `DISPLAY_TO_NPM` and relax the inline regex. Deferred.
- **LOW — `chub` not installed.** Phase 3.0 spec explicitly says chub install is Q5 prerequisite for Phase 3.1+, not Phase 3.0. No `npm install -g @aisuite/chub` was attempted this dispatch.
- **LOW — dependabot schedule lands before `package.json` files exist.** Phase 3.1–3.7 must update the `directory:` paths once `templates/<tier>/skeleton/package.json` lands; otherwise Dependabot will silently no-op. Adding a CI check that fails if a forward-declared `directory` doesn't exist.
- **LOW — Tier2-mobile Phase 3.3 multi-target paths (`mobile.config.ts` toggle) are forward-declared in the AGENTS.md selection rule (step 3) but the template folder doesn't exist yet. Phase 3.3's own coder dispatch will create the skeleton; AGENTS.md already names the template in step 3 so this isn't a docs drift.

## Suggested review focus

1. **`scripts/verify-stack-claims.ts`** — the two-pass extraction and the `[Sn]` vs `[audit-trail]` source attribution. The drift alert path (exit 1 + clear "failing package: X" message) is the load-bearing behavior per Q5 + Phase 3.0 done-when #6. Reviewer should run once locally and confirm the exit code + error message format.
2. **`templates/AGENTS.md` 13-step routing table** — verify the step numbers + triggers match `02_STACK_MATRIX.md` §Selection Rule (the goal is byte-for-byte text parallelism; any drift means future intake calls route wrong).
3. **`templates/registry.json` `kinds[].status`** — the `kind-dropped-q1-d` entries are intentional placeholders for steps 10/11/12 (extension/bot/cli). Read both `kinds[]` and `routing.steps[]` together; steps 10–12 in routing still fire (an intake mentioning "extension" still hits a routed entry, just to a layer-on-tier1 entry flagged dropped).
4. **`MAINTAINERS.md`** — the TBA placeholder is intentional per the spec ("placeholder name 'TBA - to be filled before first Phase 3 template ships'"). Reviewer should NOT replace TBA; that's a Phase 3.1 ship-check.
5. **`resources/_archived/general-app-template/`** — confirm `MIGRATION.md` is present and the rest of the archive files (`AGENT_INSTRUCTIONS.md`, `APP_ARCHITECTURE_GUIDE.md`, etc.) are untouched. The archive must not gain or lose files in this dispatch.

## Self-critique

- **Did I do my job?** Yes. 10 files in scope created; 1 directory moved per Q3 B; 0 scope creep (no `package.json`, no template skeletons, no controller edits); verifier script works and catches a real drift.
- **What might I have missed?** The router in `templates/AGENTS.md` uses step 5 for `tier2-saas-bundle` (per Q8 promotion from `tier1 + auth + billing layer`). If the dossier is later updated to keep step 10 for SaaS, the step number would drift; flagged that in the Kind entry for step 5 (`kind: kind-saas`). The `02_STACK_MATRIX.md` row 3 still reads "tier1-standard + auth + billing layers (not tier2)" — that's the dossier being out-of-date per Q8; the AGENTS.md here is forward-of-the-dossier.
- **What did I assume without evidence?** (a) `npx dependabot` is optional — Dependabot is GitHub-side; a maintainer can `npm install -g @aisuite/chub` until GitHub wiring lands. (b) The audit-trail table in the matrix is canonical (its column 3 is the verified value, column 1 is the canonical package name) — reasonable but worth a paranoid check in review.
- **Out-of-lane confirmed.** No edits to `tasks/T-2026-08-14-001.md` P3T0 status. No edits to `agents_manager/`. No edits to `opencode.jsonc` or root `CLAUDE.md`. Loop-history row 5 appended only.
