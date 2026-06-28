import CustomerAcquisition from "@/components/admin/dashboard/CustomerAcquisition";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardStats from "@/components/admin/dashboard/DashboardStats";
import LowStockAlerts from "@/components/admin/dashboard/LowStockAlert";
import RecentOrders from "@/components/admin/dashboard/RecentOrders";
import RevenueByCategory from "@/components/admin/dashboard/RevenueByCategory";
import SalesChart from "@/components/admin/dashboard/SalesChart";

import TopCategories from "@/components/admin/dashboard/TopCategories";


export default function AdminDashboardPage() {
  return (
    <div className="p-10 max-w-screen-xl mx-auto">

      <DashboardHeader />

      <DashboardStats />

      {/* Chart + Categories side by side */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <SalesChart />
        </div>
        <TopCategories />
      </div>

      <LowStockAlerts/>
      <RevenueByCategory/>

      <RecentOrders/>

    </div>
  );
}