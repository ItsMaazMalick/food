"use server";
import { getSuperAdminSession } from "@/app/actions/superAdminSession";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function SuperAdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSuperAdminSession();
  if (session?.success) {
    return redirect("/super-admin/dashboard");
  }
  return (
    <div className="w-screen min-h-screen flex justify-center items-center">
      <div className="absolute w-screen h-screen top-0 left-0 blur-sm object-contain">
        <Image src={"/images/bg-image.gif"} alt="LOGO" fill />
      </div>
      <div>{children}</div>
    </div>
  );
}
