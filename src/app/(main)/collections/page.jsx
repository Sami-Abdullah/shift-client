import CollectionHeader from "@/components/main/collection/CollectionHeader";
import CollectionPagination from "@/components/main/collection/CollectionPagination";
import FilterSidebar from "@/components/main/collection/Filter-sidebar";
import ProductGrid from "@/components/main/collection/ProductGrid";
import React from "react";


// Context collection mock (Import directly from your custom JSON store module)
const ATELIER_PRODUCTS = [
  {
    id: "garment-001",
    name: "Heavyweight Supima Tee",
    slug: "heavyweight-supima-tee",
    collection: "Essential Line",
    price: 85.00,
    images: ["/images/products/tee-white.jpg"]
  },
  {
    id: "garment-002",
    name: "Structured Wool Overcoat",
    slug: "structured-wool-overcoat",
    collection: "Outerwear",
    price: 495.00,
    images: ["/images/products/coat-grey.jpg"]
  },
  {
    id: "garment-003",
    name: "Slim-Fit Chino Pant",
    slug: "slim-fit-chino-pant",
    collection: "Tailoring",
    price: 145.00,
    images: ["/images/products/pants-black.jpg"]
  },
  {
    id: "garment-004",
    name: "Cashmere Mock-Neck",
    slug: "cashmere-mock-neck",
    collection: "Knitwear",
    price: 280.00,
    images: ["/images/products/sweater-blue.jpg"]
  },
  {
    id: "garment-005",
    name: "Standard Boxy Fit Shirt",
    slug: "standard-boxy-fit-shirt",
    collection: "Essential Line",
    price: 95.00,
    images: ["/images/products/shirt-white-stack.jpg"]
  },
  {
    id: "garment-006",
    name: "Relaxed Tapered Trousers",
    slug: "relaxed-tapered-trousers",
    collection: "Tailoring",
    price: 160.00,
    images: ["/images/products/pants-tan.jpg"]
  }
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 selection:bg-zinc-100 selection:text-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-10">
        
        {/* Dynamic Section Title and Tools Controls */}
        <CollectionHeader />

        {/* Master Catalog Layout Flex Area */}
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <FilterSidebar />
          <ProductGrid products={ATELIER_PRODUCTS} />
        </div>

        {/* Page Traversal Footer Block */}
        <CollectionPagination />
        
      </div>
    </div>
  );
}