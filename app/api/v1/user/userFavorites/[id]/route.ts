import { verifyUserToken } from "@/app/actions/user/userToken";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // const token = await verifyUserToken();
    // if (!token) {
    //   return NextResponse.json({
    //     status: 401,
    //     success: false,
    //     message: "Invalid request",
    //   });
    // }
    const pathname = request.nextUrl.pathname;
    const params = pathname.split("/v1/user/userFavorites/")[1];
    const user = await prisma.user.findUnique({ where: { id: params } });
    if (!user) {
      return NextResponse.json({ status: 401, message: "No user found" });
    }
    return NextResponse.json({ status: 200, favorites: user.favorites });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
