import { getDashboardAnalytics, getSalesChart, getTopProducts } from "@/lib/api/admin/analytics";
import { getAdminOrders } from "@/lib/api/admin/orders";
import { getLowStockProducts } from "@/lib/api/admin/products";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardStats from "@/components/admin/dashboard/DashboardStats";
import LowStockAlerts from "@/components/admin/dashboard/LowStockAlert";
import RecentOrders from "@/components/admin/dashboard/RecentOrders";
import SalesChart from "@/components/admin/dashboard/SalesChart";
import TopProducts from "@/components/admin/dashboard/TopProducts";

export default async function AdminDashboardPage() {
  const [analyticsData, salesChartData, topProductsData, ordersData, lowStockData] = await Promise.all([
    getDashboardAnalytics(),
    getSalesChart(),
    getTopProducts(),
    getAdminOrders({ page: 1, limit: 5 }),
    getLowStockProducts(5),
  ]);

  return (
    <div className="p-10 max-w-screen-xl mx-auto">
      <DashboardHeader />
      <DashboardStats analytics={analyticsData.analytics} />

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <SalesChart data={salesChartData.salesByDay} />
        </div>
        <TopProducts products={topProductsData.topProducts} />
      </div>

      <LowStockAlerts products={lowStockData.products} />
      <RecentOrders orders={ordersData.orders} />
    </div>
  );
}