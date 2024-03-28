import { InputProps } from "@/components/input";
import { Input } from "@/components/input";
import { FocusEvent } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export interface Props<TFieldValues extends FieldValues> extends InputProps {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
}

export const InputField = <TFieldValues extends FieldValues>({
  "data-testid": testId = "input-field",
  control,
  name,
  onBlur,
  ...inputProps
}: Props<TFieldValues>) => (
  <Controller
    control={control}
    name={name}
    render={({
      field: { ref, onBlur: onBlurController, ...fieldProps },
      fieldState: { invalid, error },
    }) => {
      const onLocalBlur = (event: FocusEvent<HTMLInputElement>) => {
        onBlur && onBlur(event);
        onBlurController();
      };

      return (
        <Input
          data-testid={testId}
          {...fieldProps}
          {...inputProps}
          invalid={invalid}
          error={error?.message}
          refCallback={ref}
          onBlur={onLocalBlur}
        />
      );
    }}
  />
);
