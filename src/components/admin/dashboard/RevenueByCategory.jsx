const categories = [
  { name: "Women",       revenue: 68400, pct: 48, change: "+14.2%", positive: true },
  { name: "Men",         revenue: 42100, pct: 29, change: "+6.8%",  positive: true },
  { name: "Accessories", revenue: 21300, pct: 15, change: "-2.1%",  positive: false },
  { name: "Footwear",    revenue: 11200, pct: 8,  change: "+3.5%",  positive: true },
];

export default function RevenueByCategory() {
  return (
    <div className="border border-border bg-muted p-6">

      {/* Header */}
      <div className="mb-6">
        <p
          className="text-[10px] italic text-muted-foreground mb-1"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          This Month
        </p>
        <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-foreground">
          Revenue by Category
        </p>
      </div>

      {/* Category rows */}
      <div className="flex flex-col gap-5">
        {categories.map(({ name, revenue, pct, change, positive }) => (
          <div key={name}>
            {/* Label row */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-foreground w-24">
                  {name}
                </p>
                <p
                  className="text-[13px] font-light text-foreground"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  ${revenue.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-medium ${
                    positive ? "text-[#4ade80]" : "text-[#f87171]"
                  }`}
                >
                  {change}
                </span>
                <span className="text-[10px] font-bold text-muted-foreground">{pct}%</span>
              </div>
            </div>
            {/* Progress bar */}
            <div className="h-px bg-border w-full relative">
              <div
                className="absolute top-0 left-0 h-px bg-foreground transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground">
          Total Revenue
        </p>
        <p
          className="text-[18px] font-light text-foreground"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          $143,000
        </p>
      </div>
    </div>
  );
}