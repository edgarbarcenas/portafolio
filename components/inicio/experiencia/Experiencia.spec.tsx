import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Experiencia from "./Experiencia";


describe("Experiencia", () => {
  it("shows all three cards on their front face (art) at rest", () => {
    render(<Experiencia />);

    expect(
      screen.getByRole("button", { name: "Frontend Development — ver contraportada" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Especialización Técnica — ver contraportada" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Backend Development — ver contraportada" }),
    ).toBeTruthy();
  });

  it("mouse hover shows the other face of that card only, leaving restores it", async () => {
    const user = userEvent.setup();
    render(<Experiencia />);

    const frontend = screen.getByRole("button", { name: "Frontend Development — ver contraportada" });
    const backend = screen.getByRole("button", { name: "Backend Development — ver contraportada" });

    await user.hover(frontend);
    expect(frontend.getAttribute("aria-pressed")).toBe("true");
    expect(frontend.getAttribute("aria-label")).toBe("Frontend Development — ver portada");
    // Backend was not touched.
    expect(backend.getAttribute("aria-pressed")).toBe("false");

    // A mouse click does not undo what hover shows.
    await user.click(frontend);
    expect(frontend.getAttribute("aria-pressed")).toBe("true");

    await user.unhover(frontend);
    expect(frontend.getAttribute("aria-pressed")).toBe("false");
  });

  it("a touch tap toggles the face and a second tap restores it", async () => {
    const user = userEvent.setup();
    render(<Experiencia />);
    const card = screen.getByRole("button", { name: "Frontend Development — ver contraportada" });

    await user.pointer({ keys: "[TouchA]", target: card });
    expect(card.getAttribute("aria-pressed")).toBe("true");
    await user.pointer({ keys: "[TouchA]", target: card });
    expect(card.getAttribute("aria-pressed")).toBe("false");
  });

  it("toggles via keyboard (Enter and Space)", async () => {
    const user = userEvent.setup();
    render(<Experiencia />);

    const backend = screen.getByRole("button", {
      name: "Backend Development — ver contraportada",
    });
    backend.focus();

    await user.keyboard("{Enter}");
    expect(backend.getAttribute("aria-pressed")).toBe("true");

    await user.keyboard(" ");
    expect(backend.getAttribute("aria-pressed")).toBe("false");
  });
});
