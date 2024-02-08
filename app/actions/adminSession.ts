"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "../../lib/db";

// * OK:  FIXED:  -> USER SESSION
export const getAdminSession = async () => {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("auth-token")?.value;
  if (!userCookie) {
    return null;
  }
  const decodedToken = jwt.decode(userCookie);
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
  };
};
