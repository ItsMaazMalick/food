import { getPublicToken, verifyPublicToken } from "@/app/actions/publicToken";
import { getAllFoods } from "@/constants/data";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const token = request.headers.get("Authorization");
    if (!token || !verifyPublicToken(token)) {
      return NextResponse.json({ status: 401, message: "Invalid Request" });
    }
    const { pathname } = new URL(request.url);
    const params = pathname.split("/v1/")[1];
    if (params === "all") {
      return NextResponse.json({ status: 200, data: getAllFoods });
    }
    const data = getAllFoods.filter((food) => food.category === params);
    if (data.length === 0) {
      return NextResponse.json({ status: 200, message: "Invalid category" });
    }

    console.log(params);
    return NextResponse.json({ status: 200, data });
  } catch (error) {
    console.log(error);
  }
}
