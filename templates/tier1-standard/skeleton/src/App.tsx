// src/App.tsx — Tier 1 standard skeleton
// Home page component. Renders an h1 with the app name from tier.config.json
// (loaded at build time via Vite's import.meta.glob or directly as a JSON
// import; the smoke test asserts the h1 text).
import tierConfig from "../tier.config.json";
import { cn } from "./lib/utils";

export function App(): React.ReactElement {
  return (
    <main className={cn("min-h-screen", "flex flex-col items-center justify-center", "p-8")}>
      <h1 className="text-4xl font-semibold tracking-tight">{tierConfig.title}</h1>
      <p className="mt-4 text-base text-neutral-600">
        Tier 1 standard spine — Vite + React + TypeScript + Tailwind v4 + Drizzle + Vitest.
      </p>
      <p className="mt-2 text-sm text-neutral-500">
        Locale: {tierConfig.locale} ({tierConfig.dir})
      </p>
    </main>
  );
}
