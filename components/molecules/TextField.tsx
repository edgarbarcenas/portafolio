import type { RefObject } from "react";
import type { FieldBaseProps } from "./field-props";

// 530 wide, lila background, Epilogue Medium 20/27 black — the Figma text is
// the placeholder look; a real (visually hidden) label carries the a11y name.
// Focus: the field turns white with a 3px dark-purple bar at the bottom;
// errors: a 3px dark bar plus text. Flat, like the rest of the design.
// Both are proposals, not in Figma.
export default function TextField({
  id,
  name,
  label,
  placeholder,
  error,
  onBlur,
  type = "text",
  inputRef,
}: FieldBaseProps & { type?: "text" | "email"; inputRef: RefObject<HTMLInputElement | null> }) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-[8px]">
      <div
        className={`w-full bg-lila px-[30px] py-[21px] transition-[background-color,box-shadow] duration-150 focus-within:bg-white focus-within:shadow-[inset_0_-3px_0_var(--color-purpura-oscuro)] ${
          error ? "shadow-[inset_0_-3px_0_var(--color-on-surface)]" : ""
        }`}
      >
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <input
          ref={inputRef}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onBlur={onBlur}
          className="w-full bg-transparent outline-none focus-visible:outline-none font-sans text-[20px] font-medium leading-[27px] text-negro placeholder:text-negro"
        />
      </div>
      {error && (
        <p id={errorId} className="font-sans text-[16px] font-medium leading-[21px] text-white">
          {error}
        </p>
      )}
    </div>
  );
}
