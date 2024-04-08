"use server";

import AdminDataTable from "@/components/tables/AdminDataTable";
import prisma from "@/lib/db";

export default async function Admins() {
  const admins = await prisma.admin.findMany();
  console.log(admins);
  return (
    <div>
      <AdminDataTable data={admins} index={7} />
    </div>
  );
}
