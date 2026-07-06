"use client";
import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SORT_OPTIONS = [
  { value: "newest",     label: "Featured" },
  { value: "price_asc",  label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

export default function CollectionHeader({ sort, total }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSort = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const currentLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label || "Sort By";

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
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-sans pt-1">
            {total} {total === 1 ? "Piece" : "Pieces"}
          </p>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-between gap-4 border border-zinc-800 bg-transparent px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] text-zinc-300 hover:border-zinc-600 transition-colors rounded-none outline-none cursor-pointer font-sans min-w-[120px]">
              {currentLabel}
              <ChevronDown className="h-3 w-3 text-zinc-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-none border-zinc-800 bg-zinc-950 text-zinc-300 min-w-[140px]">
              {SORT_OPTIONS.map((opt) => (
                <DropdownMenuItem
                  key={opt.value}
                  onClick={() => handleSort(opt.value)}
                  className="text-[10px] uppercase tracking-wider focus:bg-zinc-900 focus:text-zinc-100 rounded-none cursor-pointer py-2"
                >
                  {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="md:hidden flex items-center gap-2 bg-zinc-100 text-zinc-950 px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-medium transition-opacity hover:opacity-90 cursor-pointer font-sans">
            Filters
            <SlidersHorizontal className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}