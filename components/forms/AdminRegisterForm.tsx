"use client";
import { adminRegister } from "@/app/actions/admin/adminAuth";
import TextInput from "@/components/Inputs/TextInput";
import FormSubmitButton from "@/components/button/FormSubmitButton";
import { Form } from "@/components/ui/form";
import { adminRegisterSchema } from "@/lib/validations/adminValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = adminRegisterSchema;

export default function AdminRegisterForm() {
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("confirmPassword", values.confirmPassword);
    const result = await adminRegister(formData);
    if (result && !result.success) {
      setError(result.message);
    }
  }
  return (
    <>
      {error && (
        <div className="w-full mx-auto text-center text-destructive text-xs font-bold">
          <span>{error}</span>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <TextInput label="Name" name="name" control={form.control} />
            <TextInput
              label="Email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              control={form.control}
            />
            <TextInput
              label="Password"
              name="password"
              type="password"
              placeholder="******"
              control={form.control}
            />
            <TextInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="******"
              control={form.control}
            />
            <Link className="ml-auto inline-block text-sm underline" href="#">
              Forgot your password?
            </Link>
            <FormSubmitButton
              title="Register"
              loading={form.formState.isSubmitting}
            />
          </div>
        </form>
      </Form>
    </>
  );
}
