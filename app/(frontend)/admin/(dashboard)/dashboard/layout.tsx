"use server";
import { getAdminSession } from "@/app/actions/adminSession";
import Sidebar from "@/components/sidebar/Sidebar";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session?.success) {
    return redirect("/admin/auth/login");
  }
  return (
    <div className="w-full min-h-screen flex bg-gray-100">
      <div className="hidden sm:block">
        <Sidebar source={"admin"} />
      </div>
      <div className="p-4 w-full">{children}</div>
    </div>
  );
}
