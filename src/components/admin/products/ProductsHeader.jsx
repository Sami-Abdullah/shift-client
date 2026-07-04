"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Plus, Search, SlidersHorizontal, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";

export default function ProductsHeader({ total, search }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (value) => {
    const params = new URLSearchParams();
    if (value) params.set("search", value);
    params.set("page", "1");
    startTransition(() => {
      router.push(pathname + "?" + params.toString());
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

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            defaultValue={search}
            onChange={(e) => handleSearch(e.target.value)}
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