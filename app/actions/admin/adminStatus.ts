"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateAdminStatus(formData: FormData) {
  const id = String(formData.get("id"));
  const isAdmin = String(formData.get("isAdmin")) === "verified" ? true : false;
  //   if (!id || !isAdmin) {
  //     return null;
  //   }
  const result = await prisma.admin.update({
    where: {
      id,
    },
    data: {
      isAdmin,
    },
  });
  redirect("/super-admin/dashboard");
}
