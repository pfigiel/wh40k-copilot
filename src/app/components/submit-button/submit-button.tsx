export interface Props {
  ["data-testid"]?: string;
  value: string;
  disabled?: boolean;
}

export const SubmitButton = ({
  "data-testid": testId = "submit-button",
  value,
  disabled,
}: Props) => (
  <input
    data-testid={testId}
    className="cursor-pointer border border-slate-300"
    type="submit"
    value={value}
    disabled={disabled}
  />
);
