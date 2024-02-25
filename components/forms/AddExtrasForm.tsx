"use client";
import { createCategory } from "@/app/actions/categories/categories";
import TextInput from "@/components/Inputs/TextInput";
import FormSubmitButton from "@/components/button/FormSubmitButton";
import { Form } from "@/components/ui/form";
import { categorySchema } from "@/lib/validations/categorySchema";
import { extrasSchema } from "@/lib/validations/extrasSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { createExtras } from "@/app/actions/extras/extras";
import Link from "next/link";
import { UploadButton } from "@/utils/uploadthing";
import UploadButtonComponent from "@/utils/UploadButtonComponent";
import ImageInput from "../Inputs/ImageInput";

const formSchema = extrasSchema;

export default function AddExtrasForm() {
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: undefined,
      price: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError("");
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image as File);
    formData.append("price", String(values.price));

    const result = await createExtras(formData);
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
              <TextInput label="Item Name" name="name" control={form.control} />
              <ImageInput label="Image" name="image" control={form.control} />
              <TextInput
                label="Price"
                name="price"
                type="number"
                control={form.control}
              />
            </div>
          </div>
          {error && (
            <div className="my-2 text-center text-destructive font-bold text-sm">
              {error}
            </div>
          )}
          <div className="mt-4">
            <FormSubmitButton
              title="Add"
              loading={form.formState.isSubmitting}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
