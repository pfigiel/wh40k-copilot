import { InputHTMLAttributes } from "react";
import { FormControlProps } from "./form-control-props";
import { ValidationProps } from "./validation-props";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    FormControlProps,
    ValidationProps {
  ["data-testid"]?: string;
  refCallback?: (instance: HTMLInputElement | null) => void;
}
