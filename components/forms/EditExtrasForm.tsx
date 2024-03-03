"use client";
import { updateExtras } from "@/app/actions/extras/extras";
import TextInput from "@/components/Inputs/TextInput";
import FormSubmitButton from "@/components/button/FormSubmitButton";
import { Form } from "@/components/ui/form";
import { editExtrasSchema, extrasSchema } from "@/lib/validations/extrasSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ImageInput from "../Inputs/ImageInput";
import UploadButtonComponent from "@/utils/UploadButtonComponent";

const formSchema = editExtrasSchema;

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
    if (
      extras.name === values.name &&
      extras.price === values.price &&
      !image
    ) {
      setError("Nothing changed");
    } else {
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
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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

            <div className="relative w-[100%] h-56 md:h-64 lg:h-40">
              <Image
                src={extras.image}
                alt={extras.name}
                fill
                className="object-center border-2 border-primary p-2 rounded-md"
              />
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
