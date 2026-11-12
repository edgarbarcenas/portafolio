import type { FocusEvent } from "react";
import type { ContactInput } from "@/lib/contacto/validation";

// Props shared by the contact form fields (TextField, TextAreaField).
export type FieldBaseProps = {
  id: string;
  name: keyof ContactInput;
  label: string;
  placeholder: string;
  error?: string;
  onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};
