"use client";
import {
  BaseTextFieldProps,
  OutlinedInputProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldPath,
  FieldPathValue,
  FieldValues,
} from "react-hook-form";
import { toMoney } from "vanilla-masker";
import React from "react";
import { formatMask, MoneyOptions } from "@/src/utils/formatMask";

export interface FormTextFieldProps<T extends FieldValues>
  extends Omit<TextFieldProps, "variant"> {
  name: FieldPath<T>;
  control: Control<T, any, T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  mask?: string | string[];
  moneyMask?: MoneyOptions;
}

export function FormTextField<T extends FieldValues>({
  name,
  control,
  defaultValue,
  mask,
  moneyMask,
  ...rest
}: FormTextFieldProps<T>) {
  function selectMask(value?: string) {
    return !!mask
      ? formatMask(value ?? "", mask)
      : !!moneyMask && !!value
      ? toMoney(value, moneyMask)
      : value;
  }

  return (
    <Controller
      name={name}
      defaultValue={defaultValue ?? ("" as any)}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <TextField
          id={name}
          helperText={!!error ? error.message : null}
          error={!!error}
          onChange={(event) => onChange(selectMask(event.target.value))}
          value={selectMask(value)}
          {...rest}
          ref={ref}
        />
      )}
    />
  );
}
