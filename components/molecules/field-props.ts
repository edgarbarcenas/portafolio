import type { FocusEvent } from "react";
import type { ContactInput } from "@/lib/contacto/validation";

export type FieldBaseProps = {
  id: string;
  name: keyof ContactInput;
  label: string;
  placeholder: string;
  error?: string;
  onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};
