// capacitor.config.ts — Tier 2 mobile skeleton (Capacitor target)
//
// Capacitor 7 configuration. The `webDir: "dist"` key is the load-bearing
// field that ties the Vite build output to the native shell. The
// `cap-doctor.test.ts` verifies these fields are present + correctly typed.
//
// ponytail: one literal config object. No plugin sprawl, no per-platform
// config schema. The `ios` + `android` blocks are optional; the defaults
// cover the common case (universal links + haptics + keyboard handling).
import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.tier2mobile",
  appName: "tier2-mobile",
  webDir: "dist",
  // Bundled web output is the Vite production build; override with
  // server.url during development.
  server: {
    androidScheme: "https",
  },
  ios: {
    contentInset: "automatic",
    backgroundColor: "#ffffff",
  },
  android: {
    backgroundColor: "#ffffff",
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: "#ffffff",
    },
  },
};

export default config;
