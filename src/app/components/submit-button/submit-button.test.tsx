import { SubmitButton, Props } from "./submit-button";
import { render } from "@testing-library/react";

describe("SubmitButton", () => {
  const testId = "submit-button";

  const renderComponent = (props: Partial<Props> = {}) => {
    const { value = "", disabled } = props;

    return render(<SubmitButton value={value} disabled={disabled} />);
  };

  it("Should render provided value.", () => {
    // given
    const value = "value";

    // when
    const { getByTestId } = renderComponent({ value });

    // then
    expect(getByTestId(testId)).toHaveValue(value);
  });

  it("Should be disabled if disabled flag is set.", () => {
    // given
    const disabled = true;

    // when
    const { getByTestId } = renderComponent({ disabled });

    // then
    expect(getByTestId(testId)).toBeDisabled();
  });
});
