import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { Badge } from "@mui/material";

export interface ButtonProps extends LoadingButtonProps {
  badgeContent?: number;
}

export function Button({ badgeContent, ...rest }: ButtonProps) {
  return (
    <Badge badgeContent={badgeContent} color="primary">
      <LoadingButton
        variant="contained"
        {...rest}
      >
        {rest.children}
      </LoadingButton>
    </Badge>
  )
}