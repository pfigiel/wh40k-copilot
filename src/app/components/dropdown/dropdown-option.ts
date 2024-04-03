import { ReactNode } from "react";

export interface DropdownOption {
  value: string | readonly string[] | number | undefined;
  display: ReactNode;
}
