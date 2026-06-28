"use client";
import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const REASONS = [
  "Customer requested cancellation",
  "Item out of stock",
  "Damaged in transit",
  "Wrong item delivered",
  "Customer not satisfied",
  "Other",
];

export default function RefundDialog({ open, onClose, order, onConfirm }) {
  const [amount, setAmount] = useState(order?.total || "");
  const [reason, setReason] = useState("");
  const [type,   setType]   = useState("full");
  const [error,  setError]  = useState("");

  if (!order) return null;

  const handleConfirm = () => {
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid refund amount");
      return;
    }
    if (Number(amount) > order.total) {
      setError(`Amount cannot exceed order total of $${order.total}`);
      return;
    }
    if (!reason) {
      setError("Please select a reason for the refund");
      return;
    }
    setError("");
    onConfirm(Number(amount), reason);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0D0D0D] border border-border rounded-none max-w-sm">
        <DialogHeader>
          <DialogTitle
            className="text-[16px] font-light text-foreground"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Issue Refund
          </DialogTitle>
          <DialogDescription className="text-[11px] text-muted-foreground mt-1">
            #{order.id} · Total: ${order.total.toLocaleString()}
          </DialogDescription>
        </DialogHeader>

        {/* Full / Partial toggle */}
        <div className="flex gap-0 mt-2">
          {["full", "partial"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setType(t);
                setAmount(t === "full" ? order.total : "");
                setError("");
              }}
              className={`flex-1 py-2 text-[10px] font-bold tracking-[0.16em] uppercase border transition-colors ${
                type === t
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "full" ? `Full — $${order.total}` : "Partial"}
            </button>
          ))}
        </div>

        {/* Amount */}
        {type === "partial" && (
          <div className="mt-3">
            <label className="block text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-2">
              Refund Amount (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-muted-foreground">$</span>
              <Input
                type="number"
                min="1"
                max={order.total}
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setError(""); }}
                placeholder="0.00"
                className="rounded-none bg-muted border-border text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-0 focus-visible:border-foreground/30 h-9 text-[13px] pl-7"
              />
            </div>
          </div>
        )}

        {/* Reason */}
        <div className="mt-3">
          <label className="block text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-2">
            Reason
          </label>
          <select
            value={reason}
            onChange={(e) => { setReason(e.target.value); setError(""); }}
            className="w-full h-9 bg-muted border border-border px-3 text-[12px] text-foreground focus:outline-none focus:border-foreground/30 transition-colors appearance-none cursor-pointer"
          >
            <option value="" disabled className="bg-background">Select a reason...</option>
            {REASONS.map((r) => (
              <option key={r} value={r} className="bg-background">{r}</option>
            ))}
          </select>
        </div>

        {/* Error */}
        {error && (
          <p className="text-[10px] text-[#f87171] mt-1">{error}</p>
        )}

        {/* Warning */}
        <div className="mt-3 p-3 border border-[rgba(251,191,36,0.2)] bg-[rgba(251,191,36,0.05)]">
          <p className="text-[10px] text-[#fbbf24] leading-relaxed">
            This will send a refund request to Stripe. The amount will be returned to the customer&apos;s original payment method within 5–10 business days.
          </p>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={onClose}
            className="flex-1 border border-border text-muted-foreground text-[10px] font-bold tracking-[0.16em] uppercase py-2.5 hover:border-foreground/30 hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-[#f87171] text-[#0D0D0D] text-[10px] font-bold tracking-[0.16em] uppercase py-2.5 hover:bg-[#ef4444] transition-colors"
          >
            Confirm Refund
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}