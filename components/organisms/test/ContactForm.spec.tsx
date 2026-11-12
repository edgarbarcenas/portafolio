import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import ContactForm from "../ContactForm";

const server = vi.hoisted(() => ({ result: { status: "idle" } as unknown }));
vi.mock("@/lib/contacto/actions", () => ({ enviarMensaje: async () => server.result }));

// No global test setup file registers this automatically in this repo.
afterEach(() => cleanup());

describe("ContactForm", () => {
  it("has a real label for each field", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Nombre")).toBeTruthy();
    expect(screen.getByLabelText("Correo electrónico")).toBeTruthy();
    expect(screen.getByLabelText("Escribe tu mensaje aquí")).toBeTruthy();
  });

  it("shows three errors and marks every field invalid on an empty submit", () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));

    const nombre = screen.getByLabelText("Nombre");
    const correo = screen.getByLabelText("Correo electrónico");
    const mensaje = screen.getByLabelText("Escribe tu mensaje aquí");

    expect(nombre.getAttribute("aria-invalid")).toBe("true");
    expect(correo.getAttribute("aria-invalid")).toBe("true");
    expect(mensaje.getAttribute("aria-invalid")).toBe("true");
    expect(document.querySelectorAll('[id$="-error"]').length).toBe(3);

    // First invalid field (declaration order) gets focus.
    expect(document.activeElement).toBe(nombre);
  });

  it("focuses the first field the server rejects when the client check passed", async () => {
    server.result = { status: "invalid", errors: { correo: "Correo no válido" } };
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "ana@example.com" } });
    fireEvent.change(screen.getByLabelText("Escribe tu mensaje aquí"), { target: { value: "Hola, me interesa tu trabajo." } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));

    const correo = screen.getByLabelText("Correo electrónico");
    await waitFor(() => expect(document.activeElement).toBe(correo));
    expect(correo.getAttribute("aria-invalid")).toBe("true");
  });
});
