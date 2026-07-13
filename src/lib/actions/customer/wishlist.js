"use server";

import { serverFetch } from "@/lib/core/server";
import { revalidatePath } from "next/cache";

export async function addToWishlist(productId) {
  try {
    const result = await serverFetch(`/api/wishlist/${productId}`, { method: "POST" });
    revalidatePath("/profile");
    return result;
  } catch (err) {
    if (err.status === 401) {
      return { success: false, requiresAuth: true };
    }
    return { success: false, message: err.message || "Failed to update saved items" };
  }
}

export async function removeFromWishlist(productId) {
  try {
    const result = await serverFetch(`/api/wishlist/${productId}`, { method: "DELETE" });
    revalidatePath("/profile");
    return result;
  } catch (err) {
    if (err.status === 401) {
      return { success: false, requiresAuth: true };
    }
    return { success: false, message: err.message || "Failed to update saved items" };
  }
}