import { getOrder } from "@/app/actions/orders/orders";
import { getUserById } from "@/app/actions/user/auth";
import { verifyUserToken } from "@/app/actions/user/userToken";
import { codeGenerator, numberGenerator } from "@/lib/codeGenerator";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type ProductExtra = {
  id: string;
  quantity: number;
  price: number;
};

type Product = {
  productId: string;
  extras: ProductExtra[];
  quantity: number;
  price: number;
};

type RequestData = {
  userId: string;
  name: string;
  trxId?: string;
  address: string;
  contact: string;
  products: Product[];
  quantity: number;
  total: number;
  orderType: string;
  isPaid: boolean;
};

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const data: RequestData = await request.json();

    const isUser = await getUserById(data.userId);
    if (!isUser) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid request or no user found",
      });
    }

    if (!data.products) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Missing required 'products' property in request body",
      });
    }

    for (const product of data.products) {
      if (
        !(await prisma.product.findUnique({ where: { id: product.productId } }))
      ) {
        return NextResponse.json({
          status: 401,
          success: false,
          message: "Product not found",
        });
      }
      for (const extras of product.extras) {
        if (!(await prisma.extras.findUnique({ where: { id: extras.id } }))) {
          return NextResponse.json({
            status: 401,
            success: false,
            message: "Extras not found",
          });
        }
      }
    }

    let orderNumber = numberGenerator(15);
    const isOrder = await prisma.order.findUnique({
      where: { orderNo: orderNumber },
    });
    if (isOrder) {
      orderNumber = numberGenerator(15);
    }

    const order = await prisma.order.create({
      data: {
        userId: data.userId,
        orderNo: orderNumber,
        name: data.name,
        trxId: data.trxId,
        address: data.address,
        contact: data.contact,
        quantity: data.quantity,
        total: data.total,
        orderType:
          data.orderType === "pickup"
            ? "pickup"
            : data.orderType === "dinning"
            ? "dinning"
            : "delivery",
        isPaid: data.isPaid,
      },
    });

    const productPromises = data.products.map(async (product) => {
      const createdProduct = await prisma.orderProduct.create({
        data: {
          orderId: order.id,
          productId: product.productId,
          quantity: product.quantity,
          price: product.price,
        },
      });

      const extraPromises = product.extras.map(async (extra) => {
        await prisma.orderProductExtras.create({
          data: {
            orderProductId: createdProduct.id,
            extrasId: extra.id,
            quantity: extra.quantity,
            price: extra.price,
          },
        });
      });
      return Promise.all(extraPromises);
    });

    await Promise.all(productPromises);

    return NextResponse.json({
      status: 200,
      success: true,
      orderNo: order.orderNo,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server error",
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    const isOrder = await getOrder(orderId);
    if (!isOrder) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "No order found",
      });
    }

    // Delete OrderProductExtras
    await prisma.orderProductExtras.deleteMany({
      where: {
        orderProduct: {
          orderId: orderId,
        },
      },
    });

    // Delete OrderProducts
    await prisma.orderProduct.deleteMany({
      where: {
        orderId: orderId,
      },
    });

    // Delete Order
    await prisma.order.delete({
      where: { id: orderId },
    });

    return NextResponse.json({ status: 200, message: "Deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}
