"use client";
import { useState, useTransition, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Package, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchAdmin } from "@/lib/actions/admin/search";

export default function AdminSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ products: [], orders: [] });
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim().length >= 2) {
        startTransition(async () => {
          const data = await searchAdmin(query);
          setResults(data);
          setOpen(true);
        });
      } else {
        setResults({ products: [], orders: [] });
        setOpen(false);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goTo = (path) => {
    setOpen(false);
    setQuery("");
    router.push(path);
  };

  const hasResults = results.products.length > 0 || results.orders.length > 0;

  return (
    <div className="relative flex-1 max-w-xs" ref={containerRef}>
      <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.length >= 2 && setOpen(true)}
        placeholder="Search products, orders..."
        className="pl-8 h-8 text-[11px] rounded-none bg-muted border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-border"
      />

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border max-h-80 overflow-y-auto z-50">
          {!hasResults && !isPending && (
            <p className="text-caption px-3 py-3">No results found.</p>
          )}

          {results.products.length > 0 && (
            <div>
              <p className="text-label px-3 pt-3 pb-1">Products</p>
              {results.products.map((p) => (
                <button
                  key={p._id}
                  onClick={() => goTo(`/admin/products/${p._id}/edit`)}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-muted transition-colors"
                >
                  <Package size={12} className="text-muted-foreground shrink-0" />
                  <span className="text-data truncate">{p.name}</span>
                  <span className="text-data-mono ml-auto">{p.sku}</span>
                </button>
              ))}
            </div>
          )}

          {results.orders.length > 0 && (
            <div>
              <p className="text-label px-3 pt-3 pb-1">Orders</p>
              {results.orders.map((o) => (
                <button
                  key={o._id}
                  onClick={() => goTo(`/admin/orders/${o._id}`)}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-muted transition-colors"
                >
                  <ShoppingBag size={12} className="text-muted-foreground shrink-0" />
                  <span className="text-data truncate">{o.customerName}</span>
                  <span className="text-data-mono ml-auto">#{o._id.slice(-6).toUpperCase()}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}