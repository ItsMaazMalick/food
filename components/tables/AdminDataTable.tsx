"use client";

import {
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import {
  CategoriesHeader,
  ExtrasHeader,
  ItemsHeader,
  Table10Header,
  Table11Header,
  Table12Header,
  Table13Header,
  Table14Header,
  Table15Header,
  Table16Header,
  Table17Header,
  Table18Header,
  Table19Header,
  Table4Header,
  Table5Header,
  Table6Header,
  Table7Header,
  Table8Header,
  Table9Header,
} from "./headers/TableHeaders";

type PageProps = {
  data: any;
  index: number;
};

export default function AdminDataTable({ data, index }: PageProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data: data,
    columns:
      index === 1
        ? CategoriesHeader
        : index === 2
        ? ItemsHeader
        : index === 3
        ? ExtrasHeader
        : index === 4
        ? Table4Header
        : index === 5
        ? Table5Header
        : index === 6
        ? Table6Header
        : index === 7
        ? Table7Header
        : index === 8
        ? Table8Header
        : index === 9
        ? Table9Header
        : index === 10
        ? Table10Header
        : index === 11
        ? Table11Header
        : index === 12
        ? Table12Header
        : index === 13
        ? Table13Header
        : index === 14
        ? Table14Header
        : index === 15
        ? Table15Header
        : index === 16
        ? Table16Header
        : index === 17
        ? Table17Header
        : index === 18
        ? Table18Header
        : Table19Header,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full p-2">
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Filter Name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <span className="hidden sm:inline">Columns</span>
              <ArrowUpDown size={15} className="ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-h-48 overflow-y-auto">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border max-h-[500px] overflow-y-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {data.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="h-[73px]">
                <TableCell
                  colSpan={table.getVisibleFlatColumns().length}
                  className="text-center text-destructive font-bold"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
