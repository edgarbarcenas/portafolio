"use client";

import {
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type FormEvent,
  type RefObject,
} from "react";
import { enviarMensaje } from "./actions";
import { initialContactFormState } from "./form-state";
import { hasErrors, validateContact, type ContactInput, type FieldErrors } from "./validation";

const FIELD_ORDER: ReadonlyArray<keyof ContactInput> = ["nombre", "correo", "mensaje"];

function readInput(form: HTMLFormElement): ContactInput {
  const data = new FormData(form);
  return {
    nombre: String(data.get("nombre") ?? ""),
    correo: String(data.get("correo") ?? ""),
    mensaje: String(data.get("mensaje") ?? ""),
  };
}

type FieldBaseProps = {
  id: string;
  name: keyof ContactInput;
  label: string;
  placeholder: string;
  error?: string;
  onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

// 530 wide, lime background, Epilogue Medium 20/27 black — the Figma text is
// the placeholder look; a real (visually hidden) label carries the a11y name.
// Focus: the field turns white with a 3px dark-purple bar at the bottom;
// errors: a 3px dark bar plus text. Flat, like the rest of the design.
// Both are proposals, not in Figma.
function TextField({
  id,
  name,
  label,
  placeholder,
  error,
  onBlur,
  type = "text",
  inputRef,
}: FieldBaseProps & { type?: "text" | "email"; inputRef: RefObject<HTMLInputElement | null> }) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-[8px]">
      <div
        className={`w-full bg-lila px-[30px] py-[21px] transition-[background-color,box-shadow] duration-150 focus-within:bg-white focus-within:shadow-[inset_0_-3px_0_var(--color-purpura-oscuro)] ${
          error ? "shadow-[inset_0_-3px_0_var(--color-on-surface)]" : ""
        }`}
      >
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <input
          ref={inputRef}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onBlur={onBlur}
          className="w-full bg-transparent outline-none focus-visible:outline-none font-sans text-[20px] font-medium leading-[27px] text-negro placeholder:text-negro"
        />
      </div>
      {error && (
        <p id={errorId} className="font-sans text-[16px] font-medium leading-[21px] text-white">
          {error}
        </p>
      )}
    </div>
  );
}

function TextAreaField({
  id,
  name,
  label,
  placeholder,
  error,
  onBlur,
  inputRef,
}: FieldBaseProps & { inputRef: RefObject<HTMLTextAreaElement | null> }) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-[8px]">
      <div
        className={`w-full bg-lila px-[30px] py-[21px] transition-[background-color,box-shadow] duration-150 focus-within:bg-white focus-within:shadow-[inset_0_-3px_0_var(--color-purpura-oscuro)] ${
          error ? "shadow-[inset_0_-3px_0_var(--color-on-surface)]" : ""
        }`}
      >
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <textarea
          ref={inputRef}
          id={id}
          name={name}
          rows={7}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onBlur={onBlur}
          className="w-full resize-none bg-transparent outline-none focus-visible:outline-none font-sans text-[20px] font-medium leading-[27px] text-negro placeholder:text-negro"
        />
      </div>
      {error && (
        <p id={errorId} className="font-sans text-[16px] font-medium leading-[21px] text-white">
          {error}
        </p>
      )}
    </div>
  );
}

// Client leaf of Contacto: calls the "use server" action directly, but
// validates the same rules locally first so invalid input never makes the
// round trip, and revalidates on blur once the user has tried to submit.
export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(enviarMensaje, initialContactFormState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const nombreRef = useRef<HTMLInputElement>(null);
  const correoRef = useRef<HTMLInputElement>(null);
  const mensajeRef = useRef<HTMLTextAreaElement>(null);
  const fieldRefs = { nombre: nombreRef, correo: correoRef, mensaje: mensajeRef };

  const nombreId = useId();
  const correoId = useId();
  const mensajeId = useId();
  const fieldIds = { nombre: nombreId, correo: correoId, mensaje: mensajeId };

  // Progressive-enhancement fallback: if the server ever returns "invalid"
  // (e.g. the action ran without the client check below having run first),
  // adjust local state from this new result during render — the documented
  // pattern for syncing state from a changed value without an effect.
  const [syncedState, setSyncedState] = useState(state);
  if (state !== syncedState) {
    setSyncedState(state);
    if (state.status === "invalid") {
      setErrors(state.errors);
      setSubmitted(true);
    }
  }

  // Clear the fields only once the server confirmed a real send.
  useEffect(() => {
    if (state.status === "sent") formRef.current?.reset();
  }, [state]);

  // Focusing is a genuine side effect (not state), so it stays in an effect.
  useEffect(() => {
    if (state.status !== "invalid") return;
    const first = FIELD_ORDER.find((name) => state.errors[name]);
    if (first) fieldRefs[first].current?.focus();
    // fieldRefs is a fresh object every render but its entries are stable refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const found = validateContact(readInput(event.currentTarget));
    setSubmitted(true);
    setErrors(found);
    if (hasErrors(found)) {
      event.preventDefault();
      const first = FIELD_ORDER.find((name) => found[name]);
      if (first) fieldRefs[first].current?.focus();
    }
  }

  function handleBlur() {
    if (!submitted || !formRef.current) return;
    setErrors(validateContact(readInput(formRef.current)));
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="flex w-full flex-col gap-[40px] xl:w-[530px]"
    >
      <div className="flex flex-col gap-[20px]">
        <TextField
          id={fieldIds.nombre}
          name="nombre"
          label="Nombre"
          placeholder="Nombre"
          error={errors.nombre}
          onBlur={handleBlur}
          inputRef={nombreRef}
        />
        <TextField
          id={fieldIds.correo}
          name="correo"
          type="email"
          label="Correo electrónico"
          placeholder="Correo electrónico"
          error={errors.correo}
          onBlur={handleBlur}
          inputRef={correoRef}
        />
        <TextAreaField
          id={fieldIds.mensaje}
          name="mensaje"
          label="Escribe tu mensaje aquí"
          placeholder="Escribe tu mensaje aquí"
          error={errors.mensaje}
          onBlur={handleBlur}
          inputRef={mensajeRef}
        />
      </div>
      <div className="flex flex-col gap-[14px] xl:w-[225px]">
        <button
          type="submit"
          aria-busy={isPending}
          disabled={isPending}
          className="w-full bg-negro px-[82px] py-[25px] font-sans text-[20px] font-semibold leading-[30px] text-white disabled:opacity-70"
        >
          {isPending ? "Enviando…" : "Enviar"}
        </button>
        <div role="status" aria-live="polite" className="font-sans text-[16px] font-medium leading-[21px] text-white">
          {"message" in state ? state.message : null}
        </div>
      </div>
    </form>
  );
}
