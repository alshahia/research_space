// src/router.tsx — Tier 2 SaaS bundle skeleton
// React Router 7 Declarative mode. All routes live under the ClerkProviderWithRouter
// root so <SignedIn> / <SignedOut> / <SignIn /> / <SignUp /> all find a
// ClerkProvider in their tree.
//
// ponytail: ClerkProviderWithRouter calls useNavigate() inside its body.
// React Router's data-router context is provided by the SAME RouterProvider
// that mounts this router, so the navigation hook works at render time.
import { type ReactElement } from "react";
import { Outlet, createBrowserRouter, type RouteObject } from "react-router-dom";
import { App } from "./App";
import { SignInPage } from "./routes/sign-in";
import { SignUpPage } from "./routes/sign-up";
import { PricingPage } from "./routes/pricing";
import { DashboardPage } from "./routes/dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ClerkProviderWithRouter } from "./components/ClerkProviderWithRouter";

const PUBLISHABLE_KEY =
  // import.meta.env is typed via `vite/client` (added to tsconfig.json types).
  // Fallback to the documented placeholder if the env var isn't set at build time.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((import.meta as any).env?.VITE_CLERK_PUBLISHABLE_KEY as string | undefined) ??
  "pk_test_replace_me";

const rootElement = (
  <ClerkProviderWithRouter publishableKey={PUBLISHABLE_KEY}>
    <Outlet />
  </ClerkProviderWithRouter>
);

export const routes: RouteObject[] = [
  {
    element: rootElement as ReactElement,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          { index: true, element: <PricingPage /> },
          { path: "pricing", element: <PricingPage /> },
          {
            path: "dashboard",
            element: (
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
