import { loginUser, registerUser } from "@/app/actions/user/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password, referralCode } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Invalid data provided",
      });
    }
    const res = await registerUser({ name, email, password, referralCode });
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}
