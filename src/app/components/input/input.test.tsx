import { Input } from "./input";
import { InputProps } from "@/types/input-props";
import { fireEvent, render } from "@testing-library/react";

describe("Input", () => {
  const testId = "input";

  const renderComponent = (props: Partial<InputProps> = {}) => {
    const {
      className,
      name,
      label,
      value,
      placeholder,
      required,
      invalid = false,
      valid = false,
      error,
      validMessage,
      withMessages = false,
      refCallback,
      onFocus,
      onBlur,
    } = props;

    return render(
      <Input
        className={className}
        name={name}
        label={label}
        value={value}
        placeholder={placeholder}
        required={required}
        invalid={invalid}
        valid={valid}
        error={error}
        validMessage={validMessage}
        withMessages={withMessages}
        refCallback={refCallback}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={jest.fn()}
      />
    );
  };

  it("Should render label if it is defined.", () => {
    // given
    const label = "label";

    // when
    const { getByTestId } = renderComponent({ label });

    // then
    expect(getByTestId(`${testId}__label`)).toHaveTextContent(label);
  });

  it("Should not render label if it is not defined.", () => {
    // given & when
    const { queryByTestId } = renderComponent();

    // then
    expect(queryByTestId(`${testId}__label`)).not.toBeInTheDocument();
  });

  it("Should add asterisk to the label if required flag is set.", () => {
    // given
    const label = "label";
    const required = true;

    // when
    const { getByTestId } = renderComponent({ label, required });

    // then
    expect(getByTestId(`${testId}__label`)).toHaveTextContent(`${label}*`);
  });

  it("Should focus field when label gets clicked.", () => {
    // given
    const { getByTestId } = renderComponent({ label: "label" });

    // when
    fireEvent.click(getByTestId(`${testId}__label`));

    // then
    expect(getByTestId(`${testId}__field`)).toHaveFocus();
  });

  it("Should render value in the field.", () => {
    // given
    const value = "typed-value";

    // when
    const { getByTestId } = renderComponent({ value });

    // then
    expect(getByTestId(`${testId}__field`)).toHaveValue(value);
  });

  it("Should render placeholder if value is not defined and input is focused.", () => {
    // given
    const placeholder = "placeholder";
    const { getByTestId } = renderComponent({ placeholder });

    // when
    fireEvent.focus(getByTestId(`${testId}__field`));

    // then
    expect(getByTestId(`${testId}__field`).getAttribute("placeholder")).toBe(
      placeholder
    );
  });
});
