import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  RadioProps,
  Typography,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldPath,
  FieldPathValue,
  FieldValues,
} from "react-hook-form";

interface Props<T extends FieldValues> extends RadioGroupProps {
  label?: string;
  name: FieldPath<T>;
  control: Control<T, any, T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  radios: {
    label: string;
    value: string | number;
    formControlLabelProps?: Omit<FormControlLabelProps, "control" | "label">;
    radioProps?: RadioProps;
  }[];
}
export function FormRadioGroup<T extends FieldValues>({
  label,
  name,
  control,
  defaultValue,
  radios,
  ...rest
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? ("" as any)}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <FormControl component="fieldset" error={!!error}>
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup
            aria-label={name}
            name={name}
            value={value}
            onChange={onChange}
            {...rest}
            ref={ref}
          >
            {radios.map((radio) => (
              <FormControlLabel
                key={radio.value}
                value={radio.value}
                control={<Radio {...radio.radioProps} />}
                label={radio.label}
                {...radio.formControlLabelProps}
              />
            ))}
          </RadioGroup>
          <Typography color="red" fontSize={10}>
            {error?.message}
          </Typography>
        </FormControl>
      )}
    />
  );
}
