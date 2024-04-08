import { updateAdminStatus } from "@/app/actions/admin/adminStatus";
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
import prisma from "@/lib/db";

export function AdminAction({
  children,
  data,
}: {
  children: React.ReactNode;
  data: any;
}) {
  async function handleSubmit(formData: FormData) {
    // "use server";
    // const formData = new FormData();
    // formData.append("isAdmin", e.target.value);
    formData.append("id", data.id);
    await updateAdminStatus(formData);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Admin Status</DialogTitle>
          <DialogDescription>Name : {data.name}</DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="w-full">
          <div className="my-2">
            <Label htmlFor="name" className="text-start">
              Status
            </Label>
            <select name="isAdmin" className="w-full p-2 rounded-md border">
              <option value={"pending"}>pending</option>
              <option value={"verified"}>verified</option>
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
