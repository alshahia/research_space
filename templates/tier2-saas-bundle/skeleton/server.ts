// server.ts — Tier 2 SaaS bundle skeleton
// Production entry. Serves the Vite-built SPA + the 3 API routes on a
// single Node process.
//
// Routes:
//   POST /api/webhooks/stripe  — webhook sig verification (NO Clerk auth).
//   POST /api/checkout         — creates a Stripe Checkout session. Requires Clerk.
//   GET  /api/portal           — creates a Stripe Billing portal session. Requires Clerk.
//   GET  *                     — SPA fallback (Express serves dist/index.html).
//   Static assets served by `express.static('dist')`.
//
// Order matters: webhook MUST be registered with `express.raw(...)` BEFORE
// the Clerk middleware + JSON parser, because Stripe HMAC verification
// requires the exact raw bytes of the request body.
import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { createCheckoutSession, createPortalSession, verifyWebhook } from "./src/lib/stripe-server";
import { sendBillingFailedEmail } from "./src/lib/email";
import {
  markStripeEventProcessed,
  wasStripeEventProcessed,
} from "./src/db/schema/subscriptions";

const PORT = Number(process.env.PORT) || 3000;
// ponytail: Clerk's express middleware needs BOTH `secretKey` and
// `publishableKey`. In production, both come from your secret manager.
// In dev, fall back to placeholders so the server can boot for local
// development; API calls WILL fail with an "invalid publishable key"
// error until real keys are set in `.env`.
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY ?? "sk_test_replace_me";
const CLERK_PUBLISHABLE_KEY =
  process.env.CLERK_PUBLISHABLE_KEY ?? process.env.VITE_CLERK_PUBLISHABLE_KEY ?? "pk_test_replace_me";
const CORS_ORIGIN = process.env.VITE_API_BASE_URL ?? "http://localhost:5173";

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  }),
);

app.post(
  "/api/webhooks/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    if (typeof sig !== "string") {
      return res.status(400).json({ error: "missing stripe-signature header" });
    }
    let event;
    try {
      event = verifyWebhook(req.body, sig);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "unknown";
      return res.status(400).json({ error: `signature verification failed: ${msg}` });
    }

    // ponytail: idempotency. Stripe retries webhook delivery on non-2xx;
    // a single event.id is processed at most once. Production replaces
    // the in-memory Set with a Postgres UNIQUE INDEX.
    if (wasStripeEventProcessed(event.id)) {
      return res.status(200).json({ received: true, idempotent: true });
    }

    // Handle the subset of event types we care about.
    try {
      switch (event.type) {
        case "checkout.session.completed":
        case "invoice.payment_succeeded":
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          // Real wiring: update the subscription row in Postgres.
          break;
        case "invoice.payment_failed": {
          // Real wiring: pull customer email + lastInvoiceUrl from event.data.object.
          const obj = event.data.object as {
            customer_email?: string;
            hosted_invoice_url?: string;
            customer_name?: string;
          };
          if (obj.customer_email) {
            await sendBillingFailedEmail({
              to: obj.customer_email,
              customerName: obj.customer_name,
              lastInvoiceUrl: obj.hosted_invoice_url,
            });
          }
          break;
        }
        default:
          break;
      }
      markStripeEventProcessed(event.id);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "unknown";
      // 500 → Stripe will retry. Don't mark processed.
      return res.status(500).json({ error: `processing failed: ${msg}` });
    }

    return res.status(200).json({ received: true });
  },
);

// After the webhook route: JSON parser + Clerk middleware for everything else.
app.use(express.json());
app.use(clerkMiddleware({ secretKey: CLERK_SECRET_KEY, publishableKey: CLERK_PUBLISHABLE_KEY }));

// ponytail: Clerk's `requireAuth()` is deprecated in v2.x (it 302-redirects
// to `/sign-in` instead of returning 401, which causes issues for a JSON
// API). Use the equivalent manual check: clerkMiddleware has already
// attached `req.auth()`; if `userId` is missing → 401.
type AuthedRequest = express.Request & { auth: () => { userId?: string } };
function requireClerkAuth(
  handler: (req: AuthedRequest, res: express.Response) => Promise<unknown>,
): express.RequestHandler {
  return async (req, res, _next) => {
    const auth = (req as AuthedRequest).auth;
    const userId = auth?.()?.userId;
    if (!userId) {
      res.status(401).json({ error: "unauthenticated" });
      return;
    }
    await handler(req as AuthedRequest, res);
  };
}

app.post(
  "/api/checkout",
  requireClerkAuth(async (req, res) => {
    const { priceId, successUrl, cancelUrl } = (req.body ?? {}) as {
      priceId?: string;
      successUrl?: string;
      cancelUrl?: string;
    };
    if (!priceId) return res.status(400).json({ error: "missing priceId" });
    try {
      const { userId } = req.auth();
      const session = await createCheckoutSession({
        priceId,
        successUrl: successUrl ?? `${CORS_ORIGIN}/dashboard`,
        cancelUrl: cancelUrl ?? `${CORS_ORIGIN}/pricing`,
      });
      return res.status(200).json({ url: session.url, id: session.id, userId });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "unknown";
      return res.status(500).json({ error: `checkout failed: ${msg}` });
    }
  }),
);

app.get(
  "/api/portal",
  requireClerkAuth(async (_req, res) => {
    try {
      const { userId } = (_req as express.Request & { auth: () => { userId?: string } }).auth();
      // Real wiring: look up the user's stripe_customer_id and use that here.
      const customerId = userId ?? "cus_scaffold_placeholder";
      const portal = await createPortalSession(customerId, `${CORS_ORIGIN}/dashboard`);
      return res.status(200).json({ url: portal.url });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "unknown";
      return res.status(500).json({ error: `portal failed: ${msg}` });
    }
  }),
);

// Static SPA assets.
app.use(express.static("dist"));

// ponytail: SPA fallback should NEVER swallow /api/* routes. If we got
// here via a /api/* path, the requested API endpoint doesn't exist; we
// return 404 instead of serving index.html.
app.use("/api/*", (_req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// SPA fallback — for client-side routing. Anything that isn't /api/* and
// isn't a static file gets the SPA shell.
app.get("*", (_req, res) => {
  res.sendFile("dist/index.html", { root: process.cwd() }, (err) => {
    if (err) {
      res.status(500).json({ error: "SPA not built; run `npm run build` first." });
    }
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[tier2-saas-bundle] server listening on http://localhost:${PORT}`);
});
