// Icon composition data for the "skills" icon pattern: a shared 50x50 base
// circle (fondo.svg) plus one or two logo layers placed by a pixel box over
// it. A few logos are clipped to a non-square shape via a CSS mask instead of
// sitting in the box as a plain image. See components/atoms/Layer.tsx for the
// inset-layer pattern this mirrors.

const ICON_BOX = 50;

type Box = { x: number; y: number; w: number; h: number };

// CSS `inset` shorthand (top right bottom left) as percentages of `box`.
function toInset({ x, y, w, h }: Box, box = ICON_BOX): string {
  const top = (y / box) * 100;
  const left = (x / box) * 100;
  const right = ((box - x - w) / box) * 100;
  const bottom = ((box - y - h) / box) * 100;
  const pct = (n: number) => `${Number(n.toFixed(4))}%`;
  return `${pct(top)} ${pct(right)} ${pct(bottom)} ${pct(left)}`;
}

type SkillIconLayer =
  | { kind: "image"; src: string; inset: string }
  | {
      kind: "mask";
      src: string;
      divInset: string;
      imageInset: string;
      maskSrc: string;
      maskSize: string;
      maskPosition: string;
      maskMode?: string;
    };

export type SkillIconSpec = {
  boxInset: string;
  overflowHidden?: boolean;
  layers: SkillIconLayer[];
};

function simple(box: Box, src: string, imageInset = "0% 0% 0% 0%", overflowHidden = false): SkillIconSpec {
  return {
    boxInset: toInset(box),
    overflowHidden,
    layers: [{ kind: "image", src, inset: imageInset }],
  };
}

// Returned type is explicit so every SKILL_ICONS value shares one uniform
// shape — otherwise TS keeps each object literal's narrower inferred type
// and indexing by SkillIconKey yields a union missing optional fields.
function masked(box: Box, overflowHidden: boolean, layer: Extract<SkillIconLayer, { kind: "mask" }>): SkillIconSpec {
  return { boxInset: toInset(box), overflowHidden, layers: [layer] };
}

export const SKILL_ICONS = {
  react: simple({ x: 5, y: 8, w: 39.34, h: 35 }, "/figma/skills/react.svg"),
  "react-native": simple({ x: 5, y: 8, w: 39.34, h: 35 }, "/figma/skills/react-native.svg"),
  nextjs: simple({ x: 0, y: 0, w: 50, h: 50 }, "/figma/skills/nextjs.svg"),
  angular: simple({ x: 5, y: 6, w: 39, h: 39 }, "/figma/skills/angular.svg"),
  tailwindcss: masked({ x: 5, y: 14, w: 39, h: 23 }, false, {
    kind: "mask",
    src: "/figma/skills/tailwindcss.svg",
    divInset: "0% 0% 1.82% 0%",
    imageInset: "0% 0% 0% 0%",
    maskSrc: "/figma/skills/tailwindcss-mask.svg",
    maskSize: "39px 22.582px",
    maskPosition: "0 0",
    maskMode: "alpha",
  }),
  shadcn: masked({ x: 5, y: 6, w: 39, h: 39 }, true, {
    kind: "mask",
    src: "/figma/skills/shadcn.svg",
    divInset: "15.62% 18.75% 18.75% 15.63%",
    imageInset: "-4.76% -4.76% -4.76% -4.76%",
    maskSrc: "/figma/skills/shadcn-mask.svg",
    maskSize: "39px 39px",
    maskPosition: "-6.094px -6.094px",
  }),
  nodejs: simple({ x: 5, y: 6, w: 39, h: 39 }, "/figma/skills/nodejs.svg", "0.1% 5.75% 0.1% 5.74%", true),
  "spring-boot": simple({ x: 7, y: 7, w: 36, h: 35.96 }, "/figma/skills/spring-boot.svg", "-0.08% -0.1% 0% 0%"),
  php: simple({ x: -2, y: -2, w: 54, h: 54 }, "/figma/skills/php.svg"),
  java: simple({ x: 5, y: 6, w: 39, h: 39 }, "/figma/skills/java.svg"),
  mysql: simple({ x: 5, y: 6, w: 39, h: 39 }, "/figma/skills/mysql.svg"),
  mongodb: simple({ x: 5, y: 6, w: 39, h: 39 }, "/figma/skills/mongodb.svg"),
  prisma: simple({ x: 5, y: 5, w: 40, h: 40 }, "/figma/skills/prisma.svg", "0% 8.71% 0.28% 8.71%", true),
  supabase: simple({ x: 4, y: 4, w: 42, h: 42 }, "/figma/skills/supabase.svg"),
  docker: simple({ x: 9, y: 9, w: 32, h: 32 }, "/figma/skills/docker.svg", "13.87% 0% 13.97% 0%", true),
  vercel: simple({ x: 10, y: 11, w: 29, h: 29 }, "/figma/skills/vercel.svg"),
  // Not in the Figma file: Simple Icons "googlecloud" (CC0).
  "google-cloud": simple({ x: 9, y: 9, w: 32, h: 32 }, "/figma/skills/google-cloud.svg"),
  // Not in the Figma file. NestJS reuses the hero logo; the brand logos are
  // Simple Icons (CC0); the architecture and calendar glyphs are generic,
  // brand-free line icons.
  nestjs: simple({ x: 7, y: 7.72, w: 36, h: 34.56 }, "/figma/inicio/logo-nestjs.svg"),
  firebase: simple({ x: 9, y: 9, w: 32, h: 32 }, "/figma/skills/firebase.svg"),
  jest: simple({ x: 9, y: 9, w: 32, h: 32 }, "/figma/skills/jest.svg"),
  swagger: simple({ x: 9, y: 9, w: 32, h: 32 }, "/figma/skills/swagger.svg"),
  jwt: simple({ x: 10, y: 10, w: 30, h: 30 }, "/figma/skills/jwt.svg"),
  redux: simple({ x: 9, y: 9, w: 32, h: 32 }, "/figma/skills/redux.svg"),
  fullcalendar: simple({ x: 10, y: 10, w: 30, h: 30 }, "/figma/skills/calendario.svg"),
  microservicios: simple({ x: 10, y: 10, w: 30, h: 30 }, "/figma/skills/microservicios.svg"),
  hexagonal: simple({ x: 10, y: 10, w: 30, h: 30 }, "/figma/skills/hexagonal.svg"),
  "multi-tenant": simple({ x: 10, y: 10, w: 30, h: 30 }, "/figma/skills/multi-tenant.svg"),
  "event-driven": simple({ x: 10, y: 10, w: 30, h: 30 }, "/figma/skills/event-driven.svg"),
  // Not in the Figma file: gRPC has no Simple Icons brand icon; CI/CD is
  // generic. Both are brand-free line glyphs.
  grpc: simple({ x: 10, y: 10, w: 30, h: 30 }, "/figma/skills/grpc.svg"),
  "ci-cd": simple({ x: 10, y: 10, w: 30, h: 30 }, "/figma/skills/ci-cd.svg"),
} satisfies Record<string, SkillIconSpec>;

export type SkillIconKey = keyof typeof SKILL_ICONS;
