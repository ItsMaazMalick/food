"use client";
import { createCategory } from "@/app/actions/categories/categories";
import TextInput from "@/components/Inputs/TextInput";
import FormSubmitButton from "@/components/button/FormSubmitButton";
import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ImageInput from "../Inputs/ImageInput";
import { createCategorySchema } from "@/lib/validations/categorySchema";

const formSchema = createCategorySchema;

export default function AddCategoryForm() {
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError("");
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image as File);
    const result = await createCategory(formData);
    // setImage("");
    form.reset();
    if (result) {
      setError(result?.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col w-full gap-4 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <TextInput
              label="Category Name"
              name="name"
              control={form.control}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <ImageInput label="Image" name="image" control={form.control} />
          </div>
        </div>
        {error && (
          <div className="my-2 text-center text-destructive font-bold text-sm">
            {error}
          </div>
        )}
        <div>
          <FormSubmitButton title="Add" loading={form.formState.isSubmitting} />
        </div>
      </form>
    </Form>
  );
}
