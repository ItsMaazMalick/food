"use server";
import { NextRequest, NextResponse } from "next/server";
import { decryptString } from "./utils/encryption";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const userId = request.cookies.get("user")?.value;
  if (!token || !userId || !token.length) {
    return NextResponse.redirect(new URL("/admin/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard", "/admin/dashboard/:path*"],
};
