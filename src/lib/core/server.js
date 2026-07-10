import { headers } from "next/headers";

export async function serverFetch(path, options = {}) {
  const cookie = (await headers()).get("cookie") || "";
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
      cookie,
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!data.success) {
    const error = new Error(data.message || "Request failed");
    error.status = res.status;
    throw error;
  }

  return data;
}