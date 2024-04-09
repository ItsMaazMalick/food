import { getAllExtras } from "@/app/actions/extras/extras";
import BackButton from "@/components/button/BackButton";
import AddExtrasForm from "@/components/forms/AddExtrasForm";
import TopContainer from "@/components/header/TopContainer";
import AdminDataTable from "@/components/tables/AdminDataTable";

export default async function Extras() {
  const extras = await getAllExtras();
  return (
    <div className="w-full">
      <TopContainer title="Extras" link={<BackButton />} />
      <div className="mt-2">
        <AddExtrasForm />
      </div>
      <div className="mt-4 bg-white">
        <p className="p-2 text-xl font-bold text-primary">Extras</p>
        <AdminDataTable index={3} data={extras} />
      </div>
    </div>
  );
}
