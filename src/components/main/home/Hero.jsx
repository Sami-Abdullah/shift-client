import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"; // Explicit Shadcn Primitive

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] bg-brand-neutral overflow-hidden px-6 lg:px-12 pt-4">
      <div className="relative w-full h-full grayscale">
        <Image 
          src="/images/hero-banner.png" 
          alt="The Architecture of Wear" 
          fill
          priority
          className="object-cover object-top"
        />
        
        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute inset-y-0 left-0 z-20 flex flex-col justify-between p-8 md:p-16 max-w-xl">
          <div className="space-y-4 pt-12">
            <h1 className="text-4xl md:text-6xl font-normal tracking-wide text-brand-secondary leading-[1.15]">
              The <br />
              Architecture <br />
              <span className="italic font-serif">of</span> <br />
              Wear
            </h1>
            
            <div className="pt-4">
              {/* Styled purely through Shadcn outline token variants */}
              <Button 
                variant="outline" 
                className="rounded-none border-brand-primary/40 text-brand-secondary bg-transparent hover:bg-brand-secondary hover:text-brand-neutral text-[10px] uppercase tracking-[0.2em] px-6 py-5 transition-all duration-300 cursor-pointer"
              >
                Explore Collection <span className="ml-2">→</span>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}