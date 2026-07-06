export default function CheckoutSummary({ cart }) {
  const subtotal = cart.total || 0;
  const shippingCost = subtotal >= 500 ? 0 : 25;
  const tax = Math.round(subtotal * 0.1 * 100) / 100;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="border border-border p-6 h-fit space-y-5">
      <h2 className="text-[10px] uppercase tracking-[0.25em] text-brand-primary/50 font-medium pb-4 border-b border-border">
        Order Summary
      </h2>

      <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
        {cart.items.map((item) => (
          <div key={`${item.product}-${item.size}`} className="flex gap-3">
            <div className="w-12 h-14 bg-muted shrink-0 overflow-hidden relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-brand-secondary truncate">{item.name}</p>
              <p className="text-[9px] text-brand-primary/50 uppercase tracking-wider mt-0.5">
                {item.size} · Qty {item.quantity}
              </p>
            </div>
            <p className="text-[11px] text-brand-primary/70 shrink-0">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-xs pt-4 border-t border-border">
        <div className="flex justify-between text-brand-primary/60">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-brand-primary/60">
          <span>Shipping</span>
          <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-brand-primary/60">
          <span>Tax (est.)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-border">
        <span className="text-xs uppercase tracking-widest text-brand-primary/80">Total</span>
        <span className="text-lg font-serif text-brand-secondary">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}