import { serverFetch } from "@/lib/core/server";

export async function getWishlist() {
  return serverFetch("/api/wishlist");
}