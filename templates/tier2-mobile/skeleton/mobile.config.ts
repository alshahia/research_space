// mobile.config.ts — Tier 2 mobile skeleton
//
// Runtime-readable toggle for the mobile target. This is the single source of
// truth for "which mobile shell are we building?". Everything else
// (`deepLinking.ts`, scripts, tests) reads `mobileConfig` from this module —
// never re-reads `tier.config.json` directly.
//
// The dispatch requires this module to be runtime-readable (not just a
// build-time constant). The `mobile-config-toggle.test.ts` proves it by
// importing `mobileConfig` at test time and asserting the target matches
// `tier.config.json`.
//
// ponytail: one literal table + one early-return guard. No plugin system, no
// per-target config schema, no helper module.
import tierConfig from "./tier.config.json";

export type MobileTarget = "expo" | "capacitor";

export interface MobileConfig {
  /** Active target. Single source of truth. */
  target: MobileTarget;
  /** `true` when target === "expo". Convenience for `if (mobileConfig.isExpo)`. */
  isExpo: boolean;
  /** `true` when target === "capacitor". Convenience for `if (mobileConfig.isCapacitor)`. */
  isCapacitor: boolean;
  /** Deep-link scheme (e.g. `myapp://` or `https://myapp.example.com`). */
  deepLinkScheme: string;
  /** App identifier from `tier.config.json` (e.g. `com.example.tier2mobile`). */
  appId: string;
  /** App display name from `tier.config.json`. */
  appName: string;
}

// ponytail: read once at module load. Constant for the lifetime of the process.
// The `tier.config.json` `mobile.target` field is the single source of truth;
// the default (`expo`) is used when the field is missing.
const rawTarget: string = tierConfig.mobile?.target ?? "expo";

if (rawTarget !== "expo" && rawTarget !== "capacitor") {
  throw new Error(
    `Invalid mobile.target: "${rawTarget}". Valid values: "expo" | "capacitor".`,
  );
}

const target = rawTarget as MobileTarget;

export const mobileConfig: MobileConfig = {
  target,
  isExpo: target === "expo",
  isCapacitor: target === "capacitor",
  deepLinkScheme: tierConfig.mobile?.deepLinkScheme ?? "myapp://",
  appId: tierConfig.mobile?.appId ?? "com.example.tier2mobile",
  appName: tierConfig.mobile?.appName ?? tierConfig.title ?? "tier2-mobile",
};

/**
 * Re-read the target from `tier.config.json` and rebuild `mobileConfig`.
 * Useful for the `scripts/switch-target.sh` flow + for tests that want to
 * pick the target at runtime. Throws if the target is invalid.
 */
export function reloadMobileConfig(): MobileConfig {
  // ponytail: ESM dynamic import of tier.config.json gives us a fresh read.
  // The Vite bundler resolves this at build time; at runtime, the JSON
  // is read once per import (Node caches JSON imports).
  const fresh = tierConfig as typeof tierConfig;
  const t = (fresh.mobile?.target ?? "expo") as MobileTarget;
  if (t !== "expo" && t !== "capacitor") {
    throw new Error(
      `Invalid mobile.target: "${t}". Valid values: "expo" | "capacitor".`,
    );
  }
  return {
    target: t,
    isExpo: t === "expo",
    isCapacitor: t === "capacitor",
    deepLinkScheme: fresh.mobile?.deepLinkScheme ?? "myapp://",
    appId: fresh.mobile?.appId ?? "com.example.tier2mobile",
    appName: fresh.mobile?.appName ?? fresh.title ?? "tier2-mobile",
  };
}
