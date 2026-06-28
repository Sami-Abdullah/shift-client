import { TrendingUp, Users, ShoppingBag } from "lucide-react";

const stats = [
  {
    label: "Total Revenue",
    value: "€2.4M",
    sub: "+12.4% vs last period",
    positive: true,
    icon: TrendingUp,
  },
  {
    label: "Active Customers",
    value: "18.2K",
    sub: "High retention rate 94%",
    positive: true,
    icon: Users,
  },
  {
    label: "AOV",
    value: "€132",
    sub: "Premium tier growth +8%",
    positive: true,
    icon: ShoppingBag,
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {stats.map(({ label, value, sub, icon: Icon }) => (
        <div
          key={label}
          className="border border-border bg-muted p-6"
        >
          <div className="flex items-start justify-between mb-6">
            <p className="text-[9px] font-bold tracking-[0.22em] uppercase text-muted-foreground">
              {label}
            </p>
            <Icon size={13} strokeWidth={1.5} className="text-muted-foreground" />
          </div>
          <p
            className="text-[32px] font-light text-foreground leading-none mb-3"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {value}
          </p>
          <p className="text-[11px] text-muted-foreground">{sub}</p>
        </div>
      ))}
    </div>
  );
}