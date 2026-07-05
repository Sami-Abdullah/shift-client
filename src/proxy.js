import { NextResponse } from "next/server";

export async function proxy(request) {
  const cookie = request.headers.get("cookie") || "";

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`, {
      headers: { cookie },
    });

    const data = res.ok ? await res.json() : null;
    const user = data?.user;

    if (!user) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    if (user.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};