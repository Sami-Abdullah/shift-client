import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function LowStockAlerts({ products }) {
  return (
    <div className="border border-border bg-muted p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-eyebrow mb-1">Inventory</p>
          <p className="text-label">Low Stock Alerts</p>
        </div>
        <div className="flex items-center gap-1.5">
          <AlertTriangle size={12} className="text-[#fbbf24]" />
          <span className="text-label text-[#fbbf24]">{products.length} Items</span>
        </div>
      </div>

      <div className="flex flex-col gap-0">
        {products.length === 0 && (
          <p className="text-body text-muted-foreground py-4">No low stock items right now.</p>
        )}
        {products.map((item) => (
          <div key={item._id} className="flex items-center justify-between py-3.5 border-b border-border last:border-0">
            <div>
              <p className="text-data font-medium">{item.name}</p>
              <p className="text-caption mt-0.5 tracking-[0.12em] uppercase">
                {item.category} · {item.sku}
              </p>
            </div>
            <div className="text-right">
              <p className={`text-heading leading-none ${item.totalStock <= 3 ? "text-[#f87171]" : "text-[#fbbf24]"}`} style={{ fontSize: "18px" }}>
                {item.totalStock}
              </p>
              <p className="text-caption mt-0.5 tracking-[0.1em] uppercase">units left</p>
            </div>
          </div>
        ))}
      </div>

      <Link href="/admin/products" className="block text-center text-label hover:text-foreground transition-colors mt-5 pt-4 border-t border-border">
        Manage Inventory →
      </Link>
    </div>
  );
}