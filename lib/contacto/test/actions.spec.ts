import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { enviarMensaje } from "../actions";
import { initialContactFormState } from "../form-state";
import { sendContactMessage } from "../send-message";

// SMTP is the system boundary: the transport module is mocked, nothing else.
vi.mock("../send-message", () => ({ sendContactMessage: vi.fn() }));
const sendMock = vi.mocked(sendContactMessage);

const SMTP_ENV = {
  CONTACT_SMTP_HOST: "smtp.test.local",
  CONTACT_SMTP_PORT: "465",
  CONTACT_SMTP_USER: "user",
  CONTACT_SMTP_PASSWORD: "secret",
  CONTACT_MAIL_FROM: "web@test.local",
  CONTACT_MAIL_TO: "inbox@test.local",
};

const VALID = {
  nombre: "Edgar",
  correo: "edgar@example.com",
  mensaje: "Hola, quiero contactarte sobre un proyecto.",
};

function buildFormData(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.append(key, value);
  return data;
}

function withSmtpEnv() {
  for (const [key, value] of Object.entries(SMTP_ENV)) vi.stubEnv(key, value);
}

describe("enviarMensaje", () => {
  beforeEach(() => {
    sendMock.mockReset();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns field errors for invalid input and does not send", async () => {
    withSmtpEnv();
    const result = await enviarMensaje(
      initialContactFormState,
      buildFormData({ nombre: "", correo: "", mensaje: "" })
    );
    expect(result.status).toBe("invalid");
    if (result.status === "invalid") {
      expect(result.errors.nombre).toBeTruthy();
      expect(result.errors.correo).toBeTruthy();
      expect(result.errors.mensaje).toBeTruthy();
    }
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 'unavailable' without SMTP settings, never success", async () => {
    for (const key of Object.keys(SMTP_ENV)) vi.stubEnv(key, "");
    const result = await enviarMensaje(initialContactFormState, buildFormData(VALID));
    expect(result.status).toBe("unavailable");
    if (result.status === "unavailable") expect(result.message).toMatch(/no está disponible/);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 'sent' only after the transport accepted the message", async () => {
    withSmtpEnv();
    sendMock.mockResolvedValue(undefined);
    const result = await enviarMensaje(initialContactFormState, buildFormData(VALID));
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock.mock.calls[0][1]).toEqual(VALID);
    expect(result.status).toBe("sent");
  });

  it("returns 'error' (not sent) when the transport fails", async () => {
    withSmtpEnv();
    sendMock.mockRejectedValue(new Error("connection refused"));
    const result = await enviarMensaje(initialContactFormState, buildFormData(VALID));
    expect(result.status).toBe("error");
    if (result.status === "error") expect(result.message).toMatch(/No se pudo enviar/);
  });
});
