import { serverFetch } from "@/lib/core/server";

export async function getProfile() {
  return serverFetch("/api/user/profile");
}