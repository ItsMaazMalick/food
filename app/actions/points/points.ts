"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addNotification } from "../notifications/notifications";

export async function addReferralPoints(points: number) {
  const oldPoints = await prisma.referralPoints.findFirst();
  if (oldPoints) {
    const result = await prisma.referralPoints.update({
      where: { id: oldPoints.id },
      data: {
        points: points,
      },
    });
    if (!result) {
      return {
        status: 400,
        success: false,
        message: "Error adding points",
      };
    }
    await addNotification(
      `Referral points are now updated to ${points} points`
    );
    return {
      status: 201,
      success: true,
      message: "Points updated successfully",
    };
  }

  const result = await prisma.referralPoints.create({
    data: {
      points: points,
    },
  });
  if (!result) {
    return {
      status: 400,
      success: false,
      message: "Error adding points",
    };
  }
  await addNotification(`Referral points are now updated to ${points} points`);
  return {
    status: 201,
    success: true,
    message: "Points updated successfully",
  };
}

export async function addOrderPoints(points: number) {
  const oldPoints = await prisma.orderPoints.findFirst();
  if (oldPoints) {
    const result = await prisma.orderPoints.update({
      where: { id: oldPoints.id },
      data: {
        points: points,
      },
    });
    if (!result) {
      return {
        status: 400,
        success: false,
        message: "Error adding points",
      };
    }
    await addNotification(`Order points are now updated to ${points} points`);
    return {
      status: 201,
      success: true,
      message: "Points updated successfully",
    };
  }

  const result = await prisma.orderPoints.create({
    data: {
      points: points,
    },
  });
  if (!result) {
    return {
      status: 400,
      success: false,
      message: "Error adding points",
    };
  }
  await addNotification(`Order points are now updated to ${points} points`);
  return {
    status: 201,
    success: true,
    message: "Points updated successfully",
  };
}

export async function getReferralPoints() {
  const result = await prisma.referralPoints.findFirst();
  if (!result) {
    return null;
  }
  return result;
}

export async function getOrderPoints() {
  const result = await prisma.orderPoints.findFirst();
  if (!result) {
    return null;
  }
  return result;
}
