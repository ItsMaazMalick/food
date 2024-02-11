import { getDataByCategory } from "@/app/actions/categories/categories";
import { getAllExtras, getSingleExtras } from "@/app/actions/extras/extras";
import { getSingleItem } from "@/app/actions/items/items";
import BackButton from "@/components/button/BackButton";
import EditCategoryForm from "@/components/forms/EditCategoryForm";
import EditExtrasForm from "@/components/forms/EditExtrasForm";
import EditItemForm from "@/components/forms/EditItemForm";
import TopContainer from "@/components/header/TopContainer";

export default async function EditItem({ params }: { params: { id: string } }) {
  const categories = await getDataByCategory("all");
  const extras = await getAllExtras();
  const { item } = await getSingleItem(params.id);

  return (
    <div>
      <TopContainer title="Edit Item" link={<BackButton />} />
      <div className="mt-2">
        <EditItemForm categories={categories} extras={extras} item={item} />
      </div>
    </div>
  );
}
