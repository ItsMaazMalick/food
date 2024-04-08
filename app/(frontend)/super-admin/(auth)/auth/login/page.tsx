import AdminLoginForm from "@/components/forms/AdminLoginForm";
import SuperAdminLoginForm from "@/components/forms/SuperAdminLoginForm";
import AdminAuthHeader from "@/components/header/AdminAuthHeader";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm z-50">
        <AdminAuthHeader
          title="Login"
          description="Enter your email below to login to your account"
        />
        <CardContent>
          <SuperAdminLoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
