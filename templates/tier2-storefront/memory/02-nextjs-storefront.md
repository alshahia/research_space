# Memory — 02 Next.js 15 storefront

Quick reference for working on `apps/storefront/` (Next.js 15 App Router + Server Components + Stripe Checkout). Last verified: 2026-08-14. Source: https://nextjs.org/docs/app

## What it is

Next.js 15 ships App Router as the default. Pages are `.tsx` files under `src/app/` (or `app/`). The default render mode is **Server Components** — most pages are server-only unless they `'use client'` opt in. Server Components fetch data server-side and stream HTML to the browser.

## Anatomy of this scaffold

```
apps/storefront/
├── package.json                   # next ^15.5.0 + react 19 + @medusajs/js-sdk + stripe + zod + tailwindcss
├── next.config.mjs                # standalone output, server actions on, image domains
├── tsconfig.json                  # strict TS, App Router paths
├── tailwind.config.ts             # Tailwind v4 minimal config
├── postcss.config.mjs             # postcss + @tailwindcss/postcss
├── src/
│   ├── app/
│   │   ├── [countryCode]/
│   │   │   ├── layout.tsx         # countryCode router layout (US/GB/DE)
│   │   │   └── (main)/
│   │   │       ├── page.tsx       # landing
│   │   │       ├── products/
│   │   │       │   ├── page.tsx   # PLP
│   │   │       │   └── [handle]/page.tsx  # PDP
│   │   │       ├── cart/page.tsx  # cart drawer
│   │   │       └── order-confirmation/page.tsx
│   │   └── api/
│   │       ├── checkout/route.ts  # POST /api/checkout → Stripe Checkout Session
│   │       ├── webhooks/stripe/route.ts  # POST webhook (sig verified)
│   │       └── return/route.ts    # GET Stripe Checkout return URL
│   ├── components/                # 7 client components
│   │   ├── ProductCard.tsx        # server, but props passed by client parent
│   │   ├── ProductGrid.tsx        # server (renders N cards)
│   │   ├── AddToCart.tsx          # client ('use client') — submit button
│   │   ├── QuantitySelector.tsx   # client
│   │   ├── CartDrawer.tsx         # client
│   │   ├── Header.tsx             # server
│   │   └── Footer.tsx             # server
│   ├── lib/
│   │   ├── medusa.ts              # @medusajs/js-sdk client factory (Medusa 2)
│   │   ├── stripe.ts              # stripe SDK client
│   │   ├── cart.ts                # localStorage-backed cart for client
│   │   └── data/
│   │       ├── products.ts        # server-side product fetch
│   │       └── cart.ts            # server-side cart fetch (post-checkout)
│   ├── styles/
│   │   └── globals.css            # Tailwind base/components/utilities
│   ├── middleware.ts              # countryCode detection (US/GB/DE)
│   └── types/
│       └── optional-modules.d.ts  # dynamic-import types (Stripe, Medusa modules)
└── tests/
    ├── cart-flow.test.ts          # vitest; add/remove/clear
    ├── stripe-webhook.test.ts     # vitest; sig happy + bad-sig paths
    └── stripe-checkout.test.ts    # vitest; mocked Stripe SDK
```

## App Router mental model

- **Folder = route segment.** `src/app/[countryCode]/products/page.tsx` → `/us/products`.
- **`layout.tsx` is per-segment, persistent.** Wraps `page.tsx`.
- **`(main)/` is a route group** — parentheses don't appear in URL; they group files for shared `layout.tsx` without adding a segment.
- **`route.ts` is API.** `src/app/api/checkout/route.ts` → `POST /api/checkout`. Export named HTTP verbs (`GET`, `POST`, etc).
- **`middleware.ts` runs before every request.** Used here to enforce countryCode prefix.
- **`'use client'`** at top of file = client component; everything else is server.

## Server Components vs Client Components

| Feature | Server | Client |
|---|---|---|
| Fetch data on server | yes | no (use server actions) |
| Hooks (`useState`, `useEffect`, `useContext`) | no | yes |
| Event handlers (`onClick`, `onSubmit`) | no | yes |
| Browser APIs (`window`, `localStorage`) | no | yes |
| SEO content (text, images) | yes | yes |
| Bundle size impact | zero (HTML stream) | full JS shipped to browser |

**Default to server.** Convert to client only when you need state/events/browser APIs. This scaffold has 3 client components: `AddToCart`, `QuantitySelector`, `CartDrawer`. Everything else is server.

## Server actions (App Router 15)

```ts
// src/app/[countryCode]/(main)/cart/page.tsx
'use server'
async function updateQuantity(formData: FormData) {
  'use server'
  // cookie / database write
}
```

Server actions are functions marked with `'use server'` at the top of the function (or file). They run on the server even when called from a client component. They replace most POST `/api/*` routes for form-driven UX.

Note: this scaffold uses **`route.ts` POST handlers** for `/api/checkout` and `/api/webhooks/stripe` (because Stripe calls back as a third party). Internal cart operations could be server actions, but the scaffold sticks to `route.ts` for consistency with the spec.

## Route handlers (API routes)

```ts
// src/app/api/checkout/route.ts
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  // ... Stripe call
  return NextResponse.json({ url: "https://checkout.stripe.com/..." })
}
```

`route.ts` is the App Router way to define API endpoints. Named exports per HTTP verb. `Request` / `Response` are Web standard; use `NextRequest` / `NextResponse` only if you need access to cookies/headers.

## Middleware (countryCode detection)

```ts
// src/middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const SUPPORTED = ["us", "gb", "de"]

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  if (pathname === "/" || !SUPPORTED.some((c) => pathname.startsWith(`/${c}`))) {
    return NextResponse.redirect(new URL(`/us${pathname}`, req.url))
  }
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"]
}
```

The middleware **redirects** (not rewrites) so the URL shows the countryCode — required for SEO + user-shareable links.

## Stripe Checkout redirect flow

```
[client] cart → POST /api/checkout { items, countryCode }
                                  ↓
[server] Stripe Checkout Session (line_items from items)
                                  ↓
[client] window.location = session.url (https://checkout.stripe.com/...)
                                  ↓
[stripe-hosted] user completes payment
                                  ↓
[stripe] POST /api/webhooks/stripe (signed: t=...,v1=hmac)
                                  ↓
[server] verify sig against STRIPE_WEBHOOK_SECRET via Stripe.webhooks.constructEvent
                                  ↓
[server] mark Medusa order as paid (deferred to Medusa subscriber)
                                  ↓
[stripe] GET /api/return?session_id=... (user redirect back)
                                  ↓
[client] → /[countryCode]/order-confirmation
```

The `Stripe.webhooks.constructEvent(rawBody, signature, secret)` step is what this scaffold's `tests/stripe-webhook.test.ts` validates.

## Path B Next.js 15 vs Tier1 Next.js 16

tier1-standard pins Next 16 (matrix-sourced). Tier2-storefront pins Next 15 (user-locked 2026-08-14, recorded in `tier.config.json` `deliberateOverrides.nextVersion`). The override is deliberate: Next 15 has the App Router Server Components parity that tier2-saas-bundle (3.5) needs. Future: when 3.5 lands + the family stabilizes, bump to Next 16 in a controlled PR.

## What this scaffold does NOT cover

- Server Actions for cart updates (sticks to `route.ts` for consistency).
- ISR (`revalidate` / `revalidatePath`) — pages are dynamic by default in this scaffold (logged-out users see fresh inventory).
- Image domains beyond `localhost` (Next.js Image component won't load external CDN by default; configure `next.config.mjs` `images.remotePatterns`).
- `next/font` — system fonts only.
- `next-themes` — stripe-app localStorage theme would need this; defer.

## Tests on Windows

- `jsdom` (`^30.0.0`) for client component tests.
- `next/server` mocks in `tests/stripe-checkout.test.ts`.
- `Stripe.webhooks.constructEvent` is testable with a real fixture (signed body + secret). The Stripe SDK does crypto, not a network call.

## See also

- 01-medusa.md — the backend.
- 03-stripe-billing.md — webhook flow (cross-cuts both apps).
- 04-deployment.md — Vercel deploy.
