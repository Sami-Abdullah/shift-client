"use client";
import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CollectionPagination({ current, totalPages }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <nav className="flex items-center justify-center gap-1.5 pt-16 border-t border-zinc-900 mt-12">
      <button
        onClick={() => goToPage(Math.max(1, current - 1))}
        disabled={current === 1}
        className="h-8 w-8 flex items-center justify-center border border-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-200 transition-colors rounded-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-3 w-3" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => goToPage(p)}
          className={`h-8 w-8 text-xs font-sans border rounded-none cursor-pointer transition-colors ${
            current === p
              ? "border-zinc-100 bg-zinc-100 text-zinc-950 font-medium"
              : "border-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => goToPage(Math.min(totalPages, current + 1))}
        disabled={current === totalPages}
        className="h-8 w-8 flex items-center justify-center border border-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-200 transition-colors rounded-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-3 w-3" />
      </button>
    </nav>
  );
}