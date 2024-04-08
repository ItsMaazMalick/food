import { addOrderPoints } from "@/app/actions/points/points";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await addOrderPoints(20);
  return NextResponse.json({ status: 200, result });
}
