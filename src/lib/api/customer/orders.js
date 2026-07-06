import { serverFetch } from "@/lib/core/server";

export async function getMyOrders() {
  return serverFetch("/api/orders/my");
}

export async function getOrderById(id) {
  return serverFetch(`/api/orders/${id}`);
}