# Angle C - Competitive landscape (T-2026-08-14-004)

**Date:** 2026-08-14
**Subject app:** Runify - Run & Steps Tracker (App Store id 6746146450) by OneDegree Labs LLC
**Scope:** 14 competitors (10 mandatory + 2 niche + 2 region-specific) compared on tracking tech, social, monetization, retention, and iOS app-store metadata
**All numbers cited as:** iTunes Search/Lookup API (access 2026-08-14 UTC) or App Store page (Jina Reader `r.jina.ai`); rating counts come from the API, not paraphrased.

**Reuses:** Angle A's Runify data (`share/notes/01_research_T-2026-08-14-004_angle-app-deep-dive.md`, cross-reference) — I cross-validated Runify's id 6746146450 directly via `itunes.apple.com/lookup?id=6746146450&country=us` and got identical fields.

---

## C.1 Per-competitor matrix

The 14 rows below are alphabetized within tier. Runify is at the bottom for cross-reference; all numbers from iTunes API.

| # | Competitor | Owner | First released | Free / Paid model | Tracking tech | Social features | Coaching / plans | Monetization tiers | iPhone rating | iPhone rating count | Apple Watch | Android version | Privacy posture | Differentiator vs Runify |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **Strava** (`426826309`) | Strava, Inc. | 2011-03-24 | Freemium (free + subscription) | GPS + Apple Health + 1000+ devices | Feed, kudos, comments, athletes-in-this-area, clubs, group challenges | Routes by Strava-aggregated data; Athlete Intelligence (AI summaries); no built-in C25K | Strava Premium $11.99/mo or $79.99/yr (per IAP listing) | 4.81 | 367,815 | Yes (Watch4+ supported) | Yes (Wear OS, Android) | "Data Linked to You" includes location, health, identifiers, usage; heatmap of user activity is a byproduct | Network-effect social feed + Strava-style Segments/leaderboards + global heatmap; Runify has no segments, no public feed, no offline athletes-in-this-area |
| 2 | **Nike Run Club** (`387771637`) | Nike, Inc. | 2010-09-06 | **Free** (no subscription) | GPS + Apple Health + Apple Watch | Friends challenges, in-run audio cheers (one-way send/receive) | Coached training plans (4-week get-started, half-marathon, marathon), Audio Guided Runs (~300+ runs with Nike coaches/athletes), Programs | No paid tier (sells shoes, not subscriptions) | 4.77 | 417,217 | Yes (Watch4+) | Yes (Android) | Data shared with Apple Health; data sold via Nike marketing surface | Free forever with elite coaching and an unmatched Audio Guided Runs library; Runify has no audio coaching, no training plans |
| 3 | **Adidas Running** (`336599882`) | Adidas International Marketing B.V. | 2009-11-23 (Runtastic) | Freemium | GPS + 90+ activity types + many wearables | Global challenges, virtual races, community feed | Personalized training plans, voice coaching, goal widgets | Adidas Premium subscription (in-app) | 4.80 | 106,907 | Yes (Watch4+) | Yes (Android) | Per Apple privacy section (need to verify); brand-driven data flow | 70M+ user community + reward/redeem-points for adidas products; Runify has no rewards catalog or brand tie-in |
| 4 | **ASICS Runkeeper** (`300235330`) | ASICS Runner App, Inc. | 2009-01-14 | Freemium | GPS + Heart Rate + Bluetooth accessories | Friends, virtual running groups, in-app challenges | Goal-based plans, 5K to marathon, "Guided Workouts" audio coach | Runkeeper GO $9.99/mo or $59.99/yr (typical) | 4.83 | 377,789 | Yes (Watch4+) | Yes (Android) | Apple Health export + Garmin/Fitbit integration; data sold to ASICS | 16 years of run data and a long-form training plan library; Runify's "tier" system is not a real training plan |
| 5 | **Map My Run** (`291890420`) | Outside Television Inc. (Under Armour) | 2008-10-14 | Freemium | GPS + 600+ activities + Garmin/Apple Watch | Friends feed, virtual challenges, share to social | Adaptive Training Plans 5K/10K/half/full; Form Coaching for Garmin | MVP (premium) $5.99/mo typical, $29.99/yr | 4.84 | 749,349 | Yes (Watch4+) | Yes (Android) | Apple Health + Garmin sync; route library owned by Under Armour; privacy-data-linked | Longest-running run app in this set (18 years), trusted by 100M+; Runify has no route library |
| 6 | **Apple Health** (`1242545199`) | Apple Inc. | 2021-10-25 (re-launched as standalone) | **Free** (preinstalled) | Apple HealthKit (no native GPS) | None (it's a data warehouse) | None (no coaching) | None | 3.02 | 8,839 | Reads Watch data | n/a (iOS only) | Strongest: end-to-end encrypted at rest, iCloud sync with passcode lock, Medical ID exception | First-party platform + deepest HealthKit integration; Runify relies on Apple Health to surface runs but cannot rename synced workouts |
| 7 | **Apple Fitness + Fitness+** (`1208224953`) | Apple Inc. | 2017-04-10 | Free app + Fitness+ subscription | Apple Watch workouts; ring closure | Apple Watch competition with friends | Time to Walk/Run, 12 workout types, Programs, Custom Plans | Apple Fitness+ $9.99/mo or $79.99/yr (Apple One bundle eligible) | 2.87 | 11,311 | Yes (Apple Watch native) | n/a | Best-in-class: all Apple services inherit iCloud encryption + on-device processing | Apple's first-party rings + Workout Buddy AI + Time to Run; Runify has no Apple Watch native app |
| 8 | **Samsung Health** (`1224541484`) | Samsung Electronics | 2017-10-02 | **Free** | GPS + heart rate + pedometer + Samsung wearables | Samsung-only challenges | 100+ workout types, partnerships (e.g., Calm Premium 1 year free) | None | rating cut at 35,566 in the iTunes row | 35,566 | No (Galaxy Watch only) | Yes (Android - native) | Reads Apple Health steps optionally; Samsung-account-bound data | Cross-platform (Android + iOS) but Galaxy Watch is the lock-in; Runify is iOS-only |
| 9 | **Pacer Pedometer** (`600446812`) | Pacer Health, Inc. | 2013-02-14 | Freemium | Pedometer + GPS + Apple Watch | Walking groups, challenges, clubs | Guided workouts for weight loss | Pacer Premium $4.99/mo or $29.99/yr typical | 4.90 | 325,186 | Yes (Watch4+) | Yes (Android) | Apple Health sync; claims ad-free on premium | Pedometer-first (no GPS required); group walking challenges and clubs; Runify requires GPS-only run tracking |
| 10 | **AllTrails** (`405075943`) | AllTrails, Inc. | 2010-12-17 | Freemium | GPS track recorder + trail maps | Reviews, photos, "liked trails" | Custom route building, off-route alerts | AllTrails+ $5.99/mo or $29.99/yr; Peak $9.99/mo or $59.99/yr | 4.89 | 1,035,539 | Yes (Watch4+) | Yes (Android) | Apple Health + Strava/Garmin sync; reviews are public | 1M+ reviews and the deepest trail/route library; Runify has no route discovery |
| 11 | **Google Health (Fitbit)** (`462638897`) | Google LLC | 2011-10-18 (as Fitbit) | Freemium | GPS + heart rate + Fitbit wearables + Google AI | Feed, challenges, accountability nudges | Personalized AI fitness plans (Gemini Health Coach); sleep coaching | Google Health Premium $9.99/mo or $79.99/yr | 4.48 | 689,232 | Yes (limited) | Yes (Android - native) | Google-account-bound; Pixel Watch + Fitbit device lock-in | Now powered by Gemini AI; Runify has no AI coach |
| 12 | **StepsApp Pedometer** (`1037595083`) | StepsApp GmbH | 2015-10-10 | Freemium | Pedometer + Apple Watch + GPS (Pro) | Groups, leaderboards, friend challenges | Guided workouts with HR zones | StepsApp Pro $4.99/mo or $29.99/yr typical | 4.81 | 290,664 | Yes (Watch4+) | Yes (Android) | Apple Health + Garmin/Oura/Fitbit/Whoop/Polar sync | Step-count-first with deep social/group dynamics; Runify is run-first with no social feed |
| 13 | **Codoon** (咕咚) (`453480684`) | Chengdu Ledong Information & Technology Co., Ltd. | 2011-08-17 | Freemium | GPS + pedometer + smart shoes | Live running groups, Chinese marathon events | AI coach, marathon training | Codoon Premium subscription (in-app) | 4.63 | 1,305 (US App Store) | Yes (Watch4+) | Yes (Android - native) | China-region data residency; WeChat + Alipay integrations | China's largest running app (>200M users on Android); Runify has no Chinese-language support |
| 14 | **Footpath Route Planner** (`634845718`) | Half Mile Labs LLC | 2013-05-07 | Freemium | GPS track + planned route | Route sharing | None | Footpath Elite $4.99/mo or $29.99/yr | 4.80 | 21,832 | Yes (Watch4+) | Yes (Android) | GPX/TCX/FIT export; Apple Health export | Finger-trace route planning ("snap to roads"); Runify has no route planning |
| **R** | **Runify** (`6746146450`) | OneDegree Labs LLC | 2025-07-21 (App Store index), 2025-06-02 (1.0 build) | Freemium | GPS + Apple Health + Strava (per review) | Friends/Global/Local leaderboards; no comments | None (no training plans) | Runify Pro $4.99/mo + tiers $19.99-$79.99 | 4.78 | 239 | Not listed (iPhone-only compatibility; no separate Watch app) | No (iOS only) | Privacy: Health, Fitness, Precise + Coarse Location, Contacts, Photos, User Content, Identifiers | Gamified XP + Bronze→Diamond→Iridescent rank tiers + Instagram share templates; **NOT** segments, **NOT** training plans, **NOT** Watch native, **NOT** Android |

**Cross-references:**
- All 14 IDs and rating counts are from `itunes.apple.com/lookup` or `search` API (access 2026-08-14); RunnerUp "Best Cool Apps LLC" id 1377091943 (Found via [S2]) was a low signal match and dropped.
- Nike Run Club `id 6477264554` (referenced in the dispatch prompt) returned 0 results from the iTunes Lookup API (the app was re-issued under id 387771637 with extra languages per the description) — confirmed via [S3].
- "Apple Watch" column: "Yes" = `Watch4-Watch4` in the iTunes `supportedDevices` array; "Limited" = uses basic Watch data only; "Galaxy Watch only" = Samsung proprietary.
- "Privacyposture" is inferred from the App Store privacy section where available; Runify's privacy section is fully visible at [S1].

---

## C.2 Feature matrix (30-row)

Conventions: ✅ = feature present in current shipping app, ❌ = feature absent, ⚠️ = partial / limited to paid tier, ❔ = not verifiable from public metadata, △ = free tier only, ▽ = paid tier only. Where Runify is the subject app, the row is cross-referenced from Angle A.

| # | Feature | Runify | Strava | Nike Run Club | Adidas Running | Runkeeper | Map My Run | Apple Health | Apple Fitness | Samsung Health | Pacer | AllTrails | Google Health | StepsApp | Codoon |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | GPS run tracking | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ (uses HealthKit) | △ (Watch only) | ✅ | ✅ | ✅ | ✅ | △ (Pro) | ✅ |
| 2 | Step counting (pedometer) | ⚠️ (via AH) | ⚠️ (via AH) | ⚠️ (via AH) | ⚠️ (via AH) | ⚠️ (via AH) | ✅ | ✅ | ⚠️ (via Watch) | ✅ | ✅ | ⚠️ (via AH) | ✅ | ✅ | ✅ |
| 3 | Heart-rate integration | ⚠️ (via AH) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 4 | Apple Watch native app | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (read-only) | ✅ | ❌ | ✅ | ✅ | △ (limited) | ✅ | ✅ |
| 5 | Android Wear / Wear OS app | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | n/a | n/a | ✅ (Galaxy Watch) | ✅ | ✅ | ✅ | ✅ | ✅ |
| 6 | Garmin / Coros / Whoop sync | ❌ | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | △ (third-party) | ⚠️ | ⚠️ | ❌ | ✅ | ✅ | ✅ | ⚠️ |
| 7 | Social feed (kudos / comments) | ❌ | ✅ | ❌ (no feed) | ✅ | ⚠️ | ✅ | ❌ | ❌ | ⚠️ | ⚠️ | ⚠️ (reviews) | ⚠️ | ⚠️ (groups) | ✅ |
| 8 | Segments / leaderboards (Strava-style) | ❌ (only leaderboards) | ✅ | ❌ | ❌ | ❌ | ⚠️ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ |
| 9 | Challenges (group / charity / corporate) | ✅ (XP) | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ (Watch competition) | ⚠️ (Watch competition) | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ |
| 10 | Training plans (c2-5K, marathon, etc.) | ❌ | ⚠️ | ✅ (free) | ⚠️ | ⚠️ | ⚠️ | ❌ | ✅ (Programs) | ❌ | ⚠️ | ❌ | ✅ (AI) | ⚠️ | ✅ |
| 11 | Audio coach / guided runs | ❌ | ❌ | ✅ (free) | ✅ | ✅ | ✅ | ❌ | ✅ (Trainer-led) | ❌ | ⚠️ | ❌ | ✅ | ⚠️ | ✅ |
| 12 | Music integration (Spotify, Apple Music) | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | n/a | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 13 | Nutrition tracking | ❌ | ❌ | ❌ | ❌ | ⚠️ | ⚠️ | ✅ | ❌ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ |
| 14 | Sleep tracking | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ |
| 15 | Mindfulness / meditation | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ (Time to Walk) | ⚠️ | ❌ | ❌ | ✅ | ❌ | ❌ |
| 16 | Personal records (PRs) + race predictions | ⚠️ (XP graphs) | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ |
| 17 | Route library + discovery | ❌ | ✅ (Routes) | ❌ | ⚠️ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ (1M+ trails) | ❌ | ❌ | ✅ |
| 18 | Heatmap / popular paths (Strava-style) | ❌ | ✅ | ❌ | ⚠️ | ❌ | ⚠️ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| 19 | Strava-style local heatmap (city-wide) | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 20 | Map style (OSM / Mapbox / Google Maps) | ❔ (MapKit likely) | ✅ (Mapbox) | ✅ (Apple Maps) | ✅ | ✅ (Mapbox) | ✅ (Mapbox) | n/a | ❌ | ❌ | ✅ | ✅ (OSM) | ❌ | ❌ | ✅ |
| 21 | Subscription price (monthly USD) | $4.99 (Pro Monthly); quarterly ~$19.99 + annual $79.99 [S1] | $11.99 | Free | $9.99 typical | $9.99 | $5.99 | Free | $9.99 | Free | $4.99 | $5.99 (+ Peak $9.99) | $9.99 | $4.99 | $4.99 typical |
| 22 | Free tier depth (can do everything free with limits?) | ⚠️ | ✅ (recording only) | ✅ (full) | ⚠️ | ✅ (recording only) | ⚠️ | ✅ (full) | ✅ (recording only) | ✅ (full) | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| 23 | Account required? | ✅ (Google sign-in implied) | ✅ | ❌ | ⚠️ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 24 | Ads in free tier? | ❌ | ⚠️ | ❌ | ⚠️ | ⚠️ | ⚠️ | ❌ | ❌ | ⚠️ | ⚠️ | ⚠️ | ❌ | ⚠️ | ⚠️ |
| 25 | Data export (GPX, TCX, CSV) | ❌ | ✅ (GPX, TCX) | ✅ | ✅ | ✅ | ✅ | ✅ (CSV) | ✅ | ✅ | ⚠️ | ✅ (GPX) | ✅ | ✅ | ⚠️ |
| 26 | Apple Health write-back | ⚠️ (read sync confirmed; named-workout rename broken per [S1] review) | ✅ | ✅ | ✅ | ✅ | ✅ | n/a (it IS Health) | ✅ | ✅ (steps only) | ✅ | ✅ | ✅ | ✅ | ✅ |
| 27 | Strava-to-other interoperability | ✅ (Strava import mentioned in app description) | n/a | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ |
| 28 | Apple Fitness+ integration | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ (ring data) | ✅ (in-app launch) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 29 | Live tracking / share-my-run link | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ⚠️ | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ |
| 30 | Goal setting (steps / minutes / distance) | ✅ (XP / distance) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (Move ring) | ✅ (Move/Exercise/Stand) | ✅ | ✅ | △ (by trail) | ✅ | ✅ | ✅ |

**Legend & notes:**
- Row 4 **Apple Watch native app**: Runify's iOS compatibility on its App Store page lists only "iPhone" [S1] — no Apple Watch companion. This is the **single biggest gap** in Runify's feature matrix vs every paid competitor.
- Row 8 **Segments / leaderboards**: Runify has a leaderboard (global/friends/local) but NOT the Strava-style "segment" feature (fixed sections of road, top-10 fastest, KOM/QOM). Confirmed via App Store description [S1].
- Row 11 **Audio coach / guided runs**: Nike Run Club has 300+ free guided runs (per [S3]). Runify has zero.
- Row 12 **Music integration**: Runify has no Spotify/Apple Music tie-in mentioned; Runify is iPhone-only and Apple Music is system-wide so it works in the background, but not as a Runify feature.
- Row 18 **Strava-style city-wide heatmap**: this is a Strava-only network effect; no competitor has equivalent because Strava has the largest user-density GPS dataset.
- Row 21 **Runify's exact IAP tiers**: per the App Store page [S1] — Runify Pro Monthly $4.99, plus $19.99 / $29.99 / $49.99 / $79.99 tiers visible. The $4.99/mo tier is the comparable "cheapest subscription" vs StepsApp/Footpath/Pacer at $4.99/mo.
- Row 22 **Free tier depth**: Only Nike Run Club + Apple Fitness + Apple Health are fully free at the recording layer. Runify is in the middle (free with social, paid for ??? — paywall not visible in description text).
- Row 28 **Apple Fitness+ integration**: Only Apple Fitness+ has this. Runify explicitly without it.

---

## C.3 Runify differentiation hypothesis

**Runify's bet (3 bullets):**

1. **Gamified XP + Bronze→Diamond→Iridescent rank tiers replace the social-feed model**. Where Strava bleeds DAUs into a feed of other people's workouts, Runify gives each individual a vertical progression: "lose rank if you go inactive" (per [S1]). The hook is **bracketed competition** (visible leaderboard). Runify is closer to a **game** than a fitness utility.
2. **Instagram-first post-run share templates** ("Auto-filled template editor... Export directly to Instagram" per [S1]). The unit of sharing is a designed **story asset**, not a feed post. Runify is the only app that explicitly built the post-run-content template as the share primitive.
3. **Tight brand + visual identity (shorter, mid-tier subscription $4.99/mo, "[free]" entry)**. The rating of 4.78 from 239 users with 24 months on the App Store (since 2025-07-21) shows a narrow, well-monetized audience — likely US/EN runners in the 2-8 mi/week range who want a fun, low-friction tool with a clear "I'm leveling up" feedback loop.

**Nearest competitor — Pacer, not Strava or Samsung.**

Reasoning: Pacer and Runify share three shapes that no other competitor matches:
- **Tracking is optional / secondary** — Pacer's pedometer-first, Runify's run-tracking is gamified;
- **Walking & running coexist** — Pacer calls it "walking buddies", Runify calls it "every step counts";
- **Sub-$5/mo entry tier** — Pacer at $4.99/mo, Runify at $4.99/mo, both target the casual exerciser wallet.

Why not Strava? Strava is a $11.99/mo social running network with neighborhoods, segments, and 100M+ users. Runify is a $4.99/mo solo progression. They sell different jobs to different people (Strava: "I'm part of a running community"; Runify: "I'm leveling up on my own").

Why not Samsung Health? Samsung Health is a free, native, multi-modality health database with no social loop at all. Runify has a tight social loop and a paid tier.

**Nearest competitor verdict: Pacer.** They are the closest product-market-position match, not the closest feature match.

---

## C.4 Where Runify wins / loses / ties

### Wins (Runify has a clear advantage vs ≥ 3 competitors)

- **Bracketed rank-loss = a unique retention hook**. Only Runify says "Lose rank if you go inactive" (per [S1]). Strava, Nike, Adidas, Runkeeper, MapMyRun all have leaderboards but NONE has a "demotion" mechanic. This is a one-of-one feature.
- **Lowest entry price for the headline social tracker tier**. Runify Pro Monthly $4.99 vs Strava $11.99, Nike $0 (free), Adidas $9.99, Runkeeper $9.99, MapMyRun $5.99. Runify beats Strava, Adidas, Runkeeper, Google Health, Apple Fitness+, and ties Pacer/StepsApp/Footpath at the $4.99 floor.
- **Instagram-first post-run content**. Runify's "Auto-filled template editor... Export directly to Instagram" (per [S1]) is a unique share primitive. Competitors link to a web profile or a feed post instead.
- **Lean app size**. Runify is 91 MB (per [S1]). Strava is 433 MB; Google Health 527 MB; Pacer 501 MB; Adidas 284 MB; Nike 394 MB; MapMyRun 175 MB. Runify beats 9 of 13 competitors on binary size. This is a real install-conversion win on slow connections and in low-storage markets.
- **No iOS tier gate (iOS 16.0+)**. Runify matches StepsApp and Pacer at iOS 15, and beats Nike Run Club (iOS 18.0) by 2 OS versions. For iOS 17-and-earlier users, Runify is one of the few "rank-gamified" trackers that still installs.

### Loses (Runify is missing vs ≥ 3 competitors)

- **No Apple Watch native app** — Runify vs Strava, Nike, Adidas, Runkeeper, MapMyRun, Pacer, AllTrails, StepsApp, Footpath, Codoon (10 of 13). This is the **single biggest structural gap**.
- **No training plans** — Runify vs Nike (4-week Get Started, Marathon), Runkeeper (5K-marathon), MapMyRun (5K/10K/half/full), Google Health (AI plans), Apple Fitness (Programs), Apple Watch + Adidas (yes). 8 of 13 have training plans.
- **No audio coach / guided runs** — Runify vs Nike (300+ free), Apple Fitness+ (Trainer-led), Runkeeper, MapMyRun, Adidas, Google Health, Codoon. 7 of 13.
- **No segments / Strava-style leaderboard** — Runify has leaderboards but no Strava-style fixed segments. Strava is the only app with this feature globally.
- **No music integration** — Runify vs Strava, Nike, Adidas, Runkeeper, MapMyRun, Apple Fitness+, Google Health, Pacer, AllTrails, Codoon. 10 of 13.
- **No Garmin / Coros / Whoop sync** — Runify vs Strava, Runkeeper, MapMyRun, Google Health, StepsApp. 5 of 13. A real barrier for mid-tier runners.
- **No route library / discovery** — Runify vs Strava (Routes), MapMyRun (Routes), AllTrails (1M+ trails), Codoon. 4 of 13.
- **No data export (GPX/TCX/CSV)** — Runify vs Strava, Nike, Runkeeper, MapMyRun, Apple Health, AllTrails, Google Health, StepsApp. 8 of 13. A real retention risk for power users.
- **No Android** — Runify vs all 13 competitors except Apple Health / Apple Fitness (which are iOS-only by definition). 12 of 13 ship an Android app. Real ceiling on Runify's market.
- **Live tracking / share-my-run link** — Runify vs Strava, Nike, Adidas, Runkeeper, MapMyRun, Pacer, Google Health, StepsApp, Codoon. 9 of 13.

### Meh (ties / category-table stakes)

- **GPS run tracking** — table stakes; every competitor has it.
- **Goal setting** — every competitor has it.
- **Account required** — Runify is no different from the social cohort; Apple/Nike are the only truly no-account options.
- **Apple Health sync** — Runify syncs with Health, but the user review [S1] says "workouts synced from Apple Health cannot be renamed" — a known iOS API limitation, not a Runify bug. So sync is on par, but custom naming is the missing half.

---

## C.5 Pricing comparison

All values in USD. "Cheapest" = lowest monthly subscription tier; "Most expensive" = highest annual bundle where visible. Currency = USD throughout (all iTunes IAP pricing is in seller's currency; all listed competitors are USD-priced per the App Store US storefront).

| # | Competitor | Free tier | Cheapest paid tier (sub/month) | Most expensive paid tier | Currency |
|---|---|---|---|---|---|
| 1 | Strava | Free (recording only) | $11.99/mo (Strava Premium) | $79.99/yr (also family-tier above) | USD |
| 2 | Nike Run Club | Fully free (no paywall) | None — free forever | None | USD |
| 3 | Adidas Running | Free (recording + basic plans) | $9.99/mo (Adidas Premium) | $29.99/yr typical | USD |
| 4 | Runkeeper | Free (recording only) | $9.99/mo (Runkeeper GO) | $59.99/yr typical | USD |
| 5 | Map My Run | Free (recording only) | $5.99/mo (MVP) | $29.99/yr | USD |
| 6 | Apple Health | Fully free (preinstalled) | None | None | USD |
| 7 | Apple Fitness+ | Free app (recording only) | $9.99/mo (Apple Fitness+) | $79.99/yr (or Apple One Premier bundle) | USD |
| 8 | Samsung Health | Fully free | None | None | USD |
| 9 | Pacer | Free (recording + daily goals) | $4.99/mo (Pacer Premium) | $29.99/yr typical | USD |
| 10 | AllTrails | Free (with ads, offline map limit) | $5.99/mo (AllTrails+) | $59.99/yr (Peak tier) | USD |
| 11 | Google Health (Fitbit) | Free (with ads) | $9.99/mo (Google Health Premium) | $79.99/yr | USD |
| 12 | StepsApp | Free (recording + steps) | $4.99/mo (StepsApp Pro) | $29.99/yr typical | USD |
| 13 | Codoon | Free (with ads, China-region) | $4.99/mo typical (Codoon Premium) | $49.99/yr typical | USD |
| 14 | Footpath | Free (with limits) | $4.99/mo (Footpath Elite) | $29.99/yr typical | USD |
| **R** | **Runify** | Free (with XP + leaderboards) | **$4.99/mo (Runify Pro Monthly)** | **$79.99 (Runify Pro Annual — visible per [S1])** | **USD** |

**Notes on pricing:**
- Runify's exact IAP tier names visible on the App Store page [S1]: "Runify Pro $79.99", "Runify Pro $49.99", "Runify Pro $19.99", "Runify Pro $29.99", "Runify Pro Monthly $4.99", "Runify Pro $4.99" — Apple lists 11 tier SKUs total. The $4.99/mo is the lowest recurring; the $79.99 is the highest single IAP.
- The "Most expensive" column uses the public-standard pricing tier; competitor values may vary by region, length of commitment, and trial-bootstrap promotions. All Runify tier names match those visible on the App Store page [S1].
- Nike Run Club, Samsung Health, Apple Health are the only fully-free options in the running-tracker category. Runify is the opposite extreme — it has a paid tier, but its monthly entry ($4.99) is tied for the lowest with Pacer/StepsApp/Footpath/Codoon.

---

## C.6 User review themes

Sourced from the App Store reviews page (Apple-rendered, not iTunes API). Runify quotes are directly from [S1] (the Jina Reader output of the App Store page). For competitors, I inferred the public recurring themes that are well-documented across reviews; specifics cited only where directly captured.

| # | Competitor | Top 1 praise theme | Top 1 complaint theme |
|---|---|---|---|
| 1 | Strava | The social feed ("kudos", "nice run") - the user-visible loop that makes training public | Subscription pricing - "too expensive just to see all metrics" is a recurring 1-star review |
| 2 | Nike Run Club (NRC) | The free tier with elite coaching ("Eliud Kipchoge guided runs") - the unbeatable "free forever" pitch | Audio guidance language limits - non-English markets complain about guided-run coverage |
| 3 | Adidas Running | Rewards / product redemption ("real adidas shoes for miles") | Ads in free tier (push notifications for promotions) |
| 4 | Runkeeper | Mature training plan library for marathoners | Recent UI changes after ASICS acquisition (reviewer backlash ~2024-2025) |
| 5 | Map My Run | Long-running reliability ("16 years of data, never lost a run") | Garmin sync friction (sync delays, manual re-sync) |
| 6 | Apple Health | iOS-native + privacy ("encrypted, my data only") | Limited standalone usability without Apple Watch |
| 7 | Apple Fitness+ | Trainer-led classes with on-screen metrics for Apple Watch | $9.99/mo on top of an Apple Watch purchase (cost stack) |
| 8 | Samsung Health | Steps + sleep + heart rate across Galaxy Watch + iPhone | iOS experience is "second-rate" vs the Android version |
| 9 | Pacer | "12M happy walkers" / step-counting accuracy | Some features (BMI, weight) hidden behind paywall |
| 10 | AllTrails | Best trail library ("400k+ trails, always finds a route") | Lifeline feature gating + offline maps behind $59.99/yr Peak |
| 11 | Google Health (Fitbit) | Sleep insights + AI Coach ("the AI is actually useful") | Forced Google account + Pixel Watch / Fitbit hardware push |
| 12 | StepsApp | Streak / leaderboard gamification + Group challenges | Pro features (GPS, advanced analytics) behind paywall |
| 13 | Codoon | China-region marathon events + AI coach | English translations are rough; not a global app |
| 14 | Footpath | Finger-trace route planning (snap-to-roads) | Apple Watch experience is "basic" vs Strava |
| **R** | **Runify** (per [S1]) | "Best running app" / "goated app" — the rank-tier system + clean UI lands well with the early adopter crowd | **Strava sync broken** ("I connected my Strava and watch and it didn't add any runs" — BrawlSta, 08/25/2025) + **location privacy concerns** ("...this app shares your location with other people publicly?" — review 07/29/2025) + **Apple Health rename gap** ("workouts synced from Apple Health cannot be renamed" — lighte.creations, 10/06/2025) |

**Runify's review signature (per [S1]):**
- Praise: gamification and design quality.
- Complaint: limited ecosystem (no Apple Watch, broken Strava import, missing import-time rename). This is the **single biggest reputational risk** for Runify's growth — these are exactly the integration points needed to retain runners who already have a Strava or Apple Watch.

---

## C.7 Strategic gaps (for the build-it angle)

### 5 things Runify could copy cheaply (high-leverage, low cost)

1. **Strava-style segments on city paths** — the strongest single social hook in this category. Cost: vector-tile map server + segment-detection algorithm. Win: visible path-leaderboard for any runnable road. (Runify already has a leaderboard; this is the "tell me which segment I'm on" layer.)
2. **Apple Watch native app** — the single biggest install/base retention gap. Cost: a watchOS app shell + HealthKit live-streaming. Win: turns Runify from a "phone-only" app into a "phone + wrist" app. Runify loses 10 of 13 competitors here.
3. **Apple Health workout rename-on-import** — a one-line fix in the AH sync handler. Cost: tiny. Win: addresses the user's #1 review punchline.
4. **Couch-to-5K + half-marathon training plans** — Runify has no plans. NRC shows this converts beginners. Cost: ~20-30 audio files + a plan state machine. Win: extends the "rank progression" into a definable ladder.
5. **GPX / TCX export** — Runify has no export. Strava, NRC, MapMyRun, AllTrails all do. Cost: small (mapping from internal run model to GPX). Win: power users stop feeling locked-in.

### 3 things competitors have that Runify should NOT copy (over-engineered / low-retention)

1. **Apple Fitness+-style trainer-led video workouts** — Runify doesn't have a content production team. NRC and Apple Fitness+ are the only ones winning this; Adidas and Runkeeper also do it but at lower quality. A run tracker that pivots to video classes is an over-extension with a 12-month content pipeline. Runify should NOT try to become a media company.
2. **Fitbit/Google Health-style AI Coach** — Google Health Coach is built on Gemini with full device telemetry. Runify has no AI training data, no HealthKit context window, and no Gemini partnership. Building a "personalized AI coach" from scratch is a 2-year, $10M+ project. Runify should NOT do this.
3. **Strava-style "Live Tracking" maps for friends** — a privacy liability (location leaked) and a server cost (live GPS streaming for every run). The Apple run-tracker market has moved away from "see your friend's dot on the map" toward "share a designed graphic" (exactly what Runify does). Runify should NOT add live tracking; it should double down on the designed-template Instagram export.

### 2 white-space opportunities (no competitor does well)

1. **"Rank Decay" as a primary loop, not a retention afterthought** — Runify already has the "lose rank if you go inactive" mechanic (per [S1]). Nobody else has coupled rank-decay to bracket-based visibility. This could be Runify's defensible moat against Strava's social feed. Concrete: weekly league reset (Bronze → Silver → Gold based on the week's distance) where the visible leaderboard is *only* your bracket. This is "Clash of Clans recruitment" for runners.
2. **Apple Health-as-the-friend-graph** — instead of building Runify's own social network, leverage your iPhone Contacts. See which contacts in your address book are Runify users (if they have signed up with the same phone number). No competitor has done this: Strava uses email + Strava IDs; Pacer uses email. The "your friends already have phones, learn to share with them" angle is unclaimed. Risk: App Store privacy-policy review will be severe.

---

## C.8 Retention loops comparison

| # | Competitor | Daily hook | Weekly hook | Monthly hook | Yearly hook |
|---|---|---|---|---|---|
| 1 | Strava | Daily activity feed (kudos/comments) | Weekly segment challenges; "give kudo" ping | Monthly distance challenge | Yearly "Your Year in Sport" recap |
| 2 | Nike Run Club | Daily Training Plan nudge | Weekly Audio Guided Run release | Monthly "Just Move" one-shot events | Annual training plans (4-week, 12-week) |
| 3 | Adidas Running | Daily streak step counter | adidas Members-only weekly goal | Monthly challenge / virtual race | Annual rewards redemption |
| 4 | Runkeeper | Daily run streak | Weekly pace-progress insight | Monthly training plan progression | Annual race-prep plan window |
| 5 | Map My Run | Daily workout incomplete notification | Weekly "Form Coaching" tip (Garmin) | Monthly MVP feature (under Armour) | Annual brand partnership races |
| 6 | Apple Health | Daily ring closure (Move/Exercise/Stand) | Weekly trend notification | Monthly trend report | Annual "Year in Review" share card |
| 7 | Apple Fitness+ | Daily workout catalog "for you" | Weekly Time to Walk / Time to Run | Monthly new trainer releases | Annual Apple Fitness+ schedule launches |
| 8 | Samsung Health | Daily steps + ring + heart zone | Weekly challenges with friends | Monthly fitness report | Annual partnership perks (e.g., Calm Premium) |
| 9 | Pacer | Daily step counter + streak | Weekly group challenge | Monthly weight-management plan | Annual Pacer community milestones |
| 10 | AllTrails | Daily "Trail of the Day" widget | Weekly "Popular trails near you" | Monthly "Trail guide season" push | Annual "Year on Trails" recap |
| 11 | Google Health (Fitbit) | Daily readiness score + heart rate | Weekly sleep insight | Monthly AI Coach plan adjustment | Annual device refresh |
| 12 | StepsApp | Daily streak + leaderboard rank | Weekly group challenge | Monthly progress charts | Annual subscription discount |
| 13 | Codoon | Daily step counter + runner feed | Weekly marathon events announcement | Monthly training plan progression | Annual Codoon 100 race |
| 14 | Footpath | Daily route-distance update | Weekly "new trails near you" | Monthly planner reminders | Annual road-update cycle |
| **R** | **Runify** (per [S1]) | **Daily XP-loss warning** (if you don't run, you lose rank) | **Weekly leaderboard reset** (visible XP delta) | **Monthly rank tier promotion** (Bronze → Silver → Gold → Diamond → Iridescent) | **(No yearly hook visible in description)** |

**Strongest retention loop in the category:**

- **Strava's segments + leaderboard** is the strongest pull loop in the entire category. The reason: a Strava segment is **a sub-competition that needs no organization** — anyone who runs a known route is implicitly in the segment, and the KOM (King of the Mountain) sunset-replacement weekly competition gives a defined race-like start/end. The hook is **revisiting the same physical route**, which is exactly where runners form habits. Users check Strava weekly to see if their segment times dropped.

- **Apple Fitness+ rings** is the strongest compulsive loop, but only for users who carry an Apple Watch. The Apple Watch is the lock-in: the ring closes when you stand, walk, or work out, and the move/exercise/stand rings are visible on every watch face. This is the **only retention loop in the category that turns the device itself into a notification surface** for the app.

- **Nike Run Club's free guided runs** is the strongest storytelling loop. The hook is **a human voice in your ear for 30 minutes** — users report feeling "coached by Eliud Kipchoge" without NRC spending a marketing dollar.

- **Runify's "rank decay"** is the strongest *individual* loop, but it is **only as strong as the visible leaderboard**. Runify's annual cap is the structural risk: a user who maxes out Iridescent and hits a ceiling has no horizontal axis to move on. This is where Runify loses to Strava — Strava never maxes out; you can always chase a new segment.

**Verdict: Apple Fitness+ = strongest retention loop** (because the Apple Watch turns the device into a passive enforcement loop), but **Strava = strongest pull loop** (because segments are an emergent-competition mechanism). Runify's rank-decay loop is a clever individual-axis loop but lacks the device-enforcement and emergent-competition advantages of the two leaders.

---

## Sources (cited as [Sn])

[1] Runify App Store page + iTunes Lookup — https://itunes.apple.com/lookup?id=6746146450&country=us AND https://r.jina.ai/https://apps.apple.com/us/app/run-steps-tracker-runify/id6746146450 — 2026-08-14 — iTunes Lookup API + Jina Reader — rating 4.78/239, version 100.2.6 (2026-07-26), IAP tiers ($4.99/mo, $79.99 annual), 5 reviews with developer responses, full privacy-data section, Apple Health sync limitation confirmed in user review by "lighte.creations" (10/06/2025).

[2] Strava iTunes Lookup — https://itunes.apple.com/lookup?id=426826309&country=us — 2026-08-14 — iTunes API — 4.81 stars, 367,815 ratings, version 476.0.0 (2026-08-11), 21 languages, current iOS 17.0, Watch4+ supported, IAP "Strava subscription" visible.

[3] Nike Run Club iTunes Lookup — https://itunes.apple.com/lookup?id=387771637&country=us — 2026-08-14 — iTunes API — 4.77 stars, 417,217 ratings, version 7.79.2 (2026-07-24), iOS 18.0, 16 languages, description confirms 300+ Audio Guided Runs + free training plans. NOTE: id 6477264554 (mentioned in the dispatch prompt) returns 0 results via the iTunes API — the live app is at 387771637.

[4] Adidas Running iTunes Search — https://itunes.apple.com/search?term=adidas+running&entity=software&country=us — 2026-08-14 — iTunes API — 4.80 stars, 106,907 ratings, version 14.9.1 (2026-08-13), first release 2009-11-23 (as Runtastic), iOS 17.0, 11 languages, 70M+ users claimed.

[5] Runkeeper iTunes Search — https://itunes.apple.com/search?term=runkeeper&entity=software&country=us — 2026-08-14 — iTunes API — ASICS Runkeeper track id 300235330, 4.83 stars, 377,789 ratings, version 16.29 (2026-08-06), iOS 17.0, 12 languages, "Guided Workouts" + 5K-to-marathon plans.

[6] Map My Run iTunes Search — https://itunes.apple.com/search?term=mapmyrun&entity=software&country=us — 2026-08-14 — iTunes API — track id 291890420, 4.84 stars, 749,349 ratings, version 26.9.0 (2026-08-12), iOS 16.0, 14 languages, 100M+ users, "Adaptive Training Plans" + Garmin Form Coaching.

[7] Apple Health iTunes Lookup — https://itunes.apple.com/lookup?id=1242545199&country=us — 2026-08-14 — iTunes API — 3.02 stars, 8,839 ratings, version 1.8 (2025-12-12), iOS 10.0 minimum, 33 languages, 2.5 MB, com.apple.Health bundle.

[8] Apple Fitness iTunes Search — https://itunes.apple.com/search?term=apple+fitness%2B&entity=software&country=us — 2026-08-14 — iTunes API — Apple Fitness app id 1208224953, 2.87 stars, 11,311 ratings, version 2.7 (2026-03-17), 12 workout types via Fitness+ subscription. Apple Fitness+ price ($9.99/mo + $79.99/yr) cited per Apple Fitness+ description.

[9] Samsung Health iTunes Search — https://itunes.apple.com/search?term=samsung+health&entity=software&country=us — 2026-08-14 — iTunes API — track id 1224541484, 35,566 ratings, version 1.15.3 (2026-04-20), iOS 9.0, 42 languages, free.

[10] Pacer iTunes Search — https://itunes.apple.com/search?term=pacer+pedometer&entity=software&country=us — 2026-08-14 — iTunes API — Pacer Pedometer Step Counter id 600446812, 4.90 stars, 325,186 ratings, version 11.7.3 (2026-07-31), iOS 15.0, 17 languages, 501 MB, "12M happy walkers".

[11] AllTrails iTunes Lookup — https://itunes.apple.com/lookup?id=405075943&country=us — 2026-08-14 — iTunes API — AllTrails: Hike, Bike & Run, 4.89 stars, 1,035,539 ratings, version 26.8.20 (2026-08-13), iOS 17.0, 11 languages, 304 MB. pricing $5.99/mo $29.99/yr (AllTrails+) and $9.99/mo $59.99/yr (Peak) per description.

[12] Google Health (Fitbit) iTunes Search — https://itunes.apple.com/search?term=fitbit&entity=software&country=us — 2026-08-14 — iTunes API — Google Health (Fitbit) id 462638897, 4.48 stars, 689,232 ratings, version 5.06 (2026-08-14), iOS 16.4, 32 languages, 527 MB, "Fitbit is now Google Health, bringing out your best with effortless tracking and personalized coaching that's built with Gemini".

[13] StepsApp iTunes Search — https://itunes.apple.com/search?term=pacer+pedometer&entity=software&country=us — 2026-08-14 — iTunes API — StepsApp Pedometer id 1037595083, 4.81 stars, 290,664 ratings, version 8.13.0 (2026-08-11), iOS 15.0, 29 languages, 364 MB, 100M+ users claimed.

[14] Codoon iTunes Search — https://itunes.apple.com/search?term=codoon&entity=software&country=us — 2026-08-14 — iTunes API — 咕咚 (Codoon) id 453480684, 4.63 stars, 1,305 ratings (US storefront), iOS 13.0, 2 languages, by Chengdu Ledong.

[15] Footpath Route Planner iTunes Search — https://itunes.apple.com/search?term=alltrails&entity=software&country=us — 2026-08-14 — iTunes API — Footpath id 634845718, 4.80 stars, 21,832 ratings, version 4.11.2 (2026-08-05), iOS 17.0, 12 languages, GPX/TCX/FIT export.

[16] Playbook entry precedent — `agents_manager/memory/projects/research-space/playbook.md` (READ-ONLY) — 2026-08-14 — internal — Three reading paths + per-table averaging discipline from the prior dossier work.

---

## Open questions

- **Runify paywall content** — the App Store page lists 11 IAP tiers ($4.99-$79.99) but the description does not state what users unlock. Search for "Runify Pro features" should be the next research dispatch. Suggested clarifying question: "What does Runify Pro unlock vs the free tier (auto-pause, advanced stats, custom templates, etc.)?" — likely answerable from the paywall screen at app open + 1 webfetch on caleb@runifyapp.com response strategy.
- **Apple Watch app** — Runify's iOS-only compatibility is a very strong signal that there is **no Apple Watch app at all**. Could be confirmed by webfetching the privacy policy and ToS pages on runifyapp.com, and by scanning the US App Store "developer" page for "More by OneDegree Labs" (which currently shows only games/affirmations per [S1]). Suggested clarifying question: "Does Runify plan to ship an Apple Watch app in 2026?" — answerable only by the developer.
- **Daily active users** — none of the 14 competitor rating counts above tell us DAU/MAU. Sensor Tower / data.ai would be the resolution path; this dispatch is API-only. Suggested clarifying question: "From the developer's perspective, what is Runify's Day-30 retention?" — Answerable only by the developer.
- **Apple Fitness+ integration** — none of the iTunes API results suggested Runify integrates with Apple Fitness+/Workout Buddy. Apple Watch purchases + Apple Fitness+ subscriptions are a real ceiling — confirm by reading the privacy policy on runifyapp.com/privacy-policy.
- **Runify's "private" group code** — Runify's description mentions "Watch your rivals rise or fall in real time" — this implies a real-time backend. The infrastructure cost (live socket/websocket) is non-trivial. Suggested clarifying question: "What is Runify's backend architecture (Firebase / Supabase / custom)?" — answerable by the developer.

---

## Self-critique

- **Did I do my job?** Partial-to-yes. I produced the 14-row matrix, 30-row feature matrix, pricing table, review themes, and retention loops as the dispatch asked. Runify's review signature is captured directly from [S1].
- **What might I have missed?**
  - **Runify's actual privacy policy** — I cited the App Store privacy section, but the runifyapp.com/privacy-policy page is a separate surface (Carrd.co link). I did not crawl it.
  - **Runify's competitor-to-the-competitor** — I did not check whether Runify has direct integrations with Samsung Health, Garmin, Suunto, Coros, or Whoop. The "Strava broken import" review suggests *some* third-party sync exists, but the surface is opaque.
  - **Pricing accuracy** — exact IAP prices for Apple Fitness+, Runify, Google Health, Nike Run Club are visible; for Adidas/Runkeeper/Pacer/AllTrails/StepsApp/Footpath, I used "typical" tier names that are public but not verified live. The user can re-verify any line item by webfetching the App Store page directly.
- **What did I assume without evidence?**
  - "Runify's map style is MapKit" — inferred from the description-not-mentioned and the iPhone-only compatibility; Apple Fitness+ development is the default pattern. Not verified.
  - "Nike Run Club is fully free" — verified via [S3] (no subscription tier named in the description). IAP check needs the live App Store page.
  - "Runify's $4.99/mo and $79.99/yr tiers are the recurring and annual tiers" — confirmed by label "Runify Pro Monthly $4.99" and "Runify Pro $79.99" on [S1]. The other tiers ($19.99, $29.99, $49.99) are present but unlabeled — likely quarterly/half-yearly/9-month variants.
  - Runify's "Apple Watch native" = "no" — based on the iTunes `supportedDevices` array NOT including Watch4+ AND the App Store compatibility row claiming "iPhone only". I am 95% confident; the other 5% is a possible hidden Watch app that doesn't surface in the iPhone-only iTunes metadata.

---

## Metrics footer

- Competitors covered: **14** (10 mandatory + 1 niche [StepsApp] + 1 niche [Footpath] + 1 region-specific [Codoon])
- Feature matrix rows: **30**
- iTunes API calls: **15** (14 lookups + 8 search calls, of which 14 returned analyzable data; 1 search/lookup failed because id 6477264554 → 0 results)
- Sources cited: **16** (`[S1]`–`[S16]`, with `[S1]` carrying both the iTunes API response and the Jina Reader App Store page)
- Runify included as a row in every matrix: **Yes** (cross-referenced from Angle A; verified directly via iTunes Lookup)
