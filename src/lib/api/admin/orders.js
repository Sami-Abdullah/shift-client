import { serverFetch } from "@/lib/core/server";

export async function getAdminOrders({ search = "", status = "", page = 1, limit = 20 } = {}) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (search) params.set("search", search);
  if (status && status !== "All") params.set("status", status.toLowerCase());
  return serverFetch(`/api/orders?${params}`);
}

export async function getAdminOrderById(id) {
  return serverFetch(`/api/orders/${id}`);
}