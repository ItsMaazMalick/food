"use client";
import { updateProduct } from "@/app/actions/product/product";
import TextInput from "@/components/Inputs/TextInput";
import FormSubmitButton from "@/components/button/FormSubmitButton";
import { Form } from "@/components/ui/form";
import { editProductSchema } from "@/lib/validations/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DisableInput from "../Inputs/DisableInput";
import ImageInput from "../Inputs/ImageInput";
import SelectInput from "../Inputs/SelectInput";
import SelectwithArray from "../Inputs/SelectwithArray";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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
  const [selectedExtras, setSelectedExtras] = useState<string[]>(
    product.extrasId || []
  );
  const [error, setError] = useState("");
  const [defCat, setDefCat] = useState(
    categories.find((cat: any) => cat.id === product.categoryId)?.name
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      categoryId: "",
      inStock: product.inStock,
      originalPrice: product.originalPrice,
      salePrice: product.salePrice,
      featured: product.featured,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError("");
    const formData = new FormData();
    formData.append("id", product.id);
    formData.append("name", values.name);
    formData.append("image", image);
    formData.append("imageUrl", product.image);
    formData.append("categoryId", values.categoryId);
    formData.append("inStock", String(values.inStock));
    formData.append("originalPrice", String(values.originalPrice));
    formData.append("salePrice", String(values.salePrice));
    formData.append("featured", values.featured);
    formData.append("extras", selectedExtras.join(","));
    // if (selectedExtras) {
    //   formData.append("extras", selectedExtras.join(","));
    // }
    const result = await updateProduct(formData);
    form.reset();
    form.reset();
    if (result) {
      setError(result?.message);
    }
  }

  const handleChange = (extraId: string) => {
    // Toggle the extra ID in the selected array
    setSelectedExtras((prevSelected) =>
      prevSelected.includes(extraId)
        ? prevSelected.filter((id) => id !== extraId)
        : [...prevSelected, extraId]
    );
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
              <div className="relative w-[100%] h-56 md:h-64 lg:h-40">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-center border-2 border-primary p-2 rounded-md"
                />
              </div>
            </div>
            <h3 className="text-xl font-bold text-primary">Extras</h3>
            <div className="flex items-center gap-2">
              {extras.map((extra: any, index: number) => (
                <div
                  key={extra.id}
                  className="flex items-center gap-1 rounded-md ring-[1px] p-1"
                >
                  <Input
                    onChange={() => handleChange(extra.id)}
                    defaultChecked={product.extrasId?.includes(extra.id)}
                    // checked={product.extrasId?.includes(extra.id)}
                    value={extra.id}
                    className="w-4 h-4 mr-1"
                    id={extra.id}
                    type="checkbox"
                  />
                  <Label className="mr-2">{extra.name}</Label>
                </div>
              ))}
            </div>
          </div>
          {error && (
            <div className="my-2 text-center text-destructive font-bold text-sm">
              {error}
            </div>
          )}
          <div className="mt-4">
            <FormSubmitButton
              title="Update"
              loading={form.formState.isSubmitting}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
