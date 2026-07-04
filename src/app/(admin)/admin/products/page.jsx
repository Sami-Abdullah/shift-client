import { getAdminProducts } from "@/lib/api/admin/products";
import Products from "@/components/admin/products/Products";

export default async function ProductsPage({ searchParams }) {
  const { search = "", page = "1" } = await searchParams;

  const data = await getAdminProducts({ search, page: Number(page) });

  return (
    <div className="p-10 max-w-screen-xl mx-auto">
      <Products
        products={data.products}
        pagination={data.pagination}
        search={search}
        page={Number(page)}
      />
    </div>
  );
}