import { DropdownOption } from "./dropdown-option";
import { FormControlProps } from "@/types/form-control-props";
import { ValidationProps } from "@/types/validation-props";

export interface DropdownProps<TValue>
  extends FormControlProps,
    ValidationProps {
  ["data-testid"]?: string;
  className?: string;
  options: DropdownOption<TValue>[];
  value: TValue;
  onSelect: (value: TValue) => void;
}
