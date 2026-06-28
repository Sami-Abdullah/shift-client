import { MapPin, Mail, Package } from "lucide-react";

export default function CustomerInfo({ customer, shipping }) {
  return (
    <div className="border border-border bg-muted p-6">
      <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5 pb-4 border-b border-border">
        Customer & Shipping
      </p>

      {/* Customer */}
      <div className="mb-5">
        <p className="text-[14px] font-medium text-foreground">{customer.name}</p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <Mail size={11} className="text-muted-foreground" />
          <p className="text-[11px] text-muted-foreground">{customer.email}</p>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <MapPin size={11} className="text-muted-foreground" />
          <p className="text-[11px] text-muted-foreground">{customer.location}</p>
        </div>
      </div>

      {/* Shipping address */}
      <div className="pt-4 border-t border-border">
        <p className="text-[9px] font-bold tracking-[0.16em] uppercase text-muted-foreground mb-3">
          Delivery Address
        </p>
        <p className="text-[12px] text-foreground leading-relaxed">
          {shipping.address}<br />
          {shipping.city}, {shipping.postal}<br />
          {shipping.country}
        </p>
        <div className="flex items-center gap-1.5 mt-3">
          <Package size={11} className="text-muted-foreground" />
          <p className="text-[11px] text-muted-foreground">{shipping.method} Shipping</p>
        </div>
        {shipping.tracking && (
          <p className="text-[10px] font-mono text-muted-foreground mt-1 ml-[19px]">
            {shipping.tracking}
          </p>
        )}
      </div>
    </div>
  );
}