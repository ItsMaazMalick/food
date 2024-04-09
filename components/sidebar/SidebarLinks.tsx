"use client";

import { adminNavLinks, superAdminNavLinks } from "@/constants/navlinks";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLinks({ source }: { source: string }) {
  const pathname = usePathname();
  return (
    <div className="w-full flex flex-col gap-2 p-2 h-full">
      {source === "admin" ? (
        <>
          {adminNavLinks.map((link) => (
            <Link
              className={`py-1 px-2  rounded-md flex gap-2 items-center ${
                pathname === link.href
                  ? "text-primary-foreground bg-secondary"
                  : "text-secondary bg-primary"
              }  
          bg-opacity-100 transition-all duration-300 hover:bg-secondary hover:text-primary-foreground`}
              href={link.href}
              key={link.title}
            >
              <span>{link.icon}</span>
              {link.title}
            </Link>
          ))}
        </>
      ) : (
        <>
          {superAdminNavLinks.map((link) => (
            <Link
              className={`py-1 px-2 rounded-md flex gap-2 items-center ${
                pathname === link.href
                  ? "text-primary-foreground bg-secondary"
                  : "text-secondary bg-primary"
              }  
          bg-opacity-100 transition-all duration-300 hover:bg-secondary hover:text-primary-foreground`}
              href={link.href}
              key={link.title}
            >
              <span>{link.icon}</span>
              {link.title}
            </Link>
          ))}
        </>
      )}
    </div>
  );
}
