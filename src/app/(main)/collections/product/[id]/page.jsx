import React from "react";

import ProductSuggestion from "@/components/main/pdp/ProductSuggestion";
import ProductSpecs from "@/components/main/pdp/ProductSpecs";
import ProductFeatures from "@/components/main/pdp/ProductFeatures";
import ProductHero from "@/components/main/pdp/ProductHero";


const ProductDetailPage=({params})=> {
  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 selection:bg-zinc-100 selection:text-zinc-950">
      {/* 1. Hero Block View */}
      <ProductHero />

      {/* 2. Asymmetric Lookbook Callout Features Grid */}
      <ProductFeatures />

      {/* 3. Deep Architectural Technical Description */}
      <ProductSpecs />

      {/* 4. Cross-Sell Look Ecosystem Grid */}
      <ProductSuggestion />
    </div>
  );
}

export default ProductSuggestion