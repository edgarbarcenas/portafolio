import nodemailer from "nodemailer";
import type { MailConfig } from "./mail-config";
import type { ContactInput } from "./validation";

// The only place that talks to SMTP. Resolves when the server accepted the
// message; throws otherwise. The visitor's address goes in Reply-To, never in
// From, so the SMTP account stays the sender.
export async function sendContactMessage(config: MailConfig, input: ContactInput): Promise<void> {
  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.password },
  });

  // Header values must be single-line: strip CR/LF from user-supplied text.
  const nombre = input.nombre.replace(/[\r\n]+/g, " ").trim();
  const correo = input.correo.replace(/[\r\n]+/g, "").trim();

  await transport.sendMail({
    from: config.from,
    to: config.to,
    replyTo: correo,
    subject: `Nuevo mensaje del portafolio: ${nombre}`,
    text: `Nombre: ${nombre}\nCorreo: ${correo}\n\n${input.mensaje.trim()}`,
  });
}
