# Sources and References

**Audience:** Reviewer + any reader tracing a claim in the dossier body.

**Anchor:** Capacitor v8.5.0 (verified 2026-08-18). v9.0.0-alpha.6 is watch-only (#8560). v7 is documented only as historical context for the v7-to-v8 migration table.

**Cross-references:** back to every dossier file in `capacitor-docs-2026-08-18/` (the 13 numbered files `00_README.md` through `12-self-questions-for-agents.md`); back to the three angle research files in `share/notes/01_research_T-2026-08-18-002_angle-{core,conversion,ecosystem}.md`; forward to `share/notes/02_plan_high_T-2026-08-18-002.md` and `share/notes/02_plan_phases_T-2026-08-18-002.md` (the planning inputs that produced this dossier).

This file is the canonical mirror for every `[Sn]` citation in the dossier body. Dossier files 00 through 10 use angle-prefixed citations (`[A-Snn]`, `[B-Snn]`, `[C-Snn]`) resolved in the angle research files. Dossier files 11 and 12 use the unified `[Sn]` notation resolved in this file. The two notation systems coexist: angle-prefixed for cross-citing prior dossier files; unprefixed for the dossier-wide index introduced in 3E.

---

## How to use this ledger

Each row in the `## Unified ledger` table below maps a single `[Sn]` index to one URL + one access date (2026-08-18 unless noted). The angle research files (cited below as "Origin angle") are the per-angle ledgers that introduced each URL; the "First-cited-by" column names the file that first used that row's content in the dossier body.

Three citation notations coexist across the dossier:

- **`[A-Snn]`, `[B-Snn]`, `[C-Snn]`** -- angle-prefixed references. These appear in dossier files `00_README.md` through `10-known-issues-and-solutions.md` and resolve to the corresponding angle's `## Citation ledger` in `share/notes/01_research_T-2026-08-18-002_angle-{core,conversion,ecosystem}.md`. They are file-local to the dossier body; the unified ledger below does NOT mirror them as separate rows.
- **`[Sn]`** (no prefix) -- unified-dossier index. Resolves to a row in the table below. Files `11-system-prompt-for-llms.md` and `12-self-questions-for-agents.md` use this notation because they need a single citation backstop for the LLM-facing artifacts.
- **File path only** -- internal dossier cross-references (e.g., "see `06-native-like-delivery-checklist.md` Axis 2"). No `[Sn]` needed; the dossier itself is the source.

If a source is in an angle-prefixed ledger but NOT in this flat index (because it was file-local to one angle and never re-cited in a `## References` block downstream), use the `[A-Snn]` / `[B-Snn]` / `[C-Snn]` notation in the file's own `## References` block -- do not invent a `[Sn]` mapping.

The lint pass (Check 3 in `share/notes/02_plan_phases_T-2026-08-18-002.md`) walks every `.md` under `capacitor-docs-2026-08-18/`, extracts every `[Sn]` marker, computes the symmetric difference with the row indices in this file, and fails on any orphan (cited in body, absent in ledger) or uncited (in ledger, never cited) row. The cross-angle Check 4 walks every `[A-S#]` / `[B-S#]` / `[C-S#]` marker and verifies each resolves to a row in the corresponding angle ledger.

---

## Unified ledger -- [S1] through [S115]

Sorted by index. Columns: `Index` / `URL` / `Access date` / `Origin angle` (A/B/C; or A+B if multiple angles cite the same URL) / `First-cited-by` (the dossier file or angle file that introduced this row).

| Index | URL | Access date | Origin angle | First-cited-by |
|---|---|---|---|---|
| [S1] | https://registry.npmjs.org/@capacitor/core | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S2] | https://api.github.com/repos/ionic-team/capacitor/releases | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S3] | https://capacitorjs.com/docs/main/reference/support-policy | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S4] | https://www.npmjs.com/package/@capacitor/cli | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S5] | https://api.github.com/repos/ionic-team/capacitor | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S6] | https://capacitorjs.com/docs/ios | 2026-08-18 | A+C | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S7] | https://capacitorjs.com/docs/android/setting-target-sdk | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S8] | https://capacitorjs.com/docs/updating/8-0 | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S9] | https://capacitorjs.com/docs/updating/8-5 | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S10] | https://capacitorjs.com/docs/v8/cli | 2026-08-18 | A+C | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S11] | https://capacitorjs.com/docs/web | 2026-08-18 | A+C | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S12] | https://capacitorjs.com/docs/v8/cli/commands/sync | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S13] | https://capacitorjs.com/docs/v8/cli/commands/copy | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S14] | https://capacitorjs.com/docs/apis/app | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S15] | https://registry.npmjs.org/@capacitor/storage | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S16] | https://capacitorjs.com/docs/apis/app (lifecycle events sub-section) | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S17] | https://capacitorjs.com/docs/guides/live-reload | 2026-08-18 | A+B | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S18] | https://capacitorjs.com/docs/v8/plugins/creating-plugins | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S19] | https://capacitorjs.com/docs/cordova | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S20] | https://github.com/ionic-team/capacitor/issues/8560 | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S21] | https://github.com/ionic-team/capacitor/issues/8573 | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S22] | https://github.com/ionic-team/capacitor/issues/8562 | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S23] | https://github.com/ionic-team/capacitor/pull/8546 | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S24] | https://github.com/ionic-team/capacitor/issues/8539 | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S25] | https://capacitorjs.com/docs/ | 2026-08-18 | A+B+C | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S26] | https://github.com/ionic-team/capacitor/blob/main/cli/src/declarations.ts | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S27] | https://capacitorjs.com/docs/getting-started | 2026-08-18 | A+C | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S28] | https://capacitorjs.com/docs/v8/config | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S29] | https://capacitorjs.com/docs/v8/cli/commands/run | 2026-08-18 | A+C | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S30] | https://capacitorjs.com/docs/android/configuration | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S31] | https://capacitorjs.com/docs/ios/configuration | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S32] | https://raw.githubusercontent.com/ionic-team/capacitor/main/cli/src/declarations.ts | 2026-08-18 | B+C | `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` |
| [S33] | https://ionic.io/blog/capacitor-android-customscheme-issue-with-chrome-117 | 2026-08-18 | B | `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` |
| [S34] | https://capacitorjs.com/docs/apis/status-bar | 2026-08-18 | B+C | `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` |
| [S35] | https://www.npmjs.com/package/@capacitor/app | 2026-08-18 | B+C | `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` |
| [S36] | https://github.com/ionic-team/capacitor-assets | 2026-08-18 | B | `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` |
| [S37] | https://capacitorjs.com/docs/sitemap.xml | 2026-08-18 | B | `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` |
| [S38] | https://vitejs.dev/config/shared-options.html#base | 2026-08-18 | B | `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` |
| [S39] | https://www.npmjs.com/package/@capacitor/preferences | 2026-08-18 | B+C | `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` |
| [S40] | https://capacitorjs.com/docs/guides/angular | 2026-08-18 | B | `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` |
| [S41] | https://capacitorjs.com/docs/lifecycle | 2026-08-18 | B | `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` |
| [S42] | https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html | 2026-08-18 | B | `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` |
| [S43] | https://capacitorjs.com/docs/apis/splash-screen | 2026-08-18 | B+C | `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` |
| [S44] | https://capacitorjs.com/docs/apis/browser | 2026-08-18 | B+C | `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` |
| [S45] | https://github.com/ionic-team/capacitor/blob/main/README.md | 2026-08-18 | B | `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` |
| [S46] | https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor | 2026-08-18 | B | `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` |
| [S47] | https://capacitorjs.com/docs/updating/8-0 (variables.gradle block) | 2026-08-18 | B | `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` |
| [S48] | https://raw.githubusercontent.com/ionic-team/capacitor/main/cli/src/tasks/sync.ts | 2026-08-18 | B | `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` |
| [S49] | https://raw.githubusercontent.com/ionic-team/capacitor/main/cli/src/tasks/copy.ts | 2026-08-18 | B | `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` |
| [S50] | https://github.com/ionic-team/capacitor/releases | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S51] | https://github.com/ionic-team/capacitor | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S52] | https://www.npmjs.com/package/@capacitor/core | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S53] | https://www.npmjs.com/package/@capacitor/android | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S54] | https://www.npmjs.com/package/@capacitor/ios | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S55] | https://www.npmjs.com/package/@capacitor/haptics | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S56] | https://www.npmjs.com/package/@capacitor/assets | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S57] | https://www.npmjs.com/package/@capacitor/keyboard | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S58] | https://www.npmjs.com/package/@capacitor/status-bar | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S59] | https://www.npmjs.com/package/@capacitor/screen-orientation | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S60] | https://www.npmjs.com/package/@capacitor/filesystem | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S61] | https://github.com/ionic-team/capacitor/blob/main/cli/src/declarations.ts (CapacitorCookies section) | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S62] | https://capacitorjs.com/docs/v8/apis | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S63] | https://github.com/ionic-team/capacitor-plugins/blob/main/README.md | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S64] | https://capacitorjs.com/docs/v8/basics/using-plugins | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S65] | https://github.com/riderx/awesome-capacitor | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S66] | https://www.npmjs.com/package/@capacitor/push-notifications | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S67] | https://www.npmjs.com/package/@capacitor/browser | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S68] | https://www.npmjs.com/package/@capacitor/app | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S69] | https://ionicframework.com/docs/intro | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S70] | https://capacitorjs.com/docs/android | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S71] | https://capacitorjs.com/docs/cli/commands/run | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S72] | https://www.npmjs.com/package/@capacitor/local-llm | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S73] | https://www.npmjs.com/package/@capacitor/storage | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S74] | https://www.npmjs.com/package/@capacitor/dialog | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S75] | https://capacitorjs.com/docs/cli | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S76] | https://github.com/konstaui/konsta | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S77] | https://tailwindcss.com/docs | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S78] | https://unocss.dev/ | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S79] | https://dexie.org/ | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S80] | https://rxdb.info/ | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S81] | https://lucide.dev/guide/packages/lucide-react | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S82] | https://phosphoricons.com/ | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S83] | https://tanstack.com/virtual/latest | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S84] | https://www.npmjs.com/package/@use-gesture/vanilla | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S85] | https://capacitorjs.com/docs/v8/web | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S86] | https://vuejs.org/guide/scaling-up/state-management | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S87] | https://pinia.vuejs.org/ | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S88] | https://capgo.io/ | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S89] | https://developer.apple.com/documentation/technotes/tn3151-configuring-https-on-ios-and-macos | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S90] | https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S91] | https://developer.chrome.com/docs/devtools/remote-debugging/webviews/ | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S92] | https://support.apple.com/guide/safari/use-the-developer-tools-in-the-developer-menu-web0467 | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S93] | https://docs.fastlane.tools/ | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S94] | https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S95] | https://docs.codemagic.io/yaml-configuration/introduction/ | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S96] | https://devcenter.bitrise.io/ | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S97] | https://docs.appcircle.io/ | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S98] | https://github.com/ionic-team/ionic-github-actions | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S99] | https://github.com/tannerlinsley/react-virtual | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S100] | https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S101] | https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/viewport | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S102] | https://developer.mozilla.org/en-US/docs/Web/CSS/env() | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S103] | https://web.dev/articles/video-autoplay-guidelines | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S104] | https://web.dev/articles/browser-level-lazy-loading | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S105] | https://web.dev/articles/prefers-color-scheme | 2026-08-18 | C | `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` |
| [S106] | https://capacitorjs.com/docs/plugins | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S107] | https://capacitorjs.com/docs/ios/viewport-fit (sub-page; 404 at access date, see angle-A self-critique) | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S108] | https://capacitorjs.com/docs/theming | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S109] | https://capacitorjs.com/docs/main/web/statusbar | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S110] | https://capacitorjs.com/docs/main/web/viewport | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S111] | https://github.com/ionic-team/capacitor/issues/8524 (Cordova framework removal in v9) | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S112] | https://capacitorjs.com/docs/guides/storage | 2026-08-18 | B | `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` |
| [S113] | https://capacitorjs.com/docs/guides/react-hooks | 2026-08-18 | B | `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` |
| [S114] | https://github.com/ionic-team/create-capacitor-plugin | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |
| [S115] | https://capacitorjs.com/docs/updating/8-0 (Android Studio Otter 2025.2.1) | 2026-08-18 | A | `share/notes/01_research_T-2026-08-18-002_angle-core.md` |

The unified ledger contains 115 rows. Every row was retrieved live on 2026-08-18 unless noted; the rows marked `404 at access date` were triangulated from the surviving docs pages and the canonical source code (per the encoding-trap and the angle-A self-critique). No row was fabricated; every URL is a primary source (capacitorjs.com, github.com, npmjs.com, registry.npmjs.org, api.github.com) or a community canonical (riderx/awesome-capacitor, konsta UI, tailwindcss.com, unocss.dev, dexie.org, rxdb.info, lucide.dev, phosphoricons.com, tanstack.com, vuejs.org, pinia.vuejs.org, capgo.io), or a third-party authoritative source (developer.apple.com, developer.mozilla.org, web.dev, fastlane.tools, github docs, codemagic docs, bitrise docs, appcircle docs).

---

## Per-file reference indexes

For each dossier file, the location of its `## References` block (where angle-prefixed `[A-S#]` / `[B-S#]` / `[C-S#]` markers and file-local `[S#]` markers resolve).

| File | `## References` block location | Notes |
|---|---|---|
| `capacitor-docs-2026-08-18/00_README.md` | file tail, before `## Freshness` | 3-5 `[S#]` markers in the index file; cross-references every other dossier file by path |
| `capacitor-docs-2026-08-18/01-what-is-capacitor.md` | file tail, before `## Freshness` | 6-row positioning table + 1 quoted framing paragraph; cites capacitor docs root |
| `capacitor-docs-2026-08-18/02-install-and-setup.md` | file tail, before `## Freshness` | CLI command list + floor matrix + v9-alpha warning; ~15 angle-prefixed markers |
| `capacitor-docs-2026-08-18/03-configuration-reference.md` | file tail, before `## Freshness` | Full `CapacitorConfig` schema + v7-to-v8 migration table; ~25 angle-prefixed markers |
| `capacitor-docs-2026-08-18/04-conversion-guide.md` | file tail, before `## Freshness` | 7 per-bundler recipes + 11+ pitfalls + compat table + Cordova migration; ~40 angle-prefixed markers |
| `capacitor-docs-2026-08-18/05-plugin-system-and-lifecycle.md` | file tail, before `## Freshness` | 39-plugin inventory table + lifecycle events + Cordova compat shim; ~10 angle-prefixed markers |
| `capacitor-docs-2026-08-18/06-native-like-delivery-checklist.md` | file tail, before `## Freshness` | 14-area checklist + bonus memory row + 6-axis priority list; ~15 angle-prefixed markers |
| `capacitor-docs-2026-08-18/07-best-companion-libraries.md` | file tail, before `## Freshness` | UI library decision rule + per-library verdicts + iOS-vs-Android parity cheat sheet; ~20 angle-prefixed markers |
| `capacitor-docs-2026-08-18/08-build-and-ship.md` | file tail, before `## Freshness` | `@capacitor/assets` recipe + `cap run` recipe + GH Actions matrix + OTA caveat + version bump; ~15 angle-prefixed markers |
| `capacitor-docs-2026-08-18/09-do-and-dont.md` | file tail, before `## Freshness` | 20-row do/don't matrix + 5 anti-pattern callouts; ~25 angle-prefixed markers |
| `capacitor-docs-2026-08-18/10-known-issues-and-solutions.md` | file tail, before `## Freshness` | Tables A (5 GitHub issues) + B (docs warnings) + C (Cordova compat) + troubleshooting table; ~15 angle-prefixed markers |
| `capacitor-docs-2026-08-18/11-system-prompt-for-llms.md` | file tail, before `## Freshness` | The LLM system prompt + 14 hard constraints + 12 anti-patterns + 7 quality bars; uses `[S#]` notation resolved in this file's unified ledger |
| `capacitor-docs-2026-08-18/12-self-questions-for-agents.md` | file tail, before `## Freshness` | The 23-question self-question set grouped by 6 phases; uses `[S#]` notation resolved in this file's unified ledger |

The 14 dossier files are alphabetically ordered AND reading-ordered (`00_README.md` first; `13-sources-and-references.md` last). The numbering matches the `## Final file inventory` table in `share/notes/02_plan_high_T-2026-08-18-002.md`.

---

## Per-angle index bridges

For each angle file, the mapping from angle-prefixed index (`[A-S#]`, `[B-S#]`, `[C-S#]`) to the unified `[S#]` index in this file. Where an angle-prefixed row is file-local (cited in one dossier file but not used in 11/12), the mapping notes "file-local only -- not in the flat index".

### From `[A-S#]` to `[S#]`

Angle A is `share/notes/01_research_T-2026-08-18-002_angle-core.md`. The angle-A ledger has 31 rows; the unified ledger mirrors rows `[A-S1]` through `[A-S31]` as `[S1]` through `[S31]` with one exception: `[A-S14]` and `[A-S16]` both cite `https://capacitorjs.com/docs/apis/app` (the same URL) -- the unified ledger separates these into `[S14]` (the sidebar) and `[S16]` (the lifecycle events sub-section), so the angle-to-unified bridge for `[A-S14]` is `[S14]` and for `[A-S16]` is `[S16]`.

| Angle index | Unified index | Notes |
|---|---|---|
| [A-S1] | [S1] | npm dist-tags @capacitor/core |
| [A-S2] | [S2] | GitHub releases ionic-team/capacitor |
| [A-S3] | [S3] | Support policy |
| [A-S4] | [S4] | npm @capacitor/cli |
| [A-S5] | [S5] | GitHub repo metadata |
| [A-S6] | [S6] | iOS docs |
| [A-S7] | [S7] | Android target SDK docs |
| [A-S8] | [S8] | v7-to-v8 upgrade guide |
| [A-S9] | [S9] | v8.4-to-v8.5 upgrade guide |
| [A-S10] | [S10] | CLI reference |
| [A-S11] | [S11] | Web/PWA getting started |
| [A-S12] | [S12] | cap sync |
| [A-S13] | [S13] | cap copy |
| [A-S14] | [S14] | `@capacitor/app` API sidebar |
| [A-S15] | [S15] | npm registry `@capacitor/storage` (deprecated plugin) |
| [A-S16] | [S16] | `@capacitor/app` lifecycle events sub-section |
| [A-S17] | [S17] | Live reload guide |
| [A-S18] | [S18] | Plugins + creating plugins / plugin generator |
| [A-S19] | [S19] | Cordova migration strategy |
| [A-S20] | [S20] | GitHub issue #8560 (v9 broken iOS framework) |
| [A-S21] | [S21] | GitHub issue #8573 (tar v7 CLI breakage) |
| [A-S22] | [S22] | GitHub issue #8562 (destroyed WebView) |
| [A-S23] | [S23] | GitHub PR #8546 (URLSessionTask cancel) |
| [A-S24] | [S24] | GitHub issue #8539 (prompt media) |
| [A-S25] | [S25] | Capacitor introduction page |
| [A-S26] | [S26] | declarations.ts (canonical config schema) |
| [A-S27] | [S27] | Getting started (install flow) |
| [A-S28] | [S28] | Capacitor config schema docs page |
| [A-S29] | [S29] | cap run CLI page |
| [A-S30] | [S30] | Configuring Android |
| [A-S31] | [S31] | Configuring iOS |

No angle-A row is file-local; every `[A-S1]` through `[A-S31]` maps cleanly to `[S1]` through `[S31]`.

### From `[B-S#]` to `[S#]`

Angle B is `share/notes/01_research_T-2026-08-18-002_angle-conversion.md`. The angle-B ledger has 35 rows; some rows share URLs with angle-A or angle-C, others are angle-B unique.

| Angle index | Unified index | Notes |
|---|---|---|
| [B-S1] | [S4] | @capacitor/cli (dup with A) |
| [B-S2] | [S52][S53][S54] | @capacitor/core / android / ios family (dup with C) |
| [B-S3] | [S25] | Capacitor docs home (dup with A+C) |
| [B-S4] | file-local only -- not in the flat index | v8 cordova overview raw markdown (r.jina.ai proxy) |
| [B-S5] | file-local only -- not in the flat index | v8 cordova migration full guide raw markdown (r.jina.ai proxy) |
| [B-S6] | file-local only -- not in the flat index | v8 cordova migration strategy raw markdown (r.jina.ai proxy) |
| [B-S7] | [S27] | v8 installation / getting-started (overlaps A-S27) |
| [B-S8] | [S46] | v8 cordova migration rendered |
| [B-S9] | [S32] | declarations.ts (overlaps C-S19) |
| [B-S10] | [S33] | Ionic blog Chrome 117 customscheme |
| [B-S11] | [S34] | status-bar API (overlaps C-S25) |
| [B-S12] | [S35] | @capacitor/app (overlaps C-S34) |
| [B-S13] | file-local only -- not in the flat index | splash-screens-and-icons guide raw markdown (r.jina.ai proxy) |
| [B-S14] | [S36] | capacitor-assets GitHub repo |
| [B-S15] | file-local only -- not in the flat index | v8 FAQs raw markdown (r.jina.ai proxy) |
| [B-S16] | [S37] | docs sitemap.xml |
| [B-S17] | [S48] | tasks/sync.ts raw |
| [B-S18] | [S49] | tasks/copy.ts raw |
| [B-S19] | file-local only -- not in the flat index | CLI tree raw JSON |
| [B-S20] | [S45] | capacitor README raw |
| [B-S21] | [S46] | v8 cordova migration rendered (dup with B-S8) |
| [B-S22] | [S17] | Live reload (dup with A-S17) |
| [B-S23] | [S112] | Storage guide |
| [B-S24] | [S38] | Vite `base` config docs |
| [B-S25] | [S113] | React hooks guide |
| [B-S26] | [S11] | Web platform docs (dup with A+C) |
| [B-S27] | [S39] | @capacitor/preferences (overlaps C-S30) |
| [B-S28] | [S40] | Angular guide |
| [B-S29] | [S41] | Lifecycle docs |
| [B-S30] | [S42] | Apple Safari viewport guide |
| [B-S31] | [S43] | splash-screen API (overlaps C-S29) |
| [B-S32] | [S14] | @capacitor/app API (dup with A-S14) |
| [B-S33] | [S44] | browser API (overlaps C-S33) |
| [B-S34] | [S6] | iOS getting-started (dup with A-S6) |
| [B-S35] | file-local only -- not in the flat index | v8 CI/CD guide raw markdown |

5 angle-B rows are file-local (cited only via the r.jina.ai proxy in `share/notes/01_research_T-2026-08-18-002_angle-conversion.md`); the rest map to unified ledger rows.

### From `[C-S#]` to `[S#]`

Angle C is `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md`. The angle-C ledger has 55 rows; many rows share URLs with angle-A or angle-B, others are angle-C unique.

| Angle index | Unified index | Notes |
|---|---|---|
| [C-S1] | [S50] | `ionic-team/capacitor` releases page |
| [C-S2] | [S51] | `ionic-team/capacitor` repo root |
| [C-S3] | [S52] | @capacitor/core npm |
| [C-S4] | [S4] | @capacitor/cli npm (dup with A) |
| [C-S5] | [S53] | @capacitor/android npm |
| [C-S6] | [S54] | @capacitor/ios npm |
| [C-S7] | [S55] | @capacitor/haptics npm |
| [C-S8] | [S56] | @capacitor/assets npm |
| [C-S9] | [S57] | @capacitor/keyboard npm |
| [C-S10] | [S58] | @capacitor/status-bar npm |
| [C-S11] | [S59] | @capacitor/screen-orientation npm |
| [C-S12] | [S39] | @capacitor/preferences npm (dup with B) |
| [C-S13] | [S60] | @capacitor/filesystem npm |
| [C-S14] | [S62] | Capacitor v8 APIs page |
| [C-S15] | [S69] | Ionic Framework intro docs |
| [C-S16] | [S25] | Capacitor docs site (dup with A+B) |
| [C-S17] | [S6] | iOS support page (dup with A) |
| [C-S18] | [S70] | Android support page |
| [C-S19] | [S32] | declarations.ts (dup with B) |
| [C-S20] | [S62] | v8 APIs page (dup with C-S14) |
| [C-S21] | [S63] | capacitor-plugins README |
| [C-S22] | [S64] | "Using Plugins" docs |
| [C-S23] | [S65] | awesome-capacitor list |
| [C-S24] | [S56] | @capacitor/assets docs (dup with C-S8) |
| [C-S25] | [S34] | @capacitor/status-bar API (dup with B-S11) |
| [C-S26] | [S57] | @capacitor/keyboard API (dup with C-S9) |
| [C-S27] | [S59] | @capacitor/screen-orientation API (dup with C-S11) |
| [C-S28] | [S55] | @capacitor/haptics API (dup with C-S7) |
| [C-S29] | [S43] | @capacitor/splash-screen config (dup with B-S31) |
| [C-S30] | [S39] | @capacitor/preferences API (dup with C-S12) |
| [C-S31] | [S60] | @capacitor/filesystem API (dup with C-S13) |
| [C-S32] | [S66] | @capacitor/push-notifications API |
| [C-S33] | [S44] | @capacitor/browser API (dup with B-S33) |
| [C-S34] | [S35] | @capacitor/app API (dup with B-S12) |
| [C-S35] | [S32] | declarations.ts (dup with C-S19) |
| [C-S36] | [S64] | OTA note in "Using Plugins" (overlaps C-S22) |
| [C-S37] | [S65] | awesome-capacitor (dup with C-S23) |
| [C-S38] | [S71] | CI/CD guidance |
| [C-S39] | [S27] | sync workflow (dup with A-S27) |
| [C-S40] | [S11] | web platform docs (dup with A+B) |
| [C-S41] | [S32] | declarations.ts (dup with C-S19) |
| [C-S42] | [S75] | CLI command list |
| [C-S43] | [S76] | Konsta UI |
| [C-S44] | [S77] | Tailwind CSS |
| [C-S45] | [S78] | UnoCSS |
| [C-S46] | [S79] | Dexie.js |
| [C-S47] | [S80] | RxDB |
| [C-S48] | [S81] | Lucide |
| [C-S49] | [S82] | Phosphor |
| [C-S50] | [S83] | TanStack Virtual |
| [C-S51] | [S84] | @use-gesture/vanilla |
| [C-S52] | [S85] | v8 web docs |
| [C-S53] | [S86] | Vue state management |
| [C-S54] | [S87] | Pinia |
| [C-S55] | [S74] | @capacitor/dialog |

No angle-C row is file-local; every `[C-S1]` through `[C-S55]` maps to a unified ledger row.

---

## Sources by domain

Grouped by domain so a reviewer scanning for "is this URL real?" can quickly verify the domain. The unified ledger above has the index-to-URL mapping; this section repeats the URL in a domain-grouped shape for human verification.

### capacitorjs.com (Capacitor official docs + plugin APIs)

- [S3] -- https://capacitorjs.com/docs/main/reference/support-policy -- Capacitor Support Policy page (v8 Active, v7 Extended Support until 2026-12-08, v6 End of Support; minimum Node 22 / Xcode 26.0 / Android Studio 2025.2.1 / iOS 15.0 / Android 7.0 (API 24))
- [S6] -- https://capacitorjs.com/docs/ios -- Capacitor iOS getting started (iOS 15+, Xcode 26.0+, WKWebView; `npm install @capacitor/ios`, `npx cap add ios`, `npx cap open ios`)
- [S7] -- https://capacitorjs.com/docs/android/setting-target-sdk -- Capacitor Android target SDK page (v8.x requires target SDK 36; table maps every major to a specific target SDK)
- [S8] -- https://capacitorjs.com/docs/updating/8-0 -- Capacitor 7 -> 8 upgrade guide (NodeJS 22+, Xcode 26.0+, iOS deployment target 15.0, variables.gradle matrix, AGP 8.13.0, Gradle wrapper 8.14.3, kotlin 2.2.20)
- [S9] -- https://capacitorjs.com/docs/updating/8-5 -- Capacitor 8.4 -> 8.5 upgrade guide (UIScene lifecycle adoption, SceneDelegate.swift, UIApplicationSceneManifest)
- [S10] -- https://capacitorjs.com/docs/v8/cli -- CLI Reference page (commands `add`, `build`, `copy`, `doctor`, `init`, `ls`, `migrate`, `open`, `run`, `sync`, `update`)
- [S11] -- https://capacitorjs.com/docs/web -- Capacitor Web/PWA getting started (ES2017 baseline; script-include option removed)
- [S12] -- https://capacitorjs.com/docs/v8/cli/commands/sync -- `cap sync` CLI page (copies webDir, installs native deps, updates plugin registrations)
- [S13] -- https://capacitorjs.com/docs/v8/cli/commands/copy -- `cap copy` CLI page (copies webDir only)
- [S14] -- https://capacitorjs.com/docs/apis/app -- `@capacitor/app` API sidebar (lifecycle events; full API surface)
- [S16] -- https://capacitorjs.com/docs/apis/app (lifecycle events sub-section)
- [S17] -- https://capacitorjs.com/docs/guides/live-reload -- Live Reload guide (`server.url`, `server.cleartext: true` in dev)
- [S18] -- https://capacitorjs.com/docs/v8/plugins/creating-plugins -- Capacitor Plugins + Creating Plugins (JS bridge contract; `npm init @capacitor/plugin@latest`)
- [S19] -- https://capacitorjs.com/docs/cordova -- Capacitor Cordova migration strategy
- [S25] -- https://capacitorjs.com/docs/ -- Capacitor introduction page (Web Native framing; "Capacitor is a cross-platform native runtime...")
- [S27] -- https://capacitorjs.com/docs/getting-started -- Installing Capacitor (getting started)
- [S28] -- https://capacitorjs.com/docs/v8/config -- Capacitor Configuration schema page (full `CapacitorConfig` interface)
- [S29] -- https://capacitorjs.com/docs/v8/cli/commands/run -- `cap run` CLI page
- [S30] -- https://capacitorjs.com/docs/android/configuration -- Configuring Android (AndroidManifest, deeplinks, URL scheme)
- [S31] -- https://capacitorjs.com/docs/ios/configuration -- Configuring iOS (Info.plist, Universal Links, Privacy Manifest)
- [S34] -- https://capacitorjs.com/docs/apis/status-bar -- `@capacitor/status-bar` API (overlaps, status-bar; Android 16 behavior change)
- [S37] -- https://capacitorjs.com/docs/sitemap.xml -- Capacitor docs sitemap (23 URLs in the v8 tree)
- [S40] -- https://capacitorjs.com/docs/guides/angular -- Capacitor v8 Angular guide
- [S41] -- https://capacitorjs.com/docs/lifecycle -- Capacitor v8 Lifecycle docs
- [S43] -- https://capacitorjs.com/docs/apis/splash-screen -- `@capacitor/splash-screen` API
- [S44] -- https://capacitorjs.com/docs/apis/browser -- `@capacitor/browser` API
- [S46] -- https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor -- v8 Cordova migration rendered (scheme-change LocalStorage loss warning)
- [S62] -- https://capacitorjs.com/docs/v8/apis -- Capacitor v8 APIs page (35 official plugins list)
- [S64] -- https://capacitorjs.com/docs/v8/basics/using-plugins -- "Using Plugins" docs (Community org pointer; OTA caveat)
- [S70] -- https://capacitorjs.com/docs/android -- Capacitor Android support page (API 24+, Chrome WebView 60+)
- [S71] -- https://capacitorjs.com/docs/cli/commands/run -- Capacitor CI/CD guidance (Codemagic / Bitrise / Appcircle / GitHub Actions + fastlane)
- [S75] -- https://capacitorjs.com/docs/cli -- Capacitor CLI command list (`add` / `build` / `copy` / `doctor` / `init` / `ls` / `migrate` / `open` / `run` / `sync` / `update`)
- [S85] -- https://capacitorjs.com/docs/v8/web -- Capacitor v8 web platform page
- [S106] -- https://capacitorjs.com/docs/plugins -- Capacitor plugins index
- [S108] -- https://capacitorjs.com/docs/theming -- Theming docs
- [S112] -- https://capacitorjs.com/docs/guides/storage -- Capacitor v8 Storage guide
- [S113] -- https://capacitorjs.com/docs/guides/react-hooks -- Capacitor v8 React Hooks guide

### github.com/ionic-team/capacitor (Capacitor GitHub)

- [S2] -- https://api.github.com/repos/ionic-team/capacitor/releases -- GitHub Releases API (top 10 tags)
- [S5] -- https://api.github.com/repos/ionic-team/capacitor -- GitHub repo metadata API (16,336 stars, 1,228 forks, MIT)
- [S20] -- https://github.com/ionic-team/capacitor/issues/8560 -- Issue #8560: 9.0.0-alpha.6 broken iOS framework (CFBundleIdentifier Collision)
- [S21] -- https://github.com/ionic-team/capacitor/issues/8573 -- Issue #8573: CLI 6.x/7.x broken by tar v7 (extractTemplate TypeError)
- [S22] -- https://github.com/ionic-team/capacitor/issues/8562 -- Issue #8562: Android eval() on destroyed WebView after activity recreate
- [S23] -- https://github.com/ionic-team/capacitor/pull/8546 -- PR #8546: WKURLSchemeTask cancellation fix
- [S24] -- https://github.com/ionic-team/capacitor/issues/8539 -- Issue #8539: iOS prompt()-based cookie reads pause media playback
- [S26] -- https://github.com/ionic-team/capacitor/blob/main/cli/src/declarations.ts -- `declarations.ts` (canonical config schema)
- [S36] -- https://github.com/ionic-team/capacitor-assets -- `capacitor-assets` repo (icon + splash generator)
- [S45] -- https://github.com/ionic-team/capacitor/blob/main/README.md -- Capacitor README
- [S48] -- https://github.com/ionic-team/capacitor/blob/main/cli/src/tasks/sync.ts -- `tasks/sync.ts`
- [S49] -- https://github.com/ionic-team/capacitor/blob/main/cli/src/tasks/copy.ts -- `tasks/copy.ts`
- [S50] -- https://github.com/ionic-team/capacitor/releases -- Capacitor releases page
- [S51] -- https://github.com/ionic-team/capacitor -- Capacitor repo root
- [S63] -- https://github.com/ionic-team/capacitor-plugins/blob/main/README.md -- `capacitor-plugins` README (Labs / experimental plugins)
- [S98] -- https://github.com/ionic-team/ionic-github-actions -- `ionic-team/ionic-github-actions` (reusable Capacitor workflows)
- [S99] -- https://github.com/tannerlinsley/react-virtual -- `tannerlinsley/react-virtual` (now `TanStack/virtual`)
- [S111] -- https://github.com/ionic-team/capacitor/issues/8524 -- Issue #8524: Cordova framework removal in v9
- [S114] -- https://github.com/ionic-team/create-capacitor-plugin -- `create-capacitor-plugin` (plugin generator repo)

### npm (npm registry + npmjs.com)

- [S1] -- https://registry.npmjs.org/@capacitor/core -- npm dist-tags @capacitor/core
- [S4] -- https://www.npmjs.com/package/@capacitor/cli -- @capacitor/cli 8.5.0
- [S15] -- https://registry.npmjs.org/@capacitor/storage -- @capacitor/storage (deprecated, 1.2.5 legacy line)
- [S35] -- https://www.npmjs.com/package/@capacitor/app -- @capacitor/app 8.1.1
- [S39] -- https://www.npmjs.com/package/@capacitor/preferences -- @capacitor/preferences 8.0.1 (KV store)
- [S52] -- https://www.npmjs.com/package/@capacitor/core -- @capacitor/core npm page
- [S53] -- https://www.npmjs.com/package/@capacitor/android -- @capacitor/android 8.5.0
- [S54] -- https://www.npmjs.com/package/@capacitor/ios -- @capacitor/ios 8.5.0
- [S55] -- https://www.npmjs.com/package/@capacitor/haptics -- @capacitor/haptics 8.0.2
- [S56] -- https://www.npmjs.com/package/@capacitor/assets -- @capacitor/assets 3.0.5 (icon + splash generator)
- [S57] -- https://www.npmjs.com/package/@capacitor/keyboard -- @capacitor/keyboard
- [S58] -- https://www.npmjs.com/package/@capacitor/status-bar -- @capacitor/status-bar
- [S59] -- https://www.npmjs.com/package/@capacitor/screen-orientation -- @capacitor/screen-orientation
- [S60] -- https://www.npmjs.com/package/@capacitor/filesystem -- @capacitor/filesystem
- [S66] -- https://www.npmjs.com/package/@capacitor/push-notifications -- @capacitor/push-notifications (FCM + APNs)
- [S67] -- https://www.npmjs.com/package/@capacitor/browser -- @capacitor/browser (SFSafariViewController / Chrome Custom Tab)
- [S68] -- https://www.npmjs.com/package/@capacitor/app -- @capacitor/app (lifecycle events)
- [S72] -- https://www.npmjs.com/package/@capacitor/local-llm -- @capacitor/local-llm (experimental / Capacitor Labs)
- [S73] -- https://www.npmjs.com/package/@capacitor/storage -- @capacitor/storage (deprecated, 1.2.5)
- [S74] -- https://www.npmjs.com/package/@capacitor/dialog -- @capacitor/dialog (native alert / confirm / prompt)
- [S84] -- https://www.npmjs.com/package/@use-gesture/vanilla -- @use-gesture/vanilla (gesture library)

### MDN (Mozilla Developer Network)

- [S100] -- https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS -- CORS (same-origin in Capacitor WebView is the default; cross-origin needs `server.allowNavigation`)
- [S101] -- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/viewport -- viewport meta tag (the `viewport-fit=cover` source of truth)
- [S102] -- https://developer.mozilla.org/en-US/docs/Web/CSS/env() -- `env()` CSS function (safe-area-inset-*)

### web.dev (Google web platform docs)

- [S103] -- https://web.dev/articles/video-autoplay-guidelines -- video autoplay guidelines (iOS requires `muted` + `playsinline`)
- [S104] -- https://web.dev/articles/browser-level-lazy-loading -- browser-level image lazy loading
- [S105] -- https://web.dev/articles/prefers-color-scheme -- `prefers-color-scheme` media query (dark mode OS signal)

### ionic.io / ionicframework.com (Ionic blog + Framework)

- [S33] -- https://ionic.io/blog/capacitor-android-customscheme-issue-with-chrome-117 -- Ionic blog: Capacitor Android CustomScheme issue with Chrome 117
- [S69] -- https://ionicframework.com/docs/intro -- Ionic Framework intro docs (Open-Source UI Toolkit; Ionic Team / OutSystems; Ionicons v7)

### tailwindcss.com / unocss.dev (CSS frameworks)

- [S77] -- https://tailwindcss.com/docs -- Tailwind CSS v4.3 docs (CSS-first config; `@theme` blocks)
- [S78] -- https://unocss.dev/ -- UnoCSS (instant on-demand atomic CSS engine; `preset-icons` for Pure CSS Icons)

### TanStack / tannerlinsley

- [S83] -- https://tanstack.com/virtual/latest -- TanStack Virtual docs (headless UI for virtualizing large element lists; framework-agnostic)
- [S99] -- https://github.com/tannerlinsley/react-virtual -- `react-virtual` repo (predecessor of `TanStack/virtual`)

### dexie.org / rxdb.info / pinia.vuejs.org / vuejs.org (data + state)

- [S79] -- https://dexie.org/ -- Dexie.js home (IndexedDB made simple; 5.x current)
- [S80] -- https://rxdb.info/ -- RxDB 17.0.0 release page (Local-First to the Moon)
- [S86] -- https://vuejs.org/guide/scaling-up/state-management -- Vue state management guide
- [S87] -- https://pinia.vuejs.org/ -- Pinia (intuitive store for Vue.js)

### fastlane.tools / CI/CD docs (CI/CD)

- [S93] -- https://docs.fastlane.tools/ -- fastlane docs (iOS sign + upload layer)
- [S94] -- https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions -- GitHub Actions workflow syntax
- [S95] -- https://docs.codemagic.io/yaml-configuration/introduction/ -- Codemagic YAML config intro
- [S96] -- https://devcenter.bitrise.io/ -- Bitrise docs (enterprise alternative)
- [S97] -- https://docs.appcircle.io/ -- Appcircle docs (enterprise alternative)

### developer.apple.com / developer.chrome.com / support.apple.com (platform docs)

- [S42] -- https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html -- Apple Safari Web Content Guide: Configuring the Viewport (`viewport-fit=cover` + `env(safe-area-inset-*)`)
- [S89] -- https://developer.apple.com/documentation/technotes/tn3151-configuring-https-on-ios-and-macos -- Apple TN3151: Configuring HTTPS on iOS and macOS
- [S90] -- https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html -- Apple Info.plist Key Reference (Cocoa Keys)
- [S91] -- https://developer.chrome.com/docs/devtools/remote-debugging/webviews/ -- Chrome DevTools: remote debugging WebViews (Android)
- [S92] -- https://support.apple.com/guide/safari/use-the-developer-tools-in-the-developer-menu-web0467 -- Apple Support: Safari Developer Tools

### Other (community canonical + plugin-specific)

- [S47] -- https://capacitorjs.com/docs/updating/8-0 (variables.gradle block) -- v7-to-v8 variables.gradle matrix reference
- [S61] -- https://github.com/ionic-team/capacitor/blob/main/cli/src/declarations.ts (CapacitorCookies section) -- declarations.ts `CapacitorCookies` schema (since 4.3.0)
- [S65] -- https://github.com/riderx/awesome-capacitor -- `riderx/awesome-capacitor` (curated community plugin index by Capgo; 635 stars)
- [S76] -- https://github.com/konstaui/konsta -- Konsta UI (pixel-perfect mobile UI components; Tailwind CSS)
- [S81] -- https://lucide.dev/guide/packages/lucide-react -- Lucide for React (5k+ icons; ISC; tree-shakeable)
- [S82] -- https://phosphoricons.com/ -- Phosphor Icons (six style weights; large library; MIT)
- [S88] -- https://capgo.io/ -- Capgo home (commercial + self-hosted OTA for Capacitor)
- [S107] -- https://capacitorjs.com/docs/ios/viewport-fit (sub-page; 404 at access date, triangulated) -- v8 iOS viewport-fit sub-page (404 at access date; use S42 + S102 as the primary source)
- [S109] -- https://capacitorjs.com/docs/main/web/statusbar -- v8 main web status-bar sub-page (404 at access date; use S34 / S58 as the primary source)
- [S110] -- https://capacitorjs.com/docs/main/web/viewport -- v8 main web viewport sub-page (404 at access date; use S101 / S102 / S42 as the primary source)
- [S115] -- https://capacitorjs.com/docs/updating/8-0 (Android Studio Otter 2025.2.1) -- v7-to-v8 Android Studio Otter 2025.2.1 reference

---

## Freshness

<!-- freshness: capacitor=8.5.0 access=2026-08-18 -->

- last_verified: 2026-08-18
- source_schema_versions: @capacitor/core@8.5.0, @capacitor/cli@~8.0.0, @capacitor/app@^8.0.0
- anchor_url: https://capacitorjs.com/docs
- v9_watch_only_issue: https://github.com/ionic-team/capacitor/issues/8560
- unified_ledger_row_count: 115
- origin_angles: A (core / official scope), B (conversion guide), C (ecosystem / native-like / LLM artifacts)
- citation_discipline: `[Sn]` resolves to the `## Unified ledger` table above; `[A-Snn]` / `[B-Snn]` / `[C-Snn]` resolve to the corresponding angle research file at `share/notes/01_research_T-2026-08-18-002_angle-{core,conversion,ecosystem}.md`; cross-angle citations are NOT mirrored as separate rows in this file
- encoding_clean: 0 em-dashes, 0 en-dashes, 0 smart quotes (verified by raw-byte scan `E2 80 94` / `E2 80 93` / `E2 80 98` / `E2 80 99` / `E2 80 9C` / `E2 80 9D`)

## References

- `share/notes/01_research_T-2026-08-18-002_angle-core.md` -- angle-A research file (core / official scope); the `## Citation ledger` section is the canonical source for `[A-S#]` markers used in dossier files 00-10
- `share/notes/01_research_T-2026-08-18-002_angle-conversion.md` -- angle-B research file (conversion guide); the `## Citation ledger` section is the canonical source for `[B-S#]` markers used in dossier files 00-10
- `share/notes/01_research_T-2026-08-18-002_angle-ecosystem.md` -- angle-C research file (ecosystem / native-like / LLM artifacts); the `## Citation ledger` section is the canonical source for `[C-S#]` markers used in dossier files 00-10
- `share/notes/01_research_T-2026-08-18-002.md` -- the canonical research merge (the index that links the three angle files)
- `share/notes/02_plan_high_T-2026-08-18-002.md` -- the high-level plan (dossier shape + 14-file inventory + 5 build phases)
- `share/notes/02_plan_phases_T-2026-08-18-002.md` -- the phased plan (per-file `## Done when` + 8 lint checks + manual checklist)
- `share/notes/04_warns_register_T-2026-08-18-002.md` -- the consolidated WARN register (3A + 3B + 3C + 3D + 3E; resolved or marked plan-tool false positive)
- `capacitor-docs-2026-08-18/11-system-prompt-for-llms.md` -- the LLM system prompt; cites `[Sn]` markers in the unified ledger above
- `capacitor-docs-2026-08-18/12-self-questions-for-agents.md` -- the 23-question self-question set; cites `[Sn]` markers in the unified ledger above
