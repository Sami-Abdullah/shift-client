import { serverFetch } from "@/lib/core/server";

export async function getAdminProducts({ search = "", page = 1, limit = 12 } = {}) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (search) params.set("search", search);
  return serverFetch(`/api/products?${params}`);
}

export async function getAdminProductById(id) {
  return serverFetch(`/api/products/${id}`);
}