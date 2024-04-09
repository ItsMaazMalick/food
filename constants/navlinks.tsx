import {
  BaggageClaim,
  Boxes,
  DoorOpen,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";

export const superAdminNavLinks = [
  {
    title: "Dashboard",
    href: "/super-admin/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: "Admins",
    href: "/super-admin/dashboard/admins",
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: "Categories",
    href: "/super-admin/dashboard/categories",
    icon: <Boxes size={18} />,
  },
  {
    title: "Products",
    href: "/super-admin/dashboard/products",
    icon: <ShoppingBasket size={18} />,
  },
  {
    title: "Extras",
    href: "/super-admin/dashboard/extras",
    icon: <DoorOpen size={18} />,
  },
  {
    title: "Orders",
    href: "/super-admin/dashboard/orders",
    icon: <BaggageClaim size={18} />,
  },
  {
    title: "Notifications",
    href: "/super-admin/dashboard/notifications",
    icon: <BaggageClaim size={18} />,
  },
  {
    title: "Points",
    href: "/super-admin/dashboard/points",
    icon: <BaggageClaim size={18} />,
  },
];

export const adminNavLinks = [
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
  {
    title: "Notifications",
    href: "/admin/dashboard/notifications",
    icon: <BaggageClaim size={18} />,
  },
];
