import { Download } from "lucide-react";

export default function OrdersHeader({ total }) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <div className="flex items-center mb-5">
          <div className="w-1 h-10 bg-foreground mr-5" />
          <h1
            className="text-[42px] font-light tracking-[0.08em] uppercase text-foreground leading-none"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Order Management
          </h1>
        </div>
        <p className="text-[13px] text-muted-foreground leading-relaxed max-w-lg ml-6">
          Track, update and manage all customer orders. Handle shipments,
          refunds and cancellations in one place.
        </p>
      </div>

      <div className="flex items-center gap-3 mt-2 shrink-0 ml-8">
        {/* Live count */}
        <div className="text-right mr-4">
          <p className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-semibold mb-1">
            Total Orders
          </p>
          <p
            className="text-[32px] font-light text-foreground leading-none"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {total}
          </p>
        </div>
        {/* Export */}
        <a href={`${process.env.NEXT_PUBLIC_API_URL}/api/orders/export`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-border text-muted-foreground px-4 py-2.5 text-[10px] font-bold tracking-[0.16em] uppercase hover:text-foreground hover:border-foreground/30 transition-colors"
        >
          <Download size={12} />
          Export CSV
        </a>
      </div>
    </div>
  );
}