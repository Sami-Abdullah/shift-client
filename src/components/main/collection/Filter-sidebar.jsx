"use client";
import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

const CATEGORIES = ["Outerwear", "Knitwear", "Tops", "Bottoms", "Accessories", "Footwear"];
const SIZES = ["XS", "S", "M", "L", "XL"];

export default function FilterSidebar({ category, size }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <aside className="w-full md:w-48 shrink-0 space-y-8 hidden md:block text-left">
      <div className="space-y-3.5">
        <h4 className="text-[10px] uppercase tracking-[0.25em] font-medium text-zinc-500">Category</h4>
        <div className="space-y-2.5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat}
              className="flex items-center space-x-2.5 group cursor-pointer"
              onClick={() => updateParam("category", category === cat ? "" : cat)}
            >
              <Checkbox
                id={cat}
                checked={category === cat}
                className="rounded-none border-zinc-800 bg-transparent data-[state=checked]:bg-zinc-100 data-[state=checked]:text-zinc-950 transition-colors"
              />
              <label htmlFor={cat} className="text-xs tracking-wide text-zinc-400 group-hover:text-zinc-200 transition-colors select-none cursor-pointer font-sans">
                {cat}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3.5">
        <h4 className="text-[10px] uppercase tracking-[0.25em] font-medium text-zinc-500">Size</h4>
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => updateParam("size", size === s ? "" : s)}
              className={`h-7 px-3 text-[10px] tracking-widest font-medium border rounded-none transition-colors cursor-pointer font-sans ${
                size === s
                  ? "border-zinc-100 bg-zinc-100 text-zinc-950"
                  : "border-zinc-800 text-zinc-400 hover:border-zinc-500"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}