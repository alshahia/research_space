export const dynamic = "force-dynamic"

export default function ProductsPage({
  params,
}: {
  params: { countryCode: string }
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">All products</h1>
      <p className="mt-1 text-sm text-neutral-600">
        Country: <code>{params.countryCode}</code>
      </p>
    </section>
  )
}
