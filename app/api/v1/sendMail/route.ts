import { verifyPublicToken } from "@/app/actions/publicToken";
import { getUserByEmail } from "@/app/actions/user/auth";
import { sendOTP } from "@/utils/sendOTP";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const token = await verifyPublicToken();
    if (!token) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Invalid request",
      });
    }

    const { name, email } = await request.json();
    if (!name || !email) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "All fields are required",
      });
    }
    const user = await getUserByEmail(email);
    if (user) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "User already exists",
      });
    }
    const response = await sendOTP({ name, email });
    if (!response) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Something went wrong",
      });
    }
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
}
