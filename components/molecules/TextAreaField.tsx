import type { RefObject } from "react";
import type { FieldBaseProps } from "./field-props";

// Multi-line twin of TextField (same flat focus and error treatment).
export default function TextAreaField({
  id,
  name,
  label,
  placeholder,
  error,
  onBlur,
  inputRef,
}: FieldBaseProps & { inputRef: RefObject<HTMLTextAreaElement | null> }) {
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
        <textarea
          ref={inputRef}
          id={id}
          name={name}
          rows={7}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onBlur={onBlur}
          className="w-full resize-none bg-transparent outline-none focus-visible:outline-none font-sans text-[20px] font-medium leading-[27px] text-negro placeholder:text-negro"
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
