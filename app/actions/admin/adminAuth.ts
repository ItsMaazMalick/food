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

// ADMIN LOGIN
export async function adminLogin(formData: FormData) {
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
  const admin = await prisma.admin.findUnique({
    where: { email },
  });
  if (!admin) {
    revalidatePath("/admin/auth/login");
    return {
      status: 404,
      success: false,
      message: "Invalid credentials",
    };
  }
  const isPassword = await bcrypt.compare(password, admin.password);
  if (!isPassword) {
    revalidatePath("/admin/auth/login");
    return {
      status: 401,
      success: false,
      // errors: {},
      message: "Invalid credentials",
    };
  }
  if (!admin.isAdmin) {
    return {
      status: 401,
      success: false,
      // errors: {},
      message: "Your request is pending",
    };
  }
  //TOKEN DATA
  const tokenData = {
    id: admin.id,
    email: admin.email,
  };

  //ASSIGN TOKEN
  const token = jwt.sign(
    {
      tokenData,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );
  const encryptToken = await encryptString(token);
  const encryptId = await encryptString(admin.id);
  cookies().set("auth-token", encryptToken);
  cookies().set("user", encryptId);
  redirect("/admin/dashboard");
}

// ADMIN REGISTER
export async function adminRegister(formData: FormData) {
  const validatedFields = adminRegisterSchema.safeParse({
    name: String(formData.get("name")),
    email: String(formData.get("email")),
    password: String(formData.get("password")),
    confirmPassword: String(formData.get("confirmPassword")),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    revalidatePath("admin/auth/register");
    return {
      status: 401,
      success: false,
      message: "All fields are required",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { name, email, password } = validatedFields.data;

  const isAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  if (isAdmin) {
    revalidatePath("/admin/auth/register");
    return {
      status: 400,
      success: false,
      message: "User already exists",
    };
  }

  const hashPassword = await bcrypt.hash(password, 10);
  await prisma.admin.create({
    data: {
      name,
      email,
      password: hashPassword,
      image: "/images/logo.jpeg",
    },
  });
  redirect("/admin/auth/login?register=true");
}

export async function getAdmin(token: string) {
  if (!token) {
    return null;
  }

  const decryptToken = await decryptString(token);
  if (!decryptToken) {
    return null;
  }
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
  const admin = await prisma.admin.findUnique({
    where: { id },
  });
  if (!admin) {
    return null;
  }
  return admin;
}

export async function updateAdmin(formData: FormData) {
  const name = String(formData.get("name"));
  const image = formData.get("image") as File;
  const id = String(formData.get("id"));
  if (!id || !name) {
    return {
      status: 401,
      success: false,
      message: "All fields are required",
    };
  }

  const admin = await prisma.admin.findUnique({ where: { id } });
  if (!admin) {
    return {
      status: 401,
      success: false,
      message: "No record found",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  let imageUrl;
  if (image && image.name) {
    imageUrl = await convertToBase64(image);
  } else {
    imageUrl = String(formData.get("imageUrl"));
  }

  await prisma.admin.update({
    where: { id },
    data: {
      name,
      image: imageUrl,
    },
  });
  redirect("/admin/dashboard");
}

export async function getAdminByEmail(email: string) {
  const admin = await prisma.admin.findUnique({
    where: { email },
  });
  if (!admin) {
    return null;
  }
  return admin;
}
