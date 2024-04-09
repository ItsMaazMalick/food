"use client";

import Link from "next/link";
import { DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { adminNavLinks, superAdminNavLinks } from "@/constants/navlinks";

export default function MobileMenuLinks() {
  const pathname = usePathname();
  return (
    <>
      {pathname.startsWith("/admin") ? (
        <>
          {adminNavLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <DropdownMenuItem
                className={`m-2 py-1 px-2  flex gap-2 items-center ${
                  pathname === link.href
                    ? "text-primary-foreground bg-secondary"
                    : "text-secondary bg-primary"
                } hover:bg-secondary hover:text-primary-foreground`}
              >
                <span>{link.icon}</span>
                {link.title}
              </DropdownMenuItem>
            </Link>
          ))}
        </>
      ) : (
        <>
          {superAdminNavLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <DropdownMenuItem
                className={`m-2 py-1 px-2  flex gap-2 items-center ${
                  pathname === link.href
                    ? "text-primary-foreground bg-secondary"
                    : "text-secondary bg-primary"
                } hover:bg-secondary hover:text-primary-foreground`}
              >
                <span>{link.icon}</span>
                {link.title}
              </DropdownMenuItem>
            </Link>
          ))}
        </>
      )}

      <DropdownMenuSeparator />
    </>
  );
}
