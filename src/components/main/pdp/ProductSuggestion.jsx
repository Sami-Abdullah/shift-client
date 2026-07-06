import Link from "next/link";
import Image from "next/image";

export default function ProductSuggestion({ products }) {
  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-left">
        <div className="flex justify-between items-end pb-8 border-b border-border mb-12">
          <h3 className="text-heading" style={{ fontSize: "18px" }}>
            Complete The Look
          </h3>
          <Link href="/collections" className="text-label hover:text-brand-secondary transition-colors">
            View Collection →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {products.map((item) => (
            <Link key={item._id} href={`/collections/product/${item._id}`} className="group block space-y-3">
              <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                <Image
                  src={item.images?.[0]}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                  unoptimized
                />
              </div>
              <div className="flex justify-between items-start pt-1">
                <div className="space-y-0.5">
                  <span className="text-caption uppercase tracking-widest">{item.category}</span>
                  <h4 className="text-data font-medium group-hover:text-brand-secondary transition-colors">{item.name}</h4>
                </div>
                <span className="text-data">${item.price.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}