"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export default function FormSubmitButton({
  title,
  loading,
}: {
  title: string;
  loading: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      className="w-full"
      type="submit"
      aria-disabled={pending || loading}
      disabled={pending || loading}
    >
      {(pending || loading) && (
        <Loader2 size={18} className="animate-spin mr-1" />
      )}
      {title}
    </Button>
  );
}
