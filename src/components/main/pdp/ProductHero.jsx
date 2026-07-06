"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Heart, Truck } from "lucide-react";
import { addToCart } from "@/lib/actions/customer/cart";
import { addToWishlist, removeFromWishlist } from "@/lib/actions/customer/wishlist";

const SIZE_ORDER = ["XS", "S", "M", "L", "XL"];

export default function ProductHero({ product, initialWishlisted }) {
  const router = useRouter();
  const availableSizes = SIZE_ORDER.filter((s) => product.sizes[s] > 0);
  const [selectedSize, setSelectedSize] = useState(availableSizes[0] || null);
  const [isPending, startTransition] = useTransition();
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [wishlistPending, startWishlistTransition] = useTransition();

  const handleAddToBag = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    startTransition(async () => {
      try {
        await addToCart(product._id, selectedSize, 1);
        toast.success("Added to bag");
      } catch (err) {
        if (err.status === 401) {
          toast.info("Please sign in to add items to your bag");
          router.push("/signin");
        } else {
          toast.error(err.message || "Failed to add to bag");
        }
      }
    });
  };

  const handleToggleWishlist = () => {
    startWishlistTransition(async () => {
      try {
        if (wishlisted) {
          await removeFromWishlist(product._id);
          setWishlisted(false);
          toast.success("Removed from saved items");
        } else {
          await addToWishlist(product._id);
          setWishlisted(true);
          toast.success("Saved to your items");
        }
      } catch (err) {
        if (err.status === 401) {
          toast.info("Please sign in to save items");
          router.push("/signin");
        } else {
          toast.error(err.message || "Failed to update saved items");
        }
      }
    });
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 min-h-[calc(100vh-80px)] border-b border-border">
      <div className="relative md:col-span-7 aspect-[3/4] md:aspect-auto w-full bg-muted">
        <Image
          src={product.images?.[0]}
          alt={product.name}
          fill
          priority
          className="object-contain"
          unoptimized
        />
      </div>

      <div className="md:col-span-5 flex flex-col justify-center p-8 sm:p-12 lg:p-16 bg-brand-neutral text-left">
        <div className="space-y-8 max-w-sm">
          <div className="space-y-2">
            <span className="text-eyebrow">{product.category}</span>
            <h1 className="text-display" style={{ fontSize: "40px" }}>
              {product.name}
            </h1>
            <p className="text-heading" style={{ fontSize: "18px" }}>
              ${product.price.toLocaleString()}
            </p>
          </div>

          <p className="text-body text-brand-primary/70">{product.description}</p>

          <div className="space-y-3">
            <span className="text-label">Select Size</span>
            <div className="flex gap-2">
              {SIZE_ORDER.map((size) => {
                const inStock = product.sizes[size] > 0;
                return (
                  <Button
                    key={size}
                    disabled={!inStock}
                    onClick={() => setSelectedSize(size)}
                    className={`h-8 w-12 text-[10px] font-sans tracking-widest border transition-colors ${
                      !inStock
                        ? "border-border text-brand-primary/20 cursor-not-allowed line-through"
                        : selectedSize === size
                        ? "border-brand-secondary bg-brand-secondary text-brand-neutral font-medium cursor-pointer"
                        : "border-border text-brand-primary/60 hover:border-brand-primary/40 cursor-pointer"
                    }`}
                  >
                    {size}
                  </Button>
                );
              })}
            </div>
            {availableSizes.length === 0 && (
              <p className="text-caption text-red-400">Currently out of stock in all sizes.</p>
            )}
          </div>

          <div className="space-y-4 pt-4">
            <Button
              onClick={handleAddToBag}
              disabled={isPending || availableSizes.length === 0}
              className="w-full rounded-none bg-brand-secondary text-brand-neutral font-medium text-[10px] uppercase tracking-[0.25em] py-6 hover:bg-white transition-colors disabled:opacity-50"
            >
              {isPending ? "Adding..." : "Add To Bag"}
            </Button>

            <div className="flex justify-between items-center text-label pt-2">
              <button
                onClick={handleToggleWishlist}
                disabled={wishlistPending}
                className="flex items-center gap-2 hover:text-brand-secondary transition-colors cursor-pointer disabled:opacity-50"
              >
                <Heart className={`h-3 w-3 ${wishlisted ? "fill-current text-brand-secondary" : ""}`} />
                {wishlisted ? "Saved" : "Save Item"}
              </button>
              <span className="flex items-center gap-2">
                <Truck className="h-3 w-3" /> Complimentary Shipping
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}