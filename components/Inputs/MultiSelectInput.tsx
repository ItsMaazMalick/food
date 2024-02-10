"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Item = {
  name: string;
  id: string;
};

type MultiInputProps = {
  label: string;
  name: string;
  data: Item[];
  onSelectionChange: (selectedIds: string[]) => void;
};

export default function MultiSelectInput({
  label,
  name,
  data,
  onSelectionChange,
}: MultiInputProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const checkChange = (fieldName: string, fieldId: string) => {
    setSelectedValues((prevSelected: any) => {
      if (prevSelected.includes(fieldName)) {
        return prevSelected.filter((name: any) => name !== fieldName);
      } else {
        return [...prevSelected, fieldName];
      }
    });
    setSelectedIds((prevSelected: any) => {
      if (prevSelected.includes(fieldId)) {
        return prevSelected.filter((id: any) => id !== fieldId);
      } else {
        return [...prevSelected, fieldId];
      }
    });
  };

  onSelectionChange(selectedIds);

  return (
    <div>
      <div className="mb-2">{label}</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full" variant="outline">
            {selectedValues.map((value, index) => (
              <span
                key={index}
                className="p-1 m-1 border rounded-lg border-primary"
              >
                {value}
              </span>
            ))}
            <span className="ml-1 rounded-md bg-primary text-primary-foreground">
              <ChevronDown size={20} />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 max-h-64 overflow-y-auto">
          <DropdownMenuLabel>Select {name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {data.map((value, index: number) => (
            <DropdownMenuCheckboxItem
              key={index}
              checked={selectedValues.includes(value.name)}
              onCheckedChange={() => checkChange(value.name, value.id)}
            >
              {value.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
