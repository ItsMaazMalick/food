import { getSingleCategory } from "@/app/actions/categories/categories";
import BackButton from "@/components/button/BackButton";
import AddCategoryForm from "@/components/forms/AddCategoryForm";
import EditCategoryForm from "@/components/forms/EditCategoryForm";
import TopContainer from "@/components/header/TopContainer";

export default async function EditCategory({
  params,
}: {
  params: { id: string };
}) {
  const { category } = await getSingleCategory(params.id);
  return (
    <div>
      <TopContainer title="Edit Category" link={<BackButton />} />
      <div className="mt-2">
        <EditCategoryForm category={category} />
      </div>
    </div>
  );
}
