"use server";

import { serverFetch } from "@/lib/core/server";
import { revalidatePath } from "next/cache";

export async function addToCart(productId, size, quantity = 1) {
  const result = await serverFetch("/api/cart", {
    method: "POST",
    body: JSON.stringify({ productId, size, quantity }),
  });
  revalidatePath("/cart");
  return result;
}

export async function updateCartItem(productId, size, quantity) {
  const result = await serverFetch(`/api/cart/${productId}`, {
    method: "PATCH",
    body: JSON.stringify({ size, quantity }),
  });
  revalidatePath("/cart");
  return result;
}

export async function removeFromCart(productId, size) {
  const result = await serverFetch(`/api/cart/${productId}?size=${size}`, {
    method: "DELETE",
  });
  revalidatePath("/cart");
  return result;
}