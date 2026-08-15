// vite.config.ts — Tier 2 SaaS bundle skeleton
// Vite 8 + React + Tailwind v4 + `@/*` alias. `build.outDir` matches
// `server.ts`'s `express.static('dist')` so a single Node process can serve
// the SPA + API in production.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: Number(process.env.VITE_PORT) || 5173,
    strictPort: true,
    // ponytail: dev proxy so the SPA can call /api/* without CORS.
    // In dev, Vite (5173) proxies /api/* → Express (PORT, default 3000).
    proxy: {
      "/api": {
        target: `http://localhost:${process.env.PORT || 3000}`,
        changeOrigin: true,
      },
    },
  },
});
