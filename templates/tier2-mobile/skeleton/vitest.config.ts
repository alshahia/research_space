// vitest.config.ts — Tier 2 mobile skeleton
// ponytail: jsdom env + globals + @testing-library matchers. One file, no plugin sprawl.
// Mirrors tier1-standard + tier2-ai-chat conventions.
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [],
    include: ["tests/**/*.test.{ts,tsx}"],
    css: false,
  },
});
