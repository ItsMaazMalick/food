import { loginUser } from "@/app/actions/user/auth";
import prisma from "@/lib/db";
import { decryptString, encryptString } from "@/utils/encryption";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { codeGenerator } from "@/lib/codeGenerator";

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
        const tokenData = {
          id: user.id,
          email: user.email,
        };

        //ASSIGN TOKEN
        const token = jwt.sign(
          {
            tokenData,
          },
          process.env.JWT_SECRET!,
          { expiresIn: "1d" }
        );
        const encryptToken = encryptString(token);
        return NextResponse.json({
          status: 200,
          success: true,
          id: user.id,
          name: user.name,
          email: user.email,
          referralCode: user.referralCode,
          points: user.points,
          favorites: user.favorites,
          // errors: {},
          token: encryptToken,
        });
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
        //TOKEN DATA
        const tokenData = {
          id: user.id,
          email: user.email,
        };

        //ASSIGN TOKEN
        const token = jwt.sign(
          {
            tokenData,
          },
          process.env.JWT_SECRET!,
          { expiresIn: "1d" }
        );
        const encryptToken = encryptString(token);
        return NextResponse.json({
          status: 200,
          success: true,
          id: user.id,
          name: user.name,
          email: user.email,
          referralCode: user.referralCode,
          points: user.points,
          favorites: user.favorites,
          // errors: {},
          token: user,
        });
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
