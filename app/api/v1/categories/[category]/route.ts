import { getDataByCategory } from "@/app/actions/categories/categories";
import { verifyPublicToken } from "@/app/actions/publicToken";
import prisma from "@/lib/db";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = await verifyPublicToken();
    if (!token) {
      return NextResponse.json({ status: 401, message: "Invalid Request" });
    }
    const pathname = request.nextUrl.pathname;
    const params = pathname.split("/v1/categories/")[1];

    const category = await prisma.category.findMany({
      where: { slug: params },
    });

    if (!category) {
      return NextResponse.json({ status: 200, message: "Invalid category" });
    }

    return NextResponse.json({ status: 200, category });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
