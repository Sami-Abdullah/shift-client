

// Simulating fetching product by ID

import EditProductClient from "../../../../../../components/admin/products/edit/EditProductClient";

const PRODUCTS = [
  {
    id: "1",
    name: "Column Overcoat",
    description: "A rigidly structured overcoat in double-faced wool. Designed for permanence, not trend. The silhouette holds its form season after season without compromise.",
    category: "Outerwear",
    sku: "FRM-C-104-BLK",
    price: "1240",
    visible: true,
    sizes: { XS: 0, S: 4, M: 5, L: 3, XL: 0 },
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80&auto=format&fit=crop",
    ],
  },
  {
    id: "2",
    name: "Monolith Knit",
    description: "Extra-fine cashmere in a weight that earns its place in a permanent wardrobe. Structured at the collar, relaxed through the body.",
    category: "Knitwear",
    sku: "FRM-K-882-CRM",
    price: "850",
    visible: true,
    sizes: { XS: 8, S: 12, M: 16, L: 10, XL: 2 },
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80&auto=format&fit=crop",
    ],
  },
  {
    id: "3",
    name: "Crease Trouser",
    description: "Wool gabardine trousers with a permanent crease. Cut straight from the hip, tapered at the ankle. A foundational piece.",
    category: "Bottoms",
    sku: "FRM-T-211-GRY",
    price: "595",
    visible: true,
    sizes: { XS: 4, S: 10, M: 12, L: 6, XL: 0 },
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80&auto=format&fit=crop",
    ],
  },
  {
    id: "4",
    name: "Void Shirt",
    description: "Obsidian poplin in a boxy cut. No embellishment, no logo. Just the fabric and the form.",
    category: "Tops",
    sku: "FRM-S-445-BLK",
    price: "290",
    visible: false,
    sizes: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80&auto=format&fit=crop",
    ],
  },
  {
    id: "5",
    name: "Arch Tote",
    description: "Vegetable-tanned grain leather. One compartment. No distractions. Ages into something better than it started.",
    category: "Accessories",
    sku: "FRM-A-009-TAN",
    price: "750",
    visible: true,
    sizes: { XS: 0, S: 0, M: 0, L: 0, XL: 5 },
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80&auto=format&fit=crop",
    ],
  },
  {
    id: "6",
    name: "Brutalist Boot",
    description: "Polished calfskin with a commando sole. Built for decades, not seasons.",
    category: "Footwear",
    sku: "FRM-F-330-BLK",
    price: "890",
    visible: true,
    sizes: { XS: 0, S: 3, M: 8, L: 5, XL: 2 },
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80&auto=format&fit=crop",
    ],
  },
];

export default async function EditProductPage({ params }) {
  const {id} = await params
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="p-10 flex items-center justify-center">
        <p className="text-muted-foreground text-[13px]">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-screen-xl mx-auto">
      <EditProductClient product={product} />
    </div>
  );
}