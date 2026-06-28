import Link from "next/link";
import { AlertTriangle } from "lucide-react";

const alerts = [
  { name: "Cashmere Column Coat", sku: "FRM-C-104-BLK", stock: 3,  category: "Outerwear" },
  { name: "Silk Bias-Cut Dress",  sku: "FRM-D-220-IVR", stock: 5,  category: "Women" },
  { name: "Saddle Leather Tote",  sku: "FRM-A-009-TAN", stock: 2,  category: "Accessories" },
  { name: "Merino Turtleneck",    sku: "FRM-K-882-BLK", stock: 7,  category: "Knitwear" },
];

export default function LowStockAlerts() {
  return (
    <div className="border border-border bg-muted p-6">

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p
            className="text-[10px] italic text-muted-foreground mb-1"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Inventory
          </p>
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-foreground">
            Low Stock Alerts
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <AlertTriangle size={12} className="text-[#fbbf24]" />
          <span className="text-[9px] font-bold tracking-[0.14em] uppercase text-[#fbbf24]">
            {alerts.length} Items
          </span>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-0">
        {alerts.map((item) => (
          <div
            key={item.sku}
            className="flex items-center justify-between py-3.5 border-b border-border last:border-0"
          >
            <div>
              <p className="text-[12px] font-medium text-foreground">{item.name}</p>
              <p className="text-[9px] tracking-[0.12em] uppercase text-muted-foreground mt-0.5">
                {item.category} · {item.sku}
              </p>
            </div>
            <div className="text-right">
              <p
                className={`text-[18px] font-light leading-none ${
                  item.stock <= 3 ? "text-[#f87171]" : "text-[#fbbf24]"
                }`}
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {item.stock}
              </p>
              <p className="text-[9px] tracking-[0.1em] uppercase text-muted-foreground mt-0.5">
                units left
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer link */}
      <Link
        href="/admin/products"
        className="block text-center text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors mt-5 pt-4 border-t border-border"
      >
        Manage Inventory →
      </Link>
    </div>
  );
}