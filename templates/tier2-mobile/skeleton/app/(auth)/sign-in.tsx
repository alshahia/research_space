// app/(auth)/sign-in.tsx — Tier 2 mobile skeleton (sign-in route)
//
// Expo Router file structure: the `(auth)` group isolates unauthenticated
// routes from the main tab bar. The sign-in route is the canonical entry
// point for OAuth (Clerk Expo handles Apple/Google sign-in + magic links).
//
// The spine ships a minimal stub. Production Expo builds wire the Clerk
// Expo `<SignIn />` component or the Supabase Auth `signInWithOAuth` flow.
// The test renders the stub and asserts the headline text.
import { View, Text } from "../_layout";

export default function SignIn(): React.ReactElement {
  return (
    <View data-testid="sign-in-route" className="mt-8 w-full flex flex-col gap-3">
      <Text className="text-2xl font-semibold" data-testid="sign-in-title">
        Sign in
      </Text>
      <Text className="text-sm text-neutral-600" data-testid="sign-in-hint">
        Wire Clerk Expo (&lt;SignIn /&gt;) or Supabase Auth (signInWithOAuth) here.
      </Text>
    </View>
  );
}
