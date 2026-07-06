import { serverFetch } from "@/lib/core/server";

export async function getProductById(id) {
  return serverFetch(`/api/products/${id}`);
}

export async function getProducts({ category = "", size = "", sort = "newest", page = 1, limit = 12 } = {}) {
  const params = new URLSearchParams({
    visible: "true", // storefront only ever sees visible products, per doc
    sort,
    page: String(page),
    limit: String(limit),
  });
  if (category) params.set("category", category);
  if (size) params.set("size", size);
  return serverFetch(`/api/products?${params}`);
}

export async function getRelatedProducts(category, excludeId, limit = 3) {
  const params = new URLSearchParams({
    category,
    visible: "true",
    limit: String(limit + 1),
  });
  const data = await serverFetch(`/api/products?${params}`);
  return data.products.filter((p) => p._id !== excludeId).slice(0, limit);
}