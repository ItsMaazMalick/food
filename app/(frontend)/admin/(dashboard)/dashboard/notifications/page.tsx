import {
  addNotification,
  deleteNotification,
  getAllNotifications,
} from "@/app/actions/notifications/notifications";
import FormSubmitButton from "@/components/button/FormSubmitButton";
import AddNotificationForm from "@/components/forms/AddNotificationForm";
import TopContainer from "@/components/header/TopContainer";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Salad } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function Notifications() {
  //   await addNotification("This is nine notification");
  const notifications = await getAllNotifications();

  const handleDelete = async (id: string) => {
    "use server";
    const result = await deleteNotification(id);
  };

  return (
    <div className="w-full">
      <TopContainer
        title="Notifications"
        link={<Salad size={35} className="p-1 bg-white rounded-md" />}
      />
      {/* ADD NOTIFICATION */}
      <div className="mb-6">
        <AddNotificationForm />
      </div>
      {/* ALL NOTIFICATIONS */}
      <div className="w-full p-2 bg-white rounded-md">
        <h3 className="text-xl font-bold text-primary mb-4">Notifications</h3>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-2 ring-primary  ring-1 m-2 flex justify-between items-center rounded-md"
          >
            <div>{notification.text}</div>
            <form
              action={async () => {
                "use server";
                handleDelete(notification.id);
                redirect("/admin/dashboard/notifications");
              }}
            >
              <FormSubmitButton size={"xs"} title="Delete" />
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
