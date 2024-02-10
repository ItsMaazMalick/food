"use server";
import prisma from "@/lib/db";
import { uploadImage } from "@/lib/handleImage";
import { itemSchema } from "@/lib/validations/itemValidation";
import { Featured } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getAllItems() {
  const data = await prisma.item.findMany();
  return data;
}

export async function createItem(formData: FormData) {
  const validatedFields = itemSchema.safeParse({
    name: String(formData.get("name")),
    categoryId: String(formData.get("categoryId")),
    inStock: Number(formData.get("inStock")),
    originalPrice: Number(formData.get("originalPrice")),
    salePrice: Number(formData.get("salePrice")),
    featured: formData.get("featured"),
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
  const { name, categoryId, inStock, originalPrice, salePrice, featured } =
    validatedFields.data;
  const extrasString = formData.get("extras")?.toString();
  const extras = extrasString ? extrasString.split(",") : [];
  // console.log(extras);

  const file = formData.get("image") as unknown as File;

  if (!file.name) {
    return {
      status: 401,
      success: false,
      message: "Image is required",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (file.size > 1000000) {
    return {
      status: 401,
      success: false,
      message: "Image size must be less than 1MB",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { image, error } = await uploadImage(file);

  if (error) {
    return error;
  }

  let item;

  if (!extrasString) {
    item = await prisma.item.create({
      data: {
        name,
        image,
        inStock,
        originalPrice,
        salePrice,
        featured: featured === "TRUE" ? Featured.TRUE : Featured.FALSE,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  } else {
    item = await prisma.item.create({
      data: {
        name,
        image,
        inStock,
        originalPrice,
        salePrice,
        featured: featured === "TRUE" ? Featured.TRUE : Featured.FALSE,
        category: {
          connect: {
            id: categoryId,
          },
        },
        extras: extras,
      },
    });
  }

  if (!item) {
    return {
      status: 401,
      success: false,
      message: "Error saving data",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  revalidatePath("/admin/dashboard/items");
}

export async function deleteItem({ id, path }: { id: string; path: string }) {
  const item = await prisma.item.findUnique({ where: { id } });
  if (!item) {
    return {
      status: 401,
      success: false,
      message: "No record found",
    };
  }
  await prisma.item.delete({
    where: { id },
  });
  revalidatePath(path);
}
