import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductFeatures() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Feature Column */}
        <div className="md:col-span-5 space-y-6 text-left">
          <div className="relative aspect-[4/3] w-full bg-zinc-900 overflow-hidden">
            <Image
              src="/images/pdp/feature-shoulder.jpg"
              alt="Precision Craft Detail View"
              fill
              className="object-cover object-center"
            />
          </div>
          <Card className="bg-zinc-900/20 ring-0 border-0 shadow-none rounded-none p-6 text-left max-w-sm">
            <CardContent className="p-0 space-y-2">
              <h3 className="text-xs font-serif font-normal tracking-wide text-zinc-200">
                Precision Craft
              </h3>
              <p className="text-[11px] leading-relaxed text-zinc-400 tracking-wide font-sans">
                The shoulder is reinforced with canvas internals to ensure a razor-sharp profile that persists through movement.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Feature Column (Offset vertically for asymmetrical rhythm) */}
        <div className="md:col-span-7 space-y-6 text-left md:pt-24">
          <div className="relative aspect-[4/5] w-full bg-zinc-900 overflow-hidden">
            <Image
              src="/images/pdp/feature-silhouette.jpg"
              alt="Textile Integrity Full Silhouette View"
              fill
              className="object-cover object-center"
            />
          </div>
          <Card className="bg-zinc-900/20 ring-0 border-0 shadow-none rounded-none p-6 text-left max-w-md">
            <CardContent className="p-0 space-y-2">
              <h3 className="text-xs font-serif font-normal tracking-wide text-zinc-200">
                Textile Integrity
              </h3>
              <p className="text-[11px] leading-relaxed text-zinc-400 tracking-wide font-sans">
                100% Virgin Wool sourced from the Biella region, treated for wind resistance without compromising the natural elegant drape.
              </p>
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
}