import { getDataByCategory } from "@/app/actions/categories/categories";
import { getAllItems } from "@/app/actions/items/items";
import TopCard from "@/components/cards/TopCard";
import TopContainer from "@/components/header/TopContainer";
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

export default async function AdminDashboard() {
  const categories = await getDataByCategory("all");
  const items = await getAllItems();
  return (
    <div className="w-full">
      {/* TOP CONTAINER */}
      <TopContainer
        title="Dashboard"
        link={<Salad size={35} className="p-1 bg-white rounded-md" />}
      />
      {/* CARDS */}
      <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <TopCard
          title="Categories"
          icon={<Boxes />}
          length={categories.length}
        />
        <TopCard title="Items" icon={<Salad />} length={items.length} />
        <TopCard
          title="Completed"
          icon={<ListChecks />}
          length={categories.length}
        />
        <TopCard
          title="Pending"
          icon={<LayoutList />}
          length={categories.length}
        />
        <TopCard
          title="Revenue"
          icon={<DollarSign />}
          length={categories.length}
        />
      </div>
      <div className="w-full sm:w-[calc(100vw-170px)] md:w-[calc(100vw-240px)] max-h-[400px] overflow-y-auto overflow-x-auto">
        <div className="mt-4 bg-white">
          <p className="p-2 text-xl font-bold text-primary">Categories</p>
          <AdminDataTable index={1} data={categories} />
        </div>
        <div className="mt-4 bg-white">
          <p className="p-2 text-xl font-bold text-primary">Items</p>
          <AdminDataTable index={2} data={items} />
        </div>
      </div>
    </div>
  );
}
