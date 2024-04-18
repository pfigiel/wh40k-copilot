import { Dropdown } from "./dropdown";
import { DropdownProps } from "./dropdown-props";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export interface Props<TValue, TFieldValues extends FieldValues>
  extends Omit<DropdownProps<TValue>, "value" | "onSelect"> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
}

export const DropdownField = <TValue, TFieldValues extends FieldValues>({
  "data-testid": testId = "dropdown-field",
  control,
  name,
  ...dropdownProps
}: Props<TValue, TFieldValues>) => (
  <Controller
    control={control}
    name={name}
    render={({
      field: { value, onChange },
      fieldState: { error, invalid },
    }) => (
      <Dropdown
        data-testid={testId}
        {...dropdownProps}
        value={value}
        withMessages
        invalid={invalid}
        error={error?.message}
        onSelect={onChange}
      />
    )}
  />
);
