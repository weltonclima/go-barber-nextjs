import { toPattern } from 'vanilla-masker';


export interface MoneyOptions {
  // Decimal precision -> "90"
  precision?: number | undefined;

  // Decimal separator -> ",90"
  separator?: string | undefined;

  // Number delimiter -> "12.345.678"
  delimiter?: string | undefined;

  // Money unit -> "R$ 12.345.678,90"
  unit?: string | undefined;

  // Money unit -> "12.345.678,90 R$"
  suffixUnit?: string | undefined;

  // Force type only number instead decimal,
  // masking decimals with ",00"
  // Zero cents -> "R$ 1.234.567.890,00"
  zeroCents?: boolean | undefined;
}

export const formatMask = (value: string, mask: string | string[], placeholder?: string) => {
  const origin = value?.toString()?.replace(/\W/g, '') ?? "";

  return toPattern(origin, {
    pattern: typeof mask === "string" ? mask : mask.reduce((previous, current) => (
      origin.length <= previous.replace(/\W/g, '').length ? previous : current
    ), mask[0]),
    placeholder
  });
}