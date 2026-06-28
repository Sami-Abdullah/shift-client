import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Column Overcoat',
    material: 'Italian Virgin Wool',
    price: '$1,180',
    src: '/images/p1x.jpg',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 2,
    name: 'Crease Trouser',
    material: 'Architectural Grain',
    price: '$450',
    src: '/images/p1.png',
    aspect: 'aspect-[1/1] md:mt-16'
  },
  {
    id: 3,
    name: 'Monolith Knit',
    material: 'Heavy-Gauge Cashmere',
    price: '$920',
    src: '/images/p2.png',
    aspect: 'aspect-[3/4]'
  }
];

export default function FeaturedPieces() {
  return (
    <section className="w-full bg-brand-neutral px-6 lg:px-12 py-20 border-t border-white/5">
      <div className="flex justify-between items-end mb-16">
        <div className="space-y-1">
          <h3 className="text-lg font-normal tracking-wider uppercase font-serif text-brand-secondary">
            Featured Pieces
          </h3>
          <p className="text-[9px] uppercase tracking-[0.25em] text-brand-primary/30">
            Volume 01 / Concrete Shadows
          </p>
        </div>
        <Link href="#" className="text-[10px] uppercase tracking-[0.2em] text-brand-primary/50 hover:text-brand-secondary border-b border-transparent hover:border-brand-secondary pb-0.5 transition-all">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {products.map((product) => (
          <div key={product.id} className={`flex flex-col space-y-4 w-full group ${product.aspect}`}>
            
            {/* Visual Frame Wrapper */}
            <div className="relative w-full h-full bg-zinc-950 border border-white/5 overflow-hidden p-2">
              
              {/* 
                THE TRICK: 
                - Default layout: grayscale, contrast boost, and slight dimness to fit the dark aesthetic.
                - Group Hover: Fades perfectly to normal colors (grayscale-0, brightness-100) and scales up slightly.
              */}
              <div className="relative w-full h-full grayscale contrast-115 brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-102 transition-all duration-500 ease-out">
                <Image 
                  src={product.src} 
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Price & Name Specs Line */}
            <div className="flex justify-between items-start pt-1 text-[11px] tracking-wide">
              <div className="space-y-0.5">
                <h4 className="text-brand-secondary font-medium uppercase">{product.name}</h4>
                <p className="text-[10px] uppercase text-brand-primary/40 font-sans tracking-widest">{product.material}</p>
              </div>
              <span className="text-brand-secondary font-serif">{product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}