import { getAllFoods } from "@/constants/data";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const foodId = searchParams.get("foodId");
  if (!userId || !foodId) {
    return NextResponse.json({ status: 200, data: getAllFoods });
  }
  if (userId === "2389e00e-bc9a-51d2-bdb3-040eee5274d8" && foodId) {
    const data = getAllFoods.find((food) => food.id === foodId);
    if (data) {
      return NextResponse.json({ status: 200, data });
    }
    return NextResponse.json({ status: 200, message: "No Record found" });
  }
  return NextResponse.json({ status: 200, message: "Invalid User Id" });
}
