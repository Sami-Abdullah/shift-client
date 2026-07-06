"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { User, ShoppingBag, LogOut,Heart  } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function ProfileSidebar({ activeTab, setActiveTab, user }) {
  const router = useRouter();

  const menuItems = [
    { id: "details", label: "Account", icon: User },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "saved", label: "Saved Items", icon: Heart },
  ];

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: { onSuccess: () => router.push("/") },
    });
  };

  return (
    <aside className="space-y-6">
      <div className="border border-border bg-muted/30 p-5 flex items-center gap-3">
        <div className="w-9 h-9 bg-brand-secondary flex items-center justify-center shrink-0">
          <span className="text-[12px] font-bold text-brand-neutral">
            {user?.name?.charAt(0).toUpperCase() || "?"}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-data font-medium truncate">{user?.name || "Guest"}</p>
          <p className="text-caption mt-0.5">#{user?.id?.slice(-8).toUpperCase() || "—"}</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 text-label transition-colors cursor-pointer border ${active
                  ? "bg-muted border-border text-brand-secondary"
                  : "border-transparent hover:text-brand-secondary hover:bg-muted/30"
                }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <button
        onClick={handleSignOut}
        className="flex items-center gap-2.5 px-3 py-2.5 text-label text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-colors cursor-pointer w-full border border-transparent"
      >
        <LogOut className="h-3.5 w-3.5 shrink-0" />
        Sign Out
      </button>
    </aside>
  );
}