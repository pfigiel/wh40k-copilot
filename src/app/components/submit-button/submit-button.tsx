import classNames from "classnames";

export interface Props {
  ["data-testid"]?: string;
  className?: string;
  value: string;
  disabled?: boolean;
}

export const SubmitButton = ({
  "data-testid": testId = "submit-button",
  className,
  value,
  disabled,
}: Props) => (
  <input
    data-testid={testId}
    className={classNames(
      "cursor-pointer border border-slate-300 p-3",
      className,
    )}
    type="submit"
    value={value}
    disabled={disabled}
  />
);
