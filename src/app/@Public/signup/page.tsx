"use client";
import { FormPassword } from "@/src/components/forms/FormPassword";
import { FormTextField } from "@/src/components/forms/FormTextField";
import { Stack, Paper, Grid, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "@/src/services/fireBaseClient";
import { Button } from "@/src/components/Button";

export default function SignUp() {
  const { control, formState, handleSubmit } = useForm<any>();

  const handleSignup: SubmitHandler<{
    email: string;
    password: string;
    "confirm-password": string;
  }> = async ({ email, password }) => {
    try {
      debugger;
      const response = await signInWithEmailAndPassword(auth, email, password);
      const token = await response.user.getIdTokenResult();
      debugger;
    } catch (error) {
      debugger;
    }
  };

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
          onSubmit={handleSubmit(handleSignup)}
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
          <Grid size={12}>
            <FormPassword
              control={control}
              name="confirm-password"
              label="Confirma senha"
            />
          </Grid>
          <Grid size={12}>
            <Button loading={formState.isSubmitting} type="submit">
              Signup
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
}
