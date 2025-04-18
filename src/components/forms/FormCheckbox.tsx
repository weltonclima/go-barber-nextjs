import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormControlLabelProps,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldPath,
  FieldPathValue,
  FieldValues,
} from "react-hook-form";

interface Props<T extends FieldValues>
  extends Omit<FormControlLabelProps, "control"> {
  name: FieldPath<T>;
  control: Control<T, any, T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  onChangeChecked?: (value: boolean) => void;
  checkboxProps?: CheckboxProps;
}

export function FormCheckbox<T extends FieldValues>({
  name,
  control,
  defaultValue,
  onChangeChecked,
  checkboxProps,
  ...rest
}: Props<T>) {
  return (
    <FormControlLabel
      id={name}
      control={
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue ?? (false as any)}
          render={({ field: { onChange, value, ref } }) => (
            <Checkbox
              checked={value}
              onChange={(_, checked) => {
                onChange(checked);
                onChangeChecked?.(checked);
              }}
              color="secondary"
              ref={ref}
              {...checkboxProps}
            />
          )}
        />
      }
      {...rest}
    />
  );
}
