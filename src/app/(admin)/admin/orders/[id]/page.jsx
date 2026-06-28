import OrderDetailClient from "../../../../../components/admin/orders/details/OrderDetailClient";
import { ORDERS } from "../../../../../components/admin/orders/OrdersClient";

export default function OrderDetailPage({ params }) {
  const order = ORDERS.find((o) => o.id === params.id);

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