"use server";

import prisma from "@/lib/db";
type Props = {
  userId: string;
  address: string;
  contact: string;
  products: [
    {
      productId: string;
      extras: [
        {
          id: string;
          name: string;
          quantity: number;
          price: number;
        }
      ];
      quantity: number;
      price: number;
    }
  ];
  quantity: number;
  total: number;
};

export async function saveOrder({
  userId,
  address,
  contact,
  products,
  quantity,
  total,
}: any) {
  const order = await prisma.order.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      address: "Bhara Kahu",
      contact: "03125770904",
      quantity: 5,
      total: 4.56,
    },
  });
  await prisma.$transaction(async (prisma) => {
    for (const product of products) {
      try {
        const createdProduct = await prisma.orderProduct.create({
          data: {
            orderId: order.id,
            productId: product.productId,
            quantity: product.quantity,
            price: product.price,
          },
        });
        await prisma.order.update({
          where: { id: order.id },
          data: {
            orderProducts: {
              connect: {
                id: createdProduct.id,
              },
            },
          },
        });
        for (const extra of product.extras) {
          try {
            const orderProductExtras = await prisma.orderProductExtras.create({
              data: {
                orderProductId: createdProduct.id,
                extrasId: extra.id,
                quantity: extra.quantity,
                price: extra.price,
              },
            });
            await prisma.orderProduct.update({
              where: {
                id: createdProduct.id,
              },
              data: {
                orderProductExtras: {
                  connect: {
                    id: orderProductExtras.id,
                  },
                },
              },
            });
            return order;
          } catch (error) {
            console.log(error);
            return { error: "Internal server error" };
          }
        }
      } catch (error) {
        return { error: "Internal server error" };
      }
    }
  });
}
