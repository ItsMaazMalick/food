import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  categoryId: z.string().min(1, "Category is required"),
  inStock: z.coerce.number().min(0, "In Stock is required"),
  originalPrice: z.coerce.number().min(0, "Original Price is required"),
  salePrice: z.coerce.number().min(0, "Sale Price is required"),
  featured: z.string().min(1, "Featured is required"),
  isRecommended: z.string().min(1, "Recommended is required"),
});
