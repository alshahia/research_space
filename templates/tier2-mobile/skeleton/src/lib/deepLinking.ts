// src/lib/deepLinking.ts — Tier 2 mobile skeleton
//
// Single source for deep link handling across Expo and Capacitor.
//
// - Expo: `expo-linking` provides `Linking.parse(url)` and
//   `Linking.addEventListener("url", ...)`. Universal links + custom schemes
//   both work out of the box.
//
// - Capacitor: `@capacitor/app` provides `App.addListener("appUrlOpen", ...)`
//   and `App.getLaunchUrl()`. Universal links + custom schemes both work.
//
// The two SDKs are mutually exclusive at runtime. We use dynamic imports so
// the Vite bundle doesn't ship both. The pure parser `parseDeepLink(url)` is
// fully testable in isolation; the adapter function `registerDeepLinkHandler`
// is tested via stubbed dynamic imports.
//
// ponytail: pure parser + one adapter switch. No plugin system, no per-target
// config schema, no abstract base class. The SDK is the source of truth; this
// file just glues it to the runtime toggle.
import { mobileConfig } from "../../mobile.config";

export interface ParsedDeepLink {
  /** Normalized route path (always starts with `/`). */
  route: string;
  /** Query string parsed into a flat string map. */
  params: Record<string, string>;
  /** The original URL string (for audit logs). */
  raw: string;
}

/**
 * Pure function: parse a deep link URL into a route + params.
 *
 * Format: `<scheme>://<path>?<query>` or `<universal-host>/<path>?<query>`.
 *
 * Examples:
 *   - Expo: `myapp://items/123?ref=email` → { route: "/items/123", params: { ref: "email" } }
 *   - Expo: `https://myapp.example.com/items/123?ref=email` → same shape.
 *   - Capacitor: `https://myapp.example.com/items/123?ref=email` → same shape.
 *
 * Custom-scheme URLs (e.g. `myapp://...`) interpret the URL host as the
 * first path segment (the WHATWG URL parser treats `myapp://items/123` as
 * `host=items, pathname=/123`). We re-join the host + pathname so the route
 * matches the Expo Router file structure.
 *
 * Falls back to the raw URL as the route when the URL is malformed.
 */
export function parseDeepLink(url: string): ParsedDeepLink {
  if (!url) {
    return { route: "/", params: {}, raw: url };
  }
  try {
    const u = new URL(url);
    const params: Record<string, string> = {};
    u.searchParams.forEach((v, k) => {
      params[k] = v;
    });

    // ponytail: re-join host + pathname for custom-scheme URLs. The WHATWG
    // URL parser splits `myapp://items/123` into host + pathname; we want
    // the route to be `/items/123`, not `/123`. We detect custom schemes
    // by checking if the protocol is non-http(s).
    const isHttpLike = u.protocol === "http:" || u.protocol === "https:";
    let route: string;
    if (isHttpLike) {
      // Universal link: route is the pathname (host is the domain).
      route = u.pathname || "/";
    } else {
      // Custom scheme: host is the first path segment.
      // `myapp://items/123` → host="items", pathname="/123" → route="/items/123"
      // `myapp://` → host="", pathname="" → route="/"
      const host = u.host;
      const path = u.pathname;
      if (host && path) {
        route = `/${host}${path}`;
      } else if (host) {
        route = `/${host}`;
      } else {
        route = path || "/";
      }
    }

    // ponytail: decode percent-encoded path segments. The URL parser
    // preserves the encoding (e.g. `%20` stays as-is); we decode at the
    // route boundary so consumers see the human-readable form.
    try {
      route = decodeURIComponent(route);
    } catch {
      // ponytail: malformed percent-encoding — leave the raw route.
    }

    return { route, params, raw: url };
  } catch {
    // ponytail: not a valid URL — return the raw string as the route. The
    // caller can decide whether to navigate or surface an error.
    return { route: url, params: {}, raw: url };
  }
}

/**
 * Adapter: register a handler for incoming deep links. Returns an unsubscribe
 * function. The platform-specific listener is loaded via dynamic import so the
 * Vite bundle doesn't ship both SDKs.
 *
 * Throws if the active target's SDK is not installed.
 */
export async function registerDeepLinkHandler(
  handler: (link: ParsedDeepLink) => void,
): Promise<() => void> {
  if (mobileConfig.isExpo) {
    let Linking: typeof import("expo-linking") | null = null;
    try {
      Linking = await import("expo-linking");
    } catch {
      throw new Error(
        "expo-linking not installed. Run `npm install expo expo-linking` and re-run the Expo target.",
      );
    }
    // ponytail: `addEventListener` returns a subscription with a `remove()`
    // method. The handler wraps the URL string in `parseDeepLink()`.
    const sub = Linking.addEventListener("url", ({ url }) => {
      handler(parseDeepLink(url));
    });
    return () => {
      sub?.remove?.();
    };
  }

  if (mobileConfig.isCapacitor) {
    let AppModule: typeof import("@capacitor/app") | null = null;
    try {
      AppModule = await import("@capacitor/app");
    } catch {
      throw new Error(
        "@capacitor/app not installed. Run `npm install @capacitor/app` and re-run the Capacitor target.",
      );
    }
    // ponytail: `App.addListener` returns a `PluginListenerHandle` with a
    // `remove()` method. The handler unwraps the URL string and parses it.
    const sub = await AppModule.App.addListener("appUrlOpen", ({ url }) => {
      handler(parseDeepLink(url));
    });
    return () => {
      sub.remove();
    };
  }

  throw new Error(`Unknown mobile target: ${mobileConfig.target}`);
}

/**
 * Convenience: the launch URL (the deep link that opened the app, if any).
 * Returns null when the app was launched from the home screen.
 */
export async function getLaunchUrl(): Promise<ParsedDeepLink | null> {
  if (mobileConfig.isExpo) {
    let Linking: typeof import("expo-linking") | null = null;
    try {
      Linking = await import("expo-linking");
    } catch {
      throw new Error("expo-linking not installed.");
    }
    const url = await Linking.getInitialURL();
    return url ? parseDeepLink(url) : null;
  }

  if (mobileConfig.isCapacitor) {
    let AppModule: typeof import("@capacitor/app") | null = null;
    try {
      AppModule = await import("@capacitor/app");
    } catch {
      throw new Error("@capacitor/app not installed.");
    }
    const result = await AppModule.App.getLaunchUrl();
    return result?.url ? parseDeepLink(result.url) : null;
  }

  throw new Error(`Unknown mobile target: ${mobileConfig.target}`);
}
