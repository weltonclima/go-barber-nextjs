"use client"
import { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { closeSnackbar, SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../styles/theme";
import { GlobalStyles, IconButton, Zoom } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

const style = {
  "input::-ms-reveal, input::-ms-clear": {
    display: "none",
  },
};

export function Provider({ children }: { children: ReactNode }) {
  return (
   <>
    <InitColorSchemeScript attribute="class" />
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={style} />
        <SnackbarProvider
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          TransitionComponent={Zoom}
          preventDuplicate
          action={(event) => (
            <IconButton size="small" onClick={() => closeSnackbar(event)}>
              <CloseIcon fontSize="small" sx={{ color: "white" }} />
            </IconButton>
          )}
        />
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
   </>
  );
}
