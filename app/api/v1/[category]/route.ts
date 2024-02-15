import { getDataByCategory } from "@/app/actions/categories/categories";
import { verifyPublicToken } from "@/app/actions/publicToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = await verifyPublicToken();
    if (!token) {
      return NextResponse.json({ status: 401, message: "Invalid Request" });
    }
    const { pathname } = new URL(request.url);
    const params = pathname.split("/v1/")[1];
    const data = await getDataByCategory(params);

    if (!data || data.length === 0) {
      return NextResponse.json({ status: 200, message: "Invalid category" });
    }

    return NextResponse.json({ status: 200, data });
  } catch (error) {
    console.log(error);
  }
}
