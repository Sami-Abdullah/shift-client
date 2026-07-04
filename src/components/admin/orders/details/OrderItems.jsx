import Image from "next/image";

export default function OrderItems({ order }) {
  return (
    <div className="border border-border bg-muted p-6">
      <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5 pb-4 border-b border-border">
        Items Ordered
      </p>

      <div className="flex flex-col gap-4">
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-16 h-20 bg-background overflow-hidden shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={80}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-medium text-foreground">{item.name}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 tracking-[0.1em] uppercase">
                Size: {item.size} · Qty: {item.quantity}
              </p>
            </div>
            <p
              className="text-[15px] font-light text-foreground"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              ${(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-5 border-t border-border flex flex-col gap-2">
        <div className="flex justify-between text-[11px]">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">${order.subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground">
            {order.shippingCost === 0 ? "Free" : `$${order.shippingCost}`}
          </span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-muted-foreground">Tax</span>
          <span className="text-foreground">${order.tax}</span>
        </div>
        <div className="flex justify-between pt-3 border-t border-border mt-1">
          <span className="text-[12px] font-bold tracking-[0.14em] uppercase text-foreground">Total</span>
          <span
            className="text-[20px] font-light text-foreground"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            ${order.total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}