"use client";
import { createExtras } from "@/app/actions/extras/extras";
import TextInput from "@/components/Inputs/TextInput";
import FormSubmitButton from "@/components/button/FormSubmitButton";
import { Form } from "@/components/ui/form";
import { extrasSchema } from "@/lib/validations/extrasSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ImageInput from "../Inputs/ImageInput";
import UploadButtonComponent from "@/utils/UploadButtonComponent";

const formSchema = extrasSchema;

export default function AddExtrasForm() {
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError("");
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", image);
    formData.append("price", String(values.price));

    const result = await createExtras(formData);
    form.reset();
    setImage("");
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
              {/* <ImageInput label="Image" name="image" control={form.control} /> */}
              <div className="mt-8">
                <UploadButtonComponent image={image} setImage={setImage} />
              </div>
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
              disabled={!image}
              loading={form.formState.isSubmitting}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
