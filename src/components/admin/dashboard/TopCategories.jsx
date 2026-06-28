import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  { name: "Sculptural Hardware",     pct: 42 },
  { name: "Architectural Lighting",  pct: 28 },
  { name: "Monolithic Furniture",    pct: 19 },
  { name: "Textural Elements",       pct: 11 },
];

export default function TopCategories() {
  return (
    <div className="border border-border bg-muted p-6 flex flex-col">
      <div className="mb-6">
        <p className="text-[10px] italic text-muted-foreground mb-1" style={{ fontFamily: "var(--font-serif)" }}>
          Top Categories
        </p>
        <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-foreground">
          Product Contribution
        </p>
      </div>

      <div className="flex flex-col gap-5 flex-1">
        {categories.map(({ name, pct }) => (
          <div key={name}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-foreground">{name}</p>
              <p className="text-[10px] font-bold text-foreground">{pct}%</p>
            </div>
            {/* Progress bar */}
            <div className="h-px bg-border w-full relative">
              <div
                className="absolute top-0 left-0 h-px bg-foreground"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/admin/analytics"
        className="flex items-center gap-2 text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors mt-6"
      >
        Full Inventory Report
        <ArrowRight size={11} />
      </Link>
    </div>
  );
}