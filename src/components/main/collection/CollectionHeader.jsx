"use client";

import React from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CollectionHeader() {
  return (
    <div className="space-y-8 pb-8 border-b border-zinc-900 text-left">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="space-y-2 max-w-xl">
          <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-zinc-100 font-serif">
            Collections
          </h1>
          <p className="text-xs text-zinc-400 tracking-wide font-sans leading-relaxed">
            Refined essentials for the modern wardrobe. Engineered with precision, crafted for longevity.
          </p>
        </div>

        {/* Toolbar Interaction Panel */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-between gap-4 border border-zinc-800 bg-transparent px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] text-zinc-300 hover:border-zinc-600 transition-colors rounded-none outline-none cursor-pointer font-sans min-w-[120px]">
              Sort By
              <ChevronDown className="h-3 w-3 text-zinc-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-none border-zinc-800 bg-zinc-950 text-zinc-300 min-w-[140px]">
              <DropdownMenuItem className="text-[10px] uppercase tracking-wider focus:bg-zinc-900 focus:text-zinc-100 rounded-none cursor-pointer py-2">Featured</DropdownMenuItem>
              <DropdownMenuItem className="text-[10px] uppercase tracking-wider focus:bg-zinc-900 focus:text-zinc-100 rounded-none cursor-pointer py-2">Price: Low to High</DropdownMenuItem>
              <DropdownMenuItem className="text-[10px] uppercase tracking-wider focus:bg-zinc-900 focus:text-zinc-100 rounded-none cursor-pointer py-2">Price: High to Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Drawers Toggle Control */}
          <button className="md:hidden flex items-center gap-2 bg-zinc-100 text-zinc-950 px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-medium transition-opacity hover:opacity-90 cursor-pointer font-sans">
            Filters
            <SlidersHorizontal className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}