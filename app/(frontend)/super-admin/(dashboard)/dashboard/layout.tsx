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
    <div className="w-full min-h-screen bg-gray-100">
      <div className="w-full h-[50px] bg-primary-foreground flex justify-between items-center px-10">
        <div className="flex gap-2 justify-center items-center">
          <Image
            src={"/images/logo.jpeg"}
            alt="Gyro's N More"
            width={40}
            height={40}
          />
          <h1 className="uppercase font-bold">
            <span className="text-primary">Gyro&apos;s n</span>
            <span className="ml-1 text-secondary">more</span>
          </h1>
        </div>
        <div>
          <Link href={"/super-admin/dashboard/admins"}>Admins</Link>
        </div>
      </div>
      <div className="p-4 w-full">{children}</div>
    </div>
  );
}
