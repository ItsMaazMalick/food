"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type PageProps = {
  title: string;
  loading?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  size?: "default" | "xs" | "sm" | "lg" | "icon" | null | undefined;
  disabled?: boolean;
};

export default function FormSubmitButton({
  title,
  loading,
  variant,
  size,
  disabled,
}: PageProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      className="w-full"
      variant={variant ? variant : "default"}
      type="submit"
      aria-disabled={pending || loading}
      size={size}
      disabled={disabled || pending || loading}
    >
      {!disabled && (pending || loading) && (
        <Loader2 size={18} className="animate-spin mr-1" />
      )}
      {title}
    </Button>
  );
}
