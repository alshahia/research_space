import Link from "next/link"

/**
 * Server component — site header with a country switcher (US/GB/DE).
 */
export function Header({ countryCode }: { countryCode: string }) {
  const countries = [
    { code: "us", label: "US" },
    { code: "gb", label: "GB" },
    { code: "de", label: "DE" },
  ]
  return (
    <header className="border-b py-4 px-6 flex items-center justify-between">
      <Link href={`/${countryCode}`} className="font-bold">
        Tier2 Storefront
      </Link>
      <nav className="flex items-center gap-4">
        <Link href={`/${countryCode}/products`} className="text-sm hover:underline">
          Shop
        </Link>
        <Link href={`/${countryCode}/cart`} className="text-sm hover:underline">
          Cart
        </Link>
        <div className="flex gap-1 text-xs">
          {countries.map((c) => (
            <Link
              key={c.code}
              href={`/${c.code}`}
              className={c.code === countryCode ? "font-bold underline" : "text-neutral-500"}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
