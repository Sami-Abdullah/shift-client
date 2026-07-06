"use client";
import Link from "next/link";

const statusStyles = {
  delivered:  "border-[rgba(74,222,128,0.2)] bg-[rgba(74,222,128,0.05)] text-[#4ade80]",
  shipped:    "border-amber-500/20 bg-amber-500/5 text-amber-400",
  processing: "border-[rgba(96,165,250,0.2)] bg-[rgba(96,165,250,0.05)] text-[#60a5fa]",
  pending:    "border-border bg-muted text-brand-primary/50",
  cancelled:  "border-red-500/20 bg-red-500/5 text-red-400",
};

export default function OrderHistory({ orders }) {
  return (
    <div className="border border-border bg-muted/20 p-8">
      <div className="pb-5 mb-6 border-b border-border">
        <p className="text-eyebrow mb-1">Order History</p>
        <h2 className="text-heading" style={{ fontSize: "16px" }}>Your Orders</h2>
      </div>

      {orders.length === 0 && <p className="text-body text-muted-foreground">No orders yet.</p>}

      <div className="space-y-3">
        {orders.map((order) => (
          <Link
            key={order._id}
            href={`/profile/orders/${order._id}`}
            className="flex items-center justify-between gap-6 border border-border bg-brand-neutral p-5 hover:border-brand-primary/30 transition-colors"
          >
            <div className="space-y-1.5 min-w-0">
              <p className="text-caption">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })
                  : "—"}
              </p>
              <p className="text-data-mono">#{order._id.slice(-8).toUpperCase()}</p>
              <p className="text-body truncate" style={{ fontSize: "11px" }}>
                {order.items.map((i) => `${i.name} (${i.size}) x${i.quantity}`).join(", ")}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              <p className="text-heading" style={{ fontSize: "16px" }}>${order.total.toFixed(2)}</p>
              <span className={`text-label px-2 py-0.5 border ${statusStyles[order.status]}`}>
                {order.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}