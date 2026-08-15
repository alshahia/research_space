// app/_layout.tsx — Tier 2 mobile skeleton (Expo Router root layout)
//
// Expo Router file structure: `_layout.tsx` is the root layout that wraps
// every route in the app. The same shape works for both Expo and Capacitor
// targets via the runtime toggle in `mobile.config.ts`.
//
// Wrapper primitives: the `<View>` and `<Text>` components below are inline
// DOM-friendly wrappers. They render as `div` and `span` for the Vite test
// environment (jsdom). PRODUCTION EXPO BUILDS swap these wrappers for the
// `react-native` imports — the file shape is the spine, the runtime primitives
// are tier-specific. This is the lazy pattern: small spine, swap-at-deploy.
//
// Mirror tier1-standard's `<App />` shape (h1 + locale) + mobile-specific
// extras (deep-link scheme + active target indicator).
import tierConfig from "../tier.config.json";
import { cn } from "../src/lib/utils";

// ponytail: inline primitives. Production Expo swaps these for `react-native`.
// The wrapper is a single file that exports the four primitives the app uses.
type ViewProps = React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode };
type TextProps = React.HTMLAttributes<HTMLSpanElement> & { children?: React.ReactNode };

export function View({ children, className, ...rest }: ViewProps): React.ReactElement {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}

export function Text({ children, className, ...rest }: TextProps): React.ReactElement {
  return (
    <span className={className} {...rest}>
      {children}
    </span>
  );
}

export interface RootLayoutProps {
  children?: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  return (
    <View
      data-testid="root-layout"
      className={cn("min-h-screen", "flex flex-col items-center justify-center", "p-8", "max-w-3xl", "mx-auto")}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <Text className="text-4xl font-semibold tracking-tight" data-testid="app-title">
        {tierConfig.title}
      </Text>
      <Text className="mt-4 text-base text-neutral-600" data-testid="app-description">
        Tier 2 mobile spine — multi-target: Expo SDK 57 OR Capacitor 7, toggled via mobile.config.ts.
      </Text>
      <Text className="mt-2 text-sm text-neutral-500" data-testid="locale-indicator">
        Locale: {tierConfig.locale} ({tierConfig.dir})
      </Text>
      <Text className="mt-2 text-sm text-neutral-500" data-testid="target-indicator">
        Mobile target: {tierConfig.mobile.target} · Bundle ID: {tierConfig.mobile.appId} · Scheme: {tierConfig.mobile.deepLinkScheme}
      </Text>
      {children}
    </View>
  );
}
