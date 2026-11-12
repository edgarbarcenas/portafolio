import Huellita from "@/components/common/Huellita";
import { placementStyle } from "@/lib/placement";

// Paw accent, block-relative centre (1255.2, 56.3) (page 833.3 - 777),
// 62.16 x 51.03, Figma rot -27.43 -> CSS rotate(27.43deg).
const PAW_PLACEMENT = { w: 62.16, h: 51.03, cx: 1255.2, cy: 56.3, rot: -27.43 } as const;

// Figma screen 03 "Bio", block page y 777-1089 (312 tall), bg white,
// padding 120 (top/bottom) 320 (left/right) at the xl reference.
export default function Trayectoria() {
  return (
    <section className="relative bg-blanco">
      <p className="max-w-[880px] px-6 py-16 text-[20px] font-medium leading-[30px] tracking-[0.01em] text-negro xl:mx-auto xl:w-[880px] xl:max-w-none xl:px-0 xl:py-[102px] xl:text-[24px] xl:leading-[36px]">
        A los 20 años decidí entender qué era realmente el desarrollo, y lo hice
        por mi cuenta. No pasé por la universidad; elegí el camino de la
        curiosidad, la disciplina y el aprendizaje autodidacta.
      </p>
      {/* Responsive proposal (not in Figma): the paw only shows at the
          pixel-accurate xl layout — its Figma coordinates would overflow a
          narrower viewport. */}
      <Huellita className="hidden xl:block" style={placementStyle(PAW_PLACEMENT)} />
    </section>
  );
}
