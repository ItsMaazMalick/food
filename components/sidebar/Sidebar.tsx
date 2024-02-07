import Image from "next/image";
import Link from "next/link";

const links = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    title: "Categories",
    href: "/admin/dashboard/categories",
  },
  {
    title: "Items",
    href: "/admin/dashboard/items",
  },
];

export default function Sidebar() {
  return (
    <div className="bg-white sm:w-[150px] md:w-[200px] min-h-screen z-50 sticky top-0 shadow-xl">
      {/* LOGO */}
      <div className="w-full py-4 px-2 flex gap-2 justify-center items-center">
        <Image src={"/images/logo.jpeg"} alt="LOGO" width={30} height={30} />
        <h1 className="uppercase font-bold">
          <span className="text-primary">Gyro's n</span>
          <span className="ml-1 text-secondary">more</span>
        </h1>
      </div>
      {/* USER */}
      <div className="w-full p-2 flex gap-2 items-center mb-4">
        <Image
          className="rounded-full"
          src={"/images/no-avatar.png"}
          alt="ABC"
          width={40}
          height={40}
        />
        <div className="flex flex-col -space-y-1">
          <h2 className="font-bold text-secondary text-xs sm:text-base">
            MAAZ MALICK
          </h2>
          <span className="text-xs text-green-600 font-bold">online</span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 p-2 h-full">
        {links.map((link) => (
          <Link
            className="p-2 rounded-md text-secondary bg-primary bg-opacity-50 hover:bg-primary transition-all duration-300"
            href={link.href}
            key={link.title}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
