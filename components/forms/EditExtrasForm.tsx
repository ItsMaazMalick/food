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

const formSchema = extrasSchema;

export default function EditExtrasForm({ extras }: any) {
  const [image, setImage] = useState<File | null>(null);
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
    formData.append("image", image as File);
    formData.append("imageUrl", extras.image);

    setImage(null);
    const result = await updateExtras(formData);
    form.reset();
    if (result) {
      setError(result?.message);
    }
  }

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

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
              <div className="col-span-3">
                <div className="mb-2">
                  <Label htmlFor="image">New Image</Label>
                </div>
                <div className="col-span-3">
                  <Input
                    id="image"
                    accept="image/*"
                    type="file"
                    onChange={handleFile}
                  />
                </div>
              </div>
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
