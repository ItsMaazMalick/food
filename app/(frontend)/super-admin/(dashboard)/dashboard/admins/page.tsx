"use server";

import TopContainer from "@/components/header/TopContainer";
import AdminDataTable from "@/components/tables/AdminDataTable";
import prisma from "@/lib/db";
import { Salad } from "lucide-react";

export default async function Admins() {
  const admins = await prisma.admin.findMany();
  console.log(admins);
  return (
    <div className="w-full">
      <TopContainer
        title="Admins"
        link={<Salad size={35} className="p-1 bg-white rounded-md" />}
      />
      <div className="mt-4 bg-white">
        <p className="p-2 text-xl font-bold text-primary">Admins</p>
        <AdminDataTable index={7} data={admins} />
      </div>
    </div>
  );
}
