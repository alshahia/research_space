// src/routes/dashboard.tsx — Tier 2 SaaS bundle skeleton
// Protected route (wraps in <SignedIn> via ProtectedRoute). Shows the
// current plan badge + a Manage Billing button that GETs /api/portal.
//
// ponytail: in scaffold mode, the actual subscription row is loaded from
// the in-memory stub; production wires `db/schema/subscriptions.ts` to
// Postgres via Drizzle.
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { PlanBadge } from "@/components/PlanBadge";

export function DashboardPage(): React.ReactElement {
  const { user } = useUser();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function openPortal(): Promise<void> {
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/portal");
      const json: { url?: string; error?: string } = await res.json();
      if (!res.ok || !json.url) {
        setError(json.error ?? `Could not open billing portal (${res.status}).`);
        return;
      }
      window.location.href = json.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-neutral-600">
          Welcome back, {user?.firstName ?? user?.username ?? "stranger"}.
        </p>
      </header>

      <div className="rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Subscription</h2>
        <div className="mt-3 flex items-center gap-3">
          <PlanBadge plan="pro" />
          <span className="text-sm text-neutral-600">Renews monthly · active</span>
        </div>
        <button
          type="button"
          disabled={pending}
          onClick={openPortal}
          className="mt-6 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-60"
        >
          {pending ? "Opening…" : "Manage billing"}
        </button>
        {error && (
          <p role="alert" className="mt-3 rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
