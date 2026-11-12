// Shared between the client form (immediate feedback) and the server action
// (source of truth): both call the same pure function so the rules never
// drift apart. Spanish copy because the whole site is in Spanish.

export type ContactInput = {
  nombre: string;
  correo: string;
  mensaje: string;
};

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: ContactInput): FieldErrors {
  const errors: FieldErrors = {};

  const nombre = input.nombre.trim();
  if (!nombre) {
    errors.nombre = "El nombre es obligatorio.";
  } else if (nombre.length < 2 || nombre.length > 80) {
    errors.nombre = "El nombre debe tener entre 2 y 80 caracteres.";
  }

  const correo = input.correo.trim();
  if (!correo) {
    errors.correo = "El correo electrónico es obligatorio.";
  } else if (!EMAIL_RE.test(correo)) {
    errors.correo = "Ingresa un correo electrónico válido.";
  }

  const mensaje = input.mensaje.trim();
  if (!mensaje) {
    errors.mensaje = "El mensaje es obligatorio.";
  } else if (mensaje.length < 10 || mensaje.length > 2000) {
    errors.mensaje = "El mensaje debe tener entre 10 y 2000 caracteres.";
  }

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
