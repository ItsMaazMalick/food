"use server";
import { NextRequest, NextResponse } from "next/server";
import { decryptString } from "./utils/encryption";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { deleteCookie } from "./app/actions/deleteCookie";

export const dynamic = "force-dynamic";

export async function middleware(request: NextRequest) {
  async function redirectToLogin() {
    await deleteCookie();
    return NextResponse.redirect(new URL("/admin/auth/login", request.url));
  }

  const token = cookies().get("auth-token")?.value;
  const userId = cookies().get("user")?.value;

  if (!token || !userId || !token.length) {
    return redirectToLogin();
  }

  const decryptToken = await decryptString(token);
  const decryptId = await decryptString(userId);
  if (!decryptToken) {
    return redirectToLogin();
  }
  const decodedToken = jwt.decode(decryptToken);
  if (!decodedToken) {
    return redirectToLogin();
  }
  const { tokenData }: any = decodedToken;
  if (!tokenData) {
    return redirectToLogin();
  }
  const id = tokenData.id;
  if (!id) {
    return redirectToLogin();
  }

  if (id !== decryptId) {
    return redirectToLogin();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard", "/admin/dashboard/:path*"],
};
