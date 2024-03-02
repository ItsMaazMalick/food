import { verifyUserToken } from "@/app/actions/user/userToken";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const token = await verifyUserToken();
    if (!token) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Invalid request",
      });
    }
    const pathname = request.nextUrl.pathname;
    const params = pathname.split("/v1/orders/")[1];
    const order = await prisma.order.findMany({
      where: { userId: params },
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
      return NextResponse.json({ status: 401, message: "No order found" });
    }

    return NextResponse.json({ status: 200, order });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
