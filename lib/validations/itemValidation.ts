import { z } from "zod";

const fileSchema = z
  .custom<File | undefined>()
  .refine((file) => {
    !file || (file instanceof File && file.type.startsWith("image/"));
  }, "Must be an image file")
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
