import { Button, Props } from "./button";
import { createMockChildren } from "@/test/utils";
import { fireEvent, render, within } from "@testing-library/react";

describe("Button", () => {
  const testId = "button";

  const renderComponent = (props: Partial<Props> = {}) => {
    const { children, onClick = jest.fn() } = props;

    return render(<Button onClick={onClick}>{children}</Button>);
  };

  it("Should render children.", () => {
    // given
    const { children, childTestId } = createMockChildren();

    // when
    const { getByTestId } = renderComponent({ children });

    // then
    expect(
      within(getByTestId(testId)).getByTestId(childTestId),
    ).toBeInTheDocument();
  });

  it("Should fire onClick callback when button gets clicked.", () => {
    // given
    const onClick = jest.fn();
    const { getByTestId } = renderComponent({ onClick });

    // when
    fireEvent.click(getByTestId(testId));

    // then
    expect(onClick).toHaveBeenCalled();
  });
});
