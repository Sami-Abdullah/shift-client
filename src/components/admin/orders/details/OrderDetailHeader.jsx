import Link from "next/link";
import { ChevronRight, RotateCcw } from "lucide-react";

const statusStyles = {
  delivered:  "border-[rgba(74,222,128,0.3)]  text-[#4ade80]",
  shipped:    "border-[rgba(96,165,250,0.3)]  text-[#60a5fa]",
  processing: "border-[rgba(251,191,36,0.3)]  text-[#fbbf24]",
  pending:    "border-[rgba(217,217,217,0.15)] text-muted-foreground",
  cancelled:  "border-[rgba(248,113,113,0.3)] text-[#f87171]",
};

export default function OrderDetailHeader({ order, onRefund }) {
  const canRefund = ["delivered", "shipped", "processing"].includes(order.status) && !order.refund;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Link
          href="/admin/orders"
          className="text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          Orders
        </Link>
        <ChevronRight size={10} className="text-muted-foreground" />
        <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-foreground">
          #{order.id}
        </span>
      </div>

      {/* Title row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <h1
            className="text-[36px] font-light text-foreground leading-none"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            #{order.id}
          </h1>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold tracking-[0.14em] uppercase border ${statusStyles[order.status]}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
            {order.status}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {canRefund && (
            <button
              onClick={onRefund}
              className="flex items-center gap-2 border border-[rgba(248,113,113,0.3)] text-[#f87171] px-4 py-2.5 text-[10px] font-bold tracking-[0.16em] uppercase hover:bg-[rgba(248,113,113,0.08)] transition-colors"
            >
              <RotateCcw size={11} />
              Issue Refund
            </button>
          )}
          {order.refund && (
            <div className="px-4 py-2.5 border border-[rgba(248,113,113,0.2)] bg-[rgba(248,113,113,0.06)]">
              <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#f87171]">
                Refunded ${order.refund.amount.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Date */}
      <p className="text-[11px] text-muted-foreground mt-3">
        Placed on {new Date(order.createdAt).toLocaleDateString("en-GB", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
        · Last updated {new Date(order.updatedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
      </p>
    </div>
  );
}