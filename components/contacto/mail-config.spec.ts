import { describe, expect, it } from "vitest";
import { readMailConfig } from "./mail-config";

const FULL = {
  CONTACT_SMTP_HOST: "smtp.test.local",
  CONTACT_SMTP_PORT: "587",
  CONTACT_SMTP_USER: "user",
  CONTACT_SMTP_PASSWORD: "secret",
  CONTACT_MAIL_FROM: "web@test.local",
  CONTACT_MAIL_TO: "inbox@test.local",
};

describe("readMailConfig", () => {
  it("returns the config when every variable is present", () => {
    expect(readMailConfig(FULL)).toEqual({
      host: "smtp.test.local",
      port: 587,
      secure: false,
      user: "user",
      password: "secret",
      from: "web@test.local",
      to: "inbox@test.local",
    });
  });

  it("returns null when any variable is missing", () => {
    for (const key of Object.keys(FULL)) {
      expect(readMailConfig({ ...FULL, [key]: undefined })).toBeNull();
    }
  });

  it("returns null for an invalid port", () => {
    expect(readMailConfig({ ...FULL, CONTACT_SMTP_PORT: "smtp" })).toBeNull();
    expect(readMailConfig({ ...FULL, CONTACT_SMTP_PORT: "70000" })).toBeNull();
  });

  it("defaults to TLS on 465 and honours an explicit CONTACT_SMTP_SECURE", () => {
    expect(readMailConfig({ ...FULL, CONTACT_SMTP_PORT: "465" })?.secure).toBe(true);
    expect(readMailConfig({ ...FULL, CONTACT_SMTP_SECURE: "true" })?.secure).toBe(true);
    expect(readMailConfig({ ...FULL, CONTACT_SMTP_PORT: "465", CONTACT_SMTP_SECURE: "false" })?.secure).toBe(false);
  });
});
