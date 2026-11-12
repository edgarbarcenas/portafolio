import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SiteNav from "./SiteNav";

const LABELS = ["Experiencia", "Proyectos", "Habilidades", "Bio", "Contacto"];

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

  it("marks Bio as the current item on the bio page", () => {
    const { getAllByRole } = render(<SiteNav current="bio" />);

    const bioLinks = getAllByRole("link", { name: "Bio" });
    expect(bioLinks[0].getAttribute("aria-current")).toBe("page");
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

  it("flips aria-expanded on the mobile menu toggle", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<SiteNav current="home" />);

    const toggle = getByRole("button", { name: "Menú" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");

    await user.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");

    await user.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });
});
