import { serverFetch } from "@/lib/core/server";

export async function getCart() {
  return serverFetch("/api/cart");
}