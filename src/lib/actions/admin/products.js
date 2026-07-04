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

export async function checkSkuAvailability(sku, excludeId = null) {
  if (!sku) return true;

  const params = new URLSearchParams({ sku: sku.toUpperCase() });
  const data = await serverFetch(`/api/products?${params}`);
  const match = data.products?.[0];

  if (!match) return true;              // no product has this SKU — available
  return excludeId ? match._id === excludeId : false; // editing your own SKU is fine
}