"use client";

import React from "react";
import { User, ShoppingBag, Ruler, LogOut } from "lucide-react";

export default function ProfileSidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "details", label: "Identity & Archives", icon: User },
    { id: "orders", label: "Order History", icon: ShoppingBag },
  ];

  return (
    <aside className="w-full md:w-64 shrink-0 space-y-8 text-left">
      <div className="space-y-1.5">
        <h2 className="text-xl font-normal tracking-wide text-zinc-100 font-serif uppercase">
          Sami Abdullah
        </h2>
        <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-medium">
          Client ID: #FRM-2026
        </p>
      </div>

      <nav className="flex flex-row md:flex-col gap-1 border-b md:border-b-0 border-zinc-900 pb-4 md:pb-0 overflow-x-auto scrollbar-none">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 text-[10px] uppercase tracking-[0.2em] font-sans rounded-none transition-colors w-full whitespace-nowrap cursor-pointer ${
                activeTab === item.id
                  ? "bg-zinc-900 text-zinc-100 border-l-0 md:border-l-2 border-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {item.label}
            </button>
          );
        })}

        <button className="flex items-center gap-3 px-3 py-2.5 text-[10px] uppercase tracking-[0.2em] font-sans text-red-500/70 hover:text-red-400 rounded-none transition-colors w-full text-left cursor-pointer md:mt-8">
          <LogOut className="h-3.5 w-3.5 shrink-0" />
          Terminal Exit
        </button>
      </nav>
    </aside>
  );
}