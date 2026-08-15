import { ProductCard, type ProductCardProps } from "./ProductCard"

export type ProductGridProps = {
  products: ProductCardProps[]
  countryCode: string
  currencyCode: "usd" | "gbp" | "eur"
}

/**
 * Server component — renders a responsive product grid.
 */
export function ProductGrid({ products, countryCode, currencyCode }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((p) => (
        <ProductCard
          key={p.productId}
          productId={p.productId}
          title={p.title}
          handle={p.handle}
          thumbnail={p.thumbnail}
          price={p.price}
          currencyCode={currencyCode}
          countryCode={countryCode}
        />
      ))}
    </div>
  )
}
