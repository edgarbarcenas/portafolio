"use client";

import {
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import TextField from "@/components/molecules/TextField";
import TextAreaField from "@/components/molecules/TextAreaField";
import { enviarMensaje } from "@/lib/contacto/actions";
import { initialContactFormState } from "@/lib/contacto/form-state";
import { hasErrors, validateContact, type ContactInput, type FieldErrors } from "@/lib/contacto/validation";

const FIELD_ORDER: ReadonlyArray<keyof ContactInput> = ["nombre", "correo", "mensaje"];

function readInput(form: HTMLFormElement): ContactInput {
  const data = new FormData(form);
  return {
    nombre: String(data.get("nombre") ?? ""),
    correo: String(data.get("correo") ?? ""),
    mensaje: String(data.get("mensaje") ?? ""),
  };
}

function focusFirstInvalid(form: HTMLFormElement | null, errors: FieldErrors) {
  const first = FIELD_ORDER.find((name) => errors[name]);
  const field = first ? form?.elements.namedItem(first) : null;
  if (field instanceof HTMLElement) field.focus();
}

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(enviarMensaje, initialContactFormState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

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

  useEffect(() => {
    if (state.status === "sent") formRef.current?.reset();
  }, [state]);

  useEffect(() => {
    if (state.status !== "invalid") return;
    focusFirstInvalid(formRef.current, state.errors);
  }, [state]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const found = validateContact(readInput(event.currentTarget));
    setSubmitted(true);
    setErrors(found);
    if (hasErrors(found)) {
      event.preventDefault();
      focusFirstInvalid(event.currentTarget, found);
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
        />
        <TextField
          id={fieldIds.correo}
          name="correo"
          type="email"
          label="Correo electrónico"
          placeholder="Correo electrónico"
          error={errors.correo}
          onBlur={handleBlur}
        />
        <TextAreaField
          id={fieldIds.mensaje}
          name="mensaje"
          label="Escribe tu mensaje aquí"
          placeholder="Escribe tu mensaje aquí"
          error={errors.mensaje}
          onBlur={handleBlur}
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
