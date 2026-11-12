import Image from "next/image";

export default function BioFondo() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <Image src="/figma/bio/deco.png" alt="" fill sizes="100vw" className="object-cover" />
    </div>
  );
}
