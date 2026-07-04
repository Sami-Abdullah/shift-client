import { getAdminProductById } from "@/lib/api/admin/products";
import EditProductClient from "@/components/admin/products/edit/EditProductClient";

export default async function EditProductPage({ params }) {
  const { id } = await params;

  let product = null;
  try {
    const data = await getAdminProductById(id);
    product = data.product;
  } catch {
    product = null;
  }

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