import IsoEdgar from "@/components/common/IsoEdgar";
import Perro from "@/components/common/Perro";
import ScaleToFit from "@/components/common/ScaleToFit";
import ContactForm from "./ContactForm";

type Variant = "ilustracion" | "isotipo";

// Only profiles that exist. Figma also showed Discord, Facebook, Dribbble and
// Behance, but they pointed to the Anima template and Edgar has none of them.
const SOCIALS: ReadonlyArray<{ src: string; label: string; href: string }> = [
  {
    src: "/figma/common/social-instagram.svg",
    label: "Instagram de Edgar Barcenas (se abre en una pestaña nueva)",
    href: "https://www.instagram.com/edgar.barcenaz/",
  },
];

const HEADING_ID = "contacto-heading";

function ContactMessage() {
  return (
    <div className="flex w-full max-w-[360px] flex-col gap-[14px]">
      <h2
        id={HEADING_ID}
        className="font-sans text-[32px] font-semibold leading-[42px] text-white"
      >
        Trabajemos juntos
      </h2>
      <p className="font-sans text-[18px] font-normal leading-[27px] text-white">
        Te puedo ayudar en tu proyecto
      </p>
    </div>
  );
}

function SocialLinks() {
  return (
    <ul aria-label="Redes sociales" className="flex gap-[13px]">
      {SOCIALS.map(({ src, label, href }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector icon; the link carries the name */}
            <img src={src} alt="" width={36} height={36} />
          </a>
        </li>
      ))}
    </ul>
  );
}

// 284 x 398.68 composition (body + head + rotated dog). ScaleToFit keeps it
// pixel-exact at >=284px containers (every breakpoint here) and shrinks it
// uniformly below that instead of overflowing on narrow viewports.
function IllustrationArt() {
  return (
    <ScaleToFit width={284} height={398.68}>
      {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector art, absolutely placed inside the fixed composition */}
      <img
        src="/figma/common/contact-body.svg"
        alt=""
        aria-hidden="true"
        width={124}
        height={299}
        style={{ position: "absolute", left: 0, top: 101.64 }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector art, absolutely placed inside the fixed composition */}
      <img
        src="/figma/common/contact-head.svg"
        alt=""
        aria-hidden="true"
        width={101}
        height={68}
        style={{ position: "absolute", left: 11, top: 44.64 }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 123.89,
          top: 0,
          width: 160.228,
          height: 225.285,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Perro art="contacto" style={{ transform: "rotate(-151.29deg)" }} />
      </div>
    </ScaleToFit>
  );
}

type Props = {
  variant: Variant;
};

// Shared contact section, placed near the bottom of every page (home, bio,
// the project page). The form never reports success — see actions.ts.
export default function Contacto({ variant }: Props) {
  return (
    <section
      id="contacto"
      aria-labelledby={HEADING_ID}
      className={`relative overflow-hidden bg-purpura px-6 py-10 xl:mx-auto xl:w-[1280px] xl:px-[100px] xl:pt-0 xl:pb-[70px] ${
        variant === "ilustracion" ? "xl:min-h-[731.68px]" : "xl:min-h-[669px]"
      }`}
    >
      {variant === "ilustracion" && (
        // Responsive proposal (not in Figma): the diagonal wave is a section-level
        // decorative backdrop sized for the 1280 desktop box; below xl it is
        // hidden rather than attempting a partial, visually noisy crop.
        // eslint-disable-next-line @next/next/no-img-element -- Figma vector background
        <img
          src="/figma/common/contact-bg.svg"
          alt=""
          aria-hidden="true"
          width={661}
          height={571}
          className="pointer-events-none absolute left-[1px] top-0 hidden select-none xl:block"
        />
      )}
      <div className="relative border-t-2 border-[rgba(0,0,0,0.2)] pt-[70px]">
        {/* Responsive proposal (not in Figma): columns stack below xl, fields
            and the art group reflow to full width instead of the fixed
            360/190/530 split. */}
        <div className="flex flex-col gap-10 xl:flex-row xl:gap-[190px]">
          <div className="flex flex-col xl:w-[360px]">
            {variant === "ilustracion" ? (
              <>
                <IllustrationArt />
                <div className="mt-[14px]">
                  <ContactMessage />
                </div>
                <div className="mt-[60px]">
                  <SocialLinks />
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-[60px]">
                <IsoEdgar width={161} />
                <ContactMessage />
                <SocialLinks />
              </div>
            )}
          </div>
          <div className="xl:w-[530px]">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
