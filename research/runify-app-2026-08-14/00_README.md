# 00 — README — Runify app research dossier

> **User-facing companion** to the canonical research file at `share/notes/01_research_T-2026-08-14-004.md`. This dossier (8 files, ~150–200 KB) is the agent/LLM-suitable deliverable for the "build a Runify competitor" task T-2026-08-14-004. Access date: 2026-08-14.

---

## What this dossier is

You are reading **the merged output of 5 parallel research angles** on the commercial iOS app **Run & Steps Tracker: Runify** (App Store id 6746146450) by **OneDegree Labs LLC**, plus the surrounding competitive landscape, open-source ecosystem, and a build plan if you wanted to ship a competitor.

This dossier is dense, structured, and citation-rich — every claim is traceable to a numbered `[Sn]` source. No fluff, no marketing-speak, no hand-waving.

## Headline insight (4 bullets)

1. **Runify is a gamified GPS run tracker — not a step counter.** The "Steps" in the title is App Store Optimization keyword stuffing; the actual product is live GPS run tracking, XP/rank-tier system (Bronze → Diamond → Iridescent) with **rank decay on inactivity**, leaderboards (friends/global/local), and Instagram-ready post-run share templates.
2. **The single biggest structural gap is no Apple Watch native app.** Runify is iPhone-only; 10 of 14 named competitors (Strava, NRC, Runkeeper, MapMyRun, Pacer, AllTrails, StepsApp, Footpath, Adidas, Codoon) have one. An Apple-Watch-first competitor is the most defensible single move.
3. **If you build it: Kotlin + Jetpack Compose native Android, ~11–12 weeks core, ~13–14 weeks total.** The user owns an Android phone with no Apple account, and the primary market is MENA (Saudi + UAE + Egypt) with AR+EN from day one. The prime issue is background GPS via Android 14 foreground service + OEM battery whitelisting, paired with AR+EN RTL localization. Avoid Mapbox (BSL/TOS), avoid GPL-3.0 samples, avoid unlicensed repos. Use MapLibre Native (BSD-2-Clause) for maps, Health Connect (direct AndroidX) for fitness data, Google Play Billing v8 + RevenueCat for paywall. **10 irreversible decisions** must be made before Step 1 (5 revised from Angle E + 5 new Android-specific). iOS is deferred to v2 (12–18 mo).
4. **iOS-first is the v2 reference, not the v1 plan.** Chapter 05 (the Angle E Swift/SwiftUI plan) is preserved as the iOS v2 shortcut — KMP extraction for business logic + SwiftUI rewrite for UI (~280 wh ≈ 7 wk). The Angle E plan is **not** the active build.

## Files in this dossier

| # | File | Size target | Source angle | Read time |
|---|---|---|---|---|
| 00 | `00_README.md` (this file) | ~5 KB | — | 3 min |
| 01 | `01_what_is_runify.md` | ~15 KB | Angle A | 8 min |
| 02 | `02_ui_and_monetization.md` | ~15 KB | Angle B | 8 min |
| 03 | `03_competitive_landscape.md` | ~25 KB (with 30-feature matrix) | Angle C | 12 min |
| 04 | `04_open_source_alternatives.md` | ~20 KB (license traps visible) | Angle D | 10 min |
| 05 | `05_build_plan.md` | ~30 KB (19 steps + 5 irreversible decisions) | Angle E (iOS v2 reference) | 15 min |
| 06 | `06_strategic_gaps.md` | ~15 KB | All 5 (synthesis) | 8 min |
| 07 | `07_android_build_plan.md` | ~75 KB (22 steps + 10 irreversible decisions) | **Angle F (Android pivot — ACTIVE v1 plan)** | **25 min** |
| 99 | `99_SOURCES.md` | ~30 KB (full bibliography, 95 sources) | All 6 | reference |
| **Total** | **9 files** | **~225–275 KB** | | |

## Reading paths

**Path A — "I just want the headline" (10 min total)**: 00 → 01 → 06. Skim 02, 03, 04, 05, 07.

**Path B — "I'm building a competitor (Android, MENA + EN)" (75 min total)**: 00 → 01 → 03 → 04 → **07** → 06. Skip 05 (iOS v2 reference) unless you need the iOS comparison. Skip 02 (UI detail only relevant if cloning visual DNA).

**Path C — "I'm competing with Runify specifically" (110 min total)**: All 9 files in order. The competitive matrix in 03, the OSS alternatives in 04, and the Android build plan in 07 are all load-bearing for a clone.

**Path D — "I just need citations / one-line answer" (5 min total)**: 99 (sources table). Search for what you need.

**Path E — "I'm planning iOS v2 (12–18 months out)" (30 min total)**: 00 → 05 → 07.12. The iOS plan in 05 is preserved as the v2 reference.

## How to use this dossier

- **Every claim is numbered `[Sn]`.** All [Sn] markers resolve in `99_SOURCES.md`.
- **Numbers in the TL;DR sections are factual**, not estimates — derived from public App Store metadata, iTunes Lookup API, Jina Reader renders of public web pages, and the canonical Runify privacy policy / terms of service / FAQ JSON-LD.
- **Numbers tagged `[INFERRED]` or `[CLAIMED]` are explicitly NOT independently verified** — they come from marketing copy, dev site banners, or the developer's public claims. Treat as marketing, not evidence.
- **Numbers tagged `[NOT FOUND]`** are claims where the public metadata disagrees with the marketing claim (e.g. step counting).

## What this dossier is NOT

- **NOT** a teardown with in-app screenshots. No access to the running app — only the 5 publicly-visible App Store screenshots, Jina Reader vision captions, and the developer website. The paywall screen, navigation pattern, and tier-ladder ordering are `[OPAQUE]`.
- **NOT** a privacy audit. The privacy policy + App Privacy label are read, but no GDPR/CCPA compliance assessment was performed.
- **NOT** a financial model. Revenue, DAU/MAU, ARPU, and CAC estimates are not included (would require Sensor Tower / data.ai access, which is out of scope per the task brief).
- **NOT** a marketing strategy. Acquisition channels are mentioned briefly (TikTok + App Store search ads in 05) but not deeply researched.

## TL;DR across all 6 angles

| Angle | One-line |
|---|---|
| A — App deep-dive | Gamified GPS run tracker, 239 ratings @ 4.78, EN-only, iPhone-only, $4.99/mo Pro. Developer is OneDegree Labs LLC. "Steps" in title is ASO keyword stuffing — no pedometer feature. |
| B — UI / monetization | Dark-themed gamer aesthetic, no on-screen onboarding/paywall in 5 carousel screenshots. Soft paywall: free core + Pro unlocks distance-specific leaderboards + expanded history. 10 IAP SKUs at $4.99–$79.99. Visual DNA = Strava tracking + Duolingo XP loop + Apple Fitness iridescent + Nike share-cards. |
| C — Competitive landscape | 14 competitors. Nearest is Pacer (not Strava). Wins: rank decay, Instagram share cards, 91MB binary, $4.99/mo entry. Loses: Apple Watch, training plans, audio coach, Strava-style segments, Garmin sync, data export, Android. |
| D — Open-source | 25 candidates reviewed, 5 cornerstones deep-dived. Top license traps: Mapbox BSL/TOS, GPL-3.0 samples, unlicensed repos. "Start Monday" recommendation: SwiftUI + CoreGPX + MapKit + CloudKit for iOS-only; Flutter + `health` + MapLibre for cross-platform. |
| E — Build stack | **v2 reference (iOS deferred).** Prime issue = background GPS accuracy + battery. Framework = Swift/SwiftUI native (36/40 score). Platform = iOS-first, iPhone-only, US App Store. 19 steps, ~408 wh, ~10–11 weeks. 5 irreversible decisions (R1–R5). |
| **F — Android pivot** | **ACTIVE v1 plan.** Prime issue = Android 14 FGS + OEM battery whitelisting + AR+EN RTL. Framework = Kotlin + Jetpack Compose native (39/40 score). Platform = Android-only, Google Play, MENA + US fallback. 22 steps, ~440 wh, ~11–12 weeks core + 13–14 wk total. **10 irreversible decisions** (R1–R5 revised + R6–R10 new). iOS v2 in 12–18 mo via KMP extraction (~280 wh ≈ 7 wk). |

## Citation convention

- `[S1]`–`[S95]` are the consolidated bibliography in `99_SOURCES.md`.
- Sources are grouped: A (Runify primary, S1–S14), B (competitors, S15–S28), C (OSS, S29–S61), D (frameworks, S62–S77), **E (Android, S78–S95 — added by Angle F re-merge)**.
- Within each chapter file, only the relevant `[Sn]` markers are used.
- The canonical file `share/notes/01_research_T-2026-08-14-004.md` uses the same numbering.

## Pivot log

| Date | Pivot | Trigger | Decision |
|---|---|---|---|
| **2026-08-14** | **iOS-first (Angle E) → Android-first (Angle F)** | User owns Android phone, has no Apple account, mandates AR+EN for MENA primary market. | OQ13 closed as BOTH AR + EN Day 1. iOS plan deferred to v2 (12–18 mo). Chapter 07 is the active v1 plan. Chapter 05 is the v2 reference. 10 irreversible decisions (R6–R10 added). 18 new sources (S78–S95). 22 build steps (vs 19 in iOS plan). ~440 wh ≈ 11–12 wk core + 13–14 wk total. |

Chapters 01–06 are **preserved as-is** from the original merge pass. Only chapters 05 and 07 are build-oriented; 01–04 + 06 are framework-agnostic and unchanged by the pivot. The Angle E iOS-first content is retained as the v2 reference so the framework choice can reason about portability.

## Provenance

- **Original angle files** (still on disk): `share/notes/01_research_T-2026-08-14-004_angle-*.md` (6 files: A, B, C, D, E, F)
- **Merge pass date**: 2026-08-14
- **Re-merge pass (Angle F)**: 2026-08-14
- **Agent**: am-research (re-merge pass for task T-2026-08-14-004)
- **Task tracker**: `tasks/T-2026-08-14-004.md`
- **Fix log**: `share/notes/03_fix_log_T-2026-08-14-004.md`

---

*Last updated: 2026-08-14 — Author: am-research re-merge for T-2026-08-14-004 (Android pivot) — Source angles: A, B, C, D, E, F*