import { serverFetch } from "./server";

export async function getUserSession() {
  try {
    const data = await serverFetch("/api/auth/get-session");
    return data?.user || null;
  } catch {
    return null;
  }
}