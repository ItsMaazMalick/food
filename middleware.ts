"use server";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { decryptString } from "./utils/encryption";

// OK: function to redirect to login page
const redirectToLogin = async (request: NextRequest) => {
  return NextResponse.redirect(new URL("/admin/auth/login", request.url));
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const userId = request.cookies.get("user")?.value;

  if (!token || !userId) {
    return redirectToLogin(request);
  }

  const decryptToken = decryptString(token);
  if (!decryptToken) {
    return redirectToLogin(request);
  }

  let decodedToken;
  try {
    decodedToken = jwt.decode(decryptToken);
  } catch (error) {
    return redirectToLogin(request);
  }

  const { tokenData }: any = decodedToken;

  if (!tokenData?.id) {
    return redirectToLogin(request);
  }

  const id = decryptString(userId);
  if (!id || id !== tokenData.id) {
    return redirectToLogin(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard", "/admin/dashboard/:path*"],
};
