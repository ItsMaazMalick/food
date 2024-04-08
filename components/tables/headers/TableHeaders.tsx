import { deleteCategory } from "@/app/actions/categories/categories";
import AlertComponent from "@/components/alertDialog/AlertComponent";
import FormSubmitButton from "@/components/button/FormSubmitButton";
import { AdminAction } from "@/components/dialog/AdminAction";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Delete, Edit, FilePenLine, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ? Category Header
export const CategoriesHeader: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center justify-start cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown size={15} className="ml-1" />
        </div>
      );
    },
    cell: ({ row }) => <div className="font-bold">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="relative w-14 h-10">
        <Image
          src={row.original.image}
          alt={row.original.name}
          fill
          className="rounded-md object-center"
        />
      </div>
    ),
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => (
      <div className="text-primary font-bold">
        {row?.original?.items?.length}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: ({ column }) => <div className="text-end">Action</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-4 justify-end">
        <Link
          href={`/admin/dashboard/categories/edit-category/${row.original.id}`}
        >
          <Button size={"xs"}>Edit</Button>
        </Link>
        <AlertComponent
          target="category"
          id={row.original.id}
          path="/admin/dashboard"
        />
      </div>
    ),
  },
];

// ? Items Header
export const ItemsHeader: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center justify-start cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Item Name
          <ArrowUpDown size={15} className="ml-1" />
        </div>
      );
    },
    cell: ({ row }) => <div className="font-bold">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="relative w-14 h-10">
        <Image
          src={row.original.image}
          alt={row.original.name}
          fill
          className="rounded-md object-center"
        />
      </div>
    ),
  },
  {
    accessorKey: "inStock",
    header: "In Stock",
    cell: ({ row }) => <div>{row.getValue("inStock")}</div>,
  },
  {
    accessorKey: "originalPrice",
    header: "Original Price",
    cell: ({ row }) => (
      <div className="font-bold">
        <span className="text-primary">$</span>
        {row.getValue("originalPrice")}
      </div>
    ),
  },
  {
    accessorKey: "salePrice",
    header: "Sale Price",
    cell: ({ row }) => (
      <div className="font-bold">
        <span className="text-primary">$</span>
        {row.getValue("salePrice")}
      </div>
    ),
  },
  {
    accessorKey: "isRecommended",
    header: "Recommended",
    cell: ({ row }) => (
      <div>{row.getValue("isRecommended") ? "TRUE" : "FALSE"}</div>
    ),
  },
  // {
  //   accessorKey: "featured",
  //   header: "Featured",
  //   cell: ({ row }) => <div>{row.getValue("featured") ? "TRUE" : "FALSE"}</div>,
  // },
  {
    accessorKey: "actions",
    header: ({ column }) => <div className="text-end">Action</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-4 justify-end">
        <Link
          href={`/admin/dashboard/products/edit-product/${row.original.id}`}
        >
          <Button size={"xs"}>Edit</Button>
        </Link>
        <AlertComponent
          target="item"
          id={row.original.id}
          path="/admin/dashboard"
        />
      </div>
    ),
  },
];

export const ExtrasHeader: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center justify-start cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Item Name
          <ArrowUpDown size={15} className="ml-1" />
        </div>
      );
    },
    cell: ({ row }) => <div className="font-bold">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="relative w-14 h-10">
        <Image
          src={row.original.image}
          alt={row.original.name}
          fill
          className="rounded-md object-center"
        />
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="font-bold">
        <span className="text-primary">$</span>
        {row.getValue("price")}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: ({ column }) => <div className="text-end">Action</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-4 justify-end">
        <Link href={`/admin/dashboard/extras/edit-extras/${row.original.id}`}>
          <Button size={"xs"}>Edit</Button>
        </Link>
        <AlertComponent
          target="extras"
          id={row.original.id}
          path="/admin/dashboard"
        />
      </div>
    ),
  },
];

export const OrdersHeader: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center justify-start cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown size={15} className="ml-1" />
        </div>
      );
    },
    cell: ({ row }) => <div className="font-bold">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => <div>{row.getValue("address")}</div>,
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => <div>{row.getValue("contact")}</div>,
  },
  {
    accessorKey: "orderType",
    header: "Order Type",
    cell: ({ row }) => <div>{row.getValue("orderType")}</div>,
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
    cell: ({ row }) => (
      <div
        className={`${
          row.getValue("orderStatus") === "completed" ? "text-green-600" : ""
        }`}
      >
        {row.getValue("orderStatus")}
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: "Price",
    cell: ({ row }) => (
      <div className="font-bold">
        <span className="text-primary">$:&nbsp;</span>
        {row.getValue("total")}
      </div>
    ),
  },
  {
    accessorKey: "isPaid",
    header: "Payment Status",
    cell: ({ row }) => (
      <div>
        {row.getValue("isPaid") ? (
          <span className="text-green-600">paid</span>
        ) : (
          <span className="text-destructive">pending</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: ({ column }) => <div className="text-end">Action</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-4 justify-end">
        <Link href={`/admin/dashboard/orders/order-detail/${row.original.id}`}>
          <Button size={"xs"}>View</Button>
        </Link>
        <AlertComponent
          target="orders"
          id={row.original.id}
          path="/admin/dashboard/orders"
        />
      </div>
    ),
  },
];

export const OrderProductsDetailHeader: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center justify-start cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown size={15} className="ml-1" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="font-bold">{row.original.product.name}</div>
    ),
  },
  {
    accessorKey: "variation",
    header: "Variation",
    cell: ({ row }) => (
      <div className="text-primary font-bold">
        {row.getValue("variation") ? row.getValue("variation") : "NO"}
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div>{row.getValue("price")}</div>,
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => (
      <div>
        {parseFloat(row.getValue("price")) *
          parseFloat(row.getValue("quantity"))}
      </div>
    ),
  },
];

export const OrderExtrasHeader: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center justify-start cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown size={15} className="ml-1" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="font-bold">{row.original.product.name}</div>
    ),
  },

  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div>{row.getValue("price")}</div>,
  },
];

export const AdminsHeader: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center justify-start cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown size={15} className="ml-1" />
        </div>
      );
    },
    cell: ({ row }) => <div className="font-bold">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="relative w-14 h-10">
        <Image
          src={row.original.image}
          alt={row.original.name}
          fill
          className="rounded-md object-center"
        />
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "isAdmin",
    header: "Verified",
    cell: ({ row }) => (
      <div>
        {row.getValue("isAdmin") ? (
          <span className="text-green-600">verified</span>
        ) : (
          <span className="text-destructive">pending</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: ({ column }) => <div className="text-end">Action</div>,
    cell: ({ row }) => (
      <div className="flex justify-end items-center">
        <AdminAction data={row.original}>
          <Button variant={"destructive"}>Update</Button>
        </AdminAction>
      </div>
    ),
  },
];
