// src/components/PlanBadge.tsx — Tier 2 SaaS bundle skeleton
// Pill component for the current plan (Free / Pro / Team).
// Used in the dashboard header.
import { cn } from "@/lib/utils";

const COLORS: Record<string, string> = {
  free: "bg-neutral-200 text-neutral-700",
  pro: "bg-brand-500 text-white",
  team: "bg-accent-500 text-white",
};

export function PlanBadge({ plan }: { plan: "free" | "pro" | "team" }): React.ReactElement {
  return (
    <span
      data-testid={`plan-badge-${plan}`}
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        COLORS[plan] ?? COLORS.free,
      )}
    >
      {plan}
    </span>
  );
}
