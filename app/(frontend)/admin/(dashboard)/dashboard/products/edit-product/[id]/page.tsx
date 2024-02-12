import { getDataByCategory } from "@/app/actions/categories/categories";
import { getAllExtras, getSingleExtras } from "@/app/actions/extras/extras";
import { getSingleProduct } from "@/app/actions/product/product";
import BackButton from "@/components/button/BackButton";
import EditCategoryForm from "@/components/forms/EditCategoryForm";
import EditExtrasForm from "@/components/forms/EditExtrasForm";
import EditProductForm from "@/components/forms/EditProductForm";
import EditItemForm from "@/components/forms/EditProductForm";
import TopContainer from "@/components/header/TopContainer";

export default async function EditItem({ params }: { params: { id: string } }) {
  const categories = await getDataByCategory("all");
  const extras = await getAllExtras();
  const { product } = await getSingleProduct(params.id);

  return (
    <div>
      <TopContainer title="Edit Product" link={<BackButton />} />
      <div className="mt-2">
        <EditProductForm
          categories={categories}
          extras={extras}
          product={product}
        />
      </div>
    </div>
  );
}
