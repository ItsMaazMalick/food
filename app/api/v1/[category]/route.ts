import { getPublicToken, verifyPublicToken } from "@/app/actions/publicToken";
import { getAllFoods } from "@/constants/data";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const token = request.headers.get("Authorization");
    const newToken = token?.replace("bearer ", "");
    if (!newToken || !verifyPublicToken(newToken)) {
      return NextResponse.json({ status: 401, message: "Invalid Request" });
    }
    const { pathname } = new URL(request.url);
    const params = pathname.split("/v1/")[1];
    if (params === "all") {
      const data = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          items: {
            select: {
              id: true,
              name: true,
              images: true,
              inStock: true,
              originalPrice: true,
              salePrice: true,
            },
          },
        },
      });
      return NextResponse.json({ status: 200, data });
    }
    const data = await prisma.category.findMany({
      where: { slug: params },
      select: {
        id: true,
        name: true,
        slug: true,
        items: {
          select: {
            id: true,
            name: true,
            images: true,
            inStock: true,
            originalPrice: true,
            salePrice: true,
          },
        },
      },
    });
    if (data.length === 0) {
      return NextResponse.json({ status: 200, message: "Invalid category" });
    }

    console.log(params);
    return NextResponse.json({ status: 200, data });
  } catch (error) {
    console.log(error);
  }
}
