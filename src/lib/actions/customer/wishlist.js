"use server";

import { serverFetch } from "@/lib/core/server";
import { revalidatePath } from "next/cache";

export async function addToWishlist(productId) {
  const result = await serverFetch(`/api/wishlist/${productId}`, { method: "POST" });
  revalidatePath("/profile");
  return result;
}

export async function removeFromWishlist(productId) {
  const result = await serverFetch(`/api/wishlist/${productId}`, { method: "DELETE" });
  revalidatePath("/profile");
  return result;
}