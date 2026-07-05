import { TrendingUp, ShoppingBag, Receipt, CheckCircle2 } from "lucide-react";

export default function DashboardStats({ analytics }) {
  const stats = [
    {
      label: "Total Revenue",
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      sub: `From ${analytics.totalOrders} orders`,
      icon: TrendingUp,
    },
    {
      label: "Total Orders",
      value: analytics.totalOrders.toLocaleString(),
      sub: "All-time order count",
      icon: ShoppingBag,
    },
    {
      label: "Average Order Value",
      value: `$${analytics.avgOrderValue.toLocaleString()}`,
      sub: "Per completed order",
      icon: Receipt,
    },
    {
      label: "Success Rate",
      value: `${analytics.successRate}%`,
      sub: "Orders not cancelled",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {stats.map(({ label, value, sub, icon: Icon }) => (
        <div key={label} className="border border-border bg-muted p-6">
          <div className="flex items-start justify-between mb-6">
            <p className="text-label">{label}</p>
            <Icon size={13} strokeWidth={1.5} className="text-muted-foreground" />
          </div>
          <p className="text-display mb-3" style={{ fontSize: "28px" }}>
            {value}
          </p>
          <p className="text-caption">{sub}</p>
        </div>
      ))}
    </div>
  );
}