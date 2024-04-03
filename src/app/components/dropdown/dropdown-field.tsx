import { Dropdown } from "./dropdown";
import { DropdownProps } from "./dropdown-props";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export interface Props<TFieldValues extends FieldValues> extends DropdownProps {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
}

export const DropdownField = <TFieldValues extends FieldValues>({
  "data-testid": testId = "dropdown-field",
  control,
  name,
  ...dropdownProps
}: Props<TFieldValues>) => (
  <Controller
    control={control}
    name={name}
    render={({
      field: { ref, ...fieldProps },
      fieldState: { error, invalid },
    }) => (
      <Dropdown
        data-testid={testId}
        {...fieldProps}
        {...dropdownProps}
        withMessages
        invalid={invalid}
        error={error?.message}
        refCallback={ref}
      />
    )}
  />
);
