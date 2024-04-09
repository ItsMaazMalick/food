import { cookies } from "next/headers";
import FormSubmitButton from "../button/FormSubmitButton";
import { redirect } from "next/navigation";

export default function SuperAdminLogoutForm() {
  const handleLogout = async () => {
    "use server";
    cookies()?.set("super-admin-token", "", { expires: new Date(0) });
    cookies()?.set("super-admin", "", { expires: new Date(0) });
    redirect("/super-admin/auth/login");
  };
  return (
    <form action={handleLogout}>
      <FormSubmitButton variant={"destructive"} title="Sign Out" />
    </form>
  );
}
