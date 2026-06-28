import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const DATE_FILTERS = ["All", "Today", "This Week", "This Month"];

export default function OrdersFilter({
  search, onSearch,
  statusFilter, onStatusFilter, filters,
  dateFilter, onDateFilter,
}) {
  return (
    <div className="flex flex-col gap-3 mb-8">

      {/* Row 1: search + date */}
      <div className="flex items-center gap-3">
        <div className="relative max-w-xs w-full">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search by order ID or customer..."
            className="pl-8 h-9 rounded-none bg-muted border-border text-foreground placeholder:text-muted-foreground text-[11px] focus-visible:ring-0 focus-visible:border-foreground/30"
          />
        </div>

        {/* Date filter */}
        <div className="flex items-center gap-1">
          {DATE_FILTERS.map((d) => (
            <button
              key={d}
              onClick={() => onDateFilter(d)}
              className={`px-3 py-2 text-[9px] font-bold tracking-[0.14em] uppercase transition-colors border ${
                dateFilter === d
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Row 2: status filters */}
      <div className="flex items-center gap-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => onStatusFilter(f)}
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