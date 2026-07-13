"use server";

import { serverFetch } from "@/lib/core/server";
import { revalidatePath } from "next/cache";

export async function addToCart(productId, size, quantity = 1) {
  try {
    const result = await serverFetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ productId, size, quantity }),
    });
    revalidatePath("/cart");
    return result;
  } catch (err) {
    if (err.status === 401) {
      return { success: false, requiresAuth: true };
    }
    return { success: false, message: err.message || "Failed to add to bag" };
  }
}

export async function updateCartItem(productId, size, quantity) {
  try {
    const result = await serverFetch(`/api/cart/${productId}`, {
      method: "PATCH",
      body: JSON.stringify({ size, quantity }),
    });
    revalidatePath("/cart");
    return result;
  } catch (err) {
    if (err.status === 401) {
      return { success: false, requiresAuth: true };
    }
    return { success: false, message: err.message || "Failed to update cart" };
  }
}

export async function removeFromCart(productId, size) {
  try {
    const result = await serverFetch(`/api/cart/${productId}?size=${size}`, {
      method: "DELETE",
    });
    revalidatePath("/cart");
    return result;
  } catch (err) {
    if (err.status === 401) {
      return { success: false, requiresAuth: true };
    }
    return { success: false, message: err.message || "Failed to remove item" };
  }
}