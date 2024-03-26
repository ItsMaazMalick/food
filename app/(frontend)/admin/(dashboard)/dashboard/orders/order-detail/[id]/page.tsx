import { getOrderById } from "@/app/actions/orders/orders";
import BackButton from "@/components/button/BackButton";
import { SimpleDialog } from "@/components/dialog/SimpleDialog";
import TopContainer from "@/components/header/TopContainer";
import AdminDataTable from "@/components/tables/AdminDataTable";
import { Button } from "@/components/ui/button";
import { convertUTCtoPST } from "@/utils/convertUTCtoPST";
import { redirect } from "next/navigation";

export default async function OrderDetail({
  params,
}: {
  params: { id: string };
}) {
  const order = await getOrderById(params.id);
  if (!order) {
    redirect("/admin/dasboard/orders");
  }

  return (
    <div className="w-full">
      <TopContainer title="Order Detail" link={<BackButton />} />
      <div className="mt-4">
        {/* ORDER DETAIL */}
        <div className="p-2 bg-primary rounded-md">
          <div className="px-4">
            Date&nbsp;:
            <span className="ml-1 font-bold">
              {convertUTCtoPST(order.createdAt)}
            </span>
          </div>
          <div className="px-4">
            Order by&nbsp;:<span className="ml-1 font-bold">{order.name}</span>
          </div>
          <div className="px-4">
            Contact&nbsp;:
            <span className="ml-1 font-bold">{order.contact}</span>
          </div>
          <div className="px-4">
            Address&nbsp;:
            <span className="ml-1 font-bold">{order.address}</span>
          </div>
          <div className="px-4">
            Quantity&nbsp;:
            <span className="ml-1 font-bold">{order.quantity}</span>
          </div>
          <div className="px-4">
            Total&nbsp;:
            <span className="ml-1 font-bold">{order.total}</span>
          </div>
          <div className="px-4">
            Order Type&nbsp;:
            <span className="ml-1 font-bold">{order.orderType}</span>
          </div>
          <div className="px-4">
            Order Status&nbsp;:
            <span className="ml-1 font-bold">{order.orderStatus}</span>
          </div>
          <div className="px-4">
            Payment Status&nbsp;:
            <span className="ml-1 font-bold">
              {order.isPaid ? "paid" : "pending"}
            </span>
          </div>
        </div>
        <div className="w-full flex justify-end items-center p-4">
          <SimpleDialog data={order}>
            <Button variant={"destructive"}>Update</Button>
          </SimpleDialog>
        </div>
        {/* ORDER PRODUCTS */}
        <div className="bg-white mt-4 rounded-md">
          <AdminDataTable data={order.orderProducts} index={5} />
        </div>
      </div>
    </div>
  );
}
