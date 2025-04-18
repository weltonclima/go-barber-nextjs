import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  export interface Theme {

  }

  export interface ThemeOptions {

  }
}

export const theme = createTheme({
  palette: {
    background: {
      default: "#F9F9F9"
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "outlined"
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        fullWidth: true
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: 400
        }
      }
    }
  }
})