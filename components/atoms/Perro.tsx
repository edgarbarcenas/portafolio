import type { CSSProperties } from "react";
import Layer from "./Layer";

// 54 vector layers (top/right/bottom/left % insets) forming the dog art; two
// sets exist, the intro dog and the contact dog (lime outline on its body).
const INSETS: ReadonlyArray<[string, "screen" | "multiply" | undefined]> = [
  ["0 47.77% 75.33% 14.1%", undefined],
  ["0.49% 57.88% 75.35% 14.09%", "screen"],
  ["0 47.73% 75.34% 14.1%", "multiply"],
  ["1.74% 79.21% 96.16% 16.82%", "screen"],
  ["2.27% 79.07% 96.72% 18.83%", "screen"],
  ["2.16% 78.76% 97.22% 19.73%", "screen"],
  ["1.19% 68.16% 96.11% 22.73%", "screen"],
  ["7.18% 50.39% 81.45% 39.46%", "screen"],
  ["17.74% 51.61% 81.42% 47.78%", "screen"],
  ["21.05% 10.78% 18.65% 7.07%", undefined],
  ["21.05% 10.78% 18.65% 7.07%", "multiply"],
  ["25.05% 39.44% 44.26% 15.45%", "screen"],
  ["35.79% 20.32% 60.1% 76.7%", "screen"],
  ["38.22% 22.14% 59.61% 76.62%", "screen"],
  ["39.54% 23.87% 58.56% 74.99%", "screen"],
  ["45.58% 26.7% 48.54% 67.92%", "screen"],
  ["49.64% 27.2% 47.55% 70.39%", "screen"],
  ["52.39% 27.72% 46.09% 71%", "screen"],
  ["53.84% 28.41% 42.01% 69.96%", "screen"],
  ["51.46% 19.47% 45.46% 78.05%", "screen"],
  ["53.59% 20.72% 43.48% 78.21%", "screen"],
  ["68.58% 17.27% 18.66% 13.94%", "multiply"],
  ["71.79% 19.47% 0.92% 17.77%", undefined],
  ["71.79% 19.47% 0.92% 17.77%", "multiply"],
  ["87.36% 60.21% 1.98% 20.5%", "multiply"],
  ["86.38% 19.58% 2.27% 59.38%", "multiply"],
  ["88.09% 66.01% 9.95% 25.81%", undefined],
  ["88.09% 28.06% 9.95% 63.76%", undefined],
  ["79.77% 40.61% 11.84% 37.68%", "multiply"],
  ["73.36% 68.32% 14.16% -0.01%", undefined],
  ["73.37% 68.32% 14.16% -0.01%", "multiply"],
  ["73.36% 0.01% 14.16% 68.3%", undefined],
  ["73.39% 0.01% 14.16% 68.31%", "multiply"],
  ["98.21% 42.5% 0 41.79%", undefined],
  ["98.21% 42.5% 0.52% 41.79%", "multiply"],
  ["89.57% 39.67% 1.48% 38.29%", undefined],
  ["89.76% 52.79% 7.99% 40.43%", "screen"],
  ["92.26% 55.7% 2.47% 40.09%", "screen"],
  ["93.17% 41.33% 4.74% 57.06%", "screen"],
  ["81.73% 69.97% 15.99% 23.93%", "screen"],
  ["83.47% 72.78% 14.58% 24.07%", "screen"],
  ["84.9% 73.64% 13.92% 25.38%", "screen"],
  ["86.18% 69.95% 12.9% 26.71%", "screen"],
  ["73.67% 76.53% 15.72% 0.86%", "screen"],
  ["80.31% 74.92% 15.35% 5.88%", "screen"],
  ["77.72% 3.2% 14.91% 69.92%", "screen"],
  ["73.87% 4.98% 21.03% 80.96%", "screen"],
  ["81.68% 29.73% 16.95% 65.91%", "screen"],
  ["82.75% 29.5% 15.97% 67.65%", "screen"],
  ["84.2% 29.72% 15.06% 69.43%", "screen"],
  ["85.59% 29.47% 13.38% 68.44%", "screen"],
  ["56.41% 74.39% 38.11% 19.98%", "screen"],
  ["58.73% 25.33% 36.92% 70.7%", "screen"],
  ["61.43% 27.86% 37.82% 70.64%", "screen"],
];

const ART_DIR = {
  intro: "/figma/intro/perro",
  contacto: "/figma/common/perro-contacto",
} as const;

export const PERRO_SIZE = { w: 60, h: 224 } as const;

type Props = {
  art: keyof typeof ART_DIR;
  className?: string;
  style?: CSSProperties;
};

export default function Perro({ art, className, style }: Props) {
  const dir = ART_DIR[art];
  return (
    <span
      aria-hidden="true"
      className={`block ${className ?? ""}`}
      style={{ position: "relative", width: PERRO_SIZE.w, height: PERRO_SIZE.h, ...style }}
    >
      {INSETS.map(([inset, blend], i) => (
        <Layer key={i} src={`${dir}/${String(i).padStart(2, "0")}.svg`} inset={inset} blend={blend} />
      ))}
    </span>
  );
}
