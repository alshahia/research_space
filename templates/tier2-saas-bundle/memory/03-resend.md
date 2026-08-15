# 03 — Resend patterns

Resend (`resend ^6.20.0`) is a thin HTTP client for the Resend transactional email API. The `Resend` class exposes `emails.send()`, `emails.batch()`, etc.

## Basic send

```ts
import { Resend } from "resend";

const client = new Resend(process.env.RESEND_API_KEY);

const res = await client.emails.send({
  from: "support@example.com",
  to: "buyer@example.com",
  subject: "Your payment didn't go through",
  html: "<h1>We couldn't process your payment</h1>...",
  text: "We couldn't process your payment...",
});

if (res.error) {
  // 4xx response — surface to caller
  throw new Error(res.error.message);
}

const id = res.data?.id; // EMA_...
```

The result is a discriminated union: `{ data: { id } } | { error: { message, statusCode } }`.

## Why server-only

`RESEND_API_KEY` is an admin key with full send privileges. It belongs on the server, in `server.ts`, never in a Vite-exposed env var. The skeleton wraps the Resend client in `getResend()` lazy-init + a `sendBillingFailedEmail()` template helper.

## Templated emails

Two patterns:
1. **HTML string with placeholders** — fast to ship, fine for low-volume. The skeleton's `sendBillingFailedEmail` uses this.
2. **React Email (`@react-email/components`)** — TSX-rendered emails with full component composition. Add the package when templates grow beyond 3-4 emails.

Pick pattern 1 for the spine; promote to pattern 2 when you have ≥3 distinct templates.

## Idempotency on send

Resend returns `{ data: { id } }` on success. `id` is the unique message ID. On retry-from-client, dedupe on this ID (or compute a server-side deterministic message ID like `sha256(customer_email + invoice_id + day)`) to avoid double-sending the same email.

## Pitfalls

- Sender domain verification: `from: "support@example.com"` only works after you verify `example.com` (or a subdomain) in Resend's dashboard. Until then, Resend accepts `onresend.dev` for testing.
- Don't put `RESEND_API_KEY` in `VITE_*` — it leaks into the bundle.
- Reply-to handling: `reply_to: "support@example.com"` (snake case in the SDK) sets the reply address separately from the sender.
