"use server";

import { serverFetch } from "@/lib/core/server";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(id, { status, trackingNumber }) {
  const result = await serverFetch(`/api/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status, trackingNumber }),
  });
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
  return result;
}

export async function issueRefund(id, { amount, reason }) {
  const result = await serverFetch(`/api/orders/${id}/refund`, {
    method: "POST",
    body: JSON.stringify({ amount, reason }),
  });
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
  return result;
}