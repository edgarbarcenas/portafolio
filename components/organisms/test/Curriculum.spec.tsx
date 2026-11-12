import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Curriculum from "../Curriculum";

// This project's vitest config does not enable `test.globals`, so
// Testing Library's auto-cleanup never registers; without this, renders
// from earlier tests in this file accumulate in the document.
afterEach(cleanup);

describe("Curriculum", () => {
  it("renders the section heading", () => {
    render(<Curriculum />);

    expect(screen.getByRole("heading", { level: 2, name: "Currículum" })).toBeDefined();
  });

  it("renders every CV sub-section as a heading", () => {
    render(<Curriculum />);

    const headings = ["Resumen Profesional", "Experiencia Profesional", "Educación", "Idiomas"];
    headings.forEach((name) => {
      expect(screen.getByRole("heading", { level: 3, name })).toBeDefined();
    });
  });

  it("lists the most recent role", () => {
    render(<Curriculum />);

    expect(screen.getByText("Senior Full Stack Developer / Líder Técnico")).toBeDefined();
    expect(screen.getAllByText(/Accenture Chile/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Cliente: Banco Ripley/).length).toBeGreaterThan(0);
  });

  it("renders the Accenture role's stages as sub-headings with their own bullets", () => {
    render(<Curriculum />);

    expect(screen.getByText("Líder Técnico – Iniciativa Reenganche")).toBeDefined();
    expect(
      screen.getByText(/Liderazgo técnico de Reenganche, nuevo producto financiero/),
    ).toBeDefined();
  });

  it("updates Seiza SPA's current role to its closing date", () => {
    render(<Curriculum />);

    expect(screen.getByText("Desarrollador de Software")).toBeDefined();
    expect(screen.getAllByText(/Seiza SPA/).length).toBeGreaterThan(0);
    expect(screen.getByText(/Abr 2024 – Nov 2025/)).toBeDefined();
  });

  it("renders the freelancer role without a company name", () => {
    render(<Curriculum />);

    expect(screen.getByText("Desarrollador Web Freelancer")).toBeDefined();
    expect(screen.queryByText(/Independiente/)).toBeNull();
  });

  it("does not list projects (removed from the CV page by the developer)", () => {
    render(<Curriculum />);

    expect(screen.queryByRole("heading", { name: "Proyectos Destacados" })).toBeNull();
  });

  it("lists the languages", () => {
    render(<Curriculum />);

    expect(screen.getByText(/Nativo/)).toBeDefined();
    expect(screen.getByText(/Intermedio \(B1\)/)).toBeDefined();
  });
});
