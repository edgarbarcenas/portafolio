import type { Metadata } from "next";
import { Epilogue, Poppins, Roboto } from "next/font/google";
import { INTRO_PREPAINT_SCRIPT } from "@/lib/intro-session";
import "./globals.css";

const epilogue = Epilogue({
  variable: "--nf-epilogue",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--nf-poppins",
  subsets: ["latin"],
  weight: ["600"],
});

const roboto = Roboto({
  variable: "--nf-roboto",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Edgar Barcenas · Desarrollador Full Stack",
  description:
    "Portafolio de Edgar Barcenas, desarrollador Full Stack: Next.js, Angular, NestJS, Prisma y Supabase.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      // The pre-paint script sets data-intro before hydration.
      suppressHydrationWarning
      className={`${epilogue.variable} ${poppins.variable} ${roboto.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_PREPAINT_SCRIPT }} />
      </head>
      <body className="min-h-full bg-white font-sans text-negro">
        {children}
      </body>
    </html>
  );
}
