"use client";
import { adminRegister, getAdminByEmail } from "@/app/actions/admin/adminAuth";
import TextInput from "@/components/Inputs/TextInput";
import FormSubmitButton from "@/components/button/FormSubmitButton";
import { Form } from "@/components/ui/form";
import { adminRegisterSchema } from "@/lib/validations/adminValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import OtpInput from "../otpComponent/OtpInput";
import { Label } from "../ui/label";
import { CardDescription } from "../ui/card";
import { sendOTP } from "@/utils/sendOTP";

const formSchema = adminRegisterSchema;

export default function AdminRegisterForm() {
  const [isOtp, setIsOtp] = useState(false);
  const [serverOtp, setServerOtp] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function registerAdmin() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    const result = await adminRegister(formData);
    form.reset();
    if (result && !result.success) {
      setError(result.message);
    }
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const admin = await getAdminByEmail(values.email);
    if (admin) {
      setError("User already exists");
    } else {
      setName(values.name);
      setEmail(values.email);
      setPassword(values.password);
      setConfirmPassword(values.confirmPassword);
      const res = await sendOTP({ name: values.name, email: values.email });
      if (!res.success) {
        setIsOtp(false);
        setError(res.message || "");
      } else {
        setServerOtp(res.OTP || "");
        setError("");
        setIsOtp(true);
      }
    }
  }

  const handleOTP = (value: string) => {
    if (value != serverOtp) {
      setError("Invalid OTP");
    }
    if (value === serverOtp) {
      registerAdmin();
    }
  };

  return (
    <>
      {error && (
        <div className="w-full mx-auto text-center text-destructive text-xs font-bold">
          <span>{error}</span>
        </div>
      )}
      {isOtp ? (
        <div className="w-full">
          <CardDescription className="my-4">
            Please enter One-Time-Verification code sent to
            <span className="block mx-auto text-center text-xs font-bold">
              {email.substring(0, 3)}********@{email.split("@")[1]}
            </span>
          </CardDescription>
          <OtpInput handleOTP={handleOTP} />
        </div>
      ) : (
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
      )}
    </>
  );
}
