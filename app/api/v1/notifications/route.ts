import { getAllNotifications } from "@/app/actions/notifications/notifications";
import { verifyPublicToken } from "@/app/actions/publicToken";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const token = await verifyPublicToken();
    if (!token) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Invalid request",
      });
    }

    const notifications = await getAllNotifications();
    return NextResponse.json({ status: 200, success: true, notifications });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
}
