import { getAdminOrderById } from "@/lib/api/admin/orders";
import OrderDetailClient from "@/components/admin/orders/details/OrderDetailClient";

export default async function OrderDetailPage({ params }) {
  const { id } = await params;

  let order = null;
  try {
    const data = await getAdminOrderById(id);
    order = data.order;
  } catch {
    order = null;
  }

  if (!order) {
    return (
      <div className="p-10 flex items-center justify-center h-full">
        <p className="text-muted-foreground text-[13px]">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-screen-xl mx-auto">
      <OrderDetailClient order={order} />
    </div>
  );
}