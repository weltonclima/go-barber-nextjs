"use client";
import { FormPassword } from "@/src/components/forms/FormPassword";
import { FormTextField } from "@/src/components/forms/FormTextField";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/src/services/fireBaseClient";

export default function Public() {
  const { control } = useForm();

  const handleSignIn = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      // response.user.
    } catch (error) {}
  };

  return (
    <Stack
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Paper sx={{ px: 2, py: 4, mx: 2 }}>
        <Grid container spacing={2}>
          <Grid size={12} display="flex" justifyContent="center">
            <Typography>App Barber</Typography>
          </Grid>
          <Grid size={12}>
            <FormTextField control={control} name="email" label="Email" />
          </Grid>
          <Grid size={12}>
            <FormPassword control={control} name="password" label="Senha" />
          </Grid>
          <Grid size={12}></Grid>
        </Grid>
      </Paper>
    </Stack>
  );
}
