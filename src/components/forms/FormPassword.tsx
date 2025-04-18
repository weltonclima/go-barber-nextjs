"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import React from "react";
import { FormTextField, FormTextFieldProps } from "./FormTextField";

export function FormPassword<T extends FieldValues>({
  ...rest
}: FormTextFieldProps<T>) {
  const [isTypePassword, setIsTypePassword] = useState(false);
  return (
    <FormTextField
      type={isTypePassword ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <IconButton
              size="small"
              aria-label="toggle password visibility"
              onClick={() => setIsTypePassword(!isTypePassword)}
            >
              {isTypePassword ? (
                <Visibility fontSize="small" color="primary" />
              ) : (
                <VisibilityOff fontSize="small" color="primary" />
              )}
            </IconButton>
          ),
        },
      }}
      {...rest}
    />
  );
}
