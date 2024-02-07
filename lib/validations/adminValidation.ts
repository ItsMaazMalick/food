import { z } from "zod";

const emailRegex = /^[^\s@]+@gmail.com$/;

export const adminLoginSchema = z.object({
  email: z.string().refine((value) => emailRegex.test(value), {
    message: "Invalid email address",
  }),
  password: z.string().min(1, "Password is required"),
});

export const adminRegisterSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().refine((value) => emailRegex.test(value), {
      message: "Invalid email address",
    }),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
