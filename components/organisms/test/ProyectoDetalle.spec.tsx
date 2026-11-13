import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import ProyectoDetalle from "../ProyectoDetalle";
import { getProject } from "@/lib/proyectos/proyectos-data";

afterEach(cleanup);

describe("ProyectoDetalle", () => {
  it("describes Monitoreo de Fraude: publisher/consumer on Cloud Run and the Strategy pattern", () => {
    const project = getProject("monitoreo-de-fraude");
    if (!project) throw new Error("missing project");
    render(<ProyectoDetalle project={project} />);

    expect(screen.getByRole("heading", { level: 1, name: "Monitoreo de Fraude" })).toBeTruthy();
    expect(screen.getByText(/Accenture para Banco Ripley Chile/)).toBeTruthy();
    expect(screen.getByText(/un microservicio publisher y otro consumer/)).toBeTruthy();
    expect(screen.getByText(/patrones de diseño como Strategy/)).toBeTruthy();
    expect(screen.getByAltText("Logotipo de Banco Ripley")).toBeTruthy();
  });
});
