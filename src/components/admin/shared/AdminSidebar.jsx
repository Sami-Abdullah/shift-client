"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, ShoppingCart,
  BookMarked, Settings, HelpCircle, Plus,Users
} from "lucide-react";

const navItems = [
  { label: "Dashboard",          href: "/admin",                 icon: LayoutDashboard },
  { label: "Product Management", href: "/admin/products",        icon: Package },
  { label: "Orders",             href: "/admin/orders",          icon: ShoppingCart },
  { label: "Brand Archives",     href: "/admin/brand-archives",  icon: BookMarked },
  { label: "Customers",          href: "/admin/customers",      icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[200px] flex-shrink-0 flex flex-col bg-[#0D0D0D] border-r border-border">

      {/* Brand header */}
      <div className="px-6 pt-8 pb-6 border-b border-border">
        <p className="text-[11px] font-bold tracking-[0.2em] text-foreground uppercase font-sans">
          Architectural
        </p>
        <p className="text-[9px] tracking-[0.18em] text-muted-foreground uppercase mt-0.5 font-sans">
          Management Suite
        </p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 px-3 py-3 text-[10px] font-semibold tracking-[0.14em] uppercase transition-all duration-150 border-l-2 ${
                active
                  ? "text-foreground border-foreground bg-muted"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Icon size={13} strokeWidth={1.5} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Create Entry CTA */}
      <div className="px-4 pb-4">
        <Link
          href="/admin/products/new"
          className="flex items-center justify-center gap-2 w-full border border-foreground text-foreground py-3 text-[10px] font-bold tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors"
        >
          <Plus size={11} />
          Create Entry
        </Link>
      </div>

      {/* Bottom links */}
      <div className="border-t border-border px-3 py-4 flex flex-col gap-1">
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 px-3 py-2.5 text-[10px] font-semibold tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <Settings size={13} strokeWidth={1.5} />
          Settings
        </Link>
        <Link
          href="/admin/help"
          className="flex items-center gap-3 px-3 py-2.5 text-[10px] font-semibold tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <HelpCircle size={13} strokeWidth={1.5} />
          Help Center
        </Link>
      </div>
    </aside>
  );
}