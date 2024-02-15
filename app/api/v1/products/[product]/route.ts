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
    const pathname = request.nextUrl.pathname;
    const params = pathname.split("/v1/products/")[1];

    const product = await prisma.product.findMany({
      where: { id: params },
    });

    if (!product) {
      return NextResponse.json({ status: 200, message: "Invalid product id" });
    }

    return NextResponse.json({ status: 200, product });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
