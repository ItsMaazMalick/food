"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "../../lib/db";
import { deleteCookie } from "./deleteCookie";

// * OK:  FIXED:  -> USER SESSION
export const getAdminSession = async () => {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("auth-token")?.value || null || undefined;
  if (!userCookie) {
    return { status: 401, success: false, message: "Unauthorized" };
  }
  const decodedToken = jwt.decode(userCookie);
  if (!decodedToken) {
    return { status: 401, success: false, message: "Unauthorized" };
  }
  const { tokenData }: any = decodedToken;
  if (!tokenData) {
    return { status: 401, success: false, message: "Unauthorized" };
  }
  const id = tokenData.id;
  if (!id) {
    return { status: 401, success: false, message: "Unauthorized" };
  }
  const admin = await prisma.admin.findUnique({
    where: { id },
  });
  if (!admin) {
    cookies()?.set("auth-token", "", { expires: new Date(0) });
    return { status: 401, success: false, message: "Unauthorized" };
  }
  return {
    status: 200,
    success: true,
    id: admin.id,
    name: admin.name,
    email: admin.email,
  };
};
