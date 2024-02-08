"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getAllItems() {
  const data = await prisma.item.findMany();
  return data;
}

export async function deleteItem({ id, path }: { id: string; path: string }) {
  const result = await prisma.item.delete({
    where: { id },
  });
  revalidatePath(path);
}
