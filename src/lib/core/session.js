import { headers } from "next/headers";

export async function getUserSession() {
  try {
    const cookie = (await headers()).get("cookie") || "";

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`, {
      headers: { cookie },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data?.user || null;
  } catch {
    return null;
  }
}