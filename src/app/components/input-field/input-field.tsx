import { FocusEvent } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { InputProps } from "../types/input-props";
import { Input } from "../input/input";

export interface Props<TFieldValues extends FieldValues> extends InputProps {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
}

export const InputField = <TFieldValues extends FieldValues>({
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
