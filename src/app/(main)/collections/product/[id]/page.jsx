import ProductSuggestion from "@/components/main/pdp/ProductSuggestion";
import ProductHero from "@/components/main/pdp/ProductHero";
import { getProductById, getRelatedProducts } from "@/lib/api/customer/products";
import { getWishlist } from "@/lib/api/customer/wishlist";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  let product = null;
  try {
    const data = await getProductById(id);
    product = data.product;
  } catch {
    product = null;
  }

  if (!product) {
    return (
      <div className="min-h-screen w-full bg-brand-neutral text-brand-secondary flex items-center justify-center">
        <p className="text-body text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  let isWishlisted = false;
  try {
    const wishlistData = await getWishlist();
    isWishlisted = wishlistData.wishlist.some((p) => p._id === product._id);
  } catch {
    isWishlisted = false;
  }

  let relatedProducts = [];
  try {
    relatedProducts = await getRelatedProducts(product.category, product._id);
  } catch {
    relatedProducts = [];
  }

  return (
    <div className="min-h-screen w-full bg-brand-neutral text-brand-secondary selection:bg-brand-secondary selection:text-brand-neutral">
      <ProductHero product={product} initialWishlisted={isWishlisted} />
      {relatedProducts.length > 0 && <ProductSuggestion products={relatedProducts} />}
    </div>
  );
}