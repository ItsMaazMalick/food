import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

type TextInputProps = {
  label: string;
  control: any;
  name: string;
  type?: string;
  placeholder?: string;
};

export default function TextInput({
  label,
  control,
  name,
  type,
  placeholder,
}: TextInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type ? type : "text"}
              placeholder={placeholder ? placeholder : label}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
