import ProductRow from "./ProductRow";

const columns = [
  { label: "Product Details", align: "text-left" },
  { label: "SKU",             align: "text-left" },
  { label: "Stock Status",    align: "text-left" },
  { label: "Price",           align: "text-right" },
  { label: "Actions",         align: "text-right" },
];

export default function ProductsTable({ products }) {
  return (
    <div>
      <div className="grid grid-cols-[2.4fr_1fr_1.1fr_0.7fr_88px] gap-6 pb-4 border-b border-border">
        {columns.map(({ label, align }) => (
          <p
            key={label}
            className={`text-[9px] font-bold tracking-[0.2em] uppercase text-muted-foreground ${align}`}
          >
            {label}
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