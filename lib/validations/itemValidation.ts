import { z } from "zod";
// SINGLE FILE SCHEMA
const fileSchema = z
  .custom<File | undefined>()
  // .refine((file) => !file, "Must be an image file")
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

export const itemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  categoryId: z.string().min(1, "Category is required"),
  inStock: z.coerce.number().min(0, "In Stock is required"),
  originalPrice: z.coerce.number().min(0, "Original Price is required"),
  salePrice: z.coerce.number().min(0, "Sale Price is required"),
  featured: z.string().min(1, "Featured is required"),
});
