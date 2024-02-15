import { getAdminSession } from "@/app/actions/adminSession";
import Image from "next/image";
import Link from "next/link";
import AdminLogoutForm from "../forms/AdminLogoutForm";
import SidebarLinks from "./SidebarLinks";
import { Button } from "../ui/button";

export default async function Sidebar() {
  const { name, image, id } = await getAdminSession();
  return (
    <div className="bg-white sm:w-[150px] md:w-[200px] min-h-screen z-50 sticky top-0 shadow-xl">
      <div className="w-full h-screen flex flex-col justify-between">
        {/* LOGO */}
        <div className="w-full py-4 px-2 flex gap-2 justify-center items-center">
          <Image src={"/images/logo.jpeg"} alt="LOGO" width={30} height={30} />
          <h1 className="uppercase font-bold">
            <span className="text-primary">Gyro&apos;s n</span>
            <span className="ml-1 text-secondary">more</span>
          </h1>
        </div>
        {/* USER */}
        <div className="w-full p-2 flex gap-2 items-center mb-4">
          <div className="relative w-[40px] h-[40px]">
            <Image
              className="rounded-full object-center"
              src={image ? image : "/images/no-avatar.png"}
              alt="ABC"
              fill
            />
          </div>
          <div className="flex flex-col -space-y-1">
            <h2 className="font-bold text-secondary text-xs sm:text-base">
              {name}
            </h2>
            <span className="text-xs text-green-600 font-bold">online</span>
          </div>
        </div>
        <SidebarLinks />
        <div className="px-2">
          <Link href={`/admin/dashboard/edit-profile/${id}`}>
            <Button variant={"outline"} className="w-full">
              Edit Profile
            </Button>
          </Link>
        </div>
        <div className="p-2">
          <AdminLogoutForm />
        </div>
      </div>
    </div>
  );
}
