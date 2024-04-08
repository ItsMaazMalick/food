import { updateOrder } from "@/app/actions/orders/orders";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export async function SimpleDialog({
  children,
  data,
}: {
  children: React.ReactNode;
  data: any;
}) {
  async function handleSubmit(formData: FormData) {
    "use server";
    formData.append("id", data.id);
    formData.append("userId", data.userId);
    await updateOrder(formData);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Order</DialogTitle>
          <DialogDescription>Name : {data.name}</DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="w-full">
          <div className="my-2">
            <Label htmlFor="name" className="text-start">
              Order Type
            </Label>
            <select name="orderType" className="w-full p-2 rounded-md border">
              <option className="w-full p-2 " value={data.orderType}>
                {data.orderType}
              </option>
              {data.orderType !== "pickup" && (
                <option value={"pickup"}>pickup</option>
              )}
              {data.orderType !== "dinning" && (
                <option value={"dinning"}>dinning</option>
              )}
              {data.orderType !== "delivery" && (
                <option value={"delivery"}>delivery</option>
              )}
            </select>
          </div>
          <div className="my-2">
            <Label htmlFor="name" className="text-start">
              Order Status
            </Label>
            <select name="orderStatus" className="w-full p-2 rounded-md border">
              <option
                defaultChecked={true}
                className="w-full p-2 "
                value={data.orderStatus}
              >
                {data.orderStatus}
              </option>
              {data.orderStatus !== "pending" &&
                data.orderStatus !== "completed" && (
                  <option value={"pending"}>pending</option>
                )}
              {data.orderStatus !== "preparing" &&
                data.orderStatus !== "completed" && (
                  <option value={"preparing"}>preparing</option>
                )}
              {data.orderStatus !== "ready" &&
                data.orderStatus !== "completed" && (
                  <option value={"ready"}>ready</option>
                )}
              {data.orderStatus !== "completed" && (
                <option value={"completed"}>completed</option>
              )}
            </select>
          </div>
          <div className="my-2">
            <Label htmlFor="name" className="text-start">
              Payment Status
            </Label>
            <select name="isPaid" className="w-full p-2 rounded-md border">
              <option
                defaultChecked={true}
                className="w-full p-2"
                value={data.isPaid ? "paid" : "pending"}
              >
                {data.isPaid ? "paid" : "pending"}
              </option>
              {!data.isPaid && <option value={"paid"}>paid</option>}
            </select>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
