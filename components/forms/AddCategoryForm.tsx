"use client";
import { createCategory } from "@/app/actions/categories/categories";
import TextInput from "@/components/Inputs/TextInput";
import FormSubmitButton from "@/components/button/FormSubmitButton";
import { Form } from "@/components/ui/form";
import { categorySchema } from "@/lib/validations/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Link from "next/link";
import { UploadButton } from "@/utils/uploadthing";

const formSchema = categorySchema;

export default function AddCategoryForm() {
  const [image, setImage] = useState("");
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
    formData.append("image", image);
    const result = await createCategory(formData);
    setImage("");
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
          {image ? (
            <Link
              href={image}
              target="_blank"
              className="text-secondary-foreground bg-secondary w-full lg:w-[50%] rounded-md h-10 mt-8 flex justify-center items-center"
            >
              File Uploaded
            </Link>
          ) : (
            <div className="text-black bg-primary w-full lg:w-1/2 rounded-md h-10 flex justify-center items-center mt-8">
              <UploadButton
                className="mt-4"
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
          )}
        </div>
        {error && (
          <div className="my-2 text-center text-destructive font-bold text-sm">
            {error}
          </div>
        )}
        <div className="mt-4">
          <FormSubmitButton title="Add" loading={form.formState.isSubmitting} />
        </div>
      </form>
    </Form>
  );
}
