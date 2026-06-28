export default function DashboardHeader() {
  return (
    <div className="flex items-start justify-between mb-10">
      <div className="max-w-xl">
        <p className="text-[12px] italic text-muted-foreground mb-3" style={{ fontFamily: "var(--font-serif)" }}>
          Performance Analysis
        </p>
        <p className="text-[14px] text-foreground leading-relaxed font-sans">
          Executive overview of Ferrum&apos;s current market position, highlighting
          aggressive growth vectors and high-value customer acquisition segments.
        </p>
      </div>
      <div className="text-right shrink-0 ml-8">
        <p className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-semibold">
          Fiscal Period
        </p>
        <p className="text-[22px] font-light text-foreground mt-1" style={{ fontFamily: "var(--font-serif)" }}>
          Q3 2024
        </p>
      </div>
    </div>
  );
}