// vite.config.ts — Tier 1 standard skeleton
// ponytail: Vite + React + Tailwind v4 plugin + Vitest. Single config file.
// The Tailwind v4 Vite plugin handles CSS-first `@theme` blocks in src/index.css.
// `vitest` is configured in `vitest.config.ts` (separate file) so the build/test
// commands can be split.
//
// Entry: src/main.tsx — Vite defaults to index.html, but the spec file list
// (per templates/tier1-standard/skeleton/ files) doesn't include index.html.
// Pointing `build.rollupOptions.input` at src/main.tsx keeps the entry in the
// 19-file scope while still letting `vite build` produce dist/.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2022",
    sourcemap: true,
    rollupOptions: {
      input: resolve(import.meta.dirname, "src/main.tsx"),
    },
  },
  server: {
    port: 5173,
  },
});
