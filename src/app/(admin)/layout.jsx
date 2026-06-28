import AdminSidebar from "@/components/admin/shared/AdminSidebar";
import AdminTopbar from "@/components/admin/shared/AdminTopbar";


export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto scrollbar-none">
          {children}
        </main>
      </div>
    </div>
  );
}