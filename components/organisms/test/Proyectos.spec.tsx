import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Proyectos from "../Proyectos";

afterEach(cleanup);

describe("Proyectos", () => {
  it("lists the three Banco Ripley projects and no longer Educadora Canina", () => {
    render(<Proyectos />);

    expect(screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual([
      "Reenganche",
      "Refactorización Avance y Súper Avance",
      "Monitoreo de Fraude",
    ]);
    expect(screen.queryByText("Educadora Canina")).toBeNull();
  });

  it("links every card to its project page", () => {
    render(<Proyectos />);

    expect(screen.getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual([
      "/proyectos/reenganche",
      "/proyectos/refactorizacion-avance-super-avance",
      "/proyectos/monitoreo-de-fraude",
    ]);
  });

  it("shows the official Banco Ripley logo on each card", () => {
    render(<Proyectos />);

    const logos = screen.getAllByAltText("Logotipo de Banco Ripley");
    expect(logos).toHaveLength(3);
    for (const logo of logos) {
      expect(logo.getAttribute("src")).toContain("logo-banco-ripley.svg");
    }
  });
});
