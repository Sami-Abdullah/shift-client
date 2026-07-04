"use client";
import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Copy, Trash2 } from "lucide-react";
import DeleteDialog from "./DeleteDialog";
import { deleteProduct } from "@/lib/actions/admin/products";

const stockConfig = {
  in:  { label: "IN STOCK",  color: "bg-foreground",          text: "text-background" },
  low: { label: "LOW STOCK", color: "bg-[#fbbf24]",           text: "text-[#0D0D0D]" },
  out: { label: "OUT OF STOCK", color: "bg-[rgba(248,113,113,0.15)]", text: "text-[#f87171]" },
};

export default function ProductRow({ product }) {
  const [showDelete, setShowDelete] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const stock = stockConfig[product.stockStatus];

  const handleConfirmDelete = () => {
    setError("");
    startTransition(async () => {
      try {
        await deleteProduct(product._id);
        setShowDelete(false);
      } catch (err) {
        setError(err.message);
        setShowDelete(false);
      }
    });
  };

  return (
    <>
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-6 py-6 border-b border-border items-center hover:bg-muted/20 transition-colors group">

        <div className="flex items-center gap-5">
          <div className="w-[72px] h-[90px] bg-muted overflow-hidden shrink-0">
            <Image
              src={product.images?.[0] || product.img}
              alt={product.name}
              width={72}
              height={90}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <h3
                className="text-[15px] font-light tracking-[0.1em] uppercase text-foreground"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {product.name}
              </h3>
            </div>
            <p className="text-[9px] font-bold tracking-[0.16em] uppercase text-muted-foreground">
              {product.category}
            </p>
          </div>
        </div>

        <p className="text-[11px] font-mono text-muted-foreground">
          {product.sku}
        </p>

        <div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold tracking-[0.14em] uppercase ${stock.color} ${stock.text}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
            {product.totalStock > 0 ? `${product.totalStock} ` : ""}
            {stock.label}
          </span>
        </div>

        <p
          className="text-[15px] font-light text-foreground"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          ${product.price.toLocaleString()}
        </p>

        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/admin/products/${product._id}/edit`}
            className="w-8 h-8 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            title="Edit"
          >
            <Pencil size={12} />
          </Link>
          <button
            className="w-8 h-8 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            title="Duplicate"
          >
            <Copy size={12} />
          </button>
          <button
            onClick={() => setShowDelete(true)}
            className="w-8 h-8 flex items-center justify-center border border-[rgba(248,113,113,0.2)] text-[#f87171]/50 hover:text-[#f87171] hover:border-[rgba(248,113,113,0.5)] transition-colors"
            title="Delete"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {error && (
        <p className="text-[10px] text-[#f87171] mt-1 mb-2">{error}</p>
      )}

      <DeleteDialog
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleConfirmDelete}
        productName={product.name}
        loading={isPending}
      />
    </>
  );
}