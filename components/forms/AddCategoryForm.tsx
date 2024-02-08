"use client";
import { createCategory } from "@/app/actions/categories/categories";
import TextInput from "@/components/Inputs/TextInput";
import FormSubmitButton from "@/components/button/FormSubmitButton";
import { Form } from "@/components/ui/form";
import { categorySchema } from "@/lib/validations/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = categorySchema;

export default function AddCategoryForm() {
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError("");
    const formData = new FormData();
    formData.append("name", values.name);
    const result = await createCategory(formData);
    form.reset();
    if (result) {
      setError(result?.message);
    }
  }

  return (
    <div className="w-full grid grid-cols-1 p-2 bg-white rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            {/* <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <TextInput
              label="Category Name"
              name="name"
              control={form.control}
            />
          </div>
          {error && (
            <div className="my-2 text-center text-destructive font-bold text-sm">
              {error}
            </div>
          )}
          <FormSubmitButton title="Add" loading={form.formState.isSubmitting} />
        </form>
      </Form>
    </div>
  );
}
