import React from 'react';
import Image from 'next/image';

export default function Ethos() {
  return (
    <section className="w-full bg-brand-neutral px-6 lg:px-12 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="relative aspect-square w-full max-w-md mx-auto border border-white/5 p-2 bg-zinc-950/40">
        <div className="relative w-full h-full">
          <Image 
            src="/images/p3.png"
            alt="Material Architecture Detail" 
            fill
            className="object-cover" // True fabric color mapping
          />
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-6 md:pl-6">
        <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-brand-primary/40 block">
          The Atelier Ethos
        </span>
        <h2 className="text-2xl md:text-3xl font-normal tracking-wide text-brand-secondary font-serif leading-snug">
          Calculated Serenity in Every Stitch.
        </h2>
        <p className="text-[11px] leading-relaxed text-brand-primary/50 tracking-wide font-sans">
          We believe clothing is the primary architecture of the body. Our pieces are defined by high-contrast precision, deliberate asymmetry, and the quiet confidence of sculptural silhouettes.
        </p>

        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 text-[10px] uppercase tracking-widest">
          <div>
            <span className="text-brand-primary/30 block mb-1">Design Studio</span>
            <span className="text-brand-primary">Fused Interiors</span>
          </div>
          <div>
            <span className="text-brand-primary/30 block mb-1">Fabric Sourcing</span>
            <span className="text-brand-secondary">Biella, Italy</span>
          </div>
        </div>
      </div>
    </section>
  );
}