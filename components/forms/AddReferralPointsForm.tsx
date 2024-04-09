"use client";
import { addNotification } from "@/app/actions/notifications/notifications";
import { addOrderPoints, addReferralPoints } from "@/app/actions/points/points";
import TextInput from "@/components/Inputs/TextInput";
import FormSubmitButton from "@/components/button/FormSubmitButton";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  points: z.string().min(1, "Notification is required"),
});

export default function AddReferralPointsForm() {
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      points: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError("");
    // const formData = new FormData();
    // formData.append("name", values.name);
    // formData.append("image", image);
    const result = await addReferralPoints(Number(values.points));
    form.reset();
    if (result) {
      setError(result?.message);
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-4">
          <div className="flex flex-col md:flex-row items-center md:gap-4">
            <div className="w-full md:w-[80%]">
              <TextInput
                label="Add Referral Points"
                type="number"
                name="points"
                control={form.control}
              />
            </div>

            <div className="w-full md:w-[20%] mt-8">
              <FormSubmitButton
                title="Add"
                loading={form.formState.isSubmitting}
              />
            </div>
          </div>
          {error && (
            <div className="w-full mx-auto text-center text-destructive text-xs font-bold">
              <span>{error}</span>
            </div>
          )}
        </form>
      </Form>
    </>
  );
}
