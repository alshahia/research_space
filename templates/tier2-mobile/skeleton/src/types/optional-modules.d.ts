// src/types/optional-modules.d.ts — Tier 2 mobile skeleton
//
// Module declarations for the optional dependencies (Expo + Capacitor SDKs).
// These are NOT installed in the test environment (they're `optionalDependencies`
// in package.json). We declare the module names here so TypeScript can resolve
// the dynamic imports in `src/lib/deepLinking.ts` without failing the
// `tsc --noEmit` check.
//
// The actual types come from the real packages when they're installed. Until
// then, the dynamic imports resolve to `any` at runtime (the adapter
// function throws a helpful error if the SDK is not installed).
//
// Per the coder's `dos-and-donts.md`: "Don't import `expo-linking` or
// `@capacitor/app` as top-level imports. Use dynamic `await import()` so the
// Vite bundle doesn't ship both SDKs."
//
// ponytail: minimal stub. Only the modules + the minimum viable types
// needed for the dynamic imports to type-check.
declare module "expo-linking" {
  export interface EventSubscription {
    remove?: () => void;
  }
  export interface UrlEvent {
    url: string;
  }
  export function addEventListener(
    eventName: "url",
    handler: (event: UrlEvent) => void,
  ): EventSubscription;
  export function getInitialURL(): Promise<string | null>;
  export function parse(url: string): { path: string; queryParams: Record<string, string> };
}

declare module "@capacitor/app" {
  export interface PluginListenerHandle {
    remove(): Promise<void> | void;
  }
  export interface AppUrlOpenEvent {
    url: string;
  }
  export const App: {
    addListener(
      eventName: "appUrlOpen",
      handler: (event: AppUrlOpenEvent) => void,
    ): Promise<PluginListenerHandle>;
    getLaunchUrl(): Promise<{ url: string } | undefined>;
  };
}

// Vite client types — needed for `import.meta.env`. The build tool injects
// the env vars at build time; `vite/client` augments `ImportMeta` with the
// `env` property.
declare module "react-native" {
  // Minimal stub for the few `react-native` primitives the spine references
  // (only in JSDoc / type comments). The actual primitives are bundled with
  // Expo 57 and not installed in the test environment.
  export type View = (props: Record<string, unknown>) => unknown;
  export type Text = (props: Record<string, unknown>) => unknown;
}
