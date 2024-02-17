"use client";
import { createCategory } from "@/app/actions/categories/categories";
import TextInput from "@/components/Inputs/TextInput";
import FormSubmitButton from "@/components/button/FormSubmitButton";
import { Form } from "@/components/ui/form";
import { categorySchema } from "@/lib/validations/categorySchema";
import { extrasSchema } from "@/lib/validations/extrasValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { createExtras, updateExtras } from "@/app/actions/extras/extras";
import Image from "next/image";
import Link from "next/link";
import { UploadButton } from "@/utils/uploadthing";

const formSchema = extrasSchema;

export default function EditExtrasForm({ extras }: any) {
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: extras.name,
      price: extras.price,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError("");
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", String(values.price));
    formData.append("id", extras.id);
    formData.append("image", image);
    formData.append("imageUrl", extras.image);

    const result = await updateExtras(formData);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 p-2 bg-white rounded-md gap-4">
              <div className="col-span-3">
                <TextInput
                  label="Item Name"
                  name="name"
                  control={form.control}
                />
              </div>
              {image ? (
                <Link
                  href={image}
                  target="_blank"
                  className="text-secondary-foreground bg-secondary w-full lg:w-[50%] rounded-md h-10 mt-8 flex justify-center items-center"
                >
                  File Uploaded
                </Link>
              ) : (
                <div className="w-full">
                  <div className="text-black bg-primary rounded-md h-10 flex justify-center items-center mt-8">
                    <UploadButton
                      className="mt-4 text-xs"
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        setImage(res[0].url);
                      }}
                      onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                        setImage("");
                      }}
                    />
                  </div>
                </div>
              )}
              <div className="col-span-3">
                <TextInput
                  label="Price"
                  name="price"
                  type="number"
                  control={form.control}
                />
              </div>
              <div className="col-span-3 relative w-[100%] h-56 md:h-64 lg:h-40">
                <Image
                  src={extras.image}
                  alt={extras.name}
                  fill
                  className="object-center border-2 border-primary p-2 rounded-md"
                />
              </div>
            </div>
          </div>
          {error && (
            <div className="my-2 text-center text-destructive font-bold text-sm">
              {error}
            </div>
          )}
          <FormSubmitButton
            title="Update"
            loading={form.formState.isSubmitting}
          />
        </form>
      </Form>
    </div>
  );
}
