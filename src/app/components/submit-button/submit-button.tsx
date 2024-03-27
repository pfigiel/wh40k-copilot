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
  <input data-testid={testId} type="submit" value={value} disabled={disabled} />
);
