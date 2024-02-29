import { verifyPublicToken } from "@/app/actions/publicToken";
import prisma from "@/lib/db";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const token = await verifyPublicToken();
    if (!token) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Invalid request",
      });
    }
    const data = await prisma.product.findMany({
      include: {
        extras: {
          select: {
            id: true,
            name: true,
            image: true,
            price: true,
          },
        },
      },
    });
    return NextResponse.json({ status: 200, success: true, data });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
}
