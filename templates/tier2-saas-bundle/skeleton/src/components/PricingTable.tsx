// src/components/PricingTable.tsx — Tier 2 SaaS bundle skeleton
// 3 plan cards: Free / Pro / Team. "Subscribe" POSTs to /api/checkout with
// the Stripe Price ID (env-driven; replace with real IDs at deploy).
// ponytail: pricing copy + Stripe priceId envs are intake-driven; the spine
// hard-codes Free (no checkout) + Pro/Team "test" IDs as a placeholder.
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";

interface Plan {
  id: "free" | "pro" | "team";
  name: string;
  price: string;
  cadence: string;
  features: string[];
  priceId: string | null;
  highlight?: boolean;
}

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    cadence: "forever",
    features: ["1 project", "Community support", "Public docs"],
    priceId: null,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    cadence: "per month",
    features: ["Unlimited projects", "Priority email support", "Custom domains"],
    priceId: "price_pro_test_replace_me",
    highlight: true,
  },
  {
    id: "team",
    name: "Team",
    price: "$49",
    cadence: "per month",
    features: ["Everything in Pro", "Seats for 10", "SSO + audit logs"],
    priceId: "price_team_test_replace_me",
  },
];

export function PricingTable(): React.ReactElement {
  const { isSignedIn } = useUser();
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function subscribe(plan: Plan): Promise<void> {
    if (!plan.priceId) return;
    setError(null);
    setPending(plan.id);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ priceId: plan.priceId }),
      });
      const json: { url?: string; error?: string } = await res.json();
      if (!res.ok || !json.url) {
        setError(json.error ?? `Checkout failed (${res.status}).`);
        return;
      }
      window.location.href = json.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setPending(null);
    }
  }

  return (
    <div data-testid="pricing-table" className="grid gap-6 md:grid-cols-3">
      {PLANS.map((plan) => (
        <div
          key={plan.id}
          className={cn(
            "rounded-lg border p-6 shadow-sm",
            plan.highlight ? "border-brand-500 ring-2 ring-brand-500" : "border-neutral-200",
          )}
        >
          <h2 className="text-xl font-semibold">{plan.name}</h2>
          <p className="mt-2 text-3xl font-bold">
            {plan.price}
            <span className="text-sm font-normal text-neutral-500"> / {plan.cadence}</span>
          </p>
          <ul className="mt-4 space-y-2 text-sm text-neutral-700">
            {plan.features.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>
          {plan.priceId ? (
            <button
              type="button"
              disabled={pending === plan.id}
              onClick={() => subscribe(plan)}
              className={cn(
                "mt-6 w-full rounded-md px-4 py-2 text-sm font-medium text-white",
                plan.highlight
                  ? "bg-brand-500 hover:bg-brand-700"
                  : "bg-neutral-800 hover:bg-neutral-700",
                pending === plan.id && "opacity-60",
              )}
            >
              {pending === plan.id ? "Redirecting…" : isSignedIn ? "Subscribe" : "Sign in to subscribe"}
            </button>
          ) : (
            <p className="mt-6 text-center text-sm text-neutral-500">No card required</p>
          )}
        </div>
      ))}
      {error && (
        <p role="alert" className="md:col-span-3 rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
