import React from 'react';
import Image from 'next/image';

export default function ConstructionBanner() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] bg-brand-neutral overflow-hidden px-6 lg:px-12 py-4">
      <div className="relative w-full h-full border border-white/5">
        <Image
          src="/images/craft3.jpg"
          alt="The Architecture of Construction Process"
          fill
          className="object-cover object-center" // Original rich process lighting
        />

        {/* Transparent linear vignette layout for readable overlay text */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-neutral/80 via-brand-neutral/20 to-transparent" />

        <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 max-w-2xl space-y-4">
          <h2 className="text-3xl md:text-5xl font-normal tracking-wide text-brand-secondary leading-tight">
            The Architecture <br />
            <span className="italic font-serif">of</span> Construction
          </h2>

          <p className="text-[11px] leading-relaxed text-brand-primary/70 tracking-wider font-sans max-w-md">
            Every garment is a structural system. From raw scarlet threads to final geometric silhouettes, our design process is governed by strict architectural principles. Meaningful balance is engineered into every fold.
          </p>
        </div>
      </div>
    </section>
  );
}