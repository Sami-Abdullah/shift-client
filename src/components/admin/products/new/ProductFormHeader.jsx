import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ProductFormHeader() {
  return (
    <div className="mb-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-5">
        <Link
          href="/admin/products"
          className="text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          Products
        </Link>
        <ChevronRight size={10} className="text-muted-foreground" />
        <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-foreground">
          New Product
        </span>
      </div>

      {/* Title */}
      <h1
        className="text-[36px] font-light tracking-[0.06em] text-foreground leading-none"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Add New Product
      </h1>
    </div>
  );
}