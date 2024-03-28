import classNames from "classnames";
import { FocusEvent, useState } from "react";

export const Input = ({
  "data-testid": testId = "input",
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
    null,
  );

  const isLabelFloating = value !== undefined || isInputFocused;

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
    <div data-testid={testId} className={"relative flex py-2"}>
      {label && (
        <label
          data-testid={`${testId}__label`}
          className={classNames(
            "absolute left-2 bg-slate-800 transition-all",
            { "top-4 cursor-text text-slate-500": !isLabelFloating },
            {
              "-top-1 text-sm text-slate-300": isLabelFloating,
            },
          )}
          htmlFor={name}
          onClick={() => !isLabelFloating && inputInstance?.focus()}
        >
          {`${label}${required ? "*" : ""}`}
        </label>
      )}
      <input
        {...props}
        data-testid={`${testId}__field`}
        className="border-1 h-8 border border-slate-300 bg-slate-800 p-2"
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
