import {
  Autocomplete,
  AutocompleteProps,
  BaseTextFieldProps,
  ChipTypeMap,
  CircularProgress,
  FilledInputProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { ElementType } from "react";
import {
  Control,
  Controller,
  FieldPath,
  FieldPathValue,
  FieldValues,
} from "react-hook-form";

export interface IOption {
  value: string;
  label: string;
}

interface Props<T extends FieldValues>
  extends Omit<
    AutocompleteProps<
      IOption,
      boolean,
      boolean,
      boolean,
      ElementType & ChipTypeMap["defaultComponent"]
    >,
    "renderInput"
  > {
  name: FieldPath<T>;
  label?: string;
  control: Control<T, any, T>;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  textFieldProps?: Omit<TextFieldProps, "variant">;
  loading?: boolean;
  onChangeOption?: (event?: IOption) => void;
}

export function FormAutocomplete<T extends FieldValues>({
  name,
  label,
  required = false,
  disabled = false,
  defaultValue,
  control,
  textFieldProps,
  loading = false,
  onChangeOption,
  ...rest
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? (null as any)}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <Autocomplete
          id={name}
          disabled={disabled}
          value={value}
          noOptionsText="Sem opções"
          isOptionEqualToValue={(option, value) => option.value === value.value}
          getOptionLabel={(option) =>
            typeof option !== "string" && !!option.value
              ? `${option.label}`
              : ""
          }
          loading={loading}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.label}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              id={name}
              label={label}
              required={required}
              disabled={disabled}
              helperText={error ? error.message : null}
              error={!!error}
              {...textFieldProps}
              slotProps={{
                ...textFieldProps?.slotProps,
                input: {
                  ...textFieldProps?.slotProps?.input,
                  ...params.InputProps,
                  inputProps: { ...params.inputProps },
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                },
              }}
            />
          )}
          ref={ref}
          onChange={(_, value) => {
            onChangeOption?.(value as IOption);
            onChange(value);
          }}
          {...rest}
          options={rest.options ?? []}
        />
      )}
    />
  );
}
