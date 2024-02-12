"use server";
import prisma from "@/lib/db";
import { deleteImage, uploadImage } from "@/lib/handleImage";
import { productSchema } from "@/lib/validations/itemValidation";
import { revalidatePath } from "next/cache";

export async function getAllProducts() {
  const data = await prisma.product.findMany();
  return data;
}

export async function createProduct(formData: FormData) {
  const validatedFields = productSchema.safeParse({
    name: String(formData.get("name")),
    categoryId: String(formData.get("categoryId")),
    inStock: Number(formData.get("inStock")),
    originalPrice: Number(formData.get("originalPrice")),
    salePrice: Number(formData.get("salePrice")),
    featured: formData.get("featured"),
    isRecommended: formData.get("isRecommended"),
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
  const {
    name,
    categoryId,
    inStock,
    originalPrice,
    salePrice,
    featured,
    isRecommended,
  } = validatedFields.data;
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

  let product;

  if (!extrasString) {
    product = await prisma.product.create({
      data: {
        name,
        image,
        inStock,
        originalPrice,
        salePrice,
        featured: featured === "TRUE" ? true : false,
        isRecommended: isRecommended === "TRUE" ? true : false,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  } else {
    product = await prisma.product.create({
      data: {
        name,
        image,
        inStock,
        originalPrice,
        salePrice,
        featured: featured === "TRUE" ? true : false,
        isRecommended: isRecommended === "TRUE" ? true : false,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }

  if (!product) {
    return {
      status: 401,
      success: false,
      message: "Error saving data",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  if (extras) {
    await prisma.product.update({
      where: { id: product.id },
      data: {
        extrasId: extras,
      },
    });
  }

  revalidatePath("/admin/dashboard/items");
}

export async function getSingleProduct(id: string) {
  if (!id) {
    return {
      status: 401,
      success: false,
      message: "Invalid data provided",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const product = await prisma.product.findUnique({
    where: { id },
  });
  if (!product) {
    return {
      status: 404,
      success: false,
      message: "No item found",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  return {
    status: 200,
    success: true,
    product,
    // errors: validatedFields.error.flatten().fieldErrors,
  };
}

export async function deleteProcuct({
  id,
  path,
}: {
  id: string;
  path: string;
}) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return {
      status: 401,
      success: false,
      message: "No record found",
    };
  }
  const { error } = await deleteImage(product.image);
  if (error) {
    return {
      status: 401,
      success: false,
      message: "Error deleting image",
    };
  }
  await prisma.product.delete({
    where: { id },
  });
  revalidatePath(path);
}
