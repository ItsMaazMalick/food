import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Invalid data provided",
      });
    }

    const isEmpty = await prisma.superAdmin.findFirst();
    console.log(isEmpty);
    if (isEmpty?.email) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Superadmin already exists",
      });
    }

    const isSuperAdmin = await prisma.superAdmin.findUnique({
      where: { email },
    });
    if (isSuperAdmin) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "User already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const superAdmin = await prisma.superAdmin.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    return NextResponse.json({
      status: 201,
      success: true,
      message: "Account Registered",
    });
  } catch (error) {}
}
