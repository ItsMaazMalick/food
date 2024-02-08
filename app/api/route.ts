import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const newData = await prisma.item.create({
    data: {
      name: "ABCBC",
      inStock: 100,
      originalPrice: 320,
      salePrice: 320,
      featured: true,
      category: {
        connect: {
          id: "65c45695586bc6e63e3eace6",
        },
      },
    },
  });
  console.log(newData);
  return NextResponse.json({ statu: 200 });
}
