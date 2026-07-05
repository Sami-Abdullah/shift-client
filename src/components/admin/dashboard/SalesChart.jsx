"use client";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-muted border border-border px-3 py-2">
      <p className="text-caption mb-0.5">{label}</p>
      <p className="text-data font-medium">${payload[0].value.toLocaleString()}</p>
    </div>
  );
}

function formatLabel(id, period) {
  if (period === "monthly") {
    const [year, month] = id.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-GB", { month: "short", year: "2-digit" });
  }
  const [, week] = id.split("-");
  return `Wk ${week}`;
}

export default function SalesChart({ weeklyData, monthlyData }) {
  const [period, setPeriod] = useState("weekly");
  const raw = period === "weekly" ? weeklyData : monthlyData;

  const chartData = raw.map((d) => ({
    period: formatLabel(d._id, period),
    v: d.revenue,
  }));

  return (
    <div className="border border-border bg-muted p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-eyebrow mb-1">{period === "weekly" ? "Last 8 Weeks" : "Last 6 Months"}</p>
          <p className="text-label">Sales Velocity</p>
        </div>
        <div className="flex border border-border">
          {["weekly", "monthly"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-label transition-colors ${
                period === p ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p === "weekly" ? "Weekly" : "Monthly"}
            </button>
          ))}
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="h-[200px] flex items-center justify-center">
          <p className="text-body text-muted-foreground">No sales in this period.</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData} margin={{ top: 5, right: 0, bottom: 0, left: -30 }}>
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D9D9D9" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#D9D9D9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="period" tick={{ fontSize: 10, fill: "#555", fontFamily: "Inter" }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Area type="monotone" dataKey="v" stroke="#D9D9D9" strokeWidth={1.5} fill="url(#areaGrad)" dot={false} activeDot={{ r: 3, fill: "#F2F2F2", strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}