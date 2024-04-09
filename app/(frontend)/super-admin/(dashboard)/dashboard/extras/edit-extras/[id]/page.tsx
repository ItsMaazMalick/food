import { getSingleExtras } from "@/app/actions/extras/extras";
import BackButton from "@/components/button/BackButton";
import EditCategoryForm from "@/components/forms/EditCategoryForm";
import EditExtrasForm from "@/components/forms/EditExtrasForm";
import TopContainer from "@/components/header/TopContainer";

export default async function EditExtras({
  params,
}: {
  params: { id: string };
}) {
  const { extras } = await getSingleExtras(params.id);

  return (
    <div>
      <TopContainer title="Edit Extras" link={<BackButton />} />
      <div className="mt-2">
        <EditExtrasForm extras={extras} />
      </div>
    </div>
  );
}
