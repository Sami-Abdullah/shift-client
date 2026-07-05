"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Plus, Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";

const CATEGORIES = ["All", "Outerwear", "Knitwear", "Tops", "Bottoms", "Accessories", "Footwear"];
const STATUSES = [
  { value: "All", label: "All Status" },
  { value: "in",  label: "In Stock" },
  { value: "low", label: "Low Stock" },
  { value: "out", label: "Out of Stock" },
];

export default function ProductsHeader({ total, search, category, stockStatus }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const updateParams = (next) => {
    const params = new URLSearchParams();
    if (next.search) params.set("search", next.search);
    if (next.category && next.category !== "All") params.set("category", next.category);
    if (next.stockStatus && next.stockStatus !== "All") params.set("stockStatus", next.stockStatus);
    params.set("page", "1");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const exportUrl = process.env.NEXT_PUBLIC_API_URL + "/api/products/export";

  return (
    <div className="mb-10">
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

        <div className="flex items-center gap-3 shrink-0 mt-2">
          <a
            href={exportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-border text-muted-foreground px-4 py-2.5 text-[10px] font-bold tracking-[0.16em] uppercase hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            <Download size={12} />
            Export CSV
          </a>

          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 border border-foreground text-foreground px-6 py-3 text-[10px] font-bold tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors"
          >
            <Plus size={12} />
            New Entry
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            defaultValue={search}
            onChange={(e) => updateParams({ search: e.target.value, category, stockStatus })}
            placeholder="Search by name or SKU..."
            className="pl-8 h-9 rounded-none bg-muted border-border text-foreground placeholder:text-muted-foreground text-[11px] focus-visible:ring-0 focus-visible:border-foreground/30"
          />
        </div>

        <select
          value={category}
          onChange={(e) => updateParams({ search, category: e.target.value, stockStatus })}
          className="h-9 px-3 mz bg-muted border border-border text-[11px] text-foreground focus:outline-none focus:border-foreground/30 cursor-pointer"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-background">
              {c === "All" ? "All Categories" : c}
            </option>
          ))}
        </select>

        <select
          value={stockStatus}
          onChange={(e) => updateParams({ search, category, stockStatus: e.target.value })}
          className="h-9 px-3 bg-muted border border-border text-[11px] text-foreground focus:outline-none focus:border-foreground/30 cursor-pointer"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value} className="bg-background">
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}