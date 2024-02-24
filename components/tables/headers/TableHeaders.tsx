import { deleteCategory } from "@/app/actions/categories/categories";
import AlertComponent from "@/components/alertDialog/AlertComponent";
import FormSubmitButton from "@/components/button/FormSubmitButton";
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
          src={`data:image/png;base64,${row.original.image}`}
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
