import classNames from "classnames";
import { FocusEvent, useState } from "react";

export const Input = ({
  className,
  name,
  label,
  value,
  placeholder,
  required,
  invalid = false,
  valid = false,
  error,
  validMessage,
  withMessages = false,
  refCallback,
  onFocus,
  onBlur,
  ...props
}: any) => {
  const [isInputFocused, setInputFocused] = useState(false);
  const [inputInstance, setInputInstance] = useState<HTMLInputElement | null>(
    null
  );

  const isLabelFloating = !!value || isInputFocused;

  const onLocalFocus = (event: FocusEvent<HTMLInputElement>) => {
    setInputFocused(true);
    onFocus && onFocus(event);
  };

  const onLocalBlur = (event: FocusEvent<HTMLInputElement>) => {
    setInputFocused(false);
    onBlur && onBlur(event);
  };

  const localRefCallback = (instance: HTMLInputElement | null) => {
    refCallback && refCallback(instance);
    setInputInstance(instance);
  };

  return (
    <div className={"relative flex py-2"}>
      {label && (
        <label
          className={classNames(
            "absolute bg-slate-800 left-2 transition-all",
            { "text-slate-500 top-3 cursor-text": !isLabelFloating },
            {
              "-top-1 text-sm text-slate-300": isLabelFloating,
            }
          )}
          htmlFor={name}
          onClick={() => !isLabelFloating && inputInstance?.focus()}
        >
          {`${label}${required ? "*" : ""}`}
        </label>
      )}
      <input
        {...props}
        className="bg-slate-800 border border-1 border-slate-300 h-8 p-2"
        id={name}
        ref={localRefCallback}
        value={value ?? ""}
        placeholder={!value && isInputFocused ? placeholder : undefined}
        onFocus={onLocalFocus}
        onBlur={onLocalBlur}
      />
    </div>
  );
};
