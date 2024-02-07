"use server";

import { cookies } from "next/headers";

// * OK: -> DELETE COOKIE
export const deleteCookie = () => {
  cookies()?.set("auth-token", "", { expires: new Date(0) });
  return null;
};
