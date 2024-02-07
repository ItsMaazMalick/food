"use server";
import { getAdminSession } from "@/app/actions/adminSession";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (session?.success) {
    redirect("/admin/dashboard");
  }
  return (
    <div className="w-screen min-h-screen">
      <div className="absolute w-screen h-screen top-0 left-0 blur-sm object-contain">
        <Image src={"/images/bg-image.gif"} alt="LOGO" fill />
      </div>
      <div>{children}</div>
    </div>
  );
}