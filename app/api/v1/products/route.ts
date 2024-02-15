import { verifyPublicToken } from "@/app/actions/publicToken";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    // const newToken = token?.replace("bearer ", "");
    if (!token || !verifyPublicToken(token)) {
      return NextResponse.json({ status: 401, message: "Invalid Request" });
    }
    const data = await prisma.product.findMany();
    return NextResponse.json({ status: 200, success: true, data });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
}
