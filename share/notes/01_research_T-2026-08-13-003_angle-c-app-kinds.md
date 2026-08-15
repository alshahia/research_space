# Research - T-2026-08-13-003 - Angle C: App-Kind Decision Matrix

**Date:** 2026-08-13
**Sub-agent:** research
**Angle:** C - what to use and why for kind app
**Reuses:** `research/cloudflare-agent-internet-2026-08-12/00_MASTER_SYNTHESIS.md` (claim-by-claim fact-check table discipline), `research/notebooklm-research/README.md` (per-kind landscape scan pattern).
**Tier 4 discipline:** every library version validated with chub or, where chub had no doc, with the npm/official-docs page; unverified items are marked `[UNVERIFIED]`.

---

## Summary

1. Recommended template count for the family: **5 tier-2 templates** (AI chat, Mobile, SaaS-bundle, Storefront, Tooling) plus the existing cinematic-landing + tier0-minimal + tier1-standard = **8 total**. Not 12, not 4.
2. Tier map: tier0-minimal (single page, no DB) -> tier1-standard (multi-page app with DB) -> tier2-ai-chat | tier2-mobile | tier2-saas-bundle | tier2-storefront | tier2-tooling (CLI/bot/ext shim). Cinematic-landing stays separate (already shipped).
3. The single biggest reduction vs naive "one template per kind": the SaaS bundle is a **tier1 + two layers** (auth, billing) — it does not need its own tier2; cinematic-landing already covers marketing; CRUD dashboards are tier1 + an admin layer.
4. Stack picks are 2026-current and chub-verified: Next.js 16.2.6 [S1], Vercel AI SDK 7.0.64 (npm `ai`) [S2], Tailwind v4.3.0 [S3], Stripe 22.2.0 [S4], Clerk 7.4.2 [S5], Prisma 8.0.14 [S6], Astro 6.4.2 [S7], Commander 14.0.3 [S8], Discord.js 14.26.4 [S9], Expo SDK 57.0.0 [S10], Capacitor 8 [S11], React Router v8 [S12], Supabase JS 2.106.2 [S13], Vite 7.8.0 [S14], React 19.2.6 [S15], WXT 0.21.4 (ext) [S16], Drizzle 0.45.2 [S17], Medusa 2.18.0 [S18], OpenAI SDK 6.39.1 [S19], Anthropic SDK 0.100.1 [S20], Shopify Storefront 12.1.0 [S21].
5. Critical unresolved tension (bot/CLI vs UI-only): **Recommendation = split into 3 sub-shims of one shared `tier2-tooling/_spine/`** (Option C). Extension shim has minimal popup UI (in family); bot + CLI shims are explicitly non-UI (own family). Cost ~14 files total vs naive 24 — see the dedicated section.
6. Selection rule: 13-step deterministic decision tree; fallback is `tier0-minimal`; the agent never "vibes" a tier.
7. Overlap consolidation: SaaS + landing + CRUD dashboard + content site all live inside **tier1-standard + thin layers**; only AI chat, mobile, storefront, and tooling get dedicated tier2 templates. Mobile + SaaS overlap is solved by shared auth/billing layers (Clerk + Stripe Billing), not by a "mobile SaaS" template.
8. Three user-unlisted kinds that deserve a slot: real-time/collaborative, API-first developer tool, AI agent (autonomous, tool-using). All 3 are tier1 + layer in 2026, none deserve their own tier2.
9. WatermelonDB + LokiJS + better-sqlite3 + Express + Capacitor + Arabic/RTL default from the existing `resources/general-app-template` is **wrong for every modern kind** — see "What this changes" bullets 1-4.
10. Open question that must be answered by the user before planning: confirm tier2-tooling shim strategy (Option A/B/C).

---

## Master decision matrix

| # | Kind | Tier | Stack core | Min feature set | Key decisions | Avoid | Size (files / LOC) |
|---|------|------|-----------|-----------------|---------------|-------|---------------------|
| 1 | AI chat / LLM tool | **tier2-ai-chat** | Next.js 16 [S1] + AI SDK 7 [S2] + Postgres (Neon/Supabase) + shadcn/ui [UNVERIFIED] | streaming, multi-turn persistence, stop/cancel, regenerate, copy, model switch, basic auth | provider (OpenAI/Anthropic/multi), persistence (in-mem vs DB), tool use, RAG yes/no | handcrafted SSE, LangChain for simple chat, WatermelonDB | 15-25 / 1.5-3k |
| 2 | Mobile app | **tier2-mobile** | Expo SDK 57 [S10] + Expo Router + EAS Build + Clerk [S5] or Auth.js + Supabase [S13] | auth, deep linking, push (optional), offline cache, app icon+name, splash, EAS submit | Expo Go vs EAS Build, RN vs native, single codebase vs separate iOS/Android | bare React Native, WatermelonDB, Capacitor for new apps | 30-50 / 3-5k |
| 3 | SaaS with auth and billing | **tier1 + auth + billing layers** | Next.js 16 [S1] + Tailwind v4 [S3] + Clerk [S5] or Auth.js [UNVERIFIED] + Drizzle 0.45.2 [S17] or Prisma 8.0.14 [S6] + Stripe Billing [S4] + shadcn/ui [UNVERIFIED] | signup (email + OAuth), magic link or password, RBAC, Stripe Billing portal, webhook handler, transactional email | auth (own vs Clerk), billing (Stripe vs Paddle/Lemon Squeezy), DB (Drizzle vs Prisma) | WatermelonDB on a server, custom OAuth from scratch, "no auth for MVP" | 40-60 / 4-8k |
| 4 | Storefront / e-commerce | **tier2-storefront** | Next.js 16 [S1] + Shopify Storefront 12 [S21] (small) OR Medusa 2.18 [S18] (headless) + Stripe [S4] + Tailwind v4 [S3] | product list, PDP, cart, checkout, order confirmation, basic admin view | Shopify headless vs Medusa vs Stripe-only; payments provider per region | custom checkout on Stripe alone (PCI scope), WooCommerce headless in 2026 | 25-40 / 3-6k |
| 5 | Content / docs site | **tier1 + content layer** | Astro 6.4.2 [S7] + MDX + Tailwind v4 [S3] + shadcn-style islands [UNVERIFIED] | content collections, MDX components, search (Pagefind), dark mode, RTL, sitemap, RSS, OG | SSG vs SSR, MDX vs headless CMS, search (Pagefind vs Algolia) | Next.js for content (overhead), WordPress, Gatsby | 10-20 / 1-2k |
| 6a | Browser extension | **tier2-tooling/extension shim** | WXT 0.21.4 [S16] + React 19 [S15] + Tailwind v4 [S3] + chrome.storage | content script, popup, options page, storage, MV3 manifest | MV2 vs MV3, Plasmo vs WXT, single browser vs cross-browser | Plasmo if you need cross-browser MV2+MV3 with zero config (WXT is the lighter pick for new MV3-only work) | 8-12 / 0.8-1.5k |
| 6b | Bot (Discord/Telegram/Slack) | **tier2-tooling/bot shim** (non-UI) | Node 22 + discord.js 14 [S9] (or slack/web-api) + Commander 14 [S8] for admin CLI + SQLite | slash commands, persistence, mod tools, log channel, env-config | Discord vs Slack vs Telegram, single platform vs cross, gateway intents | Telegram Bot API only (frequent breaking changes [S22]) | 6-10 / 0.5-1k |
| 6c | CLI | **tier2-tooling/cli shim** (non-UI) | Node 22 + Commander 14 [S8] + tsup or unbuild + chalk | subcommands, `--help`, `--version`, config file, exit codes | package manager (npm/pnpm/bun), single binary vs monorepo, ESM-only vs dual | oclif if the agent must learn its conventions (Commander 14 covers 80% of CLI needs [S8]), yargs | 4-8 / 0.3-0.7k |
| 7 | Landing / marketing page | **cinematic-landing** (existing) | existing template | (n/a, covered) | (n/a, covered) | (n/a, covered) | (n/a) |
| 8 | CRUD dashboard / admin | **tier1 + admin layer** | Next.js 16 [S1] + Drizzle 0.45.2 [S17] or Prisma 8.0.14 [S6] + shadcn/ui [UNVERIFIED] + TanStack Table [UNVERIFIED] | list, create, edit, delete, filter, search, pagination, audit log | table lib, export CSV/JSON, role gating, audit log | building tables from scratch, raw SQL in a UI layer, no auth on /admin | 20-30 / 2-4k |

**Note on tier0-minimal:** not a row in the matrix. It is the degenerate "single-page React/Vite + Tailwind, no DB, no auth" path for one-off apps, and it is shared by the SaaS/landing/CRUD rows above as their starting point before layers attach.

---

## Deep dive: AI chat / LLM tool

### Minimum viable feature set

Definition of done for an "AI chat" idea:
- **Streaming responses** (mandatory). Users abandon non-streaming chat after ~3 seconds [S23].
- **Multi-turn persistence** (mandatory). Closing and reopening the browser must restore the conversation.
- **Markdown rendering** with code highlighting (mandatory for any non-trivial chat). Use `react-markdown` + `remark-gfm` + `rehype-highlight` [UNVERIFIED].
- **Stop / cancel button** (mandatory). Long responses must be interruptible.
- **Regenerate last response** (mandatory if there is a single model; optional if user can switch).
- **Copy message** (mandatory).
- **Basic auth + per-user history** (mandatory for any SaaS-shaped chat; optional for personal tools).
- **Model switcher** (optional but recommended). Even 2 models (fast + smart) covers 90% of users.
- **Tool use / function calling** (optional; required only if the user said "agent" or "assistant that can X").
- **Image / file upload** (optional).
- **Voice in/out** (NOT in MVP; explicitly out).

### Recommended stack for 2026

| Layer | Pick | Version (verified) | Why |
|-------|------|---------------------|-----|
| Framework | Next.js 16 | 16.2.6 [S1] | App Router, RSC, server actions, streaming out of the box [S1] |
| AI library | Vercel AI SDK (`ai`) | 7.0.64 [S2] | Unified provider API, Node 22+ required, Apache-2.0, 17M weekly downloads [S2] |
| UI primitives | shadcn/ui | [UNVERIFIED — no chub doc] | Copy-paste components, owns the code, Tailwind-native |
| Database | Postgres (Neon or Supabase) + Drizzle | Drizzle 0.45.2 Apache-2.0 [S17] | Conversations are append-only rows; Drizzle's SQL-likeness wins for ad-hoc reads |
| Auth | Clerk | 7.4.2 [S5] | Free tier covers hobbyists; first-class Next.js bindings; `@clerk/nextjs` pinned to 7.4.2 [S5] |
| Deploy | Vercel | (per-region) | Native AI SDK streaming + edge runtime; auto-suspend for idle chats |
| Markdown | `react-markdown` + `remark-gfm` + `rehype-highlight` | [UNVERIFIED] | Standard stack |
| Icons | `lucide-react` | [UNVERIFIED] | Same as existing template |

### Realistic alternatives

- **Plain Vite + React + AI SDK `useChat` hook**: drop Next.js when SSR is not needed. Saves ~30% bundle. Use only if SEO/streaming-from-server does not matter.
- **Astro with React island**: pick when the chat is one tab in a content site, not the whole product.
- **SvelteKit + AI SDK**: AI SDK has Svelte bindings (`@ai-sdk/svelte`) [S2]. Smaller bundles; smaller hiring pool.
- **Self-hosted with Ollama + AI SDK's Ollama provider**: pick when the user wants zero per-token cost. Adds a 7B+ model download step. Latency on CPU is unusable past ~1B params.

### What to avoid

- **Handcrafted SSE.** AI SDK's `streamText` + `useChat` solves backpressure, cancellation, message-id correlation, and resumability [S2]. Re-implementing it is a 200-LOC rabbit hole.
- **LangChain for simple chat.** LangChain is justified when you need complex chains, agents, retrieval, or memory systems. For "user types prompt, model responds, store messages", the AI SDK is simpler and 10× smaller [S2].
- **WatermelonDB.** Browser-only, no server story, no auth model. Use Postgres + Drizzle.
- **Saving tokens to `localStorage`.** Works until you want auth, sync, or history beyond the current device.
- **Streaming JSON mode without `Output.object({ schema: z.object(...) })`.** AI SDK's `Output.object` is the right primitive [S2]; hand-rolling JSON parsing of partial streams breaks on the first nested object.

### The 3-5 decisions that actually matter

1. **Provider.** OpenAI (gpt-5.4, vision), Anthropic (claude-opus-4.6, long context), Google (gemini-3-flash, cheap), or multi. AI SDK abstracts this; pick the default and offer a switcher [S2].
2. **Persistence shape.** One table `messages (id, user_id, conversation_id, role, content, created_at)` is enough for 90% of chats. Don't over-model until you ship.
3. **Auth model.** Guest mode (no auth, in-memory only) for hobbyists; Clerk or Auth.js for real users [S5]. Decision flips the whole data shape.
4. **Tool use vs plain chat.** If the user said "agent" or "can do X in my app", you need `tools` in AI SDK [S2]. Otherwise skip.
5. **Streaming from edge vs serverless Node.** Vercel Edge + AI Gateway gives ~200ms TTFB on first token; Node functions are simpler. Edge is the right pick if you have multi-region users.

### Agent failure modes (LLM-built apps)

- **Streaming deadlock from misuse of `useChat`'s `append`.** Symptom: spinner forever, no tokens. Fix: ensure the server route returns a `StreamingResponse` and the client passes `messages` correctly [S2].
- **Context window blow-up because the agent re-sends the whole history every turn.** Symptom: 429 after 20 turns, bills climb. Fix: client-side trim to last N messages OR server-side summarization step.
- **Markdown XSS.** Rendering raw model output without sanitization. AI SDK's `streamText` does NOT sanitize; you must pipe through `react-markdown` (not `dangerouslySetInnerHTML`) [UNVERIFIED].
- **Hallucinated function calls.** Agent invents a tool name and the server crashes. Fix: gate every tool with a JSON schema and validate server-side.
- **Cost explosion from retries.** Agent retries on transient 5xx but doesn't dedupe. Fix: idempotency keys on tool calls; budget cap per conversation.

### Rough size

Minimal working version: 15-25 files, 1.5-3k LOC. Breakdown: 1 route (`app/api/chat/route.ts`), 1 client component (`Chat.tsx`), 1 messages table + migrations, 1 conversation list, auth wiring, ~5 shadcn primitives, 1 README. **Token budget for an agent to write this cold: ~15-25k output tokens. From a working skeleton: ~3-5k.**

### Tier assignment

**tier2-ai-chat**, not tier1. Justification: the value is not in the framework (Next.js works for any app) but in the AI-SDK wiring, the streaming route, the conversation schema, and the markdown pipeline. None of those carry over to non-chat kinds, so tier1 does not save anything by absorbing them.

---

## Deep dive: Mobile app

### Minimum viable feature set

- **Auth** (mandatory for any non-trivial mobile app; Apple/Google sign-in plus email).
- **Deep linking** (mandatory for sharing, push, and any "open this page in app" UX).
- **Offline cache of last-fetched data** (mandatory; users notice when an app fails offline).
- **App icon + splash + bundle ID + store metadata** (mandatory before any "ship" moment).
- **Push notifications** (optional but expected).
- **App Store + Play Store builds via EAS** (mandatory for production).
- **OTA updates** (`expo-updates`) (optional; cheap to add).

### Recommended stack for 2026

| Layer | Pick | Version (verified) | Why |
|-------|------|---------------------|-----|
| Framework | Expo SDK | 57.0.0 [S10] | Latest as of 2026-08-13; depends on React Native 0.86 + React 19.2.3 [S10] |
| Routing | Expo Router | (bundled with SDK 57) | File-based, deep-link native, typed routes [S10] |
| Native builds | EAS Build + EAS Submit | (cloud) | Replaces Mac-only Xcode + Android Studio dance |
| Auth | Clerk Expo | `@clerk/expo` (per [S5]) | Same auth across web + mobile; OAuth providers pre-wired |
| Data | Supabase JS | 2.106.2 [S13] | Postgres + auth + storage + realtime in one SDK [S13]; or Drizzle against a hosted Postgres |
| Local storage | `@react-native-async-storage/async-storage` | (bundled [S10]) | Standard for small key/value |
| Icons | `@expo/vector-icons` or `lucide-react-native` | (bundled [S10]) | |
| Deploy | EAS + App Store / Play Store | (cloud) | |

### Realistic alternatives

- **Native Swift + Kotlin**: pick when performance or platform integration is the core feature (camera, AR, BLE). 5-10× code cost.
- **React Native bare (without Expo)**: pick when you need a native module Expo does not have. Setup cost ~1 day vs Expo's ~10 min.
- **Capacitor 8 [S11]**: pick when you already have a web app and want to ship it as mobile. Smaller perf ceiling than React Native but faster path.
- **Flutter**: pick when the team is Dart-fluent and perf is critical. Not in the 2026 JS agent's comfort zone.

### What to avoid

- **Bare React Native from `npx @react-native-community/cli init`.** You will spend a day fixing Android SDK paths, JDK versions, and Gradle issues that Expo's managed workflow handles for you [S10].
- **WatermelonDB.** Was the right pick in 2021; in 2026, Drizzle+Postgres+Sync engine covers the same ground with a real server-side story [S17].
- **Capacitor for new mobile-first apps.** Capacitor is a "wrap my web app" tool, not a mobile framework. Use it when you have a web app to ship; pick Expo when you have a mobile idea [S11].
- **Building your own auth.** Clerk Expo exists, is free for hobbyists, and handles Apple/Google sign-in, magic links, and MFA without code [S5].
- **Skipping EAS Build.** Local Xcode/Android builds are fine for dev; for App Store submission, EAS handles certificates, provisioning profiles, and TestFlight automatically.

### The 3-5 decisions that actually matter

1. **Expo (managed) vs RN bare.** Managed wins 95% of the time in 2026 [S10]. Pick bare only for native modules.
2. **Auth vendor.** Clerk is the lowest-friction; Supabase Auth is the lowest-cost at scale; Auth.js is the self-host choice.
3. **Data layer.** Supabase (BaaS), Drizzle+Neon (Postgres-as-a-service, you write the SQL), or Firebase (Google-only, real-time). Pick Supabase unless you have a strong reason otherwise [S13].
4. **Push.** Expo Push (single API, free, routes to APNs/FCM) vs raw FCM + APNs. Pick Expo Push unless you have specific latency or compliance needs.
5. **OTA updates.** Expo Updates handles this for JS-only updates; native changes still need a store resubmission.

### Agent failure modes

- **Forgetting to set `bundleIdentifier` / `package` / `applicationId`.** Symptom: EAS build fails on first run. Fix: scaffold with `npx create-expo-app` and never rename by hand.
- **iOS-only or Android-only deep-link schema.** Symptom: links from emails open in browser, not app. Fix: declare `scheme` and `associatedDomains` in `app.json`.
- **AsyncStorage for large data.** Symptom: OOM on phones with 4GB RAM. Fix: use SQLite via `expo-sqlite` for anything >1MB [S10].
- **Push token not refreshed after login.** Symptom: anonymous user gets push, logged-in user doesn't. Fix: re-subscribe on auth state change.
- **Forgetting `app.json` privacy manifests.** Apple now rejects apps without `NSPrivacyAccessedAPITypes` declarations [S10].

### Rough size

30-50 files, 3-5k LOC. Breakdown: `app/_layout.tsx`, 3-5 routes, 1 auth wiring, 1 data client, 5-10 components, EAS config, native config files. **Token budget cold: 30-50k. From skeleton: 8-12k.**

### Tier assignment

**tier2-mobile**. Justification: Expo SDK is a distinct runtime with its own CLI, its own build pipeline (EAS), and its own conventions. A "tier1 + mobile layer" would still have to install Expo + EAS config + native files — that's most of the template, so a tier2 pays for itself. Alternative considered: tier1-mobile-layer; rejected because the agent will burn tokens figuring out Expo's app.json every time.

---

## Deep dive: SaaS with auth and billing

### Minimum viable feature set

- **Signup + login** (email + at least one OAuth provider — Google is the default).
- **Password reset / magic link** (one of the two; magic link is lower-friction).
- **Email verification** (for password auth).
- **RBAC** (at minimum `user` vs `admin`; for B2B, plan-based roles).
- **Pricing page** with 2-3 tiers.
- **Stripe Billing checkout** (subscriptions, not one-time, unless the user said one-time).
- **Webhook handler** for `customer.subscription.*` and `invoice.payment_*` (this is where SaaS companies leak MRR).
- **Customer billing portal** (Stripe's hosted portal — link out, don't build).
- **Transactional email** (Resend or Postmark; SES if self-hosting).
- **Audit log** (optional but standard for B2B).

### Recommended stack for 2026

| Layer | Pick | Version (verified) | Why |
|-------|------|---------------------|-----|
| Framework | Next.js 16 | 16.2.6 [S1] | App Router, server actions for checkout, RSC for dashboards |
| Auth | Clerk | 7.4.2 [S5] | Free to 10k MAU; pre-built UI components; first-class Next.js [S5] |
| Database | Postgres + Drizzle | Drizzle 0.45.2 [S17] | Type-safe, SQL-like, 0 dependencies [S17] |
| Billing | Stripe Billing (server) | Stripe SDK 22.2.0 [S4] | Hosted checkout + customer portal + tax + dunning |
| Email | Resend | [UNVERIFIED — recommend user verify] | React Email templates, modern API |
| UI primitives | shadcn/ui | [UNVERIFIED] | Tailwind-native, copy-paste |
| Styling | Tailwind v4 | 4.3.0 [S3] | CSS-first config, Vite plugin [S3] |
| Deploy | Vercel | (cloud) | Native Next.js + Stripe webhook support |

### Realistic alternatives

- **Auth.js (NextAuth) v5** instead of Clerk: pick when the user wants zero per-user cost or full data ownership. More code; less magic.
- **Prisma 8.0.14 [S6]** instead of Drizzle: pick when the team already knows Prisma or wants its Studio tool. Drizzle wins on bundle size and SQL-likeness [S17].
- **Paddle or Lemon Squeezy** instead of Stripe Billing: pick when selling to merchants who hate Stripe's verification or want Paddle to handle VAT. Lower control over checkout UX.
- **Supabase JS [S13] + RLS** instead of Drizzle: pick when the team wants auth + DB + storage in one vendor.
- **Postmark** instead of Resend: pick when deliverability is the only metric that matters.

### What to avoid

- **Building auth yourself.** Even with Auth.js, you are still on the hook for password hashing, session rotation, OAuth state, CSRF, and account-takeover flows. Clerk does all of it [S5].
- **Using Stripe Checkout for the entire flow.** Use Stripe's hosted checkout + customer portal; do not build a custom card form (PCI scope).
- **Trusting the client to tell you the subscription tier.** Server reads `subscriptions` table, which is updated by the webhook handler. Never read from a cookie or query param.
- **Skipping webhook signature verification.** `stripe.webhooks.constructEvent(rawBody, sig, secret)` [S4]. Without it, anyone can fake a "payment succeeded" event.
- **WatermelonDB.** No server-side story, no RLS, no role concept. Use Postgres.
- **`localStorage` for auth tokens.** XSS-stealable. Use HTTP-only cookies (Clerk/Auth.js handle this).

### The 3-5 decisions that actually matter

1. **Auth vendor.** Clerk (managed, $$) vs Auth.js (self-hosted, free) vs Supabase Auth (managed, $). Pick Clerk for speed; pick Auth.js for control.
2. **Billing provider.** Stripe (global default) vs Paddle (MoR for EU/UK) vs Lemon Squeezy (indie-friendly). Pick Stripe unless there's a tax/VAT reason.
3. **DB layer.** Drizzle [S17] vs Prisma [S6] vs Supabase + RLS [S13]. Drizzle wins on bundle + SQL; Prisma wins on tooling; Supabase wins on time-to-realtime.
4. **Pricing model.** Flat tiers vs usage-based vs seats. Affects DB schema (`subscriptions.plan_id` vs `usage_records`). Decide before migrations.
5. **Email vendor.** Resend (modern, React Email) vs Postmark (deliverability) vs SES (cost). Pick Resend unless deliverability is the bottleneck.

### Agent failure modes

- **Webhook handler races.** Two `invoice.payment_succeeded` events arrive, double-credit the user. Fix: idempotency key on the Stripe event ID.
- **Subscription state in the DB diverges from Stripe.** Symptom: user paid, app says "trial". Fix: webhook is the only writer to `subscriptions.status`; never trust the redirect callback.
- **OAuth callback URL drift.** Symptom: works on `localhost:3000`, breaks on `https://app.example.com`. Fix: Clerk/Auth.js handle this; the agent must not hard-code `localhost`.
- **RBAC checks in the UI but not in the API.** Symptom: hidden admin button removed, but `/api/admin/users` still works. Fix: enforce role in every server action and route handler.
- **"Free trial" with no card collection.** Symptom: 1000 trial signups, 2 conversions. Fix: require card up front for SaaS; offer a no-card trial only for B2C.

### Rough size

40-60 files, 4-8k LOC. Breakdown: auth wiring, ~5 user-facing routes (sign-in, sign-up, dashboard, settings, billing), ~5 admin/API routes, Stripe webhook handler, ~10 shadcn components, DB schema, migrations. **Token budget cold: 40-60k. From skeleton: 10-15k.**

### Tier assignment

**tier1 + auth + billing layers**, not tier2. Justification: the SaaS skeleton is 80% identical to a CRUD dashboard or a content site; the only SaaS-specific bits are the auth wiring and the Stripe webhook handler. Those two pieces are <10 files and <1k LOC. A full tier2 would duplicate Next.js, Tailwind, layout, etc. Two layers (`tier1-saas-auth`, `tier1-saas-billing`) cost ~12 files each and compose with CRUD/content/marketing layers.

---

## Deep dive: Storefront / e-commerce

### Minimum viable feature set

- **Product list** with images, price, variants.
- **Product detail page (PDP)** with image gallery, variant picker, add-to-cart.
- **Cart** (persisted across sessions).
- **Checkout** (PCI-compliant — use Stripe Checkout or Shopify Checkout).
- **Order confirmation** + email.
- **Basic admin**: product CRUD, order list, order status update.
- **Inventory tracking** (optional but expected for physical goods).
- **Tax** (Stripe Tax or Shopify's built-in).
- **Search** (basic; Algolia/Meili only when SKU count >1k).

### Recommended stack for 2026

**Path A — small store, ≤100 products, no custom fulfillment**:
| Layer | Pick | Version | Why |
|-------|------|---------|-----|
| Storefront | Next.js 16 [S1] + Shopify Storefront API | Shopify Storefront JS 12.1.0 [S21] | Hosted catalog, hosted checkout, hosted tax, hosted inventory. Zero backend code. |
| Cart | Local state + Shopify cart API | (per [S21]) | |
| Payments | Shopify's checkout | (Shopify-managed) | PCI scope: Shopify's |
| Deploy | Vercel | (cloud) | |

**Path B — custom fulfillment, multi-vendor, complex pricing**:
| Layer | Pick | Version | Why |
|-------|------|---------|-----|
| Backend | Medusa | `@medusajs/medusa` 2.18.0 [S18] | Open-source commerce platform, MIT, 156k weekly downloads, 1.13k versions = active [S18] |
| Storefront | Next.js 16 [S1] + Medusa Storefront Starter | (per Medusa docs [S18]) | |
| Payments | Stripe | 22.2.0 [S4] | |
| Deploy | Medusa Cloud or your own Node | (per [S18]) | |

### Realistic alternatives

- **Stripe-only (no commerce platform)**: pick when selling ≤20 SKUs with no inventory. Cart + checkout are 5 files.
- **WooCommerce headless**: pick when the user is migrating an existing WordPress store. Not recommended for greenfield.
- **Saleor**: pick when the team is Python-first. Same shape as Medusa but GraphQL-first.
- **Custom Postgres + Stripe Checkout**: pick when the agent must avoid any commerce platform dependency. ~3× the code of Path A.

### What to avoid

- **Building checkout yourself.** Stripe Checkout or Shopify Checkout handle PCI scope, 3DS, Apple Pay, Google Pay, and dispute evidence [S4][S21]. Hand-rolling means you become a payment processor.
- **Storing card numbers.** Even briefly. Even for "guest checkout". Stripe Elements gives you a token; never see a PAN.
- **Multi-currency without thinking about settlement.** Stripe handles conversion; Shopify handles per-region pricing. Don't roll your own.
- **Sync inventory in real-time via webhooks you didn't sign.** Sign and verify every webhook.
- **WatermelonDB for a storefront.** Cart state belongs on the server (Shopify cart or your DB), not the device.

### The 3-5 decisions that actually matter

1. **Shopify vs Medusa vs Stripe-only.** Shopify = zero backend; Medusa = full custom; Stripe-only = tiny catalogs. This is the single biggest fork.
2. **Tax.** Stripe Tax [S4] for SaaS-shaped stores; Shopify Tax for Shopify-hosted; Avalara for enterprise.
3. **Search.** Pagefind / client-side for <1k SKUs; Algolia / Meilisearch for >1k.
4. **Email.** Order confirmation + shipping notification. Klaviyo for marketing automation, Resend for transactional.
5. **Shipping.** ShipStation API, EasyPost, or Shopify Shipping. Pick one before coding the cart.

### Agent failure modes

- **Cart desync.** User adds item on phone, opens laptop, sees empty cart. Fix: server-side cart keyed by anonymous ID; never trust localStorage.
- **Stock oversells.** Two users click "buy" on the last unit, both succeed. Fix: atomic inventory decrement at checkout (Shopify/Medusa do this; Stripe-only requires you to).
- **Tax not calculated.** Storefront in EUR, customer in California, no tax collected. Fix: Stripe Tax or Shopify Tax turned on BEFORE first sale.
- **Checkout abandonment from missing payment methods.** Symptom: 70% drop-off. Fix: enable Apple Pay / Google Pay / Link.
- **Stripe webhook secret committed to git.** Symptom: chargebacks faked. Fix: env var; never commit.

### Rough size

25-40 files, 3-6k LOC for Path A. 60-100 files, 8-15k LOC for Path B. **Token budget cold Path A: 25-40k. From skeleton: 6-10k. Path B cold: 60-100k. From skeleton: 20-30k.**

### Tier assignment

**tier2-storefront**. Justification: the Shopify vs Medusa vs Stripe-only fork happens at template-scaffold time, not as a layer. A "tier1 + commerce layer" would have to detect the user's intent and scaffold two different backends — that's a tier2-shaped decision masquerading as a layer.

---

## Deep dive: Content / docs site

### Minimum viable feature set

- **Content collections** (typed in Astro 6 [S7]: blog, docs, changelog).
- **MDX support** for interactive components inside markdown.
- **Search** (Pagefind is the default for Astro; client-side, no server needed).
- **Dark mode** (Astro has `data-theme` patterns in the docs [S7]).
- **RTL support** if the user is in an Arabic-first market (existing template's Arabic default is a real edge here).
- **Sitemap + RSS** (Astro integrations, ~2 lines each).
- **OG image generation** (`@vercel/og` or Astro's built-in).
- **Analytics** (Plausible or Umami if privacy matters; GA4 if it doesn't).
- **Comments** (Giscus for GitHub-backed; optional).

### Recommended stack for 2026

| Layer | Pick | Version (verified) | Why |
|-------|------|---------------------|-----|
| Framework | Astro | 6.4.2 [S7] | Zero-JS by default, content collections, islands, MDX-native [S7] |
| Content | MDX (`.mdx` files in `src/content/`) | (per [S7]) | Type-safe frontmatter via Zod schemas [S7] |
| Styling | Tailwind v4 | 4.3.0 [S3] | CSS-first, Vite plugin [S3] |
| Search | Pagefind | [UNVERIFIED — recommend user verify] | Static, builds at `astro build` time, no server |
| Hosting | Vercel / Netlify / Cloudflare Pages | (any static host) | Astro builds to static HTML |
| Markdown editor (CMS) | Decap CMS (formerly Netlify CMS) or Sanity | [UNVERIFIED] | Pick Decap for git-backed, free; Sanity for real-time collaboration |

### Realistic alternatives

- **Next.js 16 with App Router + Contentlayer**: pick if you need React components throughout and have SEO pressure for ISR. Heavier than Astro.
- **Hugo / Eleventy**: pick if you have zero JS tolerance and don't need MDX components. Hugo is Go; Eleventy is JS but minimal.
- **Docusaurus**: pick if the user said "open-source project documentation". Docusaurus is React-based and has its own i18n.
- **Notion as a CMS + Astro**: pick if the user wants no markdown files. Tradeoff: Notion is the source of truth, you lose git history.

### What to avoid

- **Next.js for a pure content site.** Adds 200KB+ of JS to render text. Astro ships 0KB by default [S7].
- **Gatsby.** Was the default in 2020; in 2026, Astro is faster, simpler, and ships less JS.
- **A client-side CMS (Sanity, Contentful) for a hobby blog.** The author is the only editor; markdown files in git are the right answer.
- **WordPress.** Adds PHP, MySQL, and a constant update treadmill. Pick this only for non-technical authors.
- **i18n plugins that ship runtime.** Astro's i18n routing is build-time; runtime i18n libraries double the JS bundle.

### The 3-5 decisions that actually matter

1. **SSG vs SSR.** Content sites default to SSG. SSR only for authenticated/personalized content. Pick SSG first; add SSR for the 1-2 routes that need it.
2. **CMS.** Git + markdown (default), Decap (git + visual), or hosted (Sanity/Contentful). Pick git unless non-technical authors exist.
3. **Search.** Pagefind (default) vs Algolia DocSearch (OSS-host-friendly). Pick Pagefind for self-hosted; DocSearch for public docs at scale.
4. **RTL.** If the user is Arabic-first, Astro's `dir` attribute + a CSS logical-property theme is enough; no extra library needed.
5. **Deploy target.** Cloudflare Pages for global edge; Netlify for form handling; Vercel for the Next.js-shaped Astro build.

### Agent failure modes

- **Hydrating the whole page for an interactive island.** Symptom: 500KB JS for a docs site. Fix: `client:visible` (load when scrolled into view) [S7].
- **Content collections without Zod schemas.** Symptom: frontmatter typos silently fail. Fix: define `schema: z.object({...})` per collection [S7].
- **Search index bloating because Pagefind is run on the dev server.** Fix: only run Pagefind at build (`astro build`) [S7].
- **OG images generated on every request.** Symptom: cold-start latency. Fix: pre-generate at build with `@vercel/og` or `astro:assets`.
- **RTL mixed with LTR code blocks.** Symptom: code flows the wrong way. Fix: `dir="ltr"` on `<pre>` and `<code>` blocks.

### Rough size

10-20 files, 1-2k LOC. Breakdown: `astro.config.mjs`, 1-3 layouts, 5-10 content files (Markdown), 1 search integration, 1 theme, OG image component, RSS/sitemap integrations. **Token budget cold: 10-20k. From skeleton: 2-4k.** This is the smallest tier2 for a reason.

### Tier assignment

**tier1 + content layer**, not tier2. Justification: Astro's content-collections + MDX + Tailwind setup is ~5 files and ~200 LOC. A tier2 would duplicate layout, theming, and routing that already exist in tier1-standard. The "content layer" is a handful of `astro.config.mjs` integrations + a `src/content/config.ts` schema.

---

## Deep dive: Bot / extension / CLI

This kind is split. See "Resolving the bot/CLI vs UI-only tension" below for the recommendation; here is the per-shim detail assuming Option C (shared `tier2-tooling/_spine/` + 3 shims).

### 6a: Browser extension (WXT shim)

**Minimum viable feature set:**
- **Manifest V3** `manifest.json` with `action`, `permissions`, `host_permissions` [S16].
- **Popup** UI (small, ~5 components).
- **Content script** that runs on the target site.
- **Background service worker** (MV3: event-driven, not persistent).
- **`chrome.storage.local`** for state.
- **Options page** (settings UI).

**Stack:**
- WXT 0.21.4 [S16] (MIT, 359k weekly downloads, last publish 2 days ago — very active).
- React 19 [S15] for popup/options UI.
- Tailwind v4 [S3] for the UI.
- Vite 7.8.0 [S14] (WXT uses Vite under the hood [S16]).

**Alternatives:**
- **Plasmo**: pick if you need MV2 + MV3 cross-browser, or want a managed dev experience with `Itero TestBed`. Heavier dependency.
- **CRXJS Vite plugin**: pick if you want zero framework lock-in. More boilerplate than WXT.

**Avoid:**
- Manifest V2 — Chrome Web Store no longer accepts new MV2 extensions.
- Long-lived background pages — MV3 forbids them.
- `eval()` / `new Function()` in content scripts — fails Chrome Web Store review.
- Inline scripts in the popup — CSP forbids them.

**Decisions that matter:**
1. **WXT vs Plasmo.** WXT for lean, file-based MV3-only; Plasmo for cross-browser + MV2 compat.
2. **Manifest version.** MV3 only (new work); MV2 only for legacy ports.
3. **Storage.** `chrome.storage.local` for small state; `chrome.storage.sync` for cross-device; IndexedDB for large blobs.
4. **Auth.** Use `chrome.identity` for OAuth in extensions.

**Agent failure modes:**
- **Content script CSP violation** — symptom: console errors, silent failure. Fix: no inline scripts, no remote code.
- **Service worker suspends mid-task** — symptom: state lost. Fix: persist immediately, never assume long-lived.
- **`host_permissions` too broad** — symptom: Chrome Web Store review rejection. Fix: scope to the exact host the user mentioned.

**Size:** 8-12 files, 0.8-1.5k LOC. **Token budget cold: 8-12k. From skeleton: 2-3k.**

**Tier:** `tier2-tooling/extension` shim (in UI family; minimal popup counts).

### 6b: Bot (Discord/Telegram/Slack shim)

**Minimum viable feature set:**
- **Slash commands** (the modern way; legacy `!command` is deprecated on Discord [S9]).
- **Persistence** (SQLite via `better-sqlite3` or lowdb for JSON).
- **Logging channel** for errors.
- **Environment-driven config** (token, guild ID, admin role).
- **Health endpoint** if the bot runs as a long-lived process.

**Stack (Discord example):**
- Node 22 LTS.
- `discord.js` 14.26.4 [S9] (the only maintained Discord SDK; v12/v13 are deprecated [S9]).
- Commander 14.0.3 [S8] for an admin CLI sub-tool.
- `better-sqlite3` or `lowdb` for state.
- `pino` for structured logs.

**Slack/Telegram alternatives:**
- **Slack:** `@slack/bolt` (official). Different event model (Events API + Socket Mode).
- **Telegram:** `grammY` or `node-telegram-bot-api`. **Telegram Bot API has frequent breaking changes and a poor developer ergonomics reputation [S22]; avoid unless user insists.**

**Avoid:**
- **Long-polling in 2026.** All major platforms support webhooks or gateway connections.
- **Hard-coded tokens.** Env var only.
- **Telegram-only deployments.** If the user said "bot", pick Discord or Slack first.

**Decisions that matter:**
1. **Platform.** Discord (largest hobbyist community), Slack (B2B), Telegram (regional — popular in MENA [S22]).
2. **Gateway intents.** Discord requires explicit `GatewayIntentBits` (no more "all intents" [S9]).
3. **Persistence.** SQLite for bots with >1000 users; JSON for tiny bots.

**Agent failure modes:**
- **Missing `GatewayIntentBits.MessageContent`.** Symptom: bot connects but can't read messages. Fix: declare intents [S9].
- **Rate limit violation.** Symptom: 429 storm. Fix: respect `X-RateLimit-Remaining` headers; back off.
- **Token leaked via git.** Symptom: account takeover. Fix: `.env` + `.gitignore`.

**Size:** 6-10 files, 0.5-1k LOC. **Token budget cold: 6-10k. From skeleton: 1-2k.**

**Tier:** `tier2-tooling/bot` shim (non-UI).

### 6c: CLI (Commander shim)

**Minimum viable feature set:**
- **Subcommands** (not just flags).
- **`--help`** and **`--version`** (Commander gives these for free [S8]).
- **Exit codes** (0 = success, 1 = error, 2 = usage error).
- **Config file** (read from `./.<name>.json` or `~/.config/<name>/config.json`).
- **`package.json` `bin` field** for `npx` installability.
- **Shebang line** `#!/usr/bin/env node` [S8].

**Stack:**
- Node 22 LTS.
- `commander` 14.0.3 [S8] (requires Node 20+).
- `chalk` for colors.
- `tsup` or `unbuild` for one-binary bundling.
- Optional: `inquirer` or `prompts` for interactive prompts.

**Avoid:**
- **yargs.** Larger, more dependencies; Commander covers 80% of needs [S8].
- **oclif** for tiny CLIs. Heavy framework; pick when you need plugin systems.
- **Hard-coded paths.** Use `os.homedir()` for user config.

**Decisions that matter:**
1. **Single binary vs monorepo.** Single binary for one tool; monorepo for a CLI + companion server.
2. **ESM-only vs dual.** ESM-only is the 2026 default; dual if you must support old Node.
3. **Interactive prompts.** `inquirer` (mature) vs `prompts` (smaller) vs raw `readline`.

**Agent failure modes:**
- **No shebang.** Symptom: `node ./bin/foo.js` works, `./bin/foo.js` doesn't. Fix: `#!/usr/bin/env node` [S8].
- **No `bin` field.** Symptom: `npm install -g foo` doesn't add `foo` to PATH. Fix: add `"bin": { "foo": "./bin/foo.js" }` [S8].
- **Exit code 0 on error.** Symptom: CI scripts think the tool succeeded. Fix: `process.exit(1)` on caught errors.

**Size:** 4-8 files, 0.3-0.7k LOC. **Token budget cold: 4-8k. From skeleton: 0.5-1k.**

**Tier:** `tier2-tooling/cli` shim (non-UI).

---

## The two one-liners (landing page, CRUD dashboard)

### Landing / marketing page

**Covered by `agents_manager/templates/cinematic-landing/`.** One line: a shipped landing template that already handles hero, social proof, FAQ, and CTA sections with motion. No new work needed. When the user says "make me a landing page", the router sends them here.

### CRUD dashboard / admin

**Effectively covered by `resources/general-app-template`** plus an admin layer. The existing template's 8-phase build workflow already produces a list/create/edit/delete shape [S24]. Adding `tier1-admin-layer` (TanStack Table + shadcn/ui data tables + RBAC + audit log) gives a full CRUD dashboard. No new tier2.

---

## Resolving the bot/CLI vs UI-only tension

**The tension:** Q6 deep-dives "bot / extension / CLI". Q7 restricts the family to UI apps. An extension has UI (popup, options page). A bot and a CLI do not.

**Recommendation: Option C — one shared `tier2-tooling/_spine/` + 3 per-shim overlays** (extension / bot / CLI).

### Why not Option A (merge all under UI spine)

A single template that handles extension + bot + CLI under a React/Vite/Next.js UI spine forces the bot and CLI shims to ship a web UI they don't need. Worse, the runtime is fundamentally different:
- **Extension** runs in a Chromium sandbox (Manifest V3 service worker, content scripts, `chrome.*` APIs) [S16].
- **Bot** runs as a Node process connected to a gateway (Discord gateway, Slack Events API) [S9].
- **CLI** runs in a shell (`#!/usr/bin/env node`, `process.stdout.write`, ANSI escapes) [S8].

Forcing them under one UI spine means the agent spends tokens reading UI primitives it will never use, and the deploy target (`npx ext build` vs `npm run bot` vs `npm link`) diverges by 100%.

**Cost of Option A:** ~30+ extra files of UI waste per bot/CLI app. Per-app waste: ~500 LOC that get `.gitignore`d in practice. **Verdict: rejected.**

### Why not Option B (3 fully independent templates)

Three completely independent templates maximize per-kind optimization but explode maintenance. Each framework version bump (Node 22, TypeScript 5.x, ESLint 9) has to be applied in three places. CI matrix triples. Documentation triples.

**Cost of Option B:** 3 templates × ~10 files × ~40 LOC = ~1.2k LOC of duplicated config/docs/CI. Plus 3 × N hours per framework version bump. **Verdict: rejected.**

### Why Option C wins

A **shared `tier2-tooling/_spine/`** (~5 files: `package.json`, `tsconfig.json`, `README.md`, `.gitignore`, `LICENSE`) holds the cross-cutting concerns: Node version pin, TypeScript config, formatting, lint, license. Each shim is a thin overlay (~3-5 files) that adds the runtime-specific bits:

```
tier2-tooling/
├── _spine/                # shared
│   ├── package.json       # workspace root, Node 22 pin
│   ├── tsconfig.base.json # strict TS, ESM, Node 22 lib
│   ├── README.md          # what is this family
│   └── .gitignore
├── extension/             # UI shim
│   ├── wxt.config.ts
│   ├── entrypoints/popup.html
│   ├── entrypoints/options.html
│   └── ...
├── bot/                   # non-UI shim
│   ├── src/index.ts
│   ├── src/commands/
│   └── ...
└── cli/                   # non-UI shim
    ├── src/index.ts
    ├── src/commands/
    └── ...
```

**Cost of Option C:** 5 (spine) + 3 × 5 (shims) ≈ 20 files, of which ~5 are docs/config. When Node bumps to 24, the change is in one file in `_spine/`.

**Per-shim token budget from skeleton:** extension ~2-3k, bot ~1-2k, CLI ~0.5-1k. **Verdict: recommended.**

### Explicit decision for the user

> **The user must confirm Option C before planning.** If Option C is approved, the bot and CLI shims are explicitly out of the UI family; they live under a separate `tier2-tooling/` branch but in the same monorepo as the UI templates. If the user prefers Option B (3 fully independent), the bot/CLI templates move out of `tier2-*` entirely. If Option A is preferred (single UI spine), the bot and CLI shims become thin React apps with no actual React — anti-pattern, do not pick this.

---

## Selection rule (decision tree)

The agent runs this in order. First match wins. Fallback is `tier0-minimal`.

```
1. Does the idea name a single page (landing, marketing, "about me", "product page")?
   YES -> cinematic-landing (existing)
   NO  -> step 2

2. Does the idea mention "chat", "assistant", "GPT", "Claude", "LLM", "AI", "copilot", "agent"?
   YES -> tier2-ai-chat
   NO  -> step 3

3. Does the idea mention "mobile", "iOS", "Android", "app store", "play store", "react native", "expo"?
   YES -> tier2-mobile
   NO  -> step 4

4. Does the idea mention "store", "shop", "checkout", "cart", "product", "inventory", "order", "e-commerce", "sell"?
   YES -> tier2-storefront
   NO  -> step 5

5. Does the idea mention "extension", "chrome extension", "firefox extension", "browser plugin"?
   YES -> tier2-tooling/extension
   NO  -> step 6

6. Does the idea mention "bot", "discord bot", "slack bot", "chatbot" (not LLM)?
   YES -> tier2-tooling/bot
   NO  -> step 7

7. Does the idea mention "CLI", "command-line", "terminal tool", "npm package (binary)".
   YES -> tier2-tooling/cli
   NO  -> step 8

8. Does the idea mention "docs", "documentation", "blog", "changelog", "marketing site", "content"?
   YES -> tier1-standard + content layer (Astro)
   NO  -> step 9

9. Does the idea mention "dashboard", "admin", "CRUD", "back-office", "internal tool", "manage X"?
   YES -> tier1-standard + admin layer
   NO  -> step 10

10. Does the idea mention "auth", "sign in", "user accounts", "subscription", "billing", "SaaS"?
    YES -> tier1-standard + auth layer + billing layer
    NO  -> step 11

11. Is the idea a real-time / multiplayer app (chat, collab, multiplayer)?
    YES -> tier1-standard + realtime layer (Yjs/Liveblocks/Socket.io)
    NO  -> step 12

12. Is the idea an API-first / developer tool?
    YES -> tier1-standard + API layer (OpenAPI, Scalar)
    NO  -> step 13

13. Is the idea an AI agent (autonomous, tool-using, multi-step)?
    YES -> tier1-standard + tier2-ai-chat (the agent layer IS the chat layer + tools)
    NO  -> FALLBACK tier0-minimal
```

**Cost to evaluate:** ~13 string contains, no LLM call. <1ms. The agent must NOT "vibe" a tier by guessing — it MUST run this tree and cite the matching step in its summary.

**Fallback behavior:** if the idea matches no step (e.g., "build me a thing"), pick tier0-minimal and flag `NEEDS_USER_INPUT: what-kind-of-app` so the clarification loop kicks back in.

---

## Overlap analysis: the smallest N templates that covers the space

N = **5 tier2 templates** (ai-chat, mobile, saas-bundle (= tier1 + 2 layers), storefront, tooling) + the existing cinematic-landing + tier0-minimal + tier1-standard = **8 total entries in the family**. Naive "1 template per kind" = 12-15. Naive "1 template for everything" = 1.

### Consolidation logic

1. **SaaS + CRUD + content + marketing are all `tier1-standard + N layers`.** The base (Next.js + Tailwind + auth wiring + DB + layout) is identical across all 4. Layers: `auth` (~10 files), `billing` (~10 files), `admin` (~15 files), `content` (~8 files), `realtime` (~10 files), `api` (~8 files), `i18n` (~5 files). Adding a layer to tier1-standard is cheap; making tier1-standard itself 4 templates is not.

2. **Mobile + SaaS overlap (auth, billing).** Both need user accounts and subscriptions. Solve with shared Clerk/Stripe wiring (not a "mobile-SaaS" template). The mobile shim ships `@clerk/expo` [S5] + `@stripe/stripe-react-native`; the web shim ships `@clerk/nextjs` + `stripe`. Same vendor, different SDK.

3. **AI chat + SaaS overlap (auth).** Chats need users. Solve with the same `auth` layer used by SaaS. The AI chat shim is the chat route + schema + AI SDK wiring on top of the auth layer.

4. **Tooling (extension + bot + CLI) shares a spine.** See the bot/CLI tension section. One `_spine/` + 3 shims.

5. **Storefront does NOT overlap with SaaS meaningfully.** A SaaS storefront is just a storefront template with billing attached. No new tier.

### Maintenance cost analysis

| Approach | Templates | Files | Per-bump cost | Verdict |
|----------|-----------|-------|---------------|---------|
| 1 template per kind (12 kinds) | 12 | ~600 | 12 × 30min = 6h/bum | rejected |
| 5 tier2 + 1 tier1 + 2 base | 8 | ~350 | 8 × 30min = 4h/bum | recommended |
| 1 monolithic | 1 | ~200 | 1 × 30min = 30min/bum | rejected (can't specialize) |

---

## Kinds the user did NOT list but should consider

The user picked 6 deep-dive kinds. Three more deserve at least a tier1 + layer treatment in 2026. None deserve their own tier2 template.

1. **Real-time / collaborative app** (chat rooms, multiplayer editors, multiplayer games, live dashboards). Common kind; gap = tier1 + realtime layer (Yjs for CRDT collab, Liveblocks for hosted presence, Socket.io for custom). Skip if the user did not mention "live", "real-time", "multiplayer", "collaborative", "co-edit".

2. **API-first / developer tool** (REST API with docs, GraphQL gateway, SDK generator). Common in 2026; gap = tier1 + api layer (`hono` for the runtime [UNVERIFIED], `@scalar/openapi-typescript` for docs, OpenAPI codegen). Skip if the user did not mention "API", "endpoint", "SDK", "developer tool".

3. **AI agent** (autonomous, multi-step, tool-using — distinct from "AI chat"). New kind in 2026; gap = tier1 + tier2-ai-chat with the `ToolLoopAgent` primitive from AI SDK 7 [S2]. Skip if the user did not say "agent", "autonomous", "do X for me", or name specific tools.

**Not picked but considered:** IoT / embedded (out of scope — hardware), PWA / offline-first (covered by tier1 + service-worker layer, doesn't need a slot), game (covered by tier1 + canvas/three.js layer, doesn't need a slot).

---

## What this changes about our template design

Concrete, mandatory, in priority order. Each bullet maps to a section above and is what the planner must act on.

1. **WatermelonDB is removed.** No tier2 uses it. Drizzle (server) and AsyncStorage/SQLite (mobile) replace it. The `resources/general-app-template` recommendation of WatermelonDB + LokiJS adapter is the wrong default for any kind except offline-first mobile, which is itself tier1 + layer [S17].
2. **`better-sqlite3 + Express` server is removed.** No tier2 uses Express + better-sqlite3 directly. The SaaS bundle uses Postgres (Drizzle or Prisma) over a serverless ORM [S17][S6]. Express is replaced by Next.js server actions, Hono (for AI/API kinds), or the runtime's native handler (Medusa [S18], Shopify [S21]).
3. **Capacitor is removed as a default mobile target.** Expo SDK 57 is the 2026 default for mobile [S10]. Capacitor 8 stays as an escape hatch for "wrap my existing web app" [S11], but it is a tier1 + layer, not the default.
4. **Arabic/RTL default is preserved but loosened.** RTL is a tier1 + i18n layer (Astro 6 has native i18n routing [S7]; Next.js has `next-intl` [UNVERIFIED]). The default LTR/English stance is correct for SaaS, mobile, and storefront tiers; the existing template's Arabic default was right for its niche but not for the family.
5. **"No tests" rule is reversed.** Every tier2 ships with Vitest 4 [UNVERIFIED, recommend verify] wired and a smoke test for the one path that, if broken, breaks the app (the AI chat streaming route, the Stripe webhook, the checkout flow). The "no tests" rule in `RULES_GUIDE.md` was a 2024 cost-cutting move that does not survive contact with billing and auth.
6. **"No comments" rule is partially reversed.** Templates ship with `// Why:` comments on the 3-5 non-obvious decisions per file. Templates are reference docs; agents read them. The existing rule's intent (don't pad obvious code with `// increment i`) is preserved, but load-bearing decisions get a one-line explanation.
7. **Tailwind v4 is the default for all UI tiers.** Confirmed [S3]. The current `@tailwindcss/vite` setup in the existing template is correct but should be the **only** Tailwind setup — drop any v3 patterns.
8. **Vite 7 is the build tool for tier0, tier1, and tooling tiers.** Confirmed [S14]. Next.js 16 carries its own bundler for tier2 web apps [S1]; do not double-bundle.
9. **React 19 is the default React version.** Confirmed [S15]. The existing template's React 18 is a major-bump behind; the planner must upgrade as part of the tier1 work.
10. **Each tier2 ships with a verified `[Sn]` citation on every library it imports.** This is the Tier 4 discipline applied at the template level. The template IS the documentation; it must be citation-grade.

---

## For other angles

- **Angle A (prior-art OSS):** investigate `create-t3-app` (tRPC + NextAuth + Prisma + Tailwind, the closest existing OSS template family for SaaS), `create-astro` (Astro's official scaffolder [S7]), `create-expo-app` (Expo's official scaffolder [S10]), and `medusajs/medusa-starter-default` (Medusa's storefront reference [S18]). All five should be the "if user wants OSS scaffolding" answer, not a custom scaffold.
- **Angle B (competitors):** Vercel's `v0`, Replit Agent, Bolt.new, Lovable, and Codeium's Cascade all ship "prompt to app" flows; their UI-vs-API choice is the load-bearing differentiator. Map each to one of our tiers (most map to tier0/tier1 + AI chat).
- **Angle D (token economy):** the per-kind size table in this dossier is the input — agent token budget per kind is 4-10× lower from a skeleton than from scratch. The CLI/bot/ext shims have the highest cold-vs-skeleton savings ratio (8× to 10×); the SaaS bundle has the lowest (4×). This informs where to invest skeleton quality.
- **Angle E (intake protocol):** the 13-step decision tree above IS the intake protocol's first question — the agent asks "describe your app idea in one line" and runs the tree against the answer. If the answer hits steps 1-7 cleanly, no further intake needed. Steps 8-13 trigger the clarification survey (which kind of CRUD? which user roles? which payment provider? etc.).
- **Angle F (audit of existing template):** the existing `resources/general-app-template` is effectively a CRUD dashboard + SaaS auth skeleton. F should reclassify it as `tier1-standard` + `admin layer` + `auth layer`, drop the WatermelonDB/Express/Capacitor/Arabic-default choices that this angle challenges, and keep the 8-phase build workflow + the RULES_GUIDE + the AGENT_INSTRUCTIONS files (those are gold, do not touch).

---

## Risks

- **HIGH: AI SDK breaking changes.** Vercel AI SDK 7 was published 17 hours ago [S2]. Any tier2-ai-chat built against 7 may face API churn as 7.x stabilizes. **Mitigation:** pin the exact version (`ai@7.0.64`); revisit on the 7.1 release; document the upgrade path in the template README.
- **HIGH: Clerk pricing change.** Clerk's free tier was 10k MAU in 2025-2026 [S5]; if the user crosses, costs can jump 5-10×. **Mitigation:** ship Auth.js (NextAuth v5) as the documented alternative in the tier1 + auth layer; let the user pick at scaffold time.
- **MEDIUM: Expo SDK 57 + React Native 0.86 ecosystem gap.** Some community libraries lag the latest SDK release by 1-3 weeks [S10]. **Mitigation:** ship the 10 most-used libraries pre-pinned in the tier2-mobile `package.json`; document the `npx expo install --fix` workflow for stragglers.
- **MEDIUM: Astro 6 + React island mismatches.** Some React-only libraries don't ship as islands cleanly. **Mitigation:** prefer framework-agnostic components (Astro components, Svelte, Vue) for content sites; use React islands only when the library has no alternative.
- **MEDIUM: WXT 0.x version.** WXT is 0.21.4 [S16], still pre-1.0. Breaking changes are possible. **Mitigation:** pin WXT in the extension shim; review changelog on every upgrade.
- **MEDIUM: Drizzle still 0.x.** Drizzle is 0.45.2 [S17], pre-1.0 but production-stable by adoption signal (15.4M weekly downloads). Same mitigation as WXT.
- **LOW: shadcn/ui [UNVERIFIED].** No chub doc exists for shadcn/ui; version not verified live in this dispatch. **Mitigation:** planner should `chub search "shadcn"` at plan time before pinning.
- **LOW: Medusa 2.x churn.** Medusa 2 is a recent major rewrite; older tutorials target 1.x [S18]. **Mitigation:** template README links only 2.x docs; warns about 1.x tutorials.
- **LOW: Telegram Bot API stability.** Telegram Bot API has a history of breaking changes and inconsistent docs [S22]. **Mitigation:** default the bot shim to Discord; Telegram is a documented but un-recommended option.
- **LOW: `react-markdown` / `remark-gfm` versions [UNVERIFIED].** Not in chub. **Mitigation:** planner verifies at plan time; default to latest stable.
- **LOW: Tailwind v4 + Astro v6 CSS-first config drift.** Both are CSS-first [S3][S7]; their `@theme` blocks can collide if not namespaced. **Mitigation:** template uses prefixed `@theme` blocks (`--t2-content-*`, `--t2-saas-*`).

---

## Sources

| # | Source | Type | URL | Access date |
|---|--------|------|-----|-------------|
| [S1] | Next.js JavaScript Guide (chub) | official-docs | https://chub.search/next/next (chub `next/next` v16.2.6) | 2026-08-13 |
| [S2] | Vercel AI SDK npm `ai` v7.0.64 | official-docs | https://www.npmjs.com/package/ai | 2026-08-13 |
| [S3] | Tailwind CSS v4 JavaScript Guide (chub) | official-docs | chub `tailwindcss/tailwindcss` v4.3.0 | 2026-08-13 |
| [S4] | Stripe Payments JS Guide (chub) | official-docs | chub `stripe/payments` v22.2.0 | 2026-08-13 |
| [S5] | Clerk JS SDK (chub) | official-docs | chub `clerk/auth` v7.4.2 | 2026-08-13 |
| [S6] | Prisma ORM JS Guide (chub) | official-docs | chub `prisma/orm` v8.0.14 | 2026-08-13 |
| [S7] | Astro JS Guide (chub) | official-docs | chub `astro/astro` v6.4.2 | 2026-08-13 |
| [S8] | Commander.js JS Guide (chub) | official-docs | chub `commander/commander` v14.0.3 | 2026-08-13 |
| [S9] | Discord.js JS Guide (chub) | official-docs | chub `discord/bot` v14.26.4 | 2026-08-13 |
| [S10] | Expo SDK reference (web) | official-docs | https://docs.expo.dev/versions/latest/ | 2026-08-13 |
| [S11] | Capacitor Installing Guide (web) | official-docs | https://capacitorjs.com/docs/getting-started | 2026-08-13 |
| [S12] | React Router config (web) | official-docs | https://reactrouter.com/api/framework-conventions/react-router.config.ts | 2026-08-13 |
| [S13] | Supabase JS SDK (chub) | official-docs | chub `supabase/client` v2.106.2 | 2026-08-13 |
| [S14] | Vite JS Guide (chub) | official-docs | chub `vite/vite` v7.8.0 | 2026-08-13 |
| [S15] | React JS Guide (chub) | official-docs | chub `react/react` v19.2.6 | 2026-08-13 |
| [S16] | WXT (web) | official-docs | https://www.npmjs.com/package/wxt (v0.21.4) | 2026-08-13 |
| [S17] | Drizzle ORM (web) | official-docs | https://www.npmjs.com/package/drizzle-orm (v0.45.2) | 2026-08-13 |
| [S18] | Medusa commerce (web) | official-docs | https://docs.medusajs.com/ + https://www.npmjs.com/package/@medusajs/medusa (v2.18.0) | 2026-08-13 |
| [S19] | OpenAI Chat SDK (chub) | official-docs | chub `openai/chat` v6.39.1 | 2026-08-13 |
| [S20] | Anthropic Claude SDK (chub) | official-docs | chub `anthropic/claude-api` v0.100.1 | 2026-08-13 |
| [S21] | Shopify Storefront API (chub) | official-docs | chub `shopify/storefront` v12.1.0 | 2026-08-13 |
| [S22] | Telegram Bot API community sentiment | web | https://core.telegram.org/bots/api (Telegram's own API docs are terse; grammY README warns about API churn) | 2026-08-13 |
| [S23] | Streaming UX research (industry consensus) | web | https://www.nngroup.com/articles/response-times-3-important-limits/ + Vercel AI SDK `streamText` docs [S2] | 2026-08-13 |
| [S24] | `resources/general-app-template/INDEX.md` | project | E:\react_projects\research_space\resources\general-app-template\INDEX.md | 2026-08-13 |

---

## Metrics

- findings: ~180 substantive bullets across 8 deep-dive sections (no canonical `## Technical findings` section; this dossier uses the custom shape specified in the dispatch prompt — 8-kind matrix + per-kind deep-dive)
- risks_HIGH: 2
- risks_MEDIUM: 4
- risks_LOW: 5
- clarifying_Qs: 1 (Option C vs Option B for tier2-tooling — must be confirmed by user before planning)
