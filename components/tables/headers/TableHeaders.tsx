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
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => <div>{row?.original?.items?.length}</div>,
  },
  {
    accessorKey: "actions",
    header: ({ column }) => <div className="text-end">Action</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-4 justify-end">
        <form action="">
          <FormSubmitButton size={"xs"} title="Edit" />
        </form>
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
    accessorKey: "mainImage",
    header: "Image",
    cell: ({ row }) => (
      <div className="relative w-14 h-10">
        <Image
          src={`/images/${row.original.mainImage}`}
          alt={row.original.name}
          fill
          className="rounded-md object-cover"
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
    cell: ({ row }) => <div>{row.getValue("originalPrice")}</div>,
  },
  {
    accessorKey: "salePrice",
    header: "Sale Price",
    cell: ({ row }) => <div>{row.getValue("salePrice")}</div>,
  },
  {
    accessorKey: "featured",
    header: "Featured",
    cell: ({ row }) => <div>{row.getValue("featured")}</div>,
  },
  {
    accessorKey: "actions",
    header: ({ column }) => <div className="text-end">Action</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-4 justify-end">
        <form action="">
          <FormSubmitButton size={"xs"} title="Edit" />
        </form>
        <AlertComponent
          target="item"
          id={row.original.id}
          path="/admin/dashboard"
        />
      </div>
    ),
  },
];

export const Table3Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row?.original?.user?.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table4Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table5Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table6Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table7Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table8Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table9Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table10Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table11Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table12Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table13Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table14Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table15Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table16Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table17Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table18Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];

export const Table19Header: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Hello",
    cell: ({ row }) => (
      <div className="font-bold">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown size={15} className="ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: "Year",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "journal_name",
    header: "Journal Name",
    cell: ({ row }) => <div>{row.getValue("journal_name")}</div>,
  },
  {
    accessorKey: "authors",
    header: "Authors Name",
    cell: ({ row }) => <div>{row.getValue("authors")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "issn",
    header: "ISSN",
    cell: ({ row }) => <div>{row.getValue("issn")}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "page_no",
    header: "Pages",
    cell: ({ row }) => <div>{row.getValue("page_no")}</div>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => <div>{row.getValue("affiliation")}</div>,
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => (
      <Link href={row.getValue("link")} target="_blank">
        {row.getValue("link")}
      </Link>
    ),
  },
  {
    accessorKey: "addressing",
    header: "addressing",
    cell: ({ row }) => <div>{row.getValue("addressing")}</div>,
  },
];
