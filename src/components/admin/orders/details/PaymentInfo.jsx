import { CreditCard } from "lucide-react";

const paymentStyles = {
  paid:     "text-[#4ade80] border-[rgba(74,222,128,0.3)]",
  refunded: "text-[#f87171] border-[rgba(248,113,113,0.3)]",
};

export default function PaymentInfo({ order }) {
  return (
    <div className="border border-border bg-muted p-6">
      <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5 pb-4 border-b border-border">
        Payment
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CreditCard size={13} strokeWidth={1.5} className="text-muted-foreground" />
          <p className="text-[12px] text-foreground">
            {order.payment.method} ···· {order.payment.last4}
          </p>
        </div>
        <span className={`text-[9px] font-bold tracking-[0.14em] uppercase border px-2.5 py-1 ${paymentStyles[order.payment.status] || "text-muted-foreground border-border"}`}>
          {order.payment.status}
        </span>
      </div>

      <div className="text-[10px] text-muted-foreground font-mono pt-3 border-t border-border">
        <p className="mb-1">Payment Intent</p>
        <p className="text-foreground">{order.payment.stripePaymentIntentId || "—"}</p>
      </div>

      {order.refund && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-[9px] font-bold tracking-[0.16em] uppercase text-[#f87171] mb-2">
            Refund Issued
          </p>
          <p className="text-[12px] text-foreground">${order.refund.amount.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground mt-1">{order.refund.reason}</p>
          {order.refund.date && (
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {new Date(order.refund.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            </p>
          )}
          <p className="text-[10px] font-mono text-muted-foreground mt-1">{order.refund.stripeRefundId}</p>
        </div>
      )}
    </div>
  );
}