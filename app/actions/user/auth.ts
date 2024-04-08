"use server";

import { codeGenerator } from "@/lib/codeGenerator";
import prisma from "@/lib/db";
import {
  userLoginSchema,
  userRegisterSchema,
} from "@/lib/validations/userValidation";
import { decryptString, encryptString } from "@/utils/encryption";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getReferralPoints } from "../points/points";

type RegisterProps = {
  name: string;
  email: string;
  password: string;
  referralCode?: string;
};

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
  const encryptToken = encryptString(token);
  return {
    status: 200,
    success: true,
    id: user.id,
    name: user.name,
    email: user.email,
    referralCode: user.referralCode,
    points: user.points,
    favorites: user.favorites,
    // errors: {},
    token: encryptToken,
  };
}

// * OK:  FIXED:  -> REGISTER USER
export async function registerUser({
  name,
  email,
  password,
  referralCode,
}: RegisterProps) {
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
  const refCode = codeGenerator(16);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      referralCode: refCode,
    },
  });

  if (referralCode) {
    const oldUser = await prisma.user.findUnique({
      where: { referralCode },
    });

    const points = await getReferralPoints();

    if (points) {
      if (oldUser && oldUser.points <= 45) {
        await prisma.user.update({
          where: { referralCode: referralCode },
          data: {
            points: {
              increment: points?.points,
            },
          },
        });
      }
      // Increase points for the new user
      await prisma.user.update({
        where: { email },
        data: {
          points: {
            increment: points?.points,
          },
        },
      });
    }
  }
  return {
    status: 201,
    success: true,
    message: "Account Registration Success",
  };
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return null;
  }
  return user;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    return null;
  }
  return user;
}

export async function getUserByToken(token: string) {
  if (!token) {
    return null;
  }
  const decryptToken = decryptString(token);
  const decodedToken = jwt.decode(decryptToken || "");
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
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    return null;
  }
  return user;
}
