"use server";
import { getOrderPoints, getReferralPoints } from "@/app/actions/points/points";
import TopCard from "@/components/cards/TopCard";
import AddOrderPointsForm from "@/components/forms/AddOrderPointsForm";
import AddReferralPointsForm from "@/components/forms/AddReferralPointsForm";
import TopContainer from "@/components/header/TopContainer";
import { Boxes, Salad } from "lucide-react";

export default async function PointsPage() {
  const orderPoints = await getOrderPoints();
  const referralPoints = await getReferralPoints();

  return (
    <div className="w-full">
      <TopContainer
        title="Points"
        link={<Salad size={35} className="p-1 bg-white rounded-md" />}
      />
      <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <TopCard
          title="Order Points"
          icon={<Boxes />}
          length={orderPoints?.points || 0}
        />
        <TopCard
          title="Referral Points"
          icon={<Boxes />}
          length={referralPoints?.points || 0}
        />
      </div>
      <div>
        <AddOrderPointsForm />
        <AddReferralPointsForm />
      </div>
    </div>
  );
}
