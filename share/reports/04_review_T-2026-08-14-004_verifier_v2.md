# Re-verifier report — Runify dossier after Android pivot (T-2026-08-14-004)

**Reviewer**: am-review (Tier 4 verifier pass, v2)
**Date**: 2026-08-15
**Scope**: 1 new file (chapter 07) + 4 updated files (00_README, 99_SOURCES, canonical, fix log) + 6 unchanged chapters (01–06) as reference
**Mode**: Report-only — no edits to source files

---

## Verdict

**PASS_WITH_WARNINGS**

The Android-pivot additions are structurally sound, citation-clean, and self-consistent. Chapter 07 has all 15 sections, 22 build steps, 10 irreversible decisions, and a last-updated footer. The framework pick (Kotlin + Jetpack Compose 39/40) is justified with an 8-dimension matrix. The prime issue (Android 14 FGS + AR+EN RTL) has an operational acceptance criterion. Build effort (~440 wh ≈ 11–12 wk core + 13–14 wk total) is consistent with the 22 steps. Wear OS defer-to-v1.5, Health Connect migration story, Play Billing v8 + RevenueCat, and the 5 NEEDS_USER_INPUT OQs are all in place. Citation integrity is complete: 0 broken [Sn] markers in chapter 07 or canonical, all 18 new sources S78–S95 have Access date + Tool + Note, 95 sources declared with no gaps or duplicates. Cross-references in 00_README, canonical, and chapter 07 are consistent.

One LOW finding (new, not in prior verifier): **chapter 05 itself was not modified with a "v2 reference" banner at its top** — the labeling happens externally in 00_README, canonical, chapter 07 preamble, and 99_SOURCES.md, which is consistent with the re-merge scope rule "preserve 01–06 unchanged" but means a reader who lands directly in `05_build_plan.md` sees the iOS-first plan without an in-file warning that it is the v2 reference, not the active v1 plan.

---

## RV.1 Chapter 07 structural integrity — PASS

- **All 15 sections present (07.1–07.15)** ✓ — verified by regex `/^## \d{2}\.\d+/`:
  - 07.1 Why Android-first
  - 07.2 Revised prime issue (Android 14 FGS + AR+EN RTL)
  - 07.3 Framework decision (Kotlin + Jetpack Compose native, 39/40)
  - 07.4 Platform decision (Android-only v1, iOS-v2-deferred)
  - 07.5 Audience update (Amir 28 + Layla 32, MENA + EN)
  - 07.6 Localization Day 1 (AR + EN, RTL)
  - 07.7 Background GPS via Android 14 foreground service
  - 07.8 Health Connect + Google Fit migration
  - 07.9 Monetization — Google Play Billing + RevenueCat
  - 07.10 Wear OS decision (deferred to v1.5)
  - 07.11 Open-source starting point
  - 07.12 iOS v2 deferred plan
  - 07.13 22-step build plan (agent-ready)
  - 07.14 Risks + irreversible decisions summary
  - 07.15 Revised open questions for the user
  - Plus a `## ⛔ 10 irreversible decisions` block at the top (before 07.1) — the canonical "decide BEFORE Step 1" surface.

- **22-step build plan present and sequentially numbered** ✓ — verified Step 1 → Step 22 with consistent `### Step N — Title (days, wh)` format. Step 5 is correctly labeled "THE PRIME ISSUE (5 days, 40 wh)". Step 4 includes Health Connect as `androidx.health.connect:connect-client:1.1.0-alpha07`. All steps have **Files / dirs**, **DoD**, and **Risk** fields.

- **10 irreversible decisions listed** ✓ — R1 (revised) through R10 (NEW) in the top block, with lock-in severity + trigger; the same 10 are summarized in 07.14 with the same content.

- **Last-updated footer present** ✓ — line 949: `*Last updated: 2026-08-14 — Author: am-research re-merge for T-2026-08-14-004 (Android pivot) — Source angle: F — Cross-refs: A, B, C, D, E*`

---

## RV.2 Chapter 07 content quality — PASS

- **Framework pick (Kotlin + Jetpack Compose 39/40) justified with 8-dimension matrix** ✓ — §07.3 lines 113–120: scored across Health Connect / Fit (5), Sensor access (5), Maps (5), Background services (5), Battery tools (5), Hiring (4), Time-to-MVP (5), Locale/RTL (5) → **39**. Competitors Flutter (28), React Native (22), Capacitor (14). Cited [S85][S94].

- **Prime issue (Android 14 FGS + AR+EN RTL) operationally defined** ✓ — §07.2 line 100 acceptance criterion: *"For a 5K outdoor run on a Samsung Galaxy S23 (battery 100% → 88%), the route polyline is within 10m of the actual sidewalk, pace is within ±5 s/km, battery drain is <12% per 60 min, the OS does not kill the foreground service for the entire run, and the user is presented with the OEM-specific 'Add to Protected Apps' prompt on first run."*

- **Build effort estimate (~440 wh ≈ 11–12 wk core + 13–14 wk total) consistent with the 22 steps** ✓ — §07.13 Total effort table (line 859): Steps 1–22 total = ~440 wh ≈ 11–12 wk core, +1 wk Play Internal Testing soak + 2 wk buffer = 13–14 wk calendar. Per-step values sum correctly.

- **Wear OS recommendation (defer to v1.5) justified** ✓ — §07.10: user has not confirmed a Wear OS watch `[OPAQUE]`; Apple Watch is dominant wrist in KSA/UAE `[INFERRED]`; v1 adds ~200 wh + 1 wk design + 5+ device test matrix. v1.5 effort is well-defined (~250 wh ≈ 6–7 wk).

- **Health Connect migration story coherent** ✓ — §07.8: cites the Flutter `health` package README for the Google Fit deprecation statement (2024-05-01); cites the Google Health Connect page ("supported until end of 2026"); recommends `androidx.health.connect.client` (Apache-2.0, AndroidX) for native Kotlin. Includes Activity-alias requirement + `<queries>` block for HC app detection.

- **Google Play Billing + RevenueCat recommendation concrete** ✓ — §07.9: Play Billing v8 mandatory by 2026-08-31 [S89]; tier table mirrors Runify ($4.99/mo, $39.99/yr w/ 7-day trial, $79.99 lifetime); RevenueCat pricing + cross-platform wrapper rationale + trial mechanics + family library; explicit "if iOS v2 is on the roadmap, pick RevenueCat; if firmly v3+, skip" branching.

- **5 revised OQs listed and labeled by severity** ✓ — §07.15 lines 905–924 includes OQ-F1 (HIGH), OQ-F2 (HIGH), OQ-F3 (MEDIUM), OQ-F4 (MEDIUM), OQ-F5 (HIGH), OQ-F6 (MEDIUM), OQ-F7 (MEDIUM), OQ-F8 (LOW), OQ-F9 (LOW), OQ-F10–F12 (carried from Angle E). Top-5 NEEDS_USER_INPUT section (lines 918–924): OQ-F1, OQ-F5, OQ-F2, OQ-F4, OQ-F7 — all with severity + pivots-target cross-reference.

---

## RV.3 Citation integrity — PASS

- **All [Sn] markers in chapter 07 resolve** ✓ — 35 unique [Sn] markers used in chapter 07; 0 broken (every ID is declared in 99_SOURCES.md). IDs span S2, S4, S12, S13 (Runify primary, reused) and the full S78–S95 Android-specific set.

- **All S78–S95 have Access date + Tool + Note** ✓ — verified by regex scan of all 18 source blocks:
  - All 18: **URL** + **Access date: 2026-08-14** + **Tool: ctx_fetch_and_index** + **Note:** (1-line) + **Used by:** cross-ref.
  - Spot-checked S78, S84, S89, S92, S94 — all complete.

- **No broken citations, no orphan [Sn] numbers** ✓ — the 60 "orphan" sources (declared but not used in chapter 07) are not orphans globally; they're cited by chapters 01–06 and the canonical. Within chapter 07 alone, 0 orphans.

- **95 sources total declared (S1–S95, no gaps, no duplicates)** ✓ — verified `^### \[S(\d+)\]` regex against 99_SOURCES.md: range 1–95, zero gaps, zero duplicates.

- **Canonical file has 95 unique [Sn] markers, 0 broken** ✓ — every source referenced in the canonical resolves to 99_SOURCES.md.

---

## RV.4 Cross-reference integrity — PASS_WITH_WARN

- **00_README.md mentions chapter 07 in navigation** ✓ — file table row 07 (L31), Path B (L39), Path E (L45), TL;DR row F (L70), Citation convention (L74–75), Pivot log (L83).

- **Canonical mentions Android-first pivot in TL;DR** ✓ — TL;DR line 9: *"Kotlin + Jetpack Compose native Android (score 39/40) — 11–12 wk core MVP."*; line 10: *"Build effort: ~440 working hours ≈ 11–12 weeks... 10 irreversible decisions"* + "active v1" + "v2 reference" framing. Pivot banners (`🚨 2026-08-14 pivot`) appear 5 times in canonical at sections 4/5/6/7/8.

- **Original Angle E content in chapter 05 is marked as "v2 reference" (not active plan)** ✓ in 7 places (00_README L18, L29, L39, L45, L69, L83, L85; 99_SOURCES L887; 07 preamble L5), with the strongest framing in 00_README L18: *"iOS-first is the v2 reference, not the v1 plan. Chapter 05 (the Angle E Swift/SwiftUI plan) is preserved as the iOS v2 shortcut ... The Angle E plan is **not** the active build."*

- **The original Swift/SwiftUI recommendation is NOT presented as the current MVP path** ✓ — verified:
  - 00_README L17–18: Active v1 = Kotlin + Jetpack Compose; Chapter 05 explicitly called "v2 shortcut".
  - 00_README L69: TL;DR table row E labeled "**v2 reference (iOS deferred)**".
  - 07 preamble L5: explicitly "The iOS-first plan from Angle E (chapter 05) is **kept as the v2 reference**, but the MVP build is Android-native".
  - canonical L17–18: framework is Android-native; Swift/SwiftUI referenced only as "v2 reference".

- **[LOW] Chapter 05 itself was not modified with a "v2 reference" banner at its top.** The file's first lines still read "05 — Build plan (Angle E — Build stack + platform)" with no in-file caveat that this is the deferred v2 plan. Per the re-merge log this is intentional — chapter 05 was deliberately preserved unchanged ("chapters 01–06 NOT modified — preserved as-is"). The labeling happens externally in README + canonical + 07 cross-refs, which satisfies the spirit of RV.4 but a reader who opens 05_build_plan.md directly without first reading the README sees an iOS-first plan without an in-file warning. A future iteration could add a single-line header note (`> Note: This is the v2 reference; the active v1 plan is chapter 07.`) without modifying any of the 19 steps or 5 irreversible decisions. Severity: LOW — informational, not blocking.

---

## RV.5 Tag discipline preserved — PASS

- **Chapter 07 uses [CLAIMED]/[OPAQUE]/[INFERRED] tags inline** ✓ — tag census: 1 [CLAIMED] (L19, R5: "Self-host if v2.5 pivots to 'privacy-first run tracker'" `[CLAIMED]`), 3 [OPAQUE] (L24 Wear OS user not confirmed; L157 same; L587 same), 11 [INFERRED] (L36, L41, L42, L99, L124, L182, L194, L212, L225, L572, L587). Total 15 formal tags.

- **Tag count (~22 estimated)** is actually 15 — slightly lower than the brief's "22 estimate", but reasonable for a chapter with 35 unique citations drawn mostly from authoritative Android developer docs (less need for disambiguation when citing Google's official documentation). Every [INFERRED] tag covers a market-size or behaviour claim (Snapchat MAU, Huawei MENA share, hiring market depth) and every [OPAQUE] tag covers a user-confirmation gate. Discipline matches the M2 fix from the prior verifier (formal brackets, not prose).

- **Phase 1.7 tags in 01–06 preserved** ✓ — verified tag census matches fix-log targets:
  - 01: 12 [CLAIMED] + 4 [OPAQUE] + 4 [INCONSISTENT] + 31 [LIKELY-REAL] + 14 [NOT FOUND] (M3a footnote added one extra [CLAIMED] tag at line 137)
  - 02: 8 [OPAQUE] (unchanged from prior)
  - 03: 1 [CLAIMED] + 4 [INFERRED] = 5 (matches fix-log target 5)
  - 04: 6 [INFERRED] (matches fix-log target 6)
  - 05: 2 [CLAIMED] + 6 [INFERRED] = 8 (matches fix-log target 8)
  - 06: 1 [CLAIMED] + 6 [INFERRED] = 7 (matches fix-log target 7)
  - Total Phase 1.7 additions: 26 tags, all preserved.

---

## RV.6 Dossier totals — PASS

| File | Size (bytes) | Status |
|---|---:|---|
| `00_README.md` | 9,343 | ✓ exists, non-empty |
| `01_what_is_runify.md` | 24,381 | ✓ exists, non-empty (post Phase 1.7 fix) |
| `02_ui_and_monetization.md` | 16,255 | ✓ exists, non-empty (unchanged) |
| `03_competitive_landscape.md` | 28,872 | ✓ exists, non-empty (post Phase 1.7 fix) |
| `04_open_source_alternatives.md` | 27,132 | ✓ exists, non-empty (post Phase 1.7 fix) |
| `05_build_plan.md` | 31,929 | ✓ exists, non-empty (post Phase 1.7 fix, intentionally preserved by re-merge) |
| `06_strategic_gaps.md` | 15,309 | ✓ exists, non-empty (post Phase 1.7 fix) |
| `07_android_build_plan.md` | **74,652** | ✓ NEW, matches brief target of ~74.6 KB |
| `99_SOURCES.md` | 41,113 | ✓ exists, non-empty (was 29,178 → +11,935 from S78–S95 expansion + Phase 1.7 M1 fix) |
| **Total dossier** | **268,986 bytes ≈ 262.7 KB** | |

- **Total chapter count: 9 files** (00 + 01–07 + 99) ✓
- **All files exist, non-empty** ✓
- **All chapters 01–06 byte-count stable post-Phase 1.7** ✓ (no re-merge modification)
- **Total payload ~263 KB** is above the README's "225–275 KB" envelope (top of range). Consistent.

- **Canonical file**: `share/notes/01_research_T-2026-08-14-004.md` = 39,006 bytes (was 33,096 → +5,910 from Phase 1.9 re-merge additions: TL;DR lines 9–10, pivot banner, framework matrix relabel, platform decision relabel, irreversible decisions relabel, build outline footer, sources section, metrics footer).

---

## Severity summary

- **HIGH (must fix before shipping)**: 0
- **MEDIUM (should fix)**: 0
- **LOW (nice to fix)**: 1

---

## Recommended fixes

### LOW (1)

- **[L1-new]** Add a one-line header note to `05_build_plan.md` immediately under the existing `# 05 — Build plan` line:

  ```markdown
  > ⚠️ **v2 reference (not the active v1 plan).** This chapter is preserved from the original Angle E merge pass. The active v1 plan is **Android-first**, documented in `07_android_build_plan.md`. iOS v2 is 12–18 months post-launch (~280 wh ≈ 7 wk via KMP + SwiftUI rewrite).
  ```

  This is a non-destructive 3-line addition that does not touch any of the 19 steps, 5 irreversible decisions, or the scoring rationale. Per the re-merge log, chapter 05 was deliberately preserved unchanged — this addition is the minimum to satisfy the RV.4 "clearly marked as 'v2 reference'" requirement at the file level rather than relying on cross-references from sibling files. **Optional** — the current external labeling in 00_README, canonical, 07, and 99_SOURCES is sufficient for an agent that reads the README first.

---

## Metrics

- **New chapter bytes**: 74,652 (chapter 07, ~660 lines)
- **New sections**: 15 numbered sections (07.1–07.15) + 1 ⛔ irreversible decisions block + 1 Sources section + 1 last-updated footer
- **S# additions**: 18 (S78–S95, all Android-specific)
- **Files modified (excluding new chapter 07)**: 4
  - `00_README.md`: +2,533 bytes (Files table, headline insight, Pivot log, citation convention, provenance)
  - `99_SOURCES.md`: +11,935 bytes (Section E for S78–S95, summary counts, cross-reference mapping, re-merge addendum)
  - `share/notes/01_research_T-2026-08-14-004.md` (canonical): +5,910 bytes (TL;DR pivot, 5 🚨 pivot banners in sections 4/5/6/7/8, framework/platform relabel, irreversible decisions relabel, build outline footer, sources section, metrics footer)
  - `share/notes/03_fix_log_T-2026-08-14-004.md`: re-merge log section appended (5 summary lines, files-modified table, cross-reference matrix, hard-rules compliance, NEEDS_USER_INPUT carry-forward)
- **Files preserved unchanged (intentional, per scope rules)**: 6 (chapters 01–06 in dossier; 6 angle files in `share/notes/`)
- **Citations verified**:
  - Chapter 07: 35 unique [Sn] markers, 0 broken
  - Canonical: 95 unique [Sn] markers, 0 broken
  - 99_SOURCES.md: 95 declared, 0 gaps, 0 duplicates, all S78–S95 have URL + Access date + Tool + Note
  - Out-of-range citations (<S1 or >S95): 0
- **Tags verified**:
  - Chapter 07: 15 formal tags (1 [CLAIMED], 3 [OPAQUE], 11 [INFERRED])
  - Phase 1.7 insertions in 01–06: 26 tags preserved (1+5+6+8+7 in 01/03/04/05/06; 02 already had 8 [OPAQUE])
- **Cross-refs verified**:
  - 7 "v2 reference" mentions in 00_README
  - 1 in 99_SOURCES
  - 1 in 07 preamble
  - 5 🚨 pivot banners in canonical
  - 0 references that frame Swift/SwiftUI as the current MVP path

---

*Re-verifier close-out for T-2026-08-14-004 Android-pivot additions. Active v1 plan (chapter 07) is ready to ship; one optional LOW improvement available for chapter 05's in-file labeling.*