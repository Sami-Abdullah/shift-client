import React from "react";

export default function ProductSpecs() {
  return (
    <section className="border-t border-zinc-900 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-left">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Section Heading Label */}
          <div className="md:col-span-4">
            <h2 className="text-xl font-serif font-normal tracking-wide text-zinc-100 uppercase">
              Form & <br /> Material
            </h2>
          </div>

          {/* Technical Details Framework */}
          <div className="md:col-span-8 space-y-8 max-w-2xl">
            <p className="text-xs text-zinc-400 tracking-wide font-sans leading-relaxed">
              Ferrums design philosophy is rooted in the dialogue between the human form and the spaces we inhabit. The Column Overcoat was conceived as a piece of "wearable architecture," designed to echo the clean, unforgiving lines of modernist concrete structures.
            </p>

            {/* Matrix Parameters Column Layout */}
            <div className="grid grid-cols-2 gap-8 pt-4 border-t border-zinc-900/60">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-medium">Composition</span>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  90% Virgin Wool<br />
                  10% Cashmere Blend<br />
                  Bemberg Lining
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-medium">Origin</span>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  Designed in Paris<br />
                  Fabric from Italy<br />
                  Assembled in Portugal
                </p>
              </div>
            </div>

            <p className="text-[11px] italic text-zinc-500 font-sans pt-4">
              Every button is carved from genuine horn, hand-polished to a matte finish that absorbs light, echoing the noir aesthetic of the Ferrum universe.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}