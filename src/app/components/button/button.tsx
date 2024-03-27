import { MouseEventHandler, ReactNode } from "react";
import { SubmitButton } from "@/components/submit-button";

export interface Props {
  ["data-testid"]?: string;
  children: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  "data-testid": testId = "button",
  children,
  disabled,
  onClick,
}: Props) => {
  return (
    <button data-testid={testId} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

Button.Submit = SubmitButton;

export { Button };
