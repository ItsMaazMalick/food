import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db";
import { getUserByToken } from "./auth";

export async function verifyUserToken() {
  const headerList = headers();
  const token = headerList.get("Authorization")?.split(" ")[1];
  if (!token) {
    return null;
  }
  const result = await getUserByToken(token);
  return result;
}
