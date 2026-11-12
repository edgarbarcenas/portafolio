"use server";

import type { ContactFormState } from "./form-state";
import { readMailConfig } from "./mail-config";
import { sendContactMessage } from "./send-message";
import { hasErrors, validateContact, type ContactInput } from "./validation";

function readInput(formData: FormData): ContactInput {
  return {
    nombre: String(formData.get("nombre") ?? ""),
    correo: String(formData.get("correo") ?? ""),
    mensaje: String(formData.get("mensaje") ?? ""),
  };
}

// Success is reported only after a real send. Without SMTP settings (see
// mail-config.ts) the honest answer is "unavailable".
export async function enviarMensaje(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const input = readInput(formData);
  const errors = validateContact(input);

  if (hasErrors(errors)) {
    return { status: "invalid", errors };
  }

  const config = readMailConfig();
  if (!config) {
    return {
      status: "unavailable",
      message: "El envío todavía no está disponible: falta configurar el destino del mensaje.",
    };
  }

  try {
    await sendContactMessage(config, input);
  } catch (error) {
    // Error name/code only: SMTP errors can echo account details.
    const code =
      error instanceof Error
        ? `${error.name}${"code" in error ? ` ${String(error.code)}` : ""}`
        : "unknown";
    console.error(`contacto: el envío falló (${code})`);
    return {
      status: "error",
      message: "No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.",
    };
  }

  return { status: "sent", message: "Mensaje enviado. Te responderé pronto." };
}
