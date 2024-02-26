import { z } from "zod";

export const productSchema = z.object({
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
  categoryId: z.string().min(1, "Category is required"),
  inStock: z.coerce.number().min(0, "In Stock is required"),
  originalPrice: z.coerce.number().min(0, "Original Price is required"),
  salePrice: z.coerce.number().min(0, "Sale Price is required"),
  featured: z.string().min(1, "Featured is required"),
  isRecommended: z.string().min(1, "Recommended is required"),
});

export const editProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z
    .custom<File | undefined>((file) => {
      return file; // Return true if file is undefined
    })
    .optional(),
  categoryId: z.string().min(1, "Category is required"),
  inStock: z.coerce.number().min(0, "In Stock is required"),
  originalPrice: z.coerce.number().min(0, "Original Price is required"),
  salePrice: z.coerce.number().min(0, "Sale Price is required"),
  featured: z.string().min(1, "Featured is required"),
  isRecommended: z.string().min(1, "Recommended is required"),
});
