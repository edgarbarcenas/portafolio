import { describe, expect, it } from "vitest";
import { hasErrors, validateContact } from "../validation";

describe("validateContact", () => {
  it("requires nombre, correo and mensaje", () => {
    const errors = validateContact({ nombre: "", correo: "", mensaje: "" });
    expect(errors.nombre).toBeTruthy();
    expect(errors.correo).toBeTruthy();
    expect(errors.mensaje).toBeTruthy();
    expect(hasErrors(errors)).toBe(true);
  });

  it("rejects a nombre shorter than 2 characters", () => {
    const errors = validateContact({ nombre: "A", correo: "a@b.com", mensaje: "1234567890" });
    expect(errors.nombre).toBeTruthy();
  });

  it("rejects a nombre longer than 80 characters", () => {
    const errors = validateContact({
      nombre: "a".repeat(81),
      correo: "a@b.com",
      mensaje: "1234567890",
    });
    expect(errors.nombre).toBeTruthy();
  });

  it("rejects an invalid email format", () => {
    const errors = validateContact({ nombre: "Edgar", correo: "not-an-email", mensaje: "1234567890" });
    expect(errors.correo).toBeTruthy();
  });

  it("rejects a mensaje shorter than 10 characters", () => {
    const errors = validateContact({ nombre: "Edgar", correo: "a@b.com", mensaje: "short" });
    expect(errors.mensaje).toBeTruthy();
  });

  it("rejects a mensaje longer than 2000 characters", () => {
    const errors = validateContact({
      nombre: "Edgar",
      correo: "a@b.com",
      mensaje: "a".repeat(2001),
    });
    expect(errors.mensaje).toBeTruthy();
  });

  it("accepts valid input with no errors", () => {
    const errors = validateContact({
      nombre: "Edgar",
      correo: "edgar@example.com",
      mensaje: "Hola, quiero contactarte sobre un proyecto.",
    });
    expect(hasErrors(errors)).toBe(false);
  });
});
