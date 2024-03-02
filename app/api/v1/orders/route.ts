import { saveOrder } from "@/app/actions/orders/orders";
import { verifyUserToken } from "@/app/actions/user/userToken";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type ProductExtra = {
  id: string;
  name: string;
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
  trxId: string;
  userId: string;
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
    const token = await verifyUserToken();
    if (!token) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Invalid request",
      });
    }
    const isDuplicate = await prisma.order.findUnique({
      where: { trxId: data.trxId },
    });
    if (isDuplicate) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Invalid TRX ID",
      });
    }

    const order = await prisma.order.create({
      data: {
        user: {
          connect: {
            id: data.userId,
          },
        },
        trxId: data.trxId,
        address: "Bhara Kahu",
        contact: "03125770904",
        quantity: 5,
        total: 4.56,
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

    return NextResponse.json({ status: 200, order });
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
