import { FieldMessage, Props } from "./field-message";
import { render } from "@testing-library/react";

describe("FieldMessage", () => {
  const testId = "field-message";

  const renderComponent = (props: Partial<Props> = {}) => {
    const { className, invalid, valid, error, validMessage } = props;

    return render(
      <FieldMessage
        className={className}
        invalid={invalid}
        valid={valid}
        error={error}
        validMessage={validMessage}
      />,
    );
  };

  it("Should use class name when provided.", () => {
    // given
    const className = "class";

    // when
    const { getByTestId } = renderComponent({ className });

    // then
    expect(getByTestId(testId)).toHaveClass(className);
  });

  it("Should show error message when invalid flag is set and error is defined.", () => {
    // given
    const invalid = true;
    const error = "error";

    // when
    const { getByTestId } = renderComponent({ invalid, error });

    // then
    expect(getByTestId(testId)).toHaveTextContent(error);
  });

  it("Should show valid message when valid flag is set and validMessage is defined.", () => {
    // given
    const valid = true;
    const validMessage = "valid";

    // when
    const { getByTestId } = renderComponent({ valid, validMessage });

    // then
    expect(getByTestId(testId)).toHaveTextContent(validMessage);
  });

  it("Should apply --invalid class modifier when invalid flag is set and error is defined.", () => {
    // given
    const invalid = true;
    const error = "error";

    // when
    const { getByTestId } = renderComponent({ invalid, error });

    // then
    expect(getByTestId(testId)).toHaveClass("field-message--invalid");
  });

  it("Should apply --valid class modifier when valid flag is set and validMessage is defined.", () => {
    // given
    const valid = true;
    const validMessage = "valid";

    // when
    const { getByTestId } = renderComponent({ valid, validMessage });

    // then
    expect(getByTestId(testId)).toHaveClass("field-message--valid");
  });
});
