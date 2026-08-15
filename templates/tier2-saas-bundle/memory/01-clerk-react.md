# 01 — Clerk React patterns

Clerk dropped `@clerk/react` (the v4 name) in favor of `@clerk/clerk-react` (v5). On this stack, the package is `@clerk/clerk-react ^5.61.3`. Server-side uses `@clerk/express ^2.1.56` — a separate package that exposes `clerkMiddleware()` + `requireAuth()`.

## Provider

```tsx
import { ClerkProvider } from "@clerk/clerk-react";

<ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
  <RouterProvider router={router} />
</ClerkProvider>
```

The publishable key (`pk_test_...` / `pk_live_...`) is safe to expose to the browser. The secret key (`sk_test_...` / `sk_live_...`) goes in `CLERK_SECRET_KEY` and is server-only.

## Hooks (client)

- `useUser()` — current user object (`{ firstName, username, ... }`); `isSignedIn: boolean`.
- `useAuth()` — current session + token access via `getToken({ template: 'foo' })`.
- `<SignedIn>` / `<SignedOut>` — render-prop-ish wrappers.
- `<SignIn />` / `<SignUp />` — pre-built UI components. Drop these inside a React Router route with `routing="virtual"` and they manage their own internal sub-routes.

## Protected routes

```tsx
import { SignedIn, RedirectToSignIn } from "@clerk/clerk-react";

export function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <RedirectToSignIn />
    </>
  );
}
```

`<RedirectToSignIn />` is a React component that renders a navigate-to-`/sign-in` if the user is signed out. Pair with `<SignedIn>` for gating.

## Server middleware

```ts
import { clerkMiddleware, requireAuth } from "@clerk/express";

app.use(clerkMiddleware({ secretKey: process.env.CLERK_SECRET_KEY }));

app.post("/api/checkout", requireAuth(), async (req, res) => {
  const { userId } = req.auth;
  // ...
});
```

`requireAuth()` 401s if the cookie/header doesn't carry a valid session. The `req.auth` namespace is then populated with `{ userId, sessionId, ... }`.

## Pitfalls

- Clerk's `<SignIn />` + `<SignUp />` use their own internal router when `routing="virtual"`, so you don't need to nested-route them in `router.tsx`. Path wildcards (`/sign-in/*`) match.
- `<UserButton />` is the dropdown widget for sign-out + account management.
- The publishable key is what bundles your Clerk app + auth flow. Two apps with different publishable keys behave as different auth providers.
