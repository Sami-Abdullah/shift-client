import ProductsHeader from "./ProductsHeader";
import ProductsTable from "./ProductsTable";
import Pagination from "./Pagination";

export default function Products({ products, pagination, search, page }) {
  return (
    <>
      <ProductsHeader total={pagination.total} search={search} />
      <ProductsTable products={products} />
      <Pagination
        current={pagination.page}
        total={pagination.totalPages}
        shown={products.length}
        totalItems={pagination.total}
      />
    </>
  );
}