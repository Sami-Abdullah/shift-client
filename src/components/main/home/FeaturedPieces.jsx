import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedPieces({ products }) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-brand-neutral px-6 lg:px-12 py-20 border-t border-border">
      <div className="flex justify-between items-end mb-16">
        <div className="space-y-1">
          <p className="text-eyebrow">Volume 01</p>
          <h3 className="text-heading" style={{ fontSize: "20px" }}>
            Featured Pieces
          </h3>
        </div>
        <Link
          href="/collections"
          className="text-label hover:text-brand-secondary border-b border-transparent hover:border-brand-secondary pb-0.5 transition-all"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/collections/product/${product._id}`}
            className="flex flex-col space-y-4 w-full group"
          >
            <div className="relative aspect-[3/4] w-full bg-muted border border-border overflow-hidden">
              <div className="relative w-full h-full grayscale contrast-115 brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-102 transition-all duration-500 ease-out">
                <Image
                  src={product.images?.[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>

            <div className="flex justify-between items-start pt-1">
              <div className="space-y-0.5">
                <h4 className="text-data font-medium uppercase group-hover:text-brand-secondary transition-colors">
                  {product.name}
                </h4>
                <p className="text-caption uppercase tracking-widest">{product.category}</p>
              </div>
              <span className="text-heading" style={{ fontSize: "15px" }}>
                ${product.price.toLocaleString()}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}