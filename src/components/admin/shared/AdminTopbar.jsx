import { Bell, Settings } from "lucide-react";
import AdminSearch from "./AdminSearch";

export default function AdminTopbar({ user }) {


  return (
    <header className="h-[56px] flex-shrink-0 flex items-center gap-6 px-8 bg-background border-b border-border">
      <p className="text-label">Performance Summary</p>

      <AdminSearch />

      <div className="flex-1" />

      <div className="flex items-center gap-4">


        <div className="flex items-center gap-3 border border-border px-3 py-1.5 bg-muted">

          <p className="text-data">
            Hi, <span className="font-medium text-foreground">{user?.name || "Admin"}</span>
          </p>
        </div>
      </div>
    </header>
  );
}