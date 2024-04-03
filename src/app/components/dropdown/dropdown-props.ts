import { DropdownOption } from "./dropdown-option";
import { FormControlProps } from "@/types/form-control-props";
import { ValidationProps } from "@/types/validation-props";
import { SelectHTMLAttributes } from "react";

export interface DropdownProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    FormControlProps,
    ValidationProps {
  ["data-testid"]?: string;
  options: DropdownOption[];
  refCallback?: (instance: HTMLSelectElement | null) => void;
}
