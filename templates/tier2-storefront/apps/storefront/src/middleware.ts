import { NextResponse, type NextRequest } from "next/server"

/**
 * Country-code detection + redirect. Only three countries are supported (US, GB, DE);
 * countryCode becomes the first route segment in App Router.
 *
 * Example:
 *   GET /                          → 307 → /us
 *   GET /products/sweater          → 307 → /us/products/sweater
 *   GET /gb/cart                   → pass through (countryCode is valid)
 *   GET /fr                        → 307 → /us (unsupported → default)
 */

const SUPPORTED = new Set(["us", "gb", "de"])
const DEFAULT_CC = "us"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Strip trailing slash for comparison.
  const first = pathname.replace(/^\//, "").split("/")[0]?.toLowerCase() ?? ""

  if (SUPPORTED.has(first)) return NextResponse.next()

  // No (or invalid) countryCode → redirect to default.
  const url = req.nextUrl.clone()
  url.pathname = `/${DEFAULT_CC}${pathname === "/" ? "" : pathname}`
  return NextResponse.redirect(url, 307)
}

export const config = {
  // Skip Next.js internals + static assets + API routes; only run on page paths.
  matcher: ["/((?!_next|api|favicon|.*\\..*).*)"],
}
