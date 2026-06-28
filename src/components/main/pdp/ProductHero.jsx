"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Truck } from "lucide-react";

export default function ProductHero() {
  const [selectedSize, setSelectedSize] = useState("M");
  const sizes = ["S", "M", "L", "XL"];

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 min-h-[calc(100vh-80px)] border-b border-zinc-900">
      {/* Left Column: Hero Image Frame */}
      <div className="relative md:col-span-7 aspect-[3/4] md:aspect-auto w-full bg-zinc-900">
        <Image
          src="/images/signin.png"
          alt="Column Overcoat Editorial View"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Right Column: Information & Actions Shelf */}
      <div className="md:col-span-5 flex flex-col justify-center p-8 sm:p-12 lg:p-16 bg-zinc-950 text-left">
        <div className="space-y-8 max-w-sm">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-medium">
              Edition 01 / External Layer
            </span>
            <h1 className="text-4xl lg:text-5xl font-normal tracking-tight text-zinc-100 font-serif uppercase leading-tight">
              Column Overcoat
            </h1>
            <p className="text-lg tracking-wide text-zinc-400 font-sans pt-1">
              $1,250
            </p>
          </div>

          <p className="text-xs text-zinc-400 tracking-wide font-sans leading-relaxed">
            A rigorous exploration of architectural silhouette. The Column Overcoat is meticulously engineered from ultra-dense charcoal wool, featuring a structured double-breasted closure and internal reinforcement to maintain its brutalist verticality.
          </p>

          {/* Size Selection Array */}
          <div className="space-y-3">
            <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-medium">
              Select Size
            </span>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-8 w-12 text-[10px] font-sans tracking-widest border transition-colors cursor-pointer ${
                    selectedSize === size
                      ? "border-zinc-100 bg-zinc-100 text-zinc-950 font-medium"
                      : "border-zinc-800 text-zinc-400 hover:border-zinc-500"
                  }`}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Checkout Actions Area */}
          <div className="space-y-4 pt-4">
            <Button className="w-full rounded-none bg-zinc-100 text-zinc-950 font-medium text-[10px] uppercase tracking-[0.25em] py-6 hover:bg-zinc-200 transition-colors cursor-pointer">
              Add To Bag
            </Button>
            
            <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.2em] text-zinc-500 pt-2">
              <button className="flex items-center gap-2 hover:text-zinc-300 transition-colors cursor-pointer">
                <Heart className="h-3 w-3" /> Fit Guide
              </button>
              <span className="flex items-center gap-2">
                <Truck className="h-3 w-3" /> Complimentary Shipping
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}