import AdminSidebar from "@/components/admin/shared/AdminSidebar";
import AdminTopbar from "@/components/admin/shared/AdminTopbar";
import { getUserSession } from "@/lib/core/session";

export default async function AdminLayout({ children }) {
  const user = await getUserSession();
  console.log(user);
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminTopbar user={user} />
        <main className="flex-1 overflow-y-auto scrollbar-none">
          {children}
        </main>
      </div>
    </div>
  );
}