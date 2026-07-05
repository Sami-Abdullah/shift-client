import { serverFetch } from "@/lib/core/server";

export async function getAdminProducts({ search = "", page = 1, limit = 12, category = "", stockStatus = "" } = {}) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (search) params.set("search", search);
  if (category && category !== "All") params.set("category", category);
  if (stockStatus && stockStatus !== "All") params.set("stockStatus", stockStatus);
  return serverFetch(`/api/products?${params}`);
}

export async function getAdminProductById(id) {
  return serverFetch(`/api/products/${id}`);
}

export async function checkSkuAvailability(sku, excludeId = null) {
  if (!sku) return true;
  const params = new URLSearchParams({ sku: sku.toUpperCase() });
  const data = await serverFetch(`/api/products?${params}`);
  const match = data.products?.[0];
  if (!match) return true;
  return excludeId ? match._id === excludeId : false;
}

export async function getLowStockProducts(limit = 5) {
  return serverFetch(`/api/products?stockStatus=low&limit=${limit}`);
}