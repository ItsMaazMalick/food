import { sendOTP } from "@/utils/sendOTP";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();
    if (!name || !email) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "All fields are required.",
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
