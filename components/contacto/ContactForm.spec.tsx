import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ContactForm from "./ContactForm";

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
});
