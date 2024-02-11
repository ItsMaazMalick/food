import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.item.findMany({
    where: {
      extrasId: {
        hasSome: ["65c8b273fa7215fd564b9faf", "65c8a47bfa7215fd564b9fa9"],
      },
    },
  });

  const idToDelete = "65c8a47bfa7215fd564b9fa9";

  const itemsWithoutDeletedId = data.map((item) => ({
    ...item,
    extrasId: item.extrasId.filter((id) => id !== idToDelete),
  }));

  console.log(itemsWithoutDeletedId);
  return NextResponse.json({ data });
}
