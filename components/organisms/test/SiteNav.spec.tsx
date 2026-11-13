import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SiteNav from "../SiteNav";

const LABELS = ["Experiencia", "Proyectos", "Habilidades", "CV", "Contacto"];

// No testing-library auto-cleanup is wired into vitest.config.mts (no
// setupFiles/globals), so each render leaks into the next test unless we
// clean up explicitly.
afterEach(cleanup);

describe("SiteNav", () => {
  it("renders the five items in order", () => {
    const { getByRole } = render(<SiteNav current="home" />);

    const nav = getByRole("navigation", { name: "Principal" });
    const links = within(nav)
      .getAllByRole("link")
      .filter((link) => LABELS.includes(link.textContent ?? ""));
    // Desktop and mobile render the same items twice (one hidden by CSS).
    const order = links.map((link) => link.textContent);
    expect(order.slice(0, LABELS.length)).toEqual(LABELS);
  });

  it("marks CV as the current item on the cv page", () => {
    const { getAllByRole } = render(<SiteNav current="cv" />);

    const cvLinks = getAllByRole("link", { name: "CV" });
    expect(cvLinks[0].getAttribute("aria-current")).toBe("page");
  });

  it("links Experiencia to the home section anchor on the proyecto page", () => {
    const { getAllByRole } = render(<SiteNav current="proyecto" />);

    const links = getAllByRole("link", { name: "Experiencia" });
    expect(links[0].getAttribute("href")).toBe("/#experiencia");
  });

  it("keeps Contacto as an in-page anchor", () => {
    const { getAllByRole } = render(<SiteNav current="home" />);

    const links = getAllByRole("link", { name: "Contacto" });
    expect(links[0].getAttribute("href")).toBe("#contacto");
  });

  it("opens a full-screen menu dialog and closes it with Cerrar", async () => {
    const user = userEvent.setup();
    const { getByRole, queryByRole } = render(<SiteNav current="home" />);

    const toggle = getByRole("button", { name: "Menú" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");

    await user.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    const dialog = getByRole("dialog", { name: "Menú" });
    expect(dialog.className).toContain("fixed inset-0");
    expect(within(dialog).getAllByRole("link").map((link) => link.textContent).slice(1)).toEqual(LABELS);
    expect(document.body.style.overflow).toBe("hidden");

    await user.click(within(dialog).getByRole("button", { name: "Cerrar" }));
    expect(queryByRole("dialog")).toBeNull();
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(toggle);
    expect(document.body.style.overflow).toBe("");
  });

  it("closes the menu with Escape and when an item is picked", async () => {
    const user = userEvent.setup();
    const { getByRole, queryByRole } = render(<SiteNav current="proyecto" />);

    await user.click(getByRole("button", { name: "Menú" }));
    await user.keyboard("{Escape}");
    expect(queryByRole("dialog")).toBeNull();

    await user.click(getByRole("button", { name: "Menú" }));
    await user.click(within(getByRole("dialog")).getByRole("link", { name: "Contacto" }));
    expect(queryByRole("dialog")).toBeNull();
  });
});
