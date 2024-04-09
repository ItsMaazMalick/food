import { getAllOrders } from "@/app/actions/orders/orders";
import AdminDataTable from "@/components/tables/AdminDataTable";
import { revalidatePath } from "next/cache";

export default async function OrdersPage() {
  const orders = await getAllOrders();
  return (
    <div className="w-full">
      <div className="mt-4 bg-white">
        <p className="p-2 text-xl font-bold text-primary">Orders</p>
        <AdminDataTable index={4} data={orders} />
      </div>
    </div>
  );
}
