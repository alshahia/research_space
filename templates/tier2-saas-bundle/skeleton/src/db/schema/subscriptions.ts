// src/db/schema/subscriptions.ts — Tier 2 SaaS bundle skeleton
// Drizzle schema placeholder for the subscriptions table. Documented here
// for deploy-time migration (Postgres). On the scaffold, the spine uses an
// in-memory stub mirroring `templates/tier1-standard/skeleton/src/db/DatabaseProvider.tsx`.
// No real Postgres on Windows host per Phase 2 Q5 deferral.
//
// Migration (deployed separately, NOT in this skeleton):
//   drizzle-kit generate
//   drizzle-kit migrate
//
// External keys stored on the row:
//   - stripe_customer_id: string | null — Stripe Customer ID (from /api/checkout)
//   - stripe_subscription_id: string | null — Stripe Subscription ID (from webhook)
//
// State machine derived from Stripe webhook events:
//   NONE -> TRIALING (checkout.session.completed with subscription)
//   TRIALING -> ACTIVE (invoice.payment_succeeded)
//   ACTIVE -> PAST_DUE (invoice.payment_failed)
//   PAST_DUE -> CANCELED (customer.subscription.deleted)
//   * -> IDEMPOTENT_RETRIES use Stripe event.id as the idempotency key.
//
// ponytail: pure type; no runtime initialization. The actual SQL types map
// at deploy time via drizzle-kit; this file is the canonical shape.
export type SubscriptionStatus =
  | "NONE"
  | "TRIALING"
  | "ACTIVE"
  | "PAST_DUE"
  | "CANCELED";

export interface SubscriptionRow {
  id: string;
  userId: string;
  plan: "free" | "pro" | "team";
  status: SubscriptionStatus;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  currentPeriodEnd: string | null; // ISO 8601
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

/**
 * Idempotency-keyed processed-Stripe-event set. The webhook handler checks
 * event.id before applying side effects. In a real deployment this is a
 * Postgres UNIQUE INDEX on a `processed_stripe_events(event_id)` table;
 * the in-memory Set below is the scaffold-time stand-in.
 */
const processedStripeEventIds = new Set<string>();

export function wasStripeEventProcessed(eventId: string): boolean {
  return processedStripeEventIds.has(eventId);
}

export function markStripeEventProcessed(eventId: string): void {
  processedStripeEventIds.add(eventId);
}

/** Test helper. */
export function _resetProcessedStripeEventsForTest(): void {
  processedStripeEventIds.clear();
}
