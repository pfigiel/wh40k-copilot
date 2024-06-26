import { FormControlProps, ValidationProps } from "@/types";
import { InputHTMLAttributes } from "react";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    FormControlProps,
    ValidationProps {
  ["data-testid"]?: string;
  className?: string;
  refCallback?: (instance: HTMLInputElement | null) => void;
}
