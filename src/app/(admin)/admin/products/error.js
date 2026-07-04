"use client";

export default function Error({ error, reset }) {
  return (
    <div className="p-10 text-center">
      <p className="text-[13px] text-muted-foreground mb-4">
        Something went wrong loading products.
      </p>
      <button
        onClick={reset}
        className="px-6 py-2.5 border border-border text-[10px] font-bold tracking-[0.18em] uppercase hover:border-foreground/30 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}