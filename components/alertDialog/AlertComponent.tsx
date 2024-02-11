import { deleteCategory } from "@/app/actions/categories/categories";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import FormSubmitButton from "../button/FormSubmitButton";
import { deleteItem } from "@/app/actions/items/items";
import { deleteExtras } from "@/app/actions/extras/extras";

export default function AlertComponent({
  id,
  path,
  target,
}: {
  id: string;
  path: string;
  target: string;
}) {
  const formAction = async () => {
    if (target === "category") {
      deleteCategory({
        id,
        path,
      });
    } else if (target === "item") {
      deleteItem({ id, path });
    } else if (target === "extras") {
      deleteExtras({ id, path });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} size={"xs"}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <form action={formAction}>
              <FormSubmitButton variant={"destructive"} title="Delete" />
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
