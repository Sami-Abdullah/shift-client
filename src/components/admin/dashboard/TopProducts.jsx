import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TopProducts({ products }) {
  return (
    <div className="border border-border bg-muted p-6 flex flex-col">
      <div className="mb-6">
        <p className="text-eyebrow mb-1">Best Sellers</p>
        <p className="text-label">Top Performing Products</p>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {products.length === 0 && (
          <p className="text-body text-muted-foreground">No sales data yet.</p>
        )}
        {products.map((p) => (
          <div key={p._id} className="flex items-center gap-3">
            <div className="w-10 h-12 bg-background overflow-hidden shrink-0">
              <Image src={p.image} alt={p.name} width={40} height={48} className="w-full h-full object-cover" unoptimized />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-data font-medium truncate">{p.name}</p>
              <p className="text-caption mt-0.5">{p.totalSold} sold</p>
            </div>
            <p className="text-heading shrink-0" style={{ fontSize: "14px" }}>
              ${p.revenue.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <Link href="/admin/products" className="flex items-center gap-2 text-label hover:text-foreground transition-colors mt-6">
        View All Products
        <ArrowRight size={11} />
      </Link>
    </div>
  );
}