import { DropdownOption } from "./dropdown-option";
import { FormControlProps, ValidationProps } from "@/types";

export interface DropdownProps<TValue>
  extends FormControlProps,
    ValidationProps {
  ["data-testid"]?: string;
  className?: string;
  options: DropdownOption<TValue>[];
  value: TValue;
  onSelect: (value: TValue) => void;
}
