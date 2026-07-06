import CollectionHeader from "@/components/main/collection/CollectionHeader";
import CollectionPagination from "@/components/main/collection/CollectionPagination";
import FilterSidebar from "@/components/main/collection/Filter-sidebar";
import ProductGrid from "@/components/main/collection/ProductGrid";
import { getProducts } from "@/lib/api/customer/products";

export default async function CollectionsPage({ searchParams }) {
  const { category = "", size = "", sort = "newest", page = "1" } = await searchParams;

  const data = await getProducts({ category, size, sort, page: Number(page) });

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 selection:bg-zinc-100 selection:text-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-10">
        <CollectionHeader sort={sort} total={data.pagination.total} />

        <div className="flex flex-col md:flex-row gap-10 items-start">
          <FilterSidebar category={category} size={size} />
          <ProductGrid products={data.products} />
        </div>

        <CollectionPagination current={data.pagination.page} totalPages={data.pagination.totalPages} />
      </div>
    </div>
  );
}