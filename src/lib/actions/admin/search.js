"use server";
import { serverFetch } from "@/lib/core/server";

export async function searchAdmin(query) {
  if (!query || query.trim().length < 2) {
    return { products: [], orders: [] };
  }

  const [productsData, ordersData] = await Promise.all([
    serverFetch(`/api/products?search=${encodeURIComponent(query)}&limit=4`),
    serverFetch(`/api/orders?search=${encodeURIComponent(query)}&limit=4`),
  ]);

  return {
    products: productsData.products,
    orders: ordersData.orders,
  };
}