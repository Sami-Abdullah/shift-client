"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ current, total, shown, totalItems }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
      <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground">
        Showing {shown} of {totalItems} products
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => goToPage(Math.max(1, current - 1))}
          disabled={current === 1}
          className="w-9 h-9 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={13} />
        </button>

        {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`w-9 h-9 flex items-center justify-center text-[11px] font-bold tracking-[0.1em] border transition-colors ${
              current === p
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
          >
            {String(p).padStart(2, "0")}
          </button>
        ))}

        <button
          onClick={() => goToPage(Math.min(total, current + 1))}
          disabled={current === total}
          className="w-9 h-9 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}