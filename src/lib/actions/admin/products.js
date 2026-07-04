"use server";

import { serverFetch } from "@/lib/core/server";
import { revalidatePath } from "next/cache";

export async function createProduct(payload) {
  const result = await serverFetch("/api/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  revalidatePath("/admin/products");
  return result;
}

export async function updateProduct(id, payload) {
  const result = await serverFetch(`/api/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}/edit`);
  return result;
}

export async function deleteProduct(id) {
  const result = await serverFetch(`/api/products/${id}`, { method: "DELETE" });
  revalidatePath("/admin/products");
  return result;
}