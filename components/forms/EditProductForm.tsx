"use client";
import { createProduct } from "@/app/actions/product/product";
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
import {
  editProductSchema,
  productSchema,
} from "@/lib/validations/productSchema";
import UploadButtonComponent from "@/utils/UploadButtonComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import MultiSelectInput from "../Inputs/MultiSelectInput";
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
import Image from "next/image";
import ImageInput from "../Inputs/ImageInput";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import DisableInput from "../Inputs/DisableInput";
import SelectwithArray from "../Inputs/SelectwithArray";
import DefaultValue from "../Inputs/DefaultValue";

const formSchema = editProductSchema;

type PageProps = {
  categories: any;
  extras: any;
  product: any;
};

export default function EditProductForm({
  categories,
  extras,
  product,
}: PageProps) {
  const [image, setImage] = useState("");
  const [selectedExtras, setSelectedExtras] = useState<string[]>();
  const [error, setError] = useState("");
  const [defCat, setDefCat] = useState(
    categories.find((cat: any) => cat.id === product.categoryId)?.name
  );

  useEffect(() => {
    alert("Note: Please add extras from scratch");
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      categoryId: "123",
      inStock: product.inStock,
      originalPrice: product.originalPrice,
      salePrice: product.salePrice,
      featured: product.featured,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(selectedExtras);
    setError("");
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", image);
    formData.append("categoryId", values.categoryId);
    formData.append("inStock", String(values.inStock));
    formData.append("originalPrice", String(values.originalPrice));
    formData.append("salePrice", String(values.salePrice));
    formData.append("featured", values.featured);
    formData.append("extras", selectedExtras ? selectedExtras.join(",") : "");
    // if (selectedExtras) {
    //   formData.append("extras", selectedExtras.join(","));
    // }
    const result = await createProduct(formData);
    form.reset();
    form.reset();
    if (result) {
      setError(result?.message);
    }
  }

  const handleExtrasSelectionChange = (selectedIds: string[]) => {
    setSelectedExtras(selectedIds);
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2 bg-white rounded-md gap-4">
              <TextInput label="Item Name" name="name" control={form.control} />
              {/* <DefaultValue data={extras} id={product.extras} /> */}
              <div>
                <DisableInput label="Category" placeholder={defCat} />
              </div>
              <SelectInput
                label="Category"
                name="categoryId"
                control={form.control}
                items={categories}
              />
              <ImageInput label="Image" name="image" control={form.control} />
              <TextInput
                label="In Stock"
                name="inStock"
                type="number"
                control={form.control}
              />
              <TextInput
                label="Original Price"
                name="originalPrice"
                type="number"
                control={form.control}
              />
              <TextInput
                label="Sale Price"
                name="salePrice"
                type="number"
                control={form.control}
              />
              <DisableInput
                label="Featured"
                placeholder={product.featured ? "TRUE" : "FALSE"}
              />
              <DisableInput
                label="Recommended"
                placeholder={product.isRecommended ? "YES" : "NO"}
              />
              <DefaultValue data={extras} />
              <SelectwithArray
                label="Featured"
                name="featured"
                control={form.control}
                items={["FALSE", "TRUE"]}
              />
              <SelectwithArray
                label="Recommended"
                name="isRecommended"
                control={form.control}
                items={["FALSE", "TRUE"]}
              />
              <MultiSelectInput
                label="Extras"
                name="extras"
                data={extras}
                onSelectionChange={handleExtrasSelectionChange}
                description="Note: Please add extras from scratch"
              />
              <div className="relative w-[100%] h-56 md:h-64 lg:h-40">
                <Image
                  src={product.image}
                  alt={product.name}
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
