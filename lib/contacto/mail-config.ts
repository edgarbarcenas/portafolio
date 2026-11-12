// SMTP settings for the contact form, read from environment variables so no
// credential ever lives in the code. Put them in `.env.local` (git-ignored)
// or in the hosting provider's environment settings:
//
//   CONTACT_SMTP_HOST      smtp.example.com
//   CONTACT_SMTP_PORT      465 (implicit TLS) or 587 (STARTTLS)
//   CONTACT_SMTP_SECURE    optional "true"/"false"; defaults to true on 465
//   CONTACT_SMTP_USER      SMTP account user
//   CONTACT_SMTP_PASSWORD  SMTP account password / app password
//   CONTACT_MAIL_FROM      sender address the SMTP account may use
//   CONTACT_MAIL_TO        inbox that receives the messages
//
// While any of them is missing the form answers "unavailable" and never
// pretends to have sent anything.

export type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  from: string;
  to: string;
};

type Env = Record<string, string | undefined>;

export function readMailConfig(env: Env = process.env): MailConfig | null {
  const host = env.CONTACT_SMTP_HOST?.trim();
  const portRaw = env.CONTACT_SMTP_PORT?.trim();
  const user = env.CONTACT_SMTP_USER?.trim();
  const password = env.CONTACT_SMTP_PASSWORD;
  const from = env.CONTACT_MAIL_FROM?.trim();
  const to = env.CONTACT_MAIL_TO?.trim();
  if (!host || !portRaw || !user || !password || !from || !to) return null;

  const port = Number(portRaw);
  if (!Number.isInteger(port) || port <= 0 || port > 65535) return null;

  const secureRaw = env.CONTACT_SMTP_SECURE?.trim().toLowerCase();
  const secure = secureRaw === undefined || secureRaw === "" ? port === 465 : secureRaw === "true";

  return { host, port, secure, user, password, from, to };
}
