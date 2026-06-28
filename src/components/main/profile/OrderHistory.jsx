"use client";

import React from "react";

const ORDERS = [
  {
    id: "FRM-90212",
    date: "June 12, 2026",
    status: "In Transit",
    total: 1250.00,
    items: "Column Overcoat (M) x1"
  },
  {
    id: "FRM-89104",
    date: "April 02, 2026",
    status: "Delivered",
    total: 225.00,
    items: "Heavyweight Supima Tee (M) x2, Canvas Tote x1"
  }
];

export default function OrderHistory() {
  return (
    <div className="space-y-8 flex-1 w-full text-left">
      <div className="border-b border-zinc-900 pb-4">
        <h3 className="text-sm font-serif font-normal tracking-widest text-zinc-200 uppercase">
          Acquisition Ledger
        </h3>
      </div>

      <div className="space-y-4">
        {ORDERS.map((order) => (
          <div key={order.id} className="border border-zinc-900 bg-zinc-950 p-5 space-y-4 rounded-none flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono">
                {order.date}
              </span>
              <h4 className="text-xs font-serif text-zinc-200 tracking-wide uppercase">
                {order.id}
              </h4>
              <p className="text-[11px] text-zinc-400 font-sans tracking-wide">
                {order.items}
              </p>
            </div>
            
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 border-zinc-900 pt-3 sm:pt-0">
              <span className="text-xs text-zinc-300 font-sans">${order.total.toFixed(2)}</span>
              <span className={`text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-none border ${
                order.status === "In Transit" 
                  ? "border-amber-500/20 bg-amber-500/5 text-amber-400" 
                  : "border-zinc-800 bg-zinc-900 text-zinc-400"
              }`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}