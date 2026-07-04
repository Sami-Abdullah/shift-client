import { getAdminOrders } from "@/lib/api/admin/orders";
import OrdersHeader from "@/components/admin/orders/OrdersHeader";
import OrdersFilter from "@/components/admin/orders/OrdersFilter";
import OrdersTable from "@/components/admin/orders/OrdersTable";

const STATUS_FILTERS = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default async function OrdersPage({ searchParams }) {
  const { search = "", status = "All", page = "1" } = await searchParams;

  const data = await getAdminOrders({ search, status, page: Number(page) });

  return (
    <div className="p-10 max-w-screen-xl mx-auto">
      <OrdersHeader total={data.pagination.total} />
      <OrdersFilter search={search} statusFilter={status} filters={STATUS_FILTERS} />
      <OrdersTable orders={data.orders} />
    </div>
  );
}