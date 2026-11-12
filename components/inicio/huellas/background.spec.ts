import { describe, expect, it } from "vitest";
import { isDarkColor, parseColor } from "./background";

describe("paw background detection", () => {
  it("parses rgb and rgba colours", () => {
    expect(parseColor("rgb(141, 76, 226)")).toEqual([141, 76, 226, 1]);
    expect(parseColor("rgba(0, 0, 0, 0)")).toEqual([0, 0, 0, 0]);
    expect(parseColor("transparent")).toBeNull();
  });

  it("treats the site purple and black as dark, white and lila as light", () => {
    expect(isDarkColor("rgb(141, 76, 226)")).toBe(true); // purpura #8D4CE2
    expect(isDarkColor("rgb(0, 0, 0)")).toBe(true);
    expect(isDarkColor("rgb(255, 255, 255)")).toBe(false);
    expect(isDarkColor("rgb(235, 212, 255)")).toBe(false); // lila #EBD4FF
  });

  it("ignores transparent backgrounds so the next layer down decides", () => {
    expect(isDarkColor("rgba(0, 0, 0, 0)")).toBeNull();
  });
});
