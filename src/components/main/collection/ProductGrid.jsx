"use client";

import React from "react";
import ProductCard from "./PorductCard";

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 flex-1">
      {products.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}