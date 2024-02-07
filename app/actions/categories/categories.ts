"use server";
import prisma from "@/lib/db";

export async function getDataByCategory(category: string) {
  if (category === "all") {
    const data = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        items: {
          select: {
            id: true,
            name: true,
            images: true,
            inStock: true,
            originalPrice: true,
            salePrice: true,
          },
        },
      },
    });
    return data;
  } else {
    const data = await prisma.category.findMany({
      where: { slug: category },
      select: {
        id: true,
        name: true,
        slug: true,
        items: {
          select: {
            id: true,
            name: true,
            images: true,
            inStock: true,
            originalPrice: true,
            salePrice: true,
          },
        },
      },
    });
    return data;
  }
}
