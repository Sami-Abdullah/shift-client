"use client";
import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const STATUSES = [
  { value: "pending", label: "Pending", color: "text-muted-foreground" },
  { value: "processing", label: "Processing", color: "text-[#fbbf24]" },
  { value: "shipped", label: "Shipped", color: "text-[#60a5fa]" },
  { value: "delivered", label: "Delivered", color: "text-[#4ade80]" },
  { value: "cancelled", label: "Cancelled", color: "text-[#f87171]" },
];

export default function OrderStatusDialog({ open, onClose, order, onUpdateStatus }) {
  const [selected, setSelected] = useState(order?.status || "");
  const [tracking, setTracking] = useState(order?.trackingNumber || "");

  if (!order) return null;
  const shortId = order._id?.slice(-8).toUpperCase();

  const handleConfirm = () => {
    onUpdateStatus(order._id, selected, selected === "shipped" ? tracking : undefined);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0D0D0D] border border-border rounded-none max-w-sm">
        <DialogHeader>
          <DialogTitle
            className="text-[16px] font-light text-foreground"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Update Order Status
          </DialogTitle>
          <DialogDescription className="text-[11px] text-muted-foreground mt-1">
            #{shortId} · {order.customerName}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-1 mt-2">
          {STATUSES.map(({ value, label, color }) => {
            const active = selected === value;
            const disabled = value === "cancelled" && ["shipped", "delivered"].includes(order.status);

            return (
              <button
                key={value}
                onClick={() => !disabled && setSelected(value)}
                disabled={disabled}
                className={`flex items-center justify-between px-4 py-3 border transition-colors text-left ${disabled
                    ? "opacity-30 cursor-not-allowed border-transparent"
                    : active
                      ? "border-foreground/30 bg-muted"
                      : "border-transparent hover:bg-muted hover:border-border"
                  }`}
              >
                <span className={`text-[11px] font-bold tracking-[0.14em] uppercase ${color}`}>
                  {label}
                </span>
                {order.status === value && (
                  <span className="text-[9px] tracking-[0.12em] uppercase text-muted-foreground">
                    Current
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {selected === "shipped" && (
          <div className="mt-3 pt-3 border-t border-border">
            <label className="block text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-2">
              Tracking Number
            </label>
            <Input
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              placeholder="e.g. DHL-8821-FR"
              className="rounded-none bg-muted border-border text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-0 focus-visible:border-foreground/30 h-9 text-[12px] font-mono"
            />
          </div>
        )}

        {selected === "cancelled" && (
          <p className="text-[10px] text-[#f87171] mt-2 pt-3 border-t border-border">
            This will mark the payment as refunded. Use the refund button on the order detail page to process the actual Stripe refund.
          </p>
        )}

        <div className="flex gap-3 mt-4">
          <button
            onClick={onClose}
            className="flex-1 border border-border text-muted-foreground text-[10px] font-bold tracking-[0.16em] uppercase py-2.5 hover:border-foreground/30 hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={selected === order.status}
            className="flex-1 bg-foreground text-background text-[10px] font-bold tracking-[0.16em] uppercase py-2.5 hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}