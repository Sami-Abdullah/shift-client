import React from 'react';

import Hero from '@/components/main/home/Hero';
import Ethos from '@/components/main/home/Ethos';
import FeaturedPieces from '@/components/main/home/FeaturedPieces';
import ConstructionBanner from '@/components/main/home/ConstructionBanner';
import { getProducts } from '@/lib/api/customer/products';

export default async function HomePage() {
  let featuredProducts = [];
  try {
    const data = await getProducts({ limit: 3, sort: 'newest' });
    featuredProducts = data.products;
  } catch {
    featuredProducts = [];
  }

  return (
    <div className="min-h-screen bg-brand-neutral flex flex-col justify-between">
      <div>
        <main>
          <Hero />
          <Ethos />
          <ConstructionBanner />
          <FeaturedPieces products={featuredProducts} />
        </main>
      </div>
    </div>
  );
}