# Capacitor Dossier (v8.5.0)

**Date accessed:** 2026-08-18
**Anchor version:** Capacitor `@capacitor/core@8.5.0` (npm `latest`). Capacitor `9.0.0-alpha.6` ships a broken iOS framework (issue #8560) and is watch-only.
**Audience:** any reader new to Capacitor, engineers adding Capacitor to a web project, code reviewers auditing a Capacitor app, and LLM code agents extending one.

This dossier is a 14-file agent-facing reference for the official Capacitor surface. It is not a tutorial; it is the reference an LLM agent should consult before extending a Capacitor app, and the reference a human reviewer should consult before approving one. Every claim is cited; every chapter ends with a freshness block.

## Audience

The dossier names three primary personas:

1. **Coding agent extending a Capacitor app.** This reader is invoked with a task like "add a splash screen" or "fix the dark-mode-follow bug" and needs to verify the API, the config shape, and the version before emitting code. The reader should treat `00_README.md` and `01-what-is-capacitor.md` as required pre-amble, then jump to the file the task touches.

2. **Engineer adding Capacitor to a web project.** This reader is integrating Capacitor for the first time and needs the install flow, the CLI command list, the project-structure diagram, and the `capacitor.config.ts` field-by-field reference. The reader should walk `02-install-and-setup.md` then `03-configuration-reference.md` end to end.

3. **Code reviewer auditing a Capacitor app.** This reader is reviewing a PR that adds a plugin, a config change, or a native shell modification. The reader should consult `09-do-and-dont.md`, `10-known-issues-and-solutions.md`, and the file the PR touches. The freshness footers on every file let the reviewer verify the writer was working from the same version the PR claims.

## Reading order

The 14 files below are numbered `00_` through `13_` so reading order is unambiguous.

| # | File | Role |
|---|------|------|
| 00 | `00_README.md` | This file: dossier index, reading paths, freshness footer |
| 01 | `01-what-is-capacitor.md` | One-paragraph framing an LLM can quote + vs Cordova / Tauri / Electron / Expo / RN / Flutter |
| 02 | `02-install-and-setup.md` | Install flow (`npm install`, `npx cap init/add/sync/copy/run`), CLI command list, project structure, Node / Xcode / Android Studio floor, v8.5.0 anchor, v9-alpha warning |
| 03 | `03-configuration-reference.md` | `capacitor.config.ts` field-by-field (appId, appName, webDir, server block, plugins block, android block, ios block, loggingBehavior, bundledWebRuntime, env vars); v7 to v8 migration table |
| 04 | `04-conversion-guide.md` | Per-bundler recipes (Vite lead + Next.js + Vue+Vite + Angular + SvelteKit + plain Webpack/CRA + plain HTML), pre-conversion audit, white-screen + asset-path + safe-area + OAuth callback + scheme-swap fixes, Cordova migration sub-section, env handling, routing |
| 05 | `05-plugin-system-and-lifecycle.md` | What a plugin is, `npm init @capacitor/plugin@latest`, JS bridge contract, lifecycle events (`appStateChange`, `pause`, `resume`, `appUrlOpen`, `appRestoredResult`, `backButton`), CFBundleURLTypes + intent-filter, Cordova compat shim |
| 06 | `06-native-like-delivery-checklist.md` | Six-axis priority list (safe-area, status bar, splash, haptics, back-button, dark-mode-follow) + long tail (keyboard, orientation, nav transitions, tap highlight, font, perf) |
| 07 | `07-best-companion-libraries.md` | UI (Ionic / Konsta / vanilla), state, router, forms, storage, HTTP, realtime, push -- one-paragraph verdict per library |
| 08 | `08-build-and-ship.md` | `@capacitor/assets`, `cap run`, debug (Safari Web Inspector + `chrome://inspect`), GH Actions + fastlane matrix, store upload (App Store + Play Store), version bumps in lockstep, OTA caveat (no first-party story; Capgo only) |
| 09 | `09-do-and-dont.md` | 20-row do/don't matrix copied from angle-ecosystem section 12.2 with `[Sn]` row upgrades + a file-path column pointing at the dossier file where the corrective action is described |
| 10 | `10-known-issues-and-solutions.md` | HIGH-risk register (issues #8560 v9 framework, #8573 tar v7 CLI breakage, #8562 destroyed-WebView, #8546 URLSessionTask, #8539 prompt media) + medium-risk + the Android 16 status-bar behavior change + workarounds |
| 11 | `11-system-prompt-for-llms.md` | The system prompt for "you are extending a Capacitor app" agents, copied from angle-ecosystem section 12.1 with `[Sn]` upgrades + file-path refs |
| 12 | `12-self-questions-for-agents.md` | 20-question self-question set grouped by phase (Setup, Conversion, Native shell, Runtime, Performance, Ship), copied from angle-ecosystem section 12.3 with file-path upgrades |
| 13 | `13-sources-and-references.md` | Consolidated `## Citation ledger` with `[Sn]` to URL + access date; cross-reference back to angle files |

## How to use this dossier

A coding agent or human reviewer should follow this procedure:

1. Read `00_README.md` (this file) to confirm the dossier version matches the project's version.
2. Read `01-what-is-capacitor.md` to set context: one-paragraph framing, the vs-X positioning table, and the when-to-choose / when-NOT-to-choose decision rules.
3. Read `02-install-and-setup.md` only if the task is install-related (new project, v7 to v8 upgrade, env var troubleshooting).
4. Read `03-configuration-reference.md` only if the task touches `capacitor.config.ts`, the `server` block, the `ios` / `android` blocks, or the `plugins` block.
5. Read `04-conversion-guide.md` only when converting an existing web project to Capacitor (the per-bundler recipes and the pre-conversion audit live there).
6. Read `05-plugin-system-and-lifecycle.md` before writing or evaluating a plugin.
7. Read `06-native-like-delivery-checklist.md` when working on the native-like delivery layer (safe-area, status bar, splash, haptics, back-button, dark-mode-follow).
8. Read `07-best-companion-libraries.md` when picking companion libraries (UI, state, router, storage, HTTP, realtime).
9. Read `08-build-and-ship.md` when wiring up CI/CD, debug, or store upload.
10. Read `09-do-and-dont.md` and `10-known-issues-and-solutions.md` before merging or reviewing a PR.

For LLM agents: read `11-system-prompt-for-llms.md` (Phase 3E) before any code write and use `12-self-questions-for-agents.md` (Phase 3E) as the pre-write self-check.

## Source-of-truth discipline

Every factual claim in this dossier carries an inline citation marker of the form `[A-Snn]`, `[B-Snn]`, `[C-Snn]`, or `[Sn]`. The markers resolve as follows:

- `[Sn]` (numeric only) resolves to a row in `13-sources-and-references.md` (Phase 3E).
- `[A-Snn]` resolves to row `Snn` in the angle-core file `share/notes/01_research_T-2026-08-18-002_angle-core.md` section "Citation ledger".
- `[B-Snn]` resolves to row `Snn` in the angle-conversion file `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` section "Citation ledger".
- `[C-Snn]` resolves to row `Snn` in the angle-ecosystem file `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` section "Citation ledger".

The format `[X-Snn]` is "angle-X, source-row-nn". An LLM agent reading this dossier should be able to trace any claim back to a primary URL via that mapping. Inline `[Sn]` cross-file citations are forbidden in chunks 3A-3D; they consolidate in 3E (`13-sources-and-references.md`).

## LLM artifacts

Two artifacts are designed specifically for LLM code agents. They are built last (Phase 3E) so their cross-references name files that already exist.

- `11-system-prompt-for-llms.md` (Phase 3E) -- the persona + 11 hard rules + 10 anti-patterns + 5 quality bars + citation discipline + when-to-ask-vs-default + when-to-refactor-vs-ship + token discipline. Prepend this to any agent that touches Capacitor code.
- `12-self-questions-for-agents.md` (Phase 3E) -- 20-question self-question set grouped by phase. Use as the pre-write checklist.

A third artifact, the consolidated sources ledger, lands in `13-sources-and-references.md` (Phase 3E). The marker-to-URL mapping in that file is the citation backstop for the entire dossier.

## Self-checks before code

Before writing any Capacitor code, an LLM agent or human engineer should be able to answer these in one sentence each. If the answer is "I don't know", read the named file:

1. **Is Capacitor the right tool for this task?** (see `01-what-is-capacitor.md` -- the vs-X table + when-to-choose / when-NOT-to-choose decision rules)
2. **What is the JS / TS bundler, and does the per-bundler recipe apply?** (see `04-conversion-guide.md` -- the seven per-bundler recipes; Vite is the lead)
3. **What native capabilities are needed, and is each one an official plugin or a community plugin?** (see `05-plugin-system-and-lifecycle.md` -- the 39-plugin official inventory + the community-plugin audit)
4. **Is the native-like delivery layer complete?** (see `06-native-like-delivery-checklist.md` -- the six-axis priority list: safe-area, status bar, splash, haptics, back-button, dark-mode-follow)
5. **Which companion libraries are in scope?** (see `07-best-companion-libraries.md` -- the UI library decision rule: Ionic / Konsta / vanilla)
6. **Is `capacitor.config.ts` safe to change?** (see `03-configuration-reference.md` -- the field-by-field reference + the v7 to v8 migration table)
7. **What is the deploy / CI plan?** (see `08-build-and-ship.md` -- GH Actions + fastlane primary; Capgo for OTA; CodePush is RN-only)

A "no" or "I don't know" on any one is a flag to pause and read the named file before writing.

<!-- freshness: capacitor=8.5.0 access=2026-08-18 -->

## Freshness

- last_verified: 2026-08-18
- source_schema_versions: @capacitor/core@8.5.0, @capacitor/cli@~8.0.0, @capacitor/app@^8.0.0
- anchor_release_notes: https://capacitorjs.com/docs/updating/8-5 (UIScene lifecycle, CLI TS7 support)
- v9_watch_only_issue: https://github.com/ionic-team/capacitor/issues/8560