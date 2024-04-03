import classNames from "classnames";

export interface Props {
  ["data-testid"]?: string;
  className?: string;
  invalid?: boolean;
  valid?: boolean;
  error?: string;
  validMessage?: string;
}

export const FieldMessage = ({
  "data-testid": testId = "field-message",
  className,
  invalid,
  valid,
  error,
  validMessage,
}: Props) => {
  const shouldShowInvalidMessage = invalid && error;
  const shouldShowValidMessage =
    !shouldShowInvalidMessage && valid && validMessage;

  return (
    <div
      data-testid={testId}
      className={classNames(
        // { [styles[bem(undefined, "valid")]]: shouldShowValidMessage },
        // { [styles[bem(undefined, "invalid")]]: shouldShowInvalidMessage },
        className,
      )}
    >
      {shouldShowInvalidMessage && error}
      {shouldShowValidMessage && validMessage}
    </div>
  );
};
