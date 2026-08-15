// src/routes/pricing.tsx — Tier 2 SaaS bundle skeleton
// Public marketing page. Renders the PricingTable + an outline.
import { PricingTable } from "@/components/PricingTable";

export function PricingPage(): React.ReactElement {
  return (
    <section className="mx-auto max-w-5xl">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">Pricing</h1>
        <p className="mt-2 text-neutral-600">Pick the plan that fits your team. Cancel any time.</p>
      </header>
      <PricingTable />
    </section>
  );
}
