import OrderRow from "./OrderRow";

const COLUMNS = ["Order ID", "Customer", "Items", "Total", "Payment", "Status", ""];

export default function OrdersTable({ orders }) {
  return (
    <div>
      <div className="grid grid-cols-[1.2fr_1.4fr_1fr_0.7fr_0.8fr_1fr_auto] gap-4 pb-4 border-b border-border">
        {COLUMNS.map((col) => (
          <p key={col} className="text-[9px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
            {col}
          </p>
        ))}
      </div>

      {orders.length > 0 ? (
        orders.map((order) => <OrderRow key={order._id} order={order} />)
      ) : (
        <div className="py-20 text-center">
          <p className="text-[12px] text-muted-foreground">No orders found.</p>
        </div>
      )}

      {orders.length > 0 && (
        <div className="pt-6 mt-2">
          <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground">
            Showing {orders.length} orders
          </p>
        </div>
      )}
    </div>
  );
}