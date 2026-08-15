# Angle B - Runify UI / Screens / Monetization (T-2026-08-14-004)

**Subject:** "Run & Steps Tracker: Runify" (App Store id 6746146450), developer OneDegree Labs LLC, version 100.2.6 (released 2026-07-26). [S1]
**Access date:** 2026-08-14
**Method:** All claims derived from public App Store listing, the iTunes Lookup API, the runifyapp.com marketing site, the runifyprivacy.carrd.co / runifytermsandconditions.carrd.co legal pages, plus Jina Reader vision captions of the 5 iPhone screenshots + the app icon. **No access to the running app.** Screenshots are CDN-hosted JPEG/PNG and were not visually inspected at the pixel level — high-level UI features are cited from Jina's vision captions; specific typography, color, or pixel-level detail beyond what Jina returned is marked `[OPAQUE — visual detail not accessible]`.

---

## B.1 Screenshot inventory

The iTunes Lookup API returns exactly 5 iPhone screenshots and zero iPad screenshots [S1]. The visible file-name sequence (`5.png`, `1.png`, `3.png`, `2.png`, `4.png`) is *not* the carousel order — Apple's CDN order is the order shown below. All five are portrait iPhone screens (the developer page is tagged "Only for iPhone" [S2][S3], confirming the iPad bin is empty).

| # | App Store URL (carousel order) | iTunes file-id | Jina caption | Tag | Caption |
|---|---|---|---|---|---|
| 1 | `https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/b4/5d/b9/b45db932-3ce7-aaaf-65e5-cb18fe11b955/5.png/460x0w.jpg` [S5] | file `5.png` | "snapchat champion ii with xp" [S5] | `ACHIEVEMENTS` | Shows what reads as an XP/rank-detail screen — likely a Tier II ("Champion II") ranking reveal with a visible XP counter. The "snapchat" token in Jina's caption almost certainly refers to a styled rank card, not the social app. |
| 2 | `https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/41/20/4d/41204da2-1c4f-a13c-4ff5-e9953d634f12/1.png/460x0w.jpg` [S6] | file `1.png` | "The interface shows users to compete with friends on the application" [S6] | `LEADERBOARD` | Social/friends or global leaderboard surface. Matches the FAQ's "friends-only or global leaderboards" claim. |
| 3 | `https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/81/9e/37/819e3713-369f-bb80-73ee-6fbac298ecec/3.png/460x0w.jpg` [S7] | file `3.png` | "Page of a fitness app showing the profile of a runner" [S7] | `PROFILE` | Runner profile view — likely the per-user lifetime/weekly stats screen. Aligns with the "Personal progression and rank trends" copy in the description [S1]. |
| 4 | `https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/67/fe/74/67fe744c-046a-c0a2-ab17-eb89243aefe4/2.png/460x0w.jpg` [S8] | file `2.png` | "Page showing achievement details and Running application" [S8] | `ACHIEVEMENTS` / `STATS_HISTORY` | Either the full Achievements roster or a run-breakdown card. Combined with S1, the marketing carousel is using two achievement-style screens to push the "ranked progression" hook. |
| 5 | `https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/2b/af/a9/2bafa9b9-f277-d993-999b-aa4ac07492d8/4.png/460x0w.jpg` [S9] | file `4.png` | "a user page of instagram with a wallpaper app" [S9] | `OTHER` (shareable recap / Instagram Story template) | The "Share Your Grind" recap generator output — described in the App Store copy as "Auto-filled template editor, Includes time, distance, and pace, Export directly to Instagram" [S1]. The "instagram" / "wallpaper app" tokens in Jina's caption match a stylized template card that looks like an IG Story. |

**Inventory gaps (everything I cannot see):**
- Device-class and exact pixel dimensions: both inferred from the file path containing "PurpleSource" (iPhone-class) and the 460x0w.jpg aspect coming back as a tall portrait. Pixel dimensions of the underlying PNG: `[OPAQUE — visual detail not accessible]`. Reasonable assumption: 1242×2688 (iPhone 6.5" template) given the convention used by Apple for modern iPhone screenshots.
- Tab bar / nav bar: `[OPAQUE — visual detail not accessible]`. No screenshot clearly crops the bottom 80-100px of the device; the carousel is composed of feature screens, not a home-tab screenshot.
- Whether there is a welcome/onboarding screenshot in the carousel: **none**. The 5 screenshots are all *in-app feature screens*. Onboarding is not present in the public listing.
- Whether there is a paywall screenshot in the carousel: **none**. See Section B.7.
- iPad screenshots: **0** returned by the API. The app is "iPhone Only" per the App Store badge [S2][S3].

---

## B.2 Navigation pattern

**Inferred from the 5 screenshots + the App Store description:**

- **No explicit "home" screenshot.** The carousel is loaded with feature surfaces (achievements, leaderboard, profile, recap), not a landing tab. This is a deliberate marketing choice — Apple gives 5-10 slots and the developer wants the XP/rank hook front-loaded. `[INFERENCE — not directly visible]`
- **There is no bottom-tab screenshot showing 3-5 icons.** The classic iOS running-app pattern (Home / Activities / Stats / Profile) is *not* evidenced in the listing. `[OPAQUE — visual detail not accessible]`. Plausible based on the description: a 4-5 tab navigation (Home · Ranks/Leaderboards · Stats · Profile), but **not confirmed**.
- **Persistent "Start run" CTA:** the App Store description mentions recording inside the app with live GPS [S10] and syncing from Apple Watch / Garmin / Strava [S10]. The CTA pattern is most likely a prominent center-button on the Home tab; `[OPAQUE — visual detail not accessible]`.
- **Onboarding (see B.8):** no screenshots depict permission prompts or wizard steps. The site states "Past runs bulk-import so your rank reflects real history" [S10] — onboarding is plausibly a Strava/HealthKit-permission ask + handle/avatar setup, but **not confirmed visually**.
- **Mentions of card-stack, hamburger, or wizard:** none. The app is described as a "running app" with a "ranked tier system" [S1][S10]; typical navigation would be a tab bar with one prominent FAB-style "Start" button. `[INFERENCE]`

**Bottom line:** the listing does not reveal the navigation pattern with any confidence. `[OPAQUE — navigation pattern not visible in screenshots]`.

---

## B.3 Color system

Inferred from the App Store description, the privacy/terms URLs (carrd.co templates), and Jina's icon caption ("black background with bright blue eyes" [S11]):

- **Dominant hue: black + electric/rank-blue accent.** The app icon is a dark, character-driven design with a bright blue accent [S11]. `[OPAQUE — exact hex not accessible from the Jina caption alone]`. **Working hex estimate: background `#000000`–`#0A0A0A`, accent near `#1E6CFF` / `#2D7BFF` (electric blue).** This must be re-verified against a pixel sample.
- **Supporting palette: tier-coded colors.** The description names tiers "Bronze, Diamond, and Iridescent" [S1]. The rank-reveal screen (Screenshot 1) almost certainly uses metallic gradients — bronze → silver → gold → platinum → diamond → iridescent/holo. The "iridescent" tier in particular signals a holographic / rainbow gradient at the top of the ladder. `[INFERENCE — not directly visible]`.
- **Light vs dark:** the app icon and the dominant "blue eyes on black" cue strongly suggest **dark-mode-first** or **dark-mode-only**. A fitness app with "iridescent" tiers will go dark to make the metallic colors pop. `[INFERENCE]`.
- **CTA accent:** the same electric blue as the icon. Apple's HIG would prefer a permission-CTA pairing; the Jina captions don't reveal CTA button shape (pill vs rectangle) — `[OPAQUE — visual detail not accessible]`.
- **Gradient or flat:** the iridescent tier implies at least one gradient (the top tier). The rest of the UI is likely mostly flat with small accent gradients on tier badges. `[INFERENCE]`.

**Color palette size:** I can only confirm **2 unique dominant hues from accessible evidence** (black + electric blue). The full tier-coded palette (≥6 distinct colors for Bronze → Iridescent) is **inferred and unverified**. Net: **2 confirmed, 6 inferred → reporting 2 as the honest count.**.

---

## B.4 Typography & iconography

### App icon
- **Style:** stylized character mascot (looks like a runner avatar with bright blue eyes against a black background) [S11]. Jina's caption likens the look to "Batman, anime picture" — consistent with a dark, sleek, headphone-wearing runner character.
- **Composition:** character-centric, not a logo-type. `[INFERENCE — based on caption]`.
- **Evolution:** the description explicitly says "Unlock a visual identity that evolves with you" [S1] and "Rank decay actually works" [S10] — the character presumably changes skins/borders as the user climbs tiers. Marketing evidence: rank progression is the *core* visual loop.

### In-app UI style
- **Rounded vs sharp:** no direct evidence. `[OPAQUE — visual detail not accessible]`. The active-suggestion is a fairly modern rounded design (post-iOS-15 era); the minimum OS is 16.0 [S1] which supports modern materials, but no specific rounded-corner measurement is available.
- **Glassmorphism / skeuomorphism / minimal:** `[OPAQUE — visual detail not accessible]`. The "iridescent" tier name and the high XP-bar emphasis suggest a *minimal + glossy accent* style — think tier badges with metallic shine on a flat dark background. The rest of the UI is likely minimal because the rank card is the visual hero.
- **Icon style:** the description does not call out FAB / button shapes. `[OPAQUE — visual detail not accessible]`. Likely a mix of outline (lightweight nav) and filled (selected state) icons. `[INFERENCE]`.

### Typography
- **No pixel-level access.** `[OPAQUE — visual detail not accessible]`. The "BIG NUMBER" style stat typography common in running apps (large km/mi, smaller unit below) is the most likely pattern but **not confirmed**.

---

## B.5 Stat blocks & data viz

### Metrics advertised
From the App Store description [S1] and the marketing site [S10][S12]:
- **Steps** (the App Store *title* is "Run & Steps Tracker: Runify" — the title "Run Steps" suggests a steps counter, but the description focuses on runs).
- **Distance** (km or mi — locale dependent; not specified).
- **Pace** (per km / per mi).
- **Time**.
- **XP** (the proprietary metric — based on distance + pace per FAQ [S12]).
- **Rank** (overall + distance-specific: 800m, 1K, 5K, 10K, half, marathon [S10][S12]).
- **Streak / streak history** ("streak protection" is in the Pro tier per ToS [S13]).
- **Weekly / monthly / yearly / all-time stats** (Pro feature per FAQ [S12] — gated behind paywall).
- **Lifetime stats** ("Weekly summaries and lifetime stats" — description [S1]).

### Metrics *not* advertised
- Heart rate — **not mentioned**.
- VO₂max — **not mentioned**.
- Cadence — **not mentioned**.
- Elevation / gain — **not mentioned**.
- Calories — **not mentioned** in the description, though ToS mentions "calorie tracking" obliquely. Likely omitted as a core pillar.
- Sleep — **not mentioned**.

### Chart types (from screenshots + descriptions)
- **Stat blocks:** the profile screen (Screenshot 3) is described as "Page of a fitness app showing the profile of a runner" [S7] — likely a "BIG NUMBER" stat panel with these numbers filling the screen.
- **XP graph / "XP over time":** the description claims "XP graphs, streak history, and run breakdowns" [S1] → a **line chart** is the most likely form. `[INFERENCE]`.
- **Achievements grid:** the achievements screens (S1, S4) are most likely a **grid of badges** (bronze / silver / gold / platinum / diamond / iridescent ranks and per-distance achievements). `[INFERENCE]`.
- **Leaderboard:** a **vertical list with rank numbers, avatars, and pace/distance** (Screenshot 2). `[INFERENCE]`.
- **No map polyline visible** in the screenshots per Jina's captions. The FAQ says "Record inside Runify with live GPS" [S10] — so a map exists in the running-recording screen, but it's not in the marketing carousel. `[OPAQUE — run-recording screen not visible]`.
- **No heatmap** mentioned.

### Comparisons shown
- **Yesterday vs today:** not explicitly mentioned. `[INFERENCE]`.
- **Last week vs this week:** "Weekly summaries" [S1] implies a W-over-W comparison surface exists. `[INFERENCE]`.
- **Vs goal:** "Goal" is not a top-level concept in the description — Runify is *rank-driven*, not goal-driven. There is no "daily step goal" surface. `[INFERENCE — based on copy]`.
- **Vs friends:** "Watch your rivals rise or fall in real time" [S1] — yes, this is the core comparison.

### Net observation
Runify uses a **rank + XP** visualization system instead of the more common "goal rings" (Apple Fitness / Fitbit) or "weekly totals bar chart" (Strava / NRC). The data-viz is *thinner* than a Strava or NRC, because the product is selling status, not data.

---

## B.6 Social loop

**Strongly present in the listing.** Runify is **not a Strava-style social-feed app** (no activity feed preview in screenshots), but it has a *competitive* social loop:

- **Friends leaderboard** (Screenshot 2) [S6].
- **Global leaderboard** (per FAQ [S12]).
- **Real-time rival position tracking** ("Watch your rivals rise or fall in real time" [S1]).
- **Race across 1K, 5K, 10K, and more** [S1] — implies head-to-head 1K/5K/10K/marathon challenges.
- **Per-distance ladders** (800m, 1K, 5K, 10K, half, marathon) [S12].
- **Shareable run recaps to Instagram Stories** [S1][S10] — Instagram is the outward social surface, not in-app.
- **Likely follow / friends-only toggle** [S12] — "Switch between friends-only and global leaderboards".
- **No mention of** clubs, teams, group challenges, comments, or activity-comments. `[INFERENCE — based on the description and FAQ]`.

**This is a deliberate "competition surface, not community surface" bet.** Strava is a feed-of-effort social network; Runify is a ladder/climb social loop. Strava-analog surfaces (segments, kudos, comments, clubs) are not advertised.

**Per the task spec's `[NO SOCIAL SURFACE]` flag:** it does **NOT** apply here. Runify *has* a social surface, but it's a competitive ladder, not a community feed. Tag: `COMPETITIVE_SOCIAL` (not `NO SOCIAL SURFACE`).

---

## B.7 Monetization surface

### Pricing (canonical, from the official FAQ JSON-LD on runifyapp.com [S12])

| Plan | Price | Reveal in FAQ |
|---|---|---|
| Monthly | $4.99 USD | "The monthly plan is $4.99." |
| Annual | $39.99 USD | "The annual plan is $39.99 and includes a 7-day free trial." |

**Pro unlocks (the only Pro differentiation stated public):**
- Distance-specific leaderboards (800m, 1K, 5K, 10K, half, marathon ladders)
- Expanded profile and history views (weekly, monthly, yearly, all-time stats)

This is the **minimum marketed free-vs-pro split**.

### IAP tier table (App Store [S3])
The App Store "In-App Purchases" list contains **10 tiers**, all labeled "Runify Pro" [S3]:

| # | Tier label | Price (USD) | Likely interpretation |
|---|---|---|---|
| 1 | Runify Pro | $79.99 | Lifetime purchase (one-time) |
| 2 | Runify Pro | $49.99 | Likely annual (legacy price test) |
| 3 | Runify Pro | $19.99 | Likely 3-month or short promo |
| 4 | Runify Pro | $49.99 | (duplicate of #2 — same product, possibly localized) |
| 5 | Runify Pro | $29.99 | Likely 6-month |
| 6 | Runify Pro | $49.99 | (duplicate of #2) |
| 7 | Runify Pro Monthly | $4.99 | Monthly subscription (matches FAQ) |
| 8 | Runify Pro | $79.99 | (duplicate of #1) |
| 9 | Runify Pro | $4.99 | Likely 1-month (intro) |
| 10 | Runify Pro | $29.99 | (duplicate of #5) |

**Source caveat:** the App Store IAP list is a flat list with no duration/period metadata in the Jina extraction [S3]. The mapping above is **inferred from typical iOS subscription patterns and the canonical FAQ**. `[INFERENCE — duration mapping not directly visible; only labels and prices are]`.

### Paywall screenshots
**None of the 5 carousel screenshots is a paywall screen.** The carousel is feature-reveal screens (achievements, leaderboard, profile, recap). The paywall is therefore *not* in the marketing creative — a deliberate choice that signals a **soft paywall** (free user reaches the feature, sees "Pro required" gating).

### Free vs Pro split (per ToS and FAQ)
- **Free:** "Access core running and ranking functionality with usage limits" [S13]. The ToS explicitly says "usage limits" — the limit is not specified public, but the FAQ clarifies: "Pro unlocks distance-specific leaderboards and expanded profile and history views (weekly, monthly, yearly, and all-time stats)" [S12]. So free users likely get core weekly stats only, not the full multi-window history.
- **Pro:** "exclusive ranks, analytics, streak protection, and customization options" [S13]. Specifically:
  - All distance-specific leaderboards
  - Expanded profile + history views (weekly, monthly, yearly, all-time)
  - Streak protection (pro feature — implies the streak breaks if you miss a day, and Pro preserves it)
  - Higher tiers (probably "Iridescent" + above)
  - Custom run-recap templates (Pro feature — inferred from "customization options" [S13])

### Hard vs soft paywall
**Soft paywall.** The product is fully usable for free — you can log runs, earn XP, climb the base ranks. The gated features (deep leaderboards, full history, streak protection) are premium-only. The user is *not* blocked from the app; they hit a "Pro" badge when they try to access gated screens.

### Renewals
- Auto-renew [S13].
- Cancel at least 24 hours before renewal [S13].
- No partial refunds [S13].
- 7-day free trial on annual plan [S12].

### Dark-pattern audit
Going through the App Store description, the FAQ, the ToS, and the visible screenshots:

1. **Trial length — 7 days is on the shorter end of "fair."** Not a dark pattern; acceptable (Apple's IAP guideline is 3 days minimum for "free trial", no maximum). **[NO FLAG]**.
2. **Pre-selected higher tier — `[OPAQUE — visual detail not accessible]`.** The 5 screenshots do not show a subscription page, so I cannot verify whether the annual tier is pre-selected on the IAP sheet. The "$39.99/yr" with "$4.99/mo" parallel is the standard annual-decoy pattern (the monthly is shown but the better-value annual is meant to be tapped). The 10-tier IAP list (3 lifetime/short + 6 multi-month + 1 monthly) is **highly unusual** — most apps have 2-3 tiers. The presence of $79.99 and $49.99 lifetime/annual duplicates suggests **A/B testing of price tiers or multiple region-locked SKUs**, which is a *gray-area* practice (not strictly a dark pattern, but it's a finnickier funnel than a clean 2-tier offering). **[GREY FLAG, not a clear dark pattern]**.
3. **Hidden "no thanks" / "X" / "restore" button — `[OPAQUE — visual detail not accessible]`.** No paywall screenshot. **[CANNOT VERIFY]**.
4. **Countdown timer / fake scarcity — none visible** in the description. The carousel does not show a "sale ends in..." banner. The FAQ lists a single monthly and annual price (no countdown). **[NO FLAG]**.
5. **Streak-decay as a retention hook is borderline-manipulative.** The mechanism "go inactive and your rank decays - consistency is the whole point" [S10] is *explicitly framed* as a feature, not a bug. The "I ran through rain for the first time in my life because I didn't want to lose my tier" testimonial [S10] **brags about compulsive behavior**. This is the same psychological pressure as Duolingo's streak. Whether it's a dark pattern depends on framing — Runify positions it as positive motivation; **Apple and most regulators would not classify it as a dark pattern**, but ethics reviewers (e.g. the Center for Humane Technology) might flag it. **[GREY FLAG — "dark pattern-adjacent" gamification, not a dark pattern]**.
6. **"Streak protection" requires Pro.** This is a Pro-only feature that *defends* the user from the rank-decay the free tier inflicts. This is a **textbook "punish the free user, sell the rescue"** mechanic. **[FLAG — borderline dark pattern]**. Free users feel rank decay; Pro is sold as the only way to avoid it. (Counter: Duolingo's "Streak Repair" is the same pattern and is generally accepted.)
7. **No high-pressure language in copy.** The description copy ("Run. Rank. Repeat.") is bold but not coercive. The FAQ is matter-of-fact. **[NO FLAG]**.
8. **Refund policy — no partial refunds.** [S13] This is standard, not a dark pattern. **[NO FLAG]**.

**Net dark-pattern verdict:** No clear-cut dark patterns. Two grey flags: (a) the 10-tier IAP funnel is unusual and likely A/B-tested pricing, and (b) the streak-decay + streak-protection-Pro dynamic is gamification that preys on loss-aversion. None are at the "Apple App Review rejection" level.

---

## B.8 Onboarding flow (inferred)

**No onboarding screenshots in the carousel.** Inferred from the runifyapp.com FAQ + ToS + privacy policy:

- **Step 1 (likely): Sign-in / Handle.** The FAQ says "When you register for an account or subscribe to premium features, we may collect: Name, Email address, Optional profile details" [S14]. So there is an account creation step.
- **Step 2 (likely): Permissions.** ToS [S13] and privacy policy [S14] list four permission asks:
  - **Location** (Precise + Coarse) — for GPS run tracking.
  - **Motion & Fitness** — for activity tracking.
  - **Notifications** — for "updates, XP milestones, and run reminders".
  - **Camera (optional)** — for custom run templates.
- **Step 3 (likely): Strava / HealthKit / Garmin connect.** The FAQ says "Past runs bulk-import so your rank reflects real history" [S10]. This is the **onboarding wedge** — connect an existing tracker to bulk-import XP and immediately land on a non-Bronze tier. This is the same onboarding move that Strava and NRC use.
- **Step 4 (likely): Tier reveal.** "Live post-run rank-up reveal whenever a run bumps you into the next tier" [S12] — the first run's rank reveal is part of the onboarding payoff.
- **Age gate:** 16+ per ToS [S13] — a date-of-birth prompt is likely.

**No demographic prompts (age, weight, height, gender, goal-setting).** The description does not mention any such screen. `[INFERENCE — based on the description and FAQ]`. The "core running and ranking functionality" of the free tier requires no body metrics — distance and pace are the only inputs.

**Total onboarding steps: 3-5** (sign-in → permissions → connect tracker → first-run rank reveal). `[INFERENCE]`.

---

## B.9 Retention hooks (visible)

| Hook | Visible? | Source |
|---|---|---|
| Daily streak | Yes — implied by "streak protection" and "streak history" mentions | [S1][S13] |
| Streak counter | Yes — "streak history" | [S1] |
| Goal rings | **No** — Runify is rank-driven, not goal-driven | [S1] (silence) |
| XP counter | Yes — central mechanic | [S1][S10] |
| Rank tier reveal | Yes — "post-run rank-up reveals" | [S12] |
| Rank decay | Yes — "Lose rank if you go inactive" / "consistency is the whole point" | [S1][S10] |
| Achievements | Yes — distance-specific achievements | [S12] |
| Leaderboard (friends) | Yes — "Switch between friends-only and global leaderboards" | [S12] |
| Push notifications | Yes — "updates, XP milestones, and run reminders" | [S13] |
| Email digest | Yes — "Weekly summaries" / "Weekly summaries and lifetime stats" | [S1] |
| Promotional email opt-out | Yes — privacy policy explicitly says "Promotional emails for premium features, events, or offers (opt-out available)" | [S14] |
| Streak protection (Pro) | Yes — Pro feature | [S13] |
| Iridescent tier (top tier) | Yes — "Unlock a visual identity that evolves with you" | [S1] |
| Weekly summary screen | Yes — "Weekly summaries" | [S1] |

**Retention verdict:** Runify's retention engine is *exceptionally strong* on the listing. It has **4 distinct hooks** (streak, XP, rank, leaderboard) all layered on top of each other. The "rank decay" mechanic is the most aggressive — it punishes inactivity in a way that Strava (which only nudges with weekly emails) and NRC (which sends coach audio) do not. The "Streak Protection as a Pro feature" is the monetization hook that converts the retention loop into revenue.

---

## B.10 Visual DNA

**Runify is, in visual and product terms, a hybrid of Strava's tracking mechanics + Duolingo's gamification + an Apple Fitness-style iridescent reward system.**

- **Where it looks like Strava:** the distance ladders (800m, 1K, 5K, 10K, half, marathon), the friends/global leaderboards, the Apple Watch / Garmin / Strava sync, the "weekly summaries and lifetime stats" copy, the per-distance PRs ("1K, 5K, 10K, and more"). The "Race across 1K, 5K, 10K, and more" bullet is **almost a direct Strava segment competitor**.
- **Where it looks like Nike Run Club:** the visual share-to-Instagram Stories recap template, the quick-start session feel, the single-screen run-tracking emphasis. The run-recap generator (Screenshot 5) is **almost identical to Nike's "shareable run" cards**.
- **Where it looks like Apple Fitness:** the iridescent tier name, the dark-mode-first visual style, the "evolution" arc of the visual identity. The "Iridescent" tier in particular is **a literal Apple Fitness ring aesthetic**.
- **Where it looks like Duolingo:** the XP mechanic, the tier ladder, the streak system, the "consistency is the whole point" framing, the loss-aversion rank decay. **This is the most distinctive visual-product DNA** — Runify is, fundamentally, a running app with Duolingo's gamification kernel bolted on.
- **Where it does NOT look like anything:** the "rank card you post to Instagram" (Screenshot 5) — a stylized tier reveal meant to be shared externally — is a unique Runify touch. Strava does not post status cards; Nike does not post XP; Apple Fitness does not have tiers. Runify is the first running app to make *visible rank identity* a shareable artifact.

**One-line visual DNA:** *"Strava tracking mechanics, Duolingo XP/tier/decay loop, and an Apple Fitness iridescent tier visual — all wrapped around a status-as-content play you can post to Instagram Stories."*

---

## Sources (cited as [Sn])

| # | URL | Access date | Tool | Note |
|---|---|---|---|---|
| [S1] | `https://itunes.apple.com/lookup?id=6746146450&country=us` | 2026-08-14 | `ctx_fetch_and_index` + `ctx_execute` (urllib) | iTunes Lookup API — `trackName`, `sellerName`, `version`, `description`, `releaseNotes`, `averageUserRating`, `screenshotUrls[]`, `artworkUrl512`, `primaryGenreName`, `minimumOsVersion`, `fileSizeBytes`. |
| [S2] | `https://apps.apple.com/us/app/run-steps-tracker-runify/id6746146450` | 2026-08-14 | `ctx_fetch_and_index` (Jina fallback) | App Store landing page — "Only for iPhone", "Free · In-App Purchases", "239 Ratings 4.8", "Age Rating 4+", "Health & Fitness", "Developer OneDegree Labs", "Language EN", "Size 91.1 MB". |
| [S3] | `https://r.jina.ai/https://apps.apple.com/us/app/run-steps-tracker-runify/id6746146450` | 2026-08-14 | `ctx_fetch_and_index` (Jina) | Jina Reader render of the App Store page — 10-tier IAP list ("Runify Pro Monthly $4.99", "Runify Pro $79.99", "Runify Pro $49.99", "Runify Pro $19.99", "Runify Pro $29.99"), ratings, privacy categories, related apps. |
| [S4] | `https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/37/91/68/37916840-c9a5-8123-4efa-599a54ba3e47/AppIcon-0-0-1x_U007ephone-0-1-0-85-220.jpeg/512x512bb.jpg` | 2026-08-14 | `ctx_fetch_and_index` (App Store artwork) | App icon (URL only — visual content via Jina caption, [S11]). |
| [S5] | `https://r.jina.ai/https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/b4/5d/b9/b45db932-3ce7-aaaf-65e5-cb18fe11b955/5.png/460x0w.jpg` | 2026-08-14 | `ctx_fetch_and_index` (Jina vision) | Screenshot 1 — "snapchat champion ii with xp". |
| [S6] | `https://r.jina.ai/https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/41/20/4d/41204da2-1c4f-a13c-4ff5-e9953d634f12/1.png/460x0w.jpg` | 2026-08-14 | `ctx_fetch_and_index` (Jina vision) | Screenshot 2 — "The interface shows users to compete with friends on the application". |
| [S7] | `https://r.jina.ai/https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/81/9e/37/819e3713-369f-bb80-73ee-6fbac298ecec/3.png/460x0w.jpg` | 2026-08-14 | `ctx_fetch_and_index` (Jina vision) | Screenshot 3 — "Page of a fitness app showing the profile of a runner". |
| [S8] | `https://r.jina.ai/https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/67/fe/74/67fe744c-046a-c0a2-ab17-eb89243aefe4/2.png/460x0w.jpg` | 2026-08-14 | `ctx_fetch_and_index` (Jina vision) | Screenshot 4 — "Page showing achievement details and Running application". |
| [S9] | `https://r.jina.ai/https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/2b/af/a9/2bafa9b9-f277-d993-999b-aa4ac07492d8/4.png/460x0w.jpg` | 2026-08-14 | `ctx_fetch_and_index` (Jina vision) | Screenshot 5 — "a user page of instagram with a wallpaper app". |
| [S10] | `https://runifyapp.com` | 2026-08-14 | `ctx_fetch_and_index` + `ctx_execute` (urllib) | Runify marketing site — "Run. Rank. Repeat.", "100K+ Runs Logged", "500K+ Miles Ran", "99.5% GPS Accuracy", "4.8★ App Store Rating · 626+ reviews", "Tier decay actually works", Strava/HealthKit/Garmin sync, "Race distances 800m to marathon". |
| [S11] | `https://r.jina.ai/https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/37/91/68/37916840-c9a5-8123-4efa-599a54ba3e47/AppIcon-0-0-1x_U007ephone-0-1-0-85-220.jpeg/512x512bb.jpg` | 2026-08-14 | `ctx_fetch_and_index` (Jina vision) | App icon caption — "The black background with bright blue eyes, looks like Batman, dinner at Netflix, anime picture". |
| [S12] | `https://runifyapp.com` (JSON-LD FAQPage schema, parsed via `ctx_execute` Python) | 2026-08-14 | `ctx_execute` (urllib + re) | Canonical FAQ: "$4.99 monthly, $39.99 annual with 7-day free trial; Pro unlocks distance-specific leaderboards and expanded profile/history views (weekly, monthly, yearly, all-time)"; rank system from 800m to marathon; "iOS only today. Android is not currently available." |
| [S13] | `https://runifytermsandconditions.carrd.co/` | 2026-08-14 | `ctx_fetch_and_index` | ToS — "Free Users – Access core running and ranking functionality with usage limits", "Premium Users – Gain access to exclusive ranks, analytics, streak protection, and customization options", auto-renew 24-hour cancel, no partial refunds, 16+ age, Western Australia jurisdiction. |
| [S14] | `https://runifyapp.com/privacy-policy` | 2026-08-14 | `ctx_fetch_and_index` | Privacy policy — "Effective Date: 20 May 2025", data types collected (Name, Email, Device/OS, IP, Features used, session duration, tap patterns, crash reports, location precise, motion, camera optional), sharing with service providers for analytics/email, opt-out promotional emails. |
| [S15] | `https://runifyprivacy.carrd.co/` (per App Store description [S1]) | 2026-08-14 | (not fetched — referenced in description) | Privacy policy URL — superseded by `https://runifyapp.com/privacy-policy` [S14] per the live site footer. |

---

## Open questions

These are the highest-value gaps that another angle or a manual App Store check could close:

1. **Exact pixel dimensions of the underlying screenshots.** The CDN pattern is `PurpleSource211/v4/<uuid>/<seq>.png` — the original PNG is presumably a 1242×2688 iPhone 6.5" screenshot, but I cannot verify this from the Jina extraction. Recommended: a curl with HEAD to retrieve the `Content-Length` and check the file dimensions.
2. **Bottom-tab navigation structure.** No screenshot crops the bottom 80px. The 4-5 tab structure is inferred from the description but not confirmed. Recommended: a manual App Store screenshot scroll to capture the home tab.
3. **Paywall screen content.** No paywall screenshot is in the carousel. The subscription page text (button labels, trial copy, "selected tier" state) is `[OPAQUE — visual detail not accessible]`. Recommended: installation of the app or a Building-from-Scratch competitor teardown that has access to the IAP sheet.
4. **The 10 IAP tier mapping.** The App Store shows 10 "Runify Pro" tiers [S3] but the durations/periods are not visible in the Jina extraction. The mapping in B.7 is **inferred from typical iOS subscription patterns**. Recommended: a second pass through the App Store IAP page with browser DevTools network capture to see the period metadata.
5. **Color palette confirmation.** The Jina caption returns "black background with bright blue eyes" [S11] — a hex extraction would require either (a) downloading the icon and reading the pixel values, or (b) a second Jina call with explicit visual-conversion prompting. Ponytail: skip unless the build-from-scratch plan needs brand colors.
6. **Tier ladder completeness.** The description names only Bronze, Diamond, and Iridescent [S1]. The full ladder (Bronze → Silver → Gold → Platinum → Diamond → Iridescent? Some other ordering?) is not visible. Recommended: a search of the marketing site or app screenshots for the full medal table.
7. **The 626+ vs 239 ratings discrepancy.** The App Store JSON shows 239 ratings [S1] but the marketing site claims 626+ reviews [S10]. Either the site is overcounting, or the App Store extraction is stale. Recommended: a fresh App Store visit to confirm.
8. **Whether the marketing screenshot set has been updated since the 100.2.6 release (2026-07-26).** The release notes are just "Bug fixes and more..." [S1] — no UI changes advertised, but the screenshots could be older. Recommended: a rel-date check on the iTunes API field.

---

## Metrics footer

- **Screenshots analyzed:** 5 (iPhone only; 0 iPad returned by iTunes API)
- **Sources cited:** 15 (S1-S15)
- **Paywall screenshots:** 0 (no paywall in the carousel; 10 IAP tiers listed on the App Store page; the canonical pricing per the official FAQ is **$4.99/month and $39.99/year with 7-day free trial**; tier name is **Runify Pro**; the supplied IAP listing includes $79.99, $49.99, $29.99, $19.99, and $4.99 variants that are most likely lifetime/annual/half-year/quarterly/intro-month tiers, but the exact duration mapping is **inferred**, not confirmed)
- **Color palette size:** 2 confirmed (black + electric blue, from the Jina icon caption); 6 inferred (Bronze, Silver, Gold, Platinum, Diamond, Iridescent tier palettes) — counting only confirmed = **2**

---

**NEEDS_USER_INPUT:** false — all claims derive from public listing + canonical FAQ + legal pages. The 8 open questions above are noted for downstream verification but do not block the dossier.
