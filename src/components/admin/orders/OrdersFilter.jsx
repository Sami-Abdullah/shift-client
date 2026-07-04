"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

export default function OrdersFilter({ search, statusFilter, filters }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const updateParams = (next) => {
    const params = new URLSearchParams();
    if (next.search) params.set("search", next.search);
    if (next.status && next.status !== "All") params.set("status", next.status);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col gap-3 mb-8">
      <div className="flex items-center gap-3">
        <div className="relative max-w-xs w-full">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            defaultValue={search}
            onChange={(e) => updateParams({ search: e.target.value, status: statusFilter })}
            placeholder="Search by customer name or email..."
            className="pl-8 h-9 rounded-none bg-muted border-border text-foreground placeholder:text-muted-foreground text-[11px] focus-visible:ring-0 focus-visible:border-foreground/30"
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => updateParams({ search, status: f })}
            className={`px-3 py-2 text-[9px] font-bold tracking-[0.14em] uppercase transition-colors border ${
              statusFilter === f
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}