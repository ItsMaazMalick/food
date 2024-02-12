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

const formSchema = productSchema;

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
  const [image, setImage] = useState<File | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<string[]>();
  const [error, setError] = useState("");
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
    formData.append("image", image as File);
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
              <TextInput label="Item Name" name="name" control={form.control} />
              {/* <DefaultValue data={extras} id={product.extras} /> */}
              <SelectInput
                label="Category"
                name="categoryId"
                control={form.control}
                items={categories}
              />
              <div>
                <div className="mb-2">
                  <Label htmlFor="image">Image</Label>
                </div>
                <Input
                  id="image"
                  accept="image/*"
                  type="file"
                  onChange={handleFile}
                />
              </div>
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
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a value" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Featured</SelectLabel>
                          <SelectItem value="FALSE">FALSE</SelectItem>
                          <SelectItem value="TRUE">TRUE</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                      <FormMessage />
                    </Select>
                  </FormItem>
                )}
              />
              <MultiSelectInput
                label="Extras"
                name="extras"
                data={extras}
                onSelectionChange={handleExtrasSelectionChange}
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
