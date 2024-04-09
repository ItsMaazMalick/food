"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addNotification(text: string) {
  if (!text) {
    return {
      status: 400,
      success: false,
      message: "Please provide notifation",
    };
  }
  const notification = await prisma.notification.create({
    data: {
      text,
    },
  });
  if (!notification) {
    return {
      status: 500,
      success: false,
      message: "Something went wrong",
    };
  }
  revalidatePath("/super-admin/dashboard/notifications");
  return {
    status: 201,
    success: true,
    message: "Notification created successfully",
  };
}

export async function getAllNotifications() {
  const notifications = await prisma.notification.findMany();
  return notifications;
}

export async function deleteNotification(id: string) {
  if (!id) {
    return {
      status: 400,
      success: false,
      message: "Please provide notifation",
    };
  }
  const notification = await prisma.notification.findUnique({
    where: { id },
  });
  if (!notification) {
    return {
      status: 400,
      success: false,
      message: "No notification found",
    };
  }
  await prisma.notification.delete({ where: { id } });
  return {
    status: 200,
    success: true,
    message: "Notification deleted successfully",
  };
}
