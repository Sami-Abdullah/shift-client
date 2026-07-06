"use client";
import { useRouter } from "next/navigation";
import { Bell, Settings, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import AdminSearch from "./AdminSearch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminTopbar({ user }) {
  const router = useRouter();
  const initial = user?.name?.charAt(0).toUpperCase() || "A";

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/signin"),
      },
    });
  };

  return (
    <header className="h-[56px] flex-shrink-0 flex items-center gap-6 px-8 bg-background border-b border-border">
      <p className="text-label">Performance Summary</p>

      <AdminSearch />

      <div className="flex-1" />

      <div className="flex items-center gap-4">


        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 border border-border px-3 py-1.5 bg-muted outline-none cursor-pointer">
            <div className="w-6 h-6 bg-foreground flex items-center justify-center shrink-0">
              <span className="text-[9px] font-bold text-background">{initial}</span>
            </div>
            <p className="text-data">
              Hi, <span className="font-medium text-foreground">{user?.name || "Admin"}</span>
            </p>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-none border-border bg-background min-w-[140px]">
            <DropdownMenuItem
              onClick={handleSignOut}
              className="flex items-center gap-2 text-[10px] uppercase tracking-wider rounded-none cursor-pointer py-2 focus:bg-muted text-red-400 focus:text-red-400"
            >
              <LogOut size={12} />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}