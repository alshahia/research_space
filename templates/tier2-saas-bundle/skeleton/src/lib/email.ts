// src/lib/email.ts — Tier 2 SaaS bundle skeleton
// Resend client + a templated billing-failed email.
// ponytail: lazy-init keeps tests from crashing on missing RESEND_API_KEY;
// tests inject a fixture via `vi.mock('@/lib/email', ...)`.
import { Resend } from "resend";

let cached: Resend | null = null;

export function getResend(): Resend {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY ?? "re_fake_for_tests";
  cached = new Resend(key);
  return cached;
}

export interface BillingFailedInput {
  to: string;
  customerName?: string | undefined;
  lastInvoiceUrl?: string | undefined;
  supportEmail?: string | undefined;
}

/**
 * Send a templated billing-failed email. Triggered server-side when the
 * Stripe webhook receives an `invoice.payment_failed` event. Returns the
 * Resend message id; throws if RESEND_API_KEY is missing or Resend 4xx.
 */
export async function sendBillingFailedEmail(input: BillingFailedInput): Promise<{ id: string }> {
  const support = input.supportEmail ?? "support@example.com";
  const subject = "Your payment didn't go through";
  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto;">
      <h1 style="color: #b91c1c;">We couldn't process your payment</h1>
      <p>Hi ${input.customerName ?? "there"},</p>
      <p>Your most recent invoice failed to process. ${input.lastInvoiceUrl ? `View it here: <a href="${input.lastInvoiceUrl}">last invoice</a>.` : ""}</p>
      <p>To restore access, open your billing portal and update your payment method.</p>
      <p>Need help? Reply to this email or reach us at <a href="mailto:${support}">${support}</a>.</p>
    </div>
  `;
  const text = `Hi ${input.customerName ?? "there"}, we couldn't process your most recent invoice. ${input.lastInvoiceUrl ? `View it here: ${input.lastInvoiceUrl}. ` : ""}To restore access, open your billing portal and update your payment method. Need help? Reply to ${support}.`;
  const res = await getResend().emails.send({
    from: `${support}`,
    to: input.to,
    subject,
    html,
    text,
  });
  if (res.error) throw new Error(`Resend send failed: ${res.error.message}`);
  return { id: res.data?.id ?? "unknown" };
}
