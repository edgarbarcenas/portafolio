import type { FieldErrors } from "./validation";

// Lives outside actions.ts: every export of a "use server" module becomes a
// server-function reference, so plain values and types cannot live there.
export type ContactFormState =
  | { status: "idle" }
  | { status: "invalid"; errors: FieldErrors }
  | { status: "unavailable"; message: string }
  | { status: "error"; message: string }
  | { status: "sent"; message: string };

export const initialContactFormState: ContactFormState = { status: "idle" };
