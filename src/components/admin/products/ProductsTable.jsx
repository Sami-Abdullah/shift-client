import ProductRow from "./ProductRow";

const columns = [
  "Product Details",
  "SKU",
  "Stock Status",
  "Price",
  "Actions",
];

export default function ProductsTable({ products }) {
  return (
    <div>
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-6 pb-4 border-b border-border">
        {columns.map((col) => (
          <p
            key={col}
            className="text-[9px] font-bold tracking-[0.2em] uppercase text-muted-foreground"
          >
            {col}
          </p>
        ))}
      </div>

      {products.length > 0 ? (
        products.map((product) => (
          <ProductRow key={product._id} product={product} />
        ))
      ) : (
        <div className="py-20 text-center">
          <p className="text-[12px] text-muted-foreground">No products found.</p>
        </div>
      )}
    </div>
  );
}