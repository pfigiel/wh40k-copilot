import { Dropdown } from "./dropdown";
import { DropdownProps } from "./dropdown-props";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export interface Props<TValue, TFieldValues extends FieldValues>
  extends Omit<DropdownProps<TValue>, "value" | "onSelect"> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  onSelect?: (value: TValue) => void;
}

export const DropdownField = <TValue, TFieldValues extends FieldValues>({
  "data-testid": testId = "dropdown-field",
  control,
  name,
  onSelect: onSelectProp,
  ...dropdownProps
}: Props<TValue, TFieldValues>) => {
  const onSelect = (value: TValue, onChange: (...event: any[]) => void) => {
    onChange(value);
    onSelectProp && onSelectProp(value);
  };

  return (
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
          onSelect={(value) => onSelect(value, onChange)}
        />
      )}
    />
  );
};
