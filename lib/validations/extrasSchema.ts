import { z } from "zod";

export const extrasSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z
    .custom<File | undefined>((file) => {
      return file; // Return true if file is undefined
    })
    .refine(
      (file) => {
        return !file || file.size < 1024 * 1024 * 2;
      },
      { message: "File must be less than 2MB" }
    ),
  price: z.coerce.number().min(0, "Price is required"),
});

export const editExtrasSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z
    .custom<File | undefined>((file) => {
      return file; // Return true if file is undefined
    })
    .optional(),
  price: z.coerce.number().min(0, "Price is required"),
});
