import { getAllFoods } from "@/constants/data";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { pathname, searchParams } = new URL(request.url);
  const category = pathname.split("/v1/")[1].split("/")[0];
  const foodId = searchParams.get("foodId");
  if (!category || !foodId) {
    return NextResponse.json({ status: 200, message: "Invalid Request" });
  }
  if (foodId) {
    const data = getAllFoods.find(
      (food) => food.category === category && food.id === foodId
    );
    if (data) {
      return NextResponse.json({ status: 200, data });
    }
    return NextResponse.json({ status: 200, message: "No Record found" });
  }
  return NextResponse.json({ status: 200, message: "Invalid ID" });
}
