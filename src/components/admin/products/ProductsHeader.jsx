import Link from "next/link";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ProductsHeader({ total, search, onSearch }) {
  return (
    <div className="mb-10">
      {/* Page title */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-0 mb-5">
            <div className="w-1 h-10 bg-foreground mr-5" />
            <h1
              className="text-[42px] font-light tracking-[0.08em] uppercase text-foreground leading-none"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Collection Inventory
            </h1>
          </div>
          <p className="text-[13px] text-muted-foreground leading-relaxed max-w-lg ml-6">
            Curating the structural essence of Ferrum. Manage existing
            silhouettes and document new arrivals.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 border border-foreground text-foreground px-6 py-3 text-[10px] font-bold tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors shrink-0 mt-2"
        >
          <Plus size={12} />
          New Entry
        </Link>
      </div>

      {/* Search + Filter bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={12}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <Input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search collection..."
            className="pl-8 h-9 rounded-none bg-muted border-border text-foreground placeholder:text-muted-foreground text-[11px] focus-visible:ring-0 focus-visible:border-foreground/30"
          />
        </div>
        <button className="flex items-center gap-2 px-4 h-9 border border-border text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
          <SlidersHorizontal size={12} />
          Filter
        </button>
      </div>
    </div>
  );
}