import { Menu, Salad } from "lucide-react";
import DropdownComponent from "../dropdown/DropdownComponent";
import { DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import Link from "next/link";
import AdminLogoutForm from "../forms/AdminLogoutForm";
import MobileMenuLinks from "../sidebar/MobileMenuLinks";
import { Button } from "../ui/button";

export default function TopContainer({
  title,
  link,
}: {
  title: string;
  link: any;
}) {
  return (
    <div className="flex justify-between items-center h-12 shadow-md px-2 md:px-6 py-2 rounded-md bg-primary">
      <div className="hidden sm:block">{title}</div>
      <div className="block sm:hidden">
        <DropdownComponent button={<Menu />}>
          <MobileMenuLinks />
          <DropdownMenuItem>
            <div className="w-full flex flex-col gap-2">
              {/* <div className="w-full">
                <Link href={"admin/dashboard/edit-profile"}>
                  <Button variant={"outline"} className="w-full">
                    Edit Profile
                  </Button>
                </Link>
              </div> */}
              <div className="w-full">
                <AdminLogoutForm />
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownComponent>
      </div>
      <div>{link}</div>
    </div>
  );
}
