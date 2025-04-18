import { BaseTextFieldProps } from "@mui/material";
import {
  DatePicker,
  DatePickerProps,
  PickerValidDate,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "date-fns/locale";
import {
  Control,
  Controller,
  FieldPath,
  FieldPathValue,
  FieldValues,
} from "react-hook-form";

interface Props<T extends FieldValues, TDate extends PickerValidDate>
  extends Omit<DatePickerProps<TDate>, "onChange" | "value" | "renderInput"> {
  name: FieldPath<T>;
  required?: boolean;
  control: Control<T, any, T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  textFieldProps?: BaseTextFieldProps;
}
export function FormDatePicker<
  T extends FieldValues,
  TDate extends PickerValidDate
>({
  name,
  required = false,
  control,
  defaultValue,
  textFieldProps,
  ...rest
}: Props<T, TDate>) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Controller
        name={name}
        defaultValue={defaultValue ?? undefined}
        control={control}
        render={({
          field: { onChange, value, ref },
          fieldState: { error },
        }) => (
          <DatePicker
            value={value ?? null}
            onChange={(event) => onChange(event)}
            disabled={rest.disabled}
            slotProps={{
              textField: {
                ...textFieldProps,
                required: required,
                label: rest.label,
                helperText: !!error ? error.message : null,
                error: !!error,
              },
            }}
            ref={ref}
            {...rest}
          />
        )}
      />
    </LocalizationProvider>
  );
}
