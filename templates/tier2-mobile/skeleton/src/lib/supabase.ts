// src/lib/supabase.ts — Tier 2 mobile skeleton
//
// Single source for the Supabase client. Both Expo and Capacitor targets
// import this module; the underlying client is the same `@supabase/supabase-js`
// package. The runtime differences (OAuth hand-off, deep-link callback URL)
// live in the platform-specific code, not in the client init.
//
// ponytail: one export. The env-var read pattern is the standard "Supabase
// works in any JS runtime" pattern — Vite + Metro both inline `import.meta.env.*`
// at build time. Production deploys MUST set these env vars (see .env.example).
import { createClient } from "@supabase/supabase-js";

// ponytail: Vite + Metro both expose the build-time env vars via
// `import.meta.env`. The "EXPO_PUBLIC_" prefix is the Expo convention;
// the "VITE_" prefix is the Vite convention. The client accepts either
// shape and prefers the Expo prefix first (Expo is the default target).
const url: string =
  (typeof import.meta.env !== "undefined" &&
    ((import.meta.env as Record<string, string | undefined>).EXPO_PUBLIC_SUPABASE_URL ??
      (import.meta.env as Record<string, string | undefined>).VITE_SUPABASE_URL)) ||
  process.env.SUPABASE_URL ||
  "https://example.supabase.co";

const anonKey: string =
  (typeof import.meta.env !== "undefined" &&
    ((import.meta.env as Record<string, string | undefined>).EXPO_PUBLIC_SUPABASE_ANON_KEY ??
      (import.meta.env as Record<string, string | undefined>).VITE_SUPABASE_ANON_KEY)) ||
  process.env.SUPABASE_ANON_KEY ||
  "public-anon-key";

/**
 * The shared Supabase client. Both Expo and Capacitor targets use this.
 * OAuth hand-off (`signInWithOAuth`) + deep-link callback URL handling
 * live in the platform-specific code (not in this file).
 */
export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
