import { getDataByCategory } from "@/app/actions/categories/categories";
import BackButton from "@/components/button/BackButton";
import AddCategoryForm from "@/components/forms/AddCategoryForm";
import TopContainer from "@/components/header/TopContainer";
import AdminDataTable from "@/components/tables/AdminDataTable";
import Image from "next/image";

export default async function Categories() {
  const categories = await getDataByCategory("all");
  return (
    <div className="w-full">
      <TopContainer title="Categories" link={<BackButton />} />
      <div className="mt-2">
        <AddCategoryForm />
      </div>
      <div className="mt-4 bg-white">
        <p className="p-2 text-xl font-bold text-primary">Categories</p>
        <AdminDataTable index={1} data={categories} />
      </div>
    </div>
  );
}
