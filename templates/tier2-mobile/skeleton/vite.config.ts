// vite.config.ts — Tier 2 mobile skeleton
// ponytail: Vite + React + Tailwind v4 plugin + Vitest. Mirrors tier1 conventions.
// The build entry is `src/main.tsx` (mount entry that imports the Expo Router
// root layout + default route). The `dist/` output is:
//
//   - Expo target: consumed by `npx expo export` (which wraps the web bundle for
//     React Native). The spine ships the Vite build; the user runs `npx expo
//     export` separately when shipping.
//   - Capacitor target: `webDir: "dist"` in `capacitor.config.ts` points at this
//     directory; Capacitor wraps it for native iOS/Android.
//
// The `app/_layout.tsx` is the Expo Router file-structure root (matches the
// dispatch spec). The Vite entry is `src/main.tsx` so the build pulls in the
// full route tree (not just the layout).
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
