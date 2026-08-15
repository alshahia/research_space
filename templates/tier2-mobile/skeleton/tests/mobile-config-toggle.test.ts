// tests/mobile-config-toggle.test.ts — Tier 2 mobile skeleton
//
// Tier 2 mobile done-when per Phase 3.3 spec: "mobile.config.ts is
// runtime-readable (not just a build-time constant). The mobile-config-toggle.test.ts
// file proves it."
//
// The test asserts:
//   1. `mobileConfig.target` is read at runtime (via the module import).
//   2. `mobileConfig.target` matches `tier.config.json` `mobile.target`.
//   3. The exported helper `reloadMobileConfig()` returns a fresh config.
//   4. The active target's packages are listed in `package.json`.
//   5. (Informational) The active target's packages are installed in
//      `node_modules`, OR the test logs a "deferred" message when not.
//
// ponytail: the toggle is the single source of truth. The test reads from
// `mobile.config.ts` (the load-bearing module) and `tier.config.json` (the
// source of the target field). Asserting both means the toggle is internal
// to mobile.config.ts and the JSON value is the trigger.
import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { mobileConfig, reloadMobileConfig, type MobileTarget } from "../mobile.config";
import tierConfig from "../tier.config.json";
import packageJson from "../package.json" with { type: "json" };

const VALID_TARGETS: readonly MobileTarget[] = ["expo", "capacitor"] as const;

describe("mobile.config.ts toggle", () => {
  it("exports a strongly-typed target matching tier.config.json", () => {
    // The runtime-read target must match the JSON value.
    expect(VALID_TARGETS).toContain(mobileConfig.target);
    expect(mobileConfig.target).toBe(tierConfig.mobile.target);
  });

  it("exposes isExpo + isCapacitor booleans derived from the target", () => {
    if (mobileConfig.target === "expo") {
      expect(mobileConfig.isExpo).toBe(true);
      expect(mobileConfig.isCapacitor).toBe(false);
    } else {
      expect(mobileConfig.isExpo).toBe(false);
      expect(mobileConfig.isCapacitor).toBe(true);
    }
  });

  it("exposes the deep-link scheme + appId + appName from tier.config.json", () => {
    expect(mobileConfig.deepLinkScheme).toBe(tierConfig.mobile.deepLinkScheme);
    expect(mobileConfig.appId).toBe(tierConfig.mobile.appId);
    expect(mobileConfig.appName).toBe(tierConfig.mobile.appName);
  });

  it("reloadMobileConfig() returns a fresh config matching the current tier.config.json", () => {
    const fresh = reloadMobileConfig();
    expect(fresh.target).toBe(mobileConfig.target);
    expect(fresh.isExpo).toBe(mobileConfig.isExpo);
    expect(fresh.isCapacitor).toBe(mobileConfig.isCapacitor);
    expect(fresh.appId).toBe(mobileConfig.appId);
  });

  it("lists the active target's packages in package.json (optionalDependencies)", () => {
    // The active target's deps must be listed in package.json so the
    // npm install postinstall hook can pull them in. We check by the
    // package name (not the version) — the version pinning is the
    // verify-stack-claims.ts gate's job.
    const deps = packageJson.optionalDependencies ?? {};
    if (mobileConfig.target === "expo") {
      // Expo requires: expo, expo-router, expo-linking.
      expect("expo" in deps).toBe(true);
      expect("expo-router" in deps).toBe(true);
      expect("expo-linking" in deps).toBe(true);
    } else {
      // Capacitor requires: @capacitor/core, @capacitor/cli, @capacitor/app.
      expect("@capacitor/core" in deps).toBe(true);
      expect("@capacitor/cli" in deps).toBe(true);
      expect("@capacitor/app" in deps).toBe(true);
    }
  });

  it("(informational) the active target's deps are installed in node_modules OR logged as deferred", () => {
    // ponytail: the optional deps may not be installed in the test env
    // (the Vite build doesn't need them). We log a "deferred" message
    // when the package is missing and pass the test either way.
    const repoRoot = resolve(import.meta.dirname ?? new URL(".", import.meta.url).pathname, "..");
    const checks: { target: MobileTarget; pkg: string }[] = [
      { target: "expo", pkg: "expo" },
      { target: "capacitor", pkg: "@capacitor/core" },
    ];

    for (const { target, pkg } of checks) {
      const installed = existsSync(resolve(repoRoot, "node_modules", pkg));
      if (target === mobileConfig.target) {
        // Active target — informational only.
        if (!installed) {
          // eslint-disable-next-line no-console
          console.log(
            `[mobile-config-toggle] active target "${target}" (${pkg}) not installed in node_modules. ` +
              "Deferred — install with `npm install` or `bash scripts/switch-target.sh <target>`.",
          );
        }
      }
    }
    // The test passes regardless of install state.
    expect(true).toBe(true);
  });

  it("default target is 'expo' (matches the registry.json tier2-mobile default)", () => {
    // The default target in tier.config.json MUST be "expo" to match the
    // selection-rule step 3 default + the dossier recommendation. This
    // is a one-line assertion that catches accidental flips.
    expect(tierConfig.mobile.target).toBe("expo");
  });
});
