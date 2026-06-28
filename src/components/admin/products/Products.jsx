"use client";
import { useState } from "react";
import ProductsHeader from "./ProductsHeader";
import ProductsTable from "./ProductsTable";
import Pagination from "./Pagination";


const PRODUCTS = [
  {
    id: 1,
    name: "Column Overcoat",
    category: "Outerwear",
    material: "Wool Double-Breasted",
    sku: "FRM-C-104-BLK",
    stock: 12,
    stockStatus: "low",
    price: 1240,
    img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200&q=80&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Monolith Knit",
    category: "Knitwear",
    material: "Cashmere",
    sku: "FRM-K-882-CRM",
    stock: 48,
    stockStatus: "in",
    price: 850,
    img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&q=80&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Crease Trouser",
    category: "Bottoms",
    material: "Wool Gabardine",
    sku: "FRM-T-211-GRY",
    stock: 32,
    stockStatus: "in",
    price: 595,
    img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&q=80&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Void Shirt",
    category: "Tops",
    material: "Obsidian Poplin",
    sku: "FRM-S-445-BLK",
    stock: 0,
    stockStatus: "out",
    price: 290,
    img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&q=80&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Arch Tote",
    category: "Accessories",
    material: "Structured Grain Leather",
    sku: "FRM-A-009-TAN",
    stock: 5,
    stockStatus: "low",
    price: 750,
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Brutalist Boot",
    category: "Footwear",
    material: "Polished Calfskin",
    sku: "FRM-F-330-BLK",
    stock: 18,
    stockStatus: "in",
    price: 890,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80&auto=format&fit=crop",
  },
];

export default function Products() {
  const [products, setProducts] = useState(PRODUCTS);
  const [search, setSearch]     = useState("");
  const [page, setPage]         = useState(1);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <ProductsHeader
        total={filtered.length}
        search={search}
        onSearch={setSearch}
      />
      <ProductsTable
        products={filtered}
        onDelete={handleDelete}
      />
      <Pagination
        current={page}
        total={3}
        shown={filtered.length}
        totalItems={124}
        onChange={setPage}
      />
    </>
  );
}