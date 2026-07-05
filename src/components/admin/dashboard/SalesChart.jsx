"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-muted border border-border px-3 py-2">
      <p className="text-[9px] text-muted-foreground mb-0.5">{label}</p>
      <p className="text-[12px] font-medium text-foreground">${payload[0].value.toLocaleString()}</p>
    </div>
  );
}

export default function SalesChart({ data }) {
  const chartData = data.map((d) => ({
    period: new Date(d._id).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
    v: d.revenue,
  }));

  return (
    <div className="border border-border bg-muted p-6">
      <div className="mb-6">
        <p className="text-[10px] italic text-muted-foreground mb-1" style={{ fontFamily: "var(--font-serif)" }}>
          Last 30 Days
        </p>
        <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-foreground">
          Sales Velocity
        </p>
      </div>

      {chartData.length === 0 ? (
        <div className="h-[200px] flex items-center justify-center">
          <p className="text-[12px] text-muted-foreground">No sales in the last 30 days.</p>
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