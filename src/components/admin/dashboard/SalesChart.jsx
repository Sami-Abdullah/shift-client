"use client";
import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis,
  Tooltip, ResponsiveContainer
} from "recharts";

const weekly = [
  { period: "Jan", v: 1200 },
  { period: "Mar", v: 900 },
  { period: "May", v: 1600 },
  { period: "Jul", v: 1100 },
  { period: "Sep", v: 2100 },
  { period: "Nov", v: 2400 },
];

const monthly = [
  { period: "Q1", v: 3200 },
  { period: "Q2", v: 4100 },
  { period: "Q3", v: 3600 },
  { period: "Q4", v: 5200 },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-muted border border-border px-3 py-2">
      <p className="text-[9px] text-muted-foreground mb-0.5">{label}</p>
      <p className="text-[12px] font-medium text-foreground">€{payload[0].value.toLocaleString()}K</p>
    </div>
  );
}

export default function SalesChart() {
  const [view, setView] = useState("weekly");
  const data = view === "weekly" ? weekly : monthly;

  return (
    <div className="border border-border bg-muted p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[10px] italic text-muted-foreground mb-1" style={{ fontFamily: "var(--font-serif)" }}>
            Revenue Growth
          </p>
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-foreground">
            Global Performance Tracking
          </p>
        </div>
        {/* Toggle */}
        <div className="flex items-center gap-4">
          {["weekly", "monthly"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`text-[10px] font-semibold tracking-[0.12em] uppercase pb-0.5 transition-colors ${
                view === v
                  ? "text-foreground border-b border-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 5, right: 0, bottom: 0, left: -30 }}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D9D9D9" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#D9D9D9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="period"
            tick={{ fontSize: 10, fill: "#555", fontFamily: "Inter" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Area
            type="monotone"
            dataKey="v"
            stroke="#D9D9D9"
            strokeWidth={1.5}
            fill="url(#areaGrad)"
            dot={false}
            activeDot={{ r: 3, fill: "#F2F2F2", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}