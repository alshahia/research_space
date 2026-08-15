import Link from "next/link"

export type ProductCardProps = {
  productId: string
  title: string
  handle: string
  thumbnail: string
  price: number // cents
  currencyCode: "usd" | "gbp" | "eur"
  countryCode: string
}

/**
 * Server component — renders a single product card. No client JS shipped.
 * Click → /[countryCode]/products/[handle]
 */
export function ProductCard({
  title,
  handle,
  thumbnail,
  price,
  currencyCode,
  countryCode,
}: ProductCardProps) {
  const formatted = new Intl.NumberFormat(countryCodeToLocale(countryCode), {
    style: "currency",
    currency: currencyCode.toUpperCase(),
  }).format(price / 100)
  return (
    <Link href={`/${countryCode}/products/${handle}`} className="product-card block">
      <img src={thumbnail} alt={title} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-2 font-medium">{title}</h3>
      <p className="text-sm text-neutral-600">{formatted}</p>
    </Link>
  )
}

function countryCodeToLocale(countryCode: string): string {
  switch (countryCode) {
    case "us":
      return "en-US"
    case "gb":
      return "en-GB"
    case "de":
      return "de-DE"
    default:
      return "en-US"
  }
}
