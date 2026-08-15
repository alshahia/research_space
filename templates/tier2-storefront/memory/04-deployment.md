# Memory — 04 Deployment

Quick reference for taking `tier2-storefront` to production. Last verified: 2026-08-14.

## Targets (recommended)

| Layer | Service | Why |
|---|---|---|
| Postgres | Neon / Supabase / AWS RDS | managed, free tier covers dev |
| Redis | Upstash / Redis Cloud | managed, edge-friendly |
| Medusa backend | Railway / Fly.io / Render | Node-friendly, persistent disk not needed |
| Next.js storefront | Vercel | first-class Next.js host |
| Stripe | Stripe Dashboard | third-party; webhook URL points at our Vercel app |

## Topology

```
                 ┌─────────────────────┐
                 │   DNS / Cloudflare  │
                 └──────────┬──────────┘
                            │
            ┌───────────────┼───────────────┐
            │                               │
   www.example.com                 api.example.com
            │                               │
            ▼                               ▼
   ┌─────────────────┐            ┌─────────────────────┐
   │     Vercel       │            │      Railway         │
   │  (Next.js 15)    │            │   (Medusa 2 + Node)  │
   │                  │            │                      │
   │  storefront app  │  ────────► │  uses Postgres + Redis│
   └─────────────────┘            └──────────┬──────────┘
            │                               │
            │ Stripe redirect               │
            ▼                               │
   ┌─────────────────┐                      │
   │ checkout.stripe │ ◄──── webhook ───────┘
   │     .com        │       (via POST /api/webhooks/stripe)
   └─────────────────┘
```

## Pre-deploy checklist

1. **DNS.** Point `www.example.com` at Vercel; `api.example.com` at Railway.
2. **Postgres + Redis provisioned.** Provision managed instances; copy the `DATABASE_URL` + `REDIS_URL`.
3. **Medusa backend deployed.**
   - Railway: import repo, set `DATABASE_URL` + `REDIS_URL` env vars, run `medusa db:migrate` then `medusa db:seed` as one-off tasks.
   - Set `STORE_CORS=https://www.example.com`, `ADMIN_CORS=https://api.example.com`, `AUTH_CORS=https://www.example.com,https://api.example.com`.
   - Generate strong `JWT_SECRET` + `COOKIE_SECRET` (32 bytes, `openssl rand -hex 32`).
4. **Next.js storefront deployed.**
   - Vercel: import repo, set env vars `NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api.example.com`, plus Stripe keys.
   - Vercel auto-detects `next.config.mjs` standalone output; deploy is automatic.
5. **Stripe webhook endpoint created.**
   - Stripe Dashboard → Developers → Webhooks → Add endpoint.
   - URL: `https://www.example.com/api/webhooks/stripe`.
   - Events: `checkout.session.completed`, `payment_intent.payment_failed`.
   - Copy the **signing secret** (`whsec_...`) into `STRIPE_WEBHOOK_SECRET` on Vercel.

## Stripe webhook in production (HTTPS only)

Stripe **only** delivers webhooks to HTTPS URLs in production. In local dev, use the Stripe CLI (`stripe listen --forward-to ...`). The webhook handler (`src/app/api/webhooks/stripe/route.ts`) verifies the signature against `STRIPE_WEBHOOK_SECRET` using `Stripe.webhooks.constructEvent` — same code path in dev and prod; only the secret differs.

## Idempotency in production

The scaffold's in-memory `Map<eventId, true>` works for a single-instance deploy. For multi-instance (Vercel serverless functions), replace with **Upstash Redis**:

```ts
import { Redis } from "@upstash/redis"
const redis = Redis.fromEnv()

async function alreadyProcessed(eventId: string): Promise<boolean> {
  const key = `stripe:event:${eventId}`
  const set = await redis.set(key, "1", { ex: 86400, nx: true })
  return set === null  // null = key already existed
}
```

`SET ... NX EX 86400` is atomic; only the first concurrent request succeeds, all duplicates get null and short-circuit.

## Postgres schema migration in prod

```bash
# from apps/backend/
DATABASE_URL=postgres://prod-... medusa db:migrate
```

Then seed:
```bash
DATABASE_URL=postgres://prod-... medusa db:seed
```

Production seed should be **idempotent** — create a real seed script that uses `upsert` and `IF NOT EXISTS` (this scaffold's `src/scripts/seed.ts` is a starting point; production needs hardening).

## Cost estimate (small shop, ~1000 orders/mo)

| Service | Free tier | Above free tier |
|---|---|---|
| Vercel (Next.js) | 100 GB/mo, 100k serverless invocations | pay-as-you-go |
| Railway (Medusa) | $5/mo hobby plan | usage-based; ~$15/mo @ 1GB RAM continuous |
| Neon Postgres (free) | 0.5 GB | $20/mo for 3 GB + autoscaling |
| Upstash Redis (free) | 10k requests/day + 256 MB | pay-as-you-go |
| Stripe | free (per-transaction fee) | 2.9% + 30¢ |

Total: ~$20-50/mo at low volume; scales linearly.

## Secrets management

- **Never commit `.env`.** Add to `.gitignore`.
- **Vercel:** use the dashboard UI or `vercel env pull`.
- **Railway:** use `railway variables set`.
- **Rotation:** Stripe keys should be rotated quarterly via the Dashboard.
- **`STRIPE_WEBHOOK_SECRET`** is per-endpoint; if you recreate the webhook you get a new secret.

## Custom domains + TLS

- Vercel: `vercel domains add www.example.com`; auto-TLS via Let's Encrypt.
- Railway: same pattern via `railway domain api.example.com`.
- DNS: CNAME `www` → Vercel, CNAME `api` → Railway (TXT for verification).

## Monitoring

- **Errors:** Sentry (`@sentry/nextjs`, `@sentry/node`).
- **Webhooks:** log each event with `console.log({ eventId, type })`; alert if 4xx/5xx rate > 1%.
- **Medusa:** `/admin` dashboard surfaces errors.
- **Stripe Dashboard:** payments API log shows every session + event.

## CI/CD (future)

Out of scope of this scaffold. Suggested:
- GitHub Actions: on PR, run `tsc --noEmit` + `npm test` for both apps.
- On merge to main, Vercel auto-deploys; Railway auto-deploys if `railway up` is wired.

## What this scaffold does NOT cover

- Medusa admin SSL (Railway handles).
- Region pinning (US-only is fine for most; EU users see +50ms latency, acceptable).
- CDN image optimization (Next.js Image + Vercel Image Optimization handles this).
- Backup strategy (Neon + Supabase have automatic backups; document the restore procedure in your runbook).

## See also

- 01-medusa.md — backend setup commands.
- 02-nextjs-storefront.md — Next.js setup env vars.
- 03-stripe-billing.md — Stripe webhook + production idempotency.
