import { Menu, Salad } from "lucide-react";
import DropdownComponent from "../dropdown/DropdownComponent";
import { DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { navLinks } from "@/constants/navlinks";
import Link from "next/link";
import AdminLogoutForm from "../forms/AdminLogoutForm";
import MobileMenuLinks from "../sidebar/MobileMenuLinks";

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
            <div className="w-full">
              <AdminLogoutForm />
            </div>
          </DropdownMenuItem>
        </DropdownComponent>
      </div>
      <div className="flex gap-2 items-center">{link}</div>
    </div>
  );
}
