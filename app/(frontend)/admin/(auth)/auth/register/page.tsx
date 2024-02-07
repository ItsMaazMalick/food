import { adminRegister } from "@/app/actions/admin/adminAuth";
import AdminRegisterForm from "@/components/forms/AdminRegisterForm";
import AdminAuthHeader from "@/components/header/AdminAuthHeader";
import { Card, CardContent } from "@/components/ui/card";
import { adminRegisterSchema } from "@/lib/validations/adminValidation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default function AdminRegisterPage() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const validatedFields = adminRegisterSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });
    if (!validatedFields.success) {
      revalidatePath("/admin/register");
      console.log("Inavlid");
    } else {
      const admin = await adminRegister(formData);
      console.log(admin);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm z-50">
        <AdminAuthHeader
          title="Register"
          description="Enter details below to register to your account"
        />
        <CardContent>
          <AdminRegisterForm />
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link
              className="underline text-blue-600 ml-1 font-bold"
              href="/admin/auth/login"
            >
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
