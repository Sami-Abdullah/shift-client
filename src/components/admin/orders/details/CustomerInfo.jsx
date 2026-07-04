import { MapPin, Mail, Package } from "lucide-react";

export default function CustomerInfo({ order }) {
  const shipping = order.shippingAddress;

  return (
    <div className="border border-border bg-muted p-6">
      <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5 pb-4 border-b border-border">
        Customer & Shipping
      </p>

      <div className="mb-5">
        <p className="text-[14px] font-medium text-foreground">{order.customerName}</p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <Mail size={11} className="text-muted-foreground" />
          <p className="text-[11px] text-muted-foreground">{order.customerEmail}</p>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <MapPin size={11} className="text-muted-foreground" />
          <p className="text-[11px] text-muted-foreground">{shipping.city}, {shipping.country}</p>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-[9px] font-bold tracking-[0.16em] uppercase text-muted-foreground mb-3">
          Delivery Address
        </p>
        <p className="text-[12px] text-foreground leading-relaxed">
          {shipping.address}<br />
          {shipping.city}, {shipping.postal}<br />
          {shipping.country}
        </p>
        {order.trackingNumber && (
          <div className="flex items-center gap-1.5 mt-3">
            <Package size={11} className="text-muted-foreground" />
            <p className="text-[11px] font-mono text-muted-foreground">{order.trackingNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
}