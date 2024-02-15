"use server";

import jwt from "jsonwebtoken";
import { unstable_noStore } from "next/cache";
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

async function getHeaderToken() {
  const token = headers().get("Authorization")?.split(" ")[1];
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(token);
    }, 1000)
  );
}

export async function verifyPublicToken() {
  unstable_noStore();
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
