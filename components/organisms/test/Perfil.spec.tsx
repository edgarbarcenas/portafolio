import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Perfil from "../Perfil";

// This project's vitest config does not enable `test.globals`, so
// Testing Library's auto-cleanup never registers; without this, renders
// from earlier tests in this file accumulate in the document.
afterEach(cleanup);

describe("Perfil", () => {
  it("renders the name as the page heading", () => {
    render(<Perfil />);

    const heading = screen.getByRole("heading", { level: 1, name: "Edgar Barcenas" });
    expect(heading.textContent).toBe("Edgar Barcenas");
  });

  it("links Home to the root route in the breadcrumb", () => {
    render(<Perfil />);

    const home = screen.getByRole("link", { name: "Home" });
    expect(home.getAttribute("href")).toBe("/");
  });

  it("marks CV as the current page in the breadcrumb", () => {
    render(<Perfil />);

    const cv = screen.getByText("CV");
    expect(cv.getAttribute("aria-current")).toBe("page");
  });
});
