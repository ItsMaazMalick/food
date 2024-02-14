import { getDataByCategory } from "@/app/actions/categories/categories";
import { verifyPublicToken } from "@/app/actions/publicToken";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    // const newToken = token?.replace("bearer ", "");
    if (!token || !verifyPublicToken(token)) {
      return NextResponse.json({ status: 401, message: "Invalid Request" });
    }
    const { pathname } = new URL(request.url);
    const params = pathname.split("/v1/categories/")[1];

    const category = await prisma.category.findMany({
      where: { slug: params },
    });

    if (!category || category.length === 0) {
      return NextResponse.json({ status: 200, message: "Invalid category" });
    }

    return NextResponse.json({ status: 200, category });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
