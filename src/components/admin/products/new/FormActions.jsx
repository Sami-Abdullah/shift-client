import Link from "next/link";

export default function FormActions({ loading }) {
  return (
    <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-border">
      <Link
        href="/admin/products"
        className="px-6 py-2.5 border border-border text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
      >
        Cancel
      </Link>
      <button
        type="submit"
        disabled={loading}
        className="px-8 py-2.5 bg-foreground text-background text-[10px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Saving..." : "Save Product"}
      </button>
    </div>
  );
}