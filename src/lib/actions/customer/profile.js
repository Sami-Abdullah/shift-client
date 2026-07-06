"use server";

import { serverFetch } from "@/lib/core/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(data) {
  const result = await serverFetch("/api/user/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  });
  revalidatePath("/profile");
  return result;
}