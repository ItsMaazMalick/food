import { loginUser, loginUserResponse } from "@/app/actions/user/auth";
import { codeGenerator } from "@/lib/codeGenerator";
import prisma from "@/lib/db";
import { encryptString } from "@/utils/encryption";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, image, password, linkAccount } = await request.json();
    if (!email || !password) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Invalid data provided",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const refCode = codeGenerator(16);

    if (!linkAccount || linkAccount === "credentials") {
      const res = await loginUser({ email, password });
      return NextResponse.json(res);
    }
    if (linkAccount === "google") {
      if (!name || !password) {
        return NextResponse.json({
          status: 400,
          success: false,
          message: "Invalid data provided",
        });
      }
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      // There is not existing user exist!
      if (!existingUser) {
        const user = await prisma.user.create({
          data: {
            name,
            email,
            image,
            password: hashPassword,
            referralCode: refCode,
            linkAccount: "google",
          },
        });
        return NextResponse.json(loginUserResponse({ user }));
      }

      // There is an existing user exist! but not link with google
      if (existingUser && existingUser.linkAccount !== "google") {
        return NextResponse.json({
          status: 401,
          success: false,
          // errors: {},
          message: "Invalid credentials",
        });
      }
      // There is an existing user exist! also link with google
      if (existingUser.linkAccount === "google") {
        const user = await prisma.user.update({
          where: { email: existingUser.email },
          data: {
            name,
            image,
            password: hashPassword,
          },
        });
        return NextResponse.json(loginUserResponse({ user }));
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}
