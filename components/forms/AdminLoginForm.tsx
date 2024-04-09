"use client";
import { adminLogin } from "@/app/actions/admin/adminAuth";
import TextInput from "@/components/Inputs/TextInput";
import FormSubmitButton from "@/components/button/FormSubmitButton";
import { Form } from "@/components/ui/form";
import { adminLoginSchema } from "@/lib/validations/adminValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

const formSchema = adminLoginSchema;

export default function AdminLoginForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSuccess("");
    setError("");
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    try {
      const result = await adminLogin(formData);
      form.reset();
      if (result && !result.success) {
        setSuccess("");
        setError(result.message);
      } else {
        setError("");
        setSuccess("Redirecting to dashboard...");
      }
    } catch (error) {
      form.reset();
      setSuccess("");
      setError("Internal server error");
    }
  }
  return (
    <>
      {error && (
        <div className="w-full mx-auto text-center text-destructive text-xs font-bold">
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="w-full mx-auto text-center text-green-600 text-xs font-bold">
          <span>{success}</span>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <TextInput
              label="Email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              autoFocus
              control={form.control}
            />
            <TextInput
              label="Password"
              name="password"
              type="password"
              placeholder="******"
              control={form.control}
            />
            <Link className="ml-auto inline-block text-sm underline" href="#">
              Forgot your password?
            </Link>
            <FormSubmitButton
              title="Login"
              loading={form.formState.isSubmitting || (success ? true : false)}
            />
          </div>
        </form>
      </Form>
    </>
  );
}
