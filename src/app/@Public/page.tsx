"use client";
import { FormPassword } from "@/src/components/forms/FormPassword";
import { FormTextField } from "@/src/components/forms/FormTextField";
import { Grid, Paper, Stack, Typography, Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { useStorage } from "@/src/hooks/useStorage";
import { useRouter } from "next/navigation";

export default function Public() {
  const { control, handleSubmit, formState } = useForm<any>();
  const { signIn } = useStorage();
  const router = useRouter();

  const handleSignIn: SubmitHandler<{
    email: string;
    password: string;
  }> = async (value) => {
    try {
      await signIn(value);
      await router.refresh();
    } catch (error: any) {
      enqueueSnackbar(error.response?.data?.message, { variant: "error" });
    }
  };

  useEffect(() => {
    const cookies = getCookie("go-barber-token");
    console.log({ cookies });
  }, []);

  return (
    <Stack
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Paper sx={{ px: 2, py: 4, mx: 2 }}>
        <Grid
          container
          spacing={2}
          component="form"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Grid size={12} display="flex" justifyContent="center">
            <Typography>App Barber</Typography>
          </Grid>
          <Grid size={12}>
            <FormTextField control={control} name="email" label="Email" />
          </Grid>
          <Grid size={12}>
            <FormPassword control={control} name="password" label="Senha" />
          </Grid>
          <Grid size={6}>
            <Button loading={formState.isSubmitting} type="submit">
              Signin
            </Button>
          </Grid>
          <Grid size={6}>
            <Button type="button" onClick={() => router.push("/signup")}>
              Signup
            </Button>
          </Grid>
          <Grid size={12}>
            <Button
              variant="text"
              type="button"
              onClick={() => router.push("/forgout")}
            >
              Reset password
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
}
