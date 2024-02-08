"use server";
import { getAdminSession } from "@/app/actions/adminSession";
import Sidebar from "@/components/sidebar/Sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session?.success) {
    redirect("/admin/auth/login");
  }
  return (
    <div className="w-full min-h-screen flex bg-gray-100">
      <div className="hidden sm:block">
        <Sidebar />
      </div>
      <div className="p-4 w-full">{children}</div>
    </div>
  );
}
