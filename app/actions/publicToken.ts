"use server";

import jwt from "jsonwebtoken";
import { headers } from "next/headers";

export const getPublicToken = () => {
  const tokenData = process.env.TOKEN_VALUE;

  //ASSIGN TOKEN
  const token = jwt.sign(
    {
      tokenData,
    },
    process.env.JWT_SECRET!
  );
  return token;
};

export async function verifyPublicToken() {
  const headerList = headers();
  const token = headerList.get("Authorization")?.split(" ")[1];
  if (!token) {
    return null;
  }
  const decodedToken = jwt.decode(token);
  if (!decodedToken) {
    return null;
  }

  const { tokenData }: any = decodedToken;
  if (!tokenData) {
    return null;
  }

  const isValid = tokenData === process.env.TOKEN_VALUE;
  if (!isValid) {
    return null;
  }
  return true;
}
