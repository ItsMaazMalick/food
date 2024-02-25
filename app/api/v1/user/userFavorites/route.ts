import { verifyPublicToken } from "@/app/actions/publicToken";
import { verifyUserToken } from "@/app/actions/user/userToken";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const token = await verifyUserToken();
    if (!token) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Invalid request",
      });
    }

    const { userId, productId } = await request.json();
    if (!userId || !productId) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "All fields are required",
      });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "No user found",
      });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "No product found",
      });
    }

    if (user.favorites.includes(productId)) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Product is already in favorites",
      });
    }

    const updatedFavorites = [...user.favorites, productId];
    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: {
        favorites: updatedFavorites,
      },
    });
    return NextResponse.json({
      status: 201,
      success: true,
      message: "Added to favorites",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const token = await verifyUserToken();
    if (!token) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Invalid request",
      });
    }
    const { userId, productId } = await request.json();
    if (!userId || !productId) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "All fields are required",
      });
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "No user found",
      });
    }

    if (!user.favorites.includes(productId)) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Product is not in favorites",
      });
    }

    const updatedFavorites = user.favorites.filter((id) => id !== productId);

    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: {
        favorites: updatedFavorites,
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Removed from favorites",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}
