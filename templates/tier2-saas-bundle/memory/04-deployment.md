# 04 — Deployment

Single Node process serves SPA + API. Vite build produces `dist/`; `tsx server.ts` (or `node --loader tsx/esm server.ts` in prod) serves both.

## Build + run

```bash
npm install
npm run build   # tsc --noEmit && vite build  →  dist/
npm start       # tsx server.ts               →  serves :3000
```

Environment: load `.env` via `dotenv` (the skeleton does this at the top of `server.ts`). In production, prefer your platform's secret manager.

## Hosting targets

Pick one:

- **Single VPS** (`systemd` + Caddy/Nginx reverse proxy + Let's Encrypt): cheapest. One Node process, one Postgres, no horizontal scaling.
- **Fly.io / Railway / Render**: zero-config Node + Postgres. One `fly deploy` boots the Express server.
- **Vercel + Neon Postgres**: Vercel supports `tsx server.ts` via `vercel.json`'s `builds`. The SPA + API live behind one Vercel project. Postgres lives in Neon.

For the spine, Fly.io + Fly Postgres is the lowest-ops deployment target.

## Webhook endpoint in production

Stripe needs to reach your `/api/webhooks/stripe`. After `npm start`:

1. Deploy (`fly deploy` / `git push heroku main` / etc.).
2. Get the production URL (`https://myapp.example.com`).
3. Add the webhook in https://dashboard.stripe.com/webhooks → endpoint URL = `https://myapp.example.com/api/webhooks/stripe`, subscribe to events (`checkout.session.completed`, `invoice.payment_succeeded`, `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted`).
4. Stripe shows you the `whsec_...` secret. Add it to the deploy env as `STRIPE_WEBHOOK_SECRET`.

## In-memory `Set` → Postgres `UNIQUE INDEX`

The skeleton's `Set<string>` in `src/db/schema/subscriptions.ts` is single-process only. Production:

```sql
CREATE TABLE processed_stripe_events (
  event_id  text PRIMARY KEY,
  processed_at timestamp with time zone NOT NULL DEFAULT now()
);
```

At scaffold time, ship an in-memory `Set`; at deploy time, swap to the table. The Drizzle migration is one file.

## Logging + observability

- `tsx server.ts` logs to stdout. Pipe to your platform's log service (Fly Logs, Render Logs, etc.).
- Add a request-log middleware if logs are missing the URL + status.

## Pitfalls

- `dist/` is `.gitignore`'d but shipped to the deploy target via `npm run build` (DON'T pre-delete it before deploy; the build command regenerates it).
- `tsx` is fine for dev + small production workloads. For higher throughput, swap to `node --import tsx` or compile `server.ts` to JS via `tsc -p .`.
- The Clerk webhook secret changes when you add/remove the endpoint. Re-add it after rotating.
