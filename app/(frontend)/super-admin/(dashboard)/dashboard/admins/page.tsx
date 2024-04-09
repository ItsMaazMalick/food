"use server";

import AdminDataTable from "@/components/tables/AdminDataTable";
import prisma from "@/lib/db";

export default async function Admins() {
  const admins = await prisma.admin.findMany();
  console.log(admins);
  return (
    <div className="mt-4 bg-white">
      <p className="p-2 text-xl font-bold text-primary">Admins</p>
      <AdminDataTable index={7} data={admins} />
    </div>
  );
}
