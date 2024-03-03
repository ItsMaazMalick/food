import {
  BaggageClaim,
  Boxes,
  DoorOpen,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";

export const navLinks = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: "Categories",
    href: "/admin/dashboard/categories",
    icon: <Boxes size={18} />,
  },
  {
    title: "Products",
    href: "/admin/dashboard/products",
    icon: <ShoppingBasket size={18} />,
  },
  {
    title: "Extras",
    href: "/admin/dashboard/extras",
    icon: <DoorOpen size={18} />,
  },
  {
    title: "Orders",
    href: "/admin/dashboard/orders",
    icon: <BaggageClaim size={18} />,
  },
];
