import { redirect } from "next/navigation";
import Link from "next/link";
import { getOrderById } from "@/lib/api/customer/orders";

const statusStyles = {
  delivered:  "border-[rgba(74,222,128,0.2)] bg-[rgba(74,222,128,0.05)] text-[#4ade80]",
  shipped:    "border-amber-500/20 bg-amber-500/5 text-amber-400",
  processing: "border-[rgba(96,165,250,0.2)] bg-[rgba(96,165,250,0.05)] text-[#60a5fa]",
  pending:    "border-border bg-muted text-brand-primary/50",
  cancelled:  "border-red-500/20 bg-red-500/5 text-red-400",
};

export default async function OrderDetailPage({ params }) {
  const { id } = await params;

  let order = null;
  try {
    const data = await getOrderById(id);
    order = data.order;
  } catch (err) {
    if (err.status === 401) redirect("/signin");
    order = null;
  }

  if (!order) {
    return (
      <div className="min-h-screen w-full bg-brand-neutral text-brand-secondary flex items-center justify-center">
        <p className="text-body text-muted-foreground">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-brand-neutral text-brand-secondary">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <Link href="/profile" className="text-label hover:text-brand-secondary transition-colors">
          ← Back to Profile
        </Link>

        <div className="flex items-center justify-between mt-6 mb-10">
          <div>
            <p className="text-eyebrow mb-1">Order</p>
            <h1 className="text-display" style={{ fontSize: "28px" }}>
              #{order._id.slice(-8).toUpperCase()}
            </h1>
          </div>
          <span className={`text-label px-3 py-1 border ${statusStyles[order.status]}`}>
            {order.status}
          </span>
        </div>

        <div className="border border-border bg-muted/20 p-6 space-y-3 mb-6">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-data">
              <span>{item.name} ({item.size}) × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between pt-4 border-t border-border">
            <span className="text-label">Total</span>
            <span className="text-heading" style={{ fontSize: "20px" }}>${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="border border-border bg-muted/20 p-6 space-y-2 mb-6">
          <p className="text-eyebrow mb-2">Shipping Address</p>
          <p className="text-data">
            {order.shippingAddress?.fullName}<br />
            {order.shippingAddress?.address}<br />
            {order.shippingAddress?.city}, {order.shippingAddress?.postal}<br />
            {order.shippingAddress?.country}
          </p>
          {order.trackingNumber && (
            <p className="text-data pt-2">Tracking: <span className="text-data-mono">{order.trackingNumber}</span></p>
          )}
        </div>

        <div className="border border-border bg-muted/20 p-6 space-y-3">
          <p className="text-eyebrow mb-2">Order Timeline</p>
          {order.timeline?.map((event, i) => (
            <div key={i} className="flex justify-between text-data">
              <span>{event.note}</span>
              <span className="text-caption">
                {new Date(event.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}