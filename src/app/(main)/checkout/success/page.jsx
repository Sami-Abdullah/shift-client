import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Order Confirmed</p>
      <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-zinc-100 font-serif">
        Thank you for your order
      </h1>
      <p className="text-xs text-zinc-400 max-w-md">
        A confirmation email is on its way. Your order will appear in your profile's order history shortly.
      </p>
      <Link
        href="/"
        className="text-[10px] uppercase tracking-[0.2em] border border-zinc-800 px-6 py-3 hover:border-zinc-600 transition-colors mt-4"
      >
        Return to Homepage
      </Link>
    </div>
  );
}