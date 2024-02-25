"use server";
import prisma from "@/lib/db";
import { deleteImage, uploadImage } from "@/lib/handleImage";
import {
  createCategorySchema,
  updateCategorySchema,
} from "@/lib/validations/categorySchema";

import { toSlug } from "@/lib/validations/slug";
import { convertToBase64 } from "@/utils/convertToBase64";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCategory(formData: FormData) {
  const validatedFields = createCategorySchema.safeParse({
    name: String(formData.get("name")),
    image: formData.get("image") as File,
  });
  if (!validatedFields.success) {
    return {
      status: 401,
      success: false,
      message: "Invalid data provided",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { name, image } = validatedFields.data;
  const slug = toSlug(name);
  const oldCategory = await prisma.category.findUnique({
    where: { slug },
  });
  if (oldCategory) {
    revalidatePath("/admin/dashboard/categories");
    return {
      status: 401,
      success: false,
      message: "Category already exists",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const imageUrl = await convertToBase64(image);

  const category = await prisma.category.create({
    data: {
      name,
      slug,
      image: imageUrl!,
    },
  });
  if (!category) {
    return {
      status: 401,
      success: false,
      message: "Something went wrong",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  revalidatePath("/admin/dashboard/categories");
  // return {
  //   status: 201,
  //   success: true,
  //   message: "Record added successfully",
  // };
}

export async function getDataByCategory(category: string) {
  if (category === "all") {
    const category = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        items: true,
      },
    });

    return category;
  } else {
    const data = await prisma.category.findMany({
      where: { slug: category },
      select: {
        id: true,
        name: true,
        slug: true,
        items: true,
      },
    });
    return data;
  }
}

export async function getSingleCategory(id: string) {
  if (!id) {
    return {
      status: 401,
      success: false,
      message: "Invalid data provided",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const category = await prisma.category.findUnique({
    where: { id },
  });
  if (!category) {
    return {
      status: 404,
      success: false,
      message: "No category found",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  return {
    status: 200,
    success: true,
    category,
    // errors: validatedFields.error.flatten().fieldErrors,
  };
}

export async function updateCategory(formData: FormData) {
  const categoryId = String(formData.get("categoryId"));
  const name = String(formData.get("name"));
  const image = formData.get("image") as File;
  const validatedFields = updateCategorySchema.safeParse({ name, image });
  if (!validatedFields.success || !categoryId) {
    // console.log(validatedFields.error.flatten().fieldErrors);
    return {
      status: 401,
      success: false,
      message: "Invalid data provided",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const oldCategory = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!oldCategory) {
    return {
      status: 401,
      success: false,
      message: "Invalid category",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const slug = toSlug(name);
  const isCategory = await prisma.category.findUnique({
    where: { slug },
  });
  if (isCategory) {
    return {
      status: 401,
      success: false,
      message: "Category already exists",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const imageUrl = await convertToBase64(image);

  // let imageUrl = String(formData.get("imageUrl"));
  // if (image) {
  //   imageUrl = image;
  // }
  const newCategory = await prisma.category.update({
    where: { id: categoryId },
    data: {
      name,
      slug,
      image: imageUrl!,
    },
  });
  if (!newCategory) {
    return {
      status: 401,
      success: false,
      message: "Something went wrong",
      // errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  redirect("/admin/dashboard/categories");
}

export async function deleteCategory({
  id,
  path,
}: {
  id: string;
  path: string;
}) {
  const result = await prisma.category.delete({
    where: { id },
  });
  revalidatePath(path);
}
