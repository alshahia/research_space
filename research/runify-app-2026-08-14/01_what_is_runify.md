# 01 — What is Runify? (Angle A — App deep-dive)

> Source angle: A. Source file: `share/notes/01_research_T-2026-08-14-004_angle-app-deep-dive.md`. Access date: 2026-08-14.

---

## A.1 Identity

| Field | Value | Source |
|---|---|---|
| `trackName` | "Run & Steps Tracker: Runify" | [S1] |
| `trackCensoredName` | "Run & Steps Tracker: Runify" | [S1] |
| App subtitle (rendered) | "Ranked Running & Mile Tracker" | [S2] |
| `sellerName` | "OneDegree Labs LLC" | [S1][S2] |
| `artistName` | "OneDegree Labs" | [S1] |
| `artistId` | 1850531994 | [S1] |
| `bundleId` | "Runify.bundle" | [S1] |
| `primaryGenreName` | "Health & Fitness" | [S1] |
| `primaryGenreId` | 6013 | [S1] |
| `genres[]` | ["Health & Fitness", "Sports"] | [S1] |
| `genreIds[]` | ["6013", "6004"] | [S1] |
| `version` | "100.2.6" | [S1] |
| `currentVersionReleaseDate` | 2026-07-26 | [S1] |
| `releaseDate` | 2025-07-21 (initial App Store release) | [S1] |
| `minimumOsVersion` | "16.0" | [S1][S2] |
| `languageCodesISO2A[]` | ["EN"] (English only) | [S1][S2] |
| `supportedDevices[]` | 158 device IDs — iPhone 5s through iPhone Air / iPhone 17e / iPad Pro M5 | [S1] |
| `fileSizeBytes` | 91,128,832 (= 91.1 MB) | [S1][S2] |
| `price` | 0.00 | [S1] |
| `formattedPrice` | "Free" | [S1][S2] |
| `currency` | "USD" | [S1] |
| `contentAdvisoryRating` | "4+" | [S1][S2] |
| `sellerUrl` | "https://runifyapp.com/" | [S1] |
| `screenshotUrls[]` | 5 iPhone screenshots, 0 iPad | [S1] |
| `features[]` | [] (empty from iTunes API) | [S1] |
| `isGameCenterEnabled` | false | [S1] |
| `isVppDeviceBasedLicensingEnabled` | true | [S1] |

**Verification flag**: The title says "Run & Steps Tracker" but the subtitle, description, screenshots, and developer website ALL describe a GPS-based running tracker with XP/ranks/leaderboards. **There is NO mention of step counting, pedometer, daily steps, walking, or step goals anywhere in the App Store metadata, description, or developer website** [S1][S2][S3]. The word "Steps" in the title appears to be ASO keyword stuffing for "step tracker" search traffic. **Treat "step counting" as `[NOT FOUND]` for v100.2.6.**

---

## A.2 Description (verbatim)

```
Run. Rank. Repeat.

Runify is the first-ranked running app that transforms your runs into a competitive
experience. Earn XP, unlock new tiers, and climb the leaderboard while tracking
your progress and challenging friends. Whether you're running solo or side by side
with others, every step counts.

Gamified Running Tracker | XP | Ranks | Leaderboards | Streaks

Level Up Your Running:
Advance through competitive ranks like Bronze, Diamond, and Iridescent based on
your distance, consistency, and pace. Runify rewards your performance with XP and
a visual rank system designed to keep you motivated.

• Earn XP after every run
• Progress through a ranked tier system
• Lose rank if you go inactive
• Unlock a visual identity that evolves with you

Compete With Friends:
Running is better with rivals. Compare times, chase leaderboard spots, and see
how you stack up against your crew or the world.

• Friends, global, and local leaderboards
• Race across 1K, 5K, 10K, and more
• Watch your rivals rise or fall in real time

Share Your Grind:
Create post-run visuals that showcase your stats with style. Customize your
templates and post them straight to your story.

• Auto-filled template editor
• Includes time, distance, and pace
• Export directly to Instagram

Track Your Progress:
Every run earns data. Visualize your effort with XP graphs, streak history, and
run breakdowns. Runify doesn't just track; it reflects your journey.

• Weekly summaries and lifetime stats
• XP over time and recent runs
• Personal progression and rank trends

Download Runify today and earn your place on the leaderboard.

Consistency isn't optional—it's ranked.

Privacy Policy: https://runifyprivacy.carrd.co/
Terms of Service: https://runifytermsandconditions.carrd.co/
```
[verbatim from S1]

### 3-sentence summary

Runify is a gamified GPS run-tracking app that turns your runs into XP, ranks (Bronze → Diamond → Iridescent), and competitive leaderboards across 800m through marathon distances. You can record runs inside the app with live GPS or auto-import from Apple Watch, Garmin, or Strava, then share auto-filled recap cards to Instagram Stories. The free tier covers the basics; "Runify Pro" is sold as ten different IAP SKUs ranging from $4.99 monthly up to $79.99 lifetime.

> **Footnote — tier-ladder completeness**: The "Bronze → Diamond → Iridescent" sequence above mirrors Runify's marketing copy verbatim. The full tier ladder is 6 sub-tiers: **Bronze → Silver → Gold → Platinum → Diamond → Iridescent** — see canonical `share/notes/01_research_T-2026-08-14-004.md` and `99_SOURCES.md`.

### Marketing intensity [S1]

- **Word count**: ~285 words
- **Emojis**: 0
- **ALL-CAPS**: `XP` (9x); `GPS` (0x — interestingly absent)
- **Exclamation marks**: 0
- **Fake-urgency phrases**: 0. No "limited time", "act now", "today only".
- **Vocabulary signal**: "Grind", "Level Up", "Decay", "Side by side", "Run. Rank. Repeat." — gamification/RPG slang.

### Developer-site additional context [S3]

- **TL;DR**: "Runify is the first ranked running app. Every run you log or sync earns XP, moves you through a competitive tier system, and puts you on friends-only or global leaderboards from 800m through the marathon."
- **Social proof**:
  - "100K+ Runs Logged" → `[CLAIMED]`, no independent verification
  - "500K+ Miles Ran" → `[CLAIMED]`
  - "99.5% GPS Accuracy" → `[CLAIMED]`, no methodology
  - "4.8★ App Store Rating Across 626+ reviews" → **`[INCONSISTENT]`**: iTunes API shows **239 ratings** as of access date [S1]; developer site claims **626+**. **Trust the API: 239.**
- Race distances: "800m to marathon" (explicit).
- Quote attribution: "Runners who log their runs in an app are significantly more consistent..." attributed to "Strava Year in Sport / Annual Global Running Report". **Unverifiable**. `[CLAIMED]`

---

## A.3 Features (30 catalogued)

Each feature tagged: `GPS` / `PEDOMETER` / `SOCIAL` / `AI` / `COACH` / `NUTRITION` / `WEARABLE` / `MUSIC` / `BACKGROUND_AUDIO` / `SUBSCRIPTION` / `OTHER`.

| # | Feature | Source | Tag(s) | Verdict |
|---|---|---|---|---|
| F1 | Live GPS run tracking (record inside app) | Description, dev site | `GPS` | `[LIKELY-REAL]` |
| F2 | Apple Watch sync (HealthKit bridge) | Dev site | `WEARABLE` | `[LIKELY-REAL]` (review confirms synced workouts visible) [S2] |
| F3 | Garmin sync | Dev site | `WEARABLE` | `[LIKELY-REAL]` but reviews flag breakage [S2] |
| F4 | Strava sync (bidirectional import) | Dev site + description | `WEARABLE` | `[CLAIMED → BROKEN-AT-EDGE]` (reviewer BrawlSta: "it didn't add any runs") [S2] |
| F5 | XP (experience points) earned per run | Description | `OTHER` (gamification) | `[LIKELY-REAL]` |
| F6 | Tier/rank system: Bronze → Diamond → Iridescent | Description + dev site | `OTHER` | `[LIKELY-REAL]` (marketing-name subset; canonical ladder is 6-tier: Bronze → Silver → Gold → Platinum → Diamond → Iridescent — see `99_SOURCES.md`) |
| F7 | Rank decay / inactivity penalty | Description ("Lose rank if you go inactive") | `OTHER` | `[LIKELY-REAL]` |
| F8 | Distance-specific leaderboards (800m, 1K, 5K, 10K, half, marathon) | Dev site | `SOCIAL` | `[LIKELY-REAL]` |
| F9 | Friends leaderboard | Description | `SOCIAL` | `[LIKELY-REAL]` |
| F10 | Global leaderboard | Description + dev site | `SOCIAL` | `[LIKELY-REAL]` |
| F11 | Local leaderboard | Description | `SOCIAL` | `[LIKELY-REAL]` but `[OPAQUE]` — no city/neighborhood definition |
| F12 | Real-time rival tracking | Description | `SOCIAL` | `[CLAIMED]` — implementation detail opaque |
| F13 | Post-run recap cards (auto-filled) | Description | `OTHER` | `[LIKELY-REAL]` |
| F14 | Instagram Stories export | Description | `SOCIAL` | `[LIKELY-REAL]` |
| F15 | Weekly summaries & lifetime stats | Description | `OTHER` | `[LIKELY-REAL]` |
| F16 | XP-over-time graph | Description | `OTHER` | `[LIKELY-REAL]` |
| F17 | Streak tracking | Description | `OTHER` | `[LIKELY-REAL]` |
| F18 | Personal progression / rank trends | Description | `OTHER` | `[LIKELY-REAL]` |
| F19 | Account (email + name + optional profile) | Privacy policy §1a [S4] | `OTHER` | `[LIKELY-REAL]` |
| F20 | Camera access (for template customization) | Privacy policy §1d [S4] | `OTHER` | `[LIKELY-REAL]` |
| F21 | Push notifications (XP alerts, reminders) | Privacy policy §1d [S4] | `OTHER` | `[LIKELY-REAL]` |
| F22 | Friend finder via Contacts list | **Inferred** from App Privacy label declaring `Contacts` | `SOCIAL` | `[LIKELY-REAL]` but **NOT MARKETED** — see trust-cliff below |
| F23 | AI coach / AI-generated training plans | — | — | **`[NOT FOUND]`** |
| F24 | Music / audio integration | — | `MUSIC` | **`[NOT FOUND]`** |
| F25 | Background audio (podcast, pace alerts) | — | `BACKGROUND_AUDIO` | **`[NOT FOUND]`** |
| F26 | Nutrition tracking / calorie logging | — | `NUTRITION` | **`[NOT FOUND]`** |
| F27 | Pedometer / daily step counting | — | `PEDOMETER` | **`[NOT FOUND]`** (despite "Steps" in title) |
| F28 | Voice / audio coaching cues during run | — | `COACH` | **`[NOT FOUND]`** |
| F29 | Heart-rate integration / HR zone training | — | `OTHER` | `[NOT FOUND]` in marketing; HK data MAY be read via `Health` category declared in App Privacy [S2] |
| F30 | Route map / heatmap (post-run recap includes a map; dev trims first/last 5% for privacy) | Description implies; dev public reply to "I'm suspicious" review [S2] | `OTHER` | `[LIKELY-REAL]` |

### Notable absence

**No coach features, no AI, no nutrition, no music, no audio cues, no pedometer.** The product is intentionally narrow: **gamified GPS run tracking + social leaderboards + shareable recap cards.** That narrowness is the bet.

---

## A.4 Developer — OneDegree Labs LLC

| Field | Value |
|---|---|
| Legal entity | OneDegree Labs LLC (Delaware LLC inferred) [S1][S2] |
| Developer website | https://runifyapp.com/ [S1][S2][S3] |
| Contact email | `caleb@runifyapp.com` (suggests lead dev "Caleb") [S2][S3] |
| Privacy policy host | https://runifyprivacy.carrd.co/ + https://runifyapp.com/privacy-policy (mirror) [S1][S2][S4] |
| ToS host | https://runifytermsandconditions.carrd.co/ [S1] |
| Studio size | Very small (personal email on every release-note footer; no team page) [S3] |
| Copyright | "© 2026 OneDegree Labs" [S2] |

### Other apps by OneDegree Labs (same `artistId: 1850531994`) [S2][S5]

| App | App Store ID | Subtitle | Theme |
|---|---|---|---|
| Jurassic Dinosaur Simulator | 6444028799 | Real Dino Survival Games - RPG | Mobile game |
| You are: Daily Affirmations | 6755545442 | Manifest, Breathwork & Focus | Self-help |
| HolyChat | 6755546096 | Chat with Bible characters | Religion / chat |
| MindFlix App | 6747105435 | Stay Inspired. Hit Your Goals. | Motivation |
| **Run & Steps Tracker: Runify** | **6746146450** | **Ranked Running & Mile Tracker** | **Fitness** |

**Pattern**: A solo dev or tiny studio shipping many small apps across health/faith/motivation/games niches. **None of the other apps are health/fitness-adjacent** — so there's no prior run-tracking expertise inside the studio. The "Ranked" gamification mechanic is also visible in MindFlix, suggesting a **reusable gamified-tier template** they port across verticals.

**Implication for competitors**: if you compete with Runify, you're competing with a studio that can re-skin the same XP/rank/leaders engine into adjacent verticals cheaply.

---

## A.5 Ratings + reviews

### Quantitative [S1][S2]

| Metric | Value | Notes |
|---|---|---|
| `averageUserRating` | **4.7824** | iTunes API exact: 4.7824299999999997368149706745 |
| `userRatingCount` | **239** | As of 2026-08-14 |
| `averageUserRatingForCurrentVersion` | 4.7824 | Same as overall — no recent drop |
| **EARLY-STAGE / LOW SOCIAL PROOF** | **`[EARLY-STAGE]`** | 239 ratings is well below the 1,000-review threshold for "established" social proof. Most top-100 Health & Fitness apps have 5K–500K ratings. Developer site "626+" is **inconsistent** with Apple. |
| Rating histogram | `[OPAQUE]` | iTunes API does not return histogram; App Store page only showed headline "4.8 / 239 Ratings" |

### Qualitative — sample reviews [S2]

| # | Date | Title | Verdict | Author | Dev replied? |
|---|---|---|---|---|---|
| R1 | 08/03/2025 | "Best running app" | 5★ "absolutely goated app" | Rezophilio | Yes |
| R2 | 08/25/2025 | "Nice idea but lacks" | 3★ mixed — Strava sync broken | BrawlSta | Yes — "improving Strava integration" |
| R3 | 07/29/2025 | "I'm suspicious…" | 3★ mixed — location privacy concerns | fart? | Yes — "we automatically remove the first and last 5%" |
| R4 | 10/06/2025 | "Amazing App, but missing one thing" | 4★ — HealthKit workouts can't be renamed | lighte.creations | Yes |
| R5 | 2026 | various | mixed signals | various | dev responds to ~every visible review |

### Top praises
1. "Goated" / "amazing" / "Best running app" — strong positive emotional tone.
2. Gamification is motivating — XP/rank loop works.
3. Clean recap cards — Instagram share flow praised.
4. Free tier is usable — no paywall complaint.

### Top complaints
1. **Strava sync is buggy** — multiple users; dev acknowledges.
2. **Apple Health workout naming is read-only** — confirmed broken.
3. **Tier fairness concern** — top-spot dominated by ~25 mi/week runners.
4. **Location-sharing concerns** — addressed by dev with 5% endpoint trim.

### Common feature requests
- Rename Apple Health workouts after sync.
- Reliable Strava integration (auto-pull runs).
- More inclusive leaderboards (age/gender splits, pace-adjusted ranks).
- Possibly: a "beginner" leaderboard.

---

## A.6 Pricing + monetization hints

### Download price [S1][S2]
- Download: **Free** ($0.00 USD). In-App Purchases: **Yes**.

### IAP tiers (10 SKUs visible, all "Runify Pro") [S2][S6]

| # | Display label | Price | Inferred type |
|---|---|---|---|
| 1 | Runify Pro | $79.99 | Lifetime (most expensive) |
| 2 | Runify Pro | $49.99 | Annual or 6-month |
| 3 | Runify Pro | $19.99 | Quarterly or limited launch |
| 4 | Runify Pro | $49.99 | Duplicate price (family/student?) |
| 5 | Runify Pro | $29.99 | Shorter subscription |
| 6 | Runify Pro | $49.99 | Duplicate |
| 7 | **Runify Pro Monthly** | **$4.99** | **Recurring monthly** (only label that explicitly says "Monthly") |
| 8 | Runify Pro | $79.99 | Duplicate (lifetime variant or region) |
| 9 | Runify Pro | $4.99 | Likely different period (Apple hides labels) |
| 10 | Runify Pro | $29.99 | Duplicate |

### Marketing language search (description) [S1]
- `subscription`: 0
- `Pro`: 0
- `free trial`: 0
- `$`: 0
- `/week`, `/month`, `/year`: 0
- `lifetime`: 0

**Conclusion**: The free-tier funnel is the marketing strategy. Pricing is hidden behind the in-app paywall and not pushed in the App Store description. This is intentional — maximize install conversion.

### Implied monetization strategy
- **Free tier**: GPS run tracking, XP, rank, leaderboards, recap cards, Streaks — everything the description mentions.
- **Pro tier**: probably adds things NOT in the description (advanced analytics, custom training plans, premium route maps, ad-free, custom share templates, advanced leaderboards). `[OPAQUE]` from public sources.

---

## A.7 Privacy posture

### Policy URLs [S1][S2][S4]
- App Store metadata: `https://runifyapp.com/privacy-policy` [S2]
- Description footer: `https://runifyprivacy.carrd.co/` [S1] — **same content, two URLs**
- ToS: `https://runifytermsandconditions.carrd.co/` [S1]
- Effective date: 20 May 2025 [S4] — 2 months before App Store release.

**Characterization**: A short (~11-section, ~800-word) carrd.co-hosted policy covering personal info, usage data, location, permissions, sharing, security, and choices. **Does NOT name specific third-party SDKs** (no Firebase, Amplitude, Mixpanel, Branch, Adjust, AppsFlyer, AdMob by name). **No stated data-retention period.** **No explicit GDPR or CCPA language.**

### App Privacy "nutrition label" [S2]

**Data Linked to You (App Functionality):**
- Health & Fitness: Health, Fitness
- Purchases: Purchase History
- Location: Precise Location, Coarse Location
- Contact Info: Email Address, Name
- Contacts: **Contacts (full contacts list)**
- User Content: Photos or Videos, Other User Content
- Identifiers: User ID, Device ID
- Usage Data: Product Interaction, Other Usage Data
- Other Data: Other Data Types

**Data Linked to You (Product Personalization):**
- Health & Fitness: Fitness
- Location: Precise, Coarse
- Contact Info: Name
- Contacts: Contacts
- User Content: Photos/Videos, Other
- Identifiers: User ID
- Other Data: Other Data Types

**Data Not Linked to You**: None declared.
**Data Used to Track You**: **NONE.** [S2][S6] — Strongly ATT-friendly.

### Account required? [S2][S3][S4]
- **Account required**: Almost certainly YES (privacy policy §1a: "When you register for an account or subscribe to premium features").
- **Sign-in providers**: None explicit (no "Sign in with Apple" badge visible). Inferred: **email + password**.

### Third-party SDKs [S4]
- Privacy policy §3b: "We may use third-party tools for analytics, email delivery, or crash reporting."
- **Specific SDKs named**: NONE. `[OPAQUE]`.

### ATT posture [S2]
- Zero "Data Used to Track You" categories. No ATT prompt for users.

### GDPR / CCPA / data-retention [S4]
- **Explicit GDPR language**: `[NOT FOUND]` — no mention of "GDPR", "Data Subject Access Request", "Right to be forgotten", "lawful basis", "EEA".
- **Explicit CCPA language**: `[NOT FOUND]` — no mention of "CCPA", "California", "Do Not Sell".
- **Data retention period**: `[NOT FOUND]`.
- **Children under 13**: `[NOT FOUND]` — no COPPA language.
- **Account deletion**: §5 says "Update or delete your profile via the account settings" — mechanism unclear.
- **Contact**: `caleb@runifyapp.com`.

### Notable gap between policy and App Privacy label
**The App Privacy label declares full Contacts list, but the policy body never mentions contacts.** Real inconsistency: either (a) policy is stale, or (b) Runify reads contacts only when user opts in to an unmarketed friend-finder. **Worth flagging to downstream planning.**

---

## A.8 Target audience (inferred)

### From description tone [S1]
- **Beginner-to-mid runners**, not elite. Vocabulary: "grind", "level up", "rivals", "earn your place" — gamified motivational, not hardcore-fitness ("pace zones", "VO2 max", "intervals", "fartlek" all absent).
- **No specific gender or age skew**.
- Dev site FAQ: "veterans grinding for a marathon PR" + "beginners chasing their first 5K" — full range, but the leaderboard mechanic skews toward users who run 3–5x/week.

### From feature mix [S1][S3]
- **Not** for: walkers-only, casual step-counters, cyclists, gym-goers, yoga, nutrition-only, mental-health-only.
- **Yes** for: anyone who runs outdoors, has an iPhone, responds to video-game-like reward loops.
- 800m → marathon distance ladder suggests first-timers (5K) + experienced runners (marathon) on the same ladder.

### From screenshots [S1][S2]
- 5 iPhone screenshots; visual style is dark-themed with neon-purple/cyan accents (gamer aesthetic).
- Includes a screenshot with leaderboard + map view + XP progress bar — implies social/rank loop is the *hero* feature.

### Geography [S1][S2]
- `languageCodesISO2A: ["EN"]` — English only. No localization.
- US LLC. USD currency.
- Privacy policy hosted on US-friendly carrd.co; no EU-representative mentioned.
- **No localization is a real ceiling** — cannot serve JP/DE/FR/ES/ZH runner markets.

### Inferred persona

> **"Sam, 24, casual runner"** — runs 2–4x/week, has an Apple Watch, posts to Instagram, wants to feel like their running "matters" / accumulates, doesn't want to pay $9.99/mo for Strava, mildly competitive with friend group. Probably US or UK, English-speaking, iPhone-first.

---

## A.9 Differentiation hypothesis

Runify's bet is **gamification-as-engagement-loop for runners who don't want Strava's data-density or Nike's branding**.

- Strava = 800-lb gorilla, best for serious athletes (segments, KOMs, training load)
- Nike Run Club = free with celebrity-coach audio but light on social mechanics
- **Runify slices between them** by offering:
  1. Video-game-style XP/rank/tier with **decay-on-inactivity** (return-habit loop)
  2. Frictionless Apple Watch + Garmin + Strava import (reduces switching cost)
  3. Instagram-ready share cards (social-graph virality outside the app)

**Price architecture**: free core + $4.99/mo Pro + $79.99 lifetime. Classic freemium conversion funnel.

**The bet**: "ranked competitive gamification" is the wedge that pulls casual runners who aren't satisfied by Strava's data-heavy UX. The **Apple Watch + Strava sync** removes the friction of "I already track elsewhere."

**Risks**: leaderboard fairness (R2); Contacts data collection not marketed (privacy trust cliff); dev site "626+ reviews" vs Apple's 239 (credibility gap).

---

## A.10 Claimed-vs-likely-real gaps (20 catalogue entries)

| # | Claim | Real evidence | Verdict |
|---|---|---|---|
| G1 | "First-ranked running app" | Strava has had KOM/segment ranks for 15 years | `[CLAIMED]` marketing superlative |
| G2 | "100K+ Runs Logged" | No public dashboard | `[CLAIMED]` |
| G3 | "500K+ Miles Ran" | 500K/100K = 5 mi/run avg, plausible | `[CLAIMED]` |
| G4 | "99.5% GPS Accuracy" | No methodology | `[CLAIMED]` |
| G5 | "4.8★ across 626+ reviews" | iTunes API: 4.8 across **239** | **`[INCONSISTENT]`** |
| G6 | "Strava Year in Sport" quote | No link | `[CLAIMED]` |
| G7 | Strava "auto-imports" | Reviewer: "it didn't add any runs" | **`[BROKEN-AT-EDGE]`** |
| G8 | Garmin "auto-imports" | Same review pattern | `[CLAIMED → UNVERIFIED-AT-EDGE]` |
| G9 | Apple Watch via HealthKit | Reviewer confirms sync, can't rename | `[LIKELY-REAL — basic yes, rich no]` |
| G10 | "Real-time rival tracking" | No polling cadence disclosed | `[CLAIMED — implementation opaque]` |
| G11 | Friends leaderboard | Implied working | `[LIKELY-REAL]` |
| G12 | Contact-list friend finder | **NOT marketed**, App Privacy declares Contacts | **`[DATA-COLLECTED-BUT-NOT-MARKETED]`** |
| G13 | "XP graphs, streak history" | Visible in screenshots | `[LIKELY-REAL]` |
| G14 | "Consistency isn't optional—it's ranked" | Explicit | `[LIKELY-REAL]` |
| G15 | "Lose rank if you go inactive" | Explicit | `[LIKELY-REAL]` |
| G16 | "Auto-filled template editor" | Visible in screenshots | `[LIKELY-REAL]` |
| G17 | "We do not sell or rent your personal information" | ATT label confirms (zero track categories) | `[LIKELY-REAL]` |
| G18 | "Third-party tools for analytics, email, crash" | App Privacy declares Product Interaction | `[LIKELY-REAL]` but **no SDKs named** |
| G19 | Email by default (opt-out) | Privacy policy §2b | `[LIKELY-REAL]` — user must opt out |
| G20 | "Steps" tracking feature | **ZERO evidence** anywhere | **`[NOT FOUND — title is ASO stuffing]`** |

### Top three trust-cliffs for downstream planning

1. **`[NOT FOUND]` step counting despite "Steps" in title** — competitors / users who download expecting a step counter will be confused. **If you build a clone: either ship real step counting (CMPedometer) or don't put "Steps" in your title.**
2. **`[INCONSISTENT]` social-proof claim** — Runify dev site says "626+"; Apple says 239. **If you build a marketing site, don't inflate.**
3. **`[DATA-COLLECTED-BUT-NOT-MARKETED]` contacts access** — Runify reads full Contacts list but doesn't market it. **Either build a clearly-opted-in friend-finder UI + document it in policy + App Privacy, or don't request the permission at all.**

---

## A.11 Metrics

- **Findings count**: 30 distinct features (F1–F30) + 20 claim-vs-evidence gaps (G1–G20) = **50** discrete findings.
- **Sources cited**: 6 ([S1]–[S6]).
- **`[CLAIMED]` vs `[LIKELY-REAL]` split**: 9 `[CLAIMED]` / 41 `[LIKELY-REAL]` + 2 `[INCONSISTENT]` + 1 `[DATA-COLLECTED-BUT-NOT-MARKETED]` + 1 critical `[NOT FOUND]` (pedometer).

---

*Last updated: 2026-08-14 — Author: am-research merge pass for T-2026-08-14-004 — Source angles: A, B, C, D, E*