import { defineConfig } from "vitest/config"

/**
 * Vitest config for the Next.js storefront. jsdom env so component tests can
 * render Server Components' client-side siblings (`'use client'` components).
 * Setup file is omitted because cart-flow mocks localStorage directly in tests.
 */
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: false,
    include: ["tests/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": new URL("./src/", import.meta.url).pathname,
    },
  },
})
