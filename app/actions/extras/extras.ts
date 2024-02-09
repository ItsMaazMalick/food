"use server";

import prisma from "@/lib/db";
import { saveFile } from "@/lib/saveFile";
import { extrasSchema } from "@/lib/validations/extrasValidation";
import { revalidatePath } from "next/cache";

export async function getAllExtras() {
  const data = await prisma.extras.findMany();
  return data;
}

export async function createExtras(formData: FormData) {
  const validatedFields = extrasSchema.safeParse({
    name: String(formData.get("name")),
    price: Number(formData.get("price")),
  });
  if (!validatedFields.success) {
    return {
      status: 401,
      success: false,
      message: "Invalid data provided",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { name, price } = validatedFields.data;
  const image = formData.get("image") as File;
  if (!image) {
    return {
      status: 401,
      success: false,
      message: "Image is required",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const imagePath = await saveFile(image, "extras");
  if (!imagePath) {
    return {
      status: 401,
      success: false,
      message: "Error in saving image",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const extras = await prisma.extras.create({
    data: {
      name,
      image: imagePath,
      price,
    },
  });
  if (!extras) {
    return {
      status: 401,
      success: false,
      message: "Something went wrong",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  revalidatePath("/admin/dashboard/extras");
}
