"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import OrderStatusDialog from "./OrderStatusDialog";

const statusStyles = {
  delivered:  "border-[rgba(74,222,128,0.3)]  text-[#4ade80]",
  shipped:    "border-[rgba(96,165,250,0.3)]  text-[#60a5fa]",
  processing: "border-[rgba(251,191,36,0.3)]  text-[#fbbf24]",
  pending:    "border-[rgba(217,217,217,0.15)] text-muted-foreground",
  cancelled:  "border-[rgba(248,113,113,0.3)] text-[#f87171]",
};

const paymentStyles = {
  paid:     "text-[#4ade80]",
  refunded: "text-[#f87171]",
};

export default function OrderRow({ order, onUpdateStatus }) {
  const [showStatus, setShowStatus] = useState(false);

  return (
    <>
      <div className="grid grid-cols-[1.2fr_1.4fr_1fr_0.7fr_0.8fr_1fr_auto] gap-4 py-5 border-b border-border items-center hover:bg-muted/20 transition-colors group">

        {/* Order ID + date */}
        <div>
          <p className="text-[11px] font-mono text-muted-foreground">#{order.id}</p>
          <p className="text-[10px] text-muted-foreground/40 mt-0.5">
            {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
          </p>
        </div>

        {/* Customer */}
        <div>
          <p className="text-[12px] font-medium text-foreground">{order.customer.name}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{order.customer.location}</p>
        </div>

        {/* Items */}
        <div>
          {order.items.map((item, i) => (
            <p key={i} className="text-[11px] text-foreground leading-snug">
              {item.name}
              <span className="text-muted-foreground ml-1">· {item.size} × {item.qty}</span>
            </p>
          ))}
        </div>

        {/* Total */}
        <p
          className="text-[14px] font-light text-foreground"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          ${order.total.toLocaleString()}
        </p>

        {/* Payment */}
        <p className={`text-[10px] font-bold tracking-[0.12em] uppercase ${paymentStyles[order.payment.status] || "text-muted-foreground"}`}>
          {order.payment.status}
        </p>

        {/* Status */}
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold tracking-[0.14em] uppercase border ${statusStyles[order.status]}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
          {order.status}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setShowStatus(true)}
            className="px-3 py-1.5 border border-border text-[9px] font-bold tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            Update
          </button>
          <Link
            href={`/admin/orders/${order.id}`}
            className="w-7 h-7 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            <ChevronRight size={12} />
          </Link>
        </div>
      </div>

      <OrderStatusDialog
        open={showStatus}
        onClose={() => setShowStatus(false)}
        order={order}
        onUpdateStatus={onUpdateStatus}
      />
    </>
  );
}