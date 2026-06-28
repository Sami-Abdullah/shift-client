const channels = [
  { label: "Direct Traffic",    pct: 54.2, delta: "+2.1%", positive: true },
  { label: "Editorial Referral",pct: 21.8, delta: "+8.4%", positive: true },
  { label: "Social Discovery",  pct: 15.5, delta: "-0.0%", positive: false },
  { label: "Organic Search",    pct: 8.5,  delta: "+1.2%", positive: true },
];

export default function CustomerAcquisition() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[12px] italic text-muted-foreground" style={{ fontFamily: "var(--font-serif)" }}>
          Customer Acquisition
        </p>
        <button className="flex items-center gap-2 text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="8" y2="18"/>
          </svg>
          Filter: All Channels
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {channels.map(({ label, pct, delta, positive }) => (
          <div key={label} className="border border-border bg-muted p-5">
            <p className="text-[9px] font-bold tracking-[0.16em] uppercase text-muted-foreground mb-4 leading-relaxed">
              {label}
            </p>
            <div className="flex items-baseline gap-2 mb-3">
              <p className="text-[20px] font-light text-foreground" style={{ fontFamily: "var(--font-serif)" }}>
                {pct}%
              </p>
              <span className={`text-[10px] font-medium ${positive ? "text-[#4ade80]" : "text-muted-foreground"}`}>
                {delta}
              </span>
            </div>
            {/* Mini bar */}
            <div className="h-px bg-border w-full relative">
              <div
                className="absolute top-0 left-0 h-px bg-foreground"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}