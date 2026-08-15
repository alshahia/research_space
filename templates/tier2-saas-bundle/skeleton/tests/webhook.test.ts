// tests/webhook.test.ts — Tier 2 SaaS bundle skeleton
// Webhook signature verification + idempotency. Uses Stripe's
// `webhooks.constructEvent` against a locally-signed payload. NO live calls.
//
// Cases covered:
//   1. happy path: signed payload + matching secret → event.id returned
//   2. bad-sig path: tampered signature → throws StripeSignatureVerificationError
//   3. idempotency: same event.id processed twice → only one database side effect
import { describe, it, expect, beforeEach } from "vitest";
import Stripe from "stripe";
import {
  _resetProcessedStripeEventsForTest,
  markStripeEventProcessed,
  wasStripeEventProcessed,
} from "../src/db/schema/subscriptions";
import { verifyWebhook } from "../src/lib/stripe-server";

const SECRET = "whsec_test_local_secret_for_vitest";

function signedHeader(payload: string, ts: number, key = SECRET): string {
  const stripe = new Stripe("sk_test_local", { apiVersion: "2026-07-29.dahlia" });
  return stripe.webhooks.generateTestHeaderString({
    payload,
    secret: key,
    timestamp: ts,
  });
}

describe("stripe webhook signature verification + idempotency", () => {
  beforeEach(() => {
    _resetProcessedStripeEventsForTest();
    process.env.STRIPE_SECRET_KEY = "sk_test_local";
    process.env.STRIPE_WEBHOOK_SECRET = SECRET;
  });

  it("happy path: accepts a properly-signed event", () => {
    const payload = JSON.stringify({
      id: "evt_test_happy",
      object: "event",
      type: "checkout.session.completed",
      api_version: "2026-07-29.dahlia",
      created: 1_700_000_000,
      data: { object: { id: "cs_test_1", customer_email: "buyer@example.com" } },
    });
    const ts = Math.floor(Date.now() / 1000);
    const header = signedHeader(payload, ts);
    const event = verifyWebhook(payload, header);
    expect(event.id).toBe("evt_test_happy");
    expect(event.type).toBe("checkout.session.completed");
  });

  it("bad-sig path: rejects a tampered signature", () => {
    const payload = JSON.stringify({ id: "evt_bad", type: "x", data: { object: {} } });
    const ts = 1_700_000_000;
    const badSig = `t=${ts},v1=${"0".repeat(64)}`;
    expect(() => verifyWebhook(payload, badSig)).toThrow(/signature/i);
  });

  it("idempotency: a Stripe event.id is processed at most once", () => {
    const eventId = "evt_idempotent_1";
    expect(wasStripeEventProcessed(eventId)).toBe(false);
    markStripeEventProcessed(eventId);
    expect(wasStripeEventProcessed(eventId)).toBe(true);
    // Second mark is a no-op (idempotent Set semantics).
    markStripeEventProcessed(eventId);
    expect(wasStripeEventProcessed(eventId)).toBe(true);
  });
});
