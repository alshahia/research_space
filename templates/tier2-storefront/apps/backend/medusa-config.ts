import { defineConfig, loadEnv } from "@medusajs/framework/utils"

/**
 * Medusa 2 configuration for the tier2-storefront Path B backend.
 *
 * Env vars loaded from process.env via loadEnv.
 * Postgres + Redis URLs come from .env (DATABASE_URL, REDIS_URL).
 * In dev, Redis is optional (Medusa logs a warning but starts).
 */
void loadEnv

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS ?? "http://localhost:3000",
      adminCors: process.env.ADMIN_CORS ?? "http://localhost:9000",
      authCors: process.env.AUTH_CORS ?? "http://localhost:3000,http://localhost:9000",
      jwtSecret: process.env.JWT_SECRET ?? "replace-me-in-env",
      cookieSecret: process.env.COOKIE_SECRET ?? "replace-me-in-env",
    },
  },
  modules: {
    // Default modules — product, category, order, cart, customer, etc. Resolve from @medusajs/medusa out of the box.
  },
})
