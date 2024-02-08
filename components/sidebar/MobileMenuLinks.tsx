"use client";

import { navLinks } from "@/constants/navlinks";
import Link from "next/link";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { usePathname } from "next/navigation";

export default function MobileMenuLinks() {
  const pathname = usePathname();
  return (
    <>
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href}>
          <DropdownMenuItem
            className={`m-2 p-2 ${
              pathname === link.href
                ? "text-primary-foreground bg-secondary"
                : "text-secondary bg-primary"
            } hover:bg-secondary hover:text-primary-foreground`}
          >
            {link.title}
          </DropdownMenuItem>
        </Link>
      ))}
    </>
  );
}
