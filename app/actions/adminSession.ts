"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "../../lib/db";
import { decryptString } from "@/utils/encryption";
import { NextRequest, NextResponse } from "next/server";

// * OK:  FIXED:  -> ADMIN SESSION
export const getAdminSession = async () => {
  try {
    const cookieStore = cookies();
    const userCookie = cookieStore.get("auth-token")?.value;
    const userId = cookieStore.get("user")?.value;
    if (!userCookie || !userId) {
      return {
        status: 401,
        success: false,
        message: "Unauthorized",
      };
    }
    const decryptToken = decryptString(userCookie);
    const decryptId = decryptString(userId);
    if (!decryptToken || !decryptId) {
      return {
        status: 401,
        success: false,
        message: "Unauthorized",
      };
    }
    const decodedToken = jwt.decode(decryptToken);
    if (!decodedToken) {
      return {
        status: 401,
        success: false,
        message: "Unauthorized",
      };
    }
    const { tokenData }: any = decodedToken;
    if (!tokenData) {
      return {
        status: 401,
        success: false,
        message: "Unauthorized",
      };
    }
    const id = tokenData.id;
    if (!id) {
      return {
        status: 401,
        success: false,
        message: "Unauthorized",
      };
    }

    if (id !== decryptId) {
      return {
        status: 401,
        success: false,
        message: "Unauthorized",
      };
    }

    const admin = await prisma.admin.findUnique({
      where: { id },
    });
    if (!admin) {
      return {
        status: 401,
        success: false,
        message: "Unauthorized",
      };
    }
    return {
      status: 200,
      success: true,
      id: admin.id,
      name: admin.name,
      email: admin.email,
      image: admin.image,
    };
  } catch (error) {
    return {
      status: 401,
      success: false,
      message: "Unauthorized",
    };
  }
};
