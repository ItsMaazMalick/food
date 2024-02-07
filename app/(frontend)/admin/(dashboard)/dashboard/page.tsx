import AdminDataTable from "@/components/tables/AdminDataTable";
import { Input } from "@/components/ui/input";
import {
  Boxes,
  DollarSign,
  LayoutList,
  ListChecks,
  Menu,
  Salad,
  Search,
} from "lucide-react";

const cardData = [
  {
    title: "Categories",
    value: 10,
    icon: <Boxes />,
  },
  {
    title: "Items",
    value: 20,
    icon: <Salad />,
  },
  {
    title: "Completed",
    value: 2,
    icon: <ListChecks />,
  },
  {
    title: "Pending",
    value: 4,
    icon: <LayoutList />,
  },
  {
    title: "Revenue",
    value: 50,
    icon: <DollarSign />,
  },
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
          <div className="bg-secondary text-primary-foreground p-2 rounded-md cursor-pointer hover:scale-105 bg-opacity-70 hover:bg-opacity-100">
            <Search />
          </div>
        </div>
      </div>
      {/* CARDS */}
      <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cardData.map((data) => (
          <div
            key={data.title}
            className={`w-full bg-gradient-to-r from-[#09203F] to-[#537895] rounded-md shadow-md px-4 py-4 bg-opacity-50 hover:bg-opacity-100 transition-all duration-300 text-primary`}
          >
            <p className="mb-2 text-white">{data.title}</p>
            <div className="flex items-center justify-between ">
              <p className="font-bold">{data.icon}</p>
              <p className="font-bold">{data.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full sm:w-[calc(100vw-170px)] md:w-[calc(100vw-240px)] max-h-[400px] overflow-y-auto overflow-x-auto">
        <div className="mt-4 bg-white">
          <p className="p-2 text-xl font-bold text-primary">Categories</p>
          <AdminDataTable index={1} data={[]} />
        </div>
        <div className="mt-4 bg-white">
          <p className="p-2 text-xl font-bold text-primary">Items</p>
          <AdminDataTable index={1} data={[]} />
        </div>
      </div>
    </div>
  );
}
