"use client";
import { updateAdmin } from "@/app/actions/admin/adminAuth";
import TextInput from "@/components/Inputs/TextInput";
import FormSubmitButton from "@/components/button/FormSubmitButton";
import { Form } from "@/components/ui/form";
import UploadButtonComponent from "@/utils/UploadButtonComponent";
import { UploadButton } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type PageProps = {
  admin: any;
};

export default function EditProfileForm({ admin }: PageProps) {
  const [image, setImage] = useState("");
  const [selectedExtras, setSelectedExtras] = useState<string[]>();
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: admin.name,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError("");
    const formData = new FormData();
    formData.append("name", values.name);
    // formData.append("email", values.email);
    formData.append("image", image as string);
    formData.append("imageUrl", admin.image);
    formData.append("id", admin.id);

    // if (selectedExtras) {
    //   formData.append("extras", selectedExtras.join(","));
    // }
    const result = await updateAdmin(formData);
    setImage("");
    form.reset();
    if (result) {
      setError(result?.message);
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2 bg-white rounded-md gap-4">
              <TextInput label="Name" name="name" control={form.control} />
              <div className="mt-8">
                <UploadButtonComponent image={image} setImage={setImage} />
              </div>
              {admin.image && (
                <div className="relative h-48">
                  <Image
                    src={admin.image}
                    alt={admin.name}
                    fill
                    className="object-center border-2 border-primary p-2 rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
          {error && (
            <div className="my-2 text-center text-destructive font-bold text-sm">
              {error}
            </div>
          )}
          <div className="mt-4">
            <FormSubmitButton
              title="Update"
              loading={form.formState.isSubmitting}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
