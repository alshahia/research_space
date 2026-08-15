import Link from "next/link"
import type { ReactNode } from "react"

const SUPPORTED = new Set(["us", "gb", "de"])
const COUNTRIES = [
  { code: "us", label: "US" },
  { code: "gb", label: "GB" },
  { code: "de", label: "DE" },
]

export default function CountryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b py-4 px-6 flex items-center justify-between">
        <Link href="/" className="font-bold">
          Tier2 Storefront
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/products" className="text-sm hover:underline">
            Shop
          </Link>
          <Link href="/cart" className="text-sm hover:underline">
            Cart
          </Link>
          <div className="flex gap-1 text-xs">
            {COUNTRIES.map((c) => (
              <Link key={c.code} href={`/${c.code}`} className="text-neutral-500">
                {c.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t mt-12 py-8 px-6 text-sm text-neutral-600">
        <div className="max-w-6xl mx-auto">
          <p>Path B — Medusa 2 + Next.js 15 + Stripe</p>
        </div>
      </footer>
    </div>
  )
}

void SUPPORTED
