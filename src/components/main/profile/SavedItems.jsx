"use client";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { Heart } from "lucide-react";
import { removeFromWishlist } from "@/lib/actions/customer/wishlist";

export default function SavedItems({ items }) {
  const [isPending, startTransition] = useTransition();

  const handleRemove = (productId) => {
    startTransition(async () => {
      try {
        await removeFromWishlist(productId);
        toast.success("Removed from saved items");
      } catch (err) {
        toast.error(err.message || "Failed to remove item");
      }
    });
  };

  return (
    <div className="border border-border bg-muted/20 p-8">
      <div className="pb-5 mb-6 border-b border-border">

        <h2 className="text-heading" style={{ fontSize: "16px" }}>Your Wishlist</h2>
      </div>

      {items.length === 0 ? (
        <p className="text-body text-muted-foreground">No saved items yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item._id} className="group relative">
              <Link href={`/collections/product/${item._id}`}>
                <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                  <Image src={item.images?.[0]} alt={item.name} fill className="object-cover" unoptimized />
                </div>
                <p className="text-data mt-2 truncate">{item.name}</p>
                <p className="text-caption">${item.price.toLocaleString()}</p>
              </Link>
              <button
                onClick={() => handleRemove(item._id)}
                disabled={isPending}
                className="absolute top-2 right-2 w-7 h-7 bg-brand-neutral/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                title="Remove from saved items"
              >
                <Heart className="h-3.5 w-3.5 fill-current text-brand-secondary" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}