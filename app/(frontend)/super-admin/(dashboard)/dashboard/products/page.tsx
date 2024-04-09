import { getDataByCategory } from "@/app/actions/categories/categories";
import { getAllExtras } from "@/app/actions/extras/extras";
import { getAllProducts } from "@/app/actions/product/product";
import BackButton from "@/components/button/BackButton";
import AddItemForm from "@/components/forms/AddProductForm";
import TopContainer from "@/components/header/TopContainer";
import AdminDataTable from "@/components/tables/AdminDataTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function ItemsPage() {
  const products = await getAllProducts();
  const categories = await getDataByCategory("all");
  const extras = await getAllExtras();
  return (
    <div className="w-full">
      <TopContainer title="Products" link={<BackButton />} />
      <div className="mt-2">
        <div className="p-2 bg-white">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline text-primary-foreground hover:text-primary bg-secondary p-2 rounded-md">
                Add New Product
              </AccordionTrigger>
              <AccordionContent>
                <AddItemForm categories={categories} extras={extras} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="mt-4 bg-white">
        <p className="p-2 text-xl font-bold text-primary">Items</p>
        <AdminDataTable index={2} data={products} />
      </div>
    </div>
  );
}
