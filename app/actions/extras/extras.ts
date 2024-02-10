"use server";

import prisma from "@/lib/db";
import { uploadImage, uploadImage2 } from "@/lib/uploadImage";
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
  const file = formData.get("image") as File;
  // const image = await uploadImage(file, "extras");
  // console.log(image);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const image = await uploadImage2(buffer, "extras");
  const { secure_url } = image;
  console.log(image);

  if (!image) {
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
      image: secure_url,
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
