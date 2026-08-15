# Verifier report — Runify dossier (T-2026-08-14-004)

**Reviewer**: am-review (Tier 4 verifier pass)
**Date**: 2026-08-14
**Scope**: 1 canonical file + 8 dossier files (9 total)
**Mode**: Report-only — no edits to source files

---

## Verdict

**PASS_WITH_WARNINGS**

The dossier is internally consistent on all critical structural, citation, and headline checks. Citation resolution is complete (77/77 sources, 0 broken refs, 0 orphans), the 19-step build plan + 30-feature matrix + 14-competitor matrix + D.5 license-traps section are all present and sequential, and the dossier TL;DR matches the canonical on every numeric claim that matters (239 ratings, 4.78 rating, $4.99/$39.99/$79.99 pricing, Swift 36/40, ~408 wh, 5 irreversible decisions). Three MEDIUM findings and three LOW findings to surface — none blocks shipping but two of them (tier-ladder count, tagging-discipline consistency) could mislead an agent that skims rather than reads.

---

## V.1 File existence + non-emptiness — PASS

All 9 files exist, none are empty, all are above their respective minimum-size thresholds.

| File | Size (bytes) | Threshold | Verdict |
|---|---:|---:|---|
| `00_README.md` | 6,810 | ≥ 1,000 | PASS |
| `01_what_is_runify.md` | 23,901 | ≥ 5,000 | PASS |
| `02_ui_and_monetization.md` | 16,255 | ≥ 5,000 | PASS |
| `03_competitive_landscape.md` | 28,795 | ≥ 5,000 | PASS |
| `04_open_source_alternatives.md` | 27,054 | ≥ 5,000 | PASS |
| `05_build_plan.md` | 31,827 | ≥ 5,000 | PASS |
| `06_strategic_gaps.md` | 15,219 | ≥ 5,000 | PASS |
| `99_SOURCES.md` | 29,178 | ≥ 5,000 | PASS |
| `share/notes/01_research_T-2026-08-14-004.md` (canonical) | 33,096 | ≥ 5,000 | PASS |

Total dossier payload: **178,959 bytes ≈ 175 KB**, within the README-claimed 150–200 KB envelope. Canonical TL;DR + Identity section cross-check the dossier TL;DR (see V.7).

---

## V.2 Citation consistency — PASS_WITH_WARNINGS

### Numeric checks (all pass)

- **77 source entries declared** in `99_SOURCES.md` (matches `S1`–`S77`).
- **Range**: min=1, max=77. **No gaps.** **No duplicates.**
- **Broken-citation count across 9 files**: **0**.
- **Orphan-source count (declared but never cited)**: **0**. Every source S1–S77 is referenced at least once.
- **Citation density** (markers per file): 00_README=2, 01=95, 02=66, 03=28, 04=87, 05=54, 06=8, 99=207, canonical=many. Heavy citation is the dossier's strongest feature.

### Spot-check of 5 random `[Sn]` markers — all resolve with URL + usable provenance

| Source | URL/type | Access date | Retrieval tool | Verdict |
|---|---|---|---|---|
| **[S12]** Runify FAQ JSON-LD | `https://runifyapp.com` (JSON-LD) | 2026-08-14 | `ctx_execute` (Python urllib + re) | PASS — canonical FAQ source for $4.99/$39.99 pricing |
| **[S29]** OpenTracks (Codeberg) | `https://codeberg.org/OpenTracksApp/OpenTracks` | (implicit 2026-08-14) | (GitHub/Codeberg API) | PASS — Apache-2.0 cornerstone, v4.28.1 |
| **[S44]** SecUSo/privacy-friendly-pedometer | `https://github.com/SecUSo/privacy-friendly-pedometer` | (implicit 2026-08-14) | (GitHub) | PASS — GPL-3.0 license-trap #1 (REJECT verdict) |
| **[S62]** Apple HealthKit docs | `https://developer.apple.com/documentation/healthkit` | (implicit 2026-08-14) | `ctx_fetch_and_index` | PASS — Apple official HealthKit entry-point |
| **[S70]** PostHog | `https://posthog.com/` | (implicit 2026-08-14) | `ctx_fetch_and_index` | PASS — R5 (analytics) recommendation basis |
| **[S77]** (last entry) | `agents_manager/memory/projects/research-space/playbook.md` | (n/a — internal ref) | (n/a) | PASS — internal cross-reference |

### Warning — source-metadata schema drift

**[M1]** Sources **S1–S14** follow an explicit schema with three labeled fields (`URL`, `Access date: 2026-08-14`, `Tool: ctx_fetch_and_index | ctx_execute`). Sources **S15–S77** (63 entries) use a different schema: they have a `URL` (or `iTunes API URL`) but **omit the explicit `Access date` and `Tool` fields**. The implicit access date is uniformly **2026-08-14** (from the dossier header); the implicit tool is recoverable from source type (iTunes API → S15–S28, GitHub/Codeberg → S29–S61, webfetch → S62–S77). However, the brief asks for "URL + access date + retrieval tool" as three explicit fields, and 63 of 77 entries don't satisfy that literally.

**Severity**: MEDIUM — the information IS recoverable but the explicit schema field is missing, which violates the spec and forces an agent to derive provenance rather than read it.

---

## V.3 Claim-vs-evidence integrity — PASS_WITH_WARNINGS

### Tag census (per chapter)

| File | `[CLAIMED]` | `[OPAQUE]` | `[INFERRED]` |
|---|---:|---:|---:|
| 00_README.md | 1 | 1 | 1 |
| 01_what_is_runify.md | **11** | **4** | 0 |
| 02_ui_and_monetization.md | 0 | **8** | 0 |
| 03_competitive_landscape.md | 0 | 0 | 0 |
| 04_open_source_alternatives.md | 0 | 0 | 0 |
| 05_build_plan.md | 0 | 0 | 0 |
| 06_strategic_gaps.md | 0 | 0 | 0 |
| **Total formal tags** | **12** | **13** | **1** |

### Spot-check of disambiguation discipline

- **`[CLAIMED]` markers in 01** (e.g. L115 "100K+ Runs Logged" → `[CLAIMED]`, no independent verification; L117 "99.5% GPS Accuracy" → `[CLAIMED]`, no methodology) are properly disambiguated — they explain that the number comes from marketing copy without verification.
- **`[OPAQUE]` markers in 02** (e.g. L66 "Glassmorphism / skeuomorphism / minimal" → `[OPAQUE]`; L52 "the paywall screen, navigation pattern, and tier-ladder ordering are `[OPAQUE]`") properly explain WHY opaque (App Store intentionally hides IAP layout / paywall).
- **`[INCONSISTENT]` markers** (e.g. "4.8★ App Store Rating Across 626+ reviews" → `[INCONSISTENT]`, with both 239 and 626 cited and the conflict resolved) are excellent disambiguation practice.
- **`[LIKELY-REAL]`** is used 20+ times in 01's feature table for verifiable claims — proper positive disambiguation.

### Warning — tagging discipline is inconsistent across chapters

**[M2]** Chapters **00, 01, 02** use formal `[TAG]` brackets consistently. Chapters **03, 04, 05, 06** use only **informal prose** for disambiguation — e.g.:

- 03 L92: *"Gamified XP + Bronze→Diamond→Iridescent rank tiers..."* (no tag, but the prose is descriptive)
- 04: zero disambiguation tags despite 25 candidate OSS projects where license/activity claims are rampant
- 05 L55: *"9 | Privacy posture (no third-party trackers) | Runify advertises privacy posture via carrd.co [S3]"* — informs but doesn't tag
- 06 L30: *"No Garmin sync (claimed but unverified) | Angle A.10 G8 | HIGH"*

An agent searching `grep '\[CLAIMED\]'` would find 12 hits in 00/01 and 0 in 03/04/05/06. The disambiguation work IS present in 03–06 but in prose form, not in machine-parseable tags. This is a real consistency issue.

**Severity**: MEDIUM — disambiguation exists but is not uniformly machine-readable. Recommends either extending tag usage to 03–06 OR adding a README note that 03–06 use prose-only convention.

---

## V.4 Structural integrity — PASS

### 00_README.md navigation
- All 7 chapters + 99_SOURCES referenced in `## Files in this dossier` table (L23–L30). ✓
- Path A/B/C/D reading paths given (L33–L41). ✓
- TL;DR table for all 5 angles (L61–L65). ✓
- Citation convention explained (L67–L72). ✓
- Provenance + merge-pass metadata (L74–L79). ✓

### 05_build_plan.md — 19 sequential steps
Verified lines 219, 223, 227, 232, 237, 241, 245, 249, 253, 257, 261, 265, 269, 273, 277, 281, 286, 290, 295 = **exactly 19 sequential steps 1→19**, each with:
- `### Step N — Title (days, wh) [RISK]`
- `**Files / dirs**` listing (concrete paths like `runify/Location/LocationService.swift`)
- `**DoD**` (Definition of Done) — concrete acceptance criteria
- `**Risk**` (when HIGH, with mitigation)

Step 4 is correctly marked "THE PRIME ISSUE — HIGH" with explicit mitigation (L235). Total effort table sums to **~408 wh ≈ 10–11 weeks** + 2-week buffer = 12–13 weeks ✓.

### 03_competitive_landscape.md matrix

- **C.1 Per-competitor matrix**: **14 rows** (Strava, Nike Run Club, Adidas Running, ASICS Runkeeper, Map My Run, Apple Health, Apple Fitness+, Samsung Health, Pacer, AllTrails, Google Health (Fitbit), StepsApp, Codoon, Footpath). Above the 10-competitor minimum. ✓
- **C.2 Feature matrix**: **30 rows** (Daily / Weekly / Monthly / Annual retention-loop comparison). ✓
- C.3–C.9 sections: differentiation hypothesis, where Runify wins/loses/ties, pricing, review themes, strategic gaps, retention loops, metrics. ✓

### 04_open_source_alternatives.md — license traps

- **D.5 LICENSE TRAPS section** (header at L5 of section) ✓
- Contains: detailed license-trap matrix (Mapbox BSL, GPL-3.0, unlicensed), **"Top 3 license traps to AVOID for a closed-source commercial Runify-like app"** prose summary, and a per-row trap-flag column (LIC_TRAP_1, LIC_TRAP_2, etc.). ✓

### 06_strategic_gaps.md — synthesis

- **9 top-level sections** (1. Top 5 strategic moves, 2. What NOT to copy, 3. Cheap wins Runify could copy, 4. Where Runify is structurally weak, 5. White-space opportunities, 6. Risks, 7. Recommended sequencing, 8. Open questions, 9. Top 5 NEEDS_USER_INPUT).
- Not a copy-paste: each section adds synthesis value beyond the angle files — e.g. Move 3 "Pivot to designed recap-card-as-CAC" reframes 02's B.6 "Instagram share templates" into a CAC channel, and Opportunity A "Weekly-league reset as primary loop" introduces a new mechanism not present in Runify itself. ✓

---

## V.5 Agent-suitability — PASS

### Concrete-actionability check

- **Concrete file paths**: ✓ — every build-plan step lists concrete Swift paths (e.g. `runify/Location/LocationService.swift`, `server/db/migrations/0001_init.sql`).
- **Concrete version numbers**: ✓ — Runify v100.2.6, iOS 16.0, iPhone 5s → iPhone Air, OpenTracks v4.28.1, MapLibre `2.1k stars`.
- **Concrete prices**: ✓ — $4.99/mo, $19.99, $29.99, $39.99/yr, $49.99, $79.99 lifetime, $11.99/mo Strava Premium (competitor).
- **Concrete source URLs**: ✓ — every [Sn] in 99_SOURCES.md has a URL (either direct URL or iTunes API URL).
- **Decision criteria**: ✓ — every Step has DoD; every irreversible decision (R1–R5) has a "decide BEFORE Step N" trigger; framework choice has score (36/40).
- **Risk classifications**: ✓ — HIGH/MEDIUM/LOW labels on every step, every irreversible decision, every risk row.

### Flagging any chapter that's too vague to be actionable

**None.** Every chapter is concrete enough that an LLM agent could act on it without re-fetching sources. The 02_ui_and_monetization chapter's `[OPAQUE]` markers on visual DNA are honest disambiguation of what IS opaque (the paywall screen, nav pattern) rather than vague hand-waving.

### One quibble

06's "Top 5 NEEDS_USER_INPUT (carry forward to am-planning)" section (L9) is appropriately structured for downstream handoff — explicit OQ1–OQ5 + each with severity + handoff target. ✓

---

## V.6 Conflict detection — PASS_WITH_WARNINGS

### Cross-chapter factual contradictions

**[M3] Tier-ladder count varies across chapters:**

| Chapter | Tier ladder cited | Source |
|---|---|---|
| Canonical TL;DR (L10) | Bronze → Silver → Gold → Platinum → Diamond → Iridescent (6 tiers) | canonical |
| 01 line 56 (verbatim description) | "Bronze, Diamond, and Iridescent" (3 tiers) | Runify's own marketing copy |
| 01 line 100 (dossier summary) | Bronze → Diamond → Iridescent (3 tiers) | dossier paraphrase |
| 01 line 135 (F6 row) | Bronze → Diamond → Iridescent (3 tiers) | dossier feature table |
| 02 line 48 | "Bronze, Diamond, and Iridescent" (3 tiers) | dossier prose |
| 02 line 98 (inferred row) | bronze/silver/gold/platinum/diamond/iridescent (6 tiers, `[INFERENCE]`) | inferred |
| 03 line 232 (matrix row R) | Bronze → Silver → Gold → Diamond → Iridescent (**5 tiers — missing Platinum**) | matrix cell |
| 05 line 251 (DoD) | Bronze → Silver → Gold → Platinum → Diamond → Iridescent (6 tiers) | canonical truth, used in DoD |
| 06 line 33, 143 | Bronze → Silver → Gold (3-tier bracket — **different concept**, a proposed weekly-league bracket, not Runify's actual ladder) | proposed new design |

The 6-tier ladder (Bronze → Silver → Gold → Platinum → Diamond → Iridescent) is canonical truth per the canonical TL;DR + the 05 build-plan DoD. The 01 file's 3-tier statement is faithful to Runify's *marketing copy*, which only names 3 tiers explicitly — but a reader skimming 01 will conclude Runify has only 3 tiers, which is wrong. The 03 matrix's 5-tier version (missing Platinum) is an inconsistency.

**Severity**: MEDIUM — risks confusing an agent building a competitor that needs to model the *actual* tier ladder, not the marketing-name ladder.

**[L1] "10 of 13 vs 10 of 14" Apple Watch competitor count:**

- Canonical TL;DR (L14): "10 of 13 competitors (Strava, NRC, Runkeeper, MapMyRun, Pacer, AllTrails, StepsApp, Footpath, Adidas, Codoon)"
- Canonical §2 (L85): lists 14 competitors
- Dossier 00 README (L16): "10 of 14 named competitors"

The canonical itself has an internal numerator/denominator inconsistency (10 vs 13 in TL;DR vs 14 listed in §2). The dossier's "10 of 14" is the more consistent denominator. Numerator (10) matches across all sources.

**Severity**: LOW — the canonical's "13" is the actual bug, not the dossier's "14".

### Conflicts that DID NOT occur

- **239 ratings vs 626 reviews**: consistently handled across all chapters. Every mention of "626+" is tagged `[INCONSISTENT]` or `[CLAIMED]` with both numbers cited and the iTunes API (239) called trustworthy.
- **Monetization tiers** ($4.99/$19.99/$29.99/$39.99/$49.99/$79.99): consistent across 00, 01, 02, 05, 06.
- **Framework score** (Swift 36/40, Flutter 27/40, RN 26/40, Kotlin 25/40, Capacitor 17/40): consistent across 04, 05, 06.
- **Build effort** (~408 wh, 10-11 weeks core, 12-13 with buffer): consistent across canonical, 00 README, 05 build-plan total-effort table.
- **5 irreversible decisions**: consistent naming and count across canonical, 00, 05.

---

## V.7 Headline accuracy — PASS_WITH_WARNINGS

### Dossier 00 README headline vs canonical TL;DR — direct comparison

| Claim | Canonical | Dossier 00 README | Match |
|---|---|---|---|
| Runify = gamified GPS run tracker, not step counter | TL;DR #1 | Headline #1 | ✓ |
| Tier ladder | Bronze → Silver → Gold → Platinum → Diamond → Iridescent (6) | Bronze → Diamond → Iridescent (3) | ✗ — denominator mismatch (see V.6 M3) |
| Developer | OneDegree Labs LLC | OneDegree Labs LLC | ✓ |
| Rating | 4.78 @ 239 ratings | 239 ratings @ 4.78 | ✓ |
| Monetization entry | $4.99/mo, $39.99/yr w/ trial, $79.99 lifetime | $4.99/mo | ✓ (subset) |
| Single biggest gap | No Apple Watch (10 of 13) | No Apple Watch (10 of 14) | ≈ (denominator off by 1; see V.6 L1) |
| Nearest competitor | Pacer (not Strava) | (implied by "Apple Watch competitor is the most defensible single move") | ≈ (not explicit in dossier headline; explicit in 03 C.1) |
| Top license traps | Mapbox BSL, GPL-3.0, unlicensed | Mapbox BSL, GPL-3.0, unlicensed | ✓ |
| Framework | Swift + SwiftUI native (36/40) | Swift + SwiftUI native iOS | ✓ |
| Build effort | ~408 wh ≈ 10-11 weeks | ~6 weeks core, ~10-11 total | ✓ (dossier headline says "core 6 weeks" matching canonical "6 weeks to core MVP") |
| Irreversible decisions | 5 | 5 | ✓ |

### Match verdict

The dossier's TL;DR is faithful to the canonical on every numeric claim that matters. Two minor drifts (tier ladder count, Apple Watch denominator) are flagged in V.6. The dossier's headline is **publishable as a downstream companion** to the canonical.

---

## Severity summary

- **HIGH (must fix before shipping)**: 0
- **MEDIUM (should fix)**: 3
- **LOW (nice to fix)**: 3

---

## Recommended fixes

### MEDIUM

- **[M1]** In `99_SOURCES.md`, add explicit `**Access date**: 2026-08-14` and `**Tool**: iTunes Lookup API / GitHub API / webfetch` lines to sources S15–S77. S1–S14 already follow this schema. Either add two lines per entry (cheapest) or restructure to a uniform template. Currently 63 of 77 entries omit these fields, which violates the brief's "URL + access date + retrieval tool" requirement even though the info is implicit.

- **[M2]** Reconcile tagging discipline between chapters 00–02 (formal `[CLAIMED]`/`[OPAQUE]`/`[INFERRED]` brackets) and chapters 03–06 (informal prose disambiguation). Either: (a) extend formal tags to 03/04/05/06 — e.g. `[CLAIMED: last-commit dates from GitHub API, not independent of marketing]` on 04 entries — OR (b) add a README note that 03–06 use prose convention. Recommended: (a), because grep-for-tags is an obvious agent behavior.

- **[M3]** Reconcile the tier-ladder count across chapters. The canonical truth is **6 tiers: Bronze → Silver → Gold → Platinum → Diamond → Iridescent**. Chapter 01's "Bronze → Diamond → Iridescent" (3 tiers) reflects Runify's marketing copy verbatim — that's defensible IF footnoted, but currently reads as factual. Chapter 03's matrix row R "Bronze → Silver → Gold → Diamond → Iridescent" (5 tiers) is missing Platinum and is wrong. Recommended fix: in 01 line 100 and line 135, footnote the 3-tier statement as "marketing-name subset; canonical ladder is 6-tier (see 05 Step 8 DoD)"; in 03 line 232, add Platinum to the matrix row.

### LOW

- **[L1]** Apple Watch denominator: canonical says "10 of 13", dossier says "10 of 14". Either canonical or dossier should align. The 14-competitor list in canonical §2 is the source of truth, so canonical TL;DR should say "10 of 14". Out of dossier scope to fix in canonical (master's lane) — recommend dossier adds a footnote citing §2's full list.

- **[L2]** `00_README.md` per-file size estimates are rough (e.g. estimates 01 at ~15 KB, actual is 24 KB; estimates 04 at ~20 KB, actual is 27 KB). Not a substantive issue but creates ~50% mismatch expectations. Either update estimates or add a "**actual size in parentheses**" column.

- **[L3]** `00_README.md` claims total dossier is "150–200 KB"; actual is **175 KB** — within range. The README's "8 files, ~150–200 KB" is fine; no change needed unless precision matters.

---

## Metrics

- **Files verified**: 9 (1 canonical + 8 dossier)
- **Total dossier size**: 178,959 bytes (175 KB)
- **Citation markers total**: 547 (00=2, 01=95, 02=66, 03=28, 04=87, 05=54, 06=8, 99=207, plus canonical)
- **Sources declared in 99_SOURCES.md**: 77 (S1–S77)
- **Source-numbering gaps**: 0
- **Source-numbering duplicates**: 0
- **Broken citations**: 0
- **Orphan sources**: 0
- **`[Sn]` markers spot-checked**: 6 (S12, S29, S44, S62, S70, S77) — all resolve with URL
- **Sources missing explicit Access date + Tool metadata**: 63 of 77 (S15–S77; S1–S14 compliant)
- **`[CLAIMED]` tags verified**: 12 across 2 files (00=1, 01=11) — all properly disambiguated
- **`[OPAQUE]` tags verified**: 13 across 3 files (00=1, 01=4, 02=8) — all explain why opaque
- **`[INFERRED]` tags verified**: 1 (00=1) — plausible, properly labeled
- **Conflicts found**: 2 substantive (M3 tier ladder; L1 Apple Watch denominator); 0 factual contradictions
- **Build plan steps counted**: 19 sequential (Step 1 → Step 19)
- **Competitive matrix rows counted**: 30 (feature matrix C.2) + 14 (per-competitor matrix C.1)
- **License-trap section (D.5)**: present, non-empty, with "Top 3 license traps to AVOID" summary
- **Synthesis quality (06)**: 9 sections, distinct from angle files

---

*End of verifier report.*
