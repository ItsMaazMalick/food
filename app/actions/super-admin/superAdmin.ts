"use server";
import prisma from "@/lib/db";
import {
  adminLoginSchema,
  adminRegisterSchema,
} from "@/lib/validations/adminValidation";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { deleteImage, uploadImage } from "@/lib/handleImage";
import { convertToBase64 } from "@/utils/convertToBase64";
import { decryptString, encryptString } from "@/utils/encryption";
import { codeGenerator } from "@/lib/codeGenerator";

// ADMIN LOGIN
export async function superAdminLogin(formData: FormData) {
  const validatedFields = adminLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    revalidatePath("/admin/auth/login");
    return {
      status: 401,
      success: false,
      message: "Invalid Data Provided",
    };
  }
  const { email, password } = validatedFields.data;
  if (
    email !== process.env.SUPER_ADMIN_EMAIL ||
    password !== process.env.SUPER_ADMIN_PASSWORD
  ) {
    return {
      status: 401,
      success: false,
      message: "Invalid credentials",
    };
  }

  const id = codeGenerator(40);

  //TOKEN DATA
  const tokenData = {
    email: email,
    id,
  };

  //ASSIGN TOKEN
  const token = jwt.sign(
    {
      tokenData,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );
  const encryptToken = encryptString(token);
  const encryptId = encryptString(id);
  cookies().set("super-admin-token", encryptToken);
  cookies().set("super-admin", encryptId);
  redirect("/super-admin/dashboard");
}
