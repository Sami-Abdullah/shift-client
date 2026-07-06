"use client";
import Link from "next/link";
import CartItem from "./CartItem";

export default function CartPageClient({ cart }) {
  const isEmpty = !cart.items || cart.items.length === 0;

  const subtotal = cart.total || 0;
  const shippingCost = subtotal >= 500 ? 0 : 25;
  const tax = Math.round(subtotal * 0.1 * 100) / 100;
  const total = subtotal + shippingCost + tax;

  if (isEmpty) {
    return (
      <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center gap-6">
        <p className="text-sm text-zinc-500 tracking-wide">Your bag is empty.</p>
        <Link
          href="/collections"
          className="text-[10px] uppercase tracking-[0.2em] border border-zinc-800 px-6 py-3 hover:border-zinc-600 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-zinc-100 font-serif mb-10">
          Shopping Bag
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {cart.items.map((item) => (
              <CartItem key={`${item.product}-${item.size}`} item={item} />
            ))}
          </div>

          <div className="border border-zinc-900 p-6 h-fit space-y-4">
            <h2 className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-medium pb-4 border-b border-zinc-900">
              Order Summary
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Tax (est.)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-zinc-900">
              <span className="text-xs uppercase tracking-widest text-zinc-300">Total</span>
              <span className="text-lg font-serif text-zinc-100">${total.toFixed(2)}</span>
            </div>

            <Link
              href="/checkout"
              className="block w-full text-center bg-zinc-100 text-zinc-950 text-[10px] font-medium uppercase tracking-[0.25em] py-4 hover:bg-zinc-200 transition-colors"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}