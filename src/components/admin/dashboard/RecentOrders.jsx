import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";

const statusStyles = {
  delivered:  "border border-[rgba(74,222,128,0.3)]  text-[#4ade80]",
  shipped:    "border border-[rgba(96,165,250,0.3)]  text-[#60a5fa]",
  processing: "border border-[rgba(251,191,36,0.3)]  text-[#fbbf24]",
  pending:    "border border-[rgba(217,217,217,0.15)] text-muted-foreground",
  cancelled:  "border border-[rgba(248,113,113,0.3)] text-[#f87171]",
};

export default function RecentOrders({ orders }) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-5">
        <p className="text-eyebrow">Recent Orders</p>

        <div className="flex items-center gap-4">
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/api/orders/export`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-label hover:text-foreground transition-colors"
          >
            <Download size={11} />
            Download CSV
          </a>
          <Link href="/admin/orders" className="flex items-center gap-1.5 text-label hover:text-foreground transition-colors">
            View All Orders
            <ArrowUpRight size={11} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-5 pb-3 border-b border-border">
        {["Order", "Customer", "Item", "Date", "Value"].map((h) => (
          <p key={h} className="text-label">{h}</p>
        ))}
      </div>

      {orders.map((o) => (
        <div key={o._id} className="grid grid-cols-5 py-5 border-b border-border items-center hover:bg-muted/30 transition-colors group">
          <p className="text-data-mono">#{o._id.slice(-8).toUpperCase()}</p>

          <div>
            <p className="text-data font-medium">{o.customerName}</p>
            <p className="text-caption mt-0.5 tracking-[0.1em] uppercase">
              {o.shippingAddress?.city}, {o.shippingAddress?.country}
            </p>
          </div>

          <p className="text-data">
            {o.items[0]?.name}{o.items.length > 1 ? ` +${o.items.length - 1}` : ""}
          </p>

          <p className="text-caption">
            {o.createdAt
              ? new Date(o.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
              : "—"}
          </p>

          <div className="flex items-center justify-between">
            <p className="text-heading" style={{ fontSize: "13px" }}>
              ${o.total.toLocaleString()}
            </p>
            <span className={`inline-flex px-2.5 py-1 text-label ${statusStyles[o.status]}`}>
              {o.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}