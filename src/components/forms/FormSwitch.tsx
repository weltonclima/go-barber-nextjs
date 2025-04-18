import {
  FormControlLabel,
  FormControlLabelProps,
  Switch,
  SwitchProps,
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
  switchProps?: SwitchProps;
}
export function FormSwitch<T extends FieldValues>({
  name,
  control,
  defaultValue,
  switchProps,
  ...rest
}: Props<T>) {
  return (
    <FormControlLabel
      id={name}
      control={
        <Controller
          name={name}
          defaultValue={defaultValue}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <Switch
              color="primary"
              checked={value}
              onChange={(event) => onChange(event)}
              ref={ref}
              {...switchProps}
            />
          )}
        />
      }
      {...rest}
    />
  );
}
