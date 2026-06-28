"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

const CATEGORIES = ["T-Shirts", "Knitwear", "Trousers", "Outerwear"];
const COLORS = [
  { name: "Black", bg: "bg-black border-zinc-800" },
  { name: "Chalk", bg: "bg-zinc-100 border-white" },
  { name: "Graphite", bg: "bg-zinc-700 border-zinc-600" },
  { name: "Tan", bg: "bg-[#bfae99] border-[#d4c3ad]" },
  { name: "Onyx Blue", bg: "bg-[#16222d] border-[#1f3140]" }
];
const SIZES = ["XS", "S", "M", "L", "XL"];

export default function FilterSidebar() {
  return (
    <aside className="w-full md:w-48 shrink-0 space-y-8 hidden md:block text-left">
      {/* Category Array */}
      <div className="space-y-3.5">
        <h4 className="text-[10px] uppercase tracking-[0.25em] font-medium text-zinc-500">Category</h4>
        <div className="space-y-2.5">
          {CATEGORIES.map((cat) => (
            <div key={cat} className="flex items-center space-x-2.5 group cursor-pointer">
              <Checkbox 
                id={cat} 
                className="rounded-none border-zinc-800 bg-transparent data-[state=checked]:bg-zinc-100 data-[state=checked]:text-zinc-950 transition-colors" 
              />
              <label htmlFor={cat} className="text-xs tracking-wide text-zinc-400 group-hover:text-zinc-200 transition-colors select-none cursor-pointer font-sans">
                {cat}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Color Grid Selector */}
      <div className="space-y-3.5">
        <h4 className="text-[10px] uppercase tracking-[0.25em] font-medium text-zinc-500">Color</h4>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => (
            <button
              key={color.name}
              className={`h-4 w-4 rounded-none border ${color.bg} focus:outline-none transition-transform hover:scale-110 cursor-pointer`}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Size Layout Array */}
      <div className="space-y-3.5">
        <h4 className="text-[10px] uppercase tracking-[0.25em] font-medium text-zinc-500">Size</h4>
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((size) => (
            <button
              key={size}
              className={`h-7 px-3 text-[10px] tracking-widest font-medium border rounded-none transition-colors cursor-pointer font-sans ${
                size === "M" 
                  ? "border-zinc-100 bg-zinc-100 text-zinc-950" 
                  : "border-zinc-800 text-zinc-400 hover:border-zinc-400 hover:text-zinc-100"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Clear State Controller */}
      <div className="pt-2">
        <button className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer font-sans">
          Clear All Filters
        </button>
      </div>
    </aside>
  );
}