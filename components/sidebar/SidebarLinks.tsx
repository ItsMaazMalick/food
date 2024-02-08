"use client";

import { navLinks } from "@/constants/navlinks";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLinks() {
  const pathname = usePathname();
  return (
    <div className="w-full flex flex-col gap-4 p-2 h-full">
      {navLinks.map((link) => (
        <Link
          className={`p-2 rounded-md ${
            pathname === link.href
              ? "text-primary-foreground bg-secondary"
              : "text-secondary bg-primary"
          }  
          bg-opacity-100 transition-all duration-300 hover:bg-secondary hover:text-primary-foreground`}
          href={link.href}
          key={link.title}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}
