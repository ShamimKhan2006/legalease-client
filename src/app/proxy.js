// proxy.js
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    console.log("Better Auth Session:", session);

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Proxy Error:", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/lawyers",
    "/lawyers/:path*",
  ],
};


