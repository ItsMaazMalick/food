"use server";
import prisma from "@/lib/db";

export async function getAllOrders() {
  const orders = await prisma.order.findMany();
  return orders;
}

export async function getUserOrder(userId: string) {
  const order = await prisma.order.findMany({
    where: { userId },
    select: {
      id: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      trxId: true,
      address: true,
      contact: true,
      orderProducts: {
        include: {
          orderProductExtras: true,
        },
      },
      quantity: true,
      total: true,
      orderType: true,
      orderStatus: true,
      isPaid: true,
    },
  });
  if (!order) {
    return null;
  }
  return order;
}
