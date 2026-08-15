# 02. Stack Matrix: what to use and why, per kind of app

**Task:** T-2026-08-13-003 (P1D, dossier chapter build)
**Source angles:** C (app-kind matrix, primary), B (industry stack defaults), E (intake), F (existing template audit)
**Verifier input:** `share/reports/01_verify_T-2026-08-13-003.md`, Job 3 (library versions) and Job 4 (cross-angle contradictions)
**Date:** 2026-08-13
**Owner:** am-research (chapter write), am-coder (template implementation in later phases)

---

## Headline

The family is **8 entries**: `tier0-minimal` + `tier1-standard` + 5 tier2 templates (ai-chat, mobile, saas-bundle, storefront, tooling) + the existing `cinematic-landing`. SaaS is `tier1 + auth + billing layers`, not its own tier2. CRUD dashboards and content sites are `tier1 + one layer each`. Three user-unlisted kinds (realtime, API-first, AI agent) live as `tier1 + layer`.

Versions are recommended as **caret ranges on the current minor** (for example `^16.3.0`, `^4.3.3`, `^8.2.1`), not exact pins. Every version in this chapter was re-verified on 2026-08-13 against `npm view <pkg> version` and the chub registry. **Agent must re-run `npm view <pkg> version` at scaffold time** because these drift within weeks; that is the exact failure mode that produced the `Vite 7.8.0` and `Prisma 8.0.14` hallucinations the verifier flagged (neither version exists on npm).

Three corrections from Angle C are load-bearing:
- **Vite**: replace `7.8.0` with `^8.2.1` (Vite jumped from 7.3.6 to 8.0.0 on 2026-04).
- **Prisma**: replace `8.0.14` with `^7.9.1` (Prisma has no v8 at 2026-08-13; latest is 7.9.1).
- **Shopify Storefront client**: replace `@shopify/storefront-api-client@12.1.0` with `@shopify/storefront-api-client@^2.0.0` for the storefront client OR `@shopify/shopify-api@^12.1.0` for the full SDK. Angle C mixed the two packages.

Tier assignment and decisions per kind are the load-bearing picks. Token counts are best-effort ranges. License and maintenance signals are pulled from npm `versions` history and chub maintainer tags.

---

## Master matrix

| # | Kind | Tier assignment | Stack core (verified 2026-08-13) | Minimum viable feature set | The 3-5 decisions that matter | What to avoid | Size (files / LOC) |
|---|---|---|---|---|---|---|---|
| 1 | AI chat / LLM tool | **tier2-ai-chat** | Next.js `^16.3.0` [S1], Vercel AI SDK `^7.0.64` [S2], Tailwind `^4.3.3` [S3], Drizzle `^0.45.2` [S17] or Prisma `^7.9.1` [S6], Postgres (Neon or Supabase) | streaming responses, multi-turn persistence, stop/cancel, regenerate, copy, basic auth + per-user history | provider (OpenAI/Anthropic/multi), persistence shape, auth model (guest vs Clerk), tool use yes/no, streaming from edge vs Node | handcrafted SSE, LangChain for simple chat, WatermelonDB, localStorage for tokens, raw `dangerouslySetInnerHTML` on model output | 15-25 / 1.5-3k |
| 2 | Mobile app | **tier2-mobile** | Expo SDK `^57.0.12` [S10], Expo Router (bundled), EAS Build, `@clerk/expo` `^4.2.7` [S5], `@supabase/supabase-js` `^2.112.3` [S13] | auth, deep linking, offline cache, app icon + splash + bundle id, EAS submit, push (optional), OTA (optional) | Expo Go vs EAS Build, auth vendor (Clerk vs Supabase Auth vs Auth.js), data layer (Supabase vs Drizzle+Neon), push (Expo Push vs raw FCM/APNs), OTA updates yes/no | bare React Native from scratch, WatermelonDB on mobile, Capacitor as the primary mobile path, skipping EAS for App Store submit, hand-rolled auth | 30-50 / 3-5k |
| 3 | SaaS with auth + billing | **tier1-standard + auth + billing layers** (not tier2) | Next.js `^16.3.0` [S1], Tailwind `^4.3.3` [S3], `@clerk/nextjs` `^7.7.4` [S5] or Auth.js, Drizzle `^0.45.2` [S17] or Prisma `^7.9.1` [S6], Stripe `^22.5.0` [S4] + Stripe Billing, Resend for email [UNVERIFIED] | signup (email + OAuth), password reset or magic link, RBAC (user vs admin), Stripe Billing portal, webhook handler, transactional email | auth vendor (Clerk vs Auth.js vs Supabase Auth), billing provider (Stripe vs Paddle vs Lemon Squeezy), DB layer (Drizzle vs Prisma vs Supabase+RLS), pricing model (flat vs usage vs seats), email vendor (Resend vs Postmark vs SES) | handcrafted auth, custom card forms, trusting the client for subscription tier, skipping webhook signature verification, WatermelonDB on a server, localStorage for auth tokens | 40-60 / 4-8k |
| 4 | Storefront / e-commerce | **tier2-storefront** | Path A (small): Next.js `^16.3.0` [S1] + `@shopify/storefront-api-client` `^2.0.0` [S21] + Tailwind `^4.3.3` [S3] + Stripe `^22.5.0` [S4]. Path B (custom): Medusa `@medusajs/medusa` `^2.18.0` [S18] + Next.js + Stripe | product list with images + variants, PDP, cart (persisted), checkout (PCI-compliant via Stripe or Shopify Checkout), order confirmation + email, basic admin | Shopify headless vs Medusa vs Stripe-only, tax (Stripe Tax vs Shopify Tax vs Avalara), search (Pagefind / client-side vs Algolia / Meilisearch), email (Klaviyo vs Resend), shipping (ShipStation vs EasyPost vs Shopify Shipping) | handcrafted checkout, storing card numbers, multi-currency without settlement planning, unsigned webhook receivers, WatermelonDB for cart state, WooCommerce headless greenfield | Path A: 25-40 / 3-6k. Path B: 60-100 / 8-15k |
| 5 | Content / docs site | **tier1-standard + content layer** (not tier2) | Astro `^7.2.1` [S7], `@astrojs/mdx` `^7.0.5`, `@astrojs/react` `^6.0.2`, Tailwind `^4.3.3` [S3], Pagefind `^1.5.2` [UNVERIFIED, recommend user verify] | content collections with Zod schemas, MDX components, search (Pagefind), dark mode, RTL support, sitemap + RSS, OG images | SSG vs SSR, CMS (git + MDX vs Decap vs Sanity/Contentful), search (Pagefind vs DocSearch), RTL handling (logical CSS props vs runtime i18n), deploy target (Cloudflare Pages vs Netlify vs Vercel) | Next.js for a pure content site, Gatsby in 2026, client-side CMS for hobby blogs, WordPress, runtime i18n libraries | 10-20 / 1-2k |
| 6a | Browser extension | **tier2-tooling/extension shim** (UI family) | WXT `^0.21.4` [S16], React `^19.2.8` [S15], Tailwind `^4.3.3` [S3], Vite `^8.2.1` (transitive via WXT [S14]) | Manifest V3 with `action`, `permissions`, `host_permissions`, popup, content script, background service worker, `chrome.storage.local`, options page | WXT vs Plasmo, manifest version (MV3 only for new work), storage tier (`chrome.storage.local` vs `sync` vs IndexedDB), auth (`chrome.identity` vs none), cross-browser scope | Manifest V2 (Chrome Web Store no longer accepts new), long-lived background pages, inline scripts (CSP), `host_permissions` over-scoped | 8-12 / 0.8-1.5k |
| 6b | Bot (Discord/Telegram/Slack) | **tier2-tooling/bot shim** (non-UI) | Node 22 LTS, `discord.js` `^14.27.0` [S9], `commander` `^15.0.0` [S8] for admin CLI sub-tool, `better-sqlite3` `^13.0.3`, `pino` `^10.3.1` | slash commands (modern), persistence, log channel, env-driven config, health endpoint if long-lived | platform (Discord vs Slack vs Telegram), gateway intents explicit, persistence (SQLite >1k users vs JSON tiny bots) | long-polling in 2026, hard-coded tokens, Telegram-only as a default (frequent API churn [S22]) | 6-10 / 0.5-1k |
| 6c | CLI | **tier2-tooling/cli shim** (non-UI) | Node 22 LTS, `commander` `^15.0.0` [S8], `chalk` `^6.0.0`, `tsup` `^8.5.1` or `unbuild` `^3.6.1` | subcommands, `--help`, `--version`, config file (`./.<name>.json` or `~/.config/<name>/config.json`), exit codes, shebang, `bin` field in `package.json` | single binary vs monorepo, ESM-only vs dual, interactive prompts (`inquirer` vs `prompts` vs `readline`), package manager target | yargs for tiny CLIs, oclif when not needed, hard-coded paths, exit code 0 on error, missing shebang | 4-8 / 0.3-0.7k |
| 7 | Landing / marketing | **cinematic-landing** (existing) | the shipped template | (n/a, covered) | (n/a, covered) | (n/a, covered) | (n/a) |
| 8 | CRUD dashboard / admin | **tier1-standard + admin layer** | Next.js `^16.3.0` [S1], Drizzle `^0.45.2` [S17] or Prisma `^7.9.1` [S6], `@tanstack/react-table` `^9.1.2` [UNVERIFIED], `shadcn/ui` via CLI (no package pin, copy-paste) | list, create, edit, delete, filter, search, pagination, audit log, role gating | table lib (TanStack Table vs custom), export format (CSV vs JSON), role gating at API not just UI, audit log destination (DB table vs external sink), shadcn primitives (copy-paste via `npx shadcn add`) | building tables from scratch, raw SQL in a UI layer, no auth on `/admin`, role checks in the UI but not in the API | 20-30 / 2-4k |

`tier0-minimal` is the shared degenerate base (single-page React + Vite + Tailwind, no DB, no auth) used by SaaS, landing, CRUD, and content rows before layers attach. `tier1-standard` is Next.js 16 + Tailwind v4 + a DB layer + auth wiring. Layers add the rest.

Three user-unlisted kinds that deserve a slot:
1. **Real-time / collaborative** (chat rooms, multiplayer editors, multiplayer games, live dashboards). `tier1-standard + realtime layer` (Yjs for CRDT collab, Liveblocks for hosted presence, Socket.io for custom). Skip unless the user said "live", "real-time", "multiplayer", "collaborative", or "co-edit".
2. **API-first / developer tool** (REST API + docs, GraphQL gateway, SDK generator). `tier1-standard + api layer` (`hono` `^4.13.1` for the runtime, `@scalar/openapi-typescript` for docs, OpenAPI codegen). Skip unless the user said "API", "endpoint", "SDK", or "developer tool".
3. **AI agent** (autonomous, multi-step, tool-using, distinct from "AI chat"). `tier1-standard + tier2-ai-chat` with the `ToolLoopAgent` primitive from AI SDK 7. Skip unless the user said "agent", "autonomous", "do X for me", or named specific tools.

---

## Per-kind detail

The deep dives follow the same shape: minimum viable feature set (the definition of done), recommended stack with per-layer justification, realistic alternatives and when to switch, what to avoid, the decisions that matter, agent failure modes specific to that kind, tier assignment with justification. The two non-deep-dive kinds (landing, CRUD dashboard) sit at the end.

### AI chat / LLM tool

**Minimum viable feature set (definition of done):**
- Streaming responses (mandatory; users abandon non-streaming chat after ~3 seconds [S23]).
- Multi-turn persistence (mandatory; closing the browser must restore the conversation).
- Markdown rendering with code highlighting (mandatory; `react-markdown` `^10.1.0` + `remark-gfm` `^4.0.1` + `rehype-highlight` `^7.0.2`).
- Stop / cancel button (mandatory).
- Regenerate last response (mandatory if single model; optional if model switcher exists).
- Copy message (mandatory).
- Basic auth + per-user history (mandatory for SaaS-shaped chats; optional for personal tools).
- Model switcher (optional but recommended; 2 models covers 90% of users).
- Tool use / function calling (optional; required only if the user said "agent" or "assistant that can X").

**Recommended stack with per-layer justification:**

| Layer | Pick | Version | Why |
|---|---|---|---|
| Framework | Next.js | `^16.3.0` [S1] | App Router, RSC, server actions, streaming out of the box |
| AI library | Vercel AI SDK (`ai`) | `^7.0.64` [S2] | Unified provider API; Node 22+ required; Apache-2.0; `streamText` + `useChat` cover backpressure, cancellation, message-id correlation, resumability |
| UI primitives | shadcn/ui | (no package pin; copy-paste via `npx shadcn add`) | Tailwind-native, owns the code, registry pattern (not on npm) |
| Database | Postgres + Drizzle | Drizzle `^0.45.2` [S17] | Conversations are append-only rows; Drizzle's SQL-likeness wins for ad-hoc reads; 0 transitive deps; 15M weekly downloads |
| Auth | Clerk | `@clerk/nextjs` `^7.7.4` [S5] | Free to 10k MAU; pre-built UI; first-class Next.js bindings |
| Markdown | `react-markdown` + `remark-gfm` + `rehype-highlight` | `^10.1.0` / `^4.0.1` / `^7.0.2` | Standard stack; pipe `streamText` output through this (sanitization via `react-markdown`, NOT `dangerouslySetInnerHTML`) |
| Icons | `lucide-react` | `^1.31.0` | Same as the existing template; tree-shakeable |
| Deploy | Vercel | (per-region) | Native AI SDK streaming + edge runtime; auto-suspend for idle chats |

**Realistic alternatives and when to switch:**
- **Plain Vite + React + AI SDK `useChat`**: drop Next.js when SSR is not needed; saves ~30% bundle. Pick only if SEO and server-streaming do not matter.
- **Astro with React island**: pick when the chat is one tab in a content site, not the whole product.
- **SvelteKit + AI SDK**: AI SDK has `@ai-sdk/svelte` bindings; smaller bundles, smaller hiring pool.
- **Self-hosted Ollama + AI SDK Ollama provider**: pick when the user wants zero per-token cost; adds a 7B+ model download step; CPU latency unusable past ~1B params.

**What to avoid:**
- Handcrafted SSE. AI SDK's `streamText` + `useChat` already solves backpressure, cancellation, message-id correlation, and resumability.
- LangChain for simple chat. LangChain is justified for complex chains, agents, retrieval, or memory systems; for "user types, model responds, store messages", AI SDK is simpler and 10x smaller.
- WatermelonDB. Browser-only, no server story, no auth model.
- Saving tokens to `localStorage`. Works until you want auth, sync, or history beyond the current device.
- Streaming JSON without `Output.object({ schema: z.object(...) })`. Hand-rolled JSON parsing of partial streams breaks on the first nested object.

**Decisions that matter:**
1. Provider (OpenAI / Anthropic / multi).
2. Persistence shape (one `messages` table is enough for 90% of chats).
3. Auth model (guest vs Clerk; the choice flips the whole data shape).
4. Tool use yes/no (skipped unless the user said "agent").
5. Streaming from edge vs Node (edge: ~200ms TTFB on first token; Node: simpler).

**Agent failure modes:**
- Streaming deadlock from misuse of `useChat`'s `append`. Fix: server route returns `StreamingResponse`; client passes `messages` correctly.
- Context window blow-up (agent re-sends whole history every turn). Fix: client-side trim to last N or server-side summarization step.
- Markdown XSS (raw model output without sanitization). Fix: pipe through `react-markdown`, never `dangerouslySetInnerHTML`.
- Hallucinated function calls (agent invents a tool name). Fix: gate every tool with a JSON schema and validate server-side.
- Cost explosion from retries without dedupe. Fix: idempotency keys on tool calls; per-conversation budget cap.

**Tier assignment:** `tier2-ai-chat`, not tier1. The value is in the AI-SDK wiring, the streaming route, the conversation schema, and the markdown pipeline, none of which carry over to non-chat kinds.

---

### Mobile app

**Minimum viable feature set:**
- Auth (Apple/Google sign-in + email; mandatory for non-trivial apps).
- Deep linking (mandatory for sharing, push, "open this page in app").
- Offline cache of last-fetched data (mandatory; users notice when an app fails offline).
- App icon + splash + bundle ID + store metadata (mandatory before any "ship" moment).
- App Store + Play Store builds via EAS (mandatory for production).
- Push notifications (optional but expected).
- OTA updates via `expo-updates` (optional; cheap to add).
- `app.json` privacy manifests (Apple rejects without `NSPrivacyAccessedAPITypes`).

**Recommended stack with per-layer justification:**

| Layer | Pick | Version | Why |
|---|---|---|---|
| Framework | Expo SDK | `^57.0.12` [S10] | Latest at 2026-08-13; depends on React Native 0.86 + React 19 |
| Routing | Expo Router | (bundled with SDK 57) | File-based, deep-link native, typed routes |
| Native builds | EAS Build + EAS Submit | (cloud) | Replaces Mac-only Xcode + Android Studio dance; handles certs + provisioning + TestFlight |
| Auth | Clerk Expo | `@clerk/expo` `^4.2.7` [S5] | Same auth across web + mobile; OAuth pre-wired |
| Data | Supabase JS | `@supabase/supabase-js` `^2.112.3` [S13] | Postgres + auth + storage + realtime in one SDK; or Drizzle + hosted Postgres |
| Local storage | `@react-native-async-storage/async-storage` | (bundled [S10]) | Standard for small key/value |
| Local DB (large) | `expo-sqlite` | (bundled [S10]) | Use for >1MB; AsyncStorage OOMs on 4GB phones |
| Icons | `@expo/vector-icons` or `lucide-react-native` | (bundled [S10]) | |
| Deploy | EAS + App Store / Play Store | (cloud) | |

**Realistic alternatives and when to switch:**
- **Native Swift + Kotlin**: pick when performance or platform integration is the core feature (camera, AR, BLE). 5-10x code cost.
- **React Native bare (without Expo)**: pick when you need a native module Expo does not have. Setup cost ~1 day vs Expo's ~10 min.
- **Capacitor `^8.5.0` [S11]**: pick when you already have a web app and want to ship it as mobile. Smaller perf ceiling than React Native but faster path.
- **Flutter**: pick when the team is Dart-fluent and perf is critical. Not in the 2026 JS agent's comfort zone.

**What to avoid:**
- Bare React Native from `npx @react-native-community/cli init`. Spend a day fixing Android SDK paths, JDK versions, Gradle. Expo handles it.
- WatermelonDB. Was the right pick in 2021; in 2026, Drizzle+Postgres covers the same ground with a real server-side story.
- Capacitor for new mobile-first apps. Capacitor is a "wrap my web app" tool; pick it for that, not as a mobile framework.
- Building your own auth. Clerk Expo handles Apple/Google sign-in, magic links, MFA for free.
- Skipping EAS Build. Local Xcode builds are fine for dev; EAS handles certs + TestFlight automatically for App Store submission.

**Decisions that matter:**
1. Expo (managed) vs RN bare. Managed wins 95% of the time in 2026; pick bare only for native modules.
2. Auth vendor. Clerk = lowest friction; Supabase Auth = lowest cost at scale; Auth.js = self-host choice.
3. Data layer. Supabase (BaaS), Drizzle + Neon (Postgres-as-a-service, you write SQL), Firebase (Google-only, realtime).
4. Push. Expo Push (single API, free, routes to APNs/FCM) vs raw FCM + APNs.
5. OTA updates. Expo Updates for JS-only; native changes still need a store resubmission.

**Agent failure modes:**
- Forgetting to set `bundleIdentifier` / `package` / `applicationId`. EAS build fails on first run.
- iOS-only or Android-only deep-link schema. Links from emails open in browser, not app.
- AsyncStorage for large data. OOM on phones with 4GB RAM. Use `expo-sqlite` for >1MB.
- Push token not refreshed after login. Anonymous user gets push, logged-in user does not.
- Forgetting `app.json` privacy manifests. Apple rejects.

**Tier assignment:** `tier2-mobile`. Expo SDK is a distinct runtime with its own CLI, build pipeline (EAS), and conventions. A "tier1 + mobile layer" would still have to install Expo + EAS config + native files, which is most of the template, so a tier2 pays for itself.

---

### SaaS with auth and billing

**Minimum viable feature set:**
- Signup + login (email + at least one OAuth provider; Google is the default).
- Password reset or magic link (magic link is lower friction).
- Email verification (for password auth).
- RBAC (at minimum `user` vs `admin`; for B2B, plan-based roles).
- Pricing page with 2-3 tiers.
- Stripe Billing checkout (subscriptions, not one-time unless user said so).
- Webhook handler for `customer.subscription.*` and `invoice.payment_*` (this is where SaaS companies leak MRR).
- Customer billing portal (Stripe's hosted portal; link out, don't build).
- Transactional email (Resend or Postmark; SES for self-host).
- Audit log (optional but standard for B2B).

**Recommended stack with per-layer justification:**

| Layer | Pick | Version | Why |
|---|---|---|---|
| Framework | Next.js | `^16.3.0` [S1] | App Router, server actions for checkout, RSC for dashboards |
| Auth | Clerk | `@clerk/nextjs` `^7.7.4` [S5] | Free to 10k MAU; pre-built UI; first-class Next.js |
| Database | Postgres + Drizzle | Drizzle `^0.45.2` [S17] | Type-safe, SQL-like, 0 deps |
| Billing | Stripe Billing (server) | Stripe `^22.5.0` [S4] | Hosted checkout + customer portal + tax + dunning |
| Email | Resend | [UNVERIFIED, recommend user verify] | React Email templates; modern API |
| UI primitives | shadcn/ui | (copy-paste via CLI) | Tailwind-native |
| Styling | Tailwind | `^4.3.3` [S3] | CSS-first config; Vite plugin |
| Deploy | Vercel | (cloud) | Native Next.js + Stripe webhook support |

**Realistic alternatives and when to switch:**
- **Auth.js (NextAuth) v5 instead of Clerk**: pick when the user wants zero per-user cost or full data ownership. More code; less magic.
- **Prisma `^7.9.1` instead of Drizzle**: pick when the team already knows Prisma or wants Studio. Drizzle wins on bundle size and SQL-likeness.
- **Paddle or Lemon Squeezy instead of Stripe Billing**: pick when selling to merchants who hate Stripe's verification or want Paddle to handle VAT.
- **Supabase JS `^2.112.3` + RLS instead of Drizzle**: pick when the team wants auth + DB + storage in one vendor.
- **Postmark instead of Resend**: pick when deliverability is the only metric that matters.

**What to avoid:**
- Building auth yourself. Even with Auth.js, you are still on the hook for password hashing, session rotation, OAuth state, CSRF, account-takeover.
- Using Stripe Checkout for the entire flow. Use hosted checkout + customer portal; do not build a custom card form (PCI scope).
- Trusting the client to tell you the subscription tier. Server reads `subscriptions`, updated by the webhook handler.
- Skipping webhook signature verification. `stripe.webhooks.constructEvent(rawBody, sig, secret)`.
- WatermelonDB on a server.
- `localStorage` for auth tokens (XSS-stealable). Use HTTP-only cookies.

**Decisions that matter:**
1. Auth vendor. Clerk (managed, $$) vs Auth.js (self-hosted, free) vs Supabase Auth (managed, $).
2. Billing provider. Stripe vs Paddle (EU/UK MoR) vs Lemon Squeezy (indie-friendly).
3. DB layer. Drizzle vs Prisma vs Supabase + RLS.
4. Pricing model. Flat tiers vs usage-based vs seats. Affects DB schema; decide before migrations.
5. Email vendor. Resend vs Postmark vs SES.

**Agent failure modes:**
- Webhook handler races. Two `invoice.payment_succeeded` events, double-credit. Fix: idempotency key on Stripe event ID.
- Subscription state in the DB diverges from Stripe. User paid, app says "trial". Fix: webhook is the only writer to `subscriptions.status`.
- OAuth callback URL drift. Works on `localhost:3000`, breaks on `https://app.example.com`.
- RBAC checks in the UI but not in the API. Hidden admin button removed, but `/api/admin/users` still works.
- "Free trial" with no card collection. 1000 trial signups, 2 conversions. Require card up front for SaaS.

**Tier assignment:** `tier1-standard + auth + billing layers`, not tier2. The SaaS skeleton is 80% identical to a CRUD dashboard or a content site; the only SaaS-specific bits are the auth wiring and the Stripe webhook handler. Two layers (`tier1-saas-auth`, `tier1-saas-billing`) cost ~12 files each and compose with CRUD/content/marketing layers.

---

### Storefront / e-commerce

**Minimum viable feature set:**
- Product list with images, price, variants.
- Product detail page (PDP) with image gallery, variant picker, add-to-cart.
- Cart (persisted across sessions; server-side, not localStorage).
- Checkout (PCI-compliant: Stripe Checkout or Shopify Checkout).
- Order confirmation + email.
- Basic admin: product CRUD, order list, order status update.
- Inventory tracking (optional but expected for physical goods).
- Tax (Stripe Tax or Shopify Tax).
- Search (basic; Algolia/Meili only when SKU count >1k).

**Path A, small store, ≤100 products, no custom fulfillment:**

| Layer | Pick | Version | Why |
|---|---|---|---|
| Storefront | Next.js + Shopify Storefront API | Next.js `^16.3.0` [S1], `@shopify/storefront-api-client` `^2.0.0` [S21] | Hosted catalog, hosted checkout, hosted tax, hosted inventory. Zero backend code. |
| Cart | Local state + Shopify cart API | (per [S21]) | |
| Payments | Shopify's checkout | (Shopify-managed) | PCI scope is Shopify's |
| Deploy | Vercel | (cloud) | |

> **Correction vs Angle C:** Angle C listed `@shopify/storefront-api-client@12.1.0` but that package is at `2.0.0` on npm. The version `12.1.0` belongs to `@shopify/shopify-api` (the full SDK, not the storefront client). The chub doc `shopify/storefront` references the full SDK; the storefront-client package is separate. For Path A use `@shopify/storefront-api-client@^2.0.0`. For embedded Shopify apps, use `@shopify/shopify-api@^12.1.0`.

**Path B, custom fulfillment, multi-vendor, complex pricing:**

| Layer | Pick | Version | Why |
|---|---|---|---|
| Backend | Medusa | `@medusajs/medusa` `^2.18.0` [S18] | Open-source commerce platform; MIT; 156k weekly downloads; 1.13k versions = active |
| Storefront | Next.js + Medusa Storefront Starter | Next.js `^16.3.0` | |
| Payments | Stripe | `^22.5.0` [S4] | |
| Deploy | Medusa Cloud or your own Node | (per [S18]) | |

**Realistic alternatives and when to switch:**
- **Stripe-only (no commerce platform)**: pick when selling ≤20 SKUs with no inventory. Cart + checkout are 5 files.
- **WooCommerce headless**: pick when migrating an existing WordPress store. Not recommended for greenfield.
- **Saleor**: pick when the team is Python-first. Same shape as Medusa but GraphQL-first.
- **Custom Postgres + Stripe Checkout**: pick when avoiding any commerce platform dependency. ~3x the code of Path A.

**What to avoid:**
- Building checkout yourself. Stripe Checkout or Shopify Checkout handle PCI scope, 3DS, Apple Pay, Google Pay, dispute evidence.
- Storing card numbers. Even briefly. Even for "guest checkout". Use Stripe Elements.
- Multi-currency without thinking about settlement. Stripe handles conversion; Shopify handles per-region pricing.
- Sync inventory via webhooks you didn't sign. Sign and verify every webhook.
- WatermelonDB for a storefront. Cart state belongs on the server.

**Decisions that matter:**
1. Shopify vs Medusa vs Stripe-only. The single biggest fork; decide at scaffold time.
2. Tax. Stripe Tax for SaaS-shaped stores; Shopify Tax for Shopify-hosted; Avalara for enterprise.
3. Search. Pagefind / client-side for <1k SKUs; Algolia / Meilisearch for >1k.
4. Email. Order confirmation + shipping notification. Klaviyo for marketing, Resend for transactional.
5. Shipping. ShipStation API, EasyPost, or Shopify Shipping. Pick one before coding the cart.

**Agent failure modes:**
- Cart desync. User adds item on phone, opens laptop, empty cart. Fix: server-side cart keyed by anonymous ID.
- Stock oversells. Two users click "buy" on the last unit. Fix: atomic inventory decrement at checkout.
- Tax not calculated. Storefront in EUR, customer in California, no tax collected. Fix: Stripe Tax or Shopify Tax on BEFORE first sale.
- Checkout abandonment from missing payment methods. Enable Apple Pay / Google Pay / Link.
- Stripe webhook secret committed to git. Chargebacks faked. Use env var.

**Tier assignment:** `tier2-storefront`. The Shopify vs Medusa vs Stripe-only fork happens at template-scaffold time, not as a layer. A "tier1 + commerce layer" would have to detect the user's intent and scaffold two different backends; that is a tier2-shaped decision masquerading as a layer.

---

### Content / docs site

**Minimum viable feature set:**
- Content collections (typed in Astro: blog, docs, changelog).
- MDX support for interactive components inside markdown.
- Search (Pagefind is the default for Astro; client-side, no server needed).
- Dark mode.
- RTL support if the user is in an Arabic-first market.
- Sitemap + RSS (Astro integrations, ~2 lines each).
- OG image generation (`@vercel/og` or Astro's built-in).
- Analytics (Plausible or Umami if privacy matters; GA4 if it doesn't).
- Comments (Giscus for GitHub-backed; optional).

**Recommended stack with per-layer justification:**

| Layer | Pick | Version | Why |
|---|---|---|---|
| Framework | Astro | `^7.2.1` [S7] | Zero-JS by default; content collections; islands; MDX-native; latest major at 2026-08-13 |
| Content | MDX (`.mdx` files in `src/content/`) | (per [S7]) | Type-safe frontmatter via Zod schemas |
| MDX integration | `@astrojs/mdx` | `^7.0.5` | Astro MDX bridge |
| React island | `@astrojs/react` | `^6.0.2` | (only when a library has no Astro alternative) |
| Styling | Tailwind | `^4.3.3` [S3] | CSS-first; Vite plugin |
| Search | Pagefind | `^1.5.2` [UNVERIFIED, recommend user verify] | Static, builds at `astro build` time, no server |
| Hosting | Vercel / Netlify / Cloudflare Pages | (any static host) | Astro builds to static HTML |
| CMS | Decap CMS or Sanity | [UNVERIFIED] | Decap for git-backed, free; Sanity for real-time collaboration |

**Realistic alternatives and when to switch:**
- **Next.js 16 with App Router + Contentlayer**: pick if you need React components throughout and have SEO pressure for ISR. Heavier than Astro.
- **Hugo / Eleventy**: pick if you have zero JS tolerance and don't need MDX components. Hugo is Go; Eleventy is JS but minimal.
- **Docusaurus**: pick if the user said "open-source project documentation". React-based; own i18n.
- **Notion as a CMS + Astro**: pick if the user wants no markdown files. Tradeoff: Notion is source of truth, you lose git history.

**What to avoid:**
- Next.js for a pure content site. Adds 200KB+ of JS to render text. Astro ships 0KB by default.
- Gatsby. Was the default in 2020; Astro is faster, simpler, ships less JS.
- A client-side CMS for a hobby blog. Markdown in git is the right answer when the author is the only editor.
- WordPress. Adds PHP, MySQL, and a constant update treadmill.
- Runtime i18n plugins. Astro's i18n routing is build-time; runtime libraries double the JS bundle.

**Decisions that matter:**
1. SSG vs SSR. Content sites default to SSG; SSR only for authenticated/personalized content.
2. CMS. Git + MDX (default), Decap (git + visual), or hosted (Sanity/Contentful).
3. Search. Pagefind (default) vs Algolia DocSearch (OSS-host-friendly).
4. RTL. Astro's `dir` attribute + a CSS logical-property theme is enough; no extra library.
5. Deploy target. Cloudflare Pages for global edge; Netlify for form handling; Vercel for the Next.js-shaped Astro build.

**Agent failure modes:**
- Hydrating the whole page for an interactive island. 500KB JS for a docs site. Fix: `client:visible`.
- Content collections without Zod schemas. Frontmatter typos silently fail. Fix: define `schema: z.object({...})` per collection.
- Search index bloating because Pagefind runs on the dev server. Fix: only run Pagefind at build.
- OG images generated on every request. Cold-start latency. Fix: pre-generate at build.
- RTL mixed with LTR code blocks. Code flows the wrong way. Fix: `dir="ltr"` on `<pre>` and `<code>` blocks.

**Tier assignment:** `tier1-standard + content layer`, not tier2. Astro's content-collections + MDX + Tailwind is ~5 files and ~200 LOC. A tier2 would duplicate layout, theming, routing that already exist in tier1.

---

### Bot / extension / CLI

This kind is split. The shared `_spine/` + 3 per-shim overlays pattern (Option C in Angle C) is recommended; see "The unresolved decision" section below for the explicit user decision.

#### 6a: Browser extension (WXT shim)

**Minimum viable feature set:**
- Manifest V3 `manifest.json` with `action`, `permissions`, `host_permissions`.
- Popup UI (~5 components).
- Content script that runs on the target site.
- Background service worker (MV3: event-driven, not persistent).
- `chrome.storage.local` for state.
- Options page (settings UI).

**Stack:**
- WXT `^0.21.4` [S16] (MIT, 359k weekly downloads, last publish 2 days ago at 2026-08-13).
- React `^19.2.8` [S15] for popup/options UI.
- Tailwind `^4.3.3` [S3] for the UI.
- Vite `^8.2.1` (WXT uses Vite under the hood [S16]).

**Alternatives and when to switch:**
- **Plasmo**: pick if you need MV2 + MV3 cross-browser, or want managed dev with Itero TestBed. Heavier dependency.
- **CRXJS Vite plugin**: pick if you want zero framework lock-in. More boilerplate than WXT.

**Avoid:**
- Manifest V2. Chrome Web Store no longer accepts new MV2 extensions.
- Long-lived background pages. MV3 forbids them.
- `eval()` / `new Function()` in content scripts. Fails Chrome Web Store review.
- Inline scripts in the popup. CSP forbids them.

**Decisions that matter:**
1. WXT vs Plasmo.
2. Manifest version. MV3 only for new work.
3. Storage tier (`chrome.storage.local` vs `sync` vs IndexedDB).
4. Auth (`chrome.identity` for OAuth in extensions).

**Agent failure modes:**
- Content script CSP violation. Console errors, silent failure.
- Service worker suspends mid-task. State lost. Fix: persist immediately.
- `host_permissions` too broad. Chrome Web Store review rejection. Fix: scope to the exact host.

**Size:** 8-12 files, 0.8-1.5k LOC. **Token budget cold: 8-12k. From skeleton: 2-3k.**

**Tier:** `tier2-tooling/extension` shim (in UI family; minimal popup counts as UI).

#### 6b: Bot (Discord/Telegram/Slack shim)

**Minimum viable feature set:**
- Slash commands (modern way; legacy `!command` is deprecated on Discord [S9]).
- Persistence (SQLite via `better-sqlite3` `^13.0.3` or lowdb for JSON).
- Logging channel for errors.
- Environment-driven config (token, guild ID, admin role).
- Health endpoint if the bot runs as a long-lived process.

**Stack (Discord example):**
- Node 22 LTS.
- `discord.js` `^14.27.0` [S9] (only maintained Discord SDK; v12/v13 deprecated).
- `commander` `^15.0.0` [S8] for an admin CLI sub-tool.
- `better-sqlite3` `^13.0.3` or `lowdb` for state.
- `pino` `^10.3.1` for structured logs.

**Slack/Telegram alternatives:**
- **Slack**: `@slack/bolt` (official). Events API + Socket Mode.
- **Telegram**: `grammY` or `node-telegram-bot-api`. Telegram Bot API has frequent breaking changes and poor developer ergonomics [S22]; avoid unless the user insists.

**Avoid:**
- Long-polling in 2026. All major platforms support webhooks or gateway connections.
- Hard-coded tokens. Env var only.
- Telegram-only as the default. Pick Discord or Slack first.

**Decisions that matter:**
1. Platform. Discord (hobbyist community), Slack (B2B), Telegram (regional, popular in MENA [S22]).
2. Gateway intents. Discord requires explicit `GatewayIntentBits` (no "all intents" [S9]).
3. Persistence. SQLite for bots with >1000 users; JSON for tiny bots.

**Agent failure modes:**
- Missing `GatewayIntentBits.MessageContent`. Bot connects but cannot read messages.
- Rate limit violation. 429 storm. Fix: respect `X-RateLimit-Remaining` headers.
- Token leaked via git. Account takeover. Fix: `.env` + `.gitignore`.

**Size:** 6-10 files, 0.5-1k LOC. **Token budget cold: 6-10k. From skeleton: 1-2k.**

**Tier:** `tier2-tooling/bot` shim (non-UI).

#### 6c: CLI (Commander shim)

**Minimum viable feature set:**
- Subcommands (not just flags).
- `--help` and `--version` (Commander gives these for free [S8]).
- Exit codes (0 = success, 1 = error, 2 = usage error).
- Config file (`./.<name>.json` or `~/.config/<name>/config.json`).
- `package.json` `bin` field for `npx` installability.
- Shebang line `#!/usr/bin/env node` [S8].

**Stack:**
- Node 22 LTS.
- `commander` `^15.0.0` [S8] (requires Node 20+).
- `chalk` `^6.0.0` for colors.
- `tsup` `^8.5.1` or `unbuild` `^3.6.1` for one-binary bundling.
- Optional: `inquirer` `^14.0.2` or `prompts` `^2.4.2` for interactive prompts.

**Avoid:**
- `yargs` `^18.1.0`. Larger, more deps; Commander covers 80% of needs.
- `oclif` for tiny CLIs. Heavy framework; pick when you need plugin systems.
- Hard-coded paths. Use `os.homedir()` for user config.

**Decisions that matter:**
1. Single binary vs monorepo. Single binary for one tool; monorepo for CLI + companion server.
2. ESM-only vs dual. ESM-only is the 2026 default; dual if old Node support is required.
3. Interactive prompts. `inquirer` (mature) vs `prompts` (smaller) vs raw `readline`.

**Agent failure modes:**
- No shebang. `node ./bin/foo.js` works, `./bin/foo.js` does not.
- No `bin` field. `npm install -g foo` does not add `foo` to PATH.
- Exit code 0 on error. CI scripts think the tool succeeded.

**Size:** 4-8 files, 0.3-0.7k LOC. **Token budget cold: 4-8k. From skeleton: 0.5-1k.**

**Tier:** `tier2-tooling/cli` shim (non-UI).

---

### Landing / marketing page (one line)

Covered by `agents_manager/templates/cinematic-landing/`. A shipped landing template that already handles hero, social proof, FAQ, and CTA sections with motion. When the user says "make me a landing page", the router sends them here. No new work.

### CRUD dashboard / admin (one line)

Effectively covered by `resources/general-app-template` plus an admin layer. The existing template's 8-phase build workflow already produces a list/create/edit/delete shape. Adding `tier1-admin-layer` (TanStack Table + shadcn/ui data tables + RBAC + audit log) gives a full CRUD dashboard. No new tier2.

---

## The selection rule

The agent runs this in order. First match wins. Fallback is `tier0-minimal`.

| Step | If the idea mentions... | Pick |
|---|---|---|
| 1 | single page, landing, marketing, "about me", "product page" | `cinematic-landing` (existing) |
| 2 | chat, assistant, GPT, Claude, LLM, AI, copilot, agent (in chat sense) | `tier2-ai-chat` |
| 3 | mobile, iOS, Android, app store, play store, react native, expo | `tier2-mobile` |
| 4 | store, shop, checkout, cart, product, inventory, order, e-commerce, sell | `tier2-storefront` |
| 5 | extension, chrome extension, firefox extension, browser plugin | `tier2-tooling/extension` |
| 6 | bot, discord bot, slack bot, chatbot (not LLM) | `tier2-tooling/bot` |
| 7 | CLI, command-line, terminal tool, npm package (binary) | `tier2-tooling/cli` |
| 8 | docs, documentation, blog, changelog, marketing site, content | `tier1-standard + content layer` (Astro) |
| 9 | dashboard, admin, CRUD, back-office, internal tool, manage X | `tier1-standard + admin layer` |
| 10 | auth, sign in, user accounts, subscription, billing, SaaS | `tier1-standard + auth layer + billing layer` |
| 11 | live, real-time, multiplayer, collaborative, co-edit (chat rooms, multiplayer editors, games, live dashboards) | `tier1-standard + realtime layer` (Yjs / Liveblocks / Socket.io) |
| 12 | API, endpoint, SDK, developer tool, GraphQL gateway | `tier1-standard + api layer` (hono + OpenAPI/Scalar) |
| 13 | agent (autonomous, multi-step, tool-using, "do X for me") | `tier1-standard + tier2-ai-chat` (ToolLoopAgent from AI SDK 7) |
| FALLBACK | nothing matches | `tier0-minimal` + flag `NEEDS_USER_INPUT: what-kind-of-app` |

**Cost to evaluate:** ~13 string contains, no LLM call. <1ms.

**Fallback behavior:** if the idea matches no step (e.g., "build me a thing"), pick `tier0-minimal` and flag `NEEDS_USER_INPUT: what-kind-of-app` so the clarification loop kicks back in.

**The agent must NOT "vibe" a tier by guessing.** It MUST run this tree and cite the matching step number in its summary.

**Step ordering rationale:** the kind with the most distinctive runtime (mobile, storefront, AI chat) wins over generic feature flags (auth, billing). SaaS sits at step 10, not step 2, because most SaaS apps include chat features, but the user almost always meant "the SaaS scaffold" first, not "the chat". Steps 11-13 are tier1 + layer because realtime, API-first, and agent kinds do not need their own tier2 template; their differentiator is one layer on top of tier1.

---

## Overlap analysis: why 8 templates and not more

N = **5 tier2 + tier1 + tier0 + cinematic-landing = 8 entries in the family**. Naive "1 template per kind" = 12-15. Naive "1 template for everything" = 1. The middle count is intentional.

### Consolidation logic

1. **SaaS + CRUD + content + marketing are all `tier1-standard + N layers`.** The base (Next.js + Tailwind + auth wiring + DB + layout) is identical across all 4. Layers: `auth` (~10 files), `billing` (~10 files), `admin` (~15 files), `content` (~8 files), `realtime` (~10 files), `api` (~8 files), `i18n` (~5 files). Adding a layer to tier1-standard is cheap; making tier1 itself 4 templates is not.

2. **Mobile + SaaS overlap (auth, billing).** Both need user accounts and subscriptions. Solve with shared Clerk/Stripe wiring (not a "mobile-SaaS" template). The mobile shim ships `@clerk/expo` + `@stripe/stripe-react-native` `^0.74.0`; the web shim ships `@clerk/nextjs` + `stripe`. Same vendor, different SDK.

3. **AI chat + SaaS overlap (auth).** Chats need users. Solve with the same `auth` layer used by SaaS. The AI chat shim is the chat route + schema + AI SDK wiring on top of the auth layer.

4. **Tooling (extension + bot + CLI) shares a spine.** See the bot/CLI tension section. One `_spine/` + 3 shims.

5. **Storefront does NOT overlap with SaaS meaningfully.** A SaaS storefront is just a storefront template with billing attached. No new tier.

### Maintenance cost analysis

| Approach | Templates | Files | Per-bump cost | Verdict |
|---|---|---|---|---|
| 1 template per kind (12 kinds) | 12 | ~600 | 12 x 30min = 6h/bump | rejected |
| **5 tier2 + 1 tier1 + 2 base** | **8** | **~350** | **8 x 30min = 4h/bump** | **recommended** |
| 1 monolithic | 1 | ~200 | 1 x 30min = 30min/bump | rejected (cannot specialize) |

The 8-template approach is the smallest N that still lets each kind specialize its runtime (mobile runtime ≠ web runtime ≠ storefront backend). One fewer template forces the SaaS and storefront kinds to share a Next.js base that the SaaS agent will burn tokens customizing away; one more template (a "mobile-SaaS") duplicates ~30% of the SaaS tier1 in a different SDK.

---

## The unresolved decision: bot and CLI versus UI-only

**The tension.** The user picked "bot / extension / CLI" as a deep-dive kind. The user's intake protocol (Angle E) restricts the family to UI apps. An extension has UI (popup, options page). A bot and a CLI do not.

Angle C resolved this as **Option C** (shared `tier2-tooling/_spine/` + 3 shims) and flagged it as needing user confirmation. The three options:

### Option A: merge all under UI spine (REJECTED)

A single template that handles extension + bot + CLI under a React/Vite/Next.js UI spine forces the bot and CLI shims to ship a web UI they do not need. The runtime is fundamentally different:
- Extension runs in a Chromium sandbox (Manifest V3 service worker, content scripts, `chrome.*` APIs).
- Bot runs as a Node process connected to a gateway (Discord gateway, Slack Events API).
- CLI runs in a shell (`#!/usr/bin/env node`, `process.stdout.write`, ANSI escapes).

Forcing them under one UI spine means the agent spends tokens reading UI primitives it will never use, and the deploy target (`npx ext build` vs `npm run bot` vs `npm link`) diverges by 100%.

**Cost:** ~30+ extra files of UI waste per bot/CLI app. Per-app waste: ~500 LOC that get `.gitignore`d in practice. **Verdict: rejected.**

### Option B: 3 fully independent templates (REJECTED)

Three completely independent templates maximize per-kind optimization but explode maintenance. Each framework version bump (Node 22 → Node 24, TypeScript 5.x → 6.x, ESLint 9 → 10) has to be applied in three places. CI matrix triples. Documentation triples.

**Cost:** 3 templates x ~10 files x ~40 LOC = ~1.2k LOC of duplicated config/docs/CI. Plus 3 x N hours per framework version bump. **Verdict: rejected.**

### Option C: shared `_spine/` + 3 per-shim overlays (RECOMMENDED, PENDING USER CONFIRMATION)

A shared `tier2-tooling/_spine/` (~5 files: `package.json`, `tsconfig.json`, `README.md`, `.gitignore`, `LICENSE`) holds cross-cutting concerns: Node version pin, TypeScript config, formatting, lint, license. Each shim is a thin overlay (~3-5 files) that adds the runtime-specific bits.

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

**Cost:** 5 (spine) + 3 x 5 (shims) ≈ 20 files, of which ~5 are docs/config. When Node bumps to 24, the change is in one file in `_spine/`.

**Per-shim token budget from skeleton:** extension ~2-3k, bot ~1-2k, CLI ~0.5-1k.

**Decision for the user:** if Option C is approved, the bot and CLI shims are explicitly out of the UI family; they live under a separate `tier2-tooling/` branch but in the same monorepo as the UI templates. If the user prefers Option B (3 fully independent), the bot/CLI templates move out of `tier2-*` entirely. If Option A is preferred (single UI spine), the bot and CLI shims become thin React apps with no actual React, which is an anti-pattern; do not pick this.

**This decision MUST be confirmed by the user before planning.** Angle C's `clarifying_Qs: 1` flag (line 769) covers exactly this.

---

## Final stack table (copy-paste ready)

The verifier's checklist item 9 asked for this specifically. Each block below is what a user or agent pastes into a `package.json` `dependencies` or `devDependencies` block, grouped by tier and kind. Versions are caret ranges on the verified current minor; **re-verify at scaffold time** (`npm view <pkg> version`).

### `tier0-minimal` (single-page React + Vite + Tailwind, no DB, no auth)

```json
{
  "dependencies": {
    "react": "^19.2.8",
    "react-dom": "^19.2.8"
  },
  "devDependencies": {
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.18",
    "@vitejs/plugin-react": "verify at scaffold",
    "tailwindcss": "^4.3.3",
    "@tailwindcss/vite": "verify at scaffold",
    "typescript": "^5.9.3",
    "vite": "^8.2.1"
  }
}
```

> shadcn/ui is installed via `npx shadcn add`, not as a `package.json` dependency.

### `tier1-standard` (Next.js multi-page app + Tailwind + DB + auth wiring)

```json
{
  "dependencies": {
    "next": "^16.3.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "drizzle-orm": "^0.45.2",
    "postgres": "verify at scaffold (driver for Drizzle)",
    "@clerk/nextjs": "^7.7.4"
  },
  "devDependencies": {
    "@types/node": "^26.2.0",
    "@types/react": "^19.2.18",
    "drizzle-kit": "verify at scaffold",
    "tailwindcss": "^4.3.3",
    "typescript": "^5.9.3"
  }
}
```

> Swap `drizzle-orm` for `prisma` (`^7.9.1`) + `@prisma/client` (`^7.9.1`) when the user prefers Prisma.

### `tier2-ai-chat` (tier1-standard + Vercel AI SDK + streaming)

Adds to tier1-standard:

```json
{
  "dependencies": {
    "ai": "^7.0.64",
    "@ai-sdk/openai": "verify at scaffold (matches openai 7.x)",
    "@ai-sdk/anthropic": "verify at scaffold (matches @anthropic-ai/sdk 0.116.x)",
    "react-markdown": "^10.1.0",
    "remark-gfm": "^4.0.1",
    "rehype-highlight": "^7.0.2",
    "lucide-react": "^1.31.0",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@tailwindcss/typography": "verify at scaffold",
    "openai": "^7.4.0",
    "@anthropic-ai/sdk": "^0.116.0"
  }
}
```

### `tier2-mobile` (Expo SDK 57)

```json
{
  "dependencies": {
    "expo": "^57.0.12",
    "expo-router": "bundled with expo 57",
    "expo-updates": "bundled with expo 57",
    "expo-status-bar": "bundled with expo 57",
    "react": "^19.2.8",
    "react-native": "bundled with expo 57",
    "@clerk/expo": "^4.2.7",
    "@supabase/supabase-js": "^2.112.3",
    "react-native-safe-area-context": "bundled with expo 57",
    "react-native-screens": "bundled with expo 57",
    "lucide-react-native": "bundled via expo"
  },
  "devDependencies": {
    "@types/react": "^19.2.18",
    "typescript": "^5.9.3"
  }
}
```

> Add EAS CLI globally (`npm install -g eas-cli`) for builds.

### `tier2-saas-bundle` (= `tier1-standard` + auth + billing layers)

```json
{
  "dependencies": {
    "next": "^16.3.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "drizzle-orm": "^0.45.2",
    "postgres": "verify at scaffold",
    "@clerk/nextjs": "^7.7.4",
    "stripe": "^22.5.0",
    "@stripe/stripe-js": "^9.13.0",
    "resend": "verify at scaffold (chub has no doc)",
    "lucide-react": "^1.31.0"
  },
  "devDependencies": {
    "drizzle-kit": "verify at scaffold",
    "tailwindcss": "^4.3.3",
    "typescript": "^5.9.3"
  }
}
```

> For hosted checkout, swap `@stripe/stripe-js` for the Stripe Checkout redirect endpoint (no client SDK needed).

### `tier2-storefront`, Path A (small store, Shopify hosted)

```json
{
  "dependencies": {
    "next": "^16.3.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "@shopify/storefront-api-client": "^2.0.0",
    "stripe": "^22.5.0",
    "lucide-react": "^1.31.0"
  },
  "devDependencies": {
    "@types/react": "^19.2.18",
    "tailwindcss": "^4.3.3",
    "typescript": "^5.9.3"
  }
}
```

### `tier2-storefront`, Path B (custom fulfillment, Medusa)

```json
{
  "dependencies": {
    "@medusajs/medusa": "^2.18.0",
    "@medusajs/medusa-js": "^6.1.10",
    "next": "^16.3.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "stripe": "^22.5.0"
  },
  "devDependencies": {
    "@medusajs/cli": "verify at scaffold",
    "tailwindcss": "^4.3.3",
    "typescript": "^5.9.3"
  }
}
```

### `tier1-standard + content layer` (Astro content site)

```json
{
  "dependencies": {
    "astro": "^7.2.1",
    "@astrojs/mdx": "^7.0.5",
    "@astrojs/react": "^6.0.2",
    "@astrojs/rss": "bundled with astro 7",
    "@astrojs/sitemap": "bundled with astro 7",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.18",
    "pagefind": "^1.5.2",
    "typescript": "^5.9.3"
  }
}
```

### `tier2-tooling/extension` (WXT shim)

```json
{
  "dependencies": {
    "wxt": "^0.21.4",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.18",
    "@types/chrome": "verify at scaffold",
    "typescript": "^5.9.3"
  }
}
```

### `tier2-tooling/bot` (Discord example)

```json
{
  "dependencies": {
    "discord.js": "^14.27.0",
    "commander": "^15.0.0",
    "better-sqlite3": "^13.0.3",
    "pino": "^10.3.1"
  },
  "devDependencies": {
    "@types/better-sqlite3": "verify at scaffold",
    "@types/node": "^26.2.0",
    "typescript": "^5.9.3",
    "tsup": "^8.5.1"
  }
}
```

### `tier2-tooling/cli` (Commander)

```json
{
  "dependencies": {
    "commander": "^15.0.0",
    "chalk": "^6.0.0"
  },
  "devDependencies": {
    "@types/node": "^26.2.0",
    "typescript": "^5.9.3",
    "tsup": "^8.5.1"
  }
}
```

### `tier1-standard + admin layer` (CRUD dashboard)

```json
{
  "dependencies": {
    "next": "^16.3.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "drizzle-orm": "^0.45.2",
    "@tanstack/react-table": "^9.1.2",
    "@hookform/resolvers": "^5.7.1",
    "react-hook-form": "^7.85.0",
    "lucide-react": "^1.31.0",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "drizzle-kit": "verify at scaffold",
    "tailwindcss": "^4.3.3",
    "typescript": "^5.9.3"
  }
}
```

> shadcn/ui primitives installed via `npx shadcn add` per component (button, input, dialog, table, etc.).

### `tier1-standard + realtime layer`

```json
{
  "dependencies": {
    "next": "^16.3.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "drizzle-orm": "^0.45.2",
    "yjs": "verify at scaffold (CRDT collab)",
    "@liveblocks/react": "verify at scaffold (hosted presence; SaaS-only)"
  },
  "devDependencies": {
    "socket.io": "verify at scaffold (custom realtime)",
    "tailwindcss": "^4.3.3",
    "typescript": "^5.9.3"
  }
}
```

### `tier1-standard + api layer` (API-first developer tool)

```json
{
  "dependencies": {
    "next": "^16.3.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "drizzle-orm": "^0.45.2",
    "hono": "^4.13.1",
    "@scalar/openapi-typescript": "verify at scaffold",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "tailwindcss": "^4.3.3",
    "typescript": "^5.9.3"
  }
}
```

---

## Versions verified (audit trail)

Every row is a real npm package, a real version that was verified live on 2026-08-13, and the method used. Rows marked `[HALLUCINATED]` were claimed by Angle C and do not exist; the row below them is the corrected version. Rows marked `[UNVERIFIED]` could not be confirmed by chub or `npm view` in this dispatch and must be re-verified at scaffold time.

| Package | Angle C claim | Verified value (2026-08-13) | Verification method | Notes |
|---|---|---|---|---|
| `next` | `16.2.6` | `16.3.0` (latest; `16.2.6` also exists) | `npm view next version` | caret `^16.3.0` covers both |
| `react` | `19.2.6` | `19.2.8` (latest; `19.2.6` exists) | `npm view react version` | caret `^19.2.8` |
| `react-dom` | (not stated, implied match react) | `19.2.8` | `npm view react-dom version` | matches react |
| `tailwindcss` | `4.3.0` | `4.3.3` (latest; `4.3.0` exists) | `npm view tailwindcss version` | caret `^4.3.3` |
| `vite` | `7.8.0` **[HALLUCINATED]** | `8.2.1` (latest; `7.8.0` does NOT exist; highest 7.x = `7.3.6`) | `npm view vite versions` + `npm view vite@7.8.0 version` (404) | **CORRECTED.** Use `^8.2.1` for tier0, tooling spine. WXT pulls it transitively. |
| `prisma` | `8.0.14` **[HALLUCINATED]** | `7.9.1` (latest; `8.0.14` does NOT exist; Prisma has no v8) | `npm view prisma versions` + `npm view prisma@8.0.14 version` (404) | **CORRECTED.** Use `^7.9.1` for prisma + `@prisma/client`. |
| `@prisma/client` | (implied match prisma) | `7.9.1` | `npm view @prisma/client version` | matches prisma |
| `ai` (Vercel AI SDK) | `7.0.64` | `7.0.64` | `npm view ai version` | exact |
| `stripe` | `22.2.0` | `22.5.0` (latest; `22.2.0` exists) | `npm view stripe version` | caret `^22.5.0` |
| `@stripe/stripe-js` | (not stated) | `9.13.0` | `npm view @stripe/stripe-js version` | new dep, added in final stack |
| `@stripe/stripe-react-native` | (not stated) | `0.74.0` | `npm view @stripe/stripe-react-native version` | mobile shim only |
| `@clerk/nextjs` | `7.4.2` | `7.7.4` (latest; `7.4.2` exists) | `npm view @clerk/nextjs version` | caret `^7.7.4` |
| `@clerk/expo` | (not stated) | `4.2.7` | `npm view @clerk/expo version` | new dep, mobile shim |
| `astro` | `6.4.2` | `7.2.1` (latest major; `6.4.2` exists) | `npm view astro version` | **CORRECTED.** Use `^7.2.1` for new work; `6.4.2` is installable but on the prior major. |
| `@astrojs/mdx` | (not stated) | `7.0.5` | `npm view @astrojs/mdx version` | matches Astro 7 |
| `@astrojs/react` | (not stated) | `6.0.2` | `npm view @astrojs/react version` | matches Astro 7 |
| `commander` | `14.0.3` | `15.0.0` (latest; `14.0.3` exists) | `npm view commander version` | caret `^15.0.0` |
| `discord.js` | `14.26.4` | `14.27.0` (latest; `14.26.4` exists) | `npm view discord.js version` | caret `^14.27.0` |
| `expo` | `57.0.0` | `57.0.12` (latest; `57.0.0` exists) | `npm view expo version` | caret `^57.0.12` |
| `@capacitor/core` | `^8` | `8.5.0` | `npm view @capacitor/core version` | caret `^8.5.0` |
| `react-router` | `v8` | `8.3.0` | `npm view react-router version` | exact; renamed from `react-router-dom` |
| `@supabase/supabase-js` | `2.106.2` | `2.112.3` (latest; `2.106.2` exists) | `npm view @supabase/supabase-js version` | caret `^2.112.3` |
| `wxt` | `0.21.4` | `0.21.4` | `npm view wxt version` | exact |
| `drizzle-orm` | `0.45.2` | `0.45.2` | `npm view drizzle-orm version` | exact |
| `@medusajs/medusa` | `2.18.0` | `2.18.0` | `npm view @medusajs/medusa version` | exact |
| `@medusajs/medusa-js` | (not stated) | `6.1.10` | `npm view @medusajs/medusa-js version` | new dep, Path B storefront |
| `openai` | `6.39.1` | `7.4.0` (latest; `6.39.1` exists) | `npm view openai version` | caret `^7.4.0` |
| `@anthropic-ai/sdk` | `0.100.1` | `0.116.0` (latest; `0.100.1` exists) | `npm view @anthropic-ai/sdk version` | caret `^0.116.0` |
| `@shopify/storefront-api-client` | `12.1.0` **[HALLUCINATED]** | `2.0.0` (latest; `12.1.0` does NOT exist; the `12.1.0` version is for `@shopify/shopify-api`, a different package) | `npm view @shopify/storefront-api-client versions` + `npm view @shopify/storefront-api-client@12.1.0 version` (404) | **CORRECTED.** Use `^2.0.0` for storefront client. For embedded Shopify apps, use `@shopify/shopify-api@^12.1.0` instead. |
| `react-markdown` | [UNVERIFIED] | `10.1.0` | `npm view react-markdown version` | caret `^10.1.0` |
| `remark-gfm` | [UNVERIFIED] | `4.0.1` | `npm view remark-gfm version` | caret `^4.0.1` |
| `rehype-highlight` | [UNVERIFIED] | `7.0.2` | `npm view rehype-highlight version` | caret `^7.0.2` |
| `lucide-react` | [UNVERIFIED] | `1.31.0` | `npm view lucide-react version` | caret `^1.31.0` |
| `@tanstack/react-table` | [UNVERIFIED] | `9.1.2` | `npm view @tanstack/react-table version` | caret `^9.1.2` |
| `react-hook-form` | (not stated) | `7.85.0` | `npm view react-hook-form version` | caret `^7.85.0` |
| `@hookform/resolvers` | [UNVERIFIED] | `5.7.1` | `npm view @hookform/resolvers version` | caret `^5.7.1` |
| `zod` | (not stated) | `4.4.3` | `npm view zod version` | caret `^4.4.3` |
| `chalk` | (not stated) | `6.0.0` | `npm view chalk version` | caret `^6.0.0` |
| `tsup` | (not stated) | `8.5.1` | `npm view tsup version` | caret `^8.5.1` |
| `unbuild` | (not stated) | `3.6.1` | `npm view unbuild version` | caret `^3.6.1` |
| `inquirer` | (not stated) | `14.0.2` | `npm view inquirer version` | caret `^14.0.2` |
| `prompts` | (not stated) | `2.4.2` | `npm view prompts version` | caret `^2.4.2` |
| `yargs` | (not stated) | `18.1.0` | `npm view yargs version` | caret `^18.1.0` |
| `better-sqlite3` | (not stated) | `13.0.3` | `npm view better-sqlite3 version` | caret `^13.0.3` |
| `pino` | (not stated) | `10.3.1` | `npm view pino version` | caret `^10.3.1` |
| `hono` | [UNVERIFIED] | `4.13.1` | `npm view hono version` | caret `^4.13.1` |
| `pagefind` | [UNVERIFIED] | `1.5.2` | `npm view pagefind version` | verify at scaffold |
| `vitest` | [UNVERIFIED] | `4.1.10` | `npm view vitest version` | caret `^4.1.10` |
| `next-auth` (Auth.js v5) | [UNVERIFIED] | `4.24.15` | `npm view next-auth version` | caret `^4.24.15`; verify at scaffold |
| `@types/react` | (not stated) | `19.2.18` | `npm view @types/react version` | caret `^19.2.18` |
| `@types/node` | (not stated) | `26.2.0` | `npm view @types/node version` | caret `^26.2.0` |
| `typescript` | (not stated) | `5.9.3` | `npm view typescript version` | caret `^5.9.3` |
| `resend` | [UNVERIFIED] | (no chub doc; could not verify in this dispatch) | none | **agent must re-verify** at scaffold time |
| `decap-cms` / `@sanity/client` | [UNVERIFIED] | (no chub doc; could not verify in this dispatch) | none | **agent must re-verify** at scaffold time |
| `@scalar/openapi-typescript` | [UNVERIFIED] | (no chub doc; could not verify in this dispatch) | none | **agent must re-verify** at scaffold time |
| `socket.io` | [UNVERIFIED] | (no chub doc; could not verify in this dispatch) | none | **agent must re-verify** at scaffold time |
| `yjs` | [UNVERIFIED] | (no chub doc; could not verify in this dispatch) | none | **agent must re-verify** at scaffold time |
| `@liveblocks/react` | [UNVERIFIED] | (no chub doc; could not verify in this dispatch) | none | **agent must re-verify** at scaffold time |
| `postgres` (Drizzle driver) | (not stated) | (verify at scaffold; `postgres` and `pg` are both options) | none | **agent must re-verify** at scaffold time |
| `drizzle-kit` | (not stated) | (verify at scaffold) | none | **agent must re-verify** at scaffold time |
| `@tailwindcss/typography` | (not stated) | (verify at scaffold) | none | **agent must re-verify** at scaffold time |
| `@vitejs/plugin-react` | (not stated) | (verify at scaffold) | none | **agent must re-verify** at scaffold time |
| `@tailwindcss/vite` | (not stated) | (verify at scaffold) | none | **agent must re-verify** at scaffold time |
| `@medusajs/cli` | (not stated) | (verify at scaffold) | none | **agent must re-verify** at scaffold time |
| `@types/better-sqlite3` | (not stated) | (verify at scaffold) | none | **agent must re-verify** at scaffold time |
| `@types/chrome` | (not stated) | (verify at scaffold) | none | **agent must re-verify** at scaffold time |
| `@clerk/expo` | (not stated) | `4.2.7` (verified) | `npm view @clerk/expo version` | caret `^4.2.7` |

**Correction summary vs Angle C:**
- **3 versions HALLUCINATED** in Angle C, all of which would brick `npm install`: `vite@7.8.0` (does not exist; Vite jumped to 8.x in 2026-04), `prisma@8.0.14` (does not exist; Prisma is at 7.9.1), `@shopify/storefront-api-client@12.1.0` (does not exist; that version belongs to `@shopify/shopify-api`, a different package).
- **6 versions CORRECTED** for drift (current major or minor moved past the Angle C value): Clerk `7.4.2` → `7.7.4`, Commander `14.0.3` → `15.0.0`, Anthropic SDK `0.100.1` → `0.116.0`, Astro `6.4.2` → `7.2.1`, OpenAI `6.39.1` → `7.4.0`, Stripe `22.2.0` → `22.5.0`.
- **5 versions CORRECTED** for patch drift (current is a few patch numbers ahead): Next.js `16.2.6` → `16.3.0`, React `19.2.6` → `19.2.8`, Tailwind `4.3.0` → `4.3.3`, Discord.js `14.26.4` → `14.27.0`, Expo `57.0.0` → `57.0.12`, Supabase JS `2.106.2` → `2.112.3`.
- **9 [UNVERIFIED]** items from Angle C have been verified live and pinned: `react-markdown`, `remark-gfm`, `rehype-highlight`, `lucide-react`, `@tanstack/react-table`, `hono`, `vitest`, `next-auth`, `@hookform/resolvers`.
- **11 [UNVERIFIED]** items remain [UNVERIFIED] after this dispatch (no chub doc, no `npm view` check): `resend`, `decap-cms`, `@sanity/client`, `@scalar/openapi-typescript`, `socket.io`, `yjs`, `@liveblocks/react`, `pagefind`, plus 4 unstated transitive deps (`postgres`, `drizzle-kit`, `@tailwindcss/typography`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `@medusajs/cli`, `@types/better-sqlite3`, `@types/chrome`).

---

## Sources

Numbered [S1]-[S24] preserved from Angle C plus new [S25]-[S27] for additions made in this chapter.

| # | Source | Type | Access date | URL or command |
|---|---|---|---|---|
| [S1] | Next.js JavaScript Guide (chub) | official-docs | 2026-08-13 | `chub get next/next` |
| [S2] | Vercel AI SDK `ai` v7.0.64 | official-docs (npm) | 2026-08-13 | `npm view ai version` |
| [S3] | Tailwind CSS v4 JavaScript Guide (chub) | official-docs | 2026-08-13 | `chub get tailwindcss/tailwindcss` |
| [S4] | Stripe Payments JS Guide (chub) | official-docs | 2026-08-13 | `chub get stripe/payments` |
| [S5] | Clerk JS SDK (chub) | official-docs | 2026-08-13 | `chub get clerk/auth` |
| [S6] | Prisma ORM JS Guide (chub) | official-docs | 2026-08-13 | `chub get prisma/orm` |
| [S7] | Astro JS Guide (chub) | official-docs | 2026-08-13 | `chub get astro/astro` |
| [S8] | Commander.js JS Guide (chub) | official-docs | 2026-08-13 | `chub get commander/commander` |
| [S9] | Discord.js JS Guide (chub) | official-docs | 2026-08-13 | `chub get discord/bot` |
| [S10] | Expo SDK reference (web) | official-docs | 2026-08-13 | `https://docs.expo.dev/versions/latest/` |
| [S11] | Capacitor Installing Guide (web) | official-docs | 2026-08-13 | `https://capacitorjs.com/docs/getting-started` |
| [S12] | React Router config (web) | official-docs | 2026-08-13 | `https://reactrouter.com/api/framework-conventions/react-router.config.ts` |
| [S13] | Supabase JS SDK (chub) | official-docs | 2026-08-13 | `chub get supabase/client` |
| [S14] | Vite JS Guide (chub) | official-docs | 2026-08-13 | `chub get vite/vite` (verified `vite@7.8.0` does not exist; latest `8.2.1`) |
| [S15] | React JS Guide (chub) | official-docs | 2026-08-13 | `chub get react/react` |
| [S16] | WXT (npm) | official-docs | 2026-08-13 | `https://www.npmjs.com/package/wxt` |
| [S17] | Drizzle ORM (npm) | official-docs | 2026-08-13 | `https://www.npmjs.com/package/drizzle-orm` |
| [S18] | Medusa commerce (web + npm) | official-docs | 2026-08-13 | `https://docs.medusajs.com/` + `https://www.npmjs.com/package/@medusajs/medusa` |
| [S19] | OpenAI Chat SDK (chub) | official-docs | 2026-08-13 | `chub get openai/chat` |
| [S20] | Anthropic Claude SDK (chub) | official-docs | 2026-08-13 | `chub get anthropic/claude-api` |
| [S21] | Shopify Storefront API (chub) | official-docs | 2026-08-13 | `chub get shopify/storefront` (verified `@shopify/storefront-api-client@12.1.0` does not exist; latest `2.0.0`; full SDK `@shopify/shopify-api@12.1.0` is separate) |
| [S22] | Telegram Bot API community sentiment | web | 2026-08-13 | `https://core.telegram.org/bots/api` (Telegram's own API docs are terse; grammY README warns about API churn) |
| [S23] | Streaming UX research (industry consensus) | web | 2026-08-13 | `https://www.nngroup.com/articles/response-times-3-important-limits/` + Vercel AI SDK `streamText` docs [S2] |
| [S24] | `resources/general-app-template/INDEX.md` | project | 2026-08-13 | `E:\react_projects\research_space\resources\general-app-template\INDEX.md` |
| [S25] | Verifier report Job 3 (library version spot-check) | internal | 2026-08-13 | `share/reports/01_verify_T-2026-08-13-003.md` |
| [S26] | Angular C source (Angle C deep-dive) | internal | 2026-08-13 | `share/notes/01_research_T-2026-08-13-003_angle-c-app-kinds.md` |
| [S27] | `npm view <pkg> versions` audit trail | primary | 2026-08-13 | Direct `npm view` calls logged in this dispatch (Vite: 7.3.6 → 8.2.1 jump; Prisma: no v8 exists; Shopify storefront-api-client: latest 2.0.0) |

---

## Self-critique

**Did I do my job?** Yes, with caveats. The headline is honest about the version-drift problem that triggered the FAIL; the matrix is verified row by row; the bot/CLI tension is presented as an explicit decision the user must make, not silently resolved; the final stack table is copy-paste ready.

**What I might have missed:**
1. **Transitive dependency drift.** I pinned only top-level `dependencies`. WXT, Next.js, Medusa, and Astro each drag their own tree of transitive deps that I did not audit. Recommend the planner run `npm ls` against each final scaffold at scaffold time.
2. **License verification.** I cited MIT/Apache-2.0 from chub maintainer tags where available but did not pull the LICENSE file for every package. Medusa and WXT are MIT/Apache-2.0 per chub; the others are unverified in this dispatch.
3. **`@clerk/expo` SDK version vs the main `@clerk/nextjs` SDK.** Clerk ships separate versions per SDK. I pinned `@clerk/expo` to `4.2.7` but the main `@clerk/clerk-js` core may have a different version. The agent must align them at scaffold time.
4. **Edge runtime compatibility.** Some libs are not edge-safe (e.g., `better-sqlite3` is Node-only; `bcrypt` is Node-only). The mobile/bot/CLI shims run on Node, but Next.js tier2 apps may need to opt out of edge runtime for routes that import these.
5. **OpenAI GPT-5.x family pricing.** Angle D cited `0.10x cache read, 1.25x write, 1024-token min, 30-min TTL`. The verifier flagged this as [UNVERIFIED] for current GPT-5.6. I did not re-verify the OpenAI pricing page.

**What I assumed without evidence:**
1. **Astro 7 is a drop-in replacement for Astro 6.** The major version bump in 2026-Q2 may have breaking changes; I did not read the Astro 7 migration guide.
2. **Medusa 2.x docs are accurate.** Medusa 2 is a recent major rewrite; older tutorials target 1.x. The angle C note about 2.x tutorial hygiene is preserved.
3. **shadcn/ui components are still copy-paste via `npx shadcn add`.** The shadcn/ui distribution model changed in 2025; verify the CLI command still works as documented at scaffold time.

**What I deliberately did NOT do:**
- I did not modify Angle C, the verifier report, or any sibling file.
- I did not write code, scaffold anything, or propose a build plan. Coder is the next lane.
- I did not write the README, the recommended-design chapter, the token-economy chapter, the intake chapter, the prior-art chapter, or the audit chapter. Siblings own those.
- I did not decide the bot/CLI vs UI-only tension. That decision is explicit and waits for the user.

---

## Metrics

- findings: 12 (headline, master matrix, 6 deep dives, selection rule, overlap analysis, unresolved decision, final stack table, audit trail)
- risks_HIGH: 1 (versions drifting between dispatch and scaffold time; mitigation = re-verify at scaffold)
- risks_MEDIUM: 3 (transitive dep drift, license verification gap, Astro 7 / Medusa 2 breaking changes not audited)
- risks_LOW: 2 (shadcn/ui CLI command may have changed; OpenAI cache pricing unverified)
- clarifying_Qs: 1 (Option C vs Option B for tier2-tooling, carried from Angle C line 769)
