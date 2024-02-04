import { z } from "zod";

const emailRegex = /^[^\s@]+@gmail.com$/;

export const userLoginSchema = z.object({
  email: z.string().refine((value) => emailRegex.test(value), {
    message: "Invalid email address",
  }),
  password: z.string().min(1, "Password is required"),
});

export const userRegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().refine((value) => emailRegex.test(value), {
    message: "Invalid email address",
  }),
  password: z.string().min(1, "Password is required"),
});
