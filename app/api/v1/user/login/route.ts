import { loginUser } from "@/app/actions/user/auth";
import prisma from "@/lib/db";
import { decryptString, encryptString } from "@/utils/encryption";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    if (!linkAccount || linkAccount === "credentials") {
      const res = await loginUser({ email, password });
      return NextResponse.json(res);
    }
    if (linkAccount === "google") {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (!existingUser || existingUser.linkAccount !== "google") {
        return NextResponse.json({
          status: 401,
          success: false,
          // errors: {},
          message: "Invalid credentials",
        });
      }
      if (existingUser.linkAccount === "google") {
        await prisma.user.update({
          where: { email: existingUser.email },
          data: {
            name,
            image,
            password: hashPassword,
          },
        });
        //TOKEN DATA
        const tokenData = {
          id: existingUser.id,
          email: existingUser.email,
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
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          referralCode: existingUser.referralCode,
          points: existingUser.points,
          favorites: existingUser.favorites,
          // errors: {},
          token: encryptToken,
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
