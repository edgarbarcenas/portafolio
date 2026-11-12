import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Proyectos from "../Proyectos";

describe("Proyectos", () => {
  it("links the Educadora Canina card to its project route", () => {
    render(<Proyectos />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute("href")).toBe("/proyectos/educadora-canina");
    expect(links[0].textContent).toContain("Educadora Canina");
  });

  it("lists only real projects: the removed placeholder cards are gone", () => {
    render(<Proyectos />);

    expect(screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual([
      "Educadora Canina",
    ]);
    expect(screen.queryByText("Dashboard Administrativo (Demo)")).toBeNull();
    expect(screen.queryByText("Aplicación de Reciclaje Multi-tenant")).toBeNull();
  });
});
