import { getAdminProducts } from "@/lib/api/admin/products";
import Products from "@/components/admin/products/Products";

export default async function ProductsPage({ searchParams }) {
  const { search = "", category = "All", stockStatus = "All", page = "1" } = await searchParams;

  const data = await getAdminProducts({ search, category, stockStatus, page: Number(page) });

  return (
    <div className="p-10 max-w-screen-xl mx-auto">
      <Products
        products={data.products}
        pagination={data.pagination}
        search={search}
        category={category}
        stockStatus={stockStatus}
        page={Number(page)}
      />
    </div>
  );
}