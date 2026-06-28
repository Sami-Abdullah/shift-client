import React from "react";
import Link from "next/link";
import Image from "next/image";

const RECOMMENDATIONS = [
  {
    name: "Rib Turtleneck",
    slug: "rib-turtleneck",
    category: "Knitwear",
    price: 340.00,
    image: "/images/pdp/look-turtleneck.jpg"
  },
  {
    name: "Pleated Column Trouser",
    slug: "pleated-column-trouser",
    category: "Trousers",
    price: 420.00,
    image: "/images/pdp/look-trouser.jpg"
  },
  {
    name: "Monolith Boot",
    slug: "monolith-boot",
    category: "Footwear",
    price: 650.00,
    image: "/images/pdp/look-boot.jpg"
  }
];

export default function ProductSuggestion() {
  return (
    <section className="border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-left">
        <div className="flex justify-between items-end pb-8 border-b border-zinc-900/60 mb-12">
          <h3 className="text-sm font-serif font-normal tracking-widest text-zinc-200 uppercase">
            Complete The Look
          </h3>
          <Link href="/collections" className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 hover:text-zinc-200 transition-colors">
            View Edition 01 →
          </Link>
        </div>

        {/* 3 Column Recommendation Matrix Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {RECOMMENDATIONS.map((item) => (
            <Link key={item.slug} href={`/collections/product/${item.slug}`} className="group block space-y-3">
              <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                />
              </div>
              <div className="flex justify-between items-start text-xs pt-1">
                <div className="space-y-0.5">
                  <span className="block text-[8px] uppercase tracking-widest text-zinc-500 font-mono">
                    {item.category}
                  </span>
                  <h4 className="font-serif font-normal text-zinc-300 group-hover:text-zinc-100 transition-colors uppercase tracking-wide text-[11px]">
                    {item.name}
                  </h4>
                </div>
                <span className="text-zinc-400 text-[11px]">${item.price.toFixed(2)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}