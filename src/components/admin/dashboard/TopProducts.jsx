import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TopProducts({ products }) {
  return (
    <div className="border border-border bg-muted p-6 flex flex-col">
      <div className="mb-6">
        <p className="text-[10px] italic text-muted-foreground mb-1" style={{ fontFamily: "var(--font-serif)" }}>
          Best Sellers
        </p>
        <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-foreground">
          Top Performing Products
        </p>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {products.length === 0 && (
          <p className="text-[12px] text-muted-foreground">No sales data yet.</p>
        )}
        {products.map((p) => (
          <div key={p._id} className="flex items-center gap-3">
            <div className="w-10 h-12 bg-background overflow-hidden shrink-0">
              <Image src={p.image} alt={p.name} width={40} height={48} className="w-full h-full object-cover" unoptimized />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-foreground truncate">{p.name}</p>
              <p className="text-[9px] text-muted-foreground mt-0.5">{p.totalSold} sold</p>
            </div>
            <p className="text-[12px] font-light text-foreground shrink-0" style={{ fontFamily: "var(--font-serif)" }}>
              ${p.revenue.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <Link href="/admin/products" className="flex items-center gap-2 text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors mt-6">
        View All Products
        <ArrowRight size={11} />
      </Link>
    </div>
  );
}