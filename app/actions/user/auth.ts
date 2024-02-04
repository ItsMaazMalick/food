"use server";

import prisma from "@/lib/db";
import {
  userLoginSchema,
  userRegisterSchema,
} from "@/lib/validations/userValidation";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// * OK:  FIXED:  -> LOGIN USER
export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const validatedFields = userLoginSchema.safeParse({
    email,
    password,
  });
  if (!validatedFields.success) {
    return {
      status: 401,
      success: false,
      message: "Invalid data provided",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      status: 401,
      success: false,
      // errors: {},
      message: "Invalid credentials",
    };
  }
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    return {
      status: 401,
      success: false,
      // errors: {},
      message: "Invalid credentials",
    };
  }
  //TOKEN DATA
  const tokenData = {
    id: user.id,
    email: user.email,
  };

  //ASSIGN TOKEN
  const token = jwt.sign(
    {
      tokenData,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );
  return {
    status: 200,
    success: true,
    // errors: {},
    user: token,
  };
}

// * OK:  FIXED:  -> REGISTER USER
export async function registerUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const validatedFields = userRegisterSchema.safeParse({
    name,
    email,
    password,
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      status: 401,
      success: false,
      message: "Invalid data provided",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const isUser = await prisma.user.findUnique({
    where: { email },
  });

  if (isUser) {
    return {
      status: 400,
      success: false,
      message: "User already exists",
    };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });
  return {
    status: 201,
    success: true,
    message: "Account Registration Success",
  };
}
