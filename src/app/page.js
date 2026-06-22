import React from 'react';
import GlobalNavbar from '@/components/shared/Navbar';
import Hero from '@/components/home/Hero';
import Ethos from '@/components/home/Ethos';
import FeaturedPieces from '@/components/home/FeaturedPieces';
import GlobalFooter from '@/components/shared/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-neutral flex flex-col justify-between">
      <div>
        <main>
          <Hero />
          <Ethos />
          <FeaturedPieces />
        </main>
      </div>

    </div>
  );
}

