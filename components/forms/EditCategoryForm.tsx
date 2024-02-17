"use client";
import {
  createCategory,
  updateCategory,
} from "@/app/actions/categories/categories";
import TextInput from "@/components/Inputs/TextInput";
import FormSubmitButton from "@/components/button/FormSubmitButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { categorySchema } from "@/lib/validations/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Image from "next/image";
import Link from "next/link";
import { UploadButton } from "@/utils/uploadthing";

const formSchema = categorySchema;

export default function EditCategoryForm({ category }: any) {
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category.name,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError("");
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("categoryId", category.id);
    formData.append("image", image);
    formData.append("imageUrl", category.image);

    const result = await updateCategory(formData);
    setImage("");
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <div className="col-span-3 relative w-[100%] h-56 md:h-64 lg:h-40">
              <Image
                src={category.image}
                alt={category.name}
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
