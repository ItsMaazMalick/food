"use server";
import { getSuperAdminSession } from "@/app/actions/superAdminSession";
import Sidebar from "@/components/sidebar/Sidebar";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSuperAdminSession();
  if (!session?.success) {
    return redirect("/super-admin/auth/login");
  }
  return (
    <div className="w-full min-h-screen flex bg-gray-100">
      <div className="hidden sm:block">
        <Sidebar source={"super-admin"} />
      </div>
      <div className="p-4 w-full">{children}</div>
    </div>
  );
}
