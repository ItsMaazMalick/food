import { getAdmin } from "@/app/actions/admin/adminAuth";
import BackButton from "@/components/button/BackButton";
import EditProfileForm from "@/components/forms/EditProfileForm";
import TopContainer from "@/components/header/TopContainer";
import { cookies } from "next/headers";

export default async function EditProfile() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("auth-token")?.value;
  const admin = await getAdmin(userCookie || "");

  return (
    <div>
      <TopContainer title="Edit Profile" link={<BackButton />} />
      <div className="mt-2">
        <EditProfileForm admin={admin} />
      </div>
    </div>
  );
}
