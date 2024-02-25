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
      return null;
    }
    const decryptToken = await decryptString(userCookie);
    const decryptId = await decryptString(userId);
    const decodedToken = jwt.decode(decryptToken);
    if (!decodedToken) {
      return null;
    }
    const { tokenData }: any = decodedToken;
    if (!tokenData) {
      return null;
    }
    const id = tokenData.id;
    if (!id) {
      return null;
    }

    if (id !== decryptId) {
      return null;
    }

    const admin = await prisma.admin.findUnique({
      where: { id },
    });
    if (!admin) {
      return null;
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
    return null;
  }
};
