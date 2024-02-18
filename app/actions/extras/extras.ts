"use server";

import prisma from "@/lib/db";
import { deleteImage, uploadImage } from "@/lib/handleImage";
import { extrasSchema } from "@/lib/validations/extrasValidation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  const image = String(formData.get("image"));

  if (!image) {
    return {
      status: 401,
      success: false,
      message: "Image is required",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const extras = await prisma.extras.create({
    data: {
      name,
      image,
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

export async function deleteExtras({ id, path }: { id: string; path: string }) {
  const extras = await prisma.extras.findUnique({ where: { id } });
  if (!extras) {
    return {
      status: 401,
      success: false,
      message: "No record found",
    };
  }

  // TODO:

  const data = await prisma.product.findMany({
    where: {
      extrasId: {
        hasSome: [id],
      },
    },
  });
  // FIXED: FIND Items Array where ID exists
  const updatedArray = data.map((item) => ({
    ...item,
    extrasId: item.extrasId.filter((extraId) => extraId !== id),
  }));

  for (const array of updatedArray) {
    await prisma.product.update({
      where: { id: array.id },
      data: {
        name: array.name,
        image: array.image,
        inStock: array.inStock,
        originalPrice: array.originalPrice,
        salePrice: array.salePrice,
        featured: array.featured,
        extrasId: array.extrasId,
      },
    });
  }

  await prisma.extras.delete({
    where: { id },
  });
  console.log("HELOO");
  revalidatePath(path);
}

export async function getSingleExtras(id: string) {
  if (!id) {
    return {
      status: 401,
      success: false,
      message: "Invalid data provided",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const extras = await prisma.extras.findUnique({
    where: { id },
  });
  if (!extras) {
    return {
      status: 404,
      success: false,
      message: "No extras found",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  return {
    status: 200,
    success: true,
    extras,
    // errors: validatedFields.error.flatten().fieldErrors,
  };
}

export async function updateExtras(formData: FormData) {
  const validatedFields = extrasSchema.safeParse({
    name: String(formData.get("name")),
    price: Number(formData.get("price")),
  });
  const id = String(formData.get("id"));
  if (!validatedFields.success || !id) {
    return {
      status: 401,
      success: false,
      message: "Invalid data provided",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const extras = await getSingleExtras(id);
  if (!extras) {
    return {
      status: 401,
      success: false,
      message: "No record found",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { name, price } = validatedFields.data;
  const image = String(formData.get("image"));
  let imageUrl = String(formData.get("imageUrl"));

  if (image) {
    imageUrl = image;
  }

  await prisma.extras.update({
    where: { id },
    data: {
      name,
      image: imageUrl,
      price,
    },
  });
  redirect("/admin/dashboard/extras");
}
