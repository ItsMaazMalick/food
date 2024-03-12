"use server";
import prisma from "@/lib/db";
import { deleteImage, uploadImage } from "@/lib/handleImage";
import { productSchema } from "@/lib/validations/productSchema";
import { convertToBase64 } from "@/utils/convertToBase64";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  const image = String(formData.get("image"));
  if (!validatedFields.success || !image) {
    // console.log(validatedFields.error.flatten().fieldErrors);
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

export async function updateProduct(formData: FormData) {
  const validatedFields = productSchema.safeParse({
    name: String(formData.get("name")),
    categoryId: String(formData.get("categoryId")),
    inStock: Number(formData.get("inStock")),
    originalPrice: Number(formData.get("originalPrice")),
    salePrice: Number(formData.get("salePrice")),
    featured: String(formData.get("featured")),
    isRecommended: String(formData.get("isRecommended")),
  });
  const image = String(formData.get("image"));
  const id = String(formData.get("id"));
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
  // console.log(id);

  let imageUrl;
  if (image) {
    imageUrl = image;
  } else {
    imageUrl = String(formData.get("imageUrl"));
  }

  let product;

  if (!extrasString) {
    product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        image: imageUrl,
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
    product = await prisma.product.update({
      where: { id },
      data: {
        name,
        image: imageUrl,
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

  redirect("/admin/dashboard/products");
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

  await prisma.product.delete({
    where: { id },
  });
  revalidatePath(path);
}
