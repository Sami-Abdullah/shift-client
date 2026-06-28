"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CollectionPagination() {
  return (
    <nav className="flex items-center justify-center gap-1.5 pt-16 border-t border-zinc-900 mt-12">
      <button className="h-8 w-8 flex items-center justify-center border border-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-200 transition-colors rounded-none cursor-pointer">
        <ChevronLeft className="h-3 w-3" />
      </button>
      
      <button className="h-8 w-8 text-xs font-sans border border-zinc-100 bg-zinc-100 text-zinc-950 font-medium rounded-none cursor-pointer">
        1
      </button>
      
      <button className="h-8 w-8 text-xs font-sans border border-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 transition-colors rounded-none cursor-pointer">
        2
      </button>
      
      <button className="h-8 w-8 text-xs font-sans border border-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 transition-colors rounded-none cursor-pointer">
        3
      </button>
      
      <button className="h-8 w-8 flex items-center justify-center border border-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-200 transition-colors rounded-none cursor-pointer">
        <ChevronRight className="h-3 w-3" />
      </button>
    </nav>
  );
}