import { addNotification } from "@/app/actions/notifications/notifications";
import { addOrderPoints } from "@/app/actions/points/points";
import { NextResponse } from "next/server";

export async function GET() {
  const points = 20;
  const result = await addOrderPoints(20);
  const notification = await addNotification(
    `The order points is now updated to ${points} points`
  );
  return NextResponse.json({ status: 200, result });
}
