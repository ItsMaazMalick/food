import AdminDataTable from "@/components/tables/AdminDataTable";
import { Input } from "@/components/ui/input";
import { Menu, Search } from "lucide-react";

const cardData = [
  {
    title: "Categories",
    value: 10,
    backgroundColor: "bg-secondary text-white",
  },
  { title: "Items", value: 20, backgroundColor: "bg-primary" },
  { title: "Completed", value: 2, backgroundColor: "bg-secondary-foreground" },
  { title: "Pending", value: 4, backgroundColor: "bg-primary" },
  { title: "Revenue", value: 50, backgroundColor: "bg-secondary text-white" },
];

export default function page() {
  return (
    <div className="w-full">
      {/* TOP CONTAINER */}
      <div className="flex justify-between items-center h-12 shadow-md px-2 md:px-6 py-2 rounded-md bg-primary">
        <div className="hidden sm:block">Categories</div>
        <div className="block sm:hidden">
          <Menu />
        </div>
        <div className="flex gap-2 items-center">
          <Input
            className="w-[150px] sm:w-[200px]"
            type="text"
            placeholder="Search category"
          />
          <div className="bg-secondary-foreground text-primary-foreground p-2 rounded-md cursor-pointer hover:scale-105 bg-opacity-70 hover:bg-opacity-100">
            <Search />
          </div>
        </div>
      </div>
      {/* CARDS */}
      <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cardData.map((data) => (
          <div
            key={data.title}
            className={`w-full ${data.backgroundColor} rounded-md shadow-md flex items-center justify-between px-4 py-4 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300`}
          >
            <p>{data.title}</p>
            <p className="font-bold">{data.value}</p>
          </div>
        ))}
      </div>
      <div className="w-full sm:w-[calc(100vw-170px)] md:w-[calc(100vw-240px)] max-h-[400px] overflow-y-auto overflow-x-auto">
        <AdminDataTable index={1} data={[]} />
      </div>
    </div>
  );
}
