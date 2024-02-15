"use client";
import { createCategory } from "@/app/actions/categories/categories";
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
import { string, z } from "zod";
import { Input } from "../ui/input";
import SelectInput from "../Inputs/SelectInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import MultiSelectInput from "../Inputs/MultiSelectInput";
import DefaultValue from "../Inputs/DefaultValue";
import { createProduct } from "@/app/actions/product/product";
import { productSchema } from "@/lib/validations/itemValidation";
import { adminRegisterSchema } from "@/lib/validations/adminValidation";
import Image from "next/image";
import { updateAdmin } from "@/app/actions/admin/adminAuth";

const emailRegex = /^[^\s@]+@gmail.com$/;

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().refine((value) => emailRegex.test(value), {
    message: "Invalid email address",
  }),
});

type PageProps = {
  admin: any;
};

export default function EditProfileForm({ admin }: PageProps) {
  const [image, setImage] = useState<File | null>(null);
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
    formData.append("image", image as File);
    formData.append("imageUrl", admin.image);
    formData.append("id", admin.id);

    // if (selectedExtras) {
    //   formData.append("extras", selectedExtras.join(","));
    // }
    const result = await updateAdmin(formData);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2 bg-white rounded-md gap-4">
              <TextInput label="Name" name="name" control={form.control} />
              <div className="">
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
          <FormSubmitButton
            title="Update"
            loading={form.formState.isSubmitting}
          />
        </form>
      </Form>
    </div>
  );
}
