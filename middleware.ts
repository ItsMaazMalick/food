"use server";
import { NextRequest, NextResponse } from "next/server";
import { decryptString } from "./utils/encryption";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const userId = request.cookies.get("user")?.value;
  if (!token || !userId || !token.length) {
    return NextResponse.redirect(new URL("/admin/auth/login", request.url));
  }
  const decryptToken = await decryptString(token);
  const decryptId = await decryptString(userId);
  const decodedToken = jwt.decode(decryptToken);
  if (!decodedToken) {
    return NextResponse.redirect(new URL("/admin/auth/login", request.url));
  }
  const { tokenData }: any = decodedToken;
  if (!tokenData) {
    return NextResponse.redirect(new URL("/admin/auth/login", request.url));
  }
  const id = tokenData.id;
  if (!id) {
    return NextResponse.redirect(new URL("/admin/auth/login", request.url));
  }

  if (id !== decryptId) {
    return NextResponse.redirect(new URL("/admin/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard", "/admin/dashboard/:path*"],
};
