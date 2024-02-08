import { cookies } from "next/headers";
import FormSubmitButton from "../button/FormSubmitButton";
import { redirect } from "next/navigation";

export default function AdminLogoutForm() {
  const handleLogout = async () => {
    "use server";
    cookies()?.set("auth-token", "", { expires: new Date(0) });
    redirect("/admin/auth/login");
  };
  return (
    <div className="p-2 flex items-center gap-2">
      <form action={handleLogout}>
        <FormSubmitButton variant={"destructive"} title="Sign Out" />
      </form>
    </div>
  );
}