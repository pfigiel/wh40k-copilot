import { FormControlProps } from "@/types/form-control-props";
import { ValidationProps } from "@/types/validation-props";
import { InputHTMLAttributes } from "react";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    FormControlProps,
    ValidationProps {
  ["data-testid"]?: string;
  className?: string;
  refCallback?: (instance: HTMLInputElement | null) => void;
}
