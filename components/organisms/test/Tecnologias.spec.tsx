import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Tecnologias from "../Tecnologias";

describe("Tecnologias", () => {
  it("renders the five technology logos with alt text", () => {
    render(<Tecnologias />);

    const list = screen.getByRole("list", { name: "Tecnologías principales" });
    const names = ["Next.js", "Angular", "NestJS", "Prisma", "Supabase"];

    for (const name of names) {
      expect(screen.getByAltText(name)).toBeTruthy();
    }
    expect(list.querySelectorAll("li")).toHaveLength(5);
  });
});
