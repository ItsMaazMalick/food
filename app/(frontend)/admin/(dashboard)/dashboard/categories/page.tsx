import { Button } from "@/components/ui/button";
import { Plus, PlusCircle } from "lucide-react";

export default function Categories() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center h-12 shadow-md px-2 md:px-6 py-2 rounded-md bg-primary">
        <div className="hidden sm:block">Categories</div>
        <Button variant={"outline"}>
          Add <PlusCircle className="ml-1" size={16} />
        </Button>
      </div>
      {/* TABLE */}
    </div>
  );
}
