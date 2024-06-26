"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllOrders() {
  const orders = await prisma.order.findMany();
  return orders;
}

export async function getOrder(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });
  if (!order) {
    return null;
  }
  return order;
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
          orderProductExtras: {
            select: {
              extras: true,
              quantity: true,
            },
          },
        },
      },
      quantity: true,
      total: true,
      orderType: true,
      orderStatus: true,
      isPaid: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!order) {
    return null;
  }
  return order;
}

export async function getOrderById(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      orderProducts: {
        include: {
          product: {
            select: {
              name: true,
            },
          },
          orderProductExtras: {
            select: {
              extras: true,
              quantity: true,
            },
          },
        },
      },
    },
  });
  if (!order) {
    return null;
  }
  return order;
}

export async function updateOrder(formData: FormData) {
  const id = String(formData.get("id"));
  const userId = String(formData.get("userId"));
  const orderType = String(formData.get("orderType"));
  const orderStatus = String(formData.get("orderStatus"));
  const isPaid = formData.get("isPaid") === "paid" ? true : false;

  // Update the order
  await prisma.order.update({
    where: { id },
    data: {
      orderType:
        orderType === "pickup"
          ? "pickup"
          : orderType === "dinning"
          ? "dinning"
          : "delivery",
      orderStatus:
        orderStatus === "pending"
          ? "pending"
          : orderStatus === "preparing"
          ? "preparing"
          : orderStatus === "ready"
          ? "ready"
          : "completed",
      isPaid,
    },
  });

  // Check if the order is paid and hasn't been processed before
  if (isPaid) {
    const order = await prisma.order.findUnique({
      where: { id },
    });

    // Ensure the order exists and is not already paid
    if (order && !order.isPaidProcessed) {
      const points = await prisma.orderPoints.findFirst();
      if (points) {
        // Update the user's order points
        await prisma.user.update({
          where: { id: userId },
          data: {
            orderPoints: {
              increment: 5,
            },
          },
        });
        // Mark the order as processed to avoid multiple updates
        await prisma.order.update({
          where: { id },
          data: {
            isPaidProcessed: true,
          },
        });
      }
    }
  }

  revalidatePath(`/admin/dashboard/orders/order-detail/${id}`);
  redirect("/admin/dashboard/orders");
}
