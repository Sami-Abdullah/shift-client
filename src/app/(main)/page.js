import React from 'react';

import Hero from '@/components/main/home/Hero';
import Ethos from '@/components/main/home/Ethos';
import FeaturedPieces from '@/components/main/home/FeaturedPieces';

import ConstructionBanner from '@/components/main/home/ConstructionBanner';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-neutral flex flex-col justify-between">
      <div>
        <main>
          <Hero />
          <Ethos />
          <ConstructionBanner/>
          <FeaturedPieces />
        </main>
      </div>

    </div>
  );
}

