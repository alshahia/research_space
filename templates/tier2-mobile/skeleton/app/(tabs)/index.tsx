// app/(tabs)/index.tsx — Tier 2 mobile skeleton (default route / home tab)
//
// Expo Router file structure: the `(tabs)` group is the main tab bar.
// `index.tsx` is the default route (the home tab). The same file works in
// both Expo and Capacitor targets via the toggle in `mobile.config.ts`.
//
// The spine ships a minimal "Welcome" view. Production builds wire the
// user's actual home screen (e.g. a dashboard, a feed, a game board).
import { View, Text } from "../_layout";

export default function HomeTab(): React.ReactElement {
  return (
    <View
      data-testid="home-tab"
      data-default-route="true"
      className="mt-8 w-full flex flex-col gap-3"
    >
      <Text className="text-2xl font-semibold" data-testid="home-tab-title">
        Welcome to tier2-mobile
      </Text>
      <Text className="text-sm text-neutral-600" data-testid="home-tab-body">
        This is the default route. The smoke test renders this View + the
        title above to verify the app boots end-to-end.
      </Text>
    </View>
  );
}
