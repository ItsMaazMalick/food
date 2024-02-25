import { getDataByCategory } from "@/app/actions/categories/categories";
import { getAllExtras } from "@/app/actions/extras/extras";
import { getAllProducts } from "@/app/actions/product/product";
import TopCard from "@/components/cards/TopCard";
import PieChart from "@/components/charts/PieChart";
import Example from "@/components/charts/PieChart";
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
import Image from "next/image";

export default async function AdminDashboard() {
  const categories = await getDataByCategory("all");
  const products = await getAllProducts();
  const extras = await getAllExtras();
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
        <TopCard title="Products" icon={<Salad />} length={products.length} />
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
      <div className="mt-4 grid grid-cols-1 md:grid-cols-12 h-[350px] gap-4">
        <div className=" bg-white col-span-12 lg:col-span-8 shadow-md rounded-md">
          {/* <p className="p-2 text-xl font-bold text-primary">Calculations</p> */}
          <PieChart
            categoryLength={categories.length}
            itemsLength={products.length}
            extrasLength={extras.length}
          />
        </div>
        <div className="hidden lg:col-span-4 bg-white rounded-md shadow-md lg:flex justify-center items-center">
          <div className="relative w-[100%] h-full">
            <Image
              src={"/images/logo.jpeg"}
              alt="Gyro's N More"
              fill
              className="object-center"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 bg-white">
        <p className="p-2 text-xl font-bold text-primary">Categories</p>
        <AdminDataTable index={1} data={categories} />
      </div>
      <div className="mt-4 bg-white">
        <p className="p-2 text-xl font-bold text-primary">Products</p>
        <AdminDataTable index={2} data={products} />
      </div>
      <div className="mt-4 bg-white">
        <p className="p-2 text-xl font-bold text-primary">Extras</p>
        <AdminDataTable index={3} data={extras} />
      </div>
    </div>
  );
}
