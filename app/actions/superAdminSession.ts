"use server";
import { decryptString } from "@/utils/encryption";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// * OK:  FIXED:  -> ADMIN SESSION
export const getSuperAdminSession = async () => {
  try {
    const cookieStore = cookies();
    const userCookie = cookieStore.get("super-admin-token")?.value;
    const userId = cookieStore.get("super-admin")?.value;
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

    if (tokenData.email !== process.env.SUPER_ADMIN_EMAIL) {
      return {
        status: 401,
        success: false,
        message: "Unauthorized",
      };
    }
    return {
      status: 200,
      success: true,
      id: id,
      name: process.env.SUPER_ADMIN_NAME,
      email: process.env.SUPER_ADMIN_EMAIL,
      image: "/images/logo.jpeg",
    };
  } catch (error) {
    return {
      status: 401,
      success: false,
      message: "Unauthorized",
    };
  }
};
