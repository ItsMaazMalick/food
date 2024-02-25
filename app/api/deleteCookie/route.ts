import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    cookies().set({
      name: "user",
      value: "",
      httpOnly: true,
      path: "/",
    });
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Cookie deleted",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
}
