"use server";
import prisma from "@/lib/db";
import { saveFile } from "@/lib/saveFile";
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
  const image = formData.get("image") as File;
  const imagePath = await saveFile(image, "items");
  if (!imagePath) {
    return {
      status: 401,
      success: false,
      message: "Error saving file",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  let item;

  if (!extrasString) {
    item = await prisma.item.create({
      data: {
        name,
        image: imagePath,
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
        image: imagePath,
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
  const result = await prisma.item.delete({
    where: { id },
  });
  revalidatePath(path);
}
