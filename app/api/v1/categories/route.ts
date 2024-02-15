import { verifyPublicToken } from "@/app/actions/publicToken";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // const token = request.headers.get("Authorization")?.split(" ")[1];
    // // const newToken = token?.replace("bearer ", "");
    // if (!token || !verifyPublicToken(token)) {
    //   return NextResponse.json({ status: 401, message: "Invalid Request" });
    // }
    const data = await prisma.category.findMany();
    return NextResponse.json({ status: 200, success: true, data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
}
