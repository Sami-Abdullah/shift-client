import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const orders = [
  {
    id: "#FRM-5021",
    customer: "Isabelle Fontaine",
    location: "Paris, FR",
    items: "Cashmere Column Coat",
    date: "24 Jun 2026",
    value: "$2,890",
    status: "delivered",
  },
  {
    id: "#FRM-5020",
    customer: "James Okafor",
    location: "London, UK",
    items: "Obsidian Structured Blazer",
    date: "24 Jun 2026",
    value: "$1,240",
    status: "shipped",
  },
  {
    id: "#FRM-5019",
    customer: "Yui Tanaka",
    location: "Tokyo, JP",
    items: "Saddle Leather Tote",
    date: "23 Jun 2026",
    value: "$1,650",
    status: "processing",
  },
  {
    id: "#FRM-5018",
    customer: "Omar Hassan",
    location: "Dubai, AE",
    items: "Merino Turtleneck × 2",
    date: "23 Jun 2026",
    value: "$960",
    status: "pending",
  },
  {
    id: "#FRM-5017",
    customer: "Elena Rossi",
    location: "Milan, IT",
    items: "Silk Bias-Cut Dress",
    date: "22 Jun 2026",
    value: "$1,890",
    status: "cancelled",
  },
];

const statusStyles = {
  delivered:  "border border-[rgba(74,222,128,0.3)]  text-[#4ade80]",
  shipped:    "border border-[rgba(96,165,250,0.3)]  text-[#60a5fa]",
  processing: "border border-[rgba(251,191,36,0.3)]  text-[#fbbf24]",
  pending:    "border border-[rgba(217,217,217,0.15)] text-muted-foreground",
  cancelled:  "border border-[rgba(248,113,113,0.3)] text-[#f87171]",
};

export default function RecentOrders() {
  return (
    <div className="mt-8">

      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <p
          className="text-[12px] italic text-muted-foreground"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Recent Orders
        </p>
        <Link
          href="/admin/orders"
          className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          View All Orders
          <ArrowUpRight size={11} />
        </Link>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-5 pb-3 border-b border-border">
        {["Order", "Customer", "Item", "Date", "Value", "Status"].map((h) => (
          <p
            key={h}
            className={`text-[9px] font-bold tracking-[0.2em] uppercase text-muted-foreground ${h === "Status" ? "col-span-1 text-right" : ""}`}
          >
            {h}
          </p>
        ))}
      </div>

      {/* Rows */}
      {orders.map((o) => (
        <div
          key={o.id}
          className="grid grid-cols-5 py-5 border-b border-border items-center hover:bg-muted/30 transition-colors group"
        >
          {/* Order ID */}
          <div>
            <p className="text-[11px] font-mono text-muted-foreground">{o.id}</p>
          </div>

          {/* Customer */}
          <div>
            <p className="text-[12px] font-medium text-foreground">{o.customer}</p>
            <p className="text-[9px] tracking-[0.1em] uppercase text-muted-foreground mt-0.5">
              {o.location}
            </p>
          </div>

          {/* Item */}
          <p className="text-[12px] text-foreground">{o.items}</p>

          {/* Date */}
          <p className="text-[11px] text-muted-foreground">{o.date}</p>

          {/* Value + Status — last column spans both */}
          <div className="flex items-center justify-between">
            <p
              className="text-[13px] font-light text-foreground"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {o.value}
            </p>
            <span
              className={`inline-flex px-2.5 py-1 text-[9px] font-bold tracking-[0.16em] uppercase ${statusStyles[o.status]}`}
            >
              {o.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}