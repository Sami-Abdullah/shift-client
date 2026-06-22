import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] bg-brand-neutral overflow-hidden px-6 lg:px-12 pt-4">
      <div className="relative w-full h-full">
        {/* Background Asset Container */}
        <Image 
          src="/images/hero-banner.png" 
          alt="The Architecture of Wear" 
          fill
          priority
          className="object-cover object-top filter grayscale contrast-125 brightness-90"
        />
        
        {/* Absolute Shadow Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Text Positioning Box */}
        <div className="absolute inset-y-0 left-0 z-20 flex flex-col justify-between p-8 md:p-16 max-w-xl">
          <div className="space-y-4 pt-12">
            <h1 className="text-4xl md:text-6xl font-normal tracking-wide text-brand-secondary leading-[1.15]">
              The <br />
              Architecture <br />
              <span className="italic font-serif">of</span> <br />
              Wear
            </h1>
            
            <div className="pt-4">
              <Button 
                variant="outline" 
                className="rounded-none border-brand-primary/40 text-brand-secondary bg-transparent hover:bg-brand-secondary hover:text-brand-neutral text-[10px] uppercase tracking-[0.2em] px-6 py-5 transition-all duration-300 cursor-pointer"
              >
                Explore Collection <span className="ml-2">→</span>
              </Button>
            </div>
          </div>

          {/* Subtext marker found on the bottom right of the banner in layout image */}
          <div className="hidden md:block self-end text-right ml-auto max-w-[180px]">
            <p className="text-[9px] uppercase tracking-[0.25em] text-brand-primary/40 leading-relaxed">
              Autumn / Winter <br /> Edition 01: Waitlist Form
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}