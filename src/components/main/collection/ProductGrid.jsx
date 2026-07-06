"use client";
import React from "react";
import ProductCard from "./PorductCard";

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="flex-1 py-24 text-center">
        <p className="text-xs text-zinc-500 tracking-wide">No products match these filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 flex-1">
      {products.map((item) => (
        <ProductCard key={item._id} product={item} />
      ))}
    </div>
  );
}