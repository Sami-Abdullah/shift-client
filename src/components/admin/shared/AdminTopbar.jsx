import { Bell, Settings, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminTopbar() {
  return (
    <header className="h-[56px] flex-shrink-0 flex items-center gap-6 px-8 bg-background border-b border-border">

      {/* Active section label */}
      <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-foreground">
        Noir Archive
      </p>

      {/* Search */}
      <div className="relative flex-1 max-w-xs">
        <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search data points..."
          className="pl-8 h-8 text-[11px] rounded-none bg-muted border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-border"
        />
      </div>

      <div className="flex-1" />

      {/* Right icons */}
      <div className="flex items-center gap-4">
        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
          <Bell size={15} strokeWidth={1.5} />
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-foreground rounded-full" />
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Settings size={15} strokeWidth={1.5} />
        </button>
        {/* Avatar */}
        <div className="w-7 h-7 bg-muted border border-border flex items-center justify-center">
          <span className="text-[10px] font-bold text-foreground">A</span>
        </div>
      </div>
    </header>
  );
}