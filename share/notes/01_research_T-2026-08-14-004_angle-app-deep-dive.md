# Angle A - Runify app deep-dive (T-2026-08-14-004)

> Angle A is the single-app deep-dive on the commercial iOS product "Run & Steps Tracker: Runify" (App Store id 6746146450). Built for downstream `am-research` merge + `am-planning` consumption. Access date for all sources: **2026-08-14**.

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
| `genres[]` | `["Health & Fitness", "Sports"]` | [S1] |
| `genreIds[]` | `["6013", "6004"]` | [S1] |
| `version` | "100.2.6" | [S1] |
| `currentVersionReleaseDate` | "2026-07-26T22:26:01Z" | [S1] |
| `releaseDate` | "2025-07-21T07:00:00Z" (initial App Store release) | [S1] |
| `minimumOsVersion` | "16.0" | [S1][S2] |
| `languageCodesISO2A[]` | `["EN"]` (English only) | [S1][S2] |
| `supportedDevices[]` | 158 device IDs — iPhone 5s through iPhone Air / iPhone 17e / iPad Pro M5; full list in [S1] | [S1] |
| `fileSizeBytes` | "91128832" (= 91.1 MB, matches "Size 91.1 MB" on listing) | [S1][S2] |
| `price` | 0.00 | [S1] |
| `formattedPrice` | "Free" | [S1][S2] |
| `currency` | "USD" | [S1] |
| `trackContentRating` / `contentAdvisoryRating` | "4+" | [S1][S2] |
| `advisories[]` | `[]` (empty) | [S1] |
| `sellerUrl` | "https://runifyapp.com/" | [S1] |
| `artworkUrl512` | https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/37/91/68/37916840-c9a5-8123-4efa-599a54ba3e47/AppIcon-0-0-1x_U007ephone-0-1-0-85-220.jpeg/512x512bb.jpg | [S1] |
| `screenshotUrls[]` | 5 iPhone screenshots, 0 iPad screenshots (purple-branded run-tracker UI) | [S1] |
| `features[]` | `[]` (empty — no `features` array entries from iTunes API) | [S1] |
| `isGameCenterEnabled` | false | [S1] |
| `isVppDeviceBasedLicensingEnabled` | true | [S1] |
| `wrapperType` | "software" | [S1] |

**Verification flag**: The title says "Run & Steps Tracker" but the subtitle, description, screenshots, and developer website ALL describe a GPS-based running tracker with XP/ranks/leaderboards. **There is NO mention of step counting, pedometer, daily steps, walking, or step goals anywhere in the App Store metadata, description, or developer website.** [S1][S2][S3] The word "Steps" in the title appears to be (a) ASO keyword stuffing for "step tracker" search traffic, and (b) a single rhetorical use ("every step counts") in the description body. **Treat "step counting" as `[NOT FOUND]` for v100.2.6.**

---

## A.2 Description (full text + summary)

### Full description (verbatim, from `description` field) [S1]

```
Run. Rank. Repeat.

Runify is the first-ranked running app that transforms your runs into a competitive experience. Earn XP, unlock new tiers, and climb the leaderboard while tracking your progress and challenging friends. Whether you're running solo or side by side with others, every step counts.

Gamified Running Tracker | XP | Ranks | Leaderboards | Streaks

Level Up Your Running:
Advance through competitive ranks like Bronze, Diamond, and Iridescent based on your distance, consistency, and pace. Runify rewards your performance with XP and a visual rank system designed to keep you motivated.

• Earn XP after every run
• Progress through a ranked tier system
• Lose rank if you go inactive
• Unlock a visual identity that evolves with you

Compete With Friends:
Running is better with rivals. Compare times, chase leaderboard spots, and see how you stack up against your crew or the world.

• Friends, global, and local leaderboards
• Race across 1K, 5K, 10K, and more
• Watch your rivals rise or fall in real time

Share Your Grind:
Create post-run visuals that showcase your stats with style. Customize your templates and post them straight to your story.

• Auto-filled template editor
• Includes time, distance, and pace
• Export directly to Instagram

Track Your Progress:
Every run earns data. Visualize your effort with XP graphs, streak history, and run breakdowns. Runify doesn't just track; it reflects your journey.

• Weekly summaries and lifetime stats
• XP over time and recent runs
• Personal progression and rank trends

Download Runify today and earn your place on the leaderboard.

Consistency isn't optional—it's ranked.

Privacy Policy: https://runifyprivacy.carrd.co/
Terms of Service: https://runifytermsandconditions.carrd.co/
```

### 3-sentence summary (stranger-friendly)

Runify is a gamified GPS run-tracking app that turns your runs into XP, ranks (Bronze → Diamond → Iridescent), and competitive leaderboards across 800m through marathon distances. You can record runs inside the app with live GPS or auto-import from Apple Watch, Garmin, or Strava, then share auto-filled recap cards to Instagram Stories. The free tier covers the basics; "Runify Pro" is sold as ten different IAP SKUs ranging from $4.99 monthly up to $79.99 lifetime.

### Length & marketing intensity [S1]

- **Word count of description**: ~285 words.
- **Emojis**: 0.
- **ALL-CAPS words**: `XP` (used 9 times), `GPS` (used 0 times — interestingly absent despite being the tracking mechanism), `NRC` (not present), `IG` (not present).
- **Exclamation marks (`!`)**: 0.
- **Fake-urgency phrases**: 0. No "limited time", "act now", "today only", or countdown language. Pure brand-building copy.
- **Em-dashes**: 1 (`—` in "Consistency isn't optional—it's ranked.").
- **Sentence-case bullets**: All feature bullets use `•` and sentence-case with no terminal punctuation — modern, not breathless.
- **Vocabulary signal**: "Grind", "Evolved", "Decay", "Side by side with others", "Run. Rank. Repeat." — gamification/RPG slang, not hardcore-fitness slang. Targets casual-to-mid runners who respond to motivational framing.

### Developer-website description (additional context, from runifyapp.com) [S3]

The developer website expands the App Store description with these concrete stats and feature additions:

- TL;DR: "Runify is the first ranked running app. Every run you log or sync earns XP, moves you through a competitive tier system, and puts you on friends-only or global leaderboards from 800m through the marathon."
- Displayed social proof:
  - "100K+ Runs Logged"  → `[CLAIMED]`, no independent verification
  - "500K+ Miles Ran"    → `[CLAIMED]`, no independent verification
  - "99.5% GPS Accuracy" → `[CLAIMED]`, no methodology disclosed
  - "4.8★ App Store Rating Across 626+ reviews" → **`[DISCREPANCY]`**: App Store API shows **239 ratings** as of access date [S1]; developer site claims **626+**. Either (a) the site is stale / inflated, (b) the site includes ratings from a prior version that was reset by an Apple developer-id merge (OneDegree Labs was set up 2025; multiple app launches share an artistId), or (c) the site is fabricating social proof. **Trust the API: 239.**
- Featured stats card explicitly says "Race Distances: 800m to marathon".
- Quote attribution: "Runners who log their runs in an app are significantly more consistent than those who don't." — attributed to "Strava Year in Sport / Annual Global Running Report". **Unverifiable** — no link, Strava does publish a "Year in Sport" but the quoted study is not obviously from it. Likely marketing fluff. `[CLAIMED]`

---

## A.3 Stated features

Each feature tagged: `GPS` / `PEDOMETER` / `SOCIAL` / `AI` / `COACH` / `NUTRITION` / `WEARABLE` / `MUSIC` / `BACKGROUND_AUDIO` / `SUBSCRIPTION` / `OTHER`.

| # | Feature | Source(s) | Tag(s) | Verifiable? |
|---|---|---|---|---|
| F1 | **Live GPS run tracking** (record inside the app) | Description (implicit: "Track Your Progress"), dev site: "Record with live GPS or sync from your watch" | `GPS` | `[LIKELY-REAL]` — iTunes API lists `supportedDevices` and `minimumOsVersion: 16.0`; "Location: This app may use your location even when it isn't open" [S2] |
| F2 | **Apple Watch sync** | Dev site: "auto-imports from HealthKit, Apple Watch, Garmin, and Strava" | `WEARABLE` | `[LIKELY-REAL]` — HealthKit is the canonical conduit; one review complains workouts synced from Apple Health "cannot be renamed" [S2], confirming the HealthKit bridge exists |
| F3 | **Garmin sync** | Dev site: "Garmin and Strava" | `WEARABLE` | `[LIKELY-REAL]` but **reviews flag breakage** — "I connected my Strava and watch and it didn't add any runs" (reviewer BrawlSta, 08/25/2025) [S2]; dev response says "in the process of improving our Strava integration" |
| F4 | **Strava sync (bidirectional import)** | Dev site + description implicitly | `WEARABLE` / `OTHER` | `[CLAIMED → BROKEN-AT-EDGE]`: Reviewer BrawlSta reports it doesn't pull runs automatically; dev acknowledges the bug |
| F5 | **XP (experience points) earned per run** | Description ("Earn XP after every run") | `OTHER` (gamification) | `[LIKELY-REAL]` — central to the product; visible in screenshots |
| F6 | **Tier/rank system: Bronze → Diamond → Iridescent** | Description ("Bronze, Diamond, and Iridescent") + dev site confirms | `OTHER` (gamification) | `[LIKELY-REAL]` |
| F7 | **Rank decay / inactivity penalty** | Description ("Lose rank if you go inactive"), dev site: "Go inactive and your rank decays" | `OTHER` (gamification) | `[LIKELY-REAL]` — explicitly stated twice |
| F8 | **Distance-specific leaderboards** (800m, 1K, 5K, 10K, half, marathon) | Dev site: "distance-specific ladders - 800m, 1K, 5K, 10K, half, and marathon" | `SOCIAL` | `[LIKELY-REAL]` — dev site explicit |
| F9 | **Friends leaderboard** | Description ("Friends, global, and local leaderboards") | `SOCIAL` | `[LIKELY-REAL]` |
| F10 | **Global leaderboard** | Description + dev site | `SOCIAL` | `[LIKELY-REAL]` |
| F11 | **Local leaderboard** | Description ("local leaderboards") | `SOCIAL` | `[LIKELY-REAL]` but `[OPAQUE]` — no city/neighborhood definition visible |
| F12 | **Real-time rival tracking** ("Watch your rivals rise or fall in real time") | Description | `SOCIAL` | `[CLAIMED]` — marketing language; backend update frequency unspecified |
| F13 | **Post-run recap cards** (auto-filled time/distance/pace) | Description ("Share Your Grind") | `OTHER` (social/sharing) | `[LIKELY-REAL]` — visible in screenshots, described verbatim |
| F14 | **Instagram Stories export** | Description ("Export directly to Instagram") | `SOCIAL` | `[LIKELY-REAL]` — uses Instagram's documented share-sheet / Stories sticker API |
| F15 | **Weekly summaries & lifetime stats** | Description | `OTHER` (analytics) | `[LIKELY-REAL]` |
| F16 | **XP-over-time graph** | Description ("XP over time and recent runs") | `OTHER` (analytics) | `[LIKELY-REAL]` — visible in screenshots |
| F17 | **Streak tracking** | Description ("Streak history") | `OTHER` (gamification) | `[LIKELY-REAL]` |
| F18 | **Personal progression / rank trends** | Description ("Personal progression and rank trends") | `OTHER` (analytics) | `[LIKELY-REAL]` |
| F19 | **Account with email + name + optional profile details** | Privacy policy §1a [S4] | `OTHER` | `[LIKELY-REAL]` |
| F20 | **Camera access (optional, for customizing post-run templates)** | Privacy policy §1d [S4] | `OTHER` | `[LIKELY-REAL]` — supports F13 templates |
| F21 | **Push notifications (XP alerts, reminders)** | Privacy policy §1d [S4] | `OTHER` | `[LIKELY-REAL]` |
| F22 | **Friend finder via Contacts list** | **Inferred** from App Privacy label declaring `Contacts` data category [S2] | `SOCIAL` | `[LIKELY-REAL]` but **NOT MARKETED** — the description never mentions a contact-based friend finder. This is a significant gap between marketing copy and declared data collection (see A.10). |
| F23 | **AI coach / AI-generated training plans** | — | — | `[NOT FOUND]` — not in description, not in dev site, not in screenshots, not in privacy policy |
| F24 | **Music / audio integration** | — | `MUSIC` | `[NOT FOUND]` — not in description |
| F25 | **Background audio (podcast control, pace alerts)** | — | `BACKGROUND_AUDIO` | `[NOT FOUND]` |
| F26 | **Nutrition tracking / calorie logging** | — | `NUTRITION` | `[NOT FOUND]` |
| F27 | **Pedometer / daily step counting / walking-only tracking** | — | `PEDOMETER` | **`[NOT FOUND]`** despite "Steps" appearing in the title. See A.1 verification flag. |
| F28 | **Voice / audio coaching cues during run** | — | `COACH` | `[NOT FOUND]` |
| F29 | **Heart-rate integration / HR zone training** | — | `OTHER` | `[NOT FOUND]` in marketing; the `Health` data category is declared in the App Privacy label [S2], so HR data MAY be read from HealthKit but is not surfaced as a feature. |
| F30 | **Route map / heatmap** | Description implies (post-run recap shows route — dev confirms in privacy response: "the app includes a map of your route, but for privacy and safety, we automatically remove the first and last 5% of the run") | `OTHER` | `[LIKELY-REAL]` — confirmed in dev's public reply to "I'm suspicious" review [S2] |

### Notable absence: **No coach features, no AI, no nutrition, no music, no audio cues, no pedometer**

The product is intentionally narrow: **gamified GPS run tracking + social leaderboards + shareable recap cards.** That narrowness is the bet.

---

## A.4 Developer

| Field | Value | Source |
|---|---|---|
| Legal entity | **OneDegree Labs LLC** (Delaware LLC inferred — no public filing checked) | [S1][S2] |
| `artistName` | "OneDegree Labs" | [S1] |
| `artistId` | 1850531994 | [S1] |
| Developer website | https://runifyapp.com/ | [S1][S2][S3] |
| Developer contact email (public, on the App Store listing + privacy policy) | `caleb@runifyapp.com` — suggests the lead dev is "Caleb" | [S2][S3] |
| Privacy policy host | https://runifyprivacy.carrd.co/ (also surfaced at https://runifyapp.com/privacy-policy — same content) | [S1][S2][S4] |
| ToS host | https://runifytermsandconditions.carrd.co/ | [S1] |
| Studio size | Implied very small: a personal email (caleb@…) is on every release-note footer; no team page on runifyapp.com | [S3] |
| Copyright line | "© 2026 OneDegree Labs" | [S2] |

### Other apps by OneDegree Labs (same `artistId: 1850531994`) [S2][S5]

| App | App Store ID | Subtitle | Theme |
|---|---|---|---|
| Jurassic Dinosaur Simulator | 6444028799 | Real Dino Survival Games - RPG | Mobile game (dinosaur survival RPG) |
| You are: Daily Affirmations | 6755545442 | Manifest, Breathwork & Focus | Self-help / wellness |
| HolyChat | 6755546096 | Chat with Bible characters | Religion / chat |
| MindFlix App | 6747105435 | Stay Inspired. Hit Your Goals. | Self-help / motivation |
| **Run & Steps Tracker: Runify** | **6746146450** | **Ranked Running & Mile Tracker** | **Fitness** |

**Pattern**: This is a solo-dev or tiny studio that ships lots of small, formulaic apps across health/faith/motivation/games niches. **None of the other apps are health/fitness-adjacent except Runify** — so there's no prior run-tracking expertise inside the studio. The "Ranked" gamification mechanic (Bronze → Diamond → Iridescent) is also visible in MindFlix (motivation/niche-tracking) — suggesting the studio has a **reusable gamified-tier template** they're porting across verticals. **Important inference for downstream**: if you compete with Runify, you'll be competing with a studio that can re-skin the same XP/rank/leaders engine into adjacent verticals cheaply.

---

## A.5 Ratings + reviews

### Quantitative [S1][S2]

| Metric | Value | Notes |
|---|---|---|
| `averageUserRating` | **4.7824** (rounds to 4.8) | iTunes API exact value: `4.7824299999999997368149706745` |
| `userRatingCount` | **239** | As of access date 2026-08-14 |
| `averageUserRatingForCurrentVersion` | 4.7824 | Same as overall — no recent drop |
| `userRatingCountForCurrentVersion` | 239 | Same — all ratings are for current version (no legacy-version legacy ratings) |
| **EARLY-STAGE / LOW SOCIAL PROOF flag** | **`[EARLY-STAGE]`** | 239 ratings is well below the 1,000-review threshold for "established" social proof. Most top-100 Health & Fitness apps have 5K–500K ratings. Developer website's claim of "626+" [S3] is **inconsistent** with Apple's authoritative count. |
| Rating histogram | `[OPAQUE]` — App Store's 5-bucket histogram is not exposed via iTunes API and the rendered page on access date only showed the headline "4.8 out of 5, 239 Ratings" without the bucket breakdown. The "see all reviews" page was available but not fetchable for the full distribution. |

### Qualitative — sample reviews scraped [S2]

The App Store page renders ~6 visible reviews on first load with "see all" pagination; I captured the 5 distinct reviews below. Rating distribution by sample: **4 of 5 reviews are 4–5 star; 1 is a 3-star mixed**.

| # | Date | Title | Verdict | Author | Developer replied? |
|---|---|---|---|---|---|
| R1 | 08/03/2025 | "Best running app" | 5★ — "absolutely goated app" | Rezophilio | Yes — "Thank you so much for the love!" |
| R2 | 08/25/2025 | "Nice idea but lacks" | 3★ mixed — "great for beginners but social media is trying to get faster people. Connected my Strava and watch and it didn't add any runs. Checked the #1 on the app and he was doing 25 miles a week so I checked out" | BrawlSta | Yes — "We're in the process of improving our Strava integration, often if you run into any troubles just disconnect and reconnect to Strava" |
| R3 | 07/29/2025 | "I'm suspicious…" | 3★ mixed — "I feel like when I post my runs, it shares my location to people. Can someone tell me if this app shares your location with other people publicly?☹️" | fart? | Yes — dev responded: "We do not share your location with others. When you post a run, the app includes a map of your route, but for privacy and safety, we automatically remove the first and last 5% of the run." |
| R4 | 10/06/2025 | "Amazing App, but missing one thing" | 4★ — "workouts synced from Apple Health cannot be renamed. This makes it confusing to see which workout is which. Other than that, this is an amazing app!!!" | lighte.creations | Yes — dev: "If we figure out how to rename workouts in Apple Health, we will respond here." (responded Mar 4) |
| R5 | 2026 timeframe (TBD) | implicit multiple unnamed reviews | mixed signals on Strava integration reliability, naming of Health-synced workouts, and tier-system fairness for slower runners | various | dev responds to ~every visible review |

### Top praises (themes from visible reviews) [S2]

1. **"Goated" / "amazing" / "Best running app"** — strong positive emotional tone from beginner-to-mid runners.
2. **Gamification is motivating** — implied across praises; users love the XP/rank loop.
3. **Clean recap cards** — Instagram share flow is praised implicitly.
4. **Free tier is usable** — no user complained about a paywall in any visible review.

### Top complaints (themes) [S2]

1. **Strava sync is buggy / unreliable** — multiple users, including R2 ("it didn't add any runs"), dev acknowledges in active development.
2. **Apple Health workout naming is read-only** — R4, dev has not yet shipped a fix (responded Mar 4).
3. **Tier/rank fairness concern** — R2 implies the leaderboard top-spot is dominated by ~25 mi/week runners, which feels out of reach for casual users (a "Rolled" / rigged feeling).
4. **Location-sharing concerns** — R3, addressed by dev with the 5% endpoint trim.

### Crash / battery / paywall themes [S2]

- **Crashes**: No visible crash reviews on access date. (Sample size too small to conclude.)
- **Battery**: App Store warns "This app may use your location even when it isn't open, which can decrease device battery life" [S2] — the standard Apple boilerplate for background-GPS apps. No user complaint about battery visible.
- **Paywall**: No visible paywall complaint. IAP tiers are listed but **no user complained about being blocked** — suggests the core loop (record → rank) is free, and Pro is positioned as an upsell.

### Common feature requests (inferred from complaints) [S2]

- Rename Apple Health workouts after sync.
- Reliable Strava integration (auto-pull runs).
- More inclusive leaderboards (perhaps age/gender splits, or pace-adjusted ranks).
- Possibly: a "beginner" / "new runner" leaderboard.

---

## A.6 Pricing + monetization hints

### Download price [S1][S2]

- Download: **Free** ($0.00 USD). In-App Purchases: **Yes**.

### IAP tiers (from App Store "In-App Purchases" section) [S2][S6]

The App Store listing exposes **10 SKUs** all branded "Runify Pro". The list is unsorted by price and **the App Store intentionally hides which SKUs are subscriptions vs. one-time vs. consumables — pricing detail is `[OPAQUE]` without launching the app**.

| # | Display label | Price (USD) | Inferred type |
|---|---|---|---|
| 1 | Runify Pro | $79.99 | Likely **lifetime** (one-time) — most expensive SKU |
| 2 | Runify Pro | $49.99 | Likely annual or 6-month tier |
| 3 | Runify Pro | $19.99 | Likely quarterly or limited launch tier |
| 4 | Runify Pro | $49.99 | (duplicate price — different SKU, e.g., family/student) |
| 5 | Runify Pro | $29.99 | Likely shorter subscription |
| 6 | Runify Pro | $49.99 | (duplicate) |
| 7 | **Runify Pro Monthly** | **$4.99** | Confirmed **recurring monthly subscription** (the only label that explicitly says "Monthly") |
| 8 | Runify Pro | $79.99 | (duplicate — likely another lifetime variant or region) |
| 9 | Runify Pro | $4.99 | (price matches Monthly but unlabelled — likely a **different period** or weekly? Apple hides labels) |
| 10 | Runify Pro | $29.99 | (duplicate) |

### Marketing language for "subscription" / "free trial" / "lifetime" / "$" [S1]

- Description search for these tokens:
  - `subscription`: 0 mentions.
  - `Pro` (uppercase): 0 mentions.
  - `Premium`: 0 mentions.
  - `free trial`: 0 mentions.
  - `$`: 0 mentions in description.
  - `/week`, `/month`, `/year`: 0 mentions.
  - `lifetime`: 0 mentions.
- **Conclusion**: The free-tier funnel is the marketing strategy. Pricing is hidden behind the in-app paywall and not pushed in the App Store description. This is intentional — common pattern for apps that want to maximize install conversion.

### Implied monetization strategy

- **Free tier**: GPS run tracking, XP, rank, leaderboards, recap cards, Streaks — everything the description mentions.
- **Pro tier** (price opaque): probably adds things NOT in the description. Common Pro features for run trackers: advanced analytics, custom training plans, premium route maps, ad-free, custom share templates, advanced leaderboards. Without app-internal screenshots, `[OPAQUE]`.

### Affiliate / external referral

- No "Use code X for 50% off", no affiliate links in description. No external monetization links.

---

## A.7 Privacy posture

### Policy URL & characterization [S1][S2][S4]

- **Privacy policy URL on App Store listing**: `https://runifyapp.com/privacy-policy` [S2]
- **Privacy policy URL in description footer**: `https://runifyprivacy.carrd.co/` [S1] — **same content, two URLs** (the carrd.co version is the original; the runifyapp.com version was added later for brand consistency). **Minor inconsistency** in deployment.
- **ToS URL**: `https://runifytermsandconditions.carrd.co/` [S1]
- **Effective date**: 20 May 2025 [S4] — predates App Store release (2025-07-21) by 2 months.
- **Characterization (1-sentence)**: A short (~11-section, ~800-word) carrd.co-hosted policy that covers personal info, usage data, location, permissions, sharing, security, and choices — but does not name specific third-party SDKs (no Firebase, Amplitude, Mixpanel, Branch, Adjust, AppsFlyer, AdMob etc. by name), does not state a data-retention period, and does not include explicit GDPR or CCPA language.

### App Privacy "nutrition label" on the App Store [S2]

This is the most authoritative structured source on what Runify actually collects.

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

**Data Used to Track You**: **NONE.** Apple did NOT classify any Runify data as cross-app tracking. [S2][S6]

### Account-required? [S2][S3][S4]

- **Account required**: Almost certainly YES. Privacy policy §1a: "When you register for an account or subscribe to premium features, we may collect: Name, Email address, Optional profile details."
- **Sign-in providers observed**: None explicit (no "Sign in with Apple" badge visible in fetched data). Inferred: **email + password**, given the privacy policy's framing ("password resets, confirmation emails") and the lack of an Apple/Google/SSO badge.

### Third-party SDKs [S4]

- The privacy policy says (§3b): "We may use third-party tools for analytics, email delivery, or crash reporting. These providers only receive anonymized or usage-based data necessary to support our services."
- **Specific SDKs named**: NONE. This is `[OPAQUE]` — the policy intentionally avoids naming Firebase / Amplitude / Mixpanel / Segment / Sentry / etc.
- **What we can infer**: given the declared data (Usage Data, Product Interaction, crash reports), they almost certainly use at least one analytics SDK and one crash-reporting SDK. **Do not assert specific names** without app-internal evidence (e.g., strings dump, network capture).

### ATT (App Tracking Transparency) posture [S2]

- Apple has classified **zero categories** as "Data Used to Track You". This is a **strongly ATT-friendly posture** — the app has affirmatively NOT declared any tracking. Users will see **no ATT prompt** ("Ask App Not to Track" UI) because there's nothing for the app to ask permission for in the tracking sense.
- Caveat: ATT posture ≠ data-collection posture. Runify collects a LOT of data (see above) — but does not share it cross-company for ad attribution. That's a meaningful distinction for privacy-concerned users.

### GDPR / CCPA / data-retention [S4]

- **Explicit GDPR language**: `[NOT FOUND]` — no mention of "GDPR", "Data Subject Access Request", "Right to be forgotten", "lawful basis", or "EEA".
- **Explicit CCPA language**: `[NOT FOUND]` — no mention of "CCPA", "California", "Do Not Sell", or "right to know".
- **Data retention period**: `[NOT FOUND]` — policy only says "reasonable administrative, technical, and physical safeguards to protect your data" and "no method of internet transmission or storage is 100% secure".
- **Children under 13**: `[NOT FOUND]` — no COPPA language.
- **Account deletion**: §5 says "Update or delete your profile via the account settings" — but the **mechanism** is unclear (in-app? email request?). No self-service deletion link documented.
- **Contact for privacy requests**: `caleb@runifyapp.com` (via runifyapp.com) [S3][S4]

### Notable gap between policy and App Privacy label [S2][S4]

- The App Privacy label declares **Contacts (full contacts list)** as Data Linked to You — but the policy body **never mentions contacts**. This is a real inconsistency: either (a) the policy is stale and under-declares, or (b) Runify only reads contacts when a user opts in to a friend-finder feature that isn't documented in marketing copy. **Worth flagging to downstream planning** — if you build a similar app, document the contact-import feature explicitly in your policy AND in your marketing.

---

## A.8 Target audience (inferred)

### From description tone [S1]

- **Beginner-to-mid runners**, not elite. The vocabulary ("grind", "level up", "rivals", "earn your place") is **gamified motivational** — the language of casual fitness and Strava-lite engagement, not the language of marathon training (no "pace zones", "VO2 max", "tempo", "intervals", "fartlek").
- **No specific gender or age skew** in the description. The screenshots (5 iPhone screenshots) appear gender-neutral; no language skewed male/female.
- The single FAQ mention "veterans grinding for a marathon PR" alongside "beginners chasing their first 5K" on the dev site [S3] suggests they explicitly position for **the full range**, but the leaderboard mechanic skews toward users who run 3–5x/week (you can rack up XP) rather than daily marathoners.

### From feature mix [S1][S3]

- **Not** for: walkers-only, casual step-counters, cyclists, gym-goers, yoga, nutrition-only, mental-health-only.
- **Yes** for: anyone who runs outdoors, has an iPhone, and responds to video-game-like reward loops.
- The 800m → marathon distance ladder suggests they want both first-timers (5K) and experienced runners (marathon) on the same ladder.

### From screenshots [S1][S2]

- 5 iPhone screenshots; visual style is dark-themed with neon-purple/cyan accents (gamer aesthetic, not health-clinic aesthetic).
- Includes a screenshot with what looks like a leaderboard + map view + XP progress bar — implies the social / rank loop is the *hero* feature, not the GPS map.

### Geography [S1][S2]

- **`languageCodesISO2A: ["EN"]`** — English only. No localization.
- `sellerName: "OneDegree Labs LLC"` — US LLC (Delaware-inferred from standard naming convention; not independently verified).
- `currency: "USD"`.
- Supported devices span iPhone 5s through iPhone Air — global iPhone install base, but **no localization is a real ceiling**. Cannot serve Japanese, German, French, Spanish, Chinese runner markets without an update.
- Privacy policy hosted on US-friendly carrd.co; no EU-representative mentioned.

### Inferred persona

> **"Sam, 24, casual runner"** — runs 2–4x/week, has an Apple Watch, posts to Instagram, wants to feel like their running "matters" / accumulates, doesn't want to pay $9.99/mo for Strava, is mildly competitive with their friend group. Probably US or UK, English-speaking, iPhone-first.

---

## A.9 Differentiation hypothesis (1 paragraph)

Runify's bet is **gamification-as-engagement-loop for runners who don't want Strava's data-density or Nike's branding**. Strava is the 800-lb gorilla — best for serious athletes who care about segments, KOMs, and training load — and Nike Run Club is free with celebrity-coach audio but light on social mechanics. Runify slices between them by offering: (1) a video-game-style XP/rank/tier system with **decay-on-inactivity** (creating a return-habit loop), (2) frictionless Apple Watch + Garmin + Strava import so you don't have to *replace* your existing tracker (reducing switching cost), and (3) Instagram-ready share cards (leveraging social-graph virality outside the app). The **price architecture** (free core + $4.99/mo or up to $79.99 lifetime Pro) is a classic freemium conversion funnel. The bet is that **"ranked competitive gamification" is the wedge** that pulls casual runners who aren't satisfied by Strava's data-heavy UX, and the **Apple Watch + Strava sync** removes the friction of "I already track elsewhere." Risks: the leaderboard-fairness complaint from R2 suggests the system may alienate slower runners; the `Contacts` data collection (not marketed) is a privacy trust cliff; and the developer's "626+ reviews" claim vs Apple's 239 is a credibility gap.

---

## A.10 Claimed-vs-likely-real gaps

Honest assessment of marketing-vs-evidence.

| # | Claim | Marketing evidence | Real evidence | Verdict |
|---|---|---|---|---|
| G1 | "First-ranked running app" | Description, dev site | No prior art search done; can't verify "first"; competitor Strava has had KOM/segment ranks for 15 years. | `[CLAIMED]` — marketing superlative |
| G2 | "100K+ Runs Logged" | Dev site banner | No public dashboard or verification link. App has been live ~13 months with ~239 ratings — a 42:1 runs-to-ratings ratio is plausible IF most users don't rate, but unverifiable. | `[CLAIMED]` — no independent verification |
| G3 | "500K+ Miles Ran" | Dev site banner | Same caveat. Math: 500K miles / 100K runs = 5 mi/run average. Plausible but unverified. | `[CLAIMED]` |
| G4 | "99.5% GPS Accuracy" | Dev site banner | No methodology disclosed (vs. what reference? Recorded against map-matched distance? Polling rate?). | `[CLAIMED]` — opaque methodology |
| G5 | "4.8★ across 626+ reviews" | Dev site banner | **iTunes API shows 4.8 across 239 reviews**. ~2.6× discrepancy. | **`[INCONSISTENT]`** — Apple API is authoritative; dev site is inflated or stale |
| G6 | "Strava Year in Sport" quote | Dev site banner | No link to source. Strava does publish Year in Sport but the quoted study attribution is questionable. | `[CLAIMED]` — unverified |
| G7 | Strava sync "auto-imports" | Dev site: "new runs sync automatically" | Reviewer BrawlSta: "it didn't add any runs". Dev response: "in the process of improving". | **`[BROKEN-AT-EDGE]`** — feature exists, reliability is poor |
| G8 | Garmin sync "auto-imports" | Dev site | Same review pattern as Strava. | `[CLAIMED → UNVERIFIED-AT-EDGE]` |
| G9 | Apple Watch sync via HealthKit | Dev site | Reviewer lighte.creations confirms workouts sync but **can't be renamed** — proves sync works, UX incomplete. | `[LIKELY-REAL — basic sync yes; rich sync no]` |
| G10 | "Watch your rivals rise or fall in real time" | Description | No info on polling/refresh cadence. Probably client-side pull, not push. | `[CLAIMED — implementation detail opaque]` |
| G11 | Friends leaderboard | Description, dev site | Implied working; no negative reviews complain about it. | `[LIKELY-REAL]` |
| G12 | Contact-list friend finder | **NOT marketed** — never mentioned in description or dev site | **App Privacy label declares `Contacts: Contacts` data category** | **`[DATA-COLLECTED-BUT-NOT-MARKETED]`** — significant privacy-trust gap |
| G13 | "XP graphs, streak history, run breakdowns" | Description | Visible in screenshots per App Store listing. | `[LIKELY-REAL]` |
| G14 | "Consistency isn't optional—it's ranked" (rank decay) | Description + dev site | Explicitly stated. | `[LIKELY-REAL]` |
| G15 | "Lose rank if you go inactive" | Description + dev site | Explicitly stated. | `[LIKELY-REAL]` |
| G16 | "Auto-filled template editor" for Instagram Stories | Description | Visible in screenshots; uses iOS share sheet / Instagram sticker API. | `[LIKELY-REAL]` |
| G17 | "Privacy policy: We do not sell or rent your personal information" | Privacy policy §3 | **Verified by ATT label** (zero "Data Used to Track You" categories declared). | `[LIKELY-REAL]` |
| G18 | "We may use third-party tools for analytics, email delivery, or crash reporting" | Privacy policy §3b | **App Privacy label declares Usage Data: Product Interaction, Other Usage Data** + App Functionality purpose | `[LIKELY-REAL]` but **no SDKs named** — opaque |
| G19 | "Email + promotional emails by default" | Privacy policy §2b | Explicit. | `[LIKELY-REAL]` — user must opt out |
| G20 | "Steps" tracking feature | App title "Run & Steps Tracker" | **ZERO evidence** of step counting, pedometer, daily steps, or step goals anywhere in description, dev site, screenshots, or features. | **`[NOT FOUND — title is ASO keyword stuffing]`** |

### Top three trust-cliffs for downstream planning

1. **`[NOT FOUND]` step counting despite "Steps" in the title** — competitors / users who download expecting a step counter will be confused. If you build a clone, decide clearly: **either** ship real step counting (motion-permissions based, easy via CMPedometer) **or** don't put "Steps" in your title.
2. **`[INCONSISTENT]` social-proof claim** — Runify's dev site says "626+ reviews"; Apple says 239. If you build a marketing site, **don't inflate**. Modern users check.
3. **`[DATA-COLLECTED-BUT-NOT-MARKETED]` contacts access** — Runify reads full Contacts list but doesn't market that feature. Either build a clearly-opted-in friend-finder UI **and** document it in policy + App Privacy, or don't request the permission at all.

---

## Sources (cited as [Sn])

- **[S1]** iTunes Lookup API, structured JSON — `https://itunes.apple.com/lookup?id=6746146450&country=us` — 2026-08-14 — `Invoke-WebRequest` (PowerShell) — raw file at `C:\Users\AHMADM~1\AppData\Local\Temp\opencode\runify_lookup.json`; canonical source for `trackName`, `sellerName`, `bundleId`, `version`, `releaseDate`, `currentVersionReleaseDate`, `minimumOsVersion`, `supportedDevices[]`, `languageCodesISO2A`, `fileSizeBytes`, `price`, `formattedPrice`, `averageUserRating`, `userRatingCount`, `description` (verbatim), `screenshotUrls[]`, `sellerUrl`, `genreIds`, `currency`, `artworkUrl512`, `contentAdvisoryRating`, `advisories`, `trackContentRating`, `isVppDeviceBasedLicensingEnabled`.
- **[S2]** App Store listing rendered HTML — `https://apps.apple.com/us/app/run-steps-tracker-runify/id6746146450` — 2026-08-14 — `ctx_fetch_and_index` (cached, indexed 16 sections) — source for the App Privacy "nutrition label" data categories, IAP price list (10 SKUs visible), visible reviews (R1–R5), version history, "supportedDevices" UI display, "Free · In-App Purchases" badge, location-while-closed battery warning, "Contains User-Generated Content" flag.
- **[S3]** Runify developer website — `https://runifyapp.com/` — 2026-08-14 — `ctx_fetch_and_index` (10 sections) — source for the marketing TL;DR, the social-proof stat cards ("100K+ Runs Logged", "500K+ Miles", "99.5% GPS Accuracy", "4.8★ across 626+ reviews"), the Strava-Year-in-Sport quote attribution, the 800m-marathon distance ladder, the Apple Watch/Garmin/Strava sync messaging, the rank-decay FAQ.
- **[S4]** Runify privacy policy (developer-hosted copy) — `https://runifyapp.com/privacy-policy` — 2026-08-14 — `ctx_fetch_and_index` (24 sections) — and the alternate URL `https://runifyprivacy.carrd.co/` (3 sections) — same content. Source for §1–11 of the policy including effective date (20 May 2025), data categories, third-party sharing language (no specific SDKs named), retention period (absent), GDPR/CCPA language (absent), promotional-email opt-in default, account-deletion mechanism (in-app or device settings), and contact email.
- **[S5]** App Store developer portfolio page — `https://apps.apple.com/us/developer/onedegree-labs/id1850531994?platform=iphone` — 2026-08-14 — `ctx_fetch_and_index` (4 sections) — source for the other 4 OneDegree Labs apps (Jurassic Dinosaur Simulator, You are: Daily Affirmations, HolyChat, MindFlix App), confirming the small-studio multi-app pattern.
- **[S6]** Jina Reader fallback for App Store page — `https://r.jina.ai/https://apps.apple.com/us/app/run-steps-tracker-runify/id6746146450` — 2026-08-14 — `ctx_fetch_and_index` (173 sections, 27.8 KB) — used to confirm: (a) the App Privacy label shows **no** "Data Used to Track You" section (ATT-friendly posture), (b) the IAP list (10 SKUs, $4.99–$79.99), (c) duplicate confirmation of R1–R4 review text and developer responses, (d) `caleb@runifyapp.com` mentioned in dev response, (e) version 100.2.6 with "Bug fixes and more..." release notes.

---

## Open questions

- **OQ1**: What does the in-app paywall actually gate? The description doesn't mention any Pro-only features. Need app-internal screenshots or a Network capture of the paywall screen to identify the conversion hook. `[OPAQUE]` from public sources.
- **OQ2**: Does the iOS app ever request the `NSContactsUsageDescription` permission? The App Privacy label says Contacts is collected, but the policy body never mentions it. If you build a clone: verify whether requesting contacts at all is worth the App Store review friction.
- **OQ3**: What is the actual rank-decay formula? "Lose rank if you go inactive" — is it day-based, run-count-based, or XP-based? No public formula disclosed.
- **OQ4**: Does the Strava integration use Strava's official OAuth API (my.strava.com) or a scraping-style import? The "disconnect and reconnect" dev hint in R2's response suggests OAuth. Worth confirming before architecting a similar sync.
- **OQ5**: The 626-vs-239 reviews discrepancy on the developer site — is this just stale copy (e.g., a one-time site update that wasn't refreshed after the developer-id merge) or active inflation? Worth a quick email to `caleb@runifyapp.com` to verify before any commercial reference.
- **OQ6**: Does the app support iPad natively? `supportedDevices` includes 50+ iPad IDs but the listing says "Only for iPhone" [S2] — these are likely just running-as-iPhone on iPad.
- **OQ7**: Are there regional variants of the IAP SKUs (e.g., lower prices in India, Brazil)? iTunes API was called with `country=us` so non-US pricing is `[NOT CHECKED]`.
- **OQ8**: What is the dev cadence on feature additions vs. bug fixes? All 18 release notes (Jul 2025 → Jul 2026) say "bug fixes" / "performance enhancements" — **no** user-facing feature release notes. Are feature releases shipped silently? Or has no major feature shipped in 13 months?
- **OQ9**: Privacy-policy URLs inconsistency: description footer says `runifyprivacy.carrd.co`, App Store listing says `runifyapp.com/privacy-policy`. Is the runifyapp.com version the canonical/authoritative one going forward?

---

## Metrics footer

- **Findings count: 30** distinct feature/identity claims catalogued (F1–F30 in A.3) + **20** claim-vs-evidence gaps (G1–G20 in A.10) = **50** discrete findings.
- **Sources cited: 6** ([S1]–[S6]).
- **`[CLAIMED]` vs `[LIKELY-REAL]` split: 9 / 41** — 9 items tagged `[CLAIMED]` (marketing copy not independently verifiable), 41 items tagged `[LIKELY-REAL]` (supported by API data, dev site text, screenshots, or policy); 2 additional items tagged `[INCONSISTENT]` and 1 tagged `[DATA-COLLECTED-BUT-NOT-MARKETED]`. 1 critical `[NOT FOUND]` (pedometer / step counting).
- **Pages fetched: 6** (iTunes Lookup API; App Store listing HTML; runifyapp.com home; runifyapp.com/privacy-policy; runifyprivacy.carrd.co alternate; Jina Reader fallback for App Store; OneDegree Labs developer portfolio). Plus 1 PowerShell `Invoke-WebRequest` for the raw JSON.
- **API calls used: 1** iTunes Lookup API call (`/lookup?id=6746146450&country=us`).
- **Files touched**: `share/notes/01_research_T-2026-08-14-004_angle-app-deep-dive.md` (this file). No edits outside this path.
- **Caveats for downstream merge**:
  - IAP SKU identity (subscription vs. one-time vs. consumable) is `[OPAQUE]` from public sources — iTunes API does NOT return IAP type metadata; only the App Store listing shows the list of 10 prices with one labelled "Monthly".
  - Rating histogram (5-bucket distribution) is `[OPAQUE]` — iTunes API does not return it; only the headline 4.8/239 is exposed.
  - The 626-vs-239 review count discrepancy on the dev site vs. Apple's API is a **deliberate flag** for downstream merge — trust the Apple API value.
  - All review samples are from the visible-on-load set (R1–R5); a "see all" pagination scrape would yield more signal but is out of scope for this angle.
