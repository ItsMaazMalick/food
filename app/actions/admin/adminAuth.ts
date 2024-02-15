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
import { deleteCookie } from "../deleteCookie";
import { deleteImage, uploadImage } from "@/lib/handleImage";

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
  cookies().set("auth-token", token);
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
    },
  });
  redirect("/admin/auth/login?register=true");
}

export async function getAdmin(token: string) {
  if (!token) {
    return deleteCookie();
  }
  const decodedToken = jwt.decode(token);
  if (!decodedToken) {
    return deleteCookie();
  }
  const { tokenData }: any = decodedToken;
  if (!tokenData) {
    return deleteCookie();
  }
  const id = tokenData.id;
  if (!id) {
    return deleteCookie();
  }
  const admin = await prisma.admin.findUnique({
    where: { id },
  });
  if (!admin) {
    return deleteCookie();
  }
  return admin;
}

export async function updateAdmin(formData: FormData) {
  const name = String(formData.get("name"));
  const email = String(formData.get("email"));
  let imageUrl = String(formData.get("imageUrl"));
  const file = formData.get("image") as unknown as File;
  const id = String(formData.get("id"));
  if (!id || !name || !email) {
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

  if (file.name) {
    const { image, error } = await uploadImage(file);
    await deleteImage(imageUrl);
    if (error) {
      return error;
    }
    imageUrl = image;
  }
  console.log("Hello");
  await prisma.admin.update({
    where: { id },
    data: {
      name,
      email,
      image: imageUrl,
    },
  });
  redirect("/admin/dashboard");
}
