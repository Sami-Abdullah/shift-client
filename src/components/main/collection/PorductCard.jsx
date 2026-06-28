"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductCard({ product }) {
  return (
    <Link href={`/collections/product/${product.id}`} className="group block">
      {/* Remove Shadcn v4 default borders and backgrounds inline */}
      <Card className="bg-transparent shadow-none border-0 ring-0 space-y-4 rounded-none text-left">
        <CardContent className="p-0">
          {/* Architectural Image Container */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
              priority
            />
          </div>
          
          {/* Typography Metadata stack */}
          <div className="mt-4 space-y-1 text-center">
            <span className="block text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-medium font-sans">
              {product.collection || "Essential Line"}
            </span>
            <h3 className="text-xs font-normal tracking-wide text-zinc-200 font-serif">
              {product.name}
            </h3>
            <p className="text-[11px] tracking-wider text-zinc-400 font-sans">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}