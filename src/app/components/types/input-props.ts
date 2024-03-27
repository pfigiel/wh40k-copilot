import { InputHTMLAttributes } from "react";
import { FormControlProps } from "./form-control-props";
import { ValidationProps } from "./validation-props";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    FormControlProps,
    ValidationProps {
  refCallback?: (instance: HTMLInputElement | null) => void;
}
