import OrderRow from "./OrderRow";

const COLUMNS = [
  { label: "Order ID",  align: "text-left" },
  { label: "Customer",  align: "text-left" },
  { label: "Items",     align: "text-left" },
  { label: "Total",     align: "text-right" },
  { label: "Payment",   align: "text-left" },
  { label: "Status",    align: "text-left" },
  { label: "Actions",   align: "text-right" },
];

export default function OrdersTable({ orders }) {
  return (
    <div>
      <div className="grid grid-cols-[110px_1.3fr_1fr_90px_100px_130px_120px] gap-4 pb-4 border-b border-border">
        {COLUMNS.map(({ label, align }) => (
          <p key={label} className={`text-label ${align}`}>
            {label}
          </p>
        ))}
      </div>

      {orders.length > 0 ? (
        orders.map((order) => <OrderRow key={order._id} order={order} />)
      ) : (
        <div className="py-20 text-center">
          <p className="text-body text-muted-foreground">No orders found.</p>
        </div>
      )}

      {orders.length > 0 && (
        <div className="pt-6 mt-2">
          <p className="text-label">Showing {orders.length} orders</p>
        </div>
      )}
    </div>
  );
}