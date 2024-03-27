import { InputField, Props } from "./input-field";
import { render, renderHook } from "@testing-library/react";
import { useForm } from "react-hook-form";

describe("InputField", () => {
  interface FormValues {
    field: string;
  }

  const testId = "input-field";

  const renderComponent = (props: Partial<Props<FormValues>> = {}) => {
    const {
      control = renderHook(() => useForm<FormValues>()).result.current.control,
      name = "field",
      label = "",
    } = props;

    return render(<InputField control={control} name={name} label={label} />);
  };

  it("Should render without errors.", () => {
    // given & when
    const { getByTestId } = renderComponent();

    // then
    expect(getByTestId(testId)).toBeInTheDocument();
  });
});
