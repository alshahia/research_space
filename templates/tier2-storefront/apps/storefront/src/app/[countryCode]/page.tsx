export const dynamic = "force-dynamic"

export default async function HomePage({
  params,
}: {
  params: { countryCode: string }
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Featured</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Path B storefront — Medusa 2 + Next.js 15 + Stripe.
        </p>
      </header>
      <p className="text-sm">
        Country: <code>{params.countryCode}</code>
      </p>
    </section>
  )
}
